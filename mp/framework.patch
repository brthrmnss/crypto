Index: mp/testingFramework2/csvScripts/framework/success.fx.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/framework/success.fx.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/framework/success.fx.js.txt	(revision )
@@ -0,0 +1,358 @@
+#test that works well
+
+
+function waitForLoadPtLoad() {
+    console.log('x')
+    tH.waitForLoad = function waitForLoad(jquery, waitForFailureReason, parentJq, times ) {
+        console.log('...', 5)
+        var s = new Error().stack
+        var stepMsg = [waitForFailureReason,'(waitForShow) ',
+            jquery, parentJq, s].join(' ')
+
+        tH.waitForError = stepMsg;
+        tH.waitFor(function isDialogVisible_waitForShow(){ //waitForHide
+            var ptTable = $('pt-table')
+            console.log('...', 4, ptTable.css("opacity"), ptTable.is(":visible"))
+            tH.moveCursorTo(ptTable);
+            if ( ptTable.length == 0 ) {
+                console.warn('jqueryIs 0 length', jquery);
+                return false;
+            }
+            if ( ptTable.css("opacity") != "1") {
+                return false;
+            }
+            return true==ptTable.is(":visible");
+        });
+    };
+    tH.waitForLoad()
+}
+
+fx.waitForLoadPtLoad()
+endtest
+
+
+function fxWithQQ( boolean)  {
+    console.debug('booooooooo', true)
+}
+
+fx.fxWithQQ(true)
+function fxWithQQ2( boolean)
+    //tH.fx.fxWithQQ2()
+        tH.fx('fxWithQQ', true)
+    console.debug('booooooooo', true)
+}
+
+fx.fxWithQQ2(true)
+endtest
+
+function sayBoo( boolean) {
+    console.debug('booooooooo', true)
+}
+
+fx.sayBoo2(true)
+
+endtest
+
+/*
+todo, support this:
+function sayBoo( boolean) {
+    console.debug('booooooooo', true)
+        }
+*/
+
+/*
+def testTFConversion( boolean)
+    var result = true === boolean
+    console.log('testTFConversion', true===boolean)
+    if ( result != true ) {
+        debugger
+        throw new Error('not true')
+    }
+end
+*/
+
+
+
+function testTFConversion( boolean) {
+    var result = true === boolean
+    console.log('testTFConversion', true===boolean)
+      console.error('-->testTFConversion', true===boolean)
+      console.log(testTFConversion);
+
+    var calledInnerFx = false;
+     function testCallingInnerFunction() {
+      console.log('\t','inner function')
+      calledInnerFx = true;
+     }
+     testCallingInnerFunction();
+
+     if ( calledInnerFx == false) {
+        throw new Error('did not call');
+        console.log('???')
+     }
+
+    tH.fx.sayBoo('test')
+    if ( result != true ) {
+        debugger
+        throw new Error('not true')
+    }
+}
+
+
+
+function testTFConversion( boolean)
+    var result = true === boolean
+    console.log('testTFConversion', true===boolean)
+      console.error('-->testTFConversion', true===boolean)
+      console.log(testTFConversion);
+
+    var calledInnerFx = false;
+     function testCallingInnerFunction() {
+      console.log('\t','inner function')
+      calledInnerFx = true;
+     }
+     testCallingInnerFunction();
+
+     if ( calledInnerFx == false) {
+        throw new Error('did not call');
+        console.log('???')
+     }
+
+    if ( result != true ) {
+        debugger
+        throw new Error('not true')
+    }
+}
+
+
+def testTFConversion2(boolean)
+    console.log('testTFConversion2', boolean)
+    tH.fx('testTFConversion', true)
+end
+
+#fx testTFConversion
+
+#fx testTFConversion true
+
+#fx.testTFConversion(true)
+tH.fx.testTFConversion(true)
+
+#fx testTFConversion(true)
+
+log boo
+
+endtest
+
+function findTabs(maxTabs) {
+    var tabs =  $('#tabHolder').find('li.uib-tab:visible')
+    console.debug('tabs', maxTabs, tabs.length)
+    if ( maxTabs ) {
+        $.each(tabs, function onClick(k,ui) {
+            var u = $(ui)
+            if ( maxTabs >= i  ) {
+               tH.click(tab.text(), '#tabHolder');
+               return;
+            }
+
+
+        });
+    }
+    return tabs
+}
+
+
+
+fx.findTabs(2);
+
+
+
+
+endtest
+
+testTFConversion(true)
+
+fx testTFConversion true; false
+fx testTFConversion(true);
+fx testTFConversion2
+endtest
+
+set #txtArea; what is this; false
+set #txtArea; what is this; true
+
+
+
+
+def outerloop(type2)
+    tH.addStep(function findAllUserTabs() {
+        var items = $('#divContainerCounter')
+        .find('button')
+        if ( type2 ) {
+                  var items = $('#divContainerCounter')
+                  .find('button2')
+        }
+        var arrTabs = []
+        $.each(items, function onAdd(k,v) {
+            var tabName = $(v).text().trim();
+            console.log('will delete tab', tabName);
+           // tH.wait(1);
+            tH.fx('deleteTab2', tabName)
+            arrTabs.push(tabName);
+        });
+
+        console.log('will delete tab', arrTabs);
+
+        tH.test.cb()
+    });
+end
+def deleteTab2(tabName)
+    tH.click(tabName, '#divContainerCounter');
+   //  console.log('will delete', 'searching for tab', tabName)
+   //tH.wait(0.5);
+    tH.addStep(function onx(){
+        //console.log('will delete done', tabName);
+        tH.test.cb()
+    })
+end
+
+fx outerloop
+#fx outerloop(true)
+
+
+
+
+def fx1(a,b,c)
+    var fxName ='-fx1'
+    tH.dbg(fxName,1)
+    tH.fx('fx4')
+    tH.addStep(function callTo2() {
+        console.error('running')
+        tH.dbg(fxName,2)
+
+        tH.fx('fx2')
+        tH.dbg(fxName,3)
+
+        tH.test.cb()
+    })
+    //tH.fx('fx2')
+    tH.dbg(fxName
+    ,4)
+end
+
+def fx2(a,b,c)
+    var fxName ='-fx2'
+    tH.dbg(fxName, 1);
+
+    tH.addStep(function callTo3() {
+        tH.log(fxName, 2)
+        tH.fx('fx3')
+        tH.dbg(fxName, 3)
+        tH.test.cb()
+    })
+    tH.dbg(fxName, 4);
+end
+
+
+
+def fx3(a,b,c)
+    var fxName = '--fx3'
+    tH.dbg(fxName, 1);
+
+    tH.addStep(function testFx3Logging() {
+        //tH.log('2')
+        //tH.fx('fx2')
+        tH.dbg(fxName, 2)
+        tH.test.cb()
+    })
+    tH.dbg(fxName, 3);
+end
+
+def fx4(a,b,c)
+    var fxName = '-fx4'
+    tH.dbg(fxName, 1);
+
+    tH.addStep(function testFx3Logging() {
+        //tH.log('2')
+        tH.log(fxName, 2)
+        tH.test.cb()
+    })
+    tH.dbg(fxName, 3);
+end
+
+
+
+
+fx fx1()
+
+
+
+
+
+
+endtest
+
+def fx1(a,b,c)
+    tH.log('fx1')
+    //tH.fx('fx2')
+end
+
+
+#fx fx1()
+
+#endtest
+
+/*
+def fx1(a,b,c)
+    console.log('fx1');
+end
+*/
+
+def fx2(a,b,c)
+    tH.log('fx2');
+    tH.fx('fx4')
+end
+
+
+def fx3(a,b,c)
+    tH.log('fx3');
+end
+
+
+
+def fx4(a,b,c)
+    tH.log('fx4');
+    tH.add(function () {
+        tH.setDefaultAddNext()
+        tH.logNow('fx4b')
+        tH.log('fx4c')
+        tH.fxNow('fx5')
+        tH.log('fx4d-postfx5')
+          tH.log('fx4e-postfx5')
+        tH.resetDefaultAddNext();
+        tH.test.cb();
+    });
+end
+
+
+def fx5(a,b,c)
+    tH.log('fx5');
+    tH.add(function asdf () {
+        tH.setDefaultAddNext()
+        tH.logNow('fx5b')
+        tH.log('fx5.last')
+
+        tH.log('fx5.pre')
+        tH.add(function inner1() {
+            tH.logNow('fx5c+++')
+            tH.test.cb();
+        })
+        tH.resetDefaultAddNext();
+        tH.log('fx5.post')
+        tH.test.cb();
+    });
+end
+
+
+
+fx fx1();
+fx fx2();
+fx fx3();
Index: mp/testingFramework2/test.dbg.loaddirect.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/test.dbg.loaddirect.html	(revision )
+++ mp/testingFramework2/test.dbg.loaddirect.html	(revision )
@@ -0,0 +1,24 @@
+<!DOCTYPE html>
+<html>
+<head>
+    <title></title>
+    <script src="jquery-2.2.0.min.js" ></script>
+    <script src="js.cookie.js" ></script>
+    <script src="shelpers-mini.js" ></script>
+   <script src="PromiseHelperV3.js" ></script>
+    <script src="testFramework.js" ></script>
+    <script src="tests.js" ></script>
+
+
+</head>
+<body>
+<button>Test</button>
+<button onclick="clickTest2()">test 2</button>
+<textarea id="txtArea" ></textarea>
+<button id="btnTest">Test</button>
+
+<div style="display: none; position: fixed; bottom: 10px; right: 10px" id="testLogPanel" >
+    asdf
+</div>
+</body>
+</html>
\ No newline at end of file
Index: mp/testingFramework2/TestCSVConvertorDef.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/TestCSVConvertorDef.js	(revision )
+++ mp/testingFramework2/TestCSVConvertorDef.js	(revision )
@@ -0,0 +1,514 @@
+if ( window.isNode != false ) {
+    var sh = require('shelpers').shelpers;
+    var shelpers = require('shelpers');
+}
+
+function TestCSVConvertor() {
+    var p = TestCSVConvertor.prototype;
+    p = this;
+    var self = this;
+
+    self.settings = {};
+    self.data = {}
+
+
+
+    p.init = function init(config) {
+        self.settings = sh.dv(config, {});
+        config = self.settings;
+
+        self.method();
+    }
+
+    p.method = function method(config) {
+    }
+    p.processTestCSV = function processTestCSV(contents) {
+
+        var h = {};
+        var config = {}
+        config.ignore = ['data: WARNING: Skip: ',
+            'WARNING: Skipping FS',
+            'data: ERROR: Can',
+            'child process '
+        ]
+        config.ignoreComments = true;
+        config.fxProc = function parseCmd(item, i, len){
+
+
+
+            i  += 1
+
+            var line = item.trim();
+
+
+            if ( h.inMultiLineComment ) {
+
+                if ( line.includes('*/') ) {
+                    var ousideOfComment = line.split('*/')[1]
+                    h.inMultiLineComment = false;
+                    line = ousideOfComment; //overkill
+                } else {
+                    //still indie multi line comment mode
+                    return;
+                }
+            }
+
+            if ( h.endTest == true ) {
+                return;
+            }
+
+            if ( line == 'endtest') {
+                h.endTest = true;
+                console.log('end test early', 'line', i)
+                return;
+            }
+            if ( line.startsWith('#')) {
+                return;
+            }
+            if ( line.startsWith('--')) {
+                return;
+            }
+            if ( line == '' ) {
+                return;
+            }
+
+            var showItemInput = false;
+            if ( showItemInput )
+            console.error(i, item)
+            item = item.trim();
+            var words = item.split(' ');
+
+            var firstWord = words[0];
+            firstWord = firstWord.trim();
+            var lineContent = words.slice(1).join(' ').trim();
+
+            sh.t = '\t'
+            //console.error(sh.t, i, firstWord=='endeval')
+            var valid = false;
+
+            var item = {};
+
+            var comment = null;
+            /*if ( line.includes('#') ) {
+             var split = line.split('#')
+             line = split[0]
+             comment = split[1]
+             }*/ //jquery ids
+            if ( line.startsWith('#') ) {
+                return;
+            }
+            if ( line.startsWith('~')  == false
+                && line.includes('~') ) {
+                var split = line.split('~')
+                line = split[0]
+                comment = split[1]
+            }
+
+            if ( line.includes('//') ) {
+                var split = line.split('//')
+                line = split[0]
+                comment = split[1]
+            }
+            line = line.trim()
+
+
+            //mulite line comments
+            //comments
+            if ( line.includes('/*')) {
+                h.inMultiLineComment = true;
+                var afterComment = line.split('/*')[1];
+                var ousideOfComment = afterComment.split('*/')[1]
+                if ( afterComment.includes('*/')) {
+                    h.inMultiLineComment = false;
+                    line = ousideOfComment; //overkill
+                } else {
+                    //in comment mode
+                    return;
+                }
+            }
+          /*  if ( h.inMultiLineComment ) {
+
+                if ( line.includes('*!/') ) {
+                    var ousideOfComment = line.split('*!/')[1]
+                    h.inMultiLineComment = false;
+                    line = ousideOfComment; //overkill
+                } else {
+                    //still indie multi line comment mode
+                    return;
+                }
+            }
+*/
+
+            var itemCopyAtEnd = {};
+
+            var words = line.split(' ');
+            var args = words.slice(1)
+            var userDenotedArgs = false;
+
+            if ( line.includes('; ')) {
+                var wordsC = args.join(' ')
+                if ( wordsC ) {
+                    console.log('wordsC', wordsC, wordsC.split('; '))
+                }
+                words = wordsC.split('; ')
+                args = words;
+                userDenotedArgs = true;
+
+            }
+            if ( line.includes(' |')) {
+                var wordsC = args.join(' ')
+                if ( wordsC ) {
+                    console.log('wordsC', wordsC, wordsC.split(' |'))
+                }
+                words = wordsC.split(' |')
+                args = words;
+                userDenotedArgs = true;
+            }
+
+
+            itemCopyAtEnd.args = args;
+            if ( comment ) {
+                itemCopyAtEnd.comment = comment;
+            }
+
+            item.index = len+1
+            item.line = i
+            item.fx = i
+            item.args = i
+            item.orig = i
+            item.comment = i
+            item.lines = [];
+
+            var validCmds = [
+                'click',
+                'waitForShow',
+                'waitForHide',
+                'verifyHidden',
+                'pressEnter',
+                'moreThanX',
+                'clickOne','setItem','makeGreen',
+                'scrollTo','verifyExists',
+                'fxasync',
+                'fx', 'bookmark'
+            ];
+            if ( validCmds.includes(firstWord)) {
+                valid  = true;
+                item.fx = firstWord
+                itemCopyAtEnd.args = [args.join(' ')]
+                if ( userDenotedArgs ) { //do not combine args
+                    //debugger
+                    itemCopyAtEnd.args = args;
+                }
+
+                if ( firstWord == 'fx') {
+                    //hanlde case where user has function fx fx1 a; b; c
+                    //should fx fx1; a; b; c, be gracefulw ith user
+                    var argsTest = itemCopyAtEnd.args
+                    var firstArg = argsTest[0].trim()
+                    if ( firstArg.includes(' ')) {
+                        //debugger
+                        var firstArgSplit =  firstArg.split(' ')
+                        argsTest.shift(); //remove first split item
+                        //firstArgSplit.shift(); //remove fx name
+                        var argsFixed = firstArgSplit.concat(argsTest)
+                        itemCopyAtEnd.args = argsFixed;
+
+                    };
+                     if ( firstArg.includes('(') && firstArg.includes(')')) {
+
+                        if ( firstArg.endsWith(';') ) {
+                            firstArg = firstArg.slice(0,-1)
+                        }
+                        if ( firstArg.endsWith(')')) {
+                            //asdf.g
+                            var cfg = {}
+                            var fxName = firstArg.split('(')[0]
+                            cfg.defName = fxName;
+                            cfg.eval = firstArg;
+
+
+
+                            try {
+                                var evalToGet_getArgsStr =
+                                    ['function ' + fxName + '() {',
+                                        'var args = uiUtils.args(arguments);',
+                                       // ' debugger;',
+                                        'return args',
+                                        '}',
+                                        cfg.eval,
+                                    ].join('\n')
+                            }
+                            catch (e ) {
+                                console.error('arsing error on fx input')
+                                console.error(e)
+                                //can't process fx eval
+                            }
+                            cfg.args = eval(evalToGet_getArgsStr)
+
+                            //debugger
+                            itemCopyAtEnd.args = cfg;
+
+                        }else {
+                            //strange input
+                        }
+
+                    }
+
+                }
+            }
+
+            if ( firstWord == 'if' ) {
+                valid = true;
+                item.fx = 'if'
+              //  console.clear();
+                console.debug('line', lineContent)
+                itemCopyAtEnd.args = args;
+
+                if ( lineContent.startsWith('{') &&
+                    lineContent.endsWith('}') ) {
+                    //var cfg = eval(lineContent)
+                    eval('var cfg =' +lineContent)
+                    console.log('cfg', cfg)
+                   // debugger
+                    itemCopyAtEnd.args = [cfg];
+                }
+
+            }
+
+/*
+            if ( firstWord == 'click') {
+                valid  = true;
+                item.fx = 'click'
+                itemCopyAtEnd.args = [args.join(' ')]
+            }*/
+            if ( firstWord == 'clickJ') {
+                valid  = true;
+                item.fx = 'clickJ'
+            }
+            if ( firstWord == 'clickText') {
+                valid  = true;
+                item.fx = 'clickText'
+            }
+            if ( firstWord == 'log') {
+                valid  = true;
+                item.fx = 'log'
+            }
+            if ( firstWord == 'status') {
+                valid  = true;
+                item.fx = 'msgStatus'
+            }
+
+            if ( firstWord == 'alert') {
+                valid  = true;
+                item.fx = 'alert'
+            }
+            if ( firstWord == 'set') {
+                valid  = true;
+                item.fx = 'set'
+            }
+
+            if ( firstWord == 'wait') {
+                valid  = true;
+                item.fx = 'wait'
+            }
+            if ( firstWord.slice(0,1) == '~') {
+                valid  = true;
+                item.fx = 'log'
+                item.args = [line.slice(1)]
+            }
+
+            if ( firstWord == 'eval' || firstWord == 'def') {
+                //debugger
+                if ( h.evalMode == true ) {
+                    throw new Error('doublel eval mode')
+                }
+                valid  = true;
+                item.fx = 'evalFx'
+                h.evalMode = true;
+                h.hold = item;
+                var firstLine = true
+                item.lines = [];
+               // console.log('words', words.slice(-1))
+                itemCopyAtEnd.args=[words.slice(-1)]
+                var cfg = {};
+                //hanlde case where user has function fx fx1 a; b; c
+                //should fx fx1; a; b; c, be gracefulw ith user
+                var argsTest = [words.slice(-1)]
+                cfg.defName = words.slice(-1) //last word
+
+                var lineCombined = words.join(' ')
+                //lineCombined.split('#')[0]
+
+                console.log('parse def', argsTest, words)
+
+
+                if ( argsTest.includes(' ')) {
+                    asdf.g
+                }
+                var runDefOnInit = false;
+                if ( firstWord != 'def' ) { //run if not def
+                    itemCopyAtEnd.args.push(true)
+                    runDefOnInit
+                }
+
+               // var argsTest = itemCopyAtEnd.args
+                var firstArg = words[1]
+
+                //support spaces
+                //["def", "deleteTab(tabName_,", "userTabType)"]
+                if ( words[0] == 'def' && words.length > 2) {
+                    console.warn('space in args');
+                    var lastWord = words.slice(-1)[0]
+                    if ( lastWord.endsWith(')') ) {
+                       // debugger
+                        firstArg = words.slice(1).join('')
+                    }
+
+                }
+
+                if ( firstArg.includes('(') && firstArg.endsWith(')')) {
+
+                    //ensure indexes in porpe rpalce ...) (
+                    if ( firstArg.endsWith(')')) {
+                        //asdf.g
+                        var cfg = {}
+                        cfg.runDefOnInit = runDefOnInit;
+                        var fxName = firstArg.split('(')[0]
+                        cfg.defName = fxName;
+                        cfg.fxSignature = firstArg;
+                        itemCopyAtEnd.args = cfg;
+                       // debugger
+                    }else {
+                        //strange input
+                    }
+
+                }
+                //return;
+            }
+
+            if ( firstWord == 'endeval' || firstWord == 'end' ) {
+                if ( h.evalMode == false ) {
+                    throw new Error('was not in eval mode')
+                }
+                valid  = false;
+                //item.fx = 'set'
+                item = h.hold;
+                h.evalMode = false;
+            }
+
+
+            if ( h.evalMode && firstLine != true) {
+                h.hold.lines.push(line)
+                //h.hold.lines.push('5')
+                return;
+            }
+
+
+            if ( valid == false ) {
+                return null
+            }
+
+            sh.copyProps(itemCopyAtEnd, item)
+
+
+            item.orig = line;
+
+            return item;
+
+        }
+        var lines = sh.each.lines(contents, config);
+        self.lines = lines;
+
+        //debugger
+        self.proc('lines', lines)
+        //console.log(lines)
+
+        sh.printCol(lines)
+
+        //  debugger;
+        return lines;
+
+    }
+    p.loadScript = function loadScript(file) {
+        var content = sh.readFile(file)
+        console.log('t', content)
+        //get lines
+        //get function
+        //create objet
+        var items =  p.processTestCSV(content)
+        sh.callIfDefined(fxItems, items)
+    }
+
+    p.loadScript2 = function loadScript2(file, fxItems, fxFail) {
+        uiUtils.getUrl(file, function onGotContnet(content) {
+
+            //console.log('content', content)
+            //return;
+            var items =  p.processTestCSV(content)
+            sh.callIfDefined(fxItems, items)
+        }, null, function onFail() {
+            console.error('failed to load')
+            if ( fxFail ) fxFail('failed')
+        })
+
+        return;
+        var content = sh.readFile(file)
+        console.log('t', content)
+        //get lines
+        //get function
+        //create objet
+
+    }
+
+    p.test = function test(config) {
+    }
+
+
+    function defineUtils() {
+        var utils = {};
+        p.utils = utils;
+        utils.getFilePath = function getFilePath(file) {
+            var file = self.settings.dir+'/'+ file;
+            return file;
+        }
+
+        p.proc = function debugLogger() {
+            if ( self.silent == true) {
+                return;
+            }
+            sh.sLog(arguments);
+        };
+    }
+    defineUtils()
+}
+
+if ( window.isNode != false ) {
+    exports.TestCSVConvertor = TestCSVConvertor;
+
+    if (module.parent == null) {
+        var instance = new TestCSVConvertor();
+        var config = {};
+        instance.init(config)
+        instance.loadScript('scripts/test.txt')
+        instance.test();
+    }
+} else {
+    function testConvertoer() {
+        //return
+        var instance = new TestCSVConvertor();
+        var config = {};
+        instance.init(config)
+
+        var currentScript = document.currentScript //just in case user does not set pre-amble
+        if ( currentScript ) {
+            urlPremable = currentScript.src.split('/').slice(0,-1).join('/')+'/';
+            console.info('guessed pre-amble to be', window.preamble)
+        }
+
+        instance.loadScript2(urlPremable+'csvScripts/test.txt')
+        instance.test();
+    }
+     testConvertoer();
+}
+
+
Index: mp/testingFramework2/testLL.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/testLL.js	(revision )
+++ mp/testingFramework2/testLL.js	(revision )
@@ -0,0 +1,188 @@
+/**
+ * Created by user2 on 3/12/16.
+ */
+
+
+var scripts2 = [
+    'shelpers-mini.js',
+    'PromiseHelperV3.js',
+    'testFramework.js',
+    'tests.js',
+    'dialogTransport.js',
+    'dialogSearchTests.js',
+    'TestCSVConvertor.js',
+    'TestCSV.js',
+]
+var loadScript2 = function loadScript2(_scripts2, fxDone) {
+
+    if ( _scripts2.length == 0 ) {
+        if ( fxDone ) fxDone();
+        return;
+    }
+    var url = _scripts2.shift();
+    if ( window.preamble == null ) {
+        window.preamble = window.location.origin + '/testingFramework/'
+    }
+    //if ( url.includes(window.preamble) == false ) {
+    //    debuggerf
+    if ( url.startsWith('http') == false ) {
+        url = window.preamble + url;
+    }
+    //}
+
+
+    var debug = false;
+    // debug = true;
+    if ( debug ) {
+        console.log('downloading', url)
+    }
+
+
+    function loadJSViaScriptTag(src, fx) {
+        var script = document.createElement('script');
+        script.src = src;
+        script.onload = function onLoadedScript(a) {
+            //alert('got js ' + src)
+            if ( fx != null ) {
+                fx(a)
+            }
+        };
+
+        script.onerror = function onscriptLoadingFailed (a,b,c,d) {
+            console.error('failed to load', url, a==null,b,c,d)
+            console.error(c)
+        };
+        document.head.appendChild(script);
+    };
+
+    loadJSViaScriptTag(url, function onLoadNextScript() {
+        function loadNextScript(){
+            loadScript2(_scripts2, fxDone);
+        }
+        setTimeout(loadNextScript, 50)
+    });
+
+
+    return;
+
+    function loadJSVia_JQuery$getScript ( url, fxDone) {
+        jQuery.getScript(url)
+            .done(function onLoaded() {
+            })
+            .always(function doneLoadingFile() {
+                if (debug) {
+                    console.error('what is window tests?', url, window.tests);
+                }
+                function loadNextScript() {
+                    loadScript2(_scripts2, fxDone);
+                }
+
+                setTimeout(loadNextScript, 50)
+
+            })
+            .fail(function (a, b, c, d) {
+                console.error('failed to load', url, a == null, b, c, d)
+                console.error(c.stack)
+            });
+    }
+}
+
+
+function loadTestFrameworkFiles(fxDone, force) {
+    if ( force != true ) {
+        if (window.tH && window.tH.add) {
+            console.warn('test framework already loaded')
+            if ( fxDone ) { fxDone() }
+            return;
+        }
+    }
+
+
+    var currentScript = document.currentScript //just in case user does not set pre-amble
+    if ( currentScript ) {
+        window.preamble = currentScript.src.replace('testLL.js', '')
+        console.info('guessed pre-amble to be', window.preamble)
+    }
+
+    /*
+    if ( window.uiUtils == null ) {
+        //why: load ui+utils if not already specified
+        scripts2.unshift('ui_utils.js')
+    }
+    */
+
+    if ( window.uiUtils == null ) {
+        //why: load ui+utils if not already specified
+        //debugger
+        scripts2.unshift('ui_utils.js')
+    }
+    if ( window.jQuery == null ) {
+        //why: load ui+utils if not already specified
+        scripts2.unshift('jquery.js.ignore_scan')
+        //debugger
+    }
+    loadScript2(scripts2.concat(), onFinishedLoadingTestFramework)
+
+    function onFinishedLoadingTestFramework() {
+        console.info('finished loading all scripts', scripts2.length);
+        window.tests.loaded = true;
+        window.testingFrameworkLoaded = true;
+        if ( fxDone ) { fxDone() }
+    }
+}
+
+window.testFrameworkReload = function () {
+
+}
+
+
+var runTest = window.location.href.indexOf('runTest=true') !=-1
+var loadTestFrameworkInUrl =  window.location.href.indexOf('loadTestFramework=true') !=-1
+
+
+if (  runTest || loadTestFrameworkInUrl ) {
+    loadTestingFramework()
+    //loadScript2(scripts2.concat());
+}
+
+function loadTestingFramework(fxDone, force) {
+
+    // uiUtils.addToUrl('testParam2', true)
+    //  return;
+    loadTestFrameworkFiles(testFrameworkingLoaded, force)
+
+    function testFrameworkingLoaded() {
+        //debugger;
+        uiUtils.addToUrl('loadTestFramework', true); //
+        uiUtils.addToUrl('dialogSearchTests', true); //show test dialog for UX conv.
+        console.info('loadTestingFramework - test framework loaded')
+       // window.dialogTransport.init()
+        if ( window.fxTLLLoaded ) {
+            window.fxTLLLoaded();
+        }
+        callIfDefined(fxDone);
+        return;
+        uiUtils.repeatUntil(
+            function isDialogReady()  {
+                return window.dialogTransport != null
+            },
+            function initDialog() {
+                window.dialogTransport.init()
+            }
+        )
+    }
+
+}
+
+window.loadTestingFramework = loadTestingFramework; //<-- Entry Point
+
+
+window.ltf = function loadTestingFrameworkForce(fxDone) {
+    loadTestingFramework(fxDone, true)
+}
+
+var cookie =  localStorage.getItem('nextTest')
+cookie = JSON.parse(cookie);
+if ( cookie ) {
+    loadScript2(scripts2.concat());
+}
Index: mp/testingFramework2/csvScripts/dev/defs.jbak.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/dev/defs.jbak.txt	(revision )
+++ mp/testingFramework2/csvScripts/dev/defs.jbak.txt	(revision )
@@ -0,0 +1,619 @@
+#test for basic csv
+#load this iat runtime from the main page
+#can defs be shared after test has run? i hope so
+#when change defs, rerun last test ...? , so add to index as well
+log creating definitions
+
+
+
+
+
+
+def y
+    window.gsdf.gsdf = 'j'
+end
+#fx y
+
+def - alert
+    alert('in alert')
+endeval
+
+
+def - closeallpopups
+    window.$scope.popups.hideAllDialogs()
+    //window.$subsitesScope.popups.hideAllDialogs()
+end
+
+def - showdropdown
+    var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+    x42NavBarNav_DropDown.addClass('open')
+    tH.waitForShow('Create New Subsite', 'dropdown didnt show')
+endeval
+
+def hidedropdown
+    var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+    x42NavBarNav_DropDown.removeClass('open')
+endeval
+
+
+def create-tab
+
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+            indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+            console.log('found eexisting copy of clone');
+
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+            var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+            btnCancel.click()
+            return
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+        window.$scope.layoutToCopy = [name]
+        window.$scope.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.clickNext('OK', '#dialogCloneTabFrom');
+    }
+    tH.setDefaultAddNext()
+    tH.logNow('running create tab?')
+    // cloneTab_QuickIFTabExists();
+    tH.click('#dialogAddNewTab');
+    tH.waitForShow( '#dialogCloneTabFrom')
+    //  tH.click('')
+    tH.addSync(cloneTab_QuickIFTabExists)
+    tH.resetDefaultAddNext();// = false;
+end
+
+def verifySubsiteTab
+    // tH.setDefaultAddNext()
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+        indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone');
+        return
+        }
+         tH.fail('missing subsite tab ', expectedName)
+    }
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    //  tH.resetDefaultAddNext();// = false;
+end
+#fx verifySubsiteTab; 1
+
+
+
+def refreshSubsites(subsiteName)
+    tH.fx('showdropdown' )
+    tH.click('Leave Subsite')
+    tH.waitForHide('Leave Subsite')//,'#holderMySubsiteList')
+    tH.wait(.5)
+
+    tH.logNow('go to subsite')
+
+    tH.fx('ensureAllSubsiteTabsGone')
+
+    tH.addStep(function refreshSubsiteList(){
+        window.$scope.subsites.remote.sites.listItems( function() {
+            tH.wait(.5)
+            // tH.resetDefaultAddNext()
+             tH.test.cb()
+        })
+    });
+
+    if (subsiteName) {
+        tH.click(subsiteName, '#holderMySubsiteList')
+    }
+
+       tH.fx('hidedropdown');
+end
+
+
+
+def revertTabs(subsiteName)
+    tH.fx('showdropdown' )
+    tH.click('Leave Subsite')
+    tH.waitForHide('Leave Subsite')//,'#holderMySubsiteList')
+    tH.wait(.5)
+
+    tH.logNow('go to subsite')
+
+    tH.fx('ensureAllSubsiteTabsGone')
+
+    tH.addStep(function refreshSubsiteList(){
+        window.$scope.subsites.remote.sites.listItems( function() {
+            tH.wait(.5)
+            // tH.resetDefaultAddNext()
+             tH.test.cb()
+        })
+    });
+
+    tH.addStep(function clearTabs(){
+        window.$scope.utilsFx.revertUITabs(false, function onTabsUpdated(){
+
+        })
+        tH.test.cb();
+    });
+
+
+    tH.wait(2)
+    tH.log('... recreating tabs');
+    //return
+    tH.addStep(function clearTabs(){
+        window.$scope.utilsFx.revertUITabs(true, function onTabsUpdated(){
+              tH.test.cb();
+        })
+
+    });
+
+    if (subsiteName) {
+        tH.click(subsiteName, '#holderMySubsiteList')
+    }
+
+    tH.fx('hidedropdown');
+end
+
+def leaveSubsite
+    tH.fx('showdropdown' )
+    tH.click('Leave Subsite'); //will fali if not available
+    tH.waitForHide('Leave Subsite')
+
+    tH.waitForHide('#dialogAddNewTab',
+        'Ensure add to subsite tab is hidden - when user leaves subsite edit mode');
+    //tH.waitForNone('li[type="subsiteTab"]', 'Did not hide the subsite tabs when left subsite')
+
+    tH.fx('hidedropdown');
+end
+
+
+
+def ensureAllSubsiteTabsGone
+
+    var tabsUser = $('[type=userTab]')
+    var tabsSubsite = $('[type=subsiteTab]')
+
+    if ( tabsSubsite.length > 0 ) {
+        tH.fail('had subsite tabs', tabsSubsite);
+        window.failData = tabsSubsite;
+    }
+
+end
+
+
+def ensureAllCustomTabsGone
+
+    var tabsUser = $('[type=userTab]')
+    var tabsSubsite = $('[type=subsiteTab]')
+
+    if ( tabsSubsite.length > 0 ) {
+        tH.fail('had subsite tabs', tabsSubsite);
+        window.failData = tabsSubsite;
+    }
+
+    if ( tabsUser.length > 0 ) {
+        tH.fail('had tabsUser, expected 0', tabsUser);
+        window.failData = tabsUser;
+    }
+end
+
+def removeAllTabs(userTabs)
+    tH.addStep(function findAllUserTabs() {
+        if ( userTabs == true || userTabs == 'true'  ) {
+             var items = $('[type=userTab]')
+             //debugger
+        } else {
+            var items = $('[type=subsiteTab]')
+       //     debugger
+        }
+
+        var arrTabs = []
+        $.each(items, function onDeleteTabInLoop(k,v) {
+            var tabName2 = $(v).text().trim();
+            console.log('will delete tab', tabName2);
+            tH.wait(1);
+            tH.fx('deleteTab', tabName2)
+            arrTabs.push(tabName2);
+        });
+
+        console.log('will delete tab', arrTabs);
+
+        var arrTabNames =  $scopeSubsites.utilsFx.getTabNames()
+        console.log('will delete tabs2', arrTabNames);
+
+        tH.test.cb()
+    });
+end
+
+def deleteTab(tabName_, userTabType)
+    tH.click(tabName_, '#tabHolder');
+    tH.wait(0.5);
+
+    if ( userTabType == 'true' || userTabType == true ) {
+        tabType = 'userTab'
+    }
+
+    tH.log('will delete', 'searching for tab', tabName_)
+
+
+    function findTabByName() {
+        tH.logNow('where is tab', tabName_,'?');
+        var tabs = tH
+        .findByContent('li|||'+tabName_,
+        '#tabHolder');
+        if ( tabs.length > 1 ) {
+            tH.clickNow(tabs)
+        }
+        return tabs;
+    }
+
+    tH.waitForShow(findTabByName, 'Did not see context controls');
+
+    //tH.waitForShow('$2 li|||'+expectedName, 'tab edit controls did not appear on display', '#tabHolder')
+
+    #wait for show item under by content
+    tH.click('#editTabNameDialogContent')
+    tH.wait(0.5)
+    tH.click('a|||Delete', '#dialogTabContextMenuContent')
+    tH.waitForShow('#confirmDialog')
+    tH.click('OK', '#confirmDialog')
+    tH.addSync(function deleteLog() {
+         tH.log('will delete tab', tabName_, 'gone')
+    })
+    tH.wait(1) //wait for tab to clear
+    tH.fx('findTab', tabName_,userTabType)
+    tH.addStep(function throwErrorIfTabFound() {
+        if (   window.foundTab = null ||   window.foundTab.length == 0 ) {
+
+        } else {
+            tH.fail('found the tab', tabName_, userTabType)
+        }
+        tH.test.cb();
+    })
+
+
+end
+
+
+def findTab(tabName,userTabType)
+  window.foundTab = null;
+    var existingTab = tH.findByContent(tabName, '#tabHolder')
+    var tabType = 'subsiteTab'
+    if ( userTabType == 'true' || userTabType == true ) {
+        tabType = 'userTab'
+    }
+    existingTab = existingTab.filter('[type='+tabType+']');
+    if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone', existingTab);
+        //return
+    } else {
+
+    }
+    window.foundTab = existingTab;
+    tH.logNow('searched for tab', tabName )
+end
+
+def deleteTabSafe(tabName,type)
+    //tH.logNow('creating the new tab', expectedName )
+    tH.fx('findTab',tabName, type);
+    tH.addStep(function onTestTAb() {
+        existingTab = window.foundTab;
+        // tH.logNow('found existing tab', tabName , existingTab.length)
+        if ( existingTab.length > 0 ) {
+            // asdf.g
+            tH.logNow('found existing tab, deleting tab named:', tabName )
+            tH.fx('deleteTab', tabName, type);//
+            // return
+        } else {
+
+        }
+        tH.test.cb()
+    });
+
+
+end
+
+def createTab(indexTab,userTab,tabName)
+
+    if ( indexTab == null  ) {
+        indexTab = 0;
+    }
+    var name = window.$scope.tableHelper
+    .data.layoutTabs[indexTab].name
+    var expectedName = name + ' (copy)';
+
+    var tabAlreadyExists = false;
+
+    function cloneTab_QuickIFTabExists(){
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        var tabType = 'subsiteTab'
+        if ( userTab == 'true' || userTab == true ) {
+            tabType = 'userTab'
+        }
+        existingTab = existingTab.filter('[type='+tabType+']');
+        //debugger
+        if ( tabName ) { //check if proper name already exists
+            existingTab = tH.findByContent(tabName, '#tabHolder')
+            existingTab = existingTab.filter('[type='+tabType+']')
+            tH.logNow('renaming', tabName, existingTab.length);
+        }
+
+        if ( existingTab.length > 0 ) {
+            console.log('found eexisting copy of clone');
+            tabAlreadyExists = true
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+            var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+            btnCancel.click()
+            return
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+
+                if ( tabAlreadyExists ) {
+                    console.log('tabAlreadyExists', tabAlreadyExists);
+                    // tH.test.cb()
+                    return;
+                }
+                console.error('type', userTab)
+                //asdf.g
+                if (userTab != true && userTab != 'true') {
+                    tH.click('#dialogAddNewTab');
+                } else {
+                    tH.click('#dialogAddNewTabToUserLayout')
+                }
+                tH.waitForShow( '#dialogCloneTabFrom')
+
+        window.$scope.layoutToCopy = [name]
+        window.$scope.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.click('OK', '#dialogCloneTabFrom');
+
+
+    }
+
+    tH.logNow('running create tab?',userTab, tabName)
+
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    tH.add(function createNewTab_ifNeeded() {
+
+        tH.test.cb();
+    })
+
+    if ( tabName ) {
+        tH.addStep(function onXYX() {
+                if ( tabAlreadyExists ) {
+                    console.log('tabAlreadyExists', tabAlreadyExists);
+                     tH.test.cb()
+                    return;
+                }
+                tH.wait(1)
+                tH.click(expectedName, '#tabHolder')
+                tH.wait(1)
+                tH.waitForShow('#editTabNameDialogContent')
+                tH.click('#editTabNameDialogContent')
+                tH.wait(0.5)
+                tH.click('a|||Rename', '#dialogTabContextMenuContent')
+                tH.waitForShow('#dialogRenameTab')
+
+                tH.set('#txtRenameTabName',tabName, true)
+                tH.click('OK', '#dialogRenameTab')
+                tH.test.cb()
+
+        } )
+    }
+end
+
+
+def ensureTab(tabName,userTabType,present)
+    tH.log('what2', tabName)
+
+    tH.add(function refreshLayouts2(){
+        //tH.log('what')
+        //console.log('s')
+        tH.fx('refreshSubsites')
+        tH.test.cb()
+    })
+
+    tH.add(function refreshTabs(){
+        $scope.loadPageLayout_FromSubsite();
+        tH.test.cb()
+    })
+
+
+    function checkIfTabExists(){
+        tH.logNow('@checking for tab', tabName)
+        var existingTabs = tH.findByContent(tabName, '#tabHolder')
+        var tabType = 'subsiteTab'
+        if ( userTabType == 'true' || userTabType == true ) {
+            tabType = 'userTab'
+        }
+
+        var existingTab = existingTabs.filter('[type='+tabType+']');
+        var tabFound = existingTab.length > 0
+        if ( present == false ) {
+        if ( tabFound == false ) {
+            console.log('did not find tab, ok');
+        } else {
+            tH.fail('Did not want to see tab', tabName)
+        }
+        return;
+        }
+        tH.logNow('result of @checking for tab', tabName,
+        existingTabs.length, existingTab.length)
+        if ( tabFound ) {
+            console.log('found eexisting copy of clone');
+        } else {
+            tH.fail('Did not find tab', tabName)
+        }
+       // tH.logNow('creating the new tab', expectedName )
+    }
+
+    tH.addSync(checkIfTabExists)
+
+end
+
+def ensureTabGone(tabName,userTabType)
+    tH.fx('ensureTab', tabName, userTabType, false);
+end
+
+
+
+def createSubsite(subsiteName)
+    tH.fx('showdropdown' )
+
+    #create new subsite
+    tH.click('Create New Subsite')
+    tH.waitForShow('#dialogManageSubsite')
+    tH.waitForShow('Create Subsite', 'Ensure title text on dialog', '#dialogManageSubsite')
+    tH.waitForShow('A subsite name is required',
+        'Ensure empty subsite name warning is display', '#dialogManageSubsite')
+    tH.set('.txtManageSubsiteName','This name is too long too fit', true)
+    tH.waitForHide('A subsite name is required',
+            'Ensure empty subsite name warning is removed', '#dialogManageSubsite')
+       tH.waitForShow('Max length is 16 characters',
+               'Ensure "long name" warning is display', '#dialogManageSubsite')
+
+    tH.set('.txtManageSubsiteName',subsiteName, true)
+    #set [value="otherPeople"]; selected
+
+    tH.add(function onSelectProps() {
+        var radioOption =
+        $('[value="otherPeople"].ng-valid')
+        radioOption.prop('checked', true);
+        radioOption[0].click();
+        tH.test.cb()
+    });
+    tH.log('set text')
+    tH.set('.txtSearchName2', 'Ji hye')
+    tH.pressEnter( '.txtSearchName2')
+    tH.set('.txtSearchName2', 'Gergo')
+    tH.pressEnter('.txtSearchName2');
+    tH.set('.txtSearchName2', 'Fermin')
+    tH.pressEnter('.txtSearchName2');
+    tH.waitForShow('ferminr')
+
+    tH.click('OK', '#dialogManageSubsite')
+    tH.waitForShow(subsiteName)
+
+
+end
+
+def removeSubsite(subsiteName)
+    tH.fx('showdropdown' )
+
+    tH.addStep(function on() {
+        var existingSubsiteLink = y
+        = testHelper.findByContent(subsiteName,
+        $('#holderMySubsiteList') );
+        tH.data.existingSubsiteLink = existingSubsiteLink;
+        tH.test.cb()
+    } )
+
+    tH.addStep(function on() {
+        if ( tH.data.existingSubsiteLink.length > 0 ) {
+            tH.log('deleting subsite');
+            tH.fx('removeSubsite2', subsiteName)
+            //tH.waitForHide('Leave Subsite');
+        } else {
+            tH.log('not deleting subsite');
+        }
+        tH.test.cb()
+    } )
+    tH.fx('refreshSubsites')
+end
+
+def removeSubsite2(subsiteName)
+tH.log('removeSubsite2', subsiteName)
+    tH.fx('showdropdown' )
+    tH.click('Manage Subsites...')
+    tH.waitForShow('#dialogManageSubsites')
+    tH.add(function findThing() {
+        var y = testHelper.findByContent(subsiteName, $('#dialogManageSubsites') )
+        var tr = y.parents('tr')
+        var trashIcon = tr.find('.fa-trash')
+        console.clear();
+        console.log('trash',y,tr, trashIcon);
+        trashIcon.click()
+        tH.test.cb();
+    })
+
+    tH.waitForShow('#confirmDialog')
+    tH.click('OK', '#confirmDialog')
+
+    tH.waitForShow('#dialogManageSubsites')
+    tH.wait(0.5)
+    tH.click('Close', '#dialogManageSubsites')
+
+
+end
+
+
+def goToSubsite(subsiteName)
+     tH.fx('showdropdown' )
+    tH.waitForShow(subsiteName, 'wait for the subsite in the list', '#holderMySubsiteList')
+    //waitForShow EU Trading2; wait for subsite in list; #holderMySubsiteList
+    tH.click(subsiteName, '#holderMySubsiteList');
+end
+
+def editSubsite(name)
+    tH.waitForShow(subsiteName, 'wait for the subsite in the list', '#holderMySubsiteList')
+    //waitForShow EU Trading2; wait for subsite in list; #holderMySubsiteList
+    tH.click(name, '#holderMySubsiteList');
+end
+
+def gotopage
+    tH.setDefaultAddNext()
+    var pageName = arg2
+    var pageMenuLinkText = arg1
+    tH.data.maxTimesNext = 50;
+    tH.click(pageMenuLinkText , 'x42-nav-sidebar');
+    tH.nextTimeoutTime(60)
+    tH.waitForShow(pageName, 'did not switch to '+pageName+' page', '.x42-nav-body-container' )
+    tH.nextTimeoutTime(60)
+    tH.waitForShow('pt-table', 'pt table did not load')
+    tH.log('Navigated to', pageName);
+    tH.resetDefaultAddNext()
+end
+#fx gotopage; Revenue; Revenue
+
+#log changed to revenue page
+#wait 2
+
+#fx gotopage; External Revenue; External Revenue
+
+#fx verifySubsiteTab; 0
+
+
+#endtest
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/verifySubsiteLoadingError.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/verifySubsiteLoadingError.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/verifySubsiteLoadingError.js.txt	(revision )
@@ -0,0 +1,13 @@
+#test for basic csv
+log this test will ensure the user can see the create new subsite option
+
+
+wait 4
+log 1
+wait 4
+log 2
+#wait 4
+#log 3
+waitForShow('#subsiteLoadErrorMsg', 'did not see website error')
+status Subsites did not load, Did see warning icons. (#subsiteLoadErrorMsg)
+endtest
Index: mp/testingFramework2/csvScripts/framework/test_bookmark_skip.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/framework/test_bookmark_skip.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/framework/test_bookmark_skip.js.txt	(revision )
@@ -0,0 +1,29 @@
+#test for basic csv
+require "Win32API"
+Beep = Win32API.new("kernel32", "Beep", ["I", "I"], 'v')
+
+#click 1
+#endtest
+
+click Revenue; x42-nav-sidebar
+
+if {find:'sheery', goto:'step4'}
+
+click 1
+click 2
+click 3
+bookmark step4
+click 4
+click 5
+if  {find:'skipTo8', goto:'step8'}
+click 6
+click 7
+waitForShow 7
+bookmark step8
+click 8
+click 9
+click 10
+
+click Press for div
+
+endtest
\ No newline at end of file
Index: mp/testingFramework2/test2.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/test2.html	(revision )
+++ mp/testingFramework2/test2.html	(revision )
@@ -0,0 +1,84 @@
+<!DOCTYPE html>
+<html>
+<head>
+    <title></title>
+    <script src="jquery.js.ignore_scan" ></script>
+    <script src="../themes/minimal_v0/js/ui_utils.js" ></script>
+   <!-- <script src="js.cookie.js" ></script>-->
+    <!--
+    <script src="shelpers-mini.js" ></script>
+    <script src="PromiseHelperV3.js" ></script>
+    <script src="testFramework.js" ></script>
+    <script src="tests.js" ></script>
+    -->
+
+    <script>
+        setTimeout(function hideDiv() {
+            $('#showDiv').hide();
+        }, 500)
+        window.onRedButton = function onRedButton() {
+            console.log('ddd')
+        }
+        window.onShowDiv = function onShowDiv() {
+            console.log('onShowDiv')
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').show();
+            }, 500)
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').hide();
+            }, 5000)
+        }
+       // window.preamble = '/test3/';
+        window.testCallFromEval = function () {
+            console.log('boom')
+        }
+    </script>
+    <script src="testLL.js"></script>
+
+    <script>
+        function lazyLoadAndRunTest() {
+            loadTestFramework(function onReady(){
+                testStackingDemo2B(true);
+            })
+        }
+        function autoloadTestFramework() {
+            window.location += '?loadTestFramework=true'
+        }
+    </script>
+    <style>
+        body {
+            font-weight: 400;
+            background-color: #CBD9E6;
+            font-family: 'Arial';
+        }
+    </style>
+</head>
+<body>
+<button>Test</button> <br />
+<button onclick="lazyLoadAndRunTest()">LL Test 2</button>  <br />
+<button onclick="tH.clickTest2()">Run Test 2</button>  <br />
+<textarea id="txtArea" ></textarea>
+<button id="btnTest">Test</button>
+<!--
+<div style="display: none; position: fixed; bottom: 10px; right: 10px" id="testLogPanel" >
+    asdf
+</div>
+-->
+
+
+
+<div>
+    <button class="redTest"
+            onclick="onRedButton()" >Go</button>
+
+    <button class="redTest2"
+            onclick="onShowDiv()" >Press for div</button>
+    <div id="showDiv" style="color:white;">
+        this the show div</div>
+</div>
+
+
+</body>
+</html>
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/wf1testB.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/wf1testB.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/wf1testB.js.txt	(revision )
@@ -0,0 +1,142 @@
+#test for basic csv
+require "Win32API"
+Beep = Win32API.new("kernel32", "Beep", ["I", "I"], 'v')
+
+click Revenue; x42-nav-sidebar
+
+if {find:'sheery', goto:'step4'}
+
+click 1
+click 2
+click 3
+bookmark step4
+click 4
+click 5
+if  {find:'skipTo8', goto:'step8'}
+click 6
+click 7
+bookmark step8
+click 8
+click 9
+click 10
+
+endtest
+
+eval close all popups
+  window.$scope.popups.hideAllDialogs()
+ window.$scope.popups.data.openDialogs = []
+ window.$scope.popups.data.modalCount = 0
+  //window.$subsitesScope.popups.hideAllDialogs()
+end
+def beep freq, duration
+    #puts 'beep', freq, 'd', duration
+  Beep.call(freq, duration)
+end
+beep 600, 400
+eval - showdropdown
+var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+x42NavBarNav_DropDown.addClass('open')
+endeval
+eval - showdropdown
+var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+x42NavBarNav_DropDown.addClass('open')
+endeval
+
+fx showdropdown
+
+waitForShow .x42-nav-header-submenu
+
+waitForShow Create New Subsite
+
+#create new subsite
+
+click Create New Subsite
+waitForShow #dialogManageSubsite
+set .txtManageSubsiteName; EU Trading2
+#set [value="otherPeople"]; selected
+eval
+ $('[value="otherPeople"]').prop('checked', true);
+  $('[value="otherPeople"]').click();
+end
+
+set .txtSearchName2; Ji hye
+pressEnter .txtSearchName2
+set .txtSearchName2; Gergo
+pressEnter .txtSearchName2
+set .txtSearchName2; Fermin
+pressEnter .txtSearchName2
+waitForShow ferminr
+
+
+click OK; #dialogManageSubsite //ignore
+waitForShow EU Trading2
+
+waitForShow #dialogAddNewTab
+click #dialogAddNewTab
+
+waitForShow #dialogCloneTabFrom
+#waitForShow Function
+#click Function; #dialogCloneTabFrom
+
+eval
+  var selectList = $('#dialogCloneTabFrom').find('select')
+  var first = selectList.find('option').first()
+  first.prop('selected', true);
+end
+
+click OK; #dialogCloneTabFrom
+
+#############################
+endtest
+click button
+
+
+click Leave Subsite
+
+waitForHide Leave Subsite
+
+click Manage Subsites...
+
+waitForShow #dialogManageSubsites
+
+eval close all popups
+  //window.$scope.popups.hideAllDialogs()
+  //window.$subsitesScope.popups.hideAllDialogs()
+
+  var y = testHelper.findByContent('EU Trading2', $('#dialogManageSubsites') )
+  var tr = y.parents('tr')
+  var trashIcon = tr.find('.fa-trash')
+  console.clear();
+  console.log('trash',y,tr, trashIcon);
+  trashIcon.click()
+end
+
+waitForShow #confirmDialog
+
+#click Cancel; #confirmDialog //ignore
+click OK; #confirmDialog //ignore
+
+
+waitForShow #dialogManageSubsites
+click Close; #dialogManageSubsites
+
+wait 1
+endtest
+click button
+clickJ .redTest //click red button
+clickText jump
+clickText test 2
+log test
+set #txtArea set the text
+set #txtArea; set the text ~use semi colon to delinate args
+set #txtArea |set the text ~use pika to delinate args
+alert new alert
+logNow sdfsdf
+logNext sdfsdfsdf
+log sdfsdfsdfsdfsdf
+wait 2 //wait 2 seoncds
+/*
+block comment
+*/
+--comment
+~some message alert //alias for log
\ No newline at end of file
Index: mp/testingFramework2/searchTests.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/searchTests.js	(revision )
+++ mp/testingFramework2/searchTests.js	(revision )
@@ -0,0 +1,64 @@
+/**
+ * Created by morriste on 2/23/16.
+ */
+//http://codepen.io/chriscoyier/pen/tIuBL
+(function(document) {
+    window.tests
+    var tbody = $('#testTable').find('tbody');
+    tbody.html('');
+    //debugger
+    $.each(window.tests, function addTestTolist(testName,test){
+        var tr = $('<tr/>');
+        for ( var i = 0; i < 3; i++) {
+            var td = $('<td/>');
+            tr.append(td);
+            if ( i == 0 )
+                td.html(testName)
+            if ( i == 1 )
+                td.html(test.desc)
+            if ( i == 2 ) {
+                var btn = $('<button/>')
+                btn.html('play')
+                btn.attr('onclick', 'window.runTest2("'+testName+'")')
+                td.html(btn)
+            }
+            tbody.append(tr)
+        }
+    });
+    // debugger;
+    //'use strict';
+    var LightTableFilter = (function(Arr) {
+        var _input;
+        function _onInputEvent(e) {
+            _input = e.target;
+            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
+            Arr.forEach.call(tables, function(table) {
+                Arr.forEach.call(table.tBodies, function(tbody) {
+                    Arr.forEach.call(tbody.rows, _filter);
+                });
+            });
+        }
+        function _filter(row) {
+            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
+            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
+        }
+        return {
+            init: function() {
+                var inputs = document.getElementsByClassName('light-table-filter');
+                Arr.forEach.call(inputs, function(input) {
+                    input.oninput = _onInputEvent;
+                });
+            }
+        };
+    })(Array.prototype);
+    if (document.readyState === 'complete') {
+        LightTableFilter.init();
+    } else {
+        document.addEventListener('readystatechange', function() {
+            if (document.readyState === 'complete') {
+                LightTableFilter.init();
+            }
+        });
+    }
+
+})(document);
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/dev/testWorkflow1.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/dev/testWorkflow1.txt	(revision )
+++ mp/testingFramework2/csvScripts/dev/testWorkflow1.txt	(revision )
@@ -0,0 +1,26 @@
+#test for basic csv
+log Test for workflow 1, creates subssite and adds 2 tabs to it on 2 pages , verifies tabs were created
+eval - opendropdown
+var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+x42NavBarNav_DropDown.addClass('open')
+endeval
+click #btnCreateSubsite
+set .txtManageSubsiteName newsubsitename
+clickJ .redTest //click red button
+clickText jump
+clickText test 2
+log test
+set #txtArea set the text
+set #txtArea; set the text ~use semi colon to delinate args
+set #txtArea |set the text ~use pika to delinate args
+alert new alert
+logNow sdfsdf
+logNext sdfsdfsdf
+log sdfsdfsdfsdfsdf
+wait 2 //wait 2 seoncds
+/*
+block comment
+*/
+--comment
+~some message alert //alias for log
+--fxdone: window.popups.closeAll();
\ No newline at end of file
Index: mp/testingFramework2/tests.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/tests.js	(revision )
+++ mp/testingFramework2/tests.js	(revision )
@@ -0,0 +1,1399 @@
+/**
+ * Created by user2 on 2/13/16.
+ */
+//debugger
+window.tests.loaded = true;
+window.testHelper.defaults.timeout = 5;
+window.testHelper.defaults.timeout = 30;
+/*
+ window.testHelper.defaults.fxPre = [
+ ro.ensureWeHaveX
+ ]
+ */
+
+//test2.html?runTest=true&testName=rHome
+//http://10.211.55.4:33031/index.html?runTest=true&testName=rHome#
+
+function testStackingDemo2() {
+// return
+    window.tests.rHome = function defineTestA(tH) {
+        var t = tH.createNewTest();
+
+        function searchDialogClose() {
+            tH.clickJ('#dialogSearch .closebtn')
+        }
+
+        tH.click('test 2');
+        tH.log('test 2')
+        searchDialogClose(); //just in case
+        tH.run(function addSearchText(){
+            $('#search').val('Test Started ')
+        })
+        tH.desc('waiting for task page to load')
+        tH.waitFor(function(){
+            return $('.media-num').length > 10;
+            t.data.mediaFiles = $('.media-num').length
+        } )
+        tH.desc('click to get more b uttons')
+        tH.clickJ('#btnMore');
+        tH.wait(1)
+        tH.desc('verify more buttons created')
+        tH.run(function addSearchText(){
+            t.data.mediaFiles2 = $('.media-num').length;
+            if ( t.data.mediaFiles2 <= t.data.mediaFiles ) {
+                tH.fail();
+            }
+        })
+        tH.run(function addSearchText(){
+            $('#search').val('yyy ... ')
+            //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
+            var e = jQuery.Event("keypress");
+            e.which = 13; //choose the one you want
+            e.keyCode = 13;
+            e.charCode = 13;
+            $('#search').trigger(e)
+        })
+
+        tH.run(function addSearchText(){
+            $('#search').val('yyy ... ')
+            //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
+            var e = jQuery.Event("keypress");
+            e.which = 13; //choose the one you want
+            e.keyCode = 13;
+            e.charCode = 13;
+            $('#search').trigger(e)
+        });
+
+        tH.desc('try search isDialogVisible')
+        tH.waitFor(function isDialogVisible(){
+            return $("#dialogSearch").is(":visible")
+        });
+        tH.desc('try search once');
+        //tH.wait(3); //wait for results to come back
+        tH.waitFor(function verifyNoSearchResults(){
+            if ( $('.search-result').length == 0 )
+                return true;
+
+            if ( $('.search-result').length == 1 &&
+                $('.search-result').text().indexOf('00') != -1  )
+                return true;
+            return false
+        });
+        tH.desc('try search again')
+        tH.clickJ('#dialogSearch .closebtn')
+
+        tH.waitForHide( "#listing");
+
+        function performSearch(query) {
+            tH.run(function addSearchText(){
+                query = sh.dv(query)
+                $('#search').val(query)
+                var e = jQuery.Event("keypress");
+                e.which = 13; //choose the one you want
+                e.keyCode = 13;
+                e.charCode = 13
+                $('#search').trigger(e)
+            });
+        }
+
+        performSearch();
+
+
+
+
+        //tH.enter();
+        tH.waitForShow( "#dialogSearch" );
+
+        tH.moreThanX( '.search-result', 0 );
+        tH.wait(1);
+        tH.clickOne( '.search-result', 0 );
+        tH.wait(1);
+        tH.desc('expect the error container to show')
+        tH.waitForShow( '#containerError')
+
+        tH.clickJ('.video-wrapper .closebtn')
+        tH.desc('hide the error container')
+        tH.waitForHide( '#containerError')
+
+        tH.desc('seach again')
+        performSearch();
+        tH.waitForShow( "#dialogSearch" );
+        tH.moreThanX( '.result', 0 );
+        tH.wait(1);
+
+        //tH.clickOne( '.result', -2*-1 );
+        tH.clickOne( '.result', 4 );
+        tH.desc('playing vid')
+
+        tH.waitForShow( '#videoplayer')
+
+        tH.verifyHidden( '#containerError');
+        tH.wait(3);
+        tH.run(function verifyPlayer(){
+            var vp = videojs('#videoplayer');
+            vp.src() //verify source
+            t.data.currentTime = vp.currentTime();
+        });
+
+
+
+        tH.wait(2);
+        tH.verify(function verifyPlayer(){
+            var vp = videojs('#videoplayer');
+            vp.src() //verify source
+            return t.data.currentTime < vp.currentTime();
+        });
+        tH.wait(1)
+        tH.clickJ('.vjs-play-control.vjs-control.vjs-playing')
+        tH.run(function pausePlayerWithClick(){
+            var vp = videojs('#videoplayer');
+            t.data.currentTime = vp.currentTime();
+        });
+        tH.wait(1)
+        tH.desc('ensure player is paused... ')
+        tH.verify(function pausePlayerWithClick(){
+            var vp = videojs('#videoplayer');
+            return t.data.currentTime == vp.currentTime();
+        });
+
+
+        tH.wait(1)
+        tH.clickJ('.video-wrapper .closebtn')
+        // tH.waitForHide( '#videoplayer')
+        tH.wait(1)
+        tH.clickJ('#dialogSearch > .closebtn')
+        //Next Steps ... login and account page test
+        tH.desc('dialogSearch vid')
+        tH.wait(3)
+        //test payment
+        tH.waitForHide( "#dialogSearch" )
+
+        tH.log('test 2')
+        /*tH.run(function(){
+         alert('ran test 2')
+         })*/
+    }
+
+
+
+}
+testStackingDemo2();
+
+
+
+function defineRo() {
+    function RO() {
+        var p = RO.prototype;
+        p = this;
+        var self = this;
+        p.init = function init(url, appCode) {
+        };
+
+        p.goHome = function goHome(tH) {
+            tH.addSync(function (){
+                gUtils.setLocationHash('')
+            })
+            tH.wait(1)
+            tH.waitForShow('#taskPageArea');
+        }
+        p.home = p.goHome
+
+        p.goList = function goList(tH) {
+            tH.addSync(function (){
+                gUtils.setLocationHash('searchListDialog')
+            })
+            tH.wait(1)
+            tH.waitForShow('#dialogLists');
+        }
+
+        p.goWatch = function goWatch(arg) {
+        }
+        p.goSearch = function goSearch(arg) {
+        }
+        p.goAccount = function goToAccount(arg) {
+        }
+        p.goContact = function goContact(arg) {
+        }
+        p.goLogout = function goLogout(arg) {
+        }
+
+        p.goWatchItem = function goLogout(arg) {
+        }
+
+        p.goWatchItem = function goLogout(arg) {
+        }
+
+        function defineCreditStuff() {
+            //why: chains as loop pairs
+
+            p.getFiles = function getFiles(tH, fxDone, noTest) {
+                if ( noTest ) {
+                    getFiles2(true)
+                    return;
+                }
+
+
+                function getFiles2(){
+                    window.serverHelper.getDefaultData(verifyUserC);
+                    function verifyUserC(data) {
+
+                        tH.data.files = data.nono;
+                        //verified();
+                        //debugger
+                        callIfDefined(fxDone)
+                        if ( noTest != true)
+                            tH.test.cb();
+                    }
+                    return;
+                }
+
+                tH.add(getFiles2);
+            };
+
+
+            p.ensureWeHaveX = function ensureWeHaveX(tH) {
+                tH.add(function checkFIFilesReady(){
+                    if ( tH.data.files ){
+                        tH.test.cb();
+                        return
+                    }
+
+                    ro.getFiles(tH, tH.test.cb, true );
+
+                })
+            }
+
+            p.setCreditsTo = function setCreditsTo(tH, creditCount, fxDone) {
+                tH.add(function setCreditRemote(){
+                    tH2.resetCreditCount(creditCount, verifyCount);
+                    function verifyCount() {
+                        window.serverHelper.getUserInfo(verifyUserC);
+                        function verifyUserC() {
+                            var didCreditMatchUP = window.serverHelper.data.user.credits == creditCount;
+                            tH.assert(didCreditMatchUP, 'Credits did not match up');
+                            //verified();
+                            callIfDefined(fxDone)
+                            tH.test.cb();
+                        }
+                    }
+                    return;
+                })
+            };
+
+            p.setAutoPlayTo = function setAutoPlayTo(tH, autoPlayENabled, fxDone) {
+                tH.add(function setCreditRemote(){
+                    tH2.setAutoplay(autoPlayENabled, verifyCount);
+                    function verifyCount() {
+                        callIfDefined(fxDone)
+                        tH.test.cb();
+                    }
+                    return;
+                })
+            };
+            p.whatIsAutoplay = function whatIsAutoplay(tH, fxDone) {
+                tH.add(function setCreditRemote(){
+                    var val = tH2.hasAutoplay();
+                    console.log('val', val)
+                    callIfDefined(fxDone)
+                    tH.test.cb();
+
+                })
+            };
+
+            p.setCreditsToX = function setCreditsTo(tH, creditCount, fxDone) {
+                tH.add(function setCreditRemote(){
+                    tH2.resetCreditCount(creditCount, verifyCount);
+                    function verifyCount() {
+                        window.serverHelper.getUserInfo(verifyUserC);
+                        function verifyUserC() {
+                            var didCreditMatchUP = window.serverHelper.data.user.credits == creditCount;
+                            tH.assert(didCreditMatchUP, 'Credits did not match up');
+                            //verified();
+                            callIfDefined(fxDone)
+                            tH.test.cb();
+                        }
+                    }
+                    return;
+                })
+            };
+
+
+            p.verifyCreditCount = function verifyCreditCount(tH, creditCount, fxDone, negate) {
+                tH.add(function setCreditRemote(){
+                    window.serverHelper.getUserInfo(verifyUserC);
+                    function verifyUserC() {
+                        var userCreditCount = window.serverHelper.data.user.credits;
+                        var didCreditMatchUP = userCreditCount == creditCount;
+                        if ( negate != true ) {
+                            tH.assert(didCreditMatchUP, 'Credits did not match up', creditCount, '!=', userCreditCount);
+                        } else {
+                            tH.assert(!didCreditMatchUP, 'Credits  not match up', creditCount, '==', userCreditCount);
+                        }
+
+                        callIfDefined(fxDone)
+                        tH.test.cb();
+                    }
+                })
+            };
+
+
+            p.clearUsersCredits = function clearUsersCredits(tH, creditCount, fxDone) {
+                tH.add(function clearUsersCredits_Remote(){
+                    tH2.clearCredits(onCreditsCleared);
+                    function onCreditsCleared(data) {
+                        window.serverHelper.getUserInfo(verifyUserC);
+                        function verifyUserC() {
+                            // var didCreditMatchUP = window.serverHelper.data.user.credits == creditCount;
+                            // tH.assert(didCreditMatchUP, 'Credits did not match up');
+                            //verified();
+                            callIfDefined(fxDone)
+                            tH.test.cb();
+                        }
+                    }
+                    return;
+                })
+            };
+
+            p.useCredit = function useCredit(tH, file, fxDone, cannotUse) {
+                tH.add(function useCreditRemote(){
+                    if ( file == null || file == '') {
+                        file = tH.data.files.fileTestVideo
+                    }
+                    window.serverHelper.useCredit(file, verifyWa)
+                    // tH2.resetCreditCount(file, verifyCount);
+                    function verifyWa(data) {
+                        // window.serverHelper.getUserInfo(verifyUserC);
+                        //debugger;
+                        if ( cannotUse != true ) {
+                            var couldusreCredit = data.error == null;
+                            tH.assert( couldusreCredit, 'Could not use credit');
+                        } else {
+                            var cannotUseCredit = data.error != null;
+                            tH.assert( cannotUseCredit, 'Could use credit, user not supposed to');
+                        }
+                        callIfDefined(fxDone)
+                        tH.test.cb();
+                    }
+                    return;
+                })
+            };
+
+            p.canNotUseCredit = function canNotUseCredit(tH, file, fxDone) {
+                p.useCredit(tH, file, fxDone, true)
+            };
+
+
+
+
+
+
+            p.canWatchVideo = function canWatchVideo(tH, file, cannotWatch, fxDone) {
+                tH.add(function canWatchVideoRemote(){
+                    if( file == null ) {
+                        file = tH.data.files.fileTestVidShooter+'?random='+Math.random()
+                    }
+                    if ( file == null ) {
+                        file = tH.data.files.fileTestVideo
+                    }
+                    window.serverHelper.watchShow(file, onCheckWatchabilityOfFile, 50);
+                    function onCheckWatchabilityOfFile(result) {
+                        // window.serverHelper.getUserInfo(verifyContent);
+                        // function verifyContent() {
+                        if (cannotWatch) {
+                            //console.error(result)
+                            if ( result.responseText == null )
+                            {
+                                tH.assert(false, 'Could watch content', file);
+
+                            }
+                            result.responseText
+                                .includes('could not get credit');
+                            var failed = result.status.toString().slice(0,1) == ('4') //404 400
+                            //
+                            tH.assert(failed, 'Could watch content', file, result);
+                        } else {
+                            tH.assert( ! result.responseText
+                                .includes('could not get credit'), 'Could not watch conent', file , result);;
+                            // var didCreditMatchUP = $.isString(result) == false;
+                            // tH.assert(didCreditMatchUP, 'Coudl watch conent');
+                        }
+                        //verified();
+                        callIfDefined(fxDone)
+                        tH.test.cb();
+                        // }
+                    }
+                    return;
+                })
+            };
+
+            p.canNotWatchVideo = function canNotWatchVideo(tH, file, fxDone) {
+                p.canWatchVideo(tH, file, true, fxDone)
+            };
+
+        }
+        defineCreditStuff();
+
+        p.searchHomePageSet = function searchHomePageSet(tH) {
+            tH.clickJ('#header-home');
+            tH.waitForShow('#taskPageArea');
+            tH.run(function addSearchText(){
+                $('#search').val('Test Started ')
+            })
+            tH.desc('waiting for task page to load')
+
+            tH.wait(0.5)
+
+
+            tH.run(function addSearchText(){
+                $('#search').val('Test Started ')
+            })
+            tH.desc('waiting for task page to load');
+            tH.waitFor(function(){
+                return $('.media-num').length > 10;
+                t.data.mediaFiles = $('.media-num').length
+            } )
+            tH.desc('click to get more b uttons');
+            tH.clickJ('#btnMore');
+            tH.wait(1);
+            tH.desc('verify more buttons created');
+            tH.run(function addSearchText(){
+                tH.data.mediaFiles2 = $('.media-num').length;
+                if ( tH.data.mediaFiles2 <= tH.data.mediaFiles ) {
+                    tH.fail();
+                }
+            });
+
+            ro.searchHomePage(tH, 'yyy ....');
+
+            tH.desc('try search isDialogVisible');
+            tH.waitFor(function isDialogVisible(){
+                return $("#dialogSearch").is(":visible")
+            });
+            tH.desc('try search once');
+            //tH.wait(3); //wait for results to come back
+            tH.waitFor(function verifyNoSearchResults(){
+                if ( $('.search-result').length == 0 ) {
+                    return true;
+                }
+
+                if ( $('.search-result').length == 1 &&
+                    $('.search-result').text().indexOf('00') != -1  )
+                    return true;
+                return false
+            });
+            tH.desc('try search again');
+            tH.clickJ('#dialogSearch .closebtn');
+            tH.waitForHide( "#listing");
+
+            ro.searchHomePage(tH, '');
+
+            tH.waitForShow( "#dialogSearch" );
+
+            tH.moreThanX( '.search-result', 0 );
+            tH.wait(1);
+            tH.clickOne( '.search-result', 0 );
+            tH.wait(1);
+            tH.desc('expect the error container to show')
+            tH.waitForShow( '#containerError')
+
+            tH.clickJ('.video-wrapper .closebtn')
+            tH.desc('hide the error container')
+            tH.waitForHide( '#containerError')
+
+            tH.desc('seach again')
+            ro.searchHomePage(tH, '');
+            tH.waitForShow( "#dialogSearch" );
+            tH.moreThanX( '.result', 0 );
+            tH.wait(1);
+        }
+
+        p.searchHomePage = function searchHomePage(tH, text) {
+            tH.run(function addSearchText(){
+                var txtInput =  $('#search');
+                txtInput.val('yyy ... ');
+                tH.moveCursorTo(txtInput);
+                //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
+                var e = jQuery.Event("keypress");
+                var e = jQuery.Event("keydown");
+                e.which = 13; //choose the one you want
+                e.keyCode = 13;
+                e.charCode = 13;
+                txtInput.trigger(e)
+            });
+        };
+
+
+        p.searchDialogClose =  function searchDialogClose(tH) {
+            tH.clickJ('#dialogSearch .closebtn')
+        }
+
+
+
+        p.isCreditDialogUp = function isCreditDialogUp(tH, msg) {
+            msg = dv(msg, '')
+            tH.waitForShow('#creditDialog', 'did not see the credit dialog ' + msg);
+
+        }
+
+        p.isCreditDialogClosed = function isCreditDialogUp(tH, msg) {
+            msg = dv(msg, '')
+            tH.waitForHide('#creditDialog', 'did not hide the credit dialog ' + msg);
+        }
+
+
+        p.creditDialogOk = function creditDialogOk(tH) {
+            tH.waitForShow('#creditDialog', 'cant click to watch b/c video is here, but video palyer did not show');
+            tH.clickJ('#cd_btnOK');
+        }
+
+
+
+
+        p.clickWatchIt = function clickWatchIt(tH) {
+            tH.waitForShow('#creditDialog', 'cant click to watch b/c video is here, but video palyer did not show');
+            tH.click('#cd-usecredit');
+        }
+
+
+
+
+        p.videoIsPlaying = function videoIsPlaying(tH) {
+            tH.wait(0.5)
+            tH.addSync(function storeTime(){
+                tH.data.playheadTime = vp.currentTime();
+            })
+            tH.wait(1.5)
+            tH.addSync(function storeTime(){
+                var furtherAlong = tH.data.playheadTime > vp.currentTime()
+                tH.assert(furtherAlong, 'Videl player not movingvp.')
+                tH.assert(vp.paused()==false, 'Videl player not movingvp.')
+            })
+        }
+
+
+
+
+
+        p.watchVid = function watchVid(tH, file, cannotWatch, fxDone) {
+
+            ro.ensureWeHaveX(tH)
+            tH.add(function goToVid(){
+                if( file == null ) {
+                    file = tH.data.files.fileTestVidShooter+'?random='+Math.random()
+                }
+                file = file+'?random='+Math.random()
+
+                window.serverHelper.utils.playMedia(file)
+                //showVideoPlayer(file);
+                tH.test.cb()
+            })
+
+            tH.waitForShow('#videoplayer', 'when to video state, but video palyer did not show');
+            tH.add(function playVid(){
+                vp.currentTime(0);
+                vp.play();
+                tH.test.cb()
+            })
+            return;
+            //self.go
+            tH.add(function canWatchVideoRemote(){
+                if ( file == null ) {
+                    file = tH.data.files.fileTestVideo
+                }
+                window.serverHelper.watchShow(file, verifyCount, 50);
+                function verifyCount(result) {
+                    // window.serverHelper.getUserInfo(verifyContent);
+                    // function verifyContent() {
+                    if ( cannotWatch ) {
+                        //
+                    }
+                    var didCreditMatchUP = $.isString(result) == false ;
+                    tH.assert(didCreditMatchUP, 'Coudl watch conent');
+                    //verified();
+                    callIfDefined(fxDone)
+                    tH.test.cb();
+                    // }
+                }
+                return;
+            })
+        };
+
+        function defineCreditDialogStuff() {
+            var ro = self;
+            ro.cd = {}
+            ro.cd.hasXCredits = function hasXCredits(tH, creditCount) {
+                ro.cd.waitForDialog(tH)
+                tH.addAttrTest('#txtCreditCount', 'creditCount', creditCount,
+                    'Credit count did not match' + creditCount)
+            }
+            ro.cd.canReplay = function canReplay(tH) {
+                ro.cd.waitForDialog(tH)
+                tH.waitForShow("#cd-replay", 'did not see the replay option on cd');
+            }
+            ro.cd.clickUseCredit = function clickUseCredit(tH) {
+                ro.cd.waitForDialog(tH)
+                tH.clickJ("#cd-usecredit", 'use a credit');
+            }
+            ro.cd.isAutoPlayVisible = function showingAutoplay(tH) {
+                ro.cd.waitForDialog(tH)
+                tH.waitForShow("#cd-autoplay", 'did not see the autoplay option on cd');
+            }
+            ro.cd.isAutoplayHidden = function isAutoplayHidden(tH) {
+                ro.cd.waitForDialog(tH)
+                tH.waitForHide("#cd-autoplay");
+            }
+            ro.cd.canUseCredit = function canUseCredit(tH) {
+                ro.cd.waitForDialog(tH);
+                tH.waitForShow("#cd-usecredit", 'coudl not use a credit');
+            }
+            ro.cd.canBuyMoreCredits = function canBuyMoreCredits(tH) {
+                ro.cd.waitForDialog(tH)
+                tH.waitForShow("#cd-account", 'coudl not go to moy account from cd dialog');
+            }
+            ro.cd.canNotBuyMoreCredits = function canBuyMoreCredits(tH) {
+                ro.cd.waitForDialog(tH)
+                tH.waitForHide("#cd-account", 'coudl go to moy account from cd dialog');
+            }
+
+            ro.cd.waitForDialog = function waitForDialog(tH, msg) {
+                tH.waitForShow('#creditDialog', 'did not see the credit dialog ');
+            }
+
+            ro.cd.showing = ro.cd.waitForDialog;
+
+            ro.cd.hidden = function isHiddenCreditDialog(tH, msg) {
+                tH.wait(1);
+                tH.waitForHide('#creditDialog', 'did not see the credit dialog');
+            };
+
+        }
+        defineCreditDialogStuff();
+
+        function definePlayerFx() {
+            var ro = self;
+            ro.player = {}
+            ro.player.closeDialog = function closeDialog(tH) {
+                tH.addSync(function closeDialog2(){
+                    window.creditHelper.closeCreditDialog();
+                })
+            }
+            ro.player.volume = function setvolume(tH, v) {
+                v = dv(v, 0)
+                tH.addSync(function closeDialog2(){
+                    vp.volume(v)
+                })
+
+            }
+            ro.player.watchVideoNoAutoplay = function watchRealVideoNoAutoplay() {
+                tH.log3('watchVideoNoAutoplay')
+                ro.goHome(tH);
+                ro.player.volume(tH)
+                ro.player.closeDialog(tH)
+                ro.setAutoPlayTo(tH, false)
+                ro.clearUsersCredits(tH);
+                ro.setCreditsTo(tH, 2000);
+                ro.canNotWatchVideo(tH);
+                ro.watchVid(tH);
+                ro.isCreditDialogUp(tH);
+            }
+            ro.player.watchVideoAutoplay = function watchVideoAutoplay() {
+                tH.log3('watchVideoAutoplay')
+                ro.goHome(tH);
+                ro.player.closeDialog(tH)
+                ro.setAutoPlayTo(tH, false)
+                ro.clearUsersCredits(tH);
+                ro.canNotWatchVideo(tH);
+                ro.setAutoPlayTo(tH, true)
+                ro.setCreditsTo(tH, 0);
+                ro.canNotWatchVideo(tH);
+                ro.setCreditsTo(tH, 2000);
+                ro.watchVid(tH);
+                ro.cd.hidden(tH);
+            }
+            ro.player.watchVideoAutoplayNoCredits = function watchVideoAutoplayNoCredits() {
+                tH.log3('watchVideoAutoplayNoCredits')
+                ro.goHome(tH);
+                ro.player.closeDialog(tH)
+                ro.setAutoPlayTo(tH, false)
+                ro.whatIsAutoplay(tH)
+                ro.clearUsersCredits(tH);
+                ro.canNotWatchVideo(tH);
+                ro.setAutoPlayTo(tH, true)
+                ro.whatIsAutoplay(tH)
+                ro.setCreditsTo(tH, 0);
+                ro.canNotWatchVideo(tH);
+                ro.watchVid(tH);
+                ro.cd.showing(tH, 'Buy more');
+                ro.cd.hasXCredits(tH, 0)
+                //ro.cd.canReplay(tH)
+                ro.cd.canBuyMoreCredits(tH);
+
+            }
+
+            ro.player.watchVideoNoCreditsNoAutoplay = function watchVideoNoCreditsNoAutoplay() {
+                tH.log3('watchVideoNoCreditsNoAutoplay')
+                ro.goHome(tH);
+                ro.player.closeDialog(tH)
+                ro.setAutoPlayTo(tH, false)
+                ro.whatIsAutoplay(tH)
+                ro.clearUsersCredits(tH);
+                ro.setCreditsTo(tH, 0);
+                ro.canNotWatchVideo(tH);
+                ro.watchVid(tH);
+                ro.isCreditDialogUp(tH);
+                ro.cd.hasXCredits(tH, 0)
+                //ro.cd.canReplay(tH)
+                ro.cd.canBuyMoreCredits(tH);
+            }
+
+
+            ro.player.watchBadVideo = function watchBadVideo() {
+                tH.log3('watchBadVideo')
+                ro.goHome(tH);
+                ro.player.closeDialog(tH)
+                var badFile = 'asdf44442';
+
+                ro.canNotWatchVideo(tH, badFile);
+                ro.watchVid(tH, badFile);
+                ro.isCreditDialogUp(tH, 'Error');
+                ro.cd.canNotBuyMoreCredits(tH);
+                ro.creditDialogOk(tH);
+                ro.isCreditDialogClosed(tH, 'Error');
+            }
+
+            ro.player.watchVideo = function watchVideo() {
+                tH.log3('watchVideo')
+                ro.goHome(tH);
+                ro.player.closeDialog(tH)
+                ro.setAutoPlayTo(tH, false);
+                ro.whatIsAutoplay(tH)
+                ro.clearUsersCredits(tH);
+                ro.setCreditsTo(tH, 1);
+                ro.canNotWatchVideo(tH);
+                ro.watchVid(tH);
+                ro.isCreditDialogUp(tH);
+                ro.cd.hasXCredits(tH, 1)
+                // tH.log3('what?')
+                ro.cd.clickUseCredit(tH)
+                ro.cd.hidden(tH);
+
+                ro.player.isPlaying(tH)
+                //ro.cd.canReplay(tH)
+            };
+
+            p.player.isPlaying = function isPlaying(tH) {
+                tH.wait(0.1)
+                tH.desc('ensure player is paused... ')
+                tH.verify(function pausePlayerWithClick(){
+                    //var vp = videojs('#videoplayer');
+                    return vp.paused() == false;
+                });
+            }
+        }
+        definePlayerFx();
+
+        p.proc = function debugLogger() {
+            if ( self.silent == true) {
+                return
+            }
+            sh.sLog(arguments)
+        }
+    }
+    var ro = new RO();
+
+    ro.urls = {};
+    ro.urls.file1 = ''
+    window.ro = ro;
+}
+defineRo();
+
+
+
+
+function defineListerHelper() {
+    function ListHelper() {
+        var p = ListHelper.prototype;
+        p = this;
+        var self = this;
+        self.data = {};
+
+        p.init = function init(url, appCode) {
+        };
+        p.configureListHelper = function configureListHelper(
+            listId, btnClear, btnMore, txtSearch) {
+            self.data.listId    = listId;
+            self.data.btnClear  = btnClear;
+            self.data.btnMore   = btnMore;
+            self.data.txtSearch = txtSearch;
+        };
+
+        p.waitForList = function waitForList(tH) {
+            tH.waitForShow(self.data.listId);
+        }
+        p.clearList = function clearList(tH) {
+            tH.clickJ(self.data.btnClear)
+        }
+        p.getMoreListItems = function getMoreListItems(tH) {
+            tH.clickJ(self.data.btnMore)
+        }
+        p.verifySizeOfList = function verifySizeOfList(tH, verifySize) {
+            tH.wait(0.5);
+            tH.addSync(function (){
+                var list = $(self.data.listId);
+                if ( self.data.listId == null || self.data.listId == '' ) {
+                    tH.assert(false, 'do not have a listId')
+                }
+                var size = list.find('li');
+               // console.log('what is this? ')
+                var listItemsCount = size.length;
+                if (verifySize == null ) {
+                    tH.log('size of list', self.data.listId, listItemsCount);
+                } else {
+                    if ( $.isFunction(verifySize)) {
+                        var sizeTheSame = verifySize(listItemsCount);
+                        tH.assert(sizeTheSame, 'fx failed were not the same', listItemsCount, '!=', verifySize.name)
+                    }else {
+                        var sizeTheSame = listItemsCount == verifySize;
+                        tH.assert(sizeTheSame, 'sizes were not the same', listItemsCount, '!=', verifySize);
+                    }
+                }
+                tH.data.lastSizeOfList = listItemsCount;
+            })
+            tH.wait(0.5)
+        }
+        p.verifySizeOfList_MoreThan = function verifySizeOfList_MoreThan(tH, moreThanVerifySize, msg) {
+            self.verifySizeOfList(tH, function verifySizeMotherThan(size) {
+                tH.assert(size>moreThanVerifySize, 'Too small', size, '! >', moreThanVerifySize, msg)
+            })
+        }
+        p.verifySizeOfList_MoreThanLastTime = function verifySizeOfList_MoreThanLastTime(tH, moreThanVerifySize, msg) {
+            self.verifySizeOfList(tH, function verifySizeMotherThan(size) {
+                tH.assert(size> tH.data.lastSizeOfList, 'Too small', size, '! >',  tH.data.lastSizeOfList, msg)
+            })
+        }
+        p.verifySizeOfList_FewerThanLastTime = function verifySizeOfList_FewerThanLastTime(tH, moreThanVerifySize, msg) {
+            self.verifySizeOfList(tH, function verifySizeFewerThanThan(size) {
+                tH.assert(size <  tH.data.lastSizeOfList, 'Too large', size, '! <',  tH.data.lastSizeOfList, msg)
+            })
+        }
+        p.searchListByText = function searchListByText(tH,text) {
+            // tH.addSync(function (){
+            tH.trace('set text to', self.data.txtSearch, text)
+            tH.setItem(self.data.txtSearch, text)
+            tH.pressEnter(self.data.txtSearch )
+            tH.wait(1)
+            //})
+        }
+
+        p.clickListItem = function clickListItem(tH, index) {
+            tH.wait(0.5);
+            tH.addSync(function (){
+                var list = $(self.data.listId);
+                var size = list.find('li');
+                var ui = size[index];
+                var ui = $(ui)
+                var link = ui.find('a');
+                tH.clickNow(link)
+            })
+            tH.wait(0.5)
+        }
+        p.verifyAt = function verifyAt(tH, id) {
+            tH.waitForShow(self.data.nextPageAfterClick);
+        }
+        p.proc = function debugLogger() {
+            if ( self.silent == true) {
+                return
+            }
+            sh.sLog(arguments)
+        }
+    }
+    var lH = new ListHelper();
+    window.lH = lH;
+    window.ListHelper = ListHelper;
+}
+defineListerHelper();
+
+
+
+
+
+
+function testSmoke() {
+    var test = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.log('test 2')
+        //tH.click('home');
+        tH.wait(0.5)
+
+        tH.clickJ('#header-home');
+        tH.waitForShow('#taskPageArea');
+
+        tH.wait(0.5)
+
+        tH.clickJ('#header-list');
+        tH.waitForShow('#loadingPlayistSearchHolder');
+
+        tH.wait(0.5)
+
+        tH.clickJ('#header-search');
+        tH.waitForShow('.search-results-header');
+
+        tH.wait(0.5)
+
+        tH.clickJ('#header-account');
+        tH.waitForShow('#txtAccountHeader');
+
+        tH.wait(0.5)
+
+        tH.clickJ('#header-contact');
+        tH.waitForShow('#txtContactHeader');
+
+        //  tH.desc('try search again')
+        //   tH.clickJ('#dialogSearch .closebtn')
+        tH.log('test 2')
+
+    }
+    test.desc = 'Touch Every Screen'
+    window.tests.rSmoke = test;
+
+
+    var test = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.log('test 2')
+        //tH.click('home');
+        tH.wait(0.5)
+
+        // tH.setTestTimeout(1)
+        // tH.testHoldUpForever(tH);
+
+        ro.getFiles(tH)
+        ro.clearUsersCredits(tH)
+        ro.setCreditsTo(tH, 0)
+        //ro.useCredit(tH, ro.urls.file1)
+        ro.canNotUseCredit(tH, ro.urls.file1)
+        ro.canNotWatchVideo(tH, ro.urls.file1)
+
+        ro.setCreditsTo(tH, 2000)
+        ro.useCredit(tH, ro.urls.file1)
+        ro.verifyCreditCount(tH, 1999)
+        ro.canNotUseCredit(tH, 'asdf')
+        ro.verifyCreditCount(tH, 1998, null,  true)
+        ro.verifyCreditCount(tH, 1999)
+
+        ro.canWatchVideo(tH, ro.urls.file1)
+        ro.clearUsersCredits(tH)
+
+        ro.canNotWatchVideo(tH, ro.urls.file1)
+        /*
+         set credits to 0
+         fail to use crite
+         set credits to 2000
+         use  1 credit
+         try watch video 
+         remove all credits 
+         can't watch video 
+         confirm credits set to 1999
+         */
+    }
+    test.desc = 'Test Paying stuff'
+    window.tests.rPay = test;
+
+
+    var test = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.log('test 2')
+        //tH.click('home');
+        tH.wait(0.5)
+
+        ro.searchHomePageSet(tH);
+
+        return;
+
+
+        tH.clickJ('#header-list');
+        tH.waitForShow('#loadingPlayistSearchHolder');
+
+        tH.wait(0.5)
+
+        tH.clickJ('#header-search');
+        tH.waitForShow('.search-results-header');
+
+        tH.wait(0.5)
+
+        tH.clickJ('#header-account');
+        tH.waitForShow('#txtAccountHeader');
+
+        tH.wait(0.5)
+
+        tH.clickJ('#header-contact');
+        tH.waitForShow('#txtContactHeader');
+
+        //  tH.desc('try search again')
+        //   tH.clickJ('#dialogSearch .closebtn')
+        tH.log('test 2')
+
+    }
+    test.desc = 'Touch Every Screen Hard'
+    window.tests.rSmoke2 = test;
+
+
+    var test = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.log(defineTestA.name);
+
+        ro.ensureWeHaveX(tH)
+
+        //tH.click('home');
+        tH.wait(0.5)
+        ro.goHome(tH);
+
+
+        ro.player.watchVideoNoAutoplay()
+        ro.player.watchVideo();
+        ro.player.watchBadVideo()
+        ro.player.watchVideo();
+        ro.player.watchVideoNoCreditsNoAutoplay()
+        ro.player.watchVideo();
+        ro.player.watchVideoAutoplay()
+        ro.player.watchVideo();
+        ro.player.watchVideoAutoplayNoCredits()
+        ro.player.watchVideo();
+
+
+        return;
+
+        //ro.searchHomePageSet(tH);
+        ro.clickWatchIt(tH);
+        ro.videoIsPlaying(tH);
+
+        return;
+    }
+    test.desc = 'Test Credit Dialog'
+    window.tests.rCreditDialog = test;
+
+
+
+
+    var test = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.log(defineTestA.name);
+
+        ro.ensureWeHaveX(tH)
+
+        //tH.click('home');
+        tH.wait(0.5)
+        ro.goHome(tH);
+
+        ro.goList(tH);
+        //  return;
+
+        var lH = new window.ListHelper()
+
+
+        var listId    = '#dialogSearchLists_list';
+        var btnClear  = '#dialogSearchLists_btnClear';
+        var btnMore   = '#dialogSearchLists_btnMoreLoadingHolder';
+        var txtSearch = '#txtSearchLists';
+        lH.configureListHelper(listId, btnClear, btnMore, txtSearch)
+
+        lH.clearList(tH)
+
+        lH.verifySizeOfList(tH)
+        lH.verifySizeOfList(tH,0)
+        lH.searchListByText(tH, 'yyy$s')
+
+        lH.verifySizeOfList(tH,0)
+
+        lH.searchListByText(tH, '')
+
+        lH.verifySizeOfList_MoreThan(tH,0, 'did not perform valid search')
+
+        lH.getMoreListItems(tH)
+
+        lH.verifySizeOfList_MoreThanLastTime(tH,0)
+
+        lH.clickListItem(tH, 3)
+        lH.data.nextPageAfterClick = '#view-content-list';
+        lH.verifyAt(tH)
+
+        tH.wait(1);
+        tH.logNext('finished testing main list')
+
+        var lH2 = new window.ListHelper()
+        var listId    = '#view-content-list';
+        var btnClear  = '#dialogSearchLists_btnClear';
+        var btnMore   = '#dialogSearchLists_btnMoreLoadingHolder';
+        var txtSearch = '#txtContentListsDialog';
+        lH2.configureListHelper(listId, btnClear, btnMore, txtSearch)
+        lH2.searchListByText(tH, ' ')
+        lH2.verifySizeOfList_MoreThan(tH,3)
+        lH2.verifySizeOfList(tH)
+        lH2.searchListByText(tH, 'ee')
+        lH2.verifySizeOfList_FewerThanLastTime(tH,0)
+        lH2.searchListByText(tH, '')
+        lH2.verifySizeOfList_MoreThanLastTime(tH,0)
+        lH2.searchListByText(tH, 'e#$^%#,,,e')
+        lH2.verifySizeOfList_FewerThanLastTime(tH,0)
+        lH2.verifySizeOfList(tH,0, 'has more than 0 items for bad search result')
+        return
+
+        ro.player.watchVideoNoAutoplay()
+        ro.player.watchVideo();
+        ro.player.watchBadVideo()
+        ro.player.watchVideo();
+        ro.player.watchVideoNoCreditsNoAutoplay()
+        ro.player.watchVideo();
+        ro.player.watchVideoAutoplay()
+        ro.player.watchVideo();
+        ro.player.watchVideoAutoplayNoCredits()
+        ro.player.watchVideo();
+
+
+        return;
+
+        //ro.searchHomePageSet(tH);
+        ro.clickWatchIt(tH);
+        ro.videoIsPlaying(tH);
+
+        return;
+    }
+    test.desc = 'Test Lists Dialog'
+    window.tests.rLists = test;
+}
+testSmoke();
+
+
+
+
+/**
+ * Created by user2 on 2/13/16.
+ */
+//test2.html?runTest=true&testName=rHome
+//http://10.211.55.4:33031/login.html?runTest=true&testName=rLogin&redirectrunTest=true&redirecttestName=rHome#
+function testLogin() {
+    window.tests.rLogin = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.log('Starting login test')
+        tH.waitForShow('#loginPasswordMain')
+        tH.set('#loginUsernameMain', 'admin');
+        tH.set('#loginPasswordMain', 'password');
+        tH.nextTest('rHome', 'index.html')
+        tH.clickJ('#btnLogin')
+
+        return;
+        function searchDialogClose() {
+            tH.clickJ('#dialogSearch .closebtn')
+        }
+
+        tH.click('test 2');
+        tH.log('test 2')
+        searchDialogClose(); //just in case
+        tH.run(function addSearchText(){
+            $('#search').val('Test Started ')
+        })
+        tH.desc('waiting for task page to load')
+        tH.waitFor(function(){
+            return $('.media-num').length > 10;
+            t.data.mediaFiles = $('.media-num').length
+        } )
+        tH.desc('click to get more buttons')
+        tH.clickJ('#btnMore');
+        tH.wait(1)
+        tH.desc('verify more buttons created')
+        tH.run(function addSearchText(){
+            t.data.mediaFiles2 = $('.media-num').length;
+            if ( t.data.mediaFiles2 <= t.data.mediaFiles ) {
+                tH.fail();
+            }
+        })
+        tH.run(function addSearchText(){
+            $('#search').val('yyy ... ')
+            //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
+            var e = jQuery.Event("keypress");
+            e.which = 13; //choose the one you want
+            e.keyCode = 13;
+            $('#search').trigger(e)
+        })
+
+        tH.run(function addSearchText(){
+            $('#search').val('yyy ... ')
+            //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
+            var e = jQuery.Event("keypress");
+            e.which = 13; //choose the one you want
+            e.keyCode = 13;
+            $('#search').trigger(e)
+        });
+
+        tH.waitFor(function isDialogVisible(){
+            return $("#dialogSearch").is(":visible")
+        });
+        tH.verify(function verifyNoSearchResults(){
+            if ( $('.search-result').length == 0 )
+                return true;
+
+            if ( $('.search-result').length == 1 &&
+                $('.search-result').text().indexOf('00') != -1  )
+                return true;
+            return false
+        });
+        tH.desc('try search again')
+        tH.clickJ('#dialogSearch .closebtn')
+
+        tH.waitForHide( "#listing");
+
+        function performSearch(query) {
+            tH.run(function addSearchText(){
+                query = sh.dv(query)
+                $('#search').val(query)
+                var e = jQuery.Event("keypress");
+                e.which = 13; //choose the one you want
+                e.keyCode = 13;
+                $('#search').trigger(e)
+            });
+        }
+
+        performSearch();
+
+        //tH.enter();
+        tH.waitForShow( "#dialogSearch" );
+
+        tH.moreThanX( '.search-result', 0 );
+        tH.clickOne( '.search-result', 0 );
+        tH.desc('expect the error container to show')
+        tH.waitForShow( '#containerError')
+        tH.clickJ('.video-wrapper .closebtn')
+        tH.waitForHide( '#containerError')
+
+        performSearch();
+        tH.waitForShow( "#dialogSearch" );
+        tH.moreThanX( '.result', 0 );
+        tH.clickOne( '.result', -2 );
+        tH.waitForShow( '#videoplayer')
+        tH.verifyHidden( '#containerError');
+        tH.wait(3);
+        tH.run(function verifyPlayer(){
+            var vp = videojs('#videoplayer');
+            vp.src() //verify source
+            t.data.currentTime = vp.currentTime();
+        });
+        tH.wait(2);
+        tH.verify(function verifyPlayer(){
+            var vp = videojs('#videoplayer');
+            vp.src() //verify source
+            return t.data.currentTime < vp.currentTime();
+        });
+        tH.wait(1)
+        tH.clickJ('.vjs-play-control.vjs-control.vjs-playing')
+        tH.run(function pausePlayerWithClick(){
+            var vp = videojs('#videoplayer');
+            t.data.currentTime = vp.currentTime();
+        });
+        tH.wait(1)
+        tH.desc('ensure player is paused... ')
+        tH.verify(function pausePlayerWithClick(){
+            var vp = videojs('#videoplayer');
+            return t.data.currentTime == vp.currentTime();
+        });
+
+
+        tH.wait(1)
+        tH.clickJ('.video-wrapper .closebtn')
+        // tH.waitForHide( '#videoplayer')
+
+        //Next Steps ... login and account page test
+        //test payment
+
+        tH.log('test 2')
+        /*tH.run(function(){
+         alert('ran test 2')
+         })*/
+    }
+}
+testLogin();
+
+
+//http://10.211.55.4:33031/account.html?runTest=true&testName=rAccount
+function testAccount() {
+    window.tests.rAccount = function rAccount(tH) {
+        var t = tH.createNewTest();
+        tH.log('Starting account test');
+        tH.log('Starting account test...');
+        tH.waitForShow('#btc-paybtn');
+        tH.verify(function verifyUsernameSet(){
+            var isUsernameSet = $('.js-accountname').html() != '';
+            return isUsernameSet;
+        });
+        //tH.nextTest('rLogout', 'index.html');
+
+    }
+}
+testAccount();
+
+
+//http://10.211.55.4:33031/account.html?runTest=true&testName=rLogout
+function testLogout() {
+    window.tests.rLogout = function rAccount(tH) {
+        var t = tH.createNewTest();
+        tH.log('Starting logout test');
+        tH.waitForShow('.js-logout');
+        /* tH.verify(function verifyUsernameSet(){
+         var isUsernameSet = $('.js-accountname').html() != ''
+         return isUsernameSet;
+         });*/
+        tH.clickJ('.js-logout');
+
+    }
+}
+testLogout();
+
+
+
+
+
+//http://10.211.55.4:33031/login.html?runTest=true&testName=rLoginExpiredUser&redirectrunTest=true&redirecttestName=rExpiredUser#
+function testExpiredUser() {
+    //login
+    //go to index
+    //verify user cannot login
+
+    window.tests.rLoginExpiredUser = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.log('Starting login test')
+        tH.waitForShow('#loginPasswordMain')
+        tH.set('#loginUsernameMain', 'markExpired');
+        tH.set('#loginPasswordMain', 'randomTask2');
+        tH.set('#loginUsernameMain', 'markExpired');
+        tH.nextTest('rLoginExpired', 'index.html')
+        //tH.wait(1)
+        tH.clickJ('#btnLogin')
+    }
+
+    window.tests.rLoginExpired = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.log('Starting login-expired test')
+        //alert('d')
+        /*
+         tH.waitForShow('#loginPasswordMain')
+         tH.set('#loginUserMain', 'markExpired');
+         tH.set('#loginPasswordMain', 'randomTask2');
+         tH.nextTest('rLoginExpired', 'index.html')
+         tH.clickJ('#btnLogin')
+         */
+
+        tH.waitFor(function(){
+            return $('.media-num').length > 10;
+            t.data.mediaFiles = $('.media-num').length
+        } )
+        tH.desc('click to get more buttons');
+        tH.clickJ('#btnMore');
+        tH.wait(1)
+        tH.desc('verify user expired');
+        tH.verify(function verifyPlayer(){
+            return window.config.expired == true
+        });
+    }
+}
+testExpiredUser();
+
+
+
Index: mp/testingFramework2/test2.reloading.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/test2.reloading.html	(revision )
+++ mp/testingFramework2/test2.reloading.html	(revision )
@@ -0,0 +1,146 @@
+<!DOCTYPE html>
+<html>
+<head>
+    <title></title>
+    <script src="jquery.js.ignore_scan" ></script>
+    <script src="../themes/minimal_v0/js/ui_utils.js" ></script>
+   <!-- <script src="js.cookie.js" ></script>-->
+    <!--
+    <script src="shelpers-mini.js" ></script>
+    <script src="PromiseHelperV3.js" ></script>
+    <script src="testFramework.js" ></script>
+    <script src="tests.js" ></script>
+    -->
+
+    <script>
+        setTimeout(function hideDiv() {
+            $('#showDiv').hide();
+        }, 500)
+        window.onRedButton = function onRedButton() {
+            console.log('ddd')
+        }
+        window.onShowDiv = function onShowDiv() {
+            console.log('onShowDiv')
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').show();
+            }, 500)
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').hide();
+            }, 5000)
+        }
+       // window.preamble = '/test3/';
+        window.testCallFromEval = function () {
+            console.log('boom')
+        }
+    </script>
+    <script src="testLL.js"></script>
+
+    <script>
+        function lazyLoadAndRunTest() {
+            loadTestFramework(function onReady(){
+                testStackingDemo2B(true);
+            })
+        }
+        function autoloadTestFramework() {
+            window.location += '?loadTestFramework=true'
+        }
+    </script>
+    <style>
+        body {
+            font-weight: 400;
+            background-color: #3A2E51;
+            font-family: 'Arial';
+        }
+    </style>
+</head>
+<body>
+<button>Test</button> <br />
+<button onclick="lazyLoadAndRunTest()">LL Test 2</button>  <br />
+<button onclick="tH.clickTest2()">Run Test 2</button>  <br />
+<textarea id="txtArea" ></textarea>
+<button id="btnTest">Test</button>
+
+<div style="display: none; position: fixed; bottom: 10px; right: 10px" id="ctestLogPanel" >
+    asdf
+</div>
+
+
+
+<div>
+    <button class="redTest"
+            onclick="onRedButton()" >Go</button>
+
+    <button class="redTest2"
+            onclick="onShowDiv()" >Press for div</button>
+    <div id="showDiv" style="color:white;">
+        this the show div</div>
+</div>
+
+<script src="http://localhost:14002/socket.io-1.2.0.js" ></script>
+<script src="http://localhost:10110/reloader.js" ></script>
+<script>
+    function onReloader() {
+        //reloader.reloadWhen('index_.html');
+        reloader.reloadWhen('test2.reloading.html');
+        reloader.filter = '/videoproject/';
+        reloader.reloadWhenFx('drawPB.js', function onTestOneJs(a, b, c) {
+            //console.log('pussy', a,b,c);
+            //window.drawPBJS.go();
+        })
+
+
+        reloader.reloadWhenFx('account_', function onTestOneJs(a, b, c) {
+            //console.log('pussy', a,b,c);
+            //window.drawPBJS.go();
+            var $modal_content = $('.modal-account .content');
+            $modal_content.removeClass('js-loaded')
+            window.xLoad = true
+            uiUtils.setHash('')
+            function myAccount() {
+                uiUtils.setHash('account')
+            }
+
+            setTimeout(myAccount, 500)
+        })
+
+
+        reloader.reloadWhenFx('test3/csvScripts/', function onTestOneJs(a, b, c) {
+            console.log('rerun last test',a,b,c)
+            tH.runTest('testCSV', a)
+            //debugger
+            return true
+            /*
+             loadTestFramework(function onFinishedRerunTest() {
+             // window.tests.loaded = true;
+             //window.whenReadyHasRunTesting = false; do not reload again
+             console.log('rerun last test',a,b,c,)
+             // tH.rerunLastTest()
+             }, true)
+             */
+        })
+
+        reloader.reloadWhenFx('testingFramework/', function onTestOneJs(a, b, c) {
+            loadTestFramework(function onFinishedRerunTest() {
+                // window.tests.loaded = true;
+                //window.whenReadyHasRunTesting = false; do not reload again
+                console.log('rerun last test')
+                tH.rerunLastTest()
+            }, true)
+        })
+
+
+        //C:/Users/user1/Dropbox/projects/ritv2/videoproject/Code/code-yeti/test3/testFramework.js
+        reloader.addReloadMapping('C:/Users/user1/Dropbox/projects/ritv2/videoproject/Code/code-yeti/', '')
+        //reloader
+    }
+    try {
+        onReloader()
+    } catch ( e) {
+        console.log('e', e)
+    }
+</script>
+
+</body>
+</html>
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/framework/callFxUsingsFxs.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/framework/callFxUsingsFxs.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/framework/callFxUsingsFxs.js.txt	(revision )
@@ -0,0 +1,28 @@
+#t
+
+log asdf2
+
+
+function fxa1() {
+    console.debug('fxa1', 'what ....')
+   // debugger
+}
+
+function fxa2() {
+    //debugger
+    console.debug('...')
+    tH.fxs.fxa1('4')
+}
+
+fx.fxa2()
+//tH.fx('fxa2') --> fx.fx
+//fxa2()
+/*
+fxa2()
+tH.fx('fxa2')
+log asdf
+
+tH.fx('fxa2')
+*/
+log asdf
+endtest
\ No newline at end of file
Index: mp/testingFramework2/test2.verify.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/test2.verify.html	(revision )
+++ mp/testingFramework2/test2.verify.html	(revision )
@@ -0,0 +1,95 @@
+<!DOCTYPE html>
+<html>
+<head>
+    <title>Test Diff Location</title>
+
+    <!-- Prove can work in diff dir -->
+    <script>
+        setTimeout(function hideDiv() {
+            if ( window.$ == null ) {
+                console.log('wait for jquery')
+                setTimeout(hideDiv, 1000);
+                return;
+            }
+            $('#showDiv').hide();
+        }, 500)
+        window.onRedButton = function onRedButton() {
+            console.log('ddd')
+        }
+        window.onShowDiv = function onShowDiv() {
+            console.log('onShowDiv')
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').show();
+            }, 500)
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').hide();
+            }, 5000)
+        }
+       // window.preamble = '/test3/';
+        window.testCallFromEval = function () {
+            console.log('boom')
+        }
+    </script>
+    <script>
+       // window.preamble = '../test7/'
+    </script>
+    <script src="../testingFramework/testLL.js"></script>
+
+    <script>
+        function lazyLoadAndRunTest() {
+            loadTestingFramework(function onReady(){
+                testStackingDemo2B(true);
+            })
+        }
+        function autoloadTestFramework() {
+            window.location += '?loadTestFramework=true'
+        }
+    </script>
+
+    <script>
+        setTimeout(function auto_startTestingFramework() {
+            console.info('auto - loading testing framework')
+            loadTestingFramework()
+        },500)
+    </script>
+
+    <style>
+        body {
+            font-weight: 400;
+            background-color: #CBD9E6;
+            font-family: 'Arial';
+        }
+    </style>
+
+
+
+</head>
+<body>
+<button>Test</button> <br />
+<button onclick="lazyLoadAndRunTest()">LL Test - Run Test</button>  <br />
+<button onclick="tH.clickTest2()">Run Test 2</button>  <br />
+<textarea id="txtArea" ></textarea>
+<button id="btnTest">Test</button>
+<!--
+<div style="display: none; position: fixed; bottom: 10px; right: 10px" id="testLogPanel" >
+    asdf
+</div>
+-->
+
+
+
+<div>
+    <button class="redTest"
+            onclick="onRedButton()" >Go</button>
+
+    <button class="redTest2"
+            onclick="onShowDiv()" >Press for div</button>
+    <div id="showDiv" style="color:white;">
+        this the show div</div>
+</div>
+
+
+</body>
+</html>
\ No newline at end of file
Index: mp/testingFramework2/ParseCSV.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/ParseCSV.js	(revision )
+++ mp/testingFramework2/ParseCSV.js	(revision )
@@ -0,0 +1,209 @@
+
+function defineParseCSV() {
+    function CSVParser() {
+
+        var self = this;
+        var p = this;
+
+        p.init = function init() {
+
+        }
+        var isNode = false;
+        var sh = {}
+        var convertCSV = function convertCSV(contents) {
+            if ( isNode ) {
+                //var $ = sh;
+            }
+            sh.toCamelCase = function toCamelCase(str) {
+                return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
+                    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
+                    return index == 0 ? match.toLowerCase() : match.toUpperCase();
+                });
+            }
+
+            function removeFromBegAndEndOfStr(text, removeStr) {
+                if (  text == null || text.startsWith == null ) {
+                    debugger;
+                }
+
+                if ( text.startsWith(removeStr) &&
+                    text.endsWith(removeStr)) {
+
+                    text = text.replace(removeStr, '')
+                    text = text.slice(0,text.length-removeStr.length)
+                }
+//    if ( sh.endsWith(text, removeStr)) {
+//        text = text.slice(0,text.length-removeStr.length)
+//    }
+                return text;
+            }
+
+            function unquote(text) {
+                return removeFromBegAndEndOfStr(text, '"')
+            }
+
+            sh.unquote = unquote
+
+            sh.CSVtoArray = // Return array of string values, or NULL if CSV string not well formed.
+                function CSVtoArray(text) {
+                    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
+                    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
+                    // Return NULL if input string is not well formed CSV string.
+                    if (!re_valid.test(text)) return null;
+                    var a = [];                     // Initialize array to receive values.
+                    text.replace(re_value, // "Walk" the string using replace with callback.
+                        function(m0, m1, m2, m3) {
+                            // Remove backslash from \' in single quoted values.
+                            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
+                            // Remove backslash from \" in double quoted values.
+                            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
+                            else if (m3 !== undefined) a.push(m3);
+                            return ''; // Return empty string.
+                        });
+                    // Handle special case of empty last value.
+                    if (/,\s*$/.test(text)) a.push('');
+                    return a;
+                };
+
+            var lines = contents.split('\n')
+            var it = {};
+            it.objs = [];
+            $.each(lines, function procLine(k,line) {
+                var fields = line.split(',')
+                var fields2 = sh.CSVtoArray(line)
+                if ( fields2 == null && fields.length > 0 ) {
+                    fields2 = fields; //possibly invalid
+                    console.warn('possibliy invalid line', fields2)
+                }
+                if ( fields.length != fields2.length ) {
+                    //    debugger;
+                }
+                fields=fields2
+                if ( line.trim() == '' )
+                    return;
+                if  ( k == 0 ) {
+                    it.columnNames = fields;
+                    return;
+                }
+                var unquoted = []
+                $.each(it.columnNames, function addCol(cI, colName) {
+                    var fixed = colName
+                    unquoted.push(sh.toCamelCase(sh.unquote(colName)))
+                })
+                it.columnNames = unquoted;
+                //console.error(k, line, fields)
+                var obj = {};
+
+                $.each(it.columnNames, function addCol(cI, col) {
+                    var val  = fields[cI];
+                    if ( val == null ) {
+                        return;
+                    }
+                    val = sh.unquote(val);
+                    obj[col] = val;
+                })
+                it.objs.push(obj);
+            })
+            console.log('how many?', it.objs.length)
+            //  sh.each.print(it.objs)
+            // process.exit();
+            return it.objs;
+        }
+        window.convertCSV = convertCSV;
+    }
+
+    var o = new CSVParser();
+    return CSVParser;
+}
+defineParseCSV();
+
+function convertCSV_X(contents) {
+    var sh = {}
+    sh.toCamelCase = function toCamelCase(str) {
+        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
+            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
+            return index == 0 ? match.toLowerCase() : match.toUpperCase();
+        });
+    }
+
+    function removeFromBegAndEndOfStr(text, removeStr) {
+        if ( text.startsWith(removeStr) &&
+            text.endsWith(removeStr)) {
+
+            text = text.replace(removeStr, '')
+            text = text.slice(0,text.length-removeStr.length)
+        }
+//    if ( sh.endsWith(text, removeStr)) {
+//        text = text.slice(0,text.length-removeStr.length)
+//    }
+        return text;
+    }
+
+    function unquote(text) {
+        return removeFromBegAndEndOfStr(text, '"')
+    }
+
+    sh.unquote = unquote
+
+    sh.CSVtoArray = // Return array of string values, or NULL if CSV string not well formed.
+        function CSVtoArray(text) {
+            var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
+            var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
+            // Return NULL if input string is not well formed CSV string.
+            if (!re_valid.test(text)) return null;
+            var a = [];                     // Initialize array to receive values.
+            text.replace(re_value, // "Walk" the string using replace with callback.
+                function(m0, m1, m2, m3) {
+                    // Remove backslash from \' in single quoted values.
+                    if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
+                    // Remove backslash from \" in double quoted values.
+                    else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
+                    else if (m3 !== undefined) a.push(m3);
+                    return ''; // Return empty string.
+                });
+            // Handle special case of empty last value.
+            if (/,\s*$/.test(text)) a.push('');
+            return a;
+        };
+
+    var lines = contents.split('\n')
+    var it = {};
+    it.objs = [];
+    $.each(lines, function procLine(k,line) {
+        var fields = line.split(',')
+        var fields2 = sh.CSVtoArray(line)
+        if ( fields2 == null && fields.length > 0 ) {
+            fields2 = fields; //possibly invalid
+            console.warn('possibliy invalid line', fields2)
+        }
+        if ( fields.length != fields2.length ) {
+            //    debugger;
+        }
+        fields=fields2
+        if ( line.trim() == '' )
+            return;
+        if  ( k == 0 ) {
+            it.columnNames = fields;
+            return;
+        }
+        var unquoted = []
+        $.each(it.columnNames, function addCol(cI, colName) {
+            var fixed = colName
+            unquoted.push(sh.toCamelCase(sh.unquote(colName)))
+        })
+        it.columnNames = unquoted;
+        //console.error(k, line, fields)
+        var obj = {};
+
+        $.each(it.columnNames, function addCol(cI, col) {
+            var val  = fields[cI];
+            val = sh.unquote(val);
+            obj[col] = val;
+        })
+        it.objs.push(obj);
+    })
+    console.log('how many?', it.objs.length)
+    //  sh.each.print(it.objs)
+    // process.exit();
+    return it.objs;
+}
\ No newline at end of file
Index: mp/testingFramework2/TestCSV.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/TestCSV.js	(revision )
+++ mp/testingFramework2/TestCSV.js	(revision )
@@ -0,0 +1,56 @@
+/**
+ * Created by user1 on 3/4/2017.
+ */
+
+if ( window.isNode || typeof exports === 'undefined' ) {
+    var sh = require('shelpers').shelpers;
+    var shelpers = require('shelpers');
+} else {
+    sh.isObject = $.isObject
+}
+
+function TestCSV() {
+    var p = TestCSV.prototype;
+    p = this;
+    var self = this;
+    p.init = function init(config) {
+        self.settings = sh.dv(config, {});
+    }
+
+    p.getTestScript = function getTestScript(file) {
+        console.log('file', file)
+        uiUtils.getUrl(file, function onLoad(txt) {
+            console.log('test content', txt)
+        })
+    }
+
+    p.method = function method(config) {
+    }
+
+    p.method = function method(config) {
+    }
+
+    p.proc = function debugLogger() {
+        if ( self.silent == true) {
+            return;
+        }
+        sh.sLog(arguments);
+    };
+}
+
+if ( isNode ) {
+    exports.TestCSV = TestCSV;
+
+    if (module.parent == null) {
+        var instance = new TestCSV();
+        var config = {};
+        instance.init(config)
+    }
+
+ } else {
+    var instance = new TestCSV();
+    var config = {};
+    instance.init(config)
+}
+
+
Index: mp/testingFramework2/testFramework.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/testFramework.js	(revision )
+++ mp/testingFramework2/testFramework.js	(revision )
@@ -0,0 +1,3289 @@
+/**
+ * Created by morriste on 2/12/16.
+ */
+
+if ( typeof window === 'undefined' ) {
+    var window = {}
+    window.location = {};
+    window.location.hash = ''
+    debugger
+    window.location.search = ''
+    window.runTest = true //force
+    var PromiseHelperV3 = require('./PromiseHelperV3').PromiseHelperV3;
+    var sh = require('./shelpers').shelpers;
+}
+function defineInittest() {
+    window.tests = {}
+    var lastTestHelper = window.testHelper;
+    var testHelper = {};
+    window.testHelper = testHelper;
+    testHelper.data = {}
+    var tH = testHelper;
+    tH.settings = {};
+    tH.settings.clickAsRed = false;
+    tH.settings.onlyVisibleItems = true; //why click something that is invisible? we have a clickHidden
+    tH.settings.hoverOnClick = true;
+    tH.settings.pretendToType = true;
+    tH.settings.defaultTestDelay = 500;
+
+    testHelper.data.blueAreaClass = 'blueTransAnnotation'
+    testHelper.data.dictEvalFx = {};
+    testHelper.data.dictEvalFx2 = {};
+
+
+
+
+
+    //console.error('txtInvokeCount', window.testHelper.data.invokeCount);
+    if (lastTestHelper) {
+        testHelper.data.invokeCount =
+            lastTestHelper.data.invokeCount;
+
+    }
+    if ( testHelper.data.invokeCount == null ||
+        isNaN(testHelper.data.invokeCount)  ) {
+        testHelper.data.invokeCount = 0;
+    }
+    //console.error('txtInvokeCount', window.testHelper.data.invokeCount);
+
+    if ( $.isObject == null ) {
+        $.isObject = function isObject(obj) {
+            if ( $.isFunction(obj)) {
+                return false;
+            }
+            if ( obj == null ) {
+                return false;
+            }
+            return typeof obj == 'object'
+        }
+
+    }
+}
+
+defineInittest();
+
+
+
+function defineLoadParams() {
+    testHelper.getParams = function getParamsFromUrl() {
+        function getQueryObj() {
+// This function is anonymous, is executed immediately and
+// the return value is assigned to QueryString!
+            var query_string = {};
+            var query = window.location.search.substring(1);
+            if ( query == '' && window.location.hash.indexOf('?') != 0 ) {
+                query = window.location.hash.split('?')[1];
+            }
+            if ( query == null ) {
+                query = '';
+            }
+            var vars = query.split("&");
+            for (var i=0;i<vars.length;i++) {
+                var pair = vars[i].split("=");
+// If first entry with this name
+                if (typeof query_string[pair[0]] === "undefined") {
+                    query_string[pair[0]] = decodeURIComponent(pair[1]);
+// If second entry with this name
+                } else if (typeof query_string[pair[0]] === "string") {
+                    var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
+                    query_string[pair[0]] = arr;
+// If third or later entry with this name
+                } else {
+                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
+                }
+            }
+            return query_string;
+        } ;
+        testHelper.params = getQueryObj();
+    }
+    testHelper.getParams();
+}
+defineLoadParams();
+
+function defineJQueryHelpers() {
+    testHelper.findByContent = function (content, altRoot, returnAllElements_ifHidden) {
+        if ($.isFunction(content)) {
+            return content = content();
+        }
+
+
+
+        if ( $.isString(content) == false ) {
+            if ( $.isNumeric(content )) {
+                content = content.toString();
+            }
+        }
+        console.debug('what is input', content)
+
+        if ( content ) {
+            if ( content.startsWith('$2') ) {
+                // content = content.replace('$2 ', '')
+                content = content.replace('$2', '')
+            }
+            content = content.trim().toLowerCase();
+            if ( content.includes('|||')) {
+                var split = content.split('|||')
+                var typeOf = split[0]
+                content = split[1]
+            }
+        }
+
+
+
+
+        var root = $('body');
+        if ( altRoot ) {
+            if ( $.isString(altRoot) ) {
+                altRoot  = $(altRoot)
+            }
+            root = altRoot;
+        }
+        var yyy = root.find('*')
+            .filter(
+                function(){
+                    if ( typeOf ) {
+                        if ( $(this).is(typeOf) ==false ) {
+                            return false;
+                        }
+                    }
+                    return $(this).text().trim().toLowerCase() === content;
+                })
+        if ( returnAllElements_ifHidden === true) {
+            return yyy;
+        }
+        var visibleItems = $();
+        $.each(yyy, function isVisible(k,ui) {
+            if ( $(ui).is(':visible') ) {
+                visibleItems.push(ui)
+            }
+        })
+        //visibleItems = $(visibleItems)
+        return visibleItems
+    }
+    testHelper.findByContentLater = function findByContentLater (content) {
+
+        return function getContentLater() {
+            content = content.toLowerCase();
+            var result =  $('body').find('*')
+                .filter(
+                    function(){
+                        /*if ( $(this).text().length < 200) {
+                         console.log('y', $(this).text().trim().toLowerCase())
+                         }*/
+                        return $(this).text().toLowerCase().trim() === content;
+                    })
+
+            return result;
+        }
+    }
+
+    testHelper.findElementLater = function findElementLater (jqueryLimit) {
+        return function _findElementLater() {
+            var result =  $(jqueryLimit);
+
+            if ($.isArray(jqueryLimit)) {
+                var prev = $;
+                $.each(jqueryLimit, function (k,v) {
+                    if (v.charAt(0)=='>') {
+                        v = v.slice(1);
+                        prev = $(prev);
+                        prev = tH.findByContent(v,prev);
+                        return;
+                    } else {
+                        prev = prev.find(v);
+                    }
+                })
+                debugger;
+                result = prev;
+            }
+
+            return result;
+        }
+    }
+
+
+    //modify content to ui.
+    testHelper.convertJquery = function convertJquery(content) {
+        if ($.isFunction(content)) {
+            return content = content();
+        }
+        if ( $.isString(content)) {
+            //   content = $(content)
+        }
+        return content;
+    }
+
+    testHelper.convertJquery2 = function convertJquery2(content) {
+        var contentOrig = content;
+        //TODO: deprec old method with this one
+        //i jquery fx, string, or object, return jquery object
+        if ($.isFunction(content)) {
+            return content = content();
+        }
+        if ( $.isString(content)) {
+            if ( content.startsWith('$2')) {
+                return null; //this is speical mode
+            }
+            content = $(content)
+            content.$orig = contentOrig;
+        }
+
+        return content;
+
+    }
+}
+defineJQueryHelpers();
+var tH = testHelper;
+
+testHelper.defaults = {};
+//testHelper.defaults.timeout = 5
+
+window.runTest2 = function runTestLate(testName) {
+    //used by dialogTestSearch to run tests
+    setTimeout(function runTest() {
+        tH.runTest(testName)
+        //  window.tests[testName](tH);
+    }, 200)
+}
+
+function defineTestTransportFxs() {
+    var panelAdded = false; //for repeat tests
+    tH.createNewTest = function createNewTest(){
+        if ( window.testStop ) {
+            window.testStop()
+        };
+
+        var work = new PromiseHelperV3();
+        window.testInProgress = true;
+        var t = work;
+        var token = {};
+        token.silentToken = true
+        token.delayChain = 500;
+        token.timeout = 30;
+
+        if ( window.testHelper.defaults.timeout )
+            token.timeout = testHelper.defaults.timeout;
+
+        //debugger;
+
+        token.name = tH.currentTestName;
+        work.wait = token.simulate==false;
+
+        work.fxStop = function onTestStop_TimeoutLikely(msg){
+            tH.fail('timeout', msg)
+        }
+
+        function startTestLater() {
+            work.startChain(token)
+        }
+
+
+        function createFxs() {
+
+            /*var dictFxs = {};
+             dictFxs.c = function callC(arg1, arg2) {
+             console.log('testproxy', arg1, arg2)
+             }*/
+
+            var handler = {
+                get: function(target, name, reciever) {
+                    console.log('get-testproxy', target, name, reciever)
+                    var origMethod = window.testHelper.data.dictEvalFx[name];
+                    if ( origMethod == null ) {
+                        throw new Error(['could not find fx',
+                            '"'+name+'"']
+                            .join(' '))
+                    }
+                    return function (...args) {
+                        var args2 = args
+                        args2.unshift(name)
+                        tH.fx.apply(this, args2)
+                        return;
+                        // let result = origMethod.apply(this, args);
+                        console.log('callmeth', name + JSON.stringify(args)
+                            + ' -> ' + JSON.stringify(result));
+                        //return result;
+                    };
+
+                    return name in target ?
+                        target[name] :
+                        37;
+                },
+                /*
+                 apply: function(target, that, args) {
+                 console.log('fx-testproxy', target, that, args)
+
+                 return;
+                 sup.apply(that, args);
+                 base.apply(that, args);
+                 }*/
+            };
+
+            var proxyFxs = new Proxy({}, handler);
+            //p.a = 1;
+            tH.fxs = proxyFxs
+        }
+        createFxs();
+        // tH.fxs
+
+        //debugger;
+        window.testHelper.data.invokeCount++;
+        //console.error('txtInvokeCount', window.testHelper.data.invokeCount);
+
+        $('#testLogPanel').css({'background-color':tH.data.origTestLogPanelBgcolor});
+        $('#testLogPanel').css({'background-color':'#f2f2f2'});
+
+        $('.'+tH.data.blueAreaClass).remove()
+
+        // window.testHelper.fxStartNextTest = startTestLater;
+        startTestLater()
+        //setTimeout(startTestLater); //test can't run if defineTest fails ...
+        tH.test = t;
+        window.tH = tH;
+        window.testStop = function stopCurrentTest() {
+            console.error('stopping the current test');
+            t.stop();
+        }
+        window.stopTest = window.testStop;
+
+        tH.addLogPanel();
+        tH.addTransportPanel();
+        tH.windowLocationHash = window.location.hash; //why: store hash so we can replay test easily
+
+        //debugger
+        //tH.data = {};
+
+        defineAssertions(tH)
+        defineTestTransportTimeout(tH)
+
+        var timer = new sh.EasyTimer()
+
+
+        timer.start()
+        tH.logNow('starting test', sh.q(tH.currentTestName) );
+        t.fxDone3 = function on_finishedTest() {
+            tH.logNow('test ended', sh.q(tH.currentTestName), timer.secs() );
+            $('#testLogPanel').css({'background-color':'#C3E5C4'});
+            $('#testTransportPanel').css({'background-color':'#C3E5C4'});
+            window.testHelper.transport.finished();
+            $('#txtTotalStepsCount').text(t.data.methods.currentIndex);
+            //$('#annotation').hide()
+            $('#annotation').css('opacity', 0.4)
+        }
+
+        t.token.id = window.testHelper.currentTestId = Math.random();
+
+        t.token.fxStep = function onUpdateTransport(tx, fxResume) {
+
+            if ( window.testHelper.transport.status == 'paused') {
+                window.testHelper.fxResumeTest = fxResume
+                console.warn('pause test')
+                return false;
+            }
+
+            //debugger;
+            if ( t.token.id != window.testHelper.currentTestId ) {
+                return false;
+            }
+            $('#txtCurrentStepIndex').text(tx.data.methods.currentIndex+1);
+            $('#txtTotalStepsCount').text(tx.data.methods.count);
+
+
+            var currentStep = (tx.data.methods.currentIndex+1)
+            var totalSteps = tx.data.methods.count
+
+            var percent = (currentStep/totalSteps) //*100 //.toFixed(0)
+            percent = percent * 100
+            percent = percent.toFixed(0)
+            //console.error('lll', percent, currentStep, totalSteps)
+            var strPercentPaddingText = '    '
+            var keep = 2 - percent.toString().length
+            strPercentPaddingText = strPercentPaddingText.slice(0,keep)
+            $('#txtPercentPadding').text(strPercentPaddingText);
+            $('#txtPercent').text(percent+'%');
+
+            $('#testTransportPanelProgress').css('width', percent+'%')
+
+
+
+            /*console.debug('what is x?', tx.data.methods.currentIndex,
+             tx.data.methods.count);*/
+            return;
+            /*    console.log('what is x?', tx.data.methods.currentIndex,
+             tx.data.methods.count);*/
+        }
+
+        t.fxError = function onError(errorMsg) {
+            tH.fail([errorMsg])
+        }
+        return t;
+    }
+
+    function defineAssertions(tH) {
+        tH.assert =  function assert(eq, msg) {
+
+            var args = sh.convertArgumentsToArray(arguments)
+            if (args.length > 2) {
+                var msgStr = '';
+                args = args.slice(1);
+                $.each(args, function onConverTIfHaveTo(k, v) {
+                    if ($.isObject(v)) {
+                        v = JSON.stringify(v);
+                    }
+                    msgStr += ' ' + v;
+                })
+                msg = msgStr;
+            } else {
+                msg = args.slice(1).join(' ');
+            }
+
+            if ( eq == false ) {
+                tH.fail(['failed to verify',msg, new Error().stack])
+                throw new Error(msg)
+            }
+            return;
+
+        }
+    }
+
+    tH.data.level = 0
+    tH.data.levels = []
+    tH.defaultAddNextOffset = 0
+    tH.setDefaultAddNext = function setDefaultAddNext() {
+        // console.error('adding', ' +', tH.data.level, tH.defaultAddNextOffset, tH.data.levels)
+        tH.data.level++
+        if ( tH.defaultAddNextOffset> 0 ) {
+            //tH.data.level++
+            // debugger
+            // tH.defaultAddNextOffset = 0;
+        }
+        //var lblInfo = {};
+        tH.data.levels.push(tH.defaultAddNextOffset)
+        if (tH.data.levels.length == 0 ) {
+            //tH.data.level++
+            // tH.defaultAddNextOffset = 0;
+        } else {
+            // debugger
+        }
+        tH.defaultAddNextOffset = 0;
+
+        tH.defaultAddNext = true;
+    }
+    tH.resetDefaultAddNext = function resetDefaultAddNext() {
+        //  console.error('adding', ' -', tH.data.level, tH.defaultAddNextOffset, tH.data.levels)
+        // tH.defaultAddNextOffset = 0;
+        var level = tH.data.levels.pop();
+        tH.defaultAddNextOffset = level;
+        tH.defaultAddNext = false;
+        //set last vazlue
+        tH.data.level--
+
+
+    }
+
+    tH.nextTimeoutTime = function nextTimeoutTime(time) {
+        tH.test.data.nextTimeoutSeconds = time;
+    }
+
+    tH.addTestStep = function addTestStep(fx_testLink, offset, sync) {
+        var addFx = tH.test.add;
+        if ( offset ) {
+            addFx = tH.test.addNext;
+        }
+        if ( sync ) {
+            var oldFx = fx_testLink;
+            fx_testLink = function fx_testLinkSync() {
+                oldFx()
+                tH.test.cb()
+            }
+        }
+        if ( tH.defaultAddNext ) {
+            addFx = tH.test.addNext;
+            //console.error('default add next')
+            // if ( offset == null ) { //add as if live
+
+            if ( tH.defaultAddNextOffset == null ) {
+                debugger
+                asdf.stop.this.is.wrong.set.the.val
+                tH.defaultAddNextOffset = 0
+            }
+
+            offset =  tH.defaultAddNextOffset
+            //how would someone knwo where to offset it? this is unnecsary
+            tH.defaultAddNextOffset++
+            //  }
+        }
+        addFx(fx_testLink, offset);
+        if ( tH.defaultAddNext ) {offset += 1; tH.defaultAddNextOffset++ }
+        addFx(function reportToServer() {
+            // reportToServer.defaultFx = true
+            var delayTime = sh.dv(tH.test.delayTime, 10)
+            setTimeout(tH.test.cb, delayTime)
+        },offset)
+        tH.test.data.lastMethodAdded.defaultFx = true;
+        if ( tH.defaultAddNext ) { offset += 1;  tH.defaultAddNextOffset++}
+        addFx(function addStandardDelayTime() {
+            // addStandardDelayTime.defaultFx = true
+            var delayTime = sh.dv(tH.test.delayTime, 10)
+            setTimeout(tH.test.cb, delayTime)
+        },offset)
+        tH.test.data.lastMethodAdded.defaultFx = true;
+
+
+        //console.error('defaultAddNext', 'tH.defaultAddNextOffset', tH.defaultAddNextOffset)
+
+        var ui = $('#divContainerTest');
+        var div = $('<div/>');
+        var t = uiUtils.tag('table')
+        //ui.append(div)
+
+        tH.data.stepCount ++
+        div.append('step ' + tH.data.stepCount)
+        div.append(t)
+        $.each(tH.test.methods, function addEachStep(k,m) {
+            if ( m.fx.defaultFx == true ) {
+                return;
+            }
+            var tr = uiUtils.tag('tr')
+            var td = uiUtils.tag('td')
+            tr.append(td);
+            t.append(tr)
+            td.append(m.fx.name  )
+
+            var td = uiUtils.tag('td')
+            tr.append(td);
+            td.append(  m.fx.yData)
+            // debugger
+        })
+        ui.append(div)
+
+        //lastFx.fxDesc = 'standardDelayTime'
+    }
+    tH.add = tH.addTestStep;
+
+    tH.addStep = function addStep(fx) {
+
+        if ( fx.name == null || fx.name == '' ) {
+            throw new Error ('name this')
+        }
+        //console.error('what is nane', fx.name)
+        function tH_addStep_fx2() {
+            tH.setDefaultAddNext()
+
+            fx()
+            tH.resetDefaultAddNext();
+        }
+
+        tH.addTestStep(tH_addStep_fx2)
+
+    }
+
+    if ( tH.data.stepCount == null ) {
+        tH.data.stepCount = 0;
+    }
+    $('#divContainerTest').html('')
+
+    tH.addSync = function addSyncFunction(fx, setupDefault, error) {
+        var addFx = tH.test.addSync;
+
+        if ( setupDefault != false ) {
+            var oldFx = fx;
+            function outerWrapper() {
+                tH.setDefaultAddNext();
+                oldFx();
+                tH.resetDefaultAddNext()
+            }
+            fx = outerWrapper;
+        }
+        //if ( tH.defaultAddNext ) {
+        /* tH.test.addNext(function syncNext(){
+         fx()
+         tH.test.cb();
+         })
+         return;*/
+        //}
+        tH.addTestStep(fx, null, true)
+        //addFx(fx, null);
+    }
+    tH.addPlainFx = tH.addSync;
+
+    tH.addAttrTest = function addAttrTest(jquery, attr, val, error) {
+        tH.add(function attiributeTest() {
+            var ui = $(jquery)
+            var uiVal = ui.attr(attr);
+
+            var eq = uiVal == val;
+
+            tH.assert(eq, 'Failed assertion', attr, '!= ', val, error)
+
+            tH.test.cb();
+        })
+    }
+
+
+
+    var urlBase = 'test3/'
+    if ( window.preamble ) {
+        urlBase = window.preamble;
+    }
+
+    if ( window.location.pathname ) {
+        if ( window.location.pathname.includes('test3/')) {
+            urlBase = '';
+        }
+    }
+
+    tH.data.urlBase = urlBase
+
+
+    tH.addLogPanel = function addLogPanel() {
+        /*
+         var divId = '#testSearchTest';
+         if ( uiUtils.ifFound(divId) ) { return; }
+         uiUtils.panel.br(divId);
+
+         */
+
+        function clearLogPanel() {
+            $('#logCurrent').html('');
+            $('#logPrevious').html('');
+        }
+        clearLogPanel();
+
+        console.log('addLogPanel')
+
+        $('#txtInvokeCount').text(' ('+window.testHelper.data.invokeCount+')');
+        //console.error('txtInvokeCount', window.testHelper.data.invokeCount);
+
+        tH.data.origTestLogPanelBgcolor = '#f2f2f2';
+
+
+        var isHere = $('#annotation').length
+        if ( isHere > 1 ) {
+
+        } else {
+            var annotation = $('<img/>')
+            annotation.attr('src', urlBase+'images/cursor-png.png')
+            $('body').append(annotation)
+            annotation.attr('id','annotation')
+            uiUtils.makeAbs(annotation, 100)
+            annotation.addClass('transitionAll');
+            annotation.css('z-index',  10002)
+            annotation.css('transition','all 0.1s ease-out')
+            annotation.hide();
+        }
+
+        $('#annotation').hide(); //if already on page
+        if ( $('#testLogPanel').length > 0 ) {
+            return;
+        }
+
+        var panel = $('<div style="background-color: #f2f2f2; padding:10px;' +
+            ' border: solid 1px #666666; position: fixed; ' +
+            'bottom: 260px; right: 10px; ' +
+            'max-height:85%; overflow:auto; ' +
+            '    max-height: calc(100% - 340px);'+
+            ' display: none; " id="testLogPanel">'+
+            '<b>Test Log</b>' +
+            '<span id="txtInvokeCount"></span>' +
+            '<div id="logPrevious"></div> ' +
+            '<div id="logCurrent"></div> ' +
+            '<div id="logTable"></div> ' +
+            '<div id="logMsgNow"></div> ' +
+            '  </div>');
+        $('body').append(panel)
+        panel.find('#logMsgNow').css('border-top', 'solid 1px #666666');
+        panel.css('max-width', '350px')
+        panel.css('min-width', '350px')
+        $('#testLogPanel').css('opacity', 0.7);
+        panel.css('z-index',  10002)
+
+        /*if ( $('#testLogPanel').length == 0 ) {
+         $('body').append('<div style="background-color: #f2f2f2; padding:10px;' +
+         ' border: solid 1px #666666; position: fixed; ' +
+         'bottom: 260px; right: 10px; ' +
+         'max-height:85%; overflow:auto; ' +
+         '    max-height: calc(100% - 320px);'+
+         ' display: none; " id="testLogPanel">'+
+         '<b>Test Log</b>' +
+         '<div id="logPrevious"></div> ' +
+         '<div id="logCurrent"></div> ' +
+         '  </div>')
+         $('#testLogPanel').css('opacity', 0.7);
+         }*/
+    }
+
+
+    tH.addTransportPanel =function addTransportPanel() {
+        var cfg = {}
+        cfg.id = 'testTransportPanel';
+        cfg.clearIfFound = true
+        if ( window.uiUtils.makePanel(cfg) ) {
+            return; //already made
+        }
+        uiUtils.centerVertically()
+        uiUtils.flagCfg = {};
+        uiUtils.lastUI.addClass('unselectable')
+        uiUtils.lastUI.css('z-index', 500000)
+        //uiUtils.flagCfg.id = cfg.id;
+        uiUtils.flagCfg.addTo = $(cfg.id);
+
+
+        uiUtils.flagCfg.addTo.css('transition','all 0.1s ease-out')
+
+        var div = $('<div></div>')
+        div.css('width', '100%')
+        div.css('height', '10%')
+        window.uiUtils.flagCfg.addTo.append(div)
+        div.css('background', 'black');
+        div.css('opacity', 0.3);
+        div.css('position', 'absolute');
+        div.css('left', '0px');
+        div.css('bottom', '0px');
+        div.attr('id', 'testTransportPanelProgress')
+        div.css('transition','all 0.1s ease-out')
+        //uiUtils.copySize(div);
+
+        //window.uiUtils.addTitle('Transport Panel');
+        window.uiUtils.addImage( urlBase+'images/play-button.png', 'btnPlay');
+        window.uiUtils.addTooltip('Play')
+        window.uiUtils.addClick(function onPlay(){
+            if ( window.testHelper.transport.status == 'stopped') {
+                window.testHelper.rerunLastTest();
+                return;
+            }
+            if ( window.testHelper.transport.status == 'paused') {
+                window.testHelper.transport.playing = false;
+                window.testHelper.transport.pause = false;
+                window.testHelper.transport.status = 'playing'
+
+                uiUtils.enable('#btnPause')
+                uiUtils.enable('#btnStop')
+                uiUtils.enable('#btnRewind')
+
+                window.testHelper.fxResumeTest();
+                return;
+            }
+        });
+
+        window.uiUtils.addImage( urlBase+'images/pause.png', 'btnPause')
+        window.uiUtils.addTooltip('Pause Test')
+        window.uiUtils.addClick(function onPause(){
+            uiUtils.enable('#btnPlay')
+            uiUtils.disable('#btnPause')
+            window.testHelper.transport.playing = false;
+            window.testHelper.transport.pause = true;
+            window.testHelper.transport.status = 'paused'
+        });
+
+        window.uiUtils.addImage( urlBase+'images/stop.png', 'btnStop')
+        window.uiUtils.addClick(function onStop(){
+            window.testHelper.transport.playing = false;
+            window.testHelper.transport.pause = false;
+            window.testHelper.transport.status = 'stopped';
+            uiUtils.disable('#btnPause');
+            uiUtils.disable('#btnStop');
+            tH.fail('Tested Ended...')
+        });
+
+        window.uiUtils.addImage( urlBase+'images/rewind.png', 'btnRewind')
+        window.uiUtils.addTooltip('Rewind/Retry')
+        window.uiUtils.addClick(function onRewind(){
+            window.testHelper.rerunLastTest();
+        });
+
+
+        window.uiUtils.ws()
+        uiUtils.wH(10)
+
+//        debugger;
+
+        uiUtils.addSpan();
+
+        //window.uiUtils.pad(0,0,0,10)
+        //uiUtils.bg('red')
+        uiUtils.changeContainer();
+
+        window.uiUtils.addLabel( '0', 'txtCurrentStepIndex');
+        var txtCurrentStepIndex = uiUtils.getLast();
+        uiUtils.color('black')
+        uiUtils.tooltip('Current Index')
+        window.uiUtils.addLabel( '/' );
+        window.uiUtils.addLabel( '0', 'txtTotalStepsCount');
+        window.uiUtils.addLabel( ' ', '');
+        window.uiUtils.addLabel( '0', 'txtPercentPadding');
+        window.uiUtils.addLabel( '0', 'txtPercent');
+        uiUtils.popContainer()
+
+        uiUtils.disable('#btnPlay')
+        uiUtils.disable('#btnPause')
+        uiUtils.disable('#btnStop')
+        uiUtils.disable('#btnRewind')
+
+
+        window.testHelper.transport = {};
+        window.testHelper.transport.playing = true;
+        uiUtils.enable('#btnPause')
+        uiUtils.enable('#btnStop')
+        uiUtils.enable('#btnRewind')
+
+
+        window.testHelper.transport.finished = function finished() {
+            window.testHelper.transport.status = 'stopped'
+            uiUtils.enable('#btnPlay');
+            uiUtils.disable('#btnPause');
+            uiUtils.disable('#btnStop');
+            uiUtils.disable('#btnRewind');
+        }
+
+        window.testHelper.transport.finishFailed = function finishedFailed() {
+            window.testHelper.transport.status = 'stopped'
+            uiUtils.disable('#btnPlay');
+            uiUtils.disable('#btnPause');
+            uiUtils.disable('#btnStop');
+            uiUtils.color(txtCurrentStepIndex, '#CB0300')
+            //  uiUtils.disable('#btnRewind');
+        }
+
+        // debugger;
+        return;
+        window.uiUtils.br();
+        window.uiUtils.addButton('Contact', function onContact() {
+            window.location.hash = '#contact';
+        });
+
+        window.uiUtils.br();
+    }
+}
+defineTestTransportFxs();
+
+function defineTestTransportTimeout(tH) {
+
+    tH.setTestTimeout = function setTestTimeout(timeoutSeconds) {
+        tH.work.token.timeout = timeoutSeconds;
+    }
+
+
+    tH.testHoldUpForever = function testHoldUpForever(asdf) {
+        debugger
+        //why: create an item that does not work ...
+        tH.add(function waitLink1() {
+            var waitTime = 1
+            setTimeout(function resumeTest(){
+                tH.log('test 2')
+                tH.test.cb();
+
+                //   debugger;
+            }, waitTime* 1000)
+        })
+
+        tH.add(function waitLink2() {
+            var waitTime = 3
+            setTimeout(function resumeTest(){
+                tH.logNow('holding it up ... for ever 2')
+                //  tH.test.cb();
+                // debugger;
+            }, waitTime* 1000)
+        });
+    }
+}
+
+function defineTestMethods() {
+    function click(strOrJ, parentJ) {
+        function clickAction() {
+
+            if ($.isArray(strOrJ)) {
+                //array of items
+                var prev = $;
+                $.each(strOrJ, function (k,v) {
+                    // prev = $(prev)
+                    if (v.charAt(0)=='>') {
+                        v = v.slice(1)
+                        prev = $(prev)
+                        prev = tH.findByContent(v,prev);
+                        return;
+                    }
+                    prev = prev.find(v)
+                })
+                // debugger;
+                element = prev;
+            }
+            else if ($.isFunction(strOrJ)) {
+                element = strOrJ() ;
+            } else if ( strOrJ.jquery && parentJ == null ) {
+                element = strOrJ; //$(strOrJ)
+            } else {
+                var element = tH.findByContent(strOrJ, parentJ);
+            }
+
+            if ( element != null &&
+                element.length == 0 &&
+                $.isString(strOrJ) &&
+                strOrJ.charAt(0)=='#') {
+                element = $(strOrJ)
+            }
+
+            if ( element == null ||element.length == 0  ) {
+                //
+                element = {length:'null'};
+                console.info('Element is null', strOrJ )
+            } else {
+
+                //debugger;
+                //TODO: fail if do not find object?
+                //Optional ? ... never used too much cognitive load ..
+                //if need to verify if exists, then verify
+                element = tH.utils.filterVisible(element)
+
+
+
+                if ( tH.settings.clickAsRed ) {
+                    var firstElement = element[0]
+                    var firstElementUI = $(firstElement);
+                    firstElementUI.css('color', 'red');
+                    var originalColor =  firstElementUI.css('color');
+                }
+                if ( element.length > 1 ) {
+                    console.error('ele', element, 'moving', strOrJ, parentJ )
+                }
+
+
+                var timeMouseClickAnimation = 500
+                if ( tH.settings.hoverOnClick == true ) {
+                    element.mouseover();
+
+                    element.hover();
+                    element.mouseenter();
+
+                    var origBackground = element.css('background-color');
+                    //element.css('background-color', '#013461')
+
+                    if ( origBackground ){
+                        origBackground = null;
+                    }
+
+                    tH.moveCursorTo(element) ; //move to cursor
+
+                    var annotation = $('#annotation')
+                    annotation.css('opacity', 0.4)
+                    annotation.css('border-bottom', 'solid 10px #013461' )
+
+                    setTimeout(function animateClickAction() {
+                        annotation.css('border-bottom', '' )
+                        annotation.css('opacity', 1)
+                    }, 200)
+
+                    setTimeout(function () {
+                        element.click();
+                        element.mouseout()
+                        element.mouseleave();
+
+                        element.css('background-color',origBackground);
+
+                        var m = $('.' + tH.data.blueAreaClass)
+                        m.remove();
+
+                    }, timeMouseClickAnimation)
+                }
+                else {
+                    tH.moveCursorTo(element) ;
+                    element.click();
+                }
+
+
+            }
+            console.debug('clickAction', strOrJ, 'el',  element.length)
+
+            tH.logNow.nextClick();
+
+            var nameForLog = strOrJ
+            if ( strOrJ.name ) {
+                nameForLog = strOrJ.name
+            }
+            if ( strOrJ.jquery ) {
+                nameForLog = strOrJ.text().trim().slice(0,25        )
+            }
+           // debugger;
+            tH.logNow(/*'---', 'clickAction',*/ nameForLog, parentJ, element.length)
+
+            if ( element.length == 0 || element.length == null ) {
+                console.warn('\t','clickActionDidNotfind', strOrJ, parentJ, 'not found')
+                console.warn('clickAction', strOrJ, 'el', 'has more than 1 result', element.length)
+                tH.logNow.nextIndent();
+                tH.logNow.nextWarning();
+                tH.logNow('too many items', strOrJ, 'has more than 1')
+            }
+
+            if ( element.length > 1) {
+                console.warn('clickAction', strOrJ, 'el', 'has more than 1 result', element.length)
+                tH.logNow.indentNext
+                tH.logNow.nextWarning();
+                tH.logNow('too many items', strOrJ, 'has more than 1')
+            }
+
+            if ( tH.settings.hoverOnClick == true ) {
+                setTimeout(function () {
+                    tH.test.cb();
+                }, timeMouseClickAnimation)
+            } else {
+                tH.test.cb();
+            }
+        }
+        clickAction.fxDesc = uiUtils.args(arguments).join(' ')
+
+        tH.add(clickAction)
+    }
+    tH.click = click;
+    tH.clickNext = function clickNext() {
+        tH.setDefaultAddNext();
+        var args = uiUtils.args(arguments)
+        tH.click.apply(this, args)
+        tH.resetDefaultAddNext();
+    }
+
+    tH.utils = {}
+    tH.utils.filterVisible = function filtervisible(element) {
+        var elementFiltered = elementFiltered;
+        if ( tH.settings.onlyVisibleItems ) {
+            elementFiltered = element.filter(':visible')
+            elementFiltered = elementFiltered.filter(function() {
+                var opacity = $(this).css('opacity')
+                if ( opacity == false ) { return false; }
+
+                var ui = $(this)
+                var parents = ui.parents();
+                elementFiltered = parents.filter(function() {
+                    return $(this).css('opacity') == '0';
+                });
+
+                if ( elementFiltered.length > 0 ) {
+                    return false;
+                }
+                return true;
+            });
+        }
+        return elementFiltered
+    }
+    tH.utils.remove = function remove() {
+        var m = $('.' + tH.data.blueAreaClass)
+        m.remove();
+    }
+    tH.clickNow = function clickNow(strOrJ, parentJ, tryText ) {
+        //why: click but do not navigte
+        var element = $(strOrJ);
+        if ( element.length == 0 && tryText != false ) {
+            var element = tH.findByContent(strOrJ, parentJ);
+        }
+
+        element = tH.utils.filterVisible(element)
+
+
+        if ( tH.settings.clickAsRed ) {
+            var firstElement = element[0]
+            var firstElementUI = $(firstElement);
+            firstElementUI.css('color', 'red');
+        }
+        element[0].click();
+        // element[0].click();
+        element.click();
+        //    console.error('endhash-W', 2, window.location.href );
+        console.log('click', strOrJ, element.length)
+        tH.moveCursorTo(element);
+    }
+    function clickJ(strOrJ) { //find based on jquery
+        tH.add(function clickAction() {
+            // console.error('endhash-W', 1, window.location.href );
+            var element = $(strOrJ);
+            element = tH.utils.filterVisible(element)
+            if ( element[0] == null || element[0].click == null ) {
+                console.error('no match for', strOrJ)
+            }
+
+
+
+            if ( tH.settings.clickAsRed ) {
+                var firstElement = element[0]
+                var firstElementUI = $(firstElement);
+                firstElementUI.css('color', 'red');
+            }
+            element[0].click();
+            // element[0].click();
+            element.click();
+            //    console.error('endhash-W', 2, window.location.href );
+            console.log('click', strOrJ, element.length)
+            tH.test.cb();
+
+
+            tH.moveCursorTo(element);
+
+            //   console.error('endhash-W', 3, window.location.href );
+        })
+    }
+
+    tH.clickTest2 = function clickTest2() {
+        setTimeout(setYValue, 1500)
+        function setYValue() {
+//return;
+            window.y = 5;
+            console.log(
+                'clicked test 2'
+            )
+        }
+    }
+
+
+    clickJ.desc = 'Click button. Get element from jquery stringn'
+    tH.clickJ = clickJ;
+
+
+    function pressEnter(strOrJ) { //find based on jquery
+        tH.add(function pressEnterAction() {
+            var element = $(strOrJ);
+
+            element = tH.utils.filterVisible(element)
+            if ( tH.settings.clickAsRed ) {
+                var firstElement = element[0]
+                var firstElementUI = $(firstElement);
+                firstElementUI.css('color', 'red');
+            }
+
+            var e = jQuery.Event("keydown");
+            e.which = 13; //choose the one you want
+            e.keyCode = 13;
+            e.charCode = 13
+            element.trigger(e)
+
+            var e = jQuery.Event("keypress");
+            e.which = 13; //choose the one you want
+            e.keyCode = 13;
+            e.charCode = 13
+            element.trigger(e)
+
+            var e = jQuery.Event("keyup");
+            e.which = 13; //choose the one you want
+            e.keyCode = 13;
+            e.charCode = 13
+
+            element.trigger(e)
+            console.log('pressEnter', strOrJ, element.length)
+
+
+            tH.test.cb();
+
+
+            tH.moveCursorTo(element);
+
+            //   console.error('endhash-W', 3, window.location.href );
+        })
+    }
+
+
+    pressEnter.desc = 'Press enter. Get element from jquery stringn'
+    tH.pressEnter = pressEnter;
+
+    function verify(fx, error) {
+        tH.add(function clickAction() {
+            if ($.isFunction(fx)) {
+                var result = fx();
+            }
+            else {
+                var result = $(fx).length > 0;
+            }
+            console.log('result',result)
+            if ( result != true ){
+                tH.fail(['failed to verify',error, fx])
+
+
+            }
+            tH.test.cb();
+        })
+    }
+    var verifyExists = verify;
+    tH.verifyExists = verify;
+    tH.verify = verify;
+
+
+    tH.logNextLink = function logNextLink(str) {
+        var args = sh.convertArgumentsToArray(arguments)
+        if ( args.length > 0 )
+            str = args.join(' ');
+        var lastStr = null; //stor epreviosu string
+        tH.add(function log() {
+            // console.error('endhash-Z',90, window.location.href );
+            console.log('logged',str)
+            $('#testLogPanel').show()
+            $('#logCurrent').html(str)
+            if ( tH.lastStr ) {
+                //console.log(lastStr)
+                $('#logPrevious').append('<div>'+tH.lastStr+'</div>')
+            }
+            tH.lastStr = str;
+            tH.test.cb();
+            //  console.error('endhash-Z',91, window.location.href );
+        })
+    };
+    tH.dbg = tH.l = tH.trace = tH.log3 = tH.logNext = tH.logNextLink;
+
+    tH.msgStatus = function msgStatus(str) {
+        var args = sh.convertArgumentsToArray(arguments)
+        if ( args.length > 0 )
+            str = args.join(' ');
+        $('#testLogPanel').show()
+        uiUtils.scrollToBottom('#testLogPanel')
+        //debugger
+        $('#logMsgNow').html(str)
+    }
+
+/*
+    function defineSimpleLoggingMethods() {
+        tH.logNow = function logCurrently(str) {
+            var args = sh.convertArgumentsToArray(arguments)
+            if (args.length > 0)
+                str = args.join(' ');
+            // function log() {
+            // console.log('logged',str)
+            $('#testLogPanel').show()
+            /!*
+             $('#testLogPanel').animate({
+             scrollTop: $(jquery).offset().top
+             }, 300);*!/
+            uiUtils.scrollToBottom('#testLogPanel')
+
+            //debugger
+            $('#logCurrent').html(str)
+            if (tH.lastStr !== null) { //why this crazyiness?
+                //console.log(lastStr)
+                var container = $('#logPrevious')
+                if (container.length == 0) {
+                    console.log('asdf', container, 'is embty')
+                }
+                container.append('<div>' + tH.lastStr + '</div>')
+            }
+            tH.lastStr = str;
+            //  tH.test.cb();
+            //   }
+        }
+        tH.log2 = tH.log = tH.logNow;
+    }
+*/
+
+    function defineAdvLoggingMethods() {
+        tH.logNow = function logCurrently(options, str) {
+            var args = sh.convertArgumentsToArray(arguments)
+            if (args.length > 0) {
+                str = args.join(' ');
+            }
+
+            var u = uiUtils;
+
+            if ($.isObject(options)) {
+                if (args.length == 1 && options.str) {
+                    str = options.str
+                }
+                str = args.slice(1).join(' ');
+            } else {
+                options = {}
+                options.str = str;
+            }
+
+            var testLogPanel = $('#testLogPanel');
+
+            // function log() {
+            // console.log('logged',str)
+            testLogPanel.show()
+            /*
+             $('#testLogPanel').animate({
+             scrollTop: $(jquery).offset().top
+             }, 300);*/
+            uiUtils.scrollToBottom('#testLogPanel')
+
+            //debugger
+
+
+            var testLogTable = 'testLogPanelTable'
+            var existingTable = $('#' + testLogTable);
+            //if (tH.test.data.table == null) {
+
+            if ( tH.test && tH.test.data.table == null ) {
+                tH.test.data.table = tH.data.table
+                tH.data.table = null //fix annoyance
+            }
+
+            if (tH.data.table == null) {
+                tH.data.logging = {};
+                tH.data.logging.tab = 0
+                tH.data.logging.indent = function (why) {
+
+                    //debugger
+                    tH.data.logging.tab++
+                    console.debug('tabi', tH.data.logging.tab, why)
+                }
+                tH.data.logging.outdent = function (why) {
+                    //debugger
+                    tH.data.logging.tab--
+                    console.debug('tabo', tH.data.logging.tab, why)
+                }
+
+                if (existingTable.length == 0) {
+                    u.addTo(testLogPanel.find('#logTable'));
+                    // debugger
+                    tH.data.table = u.make({tag:'table'}).ui;
+                    u.setId(testLogTable);
+                } else {
+                    tH.data.table = existingTable
+                }
+                tH.data.table.html('')
+
+                //tH.test.data.table = $('#' + testLogTable);
+            } else {
+                //csv convertor logs before panel is created
+                if (tH.data.table.length == 0) {
+                    tH.data.table = existingTable
+                }
+            }
+
+            u.addTo(tH.data.table)
+            u.make({tag:'div'})
+            //u.make({tag:'tr'})
+            // u.addTo(tH.data.table)
+            u.addToLast()
+
+            //u.flagCfg.addClass = 'tdCell'
+
+            var tdBase = {}
+            tdBase.addStyles = {width:'25px'}
+            tdBase.addClass = 'tdCell'
+
+            u.make({tag:'td', text:options.number}, tdBase)
+            if (tH.data.logging.tab > 0 ) {
+                //debugger
+                //u.makeA('div')
+                //u.pad(10*tH.data.logging.tab)
+                //u.lastUI.css('padding-left', 10*tH.data.logging.tab+'px')
+            }
+            var tempIndent= 0;
+            if ( tH.data.nextIndent ) {
+                tH.data.nextIndent =null;
+                tempIndent+=1;
+            }
+
+            if ( tH.data.logging.tab + tempIndent > 0 ) {
+                //debugger
+                //u.makeA('div', {prepend:true})
+                //debugger
+                //u.makeA('div' ,{addTo:uiUtils.lastUI,
+                //    prepend:true})
+                u.pad(10*tH.data.logging.tab)
+
+                // u.wH(10*tH.data.logging.tab, 10)
+                //u.bg('red')
+                //u.removeWrap()
+                //u.lastUI.css('padding-left', 10*tH.data.logging.tab+'px')
+            }
+            //u.flagCfg.addClass = null;
+
+            //u.flagCfg.addStyles = {width:'25px'}
+
+            u.make({tag:'td', text:tH.data.timePast}, tdBase)
+
+            u.make({tag:'td', text:options.type}, tdBase)
+            if ( tH.data.nextIndent ) {
+                tH.data.nextIndent =null;
+                tempIndent+=1;
+            }
+            if ( tH.data.nextWarning ) {
+                //debugger
+                tH.data.nextWarning =null;
+                u.makeA('img' ,{addTo:uiUtils.lastUI,
+                        prepend:true})
+                var img = uiUtils.lastUI
+                img.attr('src', tH.data.urlBase+'images/icons/warning.png')
+
+            }
+            if ( tH.data.nextFx ) {
+                //debugger
+                tH.data.nextFx =null;
+                u.makeA('img' ,{addTo:uiUtils.lastUI,
+                        prepend:true})
+                var img = uiUtils.lastUI
+                img.attr('src', tH.data.urlBase+'images/icons/function.png')
+
+            }
+            if ( tH.data.nextClick ) {
+                //debugger
+                tH.data.nextClick =null;
+                u.makeA('img' ,{addTo:uiUtils.lastUI,
+                    prepend:true})
+                var img = uiUtils.lastUI
+                img.attr('src', tH.data.urlBase+'images/icons/mouse-pointer.png')
+
+            }
+
+            tdBase.addStyles = {}
+            u.make({tag:'td', text:options.str}, tdBase)
+
+
+            //u.flagCfg.addStyles = {}
+
+            return;
+
+
+
+            //debugger
+            $('#logCurrent').html(str)
+            if (tH.lastStr !== null) {
+                //why this crazyiness? 4-13-17: log after appearnce
+                //console.log(lastStr)
+                var container = $('#logPrevious')
+                if (container.length == 0) {
+                    console.log('asdf', container, 'is embty')
+                }
+                container.append('<div>' + tH.lastStr + '</div>')
+            }
+            tH.lastStr = str;
+            tH.logNow.lastItem = options;
+            // tH.test.cb();
+            // }
+        }
+
+        tH.logNow.nextIndent = function nextIndent() {
+            tH.data.nextIndent = true;
+        }
+        tH.logNow.nextWarning = function nextWarning() {
+            tH.data.nextWarning = true;
+           // debugger
+        }
+        tH.logNow.nextClick = function nextClick() {
+            tH.data.nextClick = true;
+        }
+        tH.logNow.nextFx = function nextFx() {
+            tH.data.nextFx = true;
+        }
+        tH.log2 = tH.log = tH.logNow;
+    }
+    defineAdvLoggingMethods()
+
+    if ( tH.settings.logIsLowNow) {
+        tH.log2 = tH.log = tH.logNow;
+    } else {
+        tH.log = tH.logNextLink;
+    }
+
+
+    tH.callFxX = function callFx(evalName, rest_args) {
+        if ( evalName == null ) {
+            console.error('need a name for')
+        }
+        var evalTxt =  window.testHelper.data.dictEvalFx[evalName];
+        if ( evalTxt == null ) {
+            console.error('could not find evalFx in stored', evalName)
+            return;
+        }
+
+        var args = uiUtils.args(arguments)
+        // args.shift();
+
+
+        tH.add(function callFx() {
+            tH.data.logging.indent()
+            //  tH.add(function runEval_Later() {
+            tH.logNow('running stored fx', evalName)
+
+            //console.debug('running stored fx', evalName, evalTxt.trim(), v.args)
+
+            var strs = [];
+            $.each(args, function copyArg(k,v) {
+                if ( k == 0 ) { return } //skip evalName
+                var str = 'var arg'+(k) + ' = ' + '"'+v+'"'
+                //  console.debug('str', k, str)
+                strs.push(str)
+            })
+
+
+            console.debug('||running stored fx', evalName, strs )
+
+            var codeStr_CreateArgs = strs.join('\n')
+            //console.debug('code',codeStr_CreateArgs)
+            eval(codeStr_CreateArgs)
+            // console.log('arg1', arg1, 'arg2', arg2 )
+            tH.setDefaultAddNext()
+            eval(evalTxt);
+            tH.resetDefaultAddNext()
+            tH.test.cb();
+            // })
+            tH.data.logging.outdent()
+        })
+
+    }
+
+    tH.fx = function fx(fxName, restargs) { //find based on jquery
+        // if ( v.fx == 'fx' || v.fx == 'fxasync') {
+        var evalName = fxName
+        if ( evalName == null ) {
+            console.error('need a name for', v)
+            tH.fail('Cannot start test. failed to find fx named',
+                JSON.stringify(v)
+            )
+            return;
+        }
+        var evalTxt =  window.testHelper.data.dictEvalFx[evalName];
+        var fxInfo =  window.testHelper.data.dictEvalFx2[evalName];
+        if ( evalTxt == null ) {
+            console.error('could not find evalFx in stored', evalName)
+            tH.fail('Cannot start test. failed to find fx named', sh.qq(evalName))
+            throw new Error('cant find')
+            return;
+        }
+
+        var v = fxInfo;
+        v = sh.clone(fxInfo); //clone so areguments are different ecah time
+        v.args = uiUtils.args(arguments)
+
+        console.error('what mode', evalName, tH.defaultAddNext,
+            tH.defaultAddNextOffset, v.args)
+        function dAddNextOffsetnEval_Later() {
+            tH.data.logging.indent();
+            tH.logNow.nextFx();
+            var invokedArgs = v.args.concat();
+            if ( invokedArgs[0] == evalName ) { //remove first arg as it is same as evalName
+                invokedArgs.shift()
+            }
+            tH.logNow( '||-f', uiUtils.b(evalName), uiUtils.paren(v.line), tH.defaultAddNextOffset, invokedArgs.join(' '))
+    
+
+            //console.debug('running stored fx', evalName, evalTxt.trim(), v.args)
+            console.debug('running stored fx', evalName, v.args)
+
+            var strs = [];
+
+            var argumentsToDef = v.args;
+            if  ( v.args.args ) {
+                argumentsToDef = v.args.args;
+                argumentsToDef.unshift(evalName) ; //inputs are consistent
+            }
+            //debugger
+
+
+            var argVals = [];
+            $.each(argumentsToDef, function copyArg(k,v) {
+                if ( k == 0 ) { return } //skip evalName
+                var str = 'var arg'+(k) + ' = ' + '"'+v+'"'
+                var origArg = v;
+                //  console.debug('str', k, str)
+                strs.push(str)
+                //debugger
+                if ( $.isNumeric(v) == false ) {
+                    v = sh.qq(v)
+                }
+                if ( origArg === "true" || origArg === true ) {
+                    v = true
+                }
+                if ( origArg === "false" || origArg === false ) {
+                    v = false
+                }
+                //
+                argVals.push(v)
+            })
+
+            var codeStr_CreateArgs = strs.join('\n')
+            //console.debug('code',codeStr_CreateArgs)
+            eval(codeStr_CreateArgs)
+
+            if ( fxInfo && fxInfo.needSignatureCalled ) {
+                //asdf.g
+                evalTxt += '\n'
+                var runFxEvalStr = evalName + '('+argVals.join(',') +')';
+                evalTxt += '\n'+runFxEvalStr;
+            }
+
+            // console.log('arg1', arg1, 'arg2', arg2 )
+            try {
+                tH.setDefaultAddNext()
+                tH.data.logging.indent();
+                tH.data.logging.indent();
+                eval(evalTxt);
+                //debugger
+                //tH.data.logging.outdent();
+                tH.resetDefaultAddNext()
+            } catch ( e ) {
+                //debugger
+                console.error('error running eval', evalName)
+                console.error(e)
+
+                window.e = e;
+                console.error('full listing', '\n\t',
+                    evalTxt.trim())
+
+                // console.error(e.stack)
+                tH.logNow('error in fx', sh.qq(evalName))
+                tH.logNow(e)
+                tH.logNow(e.stack)
+                try {
+                    tH.fail('see above')
+                } catch ( e ) {
+                }
+
+
+                eval(evalTxt);
+            }
+
+            if ( v.fx != 'fxasync') { //how to set? ...have different callback
+                tH.test.cb();
+            }
+            tH.data.logging.outdent();
+        }
+
+        if ( tH.data.nextIsNow ) {
+            dAddNextOffsetnEval_Later()
+            return;
+        }
+        tH.add(dAddNextOffsetnEval_Later)
+
+        tH.add(function backOutDent() {
+            tH.data.logging.outdent();
+            tH.data.logging.outdent();
+            tH.test.cb()
+        })
+
+        dAddNextOffsetnEval_Later.yData = evalName;
+        //dAddNextOffsetnEval_Later.yData = '4444'
+        return;
+        //  }
+    }
+    tH.fxNow = function fxNow(fxName, restargs) {
+        tH.data.nextIsNow = true;
+        var args = uiUtils.args(arguments)
+        tH.fx.apply(this, args)
+    }
+
+    function wait(waitTime) {
+        if ( $.isString(waitTime ) ) {
+            waitTime = parseFloat(waitTime)
+        }
+        tH.add(function waitLinkTime() {
+            setTimeout(function resumeTest(){
+                tH.test.cb();
+            }, waitTime* 1000);
+        })
+    }
+    wait.desc = 'Wait x seconds'
+    tH.wait = wait;
+    function waitFor(fx, maxTimes, delay, failWhenDone) {
+        if (  tH.data.maxTimesNext ) {
+            maxTimes = sh.dv(maxTimes,
+                tH.data.maxTimesNext)
+            tH.data.maxTimesNext = null;
+        }
+        maxTimes = sh.dv(maxTimes, 10)
+        delay = sh.dv(delay, 250)
+        failWhenDone = sh.dv(failWhenDone, true);
+
+
+        var dbgWait = false;
+        dbgWait = true
+
+        if ( tH.waitForError ) {
+            //console.error('waitFor', tH.waitForError);
+            var waitForError = tH.waitForError;
+        }
+        //debugger
+        //console.error('what is the thtoken','1', tH.test.token)
+        tH.add(function waitFor_Action() {
+            //debugger
+            var innerT  = new PromiseHelperV3();
+            var token = {};
+            innerT.silentToken = true
+            token.name = 'waitfor-str'
+            innerT.wait = token.simulate==false;
+            innerT.startChain(token)
+            innerT.maxIterations = maxTimes;
+            innerT.iteration = 0;
+
+            function testWaitForCondition() {
+                try {
+                    var lastAttempt = innerT.iteration > innerT.maxIterations;
+                    var result = fx(lastAttempt);
+                } catch(e) {
+                    if ( waitForError ) {
+                        console.error('waitFor', waitForError);
+                        //tH.waitForError = null;
+                    }
+                    console.error('failed on', fx.name, e)
+                    var result = fx(lastAttempt);
+                }
+                if ( dbgWait) {
+                    console.log('waitfor-result', result,
+                        innerT.iteration, innerT.maxIterations, fx.name)
+                }
+
+
+                var waitForError_withoutStackTrace = waitForError
+                var splitAt = 'Error' //'at Object.w'
+                if ( waitForError && waitForError.includes(splitAt)) {
+                    waitForError_withoutStackTrace = waitForError.split(splitAt)[0] //remove stack trace
+                }
+
+
+                if ( innerT.iteration != 0 && innerT.iteration % 10 == 0 ) {
+                    tH.logNow('____','still waiting for', waitForError_withoutStackTrace)
+                }
+
+                console.log(fx.name, innerT.iteration, result, waitForError_withoutStackTrace)
+
+                if ( result != true ){
+                    if (lastAttempt) {
+                        if ( failWhenDone ) {
+                            if ( waitForError ) {
+                                console.error('waitFor', waitForError);
+                                //tH.waitForError = null;
+                            }
+
+                            window.fxFailed = fx;
+                            var msg =  ['failed on thing ',fx.name,
+                                waitForError,
+                                innerT.iteration ,
+                                innerT.maxIterations].join(' ');
+
+                            tH.fail(msg)
+                            throw new Error(
+                                msg
+                            )
+
+                        } else {
+                            if ( tH.testWaitforfxFail) {
+                                //debugger;
+                                tH.testWaitforfxFail()
+                            }
+                            //debugger
+                            tH.test.cb();
+                        }
+                    } else {
+                        innerT.iteration++
+                        innerT.addNext(testWaitForCondition)
+                        innerT.addNext(addWaitForDelay)
+                        innerT.cb();
+                    }
+                } else {
+                    tH.waitForError = null;
+                    // console.error('what is the thtoken', tH.test.token)
+                    tH.test.cb();
+                }
+            }
+            function addWaitForDelay () {
+                setTimeout(innerT.cb, delay)
+            }
+
+            innerT.addNext(testWaitForCondition)
+            innerT.addNext(addWaitForDelay)
+        })
+    }
+    tH.waitFor = waitFor;
+    function changeLocation(url) {
+        tH.add(function log() {
+            console.log('url',url)
+            window.location = url;
+            tH.test.cb();
+        })
+    }
+    changeLocation.desc = 'change url, can ad test into url'
+    tH.changeLocation = changeLocation;
+
+    function runFx(fx) {
+        tH.add(function runFx() {
+            fx();
+            tH.test.cb();
+        })
+    }
+    runFx.desc = 'run arbitrary method (fx)'
+    tH.runFx = runFx;
+    tH.run = runFx;
+
+    function runFxNext(fx) {
+        /*debugger;
+         tH.add(function runFx() {
+         fx();
+         tH.test.cb();
+         })*/
+        tH.addTestStep(function runFxNext() {
+            fx();
+            tH.test.cb();
+        }, true, 0)
+    }
+    runFxNext.desc = 'run arbitrary method (fx), add after current fx'
+    tH.runFxNext = runFxNext;
+    tH.runNext = runFxNext;
+    function runFxAsync(fx) {
+        tH.add(function log() {
+            fx();
+        })
+    }
+    runFx.desc = 'run arbitrary method (fx), dev must call cb to continue'
+    tH.runFxAsync = runFxAsync;
+    tH.runAsync = runFxAsync;
+
+    //add description of step for failure
+    function addDesc(desc) {
+        //fidn previous callback and add this string to it
+        tH.log(desc)
+    }
+    tH.desc=addDesc;
+
+    tH.fail = function failTest(errorArr, asdf) {
+        //alert('test failed')
+        if ( errorArr.join ) {
+            errorArr = errorArr.join(' ')
+        }
+        var args = uiUtils.args(arguments)
+        errorArr = args.join(' ')
+        tH.logNow('  ')
+        tH.logNow(' ');
+        tH.logNow('_________');
+        tH.logNow('Test Failed', errorArr, asdf, tH.waitForError, tH.stepError)
+        $('#testLogPanel').css({'background-color':'#F9C09D'});
+        $('#testTransportPanel').css({'background-color':'#F9C09D'});
+        window.testHelper.transport.finishFailed();
+        tH.test.isPlaying = false;
+        tH.test.stop();
+        var annotation = $('#annotation')
+        annotation.hide();
+
+        throw new Error(errorArr)
+
+    }
+
+
+    /*
+     //why are these deprectated?
+     tH.waitForHide = function waitForHide(jquery) {
+     tH.waitFor(function isDialogVisible(){ //waitForHide
+     if (
+     $(jquery).css("opacity") == "0" ||
+     $(jquery).css("display") == "none" ||
+     $(jquery).css("visibility") == "hidden"
+     ) {
+     return true
+     }
+
+     return false;//==$(jquery).is(":visible")
+     });
+     };
+     tH.waitForShow = function waitForShow(jquery) {
+     tH.waitFor(function isDialogVisible(){ //waitForShow
+     console.log('jquery wait for', jquery)
+     if ($(jquery).css("opacity") != "0" &&
+     $(jquery).css("visibility") != "hidden" ) {
+     return true
+     }
+     return true;//==$(jquery).is(":visible")
+     });
+     };
+     tH.verifyHidden = function waitForShow(jquery) {
+     tH.waitFor(function isDialogVisible(){ //waitForHide
+     if ($(jquery).css("opacity") == "0") {
+     return true
+     }
+     return false==$(jquery).is(":visible")
+     });
+     };
+     tH.verifyShow = function waitForShow(jquery) {
+     tH.verify(function isDialogVisible(){ //waitForHide
+     if ($(jquery).css("opacity") != "0") {
+     return true
+     }
+     return true==$(jquery).is(":visible")
+     });
+     };
+     tH.moreThanX = function ensureMoreThanXJqueryElements(jquery, count) {
+     tH.verify(function verifySearchResults() { //verify more than 6
+     return $(jquery).length > count
+     });
+     }
+
+     tH.clickOne = function clickOne(jquery, index) {
+     tH.run(function clickOne() { //verify more than 6
+     index = sh.dv(index, 0);
+     var elements = $(jquery);
+     if ( index < 0) {
+     index = elements.length+ index;
+     }
+     var element = $(jquery).children()[index];
+     // console.log('...function to run' , elements.length, index, element, elements )
+     //  console.log('...function to run' , element.text())
+     $(jquery).children()[index].click();
+     });
+     }*/
+}
+defineTestMethods();
+
+
+function defineCompoundMethods() {
+    tH.waitForHide = function waitForHide(jquery, waitForFailureReason, parentJq) {
+        var dbgWait = false;
+        if ( waitForFailureReason )
+            tH.waitForError = waitForFailureReason + ' (waitForHide) ' + jquery
+        tH.waitFor(function isUIHidden(){ //waitForHide
+            //var jquery = tH.convertJquery(jquery)
+            var jq = tH.convertJquery2(jquery)
+            if ( jq.length == 0 || parentJq !=  null ) {
+                jq = testHelper.findByContent(jquery, parentJq, true )//try to search for name)
+            }
+            if ( jq.length == 0 ) {
+                console.warn('jqueryIs 0 length', jquery, 'isUIHidden')
+                return false;
+            }
+            var opacity = $(jquery).css("opacity");
+            var isVislbe= $(jquery).is(":visible");
+            if ( dbgWait ) {
+                console.log('opacit', jq, opacity, isVislbe)
+            }
+            if ( opacity == "0") {
+                return true
+            }
+            return false==isVislbe
+        });
+    };
+
+
+    tH.waitForNone = function waitForNone(jquery, waitForFailureReason, parentJq) {
+        var dbgWait = false;
+        if ( waitForFailureReason )
+            tH.waitForError = waitForFailureReason + ' (waitForHide) ' + jquery
+        tH.waitFor(function isUIHidden(){ //waitForHide
+            //var jquery = tH.convertJquery(jquery)
+            var jq = tH.convertJquery2(jquery)
+            if ( jq.length == 0 || parentJq !=  null ) {
+                jq = testHelper.findByContent(jquery, parentJq, true )//try to search for name)
+            }
+            if ( jq.length == 0 ) {
+                if ( dbgWait ) {
+                    console.log('none found, so all good', jq, opacity, isVislbe)
+                }
+                return true
+            }
+            var opacity = $(jquery).css("opacity");
+            var isVislbe= $(jquery).is(":visible");
+            if ( dbgWait ) {
+                console.log('opacit', jq, opacity, isVislbe)
+            }
+            if ( opacity == "0") {
+                return true
+            }
+            return false==isVislbe
+        });
+    };
+
+
+    tH.waitForShow = function waitForShow(jquery, waitForFailureReason, parentJq, times ) {
+
+        var s = new Error().stack
+        var stepMsg = [waitForFailureReason,'(waitForShow) ',
+            jquery, parentJq, s].join(' ')
+
+        /* if ( waitForFailureReason ) {
+         tH.waitForError = [waitForFailureReason,'(waitForShow) ',jquery, parentJq].join(' ')
+         }
+         else {
+         tH.waitForError = '' + ' (waitForShow) ' + jquery
+         }*/
+        tH.waitForError = stepMsg;
+        tH.waitFor(function isDialogVisible_waitForShow(){ //waitForHide
+            try {
+                var jq = tH.convertJquery2(jquery)
+            } catch (e) {
+                console.error('could not convert', e, 'is bad name?')
+            }
+            if ( jq.length == 0 || parentJq != null ) {
+                jq = testHelper.findByContent(jquery, parentJq)//try to search for name)
+            }
+            tH.moveCursorTo(jq)
+            if ( jq.length == 0 ) {
+                console.warn('jqueryIs 0 length', jquery)
+                return false;
+            }
+            /*if ($(jquery) != "0") {
+             return true
+             }*/
+            if ($(jq).css("opacity") == "0") {
+                return false
+            }
+            return true==$(jq).is(":visible");
+        });
+    };
+    tH.verifyHidden = function verifyHidden(jquery) {
+        tH.waitFor(function isDialogVisible(){ //waitForHide
+            var jquery = tH.convertJquery(jquery)
+            if ($(jquery).css("opacity") == "0") {
+                return true
+            }
+            return false==$(jquery).is(":visible")
+        });
+    };
+    tH.verifyShow = function verifyShow(jquery) {
+        tH.verify(function isDialogVisible(){ //waitForHide
+            if ($(jquery).css("opacity") != "0") {
+                return true
+            }
+            return true==$(jquery).is(":visible")
+        });
+    };
+    tH.moreThanX = function ensureMoreThanXJqueryElements(jquery, count) {
+        tH.verify(function verifySearchResults() { //verify more than 6
+            return $(jquery).length > count
+        });
+    }
+
+    tH.clickOne = function clickOneOfElementsInJquery(jquery, index) {
+        tH.run(function clickOne() { //verify more than 6
+            index = sh.dv(index, 0);
+            var elements = $(jquery);
+            if ( index < 0) {
+                index = elements.length+ index;
+            }
+            var element = $(jquery).children()[index];
+            // console.log('...function to run' , elements.length, index, element, elements )
+            //  console.log('...function to run' , element.text())
+            $(jquery).children()[index].click();
+        });
+    }
+
+
+    tH.set = function setTextField(jquery, text, _pretendToType) {
+        var pretendToType = tH.settings.pretendToType;
+        if ( _pretendToType ){
+            pretendToType = false
+            if ( _pretendToType == true || _pretendToType == 'true') {
+                pretendToType = true
+            }
+        }
+        tH.runAsync(function setText() { //verify more than 6
+            // debugger;
+            if ( $.isFunction(jquery)) {
+                element = jquery();
+            }  else {
+                var element = $(jquery)
+            }
+            element = tH.utils.filterVisible(element)
+            if ( element.length == 0 ) {
+                tH.fail('did not find items for',sh.qq( jquery), 'set to',sh.qq( text) )
+            }
+
+            var setHelper = sH = {};
+            sH.data = {};
+            sH.focusIn = function focusIn() {
+                element.focus();
+                // $(jquery).keydown();
+                var e = new Event("keydown");
+                e.key="a";    // just enter the char you want to send
+                e.keyCode=e.key.charCodeAt(0);
+                e.which=e.keyCode;
+                e.altKey=false;
+                e.ctrlKey=true;
+                e.shiftKey=false;
+                e.metaKey=false;
+                e.bubbles=true;
+                element[0].dispatchEvent(e)
+
+                sH.setValue();
+
+                sH.data.originalBoxShadow = element.css('box-shadow')
+                element.css('box-shadow','0px 0px 4px #666666');
+
+            }
+            sH.setValue = function setValue() {
+
+                //element.keyup();
+                tH.moveCursorTo(element);
+                console.log('setting ', jquery, 'to text()')
+                if ( pretendToType != true ) {
+                    element.val(text)
+                    element.change();
+                    sH.focusOut();
+                } else {
+                    var chars = [];
+                    for ( var i = 0; i < text.length; i++ ) {
+                        chars.push(text.charAt(i))
+                    }
+                    element.val('')
+                    $.each(chars, function onEachChar(i, char ) {
+                        setTimeout(function typeChar() {
+                            var textSt = text.slice(0,i+1)
+                            console.log('textSt', i, text.length, textSt)
+                            element.val(textSt)
+                            element.keydown();
+                            element.keypress();
+                            element.keyup();
+                            //element.blur();
+                            element.change();
+                            if ( i == text.length -1 ) {
+                                sH.focusOut();
+                            }
+                        }, 140*i);
+                    })
+                }
+
+            }
+            sH.focusOut = function focusOut() {
+
+                var e = new Event("keyup");
+                e.key="a";    // just enter the char you want to send
+                e.keyCode=e.key.charCodeAt(0);
+                e.which=e.keyCode;
+                e.altKey=false;
+                e.ctrlKey=true;
+                e.shiftKey=false;
+                e.metaKey=false;
+                e.bubbles=true;
+                element[0].dispatchEvent(e)
+
+                element.focusout();
+                element.blur();
+                element.css('box-shadow',sH.data.originalBoxShadow);
+                sH.nextLinkInChain();
+            }
+
+            sH.nextLinkInChain = function nextLinkInChain() {
+                setTimeout(function waitToContinue(){
+                    tH.test.cb();
+                }, 500)
+            }
+
+            sH.focusIn()
+
+
+
+        });
+    }
+    tH.setItem = tH.set;
+
+    tH.makeRed = function makeRed(jquery, text) {
+        tH.run(function makeRed() { //verify more than 6
+            $(jquery).css({color:'red !important'})
+            $(jquery).css({'background-color':'black'})
+            $(jquery).css('cssText', 'color: red !important');
+        });
+    }
+    tH.makeGreen = function highlightGreen() {
+        //on_finishedTest
+        tH.run(function makeGreen() { //verify more than 6
+            $('#testLogPanel').css({'background-color':'#C3E5C4'});
+            debugger;
+            window.location.hash =tH.windowLocationHash;
+        });
+    }
+
+
+
+    /* tH.evalFx = function evalFx() {
+     tH.run(function makeGreen() { //verify more than 6
+     $('#testLogPanel').css({'background-color':'#C3E5C4'});
+     debugger;
+     window.location.hash =tH.windowLocationHash;
+     });
+     }*/
+
+
+    tH.moveCursorTo = function moveCursorTo(jquery) {
+        var jqueryOrig = jquery;
+        //todo have another annotation ... that is blue area to show click spot
+        //prob move cursor to far right
+        var annotation = $('#annotation')
+        annotation.show();
+
+        jquery = tH.convertJquery(jquery)
+
+        var element = $(jquery)
+        if ( element.length == 0 ) {
+            //not found
+            return;
+        }
+        /*var position = $(element).offset();
+         if ( position == null ) {
+         console.warn('position si null', element, position)
+         return;
+         }*/
+
+        if ( jquery.trigger == null ) {
+            var element = $(jquery)
+            var position = $(element).offset();
+
+            position.left += element.width();
+        } else {
+            element = $((jquery));
+            var position = $(element).offset();
+
+            //  if ( jquery.offsetWidthForAnnotation ) {
+            //   position.left += element.width(); //yes, go to left when element are passed in
+            //  }
+        }
+
+
+
+        if ( position == null ){
+            console.warn('failed to cursor to ', jquery, 'position was null')
+            return;
+        }
+        //var dbg = [position.left , $('body').width()]
+        //debugger;
+        if ( position.left >= $('body').width() * .80 ) {
+            delete position.left;
+            position.right = 20;
+            console.log('move on left size')
+            //positon.left = $('body').width - 250;
+        }
+
+        if ( position.left != null ) {
+            position.left += element.width();
+            position.left -= 0.1*element.width(); //nudge over so inside component
+            // position.left -= 10;
+        }
+
+
+
+        position.top += 10;
+
+        // console.log('where is', jquery, position)
+        annotation.css(position)
+
+
+
+
+        if ( position.top < 11 || position.left < 11 ) {
+            //console.error('moving to','odd position',
+            //jquery, position, element)
+        }
+
+
+        //element.find('.'+tH.data.blueAreaClass).remove();
+        if ( tH.data.dictBlueAnnotations == null ) {
+            tH.data.dictBlueAnnotations = {};
+        }
+
+        var annotationHelper = aH = {};
+        aH.clerAnnotations = function clerAnnotations() {
+            var m = $('.' + tH.data.blueAreaClass)
+            m.remove();
+        }
+        aH.addAnnotations = function addAnnotations() {
+            var prevAnnoations = tH.data.dictBlueAnnotations[jqueryOrig]
+            prevAnnoations = jquery[0].prevAnnoations;
+            $.each(jquery, function removePrevAnno(k, ui) {
+                // console.debug(k, ui)
+                var prevAnnoations = ui.prevAnnoations;
+                if (prevAnnoations) {
+                    //   console.debug('oooo')
+                    prevAnnoations[0].remove();
+                }
+                if ($(ui).hasClass(tH.data.blueAreaClass)) {
+                    // console.debug('has a thing', ui)
+                    $(ui).text('asdfasdf')
+                    //  $(ui).remove();
+                    // $(ui).empty()
+                    ui.remove()
+                }
+            })
+
+            var m = jquery.find('.' + tH.data.blueAreaClass)
+            m.remove();
+            m.empty()
+            //console.debug('first arr', prevAnnoations, jquery.length, jquery[0].prevAnnoations, m)
+            if (prevAnnoations) {
+                //prevAnnoations.remove();
+                //asdf.g
+                prevAnnoations[0].remove()
+                prevAnnoations.empty()
+            }
+
+            //  debugger;
+
+            var firstElement = $(element[0]) //important or we will duplicae extra items
+            firstElement.css('color', 'orange');
+            uiUtils.reset();
+            var blueArea = uiUtils.addFloatingDiv()
+            blueArea.css('z-index', 100000)
+            //var blueArea = uiUtils.getLast();
+            blueArea.addClass(tH.data.blueAreaClass)
+            uiUtils.opac(0.3)
+            uiUtils.bg('#002F64')
+            uiUtils.copySize(firstElement, blueArea)
+            uiUtils.copyPosition(firstElement, blueArea)
+            var firstElementClone = firstElement.clone();
+            firstElementClone.css('color', 'orange');
+            blueArea.append(firstElementClone)
+            //return
+            uiUtils.addOverlay(blueArea, '#002F64');
+            uiUtils.bg('#002F64')
+
+            jquery[0].prevAnnoations = blueArea;
+            tH.data.dictBlueAnnotations[jqueryOrig] = blueArea;
+            uiUtils.reset();
+        }
+        aH.clerAnnotations();
+        aH.addAnnotations();
+
+        setTimeout(aH.clerAnnotations, 100)
+    }
+    tH.pointTo = function pointTo(jquery, msg ) {
+        tH.run(function add(){
+            tH.pointToNow(jquery,msg)
+            return;
+            if ( tH.pointedTo != true ) {
+                tH.pointedTo = true
+                $("<style>   .tz-framework-annotation {    box-shadow: 3px 3px 5px #c4c4c4;      position: absolute;        top: 40px;        padding: 0px 5px;        margin-left: 30px;        background-color: #F05A28;       border-radius: 0px;        border: 1px solid #C6360A;        color: white;  }</style>                ").appendTo("head");
+            }
+
+            var annotation = $('<div class="tz-framework-annotation" >  </div> ');
+
+            var glyph = $('<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>');
+            annotation.append(glyph)
+            annotation.append(msg)
+
+            if ($.isFunction(jquery)) {
+                var fxJquery = jquery;
+                jquery = fxJquery();
+            }
+
+            if ( jquery.trigger == null ) {
+                var element = $(jquery)
+                var position = $(element).offset();
+                position.left += element.width();
+            } else {
+                element = $((jquery));
+                var position = $(element).offset();
+            }
+
+            //var dbg = [position.left , $('body').width()]
+            //debugger;
+            if ( position.left >= $('body').width() * .80 ) {
+                delete position.left;
+                position.right = 20;
+                //positon.left = $('body').width - 250;
+            }
+            annotation.css(position)
+            $('body').append(annotation)
+        })
+    }
+
+    tH.pointToNow = function pointToNow(jquery, msg ) {
+        if ($.isFunction(jquery)) {
+            var fxJquery = jquery;
+            jquery = jquery();
+        }
+        //debugger;
+        if ( jquery == null ) {
+            console.info('cannot log b/c item is null', msg)
+            return;
+        }
+
+
+        if ( tH.pointedTo != true ) {
+            tH.pointedTo = true
+            $("<style>   .tz-framework-annotation {  z-index:10001;   box-shadow: 3px 3px 5px #c4c4c4;      position: absolute;        top: 40px;        padding: 0px 5px;        margin-left: 30px;        background-color: #F05A28;       border-radius: 0px;        border: 1px solid #C6360A;        color: white;  }</style>                ").appendTo("head");
+        }
+
+        tH.scrollToNow(jquery)
+        var annotation = $('<div class="tz-framework-annotation" >  </div> ');
+
+        var glyph = $('<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>');
+        annotation.append(glyph)
+        annotation.append(msg)
+
+        if ( jquery.trigger == null ) {
+            var element = $(jquery)
+
+
+        } else {
+            element = $((jquery));
+        }
+
+        //debugger;
+
+
+
+        if ( element ) {
+            var position = $(element).offset();
+            position.left += element.width();
+        }
+        if ( position == null ) {
+            position = {};
+        }
+
+        //var dbg = [position.left , $('body').width()]
+        //debugger;
+        var pageWidth = $('body').width()
+        if ( false && position.left >= pageWidth * .80 ) {
+            position.right = pageWidth - position.left;
+            delete position.left;
+            console.info('switching alignment to right for', msg)
+            //positon.left = $('body').width - 250;
+        }
+
+        annotation.css(position)
+        console.log('change to date', position, msg)
+        $('body').append(annotation)
+    }
+    tH.clearPointers = function clearPointers(jquery, msg ) {
+        tH.run(function clearPointers(){
+            var annotations = $('.tz-framework-annotation');
+            annotations.remove();
+        })
+    }
+    tH.scrollTo = function body(jquery) {
+        tH.run(function makeRed() { //verify more than 6
+            $('html, body').animate({
+                scrollTop: $(jquery).offset().top
+            }, 500);
+        });
+    }
+
+    tH.scrollToNow = function body(jquery) {
+        $('html, body').animate({
+            scrollTop: $(jquery).offset().top
+        }, 300);
+    }
+
+    tH.scrollToTopNow = function () {
+        window.scrollTo(0, 0);
+    }
+
+    tH.scrollToTop = function () {
+        tH.run(function scrollToTopWrapper() {
+            tH.scrollToTopNow()
+        })
+    }
+    tH.getUIElement = function getUIElement( query , startOnElement) {
+        if ( query == null ) {
+            query = {}
+            query.type
+            query.attrs
+            query.attrsNotEq
+            query.children = [] //array, each level re applies query
+            var query = {
+                type:'input',
+                //text:'Des',
+                //html:'Des',
+                textEq:null,
+                attrs:{type:'radio', value:'Desk'},
+                children:['#DICERId','div' ]
+            }
+        }
+        function q(val) {
+            return "'"+val+"'"
+        }
+        var jquery = '';
+        if ( query.jquery ) {
+            jquery = query.jquery;
+        }
+        if ( query.id ) {
+            jquery = '#'+query.id.replace('#','');
+        }
+
+        if ( query.type ) {
+            jquery += query.type;
+        }
+        if ( query.attrs ) {
+            var attrsQuery = ''
+            $.each(query.attrs, function addAttr(k,v) {
+                attrsQuery += '['+k+'='+q(v)+']'
+            })
+            jquery += attrsQuery;
+        }
+        if ( query.text ) {
+            jquery += ":contains("+query.text+")";
+        }
+
+        if ( startOnElement == null ) {
+            startOnElement = $;
+        }
+        if ( query.childOf ) {
+            query.children = query.childOf;
+        }
+        if ( query.children ) {
+            //
+            //jquery += query.type;
+            var currentElement = startOnElement;
+            $.each(query.children, function (k,nestingQuery) {
+                currentElement = getUIElement(nestingQuery, currentElement)
+            });
+            startOnElement = currentElement;
+        }
+        //debugger;
+        if ( startOnElement != $ )
+            startOnElement = $(startOnElement);
+        // debugger;
+        var items
+        if (query.debug || true == true ) {
+            console.info('query is', jquery, query)
+        }
+        if ($.isString(query)) {
+            items  = startOnElement.find(query);
+        } else {
+            items = startOnElement.find(jquery)
+        }
+        // console.log('in')
+        // debugger
+        if ( query.html ) {
+            var filteredResults = [];
+            $.each(items, function filterChildren (k,ui) {
+                //debugger;
+                if ( $(ui).html().indexOf(query.html) != -1 ) {
+                    filteredResults.push(ui)
+                }
+            });
+            var allItems = items;
+            items = filteredResults;
+        }
+        if ( query.getParentUpUntil ) {
+            var parent = $($(items).parent());
+            //debugger;
+
+            while( parent != null ) {
+                if ( parent.is(query.getParentUpUntil)  ) {
+                    return $(parent);
+                }
+                parent = $(parent.parent());
+
+            }
+            console.error('could not find parent')
+            return [];
+        }
+        return items;
+    };
+}
+defineCompoundMethods();
+
+
+function defineContinuitiyMethods() {
+    tH.nextTest = function nextTest(testName_, text) {
+        var config = {};
+        config.testName = testName_
+        uiUtils.setVal('nextTest', config);
+    }
+    //check for next test
+    function checkForNextTest() {
+
+        //if cookie, reset to null
+        var nextTest = uiUtils.getVal('nextTest');
+
+        // debugger;
+        if ( nextTest) {
+            window.testInProgress = true;
+            //debugger;
+            uiUtils.setVal('nextTest', null); //clear cookie
+            if ( tH.params.runTest=='true' ){
+                console.log('have next test, but runTest is true')
+                return;
+            }
+            function runTestX(testName, testDelay) {
+                var testDelay = parseInt(testDelay)
+                testDelay= sh.dv(testDelay, 0);
+                // debugger;
+                if ( testName ){
+                    console.info(
+                        'Running test', testName, ''
+                    )
+
+                    setTimeout(function runTest_WhenUserTestsLoaded() {
+                        if ( window.testsLoaded != true ) {
+                            console.warn('tests not loaded yet')
+                            setTimeout(runTest, 200+testDelay)
+                            return;
+                        }
+                        debugger; //debug this 12-17-2016-is it correct?
+                        tH.runTest(testName)
+                    }, 200+testDelay)
+                } else{
+                    runTest();
+                }
+            }
+
+            runTestX(nextTest.testName)
+        }
+    }
+
+    checkForNextTest()
+
+}
+defineContinuitiyMethods();
+
+function defineTimeHelpers () {
+    tH.getTimer = function getTimer(str){
+        var time = tH.timers[str]
+        var diff = new Date().getTime() - time.getTime();
+        diff = diff / 1000
+        return diff;
+    }
+    tH.setTimer = function setTimer(str) {
+        if ( tH.timers == null ) {
+            tH.timers = {};
+        }
+        tH.timers[str]=new Date();
+    }
+}
+defineTimeHelpers()
+if ( typeof $ === 'undefined' ) {
+    var jqueryImpersonator = {};
+    function JqueryImpersonatorFx() {
+        var self  = this;
+        self.css = function () {
+        }
+        self.click = function click() {
+        }
+
+        return self;
+    };
+    JqueryImpersonatorFx.isFunction = function (x){}
+    var $ = JqueryImpersonatorFx
+}
+
+
+tH.runTest = function runTest(testName, arg1, arg2, arg3) {
+    if ( tH.test ) {
+        tH.test.stop();
+        console.debug('stopped old test', tH.test)
+    }
+    tH.currentTestName = testName;
+    window.lastRunTestName = testName;
+
+
+    if ( tH.settings.doNotUpdateArgsOnNextTest_changeOnNext ) {
+        tH.settings.doNotUpdateArgsOnNextTest = false;
+    }
+    var definitionTest = 'defs.js.txt'
+
+    if ( arg1 && arg1.includes(definitionTest)) {
+        tH.settings.doNotUpdateArgsOnNextTest = true; //reload rela test when defs changed
+        setTimeout(function onReload(){
+            if ( window.lastRunTestName && window.lastRunTestName.includes(definitionTest)) {
+                return;
+            }
+            console.info('got a def, so rerunning last test')
+            tH.rerunLastTest()
+        }, 1000)
+    }
+
+    if ( tH.settings.doNotUpdateArgsOnNextTest == true  ) {
+        tH.settings.doNotUpdateArgsOnNextTest_changeOnNext = true;
+    } else {
+        window.lastRunArg1 = arg1;
+        window.lastRunArgs = uiUtils.args(arguments)
+        uiUtils.addToUrl('testName', testName)
+        uiUtils.addToUrl('arg1', arg1, true)
+    }
+
+    window.tests[testName](tH, arg1, arg2, arg3);
+
+
+    // tH.settings.doNotUpdateArgsOnNextTest = false;
+    //debugger;
+    // window.testHelper.fxStartNextTest();
+}
+
+tH.rerunLastTest = function reRunLastTest() {
+    tH.runTest(window.lastRunTestName, window.lastRunArg1);
+}
+
+function whenReady(){
+    if ( window.whenReadyHasRunTesting ) {
+        return;
+    }
+    window.whenReadyHasRunTesting = true;
+    //http://localhost:10050/test2/test2.html?runTest=true
+    if ( tH.params.runTest=='true' || window.runTest == true ) {
+        var testName = tH.params.testName;
+        var testDelay = parseInt(tH.params.testDelay);
+        testDelay= sh.dv(testDelay, 0);
+        if ( isNaN(testDelay)) {
+            testDelay = tH.settings.defaultTestDelay;
+        }
+        if ( testName ){
+            //debugger
+            console.info(
+                'Running test', testName, '', window.tests, testDelay
+            )
+            setTimeout(function runTest_WhenTestFrameworkLoaded() {
+                if ( window.tests.loaded != true ) {
+                    setTimeout(runTest, 500);
+                    console.debug('waiting for test to load...')
+                    return;
+                };
+                // debugger
+                tH.runTest(testName)
+            }, 200+testDelay)
+        } else{
+            runTest();
+        }
+    } else {
+
+        console.log(
+            'Skipped All tests....', tH.params.testName,
+            tH.params.runTest
+        )
+    }
+
+}
+whenReady()
+
+
+function runTest() {
+    /*.add(self.searchByName)
+     .log()
+     // .add(self.getFirstQuery)
+     //  .add(self.convertMagnetLinkToTorrent)
+     .log()
+     .add(self.returnMagnetLink)
+     .end();*/
+    var t = tH.createNewTest();
+    tH.test = t;
+
+    /*setTimeout(function lateAlert(){
+     alert('...')
+     }, 1000)*/
+//changeLocation('http://www.yahoo.com') //forward to another url ... and test
+    tH.clickJ('#btnTest');
+    tH.verifyExists('#btnTest')
+    tH.click('test')
+    tH.click('test 2', false)
+    tH.log('before waitfor')
+    tH.waitFor(function(){
+        return window.y == 5
+    })
+    tH.log('after waitfor')
+}
+
+//http://localhost:10050/test2/test2.html?runTest=true&testName=testA
+function testStackingDemo2B(runIt) {
+// return
+    window.tests.testA = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.click('test 2');
+        tH.log('test 2');
+        tH.wait(1);
+        tH.log('test 2');
+        tH.set('#txtArea', 'set the text')
+        /*tH.run(function(){
+
+         })*/
+        tH.run(function(){
+            alert('ran test 2')
+        });
+    }
+    if ( runIt ) {
+        window.tests.testA(tH);
+    }
+}
+testStackingDemo2B();
+
+//http://localhost:10050/test2/test2.html?runTest=true&testName=testFeatures2
+function testStackingDemo3() {
+    var iteration = 0;
+    window.tests.testFeatures2 = function defineTestA(tH) {
+        var t = tH.createNewTest();
+        tH.click('test 2');
+        tH.log('test 2 iteration:'+(iteration+1) )
+        tH.run(function maybeShow(){
+            $('#txtArea').text('Test1')
+            setTimeout(function () {
+                if ( Math.random() > 0.5 ){
+                    $('#txtArea').text('TestChanged')
+                };
+            }, 3000);
+        })
+        tH.wait(1)
+        tH.waitFor(function doesTextEaqualTestChanged(){
+            return $('#txtArea').text() == 'TestChanged'
+        }, 4, 1000, false)
+        tH.run(function testIfShown(){
+            var shown = $('#txtArea').text() == 'TestChanged';
+            if ( shown ) {
+                tH.log2('<div class="alert-warning">saw it</div>')
+                console.debug('was shown....')
+            } else {
+                tH.log2('<div class="alert-warning">not</div>')
+                tH.test.stop();
+                setTimeout(function runTestLater() {
+                    window.tests.testFeatures2(tH);
+                }, 10)
+            }
+        })
+        tH.log('test 2 ' + iteration)
+        tH.run(function(){
+            // alert('ran test 2')
+            if ( iteration > 3)
+                return;
+            iteration++
+            setTimeout(function runTestLater() {
+                window.tests.testFeatures2(tH);
+            }, 10)
+        })
+    }
+    window.tests.testFeatures2.desc = 'Try to test 2 features'
+}
+testStackingDemo3();
+
+
+//http://localhost:10050/test2/test2.html?runTest=true&testName=testA
+function testCSVTest(runIt) {
+// return
+
+    window.tests.testCSV = function define_testCSV(tH, urlX, urlConst, skipRun) {
+        //var i = new TestCSV()
+        var i = new TestCSVConvertor();
+        // i.getTestScript('csvScripts/testCSVScript.txt', onGot)
+        //var url = 'csvScripts/testCSVScript.txt';
+        var lastArg1 = uiUtils.getUrlVal('arg1')
+
+        if ( urlX == null && lastArg1 ){
+            console.debug('using last var', lastArg1)
+            urlX = lastArg1;
+        }
+        var url = 'csvScripts/test.txt';
+        if ( urlX && urlX.startsWith('http') == false ) {
+            url = urlX;
+            url = urlBase=urlX.split('test3/')[1]
+        }
+
+        if ( window.preamble ) {
+            url = window.preamble + url
+        }
+        if ( urlX ) {
+            if ( urlX.startsWith('http') == true) {
+                url = urlX;
+            } else {
+                if ( window.preamble) {
+                    url = window.preamble + urlX;
+                }
+            }
+            if ( window.preamble
+                && window.preamble.length > 0 &&
+                urlX.startsWith(window.preamble) == true) {
+                url = urlX; //why: ok b/c proper starting char
+            }
+        }
+
+
+        if (urlConst) {
+            url = urlConst;
+        }
+
+        lastArg = url;
+        if (url && url.startsWith(window.preamble)) {
+
+            lastArg = url.replace(window.preamble, '')
+
+        }
+        //  debugger
+        if ( skipRun != true && tH.settings.doNotUpdateArgsOnNextTest != true)
+            uiUtils.addToUrl('arg1', lastArg)
+
+
+        var fileUrl = '';
+        if ( url ) {
+            var fileUrl = url.split('/')
+                .slice(-1)
+                .join('/')
+        }
+        tH.logNow('url:', fileUrl)
+
+        console.log('url:', url)
+
+        if ( window.testStop ) {
+            window.testStop()
+        }
+        //end the current test
+        //tH.
+
+        // debugger
+        i.loadScript2(url, onGotItem2_Redirect, fxFail)
+        function onGotItem2_Redirect(objs, str, txt) {
+            try {
+                onParseTestItems(objs, str, txt)
+            } catch ( e ) {
+                console.error('Error', 'issue parsing test')
+                console.error(e)
+            }
+        }
+
+        function fxFail() {
+            tH.fail('could not load the url', url)
+        }
+
+        function onParseTestItems(objs, str,txt) {
+            var t = tH.createNewTest();
+            //convertor(contents)
+            // debugger
+            console.log('objs', objs)
+            $.each(objs, function onAddConvertedTestStep(k,v) {
+                var fx = v[v.fx]
+                var fx = tH[v.fx]
+                if ( v.fx =='evalFx') {
+
+
+                    var evalName = v.args[0];
+                    var runEval = v.args[1]==true;
+
+                    var evalOffset = 2;
+                    if ( v.args.defName ) {
+                        evalName = v.args.defName;
+                        runEval = v.args.runDefOnInit
+                        evalOffset = 1;
+                        v.lines.unshift('function ' + v.args.fxSignature+'{')
+                        v.lines.push('}')
+                    }
+
+                    var str = '\n';
+                    for ( var i = 0; i < v.line+evalOffset; i++ ) {
+                        str += '\n'
+                    }
+
+                    var evalTxt = str+v.lines.join('\n')
+
+                    if ( runEval ) {
+                        tH.add(function runEval_AtDef() {
+                            console.debug('storing fx', evalName)
+                            tH.logNow('storing fx', evalName)
+                            console.debug('running stored fx', evalName, evalTxt.trim())
+                            tH.logNow('running stored fx', evalName, tH.defaultAddNextOffset)
+                            //eval(evalTxt);
+
+                            try {
+                                tH.setDefaultAddNext()
+                                eval(evalTxt);
+                                tH.resetDefaultAddNext()
+                            } catch ( e ) {
+                                console.error('error running eval', evalName)
+                                console.error(e)
+                                console.error(e.stack)
+                                tH.logNow('error in fx', evalName)
+                                tH.logNow(e)
+                                tH.logNow(e.stack)
+                                tH.fail('see above')
+                            }
+
+                            tH.test.cb();
+                        })
+                    }
+                    if ( evalName != null ) {
+                        window.testHelper.data.dictEvalFx[evalName] = evalTxt;
+
+                        var info = v;
+                        info.needSignatureCalled = v.args.defName != null
+                        window.testHelper.data.dictEvalFx2[evalName] = info;
+
+                    }
+                    return;
+                }
+                if ( v.fx == 'fx' || v.fx == 'fxasync') {
+                    var evalName = v.args[0];
+                    if ( v.args.defName ) {
+                        evalName = v.args.defName;
+                    }
+                    if ( evalName == null ) {
+                        console.error('need a name for', v)
+                        tH.fail('Cannot start test. failed to find fx named',
+                            JSON.stringify(v)
+                        )
+                        return;
+                    }
+                    var evalTxt =  window.testHelper.data.dictEvalFx[evalName];
+                    var fxInfo =  window.testHelper.data.dictEvalFx2[evalName];
+                    if ( evalTxt == null ) {
+                        console.error('could not find evalFx in stored', evalName)
+                        tH.fail('Cannot start test. failed to find fx named', sh.qq(evalName))
+                        throw new Error('cant find')
+                        return;
+                    }
+
+                    function runEval_Later_L() {
+                        tH.data.logging.indent()
+                        //console.debug('running stored fx', evalName, evalTxt.trim(), v.args)
+                        console.debug('running stored fx', evalName, v.args)
+
+                        var strs = [];
+
+                        var argumentsToDef = v.args;
+                        if  ( v.args.args ) {
+                            argumentsToDef = v.args.args;
+                            argumentsToDef.unshift(evalName) ; //inputs are consistent
+                        }
+                        // debugger
+
+
+                        var argVals = [];
+                        /*$.each(argumentsToDef, function copyArg(k,v) {
+                         if ( k == 0 ) { return } //skip evalName
+                         var str = 'var arg'+(k) + ' = ' + '"'+v+'"'
+                         //  console.debug('str', k, str)
+                         strs.push(str)
+                         if ( $.isNumeric(v) == false ) {
+                         v = sh.qq(v)
+                         }
+
+                         argVals.push(v)
+                         })*/
+
+                        $.each(argumentsToDef, function copyArg(k,v) {
+                            if ( k == 0 ) { return } //skip evalName
+                            var str = 'var arg'+(k) + ' = ' + '"'+v+'"'
+                            var origArg = v;
+                            //  console.debug('str', k, str)
+                            strs.push(str)
+                            //debugger
+                            if ( $.isNumeric(v) == false ) {
+                                v = sh.qq(v)
+                            }
+                            if ( origArg === "true" || origArg === true ) {
+                                v = true
+                            }
+                            if ( origArg === "false" || origArg === false ) {
+                                v = false
+                            }
+                            //
+                            argVals.push(v)
+                        })
+
+
+
+                        tH.logNow.nextFx();
+                        tH.logNow(  '/L1', uiUtils.b(evalName), uiUtils.paren(v.line), tH.defaultAddNextOffset, argVals)
+
+
+                        var codeStr_CreateArgs = strs.join('\n')
+                        //console.debug('code',codeStr_CreateArgs)
+                        eval(codeStr_CreateArgs)
+
+                        if ( fxInfo && fxInfo.needSignatureCalled ) {
+                            //asdf.g
+                            evalTxt += '\n'
+                            var runFxEvalStr = evalName + '('+argVals.join(',') +')';
+                            evalTxt += '\n'+runFxEvalStr;
+                        }
+
+                        var completed = false;
+                        // console.log('arg1', arg1, 'arg2', arg2 )
+                        try {
+                            tH.setDefaultAddNext()
+                            eval(evalTxt);
+                            tH.resetDefaultAddNext()
+                            completed = true;
+                            //debugger
+                        } catch ( e ) {
+
+                            // debugger
+                            try {
+                                tH.fail('see above')
+                            } catch ( e ) {
+                                //  tH.fail('see above')
+                            }
+                            //  debugger
+                            //debugger
+                            console.error('error running eval', evalName)
+                            //console.error(e)
+
+                            console.error('full listing', '\n\t',
+                                evalTxt.trim())
+                            console.error('---', e)
+                            // console.error(e.stack)
+                            tH.logNow('error in fx', sh.qq(evalName))
+                            tH.logNow(e)
+                            tH.logNow(e.stack)
+                            eval(evalTxt);
+
+                            return;
+
+                        }
+                        if ( completed == false ) {
+                            // tH.fail('see above',  sh.qq(evalName))
+                            //debugger
+                        }
+
+                        if ( v.fx != 'fxasync') {
+                            tH.test.cb();
+                        }
+
+                        tH.data.logging.outdent()
+                    }
+                    tH.add(runEval_Later_L)
+                    runEval_Later_L.yData = evalName;
+                    return;
+                }
+                if ( v.fx == 'bookmark') {
+                    var bookmarkName = v.args.join(' ');
+                    var fxBookmark = function bookmark() {
+                        tH.logNow(v.line+'.', 'bookmark', bookmarkName)
+                        tH.test.cb();
+                    }
+                    fxBookmark.bookmarkName = bookmarkName
+                    fxBookmark.fxDesc = 'bookmark: '+bookmarkName
+                    tH.add(fxBookmark)
+                    return;
+                }
+
+                if ( v.fx == 'if') {
+                    //var bookmarkName = v.args.join(' ');
+                    var fxIf = function fxIf() {
+                        tH.logNow('if condition', JSON.stringify(v.args[0]).toString().slice(0,12))
+                        console.log('v', v)
+                        // return;
+                        var firstArg = v.args[0]
+                        var cfg = v.args[0]
+                        // debugger;
+                        var ui = [];
+                        if ( cfg.find ) {
+                            var ui = tH.findByContent(cfg.find, cfg.parent )
+                        }
+                        console.debug('ui', ui)
+                        if ( ui.length > 0 ){
+                            if ( cfg.goto ) {
+                                tH.logNow('   >', 'if condition matched',
+                                    'jump forward to', cfg.goto)
+                                var t = tH.test;
+                                var foundFx = null;
+
+
+                                var fxName = 'remove---'
+
+                                $.each(t.methods, function findBookmark(k,v) {
+                                    console.log('remove', 'pre',k,
+                                        v.fx.fxDesc, v.fx.name)
+                                })
+
+                                console.log(fxName, '...')
+
+                                $.each(t.methods.concat(), function findBookmark(k,v) {
+                                    if ( cfg.goto &&  v && v.fx &&
+                                        v.fx.bookmarkName == cfg.goto) {
+                                        //debugger
+                                        console.error('remove', 'matched', cfg.goto, v.fx.bookmarkName)
+                                        foundFx = true;
+                                        return false;
+                                    }
+                                    console.log('remove', 'rex', k, v.fx.fxDesc, v.fx.name)
+                                    var index = t.methods.indexOf(v);
+                                    t.methods.splice(index, 1)
+                                    t.data.methods.count--;
+                                    /* tH.logNow('removing step ', v.name)
+                                     console.log('removing step ',
+                                     'new size', t.methods.length, v)*/
+                                })
+
+                                console.log('...')
+                                //  console.log('remove', t.methods)
+                                // console.table(t.methods)
+                                //  console.log(JSON.stringify(t.methods))
+                                //debugger
+                                $.each(t.methods, function findBookmark(k,v) {
+                                    console.log('remove', 'list',
+                                        v.fx.fxDesc, v.fx.name)
+                                })
+                            }
+                        } else {
+                            tH.logNow('   >', 'if condition failed')
+                        }
+
+
+                        tH.test.cb();
+                    }
+                    tH.add(fxIf)
+                    return;
+                }
+
+                if ( fx == null ) {
+                    console.error('did not find', v.fx)
+                    return;
+                }
+                console.log('go to', v.fx, fx.name, v.args)
+                //sh.callIfDefined(fx, v.args)
+                fx.apply(this, v.args)
+            })
+
+            function origTest() {
+                tH.click('test 2');
+                tH.log('test 2');
+                tH.wait(1);
+                tH.log('test 2');
+                tH.set('#txtArea', 'set the text')
+            }
+            /*tH.run(function(){
+
+             })*/
+            tH.run(function () {
+                console.debug('ran test 2')
+            });
+        }
+    }
+    window.tests.testCSV.desc = 'load from csv'
+    if ( runIt ) {
+        window.tests.testA(tH);
+    }
+}
+testCSVTest();
+
+
+
+
+
+
+//http://localhost:10050/test2/test2.html?runTest=true&testName=testA
+function testCSVTestP(runIt) {
+// return
+    window.tests.testCSV2 = function define_testCSV2(tH) {
+        //var i = new TestCSV()
+        var i = new TestCSVConvertor();
+        // i.getTestScript('csvScripts/testCSVScript.txt', onGot)
+        //var url = 'csvScripts/testCSVScript.txt';
+        var url = '../test3/csvScripts/testWorkflow1.txt';
+
+        //debugger
+        window.tests.testCSV(tH, url, url)
+    }
+    window.tests.testCSV2.desc = 'load from csv 2'
+    /*if ( runIt ) {
+     window.tests.testA(tH);
+     }*/
+}
+testCSVTestP();
+
+
+
+
+
+function defineTestLoaders() {
+    window.autoTestFrameworko = function autoloadTestFramework() {
+        window.location += '?loadTestFramework=true'
+    }
+}
+defineTestLoaders();
+
+
+/*
+
+ var div = uiUtils.addDialog({
+ id:"ssErrorDialog",
+
+ })
+
+ var ui = uiUtils.getLast();
+ ui.append('sdfsdf')
+ uiUtils.pos.br(ui)
+
+ ///debugger
+ */
+
+
+
+tH.utils.loadDefsOnInit = function loadDefsOnInit() {
+    if ( window.testingFrameworkLoaded !== true ) {
+        console.info('waiting for load to finished')
+        setTimeout(tH.utils.loadDefsOnInit, 300);
+        return;
+    }
+    window.testDefs = 'csvScripts/defs.js.txt';
+    if ( window.testDefs == null ) {
+        return;
+    }
+    var urlDefs = 'csvScripts/defs.js.txt';
+    tH.settings.doNotUpdateArgsOnNextTest = true;
+    tH.runTest('testCSV', urlDefs, null, true)
+}
+
+tH.utils.loadDefsOnInit();
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/test_tab_workflow.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/test_tab_workflow.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/test_tab_workflow.js.txt	(revision )
@@ -0,0 +1,350 @@
+#test for basic csv
+log this test will enter the EU Trading 2 subsite
+log Will create 2 tabs on two pages ,
+log Then verify tabs have been created.
+
+msg Test Tabs
+
+fx closeallpopups
+
+
+
+
+
+//////////////////
+fx removeAllTabs();
+fx removeAllTabs(true);
+
+fx createTab(0,true, 'User Tab 1');
+fx createTab(1,true);
+//TODO: why does it leave site?
+fx goToSubsite('EU Trading-Tabs')
+fx createTab(0,false, 'Subsite Tab 1');
+fx createTab(1,false);
+
+fx removeAllTabs();
+fx removeAllTabs(true);
+/////////////////////////
+endtest
+
+
+
+/*
+fx removeAllTabs();
+fx removeAllTabs(true);
+
+#fx createTab(0,true, 'User Tab 1-t');
+#fx createTab(0,true, 'User Tab 1-t');
+//ensure size is original size plus x
+#fx createTab(0,false, 'User Tab 1-t');
+fx revertTabs('')
+
+#fx alert
+##fx ensureTab('User Tab 1', true)
+
+fx createTab(0,true, 'User Tab 1');
+
+#fx ensureTab('User Tab 1-t', true)
+//fx deleteTabSafe('User Tab 1', true)
+fx ensureTabGone('zzzUser Tab 1',true)
+
+fx deleteTabSafe('User Tab 1', true)
+*/
+
+
+log create tab
+
+fx createTab(0,true, 'User Tab 1');
+log revertTabs
+fx revertTabs('')
+
+
+
+fx createSubsite('EU Trading-Tabs')
+
+fx goToSubsite('EU Trading-Tabs')
+fx createTab(0,false, 'Subsite Tab 1');
+fx ensureTab('User Tab 1', true)
+
+
+fx deleteTabSafe('User Tab 1', true)
+fx ensureTabGone('User Tab 1',true)
+
+#endtest
+
+fx goToSubsite('EU Trading-Tabs')
+
+fx deleteTabSafe('Subsite Tab 1')
+fx ensureTabGone('Subsite Tab 1',true)
+
+
+#endtest
+
+fx removeAllTabs();
+fx removeAllTabs(true);
+
+//verify OPtions on items ... cusotm has non
+//fx createTab(0,true, 'User Tab 1');
+
+
+fx createTab(0,true, 'User Tab 1');
+fx createTab(1,true);
+//TODO: why does it leave site?
+fx goToSubsite('EU Trading-Tabs')
+fx createTab(0,false, 'Subsite Tab 1');
+fx createTab(1,false);
+
+
+fx removeAllTabs();
+fx removeAllTabs(true);
+
+
+endtest
+fx leaveSubsite();
+fx refreshSubsites('EU Trading-Tabs');
+
+
+fx createSubsite('EU Trading-Tabs');
+
+endtest #make a tab
+
+fx removeSubsite('EU Trading-Tabs');
+#endtest
+fx createSubsite('EU Trading-Tabs');
+fx closeallpopups
+endtest
+
+click External Revenue; x42-nav-sidebar
+waitForShow #dialogAddNewTab
+
+fx showdropdown
+
+bookmark running test
+
+
+waitForShow EU Trading-Tabs; wait for subsite in list; #holderMySubsiteList
+click  EU Trading-Tabs; #holderMySubsiteList
+
+
+waitForShow #dialogAddNewTab; ensure the new subsite tab button is visible
+
+
+bookmark clone the first tab
+#click #dialogAddNewTab
+#waitForShow #dialogCloneTabFrom
+#waitForShow Function
+#click Function; #dialogCloneTabFrom
+
+def create-tab
+
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+            indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+            console.log('found eexisting copy of clone');
+
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+            var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+            btnCancel.click()
+            return
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+        window.$scope.layoutToCopy = [name]
+        window.$scope.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.clickNext('OK', '#dialogCloneTabFrom');
+    }
+    tH.setDefaultAddNext()
+    tH.logNow('running create tab?')
+    // cloneTab_QuickIFTabExists();
+    tH.click('#dialogAddNewTab');
+    tH.waitForShow( '#dialogCloneTabFrom')
+    //  tH.click('')
+    tH.addSync(cloneTab_QuickIFTabExists)
+    tH.resetDefaultAddNext();// = false;
+end
+
+def verifySubsiteTab
+    // tH.setDefaultAddNext()
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+        indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone');
+        return
+        }
+         tH.fail('missing subsite tab ', expectedName)
+    }
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    //  tH.resetDefaultAddNext();// = false;
+end
+
+
+fx create-tab; 0
+fx create-tab; 1
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+//fx verifySubsiteTab; 2
+wait .2
+
+bookmark leave page
+
+def refresh_subsites
+    tH.setDefaultAddNext()
+    tH.fx('showdropdown' )
+    tH.waitForShow('Leave Subsite')
+    tH.click('Leave Subsite')
+    tH.waitForHide('Leave Subsite')//,'#holderMySubsiteList')
+     tH.wait(.5)
+    //tH.logNow('clicking', arg1)
+
+    tH.logNow('go to subsite')
+     tH.click('EU Trading-Tabs', '#holderMySubsiteList')
+     window.$scope.subsites.remote.sites.listItems( function() {
+       tH.wait(.5)
+         //click Leave Subsite
+         //waitForHide Leave Subsite
+         //waitForShow EU Trading-Tabs; wait for subsite in list; #holderMySubsiteList
+         //click  EU Trading-Tabs; #holderMySubsiteList
+
+         //console.log('1', arg1);
+         //tH.logNow('clicking', arg1)
+         tH.resetDefaultAddNext()
+         tH.test.cb()
+   }  )
+
+end
+
+fxasync refresh_subsites
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+
+bookmark leaving page
+
+def gotopage
+    tH.setDefaultAddNext()
+    var pageName = arg2
+    var pageMenuLinkText = arg1
+    tH.data.maxTimesNext = 50;
+    tH.click(pageMenuLinkText , 'x42-nav-sidebar');
+  tH.nextTimeoutTime(60)
+    tH.waitForShow(pageName, 'did not switch to '+pageName+' page', '.x42-nav-body-container' )
+   tH.nextTimeoutTime(60)
+    tH.waitForShow('pt-table', 'pt table did not load')
+    tH.log('Navigated to', pageName);
+    tH.resetDefaultAddNext()
+end
+
+
+fx gotopage; Revenue; Revenue
+
+log changed to revenue page
+wait 2
+
+fx gotopage; External Revenue; External Revenue
+
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+endtest
+
+
+click Revenue; x42-nav-sidebar
+eval
+  tH.data.maxTimesNext = 120;
+end
+waitForShow Revenue; waiting for revenue page to load; .x42-nav-body-container
+waitForShow #dialogAddNewTab
+
+click External Revenue; x42-nav-sidebar
+log finished runnign refresh_subsites
+
+waitForShow Revenue; waiting for revenue page to load; .x42-nav-body-container
+waitForShow #dialogAddNewTab
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+endtest
+
+
+
+
+#############################
+endtest
+click button
+
+
+click Leave Subsite
+
+waitForHide Leave Subsite
+
+click Manage Subsites...
+
+waitForShow #dialogManageSubsites
+
+eval close all popups
+  //window.$scope.popups.hideAllDialogs()
+  //window.$subsitesScope.popups.hideAllDialogs()
+
+  var y = testHelper.findByContent('EU Trading-Tabs', $('#dialogManageSubsites') )
+  var tr = y.parents('tr')
+  var trashIcon = tr.find('.fa-trash')
+  console.clear();
+  console.log('trash',y,tr, trashIcon);
+  trashIcon.click()
+end
+
+waitForShow #confirmDialog
+
+#click Cancel; #confirmDialog //ignore
+click OK; #confirmDialog //ignore
+
+
+waitForShow #dialogManageSubsites
+click Close; #dialogManageSubsites
+
+wait 1
+endtest
+click button
+clickJ .redTest //click red button
+clickText jump
+clickText test 2
+log test
+set #txtArea set the text
+set #txtArea; set the text ~use semi colon to delinate args
+set #txtArea |set the text ~use pika to delinate args
+alert new alert
+logNow sdfsdf
+logNext sdfsdfsdf
+log sdfsdfsdfsdfsdf
+wait 2 //wait 2 seoncds
+/*
+block comment
+*/
+--comment
+~some message alert //alias for log
\ No newline at end of file
Index: mp/testingFramework2/testDynamicLocation/test2.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/testDynamicLocation/test2.html	(revision )
+++ mp/testingFramework2/testDynamicLocation/test2.html	(revision )
@@ -0,0 +1,91 @@
+<!DOCTYPE html>
+<html>
+<head>
+    <title>Test Diff Location</title>
+
+    <!-- Prove can work in diff dir -->
+    <script>
+        setTimeout(function hideDiv() {
+            if ( window.$ == null ) {
+                console.log('wait for jquery')
+                setTimeout(hideDiv, 1000);
+                return;
+            }
+            $('#showDiv').hide();
+        }, 500)
+        window.onRedButton = function onRedButton() {
+            console.log('ddd')
+        }
+        window.onShowDiv = function onShowDiv() {
+            console.log('onShowDiv')
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').show();
+            }, 500)
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').hide();
+            }, 5000)
+        }
+       // window.preamble = '/test3/';
+        window.testCallFromEval = function () {
+            console.log('boom')
+        }
+    </script>
+    <script>
+        window.preamble = '../'
+    </script>
+    <script src="../testLL.js"></script>
+
+    <script>
+        function lazyLoadAndRunTest() {
+            loadTestingFramework(function onReady(){
+                testStackingDemo2B(true);
+            })
+        }
+        function autoloadTestFramework() {
+            window.location += '?loadTestFramework=true'
+        }
+    </script>
+
+    <script>
+        setTimeout(function auto_startTestingFramework() {
+            console.log('loading testing framework')
+            loadTestingFramework()
+        },500)
+    </script>
+    <style>
+        body {
+            font-weight: 400;
+            background-color: #CBD9E6;
+            font-family: 'Arial';
+        }
+    </style>
+</head>
+<body>
+<button>Test</button> <br />
+<button onclick="lazyLoadAndRunTest()">LL Test - Run Test</button>  <br />
+<button onclick="tH.clickTest2()">Run Test 2</button>  <br />
+<textarea id="txtArea" ></textarea>
+<button id="btnTest">Test</button>
+<!--
+<div style="display: none; position: fixed; bottom: 10px; right: 10px" id="testLogPanel" >
+    asdf
+</div>
+-->
+
+
+
+<div>
+    <button class="redTest"
+            onclick="onRedButton()" >Go</button>
+
+    <button class="redTest2"
+            onclick="onShowDiv()" >Press for div</button>
+    <div id="showDiv" style="color:white;">
+        this the show div</div>
+</div>
+
+
+</body>
+</html>
\ No newline at end of file
Index: mp/testingFramework2/ui_utils.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/ui_utils.js	(revision )
+++ mp/testingFramework2/ui_utils.js	(revision )
@@ -0,0 +1,2443 @@
+function forwardArgsTo(fx, args) {
+	if (fx == undefined)
+		return;
+	if (args != null && args.length == null) {
+		var args = convertArgumentsToArray(args)
+	}
+	return fx.apply(null, args)
+}
+
+function convertArgumentsToArray(_arguments) {
+	var args = Array.prototype.slice.call(_arguments, 0);
+	return args
+}
+
+
+
+function defaultValue(input, ifNullUse) {
+	if (input == null) {
+		return ifNullUse
+	}
+	return input;
+}
+var dv = defaultValue;
+
+
+function callIfDefined(fx) {
+	var args = convertArgumentsToArray(arguments)
+	args = args.slice(1, args.length)
+
+	if (fx == undefined)
+		return args[0];
+
+
+	// console.debug('args', tojson(args))
+	return fx.apply(null, args)
+	//return;
+}
+
+function convertArgumentsToArray(_arguments) {
+	var args = Array.prototype.slice.call(_arguments, 0);
+	return args
+}
+
+function throwIfNull(prop, msg) {
+	if ( prop == null ) {
+		throw new Error(msg)
+	}
+}
+
+function defineUtils2() {
+	$.async = function asyncHelper(items, fx, fxAllDone, delay, playIndex) {
+		//var index = 0
+		var asyncController = {};
+		asyncController.index = 0;
+		asyncController.getNext = function getNextItem() {
+			var next = items[asyncController.index+1];
+			return next;
+		}
+		if(playIndex>0){
+			asyncController.index = playIndex;
+		}
+		if(playIndex<0){
+			asyncController.index = items.length-1+playIndex;
+		}
+
+		asyncController.length = items.length;
+
+		if ( delay == null && $.isNumeric(fxAllDone)) {
+			delay = fxAllDone;
+		}
+
+		function goToNextSpan() {
+			var item = items[asyncController.index];
+			console.log('playindex', asyncController.index)
+			if (asyncController.index > items.length - 1) {
+				if ( fxAllDone ) {
+					fxAllDone();
+				}
+				return;
+			}
+			fx(/*asyncController.index,*/ item, fxCallback, asyncController, asyncController.index)
+			asyncController.index++;
+
+			function fxCallback() {
+				if (delay) {
+					setTimeout(goToNextSpan, delay);
+					return;
+				}
+				goToNextSpan();
+			}
+		}
+
+		goToNextSpan();
+		asyncController.runIteration = function runIteration() {
+			goToNextSpan();
+		}
+		return asyncController;
+	}
+}
+defineUtils2();
+
+
+var uiUtils = {};
+window.uiUtils = uiUtils;
+
+function defineUtils() {
+	var self = uiUtils;
+	var p = uiUtils;
+	var u = p;
+
+	u.data = {}
+
+	uiUtils.dictCfg = {};
+
+	u.dv = dv;
+	uiUtils.qq = function qq(txt) {
+		return '"' + txt + '"'
+	}
+
+	uiUtils.paren = function paren(txt) {
+		return '(' + txt + ')'
+	}
+
+	uiUtils.b = function b(txt) {
+		return '<b>' + txt + '</b>'
+	}
+
+	$.isString = function isString(objectOrString) {
+		//return (objectOrString instanceof String)
+		return typeof objectOrString == 'string'
+	}
+
+	p.convertArgumentsToArray =
+		p.args =  function convertArgumentsToArray_(_arguments) {
+			var args = Array.prototype.slice.call(_arguments, 0);
+			return args
+		}
+
+	self.clone = function clone(e) {
+		var eee = JSON.stringify(e)
+		return JSON.parse(eee)
+	}
+
+	uiUtils.makeHiderBtn = function makeHiderBtn(jqBtn, jqContainer, parentUI, hideOnInit) {
+		var btnHide = $(jqBtn)
+		if (parentUI) {
+			btnHide = parentUI.find(jqBtn)
+		}
+
+		btnHide.attr('title', 'Hide this element')
+		btnHide.addClass('unselectable2')
+		btnHide.addClass('useFingerPointerCursor')
+
+		var hideContainer = $(jqContainer)
+		if (parentUI) {
+			hideContainer = parentUI.find(jqContainer)
+		}
+
+		function onToggleVisibility() {
+			btnHide.hidden = !btnHide.hidden;
+			if (btnHide.hidden) {
+				hideContainer.hide()
+			} else {
+				hideContainer.show();
+			}
+		}
+
+
+		btnHide.click(onToggleVisibility)
+
+		if (hideOnInit) {
+			setTimeout(function () {
+				onToggleVisibility()
+			}, 150)
+		}
+	}
+
+
+	uiUtils.makePanel = function makePanel(cfg) {
+		throwIfNull(cfg.id, 'need an id')
+		u.cfg.fixId(cfg)
+		var existingUI = $(cfg.id);
+
+
+		if ( cfg.clearOld &&  cfg.id ) {
+			$( cfg.id).remove();
+		}
+
+		if ( existingUI.length > 0 ) {
+			if ( existingUI.length > 0) {
+				console.warn('you have multiple things')
+			}
+			if ( cfg.clearIfFound !== true ) {
+				//if ( cfg.toggleMode != false ) {
+				//		}
+				existingUI.show();
+				var cfg = uiUtils.dictCfg[cfg.id]
+				//debugger;
+				return existingUI.cfg;
+			} else {
+				console.warn('removing existing version')
+				existingUI.remove();
+			}
+		}
+
+		cfg = dv(cfg,{});
+		uiUtils.dictCfg[cfg.id] = cfg;
+
+		var panel = $('<div />')//
+		// style="position: fixed; bottom: 10px; right: 10px;display: none; color:red; " id="testLogPanel">asdf  </div>')
+		panel.attr('id', u.cfg.getId(cfg.id));
+		panel.css('position', 'fixed');
+		panel.css('bottom', '10px');
+		panel.css('left', '10px');
+		panel.css('z-index', '1001');
+		panel.css('background-color', '#f2f2f2');
+		panel.css('padding', '10px');
+		panel.css('border', '1px #666666 solid');
+		//panel.attr('id', cfg.id);
+		//panel.attr('id', cfg.id);
+
+
+		function onCloseDialog () {
+			panel.hide()
+			return;
+		}
+
+		cfg.fxClose = onCloseDialog;
+		//panel.cfg = cfg;
+		//panel.html('sdfsdf');
+		$('body').append(panel);
+		cfg.ui = cfg.panel = panel;
+		uiUtils.lastUI = panel;
+
+	};
+
+	uiUtils.panel = uiUtils.makePanel;
+
+	uiUtils.panel.tr =function makeBrPanel(cfg) {
+		cfg = u.cfg.str(cfg, 'id')
+		cfg = p.panel(cfg);
+		u.clearPositions(cfg.ui)
+		cfg.ui.css('top', '10px');
+		cfg.ui.css('right', '10px');
+	}
+
+	uiUtils.clearPositions = function clearPositions(ui) {
+		ui.css('left', '');
+		ui.css('bottom', '');
+		ui.css('right', '');
+		ui.css('top', '');
+	}
+	uiUtils.panel.br =function makeBrPanel(cfg) {
+		/*if ( cfg.length ) {
+		 var cfg = {ui:cfg}
+		 }*/
+		cfg = u.cfg.str(cfg, 'id')
+		p.panel(cfg);
+		u.clearPositions(cfg.ui)
+		cfg.ui.css('bottom', '10px');
+		cfg.ui.css('right', '10px');
+	}
+
+	uiUtils.panel.bl =function makeBrPanel(cfg) {
+		cfg = u.cfg.str(cfg, 'id')
+		p.panel(cfg);
+		u.clearPositions(cfg.ui)
+		cfg.ui.css('bottom', '10px');
+		cfg.ui.css('left', '10px');
+	}
+
+
+
+	uiUtils.position =function position(lOrUI, t, r, b, bz) {
+		var ui = uiUtils.lastUI;
+
+		var l = lOrUI
+		if ( lOrUI.length ) {
+			ui = lOrUI
+			l = t;
+			t = r
+			r = b
+			b = bz
+		}
+		if (  l != null ) {
+			ui.css('left', l + 'px')
+		} else {
+			if (  l === null ) {
+				ui.css('left', '')
+			}
+		}
+
+		if (  t != null ) {
+			ui.css('top', t + 'px')
+		} else {
+			if (  t === null ) {
+				ui.css('top', '')
+			}
+		}
+
+		if (  r != null ) {
+			ui.css('right', r + 'px')
+		} else {
+			if (  r === null ) {
+				ui.css('right', '')
+			}
+		}
+
+		if (  b != null ) {
+			ui.css('bottom', b + 'px')
+		} else {
+			if ( b === null ) {
+				ui.css('bottom', '')
+			}
+		}
+		/*console.log(
+		 ui,
+		 ui.css('left'),
+		 ui.css('top'),
+		 ui.css('right'),
+		 ui.css('bottom')
+		 )*/
+		//debugger
+
+		/*
+		 if (  t != null )
+		 ui.css('top', t + 'px')
+		 if (  r != null )
+		 ui.css('right', r + 'px')
+		 if (  b != null )
+		 ui.css('bottom', b + 'px')
+		 */
+	}
+
+	u.pos = u.position;
+	u.pos.br = function movetoButtonRight(ui, b, r) {
+		b = dv(b, 10)
+		r = dv(r, 10)
+		u.position(ui, null, null, b, r)
+	}
+
+	uiUtils.makeAbs =function makeAbs(jquery, highPosition) {
+		jquery.css('position', 'absolute');
+		if ( highPosition ){
+			jquery.css('z-index', highPosition+200);
+		}
+
+		uiUtils.position(jquery, 0,0)
+
+	}
+
+	uiUtils.ifFound = function ifFound(id) {
+		if ( id.includes('#') == false ) {
+			id = '#'+id;
+		}
+		var isFound = $(id).length > 0;
+		return isFound;
+	}
+
+	uiUtils.addDefaultCfg = function addDefaultCfg(cfg) {
+		uiUtils.flagCfg = cfg;
+	}
+	uiUtils.flagCfg = {};
+
+	uiUtils.makeCheckbox = function makeCheckbox(cfg, id) {
+		cfg = u.cfg.str(cfg, 'text');
+		u.cfg.addToCfg(cfg, 'id', id);
+		cfg.tag = dv(cfg.tag, 'input');
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+
+		var ui = u.tag(cfg.tag)
+		ui.attr('type', 'checkbox')
+		ui.html(cfg.text)
+
+		if ( cfg.windowProp) {
+			var keyVal = 'store.' + cfg.windowProp;
+			var previousVal = uiUtils.getVal(keyVal);
+
+
+			if (previousVal != null) {
+			} else {
+				if (cfg.defaultValue) {
+					previousVal = cfg.defaultValue;
+				}
+			}
+
+			console.log('keyval', keyVal, previousVal)
+
+			if (previousVal != null) {
+				uiUtils.setVal(keyVal, previousVal);
+				setTimeout(function onLateR(){
+					callIfDefined(cfg.fxChange, previousVal)
+				},500)
+
+				window[cfg.windowProp] = previousVal;
+				var val = eval('window.' + cfg.windowProp);
+				ui.prop('checked', val);
+			}
+		}
+
+
+
+		ui.click(onChangeOptions);
+		function onChangeOptions(event) {
+			console.log('...', cfg.windowProp);
+			var val = ui.is(':checked');
+			if ( cfg.windowProp) {
+				var val = eval('window.'+cfg.windowProp+'='+val );
+				uiUtils.setVal(keyVal, val);
+				//ui.prop('checked', val);
+			};
+
+			callIfDefined(cfg.fxChange, val)
+
+		}
+
+
+
+		//	lbl.css('user-select', 'none');
+		u.addUI(cfg, ui);
+
+		if ( cfg.label ) {
+			uiUtils.addLabel(cfg.label)
+		}
+
+		return cfg;
+	}
+
+	uiUtils.addDropdown = function addLabel(cfg) {
+		cfg = u.cfg.str(cfg, 'text')
+		cfg.tag = dv(cfg.tag, 'select');
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+
+		var ui = u.tag(cfg.tag)
+		ui.html(cfg.text)
+
+		if ( cfg.options ) {
+			$.each(cfg.options, function onAddOtpion(k,v) {
+
+
+				if ( v.value == null ) {
+					v = {value:v, text:v}
+				}
+				console.log('k', v)
+				ui.append($('<option>', /*{
+				 value: item.value,
+				 text: item.text
+				 }*/v ));
+
+			})
+		}
+		//$('<span/>')
+		/*if (cfg.width){
+		 if ( $.isNumeric(cfg.width) ) {
+		 cfg.width = cfg.width+'px';
+		 }
+		 lbl.css('width', cfg.width);
+		 lbl.css('display', 'inline-block');
+		 }
+		 lbl.css('user-select', 'none');*/
+		u.addUI(cfg, ui);
+		return cfg;
+	}
+
+	uiUtils.addDD = uiUtils.addDropdown
+
+	uiUtils.addNumber = function addNumber(cfg) {
+		cfg = u.cfg.str(cfg, 'text')
+		cfg.tag = dv(cfg.tag, 'input');
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+
+		var lbl = u.tag(cfg.tag)
+		lbl.html(cfg.text)
+		//$('<span/>')
+		/*if (cfg.width){
+		 if ( $.isNumeric(cfg.width) ) {
+		 cfg.width = cfg.width+'px';
+		 }
+		 lbl.css('width', cfg.width);
+		 lbl.css('display', 'inline-block');
+		 }
+		 lbl.css('user-select', 'none');*/
+		lbl.attr('type', 'number');
+
+		u.addUI(cfg, lbl);
+		return cfg;
+	}
+
+	uiUtils.addLabel = function addLabel(cfg, id) {
+		cfg = u.cfg.str(cfg, 'text');
+		u.cfg.addToCfg(cfg, 'id', id);
+		cfg.tag = dv(cfg.tag, 'span');
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+
+		var lbl = u.tag(cfg.tag)
+		lbl.html(cfg.text)
+		//$('<span/>')
+		if (cfg.width){
+			if ( $.isNumeric(cfg.width) ) {
+				cfg.width = cfg.width+'px';
+			}
+			lbl.css('width', cfg.width);
+			lbl.css('display', 'inline-block');
+		}
+		lbl.css('user-select', 'none');
+		u.addUI(cfg, lbl);
+		return cfg;
+	}
+	uiUtils.addHeadingLabel = function addLabel(cfg) {
+		cfg.tag = 'h3'
+		uiUtils.addLabel(cfg)
+		return cfg;
+	}
+
+	uiUtils.addDiv = function addDiv(cfg, mergeInCfg) {
+		cfg = u.cfg.str(cfg, 'id')
+		//or .type
+		cfg.tag = dv(cfg.tag, 'div');
+		uiUtils.utils.mergeIn(mergeInCfg, cfg);
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+
+
+		var ui = u.tag(cfg.tag)
+
+		/*if (){
+			//uiUtils.skipNextAdd = true
+		}*/
+
+		ui.html(cfg.text)
+		u.addUI(cfg, ui);
+		if ( cfg.newBaseContainer ) {
+			cfg.lastAddTo = cfg.addTo
+			cfg.addTo = ui;
+		}
+		return cfg;
+	}
+	uiUtils.create =
+		uiUtils.make = uiUtils.addDiv;
+
+	uiUtils.addA =
+	uiUtils.makeA = function makeA(typeOrCfg, justCfg) {
+
+		//make it but dont'add it
+		// uiUtils.skipNextAdd = true
+		var cfg = uiUtils.createA(typeOrCfg, justCfg);
+		//debugger
+		return cfg;
+	}
+
+	uiUtils.createA = function addA(typeOrCfg, justCfg) {
+		var cfg = typeOrCfg
+		if ( justCfg ) {
+			if ( $.isObject( justCfg ) == false ) {
+				throw new Error('bad input')
+			};
+			cfg = justCfg;
+		}
+		if ( $.isString(typeOrCfg)) {
+			cfg = {};
+			if ( $.isObject(justCfg)) {
+				cfg = justCfg
+			}
+			cfg.tag = typeOrCfg
+		}
+		cfg = uiUtils.make(cfg);
+		//debugger
+		return cfg;
+	}
+
+	uiUtils.addFloatingDiv = function addFloatingDiv(cfg) {
+		//var cfg = uiUtils.addDiv(cfg)
+		//var div = uiUtils.getLast()
+		var div = $('<div/>')
+		$('body').append(div)
+		uiUtils.lastUI = div;
+		uiUtils.makeAbs(div);
+		return div;
+	}
+
+
+
+	uiUtils.addDialog = function addFloatingDiv(cfg) {
+		var fxRevenrt = u.addRootTemp()
+		var cfg = uiUtils.addDiv(cfg)
+		fxRevenrt();
+
+		var ui = div = cfg.ui;
+		//var div = $('<div/>')
+		$('body').append(div)
+		uiUtils.lastUI = div;
+		uiUtils.makeAbs(div);
+		uiUtils.position(10,10)
+		if ( cfg.addDefaultStyles != false ) {
+			//panel.attr('id', u.cfg.getId(cfg.id));
+
+			ui.css('position', 'absolute');
+			ui.css('z-index', '1001');
+			ui.css('background-color', '#f2f2f2');
+			ui.css('padding', '10px');
+			ui.css('border', '1px #666666 solid');
+		}
+		if ( cfg.class ) {
+			ui.addClass(cfg.class)
+		}
+		if ( cfg.addPadding != false ) {
+			ui.css('padding', '10px');
+		}
+
+
+		return div;
+	}
+
+
+
+
+	uiUtils.addSpan = function addSpan(cfg) {
+		cfg = u.cfg.str(cfg, 'id')
+		cfg.tag = dv(cfg.tag, 'span');
+		cfg = uiUtils.addDiv(cfg)
+		return cfg;
+	}
+	uiUtils.changeContainer = function focusOnContainer() {
+		uiUtils.flagCfg.lastAddTo = uiUtils.flagCfg.addTo;
+		uiUtils.flagCfg.addTo = uiUtils.lastCfg.ui;
+		//console.log('adding to', uiUtils.flagCfg.addTo)
+	}
+	uiUtils.popContainer = function popContainer() {
+		uiUtils.flagCfg.addTo = uiUtils.flagCfg.lastAddTo;
+	}
+	p.addTitle =function addtitle(cfg) {
+		cfg = u.cfg.str(cfg, 'text')
+		cfg.tag = 'div'
+		u.addLabel(cfg)
+	}
+
+	p.addIcon = function addIcon(iconName) {
+		var cfg = {}; //cfg = u.cfg.str(cfg, 'text')
+		cfg.tag = 'span'
+		var cfg = u.addLabel(cfg)
+		var span = cfg.ui;
+		span.addClass('glyphicon')
+		span.addClass('glyphicon-'+iconName) //+'-circle')
+		return cfg
+	}
+
+	uiUtils.fxTest = function fxTest() {
+		console.log('hello');
+	}
+
+	uiUtils.addBorder = function addBorder() {
+		uiUtils.lastCfg.ui.css('border', 'solid 1px #f2f2f2')
+	}
+
+	uiUtils.makeInline = function makeInline() {
+		uiUtils.lastCfg.ui.css('display', 'inline-block')
+	}
+
+
+	uiUtils.scrollToBottom = function scrollToBottom(jq){
+		//$("body").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 200);
+		$(jq).clearQueue();
+		$(jq).stop(true, true);
+		$(jq).animate({ scrollTop: $(jq).prop("scrollHeight")}, 10);
+	}
+
+
+	uiUtils.scrollToTop = function scrollToTop(jq){
+		//$("body").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 200);
+		$(jq).clearQueue();
+		$(jq).stop(true, true);
+		$(jq).animate({ scrollTop: 0}, 10);
+	}
+
+	uiUtils.addBtn = function addBtn(cfg, fxD) {
+		cfg = u.cfg.str(cfg, 'text')
+		cfg.tag = dv(cfg.tag, 'button');
+		cfg.fxDone = dv(cfg.fxDone, fxD);
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+
+		var btn = u.tag(cfg.tag)
+		btn.html(cfg.text)
+
+		//debugger;
+		/*
+		 if ( cfg.addTo ) {
+		 //debugger;
+		 cfg.addTo.append(btn)
+		 }
+		 */
+
+		u.addUI(cfg, btn)
+
+		btn[0].onclick = cfg.fxDone
+		if ( cfg.fxClick ) {
+			$(btn).on('click', cfg.fxClick)
+		}
+
+		if ( cfg.data ){
+			btn[0].data = cfg.data
+		}
+
+		if ( cfg.addSpacer ) {
+			uiUtils.spacer();
+		}
+
+		btn.addClass('btn')
+		btn.addClass('btn-primary btn-sm')
+		//btn.on('click', cfg.fxDone)
+	}
+	p.addButton = u.addBtn;
+
+
+	uiUtils.addTextInput = function addTextInput(cfg, fxD) {
+		cfg = u.cfg.str(cfg, 'text')
+		cfg.tag = dv(cfg.tag, 'input');
+		cfg.fxDone = dv(cfg.fxDone, fxD);
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+
+		var ui = u.tag(cfg.tag);
+		ui.val(cfg.text)
+
+		if ( cfg.id ) {
+			ui.attr('id', cfg.id);
+		}
+
+		ui.attr('placeholder',cfg.placeholder);
+		if ( cfg.onDebounce ) {
+			u.onChangeDebounced(ui, cfg.onDebounce)
+		}
+
+		//ui.addClass('form-control')
+		ui.addClass('input-sm')
+		u.addUI(cfg, ui);
+		cfg.ui = ui;
+		return cfg;
+	}
+
+	uiUtils.addSelect = function addSelect(cfg, fxD) {
+		cfg = u.cfg.str(cfg, 'text')
+		cfg.tag = dv(cfg.tag, 'select');
+		cfg.fxDone = dv(cfg.fxDone, fxD);
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+
+		var ui = u.tag(cfg.tag)
+		ui.html(cfg.text)
+
+		if ( cfg.id ) {
+			ui.attr('id', cfg.id);
+		}
+		ui.on('change', function onChange() {
+			console.error('y',  this.value );
+		})
+		u.addUI(cfg, ui)
+	}
+
+
+	uiUtils.addImage = function addBtn(cfg, id) {
+		cfg = u.cfg.str(cfg, 'src')
+		u.cfg.addToCfg(cfg, 'id', id);
+		cfg.tag = dv(cfg.tag, 'img');
+		//cfg.fxDone = dv(cfg.fxDone, fxD);
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+
+		var ui = u.tag(cfg.tag)
+		ui.attr('src', cfg.src)
+
+		u.addUI(cfg, ui)
+
+		uiUtils.lastUI = ui;
+	}
+
+	uiUtils.addClick = function addClick(fxD) {
+		uiUtils.lastUI[0].onclick = fxD;
+	}
+	uiUtils.addTooltip = function addTooltip(title) {
+		uiUtils.lastUI.attr('title', title)
+	}
+
+
+	function defineStyles() {
+		uiUtils.pad = function addPadding(l, t, r, b) {
+			if (l) {
+				uiUtils.lastUI.css('padding-left', l + 'px')
+			}
+			if (t) {
+				uiUtils.lastUI.css('padding-top', t + 'px')
+			}
+			if (b) {
+				uiUtils.lastUI.css('padding-right', r + 'px')
+			}
+			if (r) {
+				uiUtils.lastUI.css('padding-bottom', b + 'px')
+			}
+		}
+		uiUtils.wH = function setWidthAndHeight(w, h) {
+			if (w) {
+				uiUtils.lastUI.css('width', w + 'px')
+			}
+			if (h) {
+				uiUtils.lastUI.css('height', h + 'px')
+			}
+		}
+		uiUtils.color = function color(ui, color) {
+			if ( color == null ) {
+				color = ui
+				ui = uiUtils.lastUI;
+			}
+
+			ui.css('color', color)
+		}
+
+		uiUtils.removeWrap = function removeWrap(ui) {
+				ui = uiUtils.lastUI;
+
+			ui.css('display', 'display-inline')
+		}
+
+		uiUtils.title = function title(title) {
+			uiUtils.lastUI.attr('title', title)
+		}
+		uiUtils.tooltip = uiUtils.title;
+
+
+
+
+		uiUtils.centerVertically = function centerVertically(l, t, r, b) {
+			var css = {'display': 'flex',
+				'flex-direction': 'row',
+				'flex-wrap': 'nowrap',
+				'justify-content': 'center',
+				'align-content': 'center',
+				'align-items': 'center'}
+			uiUtils.lastUI.css(css)
+		}
+		uiUtils.bg = function setBgColor(l, ui) {
+			var ui = uiUtils.lastUI;
+			ui.css('background-color', l)
+		}
+
+		uiUtils.opacity = function setOpacity(opacity, _ui) {
+			var ui = uiUtils.lastUI;
+			if ( _ui ) {
+				ui = _ui;
+			}
+			opacity = opacity.toString();
+			if ( opacity.startsWith('.') ) {
+				opaicty = '0'+opacity;
+			}
+			ui.css('opacity', opacity)
+		}
+
+		uiUtils.opac = uiUtils.opacity
+
+
+		uiUtils.copySize = function copySize(ui1, ui2) {
+			ui2.css('width', ui1.css('width'))
+			ui2.css('height', ui1.css('height'))
+		}
+		uiUtils.copyWH = uiUtils.copySize;
+
+		uiUtils.copyXY = function copyXY(ui1, ui2) {
+			var position = $(ui1).offset();
+			ui2 = $(ui2)
+			console.log('position---', position)
+			ui2.css(position)
+		}
+
+		uiUtils.copyPosition = uiUtils.copyPos
+			= uiUtils.copyXY;
+
+
+		uiUtils.reset = function reset() {
+			if ( uiUtils.flagCfg ) {
+				uiUtils.flagCfg.addTo = $('body')
+			}
+		}
+		uiUtils.addRootTemp = function addRootTemp() {
+			if ( uiUtils.flagCfg ) {
+				var addTo = uiUtils.flagCfg.addTo;
+				uiUtils.flagCfg.addTo = $('body')
+			}
+			function fxRevert() {
+				if ( addTo && uiUtils.flagCfg ) {
+					uiUtils.flagCfg.addTo = addTo;
+				}
+
+			}
+			return fxRevert
+		}
+
+		uiUtils.addOverlay = function addOverlay(ui, bgColor) {
+			var overlay = $('<div/>');
+			uiUtils.makeAbs(overlay, true)
+			if ( bgColor ) {
+				overlay.css('background', bgColor)
+			}
+
+			/*	overlay.css('height', '100%');
+			 overlay.css('width', '100%');*/
+			uiUtils.copyWH(ui, overlay)
+			uiUtils.position(overlay, 0,0)
+			//u.opacity(overlay, 0.3)
+			overlay.css('opacity', 0.7)
+			ui.append(overlay);
+		}
+
+	}
+	defineStyles();
+
+	uiUtils.br = function addBr(cfg, fxD) {
+		cfg = dv(cfg, {})
+		cfg = u.cfg.str(cfg, 'text')
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+		var btn = u.tag('br')
+		u.addUI(cfg, btn)
+	}
+
+	uiUtils.addWhitespace = function addWhitespace(cfg, fxD) {
+		cfg = dv(cfg, {})
+		cfg = u.cfg.str(cfg, 'text')
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+		var ui = u.tag('span')
+		ui.html(' ')
+		u.addUI(cfg, ui)
+	}
+	uiUtils.ws = uiUtils.addWhitespace;
+
+	uiUtils.hr = function addBr(cfg, fxD) {
+		cfg = dv(cfg, {})
+		cfg = u.cfg.str(cfg, 'text')
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+		var btn = u.tag('hr')
+		u.addUI(cfg, btn)
+	}
+
+	uiUtils.spacer = function spacer(cfg, fxD) {
+		cfg = dv(cfg, {})
+		cfg = u.cfg.str(cfg, 'text')
+		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
+		var btn = u.tag('div')
+		btn.css('width', '10px')
+		btn.css('display', 'inline-block');
+		u.addUI(cfg, btn)
+	}
+	uiUtils.addSpace = uiUtils.spacer;
+
+	uiUtils.styles = {}
+	uiUtils.s = uiUtils.styles;
+
+	uiUtils.s.disable = function disable(id, fxD) {
+		console.error('disable', id)
+		$(id).css('opacity', 0.3);
+	}
+
+	uiUtils.s.enable = function enable(id, fxD) {
+		console.error('enable', id)
+		$(id).css('opacity', 1);
+	}
+
+	uiUtils.waitFor = function waitFor(id, fxD, count) {
+		var ui = $(id)
+		if ( ui.length == 0  ) {
+			if ( count > 20 ) {
+				console.error('timed out')
+				throw new Error('timeoud ')
+			}
+			count += 1;
+			setTimeout(uiUtils.waitFor,  250, id, fxD, count)
+			return;
+		}
+
+		fxD(ui)
+	}
+
+
+	p.cfg = {};
+	p.cfg.str = function ifCfgIsStri(cfg, prop) {
+		if ( $.isString(cfg) ){
+			var _cfg = {};
+			_cfg[prop] = cfg;
+			cfg = _cfg;
+		}
+		if ( cfg == null ) {
+			cfg = {};
+		}
+		return cfg;
+	};
+
+	p.cfg.addToCfg = function addToCfg(cfg, prop, val) {
+		if ( val != null ){
+			cfg[prop] = val;
+		};
+		return cfg;
+	}
+
+	p.cfg.fixId = function fixId(cfg, prop) {
+		if ( $.isString(cfg.id) ){
+
+			if ( cfg.id.includes('#') == false ) {
+				cfg.id = '#'+cfg.id;
+			}
+
+		}
+		return cfg;
+	}
+	p.cfg.getId = function fixId(cfg, propId ) {
+		if ( $.isString(cfg.id) ){
+			cfg = cfg.id;
+		}
+
+		if ( $.isString(cfg) ){
+			var baseId = cfg;
+			var id = baseId;
+			if ( baseId.slice(0,1) == '#') {
+				id = baseId.slice(1);
+			}
+		}
+
+		return id;
+	}
+	p.cfg.getDiv = function fixId(cfg, propId ) {
+		if ( $.isString(cfg.id) ){
+			cfg = cfg.id;
+		}
+		var div = $(cfg);
+		return div;
+	}
+
+
+	p.addUI = function addUI(cfg, ui ) {
+		if (cfg.addSpacerBefore) {
+			u.spacer();
+		}
+
+		if (cfg.addTo) {
+			if ( u.doNotAdd == true ) {
+				//u.skipNextAdd = false
+			}
+			else if ( u.skipNextAdd == true ) {
+				u.skipNextAdd = false
+			}
+			else {
+				if ( cfg.prepend ) {
+					cfg.addTo.prepend(ui)
+				} else {
+					cfg.addTo.append(ui)
+				}
+			}
+		}
+
+		if (cfg.addSpacerAfter || cfg.addSpaceAfter) {
+			u.spacer()
+		}
+
+		if (cfg.defaultValue) {
+			ui.val(cfg.defaultValue)
+		}
+		if (cfg.addClass) {
+			ui.addClass(cfg.addClass)
+		}
+		if (cfg.addStyles) {
+			ui.css(cfg.addStyles)
+		}
+
+		if (cfg.width) {
+			if ($.isNumeric(cfg.width)) {
+				cfg.width = cfg.width + 'px';
+			}
+			ui.css('width', cfg.width);
+			//lbl.css('display', 'inline-block');
+		}
+
+		if ( cfg.id ) {
+			cfg.jid = cfg.id;
+			ui.attr('id', cfg.id);
+			cfg.id = '#'+cfg.id;
+		}
+		if ( cfg.tooltip ) {
+			ui.attr('title', cfg.tooltip)
+		}
+		cfg.ui = ui;
+		u.lastCfg = cfg;
+		u.lastUI = ui;
+	}
+	p.tag = function createTag(type) {
+		return $('<'+type+'/>');
+	}
+
+
+	p.lastId = function lastId(type) {
+		return u.lastCfg.id;
+	}
+	p.getLast = function getLast() {
+		return u.lastUI;
+	}
+
+	function defineBasicMethods() {
+		p.enable = function enabled(id) {
+			var ui = $(id)
+			ui.prop('disabled', false);
+			ui.css('opacity', 1);
+
+		}
+
+		p.disable = function disable(id) {
+			var ui = $(id)
+			ui.prop('disabled', true);
+			ui.css('opacity', 0.3);
+		}
+		p.ifEmpty =function ifEmpty(id, fx) {
+			throwIfNull(fx, 'need a function for ' +  id)
+			var ui = $(id)
+			console.log('txt', ui.text(), ui.html())
+			if ( ui.is('input') && ui.val() == '' ) {
+				fx(ui)
+			}
+			if ( ui.text() == '' ) {
+				fx(ui)
+			}
+		}
+		p.getTimestamp = function getTimestamp() {
+			var d = new Date();
+			d = d.toString()
+			d = d.split(' GMT')[0]
+			d = d.replace(/ /gi, '_');
+			d = d.replace(/:/gi, '-');
+			d = '_'+d;
+			return d;
+		}
+	}
+	defineBasicMethods();
+
+	function defineSetValues() {
+		p.setText = function setText(jq, val) {
+			var ui = $(jq)
+			//console.log('what is ', jq, ui, val)
+			if ( ui.length == 0 ) {
+				console.warn('cannot set', jq, 'to', val, 'empty query set')
+			}
+			ui.val(val)
+			if ( ui.is('span')) {
+				ui.text(val)
+			}
+		}
+		p.setHtml = function setHtml(jq, val) {
+			var ui = $(jq)
+			//console.log('what is ', jq, ui, val)
+			if ( ui.length == 0 ) {
+				console.warn('cannot set', jq, 'to', val, 'empty query set')
+			}
+			ui.html(val)
+		}
+		p.glyph = function addGlyphIcon(iconName, val) {
+			var  iconHTML = '<span class="glyphicon glyphicon-'+iconName+'" aria-hidden="true"></span>'
+			var icon = $(iconHTML);
+			return icon;
+		}
+
+		p.setSelect = function setSelect(jq, vals, keyProp, valProp) {
+			var ui = $(jq)
+
+			//debugger
+
+			ui.empty();
+
+			$.each(vals, function addVal(k,v) {
+				var option = $("<option />")
+				if ( $.isString(v)) {
+					var val = v;
+					var key = v;
+				}
+				if ( keyProp) {
+					key = v[keyProp]
+				}
+
+				if ( valProp) {
+					val = v[valProp]
+				}
+
+				option.val(val)
+				option.text(key);
+				ui.append(option)
+
+			});
+		}
+
+
+		uiUtils.updateSelect = function updateSelect(id, newOptions) {
+			var ui = id;
+
+			if ( $.isString(id)){
+				if ( id.includes('#') == false ) {
+					id = '#'+id;
+				}
+
+				var ui = $(id)
+			}
+
+			ui.empty(); // remove old options
+			$.each(newOptions, function(key,value) {
+
+				ui.append($("<option></option>")
+					.attr("value", value).text(key));
+			});
+
+		}
+
+		uiUtils.getVal2 = function getVal2(id, newOptions) {
+			var ui = id;
+			if ( $.isString(id)){
+				if ( id.includes('#') == false ) {
+					id = '#'+id;
+				}
+				var ui = $(id);
+			}
+			if ( ui.is('span') || ui.is('div')){
+				return ui.html();
+			}
+			return ui.val()
+		}
+
+
+
+
+		uiUtils.later = function later(fx, argumentRest) {
+			var args = convertArgumentsToArray(arguments)
+			args = args.slice(1)
+			function calledLater() {
+				fx.apply(fx, args)
+			}
+			setTimeout(calledLater, 500);
+		}
+		uiUtils.callMethodRepeat = function callMethodRepeat(
+			fx, secs, obj, prop, fxDone
+
+		) {
+			var cfg = {};
+			cfg.fx = fx;
+			cfg.secs = secs;
+			cfg.obj = obj;
+			cfg.prop = prop;
+			cfg.fxDone = fxDone;
+			cfg.countRepeat = 0;
+			function fxRepeatThing(repeat, fxDone) {
+				if (cfg.obj && cfg.prop && cfg.obj[cfg.prop] != true) {
+					console.warn('done with this task', cfg.fx.name);
+					return;
+				}
+				cfg.countRepeat++;
+				if ( cfg.log != null )
+					console.info('fxRepeatThing', cfg.log, cfg.fx.name,  cfg.secs);
+
+				if (repeat) {
+					setTimeout(fxRepeatThing, cfg.secs * 1000, true)
+				}
+
+				fx() //(function onSaved(){
+				//console.log('autosaved...')
+				//})
+			}
+
+			fxRepeatThing(true)
+
+			return cfg;
+		}
+
+
+
+
+		uiUtils.repeatUntil  = function repeatUntil(fxCond, fx2, maxRetry, attemptIndex) {
+			//why: use to repeated call fx, until fxCond is true
+			//why:for ui elements that are lazily loaded
+			var result = fxCond();
+			if (result) {
+				fx2()
+				return;
+			}
+			if (maxRetry == null) {
+				maxRetry = 10;
+			}
+			if (attemptIndex > maxRetry) {
+				console.error('gave up ', 'tried', maxRetry, 'times', attemptIndex)
+				return
+			}
+			if (attemptIndex == null) {
+				attemptIndex = 0
+			}
+			attemptIndex++
+			setTimeout(uiUtils.repeatUntil, 500, fxCond, fx2, maxRetry, attemptIndex)
+		}
+
+		uiUtils.repeatFxUtils = uiUtils.repeatUntil;
+
+	}
+	defineSetValues();
+
+
+	function defineClickHandler() {
+		p.setupclickListener = function setupclickListener(jq, val) {
+			function onKeyDown(e) {
+				if (e.keyCode == 16) {
+					//alert(e.which + " or Shift was pressed");
+					window.shiftKey = true
+					console.log('keydown')
+				}
+			}
+			function onKeyUp(e) {
+				if (e.keyCode == 16) {
+					//alert(e.which + " or Shift was pressed");
+					window.shiftKey = false
+					console.log('keyup')
+				}
+			}
+
+			$(document).off('keydown', onKeyDown);
+			$(document).off('keyup', onKeyUp);
+
+			$(document).keydown(onKeyDown);
+			window.onKeyDown = onKeyDown;
+
+			$(document).keyup(onKeyUp);
+			window.onKeyUp = onKeyUp;
+
+		}
+		//	p.setupclickListener()
+	}
+	defineClickHandler();
+
+	function defineAnnotationMethods() {
+		uiUtils.removeWithClass = function removeWithClass(className) {
+			$('.'+className).remove();
+		}
+
+		uiUtils.moveAToB = function moveCursorTo(ui, toHere) {
+			var element = $(toHere)
+			var position = $(element).offset();
+
+			// position.left += element.width();
+
+			if ( position == null ){
+				console.warn('failed to cursor to ', toHere, 'position was null')
+				return;
+			}
+
+			//var dbg = [position.left , $('body').width()]
+			//debugger;
+			if ( position.left >= $('body').width() * .80 ) {
+				delete position.left;
+				position.right = 20;
+				console.log('move on left size')
+				//positon.left = $('body').width - 250;
+			} else  {
+				position.left += element.width();
+				position.left -= 0.1*element.width(); //nudge over so inside component
+				// position.left -= 10;
+			}
+
+			//position.top += 10;
+
+			console.log('where is', ui, position)
+			console.log('\t', $(element).offset(), $(element).width())
+			//annotation.css(position)
+
+			ui.css(position)
+		}
+
+
+		uiUtils.pos.adjust = function adjust(ui, t, r, b, l ) {
+			var lefti = ui.css('left');
+			lefti = px(lefti)
+
+			function px(pxVal){
+				pxVal = pxVal.replace('px');
+				pxVal = parseInt(pxVal);
+				return pxVal;
+			}
+
+
+			var topi = ui.css('top');
+			topi = px(topi)
+
+			var righti = ui.css('right');
+			righti = px(righti)
+
+			var bottomi = ui.css('bottom');
+			bottomi = px(bottomi)
+
+			if (  l != null ) {
+				ui.css('left', (lefti + l) + 'px')
+			} else {
+				if (  l === null ) {
+					ui.css('left', '')
+				}
+			}
+
+			if (  t != null ) {
+				console.log( ui.css('top'),  (topi + t) + 'px' )
+				ui.css('top', (topi + t) + 'px')
+			} else {
+				if (  t === null ) {
+					ui.css('top', '')
+				}
+			}
+
+			if (  r != null ) {
+				ui.css('right', (righti + r) + 'px')
+			} else {
+				if (  r === null ) {
+					ui.css('right', '')
+				}
+			}
+
+			if (  b != null ) {
+				ui.css('bottom',(bottomi + b) + 'px')
+			} else {
+				if ( b === null ) {
+					ui.css('bottom', '')
+				}
+			}
+		}
+	}
+	defineAnnotationMethods();
+
+	p.utils = {};
+	p.utils.mergeIn = function mergeIn(a, b, overwriteVals ) {
+		if ( a == null ) { return }
+		if ( b == null ) { return }
+		//function copyProps(from, to) {
+		$.each(a, function(k,v){
+			var existingVal  = b[k];
+			if ( existingVal && overwriteVals !== true ) {
+				return;
+			}
+			b[k]=v;
+		});
+		//	}
+	}
+
+
+	p.utils.addIfDoesStartWith = function addIfDoesStartWith(u, strStrasWith) {
+		var charStr = u.slice(0,1);
+
+		if (charStr == strStrasWith) {
+			return u
+		}
+
+		return strStrasWith+u;
+	}
+
+	p.utils.loadScripts = function loadScripts(listScripts, fxDone) {
+		var loadScript2 = function loadScript2(_scripts2, preamble) {
+			if ( _scripts2.length == 0 ) {
+				console.log('finished');
+				callIfDefined(fxDone)
+				return;
+			}
+			var url = _scripts2.shift();
+			if ( preamble == null ) {
+				preamble = '';
+			}
+			url = preamble + url;
+			jQuery.getScript(url)
+				.done(function () {
+				})
+				.always(function doneLoadingFile () {
+					loadScript2(_scripts2);
+				})
+				.fail(function (a,b,c,d) {
+					console.error('failed to load', url, a==null,b,c,d);
+					console.error(c.stack)
+				});
+		}
+
+		if ( $.isString(listScripts)) {
+			listScripts = [listScripts]
+		}
+		loadScript2(listScripts)
+
+	}
+	p.utils.loadScript = p.utils.loadScripts;
+
+
+
+	p.utils.getParams = function getParams() {
+		function getQueryObj() {
+			var query_string = {};
+			//console.debug('search', window.location.search);
+			var query = window.location.search.substring(1);
+			if ( query == '' && window.location.hash.indexOf('?') != 0 ) {
+				query = window.location.hash.split('?')[1];
+			}
+			if ( query == null ) {
+				return {};
+			}
+			var vars = query.split("&");
+			for (var i=0;i<vars.length;i++) {
+				var pair = vars[i].split("=");
+				// If first entry with this name
+				if (typeof query_string[pair[0]] === "undefined") {
+					query_string[pair[0]] = decodeURIComponent(pair[1]);
+					// If second entry with this name
+				} else if (typeof query_string[pair[0]] === "string") {
+					var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
+					query_string[pair[0]] = arr;
+					// If third or later entry with this name
+				} else {
+					query_string[pair[0]].push(decodeURIComponent(pair[1]));
+				}
+			}
+			return query_string;
+		};
+
+		var params = getQueryObj();
+		self.utils.params = params;
+		return params;
+	}
+
+	uiUtils.isSimiliarInArray = function isSimiliarInArray(prop, obj, items) {
+		var found = null;
+		var foundItem = null;
+		var likeVal = obj[prop];
+		$.each(items, function findSimiliar(k, v) {
+			var val = v[prop];
+			if (val == likeVal) {
+				foundItem = v;
+				found = true;
+				return false;
+			}
+		})
+
+		return found;
+	}
+
+	function defineEffects() {
+		uiUtils.fadeIn = function fadeIn(_ui, duration) {
+			var cfg = {ui:_ui, duration:duration}
+			if ( _ui.length == null )  {
+				var cfg = _ui;
+			}
+			cfg.ui.show();
+			cfg.ui.css('opacity', 0.0)
+			cfg.duration = u.dv(cfg.duration, 600);
+			cfg.opacity = u.dv(cfg.opacity, 1.0);
+
+			$(cfg.ui).animate({
+					opacity: cfg.opacity
+				},
+				{
+					duration:duration,
+					complete:function onEnd() {
+						// _ui.hide();
+					}
+				});
+			//}
+			console.error('fade in')
+		}
+
+
+		uiUtils.fadeOut = function fadeOut(_ui) {
+			//function onHoverOut() {
+			// debugger
+
+			$(_ui).clearQueue();
+			$(_ui).stop(true, true);
+			$(_ui).animate({
+					opacity: 0.0
+				},
+				{
+					duration: 300,
+					complete: function onEnd() {
+						_ui.hide();
+					}
+				}
+			);
+			console.error('fadeOut', _ui)
+			//}
+		}
+
+
+		uiUtils.beatFade = function beatFade(_ui) {
+			var startingOpacity = _ui.css('opacity');
+			if (startingOpacity == null || startingOpacity == '') {
+				startingOpacity = 1;
+			}
+			startingOpacity = 1;
+			// console.error('starting', startingOpacity)
+			$(_ui).clearQueue();
+			$(_ui).stop(true, true);
+			setTimeout(function out() {
+				console.error('go to ', 0.7)
+				$(_ui).animate({
+					opacity: 0.7
+				}, 500);
+			}, 0)
+
+			setTimeout(function beatIn() {
+				console.error('go to ', 1)
+				$(_ui).animate({
+					opacity: startingOpacity
+				}, 500);
+			}, 500)
+		}
+
+	}
+
+	defineEffects();
+
+	function defineUrlMethods() {
+		p.inUrl = function inUrl(dlg) {
+			if ( window.location.search.indexOf(dlg)!= -1 ) {
+				return true;
+			}
+			if ( window.location.hash &&
+				window.location.hash.indexOf(dlg)!= -1 ) {
+				return true;
+			}
+			return false;
+		}
+
+		p.reload = function reload(dlg) {
+			window.location.reload();
+		}
+
+		p.addToUrl = function addToUrl(key, val, doNotSetIfValIsNull ) {
+			/*
+			 1: hash is present
+			 2: ? is present ... so parse vars
+			 3: var alreayd exists
+			 */
+
+			var params = uiUtils.utils.getParams();
+
+			var dbg = false;
+			//dbg = true
+			if ( dbg )
+				console.debug('addToUrl','params', window.location.hash,
+					window.location.search, params)
+			if (val) {
+				val = val.toString()
+			}
+			if ( params[key] == val ) {
+				return;
+			}
+			if ( doNotSetIfValIsNull && val == null ) {
+				console.debug('did not set val', key, 'val is null')
+				return;
+			}
+
+			params[key]=val;
+			if ( val == null ) {
+				delete params[key]
+			};
+
+			var str = jQuery.param( params );
+
+			var hash = window.location.hash;
+			var urlFinal = '';
+			urlFinal = location.href
+			if ( urlFinal.includes('?')) {
+				urlFinal = urlFinal.split('?')[0];
+			}
+			if ( urlFinal.includes('#')) {
+				urlFinal = urlFinal.split('#')[0];
+			}
+			if ( dbg )
+				console.debug('addToUrl', 'start', urlFinal)
+			var isEmptyHash = hash.slice(0,2) == '#?';
+			if ( dbg )
+				console.debug('addToUrl','hash', hash)
+			if ( isEmptyHash ) {
+				//urlFinal +=  ''
+				urlFinal +=  '#'
+			} else if ( hash != ''  ) {
+				var hashOnly = hash;
+				if ( hashOnly.includes('?')) {
+					hashOnly = hashOnly.split('?')[0];
+				}
+				urlFinal += hashOnly;
+			} else {
+				urlFinal += '#'//'empty has to prevent reload
+			}
+			urlFinal += '?'+str;
+			document.location = urlFinal
+			if ( dbg ) {
+				console.debug('addToUrl', urlFinal, document.location, window.location.search)
+			}
+			if ( dbg ) {
+				console.debug('addToUrl', 'endwith', urlFinal)
+			}
+		}
+
+		p.setUrlVal = p.addToUrl ;
+
+		p.getUrlVal = function getUrlVal(val) {
+			var params = uiUtils.utils.getParams();
+			var val = params[val]
+			return val;
+		}
+
+
+		p.getSearch = function getSearchParam() {
+			var urlFinal = location.href;
+			if ( urlFinal.includes('?') == false ) {
+				return null;
+			}
+			if ( urlFinal.includes('#')) {
+				urlFinal = urlFinal.split('#')[1];
+			}
+			if ( urlFinal.includes('?')) {
+				urlFinal = urlFinal.split('?')[1];
+			}
+			//console.log('getSearch', urlFinal)
+			//if ? is before # warn user ...
+			return urlFinal;
+		}
+
+
+		p.getHash = function getHash() {
+			//why: get has only, not the search
+			var urlFinal = location.href;
+			if ( urlFinal.includes('#') == false ) {
+				return null;
+			}
+			//if ( urlFinal.includes('#')) {
+			urlFinal = urlFinal.split('#')[1];
+			//	}
+			if ( urlFinal.includes('?')) {
+				urlFinal = urlFinal.split('?')[0];
+			}
+			// console.log('getHash', urlFinal)
+			return urlFinal;
+		}
+
+
+		p.getUrl = function getUrl() {
+			var urlFinal = location.href;
+			if ( urlFinal.includes('#')) {
+				urlFinal = urlFinal.split('#')[0];
+			}
+			if ( urlFinal.includes('?')) {
+				urlFinal = urlFinal.split('?')[0];
+			}
+			//console.log('getUrl', urlFinal)
+			//if ? is before # warn user ...
+			return urlFinal;
+		}
+
+		p.setHash = function setHash(hash) {
+			var  urlX = window.location.href;
+			hash = uiUtils.utils.addIfDoesStartWith(hash, '#')
+			var url = self.getUrl()
+				+hash;
+			var search = self.getSearch();
+			var params = uiUtils.utils.getParams();
+			var str = jQuery.param( params );
+			if ( str ) {
+				url += '?'+str
+			}
+			var debug = false;
+			if ( debug ) {
+				console.error('starting', urlX);
+				console.error('setting hash to', hash, url);
+			}
+			//debugger
+			/*if ( self.getSearch() ) {
+			 url += '?'+self.getSearch()
+			 }*/
+
+			window.location.href = url;
+			if ( debug ) {
+				console.error('end', window.location.href);
+			}
+
+		}
+
+
+	}
+	defineUrlMethods();
+
+
+	function defineUI() {
+		p.utils.loadPage = function loadPage(cfg) {
+			var div = $(cfg.div)
+			if ( div && div.empty() && cfg.id ) {
+				//var id = cfg.id;
+				if ( cfg.id.startsWith('#') == false ) {
+					cfg.id = '#'+ cfg.id;
+				}
+				div = u.cfg.getDiv( cfg.id);
+			}
+			if ( div.length == 0 ){
+				throw new Error('could not find area ' + cfg.div);
+			}
+			//debugger
+			$.ajax({
+				url: cfg.url,
+				datattype: "html",
+				//data: data,
+				success: function (data) {
+
+					var output = p.utils.parseBodyHTML(data);
+
+					//debugger;
+					div.html(output.body.html());
+
+					output.addStyles();
+
+					cfg.ui = div;
+
+					callIfDefined(cfg.fxDone, data)
+				},
+				error: function (a,b,c) {
+					//debugger;
+					console.error('cannot get loadPage info');
+					uiUtils.remoteFailed(a,b,c)
+				}
+			});
+		}
+
+
+		uiUtils.remoteFailed = function remoteFailed(a,b,c) {
+			console.error(a,b,c)
+			debugger
+		}
+
+
+		p.utils.parseBodyHTML = function parseBodyHTML(d) {
+			// replace the `HTML` tags with `NOTHTML` tags
+			// and the `BODY` tags with `NOTBODY` tags
+			d = d.replace(/(<\/?)html( .+?)?>/gi,'$1NOTHTML$2>',d);
+			d = d.replace(/(<\/?)body( .+?)?>/gi,'$1NOTBODY$2>',d);
+			// select the `notbody` tag and log for testing
+			//console.log($(d).find('notbody').html())
+			var output = {};
+
+			output.raw = d;
+			output.jquery = $(d);
+			output.body = $(d).find('notbody');
+			output.html = $(d).find('nothml');
+			output.style = $(d).find('style')
+
+			output.addStyles = function addHtmlTo(div) {
+				$('head').append(output.style)
+			}
+
+			return output;
+		}
+	}
+	defineUI()
+
+	p.t = function setTimeoutShorten(){
+		var args = convertArgumentsToArray(arguments);
+		if ( args.length == 1 )
+			args.push(500);
+		//debugger
+		setTimeout.apply(null, args)
+	}
+
+
+	function defineComparison() {
+		p.utils.copyStyles = function copyStyles(from, to) {
+			//console.info('copy the thing', from.text())
+			var styleList = ['fontFamily', 'fontSize',
+				//	'transform',
+				'color', 'fontStyle', 'fontWeight']
+			$.each(styleList, function copyProp(k,v){
+				var val = from.css(v)
+				to.css(v, val);
+				//console.info('copy prop', v, val)
+			})
+			var prop = 'origFont';
+			to.attr(prop, from.attr(prop))
+		}
+
+		p.utils.stylesDifferent = function stylesDifferent(a ,b, dbg) {
+			var styleList = ['fontFamily', 'fontSize',
+				//	'transform',
+				'color', 'fontStyle', 'fontWeight'];
+			var equal = true
+			$.each(styleList, function copyProp(k,v){
+				var val = a.css(v);
+				var valB = b.css(v)
+				if ( val != valB ){
+					equal = false;
+					if ( dbg){
+						console.info('failed on', v, val, valB, b.text())
+						//debugger;
+					}
+					return false
+				}
+			})
+			var prop = 'origFont';
+			var val  =  a.attr(prop);
+			var valB =  b.attr(prop);
+			//console.info('origFont', prop, val, valB, val != valB)
+			if ( equal == true && val != valB ){
+				equal = false;
+				if ( dbg){
+					console.info('failed on origFont', prop, val, valB, b.text());
+				}
+			}
+			return !equal;
+		}
+	}
+	defineComparison();
+
+	function defineUrl() {
+		p.getLocation = function getLocation(path , port) {
+			if ( path.startsWith('/') == false ) {
+				path = '/'+path;
+			}
+			if ( port == null ) {
+				port = ''
+			} else {
+				port = ':' + port
+			}
+			var url = 'http://'+ window.location.hostname + port
+				+ path;
+			return url;
+		}
+		p.getUrl = function getUrl(url, data, fxDone, fxError) {
+			if ( $.isFunction(data) && $.isPlainObject(fxDone)) {
+				//criss cross
+				var _fxDone = data;
+				data = fxDone;
+				fxDone = _fxDone;
+			}
+
+			if ( $.isFunction(data)) {
+				fxDone = data;
+			}
+
+			//console.log('data', data)
+
+			$.ajax({
+				url: url,
+				data: data,
+				success: function (data) {
+					callIfDefined(fxDone, data)
+				},
+				error: function (a,b,c) {
+					console.error(url,'request failed', a,b,c)
+					//gUtils.remoteFailed(a,b,c)
+					callIfDefined(fxError, a,b,c, url)
+				}
+			});
+		}
+
+		p.postUrl = function getUrl(url, data, fxDone) {
+			if ( $.isFunction(data)) {
+				fxDone = data;
+			}
+
+			$.ajax({
+				url: url,
+				type: 'post',
+				data: data,
+				success: function (data) {
+					callIfDefined(fxDone, data)
+				},
+				error: function (a,b,c) {
+					console.error('request failed', a,b,c)
+					//gUtils.remoteFailed(a,b,c)
+				}
+			});
+		}
+
+		p.openNewWindow = function openNewWindow(url) {
+			window.open(url, 'status', "height=200,width=200");
+
+			return;
+			var win = window.open(url, '_blank');
+			win.focus();
+		}
+	}
+	defineUrl();
+
+	function defineCookies() {
+		p.getVal = function getVal(key) {
+			var val = localStorage.getItem(key)
+			var json = JSON.parse(val);
+			return json
+		}
+
+		p.setVal = function setVal(key, val) {
+			var json = JSON.stringify(val)
+			localStorage.setItem(key, json)
+		}
+	}
+	defineCookies();
+
+
+	function defineFX() {
+		u.onChangeDebounced = function onChangeDebounced(jquery, fx, time) {
+			if (time == null) time = 500;
+
+			var ui = $(jquery);
+			//console.log('sdf', jquery, ui.length);
+			if ( ui.length == 0 ) {
+				throw new Error(['not found', jquery].join(' '))
+			}
+
+
+			var d = {}
+			d.debounce = function debounce(fx) {
+				if (d.waiting) {
+					clearTimeout(d.waiting)
+				}
+				//console.log('waiting', fx.name)
+				//d.waiting = true;
+				d.waiting = setTimeout(function onDebounced() {
+					fx(ui.val(), ui)
+				}, time)
+			}
+
+			ui.keyup(function onKeyUp (e) {
+
+				//console.log('keyup', e)
+				d.debounce(fx, time)
+				//startWaiting()
+
+			});
+		}
+
+	}
+	defineFX();
+	u.debouncer = function debouncer(fx, name, time) {
+		//if ( time )
+		var d = {}
+		d.debounce = function debounce(fx2) {
+			if (d.waiting) {
+				clearTimeout(d.waiting)
+			}
+			//console.log('waiting', fx.name)
+			//d.waiting = true;
+			d.waiting = setTimeout(function onDebounced() {
+				if(fx2) {
+					fx2();
+					return;
+				}
+				fx()
+			}, time)
+		}
+		return d;
+	}
+
+
+	function defineDebounce() {
+		uiUtils.debounce = null;
+		uiUtils.debouncers = null;
+
+		uiUtils.debounce = function onDeb(cfg) {
+			if (uiUtils.debouncers == null) {
+				uiUtils.debouncers = {};
+			}
+
+			var dbg = false;
+			var d = uiUtils.debouncers[cfg.name];
+
+			if (cfg.time == null) {
+				cfg.time = 1500
+			}
+
+			if (d == null) {
+				d = {};
+				d.waitCount = 0;
+				if (dbg)
+					console.info('defined a new one')
+				d.debounce = function debounceHandler() {
+					d.waitCount++;
+					var waitCountTmp = d.waitCount;
+					cfg.waiting = d.waitCount + '_' + Math.random();
+					if (dbg)
+						console.log('waiting', cfg.fx.name, d.waitCount)
+					//d.waiting = true;
+					setTimeout(function onDebounced() {
+						if (d.waitCount == waitCountTmp) {
+						} else {
+							if (dbg)
+								console.warn('missed it', waitCountTmp, d.waitCount, d.waiting)
+							return;
+						}
+						d.waiting = null;
+						cfg.fx(cfg.args)
+					}, cfg.time)
+
+				}
+			}
+
+			uiUtils.debouncers[cfg.name] = d;
+
+			d.debounce()
+		}
+
+	}
+	defineDebounce();
+
+	function ifHelpers() {
+		u.ifFxReplace = function ifFxReplace(potFx, fxShoudlBeNull) {
+			if ( $.isFunction(potFx) && fxShoudlBeNull ) {
+				return potFx;
+			}
+			return fxShoudlBeNull;
+		}
+	}
+	ifHelpers()
+
+
+	p.fadeInOnHover = function fadeInOnHover(ui) {
+		$(ui).css('opacity', 0.0)
+		$(ui).hover(
+			function onHover() {
+				$(ui).animate({
+					opacity:1
+				}, 300);
+				//console.log('fade in')
+			},
+			function onHoverOut() {
+				$(ui).animate({
+					opacity: 0.0
+				}, 300);
+			}
+		);
+	}
+
+	function defineAppendHelperMethods() {
+
+		uiUtils.clear = function clearHTLM(jq) {
+			$(jq).html('')
+		}
+		uiUtils.addTo = function setLastUI(jq) {
+			var ui  =   $(jq);
+			//uiUtils.lastUI =   $(jq);
+			//uiUtils.flagCfg.lastAddTo = cfg.addTo
+			uiUtils.flagCfg.addTo = ui;
+		}
+
+		uiUtils.addToLast = function addToLast() {
+			uiUtils.flagCfg.addTo = uiUtils.lastUI;
+		}
+
+		uiUtils.setId = function setId(id) {
+			uiUtils.lastUI.attr('id', id)
+		}
+	}
+	defineAppendHelperMethods();
+
+
+	function defineLookAt() {
+		var gUtils = uiUtils
+		gUtils.setLocationHash = function setLocationHash(newHashVal) {
+			setTimeout(function setLocationLater(){
+				//window.location.hash = e;// '#listDialog';
+				uiUtils.setHash(newHashVal);
+			}, 0);
+		}
+		gUtils.setFocus = function setFocus(e) {
+			setTimeout(function setFocus(){
+				$(e).focus();
+			}, 0);
+		}
+		gUtils.hide = function hide(jq) {
+			$(jq).hide()
+		}
+		gUtils.show = function show(jq) {
+			$(jq).show()
+		}
+		gUtils.ifShow = function show(exp, jq) {
+			if ( exp ) {
+				//console.error('addi', exp, 'show')
+				$(jq).show();
+			} else {
+				//	console.error('addi', exp, 'hide')
+				$(jq).hide();
+			}
+		}
+		gUtils.ifHide = function ifExpIsTrueHide(exp, jq) {
+			gUtils.ifShow(!exp,jq);
+		}
+		gUtils.off = function off(jq) {
+			$(jq).off()
+		}
+		gUtils.offChildren = function offChildren(jq) {
+			$(jq).off()
+			$(jq).find('*').off()
+		}
+
+		gUtils.addToken = function addToken(jq) {
+			if ( jq == null ){ return }
+			var uiHolder = $(jq);
+			uiHolder.html('');
+			var token = uiUtils.tag('span');
+			token.attr('id', uiHolder.attr('id')+'Token');
+			uiHolder.append(token);
+		}
+
+		gUtils.lorem = function lorem() {
+			var times = 150
+			var txt = ''
+			var things = ['Rock', 'Paper', 'Scissor'];
+			for (var i = 0; i < times; i++) {
+				var word = things[Math.floor(Math.random() * things.length)];
+				txt += word + ' ';
+			}
+			return txt;
+		}
+
+
+		gUtils.onEnter = function onenter(jquery, fx) {
+			$(jquery).keypress(function (e) {
+				if (e.which == 13) {//Enter key pressed
+					fx();
+				}
+			});
+		}
+		gUtils.onClick = function onClick(jquery, fx, gY) {
+
+			throwIfNull(fx, 'need a function for ' +  jquery)
+			throwIfNull(jquery, 'need a jquery for ' +  jquery, fx.name)
+			$(jquery).click(function onClick(e) {
+				fx();
+			});
+		}
+		gUtils.makeBtn = function onClick(jquery, tooltip) {
+			$(jquery).attr('title', tooltip);
+			$(jquery).css('cursor', 'pointer')
+		}
+		gUtils.makeRolloverPopup = function makeRolloverPopup(
+			yyy, yy, btnHoverClass) {
+			var h = {}
+			h.dialog = yy;
+			h.dropdown = h.dd = yy;
+			h.btnTrigger= yyy;
+			yyy.on('mouseenter', function onMouseOver(){
+				h.mouseOverBtn = true;
+				if ( btnHoverClass )
+					h.btnTrigger.addClass(btnHoverClass);
+				yy.show();
+			})
+
+			yyy.on('mouseleave', function onMouseOut(delayed){
+				h.mouseOverBtn = false;
+				if ( delayed != true ) {
+					setTimeout(onMouseOut, 500, true)
+					return;
+				}
+				if (  h.mouseOverDialog == true) {
+					return;
+				}
+				if ( btnHoverClass )
+					h.btnTrigger.removeClass(btnHoverClass);
+				yy.hide();
+			})
+
+			yy.on('mouseenter', function onMouseOverDropDown(){
+				h.mouseOverDialog = true;
+			})
+
+			yy.on('mouseleave', function onMouseOverDropDown(){
+				h.mouseOverDialog = false;
+				if ( h.mouseOverBtn == false ) {
+					h.dropdown.hide();
+					if ( btnHoverClass )
+						h.btnTrigger.removeClass(btnHoverClass);
+				}
+			})
+
+
+			yy.hide();
+		}
+
+
+		gUtils.makeRolloverPopup2 = function makeRolloverPopup2(
+			uiHoverInit, yy, btnHoverClass) {
+			var h = {}
+			h.dialog = yy;
+			h.dropdown = h.dd = yy;
+			h.btnTrigger= uiHoverInit;
+			var closeOrig = false;
+			uiHoverInit.on('mouseenter', function onMouseOver(){
+				h.mouseOverBtn = true;
+				if ( btnHoverClass )
+					h.btnTrigger.addClass(btnHoverClass);
+				if ( closeOrig ) {
+					yy.show();
+				}
+			})
+
+			uiHoverInit.on('mouseleave', function onMouseOut(delayed){
+				h.mouseOverBtn = false;
+				if ( delayed != true ) {
+					setTimeout(onMouseOut, 500, true)
+					return;
+				}
+				if (  h.mouseOverDialog == true) {
+					return;
+				}
+				if ( closeOrig ) {
+					if (btnHoverClass)
+						h.btnTrigger.removeClass(btnHoverClass);
+					yy.hide();
+				}
+			})
+
+			yy.on('mouseenter', function onMouseOverDropDown(){
+				h.mouseOverDialog = true;
+			})
+
+			yy.on('mouseleave', function onMouseOverDropDown(){
+				h.mouseOverDialog = false;
+				if ( h.mouseOverBtn == false ) {
+					h.dropdown.hide();
+					if ( btnHoverClass )
+						h.btnTrigger.removeClass(btnHoverClass);
+				}
+			})
+
+
+			yy.hide();
+		}
+
+
+		uiUtils.toggleContainer = function toggleContainer(jq) {
+			var ui = $(jq)
+			if ( ui.hasClass('hide')) {
+				ui.removeClass('hide')
+			}else {
+				ui.addClass('hide')
+			}
+		}
+
+
+		uiUtils.putToLeftOfLastDialog = function putToLeftOfLastDialog(ui, ui2) {
+			if ( ui == null ) {
+				var overrideOffset = {top:60, left:20 };
+				ui = $('<div />');
+			}
+			if (ui2 == null)
+				return;
+			if ( uiUtils.putToLeftOfLastDialog.rowMaxHeight == null ) {
+				uiUtils.putToLeftOfLastDialog.rowMaxHeight = 0;
+			}
+
+			var position = $(ui).offset();
+			if ( overrideOffset ){
+				position = overrideOffset;
+			}
+			position.left += 10;
+			// position.top += 6
+			//   debugger;
+			position.left += ui.width();
+			if ( position.left + ui2.width() > $('body').width() - 50 ) {
+
+				position.top += uiUtils.putToLeftOfLastDialog.rowMaxHeight
+				uiUtils.putToLeftOfLastDialog.rowMaxHeight = 0
+				console.log('\t', 'put new row',   position.top, uiUtils.putToLeftOfLastDialog.rowMaxHeight)
+				position.left = 0 ;
+			}
+
+			if ( ui2.height() > uiUtils.putToLeftOfLastDialog.rowMaxHeight ) {
+				uiUtils.putToLeftOfLastDialog.rowMaxHeight = ui2.height();
+			}
+
+			console.log('put', ui.attr('id'),'--',   ui2.attr('id'), position,   uiUtils.putToLeftOfLastDialog.rowMaxHeight)
+			ui2.css(position)
+		}
+	}
+	defineLookAt();
+
+
+
+	function defineSockets() {
+		uiUtils.socket = {};
+		uiUtils.socket.dict = {};
+		uiUtils.socket.nextEmit = function nextEmit(t) {
+			uiUtils.socket.nextEmitter = t;
+		}
+
+		uiUtils.socket.emit = function emit(msg, data, fxDone) {
+
+			self.data.socket.emit(msg, data)
+			var key = null;
+			if (key == null && uiUtils.socket.nextEmitter != null) {
+				key = uiUtils.socket.nextEmitter
+			}
+			var existingListener = uiUtils.socket.dict[key];
+			if (existingListener != null) {
+				console.warn('u already set this ...')
+				return; //skip ...
+			}
+			uiUtils.socket.dict[key] = fxDone;
+			self.data.socket.on(data.cmd + '_results', function _onResults(msg) {
+				console.log('msg', msg);
+				fxDone(msg)
+
+			})
+
+		}
+
+
+		uiUtils.socket.addListener = function addListener(type, fxDone, retryCount) {
+			if ( self.data.socket == null ) {
+				if ( retryCount == null ) { retryCount = 0; }
+				if ( retryCount > 10 ) { console.error('failed to ', this.name, type, fxDone)}
+				setTimeout(function onRetry() {
+					retryCount++
+					addListener(type, fxDone, retryCount)
+				}, 500);
+				return;
+			}
+			self.data.socket.on(type, function _onResults(data) {
+				//console.log('msg', msg);
+				fxDone(data)
+
+			})
+
+		}
+	}
+
+	defineSockets();
+
+
+
+	uiUtils.makeDict = function makeDict(arr, prop) {
+		var dict = {};
+		$.each(arr, function n(k,v) {
+			var val = v[prop]
+			dict[val]=v;
+		})
+		return dict;
+	}
+}
+
+defineUtils();
+
+
+window.restartTest = function restartTest() {
+	window.location.href =
+		'http://localhost:33031/index.html#?loadTestFramework=true&dialogSearchTests=true&testName=rSmoke&runTest=true'
+	setTimeout(function onReload() {
+		window.location.reload();
+	}, 50);
+}
\ No newline at end of file
Index: mp/testingFramework2/readme.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/readme.txt	(revision )
+++ mp/testingFramework2/readme.txt	(revision )
@@ -0,0 +1,5 @@
+http://rr413c1n7.ms.com:10051/testingFramework/test2.verify.reloading.html#?loadTestFramework=true&dialogSearchTests=true&testName=testCSV&runTest=true&arg1=csvScripts%2Ftest.txt
+
+http://rr413c1n7.ms.com:10051/testingFramework/test2.verify.reloading.html#?loadTestFramework=true&dialogSearchTests=true&testName=testCSV&runTest=true&arg1=csvScripts%2Fframework%2Fsuccess.fx.js.txt
+
+
Index: mp/testingFramework2/shelpers-mini.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/shelpers-mini.js	(revision )
+++ mp/testingFramework2/shelpers-mini.js	(revision )
@@ -0,0 +1,563 @@
+/**
+ * Helpers methods
+ */
+
+(function () {
+
+    var isNode = true
+
+    if (typeof exports === 'undefined' || exports.isNode == false) {
+        isNode = false
+    }
+
+    window.isNode = isNode
+    
+    if ( isNode ) {
+        var path = require('path')
+    } else {
+       /* require = function () {
+            return {};
+        }*/
+    }
+
+    function trim1(str) {
+        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
+    }
+
+
+    var helper = {}
+    var sh = helper;
+
+    var str = {}
+    sh.str = str;
+    sh.fs = {};
+
+    function defineBasics() {
+        sh.defaultValue = function defaultValue(input, ifNullUse) {
+            if (input == null) {
+                return ifNullUse
+            }
+            return input;
+        }
+        sh.dv = sh.defaultValue;
+
+
+        function convertArgumentsToArray(_arguments) {
+            var args = Array.prototype.slice.call(_arguments, 0);
+            return args
+        }
+        sh.convertArgumentsToArray = convertArgumentsToArray;
+
+
+
+        function toJSONString(o, printJSON) {
+            printJSON = sh.defaultValue(printJSON, false)
+            var json = JSON.stringify(o, "\t", "\t")
+            if (printJSON) {
+                console.log(json)
+            }
+            return json;
+        }
+
+        sh.toJSONString = toJSONString;
+
+
+        function callIfDefined(fx) {
+            var args = convertArgumentsToArray(arguments)
+            args = args.slice(1, args.length)
+
+            if (fx == undefined)
+                return args[0];
+
+
+            // console.debug('args', tojson(args))
+            return fx.apply(null, args)
+            //return;
+        }
+
+        sh.callIfDefined = callIfDefined;
+
+
+        function q(text, escapeQuote) {
+            if (escapeQuote == true) {
+                return "\'" + text + "\'"
+            }
+            return "'" + text + "'"
+        }
+
+        sh.q = q;
+
+
+        function qq(text, escapeQuote) {
+            if (escapeQuote == true) {
+                return "\'" + text + "\'"
+            }
+            return "'" + text + "'"
+        }
+
+        sh.qq = qq;
+
+
+        sh.qq = function qq(text) {
+            return "\"" + text + "\""
+        }
+        sh.paren = function paren(text) {
+            return "(" + text + ")"
+        }
+
+        sh.bracket =  function bracket(text) {
+            return "[" + text + "]"
+        }
+
+        sh.isObject = function isObject(obj) {
+            if ( $.isFunction(obj)) {
+                return false;
+            }
+            if ( obj == null ) {
+                return false;
+            }
+            return typeof obj == 'object'
+        }
+        sh.isString = $.isString
+        sh.isArray = $.isArray
+        sh.includes = function includes(arr, f, v) {
+            return arr.includes(f)
+        }
+
+        sh.startsWith =
+            function startsWith (str, subStr) {
+                if (str == null) {
+                    return;
+                }
+                return str.indexOf(subStr) == 0 ;
+            }
+
+
+
+        sh.clone = function clone(item) {
+            item = JSON.stringify(item)
+            item = JSON.parse(item)
+            return item
+        }
+
+
+        sh.copyProps = function copyProps(from, to) {
+            sh.each(from, function(k,v){
+                to[k]=v;
+            })
+        }
+
+        sh.printCol = function printCol( arr) {
+            sh.each(arr, function on(k,v) {
+                console.log(v)
+            })
+
+            console.table(arr)
+        }
+
+    }
+    defineBasics();
+
+    function defineErrors() {
+        sh.errors = {}
+
+
+        /**
+         * Simple log, show prototype (class) and method name
+         */
+        sh.sLog = function sLog() {
+            var args = sh.convertArgumentsToArray(arguments[0])
+
+
+
+            var stackTrace = sh.errors.getStackTrace()
+            var calls = stackTrace.split("\n");
+            var trueCall = calls[4]
+            var prototypeName = calls[5]
+
+            function getS(s) {
+                if ( s == null ) {
+                    return '';
+                }
+                s = s.split("at ")[1];
+                return s
+            }
+
+            trueCall = getS(trueCall);
+            prototypeName = getS(prototypeName);
+
+            function stripPrototype(s) {
+                //FlexMXMLtoStyleExplorerConvertor.convertFile (C:\Users\user1\Dropbox\projects\crypto\proxy\css\convertMXMLSkinToExplorer.js:40:44)
+                s = s.split(".")[0];
+                return s
+            }
+
+            //LineProcHelper.getLineWith (C:\Users\user1\Dropbox\projects\crypto\proxy\css\convertMXMLSkinToExplorer.js:29:30)
+            function getLinePrototype(s) {
+                var methodCall = s.split(" (")[0] //LineProcHelper.getLineWith
+                var prototype = methodCall.split(".")[0];
+                var method = methodCall.split(".")[1];
+                var line = "(" + s.split(" (")[1]; //(c:\)
+                return {prototype: prototype, method: method, line: line}
+            }
+
+            var lists = getLinePrototype(trueCall)
+            var prototype = lists.prototype;
+            var method = lists.method;
+            var line = lists.line;
+
+            prototypeName = stripPrototype(prototypeName);
+            //console.log(stackTrace + 'llllllllll')
+            /*console.log(trueCall)
+             console.log(prototypeName)*/
+
+            //console.log(stackTrace)
+            // args.unshift(label)
+            args.unshift(lists.method);
+            args.unshift(lists.prototype);
+            args.unshift('>>>*> ');
+            args.push(lists.line);
+            var str = "\t" + args.join(" ") + "\n"
+            str = args.join(" ")
+            console.log(str)
+            //var fx = console.log;
+            //fx.apply(null, args)
+            //console.log()
+            return str;
+        }
+
+        sh.errors.jumpError = function jumpError(msg, lines, ifFalse , postAdd, throwError) {
+            if (ifFalse != null) {
+                if (ifFalse != false) {
+                    return;
+                }
+
+            }
+
+            //user may not secify lines, but condition
+
+
+            var stackTrace = sh.errors.getStackTrace()
+
+            var calls = stackTrace.split("\n");
+
+            //console.log(calls.join("\n"))
+
+
+            lines = sh.dv(lines, 3);
+            if (lines < 0) {
+                lines *= -1
+            }
+
+
+            var old = calls.slice(1 + 2, lines)
+            var newCalls = calls.slice(lines);
+
+            newCalls.unshift('Error: ' + msg);
+
+
+            if (postAdd != null)
+                newCalls = newCalls.concat('', 'from', postAdd)
+
+            newCalls = newCalls.concat('', 'via', old)
+
+
+            var e = new Error(msg)
+            e.stack = newCalls.join("\n")
+            // e.stack = 'ooo'
+            //e.message = 'dfsdf'
+            if (throwError != false) {
+
+                throw(e);
+            }
+            else {
+                console.error(e.stack)
+            }
+
+
+
+            return true;
+
+        }
+
+        sh.errors.storeError = function jumpError( lines ) {
+
+            var stackTrace = sh.errors.getStackTrace()
+
+            var calls = stackTrace.split("\n");
+
+            //console.log(calls.join("\n"))
+
+
+            lines = sh.dv(lines, 3);
+            if ( lines < 0 ) { lines *= -1 }
+
+
+            var newCalls = calls.slice(lines);
+
+            //newCalls.unshift('Error: ' + msg);
+
+            //var e =new Error(msg)
+            //e.stack = newCalls.join("\n")
+            // e.stack = 'ooo'
+            //e.message = 'dfsdf'
+            //throw(e);
+            return newCalls;
+
+        }
+
+
+
+
+
+
+        function getStackTrace() {
+            var err = new Error();
+
+            return err.stack;
+        }
+        sh.errors.getStackTrace = getStackTrace
+    }
+    defineErrors();
+
+
+    function defineTimer() {
+        sh.timeElapsed = function timeElapsed(lastDate) {
+            var currentTime = new Date();
+            var time = currentTime.getTime() - lastDate.getTime();
+            return time / 1000;
+        }
+
+        function EasyTimer() {
+            this.start = function start() {
+                this.startTime = new Date();
+                this.running = true
+            }
+
+            this.stop = function stop() {
+                this.duration = sh.timeElapsed(this.startTime).toFixed(2)
+                this.running = false;
+            }
+
+
+            this.remaining = function remaining(percentDone) {
+                this.duration = sh.timeElapsed(this.startTime).toFixed(2)
+                var remainingPercentage = 1-percentDone;
+                var percRatio = remainingPercentage/percentDone
+                var secsRemaining = this.duration*percRatio
+                var minsRemaining = secsRemaining / 60
+                return minsRemaining.toFixed(2)
+            }
+
+            this.secs = function secs(format) {
+                if (this.running) {
+                    this.stop()
+                }
+
+                var output = this.duration
+                //this.duration = sh.timeElapsed(this.startTime).toFixed(2)
+                if (format != false) {
+                    output = ' ' + sh.paren(this.duration+ ' s')
+                }
+                return output;
+            }
+
+        }
+        sh.EasyTimer = EasyTimer;
+    }
+    defineTimer()
+
+
+    function defineEach() {
+        sh.each = function each(object, callback, args) {
+
+            var name, i = 0, length = object.length;
+
+            if (args) {
+                if (length === undefined) {
+                    for (name in object)
+                        if (callback.apply(object[name], args) === false)
+                            break;
+                } else
+                    for (; i < length;)
+                        if (callback.apply(object[i++], args) === false)
+                            break;
+
+                // A special, fast, case for the most common use of each
+            } else {
+                if (length === undefined) {
+                    for (name in object)
+                        if (callback.call(object[name], name, object[name]) === false)
+                            break;
+                } else
+                    for (var value = object[0];
+                         i < length && callback.call(value, i, value) !== false; value = object[++i]) {
+                    }
+            }
+
+            return object;
+        }
+    }
+    defineEach();
+
+    function defineLines() {
+        //AKA Lines helper
+        sh.each.lines = function lines(items, config) {
+            config = sh.dv(config, {})
+
+
+            if (sh.isObject(items)) {
+                config = items;
+            }
+            ;
+            if (config.str != null) {
+                items = config.str.split('\n');
+            }
+            ;
+            if (config.file != null) {
+                var contents = sh.readFile(config.file);
+                items = contents.split('\n');
+            }
+            ;
+
+
+            if (sh.isString(items)) {
+                items = items.split('\n');
+            }
+
+            var lines = [];
+            lines = sh.dv(config.addTo, []);
+
+
+            sh.each(items, function processLine(i, line) {
+
+                if (line == null) {
+                    return;
+                }
+                if (line.trim() == '' && config.skipEmpty != false) {
+                    return;
+                }
+
+                if (config.ignore != null) {
+                    var ignoreFault = false;
+                    sh.each(config.ignore, function testIgnoreLineFilter(x, ignore) {
+                        if (sh.includes(line, ignore)) {
+                            ignoreFault = true
+                            return false;
+                        }
+                    });
+                    if (ignoreFault) {
+                        return;
+                    }
+                    ;
+                }
+
+                if (config.ignoreEnd != null) {
+                    var ignoreFault = false;
+                    sh.each(config.ignoreEnd, function testIgnoreLineFilter(x, ignoreEnd) {
+                        var indexOfEnding = line.length - ignoreEnd.length;
+                        var indexOfEnder = line.toLowerCase().indexOf(ignoreEnd.toLowerCase(), indexOfEnding);
+                        var endGt = indexOfEnder > 0
+                        var okGt = indexOfEnder == line.length - ignoreEnd.length
+                        if (sh.includes(line, ignoreEnd) && okGt) {
+                            ignoreFault = true
+                            return false;
+                        }
+                    });
+                    if (ignoreFault) {
+                        return;
+                    }
+                    ;
+                }
+
+
+                if (config.ignoreComments) {
+                    var commentStartingChars = ["'", '//', '#']
+                    if (sh.isArray(config.ignoreComments)) {
+                        commentStartingChars = config.ignoreComments
+                    }
+                    var ignoreFault = false;
+                    sh.each(commentStartingChars, function testIgnoreLineFilter(x, ignore) {
+                        if (sh.startsWith(line, ignore)) {
+                            return false;
+                        }
+                    });
+                    if (ignoreFault) {
+                        return;
+                    }
+                    ;
+                }
+
+                if (config.fxProc != null) {
+                    config.line = line;
+                    config.includes = function includes(val) {
+                        return config.line.indexOf(val) != -1;
+                    };
+
+                    config.remove = function remove(val) {
+                        config.line = config.line.replace(val, '');
+                        return config;
+                    };
+
+                    line = sh.callIfDefined(config.fxProc, line, i, lines.length)
+                    if (line == null)
+                        return;
+                    if (line == false)
+                        return false; //stop processing
+                }
+
+
+                if (config.appendToLine != null) {
+                    line += config.appendToLine
+                }
+
+                lines.push(line)
+
+            })
+
+            return lines;
+        }
+    }
+    defineLines();
+
+    if (typeof exports === 'undefined') {
+        exports = {}
+        exports.isNode = false;
+        //must be in browser
+    }
+    exports.shelpers = helper;
+
+//used by browser/node.js agnostic scripts
+//todo: add more robust solution
+    helper.isNode = true
+    helper.isBrowser = false
+    if (typeof require !== 'undefined') {}
+    else {
+        helper.isBrowser = true
+        helper.isNode = false
+    }
+
+
+    var shelpers = sh;
+    window.sh = sh;
+    /*
+     for (var i=0;i<cars.length;i++)
+     {
+     document.write(cars[i] + "<br>");
+     }
+     */
+
+    if ( isNode ) {
+        if (module.parent == null) {
+            function runShelpersTests(){
+                testEachProp()
+                return;
+                //helper.tests.testDictArray()
+                //helper.tests.writeFile2Test();
+            }
+            debugger
+            runShelpersTests();
+        }
+    }
+
+})();
\ No newline at end of file
Index: mp/testingFramework2/dialogSearchTests.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/dialogSearchTests.js	(revision )
+++ mp/testingFramework2/dialogSearchTests.js	(revision )
@@ -0,0 +1,120 @@
+/**
+ * Created by morriste on 2/23/16.
+ */
+function dialogSearchTests(document) {
+    //'use strict';
+    window.tests
+    var tbody = $('#testTable').find('tbody');
+    tbody.html('');
+    //debugger
+    $.each(window.tests, function addTestTolist(testName,test){
+        var tr = $('<tr/>');
+        for ( var i = 0; i < 3; i++) {
+            var td = $('<td/>');
+            tr.append(td);
+            if ( i == 0 )
+                td.html(testName)
+            if ( i == 1 )
+                td.html(test.desc)
+            if ( i == 2 ) {
+                var btn = $('<button/>')
+                btn.html('play')
+                btn.addClass('btn btn-primary')
+                //btn.attr('onclick', onRunTest)
+                btn.on('click', onRunTest );
+
+                function onRunTest() {
+                    uiUtils.addToUrl('runTest', 'true');
+                    uiUtils.addToUrl('testName', testName);
+                    window.runTest2(testName)
+                }
+                td.html(btn)
+            }
+            tbody.append(tr)
+        }
+    });
+    // debugger;
+    //'use strict';
+    var LightTableFilter = (function(Arr) {
+        var _input;
+        function _onInputEvent(e) {
+            _input = e.target;
+            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
+            Arr.forEach.call(tables, function(table) {
+                Arr.forEach.call(table.tBodies, function(tbody) {
+                    Arr.forEach.call(tbody.rows, _filter);
+                });
+            });
+        }
+        function _filter(row) {
+            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
+            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
+        }
+        return {
+            init: function() {
+                var inputs = document.getElementsByClassName('light-table-filter');
+                Arr.forEach.call(inputs, function(input) {
+                    input.oninput = _onInputEvent;
+                });
+            }
+        };
+    })(Array.prototype);
+    if (document.readyState === 'complete') {
+        LightTableFilter.init();
+    } else {
+        document.addEventListener('readystatechange', function() {
+            if (document.readyState === 'complete') {
+                LightTableFilter.init();
+            }
+        });
+    }
+
+
+    function asdf() {
+        $('#txtSearch').focus();''
+    }
+    setTimeout(asdf, 50)
+    setTimeout(asdf, 500)
+}
+
+
+window.dialogTransport = {}
+ 
+window.dialogTransport.init = function init() {
+    var divId = '#testSearchTest';
+    if ( uiUtils.ifFound(divId) ) { return; }
+    uiUtils.panel.br(divId);
+
+    var cfg = {};
+    cfg.id = divId;
+    cfg.url =  window.preamble + '/' + 'dialogSearchTests.html';
+
+    uiUtils.utils.loadPage(cfg)
+
+    cfg.fxDone = function asdf() {
+        //startupDialog(document)
+        dialogSearchTests(document)
+        
+        cfg.ui.css('opacity', 0.7)
+
+        function testTestName() {
+
+            var testName = uiUtils.utils.getParams()['testName'];
+            //console.error('what is test name', testName)
+            //$('#txtSearchTestNames').text(testName);
+            $('#txtSearchTestNames').val(testName);
+            //$('#txtSearchTestNames').change();
+            function asdf() {
+                $('#txtSearchTestNames').trigger('input');
+            }
+            setTimeout(asdf, 500)
+        }
+        setTimeout(testTestName, 300)
+        setTimeout(testTestName, 1500)
+    }
+};
+
+if ( uiUtils.inUrl('dialogSearchTests=true') ) {
+    window.dialogTransport.init();
+}
+
Index: mp/testingFramework2/csvScripts/test_user_tabs.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/test_user_tabs.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/test_user_tabs.js.txt	(revision )
@@ -0,0 +1,39 @@
+#test for basic csv
+log this test will enter the EU Trading 2 subsite
+log Will create 2 tabs on two pages ,
+log Then verify tabs have been created.
+
+msg Test Tabs
+
+fx closeallpopups
+
+
+fx removeAllTabs(true);
+
+fx createTab(0,true, 'User Tab 1-t');
+#fx createTab(0,true, 'User Tab 1-t');
+fx deleteTabSafe('User Tab 1-t', true)
+fx revertTabs()
+
+fx createTab(0,true, 'User Tab 1');
+fx ensureTab('User Tab 1', true)
+fx revertTabs()
+fx ensureTab('User Tab 1', true)
+fx createTab(0,true, 'User Tab 2');
+fx revertTabs()
+fx ensureTab('User Tab 1', true)
+fx ensureTab('User Tab 2', true)
+
+fx gotopage; External Revenue; External Revenue
+
+wait 2
+
+
+fx gotopage; Revenue; Revenue
+
+wait 2
+
+fx ensureTab('User Tab 1', true)
+fx ensureTab('User Tab 2', true)
+
+endtest
Index: mp/testingFramework2/csvScripts/log.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/log.txt	(revision )
+++ mp/testingFramework2/csvScripts/log.txt	(revision )
@@ -0,0 +1,198 @@
+Test Log (2)
+url: test_tab_workflow.js.txt
+starting test 'testCSV'
+this test will enter the EU Trading 2 subsite
+Will create 2 tabs on two pages ,
+Then verify tabs have been created.
+8. //running stored fx _L closeallpopups 0
+create tab
+35. //running stored fx _L createTab 0 var arg1 = "0",var arg2 = "true",var arg3 = "User Tab 1"
+running create tab? true User Tab 1
+renaming User Tab 1 1
+found existing tab User Tab 1
+--- clickAction Cancel #dialogCloneTabFrom null
+too many items User Tab 1 has more than 1
+--- clickAction User Tab 1 #tabHolder 2
+____ still waiting for (waitForShow) #editTabNameDialogContent Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at verifyTabIsSelected (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :806:4) at tH_addStep_fx2 (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:517:13) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+revertTabs
+37. //running stored fx _L revertTabs 0 var arg1 = ""
+go to subsite
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+184. ||running stored fx d leaveSubsite 0 leaveSubsite
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction Leave #dialogNavBar_SubsiteMenu 1
+____ still waiting for
+____ still waiting for Ensure add to subsite tab is hidden - when user leaves subsite edit mode (waitForHide) #dialogAddNewTab
+36. ||running stored fx d hidedropdown 0 hidedropdown
+213. ||running stored fx d ensureAllSubsiteTabsGone 0 ensureAllSubsiteTabsGone
+... recreating tabs
+36. ||running stored fx d hidedropdown 0 hidedropdown
+41. //running stored fx _L createSubsite 0 var arg1 = "EU Trading-Tabs"
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+too many items Create New Subsite has more than 1
+--- clickAction Create New Subsite 7
+____ still waiting for (waitForShow) #dialogManageSubsite Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at createSubsite (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :909:4) at eval (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :954:1) at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+____ still waiting for Ensure title text on dialog (waitForShow) Create Subsite #dialogManageSubsite Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at createSubsite (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :910:4) at eval (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :954:1) at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+____ still waiting for Ensure empty subsite name warning is display (waitForShow) A subsite name is required #dialogManageSubsite Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at createSubsite (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :911:4) at eval (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :954:1) at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+____ still waiting for Ensure empty subsite name warning is removed (waitForHide) A subsite name is required
+____ still waiting for Ensure "long name" warning is display (waitForShow) Max length is 16 characters #dialogManageSubsite Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at createSubsite (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :923:4) at eval (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :954:1) at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+set text
+--- clickAction OK #dialogManageSubsite 1
+____ still waiting for (waitForShow) EU Trading-Tabs Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at createSubsite (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :950:4) at eval (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :954:1) at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+22. ||running stored fx d closeallpopups 0 closeallpopups
+43. //running stored fx _L goToSubsite 0 var arg1 = "EU Trading-Tabs"
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+____ still waiting for wait for the subsite in the list (waitForShow) EU Trading-Tabs #holderMySubsiteList Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at goToSubsite (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :1041:4) at eval (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :1048:1) at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction EU Trading-Tabs #holderMySubsiteList 1
+44. //running stored fx _L createTab 0 var arg1 = "0",var arg2 = "false",var arg3 = "Subsite Tab 1"
+running create tab? false Subsite Tab 1
+renaming Subsite Tab 1 0
+creating the new tab Function (copy)
+--- clickAction #dialogAddNewTab 1
+____ still waiting for waiting for clonetab dialog (waitForShow) #dialogCloneTabFrom Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at cloneTab_QuickIFTabExists (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :768:4) at outerWrapper (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:537:17) at fx_testLinkSync (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:440:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction OK #dialogCloneTabFrom 1
+too many items Function (copy) has more than 1
+--- clickAction Function (copy) #tabHolder 2
+____ still waiting for (waitForShow) #editTabNameDialogContent Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at onXYX (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :792:4) at tH_addStep_fx2 (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:517:13) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction #editTabNameDialogContent 1
+--- clickAction a|||Rename #dialogTabContextMenuContent 1
+____ still waiting for (waitForShow) #dialogRenameTab Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at onXYX (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :796:4) at tH_addStep_fx2 (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:517:13) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction OK #dialogRenameTab 1
+--- clickAction Function (copy) #tabHolder null
+____ still waiting for (waitForShow) #editTabNameDialogContent Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at verifyTabIsSelected (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :806:4) at tH_addStep_fx2 (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:517:13) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+45. //running stored fx _L ensureTab 0 var arg1 = "User Tab 1",var arg2 = "true"
+what2 User Tab 1
+116. ||running stored fx d refreshSubsites 0 refreshSubsites
+go to subsite
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+184. ||running stored fx d leaveSubsite 0 leaveSubsite
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction Leave #dialogNavBar_SubsiteMenu 1
+____ still waiting for
+____ still waiting for Ensure add to subsite tab is hidden - when user leaves subsite edit mode (waitForHide) #dialogAddNewTab
+36. ||running stored fx d hidedropdown 0 hidedropdown
+213. ||running stored fx d ensureAllSubsiteTabsGone 0 ensureAllSubsiteTabsGone
+36. ||running stored fx d hidedropdown 0 hidedropdown
+@checking for tab User Tab 1
+result of @checking for tab User Tab 1 2 1
+48. //running stored fx _L deleteTabSafe 0 var arg1 = "User Tab 1",var arg2 = "true"
+320. ||running stored fx d findTab 0 findTab User Tab 1 true
+searched for tab User Tab 1
+found existing tab, deleting tab named: User Tab 1
+270. ||running stored fx d deleteTab 0 deleteTab User Tab 1 true
+too many items User Tab 1 has more than 1
+--- clickAction User Tab 1 #tabHolder 2
+will delete searching for tab User Tab 1
+where is tab User Tab 1 ?
+____ still waiting for Did not see context controls (waitForShow) function findTabByName() { tH.logNow('where is tab', tabName_,'?'); var tabs = tH .findByContent('li|||'+tabName_, '#tabHolder'); if ( tabs.length > 1 ) { tH.clickNow(tabs) } return tabs; } Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at deleteTab (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :290:4) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :311:1) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction #editTabNameDialogContent 1
+--- clickAction a|||Delete #dialogTabContextMenuContent 1
+____ still waiting for (waitForShow) #confirmDialog Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at deleteTab (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :295:4) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :311:1) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction OK #confirmDialog 1
+will delete tab User Tab 1 gone
+320. ||running stored fx d findTab 0 findTab User Tab 1 true
+searched for tab User Tab 1
+49. //running stored fx _L ensureTabGone 0 var arg1 = "User Tab 1",var arg2 = "true"
+834. ||running stored fx d ensureTab 0 ensureTab User Tab 1 true false
+what2 User Tab 1
+116. ||running stored fx d refreshSubsites 0 refreshSubsites
+go to subsite
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+184. ||running stored fx d leaveSubsite 0 leaveSubsite
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+213. ||running stored fx d ensureAllSubsiteTabsGone 0 ensureAllSubsiteTabsGone
+36. ||running stored fx d hidedropdown 0 hidedropdown
+@checking for tab User Tab 1
+53. //running stored fx _L goToSubsite 0 var arg1 = "EU Trading-Tabs"
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+____ still waiting for wait for the subsite in the list (waitForShow) EU Trading-Tabs #holderMySubsiteList Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at goToSubsite (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :1041:4) at eval (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :1048:1) at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction EU Trading-Tabs #holderMySubsiteList 1
+55. //running stored fx _L deleteTabSafe 0 var arg1 = "Subsite Tab 1"
+320. ||running stored fx d findTab 0 findTab Subsite Tab 1
+searched for tab Subsite Tab 1
+found existing tab, deleting tab named: Subsite Tab 1
+270. ||running stored fx d deleteTab 0 deleteTab Subsite Tab 1
+too many items Subsite Tab 1 has more than 1
+--- clickAction Subsite Tab 1 #tabHolder 2
+will delete searching for tab Subsite Tab 1
+where is tab Subsite Tab 1 ?
+____ still waiting for Did not see context controls (waitForShow) function findTabByName() { tH.logNow('where is tab', tabName_,'?'); var tabs = tH .findByContent('li|||'+tabName_, '#tabHolder'); if ( tabs.length > 1 ) { tH.clickNow(tabs) } return tabs; } Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at deleteTab (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :290:4) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :311:1) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction #editTabNameDialogContent 1
+--- clickAction a|||Delete #dialogTabContextMenuContent 1
+____ still waiting for (waitForShow) #confirmDialog Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at deleteTab (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :295:4) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :311:1) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction OK #confirmDialog 1
+will delete tab Subsite Tab 1 gone
+320. ||running stored fx d findTab 0 findTab Subsite Tab 1 undefined
+searched for tab Subsite Tab 1
+56. //running stored fx _L ensureTabGone 0 var arg1 = "Subsite Tab 1",var arg2 = "true"
+834. ||running stored fx d ensureTab 0 ensureTab Subsite Tab 1 true false
+what2 Subsite Tab 1
+116. ||running stored fx d refreshSubsites 0 refreshSubsites
+go to subsite
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+184. ||running stored fx d leaveSubsite 0 leaveSubsite
+27. ||running stored fx d showdropdown 0 showdropdown
+____ still waiting for dropdown didnt show (waitForShow) Create New Subsite #dialogNavBar_SubsiteMenu Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :35:4) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction Leave #dialogNavBar_SubsiteMenu 1
+____ still waiting for
+____ still waiting for Ensure add to subsite tab is hidden - when user leaves subsite edit mode (waitForHide) #dialogAddNewTab
+36. ||running stored fx d hidedropdown 0 hidedropdown
+213. ||running stored fx d ensureAllSubsiteTabsGone 0 ensureAllSubsiteTabsGone
+36. ||running stored fx d hidedropdown 0 hidedropdown
+@checking for tab Subsite Tab 1
+61. //running stored fx _L removeAllTabs 0
+62. //running stored fx _L removeAllTabs 0 var arg1 = "true"
+270. ||running stored fx d deleteTab 0 deleteTab User Tab 1
+too many items User Tab 1 has more than 1
+--- clickAction User Tab 1 #tabHolder 2
+will delete searching for tab User Tab 1
+where is tab User Tab 1 ?
+____ still waiting for Did not see context controls (waitForShow) function findTabByName() { tH.logNow('where is tab', tabName_,'?'); var tabs = tH .findByContent('li|||'+tabName_, '#tabHolder'); if ( tabs.length > 1 ) { tH.clickNow(tabs) } return tabs; } Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at deleteTab (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :290:4) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :311:1) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction #editTabNameDialogContent 1
+--- clickAction a|||Delete #dialogTabContextMenuContent 1
+____ still waiting for (waitForShow) #confirmDialog Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at deleteTab (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :295:4) at eval (eval at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17), :311:1) at dAddNextOffsetnEval_Later (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1315:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction OK #confirmDialog 1
+will delete tab User Tab 1 gone
+320. ||running stored fx d findTab 0 findTab User Tab 1
+searched for tab User Tab 1
+68. //running stored fx _L createTab 0 var arg1 = "0",var arg2 = "true",var arg3 = "User Tab 1"
+running create tab? true User Tab 1
+renaming User Tab 1 0
+creating the new tab Function (copy)
+--- clickAction #dialogAddNewTabToUserLayout 1
+____ still waiting for waiting for clonetab dialog (waitForShow) #dialogCloneTabFrom Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at cloneTab_QuickIFTabExists (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :768:4) at outerWrapper (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:537:17) at fx_testLinkSync (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:440:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction OK #dialogCloneTabFrom 1
+too many items Function (copy) has more than 1
+--- clickAction Function (copy) #tabHolder 2
+____ still waiting for (waitForShow) #editTabNameDialogContent Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at onXYX (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :792:4) at tH_addStep_fx2 (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:517:13) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction #editTabNameDialogContent 1
+--- clickAction a|||Rename #dialogTabContextMenuContent 1
+____ still waiting for (waitForShow) #dialogRenameTab Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at onXYX (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :796:4) at tH_addStep_fx2 (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:517:13) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction OK #dialogRenameTab 1
+--- clickAction Function (copy) #tabHolder null
+____ still waiting for (waitForShow) #editTabNameDialogContent Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at verifyTabIsSelected (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :806:4) at tH_addStep_fx2 (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:517:13) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+69. //running stored fx _L createTab 0 var arg1 = "1",var arg2 = "true"
+running create tab? true
+creating the new tab Complex (copy)
+--- clickAction #dialogAddNewTabToUserLayout 1
+____ still waiting for waiting for clonetab dialog (waitForShow) #dialogCloneTabFrom Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at cloneTab_QuickIFTabExists (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :768:4) at outerWrapper (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:537:17) at fx_testLinkSync (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:440:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+--- clickAction OK #dialogCloneTabFrom 1
+70. //running stored fx _L createTab 0 var arg1 = "0",var arg2 = "false",var arg3 = "Subsite Tab 1"
+running create tab? false Subsite Tab 1
+renaming Subsite Tab 1 0
+creating the new tab Function (copy)
+--- clickAction #dialogAddNewTab 0
+____ still waiting for waiting for clonetab dialog (waitForShow) #dialogCloneTabFrom Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at cloneTab_QuickIFTabExists (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :768:4) at outerWrapper (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:537:17) at fx_testLinkSync (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:440:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+____ still waiting for waiting for clonetab dialog (waitForShow) #dialogCloneTabFrom Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at cloneTab_QuickIFTabExists (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :768:4) at outerWrapper (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:537:17) at fx_testLinkSync (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:440:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13)
+_________
+Test Failed failed on thing isDialogVisible_waitForShow waiting for clonetab dialog (waitForShow) #dialogCloneTabFrom Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at cloneTab_QuickIFTabExists (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :768:4) at outerWrapper (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:537:17) at fx_testLinkSync (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:440:17) at self.startNextMethod (http://rr413c1n7.ms.com:10051/testingFramework/PromiseHelperV3.js:161:13) 11 10 waiting for clonetab dialog (waitForShow) #dialogCloneTabFrom Error at Object.waitForShow (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:1671:17) at cloneTab_QuickIFTabExists (eval at runEval_Later_L (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:2748:29), :768:4) at outerWrapper (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:537:17) at fx_testLinkSync (http://rr413c1n7.ms.com:10051/testingFramework/testFramework.js:440:17) at self.startNextMethod
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/test_user_eutrading2.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/test_user_eutrading2.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/test_user_eutrading2.js.txt	(revision )
@@ -0,0 +1,25 @@
+#test for basic csv
+log this test will enter the EU Trading 2 subsite
+log Ensure user can see 2 subsite tabs.
+
+msg Test Tabs
+
+
+fx closeallpopups
+fx viewSubsite('EU Trading2')
+fx ensureTab('Subsite Tab 1', false,true,false)
+fx ensureTab('Subsite Tab 2', false,true,false)
+fx leaveSubsite()
+
+
+fx ensureTabGone('Subsite Tab 1', false,false)
+fx ensureTabGone('Subsite Tab 2', false,false)
+
+
+fx viewSubsite('EU Trading2')
+fx ensureTab('Subsite Tab 1', false,true,false)
+fx ensureTab('Subsite Tab 2', false,true,false)
+fx leaveSubsite()
+
+
+endtest
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/test_geoff_subsite.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/test_geoff_subsite.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/test_geoff_subsite.js.txt	(revision )
@@ -0,0 +1,17 @@
+#test for basic csv
+log this test will enter the EU Trading 2 subsite
+log Ensure user can see 2 subsite tabs.
+
+msg Test Tabs
+
+
+fx closeallpopups
+#fx removeSubsite('Geoff_Subsite');
+#fx createSubsite('Geoff_Subsite', null, true)
+fx closeallpopups
+editSubsite('')
+fx createTab(0,false, 'Munis');
+
+
+
+endtest
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/framework/test.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/framework/test.txt	(revision )
+++ mp/testingFramework2/csvScripts/framework/test.txt	(revision )
@@ -0,0 +1,35 @@
+#test for basic csv
+/*
+require "Win32API"
+Beep = Win32API.new("kernel32", "Beep", ["I", "I"], 'v')
+def beep freq, duration
+    #puts 'beep', freq, 'd', duration
+  Beep.call(freq, duration)
+end*/
+beep 600, 400
+def - showdropdown
+var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+x42NavBarNav_DropDown.addClass('open')
+end
+
+fx showdropdown
+
+endtest
+click button
+clickJ .redTest //click red button
+clickText jump
+clickText test 2
+log test
+set #txtArea set the text
+set #txtArea; set the text ~use semi colon to delinate args
+set #txtArea |set the text ~use pika to delinate args
+alert new alert
+logNow sdfsdf
+logNext sdfsdfsdf
+log sdfsdfsdfsdfsdf
+wait 2 //wait 2 seoncds
+/*
+block comment
+*/
+--comment
+~some message alert //alias for log
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/crud_subsites.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/crud_subsites.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/crud_subsites.js.txt	(revision )
@@ -0,0 +1,29 @@
+#test for basic csv
+log this test will enter the EU Trading 2 subsite
+log Will create 2 tabs on two pages ,
+log Then verify tabs have been created.
+
+fx closeallpopups
+
+fx leaveSubsite();
+
+fx refreshSubsites('EU Trading2');
+msg deleting the subsite
+fx removeSubsite('EU Trading2');
+
+msg creating the subsite
+msg creating the subsite3
+fx createSubsite('EU Trading2');
+
+fx createTab(0,false, 'Subsite Tab 1');
+fx createTab(0,false, 'Subsite Tab 2');
+
+
+fx leaveSubsite();
+
+fx ensureTabGone('Subsite Tab 1', false)
+fx goToSubsite('EU Trading2')
+fx ensureTab('Subsite Tab 1', false, true, false)
+
+
+endtest
Index: mp/testingFramework2/csvScripts/framework/test_adv_ordering.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/framework/test_adv_ordering.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/framework/test_adv_ordering.js.txt	(revision )
@@ -0,0 +1,75 @@
+#test for basic csv
+require "Win32API"
+Beep = Win32API.new("kernel32", "Beep", ["I", "I"], 'v')
+
+
+function clickBtn(btnTxt) {
+    var btn = tH.findByContent(btnTxt)
+    tH.click(btn);
+    tH.fx('annotateDiv', btnTxt)
+}
+
+function clickUpTo3(a,b,c) {
+
+    if ( a ) {
+        tH.fx('clickBtn', a)
+    }
+        if ( b ) {
+            tH.fx('clickBtn', b)
+        }
+            if ( c ) {
+                tH.fx('clickBtn', c)
+            }
+
+}
+
+
+function clearAnnotations() {
+   var tClass = 'timeAnnotation';
+    //  uiUtils.removeWithClass(tClass)
+  uiUtils.removeWithClass(tClass)
+}
+
+function annotateDiv(text) {
+//} fix this
+   var tClass = 'timeAnnotation';
+   /*
+   var link = $(".tree.x42-nav-sidebar-item.is-a-link.is-current")
+   var div = link.find('.'+tClass);
+   var linkName = div.text().trim();
+   */
+   var link = tH.findByContent(text)
+   var div = $("[forLink='"+text+"']");
+
+
+    if ( div.length == 0  )  {
+
+        var cfg = uiUtils.addFloatingDiv()
+        var div = cfg ; //cfg.ui;
+        // div.text('holder')
+        div.attr('forLink', text);
+        div.css('background', '#f2f2f2')
+        div.css('padding', '5px')
+        /*if ( text ) {
+        div.text(text);
+        }*/
+        div.addClass(tClass);
+        div.css('z-index', 10000);
+        console.log('.........',div);
+
+        uiUtils.moveAToB(div, link)
+        uiUtils.pos.adjust(div, -5, null, null, 20)
+    }
+
+    var cfg = uiUtils.addSpan()
+    var divA =  cfg.ui;
+    divA.text('ccccccccccccccb')
+    if ( text ) {
+        divA.text(text+' ');
+    }
+    div.append(divA)
+}
+
+fx.clearAnnotations()
+fx.clickUpTo3(1,2,3)
+fx.clickUpTo3(7,8,9)
Index: mp/testingFramework2/csvScripts/framework/testCSVScript.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/framework/testCSVScript.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/framework/testCSVScript.js.txt	(revision )
@@ -0,0 +1,103 @@
+
+#test for basic functionality
+click hat
+click red ball
+
+
+
+def gotopage
+      tH.setDefaultAddNext()
+        var pageName = arg2
+        var pageMenuLinkText = arg1
+      tH.data.maxTimesNext = 50;
+        tH.addSync(function showStuffLater() {
+        if ( window.$scope != null ){
+         return; //live don't need it
+        }
+             var y =  tH.findByContent(pageName, '.x42-nav-body-container' )
+              var y2 = tH.findByContent('pt-table')//, 'pt table did not load')
+              y2.hide()
+              y.hide()
+                   setTimeout(function () {
+                            y.show(); }, 1500)
+              setTimeout(function () {
+              y2.show(); }, 3500)
+        });
+      tH.click(pageMenuLinkText , 'x42-nav-sidebar');
+      tH.waitForShow(pageName, 'did not switch to '+pageName+' page', '.x42-nav-body-container' )
+      tH.waitForShow('pt-table', 'pt table did not load')
+      tH.log('Navigated to', pageName);
+
+      tH.resetDefaultAddNext()
+end
+
+
+fx gotopage; Revenue; Revenue
+
+log changed to revenue page
+wait 2
+
+fx gotopage; External Revenue; External Revenue
+
+
+
+endtest
+
+click #aaaaaa
+
+def testaddorder
+    function cloneTab_QuickIFTabExists() {
+        //tH.setDefaultAddNext();
+        tH.click('333');
+        // tH.resetDefaultAddNext();// = false;
+    }
+    tH.setDefaultAddNext();
+    tH.click('#1111');
+    //  tH.waitForShow( '#dialogCloneTabFrom')
+    tH.click('2222')
+    tH.addSync(cloneTab_QuickIFTabExists)
+    tH.click('4444')
+    tH.resetDefaultAddNext();// = false;
+end
+
+click #bbbb
+fx testaddorder
+click #ccccc
+endtest
+
+eval run_basic_fx
+    tH.logNow('evaled')
+end
+
+fx run_basic_fx
+
+def test-args
+    console.log('1', arg1);
+    console.log('2', arg2);
+    console.log('3', arg3)
+    tH.logNow('args', arg1, arg2, arg3)
+end
+ 
+
+fx test-args; 5; 6; 8
+
+
+def test_def
+    tH.logNow('test_def', arg1 )
+end
+def clickAnItem
+    //#item; howManyItems
+    console.log('1', arg1);
+    tH.logNow('clicking', arg1)
+    tH.defaultAddNext = true;
+    tH.click(arg1, '#divsContainerCounter' )
+    tH.callFx('test_def',  'hellooo' )
+    tH.defaultAddNext = false;
+end
+
+
+fx clickAnItem; 6
+fx clickAnItem; 2
+
+
+
Index: mp/testingFramework2/csvScripts/framework/success.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/framework/success.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/framework/success.js.txt	(revision )
@@ -0,0 +1,64 @@
+#test that works well
+
+/*
+log success
+log yes
+*/
+
+def fxOther(a,b,c)
+    console.log('fxOther', a,b,c)
+end
+def fx_inner
+    console.log('arg1', null)
+    tH.click('what')
+    tH.fx('fxOther', 1,2,3)
+end
+fx fx_inner
+
+#endtest
+def fx0
+    console.log('arg1', null)
+end
+fx fx0
+def fx1
+    console.log('arg1', arg1)
+end
+
+fx fx1; a; b; c
+fx fx1 a; b; c //technically incorrect
+#endtest
+
+def fx1b //ignore comment plz
+    console.log('v2', 'arg1', arg1)
+end
+
+fx fx1b a; b; c
+fx fx1b; a; b; c
+fx fx1b('aalpha');
+
+
+def fx2
+    console.log('arg1', arg1, arg2)
+end
+
+fx fx2 a; b
+
+
+
+def fx3(a,b,c)
+    console.log('a', a, 'b', b, 'c', c);
+end
+
+
+fx fx3(4,5,'ertert');
+fx fx3
+
+fx fx3 5; 6
+#endtest
+
+def fx4(a,b,c) //will this work?
+    console.log('fx4', 'a', a, 'b', b, 'c', c);
+end
+
+
+fx fx4(4,5,'ertert');
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/smoketest2.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/smoketest2.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/smoketest2.js.txt	(revision )
@@ -0,0 +1,256 @@
+#http://rr413c1n7.ms.com:10051/ccrt/index_subsites.html#/externalRevenuePT?testName=testCSV&arg1=csvScripts%2Fsmoketest.js.txt&loadTestFramework=true&dialogSearchTests=true
+http://rr413c1n7.ms.com:10051/ccrt/index.html#/externalRevenuePT?testName=testCSV&arg1=csvScripts%2Fsmoketest.js.txt&loadTestFramework=true&dialogSearchTests=true
+
+#test for basic csv
+log this test verifies create subsite functionality
+
+#fx closeallpopups
+
+status ok
+
+
+
+
+
+function clearAnnotations() {
+   var tClass = 'timeAnnotation';
+
+    //  uiUtils.removeWithClass(tClass)
+
+
+  uiUtils.removeWithClass(tClass)
+}
+
+function addAnnotation(text) {
+
+//} fix this
+    var tClass = 'timeAnnotation';
+
+       var link = $(".tree.x42-nav-sidebar-item.is-a-link.is-current")
+       var div = link.find('.'+tClass);
+       var linkName = div.text().trim();
+       var div = $("[forLink='"+linkName+"']");
+
+
+    if ( div.length == 0  )  {
+
+        var cfg = uiUtils.addFloatingDiv()
+        var div = cfg ; //cfg.ui;
+       // div.text('holder')
+        div.attr('forLink', linkName);
+        div.css('background', '#f2f2f2')
+        div.css('padding', '5px')
+        /*if ( text ) {
+            div.text(text);
+        }*/
+        div.addClass(tClass);
+        div.css('z-index', 10000);
+        console.log('.........',div);
+
+          uiUtils.moveAToB(div, link)
+          uiUtils.pos.adjust(div, -5, null, null, 20)
+     }
+
+        var cfg = uiUtils.addSpan()
+        var divA =  cfg.ui;
+        divA.text('ccccccccccccccb')
+        if ( text ) {
+            divA.text(text+' ');
+        }
+        div.append(divA)
+
+}
+fx.clearAnnotations();
+fx.addAnnotation('test'); 
+fx.addAnnotation('test2');
+//endtest
+fx.clearAnnotations();
+
+function waitForLoadPtLoad(tabName) {
+    console.log('x')
+    tH.waitForLoad = function waitForLoad(jquery, waitForFailureReason, parentJq, times ) {
+        console.log('...', 5)
+        var s = 'Error Could not load tab'
+        var stepMsg = [waitForFailureReason,'(waitForLoad) ',
+            jquery, parentJq, s].join(' ')
+
+
+        tH.waitForError = stepMsg;
+        tH.testWaitforfxFail = function testWaitforfxFail() {
+              //debugger
+              tH.fxNow('addAnnotation', tabName+' failed')
+        }
+        tH.waitFor(function isPtTableVisble_(){ //waitForHide
+            var ptTable = $('pt-table')
+            console.log('...', 4, ptTable.css("opacity"), ptTable.is(":visible"))
+            tH.moveCursorTo(ptTable);
+            //debugger;
+            if ( ptTable.length == 0 ) {
+                console.warn('jqueryIs 0 length', jquery);
+                return false;
+            }
+            if ( ptTable.css("opacity") != "1") {
+                return false;
+            }
+            return true==ptTable.is(":visible");
+        }, 1, null, false );
+    };
+    tH.waitForLoad()
+}
+
+#fx.waitForLoadPtLoad()
+#endtest
+
+function getNavMenuLinks( clickLinks, maxLinksToClick, clickTabs) {
+
+    var links =     $('x42-tree').find('.tree-label-anchor')
+    var links2 = links.filter(function filterInvalidLinks(i){
+        //
+        var ui = $(this)
+        //ui = ui.find('a')
+        var hasHref = ui.attr('href') != null
+        //console.debug('links', i, ui, hasHref, ui.attr('href'))
+        if ( hasHref ) {
+            return true;
+        }
+        return false;
+    })
+
+    console.debug('links', links.length)
+    console.debug('links2', links2.length)
+
+    if ( clickLinks ) {
+
+    if ( maxLinksToClick == null ) { maxLinksToClick = links2.length }
+
+         var linkNames = [];
+              $.each(links2,
+                    function onClick_NavLink(k,ui) {
+                        var navLink = $(ui)
+                        // debugger;
+                        var linkName = navLink.text().trim()
+                        console.debug('click link', k)
+
+                        //var skipTabs = ['+', 'Custom']
+                        //if ( skipTabs.indexOf(tabName) != -1  ) {
+                        //    return;
+                        //}
+                        if ( k <= maxLinksToClick ) {
+                            //tH.click(tabName, '#tabHolder');
+                            navLink.offsetWidthForAnnotation = true;
+                            tH.click(navLink);
+                            tH.wait(2);
+                           if ( clickTabs ) {
+                               // tH.addStep(function findTabsOnPage() {
+                                    //tH.fxNow('findTabs', 2);
+                                    tH.fx('findTabs', 2, linkName);
+                                //    tH.test.cb()
+                               // })
+                            }
+                            //navLink.click();
+                        }
+                        linkNames.push(linkName);
+                    }
+                 );
+
+        console.debug('clicking nav links', linkNames)
+
+    } else {
+        if ( clickTabs ) {
+                tH.fx('findTabs', 2);
+        }
+    }
+
+            //TODO: make a tH.fxNow .. that wraps it in a step ...
+
+    return links2
+
+
+}
+
+
+
+//getNavMenuLinks()
+fx.getNavMenuLinks(  true,3, true)
+
+
+function findTabs(maxTabs, linkName) {
+    var tabs =  $('#tabHolder').find('li.uib-tab:visible')
+    console.debug('tabs', maxTabs, tabs.length);
+    var tabNames = [];
+    if ( maxTabs ) {
+        tH.addStep(function clickTabs() {
+            $.each(tabs, function onClick(k,ui) {
+                var tab = $(ui)
+                // debugger;
+                console.debug('booo', k)
+                var tabName = tab.text().trim()
+                var skipTabs = ['+', 'Custom']
+                if ( skipTabs.indexOf(tabName) != -1  ) {
+                    return;
+                }
+                if ( k <= maxTabs ) {
+                    tH.click(tabName, '#tabHolder');
+                    //fx.waitForLoadPtLoad()
+                    tH.msgStatus('loading tab', tabName);
+                    //tH.wait(3)
+                    // tH.wait(2)
+                    tH.fx('waitForLoadPtLoad', tabName)
+                    return;
+                }
+                tabNames.push(tabName);
+            });
+
+            tH.test.cb()
+         });
+     }
+    console.debug('tabNames', tabNames);
+    return tabs
+}
+
+#fx.findTabs(2);
+
+
+
+function clickkForX() {
+    var table = $('pt\\:remote-table');
+    $('pt-table').css('opacity');
+    return tabs
+}
+
+
+
+findTabs()
+
+
+
+function testFx(a,b,c) {
+    console.log(a,b,c)
+    console.log('ok')
+    function breakit () {
+
+    };
+    return
+}
+
+fx.testFx('g')
+
+endtest
+
+
+
+
+
+log test
+
+
+
+$('x42-tree').find('x42-tree-node').find('[level=3]').find('.tree-label-anchor')
+
+$('x42-tree').find('.tree-label-anchor')
+
+
+fx waitForLoadPtLoad
+
+
+endtest
Index: mp/testingFramework2/dialogSearchTests.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/dialogSearchTests.html	(revision )
+++ mp/testingFramework2/dialogSearchTests.html	(revision )
@@ -0,0 +1,62 @@
+<!DOCTYPE html>
+<html>
+<head>
+    <script src="searchTests.js" ></script>
+</head>
+<body>
+<!--
+<div style="display: none; position: fixed; bottom: 10px; right: 10px" id="testLogPanel" >
+    asdf
+</div>
+-->
+<style>
+    #testTable thead, #testTable tbody { display: block; }
+    #testTable tbody {
+        height: 100px;       /* Just for the demo          */
+        overflow-y: auto;    /* Trigger vertical scroll    */
+        overflow-x: hidden;  /* Hide the horizontal scroll */
+    }
+    .dialogX {
+    }
+
+
+</style>
+<section class="xtransparent-container xcontainer dialogX"
+        >
+    <div  style="font-weight: bold;">Test List</div>
+    <br />
+
+    <input id="txtSearchTestNames" type="search" class="form-control light-table-filter"
+           data-table="order-table" placeholder="filter">
+    <br />
+    <table id="testTable" class="order-table table">
+        <!-- <thead>
+         <tr>
+             <th>Name</th>
+             <th>Description</th>
+             <th></th>
+         </tr>
+         </thead>-->
+        <tbody>
+        <tr>
+            <td>John Doe</td>
+            <td>john.doe@gmail.com</td>
+            <td><button class="btn btn-primay">Play</button></td>
+        </tr>
+        <tr>
+            <td>Jane Vanda</td>
+            <td>jane@vanda.org</td>
+            <td>9876543210</td>
+            <td>349</td>
+        </tr>
+        <tr>
+            <td>Alferd Penyworth</td>
+            <td>alfred@batman.com</td>
+            <td>6754328901</td>
+            <td>199</td>
+        </tr>
+        </tbody>
+    </table>
+</section>
+</body>
+</html>
\ No newline at end of file
Index: mp/testingFramework2/lotte.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/lotte.js	(revision )
+++ mp/testingFramework2/lotte.js	(revision )
@@ -0,0 +1,531 @@
+//alert('lotte')
+
+
+
+//http://10.211.55.4:33310/api/search:c?166af0ef8327c82375d4ac2432cd913a 404 (N
+//http://10.211.55.4:33310/api/search:all?sessionid=53947c4e435ad7429bfe9ec972df0ea4&session_id=53947c4e435ad7429bfe9ec972df0ea4&boo=yay
+
+
+function hideShow(idToHide) {
+    if ( $('#'+idToHide).hasClass('hide') ) {
+        $('#'+idToHide).removeClass('hide')
+    }  else {
+        $('#'+idToHide).addClass('hide')
+    }
+}
+
+var dict = {};
+
+
+//var sh = require('shelpers').shelpers;
+//var shelpers = require('shelpers');
+
+function TestThing() {
+    var p = TestThing.prototype;
+    p = this;
+    var self = this;
+    self.count = 0;
+
+    p.method1 = function method1(url, appCode) {
+    }
+
+    p.getUserInfo = function getUserInfo(fx) {
+        self.utils.makeCall(self.utils.makeUrl('getUserInfo'), fx)
+        self.fxSummary = function (data) {
+            var result = 'booty';
+            result = [data.username , 'is a', data.level, 'user'].join(' ')
+            return result
+        }
+        self.fxTest = function (data) {
+            var result = data;
+            result = data.username == self.username
+            result = result.toString();
+            return result
+        }
+        self.why = 'verify getUserInfo works'
+    }
+
+    p.search = function search(fx) {
+        //var url = 'http://10.211.55.4:33310/api/search:c'
+        self.utils.makeCall(self.utils.makeUrl('api/search:c'+'?'+
+            'session_id=' +
+            self.sessions.session_id
+            ,'33310'), fx)
+
+        self.fxSummary = function (data) {
+            var result = 'booty';
+            result = [data.media.length, 'items'].join(' ')
+            return result
+        }
+        self.why = 'can search?'
+    }
+
+    p.makePayment = function makePayment(fx) {
+        //var url = 'http://10.211.55.4:33310/api/search:c'
+        var obj = {};
+        obj.username = 'admin';
+        obj.product = '1';
+        obj.session_id = self.sessions.session_id;
+        var param = $.param(obj);
+        self.utils.makeCall(self.utils.makeUrl('paymentCreate'+'?'+
+            param
+            ,'8888'), fx)
+        self.why = 'create test payment'
+    }
+
+    p.testPayment = function testPayment(fx) {
+        var obj = {};
+        obj.username = 'admin';
+        obj.product = '1';
+        obj.session_id = self.sessions.session_id;
+        var param = $.param(obj);
+        self.utils.makeCall(self.utils.makeUrl('statusOK_'+'?'+
+            param
+            ,'8888'), fx)
+        self.why = 'verify bitpay and electrum are working'
+    }
+
+    p.getUserCount = function getUserCount(fx) {
+        var obj = {};
+        obj.session_id = self.sessions.session_id;
+        var param = $.param(obj);
+        self.utils.makeCall(self.utils.makeUrl('countUsers'/*+'?'+
+             param*/
+        ), fx)
+        self.makeCallShowAll = true;
+    }
+
+    p.getCPU = function getCPU(fx) {
+        var obj = {};
+        obj.session_id = self.sessions.session_id;
+        var param = $.param(obj);
+        self.utils.makeCall(self.utils.makeUrl('getCPU'/*+'?'+
+             param*/
+        ), fx)
+        //self.makeCallShowAll = true;
+    }
+
+
+    p.getTest = function getTest(fx) {
+        var obj = {};
+        obj.session_id = self.sessions.session_id;
+        var param = $.param(obj);
+
+        self.makeCallNoRun = true
+
+        self.utils.makeCall(self.utils.makeUrl('index.html?runTest=true&testName=rHome#results=yyy+...+'/*+'?'+
+             param*/
+        ), fx);
+        //localhost:63342/Code/code-yeti/test2/test2.html?runTest=true&testName=testA
+
+    }
+
+    p.getTest2 = function getTest2(fx) {
+        var obj = {};
+        obj.session_id = self.sessions.session_id;
+        var param = $.param(obj);
+
+        self.makeCallNoRun = true
+
+        self.utils.makeCall(self.utils.makeUrl('index.html?runTest=true&testName=rLoginExpiredUser#results=yyy+...+'/*+'?'+
+             param*/
+        ), fx);
+        //localhost:63342/Code/code-yeti/test2/test2.html?runTest=true&testName=testA
+        self.why = 'verify expired accounts';
+    }
+
+    p.getTest3 = function getTest3(fx) {
+        var obj = {};
+        obj.session_id = self.sessions.session_id;
+        var param = $.param(obj);
+        self.makeCallNoRun = true
+        self.utils.makeCall(
+            self.utils.makeUrl('index.html?runTest=true&testName=rLoginExpiredUser#results=yyy+...+'
+        ), fx);
+        self.why = 'hit all pages';
+    }
+
+
+
+
+    p.login = function login(user, password, fx) {
+        var data = {}
+        data.loginUsername = 'admin'
+        data.loginPassword = 'password'
+        self.sessions = {};
+        $.ajax({
+            type: "POST",
+            url: url,
+            data: data,
+            success: success,
+            error: errorX,
+            dataType: 'json',
+            crossDomain: true,
+            xhrFields: {
+                withCredentials: true
+            }
+        });
+
+        function success(e) {
+            console.log('e', e)
+            self.sessions.session_id = e.key;
+            self.sessions.sessionid = e.key;
+            sh.callIfDefined(fx)
+        }
+
+        function errorX(e) {
+            console.error('e', e)
+        }
+    }
+
+    p.run = function method1(url, appCode) {
+        var work = new PromiseHelperV3();
+        var t = work;
+        var token = {};
+        token.silentToken = true
+        work.wait = token.simulate==false;
+        work.startChain(token)
+        work.add(function () {
+            console.log('password')
+            self.login('s', 'p', function () {
+                console.log('....ppp')
+                t.cb();
+            })
+
+        })
+        self.work = work;
+        self.workChain = work;
+        self.utils.addToChain(work)
+
+        self.utils.doNotRun = function doNotRun() {
+            work.add(function () {
+                self.makeCallNoRun = true
+                console.info('do not run', '...')
+                t.cb();
+            })
+
+        }
+        work.addA(self.getUserInfo)
+        work.addA(self.search)
+        work.addA(self.testPayment)
+        work.addA(self.makePayment)
+        work.addA(self.getUserCount);
+        self.utils.doNotRun()
+        // work.addA(self.makePayment)
+        work.addA(self.getUserCount);
+        work.addA(self.getCPU);
+        work.addA(self.getTest)
+        work.addA(self.getTest2)
+        work.addA(self.getTest3);
+
+        work.add(function x2() {
+            console.log('....last call')
+        })
+    }
+
+    function defineUtils() {
+        p.utils = {}
+        p.utils.makeCall = function makeCall(url, fxOk, type) {
+            // var url = 'http://10.211.55.4:33031/getUserInfo'
+            type = sh.dv(type, 'GET')
+            console.info('url', url)
+            if ( self.makeCallNoRun) {
+                console.info('makeCallNoRun', url, self.makeCallNoRun)
+                self.makeCallNoRun = false;
+                self.makeCallUrl = url;
+                self.makeCallResult = null;
+                sh.callIfDefined(fxOk);
+                return;
+            }
+
+            $.ajax({
+                type: type,
+                url: url,
+                /* headers:{
+                 session_id: self.sessions.session_id,
+                 },*/
+                beforeSend: function (request)
+                {
+                    //  sdf.g
+                    // request.setRequestHeader("Authority", 'ggg');
+                },
+                //data: data,
+                success: success,
+                error: errorX,
+                dataType: 'json',
+                crossDomain: true,
+                xhrFields: {
+                    withCredentials: true
+                }
+            });
+
+            function success(e) {
+                console.info('url', url, 'ok', e)
+                self.makeCallUrl = url;
+                self.makeCallResult = e;
+                self.makeCallSummary = null;
+                // debugger;
+                sh.callIfDefined(fxOk);
+            }
+
+            function errorX(e) {
+                console.error('e', e)
+
+                self.makeCallUrl = url;
+                self.makeCallResult = e;
+                self.makeCallFailed = true;
+                self.makeCallSummary = 'error' + e
+                // debugger;
+                sh.callIfDefined(fxOk);
+            }
+        }
+        p.utils.makeUrl = function makeUrl(url, port) {
+            self.port = '33031'
+            if ( port  == null ) {
+                port = ':' + self.port;
+            }else {
+                port = ':' + port;
+            };
+
+            //var url = 'http://10.211.55.4:33031/getUserInfo'
+            var fullUrl = 'http://'+self.ip + port + '/' + url;
+            self.url = fullUrl;
+            return fullUrl;
+        }
+
+        p.utils.addToChain = function addToChain(work) {
+            /**
+             * Auto adds fx as chain-link
+             * @param fx
+             * @param args__
+             */
+            work.addA = function addAMethod(fx, args__) {
+                work.add(autoAddedChain)
+                var dictKey = self.ip+'_'+fx.name
+                dict[dictKey] = autoAddedChain;
+                var args = sh.convertArgumentsToArray(arguments);
+                function autoAddedChain(rerun) {
+                    //console.log('password')
+                    args.shift();
+                    var fxCallback = args.pop();
+
+                    args.push(function autoGemCallback(data){
+
+                        sh.callIfDefined(fxCallback, data)
+                        console.log('....end of auto defined ', fx.name)
+
+                        var divContainer = $('<div />');
+                        divContainer.css('padding-left')
+                        $('#testOutput').append(divContainer);
+
+
+                        var divUrl = $('<div />');
+                        var divJSON = $('<pre  />');
+                        var btnHide = $('<button/>')
+
+                        self.count++;
+                        var count = self.count+'. '
+                        var a = $('<a />');
+                        a.attr('href', self.makeCallUrl);
+                        a.html(self.makeCallUrl)
+                        a.css('width', '50%');
+                        divUrl.html(count  ); //divUrl.html(count     );
+                        divUrl.append(a);
+                        //divSpan.html(sh.toJSONString(self.makeCallResult));
+                        divJSON.append('<br/>');
+                        divJSON.html(JSON.stringify(self.makeCallResult, undefined, 2));
+
+                        var idResultsDiv = 'results_'+self.count
+
+                        divUrl.append(' ');
+
+                        btnHide.html('hide');
+
+
+                        btnHide.attr('onclick', 'hideShow('+sh.q(idResultsDiv)+')')
+                        btnHide.addClass('btn btn-default')
+                        divUrl.append(btnHide);
+
+
+                        var btnHide = $('<button/>')
+                        btnHide.html('replay');
+                        btnHide.attr('onclick', 'hideShow('+sh.q(dictKey)+')')
+                        btnHide.addClass('btn btn-primary')
+                        divUrl.append(btnHide);
+
+                        // debugger;
+                        //$('#testOutput').append('<br/>');
+                        // $('#testOutput').append('<br/>');
+
+
+                        divContainer.append(divUrl)
+
+                        if ( self.why ) {
+                            var divWhy = $('<div  />');
+                            divWhy.html(self.why)
+                            divContainer.append(divWhy)
+                            self.why = null;
+                        }
+                        divContainer.append('<br/>');
+                        divJSON.attr('id', idResultsDiv);
+                        if ( self.makeCallShowAll != true ) {
+                            divJSON.addClass('hide');
+                        }
+                        self.makeCallShowAll = false;
+
+                        divContainer.append(divJSON)
+
+                        if ( self.makeCallFailed != true ) {
+                            if (self.fxSummary) {
+                                var divSummary = $('<pre  />');
+
+                                try {
+                                    divSummary.html(self.fxSummary(self.makeCallResult))
+                                } catch ( e ) {
+                                    divSummary.html(e);
+                                    //hide by default
+                                    //divJSON.addClass('hide');
+                                }
+
+                                divContainer.append(divSummary)
+
+                            }
+                            if (self.fxTest) {
+                                var divTest = $('<pre  />');
+                                divTest.html(self.fxTest(self.makeCallResult))
+                                divContainer.append(divTest)
+
+                            }
+                            ;
+                        } else {
+                            var divTest = $('<pre  />');
+                            divTest.html( (self.makeCallResult))
+                            divContainer.append(divTest)
+                            divTest.addClass('btn-danger')
+                            //btn btn-danger
+                        }
+
+                        self.fxSummary = null;
+                        self.fxTest = null;
+                        self.makeCallFailed = false;
+                        work.cb();
+                    })
+                    // sh.callIfDefined(fx, args)
+                    args.unshift(fx); //add to front
+                    sh.callIfDefined.apply(null, args)
+                    /* self.login('s', 'p', function () {
+
+                     })*/
+                }
+
+            }
+        }
+    }
+    defineUtils()
+
+    p.proc = function debugLogger() {
+        if ( self.silent == true) {
+            return
+        }
+        sh.sLog(arguments)
+    }
+
+
+}
+
+/*
+ exports.TestThing = TestThing;
+
+ if (module.parent == null) {
+
+ }
+ */
+
+var t = new TestThing();
+t.ip = '10.211.55.4'
+t.ip = window.location.hostname;
+t.username = 'admin'
+var url = 'http://'+t.ip+':33031/api/login'
+t.run();
+
+
+function testTest() {
+    var data = {}
+    data.loginUsername = 'admin'
+    data.loginPassword = 'password'
+    var sessions = {};
+    $.ajax({
+        type: "POST",
+        url: url,
+        data: data,
+        success: success,
+        error: errorX,
+        dataType: 'json',
+        crossDomain: true,
+        xhrFields: {
+            withCredentials: true
+        }
+    });
+
+    function success(e) {
+        console.log('e', e)
+        sessions.session_id = e.key;
+        sessions.sessionid = e.key;
+        asdf()
+        doSearch()
+    }
+
+    function errorX(e) {
+        console.error('e', e)
+    }
+
+
+    function asdf() {
+        var url = 'http://'+t.ip+':33031/getUserInfo'
+        $.ajax({
+            type: "GET",
+            url: url,
+            //data: data,
+            success: success,
+            error: errorX,
+            dataType: 'json',
+            crossDomain: true,
+            xhrFields: {
+                withCredentials: true
+            }
+        });
+
+        function success(e) {
+            console.log('ok', e)
+        }
+
+        function errorX(e) {
+            console.error('e', e)
+        }
+    }
+
+    function doSearch() {
+        // curl 'http://10.211.55.4:33310/api/search:c?session_id=50409b30796ef15b3f3d5a42408c2147&boo=yay' -H 'Accept: */*' -H 'Referer: http://10.211.55.4:33031/' -H 'Origin: http://10.211.55.4:33031' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36' --compressed
+        var url = 'http://'+t.ip+':33310/api/search:c'
+        $.ajax({
+            type: "GET",
+            url: url,
+            data: sessions,
+            success: success,
+            error: errorX,
+            dataType: 'json',
+            crossDomain: true,
+            xhrFields: {
+                withCredentials: true
+            }
+        });
+
+        function success(e) {
+            console.log('e', e)
+        }
+
+        function errorX(e) {
+            console.error('e', e)
+        }
+    }
+}
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/dev/testCSVScript.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/dev/testCSVScript.txt	(revision )
+++ mp/testingFramework2/csvScripts/dev/testCSVScript.txt	(revision )
@@ -0,0 +1,12 @@
+#test for love
+click hat
+click red ball
+
+def test-args
+    console.log('1', arg1);
+    console.log('2', arg2);
+    console.log('3', arg3)
+end
+
+
+fx test-args 5 6
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/tab_hiding_adv.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/tab_hiding_adv.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/tab_hiding_adv.js.txt	(revision )
@@ -0,0 +1,105 @@
+#test for basic csv
+//log Test will ensure tabs have proper options
+
+status this test will test advanced tab workflow
+fx closeallpopups
+//log test
+
+fx createSubsite('SS-Tabs-Adv', null, true, true)
+status go to 
+fx goToSubsite('SS-Tabs-Adv')
+status remove all tabs
+
+status ensure first tab is always selected
+fx ensureTabSelected(0)
+//endtest
+
+fx leaveSubsite();
+fx ensureTabSelected(0);
+//endtest
+
+/*
+status reset all tabs
+//ensure user is in subsite mode
+fx goToSubsite('SS-Tabs-Adv')
+
+fx unhideAllTabs()
+status ensureAllTabsVisible
+fx ensureAllTabsVisible()
+
+#endtest
+
+
+status verify all tabs show proper tabs
+fx ensureAllTabsHaveProperOptions();
+*/
+
+fx goToSubsite('SS-Tabs-Adv')
+status verify that hidden tab (0) is hidden, and unhidden when i leave
+fx hideTab(0);
+fx isTabIndexHidden(0,true);
+fx leaveSubsite();
+status verify hidden tab (0) after leaving subsite
+fx isTabIndexVisible(0);
+
+//fx hideTab();
+
+//fx unhideAllTabs()
+
+
+/*
+//ensure hidden tab is ivisible again
+fx goToSubsite('SS-Tabs-Adv')
+
+status leave subsite
+//leave subsite
+fx leaveSubsite();
+
+status ensureVisible-all tabs after leaving the subsite
+fx ensureAllTabsVisible()
+
+endtest
+*/
+
+
+status verify all options on all tabs
+fx goToSubsite('SS-Tabs-Adv')
+fx verifyTabOptions()
+
+//fx removeAllTabs();
+
+//show all hidden tabs
+//fx unhideAllTabs()
+
+status hide tab
+fx hideTab();
+fx unhideAllTabs()
+
+
+fx goToSubsite('SS-Tabs-Adv')
+//create new tab
+status subsite tab
+fx createTab(0,false, 'Subsite Tab 1');
+
+//click on standard tab
+status verifyTabOptions
+fx verifyTabOptions()
+
+//ensure tab is selected
+//ensure layout is visible so user can select latyout
+//do 2x
+//hide standard tab
+//hide new tab
+//switch order on tabs
+status leave subsite
+//leave subsite
+fx leaveSubsite();
+//ensure hidden tab is ivisible agian
+status ensureVisible-all tabs after leaving the subsite
+fx ensureAllTabsVisible()
+
+ msg go back to subsite
+ msg ensure hidden tabs and order is preserved
+
+
+endtest
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/dev/crud_subsites.jbaks.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/dev/crud_subsites.jbaks.txt	(revision )
+++ mp/testingFramework2/csvScripts/dev/crud_subsites.jbaks.txt	(revision )
@@ -0,0 +1,302 @@
+#test for basic csv
+log this test will enter the EU Trading 2 subsite
+log Will create 2 tabs on two pages ,
+log Then verify tabs have been created.
+
+#fx alert
+##fx ensureTab('User Tab 1', true)
+##endtest
+fx closeallpopups
+
+fx createTab(0,true, 'User Tab 1');
+
+fx ensureTab('User Tab 1', true)
+//fx deleteTabSafe('User Tab 1', true)
+fx ensureTabGone('zzzUser Tab 1',true)
+
+fx deleteTabSafe('User Tab 1', true)
+
+endtest
+
+fx removeAllTabs();
+fx removeAllTabs(true);
+
+fx createTab(0,true, 'User Tab 1');
+fx createTab(0,false, 'Subsite Tab 1');
+
+fx ensureTab('User Tab 1', true)
+
+fx removeTab('User Tab 1')
+fx ensureTabGone('User Tab 1',true)
+
+fx removeTab('Subsite Tab 1')
+fx ensureTabGone('Subsite Tab 1',true)
+
+endtest
+
+fx removeAllTabs();
+fx removeAllTabs(true);
+
+//verify OPtions on items ... cusotm has non
+//fx createTab(0,true, 'User Tab 1');
+
+
+fx createTab(0,true, 'User Tab 1');
+fx createTab(1,true);
+fx createTab(0,false, 'Subsite Tab 1');
+fx createTab(1,false);
+
+
+fx removeAllTabs();
+fx removeAllTabs(true);
+
+
+endtest
+fx leaveSubsite();
+fx refreshSubsites('EU Trading2');
+
+
+fx createSubsite('EU Trading2');
+
+endtest #make a tab
+
+fx removeSubsite('EU Trading2');
+#endtest
+fx createSubsite('EU Trading2');
+fx closeallpopups
+endtest
+
+click External Revenue; x42-nav-sidebar
+waitForShow #dialogAddNewTab
+
+fx showdropdown
+
+bookmark running test
+
+
+waitForShow EU Trading2; wait for subsite in list; #holderMySubsiteList
+click  EU Trading2; #holderMySubsiteList
+
+
+waitForShow #dialogAddNewTab; ensure the new subsite tab button is visible
+
+
+bookmark clone the first tab
+#click #dialogAddNewTab
+#waitForShow #dialogCloneTabFrom
+#waitForShow Function
+#click Function; #dialogCloneTabFrom
+
+def create-tab
+
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+            indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+            console.log('found eexisting copy of clone');
+
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+            var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+            btnCancel.click()
+            return
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+        window.$scope.layoutToCopy = [name]
+        window.$scope.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.clickNext('OK', '#dialogCloneTabFrom');
+    }
+    tH.setDefaultAddNext()
+    tH.logNow('running create tab?')
+    // cloneTab_QuickIFTabExists();
+    tH.click('#dialogAddNewTab');
+    tH.waitForShow( '#dialogCloneTabFrom')
+    //  tH.click('')
+    tH.addSync(cloneTab_QuickIFTabExists)
+    tH.resetDefaultAddNext();// = false;
+end
+
+def verifySubsiteTab
+    // tH.setDefaultAddNext()
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+        indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone');
+        return
+        }
+         tH.fail('missing subsite tab ', expectedName)
+    }
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    //  tH.resetDefaultAddNext();// = false;
+end
+
+
+fx create-tab; 0
+fx create-tab; 1
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+//fx verifySubsiteTab; 2
+wait .2
+
+bookmark leave page
+
+def refresh_subsites
+    tH.setDefaultAddNext()
+    tH.fx('showdropdown' )
+    tH.waitForShow('Leave Subsite')
+    tH.click('Leave Subsite')
+    tH.waitForHide('Leave Subsite')//,'#holderMySubsiteList')
+     tH.wait(.5)
+    //tH.logNow('clicking', arg1)
+
+    tH.logNow('go to subsite')
+     tH.click('EU Trading2', '#holderMySubsiteList')
+     window.$scope.subsites.remote.sites.listItems( function() {
+       tH.wait(.5)
+         //click Leave Subsite
+         //waitForHide Leave Subsite
+         //waitForShow EU Trading2; wait for subsite in list; #holderMySubsiteList
+         //click  EU Trading2; #holderMySubsiteList
+
+         //console.log('1', arg1);
+         //tH.logNow('clicking', arg1)
+         tH.resetDefaultAddNext()
+         tH.test.cb()
+   }  )
+
+end
+
+fxasync refresh_subsites
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+
+bookmark leaving page
+
+def gotopage
+    tH.setDefaultAddNext()
+    var pageName = arg2
+    var pageMenuLinkText = arg1
+    tH.data.maxTimesNext = 50;
+    tH.click(pageMenuLinkText , 'x42-nav-sidebar');
+  tH.nextTimeoutTime(60)
+    tH.waitForShow(pageName, 'did not switch to '+pageName+' page', '.x42-nav-body-container' )
+   tH.nextTimeoutTime(60)
+    tH.waitForShow('pt-table', 'pt table did not load')
+    tH.log('Navigated to', pageName);
+    tH.resetDefaultAddNext()
+end
+
+
+fx gotopage; Revenue; Revenue
+
+log changed to revenue page
+wait 2
+
+fx gotopage; External Revenue; External Revenue
+
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+endtest
+
+
+click Revenue; x42-nav-sidebar
+eval
+  tH.data.maxTimesNext = 120;
+end
+waitForShow Revenue; waiting for revenue page to load; .x42-nav-body-container
+waitForShow #dialogAddNewTab
+
+click External Revenue; x42-nav-sidebar
+log finished runnign refresh_subsites
+
+waitForShow Revenue; waiting for revenue page to load; .x42-nav-body-container
+waitForShow #dialogAddNewTab
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+endtest
+
+
+
+
+#############################
+endtest
+click button
+
+
+click Leave Subsite
+
+waitForHide Leave Subsite
+
+click Manage Subsites...
+
+waitForShow #dialogManageSubsites
+
+eval close all popups
+  //window.$scope.popups.hideAllDialogs()
+  //window.$subsitesScope.popups.hideAllDialogs()
+
+  var y = testHelper.findByContent('EU Trading2', $('#dialogManageSubsites') )
+  var tr = y.parents('tr')
+  var trashIcon = tr.find('.fa-trash')
+  console.clear();
+  console.log('trash',y,tr, trashIcon);
+  trashIcon.click()
+end
+
+waitForShow #confirmDialog
+
+#click Cancel; #confirmDialog //ignore
+click OK; #confirmDialog //ignore
+
+
+waitForShow #dialogManageSubsites
+click Close; #dialogManageSubsites
+
+wait 1
+endtest
+click button
+clickJ .redTest //click red button
+clickText jump
+clickText test 2
+log test
+set #txtArea set the text
+set #txtArea; set the text ~use semi colon to delinate args
+set #txtArea |set the text ~use pika to delinate args
+alert new alert
+logNow sdfsdf
+logNext sdfsdfsdf
+log sdfsdfsdfsdfsdf
+wait 2 //wait 2 seoncds
+/*
+block comment
+*/
+--comment
+~some message alert //alias for log
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/wf1_make_tabs.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/wf1_make_tabs.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/wf1_make_tabs.js.txt	(revision )
@@ -0,0 +1,252 @@
+#test for basic csv
+log this test will enter the EU Trading 2 subsite
+log Will create 2 tabs on two pages ,
+log Then verify tabs have been created.
+
+
+
+
+eval  close all popups
+    window.$scope.popups.hideAllDialogs()
+    //window.$subsitesScope.popups.hideAllDialogs()
+end
+
+def - showdropdown
+    var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+    x42NavBarNav_DropDown.addClass('open')
+endeval
+
+click External Revenue; x42-nav-sidebar
+waitForShow #dialogAddNewTab
+
+fx showdropdown
+
+bookmark running test
+
+
+waitForShow EU Trading2; wait for subsite in list; #holderMySubsiteList
+click  EU Trading2; #holderMySubsiteList
+
+
+waitForShow #dialogAddNewTab; ensure the new subsite tab button is visible
+
+
+bookmark clone the first tab
+#click #dialogAddNewTab
+#waitForShow #dialogCloneTabFrom
+#waitForShow Function
+#click Function; #dialogCloneTabFrom
+
+def create-tab
+
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+            indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+            console.log('found eexisting copy of clone');
+
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+            var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+            btnCancel.click()
+            return
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+        window.$scope.layoutToCopy = [name]
+        window.$scope.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.clickNext('OK', '#dialogCloneTabFrom');
+    }
+    tH.setDefaultAddNext()
+    tH.logNow('running create tab?')
+    // cloneTab_QuickIFTabExists();
+    tH.click('#dialogAddNewTab');
+    tH.waitForShow( '#dialogCloneTabFrom')
+    //  tH.click('')
+    tH.addSync(cloneTab_QuickIFTabExists)
+    tH.resetDefaultAddNext();// = false;
+end
+
+def verifySubsiteTab
+    // tH.setDefaultAddNext()
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+        indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone');
+        return
+        }
+         tH.fail('missing subsite tab ', expectedName)
+    }
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    //  tH.resetDefaultAddNext();// = false;
+end
+
+
+fx create-tab; 0
+fx create-tab; 1
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+//fx verifySubsiteTab; 2
+wait .2
+
+bookmark leave page
+
+def refresh_subsites
+    tH.setDefaultAddNext()
+    tH.callFx('showdropdown' )
+    tH.waitForShow('Leave Subsite')
+    tH.click('Leave Subsite')
+    tH.waitForHide('Leave Subsite')//,'#holderMySubsiteList')
+     tH.wait(.5)
+    //tH.logNow('clicking', arg1)
+
+    tH.logNow('go to subsite')
+     tH.click('EU Trading2', '#holderMySubsiteList')
+     window.$scope.subsites.remote.sites.listItems( function() {
+       tH.wait(.5)
+         //click Leave Subsite
+         //waitForHide Leave Subsite
+         //waitForShow EU Trading2; wait for subsite in list; #holderMySubsiteList
+         //click  EU Trading2; #holderMySubsiteList
+
+         //console.log('1', arg1);
+         //tH.logNow('clicking', arg1)
+         tH.resetDefaultAddNext()
+         tH.test.cb()
+   }  )
+
+end
+
+fxasync refresh_subsites
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+
+bookmark leaving page
+
+def gotopage
+    tH.setDefaultAddNext()
+    var pageName = arg2
+    var pageMenuLinkText = arg1
+    tH.data.maxTimesNext = 50;
+    tH.click(pageMenuLinkText , 'x42-nav-sidebar');
+  tH.nextTimeoutTime(60)
+    tH.waitForShow(pageName, 'did not switch to '+pageName+' page', '.x42-nav-body-container' )
+   tH.nextTimeoutTime(60)
+    tH.waitForShow('pt-table', 'pt table did not load')
+    tH.log('Navigated to', pageName);
+    tH.resetDefaultAddNext()
+end
+
+
+fx gotopage; Revenue; Revenue
+
+log changed to revenue page
+wait 2
+
+fx gotopage; External Revenue; External Revenue
+
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+endtest
+
+
+click Revenue; x42-nav-sidebar
+eval
+  tH.data.maxTimesNext = 120;
+end
+waitForShow Revenue; waiting for revenue page to load; .x42-nav-body-container
+waitForShow #dialogAddNewTab
+
+click External Revenue; x42-nav-sidebar
+log finished runnign refresh_subsites
+
+waitForShow Revenue; waiting for revenue page to load; .x42-nav-body-container
+waitForShow #dialogAddNewTab
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+endtest
+
+
+
+
+#############################
+endtest
+click button
+
+
+click Leave Subsite
+
+waitForHide Leave Subsite
+
+click Manage Subsites...
+
+waitForShow #dialogManageSubsites
+
+eval close all popups
+  //window.$scope.popups.hideAllDialogs()
+  //window.$subsitesScope.popups.hideAllDialogs()
+
+  var y = testHelper.findByContent('EU Trading2', $('#dialogManageSubsites') )
+  var tr = y.parents('tr')
+  var trashIcon = tr.find('.fa-trash')
+  console.clear();
+  console.log('trash',y,tr, trashIcon);
+  trashIcon.click()
+end
+
+waitForShow #confirmDialog
+
+#click Cancel; #confirmDialog //ignore
+click OK; #confirmDialog //ignore
+
+
+waitForShow #dialogManageSubsites
+click Close; #dialogManageSubsites
+
+wait 1
+endtest
+click button
+clickJ .redTest //click red button
+clickText jump
+clickText test 2
+log test
+set #txtArea set the text
+set #txtArea; set the text ~use semi colon to delinate args
+set #txtArea |set the text ~use pika to delinate args
+alert new alert
+logNow sdfsdf
+logNext sdfsdfsdf
+log sdfsdfsdfsdfsdf
+wait 2 //wait 2 seoncds
+/*
+block comment
+*/
+--comment
+~some message alert //alias for log
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/wf1test.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/wf1test.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/wf1test.js.txt	(revision )
@@ -0,0 +1,125 @@
+#test for basic csv
+require "Win32API"
+Beep = Win32API.new("kernel32", "Beep", ["I", "I"], 'v')
+
+#click Cancelx; #confirmDialog
+#endtest
+
+eval close all popups
+  window.$scope.popups.hideAllDialogs()
+ window.$scope.popups.data.openDialogs = []
+ window.$scope.popups.data.modalCount = 0
+  //window.$subsitesScope.popups.hideAllDialogs()
+end
+def beep freq, duration
+    #puts 'beep', freq, 'd', duration
+  Beep.call(freq, duration)
+end
+beep 600, 400
+eval - showdropdown
+var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+x42NavBarNav_DropDown.addClass('open')
+endeval
+eval - showdropdown
+var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+x42NavBarNav_DropDown.addClass('open')
+endeval
+
+fx showdropdown
+
+waitForShow .x42-nav-header-submenu
+
+waitForShow Create New Subsite
+
+#create new subsite
+
+click Create New Subsite
+waitForShow #dialogManageSubsite
+set .txtManageSubsiteName; EU Trading2
+#set [value="otherPeople"]; selected
+eval
+ $('[value="otherPeople"]').prop('checked', true);
+  $('[value="otherPeople"]').click();
+end
+
+set .txtSearchName2; Ji hye
+pressEnter .txtSearchName2
+set .txtSearchName2; Gergo
+pressEnter .txtSearchName2
+set .txtSearchName2; Fermin
+pressEnter .txtSearchName2
+waitForShow ferminr
+
+
+click OK; #dialogManageSubsite //ignore
+waitForShow EU Trading2
+
+waitForShow #dialogAddNewTab
+click #dialogAddNewTab
+
+waitForShow #dialogCloneTabFrom
+#waitForShow Function
+#click Function; #dialogCloneTabFrom
+
+eval
+  var selectList = $('#dialogCloneTabFrom').find('select')
+  var first = selectList.find('option').first()
+  first.prop('selected', true);
+end
+
+click OK; #dialogCloneTabFrom
+
+#############################
+endtest
+click button
+
+
+click Leave Subsite
+
+waitForHide Leave Subsite
+
+click Manage Subsites...
+
+waitForShow #dialogManageSubsites
+
+eval close all popups
+  //window.$scope.popups.hideAllDialogs()
+  //window.$subsitesScope.popups.hideAllDialogs()
+
+  var y = testHelper.findByContent('EU Trading2', $('#dialogManageSubsites') )
+  var tr = y.parents('tr')
+  var trashIcon = tr.find('.fa-trash')
+  console.clear();
+  console.log('trash',y,tr, trashIcon);
+  trashIcon.click()
+end
+
+waitForShow #confirmDialog
+
+#click Cancel; #confirmDialog //ignore
+click OK; #confirmDialog //ignore
+
+
+waitForShow #dialogManageSubsites
+click Close; #dialogManageSubsites
+
+wait 1
+endtest
+click button
+clickJ .redTest //click red button
+clickText jump
+clickText test 2
+log test
+set #txtArea set the text
+set #txtArea; set the text ~use semi colon to delinate args
+set #txtArea |set the text ~use pika to delinate args
+alert new alert
+logNow sdfsdf
+logNext sdfsdfsdf
+log sdfsdfsdfsdfsdf
+wait 2 //wait 2 seoncds
+/*
+block comment
+*/
+--comment
+~some message alert //alias for log
\ No newline at end of file
Index: mp/testingFramework2/TestCSVConvertor.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/TestCSVConvertor.js	(revision )
+++ mp/testingFramework2/TestCSVConvertor.js	(revision )
@@ -0,0 +1,593 @@
+if ( window.isNode != false ) {
+    var sh = require('shelpers').shelpers;
+    var shelpers = require('shelpers');
+}
+
+function TestCSVConvertor() {
+    var p = TestCSVConvertor.prototype;
+    p = this;
+    var self = this;
+
+    self.settings = {};
+    self.data = {}
+
+
+
+    p.init = function init(config) {
+        self.settings = sh.dv(config, {});
+        config = self.settings;
+
+        self.method();
+    }
+
+    p.method = function method(config) {
+    }
+    p.processTestCSV = function processTestCSV(contents) {
+
+        var h = {};
+        var config = {}
+        config.ignore = ['data: WARNING: Skip: ',
+            'WARNING: Skipping FS',
+            'data: ERROR: Can',
+            'child process '
+        ]
+        config.ignoreComments = true;
+        config.fxProc = function parseCmd(item, i, len){
+
+
+
+            i  += 1
+
+            var rawLine = item;
+            var line = item.trim();
+
+
+            if ( h.inMultiLineComment ) {
+
+                if ( line.includes('*/') ) {
+                    var ousideOfComment = line.split('*/')[1]
+                    h.inMultiLineComment = false;
+                    line = ousideOfComment; //overkill
+                } else {
+                    //still indie multi line comment mode
+                    return;
+                }
+            }
+
+            if ( h.endTest == true ) {
+                return;
+            }
+
+            if ( line == 'endtest') {
+                h.endTest = true;
+                console.log('end test early', 'line', i)
+                return;
+            }
+            if ( line.startsWith('#')) {
+                return;
+            }
+            if ( line.startsWith('--')) {
+                return;
+            }
+            if ( line == '' ) {
+                return;
+            }
+
+            var showItemInput = false;
+            if ( showItemInput )
+                console.error(i, item)
+            item = item.trim();
+            var words = item.split(' ');
+            words = words.filter(function removeEmpty(e) { return e.trim().length > 0 })
+
+
+
+
+            var firstWord = words[0];
+            firstWord = firstWord.trim();
+            var lineContent = words.slice(1).join(' ').trim();
+
+            function recreateWords() {
+
+            }
+
+            sh.t = '\t'
+            //console.error(sh.t, i, firstWord=='endeval')
+            var valid = false;
+
+            var item = {};
+
+
+
+            var comment = null;
+            /*if ( line.includes('#') ) {
+             var split = line.split('#')
+             line = split[0]
+             comment = split[1]
+             }*/ //jquery ids
+            if ( line.startsWith('#') ) {
+                return;
+            }
+            if ( line.startsWith('~')  == false
+                && line.includes('~') ) {
+                var split = line.split('~')
+                line = split[0]
+                comment = split[1]
+            }
+
+            if ( line.includes('//') ) {
+                var split = line.split('//')
+                line = split[0]
+                comment = split[1]
+            }
+            line = line.trim()
+
+
+            //mulite line comments
+            //comments
+            if ( line.includes('/*')) {
+                h.inMultiLineComment = true;
+                var afterComment = line.split('/*')[1];
+                var ousideOfComment = afterComment.split('*/')[1]
+                if ( afterComment.includes('*/')) {
+                    h.inMultiLineComment = false;
+                    line = ousideOfComment; //overkill
+                } else {
+                    //in comment mode
+                    return;
+                }
+            }
+            /*  if ( h.inMultiLineComment ) {
+
+             if ( line.includes('*!/') ) {
+             var ousideOfComment = line.split('*!/')[1]
+             h.inMultiLineComment = false;
+             line = ousideOfComment; //overkill
+             } else {
+             //still indie multi line comment mode
+             return;
+             }
+             }
+             */
+
+            //convert fx.method(args) to fx method (args)
+            if ( rawLine.startsWith('fx.') &&
+                line.includes('(') &&
+                line.includes(')') ) {
+
+                line = 'fx '+line.slice(3); //convert
+                console.log('line', line)
+                //asdf.g
+                firstWord = 'fx';
+                recreateWords();
+            }
+/*
+            //silly ...  we will not sepreate ''
+
+            if ( rawLine.startsWith('tH.fx') &&
+                line.includes('(') &&
+                line.includes(')') ) {
+
+                line = 'fx '+line.slice(5); //convert
+                console.log('line', line)
+                //asdf.g
+                firstWord = 'fx';
+                recreateWords();
+            }
+*/
+
+
+            var itemCopyAtEnd = {};
+
+            var words = line.split(' ');
+            words = words.filter(function removeEmpty(e) { return e.trim().length > 0 })
+            var args = words.slice(1)
+            var userDenotedArgs = false;
+
+            if ( line.includes('; ')) {
+                var wordsC = args.join(' ')
+                if ( wordsC ) {
+                    console.log('wordsC', wordsC, wordsC.split('; '))
+                }
+                words = wordsC.split('; ')
+                args = words;
+                userDenotedArgs = true;
+            }
+
+            if ( line.includes(' |')) {
+                var wordsC = args.join(' ')
+                if ( wordsC ) {
+                    console.log('wordsC', wordsC, wordsC.split(' |'))
+                }
+                words = wordsC.split(' |')
+                args = words;
+                userDenotedArgs = true;
+            }
+
+
+            itemCopyAtEnd.args = args;
+            if ( comment ) {
+                itemCopyAtEnd.comment = comment;
+            }
+
+            item.index = len+1
+            item.line = i
+            item.fx = i
+            item.args = i
+            item.orig = i
+            item.comment = i
+            item.lines = [];
+
+            var validCmds = [
+                'click',
+                'waitForShow',
+                'waitForHide',
+                'verifyHidden',
+                'pressEnter',
+                'moreThanX',
+                'clickOne','setItem','makeGreen',
+                'scrollTo','verifyExists',
+                'fxasync',
+                'fx', 'bookmark'
+            ];
+            if ( validCmds.includes(firstWord)) {
+                valid  = true;
+                item.fx = firstWord
+                itemCopyAtEnd.args = [args.join(' ')]
+                if ( userDenotedArgs ) { //do not combine args
+                    //debugger
+                    itemCopyAtEnd.args = args;
+                }
+
+
+            }
+
+
+            if ( firstWord == 'fx') {
+
+                //hanlde case where user has function fx fx1 a; b; c
+                //should fx fx1; a; b; c, be gracefulw ith user
+                var argsTest = itemCopyAtEnd.args
+                var firstArg = argsTest[0].trim()
+                if ( firstArg.includes(' ')) {
+                    //debugger
+                    var firstArgSplit =  firstArg.split(' ')
+                    argsTest.shift(); //remove first split item
+                    //firstArgSplit.shift(); //remove fx name
+                    var argsFixed = firstArgSplit.concat(argsTest)
+                    itemCopyAtEnd.args = argsFixed;
+
+                };
+                if ( firstArg.includes('(') && firstArg.includes(')')) {
+
+                    if ( firstArg.endsWith(';') ) {
+                        firstArg = firstArg.slice(0,-1)
+                    }
+                    if ( firstArg.endsWith(')')) {
+                        //asdf.g
+                        var cfg = {}
+                        var fxName = firstArg.split('(')[0]
+                        cfg.defName = fxName;
+                        cfg.eval = firstArg;
+
+
+
+                        try {
+                            var evalToGet_getArgsStr =
+                                ['function ' + fxName + '() {',
+                                    'var args = uiUtils.args(arguments);',
+                                    // ' debugger;',
+                                    'return args',
+                                    '}',
+                                    cfg.eval,
+                                ].join('\n')
+                        }
+                        catch (e ) {
+                            console.error('arsing error on fx input')
+                            console.error(e)
+                            //can't process fx eval
+                        }
+                        cfg.args = eval(evalToGet_getArgsStr)
+
+                        //debugger
+                        itemCopyAtEnd.args = cfg;
+
+                    }else {
+                        //strange input
+                    }
+
+                }
+
+            }
+
+            if ( firstWord == 'if' ) {
+                valid = true;
+                item.fx = 'if'
+                //  console.clear();
+                console.debug('line', lineContent)
+                itemCopyAtEnd.args = args;
+
+                if ( lineContent.startsWith('{') &&
+                    lineContent.endsWith('}') ) {
+                    //var cfg = eval(lineContent)
+                    eval('var cfg =' +lineContent)
+                    console.log('cfg', cfg)
+                    // debugger
+                    itemCopyAtEnd.args = [cfg];
+                }
+
+            }
+
+            /*
+             if ( firstWord == 'click') {
+             valid  = true;
+             item.fx = 'click'
+             itemCopyAtEnd.args = [args.join(' ')]
+             }*/
+            if ( firstWord == 'clickJ') {
+                valid  = true;
+                item.fx = 'clickJ'
+            }
+            if ( firstWord == 'clickText') {
+                valid  = true;
+                item.fx = 'clickText'
+            }
+            if ( firstWord == 'log') {
+                valid  = true;
+                item.fx = 'log'
+            }
+            if ( firstWord == 'status') {
+                valid  = true;
+                item.fx = 'msgStatus'
+            }
+
+            if ( firstWord == 'alert') {
+                valid  = true;
+                item.fx = 'alert'
+            }
+            if ( firstWord == 'set') {
+                valid  = true;
+                item.fx = 'set'
+            }
+
+            if ( firstWord == 'wait') {
+                valid  = true;
+                item.fx = 'wait'
+            }
+            if ( firstWord.slice(0,1) == '~') {
+                valid  = true;
+                item.fx = 'log'
+                item.args = [line.slice(1)]
+            }
+
+            var isFunctionDef = false;
+            if ( rawLine.startsWith('function')) {
+                h.evalAltFxMode = true;
+                isFunctionDef = true;
+                var lastWord = words.slice(-1)
+                if ( lastWord == '{') {
+                    words.pop();
+                }
+                console.log('wordsfx', words);
+            }
+
+            if ( firstWord == 'eval' || firstWord == 'def' || isFunctionDef ) {
+                //debugger
+                if ( h.evalMode == true ) {
+                    console.error('line', rawLine)
+                    throw new Error('double eval mode')
+                }
+                valid  = true;
+                item.fx = 'evalFx'
+                h.evalMode = true;
+                h.hold = item;
+                var firstLine = true
+                item.lines = [];
+                // console.log('words', words.slice(-1))
+                itemCopyAtEnd.args=[words.slice(-1)]
+                var cfg = {};
+                //hanlde case where user has function fx fx1 a; b; c
+                //should fx fx1; a; b; c, be gracefulw ith user
+                var argsTest = [words.slice(-1)]
+                cfg.defName = words.slice(-1) //last word
+
+                var lineCombined = words.join(' ')
+                //lineCombined.split('#')[0]
+
+                console.log('parse def', cfg.defName, argsTest, words)
+
+
+                if ( argsTest.includes(' ')) {
+                    asdf.g
+                }
+                var runDefOnInit = false;
+                if ( firstWord != 'def' ) { //run if not def
+                    itemCopyAtEnd.args.push(true)
+                    runDefOnInit
+                }
+
+                // var argsTest = itemCopyAtEnd.args
+                var firstArg = words[1]
+
+                //support spaces
+                //["def", "deleteTab(tabName_,", "userTabType)"]
+                var isFxDef = words[0] == 'def';
+
+                if ( words[0] == 'function') {
+                    isFxDef = true;
+                }
+
+                if ( isFxDef && words.length > 2) {
+                    console.warn('space in args');
+                    var lastWord = words.slice(-1)[0]
+                    if ( lastWord.endsWith(')') ) {
+                        // debugger
+                        firstArg = words.slice(1).join('')
+                    }
+
+                }
+
+                if ( firstArg.includes('(') && firstArg.endsWith(')')) {
+
+                    //ensure indexes in porpe rpalce ...) (
+                    if ( firstArg.endsWith(')')) {
+                        //asdf.g
+                        var cfg = {}
+                        cfg.runDefOnInit = runDefOnInit;
+                        var fxName = firstArg.split('(')[0]
+                        cfg.defName = fxName;
+                        cfg.fxSignature = firstArg;
+                        itemCopyAtEnd.args = cfg;
+                        // debugger
+                    }else {
+                        //strange input
+                    }
+
+                }
+                //return;
+            }
+
+            if ( firstWord == 'endeval' || firstWord == 'end' ) {
+                if ( h.evalMode == false ) {
+                    throw new Error('was not in eval mode')
+                }
+                valid  = false;
+                //item.fx = 'set'
+                item = h.hold;
+                h.evalMode = false;
+            }
+
+            if ( rawLine.startsWith('}') && h.evalAltFxMode === true ) {
+                if ( h.evalMode == false ) {
+                    throw new Error('was not in eval mode')
+                }
+                //asdf.g
+                h.evalAltFxMode = false;
+                valid  = false;
+                //item.fx = 'set'
+
+
+                //line += '/*boo*/' + '}'
+                // var lineX =  '}; '+' debugger; ' + '/*boo*/' + ''
+                // h.hold.lines.push(lineX)
+                item = h.hold;
+                h.evalMode = false;
+
+            }
+
+
+            if ( h.evalMode && firstLine != true) {
+                h.hold.lines.push(line)
+                //h.hold.lines.push('5')
+                return;
+            }
+
+
+            if ( valid == false ) {
+                return null
+            }
+
+            sh.copyProps(itemCopyAtEnd, item)
+
+
+            item.orig = line;
+
+            return item;
+
+        }
+        var lines = sh.each.lines(contents, config);
+        self.lines = lines;
+
+        //debugger
+        self.proc('lines', lines)
+        //console.log(lines)
+
+        sh.printCol(lines)
+
+        //  debugger;
+        return lines;
+
+    }
+    p.loadScript = function loadScript(file) {
+        var content = sh.readFile(file)
+        console.log('t', content)
+        //get lines
+        //get function
+        //create objet
+        var items =  p.processTestCSV(content)
+        sh.callIfDefined(fxItems, items)
+    }
+
+    p.loadScript2 = function loadScript2(file, fxItems, fxFail) {
+        uiUtils.getUrl(file, function onGotContnet(content) {
+
+            //console.log('content', content)
+            //return;
+            var items =  p.processTestCSV(content)
+            sh.callIfDefined(fxItems, items)
+        }, null, function onFail() {
+            console.error('failed to load')
+            if ( fxFail ) fxFail('failed')
+        })
+
+        return;
+        var content = sh.readFile(file)
+        console.log('t', content)
+        //get lines
+        //get function
+        //create objet
+
+    }
+
+    p.test = function test(config) {
+    }
+
+
+    function defineUtils() {
+        var utils = {};
+        p.utils = utils;
+        utils.getFilePath = function getFilePath(file) {
+            var file = self.settings.dir+'/'+ file;
+            return file;
+        }
+
+        p.proc = function debugLogger() {
+            if ( self.silent == true) {
+                return;
+            }
+            sh.sLog(arguments);
+        };
+    }
+    defineUtils()
+}
+
+if ( window.isNode != false ) {
+    exports.TestCSVConvertor = TestCSVConvertor;
+
+    if (module.parent == null) {
+        var instance = new TestCSVConvertor();
+        var config = {};
+        instance.init(config)
+        instance.loadScript('scripts/test.txt')
+        instance.test();
+    }
+} else {
+    function testConvertoer() {
+        //return
+        var instance = new TestCSVConvertor();
+        var config = {};
+        instance.init(config)
+
+        var currentScript = document.currentScript //just in case user does not set pre-amble
+        if ( currentScript ) {
+            urlPremable = currentScript.src.split('/').slice(0,-1).join('/')+'/';
+            console.info('guessed pre-amble to be', window.preamble)
+        }
+
+        instance.loadScript2(urlPremable+'csvScripts/test.txt')
+        instance.test();
+    }
+    testConvertoer();
+}
+
+
Index: mp/testingFramework2/jquery.js.ignore_scan
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/jquery.js.ignore_scan	(revision )
+++ mp/testingFramework2/jquery.js.ignore_scan	(revision )
@@ -0,0 +1,8842 @@
+/*!
+ * jQuery JavaScript Library v2.0.2
+ * http://jquery.com/
+ *
+ * Includes Sizzle.js
+ * http://sizzlejs.com/
+ *
+ * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
+ * Released under the MIT license
+ * http://jquery.org/license
+ *
+ * Date: 2013-05-30T21:25Z
+ */
+(function( window, undefined ) {
+
+// Can't do this because several apps including ASP.NET trace
+// the stack via arguments.caller.callee and Firefox dies if
+// you try to trace through "use strict" call chains. (#13335)
+// Support: Firefox 18+
+//"use strict";
+var
+	// A central reference to the root jQuery(document)
+	rootjQuery,
+
+	// The deferred used on DOM ready
+	readyList,
+
+	// Support: IE9
+	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
+	core_strundefined = typeof undefined,
+
+	// Use the correct document accordingly with window argument (sandbox)
+	location = window.location,
+	document = window.document,
+	docElem = document.documentElement,
+
+	// Map over jQuery in case of overwrite
+	_jQuery = window.jQuery,
+
+	// Map over the $ in case of overwrite
+	_$ = window.$,
+
+	// [[Class]] -> type pairs
+	class2type = {},
+
+	// List of deleted data cache ids, so we can reuse them
+	core_deletedIds = [],
+
+	core_version = "2.0.2",
+
+	// Save a reference to some core methods
+	core_concat = core_deletedIds.concat,
+	core_push = core_deletedIds.push,
+	core_slice = core_deletedIds.slice,
+	core_indexOf = core_deletedIds.indexOf,
+	core_toString = class2type.toString,
+	core_hasOwn = class2type.hasOwnProperty,
+	core_trim = core_version.trim,
+
+	// Define a local copy of jQuery
+	jQuery = function( selector, context ) {
+		// The jQuery object is actually just the init constructor 'enhanced'
+		return new jQuery.fn.init( selector, context, rootjQuery );
+	},
+
+	// Used for matching numbers
+	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
+
+	// Used for splitting on whitespace
+	core_rnotwhite = /\S+/g,
+
+	// A simple way to check for HTML strings
+	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
+	// Strict HTML recognition (#11290: must start with <)
+	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
+
+	// Match a standalone tag
+	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
+
+	// Matches dashed string for camelizing
+	rmsPrefix = /^-ms-/,
+	rdashAlpha = /-([\da-z])/gi,
+
+	// Used by jQuery.camelCase as callback to replace()
+	fcamelCase = function( all, letter ) {
+		return letter.toUpperCase();
+	},
+
+	// The ready event handler and self cleanup method
+	completed = function() {
+		document.removeEventListener( "DOMContentLoaded", completed, false );
+		window.removeEventListener( "load", completed, false );
+		jQuery.ready();
+	};
+
+jQuery.fn = jQuery.prototype = {
+	// The current version of jQuery being used
+	jquery: core_version,
+
+	constructor: jQuery,
+	init: function( selector, context, rootjQuery ) {
+		var match, elem;
+
+		// HANDLE: $(""), $(null), $(undefined), $(false)
+		if ( !selector ) {
+			return this;
+		}
+
+		// Handle HTML strings
+		if ( typeof selector === "string" ) {
+			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
+				// Assume that strings that start and end with <> are HTML and skip the regex check
+				match = [ null, selector, null ];
+
+			} else {
+				match = rquickExpr.exec( selector );
+			}
+
+			// Match html or make sure no context is specified for #id
+			if ( match && (match[1] || !context) ) {
+
+				// HANDLE: $(html) -> $(array)
+				if ( match[1] ) {
+					context = context instanceof jQuery ? context[0] : context;
+
+					// scripts is true for back-compat
+					jQuery.merge( this, jQuery.parseHTML(
+						match[1],
+						context && context.nodeType ? context.ownerDocument || context : document,
+						true
+					) );
+
+					// HANDLE: $(html, props)
+					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
+						for ( match in context ) {
+							// Properties of context are called as methods if possible
+							if ( jQuery.isFunction( this[ match ] ) ) {
+								this[ match ]( context[ match ] );
+
+							// ...and otherwise set as attributes
+							} else {
+								this.attr( match, context[ match ] );
+							}
+						}
+					}
+
+					return this;
+
+				// HANDLE: $(#id)
+				} else {
+					elem = document.getElementById( match[2] );
+
+					// Check parentNode to catch when Blackberry 4.6 returns
+					// nodes that are no longer in the document #6963
+					if ( elem && elem.parentNode ) {
+						// Inject the element directly into the jQuery object
+						this.length = 1;
+						this[0] = elem;
+					}
+
+					this.context = document;
+					this.selector = selector;
+					return this;
+				}
+
+			// HANDLE: $(expr, $(...))
+			} else if ( !context || context.jquery ) {
+				return ( context || rootjQuery ).find( selector );
+
+			// HANDLE: $(expr, context)
+			// (which is just equivalent to: $(context).find(expr)
+			} else {
+				return this.constructor( context ).find( selector );
+			}
+
+		// HANDLE: $(DOMElement)
+		} else if ( selector.nodeType ) {
+			this.context = this[0] = selector;
+			this.length = 1;
+			return this;
+
+		// HANDLE: $(function)
+		// Shortcut for document ready
+		} else if ( jQuery.isFunction( selector ) ) {
+			return rootjQuery.ready( selector );
+		}
+
+		if ( selector.selector !== undefined ) {
+			this.selector = selector.selector;
+			this.context = selector.context;
+		}
+
+		return jQuery.makeArray( selector, this );
+	},
+
+	// Start with an empty selector
+	selector: "",
+
+	// The default length of a jQuery object is 0
+	length: 0,
+
+	toArray: function() {
+		return core_slice.call( this );
+	},
+
+	// Get the Nth element in the matched element set OR
+	// Get the whole matched element set as a clean array
+	get: function( num ) {
+		return num == null ?
+
+			// Return a 'clean' array
+			this.toArray() :
+
+			// Return just the object
+			( num < 0 ? this[ this.length + num ] : this[ num ] );
+	},
+
+	// Take an array of elements and push it onto the stack
+	// (returning the new matched element set)
+	pushStack: function( elems ) {
+
+		// Build a new jQuery matched element set
+		var ret = jQuery.merge( this.constructor(), elems );
+
+		// Add the old object onto the stack (as a reference)
+		ret.prevObject = this;
+		ret.context = this.context;
+
+		// Return the newly-formed element set
+		return ret;
+	},
+
+	// Execute a callback for every element in the matched set.
+	// (You can seed the arguments with an array of args, but this is
+	// only used internally.)
+	each: function( callback, args ) {
+		return jQuery.each( this, callback, args );
+	},
+
+	ready: function( fn ) {
+		// Add the callback
+		jQuery.ready.promise().done( fn );
+
+		return this;
+	},
+
+	slice: function() {
+		return this.pushStack( core_slice.apply( this, arguments ) );
+	},
+
+	first: function() {
+		return this.eq( 0 );
+	},
+
+	last: function() {
+		return this.eq( -1 );
+	},
+
+	eq: function( i ) {
+		var len = this.length,
+			j = +i + ( i < 0 ? len : 0 );
+		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
+	},
+
+	map: function( callback ) {
+		return this.pushStack( jQuery.map(this, function( elem, i ) {
+			return callback.call( elem, i, elem );
+		}));
+	},
+
+	end: function() {
+		return this.prevObject || this.constructor(null);
+	},
+
+	// For internal use only.
+	// Behaves like an Array's method, not like a jQuery method.
+	push: core_push,
+	sort: [].sort,
+	splice: [].splice
+};
+
+// Give the init function the jQuery prototype for later instantiation
+jQuery.fn.init.prototype = jQuery.fn;
+
+jQuery.extend = jQuery.fn.extend = function() {
+	var options, name, src, copy, copyIsArray, clone,
+		target = arguments[0] || {},
+		i = 1,
+		length = arguments.length,
+		deep = false;
+
+	// Handle a deep copy situation
+	if ( typeof target === "boolean" ) {
+		deep = target;
+		target = arguments[1] || {};
+		// skip the boolean and the target
+		i = 2;
+	}
+
+	// Handle case when target is a string or something (possible in deep copy)
+	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
+		target = {};
+	}
+
+	// extend jQuery itself if only one argument is passed
+	if ( length === i ) {
+		target = this;
+		--i;
+	}
+
+	for ( ; i < length; i++ ) {
+		// Only deal with non-null/undefined values
+		if ( (options = arguments[ i ]) != null ) {
+			// Extend the base object
+			for ( name in options ) {
+				src = target[ name ];
+				copy = options[ name ];
+
+				// Prevent never-ending loop
+				if ( target === copy ) {
+					continue;
+				}
+
+				// Recurse if we're merging plain objects or arrays
+				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
+					if ( copyIsArray ) {
+						copyIsArray = false;
+						clone = src && jQuery.isArray(src) ? src : [];
+
+					} else {
+						clone = src && jQuery.isPlainObject(src) ? src : {};
+					}
+
+					// Never move original objects, clone them
+					target[ name ] = jQuery.extend( deep, clone, copy );
+
+				// Don't bring in undefined values
+				} else if ( copy !== undefined ) {
+					target[ name ] = copy;
+				}
+			}
+		}
+	}
+
+	// Return the modified object
+	return target;
+};
+
+jQuery.extend({
+	// Unique for each copy of jQuery on the page
+	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),
+
+	noConflict: function( deep ) {
+		if ( window.$ === jQuery ) {
+			window.$ = _$;
+		}
+
+		if ( deep && window.jQuery === jQuery ) {
+			window.jQuery = _jQuery;
+		}
+
+		return jQuery;
+	},
+
+	// Is the DOM ready to be used? Set to true once it occurs.
+	isReady: false,
+
+	// A counter to track how many items to wait for before
+	// the ready event fires. See #6781
+	readyWait: 1,
+
+	// Hold (or release) the ready event
+	holdReady: function( hold ) {
+		if ( hold ) {
+			jQuery.readyWait++;
+		} else {
+			jQuery.ready( true );
+		}
+	},
+
+	// Handle when the DOM is ready
+	ready: function( wait ) {
+
+		// Abort if there are pending holds or we're already ready
+		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
+			return;
+		}
+
+		// Remember that the DOM is ready
+		jQuery.isReady = true;
+
+		// If a normal DOM Ready event fired, decrement, and wait if need be
+		if ( wait !== true && --jQuery.readyWait > 0 ) {
+			return;
+		}
+
+		// If there are functions bound, to execute
+		readyList.resolveWith( document, [ jQuery ] );
+
+		// Trigger any bound ready events
+		if ( jQuery.fn.trigger ) {
+			jQuery( document ).trigger("ready").off("ready");
+		}
+	},
+
+	// See test/unit/core.js for details concerning isFunction.
+	// Since version 1.3, DOM methods and functions like alert
+	// aren't supported. They return false on IE (#2968).
+	isFunction: function( obj ) {
+		return jQuery.type(obj) === "function";
+	},
+
+	isArray: Array.isArray,
+
+	isWindow: function( obj ) {
+		return obj != null && obj === obj.window;
+	},
+
+	isNumeric: function( obj ) {
+		return !isNaN( parseFloat(obj) ) && isFinite( obj );
+	},
+
+	type: function( obj ) {
+		if ( obj == null ) {
+			return String( obj );
+		}
+		// Support: Safari <= 5.1 (functionish RegExp)
+		return typeof obj === "object" || typeof obj === "function" ?
+			class2type[ core_toString.call(obj) ] || "object" :
+			typeof obj;
+	},
+
+	isPlainObject: function( obj ) {
+		// Not plain objects:
+		// - Any object or value whose internal [[Class]] property is not "[object Object]"
+		// - DOM nodes
+		// - window
+		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
+			return false;
+		}
+
+		// Support: Firefox <20
+		// The try/catch suppresses exceptions thrown when attempting to access
+		// the "constructor" property of certain host objects, ie. |window.location|
+		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
+		try {
+			if ( obj.constructor &&
+					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
+				return false;
+			}
+		} catch ( e ) {
+			return false;
+		}
+
+		// If the function hasn't returned already, we're confident that
+		// |obj| is a plain object, created by {} or constructed with new Object
+		return true;
+	},
+
+	isEmptyObject: function( obj ) {
+		var name;
+		for ( name in obj ) {
+			return false;
+		}
+		return true;
+	},
+
+	error: function( msg ) {
+		throw new Error( msg );
+	},
+
+	// data: string of html
+	// context (optional): If specified, the fragment will be created in this context, defaults to document
+	// keepScripts (optional): If true, will include scripts passed in the html string
+	parseHTML: function( data, context, keepScripts ) {
+		if ( !data || typeof data !== "string" ) {
+			return null;
+		}
+		if ( typeof context === "boolean" ) {
+			keepScripts = context;
+			context = false;
+		}
+		context = context || document;
+
+		var parsed = rsingleTag.exec( data ),
+			scripts = !keepScripts && [];
+
+		// Single tag
+		if ( parsed ) {
+			return [ context.createElement( parsed[1] ) ];
+		}
+
+		parsed = jQuery.buildFragment( [ data ], context, scripts );
+
+		if ( scripts ) {
+			jQuery( scripts ).remove();
+		}
+
+		return jQuery.merge( [], parsed.childNodes );
+	},
+
+	parseJSON: JSON.parse,
+
+	// Cross-browser xml parsing
+	parseXML: function( data ) {
+		var xml, tmp;
+		if ( !data || typeof data !== "string" ) {
+			return null;
+		}
+
+		// Support: IE9
+		try {
+			tmp = new DOMParser();
+			xml = tmp.parseFromString( data , "text/xml" );
+		} catch ( e ) {
+			xml = undefined;
+		}
+
+		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
+			jQuery.error( "Invalid XML: " + data );
+		}
+		return xml;
+	},
+
+	noop: function() {},
+
+	// Evaluates a script in a global context
+	globalEval: function( code ) {
+		var script,
+				indirect = eval;
+
+		code = jQuery.trim( code );
+
+		if ( code ) {
+			// If the code includes a valid, prologue position
+			// strict mode pragma, execute code by injecting a
+			// script tag into the document.
+			if ( code.indexOf("use strict") === 1 ) {
+				script = document.createElement("script");
+				script.text = code;
+				document.head.appendChild( script ).parentNode.removeChild( script );
+			} else {
+			// Otherwise, avoid the DOM node creation, insertion
+			// and removal by using an indirect global eval
+				indirect( code );
+			}
+		}
+	},
+
+	// Convert dashed to camelCase; used by the css and data modules
+	// Microsoft forgot to hump their vendor prefix (#9572)
+	camelCase: function( string ) {
+		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
+	},
+
+	nodeName: function( elem, name ) {
+		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
+	},
+
+	// args is for internal usage only
+	each: function( obj, callback, args ) {
+		var value,
+			i = 0,
+			length = obj.length,
+			isArray = isArraylike( obj );
+
+		if ( args ) {
+			if ( isArray ) {
+				for ( ; i < length; i++ ) {
+					value = callback.apply( obj[ i ], args );
+
+					if ( value === false ) {
+						break;
+					}
+				}
+			} else {
+				for ( i in obj ) {
+					value = callback.apply( obj[ i ], args );
+
+					if ( value === false ) {
+						break;
+					}
+				}
+			}
+
+		// A special, fast, case for the most common use of each
+		} else {
+			if ( isArray ) {
+				for ( ; i < length; i++ ) {
+					value = callback.call( obj[ i ], i, obj[ i ] );
+
+					if ( value === false ) {
+						break;
+					}
+				}
+			} else {
+				for ( i in obj ) {
+					value = callback.call( obj[ i ], i, obj[ i ] );
+
+					if ( value === false ) {
+						break;
+					}
+				}
+			}
+		}
+
+		return obj;
+	},
+
+	trim: function( text ) {
+		return text == null ? "" : core_trim.call( text );
+	},
+
+	// results is for internal usage only
+	makeArray: function( arr, results ) {
+		var ret = results || [];
+
+		if ( arr != null ) {
+			if ( isArraylike( Object(arr) ) ) {
+				jQuery.merge( ret,
+					typeof arr === "string" ?
+					[ arr ] : arr
+				);
+			} else {
+				core_push.call( ret, arr );
+			}
+		}
+
+		return ret;
+	},
+
+	inArray: function( elem, arr, i ) {
+		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
+	},
+
+	merge: function( first, second ) {
+		var l = second.length,
+			i = first.length,
+			j = 0;
+
+		if ( typeof l === "number" ) {
+			for ( ; j < l; j++ ) {
+				first[ i++ ] = second[ j ];
+			}
+		} else {
+			while ( second[j] !== undefined ) {
+				first[ i++ ] = second[ j++ ];
+			}
+		}
+
+		first.length = i;
+
+		return first;
+	},
+
+	grep: function( elems, callback, inv ) {
+		var retVal,
+			ret = [],
+			i = 0,
+			length = elems.length;
+		inv = !!inv;
+
+		// Go through the array, only saving the items
+		// that pass the validator function
+		for ( ; i < length; i++ ) {
+			retVal = !!callback( elems[ i ], i );
+			if ( inv !== retVal ) {
+				ret.push( elems[ i ] );
+			}
+		}
+
+		return ret;
+	},
+
+	// arg is for internal usage only
+	map: function( elems, callback, arg ) {
+		var value,
+			i = 0,
+			length = elems.length,
+			isArray = isArraylike( elems ),
+			ret = [];
+
+		// Go through the array, translating each of the items to their
+		if ( isArray ) {
+			for ( ; i < length; i++ ) {
+				value = callback( elems[ i ], i, arg );
+
+				if ( value != null ) {
+					ret[ ret.length ] = value;
+				}
+			}
+
+		// Go through every key on the object,
+		} else {
+			for ( i in elems ) {
+				value = callback( elems[ i ], i, arg );
+
+				if ( value != null ) {
+					ret[ ret.length ] = value;
+				}
+			}
+		}
+
+		// Flatten any nested arrays
+		return core_concat.apply( [], ret );
+	},
+
+	// A global GUID counter for objects
+	guid: 1,
+
+	// Bind a function to a context, optionally partially applying any
+	// arguments.
+	proxy: function( fn, context ) {
+		var tmp, args, proxy;
+
+		if ( typeof context === "string" ) {
+			tmp = fn[ context ];
+			context = fn;
+			fn = tmp;
+		}
+
+		// Quick check to determine if target is callable, in the spec
+		// this throws a TypeError, but we will just return undefined.
+		if ( !jQuery.isFunction( fn ) ) {
+			return undefined;
+		}
+
+		// Simulated bind
+		args = core_slice.call( arguments, 2 );
+		proxy = function() {
+			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
+		};
+
+		// Set the guid of unique handler to the same of original handler, so it can be removed
+		proxy.guid = fn.guid = fn.guid || jQuery.guid++;
+
+		return proxy;
+	},
+
+	// Multifunctional method to get and set values of a collection
+	// The value/s can optionally be executed if it's a function
+	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
+		var i = 0,
+			length = elems.length,
+			bulk = key == null;
+
+		// Sets many values
+		if ( jQuery.type( key ) === "object" ) {
+			chainable = true;
+			for ( i in key ) {
+				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
+			}
+
+		// Sets one value
+		} else if ( value !== undefined ) {
+			chainable = true;
+
+			if ( !jQuery.isFunction( value ) ) {
+				raw = true;
+			}
+
+			if ( bulk ) {
+				// Bulk operations run against the entire set
+				if ( raw ) {
+					fn.call( elems, value );
+					fn = null;
+
+				// ...except when executing function values
+				} else {
+					bulk = fn;
+					fn = function( elem, key, value ) {
+						return bulk.call( jQuery( elem ), value );
+					};
+				}
+			}
+
+			if ( fn ) {
+				for ( ; i < length; i++ ) {
+					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
+				}
+			}
+		}
+
+		return chainable ?
+			elems :
+
+			// Gets
+			bulk ?
+				fn.call( elems ) :
+				length ? fn( elems[0], key ) : emptyGet;
+	},
+
+	now: Date.now,
+
+	// A method for quickly swapping in/out CSS properties to get correct calculations.
+	// Note: this method belongs to the css module but it's needed here for the support module.
+	// If support gets modularized, this method should be moved back to the css module.
+	swap: function( elem, options, callback, args ) {
+		var ret, name,
+			old = {};
+
+		// Remember the old values, and insert the new ones
+		for ( name in options ) {
+			old[ name ] = elem.style[ name ];
+			elem.style[ name ] = options[ name ];
+		}
+
+		ret = callback.apply( elem, args || [] );
+
+		// Revert the old values
+		for ( name in options ) {
+			elem.style[ name ] = old[ name ];
+		}
+
+		return ret;
+	}
+});
+
+jQuery.ready.promise = function( obj ) {
+	if ( !readyList ) {
+
+		readyList = jQuery.Deferred();
+
+		// Catch cases where $(document).ready() is called after the browser event has already occurred.
+		// we once tried to use readyState "interactive" here, but it caused issues like the one
+		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
+		if ( document.readyState === "complete" ) {
+			// Handle it asynchronously to allow scripts the opportunity to delay ready
+			setTimeout( jQuery.ready );
+
+		} else {
+
+			// Use the handy event callback
+			document.addEventListener( "DOMContentLoaded", completed, false );
+
+			// A fallback to window.onload, that will always work
+			window.addEventListener( "load", completed, false );
+		}
+	}
+	return readyList.promise( obj );
+};
+
+// Populate the class2type map
+jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
+	class2type[ "[object " + name + "]" ] = name.toLowerCase();
+});
+
+function isArraylike( obj ) {
+	var length = obj.length,
+		type = jQuery.type( obj );
+
+	if ( jQuery.isWindow( obj ) ) {
+		return false;
+	}
+
+	if ( obj.nodeType === 1 && length ) {
+		return true;
+	}
+
+	return type === "array" || type !== "function" &&
+		( length === 0 ||
+		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
+}
+
+// All jQuery objects should point back to these
+rootjQuery = jQuery(document);
+/*!
+ * Sizzle CSS Selector Engine v1.9.4-pre
+ * http://sizzlejs.com/
+ *
+ * Copyright 2013 jQuery Foundation, Inc. and other contributors
+ * Released under the MIT license
+ * http://jquery.org/license
+ *
+ * Date: 2013-05-27
+ */
+(function( window, undefined ) {
+
+var i,
+	support,
+	cachedruns,
+	Expr,
+	getText,
+	isXML,
+	compile,
+	outermostContext,
+	sortInput,
+
+	// Local document vars
+	setDocument,
+	document,
+	docElem,
+	documentIsHTML,
+	rbuggyQSA,
+	rbuggyMatches,
+	matches,
+	contains,
+
+	// Instance-specific data
+	expando = "sizzle" + -(new Date()),
+	preferredDoc = window.document,
+	dirruns = 0,
+	done = 0,
+	classCache = createCache(),
+	tokenCache = createCache(),
+	compilerCache = createCache(),
+	hasDuplicate = false,
+	sortOrder = function() { return 0; },
+
+	// General-purpose constants
+	strundefined = typeof undefined,
+	MAX_NEGATIVE = 1 << 31,
+
+	// Instance methods
+	hasOwn = ({}).hasOwnProperty,
+	arr = [],
+	pop = arr.pop,
+	push_native = arr.push,
+	push = arr.push,
+	slice = arr.slice,
+	// Use a stripped-down indexOf if we can't use a native one
+	indexOf = arr.indexOf || function( elem ) {
+		var i = 0,
+			len = this.length;
+		for ( ; i < len; i++ ) {
+			if ( this[i] === elem ) {
+				return i;
+			}
+		}
+		return -1;
+	},
+
+	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
+
+	// Regular expressions
+
+	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
+	whitespace = "[\\x20\\t\\r\\n\\f]",
+	// http://www.w3.org/TR/css3-syntax/#characters
+	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
+
+	// Loosely modeled on CSS identifier characters
+	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
+	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
+	identifier = characterEncoding.replace( "w", "w#" ),
+
+	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
+	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
+		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
+
+	// Prefer arguments quoted,
+	//   then not containing pseudos/brackets,
+	//   then attribute selectors/non-parenthetical expressions,
+	//   then anything else
+	// These preferences are here to reduce the number of selectors
+	//   needing tokenize in the PSEUDO preFilter
+	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",
+
+	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
+	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
+
+	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
+	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
+
+	rsibling = new RegExp( whitespace + "*[+~]" ),
+	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),
+
+	rpseudo = new RegExp( pseudos ),
+	ridentifier = new RegExp( "^" + identifier + "$" ),
+
+	matchExpr = {
+		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
+		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
+		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
+		"ATTR": new RegExp( "^" + attributes ),
+		"PSEUDO": new RegExp( "^" + pseudos ),
+		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
+			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
+			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
+		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
+		// For use in libraries implementing .is()
+		// We use this for POS matching in `select`
+		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
+			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
+	},
+
+	rnative = /^[^{]+\{\s*\[native \w/,
+
+	// Easily-parseable/retrievable ID or TAG or CLASS selectors
+	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
+
+	rinputs = /^(?:input|select|textarea|button)$/i,
+	rheader = /^h\d$/i,
+
+	rescape = /'|\\/g,
+
+	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
+	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
+	funescape = function( _, escaped, escapedWhitespace ) {
+		var high = "0x" + escaped - 0x10000;
+		// NaN means non-codepoint
+		// Support: Firefox
+		// Workaround erroneous numeric interpretation of +"0x"
+		return high !== high || escapedWhitespace ?
+			escaped :
+			// BMP codepoint
+			high < 0 ?
+				String.fromCharCode( high + 0x10000 ) :
+				// Supplemental Plane codepoint (surrogate pair)
+				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
+	};
+
+// Optimize for push.apply( _, NodeList )
+try {
+	push.apply(
+		(arr = slice.call( preferredDoc.childNodes )),
+		preferredDoc.childNodes
+	);
+	// Support: Android<4.0
+	// Detect silently failing push.apply
+	arr[ preferredDoc.childNodes.length ].nodeType;
+} catch ( e ) {
+	push = { apply: arr.length ?
+
+		// Leverage slice if possible
+		function( target, els ) {
+			push_native.apply( target, slice.call(els) );
+		} :
+
+		// Support: IE<9
+		// Otherwise append directly
+		function( target, els ) {
+			var j = target.length,
+				i = 0;
+			// Can't trust NodeList.length
+			while ( (target[j++] = els[i++]) ) {}
+			target.length = j - 1;
+		}
+	};
+}
+
+function Sizzle( selector, context, results, seed ) {
+	var match, elem, m, nodeType,
+		// QSA vars
+		i, groups, old, nid, newContext, newSelector;
+
+	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
+		setDocument( context );
+	}
+
+	context = context || document;
+	results = results || [];
+
+	if ( !selector || typeof selector !== "string" ) {
+		return results;
+	}
+
+	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
+		return [];
+	}
+
+	if ( documentIsHTML && !seed ) {
+
+		// Shortcuts
+		if ( (match = rquickExpr.exec( selector )) ) {
+			// Speed-up: Sizzle("#ID")
+			if ( (m = match[1]) ) {
+				if ( nodeType === 9 ) {
+					elem = context.getElementById( m );
+					// Check parentNode to catch when Blackberry 4.6 returns
+					// nodes that are no longer in the document #6963
+					if ( elem && elem.parentNode ) {
+						// Handle the case where IE, Opera, and Webkit return items
+						// by name instead of ID
+						if ( elem.id === m ) {
+							results.push( elem );
+							return results;
+						}
+					} else {
+						return results;
+					}
+				} else {
+					// Context is not a document
+					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
+						contains( context, elem ) && elem.id === m ) {
+						results.push( elem );
+						return results;
+					}
+				}
+
+			// Speed-up: Sizzle("TAG")
+			} else if ( match[2] ) {
+				push.apply( results, context.getElementsByTagName( selector ) );
+				return results;
+
+			// Speed-up: Sizzle(".CLASS")
+			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
+				push.apply( results, context.getElementsByClassName( m ) );
+				return results;
+			}
+		}
+
+		// QSA path
+		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
+			nid = old = expando;
+			newContext = context;
+			newSelector = nodeType === 9 && selector;
+
+			// qSA works strangely on Element-rooted queries
+			// We can work around this by specifying an extra ID on the root
+			// and working up from there (Thanks to Andrew Dupont for the technique)
+			// IE 8 doesn't work on object elements
+			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
+				groups = tokenize( selector );
+
+				if ( (old = context.getAttribute("id")) ) {
+					nid = old.replace( rescape, "\\$&" );
+				} else {
+					context.setAttribute( "id", nid );
+				}
+				nid = "[id='" + nid + "'] ";
+
+				i = groups.length;
+				while ( i-- ) {
+					groups[i] = nid + toSelector( groups[i] );
+				}
+				newContext = rsibling.test( selector ) && context.parentNode || context;
+				newSelector = groups.join(",");
+			}
+
+			if ( newSelector ) {
+				try {
+					push.apply( results,
+						newContext.querySelectorAll( newSelector )
+					);
+					return results;
+				} catch(qsaError) {
+				} finally {
+					if ( !old ) {
+						context.removeAttribute("id");
+					}
+				}
+			}
+		}
+	}
+
+	// All others
+	return select( selector.replace( rtrim, "$1" ), context, results, seed );
+}
+
+/**
+ * For feature detection
+ * @param {Function} fn The function to test for native support
+ */
+function isNative( fn ) {
+	return rnative.test( fn + "" );
+}
+
+/**
+ * Create key-value caches of limited size
+ * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
+ *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
+ *	deleting the oldest entry
+ */
+function createCache() {
+	var keys = [];
+
+	function cache( key, value ) {
+		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
+		if ( keys.push( key += " " ) > Expr.cacheLength ) {
+			// Only keep the most recent entries
+			delete cache[ keys.shift() ];
+		}
+		return (cache[ key ] = value);
+	}
+	return cache;
+}
+
+/**
+ * Mark a function for special use by Sizzle
+ * @param {Function} fn The function to mark
+ */
+function markFunction( fn ) {
+	fn[ expando ] = true;
+	return fn;
+}
+
+/**
+ * Support testing using an element
+ * @param {Function} fn Passed the created div and expects a boolean result
+ */
+function assert( fn ) {
+	var div = document.createElement("div");
+
+	try {
+		return !!fn( div );
+	} catch (e) {
+		return false;
+	} finally {
+		// Remove from its parent by default
+		if ( div.parentNode ) {
+			div.parentNode.removeChild( div );
+		}
+		// release memory in IE
+		div = null;
+	}
+}
+
+/**
+ * Adds the same handler for all of the specified attrs
+ * @param {String} attrs Pipe-separated list of attributes
+ * @param {Function} handler The method that will be applied if the test fails
+ * @param {Boolean} test The result of a test. If true, null will be set as the handler in leiu of the specified handler
+ */
+function addHandle( attrs, handler, test ) {
+	attrs = attrs.split("|");
+	var current,
+		i = attrs.length,
+		setHandle = test ? null : handler;
+
+	while ( i-- ) {
+		// Don't override a user's handler
+		if ( !(current = Expr.attrHandle[ attrs[i] ]) || current === handler ) {
+			Expr.attrHandle[ attrs[i] ] = setHandle;
+		}
+	}
+}
+
+/**
+ * Fetches boolean attributes by node
+ * @param {Element} elem
+ * @param {String} name
+ */
+function boolHandler( elem, name ) {
+	// XML does not need to be checked as this will not be assigned for XML documents
+	var val = elem.getAttributeNode( name );
+	return val && val.specified ?
+		val.value :
+		elem[ name ] === true ? name.toLowerCase() : null;
+}
+
+/**
+ * Fetches attributes without interpolation
+ * http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
+ * @param {Element} elem
+ * @param {String} name
+ */
+function interpolationHandler( elem, name ) {
+	// XML does not need to be checked as this will not be assigned for XML documents
+	return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
+}
+
+/**
+ * Uses defaultValue to retrieve value in IE6/7
+ * @param {Element} elem
+ * @param {String} name
+ */
+function valueHandler( elem ) {
+	// Ignore the value *property* on inputs by using defaultValue
+	// Fallback to Sizzle.attr by returning undefined where appropriate
+	// XML does not need to be checked as this will not be assigned for XML documents
+	if ( elem.nodeName.toLowerCase() === "input" ) {
+		return elem.defaultValue;
+	}
+}
+
+/**
+ * Checks document order of two siblings
+ * @param {Element} a
+ * @param {Element} b
+ * @returns Returns -1 if a precedes b, 1 if a follows b
+ */
+function siblingCheck( a, b ) {
+	var cur = b && a,
+		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
+			( ~b.sourceIndex || MAX_NEGATIVE ) -
+			( ~a.sourceIndex || MAX_NEGATIVE );
+
+	// Use IE sourceIndex if available on both nodes
+	if ( diff ) {
+		return diff;
+	}
+
+	// Check if b follows a
+	if ( cur ) {
+		while ( (cur = cur.nextSibling) ) {
+			if ( cur === b ) {
+				return -1;
+			}
+		}
+	}
+
+	return a ? 1 : -1;
+}
+
+/**
+ * Returns a function to use in pseudos for input types
+ * @param {String} type
+ */
+function createInputPseudo( type ) {
+	return function( elem ) {
+		var name = elem.nodeName.toLowerCase();
+		return name === "input" && elem.type === type;
+	};
+}
+
+/**
+ * Returns a function to use in pseudos for buttons
+ * @param {String} type
+ */
+function createButtonPseudo( type ) {
+	return function( elem ) {
+		var name = elem.nodeName.toLowerCase();
+		return (name === "input" || name === "button") && elem.type === type;
+	};
+}
+
+/**
+ * Returns a function to use in pseudos for positionals
+ * @param {Function} fn
+ */
+function createPositionalPseudo( fn ) {
+	return markFunction(function( argument ) {
+		argument = +argument;
+		return markFunction(function( seed, matches ) {
+			var j,
+				matchIndexes = fn( [], seed.length, argument ),
+				i = matchIndexes.length;
+
+			// Match elements found at the specified indexes
+			while ( i-- ) {
+				if ( seed[ (j = matchIndexes[i]) ] ) {
+					seed[j] = !(matches[j] = seed[j]);
+				}
+			}
+		});
+	});
+}
+
+/**
+ * Detect xml
+ * @param {Element|Object} elem An element or a document
+ */
+isXML = Sizzle.isXML = function( elem ) {
+	// documentElement is verified for cases where it doesn't yet exist
+	// (such as loading iframes in IE - #4833)
+	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
+	return documentElement ? documentElement.nodeName !== "HTML" : false;
+};
+
+// Expose support vars for convenience
+support = Sizzle.support = {};
+
+/**
+ * Sets document-related variables once based on the current document
+ * @param {Element|Object} [doc] An element or document object to use to set the document
+ * @returns {Object} Returns the current document
+ */
+setDocument = Sizzle.setDocument = function( node ) {
+	var doc = node ? node.ownerDocument || node : preferredDoc,
+		parent = doc.parentWindow;
+
+	// If no document and documentElement is available, return
+	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
+		return document;
+	}
+
+	// Set our document
+	document = doc;
+	docElem = doc.documentElement;
+
+	// Support tests
+	documentIsHTML = !isXML( doc );
+
+	// Support: IE>8
+	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
+	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
+	if ( parent && parent.frameElement ) {
+		parent.attachEvent( "onbeforeunload", function() {
+			setDocument();
+		});
+	}
+
+	/* Attributes
+	---------------------------------------------------------------------- */
+
+	// Support: IE<8
+	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
+	support.attributes = assert(function( div ) {
+
+		// Support: IE<8
+		// Prevent attribute/property "interpolation"
+		div.innerHTML = "<a href='#'></a>";
+		addHandle( "type|href|height|width", interpolationHandler, div.firstChild.getAttribute("href") === "#" );
+
+		// Support: IE<9
+		// Use getAttributeNode to fetch booleans when getAttribute lies
+		addHandle( booleans, boolHandler, div.getAttribute("disabled") == null );
+
+		div.className = "i";
+		return !div.getAttribute("className");
+	});
+
+	// Support: IE<9
+	// Retrieving value should defer to defaultValue
+	support.input = assert(function( div ) {
+		div.innerHTML = "<input>";
+		div.firstChild.setAttribute( "value", "" );
+		return div.firstChild.getAttribute( "value" ) === "";
+	});
+
+	// IE6/7 still return empty string for value,
+	// but are actually retrieving the property
+	addHandle( "value", valueHandler, support.attributes && support.input );
+
+	/* getElement(s)By*
+	---------------------------------------------------------------------- */
+
+	// Check if getElementsByTagName("*") returns only elements
+	support.getElementsByTagName = assert(function( div ) {
+		div.appendChild( doc.createComment("") );
+		return !div.getElementsByTagName("*").length;
+	});
+
+	// Check if getElementsByClassName can be trusted
+	support.getElementsByClassName = assert(function( div ) {
+		div.innerHTML = "<div class='a'></div><div class='a i'></div>";
+
+		// Support: Safari<4
+		// Catch class over-caching
+		div.firstChild.className = "i";
+		// Support: Opera<10
+		// Catch gEBCN failure to find non-leading classes
+		return div.getElementsByClassName("i").length === 2;
+	});
+
+	// Support: IE<10
+	// Check if getElementById returns elements by name
+	// The broken getElementById methods don't pick up programatically-set names,
+	// so use a roundabout getElementsByName test
+	support.getById = assert(function( div ) {
+		docElem.appendChild( div ).id = expando;
+		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
+	});
+
+	// ID find and filter
+	if ( support.getById ) {
+		Expr.find["ID"] = function( id, context ) {
+			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
+				var m = context.getElementById( id );
+				// Check parentNode to catch when Blackberry 4.6 returns
+				// nodes that are no longer in the document #6963
+				return m && m.parentNode ? [m] : [];
+			}
+		};
+		Expr.filter["ID"] = function( id ) {
+			var attrId = id.replace( runescape, funescape );
+			return function( elem ) {
+				return elem.getAttribute("id") === attrId;
+			};
+		};
+	} else {
+		// Support: IE6/7
+		// getElementById is not reliable as a find shortcut
+		delete Expr.find["ID"];
+
+		Expr.filter["ID"] =  function( id ) {
+			var attrId = id.replace( runescape, funescape );
+			return function( elem ) {
+				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
+				return node && node.value === attrId;
+			};
+		};
+	}
+
+	// Tag
+	Expr.find["TAG"] = support.getElementsByTagName ?
+		function( tag, context ) {
+			if ( typeof context.getElementsByTagName !== strundefined ) {
+				return context.getElementsByTagName( tag );
+			}
+		} :
+		function( tag, context ) {
+			var elem,
+				tmp = [],
+				i = 0,
+				results = context.getElementsByTagName( tag );
+
+			// Filter out possible comments
+			if ( tag === "*" ) {
+				while ( (elem = results[i++]) ) {
+					if ( elem.nodeType === 1 ) {
+						tmp.push( elem );
+					}
+				}
+
+				return tmp;
+			}
+			return results;
+		};
+
+	// Class
+	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
+		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
+			return context.getElementsByClassName( className );
+		}
+	};
+
+	/* QSA/matchesSelector
+	---------------------------------------------------------------------- */
+
+	// QSA and matchesSelector support
+
+	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
+	rbuggyMatches = [];
+
+	// qSa(:focus) reports false when true (Chrome 21)
+	// We allow this because of a bug in IE8/9 that throws an error
+	// whenever `document.activeElement` is accessed on an iframe
+	// So, we allow :focus to pass through QSA all the time to avoid the IE error
+	// See http://bugs.jquery.com/ticket/13378
+	rbuggyQSA = [];
+
+	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
+		// Build QSA regex
+		// Regex strategy adopted from Diego Perini
+		assert(function( div ) {
+			// Select is set to empty string on purpose
+			// This is to test IE's treatment of not explicitly
+			// setting a boolean content attribute,
+			// since its presence should be enough
+			// http://bugs.jquery.com/ticket/12359
+			div.innerHTML = "<select><option selected=''></option></select>";
+
+			// Support: IE8
+			// Boolean attributes and "value" are not treated correctly
+			if ( !div.querySelectorAll("[selected]").length ) {
+				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
+			}
+
+			// Webkit/Opera - :checked should return selected option elements
+			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
+			// IE8 throws error here and will not see later tests
+			if ( !div.querySelectorAll(":checked").length ) {
+				rbuggyQSA.push(":checked");
+			}
+		});
+
+		assert(function( div ) {
+
+			// Support: Opera 10-12/IE8
+			// ^= $= *= and empty values
+			// Should not select anything
+			// Support: Windows 8 Native Apps
+			// The type attribute is restricted during .innerHTML assignment
+			var input = doc.createElement("input");
+			input.setAttribute( "type", "hidden" );
+			div.appendChild( input ).setAttribute( "t", "" );
+
+			if ( div.querySelectorAll("[t^='']").length ) {
+				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
+			}
+
+			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
+			// IE8 throws error here and will not see later tests
+			if ( !div.querySelectorAll(":enabled").length ) {
+				rbuggyQSA.push( ":enabled", ":disabled" );
+			}
+
+			// Opera 10-11 does not throw on post-comma invalid pseudos
+			div.querySelectorAll("*,:x");
+			rbuggyQSA.push(",.*:");
+		});
+	}
+
+	if ( (support.matchesSelector = isNative( (matches = docElem.webkitMatchesSelector ||
+		docElem.mozMatchesSelector ||
+		docElem.oMatchesSelector ||
+		docElem.msMatchesSelector) )) ) {
+
+		assert(function( div ) {
+			// Check to see if it's possible to do matchesSelector
+			// on a disconnected node (IE 9)
+			support.disconnectedMatch = matches.call( div, "div" );
+
+			// This should fail with an exception
+			// Gecko does not error, returns false instead
+			matches.call( div, "[s!='']:x" );
+			rbuggyMatches.push( "!=", pseudos );
+		});
+	}
+
+	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
+	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
+
+	/* Contains
+	---------------------------------------------------------------------- */
+
+	// Element contains another
+	// Purposefully does not implement inclusive descendent
+	// As in, an element does not contain itself
+	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
+		function( a, b ) {
+			var adown = a.nodeType === 9 ? a.documentElement : a,
+				bup = b && b.parentNode;
+			return a === bup || !!( bup && bup.nodeType === 1 && (
+				adown.contains ?
+					adown.contains( bup ) :
+					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
+			));
+		} :
+		function( a, b ) {
+			if ( b ) {
+				while ( (b = b.parentNode) ) {
+					if ( b === a ) {
+						return true;
+					}
+				}
+			}
+			return false;
+		};
+
+	/* Sorting
+	---------------------------------------------------------------------- */
+
+	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
+	// Detached nodes confoundingly follow *each other*
+	support.sortDetached = assert(function( div1 ) {
+		// Should return 1, but returns 4 (following)
+		return div1.compareDocumentPosition( doc.createElement("div") ) & 1;
+	});
+
+	// Document order sorting
+	sortOrder = docElem.compareDocumentPosition ?
+	function( a, b ) {
+
+		// Flag for duplicate removal
+		if ( a === b ) {
+			hasDuplicate = true;
+			return 0;
+		}
+
+		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );
+
+		if ( compare ) {
+			// Disconnected nodes
+			if ( compare & 1 ||
+				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
+
+				// Choose the first element that is related to our preferred document
+				if ( a === doc || contains(preferredDoc, a) ) {
+					return -1;
+				}
+				if ( b === doc || contains(preferredDoc, b) ) {
+					return 1;
+				}
+
+				// Maintain original order
+				return sortInput ?
+					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
+					0;
+			}
+
+			return compare & 4 ? -1 : 1;
+		}
+
+		// Not directly comparable, sort on existence of method
+		return a.compareDocumentPosition ? -1 : 1;
+	} :
+	function( a, b ) {
+		var cur,
+			i = 0,
+			aup = a.parentNode,
+			bup = b.parentNode,
+			ap = [ a ],
+			bp = [ b ];
+
+		// Exit early if the nodes are identical
+		if ( a === b ) {
+			hasDuplicate = true;
+			return 0;
+
+		// Parentless nodes are either documents or disconnected
+		} else if ( !aup || !bup ) {
+			return a === doc ? -1 :
+				b === doc ? 1 :
+				aup ? -1 :
+				bup ? 1 :
+				sortInput ?
+				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
+				0;
+
+		// If the nodes are siblings, we can do a quick check
+		} else if ( aup === bup ) {
+			return siblingCheck( a, b );
+		}
+
+		// Otherwise we need full lists of their ancestors for comparison
+		cur = a;
+		while ( (cur = cur.parentNode) ) {
+			ap.unshift( cur );
+		}
+		cur = b;
+		while ( (cur = cur.parentNode) ) {
+			bp.unshift( cur );
+		}
+
+		// Walk down the tree looking for a discrepancy
+		while ( ap[i] === bp[i] ) {
+			i++;
+		}
+
+		return i ?
+			// Do a sibling check if the nodes have a common ancestor
+			siblingCheck( ap[i], bp[i] ) :
+
+			// Otherwise nodes in our document sort first
+			ap[i] === preferredDoc ? -1 :
+			bp[i] === preferredDoc ? 1 :
+			0;
+	};
+
+	return doc;
+};
+
+Sizzle.matches = function( expr, elements ) {
+	return Sizzle( expr, null, null, elements );
+};
+
+Sizzle.matchesSelector = function( elem, expr ) {
+	// Set document vars if needed
+	if ( ( elem.ownerDocument || elem ) !== document ) {
+		setDocument( elem );
+	}
+
+	// Make sure that attribute selectors are quoted
+	expr = expr.replace( rattributeQuotes, "='$1']" );
+
+	if ( support.matchesSelector && documentIsHTML &&
+		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
+		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
+
+		try {
+			var ret = matches.call( elem, expr );
+
+			// IE 9's matchesSelector returns false on disconnected nodes
+			if ( ret || support.disconnectedMatch ||
+					// As well, disconnected nodes are said to be in a document
+					// fragment in IE 9
+					elem.document && elem.document.nodeType !== 11 ) {
+				return ret;
+			}
+		} catch(e) {}
+	}
+
+	return Sizzle( expr, document, null, [elem] ).length > 0;
+};
+
+Sizzle.contains = function( context, elem ) {
+	// Set document vars if needed
+	if ( ( context.ownerDocument || context ) !== document ) {
+		setDocument( context );
+	}
+	return contains( context, elem );
+};
+
+Sizzle.attr = function( elem, name ) {
+	// Set document vars if needed
+	if ( ( elem.ownerDocument || elem ) !== document ) {
+		setDocument( elem );
+	}
+
+	var fn = Expr.attrHandle[ name.toLowerCase() ],
+		// Don't get fooled by Object.prototype properties (jQuery #13807)
+		val = ( fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
+			fn( elem, name, !documentIsHTML ) :
+			undefined );
+
+	return val === undefined ?
+		support.attributes || !documentIsHTML ?
+			elem.getAttribute( name ) :
+			(val = elem.getAttributeNode(name)) && val.specified ?
+				val.value :
+				null :
+		val;
+};
+
+Sizzle.error = function( msg ) {
+	throw new Error( "Syntax error, unrecognized expression: " + msg );
+};
+
+/**
+ * Document sorting and removing duplicates
+ * @param {ArrayLike} results
+ */
+Sizzle.uniqueSort = function( results ) {
+	var elem,
+		duplicates = [],
+		j = 0,
+		i = 0;
+
+	// Unless we *know* we can detect duplicates, assume their presence
+	hasDuplicate = !support.detectDuplicates;
+	sortInput = !support.sortStable && results.slice( 0 );
+	results.sort( sortOrder );
+
+	if ( hasDuplicate ) {
+		while ( (elem = results[i++]) ) {
+			if ( elem === results[ i ] ) {
+				j = duplicates.push( i );
+			}
+		}
+		while ( j-- ) {
+			results.splice( duplicates[ j ], 1 );
+		}
+	}
+
+	return results;
+};
+
+/**
+ * Utility function for retrieving the text value of an array of DOM nodes
+ * @param {Array|Element} elem
+ */
+getText = Sizzle.getText = function( elem ) {
+	var node,
+		ret = "",
+		i = 0,
+		nodeType = elem.nodeType;
+
+	if ( !nodeType ) {
+		// If no nodeType, this is expected to be an array
+		for ( ; (node = elem[i]); i++ ) {
+			// Do not traverse comment nodes
+			ret += getText( node );
+		}
+	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
+		// Use textContent for elements
+		// innerText usage removed for consistency of new lines (see #11153)
+		if ( typeof elem.textContent === "string" ) {
+			return elem.textContent;
+		} else {
+			// Traverse its children
+			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
+				ret += getText( elem );
+			}
+		}
+	} else if ( nodeType === 3 || nodeType === 4 ) {
+		return elem.nodeValue;
+	}
+	// Do not include comment or processing instruction nodes
+
+	return ret;
+};
+
+Expr = Sizzle.selectors = {
+
+	// Can be adjusted by the user
+	cacheLength: 50,
+
+	createPseudo: markFunction,
+
+	match: matchExpr,
+
+	attrHandle: {},
+
+	find: {},
+
+	relative: {
+		">": { dir: "parentNode", first: true },
+		" ": { dir: "parentNode" },
+		"+": { dir: "previousSibling", first: true },
+		"~": { dir: "previousSibling" }
+	},
+
+	preFilter: {
+		"ATTR": function( match ) {
+			match[1] = match[1].replace( runescape, funescape );
+
+			// Move the given value to match[3] whether quoted or unquoted
+			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );
+
+			if ( match[2] === "~=" ) {
+				match[3] = " " + match[3] + " ";
+			}
+
+			return match.slice( 0, 4 );
+		},
+
+		"CHILD": function( match ) {
+			/* matches from matchExpr["CHILD"]
+				1 type (only|nth|...)
+				2 what (child|of-type)
+				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
+				4 xn-component of xn+y argument ([+-]?\d*n|)
+				5 sign of xn-component
+				6 x of xn-component
+				7 sign of y-component
+				8 y of y-component
+			*/
+			match[1] = match[1].toLowerCase();
+
+			if ( match[1].slice( 0, 3 ) === "nth" ) {
+				// nth-* requires argument
+				if ( !match[3] ) {
+					Sizzle.error( match[0] );
+				}
+
+				// numeric x and y parameters for Expr.filter.CHILD
+				// remember that false/true cast respectively to 0/1
+				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
+				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
+
+			// other types prohibit arguments
+			} else if ( match[3] ) {
+				Sizzle.error( match[0] );
+			}
+
+			return match;
+		},
+
+		"PSEUDO": function( match ) {
+			var excess,
+				unquoted = !match[5] && match[2];
+
+			if ( matchExpr["CHILD"].test( match[0] ) ) {
+				return null;
+			}
+
+			// Accept quoted arguments as-is
+			if ( match[3] && match[4] !== undefined ) {
+				match[2] = match[4];
+
+			// Strip excess characters from unquoted arguments
+			} else if ( unquoted && rpseudo.test( unquoted ) &&
+				// Get excess from tokenize (recursively)
+				(excess = tokenize( unquoted, true )) &&
+				// advance to the next closing parenthesis
+				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
+
+				// excess is a negative index
+				match[0] = match[0].slice( 0, excess );
+				match[2] = unquoted.slice( 0, excess );
+			}
+
+			// Return only captures needed by the pseudo filter method (type and argument)
+			return match.slice( 0, 3 );
+		}
+	},
+
+	filter: {
+
+		"TAG": function( nodeNameSelector ) {
+			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
+			return nodeNameSelector === "*" ?
+				function() { return true; } :
+				function( elem ) {
+					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
+				};
+		},
+
+		"CLASS": function( className ) {
+			var pattern = classCache[ className + " " ];
+
+			return pattern ||
+				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
+				classCache( className, function( elem ) {
+					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
+				});
+		},
+
+		"ATTR": function( name, operator, check ) {
+			return function( elem ) {
+				var result = Sizzle.attr( elem, name );
+
+				if ( result == null ) {
+					return operator === "!=";
+				}
+				if ( !operator ) {
+					return true;
+				}
+
+				result += "";
+
+				return operator === "=" ? result === check :
+					operator === "!=" ? result !== check :
+					operator === "^=" ? check && result.indexOf( check ) === 0 :
+					operator === "*=" ? check && result.indexOf( check ) > -1 :
+					operator === "$=" ? check && result.slice( -check.length ) === check :
+					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
+					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
+					false;
+			};
+		},
+
+		"CHILD": function( type, what, argument, first, last ) {
+			var simple = type.slice( 0, 3 ) !== "nth",
+				forward = type.slice( -4 ) !== "last",
+				ofType = what === "of-type";
+
+			return first === 1 && last === 0 ?
+
+				// Shortcut for :nth-*(n)
+				function( elem ) {
+					return !!elem.parentNode;
+				} :
+
+				function( elem, context, xml ) {
+					var cache, outerCache, node, diff, nodeIndex, start,
+						dir = simple !== forward ? "nextSibling" : "previousSibling",
+						parent = elem.parentNode,
+						name = ofType && elem.nodeName.toLowerCase(),
+						useCache = !xml && !ofType;
+
+					if ( parent ) {
+
+						// :(first|last|only)-(child|of-type)
+						if ( simple ) {
+							while ( dir ) {
+								node = elem;
+								while ( (node = node[ dir ]) ) {
+									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
+										return false;
+									}
+								}
+								// Reverse direction for :only-* (if we haven't yet done so)
+								start = dir = type === "only" && !start && "nextSibling";
+							}
+							return true;
+						}
+
+						start = [ forward ? parent.firstChild : parent.lastChild ];
+
+						// non-xml :nth-child(...) stores cache data on `parent`
+						if ( forward && useCache ) {
+							// Seek `elem` from a previously-cached index
+							outerCache = parent[ expando ] || (parent[ expando ] = {});
+							cache = outerCache[ type ] || [];
+							nodeIndex = cache[0] === dirruns && cache[1];
+							diff = cache[0] === dirruns && cache[2];
+							node = nodeIndex && parent.childNodes[ nodeIndex ];
+
+							while ( (node = ++nodeIndex && node && node[ dir ] ||
+
+								// Fallback to seeking `elem` from the start
+								(diff = nodeIndex = 0) || start.pop()) ) {
+
+								// When found, cache indexes on `parent` and break
+								if ( node.nodeType === 1 && ++diff && node === elem ) {
+									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
+									break;
+								}
+							}
+
+						// Use previously-cached element index if available
+						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
+							diff = cache[1];
+
+						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
+						} else {
+							// Use the same loop as above to seek `elem` from the start
+							while ( (node = ++nodeIndex && node && node[ dir ] ||
+								(diff = nodeIndex = 0) || start.pop()) ) {
+
+								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
+									// Cache the index of each encountered element
+									if ( useCache ) {
+										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
+									}
+
+									if ( node === elem ) {
+										break;
+									}
+								}
+							}
+						}
+
+						// Incorporate the offset, then check against cycle size
+						diff -= last;
+						return diff === first || ( diff % first === 0 && diff / first >= 0 );
+					}
+				};
+		},
+
+		"PSEUDO": function( pseudo, argument ) {
+			// pseudo-class names are case-insensitive
+			// http://www.w3.org/TR/selectors/#pseudo-classes
+			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
+			// Remember that setFilters inherits from pseudos
+			var args,
+				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
+					Sizzle.error( "unsupported pseudo: " + pseudo );
+
+			// The user may use createPseudo to indicate that
+			// arguments are needed to create the filter function
+			// just as Sizzle does
+			if ( fn[ expando ] ) {
+				return fn( argument );
+			}
+
+			// But maintain support for old signatures
+			if ( fn.length > 1 ) {
+				args = [ pseudo, pseudo, "", argument ];
+				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
+					markFunction(function( seed, matches ) {
+						var idx,
+							matched = fn( seed, argument ),
+							i = matched.length;
+						while ( i-- ) {
+							idx = indexOf.call( seed, matched[i] );
+							seed[ idx ] = !( matches[ idx ] = matched[i] );
+						}
+					}) :
+					function( elem ) {
+						return fn( elem, 0, args );
+					};
+			}
+
+			return fn;
+		}
+	},
+
+	pseudos: {
+		// Potentially complex pseudos
+		"not": markFunction(function( selector ) {
+			// Trim the selector passed to compile
+			// to avoid treating leading and trailing
+			// spaces as combinators
+			var input = [],
+				results = [],
+				matcher = compile( selector.replace( rtrim, "$1" ) );
+
+			return matcher[ expando ] ?
+				markFunction(function( seed, matches, context, xml ) {
+					var elem,
+						unmatched = matcher( seed, null, xml, [] ),
+						i = seed.length;
+
+					// Match elements unmatched by `matcher`
+					while ( i-- ) {
+						if ( (elem = unmatched[i]) ) {
+							seed[i] = !(matches[i] = elem);
+						}
+					}
+				}) :
+				function( elem, context, xml ) {
+					input[0] = elem;
+					matcher( input, null, xml, results );
+					return !results.pop();
+				};
+		}),
+
+		"has": markFunction(function( selector ) {
+			return function( elem ) {
+				return Sizzle( selector, elem ).length > 0;
+			};
+		}),
+
+		"contains": markFunction(function( text ) {
+			return function( elem ) {
+				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
+			};
+		}),
+
+		// "Whether an element is represented by a :lang() selector
+		// is based solely on the element's language value
+		// being equal to the identifier C,
+		// or beginning with the identifier C immediately followed by "-".
+		// The matching of C against the element's language value is performed case-insensitively.
+		// The identifier C does not have to be a valid language name."
+		// http://www.w3.org/TR/selectors/#lang-pseudo
+		"lang": markFunction( function( lang ) {
+			// lang value must be a valid identifier
+			if ( !ridentifier.test(lang || "") ) {
+				Sizzle.error( "unsupported lang: " + lang );
+			}
+			lang = lang.replace( runescape, funescape ).toLowerCase();
+			return function( elem ) {
+				var elemLang;
+				do {
+					if ( (elemLang = documentIsHTML ?
+						elem.lang :
+						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
+
+						elemLang = elemLang.toLowerCase();
+						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
+					}
+				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
+				return false;
+			};
+		}),
+
+		// Miscellaneous
+		"target": function( elem ) {
+			var hash = window.location && window.location.hash;
+			return hash && hash.slice( 1 ) === elem.id;
+		},
+
+		"root": function( elem ) {
+			return elem === docElem;
+		},
+
+		"focus": function( elem ) {
+			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
+		},
+
+		// Boolean properties
+		"enabled": function( elem ) {
+			return elem.disabled === false;
+		},
+
+		"disabled": function( elem ) {
+			return elem.disabled === true;
+		},
+
+		"checked": function( elem ) {
+			// In CSS3, :checked should return both checked and selected elements
+			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
+			var nodeName = elem.nodeName.toLowerCase();
+			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
+		},
+
+		"selected": function( elem ) {
+			// Accessing this property makes selected-by-default
+			// options in Safari work properly
+			if ( elem.parentNode ) {
+				elem.parentNode.selectedIndex;
+			}
+
+			return elem.selected === true;
+		},
+
+		// Contents
+		"empty": function( elem ) {
+			// http://www.w3.org/TR/selectors/#empty-pseudo
+			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
+			//   not comment, processing instructions, or others
+			// Thanks to Diego Perini for the nodeName shortcut
+			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
+			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
+				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
+					return false;
+				}
+			}
+			return true;
+		},
+
+		"parent": function( elem ) {
+			return !Expr.pseudos["empty"]( elem );
+		},
+
+		// Element/input types
+		"header": function( elem ) {
+			return rheader.test( elem.nodeName );
+		},
+
+		"input": function( elem ) {
+			return rinputs.test( elem.nodeName );
+		},
+
+		"button": function( elem ) {
+			var name = elem.nodeName.toLowerCase();
+			return name === "input" && elem.type === "button" || name === "button";
+		},
+
+		"text": function( elem ) {
+			var attr;
+			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
+			// use getAttribute instead to test this case
+			return elem.nodeName.toLowerCase() === "input" &&
+				elem.type === "text" &&
+				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
+		},
+
+		// Position-in-collection
+		"first": createPositionalPseudo(function() {
+			return [ 0 ];
+		}),
+
+		"last": createPositionalPseudo(function( matchIndexes, length ) {
+			return [ length - 1 ];
+		}),
+
+		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
+			return [ argument < 0 ? argument + length : argument ];
+		}),
+
+		"even": createPositionalPseudo(function( matchIndexes, length ) {
+			var i = 0;
+			for ( ; i < length; i += 2 ) {
+				matchIndexes.push( i );
+			}
+			return matchIndexes;
+		}),
+
+		"odd": createPositionalPseudo(function( matchIndexes, length ) {
+			var i = 1;
+			for ( ; i < length; i += 2 ) {
+				matchIndexes.push( i );
+			}
+			return matchIndexes;
+		}),
+
+		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
+			var i = argument < 0 ? argument + length : argument;
+			for ( ; --i >= 0; ) {
+				matchIndexes.push( i );
+			}
+			return matchIndexes;
+		}),
+
+		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
+			var i = argument < 0 ? argument + length : argument;
+			for ( ; ++i < length; ) {
+				matchIndexes.push( i );
+			}
+			return matchIndexes;
+		})
+	}
+};
+
+// Add button/input type pseudos
+for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
+	Expr.pseudos[ i ] = createInputPseudo( i );
+}
+for ( i in { submit: true, reset: true } ) {
+	Expr.pseudos[ i ] = createButtonPseudo( i );
+}
+
+function tokenize( selector, parseOnly ) {
+	var matched, match, tokens, type,
+		soFar, groups, preFilters,
+		cached = tokenCache[ selector + " " ];
+
+	if ( cached ) {
+		return parseOnly ? 0 : cached.slice( 0 );
+	}
+
+	soFar = selector;
+	groups = [];
+	preFilters = Expr.preFilter;
+
+	while ( soFar ) {
+
+		// Comma and first run
+		if ( !matched || (match = rcomma.exec( soFar )) ) {
+			if ( match ) {
+				// Don't consume trailing commas as valid
+				soFar = soFar.slice( match[0].length ) || soFar;
+			}
+			groups.push( tokens = [] );
+		}
+
+		matched = false;
+
+		// Combinators
+		if ( (match = rcombinators.exec( soFar )) ) {
+			matched = match.shift();
+			tokens.push({
+				value: matched,
+				// Cast descendant combinators to space
+				type: match[0].replace( rtrim, " " )
+			});
+			soFar = soFar.slice( matched.length );
+		}
+
+		// Filters
+		for ( type in Expr.filter ) {
+			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
+				(match = preFilters[ type ]( match ))) ) {
+				matched = match.shift();
+				tokens.push({
+					value: matched,
+					type: type,
+					matches: match
+				});
+				soFar = soFar.slice( matched.length );
+			}
+		}
+
+		if ( !matched ) {
+			break;
+		}
+	}
+
+	// Return the length of the invalid excess
+	// if we're just parsing
+	// Otherwise, throw an error or return tokens
+	return parseOnly ?
+		soFar.length :
+		soFar ?
+			Sizzle.error( selector ) :
+			// Cache the tokens
+			tokenCache( selector, groups ).slice( 0 );
+}
+
+function toSelector( tokens ) {
+	var i = 0,
+		len = tokens.length,
+		selector = "";
+	for ( ; i < len; i++ ) {
+		selector += tokens[i].value;
+	}
+	return selector;
+}
+
+function addCombinator( matcher, combinator, base ) {
+	var dir = combinator.dir,
+		checkNonElements = base && dir === "parentNode",
+		doneName = done++;
+
+	return combinator.first ?
+		// Check against closest ancestor/preceding element
+		function( elem, context, xml ) {
+			while ( (elem = elem[ dir ]) ) {
+				if ( elem.nodeType === 1 || checkNonElements ) {
+					return matcher( elem, context, xml );
+				}
+			}
+		} :
+
+		// Check against all ancestor/preceding elements
+		function( elem, context, xml ) {
+			var data, cache, outerCache,
+				dirkey = dirruns + " " + doneName;
+
+			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
+			if ( xml ) {
+				while ( (elem = elem[ dir ]) ) {
+					if ( elem.nodeType === 1 || checkNonElements ) {
+						if ( matcher( elem, context, xml ) ) {
+							return true;
+						}
+					}
+				}
+			} else {
+				while ( (elem = elem[ dir ]) ) {
+					if ( elem.nodeType === 1 || checkNonElements ) {
+						outerCache = elem[ expando ] || (elem[ expando ] = {});
+						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
+							if ( (data = cache[1]) === true || data === cachedruns ) {
+								return data === true;
+							}
+						} else {
+							cache = outerCache[ dir ] = [ dirkey ];
+							cache[1] = matcher( elem, context, xml ) || cachedruns;
+							if ( cache[1] === true ) {
+								return true;
+							}
+						}
+					}
+				}
+			}
+		};
+}
+
+function elementMatcher( matchers ) {
+	return matchers.length > 1 ?
+		function( elem, context, xml ) {
+			var i = matchers.length;
+			while ( i-- ) {
+				if ( !matchers[i]( elem, context, xml ) ) {
+					return false;
+				}
+			}
+			return true;
+		} :
+		matchers[0];
+}
+
+function condense( unmatched, map, filter, context, xml ) {
+	var elem,
+		newUnmatched = [],
+		i = 0,
+		len = unmatched.length,
+		mapped = map != null;
+
+	for ( ; i < len; i++ ) {
+		if ( (elem = unmatched[i]) ) {
+			if ( !filter || filter( elem, context, xml ) ) {
+				newUnmatched.push( elem );
+				if ( mapped ) {
+					map.push( i );
+				}
+			}
+		}
+	}
+
+	return newUnmatched;
+}
+
+function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
+	if ( postFilter && !postFilter[ expando ] ) {
+		postFilter = setMatcher( postFilter );
+	}
+	if ( postFinder && !postFinder[ expando ] ) {
+		postFinder = setMatcher( postFinder, postSelector );
+	}
+	return markFunction(function( seed, results, context, xml ) {
+		var temp, i, elem,
+			preMap = [],
+			postMap = [],
+			preexisting = results.length,
+
+			// Get initial elements from seed or context
+			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
+
+			// Prefilter to get matcher input, preserving a map for seed-results synchronization
+			matcherIn = preFilter && ( seed || !selector ) ?
+				condense( elems, preMap, preFilter, context, xml ) :
+				elems,
+
+			matcherOut = matcher ?
+				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
+				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
+
+					// ...intermediate processing is necessary
+					[] :
+
+					// ...otherwise use results directly
+					results :
+				matcherIn;
+
+		// Find primary matches
+		if ( matcher ) {
+			matcher( matcherIn, matcherOut, context, xml );
+		}
+
+		// Apply postFilter
+		if ( postFilter ) {
+			temp = condense( matcherOut, postMap );
+			postFilter( temp, [], context, xml );
+
+			// Un-match failing elements by moving them back to matcherIn
+			i = temp.length;
+			while ( i-- ) {
+				if ( (elem = temp[i]) ) {
+					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
+				}
+			}
+		}
+
+		if ( seed ) {
+			if ( postFinder || preFilter ) {
+				if ( postFinder ) {
+					// Get the final matcherOut by condensing this intermediate into postFinder contexts
+					temp = [];
+					i = matcherOut.length;
+					while ( i-- ) {
+						if ( (elem = matcherOut[i]) ) {
+							// Restore matcherIn since elem is not yet a final match
+							temp.push( (matcherIn[i] = elem) );
+						}
+					}
+					postFinder( null, (matcherOut = []), temp, xml );
+				}
+
+				// Move matched elements from seed to results to keep them synchronized
+				i = matcherOut.length;
+				while ( i-- ) {
+					if ( (elem = matcherOut[i]) &&
+						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {
+
+						seed[temp] = !(results[temp] = elem);
+					}
+				}
+			}
+
+		// Add elements to results, through postFinder if defined
+		} else {
+			matcherOut = condense(
+				matcherOut === results ?
+					matcherOut.splice( preexisting, matcherOut.length ) :
+					matcherOut
+			);
+			if ( postFinder ) {
+				postFinder( null, results, matcherOut, xml );
+			} else {
+				push.apply( results, matcherOut );
+			}
+		}
+	});
+}
+
+function matcherFromTokens( tokens ) {
+	var checkContext, matcher, j,
+		len = tokens.length,
+		leadingRelative = Expr.relative[ tokens[0].type ],
+		implicitRelative = leadingRelative || Expr.relative[" "],
+		i = leadingRelative ? 1 : 0,
+
+		// The foundational matcher ensures that elements are reachable from top-level context(s)
+		matchContext = addCombinator( function( elem ) {
+			return elem === checkContext;
+		}, implicitRelative, true ),
+		matchAnyContext = addCombinator( function( elem ) {
+			return indexOf.call( checkContext, elem ) > -1;
+		}, implicitRelative, true ),
+		matchers = [ function( elem, context, xml ) {
+			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
+				(checkContext = context).nodeType ?
+					matchContext( elem, context, xml ) :
+					matchAnyContext( elem, context, xml ) );
+		} ];
+
+	for ( ; i < len; i++ ) {
+		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
+			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
+		} else {
+			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
+
+			// Return special upon seeing a positional matcher
+			if ( matcher[ expando ] ) {
+				// Find the next relative operator (if any) for proper handling
+				j = ++i;
+				for ( ; j < len; j++ ) {
+					if ( Expr.relative[ tokens[j].type ] ) {
+						break;
+					}
+				}
+				return setMatcher(
+					i > 1 && elementMatcher( matchers ),
+					i > 1 && toSelector(
+						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
+						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
+					).replace( rtrim, "$1" ),
+					matcher,
+					i < j && matcherFromTokens( tokens.slice( i, j ) ),
+					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
+					j < len && toSelector( tokens )
+				);
+			}
+			matchers.push( matcher );
+		}
+	}
+
+	return elementMatcher( matchers );
+}
+
+function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
+	// A counter to specify which element is currently being matched
+	var matcherCachedRuns = 0,
+		bySet = setMatchers.length > 0,
+		byElement = elementMatchers.length > 0,
+		superMatcher = function( seed, context, xml, results, expandContext ) {
+			var elem, j, matcher,
+				setMatched = [],
+				matchedCount = 0,
+				i = "0",
+				unmatched = seed && [],
+				outermost = expandContext != null,
+				contextBackup = outermostContext,
+				// We must always have either seed elements or context
+				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
+				// Use integer dirruns iff this is the outermost matcher
+				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);
+
+			if ( outermost ) {
+				outermostContext = context !== document && context;
+				cachedruns = matcherCachedRuns;
+			}
+
+			// Add elements passing elementMatchers directly to results
+			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
+			for ( ; (elem = elems[i]) != null; i++ ) {
+				if ( byElement && elem ) {
+					j = 0;
+					while ( (matcher = elementMatchers[j++]) ) {
+						if ( matcher( elem, context, xml ) ) {
+							results.push( elem );
+							break;
+						}
+					}
+					if ( outermost ) {
+						dirruns = dirrunsUnique;
+						cachedruns = ++matcherCachedRuns;
+					}
+				}
+
+				// Track unmatched elements for set filters
+				if ( bySet ) {
+					// They will have gone through all possible matchers
+					if ( (elem = !matcher && elem) ) {
+						matchedCount--;
+					}
+
+					// Lengthen the array for every element, matched or not
+					if ( seed ) {
+						unmatched.push( elem );
+					}
+				}
+			}
+
+			// Apply set filters to unmatched elements
+			matchedCount += i;
+			if ( bySet && i !== matchedCount ) {
+				j = 0;
+				while ( (matcher = setMatchers[j++]) ) {
+					matcher( unmatched, setMatched, context, xml );
+				}
+
+				if ( seed ) {
+					// Reintegrate element matches to eliminate the need for sorting
+					if ( matchedCount > 0 ) {
+						while ( i-- ) {
+							if ( !(unmatched[i] || setMatched[i]) ) {
+								setMatched[i] = pop.call( results );
+							}
+						}
+					}
+
+					// Discard index placeholder values to get only actual matches
+					setMatched = condense( setMatched );
+				}
+
+				// Add matches to results
+				push.apply( results, setMatched );
+
+				// Seedless set matches succeeding multiple successful matchers stipulate sorting
+				if ( outermost && !seed && setMatched.length > 0 &&
+					( matchedCount + setMatchers.length ) > 1 ) {
+
+					Sizzle.uniqueSort( results );
+				}
+			}
+
+			// Override manipulation of globals by nested matchers
+			if ( outermost ) {
+				dirruns = dirrunsUnique;
+				outermostContext = contextBackup;
+			}
+
+			return unmatched;
+		};
+
+	return bySet ?
+		markFunction( superMatcher ) :
+		superMatcher;
+}
+
+compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
+	var i,
+		setMatchers = [],
+		elementMatchers = [],
+		cached = compilerCache[ selector + " " ];
+
+	if ( !cached ) {
+		// Generate a function of recursive functions that can be used to check each element
+		if ( !group ) {
+			group = tokenize( selector );
+		}
+		i = group.length;
+		while ( i-- ) {
+			cached = matcherFromTokens( group[i] );
+			if ( cached[ expando ] ) {
+				setMatchers.push( cached );
+			} else {
+				elementMatchers.push( cached );
+			}
+		}
+
+		// Cache the compiled function
+		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
+	}
+	return cached;
+};
+
+function multipleContexts( selector, contexts, results ) {
+	var i = 0,
+		len = contexts.length;
+	for ( ; i < len; i++ ) {
+		Sizzle( selector, contexts[i], results );
+	}
+	return results;
+}
+
+function select( selector, context, results, seed ) {
+	var i, tokens, token, type, find,
+		match = tokenize( selector );
+
+	if ( !seed ) {
+		// Try to minimize operations if there is only one group
+		if ( match.length === 1 ) {
+
+			// Take a shortcut and set the context if the root selector is an ID
+			tokens = match[0] = match[0].slice( 0 );
+			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
+					support.getById && context.nodeType === 9 && documentIsHTML &&
+					Expr.relative[ tokens[1].type ] ) {
+
+				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
+				if ( !context ) {
+					return results;
+				}
+				selector = selector.slice( tokens.shift().value.length );
+			}
+
+			// Fetch a seed set for right-to-left matching
+			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
+			while ( i-- ) {
+				token = tokens[i];
+
+				// Abort if we hit a combinator
+				if ( Expr.relative[ (type = token.type) ] ) {
+					break;
+				}
+				if ( (find = Expr.find[ type ]) ) {
+					// Search, expanding context for leading sibling combinators
+					if ( (seed = find(
+						token.matches[0].replace( runescape, funescape ),
+						rsibling.test( tokens[0].type ) && context.parentNode || context
+					)) ) {
+
+						// If seed is empty or no tokens remain, we can return early
+						tokens.splice( i, 1 );
+						selector = seed.length && toSelector( tokens );
+						if ( !selector ) {
+							push.apply( results, seed );
+							return results;
+						}
+
+						break;
+					}
+				}
+			}
+		}
+	}
+
+	// Compile and execute a filtering function
+	// Provide `match` to avoid retokenization if we modified the selector above
+	compile( selector, match )(
+		seed,
+		context,
+		!documentIsHTML,
+		results,
+		rsibling.test( selector )
+	);
+	return results;
+}
+
+// Deprecated
+Expr.pseudos["nth"] = Expr.pseudos["eq"];
+
+// Easy API for creating new setFilters
+function setFilters() {}
+setFilters.prototype = Expr.filters = Expr.pseudos;
+Expr.setFilters = new setFilters();
+
+// One-time assignments
+
+// Sort stability
+support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
+
+// Initialize against the default document
+setDocument();
+
+// Support: Chrome<<14
+// Always assume duplicates if they aren't passed to the comparison function
+[0, 0].sort( sortOrder );
+support.detectDuplicates = hasDuplicate;
+
+jQuery.find = Sizzle;
+jQuery.expr = Sizzle.selectors;
+jQuery.expr[":"] = jQuery.expr.pseudos;
+jQuery.unique = Sizzle.uniqueSort;
+jQuery.text = Sizzle.getText;
+jQuery.isXMLDoc = Sizzle.isXML;
+jQuery.contains = Sizzle.contains;
+
+
+})( window );
+// String to Object options format cache
+var optionsCache = {};
+
+// Convert String-formatted options into Object-formatted ones and store in cache
+function createOptions( options ) {
+	var object = optionsCache[ options ] = {};
+	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
+		object[ flag ] = true;
+	});
+	return object;
+}
+
+/*
+ * Create a callback list using the following parameters:
+ *
+ *	options: an optional list of space-separated options that will change how
+ *			the callback list behaves or a more traditional option object
+ *
+ * By default a callback list will act like an event callback list and can be
+ * "fired" multiple times.
+ *
+ * Possible options:
+ *
+ *	once:			will ensure the callback list can only be fired once (like a Deferred)
+ *
+ *	memory:			will keep track of previous values and will call any callback added
+ *					after the list has been fired right away with the latest "memorized"
+ *					values (like a Deferred)
+ *
+ *	unique:			will ensure a callback can only be added once (no duplicate in the list)
+ *
+ *	stopOnFalse:	interrupt callings when a callback returns false
+ *
+ */
+jQuery.Callbacks = function( options ) {
+
+	// Convert options from String-formatted to Object-formatted if needed
+	// (we check in cache first)
+	options = typeof options === "string" ?
+		( optionsCache[ options ] || createOptions( options ) ) :
+		jQuery.extend( {}, options );
+
+	var // Last fire value (for non-forgettable lists)
+		memory,
+		// Flag to know if list was already fired
+		fired,
+		// Flag to know if list is currently firing
+		firing,
+		// First callback to fire (used internally by add and fireWith)
+		firingStart,
+		// End of the loop when firing
+		firingLength,
+		// Index of currently firing callback (modified by remove if needed)
+		firingIndex,
+		// Actual callback list
+		list = [],
+		// Stack of fire calls for repeatable lists
+		stack = !options.once && [],
+		// Fire callbacks
+		fire = function( data ) {
+			memory = options.memory && data;
+			fired = true;
+			firingIndex = firingStart || 0;
+			firingStart = 0;
+			firingLength = list.length;
+			firing = true;
+			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
+				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
+					memory = false; // To prevent further calls using add
+					break;
+				}
+			}
+			firing = false;
+			if ( list ) {
+				if ( stack ) {
+					if ( stack.length ) {
+						fire( stack.shift() );
+					}
+				} else if ( memory ) {
+					list = [];
+				} else {
+					self.disable();
+				}
+			}
+		},
+		// Actual Callbacks object
+		self = {
+			// Add a callback or a collection of callbacks to the list
+			add: function() {
+				if ( list ) {
+					// First, we save the current length
+					var start = list.length;
+					(function add( args ) {
+						jQuery.each( args, function( _, arg ) {
+							var type = jQuery.type( arg );
+							if ( type === "function" ) {
+								if ( !options.unique || !self.has( arg ) ) {
+									list.push( arg );
+								}
+							} else if ( arg && arg.length && type !== "string" ) {
+								// Inspect recursively
+								add( arg );
+							}
+						});
+					})( arguments );
+					// Do we need to add the callbacks to the
+					// current firing batch?
+					if ( firing ) {
+						firingLength = list.length;
+					// With memory, if we're not firing then
+					// we should call right away
+					} else if ( memory ) {
+						firingStart = start;
+						fire( memory );
+					}
+				}
+				return this;
+			},
+			// Remove a callback from the list
+			remove: function() {
+				if ( list ) {
+					jQuery.each( arguments, function( _, arg ) {
+						var index;
+						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
+							list.splice( index, 1 );
+							// Handle firing indexes
+							if ( firing ) {
+								if ( index <= firingLength ) {
+									firingLength--;
+								}
+								if ( index <= firingIndex ) {
+									firingIndex--;
+								}
+							}
+						}
+					});
+				}
+				return this;
+			},
+			// Check if a given callback is in the list.
+			// If no argument is given, return whether or not list has callbacks attached.
+			has: function( fn ) {
+				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
+			},
+			// Remove all callbacks from the list
+			empty: function() {
+				list = [];
+				firingLength = 0;
+				return this;
+			},
+			// Have the list do nothing anymore
+			disable: function() {
+				list = stack = memory = undefined;
+				return this;
+			},
+			// Is it disabled?
+			disabled: function() {
+				return !list;
+			},
+			// Lock the list in its current state
+			lock: function() {
+				stack = undefined;
+				if ( !memory ) {
+					self.disable();
+				}
+				return this;
+			},
+			// Is it locked?
+			locked: function() {
+				return !stack;
+			},
+			// Call all callbacks with the given context and arguments
+			fireWith: function( context, args ) {
+				args = args || [];
+				args = [ context, args.slice ? args.slice() : args ];
+				if ( list && ( !fired || stack ) ) {
+					if ( firing ) {
+						stack.push( args );
+					} else {
+						fire( args );
+					}
+				}
+				return this;
+			},
+			// Call all the callbacks with the given arguments
+			fire: function() {
+				self.fireWith( this, arguments );
+				return this;
+			},
+			// To know if the callbacks have already been called at least once
+			fired: function() {
+				return !!fired;
+			}
+		};
+
+	return self;
+};
+jQuery.extend({
+
+	Deferred: function( func ) {
+		var tuples = [
+				// action, add listener, listener list, final state
+				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
+				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
+				[ "notify", "progress", jQuery.Callbacks("memory") ]
+			],
+			state = "pending",
+			promise = {
+				state: function() {
+					return state;
+				},
+				always: function() {
+					deferred.done( arguments ).fail( arguments );
+					return this;
+				},
+				then: function( /* fnDone, fnFail, fnProgress */ ) {
+					var fns = arguments;
+					return jQuery.Deferred(function( newDefer ) {
+						jQuery.each( tuples, function( i, tuple ) {
+							var action = tuple[ 0 ],
+								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
+							// deferred[ done | fail | progress ] for forwarding actions to newDefer
+							deferred[ tuple[1] ](function() {
+								var returned = fn && fn.apply( this, arguments );
+								if ( returned && jQuery.isFunction( returned.promise ) ) {
+									returned.promise()
+										.done( newDefer.resolve )
+										.fail( newDefer.reject )
+										.progress( newDefer.notify );
+								} else {
+									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
+								}
+							});
+						});
+						fns = null;
+					}).promise();
+				},
+				// Get a promise for this deferred
+				// If obj is provided, the promise aspect is added to the object
+				promise: function( obj ) {
+					return obj != null ? jQuery.extend( obj, promise ) : promise;
+				}
+			},
+			deferred = {};
+
+		// Keep pipe for back-compat
+		promise.pipe = promise.then;
+
+		// Add list-specific methods
+		jQuery.each( tuples, function( i, tuple ) {
+			var list = tuple[ 2 ],
+				stateString = tuple[ 3 ];
+
+			// promise[ done | fail | progress ] = list.add
+			promise[ tuple[1] ] = list.add;
+
+			// Handle state
+			if ( stateString ) {
+				list.add(function() {
+					// state = [ resolved | rejected ]
+					state = stateString;
+
+				// [ reject_list | resolve_list ].disable; progress_list.lock
+				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
+			}
+
+			// deferred[ resolve | reject | notify ]
+			deferred[ tuple[0] ] = function() {
+				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
+				return this;
+			};
+			deferred[ tuple[0] + "With" ] = list.fireWith;
+		});
+
+		// Make the deferred a promise
+		promise.promise( deferred );
+
+		// Call given func if any
+		if ( func ) {
+			func.call( deferred, deferred );
+		}
+
+		// All done!
+		return deferred;
+	},
+
+	// Deferred helper
+	when: function( subordinate /* , ..., subordinateN */ ) {
+		var i = 0,
+			resolveValues = core_slice.call( arguments ),
+			length = resolveValues.length,
+
+			// the count of uncompleted subordinates
+			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
+
+			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
+			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
+
+			// Update function for both resolve and progress values
+			updateFunc = function( i, contexts, values ) {
+				return function( value ) {
+					contexts[ i ] = this;
+					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
+					if( values === progressValues ) {
+						deferred.notifyWith( contexts, values );
+					} else if ( !( --remaining ) ) {
+						deferred.resolveWith( contexts, values );
+					}
+				};
+			},
+
+			progressValues, progressContexts, resolveContexts;
+
+		// add listeners to Deferred subordinates; treat others as resolved
+		if ( length > 1 ) {
+			progressValues = new Array( length );
+			progressContexts = new Array( length );
+			resolveContexts = new Array( length );
+			for ( ; i < length; i++ ) {
+				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
+					resolveValues[ i ].promise()
+						.done( updateFunc( i, resolveContexts, resolveValues ) )
+						.fail( deferred.reject )
+						.progress( updateFunc( i, progressContexts, progressValues ) );
+				} else {
+					--remaining;
+				}
+			}
+		}
+
+		// if we're not waiting on anything, resolve the master
+		if ( !remaining ) {
+			deferred.resolveWith( resolveContexts, resolveValues );
+		}
+
+		return deferred.promise();
+	}
+});
+jQuery.support = (function( support ) {
+	var input = document.createElement("input"),
+		fragment = document.createDocumentFragment(),
+		div = document.createElement("div"),
+		select = document.createElement("select"),
+		opt = select.appendChild( document.createElement("option") );
+
+	// Finish early in limited environments
+	if ( !input.type ) {
+		return support;
+	}
+
+	input.type = "checkbox";
+
+	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
+	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
+	support.checkOn = input.value !== "";
+
+	// Must access the parent to make an option select properly
+	// Support: IE9, IE10
+	support.optSelected = opt.selected;
+
+	// Will be defined later
+	support.reliableMarginRight = true;
+	support.boxSizingReliable = true;
+	support.pixelPosition = false;
+
+	// Make sure checked status is properly cloned
+	// Support: IE9, IE10
+	input.checked = true;
+	support.noCloneChecked = input.cloneNode( true ).checked;
+
+	// Make sure that the options inside disabled selects aren't marked as disabled
+	// (WebKit marks them as disabled)
+	select.disabled = true;
+	support.optDisabled = !opt.disabled;
+
+	// Check if an input maintains its value after becoming a radio
+	// Support: IE9, IE10
+	input = document.createElement("input");
+	input.value = "t";
+	input.type = "radio";
+	support.radioValue = input.value === "t";
+
+	// #11217 - WebKit loses check when the name is after the checked attribute
+	input.setAttribute( "checked", "t" );
+	input.setAttribute( "name", "t" );
+
+	fragment.appendChild( input );
+
+	// Support: Safari 5.1, Android 4.x, Android 2.3
+	// old WebKit doesn't clone checked state correctly in fragments
+	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;
+
+	// Support: Firefox, Chrome, Safari
+	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
+	support.focusinBubbles = "onfocusin" in window;
+
+	div.style.backgroundClip = "content-box";
+	div.cloneNode( true ).style.backgroundClip = "";
+	support.clearCloneStyle = div.style.backgroundClip === "content-box";
+
+	// Run tests that need a body at doc ready
+	jQuery(function() {
+		var container, marginDiv,
+			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
+			divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
+			body = document.getElementsByTagName("body")[ 0 ];
+
+		if ( !body ) {
+			// Return for frameset docs that don't have a body
+			return;
+		}
+
+		container = document.createElement("div");
+		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
+
+		// Check box-sizing and margin behavior.
+		body.appendChild( container ).appendChild( div );
+		div.innerHTML = "";
+		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
+		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";
+
+		// Workaround failing boxSizing test due to offsetWidth returning wrong value
+		// with some non-1 values of body zoom, ticket #13543
+		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
+			support.boxSizing = div.offsetWidth === 4;
+		});
+
+		// Use window.getComputedStyle because jsdom on node.js will break without it.
+		if ( window.getComputedStyle ) {
+			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
+			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
+
+			// Support: Android 2.3
+			// Check if div with explicit width and no margin-right incorrectly
+			// gets computed margin-right based on width of container. (#3333)
+			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
+			marginDiv = div.appendChild( document.createElement("div") );
+			marginDiv.style.cssText = div.style.cssText = divReset;
+			marginDiv.style.marginRight = marginDiv.style.width = "0";
+			div.style.width = "1px";
+
+			support.reliableMarginRight =
+				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
+		}
+
+		body.removeChild( container );
+	});
+
+	return support;
+})( {} );
+
+/*
+	Implementation Summary
+
+	1. Enforce API surface and semantic compatibility with 1.9.x branch
+	2. Improve the module's maintainability by reducing the storage
+		paths to a single mechanism.
+	3. Use the same single mechanism to support "private" and "user" data.
+	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
+	5. Avoid exposing implementation details on user objects (eg. expando properties)
+	6. Provide a clear path for implementation upgrade to WeakMap in 2014
+*/
+var data_user, data_priv,
+	rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
+	rmultiDash = /([A-Z])/g;
+
+function Data() {
+	// Support: Android < 4,
+	// Old WebKit does not have Object.preventExtensions/freeze method,
+	// return new empty object instead with no [[set]] accessor
+	Object.defineProperty( this.cache = {}, 0, {
+		get: function() {
+			return {};
+		}
+	});
+
+	this.expando = jQuery.expando + Math.random();
+}
+
+Data.uid = 1;
+
+Data.accepts = function( owner ) {
+	// Accepts only:
+	//  - Node
+	//    - Node.ELEMENT_NODE
+	//    - Node.DOCUMENT_NODE
+	//  - Object
+	//    - Any
+	return owner.nodeType ?
+		owner.nodeType === 1 || owner.nodeType === 9 : true;
+};
+
+Data.prototype = {
+	key: function( owner ) {
+		// We can accept data for non-element nodes in modern browsers,
+		// but we should not, see #8335.
+		// Always return the key for a frozen object.
+		if ( !Data.accepts( owner ) ) {
+			return 0;
+		}
+
+		var descriptor = {},
+			// Check if the owner object already has a cache key
+			unlock = owner[ this.expando ];
+
+		// If not, create one
+		if ( !unlock ) {
+			unlock = Data.uid++;
+
+			// Secure it in a non-enumerable, non-writable property
+			try {
+				descriptor[ this.expando ] = { value: unlock };
+				Object.defineProperties( owner, descriptor );
+
+			// Support: Android < 4
+			// Fallback to a less secure definition
+			} catch ( e ) {
+				descriptor[ this.expando ] = unlock;
+				jQuery.extend( owner, descriptor );
+			}
+		}
+
+		// Ensure the cache object
+		if ( !this.cache[ unlock ] ) {
+			this.cache[ unlock ] = {};
+		}
+
+		return unlock;
+	},
+	set: function( owner, data, value ) {
+		var prop,
+			// There may be an unlock assigned to this node,
+			// if there is no entry for this "owner", create one inline
+			// and set the unlock as though an owner entry had always existed
+			unlock = this.key( owner ),
+			cache = this.cache[ unlock ];
+
+		// Handle: [ owner, key, value ] args
+		if ( typeof data === "string" ) {
+			cache[ data ] = value;
+
+		// Handle: [ owner, { properties } ] args
+		} else {
+			// Fresh assignments by object are shallow copied
+			if ( jQuery.isEmptyObject( cache ) ) {
+				jQuery.extend( this.cache[ unlock ], data );
+			// Otherwise, copy the properties one-by-one to the cache object
+			} else {
+				for ( prop in data ) {
+					cache[ prop ] = data[ prop ];
+				}
+			}
+		}
+		return cache;
+	},
+	get: function( owner, key ) {
+		// Either a valid cache is found, or will be created.
+		// New caches will be created and the unlock returned,
+		// allowing direct access to the newly created
+		// empty data object. A valid owner object must be provided.
+		var cache = this.cache[ this.key( owner ) ];
+
+		return key === undefined ?
+			cache : cache[ key ];
+	},
+	access: function( owner, key, value ) {
+		// In cases where either:
+		//
+		//   1. No key was specified
+		//   2. A string key was specified, but no value provided
+		//
+		// Take the "read" path and allow the get method to determine
+		// which value to return, respectively either:
+		//
+		//   1. The entire cache object
+		//   2. The data stored at the key
+		//
+		if ( key === undefined ||
+				((key && typeof key === "string") && value === undefined) ) {
+			return this.get( owner, key );
+		}
+
+		// [*]When the key is not a string, or both a key and value
+		// are specified, set or extend (existing objects) with either:
+		//
+		//   1. An object of properties
+		//   2. A key and value
+		//
+		this.set( owner, key, value );
+
+		// Since the "set" path can have two possible entry points
+		// return the expected data based on which path was taken[*]
+		return value !== undefined ? value : key;
+	},
+	remove: function( owner, key ) {
+		var i, name, camel,
+			unlock = this.key( owner ),
+			cache = this.cache[ unlock ];
+
+		if ( key === undefined ) {
+			this.cache[ unlock ] = {};
+
+		} else {
+			// Support array or space separated string of keys
+			if ( jQuery.isArray( key ) ) {
+				// If "name" is an array of keys...
+				// When data is initially created, via ("key", "val") signature,
+				// keys will be converted to camelCase.
+				// Since there is no way to tell _how_ a key was added, remove
+				// both plain key and camelCase key. #12786
+				// This will only penalize the array argument path.
+				name = key.concat( key.map( jQuery.camelCase ) );
+			} else {
+				camel = jQuery.camelCase( key );
+				// Try the string as a key before any manipulation
+				if ( key in cache ) {
+					name = [ key, camel ];
+				} else {
+					// If a key with the spaces exists, use it.
+					// Otherwise, create an array by matching non-whitespace
+					name = camel;
+					name = name in cache ?
+						[ name ] : ( name.match( core_rnotwhite ) || [] );
+				}
+			}
+
+			i = name.length;
+			while ( i-- ) {
+				delete cache[ name[ i ] ];
+			}
+		}
+	},
+	hasData: function( owner ) {
+		return !jQuery.isEmptyObject(
+			this.cache[ owner[ this.expando ] ] || {}
+		);
+	},
+	discard: function( owner ) {
+		if ( owner[ this.expando ] ) {
+			delete this.cache[ owner[ this.expando ] ];
+		}
+	}
+};
+
+// These may be used throughout the jQuery core codebase
+data_user = new Data();
+data_priv = new Data();
+
+
+jQuery.extend({
+	acceptData: Data.accepts,
+
+	hasData: function( elem ) {
+		return data_user.hasData( elem ) || data_priv.hasData( elem );
+	},
+
+	data: function( elem, name, data ) {
+		return data_user.access( elem, name, data );
+	},
+
+	removeData: function( elem, name ) {
+		data_user.remove( elem, name );
+	},
+
+	// TODO: Now that all calls to _data and _removeData have been replaced
+	// with direct calls to data_priv methods, these can be deprecated.
+	_data: function( elem, name, data ) {
+		return data_priv.access( elem, name, data );
+	},
+
+	_removeData: function( elem, name ) {
+		data_priv.remove( elem, name );
+	}
+});
+
+jQuery.fn.extend({
+	data: function( key, value ) {
+		var attrs, name,
+			elem = this[ 0 ],
+			i = 0,
+			data = null;
+
+		// Gets all values
+		if ( key === undefined ) {
+			if ( this.length ) {
+				data = data_user.get( elem );
+
+				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
+					attrs = elem.attributes;
+					for ( ; i < attrs.length; i++ ) {
+						name = attrs[ i ].name;
+
+						if ( name.indexOf( "data-" ) === 0 ) {
+							name = jQuery.camelCase( name.slice(5) );
+							dataAttr( elem, name, data[ name ] );
+						}
+					}
+					data_priv.set( elem, "hasDataAttrs", true );
+				}
+			}
+
+			return data;
+		}
+
+		// Sets multiple values
+		if ( typeof key === "object" ) {
+			return this.each(function() {
+				data_user.set( this, key );
+			});
+		}
+
+		return jQuery.access( this, function( value ) {
+			var data,
+				camelKey = jQuery.camelCase( key );
+
+			// The calling jQuery object (element matches) is not empty
+			// (and therefore has an element appears at this[ 0 ]) and the
+			// `value` parameter was not undefined. An empty jQuery object
+			// will result in `undefined` for elem = this[ 0 ] which will
+			// throw an exception if an attempt to read a data cache is made.
+			if ( elem && value === undefined ) {
+				// Attempt to get data from the cache
+				// with the key as-is
+				data = data_user.get( elem, key );
+				if ( data !== undefined ) {
+					return data;
+				}
+
+				// Attempt to get data from the cache
+				// with the key camelized
+				data = data_user.get( elem, camelKey );
+				if ( data !== undefined ) {
+					return data;
+				}
+
+				// Attempt to "discover" the data in
+				// HTML5 custom data-* attrs
+				data = dataAttr( elem, camelKey, undefined );
+				if ( data !== undefined ) {
+					return data;
+				}
+
+				// We tried really hard, but the data doesn't exist.
+				return;
+			}
+
+			// Set the data...
+			this.each(function() {
+				// First, attempt to store a copy or reference of any
+				// data that might've been store with a camelCased key.
+				var data = data_user.get( this, camelKey );
+
+				// For HTML5 data-* attribute interop, we have to
+				// store property names with dashes in a camelCase form.
+				// This might not apply to all properties...*
+				data_user.set( this, camelKey, value );
+
+				// *... In the case of properties that might _actually_
+				// have dashes, we need to also store a copy of that
+				// unchanged property.
+				if ( key.indexOf("-") !== -1 && data !== undefined ) {
+					data_user.set( this, key, value );
+				}
+			});
+		}, null, value, arguments.length > 1, null, true );
+	},
+
+	removeData: function( key ) {
+		return this.each(function() {
+			data_user.remove( this, key );
+		});
+	}
+});
+
+function dataAttr( elem, key, data ) {
+	var name;
+
+	// If nothing was found internally, try to fetch any
+	// data from the HTML5 data-* attribute
+	if ( data === undefined && elem.nodeType === 1 ) {
+		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
+		data = elem.getAttribute( name );
+
+		if ( typeof data === "string" ) {
+			try {
+				data = data === "true" ? true :
+					data === "false" ? false :
+					data === "null" ? null :
+					// Only convert to a number if it doesn't change the string
+					+data + "" === data ? +data :
+					rbrace.test( data ) ? JSON.parse( data ) :
+					data;
+			} catch( e ) {}
+
+			// Make sure we set the data so it isn't changed later
+			data_user.set( elem, key, data );
+		} else {
+			data = undefined;
+		}
+	}
+	return data;
+}
+jQuery.extend({
+	queue: function( elem, type, data ) {
+		var queue;
+
+		if ( elem ) {
+			type = ( type || "fx" ) + "queue";
+			queue = data_priv.get( elem, type );
+
+			// Speed up dequeue by getting out quickly if this is just a lookup
+			if ( data ) {
+				if ( !queue || jQuery.isArray( data ) ) {
+					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
+				} else {
+					queue.push( data );
+				}
+			}
+			return queue || [];
+		}
+	},
+
+	dequeue: function( elem, type ) {
+		type = type || "fx";
+
+		var queue = jQuery.queue( elem, type ),
+			startLength = queue.length,
+			fn = queue.shift(),
+			hooks = jQuery._queueHooks( elem, type ),
+			next = function() {
+				jQuery.dequeue( elem, type );
+			};
+
+		// If the fx queue is dequeued, always remove the progress sentinel
+		if ( fn === "inprogress" ) {
+			fn = queue.shift();
+			startLength--;
+		}
+
+		if ( fn ) {
+
+			// Add a progress sentinel to prevent the fx queue from being
+			// automatically dequeued
+			if ( type === "fx" ) {
+				queue.unshift( "inprogress" );
+			}
+
+			// clear up the last queue stop function
+			delete hooks.stop;
+			fn.call( elem, next, hooks );
+		}
+
+		if ( !startLength && hooks ) {
+			hooks.empty.fire();
+		}
+	},
+
+	// not intended for public consumption - generates a queueHooks object, or returns the current one
+	_queueHooks: function( elem, type ) {
+		var key = type + "queueHooks";
+		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
+			empty: jQuery.Callbacks("once memory").add(function() {
+				data_priv.remove( elem, [ type + "queue", key ] );
+			})
+		});
+	}
+});
+
+jQuery.fn.extend({
+	queue: function( type, data ) {
+		var setter = 2;
+
+		if ( typeof type !== "string" ) {
+			data = type;
+			type = "fx";
+			setter--;
+		}
+
+		if ( arguments.length < setter ) {
+			return jQuery.queue( this[0], type );
+		}
+
+		return data === undefined ?
+			this :
+			this.each(function() {
+				var queue = jQuery.queue( this, type, data );
+
+				// ensure a hooks for this queue
+				jQuery._queueHooks( this, type );
+
+				if ( type === "fx" && queue[0] !== "inprogress" ) {
+					jQuery.dequeue( this, type );
+				}
+			});
+	},
+	dequeue: function( type ) {
+		return this.each(function() {
+			jQuery.dequeue( this, type );
+		});
+	},
+	// Based off of the plugin by Clint Helfers, with permission.
+	// http://blindsignals.com/index.php/2009/07/jquery-delay/
+	delay: function( time, type ) {
+		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
+		type = type || "fx";
+
+		return this.queue( type, function( next, hooks ) {
+			var timeout = setTimeout( next, time );
+			hooks.stop = function() {
+				clearTimeout( timeout );
+			};
+		});
+	},
+	clearQueue: function( type ) {
+		return this.queue( type || "fx", [] );
+	},
+	// Get a promise resolved when queues of a certain type
+	// are emptied (fx is the type by default)
+	promise: function( type, obj ) {
+		var tmp,
+			count = 1,
+			defer = jQuery.Deferred(),
+			elements = this,
+			i = this.length,
+			resolve = function() {
+				if ( !( --count ) ) {
+					defer.resolveWith( elements, [ elements ] );
+				}
+			};
+
+		if ( typeof type !== "string" ) {
+			obj = type;
+			type = undefined;
+		}
+		type = type || "fx";
+
+		while( i-- ) {
+			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
+			if ( tmp && tmp.empty ) {
+				count++;
+				tmp.empty.add( resolve );
+			}
+		}
+		resolve();
+		return defer.promise( obj );
+	}
+});
+var nodeHook, boolHook,
+	rclass = /[\t\r\n\f]/g,
+	rreturn = /\r/g,
+	rfocusable = /^(?:input|select|textarea|button)$/i;
+
+jQuery.fn.extend({
+	attr: function( name, value ) {
+		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
+	},
+
+	removeAttr: function( name ) {
+		return this.each(function() {
+			jQuery.removeAttr( this, name );
+		});
+	},
+
+	prop: function( name, value ) {
+		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
+	},
+
+	removeProp: function( name ) {
+		return this.each(function() {
+			delete this[ jQuery.propFix[ name ] || name ];
+		});
+	},
+
+	addClass: function( value ) {
+		var classes, elem, cur, clazz, j,
+			i = 0,
+			len = this.length,
+			proceed = typeof value === "string" && value;
+
+		if ( jQuery.isFunction( value ) ) {
+			return this.each(function( j ) {
+				jQuery( this ).addClass( value.call( this, j, this.className ) );
+			});
+		}
+
+		if ( proceed ) {
+			// The disjunction here is for better compressibility (see removeClass)
+			classes = ( value || "" ).match( core_rnotwhite ) || [];
+
+			for ( ; i < len; i++ ) {
+				elem = this[ i ];
+				cur = elem.nodeType === 1 && ( elem.className ?
+					( " " + elem.className + " " ).replace( rclass, " " ) :
+					" "
+				);
+
+				if ( cur ) {
+					j = 0;
+					while ( (clazz = classes[j++]) ) {
+						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
+							cur += clazz + " ";
+						}
+					}
+					elem.className = jQuery.trim( cur );
+
+				}
+			}
+		}
+
+		return this;
+	},
+
+	removeClass: function( value ) {
+		var classes, elem, cur, clazz, j,
+			i = 0,
+			len = this.length,
+			proceed = arguments.length === 0 || typeof value === "string" && value;
+
+		if ( jQuery.isFunction( value ) ) {
+			return this.each(function( j ) {
+				jQuery( this ).removeClass( value.call( this, j, this.className ) );
+			});
+		}
+		if ( proceed ) {
+			classes = ( value || "" ).match( core_rnotwhite ) || [];
+
+			for ( ; i < len; i++ ) {
+				elem = this[ i ];
+				// This expression is here for better compressibility (see addClass)
+				cur = elem.nodeType === 1 && ( elem.className ?
+					( " " + elem.className + " " ).replace( rclass, " " ) :
+					""
+				);
+
+				if ( cur ) {
+					j = 0;
+					while ( (clazz = classes[j++]) ) {
+						// Remove *all* instances
+						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
+							cur = cur.replace( " " + clazz + " ", " " );
+						}
+					}
+					elem.className = value ? jQuery.trim( cur ) : "";
+				}
+			}
+		}
+
+		return this;
+	},
+
+	toggleClass: function( value, stateVal ) {
+		var type = typeof value,
+			isBool = typeof stateVal === "boolean";
+
+		if ( jQuery.isFunction( value ) ) {
+			return this.each(function( i ) {
+				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
+			});
+		}
+
+		return this.each(function() {
+			if ( type === "string" ) {
+				// toggle individual class names
+				var className,
+					i = 0,
+					self = jQuery( this ),
+					state = stateVal,
+					classNames = value.match( core_rnotwhite ) || [];
+
+				while ( (className = classNames[ i++ ]) ) {
+					// check each className given, space separated list
+					state = isBool ? state : !self.hasClass( className );
+					self[ state ? "addClass" : "removeClass" ]( className );
+				}
+
+			// Toggle whole class name
+			} else if ( type === core_strundefined || type === "boolean" ) {
+				if ( this.className ) {
+					// store className if set
+					data_priv.set( this, "__className__", this.className );
+				}
+
+				// If the element has a class name or if we're passed "false",
+				// then remove the whole classname (if there was one, the above saved it).
+				// Otherwise bring back whatever was previously saved (if anything),
+				// falling back to the empty string if nothing was stored.
+				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
+			}
+		});
+	},
+
+	hasClass: function( selector ) {
+		var className = " " + selector + " ",
+			i = 0,
+			l = this.length;
+		for ( ; i < l; i++ ) {
+			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
+				return true;
+			}
+		}
+
+		return false;
+	},
+
+	val: function( value ) {
+		var hooks, ret, isFunction,
+			elem = this[0];
+
+		if ( !arguments.length ) {
+			if ( elem ) {
+				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];
+
+				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
+					return ret;
+				}
+
+				ret = elem.value;
+
+				return typeof ret === "string" ?
+					// handle most common string cases
+					ret.replace(rreturn, "") :
+					// handle cases where value is null/undef or number
+					ret == null ? "" : ret;
+			}
+
+			return;
+		}
+
+		isFunction = jQuery.isFunction( value );
+
+		return this.each(function( i ) {
+			var val;
+
+			if ( this.nodeType !== 1 ) {
+				return;
+			}
+
+			if ( isFunction ) {
+				val = value.call( this, i, jQuery( this ).val() );
+			} else {
+				val = value;
+			}
+
+			// Treat null/undefined as ""; convert numbers to string
+			if ( val == null ) {
+				val = "";
+			} else if ( typeof val === "number" ) {
+				val += "";
+			} else if ( jQuery.isArray( val ) ) {
+				val = jQuery.map(val, function ( value ) {
+					return value == null ? "" : value + "";
+				});
+			}
+
+			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
+
+			// If set returns undefined, fall back to normal setting
+			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
+				this.value = val;
+			}
+		});
+	}
+});
+
+jQuery.extend({
+	valHooks: {
+		option: {
+			get: function( elem ) {
+				// attributes.value is undefined in Blackberry 4.7 but
+				// uses .value. See #6932
+				var val = elem.attributes.value;
+				return !val || val.specified ? elem.value : elem.text;
+			}
+		},
+		select: {
+			get: function( elem ) {
+				var value, option,
+					options = elem.options,
+					index = elem.selectedIndex,
+					one = elem.type === "select-one" || index < 0,
+					values = one ? null : [],
+					max = one ? index + 1 : options.length,
+					i = index < 0 ?
+						max :
+						one ? index : 0;
+
+				// Loop through all the selected options
+				for ( ; i < max; i++ ) {
+					option = options[ i ];
+
+					// IE6-9 doesn't update selected after form reset (#2551)
+					if ( ( option.selected || i === index ) &&
+							// Don't return options that are disabled or in a disabled optgroup
+							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
+							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
+
+						// Get the specific value for the option
+						value = jQuery( option ).val();
+
+						// We don't need an array for one selects
+						if ( one ) {
+							return value;
+						}
+
+						// Multi-Selects return an array
+						values.push( value );
+					}
+				}
+
+				return values;
+			},
+
+			set: function( elem, value ) {
+				var optionSet, option,
+					options = elem.options,
+					values = jQuery.makeArray( value ),
+					i = options.length;
+
+				while ( i-- ) {
+					option = options[ i ];
+					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
+						optionSet = true;
+					}
+				}
+
+				// force browsers to behave consistently when non-matching value is set
+				if ( !optionSet ) {
+					elem.selectedIndex = -1;
+				}
+				return values;
+			}
+		}
+	},
+
+	attr: function( elem, name, value ) {
+		var hooks, ret,
+			nType = elem.nodeType;
+
+		// don't get/set attributes on text, comment and attribute nodes
+		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
+			return;
+		}
+
+		// Fallback to prop when attributes are not supported
+		if ( typeof elem.getAttribute === core_strundefined ) {
+			return jQuery.prop( elem, name, value );
+		}
+
+		// All attributes are lowercase
+		// Grab necessary hook if one is defined
+		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
+			name = name.toLowerCase();
+			hooks = jQuery.attrHooks[ name ] ||
+				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
+		}
+
+		if ( value !== undefined ) {
+
+			if ( value === null ) {
+				jQuery.removeAttr( elem, name );
+
+			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
+				return ret;
+
+			} else {
+				elem.setAttribute( name, value + "" );
+				return value;
+			}
+
+		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
+			return ret;
+
+		} else {
+			ret = jQuery.find.attr( elem, name );
+
+			// Non-existent attributes return null, we normalize to undefined
+			return ret == null ?
+				undefined :
+				ret;
+		}
+	},
+
+	removeAttr: function( elem, value ) {
+		var name, propName,
+			i = 0,
+			attrNames = value && value.match( core_rnotwhite );
+
+		if ( attrNames && elem.nodeType === 1 ) {
+			while ( (name = attrNames[i++]) ) {
+				propName = jQuery.propFix[ name ] || name;
+
+				// Boolean attributes get special treatment (#10870)
+				if ( jQuery.expr.match.bool.test( name ) ) {
+					// Set corresponding property to false
+					elem[ propName ] = false;
+				}
+
+				elem.removeAttribute( name );
+			}
+		}
+	},
+
+	attrHooks: {
+		type: {
+			set: function( elem, value ) {
+				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
+					// Setting the type on a radio button after the value resets the value in IE6-9
+					// Reset value to default in case type is set after value during creation
+					var val = elem.value;
+					elem.setAttribute( "type", value );
+					if ( val ) {
+						elem.value = val;
+					}
+					return value;
+				}
+			}
+		}
+	},
+
+	propFix: {
+		"for": "htmlFor",
+		"class": "className"
+	},
+
+	prop: function( elem, name, value ) {
+		var ret, hooks, notxml,
+			nType = elem.nodeType;
+
+		// don't get/set properties on text, comment and attribute nodes
+		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
+			return;
+		}
+
+		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
+
+		if ( notxml ) {
+			// Fix name and attach hooks
+			name = jQuery.propFix[ name ] || name;
+			hooks = jQuery.propHooks[ name ];
+		}
+
+		if ( value !== undefined ) {
+			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
+				ret :
+				( elem[ name ] = value );
+
+		} else {
+			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
+				ret :
+				elem[ name ];
+		}
+	},
+
+	propHooks: {
+		tabIndex: {
+			get: function( elem ) {
+				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
+					elem.tabIndex :
+					-1;
+			}
+		}
+	}
+});
+
+// Hooks for boolean attributes
+boolHook = {
+	set: function( elem, value, name ) {
+		if ( value === false ) {
+			// Remove boolean attributes when set to false
+			jQuery.removeAttr( elem, name );
+		} else {
+			elem.setAttribute( name, name );
+		}
+		return name;
+	}
+};
+jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
+	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;
+
+	jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ) {
+		var fn = jQuery.expr.attrHandle[ name ],
+			ret = isXML ?
+				undefined :
+				/* jshint eqeqeq: false */
+				// Temporarily disable this handler to check existence
+				(jQuery.expr.attrHandle[ name ] = undefined) !=
+					getter( elem, name, isXML ) ?
+
+					name.toLowerCase() :
+					null;
+
+		// Restore handler
+		jQuery.expr.attrHandle[ name ] = fn;
+
+		return ret;
+	};
+});
+
+// Support: IE9+
+// Selectedness for an option in an optgroup can be inaccurate
+if ( !jQuery.support.optSelected ) {
+	jQuery.propHooks.selected = {
+		get: function( elem ) {
+			var parent = elem.parentNode;
+			if ( parent && parent.parentNode ) {
+				parent.parentNode.selectedIndex;
+			}
+			return null;
+		}
+	};
+}
+
+jQuery.each([
+	"tabIndex",
+	"readOnly",
+	"maxLength",
+	"cellSpacing",
+	"cellPadding",
+	"rowSpan",
+	"colSpan",
+	"useMap",
+	"frameBorder",
+	"contentEditable"
+], function() {
+	jQuery.propFix[ this.toLowerCase() ] = this;
+});
+
+// Radios and checkboxes getter/setter
+jQuery.each([ "radio", "checkbox" ], function() {
+	jQuery.valHooks[ this ] = {
+		set: function( elem, value ) {
+			if ( jQuery.isArray( value ) ) {
+				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
+			}
+		}
+	};
+	if ( !jQuery.support.checkOn ) {
+		jQuery.valHooks[ this ].get = function( elem ) {
+			// Support: Webkit
+			// "" is returned instead of "on" if a value isn't specified
+			return elem.getAttribute("value") === null ? "on" : elem.value;
+		};
+	}
+});
+var rkeyEvent = /^key/,
+	rmouseEvent = /^(?:mouse|contextmenu)|click/,
+	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
+	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
+
+function returnTrue() {
+	return true;
+}
+
+function returnFalse() {
+	return false;
+}
+
+function safeActiveElement() {
+	try {
+		return document.activeElement;
+	} catch ( err ) { }
+}
+
+/*
+ * Helper functions for managing events -- not part of the public interface.
+ * Props to Dean Edwards' addEvent library for many of the ideas.
+ */
+jQuery.event = {
+
+	global: {},
+
+	add: function( elem, types, handler, data, selector ) {
+
+		var handleObjIn, eventHandle, tmp,
+			events, t, handleObj,
+			special, handlers, type, namespaces, origType,
+			elemData = data_priv.get( elem );
+
+		// Don't attach events to noData or text/comment nodes (but allow plain objects)
+		if ( !elemData ) {
+			return;
+		}
+
+		// Caller can pass in an object of custom data in lieu of the handler
+		if ( handler.handler ) {
+			handleObjIn = handler;
+			handler = handleObjIn.handler;
+			selector = handleObjIn.selector;
+		}
+
+		// Make sure that the handler has a unique ID, used to find/remove it later
+		if ( !handler.guid ) {
+			handler.guid = jQuery.guid++;
+		}
+
+		// Init the element's event structure and main handler, if this is the first
+		if ( !(events = elemData.events) ) {
+			events = elemData.events = {};
+		}
+		if ( !(eventHandle = elemData.handle) ) {
+			eventHandle = elemData.handle = function( e ) {
+				// Discard the second event of a jQuery.event.trigger() and
+				// when an event is called after a page has unloaded
+				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
+					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
+					undefined;
+			};
+			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
+			eventHandle.elem = elem;
+		}
+
+		// Handle multiple events separated by a space
+		types = ( types || "" ).match( core_rnotwhite ) || [""];
+		t = types.length;
+		while ( t-- ) {
+			tmp = rtypenamespace.exec( types[t] ) || [];
+			type = origType = tmp[1];
+			namespaces = ( tmp[2] || "" ).split( "." ).sort();
+
+			// There *must* be a type, no attaching namespace-only handlers
+			if ( !type ) {
+				continue;
+			}
+
+			// If event changes its type, use the special event handlers for the changed type
+			special = jQuery.event.special[ type ] || {};
+
+			// If selector defined, determine special event api type, otherwise given type
+			type = ( selector ? special.delegateType : special.bindType ) || type;
+
+			// Update special based on newly reset type
+			special = jQuery.event.special[ type ] || {};
+
+			// handleObj is passed to all event handlers
+			handleObj = jQuery.extend({
+				type: type,
+				origType: origType,
+				data: data,
+				handler: handler,
+				guid: handler.guid,
+				selector: selector,
+				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
+				namespace: namespaces.join(".")
+			}, handleObjIn );
+
+			// Init the event handler queue if we're the first
+			if ( !(handlers = events[ type ]) ) {
+				handlers = events[ type ] = [];
+				handlers.delegateCount = 0;
+
+				// Only use addEventListener if the special events handler returns false
+				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
+					if ( elem.addEventListener ) {
+						elem.addEventListener( type, eventHandle, false );
+					}
+				}
+			}
+
+			if ( special.add ) {
+				special.add.call( elem, handleObj );
+
+				if ( !handleObj.handler.guid ) {
+					handleObj.handler.guid = handler.guid;
+				}
+			}
+
+			// Add to the element's handler list, delegates in front
+			if ( selector ) {
+				handlers.splice( handlers.delegateCount++, 0, handleObj );
+			} else {
+				handlers.push( handleObj );
+			}
+
+			// Keep track of which events have ever been used, for event optimization
+			jQuery.event.global[ type ] = true;
+		}
+
+		// Nullify elem to prevent memory leaks in IE
+		elem = null;
+	},
+
+	// Detach an event or set of events from an element
+	remove: function( elem, types, handler, selector, mappedTypes ) {
+
+		var j, origCount, tmp,
+			events, t, handleObj,
+			special, handlers, type, namespaces, origType,
+			elemData = data_priv.hasData( elem ) && data_priv.get( elem );
+
+		if ( !elemData || !(events = elemData.events) ) {
+			return;
+		}
+
+		// Once for each type.namespace in types; type may be omitted
+		types = ( types || "" ).match( core_rnotwhite ) || [""];
+		t = types.length;
+		while ( t-- ) {
+			tmp = rtypenamespace.exec( types[t] ) || [];
+			type = origType = tmp[1];
+			namespaces = ( tmp[2] || "" ).split( "." ).sort();
+
+			// Unbind all events (on this namespace, if provided) for the element
+			if ( !type ) {
+				for ( type in events ) {
+					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
+				}
+				continue;
+			}
+
+			special = jQuery.event.special[ type ] || {};
+			type = ( selector ? special.delegateType : special.bindType ) || type;
+			handlers = events[ type ] || [];
+			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );
+
+			// Remove matching events
+			origCount = j = handlers.length;
+			while ( j-- ) {
+				handleObj = handlers[ j ];
+
+				if ( ( mappedTypes || origType === handleObj.origType ) &&
+					( !handler || handler.guid === handleObj.guid ) &&
+					( !tmp || tmp.test( handleObj.namespace ) ) &&
+					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
+					handlers.splice( j, 1 );
+
+					if ( handleObj.selector ) {
+						handlers.delegateCount--;
+					}
+					if ( special.remove ) {
+						special.remove.call( elem, handleObj );
+					}
+				}
+			}
+
+			// Remove generic event handler if we removed something and no more handlers exist
+			// (avoids potential for endless recursion during removal of special event handlers)
+			if ( origCount && !handlers.length ) {
+				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
+					jQuery.removeEvent( elem, type, elemData.handle );
+				}
+
+				delete events[ type ];
+			}
+		}
+
+		// Remove the expando if it's no longer used
+		if ( jQuery.isEmptyObject( events ) ) {
+			delete elemData.handle;
+			data_priv.remove( elem, "events" );
+		}
+	},
+
+	trigger: function( event, data, elem, onlyHandlers ) {
+
+		var i, cur, tmp, bubbleType, ontype, handle, special,
+			eventPath = [ elem || document ],
+			type = core_hasOwn.call( event, "type" ) ? event.type : event,
+			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];
+
+		cur = tmp = elem = elem || document;
+
+		// Don't do events on text and comment nodes
+		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
+			return;
+		}
+
+		// focus/blur morphs to focusin/out; ensure we're not firing them right now
+		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
+			return;
+		}
+
+		if ( type.indexOf(".") >= 0 ) {
+			// Namespaced trigger; create a regexp to match event type in handle()
+			namespaces = type.split(".");
+			type = namespaces.shift();
+			namespaces.sort();
+		}
+		ontype = type.indexOf(":") < 0 && "on" + type;
+
+		// Caller can pass in a jQuery.Event object, Object, or just an event type string
+		event = event[ jQuery.expando ] ?
+			event :
+			new jQuery.Event( type, typeof event === "object" && event );
+
+		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
+		event.isTrigger = onlyHandlers ? 2 : 3;
+		event.namespace = namespaces.join(".");
+		event.namespace_re = event.namespace ?
+			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
+			null;
+
+		// Clean up the event in case it is being reused
+		event.result = undefined;
+		if ( !event.target ) {
+			event.target = elem;
+		}
+
+		// Clone any incoming data and prepend the event, creating the handler arg list
+		data = data == null ?
+			[ event ] :
+			jQuery.makeArray( data, [ event ] );
+
+		// Allow special events to draw outside the lines
+		special = jQuery.event.special[ type ] || {};
+		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
+			return;
+		}
+
+		// Determine event propagation path in advance, per W3C events spec (#9951)
+		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
+		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
+
+			bubbleType = special.delegateType || type;
+			if ( !rfocusMorph.test( bubbleType + type ) ) {
+				cur = cur.parentNode;
+			}
+			for ( ; cur; cur = cur.parentNode ) {
+				eventPath.push( cur );
+				tmp = cur;
+			}
+
+			// Only add window if we got to document (e.g., not plain obj or detached DOM)
+			if ( tmp === (elem.ownerDocument || document) ) {
+				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
+			}
+		}
+
+		// Fire handlers on the event path
+		i = 0;
+		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {
+
+			event.type = i > 1 ?
+				bubbleType :
+				special.bindType || type;
+
+			// jQuery handler
+			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
+			if ( handle ) {
+				handle.apply( cur, data );
+			}
+
+			// Native handler
+			handle = ontype && cur[ ontype ];
+			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
+				event.preventDefault();
+			}
+		}
+		event.type = type;
+
+		// If nobody prevented the default action, do it now
+		if ( !onlyHandlers && !event.isDefaultPrevented() ) {
+
+			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
+				jQuery.acceptData( elem ) ) {
+
+				// Call a native DOM method on the target with the same name name as the event.
+				// Don't do default actions on window, that's where global variables be (#6170)
+				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
+
+					// Don't re-trigger an onFOO event when we call its FOO() method
+					tmp = elem[ ontype ];
+
+					if ( tmp ) {
+						elem[ ontype ] = null;
+					}
+
+					// Prevent re-triggering of the same event, since we already bubbled it above
+					jQuery.event.triggered = type;
+					elem[ type ]();
+					jQuery.event.triggered = undefined;
+
+					if ( tmp ) {
+						elem[ ontype ] = tmp;
+					}
+				}
+			}
+		}
+
+		return event.result;
+	},
+
+	dispatch: function( event ) {
+
+		// Make a writable jQuery.Event from the native event object
+		event = jQuery.event.fix( event );
+
+		var i, j, ret, matched, handleObj,
+			handlerQueue = [],
+			args = core_slice.call( arguments ),
+			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
+			special = jQuery.event.special[ event.type ] || {};
+
+		// Use the fix-ed jQuery.Event rather than the (read-only) native event
+		args[0] = event;
+		event.delegateTarget = this;
+
+		// Call the preDispatch hook for the mapped type, and let it bail if desired
+		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
+			return;
+		}
+
+		// Determine handlers
+		handlerQueue = jQuery.event.handlers.call( this, event, handlers );
+
+		// Run delegates first; they may want to stop propagation beneath us
+		i = 0;
+		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
+			event.currentTarget = matched.elem;
+
+			j = 0;
+			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {
+
+				// Triggered event must either 1) have no namespace, or
+				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
+				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {
+
+					event.handleObj = handleObj;
+					event.data = handleObj.data;
+
+					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
+							.apply( matched.elem, args );
+
+					if ( ret !== undefined ) {
+						if ( (event.result = ret) === false ) {
+							event.preventDefault();
+							event.stopPropagation();
+						}
+					}
+				}
+			}
+		}
+
+		// Call the postDispatch hook for the mapped type
+		if ( special.postDispatch ) {
+			special.postDispatch.call( this, event );
+		}
+
+		return event.result;
+	},
+
+	handlers: function( event, handlers ) {
+		var i, matches, sel, handleObj,
+			handlerQueue = [],
+			delegateCount = handlers.delegateCount,
+			cur = event.target;
+
+		// Find delegate handlers
+		// Black-hole SVG <use> instance trees (#13180)
+		// Avoid non-left-click bubbling in Firefox (#3861)
+		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {
+
+			for ( ; cur !== this; cur = cur.parentNode || this ) {
+
+				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
+				if ( cur.disabled !== true || event.type !== "click" ) {
+					matches = [];
+					for ( i = 0; i < delegateCount; i++ ) {
+						handleObj = handlers[ i ];
+
+						// Don't conflict with Object.prototype properties (#13203)
+						sel = handleObj.selector + " ";
+
+						if ( matches[ sel ] === undefined ) {
+							matches[ sel ] = handleObj.needsContext ?
+								jQuery( sel, this ).index( cur ) >= 0 :
+								jQuery.find( sel, this, null, [ cur ] ).length;
+						}
+						if ( matches[ sel ] ) {
+							matches.push( handleObj );
+						}
+					}
+					if ( matches.length ) {
+						handlerQueue.push({ elem: cur, handlers: matches });
+					}
+				}
+			}
+		}
+
+		// Add the remaining (directly-bound) handlers
+		if ( delegateCount < handlers.length ) {
+			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
+		}
+
+		return handlerQueue;
+	},
+
+	// Includes some event props shared by KeyEvent and MouseEvent
+	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
+
+	fixHooks: {},
+
+	keyHooks: {
+		props: "char charCode key keyCode".split(" "),
+		filter: function( event, original ) {
+
+			// Add which for key events
+			if ( event.which == null ) {
+				event.which = original.charCode != null ? original.charCode : original.keyCode;
+			}
+
+			return event;
+		}
+	},
+
+	mouseHooks: {
+		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
+		filter: function( event, original ) {
+			var eventDoc, doc, body,
+				button = original.button;
+
+			// Calculate pageX/Y if missing and clientX/Y available
+			if ( event.pageX == null && original.clientX != null ) {
+				eventDoc = event.target.ownerDocument || document;
+				doc = eventDoc.documentElement;
+				body = eventDoc.body;
+
+				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
+				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
+			}
+
+			// Add which for click: 1 === left; 2 === middle; 3 === right
+			// Note: button is not normalized, so don't use it
+			if ( !event.which && button !== undefined ) {
+				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
+			}
+
+			return event;
+		}
+	},
+
+	fix: function( event ) {
+		if ( event[ jQuery.expando ] ) {
+			return event;
+		}
+
+		// Create a writable copy of the event object and normalize some properties
+		var i, prop, copy,
+			type = event.type,
+			originalEvent = event,
+			fixHook = this.fixHooks[ type ];
+
+		if ( !fixHook ) {
+			this.fixHooks[ type ] = fixHook =
+				rmouseEvent.test( type ) ? this.mouseHooks :
+				rkeyEvent.test( type ) ? this.keyHooks :
+				{};
+		}
+		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
+
+		event = new jQuery.Event( originalEvent );
+
+		i = copy.length;
+		while ( i-- ) {
+			prop = copy[ i ];
+			event[ prop ] = originalEvent[ prop ];
+		}
+
+		// Support: Cordova 2.5 (WebKit) (#13255)
+		// All events should have a target; Cordova deviceready doesn't
+		if ( !event.target ) {
+			event.target = document;
+		}
+
+		// Support: Safari 6.0+, Chrome < 28
+		// Target should not be a text node (#504, #13143)
+		if ( event.target.nodeType === 3 ) {
+			event.target = event.target.parentNode;
+		}
+
+		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
+	},
+
+	special: {
+		load: {
+			// Prevent triggered image.load events from bubbling to window.load
+			noBubble: true
+		},
+		focus: {
+			// Fire native event if possible so blur/focus sequence is correct
+			trigger: function() {
+				if ( this !== safeActiveElement() && this.focus ) {
+					this.focus();
+					return false;
+				}
+			},
+			delegateType: "focusin"
+		},
+		blur: {
+			trigger: function() {
+				if ( this === safeActiveElement() && this.blur ) {
+					this.blur();
+					return false;
+				}
+			},
+			delegateType: "focusout"
+		},
+		click: {
+			// For checkbox, fire native event so checked state will be right
+			trigger: function() {
+				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
+					this.click();
+					return false;
+				}
+			},
+
+			// For cross-browser consistency, don't fire native .click() on links
+			_default: function( event ) {
+				return jQuery.nodeName( event.target, "a" );
+			}
+		},
+
+		beforeunload: {
+			postDispatch: function( event ) {
+
+				// Support: Firefox 20+
+				// Firefox doesn't alert if the returnValue field is not set.
+				if ( event.result !== undefined ) {
+					event.originalEvent.returnValue = event.result;
+				}
+			}
+		}
+	},
+
+	simulate: function( type, elem, event, bubble ) {
+		// Piggyback on a donor event to simulate a different one.
+		// Fake originalEvent to avoid donor's stopPropagation, but if the
+		// simulated event prevents default then we do the same on the donor.
+		var e = jQuery.extend(
+			new jQuery.Event(),
+			event,
+			{
+				type: type,
+				isSimulated: true,
+				originalEvent: {}
+			}
+		);
+		if ( bubble ) {
+			jQuery.event.trigger( e, null, elem );
+		} else {
+			jQuery.event.dispatch.call( elem, e );
+		}
+		if ( e.isDefaultPrevented() ) {
+			event.preventDefault();
+		}
+	}
+};
+
+jQuery.removeEvent = function( elem, type, handle ) {
+	if ( elem.removeEventListener ) {
+		elem.removeEventListener( type, handle, false );
+	}
+};
+
+jQuery.Event = function( src, props ) {
+	// Allow instantiation without the 'new' keyword
+	if ( !(this instanceof jQuery.Event) ) {
+		return new jQuery.Event( src, props );
+	}
+
+	// Event object
+	if ( src && src.type ) {
+		this.originalEvent = src;
+		this.type = src.type;
+
+		// Events bubbling up the document may have been marked as prevented
+		// by a handler lower down the tree; reflect the correct value.
+		this.isDefaultPrevented = ( src.defaultPrevented ||
+			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;
+
+	// Event type
+	} else {
+		this.type = src;
+	}
+
+	// Put explicitly provided properties onto the event object
+	if ( props ) {
+		jQuery.extend( this, props );
+	}
+
+	// Create a timestamp if incoming event doesn't have one
+	this.timeStamp = src && src.timeStamp || jQuery.now();
+
+	// Mark it as fixed
+	this[ jQuery.expando ] = true;
+};
+
+// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
+// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
+jQuery.Event.prototype = {
+	isDefaultPrevented: returnFalse,
+	isPropagationStopped: returnFalse,
+	isImmediatePropagationStopped: returnFalse,
+
+	preventDefault: function() {
+		var e = this.originalEvent;
+
+		this.isDefaultPrevented = returnTrue;
+
+		if ( e && e.preventDefault ) {
+			e.preventDefault();
+		}
+	},
+	stopPropagation: function() {
+		var e = this.originalEvent;
+
+		this.isPropagationStopped = returnTrue;
+
+		if ( e && e.stopPropagation ) {
+			e.stopPropagation();
+		}
+	},
+	stopImmediatePropagation: function() {
+		this.isImmediatePropagationStopped = returnTrue;
+		this.stopPropagation();
+	}
+};
+
+// Create mouseenter/leave events using mouseover/out and event-time checks
+// Support: Chrome 15+
+jQuery.each({
+	mouseenter: "mouseover",
+	mouseleave: "mouseout"
+}, function( orig, fix ) {
+	jQuery.event.special[ orig ] = {
+		delegateType: fix,
+		bindType: fix,
+
+		handle: function( event ) {
+			var ret,
+				target = this,
+				related = event.relatedTarget,
+				handleObj = event.handleObj;
+
+			// For mousenter/leave call the handler if related is outside the target.
+			// NB: No relatedTarget if the mouse left/entered the browser window
+			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
+				event.type = handleObj.origType;
+				ret = handleObj.handler.apply( this, arguments );
+				event.type = fix;
+			}
+			return ret;
+		}
+	};
+});
+
+// Create "bubbling" focus and blur events
+// Support: Firefox, Chrome, Safari
+if ( !jQuery.support.focusinBubbles ) {
+	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
+
+		// Attach a single capturing handler while someone wants focusin/focusout
+		var attaches = 0,
+			handler = function( event ) {
+				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
+			};
+
+		jQuery.event.special[ fix ] = {
+			setup: function() {
+				if ( attaches++ === 0 ) {
+					document.addEventListener( orig, handler, true );
+				}
+			},
+			teardown: function() {
+				if ( --attaches === 0 ) {
+					document.removeEventListener( orig, handler, true );
+				}
+			}
+		};
+	});
+}
+
+jQuery.fn.extend({
+
+	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
+		var origFn, type;
+
+		// Types can be a map of types/handlers
+		if ( typeof types === "object" ) {
+			// ( types-Object, selector, data )
+			if ( typeof selector !== "string" ) {
+				// ( types-Object, data )
+				data = data || selector;
+				selector = undefined;
+			}
+			for ( type in types ) {
+				this.on( type, selector, data, types[ type ], one );
+			}
+			return this;
+		}
+
+		if ( data == null && fn == null ) {
+			// ( types, fn )
+			fn = selector;
+			data = selector = undefined;
+		} else if ( fn == null ) {
+			if ( typeof selector === "string" ) {
+				// ( types, selector, fn )
+				fn = data;
+				data = undefined;
+			} else {
+				// ( types, data, fn )
+				fn = data;
+				data = selector;
+				selector = undefined;
+			}
+		}
+		if ( fn === false ) {
+			fn = returnFalse;
+		} else if ( !fn ) {
+			return this;
+		}
+
+		if ( one === 1 ) {
+			origFn = fn;
+			fn = function( event ) {
+				// Can use an empty set, since event contains the info
+				jQuery().off( event );
+				return origFn.apply( this, arguments );
+			};
+			// Use same guid so caller can remove using origFn
+			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
+		}
+		return this.each( function() {
+			jQuery.event.add( this, types, fn, data, selector );
+		});
+	},
+	one: function( types, selector, data, fn ) {
+		return this.on( types, selector, data, fn, 1 );
+	},
+	off: function( types, selector, fn ) {
+		var handleObj, type;
+		if ( types && types.preventDefault && types.handleObj ) {
+			// ( event )  dispatched jQuery.Event
+			handleObj = types.handleObj;
+			jQuery( types.delegateTarget ).off(
+				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
+				handleObj.selector,
+				handleObj.handler
+			);
+			return this;
+		}
+		if ( typeof types === "object" ) {
+			// ( types-object [, selector] )
+			for ( type in types ) {
+				this.off( type, selector, types[ type ] );
+			}
+			return this;
+		}
+		if ( selector === false || typeof selector === "function" ) {
+			// ( types [, fn] )
+			fn = selector;
+			selector = undefined;
+		}
+		if ( fn === false ) {
+			fn = returnFalse;
+		}
+		return this.each(function() {
+			jQuery.event.remove( this, types, fn, selector );
+		});
+	},
+
+	trigger: function( type, data ) {
+		return this.each(function() {
+			jQuery.event.trigger( type, data, this );
+		});
+	},
+	triggerHandler: function( type, data ) {
+		var elem = this[0];
+		if ( elem ) {
+			return jQuery.event.trigger( type, data, elem, true );
+		}
+	}
+});
+var isSimple = /^.[^:#\[\.,]*$/,
+	rparentsprev = /^(?:parents|prev(?:Until|All))/,
+	rneedsContext = jQuery.expr.match.needsContext,
+	// methods guaranteed to produce a unique set when starting from a unique set
+	guaranteedUnique = {
+		children: true,
+		contents: true,
+		next: true,
+		prev: true
+	};
+
+jQuery.fn.extend({
+	find: function( selector ) {
+		var i,
+			ret = [],
+			self = this,
+			len = self.length;
+
+		if ( typeof selector !== "string" ) {
+			return this.pushStack( jQuery( selector ).filter(function() {
+				for ( i = 0; i < len; i++ ) {
+					if ( jQuery.contains( self[ i ], this ) ) {
+						return true;
+					}
+				}
+			}) );
+		}
+
+		for ( i = 0; i < len; i++ ) {
+			jQuery.find( selector, self[ i ], ret );
+		}
+
+		// Needed because $( selector, context ) becomes $( context ).find( selector )
+		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
+		ret.selector = this.selector ? this.selector + " " + selector : selector;
+		return ret;
+	},
+
+	has: function( target ) {
+		var targets = jQuery( target, this ),
+			l = targets.length;
+
+		return this.filter(function() {
+			var i = 0;
+			for ( ; i < l; i++ ) {
+				if ( jQuery.contains( this, targets[i] ) ) {
+					return true;
+				}
+			}
+		});
+	},
+
+	not: function( selector ) {
+		return this.pushStack( winnow(this, selector || [], true) );
+	},
+
+	filter: function( selector ) {
+		return this.pushStack( winnow(this, selector || [], false) );
+	},
+
+	is: function( selector ) {
+		return !!winnow(
+			this,
+
+			// If this is a positional/relative selector, check membership in the returned set
+			// so $("p:first").is("p:last") won't return true for a doc with two "p".
+			typeof selector === "string" && rneedsContext.test( selector ) ?
+				jQuery( selector ) :
+				selector || [],
+			false
+		).length;
+	},
+
+	closest: function( selectors, context ) {
+		var cur,
+			i = 0,
+			l = this.length,
+			matched = [],
+			pos = ( rneedsContext.test( selectors ) || typeof selectors !== "string" ) ?
+				jQuery( selectors, context || this.context ) :
+				0;
+
+		for ( ; i < l; i++ ) {
+			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
+				// Always skip document fragments
+				if ( cur.nodeType < 11 && (pos ?
+					pos.index(cur) > -1 :
+
+					// Don't pass non-elements to Sizzle
+					cur.nodeType === 1 &&
+						jQuery.find.matchesSelector(cur, selectors)) ) {
+
+					cur = matched.push( cur );
+					break;
+				}
+			}
+		}
+
+		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
+	},
+
+	// Determine the position of an element within
+	// the matched set of elements
+	index: function( elem ) {
+
+		// No argument, return index in parent
+		if ( !elem ) {
+			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
+		}
+
+		// index in selector
+		if ( typeof elem === "string" ) {
+			return core_indexOf.call( jQuery( elem ), this[ 0 ] );
+		}
+
+		// Locate the position of the desired element
+		return core_indexOf.call( this,
+
+			// If it receives a jQuery object, the first element is used
+			elem.jquery ? elem[ 0 ] : elem
+		);
+	},
+
+	add: function( selector, context ) {
+		var set = typeof selector === "string" ?
+				jQuery( selector, context ) :
+				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
+			all = jQuery.merge( this.get(), set );
+
+		return this.pushStack( jQuery.unique(all) );
+	},
+
+	addBack: function( selector ) {
+		return this.add( selector == null ?
+			this.prevObject : this.prevObject.filter(selector)
+		);
+	}
+});
+
+function sibling( cur, dir ) {
+	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
+
+	return cur;
+}
+
+jQuery.each({
+	parent: function( elem ) {
+		var parent = elem.parentNode;
+		return parent && parent.nodeType !== 11 ? parent : null;
+	},
+	parents: function( elem ) {
+		return jQuery.dir( elem, "parentNode" );
+	},
+	parentsUntil: function( elem, i, until ) {
+		return jQuery.dir( elem, "parentNode", until );
+	},
+	next: function( elem ) {
+		return sibling( elem, "nextSibling" );
+	},
+	prev: function( elem ) {
+		return sibling( elem, "previousSibling" );
+	},
+	nextAll: function( elem ) {
+		return jQuery.dir( elem, "nextSibling" );
+	},
+	prevAll: function( elem ) {
+		return jQuery.dir( elem, "previousSibling" );
+	},
+	nextUntil: function( elem, i, until ) {
+		return jQuery.dir( elem, "nextSibling", until );
+	},
+	prevUntil: function( elem, i, until ) {
+		return jQuery.dir( elem, "previousSibling", until );
+	},
+	siblings: function( elem ) {
+		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
+	},
+	children: function( elem ) {
+		return jQuery.sibling( elem.firstChild );
+	},
+	contents: function( elem ) {
+		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
+	}
+}, function( name, fn ) {
+	jQuery.fn[ name ] = function( until, selector ) {
+		var matched = jQuery.map( this, fn, until );
+
+		if ( name.slice( -5 ) !== "Until" ) {
+			selector = until;
+		}
+
+		if ( selector && typeof selector === "string" ) {
+			matched = jQuery.filter( selector, matched );
+		}
+
+		if ( this.length > 1 ) {
+			// Remove duplicates
+			if ( !guaranteedUnique[ name ] ) {
+				jQuery.unique( matched );
+			}
+
+			// Reverse order for parents* and prev-derivatives
+			if ( rparentsprev.test( name ) ) {
+				matched.reverse();
+			}
+		}
+
+		return this.pushStack( matched );
+	};
+});
+
+jQuery.extend({
+	filter: function( expr, elems, not ) {
+		var elem = elems[ 0 ];
+
+		if ( not ) {
+			expr = ":not(" + expr + ")";
+		}
+
+		return elems.length === 1 && elem.nodeType === 1 ?
+			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
+			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
+				return elem.nodeType === 1;
+			}));
+	},
+
+	dir: function( elem, dir, until ) {
+		var matched = [],
+			truncate = until !== undefined;
+
+		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
+			if ( elem.nodeType === 1 ) {
+				if ( truncate && jQuery( elem ).is( until ) ) {
+					break;
+				}
+				matched.push( elem );
+			}
+		}
+		return matched;
+	},
+
+	sibling: function( n, elem ) {
+		var matched = [];
+
+		for ( ; n; n = n.nextSibling ) {
+			if ( n.nodeType === 1 && n !== elem ) {
+				matched.push( n );
+			}
+		}
+
+		return matched;
+	}
+});
+
+// Implement the identical functionality for filter and not
+function winnow( elements, qualifier, not ) {
+	if ( jQuery.isFunction( qualifier ) ) {
+		return jQuery.grep( elements, function( elem, i ) {
+			/* jshint -W018 */
+			return !!qualifier.call( elem, i, elem ) !== not;
+		});
+
+	}
+
+	if ( qualifier.nodeType ) {
+		return jQuery.grep( elements, function( elem ) {
+			return ( elem === qualifier ) !== not;
+		});
+
+	}
+
+	if ( typeof qualifier === "string" ) {
+		if ( isSimple.test( qualifier ) ) {
+			return jQuery.filter( qualifier, elements, not );
+		}
+
+		qualifier = jQuery.filter( qualifier, elements );
+	}
+
+	return jQuery.grep( elements, function( elem ) {
+		return ( core_indexOf.call( qualifier, elem ) >= 0 ) !== not;
+	});
+}
+var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
+	rtagName = /<([\w:]+)/,
+	rhtml = /<|&#?\w+;/,
+	rnoInnerhtml = /<(?:script|style|link)/i,
+	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
+	// checked="checked" or checked
+	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
+	rscriptType = /^$|\/(?:java|ecma)script/i,
+	rscriptTypeMasked = /^true\/(.*)/,
+	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
+
+	// We have to close these tags to support XHTML (#13200)
+	wrapMap = {
+
+		// Support: IE 9
+		option: [ 1, "<select multiple='multiple'>", "</select>" ],
+
+		thead: [ 1, "<table>", "</table>" ],
+		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
+		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
+		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
+
+		_default: [ 0, "", "" ]
+	};
+
+// Support: IE 9
+wrapMap.optgroup = wrapMap.option;
+
+wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
+wrapMap.th = wrapMap.td;
+
+jQuery.fn.extend({
+	text: function( value ) {
+		return jQuery.access( this, function( value ) {
+			return value === undefined ?
+				jQuery.text( this ) :
+				this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value ) );
+		}, null, value, arguments.length );
+	},
+
+	append: function() {
+		return this.domManip( arguments, function( elem ) {
+			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
+				var target = manipulationTarget( this, elem );
+				target.appendChild( elem );
+			}
+		});
+	},
+
+	prepend: function() {
+		return this.domManip( arguments, function( elem ) {
+			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
+				var target = manipulationTarget( this, elem );
+				target.insertBefore( elem, target.firstChild );
+			}
+		});
+	},
+
+	before: function() {
+		return this.domManip( arguments, function( elem ) {
+			if ( this.parentNode ) {
+				this.parentNode.insertBefore( elem, this );
+			}
+		});
+	},
+
+	after: function() {
+		return this.domManip( arguments, function( elem ) {
+			if ( this.parentNode ) {
+				this.parentNode.insertBefore( elem, this.nextSibling );
+			}
+		});
+	},
+
+	// keepData is for internal use only--do not document
+	remove: function( selector, keepData ) {
+		var elem,
+			elems = selector ? jQuery.filter( selector, this ) : this,
+			i = 0;
+
+		for ( ; (elem = elems[i]) != null; i++ ) {
+			if ( !keepData && elem.nodeType === 1 ) {
+				jQuery.cleanData( getAll( elem ) );
+			}
+
+			if ( elem.parentNode ) {
+				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
+					setGlobalEval( getAll( elem, "script" ) );
+				}
+				elem.parentNode.removeChild( elem );
+			}
+		}
+
+		return this;
+	},
+
+	empty: function() {
+		var elem,
+			i = 0;
+
+		for ( ; (elem = this[i]) != null; i++ ) {
+			if ( elem.nodeType === 1 ) {
+
+				// Prevent memory leaks
+				jQuery.cleanData( getAll( elem, false ) );
+
+				// Remove any remaining nodes
+				elem.textContent = "";
+			}
+		}
+
+		return this;
+	},
+
+	clone: function( dataAndEvents, deepDataAndEvents ) {
+		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
+		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
+
+		return this.map( function () {
+			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
+		});
+	},
+
+	html: function( value ) {
+		return jQuery.access( this, function( value ) {
+			var elem = this[ 0 ] || {},
+				i = 0,
+				l = this.length;
+
+			if ( value === undefined && elem.nodeType === 1 ) {
+				return elem.innerHTML;
+			}
+
+			// See if we can take a shortcut and just use innerHTML
+			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
+				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
+
+				value = value.replace( rxhtmlTag, "<$1></$2>" );
+
+				try {
+					for ( ; i < l; i++ ) {
+						elem = this[ i ] || {};
+
+						// Remove element nodes and prevent memory leaks
+						if ( elem.nodeType === 1 ) {
+							jQuery.cleanData( getAll( elem, false ) );
+							elem.innerHTML = value;
+						}
+					}
+
+					elem = 0;
+
+				// If using innerHTML throws an exception, use the fallback method
+				} catch( e ) {}
+			}
+
+			if ( elem ) {
+				this.empty().append( value );
+			}
+		}, null, value, arguments.length );
+	},
+
+	replaceWith: function() {
+		var
+			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
+			args = jQuery.map( this, function( elem ) {
+				return [ elem.nextSibling, elem.parentNode ];
+			}),
+			i = 0;
+
+		// Make the changes, replacing each context element with the new content
+		this.domManip( arguments, function( elem ) {
+			var next = args[ i++ ],
+				parent = args[ i++ ];
+
+			if ( parent ) {
+				// Don't use the snapshot next if it has moved (#13810)
+				if ( next && next.parentNode !== parent ) {
+					next = this.nextSibling;
+				}
+				jQuery( this ).remove();
+				parent.insertBefore( elem, next );
+			}
+		// Allow new content to include elements from the context set
+		}, true );
+
+		// Force removal if there was no new content (e.g., from empty arguments)
+		return i ? this : this.remove();
+	},
+
+	detach: function( selector ) {
+		return this.remove( selector, true );
+	},
+
+	domManip: function( args, callback, allowIntersection ) {
+
+		// Flatten any nested arrays
+		args = core_concat.apply( [], args );
+
+		var fragment, first, scripts, hasScripts, node, doc,
+			i = 0,
+			l = this.length,
+			set = this,
+			iNoClone = l - 1,
+			value = args[ 0 ],
+			isFunction = jQuery.isFunction( value );
+
+		// We can't cloneNode fragments that contain checked, in WebKit
+		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
+			return this.each(function( index ) {
+				var self = set.eq( index );
+				if ( isFunction ) {
+					args[ 0 ] = value.call( this, index, self.html() );
+				}
+				self.domManip( args, callback, allowIntersection );
+			});
+		}
+
+		if ( l ) {
+			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
+			first = fragment.firstChild;
+
+			if ( fragment.childNodes.length === 1 ) {
+				fragment = first;
+			}
+
+			if ( first ) {
+				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
+				hasScripts = scripts.length;
+
+				// Use the original fragment for the last item instead of the first because it can end up
+				// being emptied incorrectly in certain situations (#8070).
+				for ( ; i < l; i++ ) {
+					node = fragment;
+
+					if ( i !== iNoClone ) {
+						node = jQuery.clone( node, true, true );
+
+						// Keep references to cloned scripts for later restoration
+						if ( hasScripts ) {
+							// Support: QtWebKit
+							// jQuery.merge because core_push.apply(_, arraylike) throws
+							jQuery.merge( scripts, getAll( node, "script" ) );
+						}
+					}
+
+					callback.call( this[ i ], node, i );
+				}
+
+				if ( hasScripts ) {
+					doc = scripts[ scripts.length - 1 ].ownerDocument;
+
+					// Reenable scripts
+					jQuery.map( scripts, restoreScript );
+
+					// Evaluate executable scripts on first document insertion
+					for ( i = 0; i < hasScripts; i++ ) {
+						node = scripts[ i ];
+						if ( rscriptType.test( node.type || "" ) &&
+							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {
+
+							if ( node.src ) {
+								// Hope ajax is available...
+								jQuery._evalUrl( node.src );
+							} else {
+								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
+							}
+						}
+					}
+				}
+			}
+		}
+
+		return this;
+	}
+});
+
+jQuery.each({
+	appendTo: "append",
+	prependTo: "prepend",
+	insertBefore: "before",
+	insertAfter: "after",
+	replaceAll: "replaceWith"
+}, function( name, original ) {
+	jQuery.fn[ name ] = function( selector ) {
+		var elems,
+			ret = [],
+			insert = jQuery( selector ),
+			last = insert.length - 1,
+			i = 0;
+
+		for ( ; i <= last; i++ ) {
+			elems = i === last ? this : this.clone( true );
+			jQuery( insert[ i ] )[ original ]( elems );
+
+			// Support: QtWebKit
+			// .get() because core_push.apply(_, arraylike) throws
+			core_push.apply( ret, elems.get() );
+		}
+
+		return this.pushStack( ret );
+	};
+});
+
+jQuery.extend({
+	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
+		var i, l, srcElements, destElements,
+			clone = elem.cloneNode( true ),
+			inPage = jQuery.contains( elem.ownerDocument, elem );
+
+		// Support: IE >= 9
+		// Fix Cloning issues
+		if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {
+
+			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
+			destElements = getAll( clone );
+			srcElements = getAll( elem );
+
+			for ( i = 0, l = srcElements.length; i < l; i++ ) {
+				fixInput( srcElements[ i ], destElements[ i ] );
+			}
+		}
+
+		// Copy the events from the original to the clone
+		if ( dataAndEvents ) {
+			if ( deepDataAndEvents ) {
+				srcElements = srcElements || getAll( elem );
+				destElements = destElements || getAll( clone );
+
+				for ( i = 0, l = srcElements.length; i < l; i++ ) {
+					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
+				}
+			} else {
+				cloneCopyEvent( elem, clone );
+			}
+		}
+
+		// Preserve script evaluation history
+		destElements = getAll( clone, "script" );
+		if ( destElements.length > 0 ) {
+			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
+		}
+
+		// Return the cloned set
+		return clone;
+	},
+
+	buildFragment: function( elems, context, scripts, selection ) {
+		var elem, tmp, tag, wrap, contains, j,
+			i = 0,
+			l = elems.length,
+			fragment = context.createDocumentFragment(),
+			nodes = [];
+
+		for ( ; i < l; i++ ) {
+			elem = elems[ i ];
+
+			if ( elem || elem === 0 ) {
+
+				// Add nodes directly
+				if ( jQuery.type( elem ) === "object" ) {
+					// Support: QtWebKit
+					// jQuery.merge because core_push.apply(_, arraylike) throws
+					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
+
+				// Convert non-html into a text node
+				} else if ( !rhtml.test( elem ) ) {
+					nodes.push( context.createTextNode( elem ) );
+
+				// Convert html into DOM nodes
+				} else {
+					tmp = tmp || fragment.appendChild( context.createElement("div") );
+
+					// Deserialize a standard representation
+					tag = ( rtagName.exec( elem ) || ["", ""] )[ 1 ].toLowerCase();
+					wrap = wrapMap[ tag ] || wrapMap._default;
+					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];
+
+					// Descend through wrappers to the right content
+					j = wrap[ 0 ];
+					while ( j-- ) {
+						tmp = tmp.firstChild;
+					}
+
+					// Support: QtWebKit
+					// jQuery.merge because core_push.apply(_, arraylike) throws
+					jQuery.merge( nodes, tmp.childNodes );
+
+					// Remember the top-level container
+					tmp = fragment.firstChild;
+
+					// Fixes #12346
+					// Support: Webkit, IE
+					tmp.textContent = "";
+				}
+			}
+		}
+
+		// Remove wrapper from fragment
+		fragment.textContent = "";
+
+		i = 0;
+		while ( (elem = nodes[ i++ ]) ) {
+
+			// #4087 - If origin and destination elements are the same, and this is
+			// that element, do not do anything
+			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
+				continue;
+			}
+
+			contains = jQuery.contains( elem.ownerDocument, elem );
+
+			// Append to fragment
+			tmp = getAll( fragment.appendChild( elem ), "script" );
+
+			// Preserve script evaluation history
+			if ( contains ) {
+				setGlobalEval( tmp );
+			}
+
+			// Capture executables
+			if ( scripts ) {
+				j = 0;
+				while ( (elem = tmp[ j++ ]) ) {
+					if ( rscriptType.test( elem.type || "" ) ) {
+						scripts.push( elem );
+					}
+				}
+			}
+		}
+
+		return fragment;
+	},
+
+	cleanData: function( elems ) {
+		var data, elem, events, type, key, j,
+			special = jQuery.event.special,
+			i = 0;
+
+		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
+			if ( Data.accepts( elem ) ) {
+				key = elem[ data_priv.expando ];
+
+				if ( key && (data = data_priv.cache[ key ]) ) {
+					events = Object.keys( data.events || {} );
+					if ( events.length ) {
+						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
+							if ( special[ type ] ) {
+								jQuery.event.remove( elem, type );
+
+							// This is a shortcut to avoid jQuery.event.remove's overhead
+							} else {
+								jQuery.removeEvent( elem, type, data.handle );
+							}
+						}
+					}
+					if ( data_priv.cache[ key ] ) {
+						// Discard any remaining `private` data
+						delete data_priv.cache[ key ];
+					}
+				}
+			}
+			// Discard any remaining `user` data
+			delete data_user.cache[ elem[ data_user.expando ] ];
+		}
+	},
+
+	_evalUrl: function( url ) {
+		return jQuery.ajax({
+			url: url,
+			type: "GET",
+			dataType: "script",
+			async: false,
+			global: false,
+			"throws": true
+		});
+	}
+});
+
+// Support: 1.x compatibility
+// Manipulating tables requires a tbody
+function manipulationTarget( elem, content ) {
+	return jQuery.nodeName( elem, "table" ) &&
+		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?
+
+		elem.getElementsByTagName("tbody")[0] ||
+			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
+		elem;
+}
+
+// Replace/restore the type attribute of script elements for safe DOM manipulation
+function disableScript( elem ) {
+	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
+	return elem;
+}
+function restoreScript( elem ) {
+	var match = rscriptTypeMasked.exec( elem.type );
+
+	if ( match ) {
+		elem.type = match[ 1 ];
+	} else {
+		elem.removeAttribute("type");
+	}
+
+	return elem;
+}
+
+// Mark scripts as having already been evaluated
+function setGlobalEval( elems, refElements ) {
+	var l = elems.length,
+		i = 0;
+
+	for ( ; i < l; i++ ) {
+		data_priv.set(
+			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
+		);
+	}
+}
+
+function cloneCopyEvent( src, dest ) {
+	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
+
+	if ( dest.nodeType !== 1 ) {
+		return;
+	}
+
+	// 1. Copy private data: events, handlers, etc.
+	if ( data_priv.hasData( src ) ) {
+		pdataOld = data_priv.access( src );
+		pdataCur = data_priv.set( dest, pdataOld );
+		events = pdataOld.events;
+
+		if ( events ) {
+			delete pdataCur.handle;
+			pdataCur.events = {};
+
+			for ( type in events ) {
+				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
+					jQuery.event.add( dest, type, events[ type ][ i ] );
+				}
+			}
+		}
+	}
+
+	// 2. Copy user data
+	if ( data_user.hasData( src ) ) {
+		udataOld = data_user.access( src );
+		udataCur = jQuery.extend( {}, udataOld );
+
+		data_user.set( dest, udataCur );
+	}
+}
+
+
+function getAll( context, tag ) {
+	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
+			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
+			[];
+
+	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
+		jQuery.merge( [ context ], ret ) :
+		ret;
+}
+
+// Support: IE >= 9
+function fixInput( src, dest ) {
+	var nodeName = dest.nodeName.toLowerCase();
+
+	// Fails to persist the checked state of a cloned checkbox or radio button.
+	if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
+		dest.checked = src.checked;
+
+	// Fails to return the selected option to the default selected state when cloning options
+	} else if ( nodeName === "input" || nodeName === "textarea" ) {
+		dest.defaultValue = src.defaultValue;
+	}
+}
+jQuery.fn.extend({
+	wrapAll: function( html ) {
+		var wrap;
+
+		if ( jQuery.isFunction( html ) ) {
+			return this.each(function( i ) {
+				jQuery( this ).wrapAll( html.call(this, i) );
+			});
+		}
+
+		if ( this[ 0 ] ) {
+
+			// The elements to wrap the target around
+			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
+
+			if ( this[ 0 ].parentNode ) {
+				wrap.insertBefore( this[ 0 ] );
+			}
+
+			wrap.map(function() {
+				var elem = this;
+
+				while ( elem.firstElementChild ) {
+					elem = elem.firstElementChild;
+				}
+
+				return elem;
+			}).append( this );
+		}
+
+		return this;
+	},
+
+	wrapInner: function( html ) {
+		if ( jQuery.isFunction( html ) ) {
+			return this.each(function( i ) {
+				jQuery( this ).wrapInner( html.call(this, i) );
+			});
+		}
+
+		return this.each(function() {
+			var self = jQuery( this ),
+				contents = self.contents();
+
+			if ( contents.length ) {
+				contents.wrapAll( html );
+
+			} else {
+				self.append( html );
+			}
+		});
+	},
+
+	wrap: function( html ) {
+		var isFunction = jQuery.isFunction( html );
+
+		return this.each(function( i ) {
+			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
+		});
+	},
+
+	unwrap: function() {
+		return this.parent().each(function() {
+			if ( !jQuery.nodeName( this, "body" ) ) {
+				jQuery( this ).replaceWith( this.childNodes );
+			}
+		}).end();
+	}
+});
+var curCSS, iframe,
+	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
+	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
+	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
+	rmargin = /^margin/,
+	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
+	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
+	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
+	elemdisplay = { BODY: "block" },
+
+	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
+	cssNormalTransform = {
+		letterSpacing: 0,
+		fontWeight: 400
+	},
+
+	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
+	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
+
+// return a css property mapped to a potentially vendor prefixed property
+function vendorPropName( style, name ) {
+
+	// shortcut for names that are not vendor prefixed
+	if ( name in style ) {
+		return name;
+	}
+
+	// check for vendor prefixed names
+	var capName = name.charAt(0).toUpperCase() + name.slice(1),
+		origName = name,
+		i = cssPrefixes.length;
+
+	while ( i-- ) {
+		name = cssPrefixes[ i ] + capName;
+		if ( name in style ) {
+			return name;
+		}
+	}
+
+	return origName;
+}
+
+function isHidden( elem, el ) {
+	// isHidden might be called from jQuery#filter function;
+	// in that case, element will be second argument
+	elem = el || elem;
+	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
+}
+
+// NOTE: we've included the "window" in window.getComputedStyle
+// because jsdom on node.js will break without it.
+function getStyles( elem ) {
+	return window.getComputedStyle( elem, null );
+}
+
+function showHide( elements, show ) {
+	var display, elem, hidden,
+		values = [],
+		index = 0,
+		length = elements.length;
+
+	for ( ; index < length; index++ ) {
+		elem = elements[ index ];
+		if ( !elem.style ) {
+			continue;
+		}
+
+		values[ index ] = data_priv.get( elem, "olddisplay" );
+		display = elem.style.display;
+		if ( show ) {
+			// Reset the inline display of this element to learn if it is
+			// being hidden by cascaded rules or not
+			if ( !values[ index ] && display === "none" ) {
+				elem.style.display = "";
+			}
+
+			// Set elements which have been overridden with display: none
+			// in a stylesheet to whatever the default browser style is
+			// for such an element
+			if ( elem.style.display === "" && isHidden( elem ) ) {
+				values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
+			}
+		} else {
+
+			if ( !values[ index ] ) {
+				hidden = isHidden( elem );
+
+				if ( display && display !== "none" || !hidden ) {
+					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
+				}
+			}
+		}
+	}
+
+	// Set the display of most of the elements in a second loop
+	// to avoid the constant reflow
+	for ( index = 0; index < length; index++ ) {
+		elem = elements[ index ];
+		if ( !elem.style ) {
+			continue;
+		}
+		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
+			elem.style.display = show ? values[ index ] || "" : "none";
+		}
+	}
+
+	return elements;
+}
+
+jQuery.fn.extend({
+	css: function( name, value ) {
+		return jQuery.access( this, function( elem, name, value ) {
+			var styles, len,
+				map = {},
+				i = 0;
+
+			if ( jQuery.isArray( name ) ) {
+				styles = getStyles( elem );
+				len = name.length;
+
+				for ( ; i < len; i++ ) {
+					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
+				}
+
+				return map;
+			}
+
+			return value !== undefined ?
+				jQuery.style( elem, name, value ) :
+				jQuery.css( elem, name );
+		}, name, value, arguments.length > 1 );
+	},
+	show: function() {
+		return showHide( this, true );
+	},
+	hide: function() {
+		return showHide( this );
+	},
+	toggle: function( state ) {
+		var bool = typeof state === "boolean";
+
+		return this.each(function() {
+			if ( bool ? state : isHidden( this ) ) {
+				jQuery( this ).show();
+			} else {
+				jQuery( this ).hide();
+			}
+		});
+	}
+});
+
+jQuery.extend({
+	// Add in style property hooks for overriding the default
+	// behavior of getting and setting a style property
+	cssHooks: {
+		opacity: {
+			get: function( elem, computed ) {
+				if ( computed ) {
+					// We should always get a number back from opacity
+					var ret = curCSS( elem, "opacity" );
+					return ret === "" ? "1" : ret;
+				}
+			}
+		}
+	},
+
+	// Don't automatically add "px" to these possibly-unitless properties
+	cssNumber: {
+		"columnCount": true,
+		"fillOpacity": true,
+		"fontWeight": true,
+		"lineHeight": true,
+		"opacity": true,
+		"orphans": true,
+		"widows": true,
+		"zIndex": true,
+		"zoom": true
+	},
+
+	// Add in properties whose names you wish to fix before
+	// setting or getting the value
+	cssProps: {
+		// normalize float css property
+		"float": "cssFloat"
+	},
+
+	// Get and set the style property on a DOM Node
+	style: function( elem, name, value, extra ) {
+		// Don't set styles on text and comment nodes
+		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
+			return;
+		}
+
+		// Make sure that we're working with the right name
+		var ret, type, hooks,
+			origName = jQuery.camelCase( name ),
+			style = elem.style;
+
+		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );
+
+		// gets hook for the prefixed version
+		// followed by the unprefixed version
+		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
+
+		// Check if we're setting a value
+		if ( value !== undefined ) {
+			type = typeof value;
+
+			// convert relative number strings (+= or -=) to relative numbers. #7345
+			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
+				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
+				// Fixes bug #9237
+				type = "number";
+			}
+
+			// Make sure that NaN and null values aren't set. See: #7116
+			if ( value == null || type === "number" && isNaN( value ) ) {
+				return;
+			}
+
+			// If a number was passed in, add 'px' to the (except for certain CSS properties)
+			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
+				value += "px";
+			}
+
+			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
+			// but it would mean to define eight (for every problematic property) identical functions
+			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
+				style[ name ] = "inherit";
+			}
+
+			// If a hook was provided, use that value, otherwise just set the specified value
+			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
+				style[ name ] = value;
+			}
+
+		} else {
+			// If a hook was provided get the non-computed value from there
+			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
+				return ret;
+			}
+
+			// Otherwise just get the value from the style object
+			return style[ name ];
+		}
+	},
+
+	css: function( elem, name, extra, styles ) {
+		var val, num, hooks,
+			origName = jQuery.camelCase( name );
+
+		// Make sure that we're working with the right name
+		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );
+
+		// gets hook for the prefixed version
+		// followed by the unprefixed version
+		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
+
+		// If a hook was provided get the computed value from there
+		if ( hooks && "get" in hooks ) {
+			val = hooks.get( elem, true, extra );
+		}
+
+		// Otherwise, if a way to get the computed value exists, use that
+		if ( val === undefined ) {
+			val = curCSS( elem, name, styles );
+		}
+
+		//convert "normal" to computed value
+		if ( val === "normal" && name in cssNormalTransform ) {
+			val = cssNormalTransform[ name ];
+		}
+
+		// Return, converting to number if forced or a qualifier was provided and val looks numeric
+		if ( extra === "" || extra ) {
+			num = parseFloat( val );
+			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
+		}
+		return val;
+	}
+});
+
+curCSS = function( elem, name, _computed ) {
+	var width, minWidth, maxWidth,
+		computed = _computed || getStyles( elem ),
+
+		// Support: IE9
+		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
+		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
+		style = elem.style;
+
+	if ( computed ) {
+
+		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
+			ret = jQuery.style( elem, name );
+		}
+
+		// Support: Safari 5.1
+		// A tribute to the "awesome hack by Dean Edwards"
+		// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
+		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
+		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
+
+			// Remember the original values
+			width = style.width;
+			minWidth = style.minWidth;
+			maxWidth = style.maxWidth;
+
+			// Put in the new values to get a computed value out
+			style.minWidth = style.maxWidth = style.width = ret;
+			ret = computed.width;
+
+			// Revert the changed values
+			style.width = width;
+			style.minWidth = minWidth;
+			style.maxWidth = maxWidth;
+		}
+	}
+
+	return ret;
+};
+
+
+function setPositiveNumber( elem, value, subtract ) {
+	var matches = rnumsplit.exec( value );
+	return matches ?
+		// Guard against undefined "subtract", e.g., when used as in cssHooks
+		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
+		value;
+}
+
+function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
+	var i = extra === ( isBorderBox ? "border" : "content" ) ?
+		// If we already have the right measurement, avoid augmentation
+		4 :
+		// Otherwise initialize for horizontal or vertical properties
+		name === "width" ? 1 : 0,
+
+		val = 0;
+
+	for ( ; i < 4; i += 2 ) {
+		// both box models exclude margin, so add it if we want it
+		if ( extra === "margin" ) {
+			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
+		}
+
+		if ( isBorderBox ) {
+			// border-box includes padding, so remove it if we want content
+			if ( extra === "content" ) {
+				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
+			}
+
+			// at this point, extra isn't border nor margin, so remove border
+			if ( extra !== "margin" ) {
+				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
+			}
+		} else {
+			// at this point, extra isn't content, so add padding
+			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
+
+			// at this point, extra isn't content nor padding, so add border
+			if ( extra !== "padding" ) {
+				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
+			}
+		}
+	}
+
+	return val;
+}
+
+function getWidthOrHeight( elem, name, extra ) {
+
+	// Start with offset property, which is equivalent to the border-box value
+	var valueIsBorderBox = true,
+		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
+		styles = getStyles( elem ),
+		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
+
+	// some non-html elements return undefined for offsetWidth, so check for null/undefined
+	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
+	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
+	if ( val <= 0 || val == null ) {
+		// Fall back to computed then uncomputed css if necessary
+		val = curCSS( elem, name, styles );
+		if ( val < 0 || val == null ) {
+			val = elem.style[ name ];
+		}
+
+		// Computed unit is not pixels. Stop here and return.
+		if ( rnumnonpx.test(val) ) {
+			return val;
+		}
+
+		// we need the check for style in case a browser which returns unreliable values
+		// for getComputedStyle silently falls back to the reliable elem.style
+		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );
+
+		// Normalize "", auto, and prepare for extra
+		val = parseFloat( val ) || 0;
+	}
+
+	// use the active box-sizing model to add/subtract irrelevant styles
+	return ( val +
+		augmentWidthOrHeight(
+			elem,
+			name,
+			extra || ( isBorderBox ? "border" : "content" ),
+			valueIsBorderBox,
+			styles
+		)
+	) + "px";
+}
+
+// Try to determine the default display value of an element
+function css_defaultDisplay( nodeName ) {
+	var doc = document,
+		display = elemdisplay[ nodeName ];
+
+	if ( !display ) {
+		display = actualDisplay( nodeName, doc );
+
+		// If the simple way fails, read from inside an iframe
+		if ( display === "none" || !display ) {
+			// Use the already-created iframe if possible
+			iframe = ( iframe ||
+				jQuery("<iframe frameborder='0' width='0' height='0'/>")
+				.css( "cssText", "display:block !important" )
+			).appendTo( doc.documentElement );
+
+			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
+			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
+			doc.write("<!doctype html><html><body>");
+			doc.close();
+
+			display = actualDisplay( nodeName, doc );
+			iframe.detach();
+		}
+
+		// Store the correct default display
+		elemdisplay[ nodeName ] = display;
+	}
+
+	return display;
+}
+
+// Called ONLY from within css_defaultDisplay
+function actualDisplay( name, doc ) {
+	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
+		display = jQuery.css( elem[0], "display" );
+	elem.remove();
+	return display;
+}
+
+jQuery.each([ "height", "width" ], function( i, name ) {
+	jQuery.cssHooks[ name ] = {
+		get: function( elem, computed, extra ) {
+			if ( computed ) {
+				// certain elements can have dimension info if we invisibly show them
+				// however, it must have a current display style that would benefit from this
+				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
+					jQuery.swap( elem, cssShow, function() {
+						return getWidthOrHeight( elem, name, extra );
+					}) :
+					getWidthOrHeight( elem, name, extra );
+			}
+		},
+
+		set: function( elem, value, extra ) {
+			var styles = extra && getStyles( elem );
+			return setPositiveNumber( elem, value, extra ?
+				augmentWidthOrHeight(
+					elem,
+					name,
+					extra,
+					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
+					styles
+				) : 0
+			);
+		}
+	};
+});
+
+// These hooks cannot be added until DOM ready because the support test
+// for it is not run until after DOM ready
+jQuery(function() {
+	// Support: Android 2.3
+	if ( !jQuery.support.reliableMarginRight ) {
+		jQuery.cssHooks.marginRight = {
+			get: function( elem, computed ) {
+				if ( computed ) {
+					// Support: Android 2.3
+					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
+					// Work around by temporarily setting element display to inline-block
+					return jQuery.swap( elem, { "display": "inline-block" },
+						curCSS, [ elem, "marginRight" ] );
+				}
+			}
+		};
+	}
+
+	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
+	// getComputedStyle returns percent when specified for top/left/bottom/right
+	// rather than make the css module depend on the offset module, we just check for it here
+	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
+		jQuery.each( [ "top", "left" ], function( i, prop ) {
+			jQuery.cssHooks[ prop ] = {
+				get: function( elem, computed ) {
+					if ( computed ) {
+						computed = curCSS( elem, prop );
+						// if curCSS returns percentage, fallback to offset
+						return rnumnonpx.test( computed ) ?
+							jQuery( elem ).position()[ prop ] + "px" :
+							computed;
+					}
+				}
+			};
+		});
+	}
+
+});
+
+if ( jQuery.expr && jQuery.expr.filters ) {
+	jQuery.expr.filters.hidden = function( elem ) {
+		// Support: Opera <= 12.12
+		// Opera reports offsetWidths and offsetHeights less than zero on some elements
+		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
+	};
+
+	jQuery.expr.filters.visible = function( elem ) {
+		return !jQuery.expr.filters.hidden( elem );
+	};
+}
+
+// These hooks are used by animate to expand properties
+jQuery.each({
+	margin: "",
+	padding: "",
+	border: "Width"
+}, function( prefix, suffix ) {
+	jQuery.cssHooks[ prefix + suffix ] = {
+		expand: function( value ) {
+			var i = 0,
+				expanded = {},
+
+				// assumes a single number if not a string
+				parts = typeof value === "string" ? value.split(" ") : [ value ];
+
+			for ( ; i < 4; i++ ) {
+				expanded[ prefix + cssExpand[ i ] + suffix ] =
+					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
+			}
+
+			return expanded;
+		}
+	};
+
+	if ( !rmargin.test( prefix ) ) {
+		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
+	}
+});
+var r20 = /%20/g,
+	rbracket = /\[\]$/,
+	rCRLF = /\r?\n/g,
+	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
+	rsubmittable = /^(?:input|select|textarea|keygen)/i;
+
+jQuery.fn.extend({
+	serialize: function() {
+		return jQuery.param( this.serializeArray() );
+	},
+	serializeArray: function() {
+		return this.map(function(){
+			// Can add propHook for "elements" to filter or add form elements
+			var elements = jQuery.prop( this, "elements" );
+			return elements ? jQuery.makeArray( elements ) : this;
+		})
+		.filter(function(){
+			var type = this.type;
+			// Use .is(":disabled") so that fieldset[disabled] works
+			return this.name && !jQuery( this ).is( ":disabled" ) &&
+				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
+				( this.checked || !manipulation_rcheckableType.test( type ) );
+		})
+		.map(function( i, elem ){
+			var val = jQuery( this ).val();
+
+			return val == null ?
+				null :
+				jQuery.isArray( val ) ?
+					jQuery.map( val, function( val ){
+						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
+					}) :
+					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
+		}).get();
+	}
+});
+
+//Serialize an array of form elements or a set of
+//key/values into a query string
+jQuery.param = function( a, traditional ) {
+	var prefix,
+		s = [],
+		add = function( key, value ) {
+			// If value is a function, invoke it and return its value
+			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
+			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
+		};
+
+	// Set traditional to true for jQuery <= 1.3.2 behavior.
+	if ( traditional === undefined ) {
+		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
+	}
+
+	// If an array was passed in, assume that it is an array of form elements.
+	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
+		// Serialize the form elements
+		jQuery.each( a, function() {
+			add( this.name, this.value );
+		});
+
+	} else {
+		// If traditional, encode the "old" way (the way 1.3.2 or older
+		// did it), otherwise encode params recursively.
+		for ( prefix in a ) {
+			buildParams( prefix, a[ prefix ], traditional, add );
+		}
+	}
+
+	// Return the resulting serialization
+	return s.join( "&" ).replace( r20, "+" );
+};
+
+function buildParams( prefix, obj, traditional, add ) {
+	var name;
+
+	if ( jQuery.isArray( obj ) ) {
+		// Serialize array item.
+		jQuery.each( obj, function( i, v ) {
+			if ( traditional || rbracket.test( prefix ) ) {
+				// Treat each array item as a scalar.
+				add( prefix, v );
+
+			} else {
+				// Item is non-scalar (array or object), encode its numeric index.
+				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
+			}
+		});
+
+	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
+		// Serialize object item.
+		for ( name in obj ) {
+			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
+		}
+
+	} else {
+		// Serialize scalar item.
+		add( prefix, obj );
+	}
+}
+jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
+	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
+	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
+
+	// Handle event binding
+	jQuery.fn[ name ] = function( data, fn ) {
+		return arguments.length > 0 ?
+			this.on( name, null, data, fn ) :
+			this.trigger( name );
+	};
+});
+
+jQuery.fn.extend({
+	hover: function( fnOver, fnOut ) {
+		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
+	},
+
+	bind: function( types, data, fn ) {
+		return this.on( types, null, data, fn );
+	},
+	unbind: function( types, fn ) {
+		return this.off( types, null, fn );
+	},
+
+	delegate: function( selector, types, data, fn ) {
+		return this.on( types, selector, data, fn );
+	},
+	undelegate: function( selector, types, fn ) {
+		// ( namespace ) or ( selector, types [, fn] )
+		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
+	}
+});
+var
+	// Document location
+	ajaxLocParts,
+	ajaxLocation,
+
+	ajax_nonce = jQuery.now(),
+
+	ajax_rquery = /\?/,
+	rhash = /#.*$/,
+	rts = /([?&])_=[^&]*/,
+	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
+	// #7653, #8125, #8152: local protocol detection
+	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
+	rnoContent = /^(?:GET|HEAD)$/,
+	rprotocol = /^\/\//,
+	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
+
+	// Keep a copy of the old load method
+	_load = jQuery.fn.load,
+
+	/* Prefilters
+	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
+	 * 2) These are called:
+	 *    - BEFORE asking for a transport
+	 *    - AFTER param serialization (s.data is a string if s.processData is true)
+	 * 3) key is the dataType
+	 * 4) the catchall symbol "*" can be used
+	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
+	 */
+	prefilters = {},
+
+	/* Transports bindings
+	 * 1) key is the dataType
+	 * 2) the catchall symbol "*" can be used
+	 * 3) selection will start with transport dataType and THEN go to "*" if needed
+	 */
+	transports = {},
+
+	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
+	allTypes = "*/".concat("*");
+
+// #8138, IE may throw an exception when accessing
+// a field from window.location if document.domain has been set
+try {
+	ajaxLocation = location.href;
+} catch( e ) {
+	// Use the href attribute of an A element
+	// since IE will modify it given document.location
+	ajaxLocation = document.createElement( "a" );
+	ajaxLocation.href = "";
+	ajaxLocation = ajaxLocation.href;
+}
+
+// Segment location into parts
+ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
+
+// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
+function addToPrefiltersOrTransports( structure ) {
+
+	// dataTypeExpression is optional and defaults to "*"
+	return function( dataTypeExpression, func ) {
+
+		if ( typeof dataTypeExpression !== "string" ) {
+			func = dataTypeExpression;
+			dataTypeExpression = "*";
+		}
+
+		var dataType,
+			i = 0,
+			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];
+
+		if ( jQuery.isFunction( func ) ) {
+			// For each dataType in the dataTypeExpression
+			while ( (dataType = dataTypes[i++]) ) {
+				// Prepend if requested
+				if ( dataType[0] === "+" ) {
+					dataType = dataType.slice( 1 ) || "*";
+					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );
+
+				// Otherwise append
+				} else {
+					(structure[ dataType ] = structure[ dataType ] || []).push( func );
+				}
+			}
+		}
+	};
+}
+
+// Base inspection function for prefilters and transports
+function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
+
+	var inspected = {},
+		seekingTransport = ( structure === transports );
+
+	function inspect( dataType ) {
+		var selected;
+		inspected[ dataType ] = true;
+		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
+			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
+			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
+				options.dataTypes.unshift( dataTypeOrTransport );
+				inspect( dataTypeOrTransport );
+				return false;
+			} else if ( seekingTransport ) {
+				return !( selected = dataTypeOrTransport );
+			}
+		});
+		return selected;
+	}
+
+	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
+}
+
+// A special extend for ajax options
+// that takes "flat" options (not to be deep extended)
+// Fixes #9887
+function ajaxExtend( target, src ) {
+	var key, deep,
+		flatOptions = jQuery.ajaxSettings.flatOptions || {};
+
+	for ( key in src ) {
+		if ( src[ key ] !== undefined ) {
+			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
+		}
+	}
+	if ( deep ) {
+		jQuery.extend( true, target, deep );
+	}
+
+	return target;
+}
+
+jQuery.fn.load = function( url, params, callback ) {
+	if ( typeof url !== "string" && _load ) {
+		return _load.apply( this, arguments );
+	}
+
+	var selector, type, response,
+		self = this,
+		off = url.indexOf(" ");
+
+	if ( off >= 0 ) {
+		selector = url.slice( off );
+		url = url.slice( 0, off );
+	}
+
+	// If it's a function
+	if ( jQuery.isFunction( params ) ) {
+
+		// We assume that it's the callback
+		callback = params;
+		params = undefined;
+
+	// Otherwise, build a param string
+	} else if ( params && typeof params === "object" ) {
+		type = "POST";
+	}
+
+	// If we have elements to modify, make the request
+	if ( self.length > 0 ) {
+		jQuery.ajax({
+			url: url,
+
+			// if "type" variable is undefined, then "GET" method will be used
+			type: type,
+			dataType: "html",
+			data: params
+		}).done(function( responseText ) {
+
+			// Save response for use in complete callback
+			response = arguments;
+
+			self.html( selector ?
+
+				// If a selector was specified, locate the right elements in a dummy div
+				// Exclude scripts to avoid IE 'Permission Denied' errors
+				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :
+
+				// Otherwise use the full result
+				responseText );
+
+		}).complete( callback && function( jqXHR, status ) {
+			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
+		});
+	}
+
+	return this;
+};
+
+// Attach a bunch of functions for handling common AJAX events
+jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
+	jQuery.fn[ type ] = function( fn ){
+		return this.on( type, fn );
+	};
+});
+
+jQuery.extend({
+
+	// Counter for holding the number of active queries
+	active: 0,
+
+	// Last-Modified header cache for next request
+	lastModified: {},
+	etag: {},
+
+	ajaxSettings: {
+		url: ajaxLocation,
+		type: "GET",
+		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
+		global: true,
+		processData: true,
+		async: true,
+		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
+		/*
+		timeout: 0,
+		data: null,
+		dataType: null,
+		username: null,
+		password: null,
+		cache: null,
+		throws: false,
+		traditional: false,
+		headers: {},
+		*/
+
+		accepts: {
+			"*": allTypes,
+			text: "text/plain",
+			html: "text/html",
+			xml: "application/xml, text/xml",
+			json: "application/json, text/javascript"
+		},
+
+		contents: {
+			xml: /xml/,
+			html: /html/,
+			json: /json/
+		},
+
+		responseFields: {
+			xml: "responseXML",
+			text: "responseText",
+			json: "responseJSON"
+		},
+
+		// Data converters
+		// Keys separate source (or catchall "*") and destination types with a single space
+		converters: {
+
+			// Convert anything to text
+			"* text": String,
+
+			// Text to html (true = no transformation)
+			"text html": true,
+
+			// Evaluate text as a json expression
+			"text json": jQuery.parseJSON,
+
+			// Parse text as xml
+			"text xml": jQuery.parseXML
+		},
+
+		// For options that shouldn't be deep extended:
+		// you can add your own custom options here if
+		// and when you create one that shouldn't be
+		// deep extended (see ajaxExtend)
+		flatOptions: {
+			url: true,
+			context: true
+		}
+	},
+
+	// Creates a full fledged settings object into target
+	// with both ajaxSettings and settings fields.
+	// If target is omitted, writes into ajaxSettings.
+	ajaxSetup: function( target, settings ) {
+		return settings ?
+
+			// Building a settings object
+			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
+
+			// Extending ajaxSettings
+			ajaxExtend( jQuery.ajaxSettings, target );
+	},
+
+	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
+	ajaxTransport: addToPrefiltersOrTransports( transports ),
+
+	// Main method
+	ajax: function( url, options ) {
+
+		// If url is an object, simulate pre-1.5 signature
+		if ( typeof url === "object" ) {
+			options = url;
+			url = undefined;
+		}
+
+		// Force options to be an object
+		options = options || {};
+
+		var transport,
+			// URL without anti-cache param
+			cacheURL,
+			// Response headers
+			responseHeadersString,
+			responseHeaders,
+			// timeout handle
+			timeoutTimer,
+			// Cross-domain detection vars
+			parts,
+			// To know if global events are to be dispatched
+			fireGlobals,
+			// Loop variable
+			i,
+			// Create the final options object
+			s = jQuery.ajaxSetup( {}, options ),
+			// Callbacks context
+			callbackContext = s.context || s,
+			// Context for global events is callbackContext if it is a DOM node or jQuery collection
+			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
+				jQuery( callbackContext ) :
+				jQuery.event,
+			// Deferreds
+			deferred = jQuery.Deferred(),
+			completeDeferred = jQuery.Callbacks("once memory"),
+			// Status-dependent callbacks
+			statusCode = s.statusCode || {},
+			// Headers (they are sent all at once)
+			requestHeaders = {},
+			requestHeadersNames = {},
+			// The jqXHR state
+			state = 0,
+			// Default abort message
+			strAbort = "canceled",
+			// Fake xhr
+			jqXHR = {
+				readyState: 0,
+
+				// Builds headers hashtable if needed
+				getResponseHeader: function( key ) {
+					var match;
+					if ( state === 2 ) {
+						if ( !responseHeaders ) {
+							responseHeaders = {};
+							while ( (match = rheaders.exec( responseHeadersString )) ) {
+								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
+							}
+						}
+						match = responseHeaders[ key.toLowerCase() ];
+					}
+					return match == null ? null : match;
+				},
+
+				// Raw string
+				getAllResponseHeaders: function() {
+					return state === 2 ? responseHeadersString : null;
+				},
+
+				// Caches the header
+				setRequestHeader: function( name, value ) {
+					var lname = name.toLowerCase();
+					if ( !state ) {
+						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
+						requestHeaders[ name ] = value;
+					}
+					return this;
+				},
+
+				// Overrides response content-type header
+				overrideMimeType: function( type ) {
+					if ( !state ) {
+						s.mimeType = type;
+					}
+					return this;
+				},
+
+				// Status-dependent callbacks
+				statusCode: function( map ) {
+					var code;
+					if ( map ) {
+						if ( state < 2 ) {
+							for ( code in map ) {
+								// Lazy-add the new callback in a way that preserves old ones
+								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
+							}
+						} else {
+							// Execute the appropriate callbacks
+							jqXHR.always( map[ jqXHR.status ] );
+						}
+					}
+					return this;
+				},
+
+				// Cancel the request
+				abort: function( statusText ) {
+					var finalText = statusText || strAbort;
+					if ( transport ) {
+						transport.abort( finalText );
+					}
+					done( 0, finalText );
+					return this;
+				}
+			};
+
+		// Attach deferreds
+		deferred.promise( jqXHR ).complete = completeDeferred.add;
+		jqXHR.success = jqXHR.done;
+		jqXHR.error = jqXHR.fail;
+
+		// Remove hash character (#7531: and string promotion)
+		// Add protocol if not provided (prefilters might expect it)
+		// Handle falsy url in the settings object (#10093: consistency with old signature)
+		// We also use the url parameter if available
+		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
+			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
+
+		// Alias method option to type as per ticket #12004
+		s.type = options.method || options.type || s.method || s.type;
+
+		// Extract dataTypes list
+		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];
+
+		// A cross-domain request is in order when we have a protocol:host:port mismatch
+		if ( s.crossDomain == null ) {
+			parts = rurl.exec( s.url.toLowerCase() );
+			s.crossDomain = !!( parts &&
+				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
+					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
+						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
+			);
+		}
+
+		// Convert data if not already a string
+		if ( s.data && s.processData && typeof s.data !== "string" ) {
+			s.data = jQuery.param( s.data, s.traditional );
+		}
+
+		// Apply prefilters
+		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
+
+		// If request was aborted inside a prefilter, stop there
+		if ( state === 2 ) {
+			return jqXHR;
+		}
+
+		// We can fire global events as of now if asked to
+		fireGlobals = s.global;
+
+		// Watch for a new set of requests
+		if ( fireGlobals && jQuery.active++ === 0 ) {
+			jQuery.event.trigger("ajaxStart");
+		}
+
+		// Uppercase the type
+		s.type = s.type.toUpperCase();
+
+		// Determine if request has content
+		s.hasContent = !rnoContent.test( s.type );
+
+		// Save the URL in case we're toying with the If-Modified-Since
+		// and/or If-None-Match header later on
+		cacheURL = s.url;
+
+		// More options handling for requests with no content
+		if ( !s.hasContent ) {
+
+			// If data is available, append data to url
+			if ( s.data ) {
+				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
+				// #9682: remove data so that it's not used in an eventual retry
+				delete s.data;
+			}
+
+			// Add anti-cache in url if needed
+			if ( s.cache === false ) {
+				s.url = rts.test( cacheURL ) ?
+
+					// If there is already a '_' parameter, set its value
+					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :
+
+					// Otherwise add one to the end
+					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
+			}
+		}
+
+		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
+		if ( s.ifModified ) {
+			if ( jQuery.lastModified[ cacheURL ] ) {
+				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
+			}
+			if ( jQuery.etag[ cacheURL ] ) {
+				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
+			}
+		}
+
+		// Set the correct header, if data is being sent
+		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
+			jqXHR.setRequestHeader( "Content-Type", s.contentType );
+		}
+
+		// Set the Accepts header for the server, depending on the dataType
+		jqXHR.setRequestHeader(
+			"Accept",
+			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
+				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
+				s.accepts[ "*" ]
+		);
+
+		// Check for headers option
+		for ( i in s.headers ) {
+			jqXHR.setRequestHeader( i, s.headers[ i ] );
+		}
+
+		// Allow custom headers/mimetypes and early abort
+		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
+			// Abort if not done already and return
+			return jqXHR.abort();
+		}
+
+		// aborting is no longer a cancellation
+		strAbort = "abort";
+
+		// Install callbacks on deferreds
+		for ( i in { success: 1, error: 1, complete: 1 } ) {
+			jqXHR[ i ]( s[ i ] );
+		}
+
+		// Get transport
+		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
+
+		// If no transport, we auto-abort
+		if ( !transport ) {
+			done( -1, "No Transport" );
+		} else {
+			jqXHR.readyState = 1;
+
+			// Send global event
+			if ( fireGlobals ) {
+				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
+			}
+			// Timeout
+			if ( s.async && s.timeout > 0 ) {
+				timeoutTimer = setTimeout(function() {
+					jqXHR.abort("timeout");
+				}, s.timeout );
+			}
+
+			try {
+				state = 1;
+				transport.send( requestHeaders, done );
+			} catch ( e ) {
+				// Propagate exception as error if not done
+				if ( state < 2 ) {
+					done( -1, e );
+				// Simply rethrow otherwise
+				} else {
+					throw e;
+				}
+			}
+		}
+
+		// Callback for when everything is done
+		function done( status, nativeStatusText, responses, headers ) {
+			var isSuccess, success, error, response, modified,
+				statusText = nativeStatusText;
+
+			// Called once
+			if ( state === 2 ) {
+				return;
+			}
+
+			// State is "done" now
+			state = 2;
+
+			// Clear timeout if it exists
+			if ( timeoutTimer ) {
+				clearTimeout( timeoutTimer );
+			}
+
+			// Dereference transport for early garbage collection
+			// (no matter how long the jqXHR object will be used)
+			transport = undefined;
+
+			// Cache response headers
+			responseHeadersString = headers || "";
+
+			// Set readyState
+			jqXHR.readyState = status > 0 ? 4 : 0;
+
+			// Determine if successful
+			isSuccess = status >= 200 && status < 300 || status === 304;
+
+			// Get response data
+			if ( responses ) {
+				response = ajaxHandleResponses( s, jqXHR, responses );
+			}
+
+			// Convert no matter what (that way responseXXX fields are always set)
+			response = ajaxConvert( s, response, jqXHR, isSuccess );
+
+			// If successful, handle type chaining
+			if ( isSuccess ) {
+
+				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
+				if ( s.ifModified ) {
+					modified = jqXHR.getResponseHeader("Last-Modified");
+					if ( modified ) {
+						jQuery.lastModified[ cacheURL ] = modified;
+					}
+					modified = jqXHR.getResponseHeader("etag");
+					if ( modified ) {
+						jQuery.etag[ cacheURL ] = modified;
+					}
+				}
+
+				// if no content
+				if ( status === 204 || s.type === "HEAD" ) {
+					statusText = "nocontent";
+
+				// if not modified
+				} else if ( status === 304 ) {
+					statusText = "notmodified";
+
+				// If we have data, let's convert it
+				} else {
+					statusText = response.state;
+					success = response.data;
+					error = response.error;
+					isSuccess = !error;
+				}
+			} else {
+				// We extract error from statusText
+				// then normalize statusText and status for non-aborts
+				error = statusText;
+				if ( status || !statusText ) {
+					statusText = "error";
+					if ( status < 0 ) {
+						status = 0;
+					}
+				}
+			}
+
+			// Set data for the fake xhr object
+			jqXHR.status = status;
+			jqXHR.statusText = ( nativeStatusText || statusText ) + "";
+
+			// Success/Error
+			if ( isSuccess ) {
+				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
+			} else {
+				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
+			}
+
+			// Status-dependent callbacks
+			jqXHR.statusCode( statusCode );
+			statusCode = undefined;
+
+			if ( fireGlobals ) {
+				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
+					[ jqXHR, s, isSuccess ? success : error ] );
+			}
+
+			// Complete
+			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
+
+			if ( fireGlobals ) {
+				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
+				// Handle the global AJAX counter
+				if ( !( --jQuery.active ) ) {
+					jQuery.event.trigger("ajaxStop");
+				}
+			}
+		}
+
+		return jqXHR;
+	},
+
+	getJSON: function( url, data, callback ) {
+		return jQuery.get( url, data, callback, "json" );
+	},
+
+	getScript: function( url, callback ) {
+		return jQuery.get( url, undefined, callback, "script" );
+	}
+});
+
+jQuery.each( [ "get", "post" ], function( i, method ) {
+	jQuery[ method ] = function( url, data, callback, type ) {
+		// shift arguments if data argument was omitted
+		if ( jQuery.isFunction( data ) ) {
+			type = type || callback;
+			callback = data;
+			data = undefined;
+		}
+
+		return jQuery.ajax({
+			url: url,
+			type: method,
+			dataType: type,
+			data: data,
+			success: callback
+		});
+	};
+});
+
+/* Handles responses to an ajax request:
+ * - finds the right dataType (mediates between content-type and expected dataType)
+ * - returns the corresponding response
+ */
+function ajaxHandleResponses( s, jqXHR, responses ) {
+
+	var ct, type, finalDataType, firstDataType,
+		contents = s.contents,
+		dataTypes = s.dataTypes;
+
+	// Remove auto dataType and get content-type in the process
+	while( dataTypes[ 0 ] === "*" ) {
+		dataTypes.shift();
+		if ( ct === undefined ) {
+			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
+		}
+	}
+
+	// Check if we're dealing with a known content-type
+	if ( ct ) {
+		for ( type in contents ) {
+			if ( contents[ type ] && contents[ type ].test( ct ) ) {
+				dataTypes.unshift( type );
+				break;
+			}
+		}
+	}
+
+	// Check to see if we have a response for the expected dataType
+	if ( dataTypes[ 0 ] in responses ) {
+		finalDataType = dataTypes[ 0 ];
+	} else {
+		// Try convertible dataTypes
+		for ( type in responses ) {
+			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
+				finalDataType = type;
+				break;
+			}
+			if ( !firstDataType ) {
+				firstDataType = type;
+			}
+		}
+		// Or just use first one
+		finalDataType = finalDataType || firstDataType;
+	}
+
+	// If we found a dataType
+	// We add the dataType to the list if needed
+	// and return the corresponding response
+	if ( finalDataType ) {
+		if ( finalDataType !== dataTypes[ 0 ] ) {
+			dataTypes.unshift( finalDataType );
+		}
+		return responses[ finalDataType ];
+	}
+}
+
+/* Chain conversions given the request and the original response
+ * Also sets the responseXXX fields on the jqXHR instance
+ */
+function ajaxConvert( s, response, jqXHR, isSuccess ) {
+	var conv2, current, conv, tmp, prev,
+		converters = {},
+		// Work with a copy of dataTypes in case we need to modify it for conversion
+		dataTypes = s.dataTypes.slice();
+
+	// Create converters map with lowercased keys
+	if ( dataTypes[ 1 ] ) {
+		for ( conv in s.converters ) {
+			converters[ conv.toLowerCase() ] = s.converters[ conv ];
+		}
+	}
+
+	current = dataTypes.shift();
+
+	// Convert to each sequential dataType
+	while ( current ) {
+
+		if ( s.responseFields[ current ] ) {
+			jqXHR[ s.responseFields[ current ] ] = response;
+		}
+
+		// Apply the dataFilter if provided
+		if ( !prev && isSuccess && s.dataFilter ) {
+			response = s.dataFilter( response, s.dataType );
+		}
+
+		prev = current;
+		current = dataTypes.shift();
+
+		if ( current ) {
+
+		// There's only work to do if current dataType is non-auto
+			if ( current === "*" ) {
+
+				current = prev;
+
+			// Convert response if prev dataType is non-auto and differs from current
+			} else if ( prev !== "*" && prev !== current ) {
+
+				// Seek a direct converter
+				conv = converters[ prev + " " + current ] || converters[ "* " + current ];
+
+				// If none found, seek a pair
+				if ( !conv ) {
+					for ( conv2 in converters ) {
+
+						// If conv2 outputs current
+						tmp = conv2.split( " " );
+						if ( tmp[ 1 ] === current ) {
+
+							// If prev can be converted to accepted input
+							conv = converters[ prev + " " + tmp[ 0 ] ] ||
+								converters[ "* " + tmp[ 0 ] ];
+							if ( conv ) {
+								// Condense equivalence converters
+								if ( conv === true ) {
+									conv = converters[ conv2 ];
+
+								// Otherwise, insert the intermediate dataType
+								} else if ( converters[ conv2 ] !== true ) {
+									current = tmp[ 0 ];
+									dataTypes.unshift( tmp[ 1 ] );
+								}
+								break;
+							}
+						}
+					}
+				}
+
+				// Apply converter (if not an equivalence)
+				if ( conv !== true ) {
+
+					// Unless errors are allowed to bubble, catch and return them
+					if ( conv && s[ "throws" ] ) {
+						response = conv( response );
+					} else {
+						try {
+							response = conv( response );
+						} catch ( e ) {
+							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
+						}
+					}
+				}
+			}
+		}
+	}
+
+	return { state: "success", data: response };
+}
+// Install script dataType
+jQuery.ajaxSetup({
+	accepts: {
+		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
+	},
+	contents: {
+		script: /(?:java|ecma)script/
+	},
+	converters: {
+		"text script": function( text ) {
+			jQuery.globalEval( text );
+			return text;
+		}
+	}
+});
+
+// Handle cache's special case and crossDomain
+jQuery.ajaxPrefilter( "script", function( s ) {
+	if ( s.cache === undefined ) {
+		s.cache = false;
+	}
+	if ( s.crossDomain ) {
+		s.type = "GET";
+	}
+});
+
+// Bind script tag hack transport
+jQuery.ajaxTransport( "script", function( s ) {
+	// This transport only deals with cross domain requests
+	if ( s.crossDomain ) {
+		var script, callback;
+		return {
+			send: function( _, complete ) {
+				script = jQuery("<script>").prop({
+					async: true,
+					charset: s.scriptCharset,
+					src: s.url
+				}).on(
+					"load error",
+					callback = function( evt ) {
+						script.remove();
+						callback = null;
+						if ( evt ) {
+							complete( evt.type === "error" ? 404 : 200, evt.type );
+						}
+					}
+				);
+				document.head.appendChild( script[ 0 ] );
+			},
+			abort: function() {
+				if ( callback ) {
+					callback();
+				}
+			}
+		};
+	}
+});
+var oldCallbacks = [],
+	rjsonp = /(=)\?(?=&|$)|\?\?/;
+
+// Default jsonp settings
+jQuery.ajaxSetup({
+	jsonp: "callback",
+	jsonpCallback: function() {
+		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
+		this[ callback ] = true;
+		return callback;
+	}
+});
+
+// Detect, normalize options and install callbacks for jsonp requests
+jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
+
+	var callbackName, overwritten, responseContainer,
+		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
+			"url" :
+			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
+		);
+
+	// Handle iff the expected data type is "jsonp" or we have a parameter to set
+	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
+
+		// Get callback name, remembering preexisting value associated with it
+		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
+			s.jsonpCallback() :
+			s.jsonpCallback;
+
+		// Insert callback into url or form data
+		if ( jsonProp ) {
+			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
+		} else if ( s.jsonp !== false ) {
+			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
+		}
+
+		// Use data converter to retrieve json after script execution
+		s.converters["script json"] = function() {
+			if ( !responseContainer ) {
+				jQuery.error( callbackName + " was not called" );
+			}
+			return responseContainer[ 0 ];
+		};
+
+		// force json dataType
+		s.dataTypes[ 0 ] = "json";
+
+		// Install callback
+		overwritten = window[ callbackName ];
+		window[ callbackName ] = function() {
+			responseContainer = arguments;
+		};
+
+		// Clean-up function (fires after converters)
+		jqXHR.always(function() {
+			// Restore preexisting value
+			window[ callbackName ] = overwritten;
+
+			// Save back as free
+			if ( s[ callbackName ] ) {
+				// make sure that re-using the options doesn't screw things around
+				s.jsonpCallback = originalSettings.jsonpCallback;
+
+				// save the callback name for future use
+				oldCallbacks.push( callbackName );
+			}
+
+			// Call if it was a function and we have a response
+			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
+				overwritten( responseContainer[ 0 ] );
+			}
+
+			responseContainer = overwritten = undefined;
+		});
+
+		// Delegate to script
+		return "script";
+	}
+});
+jQuery.ajaxSettings.xhr = function() {
+	try {
+		return new XMLHttpRequest();
+	} catch( e ) {}
+};
+
+var xhrSupported = jQuery.ajaxSettings.xhr(),
+	xhrSuccessStatus = {
+		// file protocol always yields status code 0, assume 200
+		0: 200,
+		// Support: IE9
+		// #1450: sometimes IE returns 1223 when it should be 204
+		1223: 204
+	},
+	// Support: IE9
+	// We need to keep track of outbound xhr and abort them manually
+	// because IE is not smart enough to do it all by itself
+	xhrId = 0,
+	xhrCallbacks = {};
+
+if ( window.ActiveXObject ) {
+	jQuery( window ).on( "unload", function() {
+		for( var key in xhrCallbacks ) {
+			xhrCallbacks[ key ]();
+		}
+		xhrCallbacks = undefined;
+	});
+}
+
+jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
+jQuery.support.ajax = xhrSupported = !!xhrSupported;
+
+jQuery.ajaxTransport(function( options ) {
+	var callback;
+	// Cross domain only allowed if supported through XMLHttpRequest
+	if ( jQuery.support.cors || xhrSupported && !options.crossDomain ) {
+		return {
+			send: function( headers, complete ) {
+				var i, id,
+					xhr = options.xhr();
+				xhr.open( options.type, options.url, options.async, options.username, options.password );
+				// Apply custom fields if provided
+				if ( options.xhrFields ) {
+					for ( i in options.xhrFields ) {
+						xhr[ i ] = options.xhrFields[ i ];
+					}
+				}
+				// Override mime type if needed
+				if ( options.mimeType && xhr.overrideMimeType ) {
+					xhr.overrideMimeType( options.mimeType );
+				}
+				// X-Requested-With header
+				// For cross-domain requests, seeing as conditions for a preflight are
+				// akin to a jigsaw puzzle, we simply never set it to be sure.
+				// (it can always be set on a per-request basis or even using ajaxSetup)
+				// For same-domain requests, won't change header if already provided.
+				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
+					headers["X-Requested-With"] = "XMLHttpRequest";
+				}
+				// Set headers
+				for ( i in headers ) {
+					xhr.setRequestHeader( i, headers[ i ] );
+				}
+				// Callback
+				callback = function( type ) {
+					return function() {
+						if ( callback ) {
+							delete xhrCallbacks[ id ];
+							callback = xhr.onload = xhr.onerror = null;
+							if ( type === "abort" ) {
+								xhr.abort();
+							} else if ( type === "error" ) {
+								complete(
+									// file protocol always yields status 0, assume 404
+									xhr.status || 404,
+									xhr.statusText
+								);
+							} else {
+								complete(
+									xhrSuccessStatus[ xhr.status ] || xhr.status,
+									xhr.statusText,
+									// Support: IE9
+									// #11426: When requesting binary data, IE9 will throw an exception
+									// on any attempt to access responseText
+									typeof xhr.responseText === "string" ? {
+										text: xhr.responseText
+									} : undefined,
+									xhr.getAllResponseHeaders()
+								);
+							}
+						}
+					};
+				};
+				// Listen to events
+				xhr.onload = callback();
+				xhr.onerror = callback("error");
+				// Create the abort callback
+				callback = xhrCallbacks[( id = xhrId++ )] = callback("abort");
+				// Do send the request
+				// This may raise an exception which is actually
+				// handled in jQuery.ajax (so no try/catch here)
+				xhr.send( options.hasContent && options.data || null );
+			},
+			abort: function() {
+				if ( callback ) {
+					callback();
+				}
+			}
+		};
+	}
+});
+var fxNow, timerId,
+	rfxtypes = /^(?:toggle|show|hide)$/,
+	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
+	rrun = /queueHooks$/,
+	animationPrefilters = [ defaultPrefilter ],
+	tweeners = {
+		"*": [function( prop, value ) {
+			var tween = this.createTween( prop, value ),
+				target = tween.cur(),
+				parts = rfxnum.exec( value ),
+				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
+
+				// Starting value computation is required for potential unit mismatches
+				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
+					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
+				scale = 1,
+				maxIterations = 20;
+
+			if ( start && start[ 3 ] !== unit ) {
+				// Trust units reported by jQuery.css
+				unit = unit || start[ 3 ];
+
+				// Make sure we update the tween properties later on
+				parts = parts || [];
+
+				// Iteratively approximate from a nonzero starting point
+				start = +target || 1;
+
+				do {
+					// If previous iteration zeroed out, double until we get *something*
+					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
+					scale = scale || ".5";
+
+					// Adjust and apply
+					start = start / scale;
+					jQuery.style( tween.elem, prop, start + unit );
+
+				// Update scale, tolerating zero or NaN from tween.cur()
+				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
+				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
+			}
+
+			// Update tween properties
+			if ( parts ) {
+				start = tween.start = +start || +target || 0;
+				tween.unit = unit;
+				// If a +=/-= token was provided, we're doing a relative animation
+				tween.end = parts[ 1 ] ?
+					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
+					+parts[ 2 ];
+			}
+
+			return tween;
+		}]
+	};
+
+// Animations created synchronously will run synchronously
+function createFxNow() {
+	setTimeout(function() {
+		fxNow = undefined;
+	});
+	return ( fxNow = jQuery.now() );
+}
+
+function createTween( value, prop, animation ) {
+	var tween,
+		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
+		index = 0,
+		length = collection.length;
+	for ( ; index < length; index++ ) {
+		if ( (tween = collection[ index ].call( animation, prop, value )) ) {
+
+			// we're done with this property
+			return tween;
+		}
+	}
+}
+
+function Animation( elem, properties, options ) {
+	var result,
+		stopped,
+		index = 0,
+		length = animationPrefilters.length,
+		deferred = jQuery.Deferred().always( function() {
+			// don't match elem in the :animated selector
+			delete tick.elem;
+		}),
+		tick = function() {
+			if ( stopped ) {
+				return false;
+			}
+			var currentTime = fxNow || createFxNow(),
+				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
+				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
+				temp = remaining / animation.duration || 0,
+				percent = 1 - temp,
+				index = 0,
+				length = animation.tweens.length;
+
+			for ( ; index < length ; index++ ) {
+				animation.tweens[ index ].run( percent );
+			}
+
+			deferred.notifyWith( elem, [ animation, percent, remaining ]);
+
+			if ( percent < 1 && length ) {
+				return remaining;
+			} else {
+				deferred.resolveWith( elem, [ animation ] );
+				return false;
+			}
+		},
+		animation = deferred.promise({
+			elem: elem,
+			props: jQuery.extend( {}, properties ),
+			opts: jQuery.extend( true, { specialEasing: {} }, options ),
+			originalProperties: properties,
+			originalOptions: options,
+			startTime: fxNow || createFxNow(),
+			duration: options.duration,
+			tweens: [],
+			createTween: function( prop, end ) {
+				var tween = jQuery.Tween( elem, animation.opts, prop, end,
+						animation.opts.specialEasing[ prop ] || animation.opts.easing );
+				animation.tweens.push( tween );
+				return tween;
+			},
+			stop: function( gotoEnd ) {
+				var index = 0,
+					// if we are going to the end, we want to run all the tweens
+					// otherwise we skip this part
+					length = gotoEnd ? animation.tweens.length : 0;
+				if ( stopped ) {
+					return this;
+				}
+				stopped = true;
+				for ( ; index < length ; index++ ) {
+					animation.tweens[ index ].run( 1 );
+				}
+
+				// resolve when we played the last frame
+				// otherwise, reject
+				if ( gotoEnd ) {
+					deferred.resolveWith( elem, [ animation, gotoEnd ] );
+				} else {
+					deferred.rejectWith( elem, [ animation, gotoEnd ] );
+				}
+				return this;
+			}
+		}),
+		props = animation.props;
+
+	propFilter( props, animation.opts.specialEasing );
+
+	for ( ; index < length ; index++ ) {
+		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
+		if ( result ) {
+			return result;
+		}
+	}
+
+	jQuery.map( props, createTween, animation );
+
+	if ( jQuery.isFunction( animation.opts.start ) ) {
+		animation.opts.start.call( elem, animation );
+	}
+
+	jQuery.fx.timer(
+		jQuery.extend( tick, {
+			elem: elem,
+			anim: animation,
+			queue: animation.opts.queue
+		})
+	);
+
+	// attach callbacks from options
+	return animation.progress( animation.opts.progress )
+		.done( animation.opts.done, animation.opts.complete )
+		.fail( animation.opts.fail )
+		.always( animation.opts.always );
+}
+
+function propFilter( props, specialEasing ) {
+	var index, name, easing, value, hooks;
+
+	// camelCase, specialEasing and expand cssHook pass
+	for ( index in props ) {
+		name = jQuery.camelCase( index );
+		easing = specialEasing[ name ];
+		value = props[ index ];
+		if ( jQuery.isArray( value ) ) {
+			easing = value[ 1 ];
+			value = props[ index ] = value[ 0 ];
+		}
+
+		if ( index !== name ) {
+			props[ name ] = value;
+			delete props[ index ];
+		}
+
+		hooks = jQuery.cssHooks[ name ];
+		if ( hooks && "expand" in hooks ) {
+			value = hooks.expand( value );
+			delete props[ name ];
+
+			// not quite $.extend, this wont overwrite keys already present.
+			// also - reusing 'index' from above because we have the correct "name"
+			for ( index in value ) {
+				if ( !( index in props ) ) {
+					props[ index ] = value[ index ];
+					specialEasing[ index ] = easing;
+				}
+			}
+		} else {
+			specialEasing[ name ] = easing;
+		}
+	}
+}
+
+jQuery.Animation = jQuery.extend( Animation, {
+
+	tweener: function( props, callback ) {
+		if ( jQuery.isFunction( props ) ) {
+			callback = props;
+			props = [ "*" ];
+		} else {
+			props = props.split(" ");
+		}
+
+		var prop,
+			index = 0,
+			length = props.length;
+
+		for ( ; index < length ; index++ ) {
+			prop = props[ index ];
+			tweeners[ prop ] = tweeners[ prop ] || [];
+			tweeners[ prop ].unshift( callback );
+		}
+	},
+
+	prefilter: function( callback, prepend ) {
+		if ( prepend ) {
+			animationPrefilters.unshift( callback );
+		} else {
+			animationPrefilters.push( callback );
+		}
+	}
+});
+
+function defaultPrefilter( elem, props, opts ) {
+	/* jshint validthis: true */
+	var prop, value, toggle, tween, hooks, oldfire,
+		anim = this,
+		orig = {},
+		style = elem.style,
+		hidden = elem.nodeType && isHidden( elem ),
+		dataShow = data_priv.get( elem, "fxshow" );
+
+	// handle queue: false promises
+	if ( !opts.queue ) {
+		hooks = jQuery._queueHooks( elem, "fx" );
+		if ( hooks.unqueued == null ) {
+			hooks.unqueued = 0;
+			oldfire = hooks.empty.fire;
+			hooks.empty.fire = function() {
+				if ( !hooks.unqueued ) {
+					oldfire();
+				}
+			};
+		}
+		hooks.unqueued++;
+
+		anim.always(function() {
+			// doing this makes sure that the complete handler will be called
+			// before this completes
+			anim.always(function() {
+				hooks.unqueued--;
+				if ( !jQuery.queue( elem, "fx" ).length ) {
+					hooks.empty.fire();
+				}
+			});
+		});
+	}
+
+	// height/width overflow pass
+	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
+		// Make sure that nothing sneaks out
+		// Record all 3 overflow attributes because IE9-10 do not
+		// change the overflow attribute when overflowX and
+		// overflowY are set to the same value
+		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
+
+		// Set display property to inline-block for height/width
+		// animations on inline elements that are having width/height animated
+		if ( jQuery.css( elem, "display" ) === "inline" &&
+				jQuery.css( elem, "float" ) === "none" ) {
+
+			style.display = "inline-block";
+		}
+	}
+
+	if ( opts.overflow ) {
+		style.overflow = "hidden";
+		anim.always(function() {
+			style.overflow = opts.overflow[ 0 ];
+			style.overflowX = opts.overflow[ 1 ];
+			style.overflowY = opts.overflow[ 2 ];
+		});
+	}
+
+
+	// show/hide pass
+	for ( prop in props ) {
+		value = props[ prop ];
+		if ( rfxtypes.exec( value ) ) {
+			delete props[ prop ];
+			toggle = toggle || value === "toggle";
+			if ( value === ( hidden ? "hide" : "show" ) ) {
+
+				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
+				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
+					hidden = true;
+				} else {
+					continue;
+				}
+			}
+			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
+		}
+	}
+
+	if ( !jQuery.isEmptyObject( orig ) ) {
+		if ( dataShow ) {
+			if ( "hidden" in dataShow ) {
+				hidden = dataShow.hidden;
+			}
+		} else {
+			dataShow = data_priv.access( elem, "fxshow", {} );
+		}
+
+		// store state if its toggle - enables .stop().toggle() to "reverse"
+		if ( toggle ) {
+			dataShow.hidden = !hidden;
+		}
+		if ( hidden ) {
+			jQuery( elem ).show();
+		} else {
+			anim.done(function() {
+				jQuery( elem ).hide();
+			});
+		}
+		anim.done(function() {
+			var prop;
+
+			data_priv.remove( elem, "fxshow" );
+			for ( prop in orig ) {
+				jQuery.style( elem, prop, orig[ prop ] );
+			}
+		});
+		for ( prop in orig ) {
+			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
+
+			if ( !( prop in dataShow ) ) {
+				dataShow[ prop ] = tween.start;
+				if ( hidden ) {
+					tween.end = tween.start;
+					tween.start = prop === "width" || prop === "height" ? 1 : 0;
+				}
+			}
+		}
+	}
+}
+
+function Tween( elem, options, prop, end, easing ) {
+	return new Tween.prototype.init( elem, options, prop, end, easing );
+}
+jQuery.Tween = Tween;
+
+Tween.prototype = {
+	constructor: Tween,
+	init: function( elem, options, prop, end, easing, unit ) {
+		this.elem = elem;
+		this.prop = prop;
+		this.easing = easing || "swing";
+		this.options = options;
+		this.start = this.now = this.cur();
+		this.end = end;
+		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
+	},
+	cur: function() {
+		var hooks = Tween.propHooks[ this.prop ];
+
+		return hooks && hooks.get ?
+			hooks.get( this ) :
+			Tween.propHooks._default.get( this );
+	},
+	run: function( percent ) {
+		var eased,
+			hooks = Tween.propHooks[ this.prop ];
+
+		if ( this.options.duration ) {
+			this.pos = eased = jQuery.easing[ this.easing ](
+				percent, this.options.duration * percent, 0, 1, this.options.duration
+			);
+		} else {
+			this.pos = eased = percent;
+		}
+		this.now = ( this.end - this.start ) * eased + this.start;
+
+		if ( this.options.step ) {
+			this.options.step.call( this.elem, this.now, this );
+		}
+
+		if ( hooks && hooks.set ) {
+			hooks.set( this );
+		} else {
+			Tween.propHooks._default.set( this );
+		}
+		return this;
+	}
+};
+
+Tween.prototype.init.prototype = Tween.prototype;
+
+Tween.propHooks = {
+	_default: {
+		get: function( tween ) {
+			var result;
+
+			if ( tween.elem[ tween.prop ] != null &&
+				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
+				return tween.elem[ tween.prop ];
+			}
+
+			// passing an empty string as a 3rd parameter to .css will automatically
+			// attempt a parseFloat and fallback to a string if the parse fails
+			// so, simple values such as "10px" are parsed to Float.
+			// complex values such as "rotate(1rad)" are returned as is.
+			result = jQuery.css( tween.elem, tween.prop, "" );
+			// Empty strings, null, undefined and "auto" are converted to 0.
+			return !result || result === "auto" ? 0 : result;
+		},
+		set: function( tween ) {
+			// use step hook for back compat - use cssHook if its there - use .style if its
+			// available and use plain properties where available
+			if ( jQuery.fx.step[ tween.prop ] ) {
+				jQuery.fx.step[ tween.prop ]( tween );
+			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
+				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
+			} else {
+				tween.elem[ tween.prop ] = tween.now;
+			}
+		}
+	}
+};
+
+// Support: IE9
+// Panic based approach to setting things on disconnected nodes
+
+Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
+	set: function( tween ) {
+		if ( tween.elem.nodeType && tween.elem.parentNode ) {
+			tween.elem[ tween.prop ] = tween.now;
+		}
+	}
+};
+
+jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
+	var cssFn = jQuery.fn[ name ];
+	jQuery.fn[ name ] = function( speed, easing, callback ) {
+		return speed == null || typeof speed === "boolean" ?
+			cssFn.apply( this, arguments ) :
+			this.animate( genFx( name, true ), speed, easing, callback );
+	};
+});
+
+jQuery.fn.extend({
+	fadeTo: function( speed, to, easing, callback ) {
+
+		// show any hidden elements after setting opacity to 0
+		return this.filter( isHidden ).css( "opacity", 0 ).show()
+
+			// animate to the value specified
+			.end().animate({ opacity: to }, speed, easing, callback );
+	},
+	animate: function( prop, speed, easing, callback ) {
+		var empty = jQuery.isEmptyObject( prop ),
+			optall = jQuery.speed( speed, easing, callback ),
+			doAnimation = function() {
+				// Operate on a copy of prop so per-property easing won't be lost
+				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
+
+				// Empty animations, or finishing resolves immediately
+				if ( empty || data_priv.get( this, "finish" ) ) {
+					anim.stop( true );
+				}
+			};
+			doAnimation.finish = doAnimation;
+
+		return empty || optall.queue === false ?
+			this.each( doAnimation ) :
+			this.queue( optall.queue, doAnimation );
+	},
+	stop: function( type, clearQueue, gotoEnd ) {
+		var stopQueue = function( hooks ) {
+			var stop = hooks.stop;
+			delete hooks.stop;
+			stop( gotoEnd );
+		};
+
+		if ( typeof type !== "string" ) {
+			gotoEnd = clearQueue;
+			clearQueue = type;
+			type = undefined;
+		}
+		if ( clearQueue && type !== false ) {
+			this.queue( type || "fx", [] );
+		}
+
+		return this.each(function() {
+			var dequeue = true,
+				index = type != null && type + "queueHooks",
+				timers = jQuery.timers,
+				data = data_priv.get( this );
+
+			if ( index ) {
+				if ( data[ index ] && data[ index ].stop ) {
+					stopQueue( data[ index ] );
+				}
+			} else {
+				for ( index in data ) {
+					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
+						stopQueue( data[ index ] );
+					}
+				}
+			}
+
+			for ( index = timers.length; index--; ) {
+				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
+					timers[ index ].anim.stop( gotoEnd );
+					dequeue = false;
+					timers.splice( index, 1 );
+				}
+			}
+
+			// start the next in the queue if the last step wasn't forced
+			// timers currently will call their complete callbacks, which will dequeue
+			// but only if they were gotoEnd
+			if ( dequeue || !gotoEnd ) {
+				jQuery.dequeue( this, type );
+			}
+		});
+	},
+	finish: function( type ) {
+		if ( type !== false ) {
+			type = type || "fx";
+		}
+		return this.each(function() {
+			var index,
+				data = data_priv.get( this ),
+				queue = data[ type + "queue" ],
+				hooks = data[ type + "queueHooks" ],
+				timers = jQuery.timers,
+				length = queue ? queue.length : 0;
+
+			// enable finishing flag on private data
+			data.finish = true;
+
+			// empty the queue first
+			jQuery.queue( this, type, [] );
+
+			if ( hooks && hooks.stop ) {
+				hooks.stop.call( this, true );
+			}
+
+			// look for any active animations, and finish them
+			for ( index = timers.length; index--; ) {
+				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
+					timers[ index ].anim.stop( true );
+					timers.splice( index, 1 );
+				}
+			}
+
+			// look for any animations in the old queue and finish them
+			for ( index = 0; index < length; index++ ) {
+				if ( queue[ index ] && queue[ index ].finish ) {
+					queue[ index ].finish.call( this );
+				}
+			}
+
+			// turn off finishing flag
+			delete data.finish;
+		});
+	}
+});
+
+// Generate parameters to create a standard animation
+function genFx( type, includeWidth ) {
+	var which,
+		attrs = { height: type },
+		i = 0;
+
+	// if we include width, step value is 1 to do all cssExpand values,
+	// if we don't include width, step value is 2 to skip over Left and Right
+	includeWidth = includeWidth? 1 : 0;
+	for( ; i < 4 ; i += 2 - includeWidth ) {
+		which = cssExpand[ i ];
+		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
+	}
+
+	if ( includeWidth ) {
+		attrs.opacity = attrs.width = type;
+	}
+
+	return attrs;
+}
+
+// Generate shortcuts for custom animations
+jQuery.each({
+	slideDown: genFx("show"),
+	slideUp: genFx("hide"),
+	slideToggle: genFx("toggle"),
+	fadeIn: { opacity: "show" },
+	fadeOut: { opacity: "hide" },
+	fadeToggle: { opacity: "toggle" }
+}, function( name, props ) {
+	jQuery.fn[ name ] = function( speed, easing, callback ) {
+		return this.animate( props, speed, easing, callback );
+	};
+});
+
+jQuery.speed = function( speed, easing, fn ) {
+	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
+		complete: fn || !fn && easing ||
+			jQuery.isFunction( speed ) && speed,
+		duration: speed,
+		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
+	};
+
+	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
+		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
+
+	// normalize opt.queue - true/undefined/null -> "fx"
+	if ( opt.queue == null || opt.queue === true ) {
+		opt.queue = "fx";
+	}
+
+	// Queueing
+	opt.old = opt.complete;
+
+	opt.complete = function() {
+		if ( jQuery.isFunction( opt.old ) ) {
+			opt.old.call( this );
+		}
+
+		if ( opt.queue ) {
+			jQuery.dequeue( this, opt.queue );
+		}
+	};
+
+	return opt;
+};
+
+jQuery.easing = {
+	linear: function( p ) {
+		return p;
+	},
+	swing: function( p ) {
+		return 0.5 - Math.cos( p*Math.PI ) / 2;
+	}
+};
+
+jQuery.timers = [];
+jQuery.fx = Tween.prototype.init;
+jQuery.fx.tick = function() {
+	var timer,
+		timers = jQuery.timers,
+		i = 0;
+
+	fxNow = jQuery.now();
+
+	for ( ; i < timers.length; i++ ) {
+		timer = timers[ i ];
+		// Checks the timer has not already been removed
+		if ( !timer() && timers[ i ] === timer ) {
+			timers.splice( i--, 1 );
+		}
+	}
+
+	if ( !timers.length ) {
+		jQuery.fx.stop();
+	}
+	fxNow = undefined;
+};
+
+jQuery.fx.timer = function( timer ) {
+	if ( timer() && jQuery.timers.push( timer ) ) {
+		jQuery.fx.start();
+	}
+};
+
+jQuery.fx.interval = 13;
+
+jQuery.fx.start = function() {
+	if ( !timerId ) {
+		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
+	}
+};
+
+jQuery.fx.stop = function() {
+	clearInterval( timerId );
+	timerId = null;
+};
+
+jQuery.fx.speeds = {
+	slow: 600,
+	fast: 200,
+	// Default speed
+	_default: 400
+};
+
+// Back Compat <1.8 extension point
+jQuery.fx.step = {};
+
+if ( jQuery.expr && jQuery.expr.filters ) {
+	jQuery.expr.filters.animated = function( elem ) {
+		return jQuery.grep(jQuery.timers, function( fn ) {
+			return elem === fn.elem;
+		}).length;
+	};
+}
+jQuery.fn.offset = function( options ) {
+	if ( arguments.length ) {
+		return options === undefined ?
+			this :
+			this.each(function( i ) {
+				jQuery.offset.setOffset( this, options, i );
+			});
+	}
+
+	var docElem, win,
+		elem = this[ 0 ],
+		box = { top: 0, left: 0 },
+		doc = elem && elem.ownerDocument;
+
+	if ( !doc ) {
+		return;
+	}
+
+	docElem = doc.documentElement;
+
+	// Make sure it's not a disconnected DOM node
+	if ( !jQuery.contains( docElem, elem ) ) {
+		return box;
+	}
+
+	// If we don't have gBCR, just use 0,0 rather than error
+	// BlackBerry 5, iOS 3 (original iPhone)
+	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
+		box = elem.getBoundingClientRect();
+	}
+	win = getWindow( doc );
+	return {
+		top: box.top + win.pageYOffset - docElem.clientTop,
+		left: box.left + win.pageXOffset - docElem.clientLeft
+	};
+};
+
+jQuery.offset = {
+
+	setOffset: function( elem, options, i ) {
+		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
+			position = jQuery.css( elem, "position" ),
+			curElem = jQuery( elem ),
+			props = {};
+
+		// Set position first, in-case top/left are set even on static elem
+		if ( position === "static" ) {
+			elem.style.position = "relative";
+		}
+
+		curOffset = curElem.offset();
+		curCSSTop = jQuery.css( elem, "top" );
+		curCSSLeft = jQuery.css( elem, "left" );
+		calculatePosition = ( position === "absolute" || position === "fixed" ) && ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;
+
+		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
+		if ( calculatePosition ) {
+			curPosition = curElem.position();
+			curTop = curPosition.top;
+			curLeft = curPosition.left;
+
+		} else {
+			curTop = parseFloat( curCSSTop ) || 0;
+			curLeft = parseFloat( curCSSLeft ) || 0;
+		}
+
+		if ( jQuery.isFunction( options ) ) {
+			options = options.call( elem, i, curOffset );
+		}
+
+		if ( options.top != null ) {
+			props.top = ( options.top - curOffset.top ) + curTop;
+		}
+		if ( options.left != null ) {
+			props.left = ( options.left - curOffset.left ) + curLeft;
+		}
+
+		if ( "using" in options ) {
+			options.using.call( elem, props );
+
+		} else {
+			curElem.css( props );
+		}
+	}
+};
+
+
+jQuery.fn.extend({
+
+	position: function() {
+		if ( !this[ 0 ] ) {
+			return;
+		}
+
+		var offsetParent, offset,
+			elem = this[ 0 ],
+			parentOffset = { top: 0, left: 0 };
+
+		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
+		if ( jQuery.css( elem, "position" ) === "fixed" ) {
+			// We assume that getBoundingClientRect is available when computed position is fixed
+			offset = elem.getBoundingClientRect();
+
+		} else {
+			// Get *real* offsetParent
+			offsetParent = this.offsetParent();
+
+			// Get correct offsets
+			offset = this.offset();
+			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
+				parentOffset = offsetParent.offset();
+			}
+
+			// Add offsetParent borders
+			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
+			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
+		}
+
+		// Subtract parent offsets and element margins
+		return {
+			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
+			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
+		};
+	},
+
+	offsetParent: function() {
+		return this.map(function() {
+			var offsetParent = this.offsetParent || docElem;
+
+			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
+				offsetParent = offsetParent.offsetParent;
+			}
+
+			return offsetParent || docElem;
+		});
+	}
+});
+
+
+// Create scrollLeft and scrollTop methods
+jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
+	var top = "pageYOffset" === prop;
+
+	jQuery.fn[ method ] = function( val ) {
+		return jQuery.access( this, function( elem, method, val ) {
+			var win = getWindow( elem );
+
+			if ( val === undefined ) {
+				return win ? win[ prop ] : elem[ method ];
+			}
+
+			if ( win ) {
+				win.scrollTo(
+					!top ? val : window.pageXOffset,
+					top ? val : window.pageYOffset
+				);
+
+			} else {
+				elem[ method ] = val;
+			}
+		}, method, val, arguments.length, null );
+	};
+});
+
+function getWindow( elem ) {
+	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
+}
+// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
+jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
+	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
+		// margin is only for outerHeight, outerWidth
+		jQuery.fn[ funcName ] = function( margin, value ) {
+			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
+				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
+
+			return jQuery.access( this, function( elem, type, value ) {
+				var doc;
+
+				if ( jQuery.isWindow( elem ) ) {
+					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
+					// isn't a whole lot we can do. See pull request at this URL for discussion:
+					// https://github.com/jquery/jquery/pull/764
+					return elem.document.documentElement[ "client" + name ];
+				}
+
+				// Get document width or height
+				if ( elem.nodeType === 9 ) {
+					doc = elem.documentElement;
+
+					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
+					// whichever is greatest
+					return Math.max(
+						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
+						elem.body[ "offset" + name ], doc[ "offset" + name ],
+						doc[ "client" + name ]
+					);
+				}
+
+				return value === undefined ?
+					// Get width or height on the element, requesting but not forcing parseFloat
+					jQuery.css( elem, type, extra ) :
+
+					// Set width or height on the element
+					jQuery.style( elem, type, value, extra );
+			}, type, chainable ? margin : undefined, chainable, null );
+		};
+	});
+});
+// Limit scope pollution from any deprecated API
+// (function() {
+
+// The number of elements contained in the matched element set
+jQuery.fn.size = function() {
+	return this.length;
+};
+
+jQuery.fn.andSelf = jQuery.fn.addBack;
+
+// })();
+if ( typeof module === "object" && module && typeof module.exports === "object" ) {
+	// Expose jQuery as module.exports in loaders that implement the Node
+	// module pattern (including browserify). Do not create the global, since
+	// the user will be storing it themselves locally, and globals are frowned
+	// upon in the Node module world.
+	module.exports = jQuery;
+} else {
+	// Register as a named AMD module, since jQuery can be concatenated with other
+	// files that may use define, but not via a proper concatenation script that
+	// understands anonymous AMD modules. A named AMD is safest and most robust
+	// way to register. Lowercase jquery is used because AMD module names are
+	// derived from file names, and jQuery is normally delivered in a lowercase
+	// file name. Do this after creating the global so that if an AMD module wants
+	// to call noConflict to hide this version of jQuery, it will work.
+	if ( typeof define === "function" && define.amd ) {
+		define( "jquery", [], function () { return jQuery; } );
+	}
+}
+
+// If there is a window object, that at least has a document property,
+// define jQuery and $ identifiers
+if ( typeof window === "object" && typeof window.document === "object" ) {
+	window.jQuery = window.$ = jQuery;
+}
+
+})( window );
Index: mp/testingFramework2/shelpers.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/shelpers.js	(revision )
+++ mp/testingFramework2/shelpers.js	(revision )
@@ -0,0 +1,3689 @@
+/**
+ * Helpers methods
+ */
+
+(function () {
+
+    var isNode = true
+
+    if (typeof exports === 'undefined' || exports.isNode == false) {
+        isNode = false
+    }
+
+    if ( isNode ) {
+        var path = require('path')
+    } else {
+        require = function () {
+            return {};
+        }
+    }
+
+    function trim1(str) {
+        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
+    }
+
+
+    var helper = {}
+    var sh = helper;
+
+    var str = {}
+    sh.str = str;
+    sh.fs = {};
+    sh.errors = {}
+    str.createName = function createName(count ) {
+        var strs = "Sudie, Carroll, Basil, Mayola, Regina, Horacio, Tiera, Randolph, Andres, Tammi, Cathey, Serafina, Grace, Ellan, Micha, Martina, Loren, Barton, Kirk, Regan"
+        strs = sh.splitStrIntoArray(strs);
+        var val = '';
+        for ( var i =0; i < count; i++) {
+            var name = sh.array.getRandomItem(strs)
+            val +=   name
+            if ( count != i -1 ) {
+                val += ' '
+            }
+        }
+        return val
+    }
+
+    /**
+     * Example usage:
+
+     pad(10, 4);      // 0010
+     pad(9, 4);       // 0009
+     pad(123, 4);     // 0123
+
+     pad(10, 4, '-'); // --10
+     * @param n
+     * @param width
+     * @param z
+     * @returns {*}
+     */
+    str.pad = function pad(n, width, z) {
+        z = z || '0';
+        n = n + '';
+        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
+    }
+
+    /*
+     String.prototype.splice = function( idx, rem, s ) {
+     return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
+     };
+     */
+    function splice(str, idx, rem, s) {
+        return (str.slice(0, idx) + s + str.slice(idx + Math.abs(rem)));
+    };
+
+    String.prototype.replaceBetween = function (start, end, what) {
+        return this.substring(0, start) + what + this.substring(end);
+    };
+
+    function includes(url, subStr) {
+        return url.indexOf(subStr) != -1
+    }
+
+    function includes(url, subStr, lowerCase) {
+
+        if (url == null) {
+            return false
+        }
+        if ( lowerCase == true) {
+            if ( sh.isArray(url )){
+                var urlR = [];
+                sh.each(url, function lowerCaseAll(k,v){
+                    urlR.push(v.toLowerCase())
+                })
+                url = urlR;
+            } else {
+                url = url.toString();
+                url = url.toLowerCase()
+            }
+            if (subStr != null) {
+                subStr = subStr.toString().toLowerCase()
+            }
+        }
+        return url.indexOf(subStr) != -1
+    }
+
+    function removeFromArray(array, value, clone ) {
+        var index = array.indexOf(value)
+        if ( index == 0 )
+            return array;
+
+        array.splice(index, 1);
+        return array;
+    }
+
+    function endsWith (str, suffix) {
+
+        return str.indexOf(suffix, str.length - suffix.length) !== -1;
+    }
+
+    function startsWith (str, subStr) {
+        if (str == null) {
+            return;
+        }
+        return str.indexOf(subStr) == 0 ;
+    }
+
+    /**
+     * Readible verion of replace
+     * @param url
+     * @param subStr
+     * @returns {boolean}
+     */
+    function replace(str, find, replaceWith) {
+        function escapeRegExp(string) {
+            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
+        }
+        // So in order to make the replaceAll function above safer, it could be modified to the following if you also include escapeRegExp:
+
+        // function replaceAll(string, find, replace) {
+        return str.replace(new RegExp(escapeRegExp(find), 'g'), replaceWith);
+        //  }
+
+        // String.prototype.replaceAll = function (find, replace) {
+        //var str = this;
+        find = new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')
+        return str.replace( find
+            , replaceWith);
+
+        // return str.replace(new RegExp(subStr, 'g'), replaceWith);
+        // };
+        // str = str.replace(subStr, replaceWith)
+        // return str
+
+    }
+
+    /**
+     * String.prototype.insert = function (index, string) {
+  if (index > 0)
+    return this.substring(0, index) + string + this.substring(index, this.length);
+  else
+    return string + this;
+};
+     * @param str
+     * @param subStr
+     * @returns {boolean}
+     */
+    function insert(str, index, addIn) {
+        if (index > 0)
+            return str.substring(0, index) + addIn + str.substring(index, str.length);
+        else
+            return string + str;
+    }
+
+    /**
+     * Case insnsitive
+     * @param url
+     * @param subStr
+     * @returns {*}
+     */
+    function includes2(url, subStr) {
+        if (url == null) {
+            return false
+        }
+        return includes(url.toLowerCase(), subStr.toLowerCase())
+    }
+
+
+    function remove_win_newlines(txt) {
+        txt = txt.replace(/\r?\n|\r/g, '\n')
+        return txt
+    }
+
+    function stripBadFiles(file, replaceWith) {
+        //var file = file.replace(/\//g, '_')
+        //file = file.replace(/\\/g, '_')
+        var replaceWith = sh.defaultValue(replaceWith, '')
+        file = file.replace(/[^\w\s]/gi, '') /*\.*/
+        return file
+    }
+    function replaceBackslash(str) {
+        var replaced = str.replace(/\\/gi, "/");
+        return replaced
+    }
+
+
+
+
+    function stripSpecialChars(file) {
+        file = file.replace(/[^\w]/gi, '_')
+        return file
+    }
+
+    /**
+     * This script can run a series of tests
+     * @param items
+     * @constructor
+     */
+
+    function GoThroughEach(items) {
+        var async = require('async')
+        var self = this;
+        var p = GoThroughEach.prototype;
+
+        p.setIndex = function setIndex(newIndex) {
+            self.currentIndex = newIndex;
+        }
+
+
+        self.items = items
+
+        self.items = items
+
+
+        self.config = {};
+
+        self.go = function go(arr, fxItemCallback, fxComplete, timeDelay_, autoStart) {
+            self.complete = false;
+            if (arr instanceof Array) {
+                self.items = arr;
+                self.fxComplete = fxComplete
+                self.fxItemCallback = fxItemCallback;
+            } else {
+                var config = arr; //user sent in obj
+                self.items = config.items;
+                if (config.fxDone == null) {
+                    throw 'supply fxDone'
+                }
+                self.fxComplete = config.fxDone;
+                self.fxItemCallback = config.fxItem;
+                ;
+                self.config = config;
+                autoStart = self.autoStart;///// = config;
+            }
+            self.currentIndex = -1
+            self.timeDelay = timeDelay_
+            if (self.timeDelay > 0) {
+                /*if ( timer != null )
+                 timer.removeEventListener(TimerEvent.TIMER, this.nextTimerComplete )
+                 timer = new Timer(timeDelay,1 )
+                 timer.addEventListener(TimerEvent.TIMER, this.nextTimerComplete )*/
+            }
+            if (autoStart != false) {
+                // self.nextItem(null, true);
+                self.start()
+            }
+
+
+        }
+
+        self.start = function start() {
+            var limit = sh.defaultValue(self.config.concurrency, 1)
+            async.forEachLimit(self.items, limit, function (item, callback) {
+                //db.delete('messages', messageId, callback);
+                //fx(callbackPlay)
+                self.fxItemCallback(item, callback)
+            }, function (err) {
+                if (err) console.error(err)
+                self.fxComplete();
+
+            });
+        }
+
+        //remove this method .... use async callback only
+        self.XnextItem = function nextItem(e, timed, internallySet) {
+            /*if ( self.currentIndex != -1 && ( self.currentIndex != self.items.length ) ||  PauseFirstAndLast )
+             {
+             if ( self.items.length != 0 )
+             {
+             if ( timeDelay != 0 && timed == false  )
+             {
+             this.timer.reset();
+             this.timer.start();
+             return;
+             }
+             }
+             }*/
+            if (self.config.concurrent != null && internallySet != true) {
+                self.handleConcurrency()
+                return;
+            }
+            if (this.complete == true)
+                return;
+            self.currentIndex++
+            if (self.currentIndex >= self.items.length) {
+                self.end();
+                return;
+            }
+            var currentItem = self.items[self.currentIndex]
+            self.fxItemCallback(currentItem, self.nextItem);
+            //self.execution.waitingFor.add()
+        }
+
+
+        self.handleConcurrency = function handleConcurrency() {
+            //how many ouconing requests
+
+        }
+
+        /*self.start = function start() {
+         self.currentIndex=-1;
+         self.running = false;
+         self.complete = false;
+         self.nextItem()
+         }*/
+        self.next = function next() {
+            self.nextItem()
+        }
+
+        self.end = function end(callEndFxCallback) {
+            //if ( this.timer != null ) 	this.timer.stop() ;
+            self.complete = true;  //call complete first so we do not interfere wtih starting again ...
+            //self.items = [] ; //
+
+            var fxFinal = self.fxComplete
+            //self.fxComplete = null
+
+            //call final fx last to prevent anything that has restarted the loop and reused
+            //this instance from losign variables ...
+            if (callEndFxCallback != false) {
+                if (fxFinal != null)
+                    fxFinal();
+            }
+        }
+
+        self.last = function last() {
+            index = self.items.length - 1
+            return self.items[index];
+        }
+
+        self.reset = function reset(sendEndFx) {
+            self.currentIndex = 0;
+            self.running = false;
+            self.complete = false;
+            if (sendEndFx == true) {
+                sh.callIfDefined(fxComplete)
+            }
+        }
+
+
+    }
+
+    function testGoThroughEach() {
+        function fxItem(item, callback) {
+            console.log(item, sh.getTime())
+            sh.waitXSecs(1, callback)
+            //n.next()
+        }
+
+        function fxDone() {
+            console.log('done')
+        }
+
+        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
+        var n = new GoThroughEach(arr)
+        // n.go(arr,fxItem, fxDone)
+        n.go({items: arr,
+                fxItem: fxItem,
+                fxDone: fxDone,
+                concurrency: 2
+
+            }
+
+        )
+
+    }
+
+
+    function dictMakeByName(arr, prop) {
+        prop = sh.defaultValue(prop, 'prop')
+        var dict ={}
+        sh.each(arr, function iter(i,item){
+            var key = item[prop]
+            dict[key] = item;
+        })
+
+        return dict
+    }
+
+    function DictArray() {
+        var self = this;
+        var p = DictArray.prototype;
+
+
+        self.add = function add(key, val) {
+            var arr = this[key]
+            if (arr == null) {
+                arr = []
+            }
+            arr.push(val)
+            this[key] = arr;
+        }
+
+
+    }
+
+    function testDictArray() {
+        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
+        var n = new DictArray()
+        n.add('aa', 1)
+        n.add('aa', 2)
+        n.add('aa', 56)
+        n.add('cc', 1)
+        if (n.aa.length != 3) throw 'bad'
+    }
+
+    eachPropConst = {}
+    eachPropConst.any = '__any__'
+    function eachProp(dict, str, fxCallback, fxCallbackAll ) {
+        var props = str.split('.')
+        var lastLayer =  dict ; //start off with dict
+        var currentLayer = []
+        var allLayers = {}
+        var layerIndex = 1;
+        sh.each(props, function onProps(i, prop ) {
+            currentLayer = []
+            sh.each(lastLayer, function s (i, o){
+                var addItem = o;
+                if ( prop == eachPropConst.any) {
+                    //lastLayer.push(o)
+                } else {
+                    addItem=(o[prop])
+                }
+
+                if ( addItem == null ) {
+                    return;
+                }
+                currentLayer.push(addItem)
+                sh.callIfDefined(fxCallbackAll, addItem)
+            })
+            allLayers[layerIndex]=lastLayer;
+            layerIndex++
+            lastLayer = currentLayer;
+        })
+
+        if (fxCallback != null ) {
+            sh.each(lastLayer, function onVal(i, val) {
+                fxCallback(val);
+            })
+        }
+
+        return allLayers;
+    }
+
+    function testEachProp() {
+
+        var obj = {}
+        var layer2 = {}
+        layer2['aaa']=8
+        layer2['bbb']=9
+        obj['asdf'] = layer2
+        obj['asdf2'] = layer2
+
+        eachProp(obj, '__any__.bbb', function processNum(o){
+            console.log('s', o)
+        });
+
+
+        var obj = {}
+        var layer2 = {}
+        var layer3 = {}
+
+        obj['asdf'] = layer2
+        obj['asdf2'] = layer2
+        layer2['aaa']=layer3
+        layer2['bbb']=layer3
+        layer3['aaa']=8
+        layer3['bbb']=9
+        eachProp(obj, '__any__.bbb.aaa', function processNum(o){
+            console.log('s2', o)
+        });
+        eachProp(obj, '__any__.bbbd.aaa', function processNum(o){
+            throw 'how did this happen?' // can't call this ...
+        });
+        eachProp(obj, '__any__.bbb', function processNum(o){
+            console.log('s3', o)
+        });
+    }
+
+
+    function callIfDefined(fx) {
+        var args = convertArgumentsToArray(arguments)
+        args = args.slice(1, args.length)
+
+        if (fx == undefined)
+            return args[0];
+
+
+        // console.debug('args', tojson(args))
+        return fx.apply(null, args)
+        //return;
+    }
+
+    function forwardArgsTo(fx, args) {
+        if (fx == undefined)
+            return;
+        if ( args != null && args.length == null ) {
+            var args = convertArgumentsToArray(args)
+        }
+        return fx.apply(null, args)
+    }
+    sh.forwardArgsTo = forwardArgsTo;
+
+
+
+    function convertArgumentsToArray(_arguments) {
+        var args = Array.prototype.slice.call(_arguments, 0);
+        return args
+    }
+
+    /**
+     * Intelligent split string into parts
+     * @param _arguments
+     */
+    function splitStrIntoArray(str, splitOnChar, allowNull) {
+        allowNull = defaultValue(allowNull, true)
+        splitOnChar = defaultValue(splitOnChar, null)
+        if (str == null) {
+            if (allowNull) {
+                return []
+            } else {
+                throw new Error('str not valid', str)
+            }
+        }
+        var output = null
+        //ignore if split
+        if (str instanceof Array) {
+            return str;
+        }
+        //allow user to seopcify char to split
+        if (splitOnChar != null) {
+            if (str.indexOf(splitOnChar) != -1) {
+                output = str.split(splitOnChar)
+            } else {
+                output = []
+            }
+        }
+        else {
+            //otherwsie fallback on common options
+            if (str.indexOf(', ') != -1) {
+                output = str.split(', ')
+            } else if (str.indexOf(',') != -1) {
+                output = str.split(',')
+            } else if (str.indexOf(' ') != -1) {
+                output = str.split(' ')
+            } else {
+                output = [str] //just one
+            }
+        }
+        return output
+    }
+
+    function convertArrayPropsToObject(arrayOfProps) {
+        var output = {}
+        if ( arrayOfProps == null ) { arrayOfProps = []}
+        sh.each(arrayOfProps, function (k,v) {
+            output[v]="";
+        })
+        return output
+    }
+
+    sh.convertArrayPropsToObject = convertArrayPropsToObject;
+
+    function removeSubString(substring, url) {
+        if (url.slice(0, substring.length) === substring)
+            url = url.substr(substring.length);
+        return url;
+    }
+
+
+    function q(text, escapeQuote) {
+        if (escapeQuote == true) {
+            return "\'" + text + "\'"
+        }
+        return "'" + text + "'"
+    }
+
+    function removeFromBegAndEndOfStr(text, removeStr) {
+        if ( sh.startsWith(text, removeStr) &&
+            sh.endsWith(text, removeStr)) {
+
+            text = text.replace(removeStr, '')
+            text = text.slice(0,text.length-removeStr.length)
+        }
+//    if ( sh.endsWith(text, removeStr)) {
+//        text = text.slice(0,text.length-removeStr.length)
+//    }
+        return text;
+    }
+
+    function unquote(text) {
+        return removeFromBegAndEndOfStr(text, '"')
+    }
+
+
+    function qq(text) {
+        return "\"" + text + "\""
+    }
+    function paren(text) {
+        return "(" + text + ")"
+    }
+
+    function bracket(text) {
+        return "[" + text + "]"
+    }
+
+    function join() {
+        var args = sh.convertArgumentsToArray(arguments)
+
+        return args.join(' ');
+    }
+    sh.str.join = join;
+
+    var br = '<br />'
+    var brn = '<br />\n'
+    var newline = '\n'
+    function strip(text) {
+        return text.replace(/^\s+|\s+$/g, '');
+    }
+//console.log('d')
+
+
+    function log() {
+        var args = convertArgumentsToArray(arguments)
+        var fx = console.log;
+        fx.apply(console, args)
+        //console.log()
+    }
+    /**
+     * Labeled log line
+     */
+    function lLog(label, logArguments) {
+        var args = convertArgumentsToArray(logArguments)
+        args.unshift(label)
+        var fx = console.log;
+        fx.apply(null, args)
+        //console.log()
+    }
+
+
+    /**
+     * Simple log, show prototype (class) and method name
+     */
+    function sLog() {
+        var args = convertArgumentsToArray(arguments[0])
+
+
+
+        var stackTrace = sh.errors.getStackTrace()
+        var calls = stackTrace.split("\n");
+        var trueCall = calls[4]
+        var prototypeName = calls[5]
+
+        function getS(s) {
+            s = s.split("at ")[1];
+            return s
+        }
+
+        trueCall = getS(trueCall);
+        prototypeName = getS(prototypeName);
+
+        function stripPrototype(s) {
+            //FlexMXMLtoStyleExplorerConvertor.convertFile (C:\Users\user1\Dropbox\projects\crypto\proxy\css\convertMXMLSkinToExplorer.js:40:44)
+            s = s.split(".")[0];
+            return s
+        }
+
+        //LineProcHelper.getLineWith (C:\Users\user1\Dropbox\projects\crypto\proxy\css\convertMXMLSkinToExplorer.js:29:30)
+        function getLinePrototype(s) {
+            var methodCall = s.split(" (")[0] //LineProcHelper.getLineWith
+            var prototype = methodCall.split(".")[0];
+            var method = methodCall.split(".")[1];
+            var line = "(" + s.split(" (")[1]; //(c:\)
+            return {prototype: prototype, method: method, line: line}
+        }
+
+        var lists = getLinePrototype(trueCall)
+        var prototype = lists.prototype;
+        var method = lists.method;
+        var line = lists.line;
+
+        prototypeName = stripPrototype(prototypeName);
+        //console.log(stackTrace + 'llllllllll')
+        /*console.log(trueCall)
+         console.log(prototypeName)*/
+
+        //console.log(stackTrace)
+        // args.unshift(label)
+        args.unshift(lists.method);
+        args.unshift(lists.prototype);
+        args.unshift('>>>*> ');
+        args.push(lists.line);
+        var str = "\t" + args.join(" ") + "\n"
+        str = args.join(" ")
+        console.log(str)
+        //var fx = console.log;
+        //fx.apply(null, args)
+        //console.log()
+        return str;
+    }
+
+    sh.errors.jumpError = function jumpError(msg, lines, ifFalse , postAdd, throwError) {
+        if (ifFalse != null) {
+            if (ifFalse != false) {
+                return;
+            }
+
+        }
+
+        //user may not secify lines, but condition
+
+
+        var stackTrace = sh.errors.getStackTrace()
+
+        var calls = stackTrace.split("\n");
+
+        //console.log(calls.join("\n"))
+
+
+        lines = sh.dv(lines, 3);
+        if (lines < 0) {
+            lines *= -1
+        }
+
+
+        var old = calls.slice(1 + 2, lines)
+        var newCalls = calls.slice(lines);
+
+        newCalls.unshift('Error: ' + msg);
+
+
+        if (postAdd != null)
+            newCalls = newCalls.concat('', 'from', postAdd)
+
+        newCalls = newCalls.concat('', 'via', old)
+
+
+        var e = new Error(msg)
+        e.stack = newCalls.join("\n")
+        // e.stack = 'ooo'
+        //e.message = 'dfsdf'
+        if (throwError != false) {
+
+            throw(e);
+        }
+        else {
+            console.error(e.stack)
+        }
+
+
+
+        return true;
+
+    }
+
+    sh.errors.storeError = function jumpError( lines ) {
+
+        var stackTrace = sh.errors.getStackTrace()
+
+        var calls = stackTrace.split("\n");
+
+        //console.log(calls.join("\n"))
+
+
+        lines = sh.dv(lines, 3);
+        if ( lines < 0 ) { lines *= -1 }
+
+
+        var newCalls = calls.slice(lines);
+
+        //newCalls.unshift('Error: ' + msg);
+
+        //var e =new Error(msg)
+        //e.stack = newCalls.join("\n")
+        // e.stack = 'ooo'
+        //e.message = 'dfsdf'
+        //throw(e);
+        return newCalls;
+
+    }
+
+
+
+
+    function getStackTrace() {
+        var err = new Error();
+
+        return err.stack;
+    }
+    sh.errors.getStackTrace = getStackTrace
+
+
+
+    String.prototype.empty = function () {
+        return (!this || 0 === this.length);
+    }
+
+    String.prototype.strip = function () {
+        return this.replace(/^\s+|\s+$/g, '');
+    }
+
+    function getNodeArguments(str) {
+        /**
+         * Use optimistm
+         * @type {Array}
+         */
+        var args = process.argv.splice(2);
+        return args;
+    }
+
+    sh.progArg = function getProcessArgumentAtIndex(index) {
+        var args = sh.getNodeArguments()
+        return args[index];
+    }
+
+
+    function makeRelative(url) {
+        //http://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
+        var urlRemoved = url;
+        if (url.indexOf('://') != -1) {
+            urlRemoved = url.replace(/^(?:\/\/|[^\/]+)*\//, "")
+            urlRemoved = '/' + urlRemoved
+        }
+        return urlRemoved
+    }
+
+
+
+    function removeProtocol(url) {
+        if (url.indexOf(sh.http) == 0) {
+            url = url.replace(sh.http, '')
+        }
+        if (url.indexOf(sh.https) == 0) {
+            url = url.replace(sh.https, '')
+        }
+
+
+        return url
+    }
+
+    function isAbsUrl(url) {
+        if (url.indexOf(sh.http) == 0) {
+            return true
+        }
+        if (url.indexOf(sh.https) == 0) {
+            return true
+        }
+        return false
+    }
+
+
+    function getSubDomain(url) {
+        //var url = sh.urls.removeProtocol(url)
+        var add = null
+        if (url.indexOf(sh.http) == 0) {
+            url = url.replace(sh.http, '')
+            add = sh.http;
+        }
+        if (url.indexOf(sh.https) == 0) {
+            url = url.replace(sh.https, '')
+            add = sh.https;
+        }
+        var domain = url;
+        if (sh.includes(url, '/')) {
+            domain = url.split('/')[0] + '/'
+        } else {
+            domain = url;
+        }
+        if (add != null) {
+            domain = add + domain
+        }
+        return domain
+    }
+    function breakStringIntoLinesSafe(str) {
+        var split = [];
+        str = str.replace(/(\r\n|\n|\r)/gm, "\n");
+        split = str.split("\n")
+        return split;
+    }
+
+    function getLinesFromFile(file, throwErrorIfFileFound) {
+        var fs = require("fs")
+        if ( throwErrorIfFileFound == false ) {
+            console.log('sh.getLinesFromFile', 'file not found')
+            if ( sh.fileExists(file) == false  ){
+                return [];
+            }
+        }
+        var contents = fs.readFileSync(file).toString()
+
+        contents = contents.replace(/(\r\n|\n|\r)/gm, "\n");
+        var lines = breakStringIntoLinesSafe(contents);
+        return lines;
+    }
+
+    function capitalize(string)
+    {
+        return string.charAt(0).toUpperCase() + string.slice(1);
+    }
+
+
+    function readFile(file, nullValue, binary ) {
+        if ( nullValue != null && sh.fileExists(file)==false) {
+            if ( nullValue == true ) { //legacy, remove as soon as possible
+                return ''
+            }
+            return nullValue
+        }
+        var fs = require("fs")
+        var encoding =  'utf-8';
+        if ( binary == true  ) { encoding = 'binary'};
+        try {
+            var contents = fs.readFileSync(file, encoding)//.toString()
+        } catch ( e ) {
+            console.log('cannot find', __dirname , file, require('path').resolve(__dirname+'/'+file))
+            throw e
+        }
+        return contents;
+    }
+
+
+    function copyFile2(from, to, async, fxCallback, binary) {
+        if ( async == true ) {
+
+
+        }
+        var contents = sh.readFile(from, null, binary);
+        sh.writeFile(to, contents,false,binary);
+    }
+
+
+    /**
+     * Expects newline to be used as seperator
+     * returns array with each line as a speerate index
+     * @param file
+     */
+    function readFileLinesAsArray(file, content) {
+        if (content == null) {
+            var contents = sh.readFile(file);
+        } else {
+            var contents = content //allow user to specify contnet, nto file
+        }
+        contents = sh.remove_win_newlines(contents)
+        var testList = contents.split("\n")
+        return testList;
+    }
+
+    /**
+     * Combines all arguments into lines and concat new newline
+     * @returns {string|*}
+     */
+    function combineLines() {
+        var lines = sh.convertArgumentsToArray(arguments)
+        //remove null lines
+        return lines.join(sh.n)
+    }
+
+
+    /**
+     * Turns comma seperated string into array
+     * @param val
+     * @returns {Array}
+     */
+    function convertStringToArray( val ) {
+        var nullValIsArray = true
+        if ( val == null ) {
+            if ( nullValIsArray ) {
+                return []
+            }
+        }
+        var split = val.split(',')
+        var split = split.map(function(val){
+            return sh.strip(val)
+        });
+        return split;
+    }
+
+    /**
+     * Creates a path from arugments
+     * @returns {string|*}
+     */
+    function makePath ( ) {
+        var args = sh.convertArgumentsToArray(arguments)
+        return args.join('/')
+    }
+
+    function getFilesInDirectory(dir, recurse, sortByTime, showNames,
+                                 filter, filterIncludes, appendDirOnFileNames ) {
+        var fs = require("fs")
+        var files = fs.readdirSync(dir);
+        var filesWithDir = [];
+        for (var i in files) {
+            try {
+                if (!files.hasOwnProperty(i)) continue;
+                var name = dir + '/' + files[i];
+                //filesWithDir.push(name);
+                if (fs.statSync(name).isDirectory()) {
+                    if (recurse == true)
+                        getFiles(name); //will not work
+                } else {
+                    if ( showNames ) {
+                        console.log(name)
+                    }
+                }
+            } catch (e) {
+            }
+        }
+
+
+
+        if ( filter != null ) {
+            files =  files.filter( filter);
+        }
+
+        if ( filterIncludes != null ) {
+            var matches = []
+            sh.each(files, function processEach(i,fileName){
+                if ( sh.includes(fileName, filterIncludes)){
+                    matches.push(fileName);
+                }
+            })
+            files =  matches;
+        }
+
+        if ( sortByTime ) {
+            var y = files.sort(function (a, b) {
+                return fs.statSync(dir + a).mtime.getTime() -
+                    fs.statSync(dir + b).mtime.getTime();
+            });
+        }
+
+
+        var sep = '/';
+        if ( sh.endsWith(dir, '/')) {
+            sep = ''
+        }
+        if ( appendDirOnFileNames == true  ) {
+            files = files.map(function (fileName) {
+                return dir+sep+fileName});
+
+        }
+
+
+        return files;
+    }
+
+    sh.fs.getFilesInDirectory = getFilesInDirectory;
+//simplifies invokation
+    sh.fs.getFilesInDirectory2 = function getFilesIndirectory_Path(dir) {
+        return sh.fs.getFilesInDirectory(dir, false, false, false, null, null, true);
+        recurse, sortByTime, showNames,
+            filter, filterIncludes, appendDirOnFileNames
+    };
+
+    sh.fs.writeJSONFile = function writeJSONFile(file, json) {
+        if ( file == null ) { return; }
+
+        sh.writeFile(file, sh.toJSONString(json));
+    }
+
+    sh.fs.readJSONFile = function readJSONFile(file, defaultVal, ifSwallowParsingErrors, okIfNotFound ) {
+        if ( defaultVal != undefined ) {
+            defaultVal = sh.dv(defaultVal, {});
+        }
+        ifSwallowParsingErrors = sh.dv(ifSwallowParsingErrors, false);
+        okIfNotFound = sh.dv(okIfNotFound, false);
+
+        if ( file == null ) { if ( okIfNotFound == true ) {
+            return defaultVal;
+        }};
+        if ( sh.fileExists(file)==false) {
+            if ( okIfNotFound == true ) {
+                return defaultVal;
+            }
+        };
+        try {
+            var json = JSON.parse(sh.readFile(file))
+        } catch (e ) {
+            //never ignore parsing errors, it is too difficult to debug
+            if ( ifSwallowParsingErrors != true ) {
+                throw new Error('cannot parse config file ' + file)
+            }
+            console.log('parsing error with loading json', 'readJSONFile', file);
+            json = defaultVal
+        }
+        return json;
+    }
+
+
+    /**
+     * Same as readJSONFile, but will not throw errors if file not found
+     * Usage: for config files
+     * @param file
+     * @param defaultVal
+     * @param ifSwallowErrors
+     * @returns {*}
+     */
+    sh.fs.readJSONFileOpt = function readJSONFileOpt(file, defaultVal, ifSwallowErrors ) {
+        ifSwallowErrors = sh.dv(ifSwallowErrors, false); //throw parsing error
+        defaultVal = sh.dv(defaultVal, {});
+        var json = sh.fs.readJSONFile(file, defaultVal, ifSwallowErrors, true)
+        return json;
+    }
+
+    sh.fs.mergeJSONFileIntoObject = function mergeJSONFileIntoObject(file, options) {
+        var fromObject  = JSON.parse(sh.readFile(file));
+        sh.mergeObjects(fromObject, options, true )
+        sh.each(fromObject, function copyProp(i,v) {
+            sh.mergeObjects(v, options[i], true);
+        })
+        return options;
+    }
+
+//Write temp file
+    sh.fs.writeTemp = function writeTemp(config) {
+        var contents = config.contents;
+        if ( config.json ) {
+            contents = sh.toJSONString(config.json)
+        }
+        var fileName = config.fileName;
+        if(fileName==null) {fileName = getTimeStamp()
+
+            if ( config.json ) {
+                fileName += '.json';
+            }
+        }
+        var dirTemp = 'temp/'
+        var dir = ''
+        if ( config.addTemp == false )
+            dirTemp = '';
+        if ( config.dir) {
+            dir = config.dir+'/'+dirTemp
+            fileName = dir +fileName;
+        };
+        if ( dir != '' )
+            sh.makePathIfDoesNotExist(dir);
+        writeFile(fileName, contents)
+
+        return fileName;
+    }
+
+
+
+    sh.writeJSONFile = sh.fs.writeJSONFile;
+    sh.readJSONFile = sh.fs.readJSONFile;
+    sh.mergeJSONFileIntoObject = sh.fs.mergeJSONFileIntoObject;
+
+    sh.fs.resolve = function resolvePath(pathToResolve) {
+        var path = require('path')
+        return path.resolve(pathToResolve);
+    }
+
+    function defineFS() {
+
+        var fs = require('fs')
+        sh.fs.parseBytesOutput = function parseSize_HumanReadable_CmdLineOutput_To_Gigabytes (cmdInput) {
+            var cmdOutput = -1;
+
+            if ( sh.includes(cmdInput, "\t")) {
+                cmdInput = cmdInput.split("\t")[0];
+            };
+            if ( sh.includes(cmdInput, "\n")) { //remove trailing \n
+                cmdInput = cmdInput.split("\n")[0];
+            };
+
+            var parsedVal = cmdInput.slice(0, -1);
+            parsedVal = parseInt(parsedVal);
+
+            if (sh.endsWith(cmdInput, 'K')) {
+                cmdOutput = cmdInput.slice(0, -1)
+                cmdOutput = parseInt(cmdOutput);
+                cmdOutput = cmdOutput * 1000;
+            }
+            else if ( sh.endsWith(cmdInput, 'M')) {
+                cmdOutput = cmdInput.slice(0, -1)
+                cmdOutput = parseInt(cmdOutput);
+                cmdOutput = cmdOutput / 1000;
+            }
+            else if ( sh.endsWith(cmdInput, 'G')) {
+                cmdOutput = parsedVal;
+            }
+            else if (sh.endsWith(cmdInput, 'T')) {
+                cmdOutput = cmdInput.slice(0, -1);
+                cmdOutput = parseInt(cmdOutput);
+                cmdOutput = cmdOutput * 1000;
+            }
+            else { //assume bytes
+                cmdOutput = parsedVal/ 1000/1000/1000; //kilo, mega, giga
+            }
+            //cmdOutput = parseInt(cmdOutput);
+            return cmdOutput;
+        };
+
+
+        sh.fs.getFileSizeInBytes =  function getFilesizeInBytes(filename) {
+            var stats = fs.statSync(filename)
+            var fileSizeInBytes = stats["size"]
+            return fileSizeInBytes
+        };
+
+        sh.fs.getSizeOfDir =  function getSizeOfDir(filename) {
+            var stats = fs.statSync(filename)
+            var fileSizeInBytes = stats["size"]
+            return fileSizeInBytes
+        };
+
+        sh.fs.getSizeOfDir2 = function getSizeOfDir(dirToCheck, fxDone) {
+            var child_process = require('child_process');
+            var cmd = "du -hsb "+dirToCheck;
+            child_process.exec(cmd, function (err, stdout, stderr) {
+                var output = stdout;
+                //asdf.g
+                //return
+                function parseResultOfHumanReadable(cmdOutput) {
+                    var output = cmdOutput;
+                    var result = 0;
+                    var result = sh.fs.parseBytesOutput(cmdOutput);
+
+                    console.log('getSizeOfDir',cmd, result);
+                    return result;
+                };
+
+                var result = parseResultOfHumanReadable(output)
+                fxDone(result);
+            });
+        };
+
+        sh.fs.isDirBiggerThanXGBs = function isDirBiggerThanXGBs(dir, gb, fxCallback) {
+            var size = sh.fs.getSizeOfDir(dir)
+            var sizeO= size/ 1000 / 1000 / 1000
+            console.log('size', size, sizeO)
+            sh.fs.getSizeOfDir2(dir, function gotSize(size) {
+
+                var sizeO= size/ 1000 / 1000 / 1000
+                console.log('size', size, sizeO)
+
+                if ( size > gb ) {
+                    fxCallback(true)
+                } else  {
+                    fxCallback(false)
+                }
+            })
+
+
+        }
+
+        sh.fs.checkSpace = function checkSpace(dirToCheck, fxDone, min_gb) {
+            var child_process = require('child_process');
+            var gb = "df -h /tmp | tail -1 | tr -s ' ' | cut -d' ' -f4"
+            var cmdToCheckSpace = "df -h "+dirToCheck+" | tail -1 | tr -s ' ' | cut -d' ' -f4"
+            //df -k /tmp | tail -1 | tr -s ' ' | cut -d' ' -f5
+            child_process.exec(cmdToCheckSpace, function (err, stdout, stderr) {
+                var output = stdout;
+                var freeGb = sh.fs.parseBytesOutput(stdout);
+                console.log('cmdToCheckSpace',cmdToCheckSpace, freeGb);
+                if (min_gb != null &&
+                    min_gb > freeGb) {
+                    //asdf.g
+                    console.log('sh.fs', 'not enough free space available', min_gb ,'>',
+                        freeGb, output, sh.qq(dirToCheck));
+                    fxDone(false, freeGb);
+                    return;
+                };
+
+                fxDone(true, freeGb);
+            });
+        };
+
+        sh.fs.findPathWithFreeSpace =  function findPathWithFreeSpace(dirs, minSpace, fxResult) {
+            var stats = fs.statSync(filename)
+            var fileSizeInBytes = stats["size"]
+            //return fileSizeInBytes
+            sh.async(dirs,
+                function checkDirforSpace(dirToCheck, fxIterationdone) {
+
+
+
+                    var dirToCheck2 = self.utils.fixInitPathIfRelative(dirToCheck);
+                    var dirExisting = dirToCheck2 + '/' + searchForDir;
+
+                    /* if ( self.settings.testCopyDirs &&
+                     self.settings.testCopyDirs_createRandomFile != false) {
+                     var fileTestFile = dirExisting + '/newFile'+Math.random()+'.txt'
+                     console.log('touc', dirExisting)
+                     //creates a file in location, if doesn't existing
+                     sh.fs.touch = function touchFile(file, contents) {
+                     var base = sh.getPath(file);
+                     sh.fs.mkdirp(base);
+                     sh.writeFile(file, contents);
+                     }
+
+                     if ( Math.random() > 0.6 ) { //40% of iterations, write file
+                     sh.fs.touch(fileTestFile, 'test');
+                     //console.error(fileTestFile)
+                     // asdf.g
+                     }
+
+                     //  asdf.g
+                     }*/
+
+
+                    //store the status
+                    var dirStatus = {};
+                    dirsStatus[dirExisting] = dirStatus;
+                    dirStatus.dir = dirExisting;
+
+                    checkDirforSpace(dirToCheck2);
+
+                    //check free space & get size of directory
+                    function checkDirforSpace(dirToCheck) {
+                        self.checkSpace(dirToCheck, function onCheckedDir(ok, freeSpace) {
+                            //dictDirOk[dirToCheck] = ok;
+                            /*if ( dirsOK ) {
+                             dirsOk.push(dirToCheck);
+                             } else {
+                             dirsFullsNotOk.push(dirToCheck);
+                             };*/
+                            dirStatus.freeSpace = freeSpace;
+                            dirStatus.empty = ! ok;
+                            dirStatus.hasFreeSpace = ok;
+                            dirStatus.dir = dirToCheck;
+                            //get size of directory
+                            self.getSizeOfDir(dirToCheck, function onGotSize(sizeOfDir) {
+                                dirStatus.dirSize = sizeOfDir;
+                                checkIfDirExists();
+                            }, true);
+
+                        })
+                    }
+                    //check if exists
+                    function checkIfDirExists() {
+                        var dirExists = sh.fileExists(dirExisting);
+                        dirStatus.dirExists = dirExists;
+
+                        if ( self.settings.testPreExisting && asdf.g ){
+                            //create drive
+                            //add file iwth ame ..
+                        }
+
+                        // if ( dirExists ) {
+                        //dirPreExisting=dirExisting;
+                        // dataHelper.dirsPreExisting.push(dirPreExisting);
+                        // };
+
+                        fxIterationdone();
+                    }
+
+                } ,
+                function allDirsChecked() {
+                    //have status of all dirs
+                    fxResult(result)
+                }
+            );
+
+
+        };
+    };
+    defineFS();
+
+    sh.fs.limitSizeOfDirToXFiles = function limitSizeOfDirToXFiles(dir, maxFiles) {
+        var files= sh.getFilesInDirectory(dir, false, true)
+
+        maxFiles = sh.dv(maxFiles)
+        //sort alphabetically: Modfied time cannot be trusted, as uploads may come in any order ...
+        //must rely on timestamp in filename
+        files = files.sort(function (a, b) {
+            return a.toLowerCase().localeCompare(b.toLowerCase());
+        });
+
+        //self.proc('files', files);
+        // self.proc('files.max', self.settings.max_files_per_channel,files.length)
+
+        if ( files.length > maxFiles ) {
+            //get the last (x) files in the list
+            var indexOfFirstFileToKeep = files.length - (maxFiles-1);
+            //Delete everything upto indexOfFirstFileToKeep
+            var deleteFiles = files.slice(0,indexOfFirstFileToKeep);
+            //Delete everything after indexOfFirstFilesToKeep
+            //var deleteFiles = files.slice(indexOfFirstFileToKeep);
+            console.log('deleting files before index', indexOfFirstFileToKeep)
+            console.log('deleting list:', deleteFiles.length, deleteFiles)
+            //asdf.g
+            sh.each(deleteFiles, function deleteFile(i,fileToDelete) {
+                sh.deleteFile(dir+fileToDelete, true, true);
+                console.log('deleting', fileToDelete)
+            })
+
+        };
+    }
+
+
+    sh.sortBy = function sortBy(records, field, isData ) {
+        //if ( sortByTime ) {
+        var moment = require('moment')
+        records.sort(function (a, b) {
+            a = a[field];
+            if ( sh.isString(a)  ) {
+                a = new Date(a)
+            }
+            b = b[field];
+            if ( sh.isString(b)  ) {
+                b = new Date(b);
+            }
+            return    b - a;
+        });
+        // }
+
+        return records;
+    }
+
+    function clearDir(dirPath, removeDir) {
+        //use node-fs
+        var fs = require("fs")
+        //var files = fs.readdirSync(dir);
+
+        try { var files = fs.readdirSync(dirPath); }
+        catch(e) { return; }
+        if (files.length > 0)
+            for (var i = 0; i < files.length; i++) {
+                var filePath = dirPath + '/' + files[i];
+                if (fs.statSync(filePath).isFile())
+                    fs.unlinkSync(filePath);
+                else
+                    clearDir(filePath, true);
+            }
+        if ( removeDir )
+            fs.rmdirSync(dirPath);
+
+
+    }
+
+    sh.fs.clearDir = clearDir;
+    function rmrf(dirPath) {
+        clearDir(dirPath, true)
+    }
+
+    sh.fs.clearDir = clearDir;
+    function isDirectory(dir) {
+        var fs = require("fs")
+        if (fs.statSync(dir).isDirectory()) {
+            return true
+        }
+        return false;
+    }
+
+
+
+    /**
+     * Opens all files in array sync
+     * @param filesToOpen
+     * @returns {Array}
+     */
+    function openFiles(filesToOpen, prepend) {
+        var filesOpened = []
+        prepend = sh.defaultValue(prepend, '')
+        var fs = require("fs")
+        for (var i in filesToOpen) {
+            var file = filesToOpen[i];
+            try {
+                file = fs.readFileSync(prepend + file)
+            } catch ( e) {}
+            filesOpened.push(file)
+        }
+
+        return filesOpened;
+    }
+
+
+    function getFileName(filePath) {
+        var path = require('path')
+        return path.basename(filePath)
+    }
+    function getPath(filePath) {
+        var path = require('path')
+        return path.dirname(filePath)
+    }
+
+
+    function makePathIfDoesNotExist(dir) {
+        var fs = require("fs")
+        var mkdirp = require('mkdirp')
+        console.log('dir', dir)
+        mkdirp.sync(dir)
+
+        return;
+        if (!fs.existsSync(dir)) {
+            fs.mkdirSync(dir, 0766, function (err) {
+                if (err) {
+                    console.log(err);
+                    response.send("ERROR! Can't make the directory! \n");    // echo the result back
+                }
+            });
+        }
+    }
+
+    function fileExists(dir) {
+        var fs = require("fs")
+        return fs.existsSync(dir)
+    }
+    function checkFileMTime(dir, waitTimeSecs) {
+        var fs = require("fs")
+        if ( sh.fileExists( dir ) == false  ) {
+            return false
+        }
+        var status = fs.statSync(dir)
+        var date = new Date();
+        if ( date.getTime() - status.mtime.getTime()  > waitTimeSecs ) {
+            return true;
+        }
+        return false
+    }
+
+    function deleteFile(file, okIfNotFound, async) {
+        if ( okIfNotFound == true ) {
+            if ( sh.fileExists(file) == false ) {
+                console.log('sh.deleteFile', 'cannot find file to delete', file)
+                return false;
+            }
+        }
+        var fs = require("fs")
+        if ( async === true ) {
+            fs.unlink(file, function unlinked(err){
+                //console.log('')
+            });
+            return;
+        }
+        //console.log('xDelete', file)
+        //setTimeout(function xDelete() {
+        fs.unlinkSync(file)
+        //}, 500);
+        // return fs.unlinkSync(file)
+    }
+
+
+    sh.fs.removeDir = function removeDir(dir) {
+        var fs = require('fs-extra');
+
+        fs.removeSync(dir);
+    }
+    sh.fs.removeDir2 = function removeDir(dir) {
+        var fs = require('fs-extra');
+        asdf.g
+        fs.removeSync(dir);
+    }
+    sh.fs.deleteDir = sh.fs.removeDir;
+
+    sh.fs.mkdirp = makePathIfDoesNotExist;
+
+    sh.fs.copyDir = function copyDir(dirFrom, dirTo) {
+        var fs = require('fs-extra'); //
+        fs.copySync(dirFrom, dirTo);
+    }
+    sh.copyDir = sh.fs.copyDir;
+
+    sh.fileExt = function fileExt(filePath, matchExt) {
+        var ext = filePath.split('.').slice(-1)[0];
+        if ( ext == matchExt ) {
+            return true;
+        }
+        return false;
+    }
+
+
+    sh.fs.move = function move(from, to) {
+        var fs = require("fs")
+        if ( fs.statSync(from).isFile() &&
+            ! fs.statSync(to).isFile()  ) {
+            to = to + '/' + sh.getFileName(from);
+        }
+        sh.fs.copyDir(from, to)
+        sh.fs.deleteDir(from);
+    }
+    sh.fs.changeDir = function changeDir(from, to) {
+        var filename = sh.getFileName(from)
+        var output = to + '/' + filename;
+        return output
+    };
+
+    function dirname(fileName) {
+        var path = require("path")
+        return path.dirname(fileName);
+    }
+    function writeFile(fileName, content, surpressErrors, binary) {
+        var fs = require("fs")
+        //var contents = fs.readFileSync(file, 'utf-8')//.toString()
+
+        var exists = fs.existsSync(fileName )
+        if (exists) {
+            //writeFile(++i);
+        } else {
+            // fs.writeFile(fileName);
+        }
+
+        var encoding = 'utf8';
+        if ( binary == true ) {
+            encoding = 'binary'
+        }
+
+        if (surpressErrors == true) {
+            try {
+                fs.writeFileSync(fileName, content, encoding);
+            } catch (e) {
+                console.error(e)
+
+            }
+        } else {
+            fs.writeFileSync(fileName, content, encoding);
+        }
+
+    }
+
+
+    function copyFile(source, target, cb) {
+
+        var copySettings = source;
+        if ( copySettings.hasOwnProperty('file') ) {
+            source = copySettings.file
+            if ( copySettings.hasOwnProperty('toDir')) {
+                var nameOfFileAfterMove = path.basename(source)
+                target = copySettings.toDir+ '/' + nameOfFileAfterMove;
+            }
+            cb = copySettings.callback;
+        }
+        if ( copySettings.hasOwnProperty('source') ) {
+            source = copySettings.source
+            target = copySettings.target
+            cb = copySettings.callback;
+        }
+
+        var fs = require('fs')
+        var cbCalled = false;
+
+        var rd = fs.createReadStream(source);
+        rd.on("error", function(err) {
+            done(err);
+        });
+        var wr = fs.createWriteStream(target);
+        wr.on("error", function(err) {
+            done(err);
+        });
+        wr.on("close", function(ex) {
+            done();
+        });
+        rd.pipe(wr);
+
+        function done(err) {
+            if (!cbCalled) {
+                if ( cb != null ) {
+                    cb(err);
+                }
+                cbCalled = true;
+            }
+        }
+    }
+
+    function getUserHome() {
+        return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
+    }
+
+    function writeFile2(fileName, content, settings) {
+        //first argument can be an object
+        if ( fileName.hasOwnProperty('name')) {
+            settings = fileName;
+        }
+
+        settings.dir //where to store files
+        settings.timestamp_dir //
+        settings.quantizeTime //how many minutes to quantize directory name
+        settings.fxCallback //called when done writing file async
+        //settings.output_filename_preamble =
+        //sh.defaultValue(settings.output_filename_preamble, '')
+        //will be prepended to front of file_name
+        fileName = sh.defaultValue(settings.fileName, fileName) //overrides first param
+
+        //store strings
+        if ( settings.content != null ) {
+            content = settings.content;
+        }
+        if ( settings.contents != null ) {
+            content = settings.contents;
+        }
+        //convert json
+        if ( settings.obj != null ) {
+            content = sh.toJSONString(settings.obj)
+        }
+        if ( settings.json != null ) {
+            content = sh.toJSONString(settings.json)
+        }
+
+        if ( settings.name != null ) {
+            fileName =  settings.name
+        }
+
+        var fs = require("fs")
+        var mkdirp = require("mkdirp")
+        //var contents = fs.readFileSync(file, 'utf-8')//.toString()
+        if (settings.timestamp) {
+            path.extname('index.html')
+            //fileName += getTimeStamp()
+            fileName = path.basename(fileName, path.extname(fileName)) + '.' + getTimeStamp() + path.extname(fileName)
+        }
+
+        if (settings.dir_home ) {
+
+            settings.dir = sh.defaultValue(settings.dir, '')
+            settings.dir = path.join(sh.getUserHome(), settings.dir)
+        }
+
+        if (settings.timestamp_dir) {
+            function quantize(offset, minutesQuantize) {
+                minutesQuantize = sh.defaultValue(minutesQuantize, 5)
+                var quantizeMilliseconds = 1000 * 60 * 5
+                offset = sh.defaultValue(offset, 0)
+                var timeInMs = new Date().getTime()
+                timeInMs += offset
+                var x = timeInMs / quantizeMilliseconds
+                var y = Math.floor(x)
+                return y
+            }
+
+            function convertQuantizedTimeToDirName(minutesQuantize) {
+                minutesQuantize = sh.defaultValue(minutesQuantize, 5) //default ot 5 min range
+                var timestampDir = getTimeStamp(quantize(0, minutesQuantize) * 60 * minutesQuantize * 1000)
+                return timestampDir;
+            }
+
+            var q = 1000 * 60
+            var test = [quantize(q * 2), quantize(q * 5), quantize(q * 10), quantize(q * 11), quantize(11110)]
+            var test2 = [getTimeStamp(quantize(q * 2) * 60 * 5 * 1000) ]
+            var timestampDir = convertQuantizedTimeToDirName(settings.quantizeMinutes)
+            //add timestamped dir onto original settings.dir
+            //what happens if settings dir is null?
+            settings.dir = sh.defaultValue(settings.dir, '')
+            settings.dir = path.join(settings.dir, timestampDir)
+            mkdirp.sync(settings.dir)
+            fileName = path.join(settings.dir, fileName) //if filename WAS abs, this would not work
+
+        } else {
+
+            settings.dir
+            if (settings.dir) {
+                if ( sh.includes( settings.dir, '?') || sh.includes( settings.dir, '&') ) {
+                    console.error( 'special chars in settings.dir');
+                }
+                mkdirp.sync(settings.dir)
+                fileName = path.join(settings.dir, fileName) //if filename WAS abs, this would not work
+            }
+
+
+
+        }
+
+
+        //dev wants to get the dir that will be written to ...
+        //used when timestamp_dir, when hardcoded dir is set
+        if ( settings.getDir ) {
+            return path.dirname(fileName);
+        }
+
+        // console.log('writeFile2', fileName)
+        // fs.exists(fileName, function (exists) {
+        //     if (exists) {
+        //writeFile(++i);
+        //     } else {
+        // fs.writeFile(fileName);
+        //    }
+
+        try {
+            if ( settings.doNotMakeDirectory != true ) {
+                var dir = sh.dirname(fileName)
+                mkdirp.sync(dir)
+            }
+            if ( settings.binary != true ) {
+                fs.writeFileSync(fileName, content, "utf8");
+            } else {
+                fs.writeFileSync(fileName, content,'binary' );
+                /*var content=content.toString("binary");
+                 fs.writeFileSync(fileName, content, 'binary', function(err){
+                 if (err) throw err
+                 console.log('File saved.')
+                 })*/
+            }
+            //fs.writeFileSync(fileName, content, "utf8");
+            sh.callIfDefined(settings.fxCallback)
+            fs.exists(fileName, function (exists) {
+                var path = require('path')
+                if ( settings.showLocation ) {
+                    console.log('file?', exists, path.resolve(fileName))
+                }
+            })
+        } catch (e) {
+            if (settings.surpressErrors != true) {
+                throw e
+            }
+        }
+        // });
+
+        var output = {}
+        output.filename = fileName;
+        return output
+    }
+
+
+    function writeFile2Test() {
+        writeFile2('a.txt', 'content', {dir: 'inner', timestamp_dir: true});
+        writeFile2('a2.txt', 'content', {dir: 'inner', timestamp_dir: true});
+        writeFile2('a2.txt', 'content', { timestamp_dir: true});
+        return;
+        writeFile2('a.txt', 'content', {dir: 'inner', timestamp: true});
+        writeFile2('ab.txt', 'content', {dir: 'inner/asdf', timestamp: true});
+        writeFile2('ab.txt', 'content', {timestamp: true});
+    }
+
+    function writeFileToTrash(fileName, content, surpressErrors) {
+        var fs = require("fs")
+        //var contents = fs.readFileSync(file, 'utf-8')//.toString()
+
+        fileName = 'c:/trash/' + fileName
+        fs.exists(fileName, function (exists) {
+            if (exists) {
+                //writeFile(++i);
+            } else {
+                // fs.writeFile(fileName);
+            }
+
+            try {
+                fs.writeFileSync(fileName, content, "utf8");
+            } catch (e) {
+                if (surpressErrors != true) {
+                    throw e
+                }
+            }
+        });
+
+
+    }
+
+
+    function getContentBetween(content, starter, ender) {
+        if (content.indexOf(starter) == -1) {
+            return content
+        }
+        var result = content.split(starter)[1]
+        if (result.indexOf(ender) == -1) {
+            return result
+        }
+        var result = result.split(ender)[0]
+
+        return starter+result+ender
+
+    }
+
+
+    function getArrayContentBetween(content, starter, ender) {
+        var indexOfStarter = content.indexOf(starter)
+        if (indexOfStarter == -1) {
+            return content
+        }
+        var content = content.slice(indexOfStarter+starter.length)
+
+        var indexOfEnder = content.indexOf(ender)
+        if (indexOfEnder == -1) {
+            return content
+        }
+
+
+        var result = content.slice(0, indexOfEnder)
+
+        return result
+
+    }
+
+    /**
+     * Return a concated array of assumed aray at prop
+     */
+    function arrayCondenseArrayByProp(objArray, arrayProp) {
+
+        var list = [];
+        for (var i = 0; i < objArray.length; i++) {
+            var obj = objArray[i];
+            var innerArray = obj[arrayProp]
+            if (innerArray == null) {
+                continue;
+            }
+            /*for (var y = 0; i < innerArray.length; y++) {
+             var innerObj = innerArray[y];
+             innerObj
+             }*/
+            list = list.concat(innerArray)
+        }
+
+
+        return list;
+    }
+
+
+    function throwErrorIfPropNull (obj, prop, msg ) {
+        if ( obj[prop] == null ) {
+            throw new Error(msg);
+        }
+    }
+    sh.throwErrorIfPropNull  =throwErrorIfPropNull;
+
+    sh.errors.throwErrorIfPropNull
+
+    function requiredParam(param, warning) {
+        if (param == null) {
+            throw new Error(['Required Param:', error, warning].join(" "))
+        }
+    }
+    function requiredParamOneOf(warning /* ... params*/) {
+        var args = convertArgumentsToArray(arguments)
+        args = args.slice(1)
+        if (args.length == 0) {
+            throw requiredParamOneOf + ' no args sent ' + warning
+        }
+
+        for (var i = 0; i < args.length; i++) {
+            var param = args[i];
+            if (param != null) {
+                return
+            }
+        }
+
+        if (param == null) {
+            throw new Error(['Required one of params to be set:', warning].join(" "))
+        }
+    }
+
+    /**
+     * Returns true if line begins with a # of !
+     */
+    function isCommentLine(line) {
+        var firstChar = sh.strip(line).charAt(0)
+        if (firstChar == '#' || firstChar == '!')
+            return true
+
+        return false
+    }
+    function defaultValue(input, ifNullUse) {
+        if (input == null) {
+            return ifNullUse
+        }
+        return input;
+    }
+
+    /**
+     * Merge two objects together
+     * Utility: Default settings object, is being overriden
+     * by optional settings object
+     * @param mergeThisObject - override settings
+     * @param intoThisObject - base settings
+     * @returns {*}
+     */
+    function mergeObjects(mergeThisObject, intoThisObject, onlyIfIntoPropIsNotNull, ignoreNested) {
+        onlyIfIntoPropIsNotNull = sh.dv(onlyIfIntoPropIsNotNull, false);
+        ignoreNested = sh.dv(ignoreNested, false) //do regular replace
+        if (mergeThisObject == null) {
+            return intoThisObject
+        }
+        if (intoThisObject == null) {
+            return intoThisObject
+        }
+
+        sh.each(mergeThisObject, function( prop, val ) {
+            var isNull = intoThisObject[prop] == null ;
+            if ( onlyIfIntoPropIsNotNull == true   ) {
+                if ( intoThisObject[prop] != null ) {
+                    return;
+                }
+            }
+            //ignoreNestedWhenNotNull
+            if ( ignoreNested && sh.isObject(val) && isNull ==false ) {
+                return;
+            }
+            intoThisObject[prop] = val;
+        })
+
+        return intoThisObject;
+    }
+
+    sh.mergeObjectsForce = function (mergeThisObject, intoThisObject, onlyIfIntoPropIsNotNull, ignoreNested) {
+        onlyIfIntoPropIsNotNull = sh.dv(onlyIfIntoPropIsNotNull, false);
+        ignoreNested = false
+        return sh.mergeObjects(mergeThisObject, intoThisObject, onlyIfIntoPropIsNotNull, ignoreNested);
+    }
+
+    function defaults(from, to ) {
+        sh.mergeObjects(from, to, true)
+    }
+    sh.defaults = defaults;
+
+
+
+//Used to merge two config objects together ..
+    function mergeObjects2_configMerge(mergeThisObject, intoThisObject, onlyIfIntoPropIsNotNull) {
+        if (mergeThisObject == null) {
+            return intoThisObject
+        }
+        if (intoThisObject == null) {
+            return intoThisObject
+        }
+
+        sh.each(mergeThisObject, function (prop, val) {
+            var currentVal = intoThisObject[prop]
+            if (onlyIfIntoPropIsNotNull == true) {
+                if (currentVal != null) {
+                    return;
+                }
+            }
+            if (sh.isObject(val) && currentVal != null) {
+                sh.mergeObjects2(val, currentVal)
+                return
+            }
+            if (currentVal != null && val == null) {
+                return;
+            }
+            intoThisObject[prop] = val;
+        })
+
+        return intoThisObject;
+    }
+
+    sh.mergeObjects2 = mergeObjects2_configMerge;
+
+
+    /**
+     * MAke itemOrArray an array if it not already one
+     * @param itemOrArray
+     * @returns {*}
+     */
+    function forceArray(itemOrArray) {
+        var array = itemOrArray;
+        if (!(itemOrArray instanceof Array)) {
+            array = [itemOrArray];
+        }
+        if (itemOrArray == null) {
+            array = []
+        }
+        return array
+    }
+
+
+    function arrayFilterByProp(items, prop, val, doLikeSearch) {
+        var filteredItems = []
+        for (var i = 0; i < items.length; i++) {
+            var item = items[i];
+            var propVal = item[prop];
+            if ( doLikeSearch != true ) {
+                if (item[prop] == val) {
+                    filteredItems.push(item)
+                }
+            } else {
+                if (sh.includes(propVal.toLowerCase(), val.toLowerCase())) {
+                    filteredItems.push(item)
+                }
+            }
+        }
+
+        return filteredItems
+    }
+    function arrayCollectProp(items, prop) {
+        var filteredItems = []
+        for (var i = 0; i < items.length; i++) {
+            var item = items[i];
+            filteredItems.push(item[prop])
+        }
+        return filteredItems
+    }
+
+    function arrayCallMethodOnItem(items, method) {
+        var filteredItems = []
+        for (var i = 0; i < items.length; i++) {
+            var item = items[i];
+            filteredItems.push(item[method]())
+        }
+        return filteredItems
+    }
+    sh.arrayCallMethodOnItem = arrayCallMethodOnItem;
+
+
+    function isArray(itemOrArray) {
+        return (itemOrArray instanceof Array)
+    }
+
+    function isString(objectOrString) {
+        //return (objectOrString instanceof String)
+        return typeof objectOrString == 'string'
+    }
+
+    function isNumber(n) {
+        return !isNaN(parseFloat(n)) && isFinite(n);
+    }
+    sh.isNumber = isNumber;
+
+    function isObject(obj) {
+        if ( sh.isFunction(obj)) {
+            return false;
+        }
+        if ( obj == null ) {
+            return false;
+        }
+        return typeof obj == 'object'
+    }
+
+
+    function isFunction(functionToCheck) {
+        var getType = {};
+        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
+    }
+
+    function clone2(item) {
+        var CircularJSON = require('circular-json')
+        item = CircularJSON.stringify(item)
+        item = CircularJSON.parse(item)
+        return item
+    }
+
+    function clone(item) {
+        item = JSON.stringify(item)
+        item = JSON.parse(item)
+        return item
+    }
+
+
+    function copyProps(from, to) {
+        sh.each(from, function(k,v){
+            to[k]=v;
+        })
+    }
+    sh.copyProps = copyProps;
+
+ 
+    /**
+     * Remove your props
+     * @param item
+     * @param props
+     */
+    function removeProps(item, props) {
+        sh.each(props, function (ia, prop) {
+            delete item[prop]
+        })
+    }
+
+    function assert(val, val2, error) {
+        if (val != val2) {
+            throw new Error([val, '!=', val2, error].join(', '))
+        }
+    }
+
+
+    function forLoop() {
+        for (var i = 0; i < items.length; i++) {
+            var item = items[i];
+        }
+    }
+
+//copied from jquery
+    /**
+     * sh.each(items, function( itemIndex, item ) {
+    })
+
+     * @param object
+     * @param callback
+     * @param args
+     * @returns {*}
+     */
+    function each(object, callback, args) {
+
+        var name, i = 0, length = object.length;
+
+        if (args) {
+            if (length === undefined) {
+                for (name in object)
+                    if (callback.apply(object[ name ], args) === false)
+                        break;
+            } else
+                for (; i < length;)
+                    if (callback.apply(object[ i++ ], args) === false)
+                        break;
+
+            // A special, fast, case for the most common use of each
+        } else {
+            if (length === undefined) {
+                for (name in object)
+                    if (callback.call(object[ name ], name, object[ name ]) === false)
+                        break;
+            } else
+                for (var value = object[0];
+                     i < length && callback.call(value, i, value) !== false; value = object[++i]) {
+                }
+        }
+
+        return object;
+    }
+
+
+    each.print = function print (items, prop, save, display) {
+
+        var lines = [];
+
+        sh.each(items, function printItem(k,v){
+            var prePend = (k+1)+'.';
+            if ( sh.isString(k)) { // dictionary
+                prePend = (k)+':';
+            }
+            var val = v;
+            if ( prop != null ) {
+                val =  v[prop];
+            }
+
+            if ( display != false ) {
+                console.log(prePend, val);
+            }
+            lines.push(prePend + ' ' + val)
+        })
+
+        return lines
+    }
+
+    each.find = function find (items, lookFor) {
+        var found = false;
+        sh.each(items, function printItem(k,v){
+            if ( v == lookFor) {
+                found = true
+                return false;
+            }
+        })
+        return found;
+    }
+
+
+    each.printJSON = function print (items, label) {
+        if ( label != null ) {
+            console.log('\n', label+':')
+        }
+        sh.each(items, function printItem(k,v){
+            console.log('\t', (k+1)+'.', sh.toJSONString(v) );
+        })
+    }
+
+    each.times = function times(number, fx, startAt0) {
+        var numbers = [];
+        var number = parseInt(number);
+        var numStart = 1;
+        if ( startAt0 == true ) { //by default 10 times give syou 0-1, here we use 1- 10
+            numStart = 0;
+        }
+        for ( var i = 0; i < number; i++) {
+            var num =i;
+            num += numStart
+            numbers.push(num);
+        }
+
+        if ( fx != null ) {
+            sh.each(numbers, fx)
+        }
+        else {
+            return numbers;
+        }
+    }
+
+    each.createDict = function createDict(items, prop) {
+        prop = sh.dv(prop, 'id');
+        var dict = {};
+        sh.each(items, function addToDict(i, obj) {
+            var key = obj[prop];
+            if ( sh.isArray(prop) ) {
+
+            }
+            if ( sh.isFunction(prop) ) {
+                key = prop(obj)
+            }
+            dict[key] = obj;
+        });
+
+        return dict;
+    }
+
+
+    each.prop = function prop(items, prop) {
+        prop = sh.dv(prop, 'id');
+        var returnArray = [];
+        sh.each(items, function addToDict(i, obj) {
+            var key = obj[prop];
+            if ( sh.isArray(prop) ) {
+
+            }
+            var val = obj[prop];
+            if ( sh.isFunction(prop) ) {
+                val = prop(obj)
+            }
+            //dict[key] = obj;
+            returnArray.push(val);
+        });
+        return returnArray;
+    }
+
+    each.prepend = function prependToArray(items, str) {
+        var output = [];
+        sh.each(items, function procItem(i, item) {
+            output.push(str + item)
+        })
+        return output;
+    }
+
+//AKA Lines helper
+    each.lines = function (items, config) {
+        config = sh.dv(config, {})
+
+
+        if ( sh.isObject( items )) {
+            config = items;
+        };
+        if ( config.str != null ) {
+            items = config.str.split('\n');
+        };
+
+
+        if ( sh.isString(items)) {
+            items = items.split('\n');
+        }
+
+        var lines = [];
+        lines = sh.dv(config.addTo, []);
+
+
+        sh.each(items, function processLine(i, line) {
+
+            if ( line == null ) {
+                return;
+            }
+            if ( line.trim() == '' && config.skipEmpty != false  ) {
+                return;
+            }
+
+            if ( config.ignore != null ) {
+                var ignoreFault = false;
+                sh.each(config.ignore, function testIgnoreLineFilter(x, ignore) {
+                    if (sh.includes(line, ignore)) {
+                        return false;
+                    }
+                });
+                if (ignoreFault) {
+                    return;
+                }
+                ;
+            }
+
+
+            if ( config.ignoreComments ) {
+                var commentStartingChars = ["'", '//', '#']
+                if ( sh.isArray(config.ignoreComments) ) {
+                    commentStartingChars = config.ignoreComments
+                }
+                var ignoreFault = false;
+                sh.each(commentStartingChars, function testIgnoreLineFilter(x, ignore) {
+                    if ( sh.startsWith(line, ignore)) {
+                        return false;
+                    }
+                });
+                if ( ignoreFault ) {
+                    return;
+                };
+            }
+
+            if ( config.fxProc != null ) {
+                config.line = line;
+                config.includes = function includes(val){
+                    return config.line.indexOf(val)!=-1;
+                };
+
+                config.remove = function remove(val){
+                    config.line = config.line.replace(val, '');
+                    return config;
+                };
+
+                line = sh.callIfDefined(config.fxProc, line)
+                if ( line == null )
+                    return;
+                if ( line == false )
+                    return false; //stop processing
+            }
+
+
+            if ( config.appendToLine != null ) {
+                line += config.appendToLine
+            }
+
+            lines.push(line)
+
+        })
+
+        return lines;
+    }
+
+    /**
+     * Fluid api for arrays
+     * @param items
+     * @constructor
+     */
+    function EachHelper(items) {
+        var self = this;
+        var p = self;
+        self.items = items;
+        self.prop = function prop( prop) {
+            prop = sh.dv(prop, 'id');
+            var returnArray = [];
+            sh.each(self.items, function addToDict(i, obj) {
+                var key = obj[prop];
+                if ( sh.isArray(prop) ) {
+
+                }
+                var val = obj[prop];
+                if ( sh.isFunction(prop) ) {
+                    val = prop(obj)
+                }
+                //dict[key] = obj;
+                returnArray.push(val);
+            });
+            self.items = returnArray;
+            return self;
+        }
+
+        self.prepend = function prependToArray( str) {
+            var output = [];
+            sh.each(self.items, function procItem(i, item) {
+                output.push(str + item)
+            })
+            self.items = output;
+            return self;
+        }
+    }
+
+    function eachHelper(items) {
+
+        return new EachHelper(items)
+    }
+
+    function getTimeStamp(timeOverride) {
+        var str = "";
+
+        var currentTime = new Date()
+        if (timeOverride != null) {
+            currentTime.setTime(timeOverride);
+        }
+        var hours = currentTime.getHours()
+        var minutes = currentTime.getMinutes()
+        var seconds = currentTime.getSeconds()
+
+        if (minutes < 10) {
+            minutes = "0" + minutes
+        }
+        if (seconds < 10) {
+            seconds = "0" + seconds
+        }
+        str += hours + "_" + minutes + "_" + seconds// + " ";
+        //(time.getMonth() + 1)+'-'+time.getDate()+'-'+time.getFullYear()+' '+(time.getHours()+1)+'-'+time.getMinutes()+'-'+time.getSeconds().toString();
+        str = (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + '-' + currentTime.getFullYear() + '_' + str;
+
+        /* if(hours > 11){
+         str += "PM"
+         } else {
+         str += "AM"
+         }*/
+        return str;
+    }
+
+
+    /**
+     * Utility, compare this time to the last time, Date}
+     */
+    function timeElapsed(lastDate) {
+        var currentTime = new Date()
+        var time = currentTime.getTime() - lastDate.getTime()
+        return time / 1000;
+    }
+
+    /**
+     * Utility, unity looks cleaner
+     * @returns {Date}
+     */
+    function getTime() {
+        return new Date()
+    }
+
+    function caseInsensitiveComparison(str1, str2, otherValidCombinations) {
+        if (str1 == str2)
+            return true
+
+        if (str1 == null) {
+            return false
+        }
+
+        if (str2 == null) {
+            return false;
+        }
+
+        if (str1.toLowercase() == str2.toLowercase()) {
+            return true
+        }
+
+        if (otherValidCombinations != null) {
+            sh.each(otherValidCombinations, function (itemIndex, item) {
+                if (str1.toLowercase() == item.toLowercase()) {
+                    return true
+                }
+            })
+        }
+        return false;
+    }
+
+    /**
+     * Utility: Pass a function to show arguments
+     */
+    function traceResult() {
+        console.log(arguments.join(", "))
+    }
+
+    function traceResultNamed(name) {
+        return function traceResult_Named() {
+            var args = convertArgumentsToArray(arguments);
+            console.log(name, args.join(", "))
+        }
+    }
+
+    function waitXSecs(secs, callback, name) {
+        setTimeout(function traceResult_Named() {
+                if (name != null) {
+                    console.log('waitXSecs', 'secs', name)
+                }
+                callIfDefined(callback)
+            }, secs * 1000
+        )
+    }
+
+    function wait1Sec(callback, name) {
+        waitXSecs(1, callback, name)
+    }
+
+
+
+
+    function logLater(secs, content, name) {
+        if (secs == null) {
+            secs = .5
+        }
+        setTimeout(function traceResult_Named() {
+                //if ( name != null ) {
+                console.log()
+                console.log(name, ':')
+                console.log(content)
+                // }
+                // callIfDefined(callback)
+            }, secs * 1000
+        )
+    }
+
+
+    function sortArrayByField(array, field) {
+        function compare(a, b) {
+            if (a[field] < b[field])
+                return -1;
+            if (a[field] > b[field])
+                return 1;
+            return 0;
+        }
+
+        if (array == null) {
+            return array;
+        }
+        array.sort(compare);
+        return array
+    }
+
+
+    function error() {
+        setTimeout(function () {
+            console.error.apply(this, arguments)
+        }, 500)
+    }
+
+
+
+    function urlLink(potetialUrl) {
+
+        if (potetialUrl.indexOf('http') == 0) {
+            return true
+        }
+
+
+        return false
+    }
+
+    function toJSON(o, printJSON) {
+        printJSON = defaultValue(printJSON, false)
+        var json = JSON.stringify(o)
+        if (printJSON) {
+            console.log(json)
+        }
+        return json;
+    }
+
+    function safeProp(obj, val ) {
+        if (  obj != null ) {
+            return val
+        }
+        return ''
+    }
+
+    function isNull(val) {
+        if ( val == null ) {
+            return true
+        }
+
+        return false;
+    }
+
+    function toJSONString(o, printJSON) {
+        printJSON = defaultValue(printJSON, false)
+        var json = JSON.stringify(o, "\t", "\t")
+        if (printJSON) {
+            console.log(json)
+        }
+        return json;
+    }
+    function toJSONStrX(o, pretty) {
+
+
+        // var jsonHtmlTable = ConvertJsonToTable(objectArray, 'jsonTable', null, 'Download');
+
+        function syntaxHighlight(json) {
+            if (pretty) {
+                /*json = json.replace(/\{\n/gi, '')
+                 json = json.replace(/\}\n/gi, '')
+                 json = json.replace(/\[\n/gi, '')
+                 json = json.replace(/\]\n/gi, '')
+
+                 json = json.replace(/\},\n/gi, '\n')
+                 json = json.replace(/\],\n/gi, '\n')*/
+            } else {
+                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
+            }
+            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
+                var cls = 'number';
+                if (/^"/.test(match)) {
+                    if (/:$/.test(match)) {
+                        cls = 'key';
+                    } else {
+                        cls = 'string';
+                    }
+                } else if (/true|false/.test(match)) {
+                    cls = 'boolean';
+                } else if (/null/.test(match)) {
+                    cls = 'null';
+                }
+                return '<span class="' + cls + '">' + match + '</span>';
+            });
+        }
+
+        // var obj = {a:1, 'b':'foo', c:[false,'false',null, 'null', {d:{e:1.3e5,f:'1.3e5'}}]};
+        var str = JSON.stringify(o, undefined, 4);
+
+        //output(str);
+        var x = syntaxHighlight(str);
+
+        return x;
+    }
+
+    var styles = '<style>' + 'pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }' +
+        '.string { color: green; }' +
+        '.number { color: darkorange; }' +
+        '.boolean { color: blue; }' +
+        '.null { color: magenta; }' +
+        '.key { color: red; }' +
+        '</style>'
+
+
+//http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
+    function toHTMLStr(o) {
+        var tab = RegExp("\\t", "g");
+        var newline = RegExp("\\n", "g");
+        o = o.replace(tab, '&nbsp;&nbsp;&nbsp;&nbsp;')
+        //var tab = RegExp("\\t", "g");
+        o = o.replace(newline, '<br />')
+        var tab = RegExp("\",", "g");
+        o = o.replace(newline, '",<br />')
+
+
+        return o;
+    }
+
+
+    function makeLink(title, url, desc) {
+        var s = '<a href="' + url + '" title="' + desc + '">' + title + '</a>'
+        return s;
+    }
+
+    function wrapInHTMLTag(str, tag) {
+        var s = '<'+tag+'>' + str + '</'+tag+'>'
+        return s;
+    }
+
+
+
+    /**
+     * Join with new line
+     * @param array
+     * @returns {*|join|string|String|join}
+     */
+    function joinn(arr) {
+        var args = convertArgumentsToArray(arguments)
+        if (args.length > 1) {
+            arr = args;
+        }
+        else {
+
+        }
+
+        return arr.join("\n")
+    }
+
+
+    function EasyTimer() {
+        this.start = function start() {
+            this.startTime = new Date();
+            newTimer
+            this.running = true
+        }
+
+        this.stop = function stop() {
+            this.duration = sh.timeElapsed(this.startTime).toFixed(2)
+            this.running = false;
+        }
+
+
+        this.remaining = function remaining(percentDone) {
+            this.duration = sh.timeElapsed(this.startTime).toFixed(2)
+            var remainingPercentage = 1-percentDone;
+            var percRatio = remainingPercentage/percentDone
+            var secsRemaining = this.duration*percRatio
+            var minsRemaining = secsRemaining / 60
+            return minsRemaining.toFixed(2)
+        }
+
+        this.secs = function secs(format) {
+            if (this.running) {
+                this.stop()
+            }
+
+            var output = this.duration
+            //this.duration = sh.timeElapsed(this.startTime).toFixed(2)
+            if (format != false) {
+                output = ' ' + sh.paren(this.duration)
+            }
+            return output;
+        }
+
+
+    }
+
+    function newTimer() {
+        var t = new EasyTimer()
+        t.start()
+        return t;
+    }
+//line.replace(/'/g, "\\'");
+
+    function isWin() {
+        return process.platform === 'win32'
+    }
+    function isMac() {
+        console.log('platform', process.platform)
+        return process.platform === 'mac'
+    }
+
+//http://stackoverflow.com/questions/16261635/javascript-split-string-by-space-but-ignore-space-in-quotes-notice-not-to-spli
+//q: javascript split string by space, but ignore space in quotes (notice not to split by the colon too)
+    function splitStringOnQuotes(s) {
+        //s = 'Time:"Last 7 Days" Time:"Last 30 Days"'
+        output = s.match(/(?:[^\s"]+|"[^"]*")+/g)
+        return output;
+    }
+
+//http://stackoverflow.com/a/2970667
+    function toCamelCase(str) {
+        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
+            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
+            return index == 0 ? match.toLowerCase() : match.toUpperCase();
+        });
+    }
+
+
+    function toUpperCaseFirstChar (str) {
+        return str.substr( 0, 1 ).toUpperCase() + str.substr( 1 );
+    }
+
+    function toLowerCaseFirstChar (str) {
+        return str.substr( 0, 1 ).toLowerCase() + str.substr( 1 );
+    }
+
+    function unwrap(str, onlyIfFirstCharIs ){
+        if ( onlyIfFirstCharIs != null ) {
+            if ( str.slice(0,1) != onlyIfFirstCharIs ) {
+                return str;
+            }
+        }
+        str = str.trim(str)
+        str = str.slice(1,-1)
+        return str
+    }
+
+
+    function isWrapped(edges, str) {
+        str = str.trim()
+        var closer =  edges.slice(1)// ')'
+        var opener = edges.slice(0,1)// '('
+        if ( str.slice(0,1)!= opener) {
+            return false
+        }
+        if ( str.slice(str.length-1)!= closer) {
+            return false
+        }
+        return true;
+    }
+
+    function defineFS2() {
+
+        var file = sh.fs;
+        sh.file = file;
+        sh.files = file;
+
+        /**
+         * Appends ext to the filename
+         * @param filename
+         * @param ext
+         * @returns {*}
+         */
+        sh.file.addExtensionIfMissiong = function addExtensionIfMissiong(filename, ext) {
+            if (sh.includes(filename, ext)) {
+                return filename;
+            }
+            //add '.' if needed
+            if (false == sh.includes(ext, '.')) {
+                ext = '.' + ext;
+            }
+            return filename + ext;
+        }
+
+        /**
+         * Appends ext to the filename
+         * @param filename
+         * @param ext
+         * @returns {*}
+         */
+        sh.file.prependDirIfDefined = function prependDirIfDefined(file, prePend) {
+            if (prePend == null) {
+                return file;
+            }
+            if (false == sh.includes(prePend, '/')) {
+                prePend = prePend + '/'
+            }
+            file = prePend + file;
+            return file;
+        }
+
+        /**
+         * Should add before extension?
+         * @param name
+         * @param append
+         * @returns {*}
+         */
+        sh.file.addToFilename = function addToFilename(name, append) {
+            return name + append;
+        }
+
+        /**
+         *
+         * @param name
+         * @param append
+         * @returns {*}
+         */
+        sh.file.backup = function backup(fileNameToBackup, dir, maxNumFiles) {
+
+            var newName = fileNameToBackup
+            /*if ( append ) {
+             newName += '_'+append;
+             }*/
+            if (sh.fileExists(fileNameToBackup) == false) {
+                return;
+            }
+            var contents = sh.readFile(fileNameToBackup);
+            var writeFileSettings = {};
+            writeFileSettings.dir = 'backups';
+            if (dir != null) {
+                writeFileSettings.dir = dir;
+            }
+            writeFileSettings.contents = contents
+            writeFileSettings.maxNumFiles = maxNumFiles;
+            writeFileSettings.name = newName;
+            writeFileSettings.timestamp = true;
+            sh.writeFile2(writeFileSettings);
+
+            sh.file.clipDir('backups', 10)
+
+        }
+
+        /**
+         * Where from before?
+         * count files
+         * sort by modified time
+         * delete
+         * RouteHelper
+         * @param dir
+         * @param maxNumFiles
+         */
+        sh.file.clipDir = function clipDirFileCount(dir, maxNumFiles) {
+
+        }
+    }
+    defineFS2();
+
+
+//iterate over string
+    /*
+     $.each(myJsonObj, function(key,val){
+     // do something with key and val
+     });
+     You can always write a function to recursively descend into the object:
+
+     function traverse(jsonObj) {
+     if( typeof jsonObj == "object" ) {
+     $.each(jsonObj, function(k,v) {
+     // k is either an array index or object key
+     traverse(v);
+     });
+     }
+     else {
+     // jsonOb is a number or string
+     }
+     }
+     */
+
+    function defineArrays() {
+
+
+        var array = {}
+        sh.array = array;
+        array.getRandomItem = function getRandomItem(arry) {
+            var item = arry[Math.floor(Math.random()*arry.length)];
+            return item;
+        }
+
+        array.removeNulls = function removeNulls(arry, strict) {
+            var y = []
+            sh.each(arry, function(k, v){
+                if (v == null ) {
+                    return
+                }
+                if ( strict == true && v == 'undefined') {
+                    return;
+                }
+                y.push(v)
+            })
+            return y;
+        }
+
+    }
+    defineArrays();
+
+    function defineCallingCommands() {
+        sh.run = function runCommand(cmd, opts) {
+
+            console.log('running', cmd)
+            var child_process = require('child_process');
+            var ipAdd = child_process.execSync(cmd, opts)
+
+        }
+
+        sh.runAsync = function runCommandAsync(cmd, fxDone, opts) {
+            console.log('running', cmd)
+            var child_process = require('child_process');
+            var ipAdd = child_process.exec(cmd, opts, fxDoneRedirect)
+            
+            function fxDoneRedirect(error, x, output) {
+                if ( error != null ) {
+                    console.error('error')
+                    console.error(error.message)
+                    console.error(error.cmd)
+                }
+                sh.callIfDefined(fxDone, error,x,output)
+            }
+            
+        }
+
+        sh.runAsync2 = function runCommandAsync_Spawn(cmd, args, fxDone, opts) {
+            console.log('running', cmd)
+
+            // (function() {
+            var childProcess = require("child_process");
+            var oldSpawn = childProcess.spawn;
+
+            function mySpawn() {
+                console.log('spawn called');
+                console.log(arguments);
+                var result = oldSpawn.apply(this, arguments);
+                return result;
+            }
+
+            //childProcess.spawn = mySpawn;
+            //  })();
+
+
+            var spawn = childProcess.spawn;
+            var proc = spawn(cmd, args, opts);
+
+
+            proc.on('error', function (err) {
+
+                console.error('err', err.stack)
+                throw err
+            })
+
+
+            proc.on("exit", function (exitCode) {
+                console.log('process exited with code ' + exitCode);
+                sh.callIfDefined(fxDone)
+            })
+
+            proc.stdout.on("data", function (chunk) {
+                console.log('received chunk ' + chunk);
+            })
+
+            proc.stdout.on("end", function () {
+                console.log("finished collecting data chunks from stdout");
+            })
+
+
+        }
+
+
+        /**
+         *
+         * Can run command in a subprocess
+         * @constructor
+         */
+        function CommandRunner() {
+            var preamble = '\t\tCRunner'
+            //store to log file
+            var self = this;
+            self.launchCmd = function launchCmd(cmd, args, settings) {
+                //console.log(preamble, 'launchCmd')
+                self.log = {}
+                self.log.startTime = sh.getTimeStamp()
+                self.log.cmd = cmd
+                self.log.args = args;
+                self.log.output = ''
+                self.log.error = ''
+
+                self.spawn(cmd, args, settings)
+            }
+
+            /**
+             * Tokenized interface
+             * @param cmd
+             * @param args
+             * @param settings
+             */
+            self.execute = function execute(settings) {
+                if (self.silent) {
+                    console.log(preamble, ',launchCmd', settings.cmd)
+                }
+                var cmd = settings.cmd
+                var args = settings.args;
+
+                self.silent = settings.silent;
+                self.settings = settings;
+                //make this more user friendly. split cmd if has whitespace
+                if (sh.includes(cmd, ' ')) {
+                    var _args = cmd.split(' ');
+                    _args = sh.splitStringOnQuotes(cmd)
+                    cmd = _args[0]
+                    args = _args.slice(1)
+                }
+
+                self.log = {}
+                self.log.startTime = sh.getTimeStamp()
+
+                self.log.cmd = cmd
+                self.log.args = args;
+
+                self.log.output = ''
+                self.log.error = ''
+
+                self.spawn(cmd, args, settings)
+            }
+
+
+            self.spawn = function spawn(cmd, args, settings) {
+                var callback = settings.fxCallback //called when cmd exits
+
+                if (settings.noWait) {
+                    sh.callIfDefined(callback)
+                }
+
+                settings.origCmd = cmd;
+                var prependToLog = sh.defaultValue(settings.prependToLog, '') //show source
+                //if cmd is a javascript file, append node on the beginning
+                if (cmd.indexOf('node') != 0 && sh.endsWith(cmd, '.js')) {
+                    args.unshift(cmd)
+                    cmd = 'node';
+                    //if ( process.platform != 'win32' )
+                    // cmd = 'nodejs'
+                }
+                self.callback = callback;
+                self.settings = settings;
+
+                var terminalRef = null;
+
+                function appendToLog(logLine, error) {
+                    try {
+                        if (settings != null && settings.logger != null) {
+                            settings.logger.push(logLine)
+                        }
+                        self.log.output += logLine //+ sh.n
+                        if (error) {
+                            self.log.error += logLine
+                        }
+
+                    } catch (e) {
+                        console.error('issue with debug');
+                        terminalRef.kill('SIGINT');
+                        terminal.stdout.removeAllListeners('data');
+                        terminal.stderr.removeAllListeners('data');
+                        self.endOfCmd()
+                    }
+                }
+
+                if (args == null) {
+                    args = {}
+                }
+                args.maxBuffer = Infinity;
+                if (self.silent != true) {
+                    console.log(preamble, 'spawn', cmd, args.join(", "))
+                    console.log(preamble, '', cmd, args.join(" "))
+                }
+                var terminal = require('child_process').spawn(cmd, args);
+                terminalRef = terminal;
+                terminal.stdout.on('data', function onChildProc(data) {
+                    // console.log('stdout: ' + data);
+                    var logLine = prependToLog + ' stdout (cr): ' + data
+                    if (self.silent != true) {
+                        process.stdout.write(logLine);
+                    }
+
+                    appendToLog(logLine)
+
+                    if (settings.fxEcho != null) {
+                        settings.fxEcho(data.toString(), self.write);
+                    }
+                    //
+                    if (settings.promptText != null && sh.includes(data.toString(), settings.promptText)) {
+                        console.log('\t\t\t\t', 'lll', settings.fxCmds.length)
+                        //
+                        var fxCmds = settings.fxCmds
+                        if (fxCmds != null) {
+                            if (fxCmds.length > 0) {
+                                self.write(fxCmds.pop()) //send most recent command
+                                return;
+                            }
+                        }
+
+
+                    }
+
+
+                    if (settings.fxInput != null) {
+                        settings.fxInput(self.write, data.toString());
+                    }
+
+                });
+                terminal.stderr.on('data', function (data) {
+                    var logLine = prependToLog + 'data: ' + data.toString()
+                    if (data.hasOwnProperty('message') && data.message != null) {
+                        logLine += ' ' + data.message
+                    }
+                    if (settings.fxEcho != null) {
+                        settings.fxEcho(data.toString(), self.write);
+                    }
+                    if (self.silent != true) {
+                        process.stdout.write(logLine);
+                        console.error(logLine)
+                    }
+                    appendToLog(logLine, true)
+
+                    if (settings.fxData != null) {
+                        settings.fxData(logLine)
+                    }
+                    //console.log('stderr: ' + data);
+                    //console.error(prependToLog+'child process error', error);
+                    //+ sh.n
+
+                });
+                terminal.on('exit', function (code) {
+
+                    var logLine = prependToLog + 'child process exited with code ' + code + '\n'
+                    if (self.silent) {
+
+                    } else {
+                        process.stdout.write(logLine);
+                    }
+
+                    if (self.hasError) {
+                        console.error(settings.logger.join("\n"))
+                    }
+                    appendToLog(logLine)
+                    self.endOfCmd()
+
+                });
+                //error that terminated the child process
+                terminal.on('error', function (error) {
+                    self.hasError = true
+                    var logLine = prependToLog + 'fatal stderr: ' + 'child process error ' +
+                        error + ' ' + error.stack
+                    //process.error.write(logLine);
+                    if (self.silent != true) {
+                        console.error(logLine)
+                        appendToLog(logLine, true)
+                    }
+
+                    console.error(preamble, 'ERROR', 'spawn', cmd, args.join(", "))
+                    console.error(logLine)
+
+                    if (settings.fxEcho != null) {
+                        settings.fxEcho(error.toString(), self.write);
+                    }
+                    var logLine = prependToLog + 'fatal stderr: ' + 'child process error ' + error.message
+                    //process.error.write(logLine);
+                    if (self.silent != true) {
+                        console.error(logLine)
+                    }
+                    appendToLog(logLine, true)
+                    self.endOfCmd()
+                });
+
+
+                self.terminal = terminal;
+                self.write = function write() {
+                    var args = sh.convertArgumentsToArray(arguments)
+                    //args.push("\n")
+                    terminal.stdin.write(args.join('') + "\n")
+                    //console.log('... write', args)
+                }
+                self.write2 = function write() {
+                    var args = sh.convertArgumentsToArray(arguments)
+                    args.push("\n")
+                    terminal.stdin.write(args.join(' '))
+                    //console.log('... write', args)
+                }
+
+                function sendStdIn() {
+                    console.log('Sending stdin to terminal');
+                    //terminal.stdin.write('pwd')
+                    write('dir')
+                    // remove prev stdout listener
+                    //out.removeAllListeners('data');
+                    write('exit')
+                    // new stdout listener
+                    /*out.on('data', function (data) {
+                     console.log('stdout: ' + data);
+                     });*/
+                    //writeT('safd')
+                    write('cd')
+                    // write('dir')
+                    //terminal.stdin.write('dir\n')
+                    //terminal.stdin.write('echo "Hello $USER. Your machine runs since:"\n');
+                    // terminal.stdin.write('uptime\n');
+                    // console.log('Ending terminal session');
+                    //terminal.stdin.end();
+                }
+
+                if (settings.enableInput) {
+                    console.log('input is enabled')
+                    var sys = require("sys");
+
+                    var stdin = process.openStdin();
+
+                    stdin.addListener("data", function (d) {
+                        // note:  d is an object, and when converted to a string it will
+                        // end with a linefeed.  so we (rather crudely) account for that
+                        // with toString() and then substring()
+                        //console.log("you entered: [" +   d.toString().substring(0, d.length-1) + "]");
+                        var input = d.toString().substring(0, d.length - 1)
+                        //console.log('entered', input)
+                        // self.write(d)
+                        terminal.stdin.write(d)
+                    });
+                }
+
+            }
+
+
+            self.endOfCmd = function endOfCmd() {
+                self.logOutputToFile();
+                //console.log('....', 'endOfCmd',self.callback!=null,
+                //    self.settings.fxCallback!=null)
+                if (self.callback != null) {
+                    self.callback()
+                    return; //do not call fxCallback too
+                }
+                ;
+                if (self.settings.fxCallback != null) {
+                    self.settings.fxCallback();
+                }
+
+                if (self.settings.fxCallback == null) {
+                    console.log('warning, no fxCallback defined')
+                }
+            }
+
+            self.logOutputToFile = function logOutputToFile() {
+                if (self.settings.storeOutputToFile != true) {
+                    return
+                }
+                //var content = JSON.stringify(self.log);
+                var logOutputToFileSettings = self.settings.logSettings;
+                //settings.dir = 'job'
+                //sh.writeFile2(self.settings.origCmd+'.output.txt',
+                //    content, logOutputToFileSettings)
+                var content = settings.logger.join();
+                var logFileName = self.settings.origCmd + '.output.txt'
+                sh.writeFile2(logFileName,
+                    content, logOutputToFileSettings)
+                //sh.writeFile2(self.output_filename_preamble + self.log.cmd+'output.json', content, logOutputToFileSettings)
+            }
+        }
+
+        /**
+         * Bulk save the contents of many log runners
+         * @param contents
+         * @param fileSettings
+         */
+        CommandRunner.log = function (contents, fileSettings) {
+            var content = contents;
+            if (contents instanceof Array) {
+                var content = contents.join();
+            }
+            sh.writeFile2('',
+                content, fileSettings)
+            //sh.writeFile2(self.output_filename_preamble + self.log.cmd+'output.json', content, logOutputToFileSettings)
+
+        }
+
+        function testCallingCommands() {
+            //
+            //
+
+            var json = {}
+            json.cmd = 'asdfasdf'
+            json.args = ['bad cmnd']
+            var fxCallbackTestComplete = function fxCallbackTestComplete() {
+                console.log('done')
+                // cmd.logOutput();
+            }
+            var cmd = new CommandRunner();
+            // cmd.launchCmd(json.cmd, json.args, fxCallbackTestComplete)
+            cmd.logOutput = true
+
+
+            var json = {}
+            json.cmd = 'node emailTest.js'
+            json.args = [4, 5, 6]
+            json.cmd = 'node'// emailTest.js'
+            json.args = ['emailTest.js', 4, 5, 6]
+            var fxCallbackTestComplete = function fxCallbackTestComplete() {
+                console.log('done')
+            }
+            var cmd = new CommandRunner();
+            cmd.launchCmd(json.cmd, json.args, fxCallbackTestComplete)
+            cmd.logOutput = true
+        }
+
+
+        sh.async = function async(items, fxAction, fxDone, concurrency) {
+            var async = require('async');
+
+            //var imdbs = [];
+            if (sh.isString(items)) {
+                items = sh.splitStrIntoArray(items)
+            }
+
+            if (items.length == 0) {
+                sh.callIfDefined(fxDone);
+            }
+            concurrency = sh.dv(concurrency, 1);
+            async.forEachLimit(items, concurrency, function processEachTest(item, fxInteration) {
+                //console.log('look at', item)
+                fxAction(item, fxInteration);
+            }, function allTestFinished(err) {
+                if (err) {
+                    console.log(err)
+                }
+                ;
+                sh.callIfDefined(fxDone);
+            });
+
+        }
+
+    }
+
+    defineCallingCommands();
+
+
+    function defineTime() {
+
+        sh.time = {}
+        sh.time.diff = function diff(a, b, ms ) {
+            if ( b == null ) {
+                b = new Date();
+            }
+            var diff = b.getTime() - a.getTime()
+            if ( diff > ms ) { //+ ms <  ) {
+                return true
+            }
+            return false;
+        };
+        sh.time.diff2 = function diff(a, secs ) {
+            var  b = new Date();
+            var diff = b.getTime() - a.getTime()
+            if ( diff > secs * 1000 ) { //+ ms <  ) {
+                return true
+            }
+            return false;
+        };
+
+        sh.time.diffLessThanSecs = function diffLessThanSecs(a, secs ) {
+            var  b = new Date();
+            var diff = b.getTime() - a.getTime()
+            if ( diff < secs * 1000 ) { //+ ms <  ) {
+                return true
+            }
+            return false;
+        }
+
+        sh.time.secs = function howManySecodsHavePastSince(a, b, ms ) {
+            if ( b == null ) {
+                b = new Date();
+            }
+            var diff = b.getTime() - a.getTime()
+            diff = diff/1000;
+            return diff;
+        };
+
+    }
+    defineTime();
+
+
+    if (typeof exports === 'undefined') {
+        exports = {}
+        exports.isNode = false;
+        //must be in browser
+    }
+    exports.shelpers = helper;
+    helper.includes = includes;
+    helper.removeFromArray = removeFromArray;
+    helper.replace = replace;
+    helper.includes2 = includes2;
+    helper.endsWith = endsWith;
+    helper.startsWith = startsWith;
+    helper.log = log;
+    helper.callIfDefined = callIfDefined;
+    helper.remove_win_newlines = remove_win_newlines;
+    helper.stripBadFiles = stripBadFiles;
+    helper.replaceBackslash = replaceBackslash
+    helper.stripSpecialChars = stripSpecialChars;
+    helper.convertArgumentsToArray = convertArgumentsToArray;
+    helper.splitStrIntoArray = splitStrIntoArray;
+    helper.convertStringToArray = convertStringToArray;
+    helper.strip = strip;
+    helper.removeSubString = removeSubString
+    helper.combineLines = combineLines;
+
+
+    helper.lLog = lLog;
+    helper.sLog = sLog;
+    helper.requiredParam = requiredParam;
+    helper.requiredParamOneOf = requiredParamOneOf;
+    helper.readFile = readFile;
+    helper.copyFile2 = copyFile2;
+    helper.readFileLinesAsArray = readFileLinesAsArray;
+    helper.writeFile = writeFile;
+    helper.writeFile2 = writeFile2;
+    helper.writeFileToTrash = writeFileToTrash;
+    helper.fileExists = fileExists;
+    helper.checkFileMTime = checkFileMTime;
+    helper.dirname = dirname;
+    helper.deleteFile = deleteFile;
+
+    helper.copyFile = copyFile;
+    helper.getLinesFromFile = getLinesFromFile;
+    helper.getFilesInDirectory = getFilesInDirectory;
+    helper.isDirectory = isDirectory;
+    helper.openFiles = openFiles;
+    helper.getFileName = getFileName;
+    helper.getPath = getPath;
+    helper.makePathIfDoesNotExist = makePathIfDoesNotExist;
+    helper.mkdirp = makePathIfDoesNotExist;
+    helper.fs.clearDir = clearDir;
+    helper.fs.rmrf = rmrf;
+    helper.getUserHome = getUserHome;
+    helper.makePath = makePath;
+
+//array
+    helper.forceArray = forceArray;
+    helper.isArray = isArray;
+    helper.isString = isString;
+    helper.isObject = isObject;
+    helper.isFunction = isFunction;
+    helper.arrayFilterByProp = arrayFilterByProp;
+    helper.arrayCollectProp = arrayCollectProp;
+    helper.clone = clone
+    helper.clone2 = clone2;
+    helper.arrayCondenseArrayByProp = arrayCondenseArrayByProp;
+    helper.joinn = joinn
+
+    helper.error = error
+
+    helper.urlLink = urlLink
+
+    helper.assert = assert
+
+    helper.traceResult = traceResult;
+    helper.traceResultNamed = traceResultNamed;
+
+    helper.waitXSecs = waitXSecs;
+    helper.wait1Sec = wait1Sec;
+    helper.logLater = logLater;
+
+
+    helper.defaultValue = defaultValue;
+    helper.dv = defaultValue;
+    helper.mergeObjects = mergeObjects;
+
+    helper.sortArrayByField = sortArrayByField;
+    helper.each = each;
+
+    helper.eachHelper = eachHelper;
+
+    helper.timeElapsed = timeElapsed
+    helper.getTimeStamp = getTimeStamp
+    helper.getTime = getTime;
+
+    helper.paren = paren;
+    helper.quote = q;
+    helper.unquote = unquote;
+    helper.q = q;
+    helper.qq = qq;
+
+    helper.bracket = bracket;
+    helper.br = br;
+    helper.brn = brn;
+    helper.newline = newline;
+    helper.n = newline;
+    helper.tab = "\t";
+    helper.toJSON = toJSON;
+    helper.toJSONString = toJSONString;
+    helper.safeProp = safeProp;
+
+    helper.capitalize = capitalize
+    helper.toHTMLStr = toHTMLStr
+    helper.toJSONStrX = toJSONStrX
+    helper.toHTMLJSON = {}
+    helper.toHTMLJSON.styles = styles;
+
+    helper.getArrayContentBetween =
+        helper.isCommentLine = isCommentLine;
+    helper.getContentBetween = getContentBetween;
+
+    helper.getNodeArguments = getNodeArguments;
+
+    helper.tests = {}
+    helper.GoThroughEach = GoThroughEach;
+    helper.tests.testGoThroughEach = testGoThroughEach;
+
+    helper.dictMakeByName = dictMakeByName;
+    helper.DictArray = DictArray;
+    helper.tests.testDictArray = testDictArray;
+    helper.tests.writeFile2Test = writeFile2Test
+
+    helper.removeProps = removeProps;
+    if ( helper.str == null ) {
+        helper.str = {}
+    }
+    helper.str.https = 'https://'
+    helper.str.http = 'http://'
+    helper.https = 'https://'
+    helper.http = 'http://'
+    helper.html = {};
+    helper.html.makeLink = makeLink;
+    helper.html.wrapInHTMLTag = wrapInHTMLTag;
+
+    helper.urls = {}
+    helper.urls.makeRelative = makeRelative
+    helper.urls.removeProtocol = removeProtocol;
+    helper.urls.getSubDomain = getSubDomain;
+    helper.urls.isAbsUrl = isAbsUrl;
+//Strings
+    helper.caseInsensitiveComparison = caseInsensitiveComparison;
+    helper.cICompare = caseInsensitiveComparison;
+    helper.insert = insert;
+
+    helper.newTimer = newTimer;
+    helper.EasyTimer = EasyTimer;
+    helper.CommandRunner = CommandRunner;
+
+    helper.splitStringOnQuotes = splitStringOnQuotes
+    helper.toCamelCase = toCamelCase;
+
+    helper.toLowerCaseFirstChar = toLowerCaseFirstChar;
+    helper.toUpperCaseFirstChar = toUpperCaseFirstChar
+    helper.unwrap = unwrap;
+    helper.unWrap = unwrap
+    helper.isWrapped = isWrapped
+    helper.eachProp = eachProp
+
+
+    helper.isWin = isWin;
+    helper.isMac = isMac;
+    helper.isNull = isNull;
+
+    function defineIterationHelpers() {
+
+    }
+    defineIterationHelpers();
+
+
+//used by browser/node.js agnostic scripts
+//todo: add more robust solution
+    helper.isNode = true
+    helper.isBrowser = false
+    if (typeof require !== 'undefined') {}
+    else {
+        helper.isBrowser = true
+        helper.isNode = false
+    }
+
+
+    var shelpers = sh;
+    window.sh = sh;
+    /*
+     for (var i=0;i<cars.length;i++)
+     {
+     document.write(cars[i] + "<br>");
+     }
+     */
+
+    if ( isNode ) {
+        if (module.parent == null) {
+            function runTests(){
+                testEachProp()
+                return;
+                //helper.tests.testDictArray()
+                //helper.tests.writeFile2Test();
+            }
+
+            runTests();
+        }
+    }
+
+})();
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/smoketest.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/smoketest.js	(revision )
+++ mp/testingFramework2/csvScripts/smoketest.js	(revision )
@@ -0,0 +1,148 @@
+
+function testProxy() {
+
+    var dictFxs = {};
+    dictFxs.c = function callC(arg1, arg2) {
+        console.log('testproxy', arg1, arg2)
+    }
+
+    var handler = {
+        get: function(target, name, reciever) {
+            console.log('get-testproxy', target, name, reciever)
+            var origMethod = dictFxs[name];
+            if ( origMethod == null ) {
+                throw new Error(['could not find fx',
+                    '"'+name+'"']
+                    .join(' '))
+            }
+            return function (...args) {
+                let result = origMethod.apply(this, args);
+                console.log('callmeth', name + JSON.stringify(args)
+                    + ' -> ' + JSON.stringify(result));
+                return result;
+            };
+
+            return name in target ?
+                target[name] :
+                37;
+        },
+/*
+        apply: function(target, that, args) {
+            console.log('fx-testproxy', target, that, args)
+
+            return;
+            sup.apply(that, args);
+            base.apply(that, args);
+        }*/
+    };
+
+    var p = new Proxy({}, handler);
+    //p.a = 1;
+   // p.b = undefined;
+
+    p.c();
+    p.c(4);
+    p.d();
+   // console.log(p.a, p.b); // 1, undefined
+   // console.log('c' in p, p.c);
+
+ //'   debugger
+}
+
+
+//testProxy();
+
+
+
+/*
+
+
+ function testProxy() {
+
+
+ var handler = {
+ get: function(target, name, reciever) {
+ console.log('get-testproxy', target, name, reciever)
+ const origMethod = target[name];
+ return function (...args) {
+ let result = origMethod.apply(this, args);
+ console.log(propKey + JSON.stringify(args)
+ + ' -> ' + JSON.stringify(result));
+ return result;
+ };
+
+ return name in target ?
+ target[name] :
+ 37;
+ },
+
+};
+
+var p = new Proxy({}, handler);
+//p.a = 1;
+// p.b = undefined;
+
+p.c()
+p.c(4)
+console.log(p.a, p.b); // 1, undefined
+console.log('c' in p, p.c);
+
+//'   debugger
+}
+
+
+testProxy();
+
+
+
+ */
+
+
+$('x42-tree').find('x42-tree-node').find('[level=3]').find('.tree-label-anchor')
+
+$('x42-tree').find('.tree-label-anchor')
+
+function getLinks() {
+
+    var links =     $('x42-tree').find('.tree-label-anchor')
+    var links2 = links.filter(function filterInvalidLinks(i){
+        var ui = $(this)
+        //ui = ui.find('a')
+        var hasHref = ui.attr('href') != null
+        //console.debug('links', i, ui, hasHref, ui.attr('href'))
+        if ( hasHref ) {
+            return true;
+        }
+        return false;
+    })
+
+    console.debug('links', links.length)
+    console.debug('links2', links2.length)
+    return links2
+}
+
+
+
+getLinks()
+
+
+
+function findTabs() {
+    var tabs =  $('#tabHolder').find('li.uib-tab:visible')
+    console.debug('tabs', tabs.length)
+    return tabs
+}
+
+
+
+findTabs()
+
+function clickkForX() {
+    var table = $('pt\\:remote-table');
+    $('pt-table').css('opacity');
+    return tabs
+}
+
+
+
+findTabs()
Index: mp/testingFramework2/csvScripts/wf1_make_tabs.js.txt.bak
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/wf1_make_tabs.js.txt.bak	(revision )
+++ mp/testingFramework2/csvScripts/wf1_make_tabs.js.txt.bak	(revision )
@@ -0,0 +1,176 @@
+#test for basic csv
+log this test will enter the EU Trading 2 subsite
+log Will create 2 tabs on two pages ,
+log Then verify tabs have been created.
+
+/*
+click Revenue; x42-nav-sidebar
+
+if {find:'sheery', goto:'step4'}
+
+click 1
+click 2
+click 3
+bookmark step4
+click 4
+click 5
+if  {find:'skipTo8', goto:'step8'}
+click 6
+click 7
+bookmark step8
+click 8 
+click 9
+click 10
+
+endtest
+
+*/
+eval  close all popups
+    window.$scope.popups.hideAllDialogs()
+    window.$scope.popups.data.openDialogs = []
+    window.$scope.popups.data.modalCount = 0
+    //window.$subsitesScope.popups.hideAllDialogs()
+end
+
+def - showdropdown
+    var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+    x42NavBarNav_DropDown.addClass('open')
+endeval
+
+fx showdropdown
+
+
+waitForShow EU Trading2; wait for subsite in list; #holderMySubsiteList
+click  EU Trading2; #holderMySubsiteList
+
+
+waitForShow #dialogAddNewTab; ensure the new subsite tab button is visible
+
+
+bookmark clone the first tab
+click #dialogAddNewTab
+
+waitForShow #dialogCloneTabFrom
+#waitForShow Function
+#click Function; #dialogCloneTabFrom
+
+def create-tab
+ tH.defaultAddNext = true;
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( window.tabIndexToCreate ) {
+            indexTab = window.tabIndexToCreate
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone');
+        var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+        btnCancel.click()
+        return
+        }
+
+        window.$scope.layoutToCopy = [name]
+        window.$scope.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+    }
+    cloneTab_QuickIFTabExists();
+     tH.defaultAddNext = false;
+end
+
+
+eval
+window.tabIndexToCreate = 0;
+end
+fx create-tab
+
+eval
+window.tabIndexToCreate = 1
+end
+fx create-tab
+
+wait .2
+click OK; #dialogCloneTabFrom
+
+bookmark clone2nd tab
+
+def refresh_subsites
+    //#item; howManyItems
+    console.log('1', arg1);
+    tH.logNow('clicking', arg1)
+    tH.defaultAddNext = true;
+    tH.click(arg1, '#divsContainerCounter' )
+    tH.defaultAddNext = false;
+end
+
+fx refresh_subsites true
+
+
+
+endtest
+
+
+
+click OK; #dialogCloneTabFrom
+
+#############################
+endtest
+click button
+
+
+click Leave Subsite
+
+waitForHide Leave Subsite
+
+click Manage Subsites...
+
+waitForShow #dialogManageSubsites
+
+eval close all popups
+  //window.$scope.popups.hideAllDialogs()
+  //window.$subsitesScope.popups.hideAllDialogs()
+
+  var y = testHelper.findByContent('EU Trading2', $('#dialogManageSubsites') )
+  var tr = y.parents('tr')
+  var trashIcon = tr.find('.fa-trash')
+  console.clear();
+  console.log('trash',y,tr, trashIcon);
+  trashIcon.click()
+end
+
+waitForShow #confirmDialog
+
+#click Cancel; #confirmDialog //ignore
+click OK; #confirmDialog //ignore
+
+
+waitForShow #dialogManageSubsites
+click Close; #dialogManageSubsites
+
+wait 1
+endtest
+click button
+clickJ .redTest //click red button
+clickText jump
+clickText test 2
+log test
+set #txtArea set the text
+set #txtArea; set the text ~use semi colon to delinate args
+set #txtArea |set the text ~use pika to delinate args
+alert new alert
+logNow sdfsdf
+logNext sdfsdfsdf
+log sdfsdfsdfsdfsdf
+wait 2 //wait 2 seoncds
+/*
+block comment
+*/
+--comment
+~some message alert //alias for log
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/defs.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/defs.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/defs.js.txt	(revision )
@@ -0,0 +1,1100 @@
+#test for basic csv
+#load this iat runtime from the main page
+#can defs be shared after test has run? i hope so
+#when change defs, rerun last test ...? , so add to index as well
+log creating definitions
+
+
+
+
+
+
+def y
+    window.gsdf.gsdf = 'j'
+end
+#fx y
+
+def - alert
+    alert('in alert')
+endeval
+
+
+def - closeallpopups 
+    window.$scopeSubsites.popups.hideAllDialogs()
+    //window.$subsitesScope.popups.hideAllDialogs()
+end
+
+def - showdropdown
+    tH.wait(0.5);
+    var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+    //x42NavBarNav_DropDown.addClass('open')
+    x42NavBarNav_DropDown.mouseenter();
+    tH.waitForShow('Create New Subsite', 'dropdown didnt show',
+     '#dialogNavBar_SubsiteMenu')
+endeval
+
+def hidedropdown
+    tH.wait(0.5);
+    var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+    x42NavBarNav_DropDown.mouseleave();
+    //x42NavBarNav_DropDown.removeClass('open')
+endeval
+
+
+def create-tab
+
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+            indexTab = arg1;
+        }
+        var name = window.$scopeSubsites.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+            console.log('found eexisting copy of clone');
+
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+            var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+            btnCancel.click()
+            return
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+        window.$scopeSubsites.layoutToCopy = [name]
+        window.$scopeSubsites.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.clickNext('OK', '#dialogCloneTabFrom');
+    }
+    tH.setDefaultAddNext()
+    tH.logNow('running create tab?')
+    // cloneTab_QuickIFTabExists();
+    tH.click('#dialogAddNewTab');
+    console.log('clonned tab', $('#dialogAddNewTab'));
+    tH.waitForShow( '#dialogCloneTabFrom', did not see clone tab')
+    //  tH.click('')
+    tH.addSync(cloneTab_QuickIFTabExists)
+    tH.resetDefaultAddNext();// = false;
+end
+
+def verifySubsiteTab
+    // tH.setDefaultAddNext()
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+        indexTab = arg1;
+        }
+        var name = window.$scopeSubsites.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone');
+        return
+        }
+         tH.fail('missing subsite tab ', expectedName)
+    }
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    //  tH.resetDefaultAddNext();// = false;
+end
+#fx verifySubsiteTab; 1
+
+
+
+def refreshSubsites(subsiteName)
+    tH.fx('showdropdown' )
+    tH.fx('leaveSubsite' )
+    tH.wait(.5)
+
+    tH.logNow('go to subsite')
+
+    tH.fx('ensureAllSubsiteTabsGone')
+
+    tH.addStep(function refreshSubsiteList(){
+        window.$scopeSubsites.subsites.remote.sites.listItems( function() {
+            tH.wait(.5)
+            // tH.resetDefaultAddNext()
+             tH.test.cb()
+        })
+    });
+
+    if (subsiteName) {
+        tH.click(subsiteName, '#holderMySubsiteList')
+    }
+
+       tH.fx('hidedropdown');
+end
+
+
+
+def revertTabs(subsiteName)
+    tH.fx('showdropdown' )
+     tH.fx('leaveSubsite' )
+    tH.wait(.5)
+
+    tH.logNow('go to subsite')
+
+    tH.fx('ensureAllSubsiteTabsGone')
+
+    tH.addStep(function refreshSubsiteList(){
+        window.$scopeSubsites.subsites.remote.sites.listItems( function() {
+            tH.wait(.5)
+            // tH.resetDefaultAddNext()
+             tH.test.cb()
+        })
+    });
+
+    tH.addStep(function clearTabs(){
+        window.$scopeSubsites.utilsFx.revertUITabs(false, function onTabsUpdated(){
+
+        })
+        tH.test.cb();
+    });
+
+
+    tH.wait(2)
+    tH.log('... recreating tabs');
+    //return
+    tH.addStep(function clearTabs(){
+        window.$scopeSubsites.utilsFx.revertUITabs(true, function onTabsUpdated(){
+              tH.test.cb();
+        })
+
+    });
+
+    if (subsiteName) {
+        tH.click(subsiteName, '#holderMySubsiteList')
+    }
+
+    tH.fx('hidedropdown');
+end
+
+def leaveSubsite
+    tH.fx('showdropdown' )
+    tH.wait(1)
+    
+      tH.addStep(function tryToLeaveSubsite() {
+            var leaveCurrentSubsite = tH.findByContent('Leave', '#dialogNavBar_SubsiteMenu');
+            if ( leaveCurrentSubsite.length == 0 ) { 
+                tH.test.cb();
+                return;
+                //exit
+            }
+            
+            //mignt not be in subsite mode
+            tH.click('Leave', '#dialogNavBar_SubsiteMenu'); //will fali if not available
+            tH.waitForNone('Leave', null, '#dialogNavBar_SubsiteMenu')
+            
+            tH.waitForHide('#dialogAddNewTab',
+            'Ensure add to subsite tab is hidden - when user leaves subsite edit mode');
+            //tH.waitForNone('li[type="subsiteTab"]', 'Did not hide the subsite tabs when left subsite')
+            
+            tH.fx('hidedropdown');
+            tH.test.cb()
+        });
+    
+
+end
+
+
+
+def ensureAllSubsiteTabsGone
+
+    var tabsUser = $('[type=userTab]')
+    var tabsSubsite = $('[type=subsiteTab]')
+
+    if ( tabsSubsite.length > 0 ) {
+        tH.fail('had subsite tabs', tabsSubsite);
+        window.failData = tabsSubsite;
+    }
+
+end
+
+
+def ensureAllCustomTabsGone
+
+    var tabsUser = $('[type=userTab]')
+    var tabsSubsite = $('[type=subsiteTab]')
+
+    if ( tabsSubsite.length > 0 ) {
+        tH.fail('had subsite tabs', tabsSubsite);
+        window.failData = tabsSubsite;
+    }
+
+    if ( tabsUser.length > 0 ) {
+        tH.fail('had tabsUser, expected 0', tabsUser);
+        window.failData = tabsUser;
+    }
+end
+
+def removeAllTabs(userTabs)
+    tH.wait(1);
+    tH.addStep(function findAllUserTabs() {
+        if ( userTabs == true || userTabs == 'true'  ) {
+             var items = $('[type=userTab]')
+             //debugger
+        } else {
+            var items = $('[type=subsiteTab]')
+       //     debugger
+        }
+
+        var arrTabs = []
+        $.each(items, function onDeleteTabInLoop(k,v) {
+            var tabName2 = $(v).text().trim();
+            //debugger
+            console.log('will delete tab', tabName2);
+            tH.wait(1);
+            tH.fx('deleteTab', tabName2)
+            arrTabs.push(tabName2);
+        });
+
+        var arrTabNames =  $scopeSubsites.utilsFx.getTabNames()
+        console.log('all tab names', arrTabNames);
+
+        console.log('will delete tabs', arrTabs);
+
+
+        tH.test.cb()
+    });
+end
+
+def deleteTab(tabName_, userTabType)
+    tH.click(tabName_, '#tabHolder');
+    tH.wait(0.5);
+
+    if ( userTabType == 'true' || userTabType == true ) {
+        tabType = 'userTab'
+    }
+
+    tH.log('will delete', 'searching for tab', tabName_)
+
+
+    function findTabByName() {
+        tH.logNow('where is tab', tabName_,'?');
+        var tabs = tH
+        .findByContent('li|||'+tabName_,
+        '#tabHolder');
+
+        if ( tabs.length > 1 ) {
+            tH.clickNow(tabs)
+        }
+        return tabs;
+    }
+
+    tH.waitForShow(findTabByName, 'Did not see context controls');
+
+    //tH.waitForShow('$2 li|||'+expectedName, 'tab edit controls did not appear on display', '#tabHolder')
+
+    #wait for show item under by content
+    tH.click('#editTabNameDialogContent')
+    tH.wait(0.5)
+    tH.click('a|||Delete', '#dialogTabContextMenuContent')
+    tH.waitForShow('#confirmDialog')
+    tH.click('OK', '#confirmDialog')
+     tH.waitForHide('#confirmDialog', 'Pressed OK, but confirmDialog did not close')
+    tH.addSync(function deleteLog() {
+         tH.log('will delete tab', tabName_, 'gone')
+    })
+    tH.wait(1) //wait for tab to clear
+    tH.fx('findTab', tabName_,userTabType)
+    tH.addStep(function throwErrorIfTabFound() {
+        if (   window.foundTab = null ||   window.foundTab.length == 0 ) {
+
+        } else {
+            tH.fail('found the tab', tabName_, userTabType)
+        }
+        tH.test.cb();
+    })
+
+
+end
+
+
+def findTab(tabName,userTabType)
+  window.foundTab = null;
+    var existingTab = tH.findByContent(tabName, '#tabHolder')
+    var tabType = 'subsiteTab'
+    if ( userTabType == 'true' || userTabType == true ) {
+        tabType = 'userTab'
+    }
+    existingTab = existingTab.filter('[type='+tabType+']');
+    if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone', existingTab);
+        //return
+    } else {
+
+    }
+    window.foundTab = existingTab;
+    tH.logNow('searched for tab', tabName )
+end
+
+def deleteTabSafe(tabName,type)
+    //tH.logNow('creating the new tab', expectedName )
+    tH.fx('findTab',tabName, type);
+    tH.addStep(function onTestTAb() {
+        existingTab = window.foundTab;
+        // tH.logNow('found existing tab', tabName , existingTab.length)
+        if ( existingTab.length > 0 ) {
+            // asdf.g
+            tH.logNow('found existing tab, deleting tab named:', tabName )
+            tH.fx('deleteTab', tabName, type);//
+            // return
+        } else {
+
+        }
+        tH.test.cb()
+    });
+
+
+end
+
+def unhideAllTabs()
+       tH.fx('closeallpopups');
+       //tH.fx('closeallpopups');
+
+       tH.addStep( function selectFirstTab() {
+            var tabs = $('#tabHolder').find('li')
+            tab = tabs[0]
+            tab = $(tab)
+            //tH.msgStatus('click', tab.text());
+            console.log(tab.text())
+            tH.click(tab.text(), '#tabHolder');
+            tH.test.cb()
+       })
+
+
+
+       tH.addStep( function onOpenPopup_() {
+            tH.waitForShow('#editTabNameDialogContent')
+            tH.click('#editTabDialogContent');
+                   tH.waitForShow('#dialogManageTabs');
+            tH.test.cb()
+            return;
+            //tH.waitForShow('.pt-layout-name-input')
+            tH.test.cb()
+            return;
+       })
+
+
+       tH.addStep( function onClickHiddenTabs() {
+            var hiddenTabs = $('#dialogManageTabs').find('.fa-eye-slash')
+            $.each(hiddenTabs, function onClick(k,tab) {
+               tH.clickNow(tab);
+            });
+              tH.click('Close', '#dialogManageTabs')
+            tH.test.cb()
+       })
+
+end
+
+def ensureAllTabsVisible()
+       tH.addStep( function selectFirstTab() {
+            var tabs = $('#tabHolder').find('li')
+            var tabNotVisible = [];
+            $.each(tabs, function onAddTab(k, tab) {
+
+                tab = $(tab)
+                var tabName = tab.text();
+
+                tabName = tabName.trim();
+                var isVisible = tab.is(':visible');
+                console.error('is tab visible?', tabName, isVisible );
+
+                if ( tabName == '+' ) {
+                    return
+                }
+
+                if ( isVisible == false ) {
+                    tabNotVisible.push(tabName)
+                }
+                //tH.wait(0.2);
+            })
+
+            if ( tabNotVisible.length > 0  ) {
+                tH.fail('there is an issue', tabNotVisible, 'expected 0 tabs');
+            }
+            tH.test.cb()
+       })
+end
+
+def ensureAllTabsHaveProperOptions()
+       tH.fx('closeallpopups');
+       //tH.fx('closeallpopups');
+
+       tH.addStep( function selectFirstTab() {
+            var tabs = $('#tabHolder').find('li')
+            var tabNotVisible = [];
+            $.each(tabs, function onAddTab(k, tab) {
+
+                tab = $(tab)
+                var tabName = tab.text();
+
+                tabName = tabName.trim();
+                var isVisible = tab.is(':visible');
+               // console.debug('is tab visible?', tabName, isVisible );
+
+                if ( tabName == '+' ) {
+                    return;
+                }
+                if ( isVisible == false ) {
+                    tabNotVisible.push(tabName)
+                    return;
+                }
+                   console.debug('is tab visible?', tabName, isVisible );
+
+                tH.click(tabName, '#tabHolder');
+                tH.log('clicking', tabName);
+                if ( tabName != 'Custom' ) {
+                    tH.waitForShow('#editTabNameDialogContent',
+                    tabName + " " +
+                    'clicking tab did not display the tab options-3')
+
+
+                }
+
+                tH.fx('ensureSelectedTabsOptions');
+            })
+
+
+            tH.test.cb()
+       })
+end
+
+def ensureSelectedTabsOptions()
+
+       tH.addStep( function selectFirstTab() {
+            var tab = $('#tabHolder').find('li.active')
+
+            if ( tab.length == 0 ) {
+                tH.fail('no tab is active')
+            }
+            var tabName = tab.text();
+                            tabName = tabName.trim();
+
+            var tabType = tab.attr('type')
+
+
+            if ( tabType == null ) {   tH.test.cb();  return; }
+
+
+
+
+            if ( tabType == 'default' ) {
+                //tH.waitForNone('.pt-layout-name-input')
+            }
+
+            if ( tabType == 'subsiteTab' ) {
+                tH.waitForShow('.pt-layout-name-input', 'subsiteTab')
+            }
+
+            if ( tabType == 'userTab' ) {
+                tH.waitForShow('.pt-layout-name-input', tabType)
+            }
+
+            if ( tabType == 'Custom' ) {   tH.test.cb(); return; }
+
+
+            tH.waitForShow('#editTabNameDialogContent',
+            tabName + " " +
+            'clicking tab did not display the tab options-4')
+
+            tH.click('#editTabNameDialogContent');
+            tH.waitForShow('#dialogTabContextMenu')
+
+
+            if ( tabType == 'default' ) {
+                tH.waitForShow('Hide',  null, '#dialogTabContextMenu')
+            }
+
+            if ( tabType == 'subsiteTab' ) {
+                tH.waitForShow('Rename',  null, '#dialogTabContextMenu')
+                tH.waitForShow('Delete',  'delete option did not appear', '#dialogTabContextMenu')
+            }
+
+            tH.test.cb();
+            return;
+       })
+end
+
+
+
+def verifyTabOptions()
+     tH.fx('closeallpopups');
+     tH.fx('hidedropdown');
+
+       tH.addStep( function testOnEachTab() {
+            var tabs = $('#tabHolder').find('li');
+            var typesList = []
+            $.each(tabs, function onAddTab(k, tab) {
+
+                tab = $(tab)
+                var tabName = tab.text();
+
+                tabName = tabName.trim();
+                //  console.error('what is tab', tab.text() );
+                var type = tab.attr('type')
+
+                if ( type == null ) {
+                                    return;
+                                }
+                if ( typesList.indexOf(type) != -1 ) {
+                                    return;
+                }
+                typesList.push(type);
+
+                tH.wait(1);
+                tH.click(tab.text(), '#tabHolder');
+                tH.waitForShow('#editTabNameDialogContent')
+                tH.click('#editTabNameDialogContent');
+                tH.waitForShow('#dialogTabContextMenu')
+
+                if ( type == 'default' ) {
+                    //delete
+                    tH.waitForShow('Hide',  null, '#dialogTabContextMenu')
+                }
+
+                if ( type == 'subsiteTab' ) {
+                    //delete
+                    tH.waitForShow('Delete',  null, '#dialogTabContextMenu')
+
+                }
+
+                if ( type == 'standardTab' ) {
+                    tH.waitForShow('Delete',  null, '#dialogTabContextMenu')
+                }
+                console.error('what it is', tabName, type)
+
+                tH.wait(1);
+
+            })
+
+            tH.test.cb()
+       })
+
+
+
+return;
+
+       tH.addStep( function onOpenPopup_() {
+            tH.waitForShow('#editTabNameDialogContent')
+            tH.click('#editTabDialogContent');
+                   tH.waitForShow('#dialogManageTabs');
+            tH.test.cb()
+            return;
+            //tH.waitForShow('.pt-layout-name-input')
+            tH.test.cb()
+            return;
+       })
+
+
+       tH.addStep( function onClickHiddenTabs() {
+            var hiddenTabs = $('#dialogManageTabs').find('.fa-eye-slash')
+            $.each(hiddenTabs, function onClick(k,tab) {
+               tH.clickNow(tab);
+            });
+              tH.click('Close', '#dialogManageTabs')
+            tH.test.cb()
+       })
+
+end
+
+
+
+def hideTab(tabIndex)
+     //tH.fx('closeallpopups');
+     //tH.fx('hidedropdown');
+
+       tH.addStep( function testOnEachTab() {
+            var tabs = $('#tabHolder').find('li');
+
+             if ( tabIndex == null) {
+                tabIndex = 0
+             }
+
+            var tabObject = $scopeSubsites.tableHelper.data.layoutTabs[tabIndex]
+
+            if ( tabObject.hidden ) {
+                 console.debug('tab is alreayd hidden')
+                 tH.test.cb();
+                return;
+            }
+
+            var tab = tabs[tabIndex];
+            tab = $(tab);
+
+            var typesList = [];
+
+            //find first standard tab
+
+            tab = $(tab)
+            var tabName = tab.text();
+
+            tabName = tabName.trim();
+            var type = tab.attr('type')
+
+            tH.wait(1);
+            tH.waitForShow(tabName, 'Show tab',
+                    '#tabHolder');
+
+            tH.click(tab.text(), '#tabHolder');
+            tH.waitForShow('#editTabNameDialogContent')
+            tH.click('#editTabNameDialogContent');
+            tH.waitForShow('#dialogTabContextMenu')
+//TODO: Fix this so it has try catch in eval block and throws error and fails test
+//asdf.g
+            var clickHide = false;
+            if ( type == 'default' ) {
+               clickHide = true
+            } else {
+                return;
+            }
+
+
+            if ( clickHide ) {
+                tH.logNow('hiding')
+                //delete
+                tH.waitForShow('Hide',
+                'default did not show hide option',
+                '#dialogTabContextMenu')
+                tH.logNow('waiting for hide to appear')
+                tH.click('Hide')
+                tH.waitForNone(tabName, 'Tab was not hidden' , '#tabHolder');
+            }
+
+
+
+            tH.test.cb()
+       })
+
+
+end
+
+def isTabIndexHidden(tabIndex)
+    var tab = $scopeSubsites.tableHelper.data.layoutTabs[tabIndex]
+    if ( tab.hidden ) {
+         console.debug('tab is alreayd hidden')
+       return;
+    }
+
+    tH.fail('tab', tab.name, 'should be hidden', tab);
+end
+
+
+def isTabIndexVisible(tabIndex)
+    var tab = $scopeSubsites.tableHelper.data.layoutTabs[tabIndex]
+    if ( tab.hidden !== true ) {
+         console.debug('tab is visible')
+       return;
+    }
+
+    tH.fail('tab', tab.name, 'should be visible', tab);
+end
+
+def ensureTabSelected(tabIndex)
+    //tH.waitForShow('')
+
+    /*
+    get all visible tabs
+    if tab ==
+    */
+    var tabs = $('#tabHolder').find('li.uib-tab:visible');
+    var tab = tabs[tabIndex];
+
+    tab = $(tab);
+    var found=tab.find('#editTabDialog').length > 0
+
+    var tabName = tab.text().trim();
+
+    if ( found ) {
+    } else {
+        tH.fail('tab not selected', 'expected tab index',
+        tabIndex, 'to be selected', tabName, 'was selected')
+    }
+
+    return;
+end
+
+def createTab(indexTab,userTab,tabName)
+
+    if ( indexTab == null  ) {
+        indexTab = 0;
+    }
+    var name = window.$scopeSubsites.tableHelper
+    .data.layoutTabs[indexTab].name
+    var expectedName = name + ' (copy)';
+
+    var tabAlreadyExists = false;
+
+     if (userTab === true || userTab === 'true') {
+         userTab = true;
+    } else {
+        userTab = false;
+        //debugger
+    }
+    if ( tabName == 'Subsite Tab 1' ) {
+       // debugger;
+    }
+
+    if ( userTab == false ) {
+       // userTab = true
+         //$('#dialogAddNewTab');
+         tH.waitForShow('#dialogAddNewTab', 'Cannot make a subsite tab b/c u are not on a subsite')
+    }
+
+    function cloneTab_QuickIFTabExists(){
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        var tabType = 'subsiteTab'
+        if ( userTab == 'true' || userTab == true ) {
+            tabType = 'userTab'
+        }
+        existingTab = existingTab.filter('[type='+tabType+']');
+        //debugger
+        if ( tabName ) { //check if proper name already exists
+            existingTab = tH.findByContent(tabName, '#tabHolder')
+            existingTab = existingTab.filter('[type='+tabType+']')
+            tH.logNow('renaming', tabName, existingTab.length);
+        }
+
+        if ( existingTab.length > 0 ) {
+            console.log('found existing copy of clone', expectedName, tabName);
+            tabAlreadyExists = true
+            expectedName = tabName; //ensure we click proper tab
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+
+        if ( tabAlreadyExists ) {
+            console.log('tabAlreadyExists', tabAlreadyExists);
+            return;
+        }
+        console.error('clone tab', indexTab,userTab,tabName)
+        if (userTab != true && userTab != 'true') {
+            tH.click('#dialogAddNewTab');
+        } else {
+            tH.click('#dialogAddNewTabToUserLayout')
+        }
+        tH.waitForShow( '#dialogCloneTabFrom', 'waiting for clonetab dialog')
+
+        window.$scopeSubsites.layoutToCopy = [name]
+        window.$scopeSubsites.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.click('OK', '#dialogCloneTabFrom');
+
+
+    }
+
+    tH.logNow('running create tab?',userTab, tabName)
+
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    tH.addStep(function createNewTab_ifNeeded() {
+
+        tH.test.cb();
+    })
+
+    if ( tabName ) {
+        tH.addStep(function onXYX() {
+                if ( tabAlreadyExists ) {
+                    console.log('tabAlreadyExists', tabAlreadyExists);
+                    tH.test.cb()
+                    return;
+                }
+                tH.wait(1)
+                tH.click(expectedName, '#tabHolder')
+                tH.wait(1)
+                tH.waitForShow('#editTabNameDialogContent')
+                tH.click('#editTabNameDialogContent')
+                tH.wait(0.5)
+                tH.click('a|||Rename', '#dialogTabContextMenuContent')
+                tH.waitForShow('#dialogRenameTab')
+
+                tH.set('#txtRenameTabName',tabName, true)
+                tH.click('OK', '#dialogRenameTab')
+                tH.test.cb()
+
+        } )
+    }
+
+
+    if ( tabName ) {
+        tH.addStep(function verifyTabIsSelected() {
+                tH.click(expectedName, '#tabHolder')
+                tH.wait(1)
+                tH.waitForShow('#editTabNameDialogContent')
+                // tH.waitForShow('.pt-layout-name-input', 'verify is select')
+                tH.test.cb()
+        } )
+    }
+
+
+
+end
+
+
+def ensureTab(tabName,userTabType,present,refreshSubsite)
+    tH.log('ensureTab.input:', tabName)
+
+    if ( refreshSubsite != false ) {
+        tH.addStep(function refreshLayouts2(){
+            //tH.log('what')
+            //console.log('s')
+            tH.fx('refreshSubsites')
+            tH.test.cb()
+        })
+    }
+    tH.addStep(function refreshTabs(){
+        window.$scopeSubsites.loadPageLayout_FromSubsite();
+        tH.test.cb()
+    })
+
+
+    function checkIfTabExists(){
+        tH.logNow('@checking for tab', tabName)
+        var existingTabs = tH.findByContent(tabName, '#tabHolder')
+        var tabType = 'subsiteTab'
+        if ( userTabType == 'true' || userTabType == true ) {
+            tabType = 'userTab'
+        }
+
+        var existingTab = existingTabs.filter('[type='+tabType+']');
+        var tabFound = existingTab.length > 0
+        if ( present == false ) {
+            if ( tabFound == false ) {
+                console.log('did not find tab, ok');
+            } else {
+                tH.fail('Did not want to see tab', tabName)
+            }
+            return;
+        }
+        tH.logNow('result of @checking for tab', tabName,
+        existingTabs.length, existingTab.length)
+        if ( tabFound ) {
+            console.log('found eexisting copy of clone');
+        } else {
+            tH.fail('Did not find tab', tabName)
+        }
+       // tH.logNow('creating the new tab', expectedName )
+    }
+
+    tH.addSync(checkIfTabExists)
+
+end
+
+def ensureTabGone(tabName,userTabType, refreshSubsite)
+    tH.fx('ensureTab', tabName, userTabType, false, refreshSubsite);
+end
+
+
+
+def createSubsite(subsiteName, addUsernames, quick, onlyIfNeeded)
+    tH.fx('showdropdown')
+
+    if ( onlyIfNeeded ) {
+        tH.addStep(function skipIfNotNeed() {
+             var subsiteLink = tH.findByContent(subsiteName, '#dialogNavBar_SubsiteMenu')
+             if ( subsiteLink.length > 0 ) {
+               tH.logNow('ss already exists');
+                tH.fx('hidedropdown');
+             }
+             else {
+                tH.fx('createSubsite',subsiteName, addUsernames, quick);
+             }
+            tH.test.cb()
+        });
+        return;
+    }
+
+
+    #create new subsite
+    tH.click('Create New Subsite')
+    tH.waitForShow('#dialogManageSubsite')
+    tH.waitForShow('Create Subsite', 'Ensure title text on dialog', '#dialogManageSubsite')
+    tH.waitForShow('A subsite name is required',
+        'Ensure empty subsite name warning is display', '#dialogManageSubsite')
+    var typeText = true;
+    if ( quick != true ) {
+        function getNameTxt() {
+            return $('#dialogManageSubsite ')
+                .find('.txtManageSubsiteName')
+        }
+        tH.set(getNameTxt,'This name is too long to fit', true)
+
+       //tH.set('.txtManageSubsiteName','This name is too long to fit', true)
+       tH.waitForHide('A subsite name is required',
+       'Ensure empty subsite name warning is removed', '#dialogManageSubsite')
+       tH.waitForShow('Max length is 16 characters',
+       'Ensure "long name" warning is display', '#dialogManageSubsite')
+
+    } else {
+        typeText = false;
+    }
+
+
+    tH.set('.txtManageSubsiteName',subsiteName, typeText)
+    #set [value="otherPeople"]; selected
+
+    tH.addStep(function onSelectProps() {
+        var radioOption =
+        $('[value="otherPeople"].ng-valid')
+        radioOption.prop('checked', true);
+        radioOption[0].click();
+        tH.test.cb()
+    });
+    tH.log('set text')
+    var usernamesDefault = ['Ji Hye', 'Gergo', 'Fermin'];
+
+    usernamesToAdd = usernamesDefault;
+
+    if ( addUsernames && addUsernames != 'null') {
+        usernamesToAdd = addUsernames;
+        usernamesToAdd =addUsernames.split(',')
+       // debugger
+        console.error('to add', usernamesToAdd);
+    }
+
+    $.each(usernamesToAdd, function onCreateEachUser(k,userQuery) {
+        tH.set('.txtSearchName2', userQuery);
+        tH.pressEnter( '.txtSearchName2');
+        /*
+        tH.set('.txtSearchName2', 'Ji hye')
+        tH.pressEnter( '.txtSearchName2')
+        tH.set('.txtSearchName2', 'Gergo')
+        tH.pressEnter('.txtSearchName2');
+        tH.set('.txtSearchName2', 'Fermin')
+        tH.pressEnter('.txtSearchName2');
+        tH.waitForShow('ferminr')
+        */
+    })
+
+    tH.click('OK', '#dialogManageSubsite')
+    tH.waitForShow(subsiteName)
+
+    tH.fx('closeallpopups');
+end
+
+def removeSubsite(subsiteName)
+    tH.fx('showdropdown' )
+
+    tH.addStep(function on() {
+        var existingSubsiteLink = y
+        = testHelper.findByContent(subsiteName,
+        $('#holderMySubsiteList') );
+        tH.data.existingSubsiteLink = existingSubsiteLink;
+        tH.test.cb()
+    } )
+
+    tH.addStep(function on() {
+        if ( tH.data.existingSubsiteLink.length > 0 ) {
+            tH.log('deleting subsite');
+            tH.fx('removeSubsite2', subsiteName)
+        } else {
+            tH.log('not deleting subsite');
+        }
+        tH.test.cb()
+    } )
+    tH.fx('refreshSubsites')
+end
+
+def removeSubsite2(subsiteName)
+tH.log('removeSubsite2', subsiteName)
+    tH.fx('showdropdown' )
+    tH.click('Manage Subsites...')
+    tH.waitForShow('#dialogManageSubsites')
+    tH.addStep(function findThing() {
+        var y = testHelper.findByContent(subsiteName, $('#dialogManageSubsites') )
+        var tr = y.parents('tr')
+        var trashIcon = tr.find('.fa-trash')
+        console.clear();
+        console.log('trash',y,tr, trashIcon);
+        trashIcon.click()
+        tH.test.cb();
+    })
+
+    tH.waitForShow('#confirmDialog')
+    tH.click('OK', '#confirmDialog')
+
+    tH.waitForShow('#dialogManageSubsites')
+    tH.wait(0.5)
+    tH.click('Close', '#dialogManageSubsites')
+
+
+end
+
+
+
+
+def viewSubsite(subsiteName)
+    var container = '#holderMySubscribedSubsiteList'
+    tH.fx('showdropdown' )
+    tH.waitForShow(subsiteName, 'wait for the subsite in the list',
+    container)
+    tH.click(subsiteName, container);
+    tH.wait(2)
+end
+
+def goToSubsite(subsiteName)
+
+    var container = '#holderMySubsiteList'
+    tH.fx('showdropdown' )
+    tH.waitForShow(subsiteName, 'wait for the subsite in the list',
+    container)
+    //waitForShow EU Trading2; wait for subsite in list; container)
+    tH.click(subsiteName, container);
+    tH.wait(2)
+end
+
+def editSubsite(subsiteName)
+    var container = '#holderMySubsiteList'
+    tH.fx('showdropdown' )
+    tH.waitForShow(subsiteName, 'wait for the subsite in the list',
+    container)
+    //waitForShow EU Trading2; wait for subsite in list; container)
+    tH.click(subsiteName, container);
+    tH.wait(2)
+end
+
+def gotopage
+    tH.setDefaultAddNext()
+    var pageName = arg2
+    var pageMenuLinkText = arg1
+    tH.data.maxTimesNext = 50;
+    tH.click(pageMenuLinkText , 'x42-nav-sidebar');
+    tH.nextTimeoutTime(60)
+    tH.waitForShow(pageName, 'did not switch to '+pageName+' page', '.x42-nav-body-container' )
+    tH.nextTimeoutTime(60)
+    tH.waitForShow('pt-table', 'pt table did not load')
+    tH.log('Navigated to', pageName);
+    tH.resetDefaultAddNext()
+end
+#fx gotopage; Revenue; Revenue
+
+#log changed to revenue page
+#wait 2
+
+#fx gotopage; External Revenue; External Revenue
+
+#fx verifySubsiteTab; 0
+
+
+#endtest
\ No newline at end of file
Index: mp/testingFramework2/js.cookie.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/js.cookie.js	(revision )
+++ mp/testingFramework2/js.cookie.js	(revision )
@@ -0,0 +1,145 @@
+/*!
+ * JavaScript Cookie v2.1.0
+ * https://github.com/js-cookie/js-cookie
+ *
+ * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
+ * Released under the MIT license
+ */
+(function (factory) {
+    if (typeof define === 'function' && define.amd) {
+        define(factory);
+    } else if (typeof exports === 'object') {
+        module.exports = factory();
+    } else {
+        var _OldCookies = window.Cookies;
+        var api = window.Cookies = factory();
+        api.noConflict = function () {
+            window.Cookies = _OldCookies;
+            return api;
+        };
+    }
+}(function () {
+    function extend () {
+        var i = 0;
+        var result = {};
+        for (; i < arguments.length; i++) {
+            var attributes = arguments[ i ];
+            for (var key in attributes) {
+                result[key] = attributes[key];
+            }
+        }
+        return result;
+    }
+
+    function init (converter) {
+        function api (key, value, attributes) {
+            var result;
+
+            // Write
+
+            if (arguments.length > 1) {
+                attributes = extend({
+                    path: '/'
+                }, api.defaults, attributes);
+
+                if (typeof attributes.expires === 'number') {
+                    var expires = new Date();
+                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
+                    attributes.expires = expires;
+                }
+
+                try {
+                    result = JSON.stringify(value);
+                    if (/^[\{\[]/.test(result)) {
+                        value = result;
+                    }
+                } catch (e) {}
+
+                if (!converter.write) {
+                    value = encodeURIComponent(String(value))
+                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
+                } else {
+                    value = converter.write(value, key);
+                }
+
+                key = encodeURIComponent(String(key));
+                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
+                key = key.replace(/[\(\)]/g, escape);
+
+                return (document.cookie = [
+                    key, '=', value,
+                    attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
+                    attributes.path    && '; path=' + attributes.path,
+                    attributes.domain  && '; domain=' + attributes.domain,
+                    attributes.secure ? '; secure' : ''
+                ].join(''));
+            }
+
+            // Read
+
+            if (!key) {
+                result = {};
+            }
+
+            // To prevent the for loop in the first place assign an empty array
+            // in case there are no cookies at all. Also prevents odd result when
+            // calling "get()"
+            var cookies = document.cookie ? document.cookie.split('; ') : [];
+            var rdecode = /(%[0-9A-Z]{2})+/g;
+            var i = 0;
+
+            for (; i < cookies.length; i++) {
+                var parts = cookies[i].split('=');
+                var name = parts[0].replace(rdecode, decodeURIComponent);
+                var cookie = parts.slice(1).join('=');
+
+                if (cookie.charAt(0) === '"') {
+                    cookie = cookie.slice(1, -1);
+                }
+
+                try {
+                    cookie = converter.read ?
+                        converter.read(cookie, name) : converter(cookie, name) ||
+                    cookie.replace(rdecode, decodeURIComponent);
+
+                    if (this.json) {
+                        try {
+                            cookie = JSON.parse(cookie);
+                        } catch (e) {}
+                    }
+
+                    if (key === name) {
+                        result = cookie;
+                        break;
+                    }
+
+                    if (!key) {
+                        result[name] = cookie;
+                    }
+                } catch (e) {}
+            }
+
+            return result;
+        }
+
+        api.get = api.set = api;
+        api.getJSON = function () {
+            return api.apply({
+                json: true
+            }, [].slice.call(arguments));
+        };
+        api.defaults = {};
+
+        api.remove = function (key, attributes) {
+            api(key, '', extend(attributes, {
+                expires: -1
+            }));
+        };
+
+        api.withConverter = init;
+
+        return api;
+    }
+
+    return init(function () {});
+}));
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/canCOUserCreateSubsites.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/canCOUserCreateSubsites.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/canCOUserCreateSubsites.js.txt	(revision )
@@ -0,0 +1,7 @@
+#test for basic csv
+log this test will ensure the user can see the create new subsite option
+
+fx closeallpopups();
+fx showdropdown();
+status User can create a new subsite
+endtest
\ No newline at end of file
Index: mp/testingFramework2/test2.verify.reloading.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/test2.verify.reloading.html	(revision )
+++ mp/testingFramework2/test2.verify.reloading.html	(revision )
@@ -0,0 +1,328 @@
+<!DOCTYPE html>
+<html>
+<head>
+    <title>Test Diff Location</title>
+
+    <!-- Prove can work in diff dir -->
+    <script>
+        /* var evalTxt = '34,fs.dfsjfsdfsdkksllll;;;;++++(){'
+         try {
+         eval(evalTxt);
+         } catch ( e ) {
+         console.error('error running eval', evalName)
+         console.error(e)
+         console.error(e.stack)
+         tH.logNow('error in fx', evalName)
+         tH.logNow(e)
+         tH.logNow(e.stack)
+         tH.fail('see above')
+         }*/
+
+        setTimeout(function hideDiv() {
+            if (window.$ == null) {
+                console.log('wait for jquery')
+                setTimeout(hideDiv, 1000);
+                return;
+            }
+            $('#showDiv').hide();
+
+            var nums = [];
+            for (var i = 0; i < 10; i++) {
+                nums.push(i)
+            }
+            //console.log(nums, nums)
+            var c = $('#divContainerCounter')
+            var c2 = $('#divContainerCounter2')
+            c2.css('opacity', '0')
+            $.each(nums, function onADdBtn(k, num) {
+                var btn = $('<button/>')
+                btn.text(num + 1)
+                btn.click(function onClickX() {
+                    var count = num + 1
+                    // console.log('clicked', count)
+                    function click2(sz) {
+                        console.log('clicked', sz, btn.text())
+                    }
+
+                    click2(count)
+                })
+                if (k % 2 == 0) {
+                    c2.append(btn.clone())
+                } else {
+                    var span = $('<div/>');
+                    span.css('width', '23' + 'px');//uiUtils.make('span')
+                    span.css('display', 'inline-block')
+                    c2.append(span)
+                }
+                c.append(btn)
+
+
+            })
+
+        }, 500)
+        window.onRedButton = function onRedButton() {
+            console.log('ddd')
+        }
+        window.onShowDiv = function onShowDiv() {
+            console.log('onShowDiv')
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').show();
+            }, 500)
+
+            setTimeout(function hideDiv() {
+                $('#showDiv').hide();
+            }, 5000)
+        }
+        // window.preamble = '/test3/';
+        window.testCallFromEval = function () {
+            console.log('boom')
+        }
+    </script>
+    <script>
+        // window.preamble = '../test7/'
+    </script>
+    <script src="../testingFramework/testLL.js"></script>
+
+    <script>
+        function lazyLoadAndRunTest() {
+            loadTestingFramework(function onReady() {
+                testStackingDemo2B(true);
+            })
+        }
+        function autoloadTestFramework() {
+            window.location += '?loadTestFramework=true'
+        }
+    </script>
+
+    <script>
+        setTimeout(function auto_startTestingFramework() {
+            console.info('auto - loading testing framework')
+            loadTestingFramework(fxDoneLoading)
+            function fxDoneLoading() {
+                console.log('---')
+                var cfg = {};
+                cfg.url = 'partials/menuTest.html';
+                cfg.id = 'divTestMenu'
+                uiUtils.utils.loadPage(cfg)
+            }
+        }, 500)
+    </script>
+
+    <style>
+        body {
+            font-weight: 400;
+            background-color: #CBD9E6;
+            font-family: 'Arial';
+        }
+    </style>
+
+    <!-- one of my script conflicts with ths main script ... plz fix -->
+    <script src="http://127.0.0.1:3000/socket.io-1.2.0.js"></script>
+    <script>
+        function startReloading() {
+            if (window.$ == null) {
+                console.info('startReloading', 'wait for jquery')
+                setTimeout(startReloading, 1000);
+
+
+                return;
+            }
+
+
+            var scriptsForReloading = [
+                'http://127.0.0.1:3000/socket.io-1.2.0.js',
+                'http://localhost:3000/reloader.js'
+            ]
+
+            function loadReloadingFramework_ForTesting(fxDone, force) {
+
+                loadScript2(scriptsForReloading.concat(),
+                        onFinishedLoadingTestFramework)
+
+                function onFinishedLoadingTestFramework() {
+                    console.info('finished loading reloading framework',
+                            scriptsForReloading.length);
+                    // window.tests.loaded = true;
+                    if (fxDone) {
+                        fxDone()
+                    }
+                }
+            }
+
+            window.testDefs = 'csvScripts/defs.js.txt'
+
+            loadReloadingFramework_ForTesting(function onSetupReloadListeners() {
+
+
+                reloader.reloadWhenFx('/csvScripts/', function onTestOneJs(a, b, c) {
+                    b = a.split('/csvScripts/')[1]
+                    b = window.preamble + 'csvScripts/' + b;
+                    console.log('rerun last test', b, b, c)
+                    tH.runTest('testCSV', b)
+                    //debugger
+                    return true
+                })
+
+
+                reloader.reloadWhenFx('testingFramework/', function onTestOneJs(a, b, c) {
+
+
+                    setTimeout(function reRunTest() {
+                        tH.rerunLastTest()
+                    }, 800)
+
+                    return;
+                    loadTestFrameworkFiles(function onFinishedRerunTest() {
+                        console.log('rerun last test')
+                        tH.rerunLastTest()
+                    }, true)
+                })
+
+
+                reloader.reloadWhenFx('reloading.html', function onTestOneJs(a, b, c) {
+                    location.reload();
+                })
+                /* reloader.reloadWhenFx('ui_utils.js', function onTestOneJs(a, b, c) {
+                 location.reload();
+                 })*/
+            })
+        }
+        startReloading()
+    </script>
+
+    <!--
+
+        <script src="http://127.0.0.1:3000/socket.io-1.2.0.js" ></script>
+        <script src="http://localhost:3000/reloader.js" ></script>
+    -->
+
+</head>
+<body>
+<button>Test</button>
+<br/>
+<button onclick="lazyLoadAndRunTest()">LL Test - Run Test</button>
+<br/>
+<button onclick="tH.clickTest2()">Run Test 2</button>
+<br/>
+<textarea id="txtArea"></textarea>
+<button id="btnTest">Test</button>
+<!--
+<div style="display: none; position: fixed; bottom: 10px; right: 10px" id="testLogPanel" >
+    asdf
+</div>
+-->
+
+
+<div>
+    <button class="redTest"
+            onclick="onRedButton()">Go
+    </button>
+
+    <button class="redTest2"
+            onclick="onShowDiv()">Press for div
+    </button>
+    <div id="showDiv" style="color:white;">
+        this the show div
+    </div>
+</div>
+
+<div id="divContainerCounter2">
+</div>
+<div id="divContainerCounter">
+    <span>skipTo8</span>
+    <br/>
+</div>
+<style>
+    .layout-horizontal {
+        display: flex;
+        flex-direction: row;
+        flex-wrap: nowrap;
+        justify-content: center;
+        align-content: stretch;
+        align-items: stretch;
+    }
+
+    .fb-align-left {
+        justify-content: flex-start !important;
+    }
+
+    .layout-horizontal-left {
+        justify-content: flex-start !important;
+    }
+</style>
+
+
+<div class="x42-nav-body-container">
+    <div>Revenue</div>
+    <div>External Revenue</div>
+</div>
+<pt-table>
+    table
+</pt-table>
+
+<br/>
+
+<div id="divContainerTest"
+     style="max-width:700px; overflow-y: auto;"
+     class="hide layout-horizontal layout-horizontal-left">
+    <div>span1</div>
+    <div>span1</div>
+    <div>span1</div>
+</div>
+
+
+<style>
+    .hide {
+        display: none;
+    }
+    .tdCell {
+        border: solid 1px black;
+    }
+</style>
+
+
+<div id="tabHolder">
+
+</div>
+
+<div id="divTestMenu">
+
+</div>
+
+
+<script>
+    var t = treeNode =  {}
+    window.treeNode = t;
+    t.handleClick = function handleClick(input) {
+        console.warn('testing...', input)
+
+        uiUtils.clear('#tabHolder')
+        uiUtils.addTo('#tabHolder')
+
+
+        var x = 1;
+
+        function onAddTab(name) {
+            //li.uib-tab
+            uiUtils.make({
+                tag:'li',
+                addClass:'uib-tab',
+                text: input+'-tab'+x
+                // addTo:true
+            })
+
+            x++;
+
+        }
+
+        onAddTab(input)
+        onAddTab(input)
+        onAddTab(input)
+    }
+
+</script>
+
+
+</body>
+</html>
\ No newline at end of file
Index: mp/testingFramework2/partials/menuTest.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/partials/menuTest.html	(revision )
+++ mp/testingFramework2/partials/menuTest.html	(revision )
@@ -0,0 +1,646 @@
+<!DOCTYPE html>
+<html lang="en">
+<head>
+    <meta charset="UTF-8">
+    <title>Title</title>
+</head>
+<body>
+
+
+<style>
+    .uib-tab {
+        background-color: #f2f2f2;
+        padding: 10px;
+        border-top-left-radius: 10px;
+        border-top-right-radius: 10px;
+        list-style: none;
+        display: inline-block;
+    }
+</style>
+
+<x42-nav-sidebar-menu items="site.sidebarItems" class="ng-scope ng-isolate-scope x42-nav-sidebar-menu">
+    <x42-tree root="vm.displayMenu" node-label="node.label" node-children="node.children" node-icon="node.icon"
+              node-class="node.fullClass" node-title="node.title" node-expanded="node.expanded"
+              node-click="node.onclick(node, nodeLevel, $event)" anchor.ng-disabled="treeNode.node.disabled"
+              class="ng-isolate-scope tree x42-tree">
+        <div class="alert alert-danger ng-binding ng-hide" ng-show="treeCtrl.errorMessage"></div>
+        <x42-tree-node node="treeCtrl.node" level="1" anchor.ng-disabled="treeNode.node.disabled"
+                       class="ng-isolate-scope x42-tree-node">
+            <div class="tree x42-nav-sidebar-item state-type-undefined x42-nav-sidebar-item-root-item is-a-link parent expanded"
+                 ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href="" title=""
+                                                  ng-click="treeNode.handleClick($event)" ng-switch="treeNode.json"
+                                                  ng-disabled="treeNode.node.disabled"><i
+                    class="tree-icon tree-label-content" ng-class="treeNode.icon"></i> <!-- ngSwitchWhen: true -->
+                <!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                        class="tree-label tree-label-content ng-binding ng-scope" ng-switch-default=""></span>
+                <!-- end ngSwitchWhen: --></a>
+                <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                    <!-- ngRepeat: child in treeNode.children track by $index -->
+                    <x42-tree-node node="child" level="2" ng-repeat="child in treeNode.children track by $index"
+                                   anchor.ng-disabled="treeNode.node.disabled"
+                                   class="ng-scope ng-isolate-scope x42-tree-node">
+                        <div class="tree x42-nav-sidebar-item state-type-category not-a-link parent expanded"
+                             ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href=""
+                                                              title="" ng-click="treeNode.handleClick($event)"
+                                                              ng-switch="treeNode.json"
+                                                              ng-disabled="treeNode.node.disabled"><i
+                                class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                            <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                    class="tree-label tree-label-content ng-binding ng-scope" ng-switch-default="">Returns</span>
+                            <!-- end ngSwitchWhen: --></a>
+                            <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                                <!-- ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/RevenuePT" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          onclick="treeNode.handleClick('Revenue')"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/RevenuePT"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Revenue</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/externalRevenuePT" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          onclick="treeNode.handleClick('externalRevenue')"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/externalRevenuePT"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">External Revenue</span><!-- end ngSwitchWhen: -->
+                                    </a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/RevenueCharts" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          onclick="treeNode.handleClick('RevenueCharts')"
+
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/RevenueCharts"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Revenue Charts</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed is-current"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/PnLTrends" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          onclick="treeNode.handleClick('PnLTrends')"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/PnLTrends"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Revenue Trends</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+                        </div>
+                    </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                    <x42-tree-node node="child" level="2" ng-repeat="child in treeNode.children track by $index"
+                                   anchor.ng-disabled="treeNode.node.disabled"
+                                   class="ng-scope ng-isolate-scope x42-tree-node">
+                        <div class="tree x42-nav-sidebar-item state-type-category not-a-link parent expanded"
+                             ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href=""
+                                                              title="" ng-click="treeNode.handleClick($event)"
+                                                              ng-switch="treeNode.json"
+                                                              ng-disabled="treeNode.node.disabled"><i
+                                class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                            <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                    class="tree-label tree-label-content ng-binding ng-scope"
+                                    ng-switch-default="">PBT</span><!-- end ngSwitchWhen: --></a>
+                            <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                                <!-- ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/PBTSummary" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/PBTSummary"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="" title="">PBT Summary<span
+                                                class="navBarIcon">&nbsp;</span><i style="color:#C90000;"
+                                                                                   class="fa fa-exclamation-circle navBarIcon"
+                                                                                   aria-hidden="true"
+                                                                                   title="Currently only visible for COOs / developers"></i></span>
+                                        <!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+                        </div>
+                    </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                    <x42-tree-node node="child" level="2" ng-repeat="child in treeNode.children track by $index"
+                                   anchor.ng-disabled="treeNode.node.disabled"
+                                   class="ng-scope ng-isolate-scope x42-tree-node">
+                        <div class="tree x42-nav-sidebar-item state-type-category not-a-link parent expanded"
+                             ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href=""
+                                                              title="" ng-click="treeNode.handleClick($event)"
+                                                              ng-switch="treeNode.json"
+                                                              ng-disabled="treeNode.node.disabled"><i
+                                class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                            <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                    class="tree-label tree-label-content ng-binding ng-scope" ng-switch-default="">Expenses</span>
+                            <!-- end ngSwitchWhen: --></a>
+                            <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                                <!-- ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/Expenses" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/Expenses"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">YoY Comparison</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/ExpensesTimeView" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/ExpensesTimeView"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Monthly View</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+                        </div>
+                    </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                    <x42-tree-node node="child" level="2" ng-repeat="child in treeNode.children track by $index"
+                                   anchor.ng-disabled="treeNode.node.disabled"
+                                   class="ng-scope ng-isolate-scope x42-tree-node">
+                        <div class="tree x42-nav-sidebar-item state-type-category not-a-link parent expanded"
+                             ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href=""
+                                                              title="" ng-click="treeNode.handleClick($event)"
+                                                              ng-switch="treeNode.json"
+                                                              ng-disabled="treeNode.node.disabled"><i
+                                class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                            <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                    class="tree-label tree-label-content ng-binding ng-scope"
+                                    ng-switch-default="">Risk</span><!-- end ngSwitchWhen: --></a>
+                            <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                                <!-- ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/RiskTrends" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/RiskTrends"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Risk Trends</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/EquityHedges" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/EquityHedges"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Equity Hedges</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+                        </div>
+                    </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                    <x42-tree-node node="child" level="2" ng-repeat="child in treeNode.children track by $index"
+                                   anchor.ng-disabled="treeNode.node.disabled"
+                                   class="ng-scope ng-isolate-scope x42-tree-node">
+                        <div class="tree x42-nav-sidebar-item state-type-category not-a-link parent expanded"
+                             ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href=""
+                                                              title="" ng-click="treeNode.handleClick($event)"
+                                                              ng-switch="treeNode.json"
+                                                              ng-disabled="treeNode.node.disabled"><i
+                                class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                            <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                    class="tree-label tree-label-content ng-binding ng-scope"
+                                    ng-switch-default="">EV</span><!-- end ngSwitchWhen: --></a>
+                            <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                                <!-- ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/ev_monthlyViewByTrading" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/ev_monthlyViewByTrading"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Monthly View by Trading</span>
+                                        <!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/eV_exportImportView" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/eV_exportImportView"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Export Import View</span><!-- end ngSwitchWhen: -->
+                                    </a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/ev_monthlyBySales" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/ev_monthlyBySales"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Monthly View By Sales</span>
+                                        <!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/ev_monthlyByClient" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/ev_monthlyByClient"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Monthly View By Client</span>
+                                        <!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+                        </div>
+                    </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                    <x42-tree-node node="child" level="2" ng-repeat="child in treeNode.children track by $index"
+                                   anchor.ng-disabled="treeNode.node.disabled"
+                                   class="ng-scope ng-isolate-scope x42-tree-node">
+                        <div class="tree x42-nav-sidebar-item state-type-category not-a-link parent expanded"
+                             ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href=""
+                                                              title="" ng-click="treeNode.handleClick($event)"
+                                                              ng-switch="treeNode.json"
+                                                              ng-disabled="treeNode.node.disabled"><i
+                                class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                            <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                    class="tree-label tree-label-content ng-binding ng-scope" ng-switch-default="">Capital</span>
+                            <!-- end ngSwitchWhen: --></a>
+                            <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                                <!-- ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/summaryStressLosses" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/summaryStressLosses"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Stress Loss</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/B3SLR" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/B3SLR"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">B3/SLR</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/CapitalTrends" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/CapitalTrends"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Capital Trends</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/Capital" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/Capital"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Capital</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+                        </div>
+                    </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                    <x42-tree-node node="child" level="2" ng-repeat="child in treeNode.children track by $index"
+                                   anchor.ng-disabled="treeNode.node.disabled"
+                                   class="ng-scope ng-isolate-scope x42-tree-node">
+                        <div class="tree x42-nav-sidebar-item state-type-category not-a-link parent expanded"
+                             ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href=""
+                                                              title="" ng-click="treeNode.handleClick($event)"
+                                                              ng-switch="treeNode.json"
+                                                              ng-disabled="treeNode.node.disabled"><i
+                                class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                            <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                    class="tree-label tree-label-content ng-binding ng-scope" ng-switch-default="">Staffing</span>
+                            <!-- end ngSwitchWhen: --></a>
+                            <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                                <!-- ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/headCount" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/headCount"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Headcount</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/hcYtdChanges" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/hcYtdChanges"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">YTD Changes</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+                        </div>
+                    </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                    <x42-tree-node node="child" level="2" ng-repeat="child in treeNode.children track by $index"
+                                   anchor.ng-disabled="treeNode.node.disabled"
+                                   class="ng-scope ng-isolate-scope x42-tree-node">
+                        <div class="tree x42-nav-sidebar-item state-type-category not-a-link parent expanded"
+                             ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href=""
+                                                              title="" ng-click="treeNode.handleClick($event)"
+                                                              ng-switch="treeNode.json"
+                                                              ng-disabled="treeNode.node.disabled"><i
+                                class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                            <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                    class="tree-label tree-label-content ng-binding ng-scope" ng-switch-default="">Market</span>
+                            <!-- end ngSwitchWhen: --></a>
+                            <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                                <!-- ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/MarketShare" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/MarketShare"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Market Share</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+                        </div>
+                    </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                    <x42-tree-node node="child" level="2" ng-repeat="child in treeNode.children track by $index"
+                                   anchor.ng-disabled="treeNode.node.disabled"
+                                   class="ng-scope ng-isolate-scope x42-tree-node">
+                        <div class="tree x42-nav-sidebar-item state-type-category not-a-link parent expanded"
+                             ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container" ng-href=""
+                                                              title="" ng-click="treeNode.handleClick($event)"
+                                                              ng-switch="treeNode.json"
+                                                              ng-disabled="treeNode.node.disabled"><i
+                                class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                            <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                    class="tree-label tree-label-content ng-binding ng-scope"
+                                    ng-switch-default="">Admin</span><!-- end ngSwitchWhen: --></a>
+                            <div class="tree-children" ng-show="treeNode.isNodeOpen()">
+                                <!-- ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/usageStatistics" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/usageStatistics"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon"></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Usage statistics</span><!-- end ngSwitchWhen: -->
+                                    </a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index -->
+                                <x42-tree-node node="child" level="3"
+                                               ng-repeat="child in treeNode.children track by $index"
+                                               anchor.ng-disabled="treeNode.node.disabled"
+                                               class="ng-scope ng-isolate-scope x42-tree-node">
+                                    <div class="tree x42-nav-sidebar-item state-type-internal is-a-link leaf collapsed"
+                                         ng-class="treeNode.className"><a class="tree-label-anchor tree-label-container"
+                                                                          ng-href="#/notifications" title=""
+                                                                          ng-click="treeNode.handleClick($event)"
+                                                                          ng-switch="treeNode.json"
+                                                                          ng-disabled="treeNode.node.disabled"
+                                                                          href="#/notifications"><i
+                                            class="tree-icon tree-label-content" ng-class="treeNode.icon" title=""></i>
+                                        <!-- ngSwitchWhen: true --><!-- ngSwitchWhen: true --><!-- ngSwitchDefault:  --><span
+                                                class="tree-label tree-label-content ng-binding ng-scope"
+                                                ng-switch-default="">Notifications</span><!-- end ngSwitchWhen: --></a>
+                                        <div class="tree-children ng-hide" ng-show="treeNode.isNodeOpen()">
+                                            <!-- ngRepeat: child in treeNode.children track by $index --></div>
+                                    </div>
+                                </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+                        </div>
+                    </x42-tree-node><!-- end ngRepeat: child in treeNode.children track by $index --></div>
+            </div>
+        </x42-tree-node>
+    </x42-tree>
+</x42-nav-sidebar-menu>
+
+
+<script>
+   /* var t = treeNode =  {}
+    window.treeNode = t
+    t.handleClick = function handleClick(input) {
+        console.warn('testing...', input)
+        uiUtils.addDivsWithContent(
+                {
+                    toDiv:'#tabHolder',
+                    ui:function createUI(x) {
+                        uiUtils.makeTag('span')
+                        uiUtils.addClass('uib')
+                        uiUtils.make({
+                            tag:'span',
+                            addClass:'uib',
+                            addTo:true
+                        })
+                    }
+                }
+        )
+    }
+*/
+</script>
+</body>
+</html>
\ No newline at end of file
Index: mp/testingFramework2/dialogTransport.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/dialogTransport.js	(revision )
+++ mp/testingFramework2/dialogTransport.js	(revision )
@@ -0,0 +1,64 @@
+/**
+ */
+function startupDialog(document) {
+    //'use strict';
+    var LightTableFilter = (function(Arr) {
+        var _input;
+        function _onInputEvent(e) {
+            _input = e.target;
+            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
+            Arr.forEach.call(tables, function(table) {
+                Arr.forEach.call(table.tBodies, function(tbody) {
+                    Arr.forEach.call(tbody.rows, _filter);
+                });
+            });
+        }
+        function _filter(row) {
+            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
+            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
+        }
+        return {
+            init: function() {
+                var inputs = document.getElementsByClassName('light-table-filter');
+                Arr.forEach.call(inputs, function(input) {
+                    input.oninput = _onInputEvent;
+                });
+            }
+        };
+    })(Array.prototype);
+    if (document.readyState === 'complete') {
+        LightTableFilter.init();
+    } else {
+        document.addEventListener('readystatechange', function() {
+            if (document.readyState === 'complete') {
+                LightTableFilter.init();
+            }
+        });
+    }
+
+}
+
+window.dialogTransport = {}
+
+window.dialogTransport.init = function init() {
+    var divId = '#testFrameworkTransport';
+    if ( uiUtils.ifFound(divId) ) { return; }
+    uiUtils.panel.br(divId);
+
+    var cfg = {};
+    cfg.id = divId;
+    cfg.url =  window.preamble + '/' + 'dialogTransport.html';
+
+    uiUtils.utils.loadPage(cfg)
+    
+    cfg.fxDone = function asdf() {
+        startupDialog(document)
+    }
+};
+
+if ( uiUtils.inUrl('dialogTransport=true') ) {
+    window.dialogTransport.init();
+}
+
+
+//debugger;
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/defs.js.txt.bak.b4.clean
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/defs.js.txt.bak.b4.clean	(revision )
+++ mp/testingFramework2/csvScripts/defs.js.txt.bak.b4.clean	(revision )
@@ -0,0 +1,1082 @@
+#test for basic csv
+#load this iat runtime from the main page
+#can defs be shared after test has run? i hope so
+#when change defs, rerun last test ...? , so add to index as well
+log creating definitions
+
+
+
+
+
+
+def y
+    window.gsdf.gsdf = 'j'
+end
+#fx y
+
+def - alert
+    alert('in alert')
+endeval
+
+
+def - closeallpopups 
+    window.$scopeSubsites.popups.hideAllDialogs()
+    //window.$subsitesScope.popups.hideAllDialogs()
+end
+
+def - showdropdown
+    tH.wait(0.5);
+    var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+    //x42NavBarNav_DropDown.addClass('open')
+    x42NavBarNav_DropDown.mouseenter();
+    tH.waitForShow('Create New Subsite', 'dropdown didnt show',
+     '#dialogNavBar_SubsiteMenu')
+endeval
+
+def hidedropdown
+    tH.wait(0.5);
+    var x42NavBarNav_DropDown = $('ul.navbar-nav').find('li.dropdown');
+    x42NavBarNav_DropDown.mouseleave();
+    //x42NavBarNav_DropDown.removeClass('open')
+endeval
+
+
+def create-tab
+
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+            indexTab = arg1;
+        }
+        var name = window.$scopeSubsites.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+            console.log('found eexisting copy of clone');
+
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+            var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+            btnCancel.click()
+            return
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+        window.$scopeSubsites.layoutToCopy = [name]
+        window.$scopeSubsites.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.clickNext('OK', '#dialogCloneTabFrom');
+    }
+    tH.setDefaultAddNext()
+    tH.logNow('running create tab?')
+    // cloneTab_QuickIFTabExists();
+    tH.click('#dialogAddNewTab');
+    tH.waitForShow( '#dialogCloneTabFrom')
+    //  tH.click('')
+    tH.addSync(cloneTab_QuickIFTabExists)
+    tH.resetDefaultAddNext();// = false;
+end
+
+def verifySubsiteTab
+    // tH.setDefaultAddNext()
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+        indexTab = arg1;
+        }
+        var name = window.$scopeSubsites.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone');
+        return
+        }
+         tH.fail('missing subsite tab ', expectedName)
+    }
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    //  tH.resetDefaultAddNext();// = false;
+end
+#fx verifySubsiteTab; 1
+
+
+
+def refreshSubsites(subsiteName)
+    tH.fx('showdropdown' )
+    tH.fx('leaveSubsite' )
+    tH.wait(.5)
+
+    tH.logNow('go to subsite')
+
+    tH.fx('ensureAllSubsiteTabsGone')
+
+    tH.addStep(function refreshSubsiteList(){
+        window.$scopeSubsites.subsites.remote.sites.listItems( function() {
+            tH.wait(.5)
+            // tH.resetDefaultAddNext()
+             tH.test.cb()
+        })
+    });
+
+    if (subsiteName) {
+        tH.click(subsiteName, '#holderMySubsiteList')
+    }
+
+       tH.fx('hidedropdown');
+end
+
+
+
+def revertTabs(subsiteName)
+    tH.fx('showdropdown' )
+     tH.fx('leaveSubsite' )
+    tH.wait(.5)
+
+    tH.logNow('go to subsite')
+
+    tH.fx('ensureAllSubsiteTabsGone')
+
+    tH.addStep(function refreshSubsiteList(){
+        window.$scopeSubsites.subsites.remote.sites.listItems( function() {
+            tH.wait(.5)
+            // tH.resetDefaultAddNext()
+             tH.test.cb()
+        })
+    });
+
+    tH.addStep(function clearTabs(){
+        window.$scopeSubsites.utilsFx.revertUITabs(false, function onTabsUpdated(){
+
+        })
+        tH.test.cb();
+    });
+
+
+    tH.wait(2)
+    tH.log('... recreating tabs');
+    //return
+    tH.addStep(function clearTabs(){
+        window.$scopeSubsites.utilsFx.revertUITabs(true, function onTabsUpdated(){
+              tH.test.cb();
+        })
+
+    });
+
+    if (subsiteName) {
+        tH.click(subsiteName, '#holderMySubsiteList')
+    }
+
+    tH.fx('hidedropdown');
+end
+
+def leaveSubsite
+    tH.fx('showdropdown' )
+    tH.wait(1)
+    
+      tH.addStep(function tryToLeaveSubsite() {
+            var leaveCurrentSubsite = tH.findByContent('Leave', '#dialogNavBar_SubsiteMenu');
+            if ( leaveCurrentSubsite.length == 0 ) { 
+                tH.test.cb();
+                return;
+                //exit
+            }
+            
+            //mignt not be in subsite mode
+            tH.click('Leave', '#dialogNavBar_SubsiteMenu'); //will fali if not available
+            tH.waitForNone('Leave', null, '#dialogNavBar_SubsiteMenu')
+            
+            tH.waitForHide('#dialogAddNewTab',
+            'Ensure add to subsite tab is hidden - when user leaves subsite edit mode');
+            //tH.waitForNone('li[type="subsiteTab"]', 'Did not hide the subsite tabs when left subsite')
+            
+            tH.fx('hidedropdown');
+            tH.test.cb()
+        });
+    
+
+end
+
+
+
+def ensureAllSubsiteTabsGone
+
+    var tabsUser = $('[type=userTab]')
+    var tabsSubsite = $('[type=subsiteTab]')
+
+    if ( tabsSubsite.length > 0 ) {
+        tH.fail('had subsite tabs', tabsSubsite);
+        window.failData = tabsSubsite;
+    }
+
+end
+
+
+def ensureAllCustomTabsGone
+
+    var tabsUser = $('[type=userTab]')
+    var tabsSubsite = $('[type=subsiteTab]')
+
+    if ( tabsSubsite.length > 0 ) {
+        tH.fail('had subsite tabs', tabsSubsite);
+        window.failData = tabsSubsite;
+    }
+
+    if ( tabsUser.length > 0 ) {
+        tH.fail('had tabsUser, expected 0', tabsUser);
+        window.failData = tabsUser;
+    }
+end
+
+def removeAllTabs(userTabs)
+    tH.addStep(function findAllUserTabs() {
+        if ( userTabs == true || userTabs == 'true'  ) {
+             var items = $('[type=userTab]')
+             //debugger
+        } else {
+            var items = $('[type=subsiteTab]')
+       //     debugger
+        }
+
+        var arrTabs = []
+        $.each(items, function onDeleteTabInLoop(k,v) {
+            var tabName2 = $(v).text().trim();
+            console.log('will delete tab', tabName2);
+            tH.wait(1);
+            tH.fx('deleteTab', tabName2)
+            arrTabs.push(tabName2);
+        });
+
+        console.log('will delete tab', arrTabs);
+
+        var arrTabNames =  $scopeSubsites.utilsFx.getTabNames()
+        console.log('will delete tabs2', arrTabNames);
+
+        tH.test.cb()
+    });
+end
+
+def deleteTab(tabName_, userTabType)
+    tH.click(tabName_, '#tabHolder');
+    tH.wait(0.5);
+
+    if ( userTabType == 'true' || userTabType == true ) {
+        tabType = 'userTab'
+    }
+
+    tH.log('will delete', 'searching for tab', tabName_)
+
+
+    function findTabByName() {
+        tH.logNow('where is tab', tabName_,'?');
+        var tabs = tH
+        .findByContent('li|||'+tabName_,
+        '#tabHolder');
+        if ( tabs.length > 1 ) {
+            tH.clickNow(tabs)
+        }
+        return tabs;
+    }
+
+    tH.waitForShow(findTabByName, 'Did not see context controls');
+
+    //tH.waitForShow('$2 li|||'+expectedName, 'tab edit controls did not appear on display', '#tabHolder')
+
+    #wait for show item under by content
+    tH.click('#editTabNameDialogContent')
+    tH.wait(0.5)
+    tH.click('a|||Delete', '#dialogTabContextMenuContent')
+    tH.waitForShow('#confirmDialog')
+    tH.click('OK', '#confirmDialog')
+    tH.addSync(function deleteLog() {
+         tH.log('will delete tab', tabName_, 'gone')
+    })
+    tH.wait(1) //wait for tab to clear
+    tH.fx('findTab', tabName_,userTabType)
+    tH.addStep(function throwErrorIfTabFound() {
+        if (   window.foundTab = null ||   window.foundTab.length == 0 ) {
+
+        } else {
+            tH.fail('found the tab', tabName_, userTabType)
+        }
+        tH.test.cb();
+    })
+
+
+end
+
+
+def findTab(tabName,userTabType)
+  window.foundTab = null;
+    var existingTab = tH.findByContent(tabName, '#tabHolder')
+    var tabType = 'subsiteTab'
+    if ( userTabType == 'true' || userTabType == true ) {
+        tabType = 'userTab'
+    }
+    existingTab = existingTab.filter('[type='+tabType+']');
+    if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone', existingTab);
+        //return
+    } else {
+
+    }
+    window.foundTab = existingTab;
+    tH.logNow('searched for tab', tabName )
+end
+
+def deleteTabSafe(tabName,type)
+    //tH.logNow('creating the new tab', expectedName )
+    tH.fx('findTab',tabName, type);
+    tH.addStep(function onTestTAb() {
+        existingTab = window.foundTab;
+        // tH.logNow('found existing tab', tabName , existingTab.length)
+        if ( existingTab.length > 0 ) {
+            // asdf.g
+            tH.logNow('found existing tab, deleting tab named:', tabName )
+            tH.fx('deleteTab', tabName, type);//
+            // return
+        } else {
+
+        }
+        tH.test.cb()
+    });
+
+
+end
+
+def unhideAllTabs()
+       tH.fx('closeallpopups');
+       //tH.fx('closeallpopups');
+
+       tH.addStep( function selectFirstTab() {
+            var tabs = $('#tabHolder').find('li')
+            tab = tabs[0]
+            tab = $(tab)
+            //tH.msgStatus('click', tab.text());
+            console.log(tab.text())
+            tH.click(tab.text(), '#tabHolder');
+            tH.test.cb()
+       })
+
+
+
+       tH.addStep( function onOpenPopup_() {
+            tH.waitForShow('#editTabNameDialogContent')
+            tH.click('#editTabDialogContent');
+                   tH.waitForShow('#dialogManageTabs');
+            tH.test.cb()
+            return;
+            //tH.waitForShow('.pt-layout-name-input')
+            tH.test.cb()
+            return;
+       })
+
+
+       tH.addStep( function onClickHiddenTabs() {
+            var hiddenTabs = $('#dialogManageTabs').find('.fa-eye-slash')
+            $.each(hiddenTabs, function onClick(k,tab) {
+               tH.clickNow(tab);
+            });
+              tH.click('Close', '#dialogManageTabs')
+            tH.test.cb()
+       })
+
+end
+
+def ensureAllTabsVisible()
+       tH.addStep( function selectFirstTab() {
+            var tabs = $('#tabHolder').find('li')
+            var tabNotVisible = [];
+            $.each(tabs, function onAddTab(k, tab) {
+
+                tab = $(tab)
+                var tabName = tab.text();
+
+                tabName = tabName.trim();
+                var isVisible = tab.is(':visible');
+                console.error('is tab visible?', tabName, isVisible );
+
+                if ( tabName == '+' ) {
+                    return
+                }
+
+                if ( isVisible == false ) {
+                    tabNotVisible.push(tabName)
+                }
+                //tH.wait(0.2);
+            })
+
+            if ( tabNotVisible.length > 0  ) {
+                tH.fail('there is an issue', tabNotVisible, 'expected 0 tabs');
+            }
+            tH.test.cb()
+       })
+end
+
+def ensureAllTabsHaveProperOptions()
+       tH.fx('closeallpopups');
+       //tH.fx('closeallpopups');
+
+       tH.addStep( function selectFirstTab() {
+            var tabs = $('#tabHolder').find('li')
+            var tabNotVisible = [];
+            $.each(tabs, function onAddTab(k, tab) {
+
+                tab = $(tab)
+                var tabName = tab.text();
+
+                tabName = tabName.trim();
+                var isVisible = tab.is(':visible');
+               // console.debug('is tab visible?', tabName, isVisible );
+
+                if ( tabName == '+' ) {
+                    return;
+                }
+                if ( isVisible == false ) {
+                    tabNotVisible.push(tabName)
+                    return;
+                }
+                   console.debug('is tab visible?', tabName, isVisible );
+
+                tH.click(tabName, '#tabHolder');
+                tH.log('clicking', tabName);
+                if ( tabName != 'Custom' ) {
+                    tH.waitForShow('#editTabNameDialogContent',
+                    tabName + " " +
+                    'clicking tab did not display the tab options-3')
+
+
+                }
+
+                tH.fx('ensureSelectedTabsOptions');
+            })
+
+
+            tH.test.cb()
+       })
+end
+
+def ensureSelectedTabsOptions()
+
+       tH.addStep( function selectFirstTab() {
+            var tab = $('#tabHolder').find('li.active')
+
+            if ( tab.length == 0 ) {
+                tH.fail('no tab is active')
+            }
+            var tabName = tab.text();
+                            tabName = tabName.trim();
+
+            var tabType = tab.attr('type')
+
+
+            if ( tabType == null ) {   tH.test.cb();  return; }
+
+
+
+
+            if ( tabType == 'default' ) {
+                //tH.waitForNone('.pt-layout-name-input')
+            }
+
+            if ( tabType == 'subsiteTab' ) {
+                tH.waitForShow('.pt-layout-name-input', 'subsiteTab')
+            }
+
+            if ( tabType == 'userTab' ) {
+                tH.waitForShow('.pt-layout-name-input', tabType)
+            }
+
+            if ( tabType == 'Custom' ) {   tH.test.cb(); return; }
+
+
+            tH.waitForShow('#editTabNameDialogContent',
+            tabName + " " +
+            'clicking tab did not display the tab options-4')
+
+            tH.click('#editTabNameDialogContent');
+            tH.waitForShow('#dialogTabContextMenu')
+
+
+            if ( tabType == 'default' ) {
+                tH.waitForShow('Hide',  null, '#dialogTabContextMenu')
+            }
+
+            if ( tabType == 'subsiteTab' ) {
+                tH.waitForShow('Rename',  null, '#dialogTabContextMenu')
+                tH.waitForShow('Delete',  'delete option did not appear', '#dialogTabContextMenu')
+            }
+
+            tH.test.cb();
+            return;
+       })
+end
+
+
+
+def verifyTabOptions()
+     tH.fx('closeallpopups');
+     tH.fx('hidedropdown');
+
+       tH.addStep( function testOnEachTab() {
+            var tabs = $('#tabHolder').find('li');
+            var typesList = []
+            $.each(tabs, function onAddTab(k, tab) {
+
+                tab = $(tab)
+                var tabName = tab.text();
+
+                tabName = tabName.trim();
+                //  console.error('what is tab', tab.text() );
+                var type = tab.attr('type')
+
+                if ( type == null ) {
+                                    return;
+                                }
+                if ( typesList.indexOf(type) != -1 ) {
+                                    return;
+                }
+                typesList.push(type);
+
+                tH.wait(1);
+                tH.click(tab.text(), '#tabHolder');
+                tH.waitForShow('#editTabNameDialogContent')
+                tH.click('#editTabNameDialogContent');
+                tH.waitForShow('#dialogTabContextMenu')
+
+                if ( type == 'default' ) {
+                    //delete
+                    tH.waitForShow('Hide',  null, '#dialogTabContextMenu')
+                }
+
+                if ( type == 'subsiteTab' ) {
+                    //delete
+                    tH.waitForShow('Delete',  null, '#dialogTabContextMenu')
+
+                }
+
+                if ( type == 'standardTab' ) {
+                    tH.waitForShow('Delete',  null, '#dialogTabContextMenu')
+                }
+                console.error('what it is', tabName, type)
+
+                tH.wait(1);
+
+            })
+
+            tH.test.cb()
+       })
+
+
+
+return;
+
+       tH.addStep( function onOpenPopup_() {
+            tH.waitForShow('#editTabNameDialogContent')
+            tH.click('#editTabDialogContent');
+                   tH.waitForShow('#dialogManageTabs');
+            tH.test.cb()
+            return;
+            //tH.waitForShow('.pt-layout-name-input')
+            tH.test.cb()
+            return;
+       })
+
+
+       tH.addStep( function onClickHiddenTabs() {
+            var hiddenTabs = $('#dialogManageTabs').find('.fa-eye-slash')
+            $.each(hiddenTabs, function onClick(k,tab) {
+               tH.clickNow(tab);
+            });
+              tH.click('Close', '#dialogManageTabs')
+            tH.test.cb()
+       })
+
+end
+
+
+
+def hideTab(tabIndex)
+     //tH.fx('closeallpopups');
+     //tH.fx('hidedropdown');
+
+       tH.addStep( function testOnEachTab() {
+            var tabs = $('#tabHolder').find('li');
+
+             if ( tabIndex == null) {
+                tabIndex = 0
+             }
+
+            var tabObject = $scopeSubsites.tableHelper.data.layoutTabs[tabIndex]
+
+            if ( tabObject.hidden ) {
+                 console.debug('tab is alreayd hidden')
+                 tH.test.cb();
+                return;
+            }
+
+            var tab = tabs[tabIndex];
+            tab = $(tab);
+
+            var typesList = [];
+
+            //find first standard tab
+
+            tab = $(tab)
+            var tabName = tab.text();
+
+            tabName = tabName.trim();
+            var type = tab.attr('type')
+
+            tH.wait(1);
+            tH.waitForShow(tabName, 'Show tab',
+                    '#tabHolder');
+
+            tH.click(tab.text(), '#tabHolder');
+            tH.waitForShow('#editTabNameDialogContent')
+            tH.click('#editTabNameDialogContent');
+            tH.waitForShow('#dialogTabContextMenu')
+//TODO: Fix this so it has try catch in eval block and throws error and fails test
+//asdf.g
+            var clickHide = false;
+            if ( type == 'default' ) {
+               clickHide = true
+            } else {
+                return;
+            }
+
+
+            if ( clickHide ) {
+                tH.logNow('hiding')
+                //delete
+                tH.waitForShow('Hide',
+                'default did not show hide option',
+                '#dialogTabContextMenu')
+                tH.logNow('waiting for hide to appear')
+                tH.click('Hide')
+                tH.waitForNone(tabName, 'Tab was not hidden' , '#tabHolder');
+            }
+
+
+
+            tH.test.cb()
+       })
+
+
+end
+
+def isTabIndexHidden(tabIndex)
+    var tab = $scopeSubsites.tableHelper.data.layoutTabs[tabIndex]
+    if ( tab.hidden ) {
+         console.debug('tab is alreayd hidden')
+       return;
+    }
+
+    tH.fail('tab', tab.name, 'should be hidden', tab);
+end
+
+
+def isTabIndexVisible(tabIndex)
+    var tab = $scopeSubsites.tableHelper.data.layoutTabs[tabIndex]
+    if ( tab.hidden !== true ) {
+         console.debug('tab is visible')
+       return;
+    }
+
+    tH.fail('tab', tab.name, 'should be visible', tab);
+end
+
+def ensureTabSelected(tabIndex)
+    //tH.waitForShow('')
+
+    /*
+    get all visible tabs
+    if tab ==
+    */
+    var tabs = $('#tabHolder').find('li.uib-tab:visible');
+    var tab = tabs[tabIndex];
+
+    tab = $(tab);
+    var found=tab.find('#editTabDialog').length > 0
+
+    var tabName = tab.text().trim();
+
+    if ( found ) {
+    } else {
+        tH.fail('tab not selected', 'expected tab index',
+        tabIndex, 'to be selected', tabName, 'was selected')
+    }
+
+    return;
+end
+
+def createTab(indexTab,userTab,tabName)
+
+    if ( indexTab == null  ) {
+        indexTab = 0;
+    }
+    var name = window.$scopeSubsites.tableHelper
+    .data.layoutTabs[indexTab].name
+    var expectedName = name + ' (copy)';
+
+    var tabAlreadyExists = false;
+
+    function cloneTab_QuickIFTabExists(){
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        var tabType = 'subsiteTab'
+        if ( userTab == 'true' || userTab == true ) {
+            tabType = 'userTab'
+        }
+        existingTab = existingTab.filter('[type='+tabType+']');
+        //debugger
+        if ( tabName ) { //check if proper name already exists
+            existingTab = tH.findByContent(tabName, '#tabHolder')
+            existingTab = existingTab.filter('[type='+tabType+']')
+            tH.logNow('renaming', tabName, existingTab.length);
+        }
+
+        if ( existingTab.length > 0 ) {
+            console.log('found eexisting copy of clone', expectedName, tabName);
+            tabAlreadyExists = true
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+            var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+            btnCancel.click()
+            return
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+
+                if ( tabAlreadyExists ) {
+                    console.log('tabAlreadyExists', tabAlreadyExists);
+                    // tH.test.cb()
+                    return;
+                }
+                console.error('type', userTab)
+                //asdf.g
+                if (userTab != true && userTab != 'true') {
+                    tH.click('#dialogAddNewTab');
+                } else {
+                    tH.click('#dialogAddNewTabToUserLayout')
+                }
+                tH.waitForShow( '#dialogCloneTabFrom')
+
+        window.$scopeSubsites.layoutToCopy = [name]
+        window.$scopeSubsites.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.click('OK', '#dialogCloneTabFrom');
+
+
+    }
+
+    tH.logNow('running create tab?',userTab, tabName)
+
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    tH.addStep(function createNewTab_ifNeeded() {
+
+        tH.test.cb();
+    })
+
+    if ( tabName ) {
+        tH.addStep(function onXYX() {
+                if ( tabAlreadyExists ) {
+                    console.log('tabAlreadyExists', tabAlreadyExists);
+                    tH.test.cb()
+                    return;
+                }
+                tH.wait(1)
+                tH.click(expectedName, '#tabHolder')
+                tH.wait(1)
+                tH.waitForShow('#editTabNameDialogContent')
+                tH.click('#editTabNameDialogContent')
+                tH.wait(0.5)
+                tH.click('a|||Rename', '#dialogTabContextMenuContent')
+                tH.waitForShow('#dialogRenameTab')
+
+                tH.set('#txtRenameTabName',tabName, true)
+                tH.click('OK', '#dialogRenameTab')
+                tH.test.cb()
+
+        } )
+    }
+
+
+    if ( tabName ) {
+        tH.addStep(function verifyTabIsSelected() {
+                tH.click(expectedName, '#tabHolder')
+                tH.wait(1)
+                tH.waitForShow('#editTabNameDialogContent')
+                // tH.waitForShow('.pt-layout-name-input', 'verify is select')
+                tH.test.cb()
+        } )
+    }
+
+
+
+end
+
+
+def ensureTab(tabName,userTabType,present,refreshSubsite)
+    tH.log('what2', tabName)
+
+    if ( refreshSubsite != false ) {
+        tH.addStep(function refreshLayouts2(){
+            //tH.log('what')
+            //console.log('s')
+            tH.fx('refreshSubsites')
+            tH.test.cb()
+        })
+    }
+    tH.addStep(function refreshTabs(){
+        window.$scopeSubsites.loadPageLayout_FromSubsite();
+        tH.test.cb()
+    })
+
+
+    function checkIfTabExists(){
+        tH.logNow('@checking for tab', tabName)
+        var existingTabs = tH.findByContent(tabName, '#tabHolder')
+        var tabType = 'subsiteTab'
+        if ( userTabType == 'true' || userTabType == true ) {
+            tabType = 'userTab'
+        }
+
+        var existingTab = existingTabs.filter('[type='+tabType+']');
+        var tabFound = existingTab.length > 0
+        if ( present == false ) {
+            if ( tabFound == false ) {
+                console.log('did not find tab, ok');
+            } else {
+                tH.fail('Did not want to see tab', tabName)
+            }
+            return;
+        }
+        tH.logNow('result of @checking for tab', tabName,
+        existingTabs.length, existingTab.length)
+        if ( tabFound ) {
+            console.log('found eexisting copy of clone');
+        } else {
+            tH.fail('Did not find tab', tabName)
+        }
+       // tH.logNow('creating the new tab', expectedName )
+    }
+
+    tH.addSync(checkIfTabExists)
+
+end
+
+def ensureTabGone(tabName,userTabType, refreshSubsite)
+    tH.fx('ensureTab', tabName, userTabType, false, refreshSubsite);
+end
+
+
+
+def createSubsite(subsiteName, addUsernames, quick, onlyIfNeeded)
+    tH.fx('showdropdown')
+
+    if ( onlyIfNeeded ) {
+        tH.addStep(function skipIfNotNeed() {
+             var subsiteLink = tH.findByContent(subsiteName, '#dialogNavBar_SubsiteMenu')
+             if ( subsiteLink.length > 0 ) {
+               tH.logNow('ss already exists');
+                tH.fx('hidedropdown');
+             }
+             else {
+                tH.fx('createSubsite',subsiteName, addUsernames, quick);
+             }
+            tH.test.cb()
+        });
+        return;
+    }
+
+
+    #create new subsite
+    tH.click('Create New Subsite')
+    tH.waitForShow('#dialogManageSubsite')
+    tH.waitForShow('Create Subsite', 'Ensure title text on dialog', '#dialogManageSubsite')
+    tH.waitForShow('A subsite name is required',
+        'Ensure empty subsite name warning is display', '#dialogManageSubsite')
+    var typeText = true;
+    if ( quick != true ) {
+        function getNameTxt() {
+            return $('#dialogManageSubsite ')
+                .find('.txtManageSubsiteName')
+        }
+        tH.set(getNameTxt,'This name is too long to fit', true)
+
+       //tH.set('.txtManageSubsiteName','This name is too long to fit', true)
+       tH.waitForHide('A subsite name is required',
+       'Ensure empty subsite name warning is removed', '#dialogManageSubsite')
+       tH.waitForShow('Max length is 16 characters',
+       'Ensure "long name" warning is display', '#dialogManageSubsite')
+
+    } else {
+        typeText = false;
+    }
+
+
+    tH.set('.txtManageSubsiteName',subsiteName, typeText)
+    #set [value="otherPeople"]; selected
+
+    tH.addStep(function onSelectProps() {
+        var radioOption =
+        $('[value="otherPeople"].ng-valid')
+        radioOption.prop('checked', true);
+        radioOption[0].click();
+        tH.test.cb()
+    });
+    tH.log('set text')
+    var usernamesDefault = ['Ji Hye', 'Gergo', 'Fermin'];
+
+    usernamesToAdd = usernamesDefault;
+
+    if ( addUsernames && addUsernames != 'null') {
+        usernamesToAdd = addUsernames;
+        usernamesToAdd =addUsernames.split(',')
+       // debugger
+        console.error('to add', usernamesToAdd);
+    }
+
+    $.each(usernamesToAdd, function onCreateEachUser(k,userQuery) {
+        tH.set('.txtSearchName2', userQuery);
+        tH.pressEnter( '.txtSearchName2');
+        /*
+        tH.set('.txtSearchName2', 'Ji hye')
+        tH.pressEnter( '.txtSearchName2')
+        tH.set('.txtSearchName2', 'Gergo')
+        tH.pressEnter('.txtSearchName2');
+        tH.set('.txtSearchName2', 'Fermin')
+        tH.pressEnter('.txtSearchName2');
+        tH.waitForShow('ferminr')
+        */
+    })
+
+    tH.click('OK', '#dialogManageSubsite')
+    tH.waitForShow(subsiteName)
+
+    tH.fx('closeallpopups');
+end
+
+def removeSubsite(subsiteName)
+    tH.fx('showdropdown' )
+
+    tH.addStep(function on() {
+        var existingSubsiteLink = y
+        = testHelper.findByContent(subsiteName,
+        $('#holderMySubsiteList') );
+        tH.data.existingSubsiteLink = existingSubsiteLink;
+        tH.test.cb()
+    } )
+
+    tH.addStep(function on() {
+        if ( tH.data.existingSubsiteLink.length > 0 ) {
+            tH.log('deleting subsite');
+            tH.fx('removeSubsite2', subsiteName)
+        } else {
+            tH.log('not deleting subsite');
+        }
+        tH.test.cb()
+    } )
+    tH.fx('refreshSubsites')
+end
+
+def removeSubsite2(subsiteName)
+tH.log('removeSubsite2', subsiteName)
+    tH.fx('showdropdown' )
+    tH.click('Manage Subsites...')
+    tH.waitForShow('#dialogManageSubsites')
+    tH.addStep(function findThing() {
+        var y = testHelper.findByContent(subsiteName, $('#dialogManageSubsites') )
+        var tr = y.parents('tr')
+        var trashIcon = tr.find('.fa-trash')
+        console.clear();
+        console.log('trash',y,tr, trashIcon);
+        trashIcon.click()
+        tH.test.cb();
+    })
+
+    tH.waitForShow('#confirmDialog')
+    tH.click('OK', '#confirmDialog')
+
+    tH.waitForShow('#dialogManageSubsites')
+    tH.wait(0.5)
+    tH.click('Close', '#dialogManageSubsites')
+
+
+end
+
+
+
+
+def viewSubsite(subsiteName)
+    var container = '#holderMySubscribedSubsiteList'
+    tH.fx('showdropdown' )
+    tH.waitForShow(subsiteName, 'wait for the subsite in the list',
+    container)
+    tH.click(subsiteName, container);
+    tH.wait(2)
+end
+
+def goToSubsite(subsiteName)
+
+    var container = '#holderMySubsiteList'
+    tH.fx('showdropdown' )
+    tH.waitForShow(subsiteName, 'wait for the subsite in the list',
+    container)
+    //waitForShow EU Trading2; wait for subsite in list; container)
+    tH.click(subsiteName, container);
+    tH.wait(2)
+end
+
+def editSubsite(subsiteName)
+    var container = '#holderMySubsiteList'
+    tH.fx('showdropdown' )
+    tH.waitForShow(subsiteName, 'wait for the subsite in the list',
+    container)
+    //waitForShow EU Trading2; wait for subsite in list; container)
+    tH.click(subsiteName, container);
+    tH.wait(2)
+end
+
+def gotopage
+    tH.setDefaultAddNext()
+    var pageName = arg2
+    var pageMenuLinkText = arg1
+    tH.data.maxTimesNext = 50;
+    tH.click(pageMenuLinkText , 'x42-nav-sidebar');
+    tH.nextTimeoutTime(60)
+    tH.waitForShow(pageName, 'did not switch to '+pageName+' page', '.x42-nav-body-container' )
+    tH.nextTimeoutTime(60)
+    tH.waitForShow('pt-table', 'pt table did not load')
+    tH.log('Navigated to', pageName);
+    tH.resetDefaultAddNext()
+end
+#fx gotopage; Revenue; Revenue
+
+#log changed to revenue page
+#wait 2
+
+#fx gotopage; External Revenue; External Revenue
+
+#fx verifySubsiteTab; 0
+
+
+#endtest
\ No newline at end of file
Index: mp/testingFramework2/PromiseHelperV3.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/PromiseHelperV3.js	(revision )
+++ mp/testingFramework2/PromiseHelperV3.js	(revision )
@@ -0,0 +1,482 @@
+/**
+ *
+ *Wrapper on promise library for ease of use
+ * @type {{}}
+ */
+if ( typeof isNode === 'undefined') {
+    var isNode = true;
+}
+if (typeof exports === 'undefined' || exports.isNode == false) {
+    isNode = false
+}
+
+if ( isNode ) {
+    try {
+        var sh = require('shelpers').shelpers
+    } catch (e ) {
+        var sh = require('./shelpers').shelpers
+    }
+} else {
+    if (typeof exports === 'undefined') {
+        var exports = {};
+    }
+    if (typeof module === 'undefined') {
+        var module = {};
+    }
+}
+//var Q = require("q");
+function PromiseHelperV3() {
+    var self = this;
+    var p = PromiseHelperV3.prototype;
+    self.starter = "--\t\t"
+    self.debugName = self.starter + 'PromH'
+    self.data = {}
+    self.start = function start(arg1) {
+        //var deferred = Q.defer();
+        // console.log('starting...')
+        //debugger
+        console.log('starting/', arg1.name, arg1 )
+        //deferred.resolve(arg1);
+        //deferred.promise.fail(function (error) {
+        //setTimeout( function wait500MsForLogToFlush() {
+        ///    self.proc("error occured: " + error, JSON.stringify(error))//, error.stack);
+        // }, 500)
+        //console.error("error occured: " + error);
+        // })
+        ///self.lastPromise = deferred.promise
+        //return deferred.promise;
+        setTimeout(self.startNextMethod, 10);
+    }
+    function defineTransportControlMethods() {
+        self.startNextMethod = function () {
+            if ( self.isPlaying == false ) {
+                self.proc('double end call...');
+                console.error('double end call')
+                return;
+            }
+            self.data.methods.currentIndex++
+            self.currentOperation = self.methods.shift();
+            if (self.currentOperation == null) {
+                if (self.methods.length == 0) {
+                    self.currentMethod = null;
+                    if (self.token.name != null /*&& self.settings.silent != true */) {
+                        self.proc('***Chain Complete', self.token.name);
+                    } else {
+                        console.log('done'); //, self.token.name);
+                    }
+                    if ( self.token.fxDone != null ) {
+                        self.token.fxDone(self.token, self);
+                    }
+                    sh.callIfDefined(self.token.fxDone2, self)
+                    sh.callIfDefined(self.token.fxDone3, self)
+                    sh.callIfDefined(self.fxDone, self)
+                    sh.callIfDefined(self.fxDone2, self)
+                    sh.callIfDefined(self.fxDone3, self)
+                    self.isPlaying = false;
+                    return;
+                }
+                setTimeout(self.startNextMethod, 10);
+                return
+            }
+
+            var meth = self.currentOperation.fx;
+            if ( self.currentOperation.fx == null ) {
+                meth = self.currentOperation;
+            }
+            self.currentMethod = meth;
+            //method is callled after chain is complete
+            self.currentCallback = function currentCallback_onDoneMethod(token) {
+                //debugger
+                function fxResume() {
+                    var defaultTime = sh.dv(self.token.linkDelay, 0);
+                    setTimeout(self.startNextMethod, 10 + defaultTime);
+                }
+
+
+                //self.showProgress();
+                //self.data.index = asdf
+                //self.data.length = self.methods.length;
+                if ( self.token ==null ) {
+                    console.error(
+                        'what is self.token null?', self.token
+                    )
+                   // debugger;
+                }
+                var continueTest = sh.callIfDefined(self.token.fxStep, self, fxResume)
+                if( continueTest == false ) {
+                    self.currentMethod = null; //break the timer if a pause
+                    console.warn('test ended the test early')
+                    return;
+                }
+
+                fxResume();
+            }
+
+            var fxLinkFinishedCB = self.currentCallback;
+            //REQ: support timeout delays
+
+            if ( self.token.timeout){
+                var timeoutMs = self.token.timeout*1000
+                if ( self.data.nextTimeoutSeconds ) {
+                    timeoutMs = self.data.nextTimeoutSeconds * 1000
+                    self.data.nextTimeoutSeconds = null;
+                }
+                var _tokenForTimeout = self.token;
+                var chainTimeoutHelper = {};
+                chainTimeoutHelper.currentMethod = meth;
+                setTimeout(function timeoutTimer() {
+                    if ( self.isPlaying == false ) {
+                       // console.warn('timeout on aborted stream')
+                        return;
+                    }
+                    if ( self.currentMethod == chainTimeoutHelper.currentMethod){
+                        //debugger;
+                        var errorMsg = [
+                            'chain link timeout', self.currentMethod.name,
+                        'time', timeoutMs
+                        ].join(', ');
+                        console.error(errorMsg);
+                        self.stop();
+                        sh.callIfDefined(self.fxStop, errorMsg)
+                        sh.callIfDefined(_tokenForTimeout.fxError, errorMsg, self);
+                        throw new Error(errorMsg)
+                    }
+                },timeoutMs)
+            }
+
+            /*
+             var stillActive = false;
+             setTimeout(function warnIfTooLong() {
+             if ( stillActive== true) {
+             console.warn('this method goes on for long time', self.currentOperation.fx.name)
+             }
+             },10*1000 );
+             fxLinkFinishedCB = function endChain() {
+             stillActive = false;
+             sh.fxForward(self.currentCallback,arguments );
+             }
+             */
+            self.cb = fxLinkFinishedCB
+            self.next = fxLinkFinishedCB
+            meth(self.token, fxLinkFinishedCB);
+
+
+        }
+
+        /**
+         * Retry the previous  method. (used when components are not ready)
+         * @param delayTime
+         */
+        self.tryLater = function tryLater(delayTime) {
+            self.methods.unshift(this.currentMethod);
+            delayTime = sh.dv(delayTime, 500)
+            setTimeout(self.startNextMethod, delayTime);
+        }
+        /**
+         * simplify chaining
+         * @param arg1
+         * @returns {PromiseHelperV2}
+         */
+        self.startChain = function startChain(token, userSettings) {
+            self.processSettings(userSettings)
+            self.token = token;
+            if ( token == null ||
+                ( token.name && token.name.includes('waitfor') == false )
+            )
+            {
+               // debugger;
+            }
+            self.start(token);
+            self.methods = []
+            self.isPlaying = true;
+            return self;
+        }
+        /**
+         * Stop running this chain
+         */
+        self.stop = function stop() {
+            self.methods = [];
+            self.isPlaying = false;
+            self.token = null; //overkill
+            //debugger;
+        }
+    }
+    defineTransportControlMethods();
+
+    /**
+     * Mix in user settings.
+     * @param userSettings
+     * @returns {{}|*}
+     */
+    self.processSettings = function processSettings(userSettings) {
+        self.defaultSettings = {}
+        self.defaultSettings.addFailHandlerOnEnd = true
+        self.defaultSettings.ignoreNull = true
+        self.settings = self.defaultSettings;
+        self.data = {}
+        self.data.methods = {}
+        self.data.methods.count = 0
+        self.data.methods.currentIndex = 0
+        return self.settings;
+    }
+    /**
+     * Add method to work-chain
+     * Method will be based 2 parameters,
+     * token, and a callback
+     * you must call the callback for the chain to proceed
+     * @param fx
+     * @returns {PromiseHelper}
+     */
+    self.add = function addNewFxToWorkChain(fx) {
+        self.data.methods.count++
+        self.methods.push({fx:fx, stack:sh.errors.storeError(6)})
+        //self.lastAddition
+        //self.lastPromise = self.lastPromise.then(self.w(fx))
+        self.data.lastMethodAdded = fx;
+        return self;
+    }
+    /**
+     * Add method to work-chain at current step
+     * Method will be based 2 parameters,
+     * token, and a callback
+     * you must call the callback for the chain to proceed
+     * @param fx
+     * @returns {PromiseHelper}
+     */
+    self.addNext = function addNext_NewFxToWorkChain(fx, offset) {
+        self.data.methods.count++
+        var method = {fx:fx, stack:sh.errors.storeError(6)}
+        offset = sh.dv(offset,0);
+        //self.data.offsetForAddNext++;
+        //Remember: we remove method, so to add it next,
+        //it goes to front of methods array
+        //console.error('adding', fx.name, offset)
+        self.methods.splice(offset, 0, method)
+        self.data.lastMethodAdded = fx;
+        return self;
+    }
+    //short for add Skip, stub does nothing
+    self.addSkip = function addSkip(fx) {
+    }
+    self.addS = self.addSkip;
+    self.sub = {}
+    //alias to indicate substesps
+    self.sub.add = self.add;
+    /**
+     * Add unwrapped method.
+     * This is syncrhonous, no callback is passed
+     * @param fx
+     * @returns {PromiseHelper}
+     */
+    self.addSync = function addSync(fx) {
+        self.data.methods.count++
+        self.add(
+            function rawWrapper (token, callback) {
+                fx()
+                callback(token)
+            }
+        )
+        return self;
+    }
+    self.addRaw = self.addSync
+    /**
+     * Method indicates dev has completed adding methods to chain
+     * @param fx
+     * @returns {PromiseHelper}
+     */
+    self.end = function end(fx) {
+        if ( self.settings.addFailHandlerOnEnd ) {
+            self.failH =  function (error) {
+                self.proc("error occurred: " + error);
+                console.error("error occurred: " + error);
+                console.error("error occurred: " + error.stack);
+            } ;
+        }
+        self.addRaw(function () {
+            console.log('finished.................', self.token.name, self.data.methods.count)
+        });
+        self.proc('added ', self.data.methods.count)
+        return self;
+    }
+    self.showProgress = function showProgress() {
+        var percentage  =  (self.data.methods.currentIndex/self.data.methods.count)
+        percentage *= 100
+        percentage = percentage.toFixed(2)
+        percentage += '%'
+        console.log(self.debugName, percentage)
+        return
+        self.proc('%',
+            (percentage).toFixed(2), '%', self.data.methods.currentIndex, self.data.methods.count)
+        return self;
+    }
+
+//    self.rawWrapper = function rawWrapper (token, callback) {
+//        callback()
+//    }
+    self.fail = function fail(fx) {
+        self.lastPromise = self.lastPromise.fail(fx)
+        return self;
+    }
+    self.log = function log(arg1) {
+        var deferred = Q.defer();
+        //action(arg1, arg2, deferred.resolve);
+        console.log('done...')
+        console.log('log/', arg1)
+        deferred.resolve(arg1);
+        return deferred.promise;
+    }
+    self.log = function log(arg1) {
+        self.add(function showToken(token, cb) {
+            self.proc('log2', sh.toJSONString( self.token) )
+            cb();
+        })
+        return self;
+    }
+    self.showToken = self.log
+//    self.wrapMethod = function wrapMethod(fx) {
+//        var wrapperFx = function autoGenWrapper(opts) {
+//            var deferred = Q.defer();
+//            fx(opts, deferred.resolve);
+//            return deferred.promise;
+//        }
+//        return wrapperFx;
+//    }
+    self.wrapMethod = function wrapMethod(fx) {
+        //this is for prototyping, devs may apply method placeholder
+        //that do not exist
+        if ( fx == null && self.defaultSettings.ignoreNull == true ) {
+            return self.lastPromise;
+        }
+        var wrapperFx = function autoGenWrapper(token) {
+            var deferred = Q.defer();
+            function temp(token, resolve) {
+                //console.log('-->', fx) //auto trace name
+                //console.log('----------->')
+                console.log()
+                self.showProgress()
+                self.data.methods.currentIndex++
+                console.log(self.debugName, 'next method', fx.name)
+                console.log()
+                if ( token == null ) {
+                    //we used to show warnings
+                    //we have added token to self so if
+                    //user forgets to pass it to callback,
+                    // we will fix it ...
+                    if ( self.settings.showNullTokenWarnings ) {
+                        self.proc('token is null')
+                    }
+                    token = self.token;
+                }
+                fx(token, deferred.resolve);
+            }
+            function fxDone() {
+                deferred.resolve(token) //auto commit token, and log
+            }
+            temp(token, fxDone);
+            return deferred.promise;
+        }
+        return wrapperFx;
+    }
+    self.w = self.wrapMethod;
+    //predefined helper methods to simpslify chain config
+    self.utils = {}
+    function utilsMethods() {
+        self.utils.wait10Secs = function wait10Secs(token, callback) {
+            if (self.wait == false) {
+                callback(token)
+                return
+            }
+            setTimeout(function wait10() {
+                callback(token)
+            }, 10 * 1000)
+            var count = 10;
+            var totalTime = 10000
+            for (var i = 0; i < count; i++) {
+                var time = i * 1000
+                setTimeout(function tellTime(time) {
+                    console.log((totalTime - time) + '...')
+                }, time, time)
+            }
+        }
+        self.utils.wait3Secs = function wait3Secs(token, callback) {
+            setTimeout(function wait3() {
+                callback(token)
+            }, 3 * 1000)
+        }
+        self.utils.wait = function wait(duration, addToChain) {
+            if (duration == null ) {
+                duration = 3;
+            }
+            var fxDelay = function instantWait(token, cb){
+                setTimeout(function wait3() {
+                    cb(token)
+                }, duration * 1000)
+            }
+            if ( addToChain != false ) {
+                self.add(fxDelay);
+            } else {
+                return fxDelay;
+            }
+        }
+    }
+    utilsMethods();
+
+    self.demo  = {}
+    self.demo.exampleUsage = function exampleUsage() {
+        log(data)
+        /*
+         .then(pb.searchForTorrent)
+         .then(log)
+         .then(pb.getFirstQueryResult)
+         .then(log)
+         .then(pb.convertMagnetLinkToTorrent)
+         .then(log)
+         */
+        //cleanup existing files beforehand(or after)
+            .then(wrapMethod(pb.putIORemoveFiles))
+            .then(log)
+    }
+
+    self.demo.exampleInnerFx = function exampleInnerFx(opts, callback) {
+        callback(opts)
+    }
+
+    p.proc = function proc() {
+        sh.sLog(arguments)
+    }
+
+}
+//exports.PromiseHelperV2 = PromiseHelperV2;
+exports.PromiseHelperV3 = PromiseHelperV3;
+if ( module.parent == null && window.testPromise ) {
+    /*if ( window.testPromise == false)
+     return;*/
+    //return
+    var self = {}
+    self.searchByName = function search(token, cb){
+        console.log('searchByName')
+        //asdf.g
+        cb();
+    }
+
+    self.returnMagnetLink = function returnMagnetLink(token, cb){
+        setTimeout(function () {
+            console.log('returnMagnetLink')
+            cb()
+        },200)
+        ;
+    }
+    var token = {}
+    var work = new PromiseHelperV3();
+    token.silentToken = true
+    work.wait = token.simulate==false;
+    work.startChain(token)
+        .add(self.searchByName)
+        .log()
+        // .add(self.getFirstQuery)
+        //  .add(self.convertMagnetLinkToTorrent)
+        .log()
+        .add(self.returnMagnetLink)
+        .end();
+
+}
Index: mp/testingFramework2/csvScripts/wf1_make_user_tabs.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/wf1_make_user_tabs.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/wf1_make_user_tabs.js.txt	(revision )
@@ -0,0 +1,244 @@
+#test for basic csv
+log this test will enter the EU Trading 2 subsite
+log Will create 2 tabs on two pages ,
+log Then verify tabs have been created.
+
+#fx alert
+fx showdropdown
+
+endtest
+
+click External Revenue; x42-nav-sidebar
+waitForShow #dialogAddNewTab
+
+fx showdropdown
+
+bookmark running test
+
+
+waitForShow EU Trading2; wait for subsite in list; #holderMySubsiteList
+click  EU Trading2; #holderMySubsiteList
+
+
+waitForShow #dialogAddNewTab; ensure the new subsite tab button is visible
+
+
+bookmark clone the first tab
+#click #dialogAddNewTab
+#waitForShow #dialogCloneTabFrom
+#waitForShow Function
+#click Function; #dialogCloneTabFrom
+
+def create-tab
+
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+            indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+            console.log('found eexisting copy of clone');
+
+            tH.logNow('found existing tab', expectedName )
+            tH.clickNext('Cancel', '#dialogCloneTabFrom');
+            return;
+            var btnCancel = tH.findByContent('Cancel', '#dialogCloneTabFrom')
+            btnCancel.click()
+            return
+        } else {
+
+        }
+        tH.logNow('creating the new tab', expectedName )
+        window.$scope.layoutToCopy = [name]
+        window.$scope.$apply()
+
+        var selectList = $('#dialogCloneTabFrom').find('select')
+        var first = selectList.find('option').first()
+        first.prop('selected', true);
+        first.click();
+
+        tH.clickNext('OK', '#dialogCloneTabFrom');
+    }
+    tH.setDefaultAddNext()
+    tH.logNow('running create tab?')
+    // cloneTab_QuickIFTabExists();
+    tH.click('#dialogAddNewTab');
+    tH.waitForShow( '#dialogCloneTabFrom')
+    //  tH.click('')
+    tH.addSync(cloneTab_QuickIFTabExists)
+    tH.resetDefaultAddNext();// = false;
+end
+
+def verifySubsiteTab
+    // tH.setDefaultAddNext()
+    function cloneTab_QuickIFTabExists(){
+        var indexTab = 0;
+        if ( arg1  ) {
+        indexTab = arg1;
+        }
+        var name = window.$scope.tableHelper
+        .data.layoutTabs[indexTab].name
+        var expectedName = name + ' (copy)'
+
+        var existingTab = tH.findByContent(expectedName, '#tabHolder')
+        if ( existingTab.length > 0 ) {
+        console.log('found eexisting copy of clone');
+        return
+        }
+         tH.fail('missing subsite tab ', expectedName)
+    }
+    tH.addSync(cloneTab_QuickIFTabExists)
+
+    //  tH.resetDefaultAddNext();// = false;
+end
+
+
+fx create-tab; 0
+fx create-tab; 1
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+//fx verifySubsiteTab; 2
+wait .2
+
+bookmark leave page
+
+def refresh_subsites
+    tH.setDefaultAddNext()
+    tH.callFx('showdropdown' )
+    tH.waitForShow('Leave Subsite')
+    tH.click('Leave Subsite')
+    tH.waitForHide('Leave Subsite')//,'#holderMySubsiteList')
+     tH.wait(.5)
+    //tH.logNow('clicking', arg1)
+
+    tH.logNow('go to subsite')
+     tH.click('EU Trading2', '#holderMySubsiteList')
+     window.$scope.subsites.remote.sites.listItems( function() {
+       tH.wait(.5)
+         //click Leave Subsite
+         //waitForHide Leave Subsite
+         //waitForShow EU Trading2; wait for subsite in list; #holderMySubsiteList
+         //click  EU Trading2; #holderMySubsiteList
+
+         //console.log('1', arg1);
+         //tH.logNow('clicking', arg1)
+         tH.resetDefaultAddNext()
+         tH.test.cb()
+   }  )
+
+end
+
+fxasync refresh_subsites
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+
+bookmark leaving page
+
+def gotopage
+    tH.setDefaultAddNext()
+    var pageName = arg2
+    var pageMenuLinkText = arg1
+    tH.data.maxTimesNext = 50;
+    tH.click(pageMenuLinkText , 'x42-nav-sidebar');
+  tH.nextTimeoutTime(60)
+    tH.waitForShow(pageName, 'did not switch to '+pageName+' page', '.x42-nav-body-container' )
+   tH.nextTimeoutTime(60)
+    tH.waitForShow('pt-table', 'pt table did not load')
+    tH.log('Navigated to', pageName);
+    tH.resetDefaultAddNext()
+end
+
+
+fx gotopage; Revenue; Revenue
+
+log changed to revenue page
+wait 2
+
+fx gotopage; External Revenue; External Revenue
+
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+endtest
+
+
+click Revenue; x42-nav-sidebar
+eval
+  tH.data.maxTimesNext = 120;
+end
+waitForShow Revenue; waiting for revenue page to load; .x42-nav-body-container
+waitForShow #dialogAddNewTab
+
+click External Revenue; x42-nav-sidebar
+log finished runnign refresh_subsites
+
+waitForShow Revenue; waiting for revenue page to load; .x42-nav-body-container
+waitForShow #dialogAddNewTab
+fx verifySubsiteTab; 0
+fx verifySubsiteTab; 1
+
+endtest
+
+
+
+
+#############################
+endtest
+click button
+
+
+click Leave Subsite
+
+waitForHide Leave Subsite
+
+click Manage Subsites...
+
+waitForShow #dialogManageSubsites
+
+eval close all popups
+  //window.$scope.popups.hideAllDialogs()
+  //window.$subsitesScope.popups.hideAllDialogs()
+
+  var y = testHelper.findByContent('EU Trading2', $('#dialogManageSubsites') )
+  var tr = y.parents('tr')
+  var trashIcon = tr.find('.fa-trash')
+  console.clear();
+  console.log('trash',y,tr, trashIcon);
+  trashIcon.click()
+end
+
+waitForShow #confirmDialog
+
+#click Cancel; #confirmDialog //ignore
+click OK; #confirmDialog //ignore
+
+
+waitForShow #dialogManageSubsites
+click Close; #dialogManageSubsites
+
+wait 1
+endtest
+click button
+clickJ .redTest //click red button
+clickText jump
+clickText test 2
+log test
+set #txtArea set the text
+set #txtArea; set the text ~use semi colon to delinate args
+set #txtArea |set the text ~use pika to delinate args
+alert new alert
+logNow sdfsdf
+logNext sdfsdfsdf
+log sdfsdfsdfsdfsdf
+wait 2 //wait 2 seoncds
+/*
+block comment
+*/
+--comment
+~some message alert //alias for log
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/crud_subsites.js.V2.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/crud_subsites.js.V2.txt	(revision )
+++ mp/testingFramework2/csvScripts/crud_subsites.js.V2.txt	(revision )
@@ -0,0 +1,29 @@
+#test for basic csv
+log this test verifies create subsite functionality
+
+fx closeallpopups
+
+
+
+fx createSubsite('EU Trading-T2', ['james', 'coo', 'glen' ]);
+fx closeallpopups
+
+endtest
+
+
+fx leaveSubsite();
+fx refreshSubsites('EU Trading2');
+
+
+fx createTab(0,false, 'Subsite Tab 1');
+fx createTab(0,false, 'Subsite Tab 2');
+
+
+fx leaveSubsite();
+
+fx ensureTabGone('Subsite Tab 1', false)
+fx goToSubsite('EU Trading2')
+fx ensureTab('Subsite Tab 1', false, true, false)
+fx closeallpopups
+
+endtest
Index: mp/testingFramework2/dialogTransport.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/dialogTransport.html	(revision )
+++ mp/testingFramework2/dialogTransport.html	(revision )
@@ -0,0 +1,36 @@
+<!DOCTYPE html>
+<html>
+<head>
+    <script src="searchTests.js" ></script>
+</head>
+<body>
+Popups
+<!--
+<div style="display: none; position: fixed; bottom: 10px; right: 10px" id="testLogPanel" >
+    asdf
+</div>
+-->
+<style>
+    .dialog {
+        position: fixed;
+        bottom: 10px;
+        left: 10px;
+    }
+</style>
+<div>
+    <button id="btnPlay"
+            onclick="window.testHelper.transport.play()"
+            >Play</button>
+    <button id="btnPause"
+            onclick="window.testHelper.transport.pause()"
+            >Pause</button>
+    <button id="btnStop"
+            onclick="window.testHelper.transport.stop()"
+            >Stop</button>
+    <button id="btnRerun"
+            onclick="window.testHelper.transport.rerun()"
+            >Rerun</button>
+</div>
+
+</body>
+</html>
\ No newline at end of file
Index: mp/testingFramework2/csvScripts/smoketest.js.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/testingFramework2/csvScripts/smoketest.js.txt	(revision )
+++ mp/testingFramework2/csvScripts/smoketest.js.txt	(revision )
@@ -0,0 +1,246 @@
+#http://rr413c1n7.ms.com:10051/ccrt/index_subsites.html#/externalRevenuePT?testName=testCSV&arg1=csvScripts%2Fsmoketest.js.txt&loadTestFramework=true&dialogSearchTests=true
+http://rr413c1n7.ms.com:10051/ccrt/index.html#/externalRevenuePT?testName=testCSV&arg1=csvScripts%2Fsmoketest.js.txt&loadTestFramework=true&dialogSearchTests=true
+
+#test for basic csv
+log this test verifies create subsite functionality
+
+#fx closeallpopups
+
+status ok
+
+function clearAnnotations() {
+   var tClass = 'timeAnnotation';
+
+    //  uiUtils.removeWithClass(tClass)
+
+
+  uiUtils.removeWithClass(tClass)
+}
+
+function testMakeDiv(text) {
+
+//} fix this
+    var tClass = 'timeAnnotation';
+
+       var link = $(".tree.x42-nav-sidebar-item.is-a-link.is-current")
+       var div = link.find('.'+tClass);
+       var linkName = div.text().trim();
+       var div = $("[forLink='"+linkName+"']");
+
+
+    if ( div.length == 0  )  {
+
+        var cfg = uiUtils.addFloatingDiv()
+        var div = cfg ; //cfg.ui;
+       // div.text('holder')
+        div.attr('forLink', linkName);
+        div.css('background', '#f2f2f2')
+        div.css('padding', '5px')
+        /*if ( text ) {
+            div.text(text);
+        }*/
+        div.addClass(tClass);
+        div.css('z-index', 10000);
+        console.log('.........',div);
+
+          uiUtils.moveAToB(div, link)
+          uiUtils.pos.adjust(div, -5, null, null, 20)
+     }
+
+        var cfg = uiUtils.addSpan()
+        var divA =  cfg.ui;
+        divA.text('ccccccccccccccb')
+        if ( text ) {
+            divA.text(text+' ');
+        }
+        div.append(divA)
+
+}
+fx.clearAnnotations();
+fx.testMakeDiv('test');
+fx.testMakeDiv('test2');
+//endtest
+fx.clearAnnotations();
+
+function waitForLoadPtLoad(tabName) {
+    console.log('x')
+    tH.waitForLoad = function waitForLoad(jquery, waitForFailureReason, parentJq, times ) {
+        console.log('...', 5)
+        var s = 'Error Could not load tab'
+        var stepMsg = [waitForFailureReason,'(waitForLoad) ',
+            jquery, parentJq, s].join(' ')
+
+
+        tH.waitForError = stepMsg;
+        tH.testWaitforfxFail = function testWaitforfxFail() {
+              //debugger
+              tH.fxNow('testMakeDiv', tabName+' failed')
+        }
+        tH.waitFor(function isPtTableVisble_(){ //waitForHide
+            var ptTable = $('pt-table')
+            console.log('...', 4, ptTable.css("opacity"), ptTable.is(":visible"))
+            tH.moveCursorTo(ptTable);
+            //debugger;
+            if ( ptTable.length == 0 ) {
+                console.warn('jqueryIs 0 length', jquery);
+                return false;
+            }
+            if ( ptTable.css("opacity") != "1") {
+                return false;
+            }
+            return true==ptTable.is(":visible");
+        }, 1, null, false );
+    };
+    tH.waitForLoad()
+}
+
+#fx.waitForLoadPtLoad()
+#endtest
+
+function getLinks( clickLinks, maxLinksToClick, clickTabs) {
+
+    var links =     $('x42-tree').find('.tree-label-anchor')
+    var links2 = links.filter(function filterInvalidLinks(i){
+        //
+        var ui = $(this)
+        //ui = ui.find('a')
+        var hasHref = ui.attr('href') != null
+        //console.debug('links', i, ui, hasHref, ui.attr('href'))
+        if ( hasHref ) {
+            return true;
+        }
+        return false;
+    })
+
+    console.debug('links', links.length)
+    console.debug('links2', links2.length)
+
+    if ( clickLinks ) {
+
+    if ( maxLinksToClick == null ) { maxLinksToClick = links2.length }
+
+         var linkNames = [];
+              $.each(links2,
+                    function onClick_NavLink(k,ui) {
+                        var navLink = $(ui)
+                        // debugger;
+                        var linkName = navLink.text().trim()
+                        console.debug('click link', k)
+
+                        //var skipTabs = ['+', 'Custom']
+                        //if ( skipTabs.indexOf(tabName) != -1  ) {
+                        //    return;
+                        //}
+                        if ( k <= maxLinksToClick ) {
+                            //tH.click(tabName, '#tabHolder');
+                            navLink.offsetWidthForAnnotation = true;
+                            tH.click(navLink);
+                            tH.wait(2);
+                           if ( clickTabs ) {
+                                    tH.fxNow('findTabs', 2);
+                                }
+                            //navLink.click();
+                        }
+                        linkNames.push(linkName);
+                    }
+                 );
+
+        console.debug('clicking nav links', linkNames)
+
+    } else {
+        if ( clickTabs ) {
+            tH.fx('findTabs', 2);
+        }
+    }
+
+
+
+    return links2
+
+
+}
+
+
+
+//getLinks()
+fx.getLinks(  true,3, true)
+
+
+function findTabs(maxTabs) {
+    var tabs =  $('#tabHolder').find('li.uib-tab:visible')
+    console.debug('tabs', maxTabs, tabs.length);
+    var tabNames = [];
+    if ( maxTabs ) {
+
+        $.each(tabs, function onClick(k,ui) {
+            var tab = $(ui)
+            // debugger;
+            console.debug('booo', k)
+            var tabName = tab.text().trim()
+            var skipTabs = ['+', 'Custom']
+            if ( skipTabs.indexOf(tabName) != -1  ) {
+                return;
+            }
+            if ( k <= maxTabs ) {
+
+                tH.click(tabName, '#tabHolder');
+                //fx.waitForLoadPtLoad()
+                tH.msgStatus('loading tab', tabName);
+                tH.wait(3)
+                // tH.wait(2)
+                tH.fx('waitForLoadPtLoad', tabName)
+                return;
+            }
+            tabNames.push(tabName);
+        });
+    }
+    console.debug('tabNames', tabNames);
+    return tabs
+}
+
+#fx.findTabs(2);
+
+
+
+function clickkForX() {
+    var table = $('pt\\:remote-table');
+    $('pt-table').css('opacity');
+    return tabs
+}
+
+
+
+findTabs()
+
+
+
+function testFx(a,b,c) {
+    console.log(a,b,c)
+    console.log('ok')
+    function breakit () {
+
+    };
+    return
+}
+
+fx.testFx('g')
+
+endtest
+
+
+
+
+
+log test
+
+
+
+$('x42-tree').find('x42-tree-node').find('[level=3]').find('.tree-label-anchor')
+
+$('x42-tree').find('.tree-label-anchor')
+
+
+fx waitForLoadPtLoad
+
+
+endtest
