/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 */
var sh = require('shelpers').shelpers;

function Db2Host() {
    var p = Db2Host.prototype;
    p = this;
    var self = this;

    p.loadConfig = function loadConfig(config) {
        self.settings = config;
        config.port = sh.dv(config.port, 6009)

        self.runServer();
    }

    self.runServer = function runServer() {
        var express = require('express')
        var app = express()

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

        app.use(express.static('public_html'));

        /*return;
        var dirSaves = __dirname+'/'+'saves/';
        sh.mkdirp(dirSaves);
        sh.writeFile(dirSaves + 'test.html', 'Test content <br /> ok ok ok ?');
*/
        app.get('/valid', function onReadFile (req, res) {
            var name = req.query.name;
            //var content = sh.readFile(dirSaves+name+'.html')
            res.send('connected');

        });

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


        app.listen(self.settings.port, function () {
            console.log('Listening on ' +  self.settings.port)
        });


    }

    function defineUtils() {
        p.utils = {}
    }

    defineUtils();

    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }
}

if (module.parent == null) {
    var t = new Db2Host()
    var options = {}
    t.loadConfig(options);
    return;
}


