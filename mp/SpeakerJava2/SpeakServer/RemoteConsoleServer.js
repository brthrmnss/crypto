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
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser());

//var open = require('open')



var http = require('http').Server(app);
var io = require('socket.io')(http);



/**
 * Created by user on 7/30/15.
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;


function BrowserEvalServer() {
    var p = BrowserEvalServer.prototype;
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
        //app.use(express.static(__dirname ) );// + '/public_html'))
        self.appSocket = io
        io.sockets.on('connection', function (socket) {
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

                //var self = {}

                var dir_nodejs = '/home/user/.nvm/versions/node/v0.12.5/bin/'
                var altVersion = '/home/user/.nvm/versions/node/v6.2.1/bin/'
                var altVersion = '/home/user/.nvm/versions/node/v6.4.0/bin/'

                if ( sh.fileExists(altVersion)){
                    dir_nodejs = altVersion;
                }
                var dir_shipit = dir_nodejs+'shipit';

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



                    if (data.cmd == 'evernotesearch') {

                        //cmd /k "cd c:\myfolder & startbatch.bat"
                        data.cmd = 'cmd'
                        data.args = [
                            //"/k",
                            'C:/"program files (x86)"/Evernote/Evernote/ENScript.exe ',
                            "showNotes",
                            '/q',
                            data.data]

                        var args = data.args.join(' ')
                        /* if ( data.data.indexOf(' ') != -1 ) {
                         data.data = data.data.split( ' ')
                         }*/
                        if ( sh.isArray(data.data)) {
                            data.args.pop()
                            data.args = data.args.concat(data.data)
                        }



                        var filename = __dirname + '/' + 'tmp.bat';
                        var contents = '';
                        contents = [
                            "echo '"+args+"'",
                            args
                        ]
                        /*,
                         ,
                         'cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/']
                         */
                        contents.push(dir_nodejs+ data.cmd);
                        sh.writeFile(filename, contents.join(sh.n));
                        data.args = [filename]
                        data.cmd = filename

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
                else {

                    if ( data.type  == 'shipit' ) {

                        data.cwd = self.dirPrjRoot+'/ritv';
                        var filename = __dirname + '/' + 'tmp.sh'
                        var contents = '';
                        contents = ['##!/bin/bash',
                            "echo '"+data.cmd+"'",
                            'PATH=$PATH:'+dir_nodejs,
                            //'node="'+dir_nodejs+'node'+'"',
                            //  '. ~/.nvm/nvm.sh',
                            //   'env node',
                            'echo $PATH',
                            ,
                            'cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/']
                        contents.push(dir_nodejs+ data.cmd);
                        sh.writeFile(filename, contents.join(sh.n))
                        sh.fs.makeExec = function makeExecutable(filename) {
                            sh.run('chmod +x ' + filename);
                        }
                        sh.fs.makeExec(filename)

                        data.cmd = filename;
                        data.args = [];
                    }

                    if ( data.type  == 'shipit_breed' ) {

                        data.cwd = self.dirPrjRoot+'/breedv2';
                        data.cmd = dir_shipit;
                        //data.args = [];



                        data.cwd = self.dirPrjRoot+'/breedv2';
                        var filename = __dirname + '/' + 'tmp.sh'
                        var contents = '';
                        contents = ['#!/bin/bash',
                            "echo '"+data.cmd+"'",
                            'cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/breedv2/',


                        ]
                        data.cmd = 'shipit'
                        contents.push(dir_nodejs + data.cmd + ' '  + data.args.join(' '));
                        sh.writeFile(filename, contents.join(sh.n))
                        sh.fs.makeExec = function makeExecutable(filename) {
                            sh.run('chmod +x ' + filename);
                        }
                        sh.fs.makeExec(filename)

                        data.cmd = filename;
                        data.args = [];
                    }

                    if ( data.type  == 'ritv' ) {
                        data.cwd = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/' //mega2list_wrapper.js
                        if ( data.overrideJSON ) {
                            //create override file
                            data.args.push("overrideJSON")
                            data.args.push( data.overrideJSON )
                        };
                    }

                    //why: open a terminal and run a command
                    if ( data.type  == 'terminal3' ) {
                        //create file based on newtab.sh
                        var cmd = data.cmd +   '; echo this sh works ; /bin/bash;'
                        if ( data.cmd == '') {
                            var cmd = data.cmd +   'echo this sh works ; /bin/bash;'
                        }
                        cmd = sh.replace(cmd, 'shipit', dir_shipit)
                        var cwd = self.dirPrjRoot+'/breedv2';
                        if ( data.dir == 'RITV') {
                            cwd = self.dirPrjRoot+'/ritv'
                        }
                        var contents =
                            [
                                '#!/bin/bash',
                                'lxterminal  -l  --working-directory="'+cwd+'" ' +
                                " -t 'go' -e '"+cmd+"'"

                            ]

                        var filename = __dirname + '/' + 'tmp.sh'
                        sh.writeFile(filename, contents.join(sh.n))
                        sh.fs.makeExec = function makeExecutable(filename) {
                            sh.run('chmod +x ' + filename);
                        }
                        sh.fs.makeExec(filename)
                        data.cmd = filename;
                        data.args = [];
                    }

                    sh.writeShFile = function writeShFile (filenameTmpSh, contents ) {
                        if ( sh.isArray(contents)){
                            contents = contents.join(sh.n);
                        }
                        sh.writeFile(filenameTmpSh, contents);
                        sh.fs.makeExec = function makeExecutable(filenameTmpSh) {
                            sh.run('chmod +x ' + filenameTmpSh);
                        }
                        sh.fs.makeExec(filenameTmpSh)
                    }

                    var filenameTmpSh = __dirname + '/' + 'tmp.sh'

                    if ( data.type  == 'open.bash' ) {
                        //run a bash command from cmd line
                        if ( data.dir == null )
                            data.dir = self.dirPrjRoot+'/ritv';
                        data.cmd = sh.replace(data.cmd, 'shipit', dir_shipit );
                        //'/home/user/.nvm/versions/node/v0.12.5/bin/shipit')

                        if ( data.dir == 'RITV') {
                            data.dir = self.dirPrjRoot+'/ritv'
                        }
                        if ( data.dir == 'SEED') {
                            data.dir = self.dirPrjRoot+'/breedv2'
                        }

                        var contents = [];
                        contents = ['#!/bin/bash',
                            "echo '"+data.cmd+"'",
                            'PATH=$PATH:'+dir_nodejs,
                            'cd ' + data.dir,
                            data.cmd
                        ]
                        sh.writeShFile(filenameTmpSh, contents.join(sh.n))
                        data.cmd = filenameTmpSh;
                        data.args = [];
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
        sh.convertCSV = function convertCSV(contents) {
            var $ = sh;
            sh.toCamelCase = function toCamelCase(str) {
                return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
                    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                    return index == 0 ? match.toLowerCase() : match.toUpperCase();
                });
            }

            function removeFromBegAndEndOfStr(text, removeStr) {
                if (  text == null || text.startsWith == null ) {
                    debugger;
                }
                if ( text.startsWith(removeStr) &&
                    text.endsWith(removeStr)) {

                    text = text.replace(removeStr, '')
                    text = text.slice(0,text.length-removeStr.length)
                }
//    if ( sh.endsWith(text, removeStr)) {
//        text = text.slice(0,text.length-removeStr.length)
//    }
                return text;
            }

            function unquote(text) {
                return removeFromBegAndEndOfStr(text, '"')
            }

            sh.unquote = unquote

            sh.CSVtoArray = // Return array of string values, or NULL if CSV string not well formed.
                function CSVtoArray(text) {
                    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
                    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
                    // Return NULL if input string is not well formed CSV string.
                    if (!re_valid.test(text)) return null;
                    var a = [];                     // Initialize array to receive values.
                    text.replace(re_value, // "Walk" the string using replace with callback.
                        function(m0, m1, m2, m3) {
                            // Remove backslash from \' in single quoted values.
                            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
                            // Remove backslash from \" in double quoted values.
                            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
                            else if (m3 !== undefined) a.push(m3);
                            return ''; // Return empty string.
                        });
                    // Handle special case of empty last value.
                    if (/,\s*$/.test(text)) a.push('');
                    return a;
                };

            var lines = contents.split('\n')
            var it = {};
            it.objs = [];
            $.each(lines, function procLine(k,line) {
                var fields = line.split(',')
                var fields2 = sh.CSVtoArray(line)
                if ( fields2 == null && fields.length > 0 ) {
                    fields2 = fields; //possibly invalid
                    console.warn('possibliy invalid line', fields2)
                }
                if ( fields.length != fields2.length ) {
                    //    debugger;
                }
                fields=fields2
                if ( line.trim() == '' )
                    return;
                if  ( k == 0 ) {
                    it.columnNames = fields;
                    return;
                }
                var unquoted = []
                $.each(it.columnNames, function addCol(cI, colName) {
                    var fixed = colName
                    unquoted.push(sh.toCamelCase(sh.unquote(colName)))
                })
                it.columnNames = unquoted;
                //console.error(k, line, fields)
                var obj = {};

                $.each(it.columnNames, function addCol(cI, col) {
                    var val  = fields[cI];
                    if ( val == null ) {
                        return;
                    }
                    val = sh.unquote(val);
                    obj[col] = val;
                })
                it.objs.push(obj);
            })
            console.log('how many?', it.objs.length)
            //  sh.each.print(it.objs)
            // process.exit();
            return it.objs;
        }

        /*var y = sh.readJSONFile(__dirname+ '/' + 'public_html/'
         + 'actions.json');*/
        var dirCSV = sh.readFile(__dirname+ '/' + 'public_html/sr/'
            + 'actions.csv');
        var yyy = sh.convertCSV(dirCSV)
        console.log(yyy);
        var dict = {};
        sh.each(yyy, function kc(k,v) {
            dict[v.name] = v;
        });

        var dirCSV2 = sh.readFile(__dirname+ '/' + 'public_html/sr/'
            + 'actions2.csv');
        var yyy = sh.convertCSV(dirCSV2)
        sh.each(yyy, function kc(k,v) {
            dict[v.name] = v;
        });

        var actionsLengths = 0;
        sh.each(dict, function onHandleAliases(k,v) {
            if ( v.cmd == null ) {
                console.info('skip line', v)
                return;
            }
            if ( v.cmd.startsWith('|') ) {
                var parent = v.cmd.slice(1)
                var match = dict[parent]
                if ( match == null ) {
                    console.error('broken on', v.name, match)
                    delete dict[v.name];
                } else {
                    dict[v.name] = match;
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
                res.end('reloaded ' + self.data.actionsLengths);
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

            var cmd2 = '';
            if ( cmdOverride ) {
                cmd = cmdOverride;
                console.log('overrideCmd', cmdOverride);
                cmd2 = 'start ' + ' "" ' + cmdOverride
            }

            if ( cmd && cmd.includes(':')) {
                cmd = sh.qq(cmd)
            }

            cmd2 = 'start ' + ' "" ' + cmd

            console.log('cmd2', cmd2)
            console.log("\t", 'cmd', cmd)

            if ( cmd.startsWith('http') || cmd.startsWith('"http')) {
                cmd2= ['start', '""', 'chrome',
                    '--new-window', cmd]
                cmd2 = cmd2.join(' ')
            }

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


    function defineRoutes(){
        self.say = function sayRoute(req, res){
            console.log('... say route ... ')
            var speakOpts = {};
            if ( req.body ) {
                speakOpts       = req.body;
            }
            if ( req.query && req.query.text ) {
                speakOpts       = req.query;
            }
            speakOpts.text = sh.dv(speakOpts.text, speakOpts.txt);
            speakOpts.text = sh.dv(speakOpts.text, ' ')

            speakOpts.playAudio = speakOpts.playAudio == 'true';
            speakOpts.speakOnce = speakOpts.speakOnce == 'true';

            speakOpts.text = speakOpts.text.replace(/"/g, "'");
            speakOpts.text = speakOpts.text.replace(/“/g, "'");

            if ( speakOpts.rate ) {
                if ( sh.isNumber(speakOpts.rate)) {
                    speakOpts.rate = speakOpts.rate * 100 / 5;
                    speakOpts.rate += '%'
                }
            }

            self.proc('speak', speakOpts.rate, speakOpts.text)

            speakOpts.fx = function () {
                if ( res.send )
                    res.send('');
            }
            self.speak(speakOpts) ;
            return;
        }

        self.testSay = function testSay(req, res){
            function test() {
                var req2 = {};
                req2.body = {};
                req2.body.text = 'sentence.'
                if ( req.query ) {
                    req2 = req;
                }
                req2.body.playAudio = 'true'
                var res = {};
                res.json =function () {}
                self.say(req2, res)
            }
            test();
            res.send(sh.getTimeStamp())
        }

        self.getSound = function getSound(req, res){
            res.sendfile('sample.wav');
        }


        p.speak = function speak(  speakOpts){
            if ( speakOpts.speakOnce   ){
                if (  self.speaking != 0 && self.speaking != null ) {
                    console.warn('ignoring speaking', self.speaking)
                    fx(true)
                    return;
                }
            }
            self.speaking = Math.random();
            console.log("speak.text: "+speakOpts.text);

            var MaryTTSSpeaker = require('./MaryTTSSpeaker').MaryTTSSpeaker;
            var m = new MaryTTSSpeaker();

            if ( self.data.oldMary ) {
                //ensure old requests are responded to express allows 6 concurrent connections
                self.data.oldMary.kill();
                sh.callIfDefined(self.data.fxEndAudio)
            }
            self.data.oldMary = m;
            var fxEnd = speakOpts.fx;
            /* setTimeout(function () {
             sh.callIfDefined(fxEnd)
             }, 2000)*/
            self.data.fxEndAudio = fxEnd;

            var cfg = speakOpts;
            cfg.fx = function done(file){
                //what is time?
                var url = '/getSound'
                url +='?'+ new Date()
                io.sockets.emit('play', { hello: 'world', file: file,
                    url: url});
                // self.appSocket.emit('play', { hello: 'world' });
            }
            m.speak(cfg)

            return;


            function runThing() {
                if ( self.lastCp ) {
                    self.lastCp.kill('SIGINT')
                }
                // EXECUTION
                var cp = child_process.exec(gb, function (err, stdout, stderr){
                    self.speaking = 0;
                    if ( isMac ) {
                        var cmd2convert = 'lame -m m '+file+'.aiff '+file+'.mp3';
                        var cmd2convert = 'ffmpeg -i '+file+'.aiff '+file+'.wav';
                        console.log('cmd2convert', cmd2convert)

                        if ( playAudio == true ) {
                            var cmd2play = 'afplay ' + file+'.aiff';
                            console.log('playAudio')
                            var cp = child_process.exec(cmd2play, function (err, stdout, stderr){
                                fx(true);
                                console.log('....')
                                // if ( playAudio != true ) {

                                // }

                            });
                            return;
                        }

                        var cp = child_process.exec(cmd2convert, function (err, stdout, stderr){
                            fx(true);
                            console.log('finished converting')
                        });
                        return
                    }

                    fx(true);
                    //console.log('done speaking', text, stdout);
                });
                self.lastCp = cp;

            }
            return;
        }

        p.listVoices = function listVoices(req, res){
            //console.log("speak.text: "+text);
            var child_process = require('child_process');
            var gb = "say -v '?'"
            var isMac = sh.isWin() == false
            //  rate = 7
            if(sh.isWin()){ //windows
                gb = 'cscript "C:\\Program Files\\Jampal\\ptts.vbs" -vl ';
            }
            console.log('log', gb)
            // EXECUTION
            var cp = child_process.exec(gb, function (err, stdout, stderr){
                if ( isMac ) {
                    var cmd2convert = 'lame -m m '+file+'.aiff '+file+'.mp3';
                    var cmd2convert = 'ffmpeg -i '+file+'.aiff '+file+'.wav';
                    console.log('cmd2convert', cmd2convert)
                    var cp = child_process.exec(cmd2convert, function (err, stdout, stderr){
                        fx(true);
                    });
                    return
                }

                res.send(stdout)
                //console.log('done speaking', text, stdout);
            });
            return;
        }
    }
    defineRoutes();


    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Origin", req.headers['origin']);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.post('/say', self.say);
    app.get('/testSay', self.testSay);
    app.get('/say', self.say);
    app.get('/list', self.listVoices);
    app.get('/getSound', self.getSound);


    p.test = function test() {}


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments)
    }


}

exports.BrowserEvalServer = BrowserEvalServer;

if (module.parent == null) {
    var e = new BrowserEvalServer()
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
        e.say(req, res)
    }, 1000)

    /*  setTimeout(function(){
     e.say(req, res)
     }, 3000)*/

}
