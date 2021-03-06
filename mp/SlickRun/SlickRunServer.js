/**
 * Created by user on 8/2/15.
 */

/**
 * This is a mini server, that allows users to
 * append to notes
 *
 * https://github.com/marytts/marytts/issues/213
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var express = require('express');
var config = global.config;

var express = require("express");


var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

var http = require('http').Server(app);
var io = require('socket.io')(http);

/**
 * Created by user on 7/30/15.
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;


function SlickRunServer() {
    var p = SlickRunServer.prototype;
    p = this;
    var self = this;
    self.data = {};

    //specify url of everest folder
    var baseUrl = 'http://127.0.0.1';

    //create urls
    var t = EasyRemoteTester.create('Test evenote basics',{})
    t.settings.baseUrl = baseUrl
    var urls = {};
    urls.notes = {};
    urls.reload = t.utils.createTestingUrl('reload')
    urls.getFile = t.utils.createTestingUrl('getFile')
    urls.notes.update = t.utils.createTestingUrl('notes')
    urls.notes.get = t.utils.createTestingUrl('notes')

    self.dirPrjRoot = '/media/psf/Dropbox/projects/crypto/deploy_nodejs'
    self.dirPrjRoot = '/media/sf_projects/crypto/deploy_nodejs'

    /**
     * Setup middleware and routes
     * @param url
     * @param appCode
     */
    p.start = function start(url, appCode) {
        //Add middleware for cross domains
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        self.settings = {};
        self.settings.port = 5558
        self.settings.port2 = 3000

        self.settings.port = 4444
        self.settings.port2 = 3002

        self.settings.port = 4445
        self.settings.port2 = 3003
        
        baseUrl += ':' + self.settings.port;

        self.data.id = 'RCS'+Math.random();

        // app.post('/append_named',   self.appendNoteNamed);
        //self.setupSession();
        //var port = 3000
        http.listen(self.settings.port, function () {
            console.log('started')
            console.log('go to ', baseUrl)
            console.log('.', 'http://127.0.0.1:4444/testSay?text=Who%20are%20you?&rate=100%')
        })

        // open('http://localhost:5557')
        // http://localhost:5557/index.html
        var server = app.listen(self.settings.port2);
        // var io = require('socket.io').listen(server, { log: true });

        console.log('path', __dirname)
        app.use(express.static(__dirname + '/public_html'))
        app.use(express.static(__dirname + '/testFiles'));
        //app.use(express.static(__dirname + '/testFileds'));
        var path = __dirname + '/../../node_modules/shelpers/lib'
        path = sh.fs.resolve(path)
        console.log('path', path)
        app.use(express.static(path))

        var dirRCSPublicHTML = __dirname + '/../RemoteConsoleServer/public_html/'
        dirRCSPublicHTML = sh.fs.resolve(dirRCSPublicHTML)
        sh.fs.exists(dirRCSPublicHTML, 'dirRCSPublicHTML is wrong')
        app.use(express.static(dirRCSPublicHTML));
        //uiUtils.js
        var dirTestingFramework = __dirname + '/../testingFramework/'
        dirTestingFramework = sh.fs.resolve(dirTestingFramework)
        sh.fs.exists(dirTestingFramework, 'dirTestingFramework is wrong')
        app.use('/js', express.static(dirTestingFramework));



        //app.use(express.static(__dirname ) );// + '/public_html'))
        self.appSocket = io
        io.sockets.on('connection', function onSocketConnect(socket) {
            console.log('new connnnn')
            self.pSocket = socket;
            socket.emit('news', { hello: 'world' });
            socket.emit('reload', {why:'grammar', count:self.data.id});

            socket.on('my other event', function (data) {
                console.log(data);
            });

            socket.on('audioEnded', function onAudioEndedUI (data) {
                self.proc('audioEnded', data);
                sh.callIfDefined(self.data.fxEndAudio)
                self.data.fxEndAudio = null;
            });
            /*socket.on('chat message', function (data) {
             console.log(data);
             });*/
            socket.on('chat message', function(msg){
                io.emit('chat message', msg);
            });


            socket.on('window.invoke', function (x) {
                console.log('window invoke')
                socket.broadcast.emit('window.invoke', x);
            })

            socket.on('cmd', function (data) {
                console.log('data', data);

                if ( self.cmd ) {
                    if ( sh.isWin() == false )
                        self.cmd.kill();
                    // self.cmd.kill();
                    //self.cmd.kill();
                }

                var CommandRunner = sh.CommandRunner

                if ( sh.isMac() ) {

                }
                else if ( data.data ) {
                    //why: if data, it is new type
                    console.log('p', data)
                    if (data.cmd == 'speakevernote') {

                        data.cmd = 'ruby'
                        data.args = ['C:/Users/user1/Dropbox/projects/soundboard/automate_android_store/autoit/evernote_speak_note_link.rb',
                            data.data]
                    }

                    if (data.cmd == 'evernote') {

                        //cmd /k "cd c:\myfolder & startbatch.bat"
                        data.cmd = 'cmd'
                        data.args = [
                            "/k",
                            'start',
                            data.data]
                    }

                    if (data.cmd == 'evernote') {

                        //cmd /k "cd c:\myfolder & startbatch.bat"
                        data.cmd = 'cmd'
                        data.args = [
                            "/k",
                            'start',
                            data.data]
                    }
                }


                self.proc('what is command', sh.toJSONString(data) )

                function fxDone () {

                }

                var cmd = new CommandRunner()
                var settings = data
                settings.silent = self.silent
                settings.fxCallback =
                    function commandFinished() {
                        console.log(cmd.log.output)
                        sh.callIfDefined(fxDone);
                    }

                settings.fxEcho = function onOutput(line){
                    console.log('fxEcho', line)
                    io.emit('cmdout', line);
                    socket.broadcast.emit('cmdout', line);
                }


                self.cmd = cmd;

                //settings.cmd = cmdtxt
                //settings.args = args;
                cmd.execute(settings)
                //console.log('run', args)

            });
        });

        self.server = app;
        self.newRoutes();

        self.getCSVFiles();
    }

    p.getCSVFiles = function getCSVFiles() {
        self.proc('getCSVFiles')
        /*var y = sh.readJSONFile(__dirname+ '/' + 'public_html/'
         + 'actions.json');*/
        var dirCSV = sh.readFile(__dirname+ '/' + 'public_html/sr/'
            + 'actions.csv');
        /*       var yyy = sh.convertCSV(dirCSV)
         console.log(yyy);

         sh.each(yyy, function kc(k,v) {
         dict[v.name] = v;
         });*/

        var types = {};
        types.replaceCMD = '--replace '
        types.commentHash = '#'

        var dirCSV2 = sh.readFile(__dirname+ '/' + 'public_html/sr/'
            + 'actions2.csv');

        var csvContent = [dirCSV, dirCSV2].join(sh.n)
        var dict = {};

        var dictReplace = {};

        var csvRows = sh.convertCSV(csvContent)
        sh.each(csvRows, function onProcessAliases(k,v) {
            if ( v.name.startsWith(types.replaceCMD) ) {
                var line = v.name.replace(types.replaceCMD, '')
                var split = line.split('|')
                var findX = split[0];
                var replaceX = split[1];
                replaceX = replaceX.trim();
                self.proc('replace', findX, replaceX)
                dictReplace[findX] = replaceX
                // replaceX.nameAliasedFrom = replaceX.name;
                //  replaceX.name = findX.name;
                return;
            }
        });


        sh.each(dictReplace, function onDictReplace(findX,replaceX) {
            csvContent = sh.replace(csvContent, findX, replaceX.trim())
        });

        var csvRows = sh.convertCSV(csvContent)

        sh.each(csvRows, function kc(k,v) {
            //console.log(k,v)
            if ( v.name.startsWith('#') ) {
                self.proc('remove', v.name)
                return;
            }
            dict[v.name] = v;
            //asdf.g
        });

        // sh.x('tested it')

        var actionsLengths = 0;
        var dictFinal = sh.clone(dict);
        sh.each(dictFinal, function onHandleAliases(k,v) {
            if ( v.cmd == null ) {
                console.info('skip line', v)
                return;
            }
            if ( v.name.startsWith('#') ) {
                var x =  dict[v.name]
                dict[v.name] = null;
                var x2 =  dict[v.name]
                delete dict[v.name];
                var x3 =  dict[v.name]
                self.proc('remove', v.name)
                return;
            }
            if ( v.cmd.startsWith('|') ) {
                var parent = v.cmd.slice(1)
                var match = dict[parent]
                if ( match == null ) {
                    console.error('Err: could not find aliased - broken on', v.name, match)
                    delete dict[v.name];
                } else {
                    var aliasedCommand_Match = sh.clone(match);
                    aliasedCommand_Match.nameAliasedFrom = match.name;
                    aliasedCommand_Match.name = v.name;
                    dict[v.name] = aliasedCommand_Match;
                }
            } else {
                //   dict[v.name] = v;
            }


            actionsLengths++
        });


        self.data.dictActions = dict;
        self.data.actionsLengths = actionsLengths;

    }

    self.newRoutes = function newroutes() {




        self.server.get('/getFile', function (req, res) {
            var fileName = req.query.file;
            console.log(req.query.file, 'file....');

            function LoadFile () {
                var self = this;
                var p = this;
                p.init = function init() {

                };

                p.loadTestFile = function loadTestFile(file) {
                    var contents = sh.readFile('testFiles/'+file)
                    var addTo = []
                    var config = {}
                    config.ignore = ['data: WARNING: Skip: ',
                        'WARNING: Skipping FS',
                        'data: ERROR: Can',
                        'child process '
                    ]
                    config.ignoreComments = true;
                    config.fxProc = function parseCmd(item){
                        var fields = item.split(',')
                        var fixed = [];
                        sh.each(fields, function x(i,f){
                            f=f.trim()
                            fixed.push(f);
                        });
                        fields = fixed;

                        function CmdConvertor() {
                            var self = this;
                            var p = this;
                            p.init = function init(d) {
                                self.output = {};
                                self.output.orig  =d;
                                var firstField = d[0];
                                var second = d[1];

                                var helper = {};

                                helper.typeIs = function isType(type) {
                                    type = type.toLowerCase();
                                    if ( type == firstField.toLowerCase())
                                        return true;
                                    return false;
                                };

                                helper.makeQuery = function makeQuery(asdf) {
                                    if ( asdf.indexOf(' ')==-1) {
                                        return '#'+asdf;
                                    }
                                    return asdf;
                                };

                                self.orig = d;

                                if ( helper.typeIs('click')) {
                                    var template = "$('#query').click();"
                                    var query = second;
                                    query = helper.makeQuery(query)
                                    template = template.replace('#query', query);
                                    self.output.eval = template;
                                }

                                return  self.output;
                            };
                        }


                        var y  = new CmdConvertor();

                        return y.init(fields)
                        return fixed;
                    }
                    var lines = sh.each.lines(contents, config)
                    self.lines = lines;
                    return lines;
                };
            }


            var l = new LoadFile();
            self.lines = l.loadTestFile(fileName);
            console.log('loaded', l.lines.length)
            //console.log(sh.toJSONString(l.lines));
            setTimeout(function () {
                self.sendNext();
            }, 400);
            //process.exit();
            res.json({status:'ok'});
        });


        self.server.get('/next', function (req, res) {
                var fileName = req.query.file;
                console.log( 'next', 'file....');
                setTimeout(function () {
                    self.sendNext();
                }, 400)
                res.end('ok');
            }
        )

        self.server.get('/reloadActions', function onReloadActions(req, res) {
                self.getCSVFiles();

                res.json(self.data.dictActions)
                //res.end('reloaded ' + self.data.actionsLengths);
            }
        )

        // process.exit();
        self.server.get('/doAction', function onAction(req, res) {
            var fileName = req.query.file;
            var action = self.data.dictActions[req.query.actionName]
            console.log('what is', req.query)
            console.log(req.query.actionName, 'file....', action);

            var cmdOverride = req.query.cmdOverride;

            if (action ) {
                var cmd = action.cmd;
            }

            var actionSent = req.query.action;

            var cmd2 = '';
            if ( cmdOverride ) {
                cmd = cmdOverride;
                console.log('overrideCmd', cmdOverride);
                cmd2 = 'start ' + ' "" ' + cmdOverride
            }

            /*if ( cmd && cmd.includes(':')) {
             cmd = sh.qq(cmd)
             }*/

            cmd2 =  cmd
            function hideExplorerPrompts() {
                if (cmd && cmd.startsWith('start ') == false) {
                    if (cmd.includes('"') == false && cmd.includes("'") == false) {
                        //cmd = sh.qq(cmd)
                    }
                    cmd2 = 'start ' + ' "" ' + ' /min ' + cmd //sh.qq(cmd)
                    if (actionSent && actionSent.noStart) {
                        cmd2 = cmd //sh.qq(cmd)
                    }
                    if (actionSent && actionSent.name && actionSent.name.includes('openDir')) {
                        cmd2 = 'start ' + ' "openDir" ' + cmd //sh.qq(cmd)
                    }
                    if (action && action.cmd.split('\\').length > 4 && action.cmd.includes('"') == false) {
                        console.log('assume dir')
                        cmd2 = 'start ' + ' "openDir" ' + cmd //sh.qq(cmd)
                    }
                }
            }
            hideExplorerPrompts();

            console.log('cmd2', cmd2)


            if ( cmd.startsWith('http') || cmd.startsWith('"http')) {
                cmd = sh.replace(cmd, ' ', '+')
                cmd2= ['start', '""', 'chrome',
                    '--new-window', sh.qq(cmd)]
                cmd2 = cmd2.join(' ')

            }

            console.log("\t", '>>>cmd', cmd2)
            sh.run(cmd2)

            res.send('ok');
        });


    }

    p.open = function method(dirToOpen) {
        //C:\Users\Leniel>start %windir%\explorer.exe "C:\Users\Leniel\Desktop"
        var cmd = 'start %windir%\\explorer.exe '+
            sh.qq(dirToOpen)
        var cmd = 'explorer '+
            sh.qq(dirToOpen)
        try {
            sh.run(cmd)
        } catch ( e ) {
            console.error('what?')
        }
        //return
        var fileBat = 'test.bat';
        sh.writeFile(fileBat, cmd);
        var cmd2 = 'start test.bat'
        sh.run(cmd2)


    }

    self.sendNext = function sendNextCommand() {
        if ( self.lines.length == 0 ) {
            console.log('all work is done');
            return;
        }
        var cmd = self.lines.shift();
        if ( self.pSocket == null ) {
            self.proc('pSocket is null')
            return;
        }
        self.proc('sent')
        self.appSocket.emit('runcmd', cmd);
        self.appSocket.emit('chat message', "llllllllllllllllllllllll");
    }

    self.setupSession = function setupSession() {
        var t = EasyRemoteTester.create('Test evenote basics',{});
        var data = {};

        t.settings.baseUrl = baseUrl;


        t.xadd(function reload() {
                t.quickRequest( urls.reload,
                    'get', onResult )
                function onResult(body) {
                    // console.log('body', body)
                    t.assert(body.id>0, 'post-verify did not let me do a search');
                    t.cb();
                }
            }
        );

        t.add(function getFiles() {
                t.quickRequest( urls.getFile,
                    'get', onResult, {file:'a.txt'} )
                function onResult(body) {
                    // console.log('body', body)
                    t.assert(body.status=='ok', 'did not parse file');
                    t.cb();
                }
            }
        );
    }

    app.use(function onAllowOrigins(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Origin", req.headers['origin']);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    p.test = function test() {}


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments)
    }


}

exports.SlickRunServer = SlickRunServer;

if (module.parent == null) {
    var e = new SlickRunServer()
    e.start();

    e.test();

    var req = {};
    req.body = {};
    req.body.text = 'sentence.'
    req.body.playAudio = 'true'
    var res = {};
    res.json =function () {}
    // e.say(req, res)

    setTimeout(function(){
       // e.say(req, res)
    }, 1000)

    /*  setTimeout(function(){
     e.say(req, res)
     }, 3000)*/

}
