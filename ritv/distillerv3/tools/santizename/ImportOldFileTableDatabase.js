/**
 * Created by user on 7/4/15.
 * Import from file or from live database
 * goal: copy remote database to local oldrcdb for translation
 */
/**
 */
//var rh = require('rhelpers')
var shelpers = require('shelpers');
var sh = shelpers.shelpers;
var RestHelperSQLTest = require('shelpers').RestHelperSQLTest;
var Sequelize = RestHelperSQLTest.Sequelize;
var PromiseHelperV3 = shelpers.PromiseHelperV3;

//Example Commands:


function ImportOldFileTableDatabase() {
    var p = ImportOldFileTableDatabase.prototype;
    p = this;
    var self = this;

    p.init = function init(url, appCode) {
        var dbname = 'imdbtest';
        var DBHelper = require('./IMDB_DB_Helper').DBHelper
        var i = new DBHelper();
        //var cfg = i.utils.make()
        var cfg = {
            databasename	: 'oldRCdb',
        }

        cfg.remoteDB = {
            user:'yetidbuser2',
            password:'aSDDD545y^',
            password:'aSDDD545y', //no special chars
           // user:'root',
           // password:'your_password667',
          //  password:'password',
            host:'37.48.93.30',
           // host:'5.79.75.96',
            port:'12889',
            databasename:'yetidb'
        }

        var file_sql_export = __dirname + '/' + cfg.remoteDB.databasename + '_' + 'database_export.sql'
        file_sql_export = sh.fs.resolve(file_sql_export);
        cfg.remoteDB.file_sql_export = file_sql_export

        i.init(cfg);

        var chain = new PromiseHelperV3();
        var token = {};
        token.silentToken = true
        chain.wait = token.simulate == false;
        chain.startChain(token)
        chain.add(i.x.connectToDb)
        if ( cfg.remoteDB == null ) {
            chain.add(i.x.step1_backupDb)
        } else {
            chain.add(i.x.step1_backupDb_remote)
        }
        chain.add(i.x.step2_createDatabase)
        //chain.add(i.x.step3_loadDatabase)
        if ( cfg.remoteDB == null ) {
            chain.add(function (k,v) {
                i.x.importFile('fileimport.sql')
            })
        } else {
            chain.add(function (k,v) {
                i.x.importFile(cfg.remoteDB.file_sql_export)
            })
        }

        //  i.deleteDB();
        /*
         i.connectToDb(null, function onConnect(){
         i.step2_createDatabase(function onCreatedDatabase () {
         asdf.g
         i.importFile('fileimport.sql')
         })

         })

         */








    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}


if ( module.parent == null ) {

    var i = new ImportOldFileTableDatabase();
    i.init();

}
