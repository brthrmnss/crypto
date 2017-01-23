/**
 * Created by morriste on 8/9/16.
 */

var FileWatcher = require('G:/Dropbox/projects/crypto/mp/GrammarHelperServer/datingsim/js/FileWatcher.js').FileWatcher;


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var EasyRemoteTester = shelpers.EasyRemoteTester;

var f = new FileWatcher();
var config = {
    file:__dirname + '/'+'scripts',
    match:".py",
    //file:"C://Users//morriste//train//train_drive//trash//node2//mp//QuickJSON//quickJSONService.js",
    runNode:"__file__",
    fxTrigger:function t(file) {
        console.log('file', file)

        var c = {};
        c.port =  8081
        c.showBody = false
        //c.fxDone = fxDone;
        var t = EasyRemoteTester.create('test search server API', c);

        var urls = {}
        urls.urlgenindex = t.utils.createTestingUrl('/g/blue/index.html');

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
                console.log('results', body)
                // t.assert(body.error == null , 'bad data ')
                //   sh.callIfDefined(fxDone, body.credit)
                t.cb();
            }
        })

        // return;
        t.add(function noTryToTestContent() {

            //return
            var data = 'print(y)'
            t.quickRequest(urls.urlgenindex,
                'post', result, data);
            function result(body) {
                console.log('results', body)
                // t.assert(body.error == null , 'bad data ')
                //   sh.callIfDefined(fxDone, body.credit)
                t.cb();
            }
        })


        //return;
        var contents = sh.readFile(file)
        t.add(function noTryToTestContent() {
            var data = contents
            t.quickRequest(urls.urlgenindex,
                'post', result, data);
            function result(body) {
                t.cb();
            }
        })

    }
}
f.init(config)