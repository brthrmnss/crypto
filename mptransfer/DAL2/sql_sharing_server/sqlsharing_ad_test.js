/**
 * Created by user on 1/13/16.
 */
/**
 * Created by user on 1/3/16.
 */

var rh = require('rhelpers');
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var DbGlueTest = require('./sql_sharing_server_tests_augment_cleaned.js').DbGlueTest

if (module.parent == null) {
    var config = {};

    var service = new DbGlueTest();
    service.init(config);
    service.setupOverides()
   // service.createTestNode('a');
   /* var cfg = {};
    cfg.fxDone = function fxDoneTests() {
        //asdf.g
     //   var inst = [service.data.topology.a, service.data.topology.b]

    }
    service.createTestNode('b', cfg);*/

    service.t.testADNodes(fxDone_Finished_CleanedTests);
    function fxDone_Finished_CleanedTests() {
        console.error('fxDone_Finished_CleanedTests')
    }

}



