/**
 * Created by user on 7/7/15.
 */


/**
 *
 *
 *
 *CRUD items on any node
 * sync across AS
 * forward CRUD ... check if neighbors are not linked
 */

/*
 what are versions?
 last time the database or repo was updated
 we sync by comparing versions on a connection
 node a version for b is 0, while b is 50, so b will send all data between 0, and 50
 version in db is based on updated time ... so any record modified is sent

 i do not know if we need c, u d methods, they can call sync and send sync requests
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var SequelizeHelper = shelpers.SequelizeHelper;
var EasyRemoteTester = shelpers.EasyRemoteTester;


function MySQLDataRepo() {
    var p = MySQLDataRepo.prototype;
    p = this;
    var self = this;
    p.init = function init(url, fx) {
        self.version = 0;

        self.checkSources(function(){
            self.ready = true;
            sh.callIfDefined(fx)
        });
        self.settings = sh.dv(url, {});
        self.settings.enableLogging = false
        //self.settings.enableLogging = true
        self.tableName = self.name + '_' + 'table';
    }

    p.getVersion = function getVersion( ) {
        return self.version;
    }
    /** Get proper version from database
     * Default is global_updated_at time of current record
     * @param fx
     */
    p.setVersion = function setVersion(fx ) {
        self.Table.findAll({ limit: 1, order: 'global_updated_at DESC' }).then(
            function onResults(objs) {
            if ( objs.length == 0 ) {
                self.version = 0;
                sh.callIfDefined(fx);
                return;
            }
            self.proc('current version', objs[0].name, objs[0].global_updated_at.getTime())
            self.version = objs[0].global_updated_at.getTime();
            sh.callIfDefined(fx);
        }).catch(function (err) {
            console.error(err, err.stack);
            throw(err);
        })
    }

    function defineDbHelpers() {
        var dbHelper = {};
        self.dbHelper2 = dbHelper;
        dbHelper.count = function (fx, table, name) {
            table = sh.dv(table, self.Table);
            //console.error('count', table.name, name)
            table.count({where:{}}).then(function onResults(count) {
                self.count = count;
                self.proc('count', count);
                sh.callIfDefined(fx, count);
            })
        }

        dbHelper.countAll = function (fx, query) {
            query = sh.dv(query, {});
            self.Table.count({where:query}).then(function onResults(count) {
                self.count = count;
                self.proc('count', count)
                sh.callIfDefined(fx, count)
                //  self.version = objs.updated_at.getTime();
            })
        }

        dbHelper.getUntilDone = function (query, limit, fx, fxDone, count) {
            var index = 0;
            if ( count == null ) {
                dbHelper.countAll(function(initCount){
                    count = initCount;
                    nextQuery();
                }, query)
                return;
            };

            function nextQuery(initCount) {
                self.proc( index, count, (index/count).toFixed(2));
                if ( index >= count ) {
                    if ( index == 0 && count == 0 ) {
                        sh.callIfDefined(fx, [], true);
                    }
                    sh.callIfDefined(fxDone);
                    //sh.callIfDefined(fx, [], true);
                    return;
                };

                self.Table.findAll(
                    {
                        limit: limit,
                        offset: index,
                        where:query,
                        order: 'global_updated_at ASC'
                    }
                ).then(function onResults(objs) {
                        var records = [];
                        var ids= [];
                        sh.each(objs, function col(i,obj) {
                            records.push(obj.dataValues);
                            ids.push(obj.dataValues.id);
                        });
                        self.proc('sending', records.length, ids)
                        index += limit;

                        var lastPage =  false;
                        if ( index >= count ) {
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


        dbHelper.search = function search (query,fx, limit, offset, table    ) {
            table = sh.dv(table, self.Table);
            table.findAll(
                {
                    limit: limit,
                    offset: offset,
                    where:query
                }
            ).then(function onResults(objs) {
                    var records = [];
                    var ids= [];
                    sh.each(objs, function col(i,obj) {
                        records.push(obj.dataValues);
                        ids.push(obj.dataValues.id);
                    });
                    sh.callIfDefined(fx, records)
                }
            ).catch(function (err) {
                    console.error(err, err.stack);
                    fx(err)
                    throw(err);
                })
        }

    }

    defineDbHelpers();


    p.getRecords = function getRecords(queryLimits, fxGotRecords ) {

        var initQuery = {};
        if ( queryLimits.asdf != null ) {
            initQuery != queryLimits.asdf;
        }
        if ( queryLimits.from != null ) {
            var date = new Date()
            date.setTime(queryLimits.from)
            initQuery.global_updated_at ={gte:date}
        }


        self.proc('asked to send records')
        self.setVersion(function startSendingRecords() {
            self.dbHelper2.getUntilDone(initQuery, 2,
                function returnRecords(objs, lastPage){
                    self.proc('sending records', objs.length)
                    var version = self.version;
                    //version = objs[0].id_timestamp;
                    fxGotRecords(objs, version, lastPage)
                });
        });


        return;
        self.count =
            fxGotRecords([], self.version);
        return 0;
    }

    p.create = function getVersion( records, fx ) {
        throw( new Error('deprec') );
        //return 0;

        sh.callIfDefined(fx)
    }

    p.update = function getVersion( records, fx ) {
        throw( new Error('deprec') );
        return 0;
    }

    p.fxDelete = function fxDelete( records, fx) {
        throw( new Error('deprec') );
        return 0;
    };

    p.destroyAllRecords = function (confirmed, fx) {
        if ( confirmed != true ) {
            return false;
        }

        self.Table.destroy({where:{}}).then(function() {
            sh.callIfDefined(fx);
            self.proc('all records destroyed')
        })

    }

    p.upsert = function upsert( records, fx) {
        records = sh.forceArray(records);
        var dict = {};
        var dictOfExistingItems = dict;
        var queryInner = {};
        var statements = [];

        var newRecords = [];
        var ids = [];
        sh.each(records, function putInDict(i,record){
                ids.push(record.id)
            }
        )
        self.proc(self.name, ':','upsert', records.length, ids)
        if ( records.length == 0 ) {
            sh.callIfDefined(fx);
            return;
        }



        sh.each(records, function putInDict(i,record){
            if ( record.id_timestamp == null || record.source_node == null ) {
                newRecords.push(record);
                record.id_timestamp = new Date();
                record.source_node = self.name;
                record.global_updated_at = new Date();
                //delete records[id]
                record.id = null;
                return;
            }
            if ( sh.isString(record.id_timestamp)) {
                record.id_timestamp = new Date(record.id_timestamp);
            }
            if ( sh.isString(record.global_updated_at)) {
                record.global_updated_at = new Date(record.global_updated_at);
            }

            dict[record.id_timestamp.getTime()+record.source_node] = record;
            /*statements.push(SequelizeHelper.Sequlize.AND(


             ))*/

            statements.push({
                id_timestamp:record.id_timestamp,
                source_node:record.source_node
            });
        })

        if ( statements.length > 0 ) {
            queryInner = SequelizeHelper.Sequelize.or(statements)
            queryInner = SequelizeHelper.Sequelize.or.apply(this, statements)

            //find all matching records
            var query = {where: queryInner};

            self.Table.findAll(query).then(function (results) {
                self.proc('found existing records');
                sh.each(results, function (i, eRecord ) {
                    var eRecordId = eRecord.id_timestamp.getTime()+eRecord.source_node;
                    var match = dictOfExistingItems[eRecordId];
                    if ( match == null ) {
                        self.proc('warning', 'look for record did not have in database')
                        //newRecords.push()
                        return;
                    }

                    var match=  eRecord.dataValues.global_updated_at.toString() == match.global_updated_at.toString()
                    self.proc('compare',
                        eRecord.name,
                        match,
                        eRecord.dataValues.global_updated_at, match.global_updated_at);

                    if (match) {
                        self.proc('warning', 'rec\'v object that is already up to date', eRecord.dataValues)
                    } else {
                        eRecord.updateAttributes(match);
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
            //mixin un copied records
            sh.each(dictOfExistingItems, function addToNewRecords(i, eRecord ) {
                if ( eRecord == null ) {
                    //already updated
                    return;
                }
                console.error('removing id on', eRecord.id)
                eRecord.id = null;
                newRecords.push(eRecord);
            });

            if ( newRecords.length > 0 ) {
                self.Table.bulkCreate(newRecords).then(function (objs) {

                    self.proc('all records created', objs.length);
                    //sh.each(objs, function (i, eRecord) {
                    // var match = dict[eRecord.id_timestamp.toString() + eRecord.source]
                    // eRecord.updateAttributes(match)
                    // })
                    sh.callIfDefined(fx2);

                }).catch(function (err) {
                    console.error(err, err.stack)
                    throw  err
                })
            } else {
                self.proc('no records to create')
                sh.callIfDefined(fx2)
            }



            function fx2() {
                self.setVersion(fx);
            }
        }

    }
    /**
     * time_rand_id <-- this becomes new version
     * source
     * version
     * deleted
     *
     */
    p.checkSources = function (fx) {
        var dbHelper = {};
        self.dbHelper = dbHelper;
        dbHelper.createDatabase = function () {
            var mysql      = require('mysql');
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : 'password'
            });

            connection.connect(function(err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }

                console.log('connected as id ' + connection.threadId);

                connection.query("CREATE DATABASE  IF NOT EXISTS test_sync;", function(err, rows) {
                    // connected! (unless `err` is set)
                    dbHelper.createTable()
                });
            });
        }

        dbHelper.createTable = function (sttgs) {
            sttgs = sh.dv(sttgs, {})
            if ( self.settings.mysql == null ) {
                var db = {}
                db.database = 'test_sync';
                db.user = 'root';
                db.password = 'password';
                db.port = '3306';
                if ( self.settings.enableLogging != true ) {
                    db.logging = false;
                }
                self.settings.mysql = db;
            }
            if ( dbHelper.sequelize == null ) {
                var mysqlSettings = sh.clone(self.settings.mysql);
                mysqlSettings.cb = finishedInitMySQL;
                var sequelize = SequelizeHelper.createSQL(mysqlSettings);
            } else {
                var sequelize = dbHelper.sequelize
                finishedInitMySQL(sequelize);
            }
            function finishedInitMySQL(sequelize){
                self.sequelize = sequelize;

                var tableSettings = {};
                if ( dbHelper.noSync == true ) {
                    tableSettings.force = false
                    tableSettings.sync = false;
                }
                tableSettings.name = self.tableName
                tableSettings.name = sh.dv(sttgs.name, tableSettings.name);
                tableSettings.createFields =  {name: "", desc: "", user_id: 0,
                    imdb_id: "", content_id: 0,
                    progress:0}
                var reqD =  {source_node:"", id_timestamp:new Date(),
                    global_updated_at:new Date(), //make another field that must be changed
                    version:0, deleted:true}
                //global_updated_at
                //time_id
                sh.mergeObjects(reqD, tableSettings.createFields);
                tableSettings.sequelize = sequelize;
                SequelizeHelper.defineTable(tableSettings, doneWithTable);
            }

            function doneWithTable(table) {
                console.log('table ready')
                if ( sttgs.storeTable != false ) {
                    self.Table = table;
                    self.setVersion();
                }
                sh.callIfDefined(fx);
                sh.callIfDefined(sttgs.fx, table)
            }
        }
        //TODO: rip from settings using mysql
        dbHelper.getExistingTable = function (name, fx) {
            var settings = {};
            settings.name = name;
            settings.fx = fx;
            settings.storeTable = false;
            dbHelper.createTable(settings);
        }
        //test
        //create database
        dbHelper.createDatabase()
        //create table

        //check the table



        //need col
    }


    function defineTests() {
        p.compareTables = function compareTables(nameA, nameB, throwError, fx) {

            var t = EasyRemoteTester.create('test compareTables API',{});
            var data = {};

            if ( MySQLDataRepo.dict != null ) {
                MySQLDataRepo.dict= {};
            }

            self.dbHelper.noSync = true;
            self.dbHelper.sequelize = self.sequelize;

            t.add(function getTable1() {
                self.dbHelper.getExistingTable(nameA,
                    function (tbl) {
                        data.table1 = tbl;
                        console.error('got back', tbl.name, nameA)
                        // MySQLDataRepo.dict[] =
                        t.cb();
                    }
                )
            });
            t.add(function getTable2() {
                self.dbHelper.getExistingTable(nameB,
                    function (tbl) {
                        data.table2 = tbl;
                        console.error('got back', tbl.name, nameB)
                        t.cb();
                    }
                )
            });
            t.add(function countTable1() {
                self.dbHelper2.count(function (count) {
                    data.count1 = count;
                    t.cb();
                }, data.table1, data.table1.name)
            });

            t.add(function countTable2() {
                self.dbHelper2.count(function (count) {
                    data.count2 = count;
                    t.cb();
                }, data.table2, data.table2.name)
            })


            t.add(function getTable1_Data() {
                self.dbHelper2.search({},
                    function onObjs1(objs) {
                        data.objs1 = objs;
                        t.cb();
                    }, 1000, 0, data.table1 );
            });

            t.add(function getTable2_Data() {
                self.dbHelper2.search({},
                    function onObjs2(objs) {
                        data.objs2 = objs;
                        t.cb();
                    }, 1000, 0, data.table2 );
            });



            t.add(function compareSize() {
                // (data.count1 == data.count2, 'table not same size' )

                console.log(nameA,data.count1,
                    nameB, data.count2, data.count1 == data.count2 );


                var getId = function getId(obj){
                    return obj.source_node + '_' + obj.id_timestamp.getTime();
                }

                var dictTable1 = sh.each.createDict(
                    data.objs1, getId);
                var dictTable2 = sh.each.createDict(
                    data.objs2, getId);

                function compareDictAtoDictB(dict1, dict2) {
                    var diff = [];
                    var foundIds = [];
                    sh.each(dict1, function (id, objA) {
                        var objB= dict2[id];
                        if ( objB == null ) {
                            console.log('b does not have', id, objA)
                        }
                        foundIds.push(id);
                    });

                    sh.each(dict2, function (id, objB) {
                        if ( foundIds.indexOf(id) != -1 ) {
                            return
                        }
                            console.log('a does not have', id, objB)

                    });
                };

                compareDictAtoDictB(dictTable1, dictTable2);

                if ( throwError != false )
                    t.assert(data.count1 == data.count2,'table not same size' );

                sh.callIfDefined(fx);
                t.cb();
            })

        }
    }

    defineTests();

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        arguments = sh.convertArgumentsToArray(arguments)
        arguments.unshift(self.name+'-repo:')
        return sh.sLog(arguments)
    }
}

exports.MySQLDataRepo = MySQLDataRepo;
exports.MySQLConnector = MySQLDataRepo

if (module.parent == null) {
    var netw = new TopologyHelper();
    'a --> b --> [c,d]'
    var top = [
        ['a', 'b'],
        ['b', ['c', 'd']],
        ['d', ['e']]
    ]
    var dict = {};
    dict['a'] = {};
    //dict['a'].version = 1;
    var dict2 = netw.loadTop(top, dict);

    var nodeA = dict2['a'];
    var nodeD = dict2['d'];
    //function createItems() {
    nodeA.fxStart = function () {
        var t = EasyRemoteTester.create('Test connection basics',{});
        var data = {};



        t.add(showConfigs);


        t.add(function addFirstRecord() {
            nodeA.con.create({name: "roger"})
            nodeA.repo.compareTables('a_table', 'b_table', false);
            t.cb();
        });

        t.add(delayIfNotConverged_showConverged);

        t.wait(8)

        function saveState() {
            sh.each(dict2, function saveState(i, node){
                node.saveState();
            })
            t.cb();
        };

        t.add(saveState);
        t.add(writeLog);

        t.add(showCounts);
        t.add(showConverged);
        t.add(delayIfNotConverged_showConverged);
        t.add(function(){});

        function verifyTables() {
            var t2 = EasyRemoteTester.create('Test connection basics',{});
            var data = {};
            function compareTables(a, b) {
                var tableA = a+'_table';
                var tableB = b+'_table';
                if ( dict2[a]== null || dict2[b] == null) {
                    return function () {
                        t2.cb();
                    }
                    return;
                }
                return function () {
                    nodeA.repo.compareTables(tableA,tableB);
                    t2.cb();
                }
            }
            /*
             nodeA.repo.compareTables('a_table', 'b_table');
             nodeA.repo.compareTables('b_table', 'c_table');
             nodeA.repo.compareTables('a_table', 'b_table');
             nodeA.repo.compareTables('a_table', 'd_table');
             */
            t2.add(compareTables('a', 'b'))

            t2.add(compareTables('b', 'c'))
            t2.add(compareTables('a', 'b'))
            t2.add(compareTables('a', 'd'))
            t2.add(compareTables('a', 'e'))

            t2.fxDone = t.cb;
            t2.add(function endT(){t.cb()})

        }
        t.add(verifyTables);

        t.wait(2)
        t.add(function addFirstRecord() {
            nodeD.con.create({name: "roger-d."})
            // nodeA.repo.compareTables('a_table', 'b_table', false);
            t.cb();
        });
        t.wait(8+0);
        t.add(verifyTables);


        t.wait(2);
        t.add(function addFirstRecord() {
            dict2['e'].con.create({name: "roger-e."})
            t.cb();
        });
        t.wait(8+0);
        t.add(verifyTables);

        t.wait(1);

        function showTotals() {
            console.log('showTotals', 'dict2');
            sh.each(dict2, function saveState(i, node){
                console.log('output for', node.name);
                var moment = require('moment');
                node.data.convergedAgo = moment(node.data.convergedAt).fromNow();
                console.log(sh.toJSONString(node.data))
            })

            console.log('');
            /*sh.each(netw.globalLog, function showLog(i, logLine){
             console.log(i+1+':',logLine);
             })*/
            sh.each.print(netw.globalLog);

            netw.collectHTTPRequest('config', function onShowConfigs(logs){
                sh.each.print(logs)
                t.cb();
            })
        }
        t.add(showTotals);



        function showConfigs() {
            netw.collectHTTPRequest('config', function onShowConfigs(logs, logsDict){
                sh.each.print(logsDict)
                t.cb();
            })
        }
        t.add(showConfigs);


        function writeLog() {
            netw.writeLog('global_log.txt')
            t.cb();
        }
        function showCounts() {
            netw.collectHTTPRequest('counts', function onShowConfigs(logs, logsDict){
                sh.each.print(logsDict)
                t.cb();
            })
        }

        function showConverged() {
            netw.collectHTTPRequest('converged', function onShowConfigs(logs, logsDict){
                sh.each.print(logsDict)
                t.cb();
            });
        }

        var delayedCount = 0
        function delayIfNotConverged_showConverged(){
            netw.collectHTTPRequest('converged', function onShowConfigs(logs, logsDict){
                sh.each.print(logsDict)
                var converged = sh.each.find(  logs, false) == false ;
                var converged2 = sh.each.find( logs, 'false') == false ;
                if ( converged2 == false ) {
                    t.addNext(function () {
                        console.error('delayed ...');
                        t.cb();
                    })
                    t.addNext(t.wait(3,false),1);
                    t.addNext(delayIfNotConverged_showConverged,2);
                    delayedCount++
                    t.cb();
                    return;
                }
                console.error('delayedCount', delayedCount)
                t.cb();
            });
        }

        t.add(writeLog);

    }




    // }
    //sh.wait1Sec(createItems);
    //setTimeout(createItems, 3000)


}
