/**
 * Created by user on 1/13/16.
 */
/**
 * Created by user on 1/3/16.
 */
/*
 TODO:
 Test that records are delete?
 //how to do delete, have a delte colunm to sync dleet eitems
 */
//require('stackup');
var rh = require('rhelpers');
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var express = require('express');
var SequelizeHelper = shelpers.SequelizeHelper;
var EasyRemoteTester = shelpers.EasyRemoteTester;

var SQLSharingServer = require('./sql_sharing_server').SQLSharingServer;


function DbGlueTest() {
    var p = DbGlueTest.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.settings.startingPort = sh.dv(config.startingPort, 12001);

        self.method();
        self.setupOverides();
        self.createConfig()

        sh.catchErrors(function saveAll() {
           // asdfl.g
        })
    }

    p.setupOverides = function setupOverides() {
        var configOverride = {};
        configOverride.mysql = {
            "ip": "127.0.0.1",
            "databasename": "yetidb",
            //"user" : "yetidbuser",
            //"pass" : "aSDDD545y^",
            "port": "3306"
        };
        configOverride.mysql.logging = true;
        rh.configOverride = configOverride;
    }

    p.createConfig = function createConfig() {
        //load confnig frome file
        //peer has gone down ... peer comes back
        //real loading
        //multipe tables

        //define tables to sync and time
        //create 'atomic' modes for create/update and elete
        var cluster_config = {
            peers: [
                {a: "127.0.0.1:12001"},
                {b: "127.0.0.1:12002"}
            ]
        };

        self.data.cluster_config = cluster_config;
        self.data.topology = {};
        self.data.allPeers = [];
        self.data.config = {};
        config.cluster_config = self.data.cluster_config;
        config.port = self.settings.startingPort;
        config.peerName = 'a';
        config.tableName = 'aA';
        config.fxDone = self.t.testInstances
        config.dbConfigOverride = true
        config.dbLogging = false
        config.dbLogging = true
        config.debugUpsert = true
        config.password = 'dirty'
        self.data.baseConfig = config;
    }
    p.createNode = function createNode(name) {
        var service = new SQLSharingServer();
        service.init(self.data.baseConfig);
        var a = service;
        self.data.allPeers.push(service)
        self.data.topology.a = a;
    }
    p.createTestNode = function createNode(name, overrideCfg) {

        var config = sh.clone(self.data.baseConfig);
        sh.mergeObjects(overrideCfg, config)
        config.port = self.settings.startingPort + self.data.allPeers.length;
        config.peerName = name;
        config.tableName = name + 'A';
        /*if (name == 'b' && self.data.allPeers.length+1 == 2) {
         config.fxDone = function on() {
         //asdf.g
         self.t.testInstances(self.data.topology.a, self.data.topology.b)
         }
         }*/


        var service = new SQLSharingServer();
        service.init(config);
        var a = service;
        self.data.allPeers.push(service)
        self.data.topology[name] = a;
    }
    p.method = function method() {
    }

    p.test = function test(config) {
    }

    p.t = {};
    p.t.testInstances = function testInstances(a, b) {
        //make chain
        var sh = require('shelpers').shelpers;
        var shelpers = require('shelpers');
        var EasyRemoteTester = shelpers.EasyRemoteTester;
        var t = EasyRemoteTester.create('Test Channel Server basics',
            {
                showBody: false,
                silent: true
            });

        //t.add(clearAllData())
        self.tests.clearAllData(t)
        t.add(function clearRecordsFrom_A() {
            a.test.destroyAllRecords(true, t.cb);
        })

        t.add(function clearRecordsFrom_B() {
            b.test.destroyAllRecords(true, t.cb);
        })
        ResuableSection_verifySync()
        t.add(function create100Records_A() {
            a.test.createTestData(t.cb)
        })

        t.add(function aPing() {
            //  b.test.destroyAllRecords(true, t.cb);
            // b.ping();
            t.cb();
        })
        t.add(function bPing() {
            //  b.test.destroyAllRecords(true, t.cb);
            t.cb();
        })

        t.add(function bPullARecords() {
            b.pull(t.cb);
        })

        function ResuableSection_verifySync(msg, size) { //verifies size of both peers
            if (msg == null) {
                msg = ''
            }
            msg = ' ' + msg;
            t.add(function getASize() {
                a.getSize(t.cb);
            })
            t.add(function getBSize() {
                b.getSize(t.cb);
            })
            t.add(function testSize() {
                if (size) {
                    t.assert(b.size == size, 'sync did not work (sizes different) a' + [a.size, size] + msg)
                    t.assert(a.size == size, 'sync did not work (sizes different) b' + [b.size, size] + msg)
                }
                t.assert(b.size == a.size, 'sync did not work (sizes different)' + [b.size, a.size] + msg)
                t.cb();
            })
        }

        ResuableSection_verifySync('A and b should be same size', 100);

        function ResuableSection_addRecord() {
            t.add(function addNewRecord() {
                a.dbHelper2.addNewRecord({name: "test new"}, t.cb);
            });
        };
        ResuableSection_addRecord();

        var baseUrl = 'http://127.0.0.1:' + b.settings.port;
        var urls = {};

        //do partial sync
        //sync from http request methods
        //batched sync
        //remove batch tester
        //cluster config if no config sent

        function defineHTTPTestMethods() {
            //var t = EasyRemoteTester.create('Test Channel Server basics',{showBody:false});
            t.settings.baseUrl = baseUrl;
            urls.getTableData = t.utils.createTestingUrl('getTableData');
            urls.syncIn = t.utils.createTestingUrl('syncIn');

            ResuableSection_addRecord();

            t.getR(urls.getTableData).with({sync: false})
            // .bodyHas('status').notEmpty()
                .fxDone(function syncComplete(result) {
                    return;
                });

            ResuableSection_verifySync();
        }

        defineHTTPTestMethods();


        function define_TestIncrementalUpdate() {
            urls.getTableData = t.utils.createTestingUrl('getTableDataIncremental');

            t.getR(urls.getTableData).with({sync: false}) //get all records
                .fxDone(function syncComplete(result) {
                    return;
                })
            t.workChain.utils.wait(1);
            ResuableSection_verifySync('All records are synced')
            ResuableSection_addRecord(); //this record is new, will be ONLY record
            //sent in next update.

            t.addFx(function startBreakpoints() {
                //this is not async ... very dangerous
                topology.b.data.breakpoint = true;
                topology.a.data.breakpoint_catchPageRequests = true;
            })


            t.getR(urls.getTableData).with({sync: false})
                .fxDone(function syncComplete(result) {
                    console.log('>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<')
                    t.assert(b.lastUpdateSize == 1, 'updated wrong # of records updated after pull ' + b.lastUpdateSize)

                    return;
                })


            t.addFx(function removeBreakpoints() {
                topology.b.data.breakpoint = false;
                topology.a.data.breakpoint_catchPageRequests = false;

            })


            ResuableSection_verifySync()
        }

        define_TestIncrementalUpdate();


        function define_TestDataIntegrity() {
            urls.verifySync = t.utils.createTestingUrl('verifySync');
            t.getR(urls.verifySync).with({sync: false, peer: 'a'})
                .fxDone(function syncComplete(result) {
                    t.assert(result.ok == true, 'data not integral ' + result.ok)
                    return;
                });
        }

        define_TestDataIntegrity();


        function define_syncReverse() {
            ResuableSection_addRecord();

            t.add(function addNewRecord() {
                b.dbHelper2.addNewRecord({name: "test newB"}, t.cb);
            });
            t.add(function addNewRecord() {
                b.dbHelper2.addNewRecord({name: "test newB"}, t.cb);
            });

            urls.syncReverse = t.utils.createTestingUrl('syncReverse');


            t.getR(urls.syncReverse).with({sync: false, peer: 'a', fromPeer: '?'})
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })
            t.getR(urls.syncIn).with({sync: false, peer: 'a'})
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })
            ResuableSection_verifySync()
        };
        define_syncReverse();
        ;

        /**
         * Records need to be  marked as 'deleted'
         * otherwise deletion doesn't count
         * @param client
         */
        function forgetRandomRecordFrom(client) {
            if (client == null) {
                client = b
            }
            t.add(function forgetRandomRecord() {
                client.test.forgetRandomRecord(t.cb);
            });
        }

        function deleteRandomRecordFrom(client) {
            if (client == null) {
                client = b
            }
            t.add(function deleteRandomRecord() {
                b.test.deleteRandomRecord(t.cb);
            });
        }

        function syncIn() {
            t.getR(urls.syncIn).with({sync: false, peer: 'a'})
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })
        }

        function syncOut() {
            t.getR(urls.syncReverse).with({sync: false, peer: 'a', fromPeer: 'a'})
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })
        }

        function syncBothDirections() {
            syncIn()
            syncOut()
        }

        function breakTest() {
            t.addFx(function () {
                asdf.g
            })
        }

        function purgeDeletedRecords() {
            urls.purgeDeletedRecords = t.utils.createTestingUrl('purgeDeletedRecords');
            t.getR(urls.purgeDeletedRecords).with({fromPeer: '?'})
                .fxDone(function purgeDeletedRecords_Complete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)

                    return;
                })
        }


        function define_TestDataIntegrity2() {
            forgetRandomRecordFrom();
            t.workChain.utils.wait(1);
            forgetRandomRecordFrom();
            forgetRandomRecordFrom();
            notInSync();
            syncBothDirections()
        }

        define_TestDataIntegrity2();

        function notInSync() {
            t.getR(urls.verifySync).with({sync: false, peer: 'a'})
                .fxDone(function syncComplete(result) {
                    t.assert(result.ok == false, 'data is not supposed to be in sync ' + result.ok);
                    return;
                });
        }

        function inSync() {
            t.getR(urls.verifySync).with({sync: false, peer: 'a'})
                .fxDone(function syncComplete(result) {
                    t.assert(result.ok == true, 'data not inSync ' + result.ok);
                    return;
                });
        }

        function defineBlockSlowTests() {
            function define_ResiliancyTest() {
                forgetRandomRecordFrom();
                forgetRandomRecordFrom(a);
                forgetRandomRecordFrom(a);
                forgetRandomRecordFrom();
                notInSync();
                //notInSync();
                syncBothDirections()
                ResuableSection_verifySync()
                inSync();
            }

            define_ResiliancyTest();

            function define_ResiliancyTest_IllegallyChangedRecords() {
                syncBothDirections()
                ResuableSection_verifySync()
                inSync();
                t.add(function getRecord() {
                    b.test.getRandomRecord(function (rec) {
                        randomRec = rec;
                        t.cb()
                    });
                });
                t.add(function updateRecords() {
                    randomRec.updateAttributes({name: "JJJJ"}).then(t.cb)
                });
                notInSync()
                //resolve
                syncBothDirections()

                notInSync()//did not upldate global date
                t.add(function updateRecords() {
                    randomRec.updateAttributes({global_updated_at: new Date()}).then(t.cb)
                });
                syncBothDirections()
                inSync();
            };
            define_ResiliancyTest_IllegallyChangedRecords();

            function define_multipleNodes() {
                t.add(function defineNewNodes() {
                    augmentNetworkConfiguration()
                    t.cb()
                });
                self.tests.clearAllData(t)

                syncBothDirections()
                ResuableSection_verifySync()
                inSync();
                t.add(function getRecord() {
                    b.test.getRandomRecord(function (rec) {
                        randomRec = rec;
                        t.cb()
                    });
                });
                t.add(function updateRecord_skipUpdateTime() {
                    randomRec.updateAttributes({name: "JJJJ"}).then(t.cb)
                });
                notInSync()
                syncBothDirections()
                notInSync(); //did not upldate global date
                t.add(function updateRecords() {
                    randomRec.updateAttributes({global_updated_at: new Date()}).then(t.cb)
                });
                syncBothDirections();
                inSync();
            };
            define_multipleNodes();
        }

        defineBlockSlowTests()


        function defineSlowTests2() {
            function define_TestDeletes() {
                syncBothDirections()
                ResuableSection_verifySync()
                deleteRandomRecordFrom(b);
                deleteRandomRecordFrom(b);
                ////deleteRandomRecordFrom(topology.c);

                purgeDeletedRecords();

                inSync();

            };
            define_TestDeletes()

            function define_TestDeletes2() {
                t.add(function defineNewNodes() {
                    augmentNetworkConfiguration2()
                    t.cb()
                });
                self.tests.clearAllData(t)
                syncBothDirections()
                ResuableSection_verifySync()
                deleteRandomRecordFrom(b);
                deleteRandomRecordFrom(b);
                ////deleteRandomRecordFrom(topology.c);
                ////deleteRandomRecordFrom(topology.e);

                //syncBothDirections();
                purgeDeletedRecords();
                /*t.add(function getRecord() {
                 b.test.getRandomRecord(function (rec) {
                 randomRec = rec;
                 t.cb()
                 });
                 });
                 t.add(function updateRecords() {
                 randomRec.updateAttributes({name:"JJJJ"}).then( t.cb  )
                 });*/
                //  notInSync()
                // syncBothDirections()
                inSync();

            };
            define_TestDeletes2()
        }

        defineSlowTests2()


        function define_TestHubAndSpoke() {
            t.add(function defineNewNodes() {
                augmentNetworkConfiguration()
                t.cb()
            });
            t.add(function defineNewNodes() {
                augmentNetworkConfiguration2()
                t.cb()
            });
            self.tests.clearAllData(t)


            function addTimer(reason) {
                t.add(function defineNewNodes() {
                    if (t.timer != null) {
                        var diff = sh.time.secs(t.timer)
                        console.log('>');
                        console.log('>');
                        console.log('>');
                        console.log(t.timerReason, 'time', diff);
                        console.log('>');
                        console.log('>');
                        console.log('>');
                    } else {

                    }
                    t.timerReason = reason;
                    t.timer = new Date();
                    t.workChain.utils.wait(1);
                    t.cb()
                });

            }

            addTimer('sync both dirs')
            syncBothDirections()
            addTimer('local sync')
            ResuableSection_verifySync()
            addTimer('deletes')
            deleteRandomRecordFrom(b);
            deleteRandomRecordFrom(b);
            ////deleteRandomRecordFrom(topology.c);
            ////deleteRandomRecordFrom(topology.e);

            addTimer('purge all deletes')
            //syncBothDirections();
            purgeDeletedRecords();
            /*t.add(function getRecord() {
             b.test.getRandomRecord(function (rec) {
             randomRec = rec;
             t.cb()
             });
             });
             t.add(function updateRecords() {
             randomRec.updateAttributes({name:"JJJJ"}).then( t.cb  )
             });*/
            //  notInSync()
            // syncBothDirections()
            addTimer('insync')
            inSync();
            self.tests.inSyncAll(t)
            //TODO: Test sync on N
            //check in sync on furthes node
            addTimer('insyncover')

        };
        define_TestHubAndSpoke()

        // breakTest()

        //TODO: Add index to updated at

        //test from UI
        //let UI log in
        //task page saeerch server

        //account server
        //TODO: To getLastPage for records

        //TODO: replace getRecords, with getLastPage
        //TODO: do delete, so mark record as deleted, store in cache,
        //3x sends, until remove record from database ...

        /*
         when save to delete? after all synced
         mark as deleted,
         ask all peers to sync
         then delete from database if we delete deleted nodes

         do full sync
         if deleteMissing -- will remove all records my peers do not have
         ... risky b/c incomplete database might mess  up things
         ... only delete records thata re marked as deleted
         */

        /*
         TODO:
         test loading config from settings object with proper cluster config
         test auto syncing after 3 secs
         build proper hub and spoke network ....
         add E node that is linked to d (1 hop away)
         */
        /**
         * store global record count
         * Mark random record as deleted,
         * sync
         * remove deleted networks
         * sync
         * ensure record is gone
         */

        //Revisions
    }

    p.t.test2Instances = function testInstances(inst, fxDone) {
        var t = EasyRemoteTester.create('Test Channel Server basics',
            {
                showBody: false,
                silent: true,
                fxDone: fxDone
            });

        sh.throwIf(inst.length != 2, 'wrong number of instances', inst.length, inst)
        t.urls = {};
        var a = inst[0]
        var b = inst[1]
        //t.add(clearAllData())
        self.tests.clearAllData(t)
        self.tests.clearRecordsFromNode(t, a)
        self.tests.clearRecordsFromNode(t, b)

        self.tests.verify2NodesInSync(t, a, b)

        self.tests.create100Records(t, a)
        self.tests.pullRecords(t, b)
        self.tests.syncBothDirections(t, a, b)
        self.tests.verify2NodesInSync(t, a, b, 'A and b should be same size', 100);


        self.tests.addNewRecord(t, a)


        //  var baseUrl = 'http://127.0.0.1:' + b.settings.port;
        // t.settings.baseUrl = baseUrl;

        self.tests.addNewRecordAndTest(t, a, b)
       // return;
        // var baseUrl = 'http://127.0.0.1:' + b.settings.port;
        var urls = {};

        self.tests.define_TestIncrementalUpdate(t, a, b);
       // return;
        self.tests.define_TestDataIntegrity(t, a, b);

       // return;
        self.tests.define_TestDataIntegrity(t, a, b);
        self.tests.define_syncReverse(t, a, b);

        function breakTest() {
            t.addFx(function () {
                asdf.g
            })
        }

        return;
        // define_TestDataIntegrity2();
        self.tests.define_TestDataIntegrity2(t, a, b);

        /*   function notInSync() {
         t.getR(urls.verifySync).with({sync: false, peer: 'a'})
         .fxDone(function syncComplete(result) {
         t.assert(result.ok == false, 'data is not supposed to be in sync ' + result.ok);
         return;
         });
         }

         function inSync() {
         t.getR(urls.verifySync).with({sync: false, peer: 'a'})
         .fxDone(function syncComplete(result) {
         t.assert(result.ok == true, 'data not inSync ' + result.ok);
         return;
         });
         }*/

        function defineBlockSlowTests(t) {
            function define_ResiliancyTest(t) {
                self.tests.forgetRandomRecordFrom(t, b);
                self.tests.forgetRandomRecordFrom(t, a);
                self.tests.forgetRandomRecordFrom(t, a);
                self.tests.forgetRandomRecordFrom(t, b);
                self.tests.notInSync(t, a, b);
                //notInSync();
                self.tests.syncBothDirections(t, a, b)
                self.tests.verify2NodesInSync(t, a, b, 'failed resiliance test')
                self.tests.inSync(t, a, b);
            }

            define_ResiliancyTest(t);

            function define_ResiliancyTest_IllegallyChangedRecords(t) {
                self.tests.syncBothDirections(t, a, b)
                self.tests.verify2NodesInSync(t, a, b, 'failed resiliance test IllegallyChangedRecords')
                t.add(function getRecord() {
                    b.test.getRandomRecord(function (rec) {
                        randomRec = rec;
                        t.cb()
                    });
                });
                t.add(function updateRecords() {
                    randomRec.updateAttributes({name: "JJJJ"}).then(t.cb)
                });
                self.tests.notInSync(t, a, b);
                //resolve
                //syncBothDirections()
                self.tests.syncBothDirections(t, a, b)
                self.tests.notInSync(t, a, b); //did not upldate global date
                t.add(function updateRecords() {
                    randomRec.updateAttributes({global_updated_at: new Date()}).then(t.cb)
                });
                self.tests.syncBothDirections(t, a, b)
                self.tests.inSync(t, a, b);
            };
            define_ResiliancyTest_IllegallyChangedRecords(t);

            function define_multipleNodes() {
                t.add(function defineNewNodes() {
                    augmentNetworkConfiguration()
                    t.cb()
                });
                self.tests.clearAllData(t)

                self.tests.syncBothDirections(t, a, b)
                self.tests.verify2NodesInSync(t, a, b, '?????')
                self.tests.inSync(t, a, b);
                t.add(function getRecord() {
                    b.test.getRandomRecord(function (rec) {
                        randomRec = rec;
                        t.cb()
                    });
                });
                t.add(function updateRecord_skipUpdateTime() {
                    randomRec.updateAttributes({name: "JJJJ"}).then(t.cb)
                });

                self.tests.notInSync(t, a, b);
                self.tests.syncBothDirections(t, a, b)
                self.tests.notInSync(t, a, b); //did not upldate global date

                t.add(function updateRecords() {
                    randomRec.updateAttributes({global_updated_at: new Date()}).then(t.cb)
                });
                self.tests.syncBothDirections(t, a, b)
                self.tests.inSync(t, a, b);
            };
            define_multipleNodes();
        }

        defineBlockSlowTests(t)


        function defineSlowTests2(t) {
            function define_TestDeletes(t) {
                self.tests.syncBothDirections(t, a, b)
                self.tests.verify2NodesInSync(t, a, b, 'dddddd')
                self.tests.deleteRandomRecordFrom(t, b);
                self.tests.deleteRandomRecordFrom(t, b);
                self.tests.inSync(t, a, b);

                self.tests.purgeDeletedRecords(t, b);
                self.tests.inSync(t, a, b);

            };
            define_TestDeletes(t)

            function define_TestDeletes2(t) {
                t.add(function defineNewNodes() {
                    augmentNetworkConfiguration2()
                    t.cb()
                });
                self.tests.clearAllData(t)
                self.tests.syncBothDirections(t, a, b)
                self.tests.verify2NodesInSync(t, a, b, 'dddddd')
                self.tests.deleteRandomRecordFrom(t, b);
                self.tests.deleteRandomRecordFrom(t, b);
                self.tests.purgeDeletedRecords(t, b);
                self.tests.inSync(t, a, b);

            };
            define_TestDeletes2(t)
        }

        defineSlowTests2(t)


        function define_TestHubAndSpoke(t) {
            t.add(function defineNewNodes() {
                augmentNetworkConfiguration()
                t.cb()
            });
            t.add(function defineNewNodes() {
                augmentNetworkConfiguration2()
                t.cb()
            });
            self.tests.clearAllData(t)


            self.tests.addTimer(t, 'sync both dirs')

            /*
             self.tests.syncBothDirections(t,a,b)
             self.tests.verify2NodesInSync(t,a,b, 'dddddd')
             self.tests.deleteRandomRecordFrom(t,b);
             self.tests.deleteRandomRecordFrom(t,b);
             self.tests.purgeDeletedRecords(t,b);
             */


            self.tests.syncBothDirections(t, a, b);
            self.tests.addTimer(t, 'local sync');
            self.tests.verify2NodesInSync(t, a, b, 'dddddd')
            self.tests.addTimer(t, 'deletes');
            self.tests.deleteRandomRecordFrom(t, b);
            self.tests.deleteRandomRecordFrom(t, b);
            ////deleteRandomRecordFrom(topology.c);
            ////deleteRandomRecordFrom(topology.e);

            self.tests.addTimer(t, 'purge all deletes')
            //syncBothDirections();
            self.tests.purgeDeletedRecords(t, b);
            /*t.add(function getRecord() {
             b.test.getRandomRecord(function (rec) {
             randomRec = rec;
             t.cb()
             });
             });
             t.add(function updateRecords() {
             randomRec.updateAttributes({name:"JJJJ"}).then( t.cb  )
             });*/
            //  notInSync()
            // syncBothDirections()
            self.tests.addTimer(t, 'insync')
            self.tests.inSync(t, a, b);
            self.tests.inSyncAll(t)
            //TODO: Test sync on N
            //check in sync on furthes node
            self.tests.addTimer(t, 'insyncover')

        };
        define_TestHubAndSpoke(t)

        // breakTest()

        //TODO: Add index to updated at

        //test from UI
        //let UI log in
        //task page saeerch server

        //account server
        //TODO: To getLastPage for records

        //TODO: replace getRecords, with getLastPage
        //TODO: do delete, so mark record as deleted, store in cache,
        //3x sends, until remove record from database ...

        /*
         when save to delete? after all synced
         mark as deleted,
         ask all peers to sync
         then delete from database if we delete deleted nodes

         do full sync
         if deleteMissing -- will remove all records my peers do not have
         ... risky b/c incomplete database might mess  up things
         ... only delete records thata re marked as deleted
         */

        /*
         TODO:
         test loading config from settings object with proper cluster config
         test auto syncing after 3 secs
         build proper hub and spoke network ....
         add E node that is linked to d (1 hop away)
         */
        /**
         * store global record count
         * Mark random record as deleted,
         * sync
         * remove deleted networks
         * sync
         * ensure record is gone
         */

        //Revisions
    }

    function defineTestParts() {

        p.tests = {};
        /**
         * Deletes all data from all nodes
         */
        p.tests.addTimer = function addTimer(t, reason) {
            t.add(function defineNewNodes() {
                if (t.timer != null) {
                    var diff = sh.time.secs(t.timer)
                    console.log('>');
                    console.log('>');
                    console.log('>');
                    console.log(t.timerReason, 'time', diff);
                    console.log('>');
                    console.log('>');
                    console.log('>');
                } else {

                }
                t.timerReason = reason;
                t.timer = new Date();
                t.workChain.utils.wait(1);
                t.cb()
            });

        }
        p.tests.clearAllData = function clearAllData(t) {
            t.workChain.utils.wait(1);
            t.add(function () {
                var testDoubleCall = {};
                sh.async(self.data.allPeers,
                    function (peer, fxDone) {
                        // asdf.g
                        peer.test.destroyAllRecords(true, recordsDestroyed)
                        function recordsDestroyed() {

                            if ( testDoubleCall.calledOnce ) {
                                console.error('sdf',testDoubleCall.last.stack )

                                console.error('ddddddddddddd',new Error().stack )
                                debugger;
                                console.error('llll')
                               // return;
                            }
                            testDoubleCall.calledOnce = true;
                            testDoubleCall.last = new Error();

                            fxDone();
                        }
                    },
                    function dleeteAll() {
                        t.cb()
                    });
            });
            t.add(function () {
                sh.async(self.data.allPeers,
                    function (peer, fxDone) {
                        // asdf.g
                        peer.test.createTestData(recordsCreated)
                        function recordsCreated() {
                            fxDone();
                        }
                    },
                    function dleeteAll() {
                        t.cb()
                    });
            });
        }

        p.tests.inSyncAll = function inSyncAll(t) {
            t.workChain.utils.wait(1);
            t.add(function () {
                sh.async(allPeers,
                    function (peer, fxDone) {
                        var t2 = EasyRemoteTester.create('TestInSync',
                            {showBody: false, silent: true});
                        var baseUrl = 'http://' + peer.ip; //127.0.0.1:'+ b.settings.port;
                        var urls = {};
                        t2.settings.baseUrl = baseUrl;
                        urls.verifySync = t.utils.createTestingUrl('verifySync');
                        t2.getR(urls.verifySync).with(
                            {sync: false, peer: 'a'}
                        )
                            .fxDone(function syncComplete(result) {
                                t2.assert(result.ok == true, 'data not inSync ' + result.ok);
                                return;
                            });
                    },
                    function dleeteAll() {
                        t.cb()
                    });
            });
        }


        p.tests.clearRecordsFromNode = function clearRecordsFromNode(t, peerNode) {
            t.add(function clearRecordsFrom_B() {
                peerNode.test.destroyAllRecords(true, t.cb);
            })
        }
        p.tests.pullRecords = function clearRecordsFromNode(t, peerNode) {
            t.add(function bPullARecords() {
                peerNode.pull(t.cb);
            })
        }
        p.tests.create100Records = function create100Records(t, peerNode) {
            t.add(function create100Records_A() {
                peerNode.test.createTestData(t.cb)
            })
        }

        p.tests.addNewRecord = function addNewRecord(t, peerNode) {
            t.add(function addNewRecord() {
                peerNode.dbHelper2.addNewRecord({name: "test new"}, t.cb);
            });
        }

        p.tests.addNewRecordAndTest = function addNewRecordAndTest(t, peerNodeA, peerNodeB) {


            t.add(function clearScreen() {
                console.log('\033[2J');
                process.stdout.write('\033c'); // This works on linux. Not sure about windows.

                //    You can "trick" the user using something like this:

                var lines = 100;//process.stdout.getWindowSize()[1];
                for (var i = 0; i < lines; i++) {
                    console.log('\r\n');
                }
                process.stdout.write("\u001b[2J\u001b[0;0H");
                process.stdout.write('\x1Bc');
                process.stdout.write("\u001b[0J\u001b[1J\u001b[2J\u001b[0;0H\u001b[0;0W");
                t.cb()
            })

            var baseUrl = 'http://127.0.0.1:' + peerNodeB.settings.port;
            t.settings.baseUrl = baseUrl;
            t.urls.getTableData = t.utils.createTestingUrl('getTableData');
            t.urls.syncIn = t.utils.createTestingUrl('syncIn');

            self.tests.addNewRecord(t, peerNodeA); //ResuableSection_addRecord();

            t.getR(t.urls.getTableData).with({sync: false})
            // .bodyHas('status').notEmpty()
                .fxDone(function syncComplete(result) {
                    return;
                });

            self.tests.syncBothDirections(t, peerNodeA, peerNodeB)

            // ResuableSection_verifySync();
            self.tests.verify2NodesInSync(t, peerNodeA, peerNodeB, 'created a new networking, in sync after')
        }

        p.tests.define_TestIncrementalUpdate = function define_TestIncrementalUpdate(t, peerNodeA, peerNodeB) {
            var baseUrl = 'http://127.0.0.1:' + peerNodeB.settings.port;
            t.settings.baseUrl = baseUrl;
            t.urls.getTableDataIncremental = t.utils.createTestingUrl('getTableDataIncremental');

            t.getR(t.urls.getTableDataIncremental).with({sync: false}) //get all records
                .fxDone(function syncComplete(result) {
                    return;
                })
            t.workChain.utils.wait(1);
            self.tests.verify2NodesInSync(t, peerNodeA, peerNodeB, 'All records are synced')
            self.tests.addNewRecord(t, peerNodeA)  //this record is new, will be ONLY record
            //sent in next update.

            t.addFx(function startBreakpoints() {
                //this is not async ... very dangerous
                self.data.topology.b.data.breakpoint = true;
                self.data.topology.a.data.breakpoint_catchPageRequests = true;
            })


            t.getR(t.urls.getTableData).with({sync: false})
                .fxDone(function syncComplete(result) {
                    console.log('>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<')
                    t.assert(peerNodeB.lastUpdateSize == 1, 'updated wrong # of records updated after pull ' + b.lastUpdateSize)

                    return;
                })


            t.addFx(function removeBreakpoints() {
                self.data.topology.b.data.breakpoint = false;
                self.data.topology.a.data.breakpoint_catchPageRequests = false;

            })

            self.tests.verify2NodesInSync(t, peerNodeA, peerNodeB, 'Incremental change ... failed ..A and b should be same size');
        }

        p.tests.define_syncReverse = function define_syncReverse(t, peerNodeA, peerNodeB) {
            self.tests.addNewRecord(t, peerNodeA);
            self.tests.addNewRecord(t, peerNodeB);
            self.tests.addNewRecord(t, peerNodeB);

            var baseUrl = 'http://127.0.0.1:' + peerNodeB.settings.port;
            t.settings.baseUrl = baseUrl
            t.urls.syncReverse = t.utils.createTestingUrl('syncReverse');
            t.urls.syncIn = t.utils.createTestingUrl('syncIn');

            var peerName = peerNodeA.settings.name

            t.getR(t.urls.syncReverse).with({
                sync: false,
                peer: peerName, fromPeer: '?'
            })
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })
            t.getR(t.urls.syncIn).with({sync: false, peer: peerName})
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })
            self.tests.verify2NodesInSync(t, peerNodeA, peerNodeB, 'reverse sync failed')
        }

        p.tests.define_TestDataIntegrity = function define_TestDataIntegrity(t, a, b) {
            var baseUrl = 'http://127.0.0.1:' + b.settings.port;
            t.settings.baseUrl = baseUrl;
            t.urls.verifySync = t.utils.createTestingUrl('verifySync');
            // console.error(a.settings.name)
            // asdf.g
            t.getR(t.urls.verifySync).with({sync: false, peer: a.settings.name})
                .fxDone(function syncComplete(result) {
                    t.assert(result.ok == true, 'data not integral ' + result.ok)
                    return;
                });
        }
        p.tests.notInSync = function notInSync(t, a, b) {
            var baseUrl = 'http://127.0.0.1:' + b.settings.port;
            t.settings.baseUrl = baseUrl;
            t.urls.verifySync = t.utils.createTestingUrl('verifySync');
            t.getR(t.urls.verifySync).with({sync: false, peer: a.settings.name})
                .fxDone(function syncComplete(result) {
                    t.assert(result.ok == true, 'data not integral ' + result.ok)
                    return;
                });
        }
        p.tests.inSync = function notInSync(t, a, b) {
            var baseUrl = 'http://127.0.0.1:' + b.settings.port;
            t.settings.baseUrl = baseUrl;
            t.urls.verifySync = t.utils.createTestingUrl('verifySync');
            t.getR(t.urls.verifySync).with({sync: false, peer: a.settings.name})
                .fxDone(function syncComplete(result) {
                    t.assert(result.ok == true, 'data not inSync ' + result.ok);
                    return;
                });
        }
        p.tests.syncIn = function syncIn(t, a, b) {
            var baseUrl = 'http://127.0.0.1:' + b.settings.port;
            t.settings.baseUrl = baseUrl;
            t.urls.syncIn = t.utils.createTestingUrl('syncIn');
            t.getR(t.urls.syncIn).with({sync: false, peer: 'a'})
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })
        }
        p.tests.syncOut = function syncOut(t, a, b) {
            var baseUrl = 'http://127.0.0.1:' + b.settings.port;
            t.settings.baseUrl = baseUrl;
            t.urls.syncReverse = t.utils.createTestingUrl('syncReverse');
            t.getR(t.urls.syncReverse).with({sync: false, peer: 'a', fromPeer: 'a'})
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })
        }
        p.tests.syncBothDirections = function syncBothDirections(t, a, b) {
            self.tests.syncIn(t, a, b)
            self.tests.syncOut(t, a, b)
        }

        p.tests.define_TestDataIntegrity2 = function define_TestDataIntegrity2(t, a, b) {
            self.tests.forgetRandomRecordFrom(t, a);
            t.workChain.utils.wait(1);
            self.tests.forgetRandomRecordFrom(t, b);
            self.tests.forgetRandomRecordFrom(t, b);
            self.tests.notInSync(t, a, b);
            self.tests.syncBothDirections(t, a, b)
        }

        /* p.tests.deleteRandomRecordFrom = function deleteRandomRecordFrom(t, client) {
         if (client == null) {
         sh.throw('need a client')
         }
         t.add(function forgetRandomRecord() {
         client.test.forgetRandomRecord(t.cb);
         });
         }*/
        p.tests.forgetRandomRecordFrom = function forgetRandomRecordFrom(t, client) {
            if (client == null) {
                sh.throw('need a client')
            }
            t.add(function forgetRandomRecord() {
                client.test.forgetRandomRecord(t.cb);
            });
        }
        p.tests.deleteRandomRecordFrom = function deleteRandomRecordFrom(t, client) {
            var baseUrl = 'http://127.0.0.1:' + client.settings.port;
            t.urls.purgeDeletedRecords = t.utils.createTestingUrl('purgeDeletedRecords');
            t.getR(t.urls.purgeDeletedRecords).with({fromPeer: '?'})
                .fxDone(function purgeDeletedRecords_Complete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)

                    return;
                })
        }
        p.tests.purgeDeletedRecords = function purgeDeletedRecords(t, client) {
            var baseUrl = 'http://127.0.0.1:' + client.settings.port;
            t.urls.purgeDeletedRecords = t.utils.createTestingUrl('purgeDeletedRecords');
            t.getR(t.urls.purgeDeletedRecords).with({fromPeer: '?'})
                .fxDone(function purgeDeletedRecords_Complete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)

                    return;
                })

            /*
             function purgeDeletedRecords() {
             urls.purgeDeletedRecords = t.utils.createTestingUrl('purgeDeletedRecords');
             t.getR(urls.purgeDeletedRecords).with({fromPeer: '?'})
             .fxDone(function purgeDeletedRecords_Complete(result) {
             //t.assert(result.ok==1, 'data not integral ' + result)

             return;
             })
             }*/
        }


        /*
         p.tests.define_TestDataIntegrity =   function define_TestDataIntegrity(t,a,b) {
         var baseUrl = 'http://127.0.0.1:' + b.settings.port;
         t.settings.baseUrl = baseUrl;
         t.urls.verifySync = t.utils.createTestingUrl('verifySync');
         // console.error(a.settings.name)
         // asdf.g
         t.getR(t.urls.verifySync).with({sync: false, peer: a.settings.name})
         .fxDone(function syncComplete(result) {
         t.assert(result.ok == true, 'data not integral ' + result.ok)
         return;
         });
         }
         */

        p.tests.verify2NodesInSync = function verify2NodesInSync(t, peerNodeA, peerNodeB, msg, size) {
            if (msg == null) {
                msg = ''
            }
            msg = ' ' + msg;
            t.add(function getASize() {
                peerNodeA.getSize(t.cb);
            })
            t.add(function getBSize() {
                if (tester.called) {
                    debugger
                    asfd.g
                }
                peerNodeB.getSize(t.cb);
            })
            var yOK = false
            t.add(function testSize() {
                if (size) {
                    t.assert(peerNodeA.size == size,
                        'sizesync did not work (a-size does not match predefined) a' + [peerNodeA.size, size] + msg)
                    t.assert(peerNodeB.size == size,
                        'sizesync did not work (b-size does not match predefined) b' + [peerNodeB.size, size] + msg)
                }
                t.assert(peerNodeB.size == peerNodeA.size,
                    'sync did not work (sizes different)' + [peerNodeA.size, peerNodeB.size] + msg)

                if (peerNodeB.size != peerNodeA.size) {
                    yOK = true
                    asdf.g.df.df.d
                }

                console.error('leaving the chain almost finished....')
                t.cb();
            })

            var tester = {}
            t.add(function testSize_finalized() {
                console.error('lilili')
                if (tester.called) {
                    debugger
                    asfd.g
                }
                tester.called = true;
                if (yOK) {
                    debugger
                    asdf.g
                }
                t.cb();
            })

        }
    }

    defineTestParts()

    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir + '/' + file;
            return file;
        }

        p.proc = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }

    defineUtils()
}

