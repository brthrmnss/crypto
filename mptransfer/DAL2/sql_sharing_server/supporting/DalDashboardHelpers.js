/**
 * Created by user on 1/3/16.
 */

var rh = require('rhelpers');
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var express    = require('express');
var SequelizeHelper = shelpers.SequelizeHelper;
var querystring= require('querystring');

function DalDashboardHelpers(_self) {
    var p = DalDashboardHelpers.prototype;
    p = this;
    var self = this;
    if ( _self ) {
        self = _self;
        p = self;
    }


    /**
     * why: identify current machine in config file to find peers
     */

    function defineDBMethods() {


        p.createDashboardResources = function createDashboardResources() {
            if ( self.settings.enableDashboard != false ) {
                //q: should offset dir? no
                var dirPub = __dirname+'/../../node_modules/shelpers/lib/public_html/'
                var dirPub = sh.requirePathSH('public_html/',true);
                self.app.use(express.static(__dirname+'/public_html'));
                self.app.use(express.static(dirPub));
                console.info('createDashboardResources', '127.0.0.1:12011/dashboard_dal.html')
                if ( ! sh.fileExists(dirPub) ) {
                    throw new Error(dirPub)
                }

                if ( ! sh.fileExists(dirPub+'/'+'jquery-2.0.2.js.ignore_scan') ) {
                    throw new Error(dirPub)
                }
            }
        }

        p.createDashboardRoutes = function createDashboardRoutes() {
            self.getConfig = function getConfig (req, res) {
                var peers = self.settings.peers;
                var cfg = self.utils.cloneSettings();
                cfg.cluster_config.peers = peers;
                cfg.peers = peers;
                var x =self.utils.detectCircularProblemsWith(self.settings)
                var tables = {};
                if ( true || self.settings.subServer != true ) {
                    if ( self.data.tableServers == null ) {
                        self.data.tableServers = [];
                    }
                    sh.each(self.data.tableServers, function (k,tableServer) {
                        tables[tableServer.settings.tableName] = tableServer.settings
                        //why: random check to ensure this i fucntioning
                        if ( tableServer.settings.subServer != true ) {
                            throw new Error('not a sub server ... not good ')
                        }
                    });
                } else {

                }
                x.tableServers = tables ;
                var x =self.utils.detectCircularProblemsWith(x)
                var str = sh.toJSONString(x);
                res.send(str);
                return;
                self.settings.peers = [];
                self.settings.cluster_config.peers = [];
                var str = sh.toJSONString(self.settings)
                self.settings.cluster_config.peers = peers;
                self.settings.peers = peers;
                res.send(str)
            }

            self.app.get('/getConfig',  self.getConfig );

            self.getPeers = function getPeers (req, res) {
                var peers = self.settings.peers;
                var cfg = self.utils.cloneSettings();
                cfg.cluster_config.peers = peers;
                cfg.peers = peers;
                var x =self.utils.detectCircularProblemsWith(self.settings)
                var tables = {};
                x.tableServers = tables ;
                var x =self.utils.detectCircularProblemsWith(x)
                var x = {}
                x.peers = self.dictIptoPeers;
                x.name = self.settings.name;
                x.ip = self.ip;
                x.peers2 = self.settings.peers;
                var str = sh.toJSONString(x);
                res.send(str);
                return;

            }
            self.app.get('/getPeers',  self.getPeers );

            self.listRecords = function listRecords(req, res) {
                var query = {}
                query.limit = 4
                self.dbHelper2.search(query, function gotAllRecords(recs){
                    // var str = sh.toJSONString(recs)
                    // res.send(str)
                    res.send(recs);
                } )

            }

            self.app.get('/listRecords',  self.listRecords );
            //function (req, res) {});

            self.dbUpdateSettings = function dbUpdateSettings(req, res) {

                var query = req.query;


                var updateX = false;
                var skipProps = [];
                skipProps = ['syncPassword', 'tableName', 'ip', 'port']
                sh.each(query, function copyToSettingsObject(k,v) {
                    if ( sh.includes(skipProps, k)) {
                        return;
                    }
                    self.proc('updated', k, v)
                    self.settings[k] = v;
                    if ( v == 'syncTime') {
                        updateX = true
                    }
                })


                if ( updateX ) {
                    self.setupAutoSync();
                }


                res.send({sttatus:'ok'})

            }

            self.app.get('/dbUpdateSettings',  self.dbUpdateSettings );


            self.addRecords = function addRecord(req, res) {
                var item = {name: "test new" + self.settings.name + ' '}
                if (  req.query != null ) {
                    item = req.query
                }
                self.dbHelper2.addNewRecord(item, saveRecord);
                function saveRecord(recs){
                    res.send(recs);
                };

            }

            self.app.get('/addRecord',  self.addRecords );


            self.app.get('/countRecords', self.getCount );



            self.getPeersInfo = function getPeersInfo(req, res) {
                var item = {name: "test new" + self.settings.name + ' '}
                if (  req.query != null ) {
                    item = req.query
                }

                res.send({});
                return;


                self.dbHelper2.addNewRecord(item, saveRecord);
                function saveRecord(recs){
                    res.send(recs);
                };

            }

            self.app.get('/getPeersInfo',  self.getPeersInfo );


            self.isClusterSynced = function isClusterSynced(req, res) {
                //why: will call count action
                req.query = {};
                req.query.type = 'count'
                req.query.fromPeer = '?'
                var fxOldSend  = res.send;
                console.log('ok')
                res.send = function onResult(data) {

                    var synced = true;


                    var homeVersion = null
                    function process(obj, x,y) {

                        var vvv = new Date(obj.v).getTime();
                        if ( homeVersion == null ) {
                            homeVersion = vvv;
                            vvv = 0
                        }
                        else {
                            vvv =   vvv - homeVersion;
                            if ( vvv != 0 ){
                                synced = false;
                                data.synced = synced
                                obj.synced = false;
                            }
                            vvv =  (vvv / 1000).toFixed()
                            if ( Math.abs(vvv) < 60 ) {
                                vvv += 's'
                            }else {
                                vvv = (vvv / 60).toFixed()
                                if (  Math.abs(vvv) < 60 ) {
                                    vvv += 'm'
                                } else {
                                    vvv = (vvv / 60).toFixed()
                                    if (  Math.abs(vvv) < 60 ) {
                                        vvv += 'h'
                                    } else {
                                        vvv =  (vvv / 24).toFixed()
                                        if (  Math.abs(vvv) < 60 ) {
                                            vvv += 'd'
                                        }
                                    }
                                }

                            }

                        }

                        if ( obj.nestedResults == null ) return;
                        sh.each(obj.nestedResults, function procNested(k,nestedObj) {
                            process(nestedObj, x+1, k+y+1)
                        })
                    }
                    process(data, 1,1)


                    data.synced = synced;
                    fxOldSend.apply(res, [data])
                    //req.apply()
                }
                self.atomicAction(req, res)
            }
            self.app.get('/isClusterSynced',  self.isClusterSynced );


            self.deleteRecord = function deleteRecord(req, res) {
                //why: will call count action
                //delete record the 'wrong' way ... simple removing a record will require a full sync
                //TODO: Add incremental sync
                var id = 0;
                if (req.params.id != null ) {
                    id = req.params.id
                }
                self.dbHelper2.deleteRecord(id, function () {
                    res.status(410)
                    res.send({status:"gone"})
                })
            }
            self.app.get('/deleteRecord/:id',  self.deleteRecord );

            self.purgeRecord = function purgeRecord(req, res) {
                //why: remove record appropriately
                var id = 0;
                if (req.params.id != null ) {
                    id = req.params.id
                }
                self.dbHelper2.getById(id, function (record) {
                    if ( record == null) {

                        res.status(404)
                        res.send({status:"not found"})
                        return
                    }
                    var attrs = record.dataValues
                    attrs.deleted = true;
                    self.dbHelper2.updateRecord(record,onRecordDeletedProperly )
                    function onRecordDeletedProperly(oo) {
                        res.status(410)
                        res.send({status:"deleted"})
                    };
                });

            }
            self.app.get('/purgeRecord/:id',  self.purgeRecord );


            self.addPeer = function addPeer (req, res) {

                var peerName = req.query.peerName;
                var peerIp = req.query.peerIp;

                var newPeerConfigObj = {};
                newPeerConfigObj[peerName]=peerIp;
                self.settings.cluster_config.peers.push(newPeerConfigObj);
                //
                //var peers = self.settings.peers;
                self.identify();
                var result = {}
                result.ok = true
                res.send(result);
                return;
            }
            self.app.get('/addPeer',  self.addPeer );
        }





    }
    defineDBMethods();

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        var args = sh.convertArgumentsToArray(arguments)
        args.unshift(self.settings.name)
        sh.sLog(args);
    }
}

exports.DalDashboardHelpers = DalDashboardHelpers;

if (module.parent == null) {
    var service = new SQLSharingServer()
    service.init()
    return;
}