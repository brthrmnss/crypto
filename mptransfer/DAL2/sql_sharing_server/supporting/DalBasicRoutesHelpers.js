/**
 * Created by user on 1/3/16.
 */

var rh = require('rhelpers');
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var express = require('express');
var SequelizeHelper = shelpers.SequelizeHelper;
var EasyRemoteTester = shelpers.EasyRemoteTester;
var querystring = require('querystring');

function DalBasicRoutesHelpers(_self) {
    var p = DalBasicRoutesHelpers.prototype;
    p = this;
    var self = this;
    if (_self) {
        self = _self;
        p = self
    }

    function defineRoutes() {
        self.showCluster = function showCluster(req, res) {
            res.send(self.settings);
        };
        self.showTable = function showCluster(req, res) {
            res.send('ok');
        };


        self.verifySync = function verifySync(req, res) {
            if (self.settings.block) {
                self.proc(self.settings.name, 'block')
                return;
            }
            self.pull2(function syncComplete(ok) {
                var result = {};
                result.ok = ok;
                res.send(result);
            });

        };

        self.syncInX = self.syncIn = function syncIn_pullAction(req, res) {
            if (self.data.breakpoint) {
                console.error('at breakpoint')
            }

            if (self.settings.block) {
                self.proc(self.settings.name, 'block')
                //throw new Error('... blocked ....')
                return;
            }
            ;
            var incremental = false;
            if (req.originalUrl.indexOf('getTableDataIncre') != -1) {
                incremental = true;
            }
            ;

            var synchronousMode = req.query.sync == "true";
            var config = {};
            config.skipPeer = req.query.fromPeer;
            self.pullRecordsFromPeers(function syncComplete(result) {
                if (synchronousMode == false) {
                    if (sh.isFunction(res)) {
                        res(result);
                        return;
                    }
                    res.send('ok');
                   // sh.cid(fxDone, self, 'ok')
                }
            }, incremental, config);

            if (synchronousMode) {
                res.send('ok');
            }
        };

        self.syncReverse2  = function syncReverse2(req, res) {
            res.send('....')
        }
        self.syncReverseX = self.syncReverse = function syncReverse(req, res) {
            //asdf.g
            if (self.settings.block) {
                self.proc(self.settings.name, 'block')
                asdf.g
                return;
            }
            var itConfig = {};
            var fromPeer = req.query.fromPeer;
            itConfig.skipPeer = fromPeer; //why: don't try to sync bakc to pper yet
            if (req.query.oneshot == 'true') {
                itConfig.onlySyncPeer = itConfig.skipPeer;
                itConfig.skipPeer = null;
            }
            if (fromPeer == null) {
                throw new Error('need peer')
            } ;

            // self.proc('syncReverse', self.settings.name, )
            self.utils.forEachPeer(fxEachPeer, fxComplete);

            function fxEachPeer(ip, fxDone___) {
                var config = {showBody: false};
                /*if ( self.utils.peerHelper.skipPeer(fromPeer, ip)) {
                 fxDone()
                 return;
                 }*/

                var peerName = self.utils.peerHelper.getPeerNameFromIp(ip);

                if (itConfig.skipPeer && peerName == itConfig.skipPeer) {
                    //asdf.g
                    /*fxDone();
                     return;*/
                }

                if (itConfig.onlySyncPeer && peerName != itConfig.onlySyncPeer) {
                    /*fxDone();
                     return;*/ //TODO: 8/25/2016: This is not good to have
                }

                self.dalLogX('revsync', peerName, req.query.fromPeer);
                self.utils.updateTestConfig(config)
                config.baseUrl = ip;
                var t2 = EasyRemoteTester.create('Sync Peer', config);
                var urls = {};
                urls.syncIn = t2.utils.createTestingUrl('syncIn');
                var reqData = {};
                reqData.data = 0
                t2.getR(urls.syncIn).why('get syncronize the other side')
                    .with(reqData).storeResponseProp('count', 'count')
                // t.addSync(fxDone)
                t2.add(function onFinishedWithSyncIn_syncReverse() {
                    self.proc('you ready...')
                    fxDone___()
                    t2.cb();
                })
                //fxDone();
            }


            var y = new sh.TwoCallHelper();
            function fxComplete(ok) {
                var result = {};
                y.addX('called once')
                result.ok = ok;
                self.proc('finishing this request...', res.name)
                if (sh.isFunction(res)) {
                    res(result, self);
                    return;
                }
               // sh.cid(fxDone_Fx, result, self, 'ok')
                res.send(result);
            }
        };


        /**
         * Delete all deleted records
         * Forces a sync with all peers to ensure errors are not propogated
         * @param req
         * @param res
         */
        self.purgeDeletedRecords = function purgeDeletedRecords(req, res) {
            if (self.settings.block) {
                self.proc(self.settings.name, 'block')
                return;
            }
            var fromPeer = self.utils.getPeerForRequest(req);

            var fromPeerChain = req.query.fromPeerChain;
            fromPeerChain = sh.dv(fromPeerChain, fromPeer + (self.settings.name));

            var config = {showBody: false};
            self.utils.updateTestConfig(config);
            //config.baseUrl = ip;
            var t = EasyRemoteTester.create('Delete Purged Records', config);
            var urls = {};

            var secondStep = false;
            if (req.query.secondStep == 'true') {
                secondStep = true
            }

            var reqData = {};
            reqData.data = 0

            if (secondStep != true) { //if this is first innovacation (not subsequent invocaiton on peers)
                /*t.getR(urls.syncIn).why('get syncronize the other side')
                 .with(reqData).storeResponseProp('count', 'count')
                 // t.addSync(fxDone)
                 t.add(function(){
                 fxDone()
                 t.cb();
                 })*/

                t.add(function step1_syncIn_allPeers() {
                    self.syncIn(req, t.cb)
                });
                t.add(function step2_syncOut_allPeers() {
                    self.syncReverse(req, t.cb)
                });
                t.add(function step3_purgeDeleteRecords_onAllPeers() {
                    self.utils.forEachPeer(fxEachPeer, fxComplete);
                    function fxEachPeer(ip, fxDone) {
                        var config = {showBody: false};
                        config.baseUrl = ip;
                        self.utils.updateTestConfig(config)
                        var t2 = EasyRemoteTester.create('Purge records on peers', config);
                        var reqData = {};
                        reqData.secondStep = true; //prevent repeat of process
                        reqData.fromPeer = self.settings.name;
                        reqData.fromPeerIp = self.settings.ip;
                        reqData.fromPeerChain = fromPeerChain + '__' + self.settings.name
                        if (self.utils.peerHelper.skipPeer(fromPeer, ip)) {
                            fxDone()
                            return;
                        }
                        urls.purgeDeletedRecords = t2.utils.createTestingUrl('purgeDeletedRecords');
                        urls.purgeDeletedRecords += self.utils.url.appendUrl(self.utils.url.from(ip))
                        t2.getR(urls.purgeDeletedRecords).why('...')
                            .with(reqData)
                        t2.add(function () {
                            fxDone()
                            t2.cb();
                        })
                    }

                    function fxComplete(ok) {
                        t.cb();
                    }


                    // self.syncReverse(req, t.cb)
                });


            } else {
                //sync from all other peers ... ?
                //skip the peer that started this sync ? ...

                /*t.add(function step1_syncIn_allPeers(){
                 self.syncIn(req, t.cb, req.query.fromPeer)
                 });
                 t.add(function step2_syncOut_allPeers(){
                 self.syncReverse(req, t.cb,  req.query.fromPeer)
                 });*/
                t.add(function step1_updateAll_OtherPeers() {
                    var skipPeer = req.query.fromPeer;
                    self.utils.forEachPeer(fxEachPeer, fxComplete);
                    function fxEachPeer(ip, fxDone) {
                        if (self.utils.peerHelper.skipPeer(fromPeer, ip)) {
                            fxDone()
                            return;
                        }
                        ;

                        var config = {showBody: false};
                        self.utils.updateTestConfig(config);
                        config.baseUrl = ip;
                        var t2 = EasyRemoteTester.create('Purge records on peers', config);
                        var reqData = {};
                        reqData.secondStep = true; //prevent repeat of process
                        reqData.fromPeer = self.settings.name;
                        reqData.fromPeerChain = fromPeerChain + '__' + self.settings.name
                        reqData.xPath = sh.dv(reqData.xPath, '')
                        reqData.xPath += '_' + reqData.fromPeer

                        urls.syncIn = t2.utils.createTestingUrl('syncIn');
                        urls.syncReverse = t2.utils.createTestingUrl('syncReverse');
                        urls.purgeDeletedRecords = t2.utils.createTestingUrl('purgeDeletedRecords');
                        urls.purgeDeletedRecords += self.utils.url.appendUrl(self.utils.url.from(ip))
                        t2.getR(urls.syncIn).why('...')
                            .with(reqData)
                        t2.getR(urls.syncReverse).why('...')
                            .with(reqData)
                        t2.getR(urls.purgeDeletedRecords).why('...')
                            .with(reqData)
                        t2.add(function () {
                            fxDone()
                            t2.cb();
                        })
                    }

                    function fxComplete(ok) {
                        t.cb();
                    }
                });
            }

            t.add(function step4_purgeRecordsLocally() {
                self.dbHelper2.purgeDeletedRecords(recordsDeleted);

                function recordsDeleted() {
                    var result = {}
                    result.ok = true;
                    res.send(result)
                }
            });

        }

        /**
         * Do an action on all nodes in cluster.
         * @param req
         * @param res
         */
        self.atomicAction = function atomicAction(req, res) {
            if (self.settings.block) {
                self.proc(self.settings.name, 'block')
                return;
            }
            var fromPeer = self.utils.getPeerForRequest(req);
            if (fromPeer == '?') {
                fromPeer = self.settings.name;
                //  asdf.g
                self.dalLogReset()
                var initialRequest = true;
            }
            var eoc  = 'end-of-chain'
            var startingNodeName = ['{{{',self.settings.name, '}}}'].join('')
            //if fromPeer not in list .... drop request ...
            var fromPeerChain = req.query.fromPeerChain;
            if (fromPeerChain == null) {
                var chainStartingNode = true;
            }
            if (chainStartingNode) {
                fromPeerChain = '{{{' + self.settings.name
            } else {

                if (
                    fromPeerChain.includes(
                        startingNodeName
                    )
                ) {
                    console.error('skpped a chain')
                    res.send(eoc)
                    return
                }

                fromPeerChain = sh.dv(fromPeerChain, fromPeer + '-->' + (self.settings.name));
            }


            var config = {showBody: false};
            config.silent = true
            self.utils.updateTestConfig(config);
            //config.baseUrl = ip;f
            var tOuter = EasyRemoteTester.create('Commit atomic action', config);
            var urls = {};

            var secondStep = false;
            if (req.query.secondStep == 'true') {
                secondStep = true
            }
            var allowRepeating = true;

            var reqData = {};
            reqData.data = 0
            var records = req.query.records;
            var actionType = req.query.type;
            var level = reqData.level


            self.dalLog("atomicAction", self.settings.name, actionType, level, fromPeer, fromPeerChain)

            if (level == null) {
                level = 0
            }
            if (actionType == 'update') {
                if (records == null || records.length == 0) {
                    var result = {}
                    result.status = false
                    result.msg = 'no records sent ... cannot update'
                    res.status(410)
                    res.send(result)
                    return

                }
            }


            if (actionType == null) {
                throw new Error('need action type')
            }


            var nestedResults = {};
            //if ( secondStep != true || allowRepeating ) { //if this is first innovacation (not subsequent invocaiton on peers)

            /*t.add(function step1_syncIn_allPeers(){
             self.syncIn(req, t.cb)
             });
             t.add(function step2_syncOut_allPeers(){
             self.syncReverse(req, t.cb)
             });*/
            tOuter.add(function sendActionToAllPeers() {
                self.utils.forEachPeer(fxEachPeer, fxComplete);
                function fxEachPeer(ip, fxDone) {
                    if (self.utils.peerHelper.skipPeer(fromPeer, ip)) {
                        fxDone();
                        return;
                    }

                    //if ( fromPeerChain.includes(ss.qq()))

                    var config = {showBody: false};
                    config.baseUrl = ip;
                    config.silent = true
                    self.utils.updateTestConfig(config)
                    var t2 = EasyRemoteTester.create('Commit atomic on peers', config);
                    var reqData = {};
                    reqData.secondStep = true; //prevent repeat of process
                    reqData.level = level;
                    reqData.records = req.query.records;
                    reqData.type = req.query.type;
                    reqData.fromPeer = self.settings.name;
                    reqData.fromPeerIp = self.settings.ip;
                    /*  if ( self.settings.name == fromPeerChain ) {
                     reqData.fromPeerChain = '{{{' + self.settings.name
                     } else {*/


                    if (chainStartingNode != true) {
                        reqData.fromPeerChain = fromPeerChain + '}}}' + sh.qq(self.settings.name)
                    } else {
                        reqData.fromPeerChain = fromPeerChain
                    }
                    //}


                    console.error('step 1', req.level, reqData.fromPeer, ip)
                    urls.atomicAction = t2.utils.createTestingUrl('atomicAction');
                    urls.atomicAction += self.utils.url.appendUrl(
                        self.utils.url.from(ip),
                        {type: actionType})
                    t2.getR(urls.atomicAction).why('...')
                        .with(reqData)
                        .fxDone(function onReqDone(data) {
                            if (data == eoc) {
                                return;
                            }
                            if (actionType == 'count') {
                                nestedResults[data.name] = data;
                            }
                            //return data; //return will end call
                        })
                    t2.add(function () {
                        fxDone()
                        t2.cb();
                    })
                }

                function fxComplete(ok) {

                    tOuter.cb();
                }
            });


            // } else {


            //
            if (actionType == 'sync' && false) { //this just takes longer,
                //not gaurnateed to work
                tOuter.add(function step1_updateAll_OtherPeers() {


                    var skipPeer = req.query.fromPeer;
                    self.utils.forEachPeer(fxEachPeer, fxComplete);
                    function fxEachPeer(ip, fxDone) {
                        if (self.utils.peerHelper.skipPeer(fromPeer, ip)) {
                            fxDone();
                            return;
                        }
                        ;

                        var config = {showBody: false};
                        config.silent = true
                        self.utils.updateTestConfig(config);
                        config.baseUrl = ip;
                        console.error('step 2', req.level, self.settings.name, ip)
                        var t2 = EasyRemoteTester.create('Purge records on peers', config);
                        var reqData = {};
                        reqData.secondStep = true; //prevent repeat of process
                        reqData.fromPeer = self.settings.name;
                        reqData.fromPeerChain = fromPeerChain + '>>>' + self.settings.name
                        reqData.xPath = sh.dv(reqData.xPath, '')
                        reqData.xPath += '_' + reqData.fromPeer
                        reqData.records = req.query.records;
                        reqData.type = req.query.type;
                        urls.atomicAction = t2.utils.createTestingUrl('atomicAction');
                        urls.atomicAction += self.utils.url.appendUrl(
                            self.utils.url.from(ip),
                            {type: actionType})
                        t2.getR(urls.atomicAction).why('...')
                            .with(reqData)
                        t2.add(function () {
                            fxDone()
                            t2.cb();
                        })
                    }

                    function fxComplete(ok) {
                        tOuter.cb();
                    }
                });
            }
            //}

            tOuter.add(function step4_purgeRecordsLocally() {

                var logOutInput = false;
                if (logOutInput) {
                    console.error('done', req.query.type, self.settings.name)
                }
                if (req.query.type == 'update') {
                    self.dbHelper2.upsert(records, function upserted() {
                        console.error('done2', req.query.type, self.settings.name)
                        //  t.cb();
                        var result = {}
                        result.ok = true;
                        self.proc('return', self.settings.name)
                        res.send(result)
                    });
                } else if (req.query.type == 'sync') {
                    var incremental = true;
                    var config = {};
                    config.skipPeer = req.query.fromPeer;
                    self.pullRecordsFromPeers(function syncComplete(result) {
                        res.send('ok');
                        tOuter.cb()
                    }, incremental, config);
                } else if (req.query.type == 'count') {

                    var incremental = true;
                    var config = {};
                    config.skipPeer = req.query.fromPeer;
                    //todo-reuse real count

                    sh.isEmptyObject = function isEmptyObject(obj) {
                        return !Object.keys(obj).length;
                    }

                    self.dbHelper2.getDBVersion(function onNext(version) {
                        self.dbHelper2.countAll(function gotAllRecords(count) {
                            self.count = count;
                            var result = {
                                name: self.settings.name,
                                v: self.version,
                                count: count
                            }
                            if (!sh.isEmptyObject(nestedResults)) {
                                result.nestedResults = nestedResults
                            }
                            res.send(result);
                            tOuter.cb()
                        }, {});
                    }, {})

                }
                else if (req.query.type == 'delete') {

                    var ids = [records[0].id_timestamp];

                    self.Table.findAll({where: {id_timestamp: ids}})
                        .then(function onX(objs) {
                            if (logOutInput) {
                                console.error('done2', req.query.type, self.settings.name)
                            }
                            //throw new Error('new type specified')
                            self.Table.destroy({where: {id_timestamp: {$in: ids}}})
                                .then(
                                    function upserted() {
                                        //  t.cb();
                                        var result = {}
                                        if (logOutInput) {
                                            console.error('done3', req.query.type, self.settings.name)
                                        }
                                        result.ok = true;
                                        res.send(result)
                                        tOuter.cb()
                                    })
                                .error(function () {
                                    asdf.g
                                });
                        }).error(function () {
                        //  asdf.g
                    })

                } else {
                    throw new Error('... throw it ex ...')
                }
                //self.dbHelper2.purgeDeletedRecords( recordsDeleted);

                /* function recordsDeleted() {
                 var result = {}
                 result.ok = true;
                 res.send(result)
                 }*/
            });


            tOuter.add(function debug() {
                // asdf.g
                if (initialRequest) {
                    self.dalLogDump();
                }
            })
        }

        self.getCount = function getCount(req, res) {

            if (self.settings.block) {
                self.proc(self.settings.name, 'block')
                return;
            }

            //count records in db with my source
            /*
             q: do get all records? only records with me as source ..
             // only records that are NOT related to user on other side
             */


            var query = {}
            if (req.query.global_updated_at != null) {

                var dateSet = new Date()
                var dateInt = parseInt(req.query.global_updated_at)
                if (isNaN(dateInt)) {
                    var dateSet = new Date(req.query.global_updated_at);
                } else {
                    var dateSet = new Date(dateInt);
                }

                if (isNaN(dateSet.getTime())) {
                    throw new Error('dateSet GetTime is bad ' +
                        req.query.global_updated_at)
                }

                //throw new Error('why are you couunting things ? 8/3/2016') //Answer -- during a sync don't want to go backwards
                query.where = {global_updated_at: {$gt: dateSet}};
                query.order = ['global_updated_at', 'DESC']
            }

            self.proc('who is request from', req.query.peerName);

            self.dbHelper2.getDBVersion(function onNext(version) {
                self.dbHelper2.countAll(function gotAllRecords(count) {
                    self.count = count;
                    var result = {
                        count: count,
                        v: self.version,
                        name: self.settings.name
                    }
                    console.error('776-what is count',
                        req.query.peerName,
                        self.settings.name, result, query)
                    res.send(result);
                    if (req.query.global_updated_at != null) {
                        var dbg = dateSet;
                        return;
                    }
                }, query);
            }, {})


        };

        self.getSizeOfPeer = self.getSize = function getSize(cb) {
            var y = new sh.TwoCallHelper();
            self.dbHelper2.count(function getSize_gotRecordCount(count) {
                self.count = count;
                self.size = count;
                console.error('----s getSize', self.settings.name, count, cb.name)
                y.addX('dfsdf')
                sh.callIfDefined(cb,count)
            })
        }

        self.getRecords = function getRecords(req, res) {
            res.statusCode = 404
            res.send('not found')
            return; //Blocked for performance reasons
            var query = {}
            if (req.query.global_updated_at != null) {
                var dateSet = new Date()
                var dateInt = parseInt(req.query.global_updated_at)
                var dateSet = new Date(dateInt);
                query.where = {global_updated_at: {$gt: dateSet}};
            }
            query.order = ['global_updated_at', 'DESC']
            self.dbHelper2.search(query, function gotAllRecords(recs) {
                self.recs = recs;
                res.send(recs);
            })
        };
        self.getNextPage = function getRecords(req, res) {

            //self.dalLog("\t\t\t", 'onGotNextPage-search-start-a', actorsStr , JSON.stringify(query) )


            var fxH = {};
            fxH.debug = false;


            var query = {}
            query.where = {};
            if (req.query.global_updated_at != null) {
                var dateSet = new Date()
                var dateInt = parseInt(req.query.global_updated_at)
                var dateSet = new Date(req.query.global_updated_at);
                query.where = {global_updated_at: {$gt: dateSet}};
            }
            if (self.data.breakpoint_catchPageRequests) {
                console.error('at breakpoint_catchPageRequests')
            }

            if ( self.settings.syncPassword ) {
                if ( self.settings.syncPassword != req.query.syncPasswordReq ) {
                    res.statusCode = 404
                    res.send('not foundz')
                    return;
                }
                self.proc('sss', self.settings.syncPassword)

            }

            query.order = ['global_updated_at', 'DESC']
            query.limit = self.settings.updateLimit;
            if (req.query.offset != null) {
                query.offset = req.query.offset;
            }


            var actorsStr = self.settings.name + '-?->' + req.query.peerName
            //self.dalLog("\t\t\t", 'onGotNextPage-getNextPage', actorsStr , JSON.stringify(query) )
            if (actorsStr == 'd-?->b') {
                var y = {};
            }

            if (actorsStr == 'b-?->d') {
                var y = {};
            }

            //self.dalLog("\t\t\t", 'onGotNextPage-search-start', actorsStr , JSON.stringify(query) )

            self.dbHelper2.search(query, function gotAllRecords(recs) {
                self.recs = recs;
                if (self.data.breakpoint_catchPageRequests) {
                    console.error('at breakpoint_catchPageRequests')
                }
                if ( fxH.debug ) {
                    console.log('>>>>>>>>')
                    self.proc('sent back', sh.paren(self.settings.name), self.recs.length, req.query.offset)
                }
                //Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `aAs` AS `aA` WHERE `aA`.`global_updated_at` > '2016-08-02 18:29:30.000 +00:00' ORDER BY `global_updated_at`, `DESC` LIMIT 1000;
                //2016-08-02T18:29:30.976Z
                //zself.dalLog("\t\t\t", 'onGotNextPage-search-result', actorsStr , JSON.stringify(query), recs.length, self.settings.name)
                //recs.yyy = 'yud'+actorsStr
                res.send(recs);
            })
        };

        p.createSharingRoutes = function createSharingRoutes() {
            self.app.get('/showCluster', self.showCluster);
            self.app.get('/showTable/:tableName', self.showTable);
            self.app.get('/getTableData/:tableName', self.syncIn);

            self.app.get('/getTableData', self.syncIn);

            self.app.get('/getTableDataIncremental', self.syncIn);
            self.app.get('/count', self.getCount);
            self.app.get('/getRecords', self.getRecords);
            self.app.get('/getNextPage', self.getNextPage);

            self.app.get('/verifySync', self.verifySync);

            self.app.get('/syncReverse', self.syncReverse);
            self.app.get('/syncReverse2', self.syncReverse2);
            self.app.get('/syncIn', self.syncIn);
            self.app.get('/pull', self.syncIn);

            self.app.get('/purgeDeletedRecords', self.purgeDeletedRecords);
            self.app.get('/atomicAction', self.atomicAction);
            //self.app.get('/syncRecords', self.syncRecords );
        };
    }

    defineRoutes();

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        var args = sh.convertArgumentsToArray(arguments)
        args.unshift(self.settings.name)
        sh.sLog(args);
    }
}

exports.DalBasicRoutesHelpers = DalBasicRoutesHelpers;

if (module.parent == null) {
    var service = new SQLSharingServer()
    service.init()
    return;
}