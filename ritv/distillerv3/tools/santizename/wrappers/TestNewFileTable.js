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

    p.init = function init(url, appCode) {
        var dbname = 'imdb_info';
        //var i = new InitDatabase();
        //i.init();

        //i.createRESTHelper();
        var DBHelper = require('./IMDB_DB_Helper').DBHelper
        var i = new DBHelper();
        i.init();
        i.deleteDB();


    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}


if ( module.parent == null ) {

    var i = new DeleteIMDBDatabase();
    i.init();

}
