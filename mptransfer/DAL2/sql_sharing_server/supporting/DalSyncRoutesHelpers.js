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

function DalSyncRoutesHelpers(_self) {
    var p = DalSyncRoutesHelpers.prototype;
    p = this;
    var self = this;
    if (_self) {
        self = _self;
        p = self
    }


    function defineAutoSync() {
        p.setupAutoSync = function setupAutoSync(setTimeTo) {
            if (setTimeTo) {
                self.settings.syncTime = setTimeTo;
            }
            if (setTimeTo === false) {
                self.settings.syncTime = 0;
            }

            if (self.settings.syncTime > 0 && self.settings.enableAutoSync) {
                clearInterval(self.data.autoSyncInt)
                self.data.autoSyncInt = setInterval(
                    self.autoSync,
                    self.settings.syncTime * 1000)

            }
            else {
                return;
            }
        }

        p.autoSync = function autoSync() {
            var incremental = true;
            var config = {};
            config.skipPeer = req.query.fromPeer;
            self.pull(function syncComplete(result) {
                //res.send('ok');
                self.proc('auto synced...')
            }, incremental, config);
        }
    }

    defineAutoSync()

    function defineSyncRoutines() {
        self.sync = {};


        /**
         * Ping all peers, in async, pull from each peer
         * @param cb
         */
        self.pullRecordsFromPeers = function pullRecordsFromPeers(cb, incremental) {

            if (self.data.breakpoint) {
                console.error('at breakpoint')
            }


            sh.each(self.settings.peers, function onCheckPeer(k, peerIp) {
                sh.str.isBlank(peerIp, 'peer ip is not set')
                sh.callIfDefined(cb)
            })

            //self.dalLog("^^^", 'pullRecordsFromPeers', self.settings.name     )

            /*
             TODO: filter based on params
             var  itConfig = {};
             var fromPeer = req.query.fromPeer;
             itConfig.skipPeer =  fromPeer; //why: don't try to sync bakc to pper yet
             if ( req.query.oneshot == 'true' ){
             itConfig.onlySyncPeer = itConfig.skipPeer;
             itConfig.skipPeer= null;
             }
             if ( fromPeer == null ) {
             throw new Error('need peer')
             };
             */

            self.pulling = true;

            sh.async(self.settings.peers,
                function syncPeer(peerIp, fxDoneSync) {
                    sh.str.isBlank(peerIp, 'peer ip is not set')
                    self.sync.syncPeer(peerIp, function syncedPeer() {
                        fxDoneSync()
                    }, incremental);
                }, function allDone() {
                    self.proc('all records synced');
                    sh.callIfDefined(cb)
                })
            return;
            /*
             async
             syncpeer
             get count after udapted time, or null
             offset by 100
             get count afater last updated time
             next
             res.send('ok');
             */
        };
        self.pull = self.pullRecordsFromPeers


        /**
         * Get count ,
         * offset by 1000
         * very count is same
         * @param ip
         * @param cb
         */
        self.sync.syncPeer = function syncPeer(ip, cb, incremental) {
            var config = {showBody: false};
            config.baseUrl = ip;
            self.utils.updateTestConfig(config)
            var t = EasyRemoteTester.create('Sync Peer', config);

            var urls = {};

            urls.getCount = t.utils.createTestingUrl('count');
            urls.getRecords = t.utils.createTestingUrl('getRecords');
            urls.getNextPage = t.utils.createTestingUrl('getNextPage');
            urls.syncReverse = t.utils.createTestingUrl('syncReverse');
            urls.pull = t.utils.createTestingUrl('pull');

            /*
             urls.getCount += self.utils.url.appendUrl(self.utils.url.from(ip))
             urls.getRecords   += self.utils.url.appendUrl(self.utils.url.from(ip))
             urls.getNextPage    += self.utils.url.appendUrl(self.utils.url.from(ip))
             */
            if (self.dictPeerSyncTime == null)
                self.dictPeerSyncTime = {};

            var reqData = {};
            reqData.peerName = self.settings.peerName;
            if (incremental) {
                if (self.dictPeerSyncTime[ip] != null) {
                    reqData.global_updated_at = self.dictPeerSyncTime[ip]
                }
                reqData.incremental = true;
            }

            var peerName = self.utils.peerHelper.getPeerNameFromIp(ip)
            var actorsStr = self.settings.name + '-->' + peerName

            var peerName = self.utils.peerHelper.getPeerNameFromIp(ip)
            var actorsStr = self.settings.name + '-->' + peerName


            function getUrlDebugTag(t) {
                var urlTag = '?a' + '=' + actorsStr + '&' +
                    'of=' + t.offset
                return urlTag
            }

            self.proc('syncing peer', actorsStr);
            self.dalLog('syncing peer', actorsStr)

            t.recordsAll = [];
            t.recordUpdateCount = 0;
            t.iterations = 0
            t.matches = [];
            t.offset = 0;

            // self.log
            t.getR(urls.getCount).why('get getCount')
                .with(reqData)
                //.storeResponseProp('count', 'count')
                //.storeResponseProp('version', 'v')
                .fxDone(function onGotCount(data, res, error) {
                    if (error) {
                        //debugger;
                        self.proc('error...', 'aborting', error);
                        cb();
                        return false;
                    }
                    t.data.count = data.count;
                    t.data.version = data.v;
                    return;
                });


            /* t.add(function getRecordCount(){
             var y = t.data.count;
             t.cb();
             });*/


            /* t.add(function syncRecourds(){
             t.quickRequest( urls.getRecords,
             'get', result, reqData);
             function result(body) {
             t.assert(body.length!=null, 'no page');
             t.records = body;
             t.recordsAll = t.recordsAll.concat(body);
             t.cb();
             };
             });

             t.add(function filterNewRecordsForPeerSrc(){
             t.cb();
             })
             t.add(function upsertRecords(){
             self.dbHelper2.upsert(t.records, function upserted(){
             t.cb();
             })
             })

             */

            if (self.data.breakpoint) {
                console.error('at breakpoint')
            }


            t.add(getRecordsUntilFinished);
            function getRecordsUntilFinished() {
                self.dalLog("\t\t", 'onGotNextPageX-pre-attempt', actorsStr,
                    t.offset, urls.getNextPage + getUrlDebugTag(t))

                t.quickRequest(urls.getNextPage + getUrlDebugTag(t),
                    'get', onGotNextPage, reqData);
                if (actorsStr == 'd-->b') {
                    var y = {};
                    debugger;
                }
                function onGotNextPage(body, resp, error) {
                    if (body == null) {
                        //debugger
                    }
                    if (error) {
                        self.proc('error...', 'aborting', error);
                        cb();
                        return;
                    }
                    self.dalLog("\t\t", 'onGotNextPageX-attempt', self.settings.name, actorsStr, t.offset, body.length)
                    if (actorsStr == 'd-->b') {
                        var y = {};
                        debugger;
                    }
                    t.assert(body.length != null, 'no page');
                    if (body.length != 0) {
                        //reqData.global_updated_at = body[0].global_updated_at;

                        t.offset += body.length;
                        reqData.offset = t.offset;

                        t.addNext(function upsertRecords() {
                            self.dbHelper2.upsert(body, function upserted(resultsUpsert) {
                                t.lastRecord_global_updated_at = self.utils.latestDate(t.lastRecord_global_updated_at, resultsUpsert.last_global_at)
                                t.cb();
                            });
                        });
                        //do query for records ... if can't find them, then delete them?
                        //search for 'deleted' record updates, if my versions aren't newer than
                        //deleted versions, then delete thtme
                        t.addNext(function deleteExtraRecords() {
                            //self.dbHelper2.upsert(t.records, function upserted(){
                            t.cb();
                            //});
                        });

                        /*t.addNext(function verifyRecords(){
                         var query = {};
                         var dateFirst = new Date(body[0].global_updated_at);
                         if ( body.length > 1 ) {
                         var dateLast = new Date(body.slice(-1)[0].global_updated_at);
                         } else {
                         dateLast = dateFirst
                         }
                         query.where = {
                         global_updated_at: {$gte:dateFirst},
                         $and: {
                         global_updated_at: {$lte:dateLast}
                         }
                         };
                         query.order = ['global_updated_at',  'DESC'];
                         self.dbHelper2.search(query, function gotAllRecords(recs){
                         var yquery = query;
                         var match = self.dbHelper2.compareTables(recs, body);
                         if ( match != true ) {
                         t.matches.push(t.iterations)
                         self.proc('match issue on', t.iterations, recs.length, body.length)
                         }
                         t.cb();
                         } )
                         })*/
                        t.addNext(getRecordsUntilFinished)
                    }

                    t.recordUpdateCount += body.length;
                    t.iterations += 1
                    if (t.firstPage == null) t.firstPage = body; //store first record for update global_update_at
                    //no must store last one

                    //t.recordsAll = t.recordsAll.concat(body); //not sure about this
                    t.cb();
                };

                //var recordCount = t.data.count;
                //t.cb();
            }


            t.add(function countRecords() {

                self.dbHelper2.count(function upserted(count) {
                    self.size = count;
                    t.cb();
                })
            })

            t.add(function getVersion() {
                self.dbHelper2.getDBVersion(function upserted(count) {
                    //self.size = count;
                    t.cb();
                });
            })
            t.add(function verifySync() {
                self.lastUpdateSize = t.recordUpdateCount;


                //self.lastRecords = t.recordsAll;
                // var bugOldDate = [t.firstPage[0].global_updated_at,t.lastRecord_global_updated_at];
                //if ( self.lastUpdateSize > 0 )
                //    self.dictPeerSyncTime[ip] = t.firstPage[0].global_updated_at;
                if (t.lastRecord_global_updated_at)
                    self.dictPeerSyncTime[ip] = t.lastRecord_global_updated_at

                var v = new Date(self.version)
                var v2 = new Date(t.data.version)
                var versionDiff = v.getTime() - v2.getTime()

                if (versionDiff > 0) {
                    self.dalLog("\t", 'syncing peer', actorsStr, versionDiff)
                }
                if (v.getTime() != v2.getTime()) {
                    var y = {};
                    // console.clear()
                    console.log('\033c')
                    console.log('\033[2J');
                    console.log('\n\n\n\n\n\n\n');
                    process.stdout.write("\u001b[2J\u001b[0;0H");
                    //why: version do not match, so sync again (size was likely 0)
                    console.error('z4', actorsStr, v.getTime(), 'vs.', v2.getTime())
                    self.proc('z4', actorsStr, v.getTime(), 'vs.', v2.getTime(),
                        'ask other end to get my records', 'SYNC means pull')

                    //cb
                    //return;
                    reqData.fromPeer = self.settings.name;
                    reqData.fromPeerIp = self.settings.ip;
                    reqData.oneshot = true;
                    t.quickRequest(urls.pull + getUrlDebugTag(t),
                        'get', onRevSync, reqData);
                    function onRevSync(data) {
                        //should exist if failed ...
                        self.proc('finished update pull', actorsStr, v.getTime(), 'vs.', v2.getTime(),
                            'ask other end to get my records', data, 'pulled')
                        sh.callIfDefined(cb)
                    }

                    return;
                }


                //self.dalLog("\t",'-syncing peer', actorsStr, versionDiff )

                sh.callIfDefined(cb)
            })

        }


        /**
         * Ping all peers, in async, pull from each peer
         * @param cb
         */
        self.pull2 = function verifyFromPeers(cb, incremental) {
            var resultsPeers = {};
            var result = true;
            self.pulling = true;
            sh.async(self.settings.peers,
                function verifySyncPeer(peerIp, fxDoneSync) {
                    self.proc('verifying peer', peerIp);
                    self.sync.verifySyncPeer(peerIp, function syncedPeer(ok) {
                        resultsPeers[peerIp] = ok
                        if (ok == false) {
                            result = false;
                        }
                        fxDoneSync(ok)
                    }, incremental);
                }, function allDone() {
                    self.proc('all records verified');
                    sh.callIfDefined(cb, result, resultsPeers)
                })
            return;
        };

        /**
         * Ask for each peer record, starting from the bottom
         * @param ip
         * @param cb
         */
        self.sync.verifySyncPeer = function verifyPeer(ip, cb, incremental) {
            var config = {showBody: false};
            config.baseUrl = ip;
            self.utils.updateTestConfig(config);
            var t = EasyRemoteTester.create('Sync Peer', config);
            var urls = {};


            urls.getCount = t.utils.createTestingUrl('count');
            urls.getRecords = t.utils.createTestingUrl('getRecords');
            urls.getNextPage = t.utils.createTestingUrl('getNextPage');

            if (self.dictPeerSyncTime == null)
                self.dictPeerSyncTime = {};

            var reqData = {};
            reqData.peerName = self.settings.peerName;
            reqData.fromPeer = self.settings.peerName;

            t.recordsAll = [];
            t.recordCount = 0;
            t.iterations = 0
            t.matches = [];
            t.offset = 0;

            var peerName = self.utils.peerHelper.getPeerNameFromIp(ip)
            var actorsStr = self.settings.name + '__' + peerName

            function getUrlDebugTag(t) {
                var urlTag = '?a' + '=' + actorsStr + '&' +
                    'of=' + t.offset
                return urlTag
            }

            t.getR(urls.getCount).why('get getCount')
                .with(reqData).storeResponseProp('count', 'count')
            //self.dalLog("\t\t\t", 'onGotNextPage-search-start-a', actorsStr , JSON.stringify(query) )

            t.add(function getRecordCount() {
                var recordCount = t.data.count;
                t.cb();
            });
            t.add(getRecordsUntilFinished);
            function getRecordsUntilFinished() {
                t.quickRequest(urls.getNextPage + getUrlDebugTag(t),
                    'get', onGotNextPage, reqData);
                function onGotNextPage(body) {
                    t.assert(body.length != null, 'no page');
                    if (body.length != 0) {

                        t.offset += body.length;
                        reqData.offset = t.offset;
                        // reqData.global_updated_at = body[0].global_updated_at;

                        t.addNext(function verifyRecords() {
                            var query = {};
                            var dateFirst = new Date(body[0].global_updated_at);
                            if (body.length > 1) {
                                var dateLast = new Date(body.slice(-1)[0].global_updated_at);
                            } else {
                                dateLast = dateFirst
                            }
                            query.where = {
                                global_updated_at: {$gte: dateFirst},
                                $and: {
                                    global_updated_at: {$lte: dateLast}
                                }
                            };
                            query.order = ['global_updated_at', 'DESC'];
                            self.dbHelper2.search(query, function gotAllRecords(recs) {
                                var yquery = query;
                                var match = self.dbHelper2.compareTables(recs, body);
                                if (match != true) {
                                    t.matches.push(t.iterations)
                                    self.proc('match issue on', self.settings.name, peerName, t.iterations, recs.length, body.length)
                                }
                                t.cb();
                            })
                        })
                        t.addNext(getRecordsUntilFinished)
                    }
                    t.recordCount += body.length;
                    t.iterations += 1
                    t.recordsAll = t.recordsAll.concat(body); //not sure about this
                    t.cb();
                };

                //var recordCount = t.data.count;
                //t.cb();
            }


            t.add(function filterNewRecordsForPeerSrc() {
                t.ok = t.matches.length == 0;
                t.cb();
            })
            t.add(function deleteAllRecordsForPeerName() {
                t.cb();
            })
            /* t.add(function countRecords(){
             self.dbHelper2.count(  function upserted(count){
             self.size = count;
             t.cb();
             })
             })*/
            t.add(function verifySync() {
                self.proc('verifying', self.settings.name, self.count, ip, t.recordCount)
                //    self.lastUpdateSize = t.recordsAll.length;
                //  if ( t.recordsAll.length > 0 )
                //        self.dictPeerSyncTime[ip] = t.recordsAll[0].global_updated_at;
                sh.callIfDefined(cb, t.ok)
            })

        }
    }

    defineSyncRoutines();


    function defineUtils() {
        p.utils = {}
        p.utils.getCount = function getCount(fxDone) {
            self.dbHelper2.count(function upserted(count) {
                self.size = count;
                sh.cid(fxDone, count, self)
                //t.cb();
            })
        }
    }

    defineUtils()

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        var args = sh.convertArgumentsToArray(arguments)
        args.unshift(self.settings.name)
        sh.sLog(args);
    }
}

exports.DalSyncRoutesHelpers = DalSyncRoutesHelpers;

if (module.parent == null) {
    var service = new SQLSharingServer()
    service.init()
    return;
}