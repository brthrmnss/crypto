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

//open crypto with the file 



