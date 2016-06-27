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
        self.launchSupportingTools();
        self.settings.port = sh.dv(self.settings.port, 10110)

        var express = require('express');
        var app = express();

        app.get('/', function (req, res) {
            res.send('Hello World!');
        });

        app.listen(self.settings.port)
        self.app = app;


        self._dirYeomanApp = __dirname+'/../../..'+'/'/*'../'+'../'*/+'learn angular/port3/';
        self._dirYeomanAppTmp = self._dirYeomanApp+'.tmp/';
        self._dirYeomanAppApp = self._dirYeomanApp+'app/';
        self.defineRoutes();

        //app.use(express.static(self._dirYeomanApp));
        app.use(express.static(self._dirYeomanAppTmp));
        app.use(express.static(self._dirYeomanAppApp));
        app.use(express.static(self._dirYeomanApp)); //bower_components

        self.test()
    }

    p.defineRoutes = function defineRoutes() {
        self.app.get('/g/:id*?', function (req, res) {
            console.log('output', JSON.stringify([req.params, req.query]))
            var y = req.originalUrl;
            if ( sh.isWin() ) {
                console.error('orig url', y)
            }
            var split = y.split('/')
            split = split.slice(2)
            var dir = split.shift();

            if ( split[0] =='g' && split[1] == dir ) {
                //repeat dir
                split.shift(); split.shift();
            }
            var file = split.join('/')

            console.error('y', y, split);
            console.error('base dir', dir, file);
            //can't find dir


            var fileTemplate = 'index.temp.html';

            //var _dirAppOverrides = __dirname+'/'+'portfolio_dir';


            //var _fileIndexAlias =/* _dirAppOverrides+'/'*/ 'port3_app.html';
            var fileTemplate = self._dirYeomanAppTmp+'quickcrud_tester.html'

            var leaf = file;

            if ( leaf == 'index.html') {


                //var files = sh.fs.getFilesInDirectory2(dir)

                var recursive = require('recursive-readdir');

                function ignoreFunc(file, stats) {
                    if ( file.indexOf('.html') != -1 ) {
                        return true;
                    }
                    return false;
                }
                var dirFill = __dirname + '/' + dir + '/';
                /*if ( sh.isWin() ) { //try to change dirFill, but need dirfill to get files
                    dirFill = dir + '/';
                    dirFill = dir + '/';
                }*/
                console.error('dirFill', dirFill)
                recursive(dirFill, [ ignoreFunc], function (err, files) {
                    //  console.log('files in dir', dir)
                   // if ( ! sh.isWin() ) {
                        files = files.sort();
                    console.error('files', files)
                   // files = files.sort(function(a, b) {
                        //var aIsDir = fs.statSync(dir + "/" + a).isDirectory(),
                       //     bIsDir = fs.statSync(dir + "/" + b).isDirectory();

                      //  if (aIsDir && !bIsDir) {
                       //     return -1;
                       // }

                       // if (!aIsDir && bIsDir) {
                      //      return 1;
                      //  }

                    //    return a.localCompare(b);
                   // })
                  //  }
                  //  self.proc('files', files.sort())
                    if ( sh.isWin() ) { //try to change dirFill, but need dirfill to get files
                       // dirFill = dir + '/';
                        //dirFill = '/';
                        console.error('dir fill2--', dirFill)
                        //dirFill = dirFill.replace(/\\/gi, "/");
                        dirFill = dirFill.replace(/\//gi, '\\'); //replace windows dir, b/c mixed with / \
                        console.error('dir fill3--', dirFill)
                    }
                   // asdf.g
                    self.proc('file length', files.length);

                    //files.push('../../js/socket.io-1.2.0.js.')
                    files.push('../../js/reloader.js')
                    var contents = sh.readFile(fileTemplate)
                    var cSplit = contents.split('</body>')
                    var start = cSplit[0]
                    sh.each(files, function (k,v) {

                        if (sh.endsWith(v, '.js')) {
                            var str = '<script src="Placeholder" ></script>'
                            self.proc('v', v, 'replace with', dirFill)
                            var dirOrig =  v;
                            v = v.replace(dirFill, '/')
                            self.proc( dirOrig.length,  v.length)

                            str = str.replace('Placeholder', 'g/' + dir + '' + v + '');


                            console.error('dir fill3', v, dirFill, 'g/' + dir + '' + v + '')
                            if ( v.length >= dirOrig.length ) {
                              //  asdf.g
                            }
                            //process.exit()
                        } else if (sh.endsWith(v, '.css')) {
                            var str = '<link rel="stylesheet" href="Placeholder" />';
                            v = v.replace(dirFill, '/');
                            str = str.replace('Placeholder', 'g/'+dir+''+v+'');
                        } else {
                            return;
                        }

                        start +=  "\n\t" + str + "\n";
                        /*
                         v = v.replace(dirFill, dir+'/')
                         str = str.replace('index2.html', 'g/'+v+'');
                         start +=  "\n\t" + str + "\n"
                         */

                    })
                    start += "</body>";
                    start += cSplit[1];
                    var filePath  = dir+'/'+leaf


                    var rh  = {};
                    //rh.content = start;
                    rh.replaceContent = function replaceContent(startingContent, tagName, contents, wrapInTag) {
                        var result = rh.splitOnTag(tagName, startingContent)
                        if ( wrapInTag ) {
                            contents = rh.wrapInTag(contents, wrapInTag)
                        }
                        result.start += sh.n +contents +  sh.n + result.end
                        return result.start;

                    }


                    rh.wrapInTag = function (result, tagName) {
                        var starter = '<'+tagName+'>'
                        var ender = '</'+tagName+'>'
                        result = starter + result  + ender;
                        return result;
                    }

                    rh.splitOnTag = function (tagName, txt) {
                        var starter = '<'+tagName+'>'
                        var ender = '</'+tagName+'>'
                        var result = {};
                        if ( txt.indexOf(starter) == -1 ) {
                            result.start = txt;
                            result.content = '';
                            result.end = '';
                            return result;
                        }

                        var split = txt.split(starter);
                        result.start = split[0];
                        var split2and3 = split[1].split(ender);
                        result.content = split2and3[0]
                        result.end = split2and3[1]
                        return result;
                    }

                    rh.getDataInTag = function getDataInTag(startingContent, tagName) {
                        var result = rh.splitOnTag(tagName, startingContent)
                        return result.content;
                    }

                    var userTemplateContent = dirFill + '/' +'start.html';
                    ////// console.log('file', userTemplateContent, sh.fileExists(userTemplateContent))

                    if ( sh.fileExists(userTemplateContent)) {
                        var data = sh.readFile(userTemplateContent);
                        var body = rh.getDataInTag(data, 'body')
                        var rep = rh.replaceContent(start, 'quick-crud-demo', body)
                        var dbg = [body,rep]
                        //self.proc(body)
                        // process.exit()
                        //self.proc(rep)
                        //process.exit()
                        start = rep;

                        /*

                         var body = rh.getDataInTag(data, 'head')
                         var rep = rh.replaceContent(start, 'head', body)
                         */

                        var body = rh.getDataInTag(data, 'title')
                        var rep = rh.replaceContent(start, 'title', body, 'title')
                        start = rep;
                    }


                    sh.writeFile(filePath, start)

                    res.sendfile(filePath)

                });
                return;
            }
            //var file = dir + '/' + file

            function doesFileExist(file, dir) {
                var file2 = dir + '/' +  file;
                var file3 = sh.fs.resolve(file2)
                self.proc('does exist', file3)
                if ( sh.fileExists(file3)) {
                    return file3;
                }
                return false;
            }

            /*var express =  require('express');
             // override template with personal contents
             server.use(express.static(_dirAppOverrides));
             //U: serve main generated contents
             server.use(express.static(_dirYeomanApp+'.tmp/'));
             //U: add backup app resources are are not generated
             server.use(express.static(_dirYeomanApp+'app/'));;
             //U: serve bower components
             */


            var fileDir =  doesFileExist(dir + '/'+file, __dirname, 'search in local dir')

            if ( fileDir ) {
                //speical case for index file .... bring in all js
                res.sendfile(fileDir);
                return;

            }
            var fileDir =  doesFileExist(file, __dirname, 'search dir for real');
            if ( fileDir ) {
                res.sendfile(fileDir);
                return;
            }

            var fileDir =  doesFileExist(file, self._dirYeomanApp);
            if ( fileDir ) {
                res.sendfile(fileDir);
                return;
            }
            var fileDir =  doesFileExist(file, self._dirYeomanAppTmp);
            if ( fileDir ) {
                res.sendfile(fileDir);
                return;
            }
            var fileDir =  doesFileExist(file, self._dirYeomanAppApp);
            if ( fileDir ) {
                res.sendfile(fileDir);
                return;
            }

            console.error('did not find', file);

            res.statusCode = 404;
            res.send('could not find file ' + file);
            return;
            res.send(['Hello World!', req.params, req.query].join(','));
        });
        return;
    }


    p.test = function test(){

        function testReq() {
            var req 		= {}
            req.url 		= 'http://127.0.0.1:'+ self.settings.port+'/g/blue/adf/index.html'
            req.method 		= 'GET'
            req.json 		= {}
            req.json.text 	= 'boo.'
            //return
            request(req, function onResponse (error, response, body) {
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






        var c = {};
        c.port =  self.settings.port
        c.showBody = false
        //c.fxDone = fxDone;
        var t = EasyRemoteTester.create('test search server API', c);

        var urls = {}
        urls.urlgenindex = t.utils.createTestingUrl('/g/blue/index.html');
        urls.urlgenindex_userTemplate = t.utils.createTestingUrl('/g/red/index.html');
        urls.badfile = t.utils.createTestingUrl('/g/blue/adf/yu.html');
        urls.index2 = t.utils.createTestingUrl('/g/blue/index2.html');
        urls.localfile = t.utils.createTestingUrl('/g/blue/adf/index2.html');

        /*    t.add(function doSearchAfterLogin() {
         t.quickRequest( urls.search+':'+ query,
         'get', result   )
         function result(body) {
         console.log('result', body.media.length, body)
         t.assert(body.media.length >=0, 'post-verify did not let me do a search .. not enough');
         t.cb();
         }
         }
         );
         */

        t.getR(urls.urlgenindex_userTemplate)
            .why('test with user template')
            .fxDone(function onUrl(result) {
            });

        t.getR(urls.urlgenindex)
            .why('create test product')
            .fxDone(function onUrl(result) {
                //t.assert(_.isObject(result.payment))
                //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
            });


        /*   t.getR(urls.badfile)
         .makeOptional()
         .why('create test product')
         .fxDone(function onUrl(result) {
         //t.assert(_.isObject(result.payment))
         //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
         });*/
        t.getR(urls.index2)
            .why('create test product')
            .fxDone(function onUrl(result) {
                //t.assert(_.isObject(result.payment))
                //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
            });
        t.getR(urls.localfile)
            .why('create test product')
            .fxDone(function onUrl(result) {
                //t.assert(_.isObject(result.payment))
                //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
            });






    }


    p.launchSupportingTools = function launchSupportingTools() {
        return;
        var cwd = process.cwd();
        var srvReload = '/Users/user2/Dropbox/projects/crypto/browser-eval/BasicReloadServer2.js'
        process.chdir(srvReload.split('/').slice(0,-1).join('/'))
        var BES = require(srvReload).init();
        process.chdir(cwd)
        var srvWatcher = '/Users/user2/Dropbox/projects/crypto/mp/Test_CanReloadJavascriptClass/runFileWatcherMonitor_BasicReloadServer2_mac.js'
        require(srvWatcher)
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
}



