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

var RestHelperSQLTest = require('shelpers').RestHelperSQLTest;
var Sequelize = RestHelperSQLTest.Sequelize;


console.log('got a new one ..d..')
function PIDServer() {
    var p = PIDServer.prototype;
    p = this;
    var self = this;
    self.data = {}

    var indexPageSecurityEnding = '567.html'

    p.loadConfig = function loadConfig(config) {
        self.settings = config;
        config.port = sh.dv(config.port, 6016);
        self.proc('go to ', 'http://localhost:' + config.port);
        self.proc('go to ', 'http://' + sh.getIpAddress() + ':' + config.port + '/' + 'index.html' + indexPageSecurityEnding);

        //config.port2 = config.port;
        //config.port += 2; //express can use any available port, we will forward to it
        self.runServer();
        //self.startSocket();
        self.data.id = exports.RCExtV
        console.error('PIDServer', exports.RCExtV)
        //   asdf3g.f
        self.data.dirDlManifests = sh.fs.makePath(__dirname, 'manifests')
        self.data.dirFileList = sh.fs.join(__dirname, 'data', 'fileList')

        //self.pc()

        self.px();

        self.createRESTHelper()
        self.createRESTHelper()
        self.createTags()
        self.createEntriesToTags()
    }

    p.px = function pc() {
        var config = sh.dv(config, {})
        if ( config.logging == null )
            config.logging = false;


        self.settings = config;
//mysql -u root -p <  /src/videoproject/Code/node_scripts/node_modules/rhelpers/sql/yetidb.sql

//var cluster_settings = rh.loadRServerConfig();
        var cluster_settings = {};
        var m = {};
        cluster_settings.mysql = m;
        cluster_settings.mysql.user = 'root'
        cluster_settings.mysql.password = 'password'



        if ( sh.isWin() == false ) {
            m.password = null;
            m.user = 'root'
            m.password = 'your_password667'
            //cfg.user ='yetidbuser';
            // cfg.password = 'aSDDD545y';
        }


        self.cluster_settings = cluster_settings;
//cluster_settings.mysql.password = 'password'

        m.databasename = 'pid'

        if (config) {
            sh.mergeObjectsForce(config, m)
        }

        //enable sql logging
        config.logging = console.log

        var configDB = {
            host: cluster_settings.mysql.ip,
            port: cluster_settings.mysql.port,
            database: cluster_settings.mysql.databasename,
            user: cluster_settings.mysql.user,
            password: cluster_settings.mysql.password,
            logging: config.logging
        }


        if ( self.settings.dbg )
            console.log('config---', m, configDB)
        self.cfg = configDB;
    }

    p.createRESTHelper = function createRESTHelper() {
        var server = {};
        server = null; //? //dib;t want a server made
        server = self.app
        //var tableName = self.settings.tableName;
        //var tableName = sh.dv(tableName, 'imdb_info')
        var tableName = 'prompts'
        if ( self.settings.dbg )
            console.error('createRESTHelper', tableName, 'y', self.settings)
        var fields = self.settings.fields;
        var defaultFields =  {
            name: "",
            desc: "text",
            user_id: 0,
        }
        fields = sh.dv(fields, defaultFields)
        self.prompts = RestHelperSQLTest.createHelper(tableName,
            server,  {
                name: tableName,
                fields: fields,
                //fxUserId:self.utils.getUserIdFromSession
                //,
                //fxGetUserId:LoginAPIConsumerService.pullSessionIDFromRequest,
                fxStart: testBreadCrumbsUserId,
                //port:self.settings.port,
                cfg: {db: self.cfg},
                settings:self.settings,
                logging:false
            }
        );
        //sh.exit('what is logging', self.breadcrumbs.logging)
        self.prompts.logging = false;
        self.sequelize = self.prompts.sequelize;
        //self.Table = self.breadcrumbs.Table;
        //console.log(self.Table, 'sss')
        //asdf.g
        function testBreadCrumbsUserId() {
            //asdf.g
            //self.proc('imdb db rest helper created')
            sh.callIfDefined(self.fxDone);
        }
    }


    p.createRESTHelper2 = function createRESTHelper2() {
        var server = {};
        server = null; //? //dib;t want a server made
        server = self.app
        var tableName = 'entries'
        if ( self.settings.dbg )
            console.error('createRESTHelper', tableName, 'y', self.settings)
        var fields = self.settings.fields;
        var defaultFields =  {
            name: "",
            desc: "text",
            user_id: 0,
        }
        fields = sh.dv(fields, defaultFields)
        self.entries = RestHelperSQLTest.createHelper(tableName,
            server,  {
                name: tableName,
                fields: fields,
                //fxUserId:self.utils.getUserIdFromSession
                //,
                //fxGetUserId:LoginAPIConsumerService.pullSessionIDFromRequest,
                fxStart: testBreadCrumbsUserId,
                //port:self.settings.port,
                cfg: {db: self.cfg},
                settings:self.settings,
                logging:false
            }
        );
        //sh.exit('what is logging', self.breadcrumbs.logging)
        self.breadcrumbs.logging = false;
        self.sequelize = self.breadcrumbs.sequelize;
        self.Table = self.breadcrumbs.Table;
        //console.log(self.Table, 'sss')
        //asdf.g
        function testBreadCrumbsUserId() {
            //asdf.g
            //self.proc('imdb db rest helper created')
            sh.callIfDefined(self.fxDone);
        }
    }

    p.createTags = function createTags() {
        var server = {};
        server = null; //? //dib;t want a server made
        server = self.app
        //var tableName = self.settings.tableName;
        //var tableName = sh.dv(tableName, 'imdb_info')
        var tableName = 'tags'
        if ( self.settings.dbg )
            console.error('createRESTHelper', tableName, 'y', self.settings)
        var fields = self.settings.fields;
        fields = {
            test_col:""
        }
        var defaultFields =  {
            name: "",
            desc: "text",
            user_id: 0,
        }
        fields = sh.dv(fields, defaultFields)
        self.tags = RestHelperSQLTest.createHelper(tableName,
            server,  {
                name: tableName,
                fields: fields,
                //fxUserId:self.utils.getUserIdFromSession
                //,
                //fxGetUserId:LoginAPIConsumerService.pullSessionIDFromRequest,
                fxStart: testBreadCrumbsUserId,
                //port:self.settings.port,
                cfg: {db: self.cfg},
                settings:self.settings,
                logging:false
            }
        );
        //sh.exit('what is logging', self.breadcrumbs.logging)
        self.tags.logging = false;
        self.sequelize = self.tags.sequelize;
        self.Table = self.tags.Table;
        //console.log(self.Table, 'sss')
        //asdf.g
        function testBreadCrumbsUserId() {
            //asdf.g
            //self.proc('imdb db rest helper created')
            sh.callIfDefined(self.fxDone);
        }
    }

    p.createEntriesToTags = function createEntriesToTags() {
        var server = {};
        server = null; //? //dib;t want a server made
        server = self.app
        //var tableName = self.settings.tableName;
        //var tableName = sh.dv(tableName, 'imdb_info')
        var tableName = 'entriesToTags'
        if ( self.settings.dbg )
            console.error('createRESTHelper', tableName, 'y', self.settings)
        var fields = self.settings.fields;
        var defaultFields =  {
            name: "",
            //desc: "text",
            user_id: 0,
            tag_id: 0,
            entry_id: 0,
        }
        fields = sh.dv(fields, defaultFields)
        self.tags = RestHelperSQLTest.createHelper(tableName,
            server,  {
                name: tableName,
                fields: fields,
                //fxUserId:self.utils.getUserIdFromSession
                //,
                //fxGetUserId:LoginAPIConsumerService.pullSessionIDFromRequest,
                fxStart: testBreadCrumbsUserId,
                //port:self.settings.port,
                cfg: {db: self.cfg},
                settings:self.settings,
                logging:false
            }
        );
        //sh.exit('what is logging', self.breadcrumbs.logging)
        self.tags.logging = false;
        self.sequelize = self.tags.sequelize;
        self.Table = self.tags.Table;
        //console.log(self.Table, 'sss')
        //asdf.g
        function testBreadCrumbsUserId() {
            //asdf.g
            //self.proc('imdb db rest helper created')
            sh.callIfDefined(self.fxDone);
        }
    }

    p.pc = function pc() {
        var server = self.app;

        var cfg = {
            databasename: 'pid',
            password: 'password',
            tableName: 'prompts',
            logging: self.settings.logging,
            tableOptions: {
                freezeTableName: true,
                tableName: 'file',
                timestamps: false,
                indexes: [{unique: true, fields: ['id']}]
            },
            fields: {
                // id:0,//why:cannot bulk create records if id field is not specified
                originalFilename: '',
                episode_name: '',
                show_name: '',
                name: '',
                localFilePath: '',
                imdb_id: "",
                imdb_series_id: "",
                seasonNumber: 0, episodeNumber: 0,
                adminNotes: "",
                episode: true,
                series: true,

                //user_id: 0,
                //year: "",
                //rating: ""

            }
        }



        self.prompts = RestHelperSQLTest.createHelper('prompt',
            server,
            /*{
             name:'prompt',
             fields:
             {name: "", desc: "", user_id: 0, imdb_id: "", minutes: 0,
             one_per_day:true, data:"" , data_json:"text"},
             fxUserId:self.utils.getUserIdFromSession,
             noSQL:self.settings.noSQL,
             //fxGetUserId:LoginAPIConsumerService.pullSessionIDFromRequest,
             //fxStart:testBreadCrumbsUserId
             //port:self.settings.port,
             }*/
            cfg
        );

        return;


        var restHelperSettings = {
            name:'imdbs',
            fields:
            {name: "", desc: "", user_id: 0, imdb_id: 0, image: "",
                rating:0, year:0, genre:"", series:true, series_name:"",
                series_id:0, seasons:0, episode:0}
            //fxStart:testIMDBs
        }
        self.imdbs = RestHelperSQLTest.createHelper('imdbs', server, restHelperSettings);


        return;


        self.content = RestHelperSQLTest.createHelper('contents', server, {
            name:'contents',
            fields:{name: "", src:"", desc: "", user_id: 0, content_id: 0,
                episode:0, season:0, show_name:"",  year:0, imdb_id:""
            },
            // fxStart:runTest,
            /*
             fxReset :function fxReset() {
             GenerateData = shelpers.GenerateData;
             var gen = new GenerateData();

             var input =  ['Game of Thrones', '4x12', 'The Blacklist',
             'Empire', "Grey's Anatomy", '6x20',
             "Schindler's List", 'Raging Bull', 'the Godfather', ''];

             function addSrc(obj) {
             obj.src =  ''
             var content = 'content/';

             if ( obj.series == true) {
             content += 'series/';
             if ( obj.series_name != null ) {
             content += obj.series_name //+ ' - '
             }
             if ( obj.name != null ) {
             content += ' - ' + obj.name //+ ' - '
             }
             content += ' ' + obj.season + 'x' + obj.episode;
             }
             else {
             //if ( obj.name != null ) {
             content += obj.name// + ' - '
             //}
             //content += obj.season + ' x ' + obj.episode;
             }

             content += '.mp4';
             obj.src = content;

             }

             function isNumber(n) {
             return !isNaN(parseFloat(n)) && isFinite(n);
             }


             function makeArray(input) {
             var output =[]
             var prev  = {}
             for (var i = 0; i < input.length; i++) {
             var item = input[i]

             var next = input[i+1];

             var firstNumber = false

             if ( next != null ){
             firstNumber = next.slice(0,1)
             }


             if ( isNumber(firstNumber) ) {
             i++;




             output.pop();


             var s = next.split('x')[0];
             var e = next.split('x')[1];
             s = parseInt(s)
             e = parseInt(e)
             for (var sea = 1; sea < s; sea++) {

             for (var epi = 1; epi < e; epi++) {
             var obj = sh.clone(prev);
             obj.season = sea;
             obj.episode = epi;
             obj.series = true;
             obj.series_name = item;

             addSrc(obj);

             obj.desc = item  + ' ' +
             obj.season  + 'x' + obj.episode;
             output.push(obj);
             }

             }


             continue;
             }

             var obj = {}
             obj.name = item;
             obj.desc = item;
             addSrc(obj);
             output.push(obj);
             prev = obj;

             }
             return output
             }


             var output = makeArray(input)
             var model = gen.create(output, function (item, id, dp) {
             //item.name = id;
             // item.id = id;
             //item.desc = GenerateData.getName();
             });

             return model;
             }*/
        });

    }



    self.runServer = function runServer() {
        var express = require('express')
        var app = express()
        self.app = app;

        // app.use(sh.blockIndexPage(indexPageSecurityEnding));

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
        /*
         self.app.get('/!*', function onGetFileFromReloader(req, res) {
         console.log('output', JSON.stringify([req.params, req.query]))

         var y = req.originalUrl;
         if (sh.isWin()) {
         y = y.slice(1)
         console.error('orig url', y)
         }
         var split = y.split('/')
         var fileSections = split
         split = split.slice(2)
         var dir = split.shift();


         var file = y.replace('/file/', '')


         if (file.includes('Dropbox/') == false) {
         console.error('no dropbox in name')
         res.send('hint ')
         return;
         }


         if (sh.fs.exists(file)) {
         res.sendfile(file);
         return;
         }

         res.send('not found ' + file + ' ' + sh.fs.exists(file))

         })
         */
        app.post('/saveFile', function onSaveFile(req, res) {
            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves + name + '.html', contents)

            res.send('Hello World!');
        });

        app.post('/listFiles', function onSaveFile(req, res) {

            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves + name + '.html', contents)

            res.send('Hello World!');
        });

        var JSONFileHelper = require('shelpers').JSONFileHelper;

        self.active_server = app.listen(self.settings.port, function () {
            console.log('Listening on ' + self.settings.port)
        });

        return self.active_server;

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

