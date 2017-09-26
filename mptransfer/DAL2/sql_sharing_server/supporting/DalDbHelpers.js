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

function DalDbHelpers(_self) {
    var p = DalDbHelpers.prototype;
    p = this;
    var self = this;
    if ( _self ) self = _self;

    /**
     * why: identify current machine in config file to find peers
     */

    function defineDatabase() {

        function defineDbHelpers() {
            var dbHelper = {};
            self.dbHelper2 = dbHelper;
            dbHelper.count = function (fx, table) {
                table = sh.dv(table, self.Table);
                //console.error('count', table.name, name)
                table.count({where: {}}).then(function onResults(count) {
                    self.count = count;
                    //self.proc('count', count);
                    sh.callIfDefined(fx, count);
                })
            }

            dbHelper.utils = {};
            dbHelper.utils.queryfy = function queryfy(query) {
                query = sh.dv(query, {});
                var fullQuery = {};
                if ( query.where != null ) {
                    fullQuery = query;
                }else {
                    fullQuery.query = query;
                }
                return fullQuery;
            }

            dbHelper.countAll = function (fx, query) {
                var fullQuery = dbHelper.utils.queryfy(query)
                self.Table.count(fullQuery).then(function onResults(count) {
                    self.count = count;
                    //self.proc('count', count)
                    sh.callIfDefined(fx, count)
                    //  self.version = objs.updated_at.getTime();
                })
            }

            dbHelper.getDBVersion = function (fx, query) {
                var fullQuery = dbHelper.utils.queryfy(query)
                fullQuery.limit = 1;
                fullQuery = {
                    limit: 1,
                    //     offset: index,
                    where: {},
                    order: 'global_updated_at DESC'
                }
                self.Table.findAll(fullQuery).then(function onResults(recs) {

                    if ( recs.length == 0 ) {
                        self.version = 0;
                    } else {
                        self.version = recs[0].global_updated_at
                    }
                    //self.proc('count', count)
                    sh.callIfDefined(fx, self.version)
                    //  self.version = objs.updated_at.getTime();
                })
            }

            dbHelper.getDBVersionAndCount = function getDBVersionAndCount(fx, query){

                query = sh.dv(query, {})
                var queryIsEmpty = false;
                if ( JSON.stringify(query)=='{}') {
                    queryIsEmpty = true
                }
                var results = {};
                dbHelper.getDBVersion(onGotDBVersion, query )

                function onGotDBVersion(version) {
                    results.version = version;
                    if ( queryIsEmpty ) {
                        self.version = version; //why: update global version
                    }
                    dbHelper.countAll(onGotCount, query);
                }

                function onGotCount(count){
                    if ( queryIsEmpty ) {
                        self.count = count; //why: update global version
                    }
                    fx(results.version, count);
                }
            }

            dbHelper.getUntilDone = function (query, limit, fx, fxDone, count) {
                var index = 0;
                if (count == null) {
                    dbHelper.countAll(function (initCount) {
                        count = initCount;
                        nextQuery();
                    }, query)
                    return;
                }
                ;

                function nextQuery(initCount) {
                    self.proc(index, count, (index / count).toFixed(2));
                    if (index >= count) {
                        if (index == 0 && count == 0) {
                            sh.callIfDefined(fx, [], true);
                        }
                        sh.callIfDefined(fxDone);
                        //sh.callIfDefined(fx, [], true);
                        return;
                    }
                    ;

                    self.Table.findAll(
                        {
                            limit: limit,
                            offset: index,
                            where: query,
                            order: 'global_updated_at ASC'
                        }
                    ).then(function onResults(objs) {
                            var records = [];
                            var ids = [];
                            sh.each(objs, function col(i, obj) {
                                records.push(obj.dataValues);
                                ids.push(obj.dataValues.id);
                            });
                            self.proc('sending', records.length, ids)
                            index += limit;

                            var lastPage = false;
                            if (index >= count) {
                                lastPage = true
                            }
                            // var lastPage = records.length < limit;
                            //lastPage = index >= count;
                            // self.proc('...', lastPage, index, count)
                            sh.callIfDefined(fx, records, lastPage);
                            sh.callIfDefined(nextQuery)
                        }
                    ).catch(function (err) {
                            console.error(err, err.stack);
                            throw(err);
                        })
                }

                nextQuery();


            }


            dbHelper.getAll = function getAll(fx) {
                dbHelper.search({}, fx);
            }
            dbHelper.search = function search(query, fx, convert) {
                convert = sh.dv(convert, true)
                //table = sh.dv(table, self.Table);
                var fullQuery = dbHelper.utils.queryfy(query)
                self.Table.findAll(
                        fullQuery
                    ).then(function onResults(objs) {
                        if (convert) {
                            var records = [];
                            var ids = [];
                            sh.each(objs, function col(i, obj) {
                                records.push(obj.dataValues);
                                ids.push(obj.dataValues.id);
                            });
                        } else {
                            records = objs;
                        }
                        sh.callIfDefined(fx, records)
                    }
                ).catch(function (err) {
                        console.error(err, err.stack);
                        //fx(err)

                        throw(err);
                        process.exit()
                    })
            }


            self.dbHelper2.upsert = function upsert(records, fx) {
                records = sh.forceArray(records);

                var dict = {};
                var dictOfExistingItems = dict;
                var queryInner = {};
                var statements = [];

                var newRecords = [];
                var results = {}

                var resultsUpsert = results;
                results.newRecords = newRecords;
                var ids = [];
                sh.each(records, function putInDict(i, record) {
                        ids.push(record.id)
                    }
                )
                if ( self.settings.debugUpsert )
                    self.proc(self.name, ':', 'upsert', records.length, ids)
                if (records.length == 0) {
                    sh.callIfDefined(fx);
                    return;
                }

                sh.each(records, function putInDict(i, record) {
                    if (record.id_timestamp == null || record.source_node == null) {
                        throw new Error('bad record ....');
                    }
                    if (sh.isString(record.id_timestamp)) { //NO: this is id ..
                        //record.id_timestamp = new Date(record.id_timestamp);
                    }
                    if (sh.isString(record.global_updated_at)) {
                        record.global_updated_at = new Date(record.global_updated_at);
                    }

                    resultsUpsert.last_global_at = self.utils.latestDate( resultsUpsert.last_global_at, record.global_updated_at);

                    var dictKey = record.id_timestamp + record.source_node
                    if (dict[dictKey] != null) {
                        self.proc('duplicate keys', dictKey)
                        throw new Error('duplicate key error on unique timestamps' + dictKey)
                        return;
                    }
                    dict[dictKey] = record;
                    /*statements.push(SequelizeHelper.Sequlize.AND(


                     ))*/

                    statements.push({
                        id_timestamp: record.id_timestamp,
                        source_node: record.source_node
                    });
                })

                if (statements.length > 0) {
                    queryInner = SequelizeHelper.Sequelize.or(statements)
                    queryInner = SequelizeHelper.Sequelize.or.apply(this, statements)

                    //find all matching records
                    var query = {where: queryInner};

                    self.Table.findAll(query).then(function (results) {
                        self.proc('found existing records');
                        sh.each(results, function (i, eRecord) {
                            var eRecordId = eRecord.id_timestamp + eRecord.source_node;
                            var newerRecord = dictOfExistingItems[eRecordId];
                            if (newerRecord == null) {
                                self.proc('warning', 'look for record did not have in database')
                                //newRecords.push()
                                return;
                            }

                            //do a comparison
                            var dateOldRecord = parseInt(eRecord.dataValues.global_updated_at.getTime());
                            var dateNewRecord = parseInt(newerRecord.global_updated_at.getTime());
                            var newer = dateNewRecord > dateOldRecord;
                            var sameDate = eRecord.dataValues.global_updated_at.toString() == newerRecord.global_updated_at.toString()
                            if ( self.settings.showWarnings ) {
                                self.proc('compare',
                                    eRecord.name,
                                    newerRecord,
                                    newer,
                                    eRecord.dataValues.global_updated_at, newerRecord.global_updated_at);
                            }
                            if ( newer == false ) {
                                if ( self.settings.showWarnings )
                                    self.proc('warning', 'rec\'v object that is older', eRecord.dataValues)
                            }
                            else if (sameDate) {
                                if ( self.settings.showWarnings )
                                    self.proc('warning', 'rec\'v object that is already up to date', eRecord.dataValues)
                            } else {
                                console.error('newerRecord', newerRecord)
                                eRecord.updateAttributes(newerRecord);
                            }
                            //handled item
                            dictOfExistingItems[eRecordId] = null;
                        });
                        createNewRecords();
                    });
                } else {
                    createNewRecords();
                }

                //update them all

                //add the rest
                function createNewRecords() {
                    var _dictOfExistingItems = dictOfExistingItems;
                    //mixin un copied records
                    sh.each(dictOfExistingItems, function addToNewRecords(i, eRecord) {
                        if (eRecord == null) {
                            //already updated
                            return;
                        }
                        //console.error('creating new instance of id on', eRecord.id)
                        eRecord.id = null;
                        newRecords.push(eRecord);
                    });

                    if (newRecords.length > 0) {
                        self.Table.bulkCreate(newRecords).then(function (objs) {

                            self.proc('all records created', objs.length);
                            //sh.each(objs, function (i, eRecord) {
                            // var match = dict[eRecord.id_timestamp.toString() + eRecord.source]
                            // eRecord.updateAttributes(match)
                            // })
                            sh.callIfDefined(fx, results);

                        }).catch(function (err) {
                            console.error(err, err.stack)
                            throw  err
                        })
                    } else {
                        self.proc('no records to create')
                        sh.callIfDefined(fx, results)
                    }


                    /* sh.callIfDefined(fx)*/

                }

            }


            self.dbHelper2.updateRecordForDb = function updateRecordForDb(record) {
                var item = record;
                item.source_node = self.settings.peerName;
                //item.desc = GenerateData.getName();
                item.global_updated_at = new Date();
                item.id_timestamp = (new Date()).toString() + '_' + Math.random() + '_' + Math.random();
                return item;
            };

            self.dbHelper2.addNewRecord = function addNewRecord(record, fx, saveNo) {
                var item = record;
                item.source_node = self.settings.peerName;
                //item.desc = GenerateData.getName();
                item.global_updated_at = new Date();
                item.id_timestamp = (new Date()).toString() + '_' + Math.random() + '_' + Math.random();


                var newRecords = [item];
                self.Table.bulkCreate(newRecords).then(function (objs) {
                    self.proc('all records created', objs.length);
                    sh.callIfDefined(fx);
                }).catch(function (err) {
                    console.error(err, err.stack);
                    throw  err
                });

            }


            self.dbHelper2.compareTables = function compareTables(a, b) {
                // console.log(nameA,data.count1,
                //     nameB, data.count2, data.count1 == data.count2 );

                var getId = function getId(obj){
                    return obj.source_node + '_' + obj.id_timestamp//.getTime();
                }

                var dictTable1 = sh.each.createDict(
                    a, getId);
                var dictTable2 = sh.each.createDict(
                    b, getId);

                function compareObjs(a, b) {
                    var badProp = false;
                    if ( b == null ) {
                        self.proc('b is null' )
                        return false;
                    }
                    sh.each(self.settings.fields, function (prop, defVal) {
                        if (['global_updated_at'].indexOf(prop)!= -1 ){
                            return;
                        }
                        var valA = a[prop];
                        var valB = b[prop];
                        if ( valA != valB ) {
                            badProp = true;
                            self.proc('mismatched prop', prop, valA, valB)
                            return false; //break out of loop
                        }
                    });
                    if ( badProp ) {
                        return false;
                    }
                    return true
                }

                var result = {};
                result.notInA = []
                result.notInB = [];
                result.brokenItems = [];
                function compareDictAtoDictB(dict1, dict2) {
                    var diff = [];
                    var foundIds = [];
                    sh.each(dict1, function (id, objA) {
                        var objB= dict2[id];
                        if ( objB == null ) {
                            // console.log('b does not have', id, objA)
                            result.notInB.push(objA)
                            // return;
                        } else { //why: b/c if A has extra record ... it is ok...
                            if (!compareObjs(objA, objB)) {
                                result.brokenItems.push([objA, objB])
                                //return;
                            }
                        }
                        foundIds.push(id);
                    });

                    sh.each(dict2, function (id, objB) {
                        if ( foundIds.indexOf(id) != -1 ) {
                            return
                        };
                        /*if ( ! compareObjs(objA, objB)) {
                         result.brokenItems.push(objA)
                         return;
                         }*/
                        //console.log('a does not have', id, objB)
                        result.notInA.push(objB)
                    });
                };

                compareDictAtoDictB(dictTable1, dictTable2);

                if ( result.notInA.length > 0 ) {
                    //there were items in a did not find
                    return false;
                };
                if ( result.brokenItems.length > 0 ) {
                    self.proc('items did not match', result.brokenItems)
                    return false;
                };
                return true;
                return false;
            }


            self.dbHelper2.deleteRecord = function deleteRecord(id, cb) {
                if ( sh.isNumber( id ) == false ) {
                    /* self.Table.destroy(
                     )*/
                    // self.Table.destroy(id)
                    id.destroy()
                        .then(function() {
                            sh.callIfDefined(cb);
                        })
                } else {
                    self.Table.destroy({where:{id:id}})
                        .then(function() {
                            console.log('fff')
                            sh.callIfDefined(cb);
                        })
                }

            };

            self.dbHelper2.getById = function getRecordById(id, cb) {

                if ( sh.isNumber( id ) == false ) {
                    id = id.dataValues.id
                }

                if ( sh.isNumber( id ) == false ) {
                    // asdf.g
                    cb(null)
                    return;
                }
                self.Table.findAll({where:{id:id}})
                    .then(function(objs) {
                        //console.log('fff')
                        sh.callIfDefined(cb, objs[0]);
                    })

            };


            self.dbHelper2.updateRecord = function updateRecord(record, cb, attrs2) {
                var attrs = record.dataValues;
                if ( attrs2 ) { //why: updating dataVBalues previous did nto work
                    sh.each(attrs2, function(k,v){
                        attrs[k] = v;
                    } )
                }
                // attrs.deleted = true;
                attrs.updated_by_source = self.settings.name;
                attrs.global_updated_at = new Date();

                var arr = [];
                sh.each(attrs, function(k,v){
                    arr.push(k)
                } )
                //attrs.name = '777'
                record.updateAttributes(attrs, arr).then( cb  );
            };


            self.dbHelper2.purgeDeletedRecords = function purgeDeletedRecords(cb) {
                self.Table.destroy({where:{deleted:true}})
                    .then(function onRecordsDestroyed(x) {
                        console.log('deleted records', x)
                        sh.callIfDefined(cb);
                    })
            }
        }
        defineDbHelpers();


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

exports.DalDbHelpers = DalDbHelpers;

if (module.parent == null) {
    var service = new SQLSharingServer()
    service.init()
    return;


}