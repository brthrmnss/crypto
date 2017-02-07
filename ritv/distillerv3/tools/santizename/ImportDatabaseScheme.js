/**
 * Created by user on 7/4/15.
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
        var dbname = 'imdb_info';
        var DBHelper = require('./IMDB_DB_Helper').DBHelper
        var i = new DBHelper();
        //var cfg = i.utils.make()
        var cfg = {
            databasename	: 'rcLive',
            password:"your_password667"
        }

        //mysqladmin password "your_password667"
        i.init(cfg);

        var chain = new PromiseHelperV3();
        var token = {};
        token.silentToken = true
        chain.wait = token.simulate == false;
        chain.startChain(token)
        chain.add(i.x.connectToDb)
        chain.add(i.x.step1_backupDb)
        chain.add(i.x.step2_createDatabase)
        //chain.add(i.x.step3_loadDatabase)
        chain.add(function (k,v) {
            i.x.importFile('rcdatabase.sql')
        });
        
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
