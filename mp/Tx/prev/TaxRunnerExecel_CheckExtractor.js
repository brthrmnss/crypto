/**
 * Created by user1 on 3/25/2017.
 */



var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function BasicClass3() {
    var p = BasicClass3.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.method();
    }

    p.method = function method() {

        var config = {}
        config.file = self.settings.file;
        config.ignore = [ ]
        config.ignoreEnd = [
        ]
        config.fxProc = function processLines(line) {


            sh.textAfter = function getTextAfter(txt, val) {
                var t = txt.split(val)[1]
                return t;
            }

            sh.textBefore = function textBefore(txt, val) {
                var t = txt.split(val)[0]
                return t;
            }

            var lineX = sh.textAfter(line, 'Check ');
            if ( lineX == null ) { return }
            var linxY = sh.textBefore(lineX, ' Withdrawal')
            if ( linxY == null ) { return }


            var val = parseInt(lineX)

            return val;
            //['/downloads/cookies/']
        }
        var lines  = sh.each.lines(config)

        console.log(lines)

        sh.l = function logToConsole() {
            var msg = sh.args(arguments)
            msg = msg.join(' ')
            console.log(msg)
        }


        sh.fillIn = function fillInTemplate(v, sc, t) {
            if ( v.includes(sc) == false ) {
                sh.throw('template ', v, 'does not contain', sc)
            }
            var output = v.replace(sc, t)
            return output;
        }


        sh.each(lines, function showLinkToImage(k,v) {
           console.log('dict['+v+']' ,'=', sh.qq('US Tax') )

        })

        var dirImages = sh.fs.join(__dirname,'2014')
        sh.mkdirp( dirImages)
        sh.each(lines, function showLinkToImage(k,v) {
            var temp = 'G:/Dropbox/Financial/checks/'+'###' + '.png';
            var fileImage = sh.fillIn(temp, '###', v)
            fileImage = fileImage.replace(/\//gi , '\\');
            sh.fs.copy(fileImage, dirImages)
            //  console.log(fileImage)
            sh.l((k+1)+'.',fileImage)

        })

        return;

        console.log('c:\\test.txt')

        console.log('file:///g:/Dropbox/projects/crypto/mp/Tx/prev/TaxRunnerExecel_CheckExtractor.js:84:17')
        console.log('g:\\Dropbox\\projects\\crypto\\mp\\Tx\\prev\\TaxRunnerExecel_CheckExtractor.js:84:17')

        console.log('(g:\\Dropbox\\projects\\crypto\\mp\\Tx\\prev\\TaxRunnerExecel_CheckExtractor.js:84:17)')

        console.error('    at BasicClass3.method (g:\\Dropbox\\projects\\crypto\\mp\\Tx\\prev\\TaxRunnerExecel_CheckExtractor.js:85:17)')
        console.log('http://stackoverflow.com/questions/36295789/put-link-in-console-log-node-js')
        console.log('file://stackoverflow.com/questions/36295789/put-link-in-console-log-node-js')



        sh.throw('erro')
    }

    p.test = function test(config) {
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir+'/'+ file;
            return file;
        }

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.BasicClass3 = BasicClass3;

if (module.parent == null) {
    var instance = new BasicClass3();
    var config = {};
    config.file = 'G:/Dropbox/projects/crypto/mp/Tx/prev/output/mint 2014.csv.Checksz.txt'
    instance.init(config)
    instance.test();
}








