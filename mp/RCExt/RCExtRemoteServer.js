/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 *
 * //http://localhost:6008/
 * //this and run db2host?
 */

var shelpers = require('shelpers');
var sh = require('shelpers').shelpers;

var PromiseHelperV3 = shelpers.PromiseHelperV3;
var EasyRemoteTester = shelpers.EasyRemoteTester;

var fileScript = sh.fs.join(__dirname, 'supporting', 'TestRCScripts.js');
var RCScripts = require(fileScript).RCScripts;

var Workflow_ImportVidsAgain = require('./supporting/Workflow_ImportVidsAgain.js').Workflow_ImportVidsAgain

var Workflow_UploadAndRun = require('./supporting/Workflow_UploadAndRun.js').Workflow_UploadAndRun


//console.log('got a new one ..d..')
function RCConfigExecRemoteServer() {
    var p = RCConfigExecRemoteServer.prototype;
    p = this;
    var self = this;
    self.data = {}

    var indexPageSecurityEnding = '567.html'

    p.loadConfig = function loadConfig(config) {
        self.settings = config;
        config.port = sh.dv(config.port, 6110);
        self.proc('go to ', 'http://localhost:' + config.port);
        self.proc('go to ', 'http://' + sh.getIpAddress() + ':' + config.port + '/' + 'index.html' + indexPageSecurityEnding);

        self.runServer();
        console.error('RCConfigExecServer', exports.RCExtV)

        // asd.g
        self.runTests();
    }

    self.runServer = function runServer() {
        var express = require('express')
        var app = express()
        self.app = app;

        app.use(sh.blockIndexPage(indexPageSecurityEnding, __dirname));

        app.use(function addCrossDomainMiddlware(req, res, next) {
            //asdf.g
            res.header("Access-Control-Allow-Origin", "*");
            if (req.headers.origin != null) {
                res.header("Access-Control-Allow-Origin", req.headers.origin);
            }
            ;
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });

        var bodyParser = require("body-parser");
        //var multer = require('multer');

        app.use(bodyParser.json({limit: '50mb'}));

        app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));

        app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

        app.use(express.static(__dirname + '/' + 'public_html'));
        //uiutils in local
        var dirUIUtils = sh.require(
            /*sh.fs.join('mp', 'testingFramework'),*/
            'mp/testingFramework/',
            true)
        //console.log('ok, ', dirUIUtils)
        //sh.x()
        sh.fs.exists(dirUIUtils, 'wh not here')
        app.use('/js/lib', express.static(dirUIUtils));
        app.get('/js/lib/ui_utils.js', function onReadFile(req, res) {
            var content = sh.readFile(dirUIUtils + 'shelpers-mini.js')
            res.send(content);
        });
        app.get('/js/lib/shelpers-mini.js', function onReadFile(req, res) {
            var content = sh.readFile(dirUIUtils + 'ui_utils.js')
            res.send(content);
        });

        var FileWatcher = sh.require('mp/QuickJSON/FileWatcher').FileWatcher;

        app.get('/beephop', function onRunServ(req, res) {

            if (self.data.rc) {
                self.data.rc.kill('SIGINT');
               // sh.get('127.0.0.1:6110/exitQuit')
                sh.get('127.0.0.1:6018/exitQuit')
                sh.get('127.0.0.1:6020/exitQuit')
            }
            if (self.data.breed) {
                self.data.breed.kill('SIGINT');
               // sh.get('127.0.0.1:6020/exitQuit')
                sh.get('127.0.0.1:6022/exitQuit')
               // sh.get('127.0.0.1:6016/exitQuit')
            }
            var RCServer = 'RC_ConfigManager_ExecServer.js'
            var BreedServer = 'BreedHoistServer.js'
            setTimeout(function() {
                self.data.rc = FileWatcher.runNode(RCServer)
                self.data.breed = FileWatcher.runNode(BreedServer)
            },500)


            res.send('ok');
        });


        /*return;
         var dirSaves = __dirname+'/'+'saves/';
         sh.mkdirp(dirSaves);
         sh.writeFile(dirSaves + 'test.html', 'Test content <br /> ok ok ok ?');
         */
        app.get('/readFile', function onReadFile(req, res) {
            var name = req.query.name;
            var content = sh.readFile(dirSaves + name + '.html')
            res.send(content);

        });

        app.post('/saveFile', function onSaveFile(req, res) {
            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves + name + '.html', contents)

            res.send('Hello World!');
        });


        app.get('/goToFile', function onReadFile(req, res) {
            var name = req.query.file;
            name = name.replace('/media/sf_Dropbox', 'G:/Dropbox/')
            console.log(name)
            var opened = false;
            if (sh.fs.exists(name)) {
                if (sh.fs.isDir(name)) {
                    sh.run('start "" ' + sh.qq(name))
                    opened = true
                } else {
                    var dir = sh.fs.goUpOneDir(name)
                    sh.run('start "" ' + sh.qq(name))
                    opened = true
                }
            }

            if (opened == false) {
                res.status(404)
                res.send('no found ' + name)
                return;
            }

            res.send('ok');

        });

        sh.defineExitware(self.app)

        var JSONFileHelper = require('shelpers').JSONFileHelper;

        function defineResumeMethods() {

            //var j = new JSONFileHelper();

            var j = new JSONFileHelper();
            var config = {};
            config.file = __dirname + '/' + 'recent_files.json';
            j.init(config);
            self.data.j = j;

            app.post('/saveFile', function onSaveFile(req, res) {
                var body = req.body;
                var name = body.name;
                var contents = body.body;
                //var name = req.params.name;
                console.log(req.body);
                var fileJSON = dirSaves + name + '.html';
                sh.writeFile(fileJSON, contents);


                var bookJSON = {
                    file: fileJSON,
                    name: name
                }
                self.data.j.addRecent(bookJSON, true, 'file');

                res.send('Hello World!');
            });

            app.get('/removeFile', function onRemoveFile(req, res) {
                var body = req.query;
                var name = body.name;
                var fileJSON = dirSaves + name + '.html';
                self.proc('removing', name)

                var bookJSON = {
                    file: fileJSON,
                    name: name
                }
                self.data.j.removeRecent(bookJSON, 'file');

                res.send('removed');
            });

            app.get('/listFiles', function onSaveFile(req, res) {

                var files = [];//self.utils.getfilesInDir();

                files = self.data.j.readFile();
                res.json(files)

                return;
                var body = req.body;
                var name = body.name;
                var contents = body.body;
                //var name = req.params.name;
                console.log(req.body)
                sh.writeFile(dirSaves + name + '.html', contents)

                res.send('Hello World!');
            });

        }

        defineResumeMethods();


        function defineResumeMethods2() {
            //var j = new JSONFileHelper();

            var j = new JSONFileHelper();
            var config = {};
            config.file = __dirname + '/' + 'recent_tasks.json';
            config.propUpsert = 'name';


            j.init(config);
            self.data.j2 = j;

            app.post('/saveTask', function onSaveFile(req, res) {
                var body = req.body;
                var name = body.name;
                var contents = body.body;
                //var name = req.params.name;
                console.log('why?', name, body);

                var fileJSON = sh.fs.join(__dirname, 'tasks', name + '.json')
                sh.fs.mkdirp(fileJSON, true)
                sh.writeJSONFile(fileJSON, contents)

                //var fileJSON = dirSaves+name+'.html';
                //sh.writeFile(fileJSON, contents);
                var bookJSON = {
                    contents: contents,
                    name: name
                }
                self.data.j2.addRecent(bookJSON, true, 'name');
                res.send('Hello World!');
            });

            app.get('/getTask', function getTask(req, res) {
                var body = req.query;
                var name = body.name;

                if (name.endsWith('.json') == false) {
                    name += '.json'
                }
                var fileJSON = sh.fs.join(__dirname, 'tasks', name)
                self.proc('getTask', name, fileJSON);
                res.sendfile(fileJSON);
                //res.send('removed');
            });

            app.get('/removeTask', function onRemoveFile(req, res) {
                var body = req.query;
                var name = body.name;
                self.proc('removingTasls', name)
                if (name.endsWith('.json') == false) {
                    name += '.json'
                }

                var fileJSON = sh.fs.join(__dirname, 'tasks', name)

                var bookJSON = {
                    name: name
                }
                removedresult = self.data.j2.removeRecent(bookJSON, 'name');
                if (removedresult) {
                    sh.fs.delete(fileJSON, true)
                }
                res.send('removed');
            });

            app.get('/listTasks', function onSaveFile(req, res) {
                var files = [];//self.utils.getfilesInDir();
                files = self.data.j2.readFile();
                res.json(files)
                return;
            });

            var dirSaveNewTaskPath = sh.fs.join(__dirname, 'data', 'uploadTasks') //(app,)
            sh.uploadFileHelper({
                app: app,
                uploadPath: '/uploadTask',
                dirStore: dirSaveNewTaskPath,
                fxDone: function onUploadedFile(file, bbb) {
                    self.proc('file', file, bbb);
                    self.newTask(file)
                }
            })


            p.newTask = function newTask(file) {
                var fileDlManifest = file;
                var leaf = sh.fs.leaf(file)
                leaf = leaf.replace('.json', '')

                var dirUploadedLists = sh.fs.join(__dirname, 'data', 'uploadedLists')
                sh.fs.mkdirp(dirUploadedLists)
                var fileUploadedManifest = sh.fs.join(dirUploadedLists, sh.fs.leaf(file))
                var fileTask = sh.fs.join(__dirname, 'tasks', leaf)
                //asdf.g
                sh.fs.cp2(file, fileUploadedManifest);

                var json = {
                    "name": leaf,
                    //"fileFileList": "G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___localhost_6024_.txt",
                    "listDlManifest": fileUploadedManifest,
                    //"G:\\Dropbox\\projects\\crypto\\ritv/imdb_movie_scraper/IMDB_App_Output/dlListsWrapC/List ls Ids_ls05139_11.json",
                    "props": {
                        "upload from a file": new Date(),
                    }
                }

                //store json
                sh.writeJSONFile(fileTask, json)


                self.utils.storeConfig(leaf, fileTask);
                //update recent
            }


            self.addTest(function onTestSavingFile() {
                //G:\Dropbox\projects\crypto\mp\RCExt\data\uploadTasks\test_dl_manifest.json
                var fileTestUpload = sh.fs.join(__dirname, 'testData', 'test_dl_manifest.json')
                var orig = self.data.j2.settings.addToTop;
                self.data.j2.settings.addToTop = false;
                self.newTask(fileTestUpload);
                self.data.j2.settings.addToTop = orig;
            })

        }

        defineResumeMethods2();


        //asdf.g

        self.active_server = app.listen(self.settings.port, function () {
            console.log('Listening on ' + self.settings.port)
        });

        return self.active_server;

    }


    function defineUtils() {
        p.utils = {}

        p.utils.storeConfig = function storeConfig_ForRecent(name, file) {
            //var fileConfig = sh.fs.makePath(__dirname, /*'../',*/ 'configs', name+'')
            // sh.fs.copy(file, fileConfig, true)

            var fileConfig = sh.fs.makePath(__dirname, 'manifests', name + '.json');
            self.proc('copy', file, 'to', fileConfig);
            sh.fs.copy(file, fileConfig, true);


            var bookJSON = {
                file: fileConfig,
                created_at: new Date(),
                name: name
            }
            self.data.j2.addRecent(bookJSON, true, 'file');
            //self.data.j.addRecent(j)

        }


    }

    defineUtils();


    function defineTestsMethods() {
        p.addTest = function onAddTest(fx) {
            self.data.fxTests = sh.dv(self.data.fxTests, [])
            self.data.fxTests.push(fx)
        }
        p.runTests = function runTests() {
            sh.each(self.data.fxTests, function onTests(k, v) {
                v();
            })
        }
    }

    defineTestsMethods()
    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }
}

exports.RCConfigExecRemoteServer = RCConfigExecRemoteServer;


if (module.parent == null) {

    var t = new RCConfigExecRemoteServer()
    t.loadConfig({});
    //return t;
    setTimeout(function ok(){
        sh.get('127.0.0.1:6110/beephop')
        //sh.get('127.0.0.1:6008/index.html567.html')
       //sh.get('127.0.0.1:6110/exitQuit')
        setTimeout(function ok(){
            sh.get('127.0.0.1:6018/index.html567.html')
            //   sh.get('127.0.0.1:6110/exitQuit')
        },5000)
    },2000)



    setTimeout(function ok(){
        sh.get('127.0.0.1:6110/beephop')
      //  sh.get('127.0.0.1:6110/exitQuit')
        setTimeout(function ok(){
            sh.get('127.0.0.1:6018/index.html567.html')
            //   sh.get('127.0.0.1:6110/exitQuit')
        },5000)
    },10000)


}


