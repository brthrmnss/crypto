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

var  Peer = require('./actors/Peer').Peer;

function TopologyHelper() {
    var p = TopologyHelper.prototype;
    p = this;
    var self = this;
    p.loadTop = function loadTop(topology, dictNodeSettings) {
        self.globalLog = [];
        var count =  0
        function createNewPeer(name, settings) {
            var actor = new Peer()
            actor.name = name
            actor.init();
            actor.settings.port = count + 3000;
            actor.url = 'http://127.0.0.1:'+
                actor.settings.port+ '/';
            count++

            actor.globalLog = self.globalLog;
            return actor;
        }

        var dictNodes = {};
        var allNodes = [];
        self.dictNodes = dictNodes;

        sh.each(topology, function linkPairs(i,topSet) {

            var a = topSet[0];
            var b = topSet[1];

            if ( dictNodes[a]==null) {
                var nodeA = createNewPeer(a)
                allNodes.push(nodeA)
                dictNodes[a] = nodeA;
            } else {
                nodeA =  dictNodes[a]
            }

            if ( sh.isArray(b) == false ) {
                b = [b];
            }

            sh.each(b, function createBNodes(i,b){
                if ( dictNodes[b]!=null) {
                    nodeB = dictNodes[b];
                } else {
                    var nodeB = createNewPeer(b)
                    allNodes.push(nodeB)
                    dictNodes[b] = nodeB;
                }
                //make copies to simulate real modeling
                nodeA.linkTo(sh.clone(nodeB));
                nodeB.linkTo(sh.clone(nodeA));
            })

        })


        /* //full mesh
         sh.each(allNodes, function linkAllNodes(i,nodeFrom){
         nodeFrom.settings.port = 3000 + i;
         sh.each(allNodes, function linkAllNodes(i,nodeTo){
         if ( nodeFrom == nodeTo ) { return }
         nodeFrom.linkTo(nodeTo)
         nodeTo.linkTo(nodeFrom)
         })
         });
         */

        sh.each(dictNodeSettings, function addNode(i, nodeSettings) {
            var node = dictNodes[i];
            if ( nodeSettings.version != null )
                node.repo.version = nodeSettings.version;
        });


        sh.each(allNodes, function linkAllNodes(i,nodeFrom){
            nodeFrom.start();
        })


        return dictNodes;
    }


    p.collectHTTPRequest = function collectHTTPRequest(url, fx, display) {

        function AsyncRequest() {
            var p = AsyncRequest.prototype;
            p = this;
            var self = this;

            var request = require('request');

            p.iterate = function method1(settings) {
                self.settings = settings;

                self.results = [];
                self.dictResults = {};
                //could use async but need failure methods
                self.settings.itemsLength = self.settings.items.length;
                if ( self.settings.items.length == null ) {
                    self.settings.itemsLength = 0;
                    sh.each(self.settings.items, function countDict(i, item) {
                        self.settings.itemsLength++;
                    });
                }

                sh.each(self.settings.items, function runMethodOnNode(i, item) {

                    var name = item.name;
                    var reqOptions = {};
                    reqOptions.url = item.url + url

                    var cb_ = function callbackResults ( result ) {
                        self.dictResults[name] = result;
                        self.results.push(result)
                        if ( self.results.length == self.settings.itemsLength ) {
                            sh.callIfDefined(self.settings.fxEnd, self.results, self.dictResults)
                        }
                    }
                    request(reqOptions, function onResponse(error, response, body) {
                        if ( error != null ) {
                            cb_(error)
                            return;
                        }
                        if ( response.statusCode != 200) {
                            cb_( response.statusCode + ' '  + body)
                            return;
                        }
                        cb_(body)
                    })

                    if ( self.settings.timeout != null ) {
                        setTimeout(function finishEarlyIteration() {
                            cb_('timeout ' + reqOptions.url);
                            cb_ = function (err) { console.log('bad response '+ err)}
                        }, self.settings.timeout*1000)
                    }
                })
            };

            p.proc = function debugLogger() {
                if ( self.silent == true) {
                    return
                }
                sh.sLog(arguments)
            };
        }
        exports.AsyncRequest = AsyncRequest;


        var aR = new AsyncRequest()
        var settings = {};
        settings.name = 'go through all urls'
        settings.items = self.dictNodes;
        settings.timeout= 2;
        settings.url = 'config'
        settings.fxEnd = function (results , dict) {
            if ( display == true ) {
                console.log(settings.name);
                sh.each.print(results);
            }
            sh.callIfDefined(fx, results, dict)
        };
        /*settings.fxGenRoute = function (node ) {
         return node.url;
         }
         settings.fxGenName = function (item) {
         return item.name;
         }*/
        settings.nameProp = 'name'
        settings.propUrl = 'url'
        aR.iterate(settings)



    }



    p.writeLog = function writeLog(filename) {
        filename = sh.dv(filename, 'global_log.txt')
        var strGlobalLogContents = sh.each.print(self.globalLog, null, null, false)
        sh.writeFile(filename, strGlobalLogContents.join('\n'));
    }
    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        return sh.sLog(arguments)
    }
}

