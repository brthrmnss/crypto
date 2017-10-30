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

var rh = require('rhelpers');
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var express = require('express');
var SequelizeHelper = shelpers.SequelizeHelper;
var EasyRemoteTester = shelpers.EasyRemoteTester;

var SQLSharingServer = require('./sql_sharing_server').SQLSharingServer;

if (module.parent == null) {

    sh.fs.mkdirp('db')
    var configOverride = {};
    configOverride.mysql = {
        "ip": "127.0.0.1",
        "databasename": "yetidb",
        //"user" : "yetidbuser",
        //"pass" : "aSDDD545y^",
        "port": "3306"
    };

    rh.configOverride = configOverride;

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

    cluster_config.urlTimeout = 1000

    var topology = {};
    var allPeers = [];
    var config = {};
    config.cluster_config = cluster_config;
    config.port = 12001;
    config.peerName = 'a';
    config.tableName = 'aA';
    config.fxDone = testInstances
    config.dbConfigOverride = true
    config.dbLogging = false
    //config.dbLogging=true //issue with queries ... when get >1000 items in db on sqllite
    config.password = 'dirty'
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

    var peerCount = 2;
    var peerStartingIp = 12001
    var _config = config;

    function createNewPeer(name) {
        var config = sh.clone(_config);


        config.port = peerStartingIp + peerCount;
        peerCount++;

        var newPeerConfigObj = {};
        newPeerConfigObj[name] = '127.0.0.1' + ':' + config.port;
        config.cluster_config.peers.push(newPeerConfigObj);

        config.peerName = name;
        config.tableName = config.peerName + '_ATest';
        var service = new SQLSharingServer();
        service.init(config);
        var b = service;
        allPeers.push(service)
        topology[name] = b;

        return service;
    }


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
        asdf.g
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


    function testInstances() {
        //make chain
        var sh = require('shelpers').shelpers;
        var shelpers = require('shelpers');
        var EasyRemoteTester = shelpers.EasyRemoteTester;
        var t = EasyRemoteTester.create('Test Channel Server basics',
            {
                showBody: false,
                silent: true,
                defaultTimeout: 10000,
                defaultTimeout: 1000
            });

        var testC = {};
        testC.speedUp = true;
        testC.stopSlowTests = true

        //t.add(clearAllData())
       // clearAllData()
        t.add(function clearRecordsFrom_A() {
            a.test.destroyAllRecords(true, t.cb);
        })


        if ('defineBlock' == 'defineBlock') {
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

            function ResuableSection_addRecord() {
                t.add(function addNewRecord() {
                    a.dbHelper2.addNewRecord({name: "test new"}, t.cb);
                });
            };

            var baseUrl = 'http://127.0.0.1:' + b.settings.port;
            var urls = {};

            t.settings.baseUrl = baseUrl;
            urls.getTableData = t.utils.createTestingUrl('getTableData');
            urls.syncIn = t.utils.createTestingUrl('syncIn');
            urls.syncInB = t.utils.createTestingUrl('syncReverse');
            urls.syncReverseB = t.utils.createTestingUrl('syncReverse');

            //do partial sync
            //sync from http request methods
            //batched sync
            //remove batch tester
            //cluster config if no config sent

            function defineHTTPTestMethods() {
                //var t = EasyRemoteTester.create('Test Channel Server basics',{showBody:false});

                ResuableSection_addRecord();

                t.getR(urls.getTableData).with({sync: false})
                // .bodyHas('status').notEmpty()
                    .fxDone(function syncComplete(result) {
                        return;
                    });

                ResuableSection_verifySync();
            }

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

            var baseUrlA = 'http://127.0.0.1:' + a.settings.port;
            t.settings.baseUrl = baseUrlA;
            urls.getTableData = t.utils.createTestingUrl('getTableData');
            urls.verifySync = t.utils.createTestingUrl('verifySync');
            urls.syncReverse = t.utils.createTestingUrl('syncReverse');
            urls.verifySyncA = t.utils.createTestingUrl('verifySync');

            function define_syncReverse() {
                ResuableSection_addRecord();

                t.add(function addNewRecord() {
                    b.dbHelper2.addNewRecord({name: "test newB"}, t.cb);
                });
                t.add(function addNewRecord() {
                    b.dbHelper2.addNewRecord({name: "test newB"}, t.cb);
                });

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


            function define_TestDataIntegrity() {

                t.getR(urls.verifySyncA).with({sync: false, peer: 'a'})
                    .fxDone(function syncComplete(result) {
                        t.assert(result.ok == true, 'data not integral ' + result.ok)
                        return;
                    });
            }


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


            /**
             * Deletes all data from all nodes
             */
            function clearAllData() {
                t.workChain.utils.wait(1);
                t.add(function () {
                    sh.async(allPeers,
                        function (peer, fxDone) {
                            // asdf.g
                            peer.test.destroyAllRecords(true, recordsDestroyed)
                            function recordsDestroyed() {
                                fxDone();
                            }
                        },
                        function dleeteAll() {
                            t.cb()
                        });
                });
                t.add(function () {
                    sh.async(allPeers,
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

            function inSyncAll() {
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


            function define_TestDataIntegrity2() {
                forgetRandomRecordFrom();
                t.workChain.utils.wait(1);
                forgetRandomRecordFrom();
                forgetRandomRecordFrom();
                notInSync();
                syncBothDirections()
            }

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
        }

        if (true == false) { //skip stuff

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


            ResuableSection_verifySync('A and b should be same size', 100);
            ResuableSection_addRecord();

            defineHTTPTestMethods();
            define_TestIncrementalUpdate();

            //if ( testC.speedUp != true )
            define_TestDataIntegrity();


            if (testC.speedUp != true) {
                define_syncReverse();
            }


            if (testC.speedUp != true) {
                define_TestDataIntegrity2();
            }

        }
        testC.disableServer = function disableServer(name) {
            t.add(function disableServer() {
                var server = topology[name]
                if (server == null) {
                    throw new Error('what is this? ' + name)
                }
                server.settings.block = true;
                t.cb();
            })
        };

        testC.enableServer = function enableServer(name) {
            t.add(function enableServer() {
                var server = topology[name]
                if (server == null) {
                    throw new Error('what is this? ' + name)
                }
                server.settings.block = false;
                t.cb();
            })
        };


        testC.syncMachineB = function syncMachine(name) {
            //sync A to newPeer
            t.getR(urls.syncReverseB).with({fromPeer: 'b'}/*{peer:'a', fromPeer:'newPeerC'}*/)
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })
            t.getR(urls.syncIn).with({sync: false, peer: 'a'})
                .fxDone(function syncComplete(result) {
                    //t.assert(result.ok==1, 'data not integral ' + result)
                    return;
                })

            //verify two peers are synced
            t.getR(urls.verifySync).with({sync: true, peer: 'newPeerC'})
                .fxDone(function syncComplete(result) {
                    t.assert(result.ok == true, 'data not inSync ' + result.ok);
                    return;
                });

        }

        testC.data = {}
        testC.data.clearRecords = function clearRecords(nodeName) {
            t.add(function clearRecordsFrom_NodeNamed() {
                var node = topology[nodeName]
                if (node == null) {
                    t.cb();
                    return;
                }
                node.test.destroyAllRecords(true, t.cb);
            })
        }

        testC.data.create100Records = function create100Records(nodeName) {
            t.add(function clear100RecordsOn_NodeNamed() {
                var node = topology[nodeName]
                node.test.createTestData(t.cb);
            })
        }

        testC.data.addNewRecordToA = function addNewRecordToA(recordData) {
            t.add(function addNewRecord() {
                a.dbHelper2.addNewRecord({name: "test new"}, t.cb);
            });
        }

        testC.data.addNewRecordToB = function addNewRecordToA(recordData) {
            t.add(function addNewRecord() {
                b.dbHelper2.addNewRecord({name: "test new"}, t.cb);
            });
        }


        testC.peers = {}
        testC.peers.addPeer = function addPeerNamed(nodeName, configPeer) {
            var fxHelper = {}
            t.add(function addNewPeer() {
                var peer = createNewPeer(nodeName);
                //return;
                t.data[nodeName] = peer;
                fxHelper.peer = peer;
                fxHelper.ip = peer.settings.ip;
                t.cb();
            })
            urls.addPeer = t.utils.createTestingUrl('addPeer');



            t.add(function onAddPeer() {
                    var data = {
                        peerIp: fxHelper.ip,
                        peerName: nodeName
                    }

                    t.quickRequest(urls.addPeer, 'get',
                        onAddedPeer,data)
                    function onAddedPeer(result) {
                        //debugger;
                        b.settings.breakpoint = true;
                        t.assert(result.ok == true, 'could not add peer ' + result.ok);
                        t.cb()
                        return;
                    }
            })
            //asdf.g
            //   testC.peers.createPeer()
            /*t.getR(urls.addPeer)
            //.fxBefore
                .with({
                    peerIp: fxHelper.ip
                    /!*topology['newPeerC'].ip*!/, //ugh use the before method
                    peerName: nodeName
                })
                .fxDone(function syncComplete(result) {
                    //debugger;
                    b.settings.breakpoint = true;
                    t.assert(result.ok == true, 'could not add peer ' + result.ok);
                    return;
                });
*/

            t.add(function fullySyncPeer() {
                var fakeReq = {};
                var fakeResp = {};
                fakeReq.query = sh.noOp
                fakeReq.originalUrl = ''
                fakeResp.send = sh.noOp
                fxHelper.peer.syncInX(fakeReq, fakeResp, function onDoneSync() {
                    t.cb();
                })
            })

            t.xadd(function fullySyncPeer() {
                var fakeReq = {};
                var fakeResp = {};
                fakeReq.query = sh.noOp
                fakeReq.originalUrl = ''
                fakeResp.send = sh.noOp
                fxHelper.peer.syncInX(fakeReq, fakeResp, function onDoneSync() {
                    t.cb();
                })
            })
            
            
            t.add(function onCount() {
                
                fxHelper.peer.utils.getCount(  function onCount(count) {
                    console.log('ok large', nodeName, count)
                  t.cb();
                })


            })

            return nodeName;
        }


        testC.sync = {}
        testC.sync.areTwoNodesInSync = function areTwoNodesInSync(nodeNameA, nodeNameB, size, msg, inverse) {
            //testUtils.checkSize
            t.add(function getASize() {
                var nodeA = topology[nodeNameA]
                nodeA.getSize(t.cb);
                t.data.xnodeA = nodeA;
            })
            t.add(function getBSize() {
                var nodeB = topology[nodeNameB]
                nodeB.getSize(t.cb);
                t.data.xnodeB = nodeB;
            })
            t.add(function testSize() {
                msg = sh.dv(msg, '');
                msg += ' nodes:'+[nodeNameA, nodeNameB].join(' ')
                if (size) {
                    t.assert(t.data.xnodeA.size == size, 'sync did not work (sizes different) b' + [t.data.anodeb, size] + msg)
                    t.assert(t.data.xnodeB.size == size, 'sync did not work (sizes different) x' + [t.data.anodea.size, size] + msg)
                }
                if (inverse) {
                    t.assert(t.data.xnodeA.size != t.data.xnodeB.size,
                        '(sizes are same) ' +
                        [t.data.xnodeB.size, t.data.xnodeA.size] + msg)
                    t.cb();
                    return;
                }
                t.assert(t.data.xnodeA.size == t.data.xnodeB.size,
                    'sync did not work (sizes different)' +
                    [t.data.xnodeB.size, t.data.xnodeA.size] + msg)
                t.cb();
            })
        }

        testC.sync.areTwoNodesNotInSync = function areTwoNodesNotInSync(a, b, size, msg) {
            testC.sync.areTwoNodesInSync(a, b, size, msg, true)
        }

        function define_TestDelayedAddPeer() {


            testC.data.clearRecords('a')
            testC.data.clearRecords('b')


            testC.data.create100Records('b')
            testC.peers.addPeer('newPeerC')
            testC.data.clearRecords('newPeerC')

            testC.syncMachineB('b')

            testC.sync.areTwoNodesInSync('b', 'newPeerC')


            //block add one and retry
            testC.data.addNewRecordToB();
            testC.sync.areTwoNodesNotInSync('b', 'newPeerC')
            testC.disableServer('newPeerC')
            testC.syncMachineB('b')
            //verify sync failed
            testC.sync.areTwoNodesNotInSync('b', 'newPeerC')
            //re-enable newPeerC
            testC.enableServer('newPeerC')
            //try sync again
            testC.syncMachineB('b')
            testC.sync.areTwoNodesInSync('b', 'newPeerC')


            //ensure the record if saved while offline is resolved later ...
            //new peers person record needs to update, adn is resolved when logged in
            //auot syncing ...
        }

        define_TestDelayedAddPeer()

        ////////
        if (testC.stopSlowTests) {
            return
        }
        //////////


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
                clearAllData();

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
                deleteRandomRecordFrom(topology.c);

                purgeDeletedRecords();

                inSync();

            };
            define_TestDeletes()

            function define_TestDeletes2() {
                t.add(function defineNewNodes() {
                    augmentNetworkConfiguration2()
                    t.cb()
                });
                clearAllData();

                syncBothDirections()
                ResuableSection_verifySync()
                deleteRandomRecordFrom(b);
                deleteRandomRecordFrom(b);
                deleteRandomRecordFrom(topology.c);
                deleteRandomRecordFrom(topology.e);

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
            asdf.g.dsdf.d
            t.add(function defineNewNodes() {
                augmentNetworkConfiguration()
                t.cb()
            });
            t.add(function defineNewNodes() {
                augmentNetworkConfiguration2()
                t.cb()
            });
            clearAllData();


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
            deleteRandomRecordFrom(topology.c);
            deleteRandomRecordFrom(topology.e);

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
            inSyncAll();
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
}



