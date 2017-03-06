if ( window.isNode != false ) {
    var sh = require('shelpers').shelpers;
    var shelpers = require('shelpers');
}

function TestCSVConvertor() {
    var p = TestCSVConvertor.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    var h = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.method();
    }

    p.method = function method(config) {
    }
    p.processTestCSV = function processTestCSV(contents) {


        var config = {}
        config.ignore = ['data: WARNING: Skip: ',
            'WARNING: Skipping FS',
            'data: ERROR: Can',
            'child process '
        ]
        config.ignoreComments = true;
        config.fxProc = function parseCmd(item, i, len){


            var line = item.trim();
            if ( line.startsWith('#')) {
                return;
            }
            if ( line.startsWith('--')) {
                return;
            }
            if ( line == '' ) {
                return;
            }

            console.error(i, item)
            item = item.trim();
            var words = item.split(' ');

            var firstWord = words[0];
            firstWord = firstWord.trim();

            console.error(sh.t, i, firstWord=='endeval')
            var valid = false;

            var item = {};

            var comment = null;
            /*if ( line.includes('#') ) {
             var split = line.split('#')
             line = split[0]
             comment = split[1]
             }*/ //jquery ids
            if ( line.startsWith('#') ) {
                return;
            }
            if ( line.startsWith('~')  == false
                && line.includes('~') ) {
                var split = line.split('~')
                line = split[0]
                comment = split[1]
            }

            if ( line.includes('//') ) {
                var split = line.split('//')
                line = split[0]
                comment = split[1]
            }
            line = line.trim()

            var itemCopyAtEnd = {};

            var words = line.split(' ');
            var args = words.slice(1)
            if ( line.includes('; ')) {
                var wordsC = args.join(' ')
                if ( wordsC ) {
                    console.log('wordsC', wordsC, wordsC.split('; '))
                }
                words = wordsC.split('; ')
                args = words;

            }
            if ( line.includes(' |')) {
                var wordsC = args.join(' ')
                if ( wordsC ) {
                    console.log('wordsC', wordsC, wordsC.split(' |'))
                }
                words = wordsC.split(' |')
                args = words;

            }


            itemCopyAtEnd.args = args;
            if ( comment ) {
                itemCopyAtEnd.comment = comment;
            }

            item.index = len+1
            item.line = i
            item.fx = i
            item.args = i
            item.orig = i
            item.comment = i
            item.lines = [];

            var validCmds = [
                'click',
                'waitForShow',
                'waitForHide',
                'verifyHidden',
                'moreThanX',
                'clickOne','setItem','makeGreen',
                'scrollTo','verifyExists'
            ];
            if ( validCmds.includes(firstWord)) {
                valid  = true;
                item.fx = firstWord
            }


            if ( firstWord == 'click') {
                valid  = true;
                item.fx = 'click'
                itemCopyAtEnd.args = [args.join(' ')]
            }
            if ( firstWord == 'clickJ') {
                valid  = true;
                item.fx = 'clickJ'
            }
            if ( firstWord == 'clickText') {
                valid  = true;
                item.fx = 'clickText'
            }
            if ( firstWord == 'log') {
                valid  = true;
                item.fx = 'log'
            }
            if ( firstWord == 'alert') {
                valid  = true;
                item.fx = 'alert'
            }
            if ( firstWord == 'set') {
                valid  = true;
                item.fx = 'set'
            }

            if ( firstWord == 'wait') {
                valid  = true;
                item.fx = 'wait'
            }
            if ( firstWord.slice(0,1) == '~') {
                valid  = true;
                item.fx = 'log'
                item.args = [line.slice(1)]
            }

            if ( firstWord == 'eval') {
                if ( h.evalMode == true ) {
                    throw new Error('doublel eval mode')
                }
                valid  = true;
                item.fx = 'evalFx'
                h.evalMode = true;
                h.hold = item;
                var firstLine = true
                item.lines = [];
                //return;
            }

            if ( firstWord == 'endeval') {
                if ( h.evalMode == false ) {
                    throw new Error('was not in eval mode')
                }
                valid  = false;
                //item.fx = 'set'
                item = h.hold;
                h.evalMode = false;
            }

            if ( h.evalMode && firstLine != true) {
                h.hold.lines.push(line)
                //h.hold.lines.push('5')
                //return;
            }


            if ( valid == false ) {
                return null
            }

            sh.copyProps(itemCopyAtEnd, item)


            item.orig = line;

            return item;

        }
        var lines = sh.each.lines(contents, config);
        self.lines = lines;

        //debugger
        self.proc('lines', lines)
        //console.log(lines)

        sh.printCol(lines)

        //  debugger;
        return lines;

    }
    p.loadScript = function loadScript(file) {
        var content = sh.readFile(file)
        console.log('t', content)
        //get lines
        //get function
        //create objet
        var items =  p.processTestCSV(content)
        sh.callIfDefined(fxItems, items)
    }

    p.loadScript2 = function loadScript2(file, fxItems) {
        uiUtils.getUrl(file, function onGotContnet(content) {

            console.log('content', content)
            //return;
            var items =  p.processTestCSV(content)
            sh.callIfDefined(fxItems, items)
        })

        return;
        var content = sh.readFile(file)
        console.log('t', content)
        //get lines
        //get function
        //create objet

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

if ( window.isNode != false ) {
    exports.TestCSVConvertor = TestCSVConvertor;

    if (module.parent == null) {
        var instance = new TestCSVConvertor();
        var config = {};
        instance.init(config)
        instance.loadScript('scripts/test.txt')
        instance.test();
    }
} else {
    var instance = new TestCSVConvertor();
    var config = {};
    instance.init(config)
    instance.loadScript2('csvScripts/test.txt')
    instance.test();
}


