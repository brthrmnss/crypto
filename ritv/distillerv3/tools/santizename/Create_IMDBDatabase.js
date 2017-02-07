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


function Create_IMDBDatabase() {
    var p = Create_IMDBDatabase.prototype;
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
        i.createDB();


    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}


if ( module.parent == null ) {

    var i = new Create_IMDBDatabase();
    i.init();

}
