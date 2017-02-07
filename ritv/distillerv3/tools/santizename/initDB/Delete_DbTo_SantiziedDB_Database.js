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
var child_process = require('child_process');

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


function DeleteIMDBDatabase() {
    var p = DeleteIMDBDatabase.prototype;
    p = this;
    var self = this;

    var dirMysql = '"'
    if ( sh.isWin() ) {
        dirMysql = '"C:/Program Files/MySQL/MySQL Server 5.7/bin/'
    }

    p.init = function init(config) {
        var dbname = 'imdb_info';
        //var i = new InitDatabase();
        //i.init();

        /*  //i.createRESTHelper();
         var DBHelper = require('./IMDB_DB_Helper').DBHelper
         var i = new DBHelper();
         i.init();
         i.deleteDB();*/

        self.settings= sh.dv(config, {})

        var cluster_settings = {};
        var m = {};

        cluster_settings.mysql = m;
        cluster_settings.mysql.user = 'root'
        cluster_settings.mysql.password = 'password'
        cluster_settings.mysql.databasename = 'rcLive'

        var configDB = {
            host: cluster_settings.mysql.ip,
            port: cluster_settings.mysql.port,
            database: cluster_settings.mysql.databasename,
            user: cluster_settings.mysql.user,
            password: cluster_settings.mysql.password,
            logging: self.settings.logging
        }
        self.configDB = configDB;

        // var configDB = sh.clone(self.cfg)

        self.deleteDB();

    }




    function defineXDeleteDB() {
        p.connectToDb = function connectToDB(fxDone, fxDone2) {
            var connection = mysql.createConnection(self.configDB);
            console.error('are you sure you want to override a remote database???',
                'cluster_settings.mysql.ip', self.configDB.host, self.configDB.port)
            self.connection = connection;


            function onNext() {
                if (fxDone == null) {
                    self.step1_backupDb(null, fxDone2);
                } else {
                    sh.callIfDefined(fxDone);
                }
            }

            // sh.exit()
            //connect to database
            connection.connect(function onConnectedToDB(err) {
                if (err) {
                    console.log('db config', self.configDB)
                    console.error('error connecting: ' + err.stack);


                    onNext()

                    return;
                }
                console.log('connected as id ' + connection.threadId);

                //return;
                onNext()

            });


        }


        p.step1_backupDb = function step1_backupDb(fxDone, fxDone2) {
            var file_sql_export = sh.fs.join(__dirname, 'dbBackups',
                [self.configDB.database , 'database_export.sql'] );

            var dirDBBackups = sh.fs.mkdirp(file_sql_export, true)

            // sh.exit(file_sql_export)
            file_sql_export = sh.fs.resolve(file_sql_export);

            //run mysql to import database file
            var cmd =  dirMysql+"mysqldump\" -u " + self.configDB.user
            if (self.configDB.password) {
                cmd += " --password=" + self.configDB.password
            }
            cmd += ' ' + self.configDB.database + " > " + file_sql_export
            console.log('runnning file_sql_export...');
            child_process.exec(cmd, function onMysqlCommandFinished(err, stdout, stderr) {
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

        p.step2_createDatabase = function step2_createDatabase(fxDoneCreate) {
            var query = "CREATE DATABASE  IF NOT EXISTS " +
                self.configDB.database + ";"
            console.log('query ' + query);
            if (fxDoneCreate == null)
                fxDoneCreate = self.step3_loadDatabase
            self.connection.query(query, self.step3_loadDatabase);
        }


        p.step2_createDatabase2 = function step2_createDatabase(fxDoneCreate) {
            var query = "CREATE DATABASE  IF NOT EXISTS " +
                self.configDB.database + ";"
            console.log('query ' + query);
            //run mysql to import database file

            var cmd =  dirMysql+"mysql\" -u " + self.configDB.user
            if (self.configDB.password) {
                cmd += " --password="  + self.configDB.password
            }
            cmd += " -e "+' ' + sh.qq(query)

            console.log('runnning file_sql_export...');
            child_process.exec(cmd, function onMysqlCommandFinished(err, stdout, stderr) {
                if ( err ) {
                    console.error(err);
                }
                if ( err ) {
                    console.error(stderr);
                }
                console.log(stdout);

                sh.callIfDefined(fxDoneCreate)

            });
        }



        p.step3_loadDatabase = function step3_loadDatabase(err, rows) {
            // self.createRESTHelper();
            return;

        }

        p.deleteDB = function deleteDB() {
            self.connectToDb(
                function onConnectedAndBakcuedUp() {
                    self.proc('cleared and ready')
                    self.deleteDatabase( onDeleted)
                }
            );

            function onDeleted(err) {
                self.step2_createDatabase2();
            }
        }

        p.createDB = function createDB() {
            self.connectToDb(null, null);
        }


        p.deleteDatabase = function deleteDatabase(fxDone) {
            var query = "drop DATABASE " +
                self.configDB.database + ";"
            console.log('delete query ' + query);
            self.connection.query(query, fxDone);
            //k.j
        }


        p.importFile = function fileName(file_sql) {
            console.log('CREATE DATABASE', err);
            //read initial database file
            //var file_sql = __dirname+'/database.sql'
            file_sql = sh.fs.resolve(fileSQL);
            //var contents = sh.readFile(file_sql); //verify file can be read

            //run mysql to import database file
            var cmd = dirMysql+"mysql\" -u " + self.configDB.user +
                " --password=" + self.configDB.pass + " " +
                self.configDB.database + " < " + file_sql
            self.proc('runnning cmd...', cmd);
            child_process.exec(cmd, function onCommandRun(err, stdout, stderr) {
                console.error(err);
                console.error(stderr);
                console.log(stdout);
                process.exit(0);
            });

        }
    }

    defineXDeleteDB();


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.DeleteIMDBDatabase = DeleteIMDBDatabase
if ( module.parent == null ) {

    var i = new DeleteIMDBDatabase();
    i.init();

}