exports.DbGlueTest = DbGlueTest;

if (module.parent == null) {
    var instance = new DbGlueTest();
    var config = {};
    instance.init(config)
    instance.test();
}


if (module.parent == null) {


    var service = new DbGlueTest();
    service.init(config);
    service.setupOverides()
    service.createTestNode('a');
    var cfg = {};
    cfg.fxDone = function on() {
        //asdf.g
        var inst = [service.data.topology.a, service.data.topology.b]
        service.t.test2Instances(inst, fxDone2);

        function fxDone2() {
            console.error('okokokok')
        }
    }
    service.createTestNode('b', cfg);

    /*

     var service = new SQLSharingServer();
     service.init(config);
     var a = service;
     allPeers.push(service)
     topology.a = a;

     var config = sh.clone(config);
     config.port = 12002;
     config.peerName = 'b';
     config.tableName = 'bA';
     var service = new SQLSharingServer();
     service.init(config);
     var b = service;
     allPeers.push(service)
     topology.b = b;
     */


    function augmentNetworkConfiguration() {
        if (topology.augmentNetworkConfiguration) {
            return;
        }
        topology.augmentNetworkConfiguration = true;
        config = sh.clone(config);
        config.cluster_config.peers = [
            {c: "127.0.0.1:12003"},
            {b: "127.0.0.1:12002"}
        ]
        config.port = 12003;
        config.peerName = 'c';
        config.tableName = 'cA';

        var service = new SQLSharingServer();
        service.init(config);
        var c = service;
        allPeers.push(service)
        topology.c = c;
        //c.linkTo({b:b});
        b.linkTo({c: c})

        config = sh.clone(config);
        config.cluster_config.peers = [
            {d: "127.0.0.1:12004"},
            {b: "127.0.0.1:12002"}
        ]
        config.port = 12004;
        config.peerName = 'd';
        config.tableName = 'dA';
        var service = new SQLSharingServer();
        service.init(config);
        var d = service;
        allPeers.push(service)
        topology.d = d;
        //d.linkTo({c:c});
        b.linkTo({d: d})


    }


    function augmentNetworkConfiguration2() {
        if (topology.augmentNetworkConfiguration2) {
            return;
        }
        topology.augmentNetworkConfiguration2 = true;
        config = sh.clone(config);
        config.cluster_config.peers = [
            {d: "127.0.0.1:12004"},
            {e: "127.0.0.1:12005"}
        ]
        config.port = 12005;
        config.peerName = 'e';
        config.tableName = 'eA';
        var service = new SQLSharingServer();
        service.init(config);
        var e = service;
        allPeers.push(service)
        topology.d.linkTo({e: e})


    }


}


