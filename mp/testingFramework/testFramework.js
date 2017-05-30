                cmd2 = 'start ' + ' "" ' + cmdOverride
            }

            /*if ( cmd && cmd.includes(':')) {
             cmd = sh.qq(cmd)
             }*/

            cmd2 =  cmd
            if ( cmd && cmd.startsWith('start ') == false ) {
                if  ( cmd.includes('"') == false && cmd.includes("'") == false ) {
                    //cmd = sh.qq(cmd)
                }
                cmd2 = 'start ' + ' "" ' + ' /min '+ cmd //sh.qq(cmd)
                if ( actionSent && actionSent.noStart ) {
                    cmd2 = cmd //sh.qq(cmd)
                }
            }

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

