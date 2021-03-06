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

sh.cwd(__dirname)


var rh = {};
//rh.content = start;
rh.replaceContent = function replaceContent(startingContent, tagName, contents, wrapInTag) {
    var result = rh.splitOnTag(tagName, startingContent)
    if (wrapInTag) {
        contents = rh.wrapInTag(contents, wrapInTag)
    }
    result.start += sh.n + contents + sh.n + result.end
    return result.start;

}


rh.wrapInTag = function (result, tagName) {
    var starter = '<' + tagName + '>'
    var ender = '</' + tagName + '>'
    result = starter + result + ender;
    return result;
}

rh.splitOnTag = function (tagName, txt) {
    var starter = '<' + tagName + '>'
    var ender = '</' + tagName + '>'
    var result = {};
    if (txt.indexOf(starter) == -1) {
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

        // console.log('what is it', sh.allowWildcardRequests)
        // sh.exit()
        // app.use(sh.allowWildcardRequests)
        app.use(function bo(req, res, next) {
            //console.log('iiii ... i am where', req.originalUrl)
            sh.allowWildcardRequests(req, res, null, true)
            next();
        })

        var bodyParser = require("body-parser");
        //var multer = require('multer');
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));

        app.get('/', function (req, res) {
            res.send('Hello World!');
        });

        //http://127.0.0.1:14002/socket.io-1.2.0.js.ignore
        app.get('/socket.io-1.2.0.js', function (req, res) {
            var fileSocket = __dirname + '/' + 'public_html/' + 'socket.io-1.2.0.js.ignore'
            var fileSocket = __dirname + '/' + 'js/libHide/' + 'socket.io-1.2.0.js.ignore'
            res.sendfile(fileSocket);
        });

        app.get('/ui_utils.js', function onGetUiUtils(req, res) {
            var fileUIUtils = sh.requirePath('/mp/testingFramework/ui_utils.js')
            res.sendfile(fileUIUtils);
        });

        app.get('/jquery.js', function onGetJquery(req, res) {
            var fileReq = sh.fs.join(__dirname, 'public_html', 'jquery-1.11.1.js.ignore')
            res.sendfile(fileReq);
        });

        app.get('/shelpers-mini.js', function (req, res) {
            var fileUIUtils = sh.requirePath('/mp/testingFramework/shelpers-mini.js')
            res.sendfile(fileUIUtils);
        });


        app.get('/mag', function onDownloadMagnet(req, res) {

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
            content += req.query.url
            sh.writeFile(fileLinks, content);
            res.json(req.query)

            return;
            var fileMag = 'temp.mag'
            fileMag = __dirname + "/" + fileMag;
            __
            res.sendfile(fileMag)
        });


        function defineSearchZZ() {
            function onSearchZZ_Relay(req, res) {
                var SearchBookzz = sh.require('mp/GrammarHelperServer/SearchBookzz.js').SearchBookzz

                var i = new SearchBookzz();
                var config = {}
                config.fxDone = function onTestComplete(list, data) {
                    var json = data
                    sh.each.removeField(list, 'ui')
                    json.list = list;
                    res.json(json)
                    console.log('SearchBookzz complete:', data.url)
                }
                i.init(config)
                var type = req.method;
                var query = req.query.query
                if (type == 'POST') {
                    if (req.body == null) {
                        debugger
                        console.log('post had no data')
                    } else {
                        config.preResponseBody = req.body.data
                    }
                    //debugger;
                }

                //i.searchBookzz('crimson moon')
                //i.searchBookzz('ddddBeneath A Crimson Moon Michels Christine')
                i.searchBookzz(query)
                return;
            }

            app.get('/searchBookzz', onSearchZZ_Relay);
            app.post('/searchBookzz', onSearchZZ_Relay);
        }

        defineSearchZZ();

        app.get('/searchpb', function onDownloadMagnet(req, res) {

            var fileScript = sh.fs.join(__dirname, '..', '..', 'ritv/distillerv3/utils', 'SearchPB.js')
            fileScript = sh.fs.resolve(fileScript)
            sh.throwErrorIfFileNotFound(fileScript)
            var SearchPB = require(fileScript).SearchPB


            var options = {}
            options.callback = function onDone(url, token) {
                //token.linkz
                //asdf.g
                var json = {}
                if (token == null) {
                    token = {};
                }
                if (token.linkz == null) {
                    token.linkz = []
                }
                json.size = token.linkz.length;
                json.linkz = token.linkz;
                json.url = token.url // ... put this so we can see the links
                json = token;
                res.json(json)
                console.log('SearchPB complete:', url)
            }
            options.fxBail = options.callback;
            options.query = '5th Element'
            options.query = 'lynda advanced unity'
            options.query = 'Game of thrones season 4'

            options.pbCategory = 601
            options.query = req.query.query
            //options.pbCategory = 103
            //options.pbMinSeederCount = 20
            var go = new SearchPB()
            go.go(options);


            return;


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
            content += req.query.url
            sh.writeFile(fileLinks, content);
            res.json(req.query)

            return;
            var fileMag = 'temp.mag'
            fileMag = __dirname + "/" + fileMag;
            __
            res.sendfile(fileMag)
        });

        app.listen(self.settings.port)
        self.app = app;


        self._dirYeomanApp = __dirname + '/../../..' + '/'/*'../'+'../'*/ + 'learn angular/port3/';
        self._dirYeomanAppTmp = self._dirYeomanApp + '.tmp/';
        self._dirYeomanAppApp = self._dirYeomanApp + 'app/';
        self.defineRoutes();

        //app.use(express.static(self._dirYeomanApp));
        app.use(express.static(self._dirYeomanAppTmp));
        app.use(express.static(self._dirYeomanAppApp));
        app.use(express.static(self._dirYeomanApp)); //bower_components

        app.use(express.static(__dirname + '/' + 'public_html'));

        app.use(express.static(__dirname + '/../testingFramework/', 'testFramework'));


        var dirExtProxy = __dirname + '/../ExtProxy/'
        console.log(dirExtProxy, sh.fs.resolve(dirExtProxy))
        // sh.x()
        app.use(express.static(dirExtProxy, 'ExtProxy'));
        app.use(express.static(dirExtProxy));

        //http://localhost:10110/g/redposter/index.html
        self.test()
    }

    p.defineRoutes = function defineRoutes() {
        var wildcardSymbol = '***'
        self.app.get('/***/*?', function onWildCardRoute(req, res, next) {

            var originalUrl = req.originalUrl;
            if (originalUrl.indexOf(wildcardSymbol) == -1) {
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
            if (req.headers['referer'] == null) {
                // throw new Error('no headers')
                res.status(404)
                res.send('no headers')
                return;
            }


            if (dir == '***' && req.headers && req.headers['referer']) {
                var referer = req.headers['referer'];
                var ref_split = referer.split('/g/')[1];
                ref_split = ref_split.split('/');
                var dirRef = ref_split.shift();
                dir = dirRef
                self.proc('dirRef subs', dirRef, dir)


                var fileDir = self.utils.doesFileExist(dir + '/' + file, __dirname, 'search in local dir')

                if (fileDir) {
                    //speical case for index file .... bring in all js
                    res.sendfile(fileDir);
                    return;

                }
            }


            res.status(404)
            res.send('cannot find file')


        })

        self.app.get('/file/:id*?', function onGetFileFromReloader(req, res) {
            var dbg = false
            if (dbg) {
                console.log('output', JSON.stringify([req.params, req.query]))
            }
            var y = req.originalUrl;
            if (sh.isWin()) {
                if (dbg) {
                    console.error('orig url', y)
                }
            }
            var split = y.split('/')
            var fileSections = split
            split = split.slice(2)
            var dir = split.shift();


            var file = y.replace('/file/', '')

            file = sh.str.before(file, '?')

            if (file.includes('Dropbox/') == false) {
                console.error('no dropbox in name')
                res.send('hint ')
                return;
            }

            if (sh.isWin() == false) {
                file = '/' + file
            }
            else {
                if ( file.slice(1,2)==':') {
                    //abs val
                } else {
                    file = sh.str.after(file, 'projects/crypto/')
                    var dirRoot = sh.fs.up(__dirname, 2)

                    file = dirRoot + '' + file
                }
                file = sh.fs.resolve(file)
            }


            console.log('do have file???', file)

            if (sh.fs.exists(file)) {
                res.sendfile(file);
                return;
            }

            res.status(404);
            res.send('not found ' + file + ' ' + sh.fs.exists(file))

        })

        self.app.get('/g/:id*?', function (req, res) {
            console.log('output', JSON.stringify([req.params, req.query]))
            var dbg = false
            var y = req.originalUrl;
            if (y.includes('?')) {
                y = y.split('?')[0]
            }
            if (sh.isWin()) {
                if (dbg) {
                    console.error('orig url', y)
                }
            }
            var split = y.split('/')
            var fileSections = split
            split = split.slice(2)
            var dir = split.shift();

            if (split[0] == 'g' && split[1] == dir) {
                //repeat dir
                split.shift();
                split.shift();
            }
            var file = split.join('/')

            if (dbg) {
                console.error('y', y, split);
                console.error('base dir', dir, file);
            }
            //can't find dir


            var fileTemplate = 'index.temp.html';

            //var _dirAppOverrides = __dirname+'/'+'portfolio_dir';


            //var _fileIndexAlias =/* _dirAppOverrides+'/'*/ 'port3_app.html';
            var fileTemplate = self._dirYeomanAppTmp + 'quickcrud_tester.html'
            var fileTemplate = self._dirYeomanAppTmp + 'simpleapp.3.html'

            var leaf = file;

            if (leaf == 'index.html') {


                //var files = sh.fs.getFilesInDirectory2(dir)

                var recursive = require('recursive-readdir');

                function ignoreFunc(file, stats) {
                    if (file.indexOf('.html') != -1) {
                        return true;
                    }
                    return false;
                }

                var dirFill = __dirname + '/' + dir + '/';
                /*if ( sh.isWin() ) { //try to change dirFill, but need dirfill to get files
                 dirFill = dir + '/';
                 dirFill = dir + '/';
                 }*/

                recursive(__dirname + '/' + 'sharedResources/', [ignoreFunc],
                    function (err, filesSharedResources) {

                        var l = [];
                        sh.each(filesSharedResources, function (k, v) {
                            //remove root dir, so it works as expected
                            v = v.replace(/\\/gi, '/');
                            var dirShared = __dirname.replace(/\\/gi, '/') + '/' + 'sharedResources/'
                            file = v.replace(dirShared, '/../')
                            l.push(file)
                        })
                        filesSharedResources = l;

                        if (dbg) {
                            console.error('dirFill', dirFill);
                        }
                        recursive(dirFill, [ignoreFunc], function (err, files) {
                            files = filesSharedResources.concat(files);
                            files = files.sort();
                            if (dbg) {
                                console.error('files', files)
                            }

                            if (sh.isWin()) { //try to change dirFill, but need dirfill to get files
                                if (dbg) {
                                    console.error('dir fill2--', dirFill)
                                }
                                dirFill = dirFill.replace(/\//gi, '\\'); //replace windows dir, b/c mixed with / \
                                if (dbg) {
                                    console.error('dir fill3--', dirFill)
                                }
                            }
                            // asdf.g
                            if (dbg) {
                                self.proc('file length', files.length);
                            }
                            //files.push('../../js/socket.io-1.2.0.js.')
                            files.unshift('../../js/reloaderGH1.js') //put at top
                            files.unshift('../../../ui_utils.js') //put at top
                            var contents = sh.readFile(fileTemplate)
                            var cSplit = contents.split('</body>')
                            var start = cSplit[0]
                            sh.each(files, function onRecurseAllFiles(k, v) {

                                if (v == null) {
                                    self.proc('this is null', k, v)
                                    return;
                                }
                                if (sh.endsWith(v, '.js')) {
                                    var str = '<script src="Placeholder" ></script>'
                                    if (dbg) {
                                        self.proc('v', v, 'replace with', dirFill)
                                    }
                                    var dirOrig = v;
                                    v = v.replace(dirFill, '/')
                                    if (dbg) {
                                        self.proc(dirOrig.length, v.length)
                                    }
                                    str = str.replace('Placeholder', 'g/' + dir + '' + v + '');

                                    if (dbg) {
                                        console.error('dir fill3', v, dirFill, 'g/' + dir + '' + v + '')
                                    }
                                    if (v.length >= dirOrig.length) {
                                        //  asdf.g
                                    }
                                    //process.exit()
                                } else if (sh.endsWith(v, '.css')) {
                                    var str = '<link rel="stylesheet" href="Placeholder" />';
                                    v = v.replace(dirFill, '/');
                                    str = str.replace('Placeholder', 'g/' + dir + '' + v + '');
                                } else {
                                    return;
                                }

                                start += "\n\t" + str + "\n";
                                /*
                                 v = v.replace(dirFill, dir+'/')
                                 str = str.replace('index2.html', 'g/'+v+'');
                                 start +=  "\n\t" + str + "\n"
                                 */

                            })
                            start += "</body>";
                            start += cSplit[1];
                            if (sh.fs.exists(dir) == false) {
                                res.status = 404
                                res.send('missing')
                                return;
                            }
                            var filePath = dir + '/' + leaf


                            var rh = {};
                            //rh.content = start;
                            rh.replaceContent = function replaceContent(startingContent, tagName, contents, wrapInTag) {
                                var result = rh.splitOnTag(tagName, startingContent)
                                if (wrapInTag) {
                                    contents = rh.wrapInTag(contents, wrapInTag)
                                }
                                result.start += sh.n + contents + sh.n + result.end
                                return result.start;

                            }


                            rh.wrapInTag = function (result, tagName) {
                                var starter = '<' + tagName + '>'
                                var ender = '</' + tagName + '>'
                                result = starter + result + ender;
                                return result;
                            }

                            rh.splitOnTag = function (tagName, txt) {
                                var starter = '<' + tagName + '>'
                                var ender = '</' + tagName + '>'
                                var result = {};
                                if (txt.indexOf(starter) == -1) {
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

                            var userTemplateContent = dirFill + '/' + 'start.html';
                            ////// console.log('file', userTemplateContent, sh.fileExists(userTemplateContent))

                            if (sh.fileExists(userTemplateContent)) {
                                var data = sh.readFile(userTemplateContent);
                                var body = rh.getDataInTag(data, 'body')
                                var rep = rh.replaceContent(start, 'quick-crud-demo', body)
                                var dbg = [body, rep]
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
                var file2 = dir + '/' + file;
                var file3 = sh.fs.resolve(file2)
                var exist = sh.fileExists(file3)
                if (dbg) {
                    self.proc('does exist', file3, msg, exist)
                }
                if (exist) {
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
            var fileDir = doesFileExist(fileSharedResource, __dirname + '/sharedResources/', 'search in global dir');
            var questionableDir = dir == 'sharedResources' || dir == 'js'
            if (questionableDir && req.headers && req.headers['referer']) {
                //why: if shared resources, ehcek if dev has override file in project directory
                var referer = req.headers['referer'];
                var ref_split = referer.split('/g/')[1];
                if (ref_split == null) {
                    ref_split = '';
                }
                ref_split = ref_split.split('/');
                var dirRef = ref_split.shift();
                var dirOverride = dirRef

                console.error('urlreferrer', 'dirRef subs', dirRef, dirOverride)
                var fileOverriddenInAppDirectory = doesFileExist(dirOverride + '/' + file, __dirname, 'search in local dir')
                if (fileOverriddenInAppDirectory) {
                    res.sendfile(fileOverriddenInAppDirectory);
                    return;
                }
                if (dir == 'js') {
                    //why: try to redirect in override directory in appDirectory
                    dirOverride = dirOverride + '/' + dir + '/';
                    var fileOverriddenInAppDirectory = doesFileExist(dirOverride + '/' + file, __dirname, 'search in local dir')
                    if (fileOverriddenInAppDirectory) {
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
            var fileDir = doesFileExist(dir + '/' + file, __dirname, 'search in local dir')
            if (fileDir) {
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
            var fileDir = doesFileExist(file, __dirname, 'search dir for real');
            if (fileDir) {
                res.sendfile(fileDir);
                return;
            }

            var fileDir = doesFileExist(file, self._dirYeomanApp);
            if (fileDir) {
                res.sendfile(fileDir);
                return;
            }
            var fileDir = doesFileExist(file, self._dirYeomanAppTmp);
            if (fileDir) {
                res.sendfile(fileDir);
                return;
            }
            var fileDir = doesFileExist(file, self._dirYeomanAppApp);
            if (fileDir) {
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


        function createGrid() {
            function proc1(cfg) {

                var dbg = false
                dbg = true;


                function doesFileExist(file, dir, msg) {
                    var file2 = dir + '/' + file;
                    var file3 = sh.fs.resolve(file2)
                    var exist = sh.fileExists(file3)
                    if (dbg) {
                        self.proc('does exist', file3, msg, exist)
                    }
                    if (exist) {
                        return file3;
                    }
                    return false;
                }


                self.app.get('/' + cfg.initPath + '/:id*?', onHandleProcDir)
                function onHandleProcDir(req, res) {
                    console.log('output', JSON.stringify([req.params, req.query]))

                    var y = req.originalUrl;
                    if (y.includes('?')) {
                        y = y.split('?')[0]
                    }
                    if (sh.isWin()) {
                        if (dbg) {
                            console.error('orig url', y)
                        }
                    }
                    var split = y.split('/')
                    var fileSections = split
                    split = split.slice(2)
                    var dir = split.shift();
                    if (split.length == 0) {
                        console.error('split is 0, expect a longer path /g/red/index.html')
                    }

                    if (split[0] == cfg.initPath && split[1] == dir) {
                        //repeat dir
                        split.shift();
                        split.shift();
                    }
                    var file = split.join('/')

                    if (dbg) {
                        console.error('y', y, split);
                        console.error('base dir', dir, file);
                    }
                    //can't find dir


                    var fileTemplate = 'index.temp.html';

                    //var _dirAppOverrides = __dirname+'/'+'portfolio_dir';


                    //var _fileIndexAlias =/* _dirAppOverrides+'/'*/ 'port3_app.html';
                    var fileTemplate = self._dirYeomanAppTmp + 'quickcrud_tester.html'
                    var fileTemplate = self._dirYeomanAppTmp + 'simpleapp.3.html'
                    fileTemplate = cfg.fileTemplate;

                    var leaf = file;

                    if (leaf == 'index.html') {


                        //var files = sh.fs.getFilesInDirectory2(dir)

                        var recursive = require('recursive-readdir');

                        function ignoreFunc(file, stats) {
                            if (file.indexOf('.html') != -1) {
                                return true;
                            }
                            return false;
                        }

                        var dirFill = __dirname + '/' + dir + '/';
                        /*if ( sh.isWin() ) { //try to change dirFill, but need dirfill to get files
                         dirFill = dir + '/';
                         dirFill = dir + '/';
                         }*/

                        recursive(cfg.auxAddDir, [ignoreFunc],
                            function (err, filesSharedResources) {

                                var l = [];
                                sh.each(filesSharedResources, function (k, v) {
                                    //remove root dir, so it works as expected
                                    v = v.replace(/\\/gi, '/');
                                    var dirShared = __dirname.replace(/\\/gi, '/') + '/' + 'sharedResources/'
                                    file = v.replace(dirShared, '/../')
                                    l.push(file)
                                })
                                filesSharedResources = l;

                                if (dbg) {
                                    console.error('dirFill', dirFill);
                                }
                                recursive(dirFill, [ignoreFunc], function (err, files) {
                                    files = filesSharedResources.concat(files);
                                    files = files.sort();
                                    if (dbg) {
                                        console.error('files', files)
                                    }

                                    if (sh.isWin()) { //try to change dirFill, but need dirfill to get files
                                        if (dbg) {
                                            console.error('dir fill2--', dirFill)
                                        }
                                        dirFill = dirFill.replace(/\//gi, '\\'); //replace windows dir, b/c mixed with / \
                                        if (dbg) {
                                            console.error('dir fill3--', dirFill)
                                        }
                                    }
                                    // asdf.g
                                    if (dbg) {
                                        self.proc('file length', files.length);
                                    }
                                    //files.push('../../js/socket.io-1.2.0.js.')
                                    //files.unshift('../../js/reloaderGH1.js') //put at top
                                   // files.unshift('../../../ui_utils.js') //put at top
                                    var contents = sh.readFile(fileTemplate)
                                    var cSplit = contents.split('</body>')
                                    var start = cSplit[0]
                                    sh.each(files, function onRecurseAllFiles_AddFilesToIndexPage(k, v) {
                                        if (v == null) {
                                            self.proc('this is null', k, v)
                                            return;
                                        }
                                        if ( v.includes('ignore/') )  {
                                            return;
                                        }
                                        if (sh.endsWith(v, '.js')) {
                                            var str = '<script src="Placeholder" ></script>'
                                            if (dbg) {
                                                self.proc('v', v, 'replace with', dirFill)
                                            }
                                            var dirOrig = v;
                                            v = v.replace(dirFill, '/')
                                            if (dbg) {
                                                self.proc(dirOrig.length, v.length)
                                            }

                                            var filePath_ThroughGrammar = cfg.initPath + '/' + dir + '/' + v + ''
                                            str = str.replace('Placeholder', filePath_ThroughGrammar);

                                            if (dbg) {
                                                console.error('dir fill3', v, dirFill, filePath_ThroughGrammar)
                                            }
                                            if (v.length >= dirOrig.length) {
                                                //  asdf.g
                                            }
                                            //process.exit()
                                        } else if (sh.endsWith(v, '.css')) {
                                            var str = '<link rel="stylesheet" href="Placeholder" />';
                                            v = v.replace(dirFill, '/');
                                            str = str.replace('Placeholder', cfg.initPath + '/' + dir + '/' + v + '');
                                        } else {
                                            return;
                                        }

                                        start += "\n\t" + str + "\n";
                                        /*
                                         v = v.replace(dirFill, dir+'/')
                                         str = str.replace('index2.html', 'g/'+v+'');
                                         start +=  "\n\t" + str + "\n"
                                         */

                                    })
                                    start += "</body>";
                                    start += cSplit[1];
                                    if (sh.fs.exists(dir) == false) {
                                        res.status = 404
                                        res.send('missing')
                                        return;
                                    }
                                    var filePath = dir + '/' + leaf

                                    var userTemplateContent = dirFill + '/' + 'start.html';
                                    ////// console.log('file', userTemplateContent, sh.fileExists(userTemplateContent))

                                    if (sh.fileExists(userTemplateContent)) {
                                        var data = sh.readFile(userTemplateContent);
                                        var body = rh.getDataInTag(data, 'body')
                                        var rep = rh.replaceContent(start, 'transcluded_contents', body)
                                        var dbg = [body, rep]
                                        start = rep;
                                        var body = rh.getDataInTag(data, 'title')
                                        var rep = rh.replaceContent(start, 'title', body, 'title')
                                        start = rep;
                                    }


                                    sh.writeFile(filePath, start)

                                    res.sendfile(filePath)

                                });
                            })

                        return;
                    }
                    //var file = dir + '/' + file

                    var fileSharedResource = fileSections.slice(2).join('/')
                    cfg.audoAddDifLeaf = sh.fs.leaf(cfg.auxAddDir)
                    var fileDir = doesFileExist(fileSharedResource, cfg.auxAddDir, 'search in global dir');
                    var questionableDir = dir == cfg.auxAddDirLeaf || dir == 'js'
                    if (questionableDir && req.headers && req.headers['referer']) {
                        //why: if shared resources, ehcek if dev has override file in project directory
                        var referer = req.headers['referer'];
                        var ref_split = referer.split('/' + cfg.initPath + '/')[1];
                        if (ref_split == null) {
                            console.log('warning ref split null')
                            ref_split = '';
                        }
                        ref_split = ref_split.split('/');
                        var dirRef = ref_split.shift();
                        var dirOverride = dirRef

                        console.error('urlreferrer', 'dirRef subs', dirRef, dirOverride)
                        var fileOverriddenInAppDirectory = doesFileExist(dirOverride + '/' + file, __dirname, 'search in local dir')
                        if (fileOverriddenInAppDirectory) {
                            res.sendfile(fileOverriddenInAppDirectory);
                            return;
                        }
                        if (dir == 'js') {
                            //why: try to redirect in override directory in appDirectory
                            dirOverride = dirOverride + '/' + dir + '/';
                            var fileOverriddenInAppDirectory = doesFileExist(dirOverride + '/' + file, __dirname, 'search in local dir')
                            if (fileOverriddenInAppDirectory) {
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

                    //if looks abs, try locally
                    var dirBase = sh.fs.slash(__dirname)
                    if (file.includes(dirBase)) {
                        var fileAbsInSubDir = null;
                        if (sh.isWin() && file.includes(':')) {
                            fileAbsInSubDir = file
                        }
                        if (sh.isWin() == false && file.startsWith('/')) {
                            fileAbsInSubDir = file
                        }
                        if (fileAbsInSubDir) {
                            var is_fileAbsInSubDir = sh.fs.exists(fileAbsInSubDir)//, 'abs.path, search in subdir')
                            if (is_fileAbsInSubDir) {
                                //speical case for index file .... bring in all js
                                res.sendfile(fileAbsInSubDir);
                                return;

                            }
                        }
                    }
                    //why: check local app first
                    var fileDir = doesFileExist(dir + '/' + file, __dirname, 'search in local dir')
                    if (fileDir) {
                        //speical case for index file .... bring in all js
                        res.sendfile(fileDir);
                        return;

                    }

                    var fileDir = doesFileExist(file, __dirname, 'search dir for real');
                    if (fileDir) {
                        res.sendfile(fileDir);
                        return;
                    }

                    var fileFound = false;
                    sh.each(cfg.listSearchDirs, function onListSearchDirs(k, dirSearch) {
                        var fileDir = doesFileExist(file, dirSearch);
                        if (fileDir) {
                            if (dbg) {
                                console.log('file found?', fileDir)
                            }
                            res.sendfile(fileDir);
                            fileFound = true
                            if (dbg) {
                                console.log('file found', fileDir)
                            }
                            return false;
                        }
                    })

                    if (fileFound) {
                        return;
                    }


                    console.error('did not find', file);
                    //console.error(req.headers)

                    res.statusCode = 404;
                    res.send('could not find file ' + file);
                    return;
                    res.send(['Hello World!', req.params, req.query].join(','));
                };

            }

            var dirs = [
                'C:/Users/morriste/train/train_drive/trash/downloads',
                'C:/Users/morriste/train/train_drive/trash/downloads/index_ctl_files'
            ]
            var cfg = {};
            cfg.listSearchDirs = dirs;
            cfg.initPath = 'grid'
            cfg.auxAddDir = sh.fs.join(__dirname, 'sharedResourcesGrid/')
            cfg.auxAddDir = sh.fs.slash(cfg.auxAddDir) + '/'
            cfg.auxAddDir2 = sh.fs.join(__dirname, 'grid/')
            //cfg.fileTempalte =  self._dirYeomanAppTmp + 'simpleapp.3.html'
            cfg.fileTemplate = sh.fs.join(__dirname, 'grid/index.grid.template.html')
            proc1(cfg);
        }

        createGrid()


        return;
    }


    function defineUtils() {
        p.utils = {};
        p.utils.doesFileExist = function doesFileExist(file, dir, msg) {
            var file2 = dir + '/' + file;
            var file3 = sh.fs.resolve(file2)
            self.proc('does exist', file3, msg)
            if (sh.fileExists(file3)) {
                return file3;
            }
            return false;
        }
    }

    defineUtils()

    p.test = function test() {

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
        c.port = self.settings.port
        c.showBody = false
        //c.fxDone = fxDone;
        var t = EasyRemoteTester.create('test search server API', c);

        var urls = {}
        urls.searchpb = t.utils.createTestingUrl('/searchpb');
        urls.urlgenindex = t.utils.createTestingUrl('/g/blue/index.html');
        urls.urlgenindex_userTemplate = t.utils.createTestingUrl('/g/red/index.html');
        urls.badfile = t.utils.createTestingUrl('/g/blue/adf/yu.html');
        urls.index2 = t.utils.createTestingUrl('/g/blue/index2.html');
        urls.localfile = t.utils.createTestingUrl('/g/blue/adf/index2.html');
        urls.localfileWildroute = t.utils.createTestingUrl('***/js/quickreloadable2.dir.html');
        urls.localfileWildroute = t.utils.createTestingUrl('***/js/quickreloadable2.dir.html');

        var file = 'C:/Users/user1/Dropbox/projects/crypto/mp/ExtProxy/bookzzext/0.5_0/js/script.js'
        urls.localFileGlobalPath = t.utils.createTestingUrl('/file/' + file);
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


     /*   t.getR(urls.localFileGlobalPath)
            .why('test with global file to file path')
            .fxDone(function onUrl(result) {
            });
*/

        //return;

        //t.testsDisable()
        t.getR(urls.urlgenindex_userTemplate)
            .why('test with user template')
            .fxDone(function onUrl(result) {
            });
        t.getR(urls.searchpb).with({query: 'what if'})
            .why('test for pb results')
            .fxDone(function onUrl(result) {
                console.log('results', result)
                //sh.x()
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
            .addPreFx(function onAddHeaders(req) {
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
            .addPreFx(function onAddHeaders(req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1, 'did not pull dating sim version')
                //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
            });


        urls.fileInAppDir = t.utils.createTestingUrl('/g/js/quickreloadable2.dir.js');
        t.getR(urls.fileInAppDir)
            .addPreFx(function onAddHeadersC(req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
                //req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1, 'did not pull dating sim version')
                //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
            });


        urls.fileNormalJS = t.utils.createTestingUrl('/g/js/1reloaddirective.js');
        t.getR(urls.fileNormalJS)
            .addPreFx(function onAddHeadersC(req) {
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
            .addPreFx(function onAddHeadersC(req) {
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
            .addPreFx(function onAddHeadersC(req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
                //req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1, 'did not pull dating sim version')
            });

        urls.fileNormalHTML = t.utils.createTestingUrl('/g/styles/testCSSDS.css');
        t.getR(urls.fileNormalHTML)
            .addPreFx(function onAddHeadersC(req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1, 'did not pull dating sim version')
            });


        urls.fileNormalHTML2 = t.utils.createTestingUrl('/g/styles/testCSS.css');
        t.getR(urls.fileNormalHTML2)
            .addPreFx(function onAddHeadersC(req) {
                req.headers = {};
                req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
                //req.headers['referer'] = 'http://localhost:10110/g/datingsim/index.html'
            })
            .why('request file with wild card in route, and referrer in header')
            .fxDone(function onUrl(result) {
                t.assert(result.indexOf('Dating SIM version') != -1, 'did not pull dating sim version')
            });


        //urls.localfileWildroute

        //http://localhost:10110/***/js/quickreloadable2.dir.html


    }


    p.launchSupportingTools = function launchSupportingTools() {
        //return;
        var cwd = process.cwd();
        var dirCrypto = __dirname + '/../../'; //'/Users/user2/Dropbox/projects/crypto
        var srvReload = dirCrypto + '/browser-eval/BasicReloadServer2.js'
        var srvReloadDir = sh.fs.resolve(srvReload)
        var srvReloadDir2 = srvReload.split('/').slice(0, -1).join('/')
        process.chdir(srvReloadDir2)
        var BES = require(srvReload).init();
        process.chdir(cwd)

        return;
        ////G:\Dropbox\projects\crypto\mp\Test_CanReloadJavascriptClass\runFileWatcherMonitor_BasicReloadServer2_mac.js
        //var srvWatcher = dirCrypto+'/mp/Test_CanReloadJavascriptClass/runFileWatcherMonitor_BasicReloadServer2_mac.js'
        //require(srvWatcher)
        var srvWatcher = dirCrypto + '/mp/Test_CanReloadJavascriptClass/projectFileWatcher.js'
        var ProjectFileWatcher = require(srvWatcher).ProjectFileWatcher
        var instance = new ProjectFileWatcher();
        var config = {};
        instance.init(config)
        instance.test();
    }
    p.proc = function debugLogger() {
        if (self.silent == true) {
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



