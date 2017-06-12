/**
 * Created by user on 7/4/15.
 */
/**
 * This script imports initial database file
 * why: when testing on unprovisioned machine
 * alt: use deployment scripts ... they will create user as well.
 * @type {exports|module.exports}
 */
//var rh = require('rhelpers')
var shelpers = require('shelpers');
var sh = shelpers.shelpers;
var RestHelperSQLTest = require('shelpers').RestHelperSQLTest;
var Sequelize = RestHelperSQLTest.Sequelize;

var mysql = require('mysql');

//Example Commands:
/*
 mysql -u root -p
 password
 grant all privileges on yetidb.* to 'yetidbuser'@'localhost' identified by 'aSDDD545y^';
 */
/*
 sequelize.query('SELECT * FROM projects WHERE status = ?',
 { replacements: ['active'], type: sequelize.QueryTypes.SELECT }
 ).then(function(projects) {
 console.log(projects)
 })
 */

var dirMysql = '"'
if ( sh.isWin() ) {
    dirMysql = '"C:/Program Files/MySQL/MySQL Server 5.7/bin/'
}

var imdb_api_get_content = sh.fs.resolve(__dirname + '/' + '../../../imdb_movie_scraper/imdb_api_get_content.js');
var path = sh.fs.resolve(imdb_api_get_content);
//console.log('path', path, sh.fileExists(IMDB_DB_Helper))
var imdb_api_get_content = require(imdb_api_get_content).imdb_api_get_content

//G:\Dropbox\projects\crypto\ritv\imdb_movie_scraper\imdb_api_get_content.js

