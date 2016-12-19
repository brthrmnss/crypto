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

        //http://127.0.0.1:14002/socket.io-1.2.0.js.ignore
        app.get('/socket.io-1.2.0.js', function (req, res) {
            var fileSocket = __dirname + '/' + 'public_html/'+'socket.io-1.2.0.js.ignore'
            res.sendfile( fileSocket );
        });


        app.use(sh.allowWildcardRequests)

        app.get('/mag', function onDownloadMagnet(req, res){

            /*console.log(req.query);
             var dirMag = 'c:/trash/mags/'
             sh.writeFile(dirMag + req.query.name, req.query.url);
             links
             */
            sh.allowWildcardRequests(req, res, null, true)
            var dirMag = 'c:/trash/mags/'
            var fileLinks = dirMag + 'input.txt';
            var content = sh.readFile(fileLinks, req.query.url);
            content += sh.n
            content +=  req.query.url
            sh.writeFile(fileLinks,content);
            res.json(req.query)

            return;
            var fileMag = 'temp.mag'
            fileMag = __dirname + "/" + fileMag;
            __
            res.sendfile(fileMag)
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

        app.use(express.static(__dirname+ '/'+ 'public_html'));
        //http://localhost:10110/g/redposter/index.html
        self.test()
    }

    p.defineRoutes = function defineRoutes() {
        var wildcardSymbol =  '***'
        self.app.get('/***/*?', function onWildCardRoute(req, res, next){

            var originalUrl = req.originalUrl;
            if ( originalUrl.indexOf(wildcardSymbol) == -1 ) {
                next()
                return;
            }
            self.proc('input to wild card', JSON.stringify([req.params, req.query]))
            var dirs = originalUrl.split('/')
            dirs.shift();
            var dir = dirs[0]
            dirs.shift();
            var file = dirs.join('/')

            //console.log('headers', req.headers)
            if ( req.headers['referer'] == null ) {
                // throw new Error('no headers')
                res.status(404)
                res.send('no headers')
                return;
            }


            if ( dir == '***' && req.headers && req.headers['referer']) {
                var referer = req.headers['referer'];
                var ref_split = referer.split('/g/')[1];
                ref_split = ref_split.split('/');
                var dirRef = ref_split.shift();
                dir =  dirRef
                self.proc('dirRef subs', dirRef, dir)




                var fileDir =  self.utils.doesFileExist(dir + '/'+file, __dirname, 'search in local dir')

                if ( fileDir ) {
                    //speical case for index file .... bring in all js
                    res.sendfile(fileDir);
                    return;

                }
            }


            res.status(404)
            res.send('cannot find file')



        })
        self.app.get('/g/:id*?', function (req, res) {
            console.log('output', JSON.stringify([req.params, req.query]))
            var y = req.originalUrl;
            if ( sh.isWin() ) {
                console.error('orig url', y)
            }
            var split = y.split('/')
            var fileSections = split
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

                recursive(__dirname+'/'+'sharedResources/', [ ignoreFunc],
                    function (err, filesSharedResources) {

                        var l = [];
                        sh.each(filesSharedResources, function(k,v) {
                            //remove root dir, so it works as expected
                            v = v.replace(/\\/gi, '/');
                            var dirShared = __dirname.replace(/\\/gi, '/')+'/'+'sharedResources/'
                            file = v.replace(dirShared, '/../')
                            l.push(file)
                        })
                        filesSharedResources = l;

                        console.error('dirFill', dirFill);
                        recursive(dirFill, [ ignoreFunc], function (err, files) {
                            files = filesSharedResources.concat(files);
                            files = files.sort();
                            console.error('files', files)

                            if ( sh.isWin() ) { //try to change dirFill, but need dirfill to get files
                                console.error('dir fill2--', dirFill)
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
                                start = rep;
                                var body = rh.getDataInTag(data, 'title')
                                var rep = rh.replaceContent(start, 'title', body, 'title')
                                start = rep;
                            }

                            sh.writeFile(filePath, start);
                            res.sendfile(filePath)

                        });
                    })

                return;
            }
            //var file = dir + '/' + file

            function doesFileExist(file, dir, msg) {
                var file2 = dir + '/' +  file;
                var file3 = sh.fs.resolve(file2)
                var exist = sh.fileExists(file3)
                self.proc('does exist', file3, msg, exist)
                if (  exist ) {
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





            var fileSharedResource = fileSections.slice(2).join('/')
            var fileDir =  doesFileExist(fileSharedResource, __dirname+'/sharedResources/', 'search in global dir');
            var questionableDir = dir == 'sharedResources' || dir == 'js'
            if ( questionableDir && req.headers && req.headers['referer']) {
                //why: if shared resources, ehcek if dev has override file in project directory
                var referer = req.headers['referer'];
                var ref_split = referer.split('/g/')[1];
                ref_split = ref_split.split('/');
                var dirRef = ref_split.shift();
                var dirOverride =  dirRef

                console.error('urlreferrer', 'dirRef subs', dirRef, dirOverride)
                var fileOverriddenInAppDirectory =  doesFileExist(dirOverride + '/'+file, __dirname, 'search in local dir')
                if ( fileOverriddenInAppDirectory ) {
                    res.sendfile(fileOverriddenInAppDirectory);
                    return;
                }
                if ( dir == 'js') {
                    //why: try to redirect in override directory in appDirectory
                    dirOverride = dirOverride+'/' + dir+'/';
                    var fileOverriddenInAppDirectory =  doesFileExist(dirOverride + '/'+file, __dirname, 'search in local dir')
                    if ( fileOverriddenInAppDirectory ) {
                        res.sendfile(fileOverriddenInAppDirectory);
                        return;
                    }
                }
                //why: now we know file does not exist in app directory , try shared directory
                else {
                    fileOverriddenInAppDirectory;
                }
            }
            // else {
            if (fileDir) {
                res.sendfile(fileDir);
                return;
            }
            //  }


            //why: check local app first
            var fileDir =  doesFileExist(dir + '/'+file, __dirname, 'search in local dir')
            if ( fileDir ) {
                //speical case for index file .... bring in all js
                res.sendfile(fileDir);
                return;

            }

            /*
             //Deprec: do not use /g/*** b/c not generic, just '***'
             if ( dir == '***' && req.headers && req.headers['referer']) {
             var referer = req.headers['referer'];
             var ref_split = referer.split('/g/')[1];
             ref_split = ref_split.split('/');
             var dirRef = ref_split.shift();
             dir =  dirRef
             console.error('dirRef subs', dirRef, dir)
             }
             var fileDir =  doesFileExist(dir + '/'+file, __dirname, 'search in local dir')

             if ( fileDir ) {
             //speical case for index file .... bring in all js
             res.sendfile(fileDir);
             return;

             }
             */
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
            //console.error(req.headers)

            res.statusCode = 404;
            res.send('could not find file ' + file);
            return;
            res.send(['Hello World!', req.params, req.query].join(','));
        });
        return;
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


        // http://localhost:10110/***/js/quickreloadable2.dir.html

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

        //t.testsDisable()
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


        t.getR(urls.localfileWildroute)
            .addPreFx(function onAddHeaders (req) {
                //    asdf.g
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
                console.log(req, '... log it')
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                //t.assert(_.isObject(result.payment))
                //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
            });

        urls.localfileInSharedResourceAndOverridden =
            t.utils.createTestingUrl('/g/sharedResources/js/quickreloadable2.dir.js');
        //http://localhost:10110/g/sharedResources/js/quickreloadable2.dir.js
        t.getR(urls.localfileInSharedResourceAndOverridden)
            .addPreFx(function onAddHeaders (req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1 , 'did not pull dating sim version')
                //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
            });


        urls.fileInAppDir = t.utils.createTestingUrl('/g/js/quickreloadable2.dir.js');
        t.getR(urls.fileInAppDir)
            .addPreFx(function onAddHeadersC (req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
                //req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1 , 'did not pull dating sim version')
                //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
            });


        urls.fileNormalJS = t.utils.createTestingUrl('/g/js/1reloaddirective.js');
        t.getR(urls.fileNormalJS)
            .addPreFx(function onAddHeadersC (req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
                //req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                //t.assert(result.indexOf('Dating SIM version') != -1 , 'did not pull dating sim version')
            });

        urls.fileNormalJS = t.utils.createTestingUrl('/g/js/1reloaddirective.js');
        t.getR(urls.fileNormalJS)
            .addPreFx(function onAddHeadersC (req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
                //req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                //t.assert(result.indexOf('Dating SIM version') != -1 , 'did not pull dating sim version')
            });
        // t.testsEnable()

        return;
        urls.fileNormalHTML_RedirectsToAppDir = t.utils.createTestingUrl('/g/styles/testCSS.css');
        t.getR(urls.fileNormalHTML_RedirectsToAppDir)
            .addPreFx(function onAddHeadersC (req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
                //req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1 , 'did not pull dating sim version')
            });

        urls.fileNormalHTML = t.utils.createTestingUrl('/g/styles/testCSSDS.css');
        t.getR(urls.fileNormalHTML)
            .addPreFx(function onAddHeadersC (req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1 , 'did not pull dating sim version')
            });


        urls.fileNormalHTML2 = t.utils.createTestingUrl('/g/styles/testCSS.css');
        t.getR(urls.fileNormalHTML2)
            .addPreFx(function onAddHeadersC (req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
                //req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1 , 'did not pull dating sim version')
            });



        //urls.localfileWildroute

        //http://localhost:10110/***/js/quickreloadable2.dir.html




    }


    p.launchSupportingTools = function launchSupportingTools() {
        //    return;
        var cwd = process.cwd();
        var dirCrypto = __dirname+'/../../'; //'/Users/user2/Dropbox/projects/crypto
        var srvReload = dirCrypto + '/browser-eval/BasicReloadServer2.js'
        var srvReloadDir = sh.fs.resolve(srvReload)
        var srvReloadDir2 = srvReload.split('/').slice(0,-1).join('/')
        process.chdir(srvReloadDir2)
        var BES = require(srvReload).init();
        process.chdir(cwd)
        ////G:\Dropbox\projects\crypto\mp\Test_CanReloadJavascriptClass\runFileWatcherMonitor_BasicReloadServer2_mac.js
        var srvWatcher = dirCrypto+'/mp/Test_CanReloadJavascriptClass/runFileWatcherMonitor_BasicReloadServer2_mac.js'
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
    //i.launchSupportingTools();
}



