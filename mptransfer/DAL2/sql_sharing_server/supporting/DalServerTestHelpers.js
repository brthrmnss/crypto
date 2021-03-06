/**
 * Created by user on 1/3/16.
 */

var rh = require('rhelpers');
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function DalServerTestHelpers(_self) {
    var p = DalServerTestHelpers.prototype;
    p = this;
    var self = this;
    if ( _self ) {
        self = _self;
        p = _self
    }

    /**
     * why: identify current machine in config file to find peers
     */

    function defineDatabase() {

        function defineTestUtils() {
            //why: utils for testing.
            p.linkTo = function linkTo(peerToAdd, reset ) {
                var reset = sh.dv(reset, false);
                if ( reset ) {
                    self.settings.cluster_config.peers = []
                }


                var foundSelf = false;


                var peersToAdd = sh.forceArray(peerToAdd);
                sh.each(peersToAdd, function (k, peer)  {


                    sh.each(peer, function (peerName, ipAddOrPeer)  {
                        var peer = ipAddOrPeer;
                        if ( sh.isNumber(ipAddOrPeer) ) {
                            // return;
                            //peer =
                        }
                        else if ( peer.settings != null ) {
                            var peer = ipAddOrPeer.settings.ip;
                        }

                        if ( ipAddOrPeer == self.settings.ip) {
                            foundSelf = true;
                        }
                        //peersToAdd[k] = peer;
                        //self.settings.cluster_config.peers[peerName] = peer;
                        var newPeer = {}
                        newPeer[peerName] = peer;
                        self.settings.cluster_config.peers.push(newPeer);
                    })
                })

                if ( foundSelf == false) {
                    //self.settings.cluster_config.peers[self.settings.name] = self.settings.ip;
                    var myPeer = {}
                    myPeer[self.settings.name] = self.settings.ip;
                    self.settings.cluster_config.peers.push(myPeer);
                }
                self.identify();
            }


        }
        defineTestUtils();


        function defineTest() {
            self.test = {};
            self.test.createTestData = function createTestData(cb, deleteFirst, number) {
                GenerateData = shelpers.GenerateData;
                var gen = new GenerateData();
                number = sh.dv(number, 100)
                var model = gen.create(number, function (item, id, dp) {
                    item.name = id;
                    // item.id = id;
                    item.source_node = self.settings.peerName;
                    item.desc = GenerateData.getName();
                    item.global_updated_at = new Date();
                    item.id_timestamp = (new Date()).toString() + '_' + Math.random();
                });

                var results = model;


                if ( deleteFirst != false ) {
                    self.test.destroyAllRecords(true, createTestData);
                } else {
                    createTestData();
                }

                function createTestData() {
                    self.Table.bulkCreate(results).then(
                        function (results) {
                            // Notice: There are no arguments here, as of right now you'll have to...
                            if (cb != null) cb(results);
                            return;
                        }).catch(function (err) {
                            console.log(err)
                            // exit();
                            setTimeout(function () {
                                throw err;
                            }, 5);
                        });
                }

            }
            self.test.destroyAllRecords = function (confirmed, fx) {
                if (confirmed != true) {
                    return false;
                }
                global.countAll4 = new Error();
                var queryDelete = {}
                if ( self.data.isSQLlite ) {

                }

                var testDoubleCall = {};
               // queryDelete = {id:{$ne: -1}}
                self.Table.destroy({where: queryDelete}).then(function onDeleted() {
                    self.proc('all records destroyed')
                    self.count = 0;

                    self.dbHelper2.getDBVersionAndCount(fxUpdatedCount_AfterDelete)

                    function fxUpdatedCount_AfterDelete(v, count) {
                        if ( testDoubleCall.calledOnce ) {
                            console.error('sdf-destroyAllRecords',testDoubleCall.last.stack )
                            debugger;
                            console.error('llll')
                            return;
                        }
                        testDoubleCall.calledOnce = true;
                        testDoubleCall.last = new Error();

                        self.proc('size', v, count)
                        if ( count != 0 ) {
                            throw new Error('could not delete')
                        }
                        sh.callIfDefined(fx);
                    }


                })

            }


            self.test.forgetRandomRecord = function forgetRandomRecord(fx) {
                //forget locally...
                self.test.getRandomRecord2(function onGotRecord(rec) {
                    self.dbHelper2.forgetRecord(rec, fx);
                })
            };
            /*self.test.deleteRandomRecord = function deleteRandomRecord(fx) {
                self.test.getRandomRecord2(function onGotRecord(rec) {
                    self.dbHelper2.deleteRecord(rec, fx);
                })
            };
*/

            self.test.deleteRandomRecord = function deleteRandomRecord(fx) {
                self.test.getRandomRecord2(function onGotRecord2(rec) {
                    //rec.deleted = true;
                   // rec.updated_by_source = self.name;
                    //self.dbHelper2.deleteRecord(rec.id, fx); //this line will break the test
                    self.dbHelper2.deleteRecord(rec, fx)

                })
            };

            self.test.deletePurgedRecordsCB = function deletePurgedRecordsCB(fx) {
                self.dbHelper2.purgeDeletedRecords(
                    function onGotRecord(rec) {
                    fx();
                })
            };



            self.test.getRandomRecord2 = function getRandomRecord2(fx) {

                var query = {};
                query.where  = {};

                self.dbHelper2.countAll(function gotCount(count){
                    self.count = count;
                    //offset by count?
                    query.order = ['global_updated_at',  'DESC']
                    query.limit = 1;
                    query.offset = parseInt(count*Math.random());
                    self.dbHelper2.search(query, function gorRandomRecord(recs){
                        var obj = recs[0];
                        sh.callIfDefined(fx, obj)
                    } , false);
                }, query);


            }

            self.test.saveRecord = function saveRecord(obj, fx) {
                obj.save().then(function gotAllRecords(recs){
                        sh.callIfDefined(fx, obj)
                    }
                )

            }





        }
        defineTest()

    }
    defineDatabase();


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        var args = sh.convertArgumentsToArray(arguments)
        args.unshift(self.settings.name)
        sh.sLog(args);
    }
}

exports.DalServerTestHelpers = DalServerTestHelpers;

if (module.parent == null) {
    var service = new SQLSharingServer()
    service.init()
    return;
}