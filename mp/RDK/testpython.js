/**
 * Created by user1 on 12/18/2016.
 */





/**
 * Created by user2 on 3/6/16.
 */
/*
 why: quickly define mini-widget apps
 easily work on multiple apps in a setting
 easily test idas adn protoypes
 protoyping engine

 10 steps
 file
 init server
 route
 grab back 3 supporting servers
 create test dir ... here as testSite
 tetst route for other settings

 next step
 use dirstatic to get main directorys
 use :iud route to get local files

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
    p.initGHS = function initGHS(url, appCode) {
        //   self.launchSupportingTools();
        self.settings.port = sh.dv(self.settings.port, 8081)
        self.test()
    }

    function defineUtils() {
        p.utils = {};
        p.utils.doesFileExist =   function doesFileExist(file, dir, msg) {
            var file2 = dir + '/' +  file;
            var file3 = sh.fs.resolve(file2)
            self.proc('does exist', file3, msg)
            if ( sh.fileExists(file3)) {
                return file3;
            }
            return false;
        }
    }
    defineUtils()

    p.test = function test(){

        function simpleTestsWithoutTestHelper() {
            function testReq() {
                var req = {}
                req.url = 'http://127.0.0.1:' + self.settings.port + '/g/blue/adf/index.html'
                req.method = 'GET'
                req.json = {}
                req.json.text = 'boo.'
                //return
                request(req, function onResponse(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        //	console.log(body) // Show the HTML for the Google homepage.
                    }
                    //console.log("\n\n\n\n\n\n")
                    if (error) {
                        console.error('logged', error)
                    } else {
                        console.log('ok request completed')
                    }
                    //console.error('result', error, body)
                })
            }

            setTimeout(testReq, 1000)
        }


        var c = {};
        c.port =  self.settings.port
        c.showBody = false
        c.silent = true
        //c.fxDone = fxDone;
        var t = EasyRemoteTester.create('test search server API', c);

        var urls = {}
        urls.urlgenindex = t.utils.createTestingUrl('/g/blue/index.html');
        urls.urlgenindex_userTemplate = t.utils.createTestingUrl('/g/red/index.html');
        urls.badfile = t.utils.createTestingUrl('/g/blue/adf/yu.html');
        urls.index2 = t.utils.createTestingUrl('/g/blue/index2.html');
        urls.localfile = t.utils.createTestingUrl('/g/blue/adf/index2.html');
        urls.localfileWildroute = t.utils.createTestingUrl('***/js/quickreloadable2.dir.html');
        urls.localfileWildroute = t.utils.createTestingUrl('***/js/quickreloadable2.dir.html');



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
        })

        function runCmd(cmd) {

            t.add(function noTryToTestContent() {
                var data = cmd
                t.quickRequest(urls.urlgenindex,
                    'post', result, data);
                function result(body) {
                    console.log(sh.t,  data)
                    console.log(sh.t, 'results', body)
                    t.cb();
                }
            })
        }

var y = `
print(RDK.AddFile)
r1= RDK.AddFile("C:/RoboDK/Library/KUKA_KR_210_2.robot")
r1.setName("booty")
r1b = RDK.Item("booty")
print("is sname?",r1==r1b)
r1
`

            console.log('y', y)
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

        /*     t.creditUtils.getUserCreditForContent =
         function getUserCreditForContent(t, contentId, fxDone, cannotWatch ) {
         t.add(function noTryToTestContent() {
         t.quickRequest(urls.hasCredit,
         'get', result, {content_id: contentId});
         function result(body) {
         //
         //   t.assert(body!=null,'could not communicate with login server '+ url);
         if ( cannotWatch != true )
         t.assert(body.error == null , 'bad data ')
         else
         t.assert(body.error != null , 'shoudl not be able to see this  ')
         sh.callIfDefined(fxDone, body.credit)
         t.cb();
         }
         });
         }
         */



        /*

         t.postR(urls.urlgenindex)
         .why('create test product')
         .with({})
         .fxDone(function onUrl(result) {
         //t.assert(_.isObject(result.payment))
         //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
         });
         */



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
    i.initGHS()
    //i.launchSupportingTools();
}