function IMDB_DB_Helper() {
    var p = IMDB_DB_Helper.prototype;
    p = this;
    var self = this;
    self.dbg = {}

    self.dbg.forceDB = false;
    self.dbg.forceDB = true;

    self.data = {};
    p.method1 = function method1(url, appCode) {
    }

    p.init = function init(config) {


        config = sh.dv(config, {})
        config.logging = sh.dv(config.logging, false)
        //if ( config.logging == null )
        //    config.logging = false;


        self.settings = config;
//mysql -u root -p <  /src/videoproject/Code/node_scripts/node_modules/rhelpers/sql/yetidb.sql

//var cluster_settings = rh.loadRServerConfig();
        var cluster_settings = {};
        var m = {};
        cluster_settings.mysql = m;
        cluster_settings.mysql.user = 'root'
        cluster_settings.mysql.password = 'password'



        if ( sh.isWin() == false ) {
            m.password = null;
            m.user = 'root'
            m.password = 'your_password667'
            //cfg.user ='yetidbuser';
            // cfg.password = 'aSDDD545y';
        }


        self.cluster_settings = cluster_settings;
//cluster_settings.mysql.password = 'password'

        m.databasename = 'imdb_info'

        if (config) {
            sh.mergeObjectsForce(config, m)
        }

        //enable sql logging
        config.logging = console.log



        var configDB = {
            host: cluster_settings.mysql.ip,
            port: cluster_settings.mysql.port,
            database: cluster_settings.mysql.databasename,
            user: cluster_settings.mysql.user,
            password: cluster_settings.mysql.password,
            logging: config.logging
        }
//asdf.g

        var showConfig= true
        showConfig = false;
        if ( self.settings.dbg  || showConfig)
            console.log('config---', m, configDB)
        self.cfg = configDB;

        var configDB = sh.clone(self.cfg)
        delete configDB.database;
        self.cfg2 = configDB; //no database for raw msyql connection

        if (cluster_settings.mysql.password == null) {
            delete configDB.password;
        }


//cannot create user after connection made ...
        var username = "'" + cluster_settings.mysql.mysql_user +
            "'@'localhost'";

        function createUser() {

            var sql = ''
            sql += " CREATE USER " + username + " IDENTIFIED BY '" + cluster_settings.mysql.mysql_pass + "';"
            // sql +=sh.n + " GRANT ALL PRIVILEGES ON *.* TO "+username+";"
            // sql +=sh.n +  " FLUSH PRIVILEGES;"

            console.log(sql)
            connection.query(sql, function (err, rows) {
                // connected! (unless `err` is set)
                console.log('Added user  to  DATABASE');
                if (err != null) {
                    console.error(err)
                }
                assignPriv();
            });

        }

        function assignPriv() {
            var username = "'" + cluster_settings.mysql.mysql_user +
                "'@'localhost'";
            var sql = ''
            // sql += " CREATE USER "+username+" IDENTIFIED BY '"+cluster_settings.mysql.mysql_pass+"';"
            sql += " GRANT ALL PRIVILEGES ON *.* TO " + username + ";"

            console.log(sql)
            connection.query(sql, function (err, rows) {
                // connected! (unless `err` is set)
                console.log('assignPriv OK');
                if (err != null) {
                    console.error(err)
                }
                flushPR();
            });
        }

        function flushPR() {
            var sql = ''
            sql += sh.n + " FLUSH PRIVILEGES;"
            console.log(sql);
            connection.query(sql, function (err, rows) {
                console.log('FLUSH PRIVILEGES  to  DATABASE');
                if (err != null) {
                    console.error(err)
                }
                process.exit();
            });

        }
    }


    function defineXDeleteDB() {

        self.connectToDb = function connectToDB(fxDone, fxDone2) {
            var connection = mysql.createConnection(self.cfg2);
            console.error('are you sure you want to override a remote database???',
                'cluster_settings.mysql.ip', self.cluster_settings.mysql.ip)
            self.connection = connection;
            //connect to database
            connection.connect(function (err) {
                if (err) {
                    console.log('db config', self.configDB)
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                console.log('connected as id ' + connection.threadId);

                //return;
                if (fxDone == null) {
                    self.step1_backupDb(null, fxDone2);
                } else {
                    sh.callIfDefined(fxDone);
                }

            });


        }


        self.step1_backupDb = function step1_backupDb(fxDone, fxDone2) {
            var file_sql_export = __dirname + '/' + self.cluster_settings.mysql.databasename + '_' + 'database_export.sql'
            file_sql_export = sh.fs.resolve(file_sql_export);

            //run mysql to import database file
            var child_process = require('child_process');
            var cmd = dirMysql+"mysqldump\" -u " + self.cluster_settings.mysql.user
            if (self.cluster_settings.mysql.password) {
                cmd += " --password=" + self.cluster_settings.mysql.password
            }
            cmd += ' ' + self.cluster_settings.mysql.databasename + " > " + file_sql_export
            console.log('runnning file_sql_export...');
            child_process.exec(cmd, function (err, stdout, stderr) {
                console.error(err);
                console.error(stderr);
                console.log(stdout);
                if (fxDone == null) {
                    self.step2_createDatabase(fxDone2);
                }
                else {
                    sh.callIfDefined(fxDone)
                }

            });
        }

        self.step2_createDatabase = function step2_createDatabase(fxDoneCreate) {
            var query = "CREATE DATABASE  IF NOT EXISTS " +
                self.cluster_settings.mysql.databasename + ";"
            console.log('query ' + query);
            if (fxDoneCreate == null)
                fxDoneCreate = self.step3_loadDatabase
            self.connection.query(query, self.step3_loadDatabase);
        }


        self.step3_loadDatabase = function step3_loadDatabase(err, rows) {
            self.createRESTHelper();
            return;

        }

        self.deleteDB = function deleteDB() {
            self.connectToDb(null, self.deleteDatabase);
        }

        self.createDB = function createDB() {
            self.connectToDb(null, null);
        }


        self.deleteDatabase = function deleteDatabase() {
            var query = "drop DATABASE " +
                self.cluster_settings.mysql.databasename + ";"
            console.log('query ' + query);
            self.connection.query(query);
            //k.j
        }


        self.importFile = function fileName(file_sql) {
            console.log('CREATE DATABASE', err);
            //read initial database file
            //var file_sql = __dirname+'/database.sql'
            file_sql = sh.fs.resolve(fileSQL);
            //var contents = sh.readFile(file_sql); //verify file can be read

            //run mysql to import database file
            var child_process = require('child_process');
            var cmd = dirMysql+"mysql\" -u " + self.cluster_settings.mysql.user +
                " --password=" + self.cluster_settings.mysql.pass + " " +
                self.cluster_settings.mysql.databasename + " < " + file_sql
            self.proc('runnning cmd...', cmd);
            child_process.exec(cmd, function (err, stdout, stderr) {
                console.error(err);
                console.error(stderr);
                console.log(stdout);
                process.exit(0);
            });

        }
    }

    defineXDeleteDB();


    function defineX2() {


        self.x = {};
        self.x.connectToDb = function connectToDB(t, cb) {
            var connection = mysql.createConnection(self.cfg2);
            console.error('are you sure you want to override a remote database???',
                'cluster_settings.mysql.ip', self.cluster_settings.mysql.ip)
            console.info('connect to db', self.cfg2)
            self.connection = connection;
            //connect to database
            connection.connect(function (err) {
                if (err) {
                    console.log('db config', self.configDB)
                    console.error('error connecting: ' + err.stack);
                    //  return;
                }
                console.log('connected as id ' + connection.threadId);

                cb()

            });


        }


        self.x.step1_backupDb = function step1_backupDb(t, cb) {
            var file_sql_export = __dirname + '/' + self.cluster_settings.mysql.databasename + '_' + 'database_export.sql'
            file_sql_export = sh.fs.resolve(file_sql_export);

            //run mysql to import database file
            var child_process = require('child_process');
            var cmd = dirMysql+"mysqldump\" -u " + self.cluster_settings.mysql.user
            if (self.cluster_settings.mysql.password) {
                cmd += " --password=" + self.cluster_settings.mysql.password
            }
            cmd += ' ' + self.cluster_settings.mysql.databasename + " > " + file_sql_export
            console.log('runnning file_sql_export...');
            child_process.exec(cmd, function (err, stdout, stderr) {
                console.error(err);
                console.error(stderr);
                console.log(stdout);
                cb()

            });
        }


        self.x.step1_backupDb_remote = function step1_backupDb_remote(t, cb) {


            //run mysql to import database file
            var child_process = require('child_process');
            var cmd = dirMysql+"mysqldump\" -u " + self.settings.remoteDB.user
            if (self.settings.remoteDB.password) {
                cmd += " --password=" + self.settings.remoteDB.password
            }
            if (self.settings.remoteDB.host) {
                cmd += " --host=" + self.settings.remoteDB.host
            }
            if (self.settings.remoteDB.port) {
                cmd += " --port=" + self.settings.remoteDB.port
            }
            cmd += ' ' + self.settings.remoteDB.databasename + " > " + self.settings.remoteDB.file_sql_export
            console.log('runnning file_sql_export...');
            child_process.exec(cmd, function (err, stdout, stderr) {
                console.error(err);
                console.error(stderr);
                console.log(stdout);
                //  process.exit()
                cb()
            });
        }

        self.x.step2_createDatabase = function step2_createDatabase(t, cb) {
            var query = "CREATE DATABASE  IF NOT EXISTS " +
                self.cluster_settings.mysql.databasename + ";"
            console.log('query ' + query);

            self.connection.query(query, cb);
        }


        self.x.step3_loadDatabase = function step3_loadDatabase(err, rows) {

            self.createRESTHelper();
        }


        self.x.deleteDatabase = function deleteDatabase(t, cb) {
            var query = "drop DATABASE " +
                self.cluster_settings.mysql.databasename + ";"
            console.log('query ' + query);
            self.connection.query(query);
            h.l
            cb()
        }

        self.x.importFile = function fileName(file_sql) {
            self.proc(file_sql);
            //read initial database file
            //var file_sql = __dirname+'/database.sql'
            file_sql = sh.fs.resolve(file_sql);
            //var contents = sh.readFile(file_sql); //verify file can be read

            //run mysql to import database file
            var child_process = require('child_process');
            var cmd = dirMysql+"mysql\" -u " + self.cluster_settings.mysql.user + ' ';
            if (self.cluster_settings.mysql.password) {
                cmd += " --password=" + self.cluster_settings.mysql.password + " "
            }
            cmd += " " + self.cluster_settings.mysql.databasename + " < " + file_sql;
            self.proc('runnning cmd...', cmd);
            child_process.exec(cmd, function (err, stdout, stderr) {
                console.error(err);
                console.error(stderr);
                console.log(stdout);
                // cb()
                //process.exit(0);
            });

        }
    }

    defineX2();
    p.createRESTHelper = function createRESTHelper() {
        var server = {};
        server = null; //? //dib;t want a server made

        var tableName = self.settings.tableName;
        var tableName = sh.dv(tableName, 'imdb_info')
        if ( self.settings.dbg )
            console.error('createRESTHelper', tableName, 'y', self.settings)
        var fields = self.settings.fields;

        var defaultFields =  {
            name: "",
            episode_name: "", desc: "text",
            imdb_id: "",
            imdb_series_id: "",
            seasonNumber: 0, episodeNumber: 0,
            user_id: 0,
            year: "",
            rating: "",
            series: true,
            episode: true,
            show_name:"",
            ended: true,
            start: new Date(),
            end: new Date(),
            json: "text"
        }

        fields = sh.dv(fields, defaultFields)



        self.breadcrumbs = RestHelperSQLTest.createHelper(tableName,
            server,
            {
                name: tableName,
                fields: fields,
                //fxUserId:self.utils.getUserIdFromSession
                //,
                //fxGetUserId:LoginAPIConsumerService.pullSessionIDFromRequest,
                fxStart: testBreadCrumbsUserId,
                //port:self.settings.port,
                cfg: {db: self.cfg},
                settings:self.settings,
                logging:false //.logging for rcLive imdb.logging
            }
        );
        //sh.exit('what is logging', self.breadcrumbs.logging)
        //self.breadcrumbs.logging = false;

        self.sequelize = self.breadcrumbs.sequelize;
        self.Table = self.breadcrumbs.Table;

        //console.log(self.Table, 'sss')
        //asdf.g
        function testBreadCrumbsUserId() {
            //asdf.g
            //self.proc('imdb db rest helper created')
            sh.callIfDefined(self.fxDone);
        }

        //asdf.g
    }


    function defineUpserts() {
        //why: methods update records
        p.upsertIMDBContent = function upsertIMDBContent(content) {

            self.proc('what is name of dbHelper?', self.nameDBHelper)

            if ( self.breadcrumbs == null ) {
                self.proc('name setting2', self.settings.name)
                asdf.g
            }
            //asdf.g
            var y = self.breadcrumbs;
            var req = {}
            req.method = 'GET'
            req.query = content;
            req.url = ''; //for counting of upsertQuery in fxSearch
            content.name = content.title;
            req.query.upsertQuery = {imdb_id: content.imdb_id}
            var rest = {};
            rest.created = sh.noOp;
            rest.accepted = sh.noOp;
            self.breadcrumbs.ext.createItem(req, rest)
            return;z
        }


        p.upsertIMDBEpisodeContent = function upsertIMDBEpisodeContent(content, epi) {
            content = sh.clone(content);


            var req = {}
            req.method = 'GET';
            if (epi) {
                epi = sh.clone(epi);

                epi.name = content.title;
                epi.episode_name = epi.title;
                epi.imdb_series_id = content.imdb_id;

                if ( epi.episode ) {
                    console.log('what is setting the episode?', '...')
                }
                delete epi.episode;
                
                epi.show_name = content.title; 

                req.query = epi;
                req.url = ''; //for counting of upsertQuery in fxSearch
                content.name = content.title;
                req.query.upsertQuery = {imdb_id: epi.imdb_id}
            }
            else {
                req.query = content;
                req.url = ''; //for counting of upsertQuery in fxSearch
                content.name = content.title;
                req.query.upsertQuery = {imdb_id: content.imdb_id}
                //sh.exit('sdf')
            }
            req.silentNoDbg = true
            //asdf.g
            var rest = {};
            rest.created = sh.noOp;
            rest.accepted = sh.noOp;
            self.breadcrumbs.ext.createItem(req, rest)
            return;
        }




        p.getIMDBContentByID = function getIMDBContentByID(imdb_id, fxGotContent,
                                                           seasonNumber, episodeNumber,
                                                           getIMDBShowInformation,
                                                           overrideForceDB) {
            if ( self.data.searchAttempts == null ) {
                self.data.searchAttempts  = {};
            }
            var searchBeforeIndex = sh.join(imdb_id,seasonNumber,episodeNumber)
            //TODO: ADd logic to verify that something has been checked a few days ago
            var searchBeforeIndex = sh.join(imdb_id ) //since we get all episodes ... only need to do this 1x
            var args = sh.convertArgumentsToArray(arguments)
            var req = {}
            req.method = 'GET';
            req.query = {imdb_id: imdb_id}
            //self.proc('go',imdb_id, seasonNumber, episodeNumber )
            //console.error('go',imdb_id, seasonNumber, episodeNumber )
            if (seasonNumber) {
                req.query = {imdb_series_id: imdb_id};
                req.query.seasonNumber = seasonNumber;
                req.query.episodeNumber = episodeNumber;
            }
            req.url = ''; //for counting of upsertQuery in fxSearch
            var rest = {};
            rest.ok = function onSearchResult(x) {
                // self.proc('x', x)
                if ( self.dbg.forceDB )
                {
                    if ( overrideForceDB != true) {
                        self.proc('must forcedb again', x.length)
                        //asdf.g
                        x = [];
                    }
                }
                // console.log('have reuslt', x)
                if ( imdb_id != null &&
                    x.length == 0 && getIMDBShowInformation != false) {
                    var searchedBefore = self.data.searchAttempts[searchBeforeIndex];
                    if ( searchedBefore ) {
                        self.proc('searche for this episode preivously ... not sure what is going on', sh.join(seasonNumber,episodeNumber))
                        sh.callIfDefined(fxGotContent, x)
                        return;
                    } else {
                        self.data.searchAttempts[searchBeforeIndex]  = true;
                    }
                    self.proc("dont' have this idmb so looking it up")
                    self.getIMDB_fromInternet(imdb_id, function onUpdatedDatabase(imdbResult) {
                        // sh.callIfDefined(fxGotContent, x)

                        setTimeout(function callLaterAfterDBCommit () {
                            dbg =[imdbResult]
                            p.getIMDBContentByID.apply(p, args); //try again with new file
                        }, 500)

                    })


                    return;
                }
                if ( imdb_id == null ) {
                    self.proc('path did not have imdb_id', imdb_id, 'what is the path...')
                }
                sh.callIfDefined(fxGotContent, x)
            }
            self.breadcrumbs.ext.searchItems(req, rest)
            return;
        }


        p.getIMDB_fromInternet = function getIMDB_fromInternet(imdb, cb) { //if imdb does not exist in database, add it

            // var i = new imdb_api_get_content();
            var opts = {}
            opts.saveToDB=true

            //opts.saveToDB=false
            //remove after fix
            opts.dbHelper = self.dbHelper;
            opts.dbHelper = self;
            self.nameDBHelper ='dbHelperFromTop'
            // console.log('is null', self.breadcrumbs)
            // sh.exit()
            opts.fxDone = function onFinsihedCollectedAllItems(dictContent){
                //console.log('boom', dictContent)
                var count = 0
                sh.each(dictContent, function onGoThroughEachResult_inIMDBDict(imdb_id, content) {
                    count ++;
                    console.log(count, 'for id', imdb_id, content.name, content.series, content.episodeSummary)
                })
                self.proc('finished collected all items', dictContent.length)
                //asdf.g
                cb()
            }
            //  sssssssssssssssssf.d
            //imdb_api_get_content.getContentComplete(imdb, cb, opts)
            imdb_api_get_content.get_episodes(imdb, cb, opts)
        };

        p.getUntilDone = function (query, limit, fx, fxDone, count) {
            self.breadcrumbs.Table

        }


    }
    defineUpserts();


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
                fullQuery.where = query;
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
            if ( self.settings.showLogging) {
                console.error(self.Table, 'sss')
            }
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
                        //order: 'global_updated_at ASC'
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
                        function fxAsyncContinue() {
                            sh.callIfDefined(nextQuery)
                        }
                        var inAsync = sh.callIfDefined(fx, records, lastPage, fxAsyncContinue);
                        if ( inAsync ) {
                            return;
                        }
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
        dbHelper.search = function search(query, fx, convert, debugQuery, retry, doNotUpsert) {
            convert = sh.dv(convert, true)
            //table = sh.dv(table, self.Table);
            var fullQuery = dbHelper.utils.queryfy(query)
            //asdf.g
            /*if ( self.settings.logConsole != false ) {
             console.error('full query', fullQuery)
             }*/

            //debugQuery = true

            console.log('-->fullQuery', 'agasint oldrcdb?',  self.cfg, self.Table.name,  'todo:why?', fullQuery)


            //console.log('-->fullQuery', self.Table)
            if ( debugQuery )
                self.proc('full query', sh.toJSONString( fullQuery))




            var y = new Error()
            self.Table.findAll(
                fullQuery
            ).then(function onResults_IMDB(objs) {

                    if ( objs.length == 0 && retry != true ) {
                        //sh.exit('see query', self.Table.name, objs.length,doNotUpsert,  y.stack,0 )
                        //query, fx, convert, debugQuery, retry
                        self.proc(sh.t, 'did not get any results for query', query)
                        // asdf.g
                        //  sh.exit('why not get epi and movie?  ')
                        if ( doNotUpsert != true ) {
                            if (query.imdb_id) {
                                console.log(query.imdb_id)
                                self.getIMDB_fromInternet([query.imdb_id], function sdf(sdf) {
                                    dbHelper.search(query, fx, convert, debugQuery, true)
                                })
                                return;
                                //asdf.g
                            }

                            if (query.imdb_series_id) {
                                console.log(query.imdb_series_id)
                                self.getIMDB_fromInternet([query.imdb_series_id], function sdf(sdf) {
                                    dbHelper.search(query, fx, convert, debugQuery, true)
                                })
                                return;
                                //asdf.g
                            }
                        } else {
                            self.proc('doing no upsert...')
                        }


                        self.proc('i go back zero results, and i have no id, so i cannot continue ')
                        console.error('got 0: no valid id on ', fullQuery, query)
                        sh.callIfDefined(fx, [])
                        return;
                        asdf.g
                    }
                    if (  objs.length == 0 && retry == false  ) {
                        asdf.g
                    }
                    //sh.exit('d')
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
                        sh.callIfDefined(fx);

                    }).catch(function (err) {
                        console.error(err, err.stack)
                        throw  err
                    })
                } else {
                    self.proc('no records to create')
                    sh.callIfDefined(fx)
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

            self.utils.fixRecordForSave(item)


            //console.error(record)
            //sh.x('what is record to add', record)
            //asdf.g
            // item.id = 14000
            // item.id = null;
            // delete item.id;
            delete item.id
            var newRecords = [item];
            self.Table.bulkCreate(newRecords).then(function (objs) {
                self.proc('all records created', objs.length);
                sh.callIfDefined(fx);
            }).catch(function failedToAddNewRecord(err) {
                self.proc('issue saving new record');
                console.error('file', record)
                console.error('addNewRecord', err, err.stack);
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

        self.dbHelper2.updateRecord = function updateRecord(record, cb) {
            var attrs = record.dataValues;
            // attrs.deleted = true;
            //attrs.updated_by_source = self.settings.name;
            //attrs.global_updated_at = new Date();

            self.utils.fixRecordForSave(attrs)
            console.error('wtf', attrs)
            record.updateAttributes(attrs).then( cb  );
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


    function defineUtils() {
        self.utils = {};
        self.utils.fixRecordForSave = function fixRecordForSave(item){
            if ( item.originalFilename &&
                item.originalFilename.indexOf('/') != -1  ) {
                item.originalFilename = item.originalFilename.split('/').slice(-1)[0];
            }
        };

    }
    defineUtils()

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}


exports.DBHelper = IMDB_DB_Helper;
if (module.parent == null) {

    var i = new IMDB_DB_Helper();
    i.init();
    //i.connectToDb()

    // i.createRESTHelper();
}
