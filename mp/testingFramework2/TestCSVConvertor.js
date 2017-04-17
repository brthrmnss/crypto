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



    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.method();
    }

    p.method = function method(config) {
    }
    p.processTestCSV = function processTestCSV(contents) {

        var h = {};
        var config = {}
        config.ignore = ['data: WARNING: Skip: ',
            'WARNING: Skipping FS',
            'data: ERROR: Can',
            'child process '
        ]
        config.ignoreComments = true;
        config.fxProc = function parseCmd(item, i, len){



            i  += 1

            var rawLine = item;
            var line = item.trim();


            if ( h.inMultiLineComment ) {

                if ( line.includes('*/') ) {
                    var ousideOfComment = line.split('*/')[1]
                    h.inMultiLineComment = false;
                    line = ousideOfComment; //overkill
                } else {
                    //still indie multi line comment mode
                    return;
                }
            }

            if ( h.endTest == true ) {
                return;
            }

            if ( line == 'endtest') {
                h.endTest = true;
                console.log('end test early', 'line', i)
                return;
            }
            if ( line.startsWith('#')) {
                return;
            }
            if ( line.startsWith('--')) {
                return;
            }
            if ( line == '' ) {
                return;
            }

            var showItemInput = false;
            if ( showItemInput )
                console.error(i, item)
            item = item.trim();
            var words = item.split(' ');
            words = words.filter(function removeEmpty(e) { return e.trim().length > 0 })




            var firstWord = words[0];
            firstWord = firstWord.trim();
            var lineContent = words.slice(1).join(' ').trim();

            function recreateWords() {

            }

            sh.t = '\t'
            //console.error(sh.t, i, firstWord=='endeval')
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


            //mulite line comments
            //comments
            if ( line.includes('/*')) {
                h.inMultiLineComment = true;
                var afterComment = line.split('/*')[1];
                var ousideOfComment = afterComment.split('*/')[1]
                if ( afterComment.includes('*/')) {
                    h.inMultiLineComment = false;
                    line = ousideOfComment; //overkill
                } else {
                    //in comment mode
                    return;
                }
            }
            /*  if ( h.inMultiLineComment ) {

             if ( line.includes('*!/') ) {
             var ousideOfComment = line.split('*!/')[1]
             h.inMultiLineComment = false;
             line = ousideOfComment; //overkill
             } else {
             //still indie multi line comment mode
             return;
             }
             }
             */

            //convert fx.method(args) to fx method (args)
            if ( rawLine.startsWith('fx.') &&
                line.includes('(') &&
                line.includes(')') ) {

                line = 'fx '+line.slice(3); //convert
                console.log('line', line)
                //asdf.g
                firstWord = 'fx';
                recreateWords();
            }
/*
            //silly ...  we will not sepreate ''

            if ( rawLine.startsWith('tH.fx') &&
                line.includes('(') &&
                line.includes(')') ) {

                line = 'fx '+line.slice(5); //convert
                console.log('line', line)
                //asdf.g
                firstWord = 'fx';
                recreateWords();
            }
*/


            var itemCopyAtEnd = {};

            var words = line.split(' ');
            words = words.filter(function removeEmpty(e) { return e.trim().length > 0 })
            var args = words.slice(1)
            var userDenotedArgs = false;

            if ( line.includes('; ')) {
                var wordsC = args.join(' ')
                if ( wordsC ) {
                    console.log('wordsC', wordsC, wordsC.split('; '))
                }
                words = wordsC.split('; ')
                args = words;
                userDenotedArgs = true;
            }

            if ( line.includes(' |')) {
                var wordsC = args.join(' ')
                if ( wordsC ) {
                    console.log('wordsC', wordsC, wordsC.split(' |'))
                }
                words = wordsC.split(' |')
                args = words;
                userDenotedArgs = true;
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
                'pressEnter',
                'moreThanX',
                'clickOne','setItem','makeGreen',
                'scrollTo','verifyExists',
                'fxasync',
                'fx', 'bookmark'
            ];
            if ( validCmds.includes(firstWord)) {
                valid  = true;
                item.fx = firstWord
                itemCopyAtEnd.args = [args.join(' ')]
                if ( userDenotedArgs ) { //do not combine args
                    //debugger
                    itemCopyAtEnd.args = args;
                }


            }


            if ( firstWord == 'fx') {

                //hanlde case where user has function fx fx1 a; b; c
                //should fx fx1; a; b; c, be gracefulw ith user
                var argsTest = itemCopyAtEnd.args
                var firstArg = argsTest[0].trim()
                if ( firstArg.includes(' ')) {
                    //debugger
                    var firstArgSplit =  firstArg.split(' ')
                    argsTest.shift(); //remove first split item
                    //firstArgSplit.shift(); //remove fx name
                    var argsFixed = firstArgSplit.concat(argsTest)
                    itemCopyAtEnd.args = argsFixed;

                };
                if ( firstArg.includes('(') && firstArg.includes(')')) {

                    if ( firstArg.endsWith(';') ) {
                        firstArg = firstArg.slice(0,-1)
                    }
                    if ( firstArg.endsWith(')')) {
                        //asdf.g
                        var cfg = {}
                        var fxName = firstArg.split('(')[0]
                        cfg.defName = fxName;
                        cfg.eval = firstArg;



                        try {
                            var evalToGet_getArgsStr =
                                ['function ' + fxName + '() {',
                                    'var args = uiUtils.args(arguments);',
                                    // ' debugger;',
                                    'return args',
                                    '}',
                                    cfg.eval,
                                ].join('\n')
                        }
                        catch (e ) {
                            console.error('arsing error on fx input')
                            console.error(e)
                            //can't process fx eval
                        }
                        cfg.args = eval(evalToGet_getArgsStr)

                        //debugger
                        itemCopyAtEnd.args = cfg;

                    }else {
                        //strange input
                    }

                }

            }

            if ( firstWord == 'if' ) {
                valid = true;
                item.fx = 'if'
                //  console.clear();
                console.debug('line', lineContent)
                itemCopyAtEnd.args = args;

                if ( lineContent.startsWith('{') &&
                    lineContent.endsWith('}') ) {
                    //var cfg = eval(lineContent)
                    eval('var cfg =' +lineContent)
                    console.log('cfg', cfg)
                    // debugger
                    itemCopyAtEnd.args = [cfg];
                }

            }

            /*
             if ( firstWord == 'click') {
             valid  = true;
             item.fx = 'click'
             itemCopyAtEnd.args = [args.join(' ')]
             }*/
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
            if ( firstWord == 'status') {
                valid  = true;
                item.fx = 'msgStatus'
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

            var isFunctionDef = false;
            if ( rawLine.startsWith('function')) {
                h.evalAltFxMode = true;
                isFunctionDef = true;
                var lastWord = words.slice(-1)
                if ( lastWord == '{') {
                    words.pop();
                }
                console.log('wordsfx', words);
            }

            if ( firstWord == 'eval' || firstWord == 'def' || isFunctionDef ) {
                //debugger
                if ( h.evalMode == true ) {
                    console.error('line', rawLine)
                    throw new Error('double eval mode')
                }
                valid  = true;
                item.fx = 'evalFx'
                h.evalMode = true;
                h.hold = item;
                var firstLine = true
                item.lines = [];
                // console.log('words', words.slice(-1))
                itemCopyAtEnd.args=[words.slice(-1)]
                var cfg = {};
                //hanlde case where user has function fx fx1 a; b; c
                //should fx fx1; a; b; c, be gracefulw ith user
                var argsTest = [words.slice(-1)]
                cfg.defName = words.slice(-1) //last word

                var lineCombined = words.join(' ')
                //lineCombined.split('#')[0]

                console.log('parse def', cfg.defName, argsTest, words)


                if ( argsTest.includes(' ')) {
                    asdf.g
                }
                var runDefOnInit = false;
                if ( firstWord != 'def' ) { //run if not def
                    itemCopyAtEnd.args.push(true)
                    runDefOnInit
                }

                // var argsTest = itemCopyAtEnd.args
                var firstArg = words[1]

                //support spaces
                //["def", "deleteTab(tabName_,", "userTabType)"]
                var isFxDef = words[0] == 'def';

                if ( words[0] == 'function') {
                    isFxDef = true;
                }

                if ( isFxDef && words.length > 2) {
                    console.warn('space in args');
                    var lastWord = words.slice(-1)[0]
                    if ( lastWord.endsWith(')') ) {
                        // debugger
                        firstArg = words.slice(1).join('')
                    }

                }

                if ( firstArg.includes('(') && firstArg.endsWith(')')) {

                    //ensure indexes in porpe rpalce ...) (
                    if ( firstArg.endsWith(')')) {
                        //asdf.g
                        var cfg = {}
                        cfg.runDefOnInit = runDefOnInit;
                        var fxName = firstArg.split('(')[0]
                        cfg.defName = fxName;
                        cfg.fxSignature = firstArg;
                        itemCopyAtEnd.args = cfg;
                        // debugger
                    }else {
                        //strange input
                    }

                }
                //return;
            }

            if ( firstWord == 'endeval' || firstWord == 'end' ) {
                if ( h.evalMode == false ) {
                    throw new Error('was not in eval mode')
                }
                valid  = false;
                //item.fx = 'set'
                item = h.hold;
                h.evalMode = false;
            }

            if ( rawLine.startsWith('}') && h.evalAltFxMode === true ) {
                if ( h.evalMode == false ) {
                    throw new Error('was not in eval mode')
                }
                //asdf.g
                h.evalAltFxMode = false;
                valid  = false;
                //item.fx = 'set'


                //line += '/*boo*/' + '}'
                // var lineX =  '}; '+' debugger; ' + '/*boo*/' + ''
                // h.hold.lines.push(lineX)
                item = h.hold;
                h.evalMode = false;

            }


            if ( h.evalMode && firstLine != true) {
                h.hold.lines.push(line)
                //h.hold.lines.push('5')
                return;
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

    p.loadScript2 = function loadScript2(file, fxItems, fxFail) {
        uiUtils.getUrl(file, function onGotContnet(content) {

            //console.log('content', content)
            //return;
            var items =  p.processTestCSV(content)
            sh.callIfDefined(fxItems, items)
        }, null, function onFail() {
            console.error('failed to load')
            if ( fxFail ) fxFail('failed')
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
    function testConvertoer() {
        //return
        var instance = new TestCSVConvertor();
        var config = {};
        instance.init(config)

        var currentScript = document.currentScript //just in case user does not set pre-amble
        if ( currentScript ) {
            urlPremable = currentScript.src.split('/').slice(0,-1).join('/')+'/';
            console.info('guessed pre-amble to be', window.preamble)
        }

        instance.loadScript2(urlPremable+'csvScripts/test.txt')
        instance.test();
    }
    testConvertoer();
}


