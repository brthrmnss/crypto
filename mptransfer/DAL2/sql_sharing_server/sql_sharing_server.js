/**
 * Created by user on 1/3/16.
 */

var rh = require('rhelpers');
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var express    = require('express');
var SequelizeHelper = shelpers.SequelizeHelper;
var EasyRemoteTester = shelpers.EasyRemoteTester;
var querystring= require('querystring');
var DalDbHelpers= require('./supporting/DalDbHelpers').DalDbHelpers; //why: database lib defined here
var DalDashboardHelpers= require('./supporting/DalDashboardHelpers').DalDashboardHelpers; //why: database lib defined here
var DalServerTestHelpers= require('./supporting/DalServerTestHelpers').DalServerTestHelpers; //why: database lib defined here
var DalSyncRoutesHelpers= require('./supporting/DalSyncRoutesHelpers').DalSyncRoutesHelpers; //why: database lib defined here
var DalBasicRoutesHelpers= require('./supporting/DalBasicRoutesHelpers').DalBasicRoutesHelpers; //why: database lib defined here


function SQLSharingServer() {
    var p = SQLSharingServer.prototype;
    p = this;
    var self = this;

    p.init = function init(config) {
        self.settings = {};     //store settings and values
        self.data = {};
        if (config) {
            self.settings = config;
        } else
        {
            var cluster_settings = rh.loadRServerConfig(true);
        }
        //self.settings.port = 3001;

        self.settings.updateLimit = sh.dv(self.settings.updateLimit, 99+901);
        self.server_config = rh.loadRServerConfig(true);  //load server config
        self.settings.enableAutoSync = sh.dv(self.settings.enableAutoSync,true);

        self.debug = {};
        //self.debug.tableCascades = true; //show table info this stop
        self.debug.jsonBugs = false;
        self.handleTables();


        if ( self.debug.tableCascades )
            return;
        // return;
        self.app = express();   //create express server

        //self.setupSecurity()
        self.createBlockingRoutes()

        self.createRoutes();    //decorate express server
        self.createSharingRoutes();

        self.createDashboardRoutes();
        self.createDashboardResources();

        self.identify();

        self.startServer()

        self.connectToDb();
        self.setupAutoSync();
    }

    p.handleTables = function handleTables() {
        //return;
        if ( self.settings.cluster_config.table ) {
            self.settings.cluster_config.tables = self.settings.cluster_config.table;
        }
        if ( self.settings.cluster_config.tables == null )
            return;

        if ( self.settings.subServer) {
            //asdf.g
            return;
        }

        self.data.tableServers = [];
        //return
        var tables = sh.clone(self.settings.cluster_config.tables);
        var mainTable = tables.pop();
        self.settings.tableName = mainTable;
        self.settings.topServer = true;



        //in non-test mode, all are the same
        var bconfig = self.utils.cloneSettings();
        //sh.clone(self.settings);

        /*
         tables are tricky
         in test mode, we are running app ports on same machine, so we
         offset the port numbers  by the number of tables
         tables, people, cars
         a1,b3,c5

         a1 a_car_2,
         b3 b_car_4,
         c5 c_car_6,

         in prod mode, we offset each table by 1, so car is on port 1, people is on port 2
         tables, people, cars
         a1,b1,c1

         a1 a_car_2,
         b1 b_car_2,
         c1 b_car_2,

         have to update sub configuration
         */
        var tablePortOffset = 0;
        sh.each(tables, function addServerForTable(k,tableName) {
            //return

            //var config = sh.clone(bconfig);
            var config = self.utils.cloneSettings();
            // var config = self.utils.detectCircularProblemsWith(self.settings)
            var cloneablePeers = []; //clone peers so port increments do not conflict
            sh.each(config.peerConfig.peers, function copyPeer(k,v) {
                var p = {};
                sh.mergeObjects2(v, p)
                delete p.peers //remove recurse peers property
                cloneablePeers.push(p)
            })
            config.peerConfig.peers = sh.clone(cloneablePeers)
            if ( config.peerConfig == null ) {
                var breakpoint =  {};
            }
            delete config.topServer;
            var peerCount = config.peerConfig.peers.length; //why: offset in test mode by this many ports
            var originalIp = config.ip
            tablePortOffset += 1

            config.port = null;
            config.ip = self.utils.incrementPort(config.ip, tablePortOffset);
            config.peerConfig.ip = self.utils.incrementPort(config.peerConfig.ip, tablePortOffset);
            self.proc("\t\t", 'peer', config.name,tableName, config.ip)
            var additionalOffset = 0;
            //setup matching ip/port for peers
            sh.each(config.peerConfig.peers, function setupMatchingPortForPeers(k,peer) {
                if (tables.length==1) {
                    //tablePortOffset -= 1
                    // additionalOffset = -1
                    //why: do not offset by 1 ... not sure why
                }
                peer.ip = self.utils.incrementPort(peer.ip, tablePortOffset+additionalOffset);
                self.proc("\t\t\t", 'peer',tableName, peer.name, peer.ip)
            });

            if ( self.debug.tableCascades ) {
                return;
            }
            config.subServer = true;
            config.topServerIp = self.settings.ip;
            config.tables = null;
            config.table = null;
            config.tableName = tableName;

           // config.peers = sh.clone(config.peers)
            var service = new SQLSharingServer();
            if ( self.runOnce )
                return
            /* setTimeout(function makeServerLaterToTestInitError(_config) {

             console.error('run later', _config.ip)

             service.init(_config);
             }, 2000, config)*/

            setTimeout(function makeServerLaterToTestInitError(_config) {

                console.error('run later', _config.ip)

                //self.data.tableServers
                service.init(_config);
                service.data.tableServers = self.data.tableServers;
            }, 500, config)

            // self.runOnce = true
            //service.init(config);
            // var peerObj = service;
            //c
            self.data.tableServers.push(service);
        });


        // process.exit();
        return;
    }

    p.setupSecurity = function setupSecuirty() {
        if ( self.settings.password == null ) {
            return;
        }
        //TODO: finish ... but will break everything
        self.app.use(function block(req, res, next) {
            var password = ''
            if ( req.params)
                password = sh.dv(req.params.password, password)
            if ( req.query)
                password = sh.dv(req.query.password, password)
            if ( req.body)
                password = sh.dv(req.body.password, password)

            if ( password != self.settings.password ) {
                console.error('blocked attemptX')
                res.status(410)
                res.send({"status":"high bandwidth"})
                return;
            }
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            next();
        });
    }

    DalDashboardHelpers(self)

    p.createRoutes = function createRoutes() {
        self.app.post('/upload', function (req, res) {});
    }

    p.createBlockingRoutes = function createBlockingRoutes() {
        //return;
        self.app.use(function block(req, res, next) {
            if ( self.settings.block ) {
                self.proc('what is this', self.settings.name, 'what is this...?')
                //asdf.g
                self.proc(self.settings.name, 'block')
                return ;
            }
            next();
        });
    }
    p.startServer = function startServer() {
        self.proc('startServer', self.settings.name, self.settings.port, self.settings.tableName )
        if ( self.settings.port == null){
            throw new Error('no port this will not launch ' +  self.settings.name)
        }
        self.app.listen(self.settings.port);
        self.proc('started server on', self.settings.name, self.settings.port);
    }

    DalSyncRoutesHelpers(self)
    DalBasicRoutesHelpers(self)


    /**
     * why: identify current machine in config file to find peers
     */
    p.identify = function identify() {
        var peers = self.settings.cluster_config.peers;
        if ( self.settings.cluster_config == null )
            throw new Error ( ' need cluster config ')


        if ( self.settings.port != null &&
            sh.includes(self.settings.ip, self.settings.port) == false ) {
            self.settings.ip = null; //clear ip address if does not include port
        };

        if ( self.settings.port == null && self.settings.ip  ) {
            //why: get port from ip address
            var portIpAndPort = self.settings.ip;
            if ( portIpAndPort.indexOf(':') != -1 ) {
                var ip = portIpAndPort.split(':')[0];
                var port = portIpAndPort.split(':')[1];
                if ( sh.isNumber(port) == false ){
                    throw new Error(['bad port ', ip, port].join(' '))
                }
                self.settings.ip = ip;
                if ( ip.split('.').length !=4 && ip != 'localhost'){
                    throw new Error(['invalid ip ', ip, port].join(' '))
                }
                self.settings.port = port;
            };
        };

        var initIp = self.settings.ip;
        self.settings.ip = sh.dv(self.settings.ip, '127.0.0.1:'+self.settings.port); //if no ip address defined
        if ( self.settings.ip.indexOf(':')== -1 ) {
            self.settings.ip = self.settings.ip+':'+self.settings.port;
        }

        if ( initIp == null ) {
            var myIp = self.server_config.ip;
            //find who i am from peer
            self.proc('searching for ip', myIp)
            sh.each(peers, function findMatchingPeer(i, ipSection){
                var peerName = null;
                var peerIp = null;

                peerName = i;
                peerIp = ipSection;

                if ( sh.isObject(ipSection)) {
                    sh.each(ipSection, function getIpAddressAndName(name, ip) {
                        peerName = name;
                        peerIp = ip;
                    })
                }

                if ( self.settings.peerName != null ) {
                    if (self.settings.peerName == peerName) {
                        foundPeerEntryForSelf = true;
                        self.settings.name = peerName;
                        return;
                    }
                } else {
                    if (self.settings.ip == peerIp) {
                        foundPeerEntryForSelf = true;
                        self.settings.name = peerName;
                        return;
                    }
                }
                var peerIpOnly = peerIp;
                if ( peerIp.indexOf(':') != -1 ) {
                    peerIpOnly = peerIp.split(':')[0];
                };
                if ( peerIpOnly == myIp ) {
                    self.proc('found your thing...')
                    self.settings.ip = peerIpOnly
                    if ( peerIp.indexOf(':') != -1 ) {
                        var port = peerIp.split(':')[1];
                        self.settings.port = port;
                    }
                    self.settings.name = peerName;
                    self.settings.cluster_config.tables
                    var y = [];
                    return;
                } else {
                    // self.proc('otherwise',peerIpOnly);
                }
            });
            self.server_config
        }

        self.proc('ip address', self.settings.ip);

        self.settings.dictPeersToIp = {};
        self.settings.dictIptoPeers = {};
        self.settings.peers = [];

        var foundPeerEntryForSelf = false;

        console.log(self.settings.name, 'self peers', peers);
        sh.each(peers, function findMatchingPeer(i, ipSection){
            var peerName = null;
            var peerIp = null;
            sh.each(ipSection, function getIpAddressAndName(name, ip) {
                peerName = name;
                peerIp = ip;
            })
            if ( sh.isString(ipSection) && sh.isString(i) ) { //peer and ip address method
                if ( ipSection.indexOf(':') ) {
                    peerName = i;
                    peerIp = ipSection;
                    if ( peerIp.indexOf(':') != -1 ) {
                        peerIp = peerIp.split(':')[0];
                    };
                }
            }
            if ( self.settings.peerName != null ) {
                if (self.settings.peerName == peerName) {
                    foundPeerEntryForSelf = true;
                    self.settings.name = peerName;
                    return;
                }
                /*
                 var peerConfig = ipSection;
                 if (self.settings.peerName == peerConfig.name ) {
                 foundPeerEntryForSelf = true;
                 self.settings.name = peerName;
                 return;
                 }
                 */
            }
            else {
                if (self.settings.ip == peerIp) {
                    foundPeerEntryForSelf = true;
                    self.settings.name = peerName;
                    return;
                }
            }
            if ( ipSection.name ){
                var peerConfig = ipSection;
                var peerName = peerConfig.name;
                var peerIp = peerConfig.ip;
            }
            if ( self.settings.peers.includes(peerIp)){
                return; //self.settings.peers.push(peerIp);
            }
            self.proc('adding peer (no matched config)',peerName, peerIp, self.settings.ip); //.error('....', );
            self.settings.peers.push(peerIp);
            self.settings.dictPeersToIp[peerName]=peerIp;
            self.settings.dictIptoPeers[peerIp]=peerName;
        });

        if ( self.settings.peerConfig ) { //why: let cluster loader set config and send no peers
            //bypass searchc
            foundPeerEntryForSelf = true;
            self.settings.name = self.settings.peerConfig.name;
        }


        self.proc(self.settings.peerName, 'foundPeerEntryForSelf', foundPeerEntryForSelf, self.settings.peers.length,  self.settings.peers);

        if ( foundPeerEntryForSelf == false ) {
            throw new Error('did not find self in config')
        }

        if (  self.settings.peers.length == 0 ) {
            throw new Error('init: not enough peers ' + self.settings.name, peers)
        }
    }

    function definePeerUtils() {
        p.peers = {};
        p.peers.addPeer = function addPeer(peerName, peerIp) {
            if ( peerName ) {
                var peerObj = peerName;
                peerName = peerObj.name;
                peerIp = peerObj.ip;
            }
            sh.throwIfNull(peerName, 'need a peer name')
            sh.throwIfNull(peerIp, 'need a peer ip')
            if ( self.settings.peers.includes(peerIp)) {
                return;
            }
            self.settings.peers.push(peerIp);
            self.settings.dictPeersToIp[peerName]=peerIp;
            self.settings.dictIptoPeers[peerIp]=peerName;
        }

        p.peers.removePeer = function addPeer(peerName, peerIp) {
            if ( self.settings.peers.includes(peerIp) == false) {
                return;
            }
            sh.removeFromArray(self.settings.peers, peerIp)
            delete self.settings.dictPeersToIp[peerName];
            delete self.settings.dictIptoPeers[peerIp];
        }


        p.getMyPeerInfo = function getMyPeerInfo(peerName, peerIp) {
            var yyy = {};
            yyy.name = self.settings.peerName;
            yyy.ip = self.settings.ip;
            yyy[self.settings.peerName] = self.settings.ip;
            return yyy;
        }

    }

    definePeerUtils();

    function defineDatabase() {

        p.connectToDb = function connectToDb() {
            if ( self.settings.dbConfigOverride) {
                var Sequelize = require('sequelize')//.sequelize
                if ( self.settings.tableName == null || self.settings.tableName == '' ) {
                    asdf.g
                }
                var sequelize = new Sequelize('database', 'username', '', {
                    dialect: 'sqlite',
                    storage: 'db/'+[self.settings.name,self.settings.tableName].join('_')+'.db',
                    logging:self.settings.dbLogging
                })
                self.sequelize = sequelize;
                self.createTableDefinition();
            } else {
                var sequelize = rh.getSequelize(null, null, true);
                self.sequelize = sequelize;
                self.createTableDefinition();
            }


        }

        /**
         * Creates table object
         */
        p.createTableDefinition = function createTableDefinition() {
            var tableSettings = {};
            if (self.settings.force == true) {
                tableSettings.force = true
                tableSettings.sync = true;
            }
            tableSettings.name = self.settings.tableName
            if ( self.settings.tableName == null ) {
                throw new Error('need a table name')
            }
            //tableSettings.name = sh.dv(sttgs.name, tableSettings.name);
            tableSettings.createFields = {
                name: "", desc: "", user_id: 0,
                imdb_id: "", content_id: 0,
                progress: 0
            };


            self.settings.fields = tableSettings.createFields;

            var requiredFields = {
                source_node: "", id_timestamp: "",
                updated_by_source:"",
                global_updated_at: new Date(), //make another field that must be changed
                version: 0, deleted: true
            }
            sh.mergeObjects(requiredFields, tableSettings.createFields);
            tableSettings.sequelize = self.sequelize;
            SequelizeHelper.defineTable(tableSettings, tableCreated);

            function tableCreated(table) {
                self.proc(self.settings.name, 'table ready')
                //if ( sttgs.storeTable != false ) {
                self.Table = table;


                self.dbHelper2.getDBVersion()

                setTimeout(function () {
                    sh.callIfDefined(self.settings.fxDone);
                }, 100)

            }
        }

        DalDbHelpers(self)
    }
    defineDatabase();

    function defineUtils() {
        if ( self.utils == null ) self.utils = {};

        self.utils.cloneSettings = function cloneSettings() {
            var y = self.settings;
            var clonedSettings = {};
            sh.each(y, function dupeX(k,v) {
                //what
                try {
                    var c = sh.clone(v);
                    clonedSettings[k] = c;
                } catch ( e ) {
                    if ( self.debug.jsonBugs )
                        console.error('problem json copy with', k)


                    clonedSettings[k] = v; //ugh ...
                }

            })


            // function recursivee
            return clonedSettings;
        }

        self.utils.detectCircularProblemsWith =
            function detectCircularProblemsWith(obj, dictPrev, path) {
                if ( dictPrev == null ) {
                    dictPrev = {};
                    dictPrev.arr = [];
                    path = ''
                }
                //why will detect circular references in json object (stringify)
                var clonedSettings = {};
                sh.each(obj, function dupeX(k,v) {
                    try {
                        dictPrev[v] = k;
                        dictPrev.arr.push(v)
                        var c = sh.clone(v);
                        clonedSettings[k] = c;

                    } catch ( e ) {
                        path += '.'+k
                        if ( self.debug.jsonBugs )
                            console.error('problem json copy with', k, v, path)
                        dictPrev[v] = k;
                        dictPrev.arr.push(v)
                        if ( sh.isObject( v )) {
                            var prev = dictPrev[v];
                            var hasItem = dictPrev.arr.indexOf(v)

                            if ( prev != null || hasItem != -1  ) {
                                if ( dictPrev.culprintFound ) {
                                    console.log('---> is culprit ', path, k, prev)
                                    return;
                                }
                                console.log('this is culprit ', path, k, prev)
                                // return;
                                dictPrev.culprintFound = true;
                            }

                            sh.each(v, function dupeX(k1,innerV) {
                                console.log('  ... |> ', k1)
                                var pathRecursive = path +'.'+k1;
                                dictPrev[innerV] = k1;
                                dictPrev.arr.push(innerV)
                                self.utils.detectCircularProblemsWith(innerV, dictPrev,pathRecursive)

                            })

                        }

                        //clonedSettings[k] = v; //ugh ...
                    }
                })
                // function recursivee
                return clonedSettings;
            }



        self.utils.latestDate = function compareTwoDates_returnMostRecent(a,b) {
            if ( a == null )
                return b;
            if (a.getTime() > b.getTime() ) {
                return a;
            }
            return b;
        }

        self.utils.incrementPort = function incrementPort(ip, offset) {
            var obj = self.utils.getPortAndIp(ip);


            var newIp =  obj.ip + ':' + (obj.port+offset);
            return newIp;
        }

        self.utils.getPortAndIp = function getPortAndIp (ip) {
            var obj = {}
            var portIpAndPort = ip;
            if ( portIpAndPort.indexOf(':') != -1 ) {
                var ip = portIpAndPort.split(':')[0];
                var port = portIpAndPort.split(':')[1];
                if ( sh.isNumber(port) == false ){
                    throw new Error(['bad port ', ip, port].join(' '))
                }

                if ( ip.split('.').length !=4 && ip != 'localhost'){
                    throw new Error(['invalid ip ', ip, port].join(' '))
                }

                obj.port = parseInt(port)
                obj.ip = ip; //parseInt(ip)
            };
            return obj;
        }

        self.utils.forEachPeer = function fEP(fxPeer, fxDone) {

            sh.async(self.settings.peers,
                fxPeer, function allDone() {
                    sh.callIfDefined(fxDone);
                })
            return;
        }

        self.utils.getPeerForRequest = function getPeerForRequest(req) {
            var fromPeer = req.query.fromPeer;
            if ( fromPeer == null ) {
                throw new Error('need peer')
            };
            return fromPeer;
        }


        self.utils.peerHelper = {};
        self.utils.peerHelper.getPeerNameFromIp = function getPeerNameFromIp(ip) {
            var peerName = self.settings.dictIptoPeers[ip];
            if ( peerName == null ) {
                throw new Error('what no peer for ' + ip);
            }
            return peerName;
        }

        /**
         *
         * Return true if peer matches
         * @param ip
         * @returns {boolean}
         */
        self.utils.peerHelper.skipPeer = function skipPeer(ipOrNameOrDict, ip) {
            if ( ipOrNameOrDict == '?') {
                return false;
            }
            var peerName = null
            var peerIp = null;
            var peerName = self.settings.dictIptoPeers[ipOrNameOrDict];
            if ( peerName == null ) {
                peerName = ipOrNameOrDict;
                peerIp = self.settings.dictPeersToIp[peerName];
                if ( peerName == null ) {
                    throw new Error('bad ip....'  + ipOrNameOrDict)
                }
            } else {
                peerIp = ipOrNameOrDict;
            }

            if ( peerIp == ip ) {
                return true; //skip this one it matches
            }

            return false;
        }

        /**
         * Update config to limit debugging information
         * @param config
         * @returns {*}
         */
        self.utils.updateTestConfig = function updateTestConfig(config) {
            config = sh.dv(config, {});
            config.silent = true;
            self.settings.cluster_config.urlTimeout =
                sh.dv(self.settings.cluster_config.urlTimeout, 10000);
            config.urlTimeout = self.settings.cluster_config.urlTimeout;
            return config;
        }

    }
    defineUtils();

    function defineLog() {
        self.dalLogX = function log() {
            if ( self.listLog == null ) {
                self.listLog = []
            }
            var args = sh.convertArgumentsToArray(arguments)
            var str = args.join(' ')
            str = self.listLog.length + '. ' + str;
            self.listLog.push(str)
        }

        self.dalLog = function log() {
            if ( self.listLog == null ) {
                self.listLog = []
            }
            var args = sh.convertArgumentsToArray(arguments)
            var str = args.join(' ')
            str = self.listLog.length + '. ' + str;
            var file = sh.sLog('');
            var split = file.split('\\')
            file = split[0] + split.slice(-1)[0] //limit display length
            console.error(sh.t, str)
            str += ' '+file
            self.listLog.push(str)
            if ( self.logGlobal ) {
                self.logGlobal.push(str)
            }
        }

        self.dalLogReset = function dalLogReset() {
            self.listLog= [];
            console.log("\n\n\n\n\n\n\n-reset-\n\n\n\n\n\n")
            if ( self.logGlobal ) {
                self.logGlobal.length = 0 ;
            }

        }

        self.dalLogDump = function dalLogDump() {
            // console.log('>>>', self.listLog)
            console.log('>>>>>' )//, self.logGlobal)
            sh.each(self.listLog, function (k,v) {
                console.log(v)
            })
            //  console.log(self.logGlobal)
            if ( self.logGlobal ) {
                console.log('>>>>>' )//, self.logGlobal)
                sh.each(self.logGlobal, function (k,v) {
                    console.log(v)
                })
                //  console.log(self.logGlobal)
            }
        }
    }
    defineLog();

    function defineUrl() {
        //  var actorsStr = self.settings.name+'__'+peerName
        function getUrlDebugTag(t) {
            var urlTag = '?a'+'='+actorsStr+'&'+
                'of='+t.offset
            return urlTag
        }

        self.utils.url = {};
        self.utils.url.appendUrl = function appendUrl() { //take array of objects adn add to url
            var url = '?';
            var queryObject = {};
            var args = sh.convertArgumentsToArray(arguments)
            sh.each(args, function processB(i, hsh){
                sh.each(hsh, function processBx(k, v){
                    queryObject[k] = v;
                })
            })
            url +=  querystring.stringify(queryObject)
            return url;
        }
        self.utils.url.from = function appendUrl(ip) { //take array of objects adn add to url
            return self.utils.peerHelper.getPeerNameFromIp(ip)

        }
    }
    defineUrl();

    DalServerTestHelpers(self)

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        var args = sh.convertArgumentsToArray(arguments)
        args.unshift(self.settings.name)
        sh.sLog(args);
    }
}

exports.SQLSharingServer = SQLSharingServer;

if (module.parent == null) {
    var service = new SQLSharingServer()
    service.init()
    return;


}