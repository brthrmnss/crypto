/**
 * Created by user1 on 12/18/2016.
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var request = require('request')
var EasyRemoteTester = shelpers.EasyRemoteTester;

function GrammarHelperServer() {
    var p = GrammarHelperServer.prototype;
    p = this;
    var self = this;

    self.settings = {}
    p.init = function init() {
        self.settings.port = sh.dv(self.settings.port, 8081)
        self.test()
    }

    p.test = function test(){

        var c = {};
        c.port =  self.settings.port
        c.showBody = false
        c.silent = true
        //c.fxDone = fxDone;
        var t = EasyRemoteTester.create('test search server API', c);

        var urls = {}
        //urls.urlgenindex = t.utils.createTestingUrl('/g/blue/index.html');
        urls.urlgenindex = t.utils.createTestingUrl('/g/blue/anyurulwilldo.html');
        //t.testsDisable()
        /*   t.getR(urls.urlgenindex_userTemplate)
         .why('test with user template')
         .fxDone(function onUrl(result) {
         });

         t.getR(urls.urlgenindex)
         .why('create test product')
         .fxDone(function onUrl(result) {
         //t.assert(_.isObject(result.payment))
         //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
         });*/

/*
        t.add(function noTryToTestContent() {
            var data = 'y = 5 + 2'
            //var data = '5 + 2'
            t.quickRequest(urls.urlgenindex,
                'post', result, data);
            function result(body,b,c) {
                console.log(sh.t, 'results', body)
                // t.assert(body.error == null , 'bad data ')
                //   sh.callIfDefined(fxDone, body.credit)
                t.cb();
            }
        })

        // return;
        t.add(function noTryToTestContent() {
            var data = 'print(y)'
            t.quickRequest(urls.urlgenindex,
                'post', result, data);
            function result(body) {
                console.log(sh.t, '', data)
                console.log(sh.t, 'results', body)
                t.cb();
            }
        })

        t.add(function noTryToTestContent() {
            var data = 'y'
            t.quickRequest(urls.urlgenindex,
                'post', result, data);
            function result(body) {
                console.log(sh.t, '', data)
                console.log(sh.t, 'results', body)
                t.cb();
            }
        })

        t.add(function noTryToTestContent() {
            var data = 'print(RDK.AddFile)'
            t.quickRequest(urls.urlgenindex,
                'post', result, data);
            function result(body) {
                console.log(sh.t, '', data)
                console.log(sh.t, 'results', body)
                t.cb();
            }
        })*/

        function runCmd(cmd) {

            t.add(function noTryToTestContent() {
                cmd = cmd
                cmd = cmd.replace(/\//gi, "\\");
                var data = cmd
                t.quickRequest(urls.urlgenindex,
                    'post', result, data);
                function result(body) {
                    console.log(  data)
                    console.log(sh.t, 'results', body)
                    t.cb();
                }
            })
        }


        /*
        runCmd('y = 5 + 2');
        runCmd('print(y)');
        runCmd('print(RDK.AddFile) ');
        runCmd('print(RDK.AddFile) ');
        */
        runCmd('RDK')
        runCmd('RDK.AddFile("C:/RoboDK/Library/KUKA_KR_210_2.robot")');


        var y = `
#print(RDK.AddFile)  
#print(RDK.AddFile) 
r1 = RDK.AddFile("C:/RoboDK/Library/KUKA_KR_210_2.robot")
r1.setName("booty")
r1b = RDK.Item("booty")
print("is sname?",r1==r1b)
r1
`
        runCmd(y);


        return
        runCmd('r1 = RDK.AddFile("C:/RoboDK/Library/KUKA_KR_210_2.robot")');


        return;

        var y = `
#print(RDK.AddFile)  
#print(RDK.AddFile) 
r1 = RDK.AddFile("C:/RoboDK/Library/KUKA_KR_210_2.robot")
r1.setName("booty")
r1b = RDK.Item("booty")
print("is sname?",r1==r1b)
r1
`
        //console.log('y', y)
        runCmd(y);
        runCmd('');
        t.wait(3)
        runCmd('r1.Delete()');


        return;
        var contents = sh.readFile('C:/Users/user1/Dropbox/projects/learndk/py.txt')
        t.add(function noTryToTestContent() {
            var data = contents
            t.quickRequest(urls.urlgenindex,
                'post', result, data);
            function result(body) {
                t.cb();
            }
        })


    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.GrammarHelperServer = GrammarHelperServer;

if (module.parent == null) {

    var i = new GrammarHelperServer();
    i.init()
    //i.launchSupportingTools();
}



