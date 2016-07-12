/**
 * Created by user on 8/2/15.
 */

/**
 * /say to speak test
 * Install http://sourceforge.net/projects/jampal/files/
 * http://jampal.sourceforge.net/ptts.html
 */

var sh = {};
sh.writeFile = function writeFile(fileName, content, surpressErrors, binary) {
    var fs = require("fs")
    var encoding = 'utf8';
    if ( binary == true ) {
        encoding = 'binary'
    }
    if (surpressErrors == true) {
        try {
            fs.writeFileSync(fileName, content, encoding);
        } catch (e) {
            console.error(e)
        }
    } else {
        fs.writeFileSync(fileName, content, encoding);
    }
}
sh.dv = function defaultValue(input, ifNullUse) {
    if (input == null) {
        return ifNullUse;
    }
    return input;
}
sh.qq = function qq(text) {
    return "\"" + text + "\"";
};
sh.isWin = function isWin() {
    return process.platform === 'win32'
};

var express = require('express');
var r
var port = 4444

function SayServerLite() {
    var p = SayServerLite.prototype;
    p = this;
    var self = this;
    /**
     * Setup middleware and routes
     * @param urlf
     * @param appCode
     */
    p.start = function start( ) {
        self.setupExpressApp();
        app.get('/say', self.say);
        self.startTests();
    }

    p.setupExpressApp =   function setupApp() {
        var express = require("express");
        var app = express();

        var bodyParser = require('body-parser');
        app.use(bodyParser());

        //Add middleware for cross domains
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.listen(port)
        return app;
    }

    function defineRoutes() {
        self.say = function sayRoute(req, res ) {
            var query = req.query;
            var text = req.query.text;
            var rate = req.query.rate;
            var voice = req.query.voice;
            var json = {}
            json.status = 'ok'

            self.speak(function result(body) {
                res.json(json);
            }, text , rate, voice);
        }

        p.speak = function (fx, text, rate, voice) {
            var child_process = require('child_process');
            var gb = "say "
            voice = sh.dv(voice, 'Ryan')
            gb += ' '+'-v ' + voice +' ';
            gb += ' '+sh.qq(text) +' ';
            if ( rate != null ) {
                gb += ' ' + '-r ' + rate + ' ';
            }

            if ( sh.isWin() ) { //windows
                var path = require('path');
                var filePath = path.resolve(__dirname+'/'+'txt.txt')
                filePath = filePath.replace(/\\/gi, "/")
                sh.writeFile(filePath, 'what is this?')
                gb = 'cscript "C:\\Program Files\\Jampal\\ptts.vbs" -r +10 -u '+ filePath;
            }
            console.log(gb)
            var cp = child_process.exec(gb, function (err, stdout, stderr) {
                fx(true);
                console.log('done speaking', text, stdout );
            });
            return;
        }
    }
    defineRoutes();

    self.startTests = function startTests() {
        setTimeout(function x() {
            self.test();
        }, 50);
    }

    p.test = function test() {
        var baseUrl = 'http://127.0.0.1:4444'

        var request = require('request');
        var opts = {};
        opts.url = baseUrl+ '/say'
        opts.text = 'This is a test string'
        request(opts, function (error, response, body) {
            console.log('...', body)
        })
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }

}

exports.SayServerLite = SayServerLite;

if (module.parent == null) {
    var e = new SayServerLite()
    e.start();
};



