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
        var strGlobalLogContents = sh.each.print(self.globalLog)
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
                        console.error('delayed...');
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
