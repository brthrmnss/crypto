/**
 * Designed to test all ritv functions
 * @type {*}
 */

var shelpers = require('shelpers');
var sh = shelpers.shelpers;
var SettingsHelper = require('shelpers').SettingsHelper;

var ExpressServerHelper = shelpers.ExpressServerHelper
var RestHelperSQLTest = require('shelpers').RestHelperSQLTest;
var Sequelize = RestHelperSQLTest.Sequelize;

var EasyRemoteTester = shelpers.EasyRemoteTester;



function RestHelperJSONFileBasedServer() {
    var p = RestHelperJSONFileBasedServer.prototype;
    p = this;
    var self = this;

    self.init = function init(config){
        var defaultSettings = {
            port: 10002,
            dir: 'requests/',
            //dirHtml: 'ritv_public_html/', //
            dirHtml: '../quick/', //
            mysql:{
                database:'fileserver',
                user:"root",
                password:'password',
                port:3306
            },
            wildcards:false,
            enableAnonymouse:true,
            noProxy:true,
            // force:false,
            fxDone:self.fxServerStarted
        }
        var settings = {};
        sh.mergeObjects(config, settings)
        sh.mergeObjects(defaultSettings, settings)

        self.settings = settings;
        self.settings.noSQL = true;

        self.init2()
    }


    p.init2 = function init2(settings) {
        var express = require('express');
        var app = express();
        self.settings2 = sh.clone(self.settings);
        self.app = app;

        var bodyParser = require('body-parser');
        var session = require('express-session');
        var cookieParser= require('cookie-parser');
        var FileStore = require('session-file-store')(session);

        //self.define_YeomanRoutes(app);

        function allowCrossDomainMiddlware (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        }
        app.use(allowCrossDomainMiddlware)
        app.use(bodyParser());
        app.use(cookieParser());
        app.use(session({ store: new FileStore(
            {path: 'anon_sessions' }),
            secret: 'spaceyok', resave: false, saveUninitialized: true }));

        self.setupDataStores()


        app.listen(self.settings.port)
        self.proc('start on port', self.settings.port)
    }

    p.setupDataStores = function setupDataStores() {

        self.t  = EasyRemoteTester.create('test everything');
        self.t.wait(2);

        self.define_Prompts();
       // self.define_Prompts_Log(s.server);

        return;

    }

    p.fxServerStarted = function fxServerStarted() {
        self.runTests();
    }


    p.define_Prompts = function defineBreadcrumbRestHelper() {
        //server = self.cQS.credentialsServer.api;
        self.prompts = RestHelperSQLTest.createHelper('prompt',
            self.app,
            {
                name:'dls',
                file:'G:/Dropbox/projects/crypto/ritv/distillerv3/tools/santizename/output/missing imdb info.json',
                fileUseAltFileForSafety:true,
                fields:
                {name: "", desc: "", user_id: 0, imdb_id: "", minutes: 0,
                    one_per_day:true, data:"" , data_json:"text"},
                fxUserId:self.utils.getUserIdFromSession,
                noSQL:self.settings.noSQL,
                //fxGetUserId:LoginAPIConsumerService.pullSessionIDFromRequest,
                //fxStart:testBreadCrumbsUserId
                //port:self.settings.port,
            }
        );
    }

    p.define_Prompts_Log = function define_Prompts_RestHelper(server) {
        //server = self.cQS.credentialsServer.api;
        self.promptsLog = RestHelperSQLTest.createHelper('promptlog',
            server,
            {
                name:'promptlog',
                fields:
                {name: "", desc: "", user_id: 0, color: "", comments: "",
                    data:"", progress:0, data_json:"text"},
                fxUserId:self.utils.getUserIdFromSession,
                noSQL:self.settings.noSQL,
                //fxGetUserId:LoginAPIConsumerService.pullSessionIDFromRequest,
                //fxStart:testBreadCrumbsUserId
                //port:self.settings.port,
            }
        );

    }

    function defineTestHelpers() {
        self.startupTests = [];
        self.addToTest = function addToTests(item, name) {
            self.startupTests.push({name:name, fx:item})
        }
        self.runTests = function runTests(item, name) {

            sh.each(self.startupTests, function runTest(k,v){
                sh.logLine = function logLine(times) {
                    sh.times(times, function(){console.log();});
                }
                sh.times = function times(count, fx) {
                    for (var i = 0; i < count; i++) {
                        fx(i);
                    }
                }
                sh.logLine(3)
                self.proc('running test', v.name)
                sh.logLine(3)
                v.fx();
            })
            // self.startupTests.push({name:name, item:item})
        }

        self.createTestingUrl = function createTestingUrl(end){
            var url = 'http://localhost:' + self.settings.port ;//+ '/' + end;
            if ( ! sh.startsWith(end , '/')){
                url += '/';
            }
            url += end;

            return url;
        }
    }
    defineTestHelpers();


    function defineUtils() {
        self.utils = {}
        self.utils.generateFakeContentForContentAPI = function generateFakeContentForContentAPI() {
            var GenerateData = shelpers.GenerateData;
            var gen = new GenerateData();

            var input = ['Game of Thrones', '4x12', 'The Blacklist',
                'Empire', "Grey's Anatomy", '6x20',
                "Schindler's List", 'Raging Bull', 'the Godfather', ''];

            function addSrc(obj) {
                obj.src = ''
                var content = 'content/';
                /*sh.str.ifStr(obj.series, 'series/')+
                 sh.str.ifStr(obj.series && obj.name != null, obj.name+'/')+
                 sh.str.ifStr(obj.series && obj.name != null, obj.name+'/')+
                 '.mp4'*/
                if (obj.series == true) {
                    content += 'series/';
                    if (obj.series_name != null) {
                        content += obj.series_name //+ ' - '
                    }
                    if (obj.name != null) {
                        content += ' - ' + obj.name //+ ' - '
                    }
                    content += ' ' + obj.season + 'x' + obj.episode;
                }
                else {
                    //if ( obj.name != null ) {
                    content += obj.name// + ' - '

                    if ( obj.name == 'Raging Bull') {
                        obj.year = 1980
                        obj.imdb_id = 'tt0081398'
                    }
                    if ( obj.name == 'the Godfather') {
                        obj.year = 1972
                        obj.imdb_id = 'tt0068646'
                    }


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
                var output = []
                var prev = {}
                for (var i = 0; i < input.length; i++) {
                    var item = input[i]

                    var next = input[i + 1];

                    var firstNumber = false

                    if (next != null) {
                        firstNumber = next.slice(0, 1)
                    }


                    if (isNumber(firstNumber)) {
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

                                obj.desc = item + ' ' +
                                    obj.season + 'x' + obj.episode;
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

                item.imdb_id= sh.dv(item.imdb_id,'tt'+(id+100));
            });

            return model;
        }

        self.convertQueryParamToQuery = function (req) {
            //TODO: move this code somewhere else
            var query = req.query;//JSON.parse(req.query);

            if ( req.query.pquery != null ) {
                query =JSON.parse( req.query.pquery )
            }

            var andLimits = [];
            andLimits.push({ src: {like:"%"+query.name+"%"} })
            if (query.season_name) {
                andLimits.push({ src: {like: "%" + query.season_name + "%"} })
            }
            if (query.episode) {
                andLimits.push({ episode:query.episode });
            }
            if (query.season) {
                andLimits.push({ season:query.season });
            }

            if (query.year && false == true ) {
                andLimits.push({ year:  query.year  })
            }
            var arr =  Sequelize.and.apply(this, andLimits)

            var query_ = {where:query}
            query_.limit = 10;
            req.query = query_;
        }

        self.utils.getUserIdFromSession = function getUserIdFromSession(req){
            if ( self.login == false ) {
                return 2;
                //return null;
            }
            return req.session.user_id;
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






var s = new RestHelperJSONFileBasedServer()
s.init();