exports.RCExtV = 1;
exports.PIDServer = PIDServer;
exports.reloadServer = function reloadServer(oldServer, fxFin, count, dict, classFx) {


    console.log(sh.n, 'reloadServer', count, oldServer != null, sh.n)
    exports.RCExtV = count
    if (oldServer) {
        //  asdf.g
        // var yyy =  oldServer.active_server2.close()
        var oldS = oldServer.active_server.close();

        //return;
        ///console.log('output',null!=oldServer, yyy, oldS)
        setTimeout(function onReloadLater() {
            if (dict && dict.count != count) {
                console.error('warn', 'bad count', count, '!=', dict.count)
                return;
            }
            console.log('\t', 'onReloadLater', count)
            exports.reloadServer(null, fxFin, count, dict, classFx);
        }, 1500);
        return;
    }
    if (classFx == null)
        var t = new PIDServer()
    else
        t = new classFx.PIDServer(); //maybe ned to get reloaded version not orignal versoin?

    console.error('-->reloading script', 'go', count)

    var options = {}
    if (oldServer && oldServer.oldOptions) {
        options = oldServer.oldOptions;
    }

    /*  t.handleSocket({cmd:'searchpb', query:'epub'}, function onGotIt(a,b){
     console.log('output', a,b)
     })*/

    t.loadConfig(options);

    PIDServer.oldServer = t;

    if (fxFin)
        fxFin(t)


    return t;
}
if (module.parent == null) {

    function runServer() {
        exports.reloadServer()


        setTimeout(function onReload() {
            exports.reloadServer(PIDServer.oldServer)
        }, 2500)
    }

    runServer()


}


