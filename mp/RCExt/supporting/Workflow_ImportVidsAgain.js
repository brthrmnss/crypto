/**
 * Created by user on 7/24/15.
 */

/*
 Downloads the file from imdb_app_breed
 why: downloads a pre-compiled download list.
 */

var ritvConfigHelper = require('ritvHelpers');
var rh = ritvConfigHelper.ritvHelpers.ritvHelper//.RitvHelper
var sh = require('shelpers').shelpers;

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var PromiseHelperV3 = shelpers.PromiseHelperV3;


var RC_HelperFxs = require('./TestRCScripts.js').RC_HelperFxs


function Workflow_ImportVidsAgain () {
    var p = Workflow_ImportVidsAgain.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;


        sh.throwIfNull(self.settings.fileManifestReceipt, 'need an input file ')

        if ( self.settings.url ) {
        }
        else
        {
            self.settings.url = 'http://'+self.settings.ip+':'+self.settings.port + '/'
        }


        if ( self.settings.file == null ) {
            var filename = sh.fs.clean(self.settings.url)
            var fileOutput = sh.fs.join(__dirname, '..', 'data', 'filelists',filename+'.txt' )
            var dirOutput = sh.fs.getDir(fileOutput)
            sh.fs.mkdirp(dirOutput)
            self.proc('storing it', fileOutput)
            self.settings.file = fileOutput;
        }
        self.proc('self.settings.file', self.settings.file)
        if ( config.initGFFRM ) {
            self.proc('init...|||>>>')
            var data = {}
            data.initGFFRM = true
            data.fileExists = sh.fs.exists(self.settings.file)
            data.file = self.settings.file;
            sh.cid(self.settings.fxDone, self.settings.file, data)
            return;
        }
        // return
        self.runStesps();
    }

    p.runStesps = function runStesps() {
        var chain = new PromiseHelperV3();
        var token = {};
        token.silentToken = true
        chain.wait = token.simulate == false;
        chain.startChain(token)
        chain.add(self.step1_setupSocket)
        chain.add(self.step2_uploadFile)
        chain.add(self.step3_importFiles)
        chain.add(self.step4_returnFile)
        // chain.add(self.step4_moveOutputFileToProject);
        self.chain = chain;
    }

    p.step1_setupSocket = function step1_setupSocket() {
        //  if ( self.data.skipToDl ) {
        self.data.socket = self.settings.socket
        if ( self.data.socket ) {
            self.chain.nextLink();
            return;
        }
        //self.settings.url = 'http://127.0.0.1:14002/'

        var socket = require('socket.io-client')(self.settings.url );
        socket.on('connect', function onConnectToSocket(){
            self.data.socket = socket;
            self.proc('connected')
            self.chain.nextLink();
        });
        socket.on('event', function(data){});
        socket.on('disconnect', function(){
            self.proc('lost the mirror')
        });
        return;
    }

    p.step2_uploadFile = function step2_uploadFile() {
        //  if ( self.data.skipToDl ) {

        if ( self.settings.localTest) {
            self.chain.nextLink()
            return
        }
        else {
            var json = sh.readJSONFile(self.settings.fileManifestReceipt)
            self.data.json = json;
            self.chain.nextLink()
        }

        return;

        function onResultOfcall(data) {
            self.proc('data', data.length)
            //  asdf.g
            sh.fs.writeFile(self.settings.file, data)
            self.chain.nextLink()
        }


        self.proc('started the push')
        self.data.socket.on('getLocalFiles_results', onResultOfcall)
        self.data.socket.emit('getLocalFiles', {msg:'ok'})

        //self.chain.nextLink();
        return;
        //  }
    }


    p.step3_importFiles = function step3_importFiles() {
        //  if ( self.data.skipToDl ) {

        function onResultOfcall(data) {
            self.proc('data', data.length)
            //  asdf.g
            sh.fs.writeFile(self.settings.file, data)
            self.chain.nextLink()
        }

        if ( self.settings.localTest) {
            self.proc('localTest', self.settings.localTest )
            var dirTrash = sh.fs.makePath(__dirname, 'trash')
            var fileOutput = sh.fs.makePath(dirTrash, 'file.list.test.txt')

            Workflow_ImportVidsAgain.importRecFile(self.settings.fileManifestReceipt,
                function onDone(fileOutput, lite) {
                //console.error(lite)
                console.log('file output', fileOutput);
                var content = sh.readFile(fileOutput)
                onResultOfcall(content)
                //sh.throwIf(output.foundCount != 2, 'did not match write count of items');
            }, null);
            return;
        }

        var type = 'importRecFile';
        self.proc('started the push')
        self.data.socket.on(type+'_results', onResultOfcall)
        self.data.socket.emit(type, self.data.json )

        //self.chain.nextLink();
        return;
        //  }
    }

    p.step4_returnFile = function step4_returnFile() {
        self.proc('ok...')
        self.chain.cb()
        sh.callIfDefined(self.settings.fxDone, self.settings.file, self)
    }

    p.test = function test(config) {
    }

    function defineUtils() {
        var utils = {};
        p.utils = utils;

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

Workflow_ImportVidsAgain.importRecFile = function importRecFile(fileRec, fxDone2) {
    if ( sh.isString(fileRec)) {
        var json = sh.readJSONFile(fileRec)
    }
    else {
        json = fileRec;
    }
    sh.proc('|||', '---')

    sh.proc('---', json.length, 'items')
    //asdf.g


    var self = {};

    var  rh = {};
    rh.getSequelize = function getSequelize(sync, useV2, logging, addn_models) {

        var logging = sh.dv(logging, true);
        var addn_models = addn_models || [];
        //var server_config   = require( '../'+'../' + 'server_config.json' );
        var server_config = {}//rh.loadRServerConfig()
        server_config.global = {};
        server_config.mysql = {};
        server_config.mysql.user = 'yetidbuser'
        server_config.mysql.pass = 'aSDDD545y^'
        //server_config.mysql.ip = 345345
        server_config.mysql.port = 3306

        useV2 = false;

        if ( server_config.global.environment == 'production') {
            console.log('in production mode ... turnnign of all sql debugging')
            logging = false;
        }

        if ( useV2 ) {
            var Sequelize = module.exports.requireSequelizeV2_();
        } else {
            var Sequelize = require('sequelize');
        }

        //module.exports.handleConfigOverrides(server_config);


        if ( server_config.mysql.logging == false ) {
            logging = false;
        }

        var	sequelize = new Sequelize('yetidb',
            server_config.mysql.user,
            server_config.mysql.pass,
            {
                host:server_config.mysql.ip,
                dialect:'mysql',
                port:server_config.mysql.port,
                define:{
                    chareset: 'utf8',
                    collate: 'utf8_general_ci'
                },
                logging:logging
            });



        function loadModels() {
            sequelize.models = {};
            //sequelize.models

            var dirModels = __dirname+'/../../utils/database/models/';
            //// var mdl_Invite 		= sequelize.import(dirModels+"Invites.js");
            //// var mdl_Campaign 	= sequelize.import(dirModels+"Invite_Campaigns.js");
            var mdl_User 		= sequelize.import(dirModels+"users.js");

            //mdl_Invite.hasOne( mdl_Campaign );
            ////mdl_Campaign.hasMany( mdl_Invite );

            var premiumOrder = sequelize.import(dirModels + "premium_order.js");
            sequelize.models.premium_product = premiumOrder;
            /*
             var model_files = ['/premium_order.js','/users.js'];
             var db        = {};
             (function setupDB() {
             _.each(model_files, function (file_url) {
             var model = sequelize.import(path.join(dirModels, file_url));
             db[model.name] = model;
             })

             })()
             */

            addn_models.forEach(function(model_filename){
                var mdl_name = model_filename.replace('.js','');
                var mdl = sequelize.import(dirModels + model_filename);
                sequelize.models[mdl_name] = mdl;
            });

            //// sequelize.models.invite = mdl_Invite;
            ////sequelize.models.campaign = mdl_Campaign;
            sequelize.models.user = mdl_User;
        }


        //  loadModels();



        if ( sync != false ) {

            //config.fxLoadModels(sequelize)

            sequelize.sync({force:false});
        }



        sequelize.Sequelize = Sequelize;
        return sequelize;
    }
    var RestHelperSQLTest = require('shelpers').RestHelperSQLTest;
    self.files = RestHelperSQLTest.createHelper('file', self.server,
        {   name:'file',
            readOnly:true,
            fields:{
                originalFilename: "", userId:0,
                localFilePath: "",
                desc: "", userId: 0, content_id: 0,
                episode:0, season:0,  episode_name:"",  year:0, imdb_id:"",
                series_id:"",
                extension:'',
                fileSize:0,sanitized_name:""
            },
            freezeTableName: true,
            timestamps:false,
            reset:'onlyIfNeeded',
            sequelize:rh.getSequelize(true, true)
        });




    var output = {}
    output.count = 0

    function onDoneAll() {
        sh.proc('what is this ... finsihed')
        console.log('fxDone2', fxDone2)
        sh.cid(fxDone2, output)
    }
 

    sh.async(json, function addItemToDb(j, fxDone, indexFile) {
        console.log('import', indexFile+1, j.name);
        //self.files.utils.search()
        //self.files.Table.find()
        output.count++
        if ( j.found == null ) {
            fxDone()
            return;
        }
        if ( j.found.length == 0 ) {
            fxDone()
            return;
        }
        var body = j.found[0]

        query = {
            localfilePath: body.localFilePath
        }
        self.files.Table.findAll({ where:query}).then(function(users) {
            console.log('h',users.length) // ... in order to get the array of user objects
            if ( users.length == 0 ) {
                console.error('found 0')

                var user = self.files.Table.build(body)

                user.save().success(function onCreatedItem(o) {


                })
                    .complete(function(err) {
                        if (err != null) {
                            var debugItem = body;
                            //asdf.ggggggg
                            sh.proc('The instance has not been saved:', err)
                            console.error(err.stack)
                            fxDone()
                        } else {
                            if ( self.settings != null &&
                                self.settings.logging == false ) {
                                //self.proc('...')

                            }
                            else {
                                sh.proc('We have a persisted instance now')
                            }
                            //   props.callbackRetry(props.token, props.callback)
                            fxDone()
                            return;
                        }

                    })
            } else {



                var first = users[0]

                first.updateAttributes(body)
                first.save()
                    .complete(function onComplete(err) {
                        if (err != null) {
                            var debugItem = body;
                            sh.proc('The instance has not been saved:', err);
                            console.error(err.stack)
                            fxDone()
                            return;
                        } else {
                            if ( self.settings != null &&
                                self.settings.logging == false ) {
                                 //self.proc('...')

                            }
                            else {
                                sh.proc('Updated the item', first.dataValues.name, first.name )
                            }
                            //   props.callbackRetry(props.token, props.callback)
                            fxDone()
                            return;
                        }

                    })
            }
        })
    }, onDoneAll)
}

exports.Workflow_ImportVidsAgain = Workflow_ImportVidsAgain;



if (module.parent == null) {

    var instance = new Workflow_ImportVidsAgain();
    var config = {};
    config.ip = '127.0.0.1'
    config.port = '6014'
    //config.localTest = true
    config.fileManifestReceipt = 'G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/IMDB_App_Output/mags/imdb_movies_Popularity_2017_2017_5.json.recipet.json'
    config.fxDone = function fxDone() {
        console.log('...', 'y')
    }
    instance.init(config)

}
