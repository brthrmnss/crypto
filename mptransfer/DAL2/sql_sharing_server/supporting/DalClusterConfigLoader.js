var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var SQLSharingServer = require('./../sql_sharing_server').SQLSharingServer;


function DalClusterConfigLoader() {
    var p = DalClusterConfigLoader.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.settings.file = sh.dv(self.settings.file, __dirname+'/'+'../'+'../'+ 'cluster_config.json')
        self.config = sh.readJSONFile(self.settings.file)
        self.cluster_config = self.config;
        sh.toJSONString(self.config,self.config.displayConfigOnInit)

        self.makePeers();
        self.processPeers();
        self.peersConfig_modify()
        self.makePeersObjects();
    }

    p.makePeers = function makePeers() {

        function defineTopologyUtils() {
            var tU  ={};
            var dictPeers = {};
            self.topUtils = tU;
            self.topUtils.topology = dictPeers

            self.topUtils.makePeer = function makePeer(peerName) {
                var peer = dictPeers[peerName];
                if ( peer == null ) {
                    peer =  {};
                    peer.name = peerName;
                    peer.linksTo = [];
                    peer.links = [];
                    dictPeers[peerName] = peer;
                }
                return peer;
            }
            self.topUtils.createLink = function createLink(fromPeer, toPeerName) {
                var fromPeerName = fromPeer;
                if ( fromPeer.name )
                    fromPeerName = fromPeer.name;
                var peer = dictPeers[fromPeerName];
                var peer = self.topUtils.makePeer(fromPeerName) //forgiving
                var toPeer = self.topUtils.makePeer(toPeerName)
                if ( peer.linksTo.indexOf(toPeerName) == -1 ) {
                    self.proc(fromPeerName,'-->', toPeerName)
                    peer.linksTo.push(toPeerName);
                }

                //why: create full list of peers in/out
                if ( peer.links.indexOf(toPeerName) == -1 ) {
                    peer.links.push(toPeerName);

                    if ( toPeer.links.indexOf(fromPeerName) == -1 ) {
                        toPeer.links.push(fromPeerName);
                    }
                }


            }
            self.topUtils.getPeers = function getPeers(peersByName) {
                var peerConfigs = [];;
                sh.each(peersByName, function onPeer(idx,peerName) {
                    var peer = self.topUtils.makePeer(peerName);
                    peerConfigs.push(peer)
                });
                return peerConfigs;
            }
        }
        defineTopologyUtils();

        sh.each(self.cluster_config.links, function onPeer(fromPeerName,linksTo) {
            var peer = self.topUtils.makePeer(fromPeerName);
            sh.each(linksTo, function onPeer(idx,linksToPeerNamed) {
                var peer = self.topUtils.makePeer(fromPeerName);
                self.topUtils.createLink(peer, linksToPeerNamed);
            });
            return;
        })

        console.log('')
        sh.toJSONString(self.topUtils.topology, true)
    }
    p.processPeers = function processPeers() {
        //why: show warning messages..
        //warn about empty peers.
        //warn about loops
        //no ips, will use test mode
        //test mode, will use test mode
        if ( self.settings.testMode ) {
            console.warning('use test mode')
        }

        sh.each(self.topUtils.topology, function onPeer(fromPeerName,peerConfig) {
            if ( peerConfig.ip  == null ) {
                console.warn('use test mode b/c', fromPeerName, peerConfig, 'had no ip address')
                self.settings.testMode = true;
                return false;
            }
        })

    }
    p.peersConfig_modify = function peersConfig_modify() {
        //why: finalize ocnfig warning messages..

        var port = 12010
        sh.each(self.topUtils.topology, function onPeer(fromPeerName,peerConfig) {
            if ( self.settings.testMode ) {
                peerConfig.ip  = '127.0.0.1';

                peerConfig.ip +=':'+port;
                //peerConfig.port = port;
                port += self.config.table.length;
                port += 1;

                self.proc('peerIp', fromPeerName, peerConfig.ip );
            }
        })

    }
    p.makePeersObjects = function makePeersObjects() {
        //why: create live instances

        var topology = {};
        var allPeers = [];
        var baseConfig = {};
        //baseConfig.cluster_config = self.topUtils.topology;
        //baseConfig.port = 12001;
        baseConfig.peerName = 'a';
        baseConfig.tableName = 'aA';
        baseConfig.fxDone = self.finishedMakingPeers
        baseConfig.dbConfigOverride = true
        baseConfig.dbLogging =false
        baseConfig.testMode = self.settings.testMode;
        //baseConfig.dbLogging=true

        var logGlobal = [];
        //if no ips
        sh.each(self.topUtils.topology,
            function createLivePeerObject(fromPeerName,peerConfig) {
                var config = sh.clone(baseConfig);
                peerConfig = sh.clone(peerConfig)
                sh.mergeObjectsForce(peerConfig, config)
                config.cluster_config = {};
                //peerConfig.peers = peerConfig.peers;
                peerConfig.peers = self.topUtils.getPeers(peerConfig.links);
                config.peerConfig = peerConfig;
                config.cluster_config = peerConfig;
                config.cluster_config = self.cluster_config;
                config.cluster_config.peers = peerConfig.peers; //ugh ...
                var service = new SQLSharingServer();
                service.init(config);
                var peerObj = service;
                peerObj.logGlobal = logGlobal; //why: test syncing tests
                allPeers.push(service);
                topology[fromPeerName] = peerObj;

                self.proc('serv', service.settings.name, service.settings.ip)
            })


        function debugVerifyToplogyIsLinked() {
            var topEntries = {}
            var subEntries = {};
            sh.each(allPeers,
                function showPeerPeers(k,peer) {

                    self.proc(peer.settings.name, peer.settings.ip )
                    console.log('', peer.settings.dictPeersToIp, peer.settings.peers)
                    sh.each(peer.settings.dictPeersToIp, function (name,ip) {
                        var lastIp = topEntries[name]
                        if ( lastIp && lastIp != ip ) {
                            throw new Error(
                                ['having bug with', name, ip, 'on',  peer.settings.name].join(' '))
                        }
                        topEntries[name] = ip;
                    })
                    var tab = "\t\t"
                    sh.each(peer.data.tableServers, function (k,sub) {
                        if ( sub.settings == null ) {
                            return;
                        }
                        //self.proc(tab, sub.settings.name, sub.settings.ip )
                        console.error(tab, sub.settings.name, sub.settings.ip )
                        console.error(tab, '', sub.settings.dictPeersToIp, sub.settings.peers)
                        sh.each(peer.settings.dictPeersToIp, function (name,ip) {
                            var lastIp = topEntries[name]
                            if ( lastIp && lastIp != ip ) {
                                throw new Error([
                                    'having bug sub with', name, ip, 'on',  sub.settings.name].join(' '))
                            }
                            topEntries[name] = ip;
                        })
                    })

                })
           // process.exit();
        }


        setTimeout(debugVerifyToplogyIsLinked, 0)
        setTimeout(debugVerifyToplogyIsLinked, 2000)

        return;
    }

    p.method = function method(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.DalClusterConfigLoader = DalClusterConfigLoader;

if (module.parent == null) {
    var instance = new DalClusterConfigLoader();
    var config = {};
    instance.init(config)
}



