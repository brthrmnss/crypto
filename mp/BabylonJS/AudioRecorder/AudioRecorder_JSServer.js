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

console.log('got a new one ..d..')
function RCConfigExecServer() {
    var p = RCConfigExecServer.prototype;
    p = this;
    var self = this;
    self.data = {}

    var indexPageSecurityEnding = '567.html'

    p.loadConfig = function loadConfig(config) {
        self.settings = config;
        config.port = sh.dv(config.port, 6115);
        self.proc('go to ', 'http://localhost:'+ config.port);
        self.proc('go to ', 'http://'+sh.getIpAddress()+':'+ config.port+'/'+'index.html'+indexPageSecurityEnding);
        
        //config.port2 = config.port;
        //config.port += 2; //express can use any available port, we will forward to it
        self.runServer();
        //self.startSocket();
        self.data.id = exports.RCExtV
        console.error('RCConfigExecServer', exports.RCExtV)
        //   asdf3g.f
        self.data.dirDlManifests = sh.fs.makePath(__dirname,  'manifests')
        self.data.dirFileList = sh.fs.join(__dirname, 'data', 'fileList')
    }

    self.runServer = function runServer() {
        var express = require('express')
        var app = express()
        self.app = app;

       // app.use(sh.blockIndexPage(indexPageSecurityEnding));

        app.use(function addCrossDomainMiddlware(req, res, next) {
            //asdf.g
            res.header("Access-Control-Allow-Origin", "*");
            if ( req.headers.origin != null ) {
                res.header("Access-Control-Allow-Origin", req.headers.origin);
            };
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });

        var bodyParser  = require("body-parser");
        //var multer = require('multer');

        app.use(bodyParser.json({limit: '50mb'}));

        app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));

        app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

        app.use(express.static(__dirname + '/'+'public_html'));

        /*return;
         var dirSaves = __dirname+'/'+'saves/';
         sh.mkdirp(dirSaves);
         sh.writeFile(dirSaves + 'test.html', 'Test content <br /> ok ok ok ?');
         */
        app.get('/readFile', function onReadFile (req, res) {
            var name = req.query.name;
            var content = sh.readFile(dirSaves+name+'.html')
            res.send(content);

        });
        self.app.get('/*', function onGetFileFromReloader(req, res) {
            console.log('output', JSON.stringify([req.params, req.query]))

            var y = req.originalUrl;
            if ( sh.isWin() ) {
                y = y.slice(1)
                console.error('orig url', y)
            }
            var split = y.split('/')
            var fileSections = split
            split = split.slice(2)
            var dir = split.shift();


            var file = y.replace('/file/', '')


            if ( file.includes('Dropbox/') == false ) {
                console.error('no dropbox in name')
                res.send('hint ' )
                return;
            }



            if ( sh.fs.exists(file)) {
                res.sendfile(file);
                return;
            }

            res.send('not found ' + file + ' ' + sh.fs.exists(file))

        })

        app.post('/saveFile', function onSaveFile (req, res) {
            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves+name+'.html', contents)

            res.send('Hello World!');
        });

        app.post('/listFiles', function onSaveFile (req, res) {

            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves+name+'.html', contents)

            res.send('Hello World!');
        });

        var JSONFileHelper = require('shelpers').JSONFileHelper;

        self.active_server = app.listen(self.settings.port, function () {
            console.log('Listening on ' +  self.settings.port)
        });



        var dirSave_UploadedAudioFiles = sh.fs.join(__dirname, 'audio_uploads')
        //sh.uploadFileHelper(app, '/upload.php', dirSave)


        sh.uploadFileHelper({
            app: app,
            uploadPath: '/upload.php',
            dirStore: dirSave_UploadedAudioFiles,
            fxDone: function onUploadedFile(file, bbb) {
                self.proc('file', file, bbb);
                //self.newTask(file)
            }
        })

        //self.utils.uploadFile(app, '/upload.php')

        return self.active_server;

    }



    function defineUtils() {
        p.utils = {}

        p.utils.uploadFile = function uploadFile(app, path) {


            var dirSave = sh.fs.join(__dirname, 'audio_uploads')
            sh.fs.mkdirp(dirSave)
            var multer = require('multer');
            var storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, dirSave)			// DESTINATION FILES
                },
                filename: function (req, file, cb) {
                    if(typeof file === 'undefined')
                        return;
                    //var ext = file.originalname.split('.').pop();
                    cb(null, file.originalname);
                }
            });

            var upload = multer({ storage: storage });

            if ( path.startsWith('/') == false ) {
                sh.throw('bad path', path)
            }
            app.post(path, upload.single('file'), function(req, res){

                console.log('file upload', req.file.filename)
                var filename = req.file.filename;
                var isArchiveFile = req.file.filename.indexOf('.htmlz') != -1
                if ( req.file.filename.indexOf('.epub') != -1 || isArchiveFile ) {
                    var filePath = req.file.destination+req.file.filename
                    var execSync = require('child_process').execSync;
                    var dirExtraction = req.file.destination+'extracted/'
                    filePath = '"'+filePath+'"'
                    var dirBook = filename.replace(/[^\w\s]/gi, '')
                    dirExtraction += dirBook   +'/'
                    dirExtraction = '"'+dirExtraction+'"'
                    var args = ['-o',filePath, '-d', dirExtraction];
                    console.log(args)
                    args = args.join(' ')
                    console.log(args)
                    var code = execSync('unzip ' +args);
                }
                res.status(204).end(); req.filename;
            });

            var output = {}
            output.app = app;
            output.upload = upload;
            output.multer = multer;
            output.storage = storage;
            return output
        }
    }

    defineUtils();

    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }
}

exports.RCExtV = 1;
exports.RCConfigExecServer = RCConfigExecServer;
exports.reloadServer = function reloadServer(oldServer, fxFin, count, dict, classFx) {



    console.log(sh.n, 'reloadServer', count, oldServer!= null, sh.n)
    exports.RCExtV = count
    if ( oldServer) {
        //  asdf.g
       // var yyy =  oldServer.active_server2.close()
        var oldS = oldServer.active_server.close();

        //return;
        ///console.log('output',null!=oldServer, yyy, oldS)
        setTimeout(function onReloadLater () {
            if ( dict && dict.count != count ) {
                console.error('warn', 'bad count', count, '!=', dict.count)
                return;
            }
            console.log('\t','onReloadLater', count)
            exports.reloadServer(null, fxFin, count, dict, classFx);
        }, 1500);
        return;
    }
    if ( classFx == null )
        var t = new RCConfigExecServer()
    else
        t = new classFx.RCConfigExecServer(); //maybe ned to get reloaded version not orignal versoin?

    console.error('-->reloading script', 'go', count)

    var options = {}
    if ( oldServer && oldServer.oldOptions ) {
        options = oldServer.oldOptions;
    }

    /*  t.handleSocket({cmd:'searchpb', query:'epub'}, function onGotIt(a,b){
     console.log('output', a,b)
     })*/

    t.loadConfig(options);

    RCConfigExecServer.oldServer = t;

    if ( fxFin )
        fxFin(t)


    return t;
}
if (module.parent == null) {

    function runServer() {
        exports.reloadServer()


        setTimeout(function onReload() {
            exports.reloadServer(RCConfigExecServer.oldServer)
        }, 2500)
    }
    runServer()


 
}