exports.TopologyHelper = TopologyHelper;

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
    nodeA.fxStart = function testTopology() {
        var t = EasyRemoteTester.create('Test connection basics',{});
        var data = {};
        data.delayedCount = 0;
        t.add(showConfigs);

        t.add(function addFirstRecord() {
            nodeA.con.create({name: "roger"})
            nodeA.repo.compareTables('a_table', 'b_table', false);
            t.cb();
        });

        t.add(delayIfNotConverged_showConverged);

        //t.wait(8)

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


        //return;

        t.add(delayIfNotConverged_showConverged);
        //t.addPause('everything is converged', true );// (function(){});

        function verifyTables() {
            var t2 = EasyRemoteTester.create('Test connection basics',{});
            var data = {};
            function compareTables(a, b) {
                var tableA = a+'_table';
                var tableB = b+'_table';
                //l: if any table is null, go to next link
                if ( dict2[a]== null || dict2[b] == null) {
                    return function () {
                        t2.cb();
                    }
                    return;
                }
                return function () {
                    nodeA.repo.compareTables(tableA,tableB,
                        true, t2.cb );
                    //t2.cb();
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

            //t2.fxDone = t.cb;
            t2.add(function endT(){

                console.log('done verify tables');
                t.cb()})

        }
        t.add(verifyTables);

        t.log('passed first test', 3)
        //t.wait(2)
        t.add(function addFirstRecord() {
            t.logNow('adding new record to D');
            nodeD.con.create({name: "roger-d."});
            //nodeD.con.sync();
            nodeD.con.requestSync();
            // nodeA.repo.compareTables('a_table', 'b_table', false);
             t.cb();
        });

        /*t.add(function verifyRecords() {
         //get allr ecords from a compare to b ... etc
         t.cb();
         });*/

        t.add(delayIfNotConverged_showConverged);
        //t.wait(8+0);
        t.add(verifyTables);
        t.addPause('everything is converged', true );

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


        function delayIfNotConverged_showConverged(){
            console.error('delayIfNotConverged_showConverged', 'delayed...', data.delayedCount);
            if ( data.delayedCount == null ) { asdf.gg }
            netw.collectHTTPRequest('converged', function onShowConfigs(logs, logsDict){
                sh.each.print(logsDict);
                var convergedBool = sh.each.find(  logs, false) == false ;
                var convergedStr = sh.each.find( logs, 'false') == false ;
                var timeouts = sh.each.find( logs, 'timeout') == true ;
                console.log('verify converged',convergedBool, convergedStr, timeouts )
                if ( ( convergedBool == false || convergedStr == false )
                    || timeouts ) {
                    console.error('delayed...', data.delayedCount);
                    if ( data.delayedCount   < 15 ) {
                        console.error('delayed is less than 15')
                        t.addNext(function delayed() {
                            console.error('delayed...');
                            t.cb();
                        })
                        t.addNext(function delayed2() {
                            console.error('delayed2...');
                            t.cb();
                        },1)
                        //t.addNext(t.wait(3,false),2);
                        t.addNext(function delayed2_wait3() {
                             console.error('delayed3...');

                            setTimeout(function wait3() {
                              t.cb();
                            }, 3000);
                        },2)

                        t.addNext(delayIfNotConverged_showConverged,3);
                        data.delayedCount++;
                        t.cb();
                    } else {
                        console.error('delayed is null')
                        sh.each.print(logsDict)
                        //asdf.g
                        //asdf.g.d
                        console.error('did not sync')
                        sh.each.print(logsDict)
                        // process.exit();
                    }
                    return;
                }
                console.error('delayedCount', data.delayedCount)
                t.time('>>>>>>>>>>>total time to sync')
                data.delayedCount = 0;
                t.cb();

                // process.exit();

            });
        }

        t.add(writeLog);


        t.timeStart = new Date();
        //remove node E
        function clearNodeE(){
            console.error('clear node e')
            asdf.g
            var nodeE = dict2['e'];
            nodeE.reset();
        }
        t.add(clearNodeE);
        t.add(delayIfNotConverged_showConverged);



        //remove node E
        function pauseNodeE(){

            var nodeE = dict2['e'];
            nodeE.reset();
        }
        //t.add(clearNodeE);
        //t.add(delayIfNotConverged_showConverged);

        //do integrity check between nodes
        function doIntegrityCheck() {
            var nodeE = dict2['e'];
            //nodeE.reset();
            //should verify each record
        }
    }

    // }
    //sh.wait1Sec(createItems);
    //setTimeout(createItems, 3000)

}
/*
 process.on('uncaughtException', function (err) {
 console.log(err);
 process.exit(556);
 })
 */

