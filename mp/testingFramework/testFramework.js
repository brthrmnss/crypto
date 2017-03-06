/**
 * Created by morriste on 2/12/16.
 */

if ( typeof window === 'undefined' ) {
    var window = {}
    window.location = {};
    window.location.hash = ''
    debugger
    window.location.search = ''
    window.runTest = true //force
    var PromiseHelperV3 = require('./PromiseHelperV3').PromiseHelperV3;
    var sh = require('./shelpers').shelpers;
}
function defineInittest() {
    window.tests = {}
    var lastTestHelper = window.testHelper;
    var testHelper = {};
    window.testHelper = testHelper;
    testHelper.data = {}

    console.error('txtInvokeCount', window.testHelper.data.invokeCount);
    if (lastTestHelper) {
        testHelper.data.invokeCount =
            lastTestHelper.data.invokeCount;

    }
    if ( testHelper.data.invokeCount == null ){
        testHelper.data.invokeCount = 0;
    }
    console.error('txtInvokeCount', window.testHelper.data.invokeCount);

    if ( $.isObject == null ) {
        $.isObject = function isObject(obj) {
            if ( $.isFunction(obj)) {
                return false;
            }
            if ( obj == null ) {
                return false;
            }
            return typeof obj == 'object'
        }

    }
}

defineInittest();



function defineLoadParams() {
    testHelper.getParams = function getParamsFromUrl() {
        function getQueryObj() {
// This function is anonymous, is executed immediately and
// the return value is assigned to QueryString!
            var query_string = {};
            var query = window.location.search.substring(1);
            if ( query == '' && window.location.hash.indexOf('?') != 0 ) {
                query = window.location.hash.split('?')[1];
            }
            if ( query == null ) {
                query = '';
            }
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
// If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
// If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                    query_string[pair[0]] = arr;
// If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }
            return query_string;
        } ;
        testHelper.params = getQueryObj();
    }
    testHelper.getParams();
}
defineLoadParams();

function defineJQueryHelpers() {
    testHelper.findByContent = function (content, altRoot) {
        if ($.isFunction(content)) {
            return content = content();
        }
        if ( content )
            content = content.trim().toLowerCase();
        var root = $('body');
        if ( altRoot ) {
            root = altRoot;
        }
        return root.find('*')
            .filter(
                function(){
                    return $(this).text().trim().toLowerCase() === content;
                })
    }
    testHelper.findByContentLater = function findByContentLater (content) {

        return function getContentLater() {
            content = content.toLowerCase();
            var result =  $('body').find('*')
                .filter(
                    function(){
                        /*if ( $(this).text().length < 200) {
                         console.log('y', $(this).text().trim().toLowerCase())
                         }*/
                        return $(this).text().toLowerCase().trim() === content;
                    })

            return result;
        }
    }

    testHelper.findElementLater = function findElementLater (jqueryLimit) {
        return function _findElementLater() {
            var result =  $(jqueryLimit);

            if ($.isArray(jqueryLimit)) {
                var prev = $;
                $.each(jqueryLimit, function (k,v) {
                    if (v.charAt(0)=='>') {
                        v = v.slice(1);
                        prev = $(prev);
                        prev = tH.findByContent(v,prev);
                        return;
                    } else {
                        prev = prev.find(v);
                    }
                })
                debugger;
                result = prev;
            }

            return result;
        }
    }


    //modify content to ui.
    testHelper.convertJquery = function convertJquery(content) {
        if ($.isFunction(content)) {
            return content = content();
        }
        if ( $.isString(content)) {
            //   content = $(content)
        }
        return content;
    }

    testHelper.convertJquery2 = function convertJquery2(content) {
        var contentOrig = content;
        //TODO: deprec old method with this one
        //i jquery fx, string, or object, return jquery object
        if ($.isFunction(content)) {
            return content = content();
        }
        if ( $.isString(content)) {
            content = $(content)
            content.$orig = contentOrig;
        }

        return content;

    }
}
defineJQueryHelpers();
var tH = testHelper;

testHelper.defaults = {};
//testHelper.defaults.timeout = 5

window.runTest2 = function runTestLate(testName) {
    //used by dialogTestSearch to run tests
    setTimeout(function runTest() {
        tH.runTest(testName)
        //  window.tests[testName](tH);
    }, 200)
}

function defineTestTransportFxs() {
    var panelAdded = false; //for repeat tests
    tH.createNewTest = function createNewTest(){
        var work = new PromiseHelperV3();
        window.testInProgress = true;
        var t = work;
        var token = {};
        token.silentToken = true
        token.delayChain = 500;
        token.timeout = 30;

        if ( window.testHelper.defaults.timeout )
            token.timeout = testHelper.defaults.timeout;

        token.name = tH.currentTestName;
        work.wait = token.simulate==false;
        function startTestLater() {
            work.startChain(token)
        }

        //debugger;
        window.testHelper.data.invokeCount++;
        console.error('txtInvokeCount', window.testHelper.data.invokeCount);

        $('#testLogPanel').css({'background-color':tH.data.origTestLogPanelBgcolor});
        $('#testLogPanel').css({'background-color':'#f2f2f2'});

        // window.testHelper.fxStartNextTest = startTestLater;
        startTestLater()
        //setTimeout(startTestLater); //test can't run if defineTest fails ...
        tH.test = t;
        window.tH = tH;
        window.testStop = function stopCurrentTest() {
            console.error('stopping the current test');
            t.stop();
        }
        window.stopTest = window.testStop;

        tH.addLogPanel();
        tH.addTransportPanel();
        tH.windowLocationHash = window.location.hash; //why: store hash so we can replay test easily

        tH.data = {};

        defineAssertions(tH)
        defineTestTransportTimeout(tH)

        var timer = new sh.EasyTimer()
        timer.start()
        tH.logNow('starting test', sh.q(tH.currentTestName) );
        t.fxDone3 = function finishedTest() {
            tH.logNow('test ended', sh.q(tH.currentTestName), timer.secs() );
            $('#testLogPanel').css({'background-color':'#C3E5C4'});
            window.testHelper.transport.finished();
            $('#txtTotalStepsCount').text(t.data.methods.currentIndex);
        }

        t.token.id = window.testHelper.currentTestId = Math.random();

        t.token.fxStep = function onUpdateTransport(tx, fxResume) {

            if ( window.testHelper.transport.status == 'paused') {
                window.testHelper.fxResumeTest = fxResume
                console.warn('pause test')
                return false;
            }

            //debugger;
            if ( t.token.id != window.testHelper.currentTestId ) {
                return false;
            }
            $('#txtCurrentStepIndex').text(tx.data.methods.currentIndex);
            $('#txtTotalStepsCount').text(tx.data.methods.count);
            return;
            /*    console.log('what is x?', tx.data.methods.currentIndex,
             tx.data.methods.count);*/
        }

        t.fxError = function onError(errorMsg) {
            tH.fail([errorMsg])
        }
        return t;
    }

    function defineAssertions(tH) {
        tH.assert =  function assert(eq, msg) {

            var args = sh.convertArgumentsToArray(arguments)
            if (args.length > 2) {
                var msgStr = '';
                args = args.slice(1);
                $.each(args, function onConverTIfHaveTo(k, v) {
                    if ($.isObject(v)) {
                        v = JSON.stringify(v);
                    }
                    msgStr += ' ' + v;
                })
                msg = msgStr;
            } else {
                msg = args.slice(1).join(' ');
            }

            if ( eq == false ) {
                tH.fail(['failed to verify',msg, new Error().stack])
                throw new Error(msg)
            }
            return;

        }
    }

    tH.setDefaultAddNext = function resetDefaultAddNext() {
        tH.defaultAddNextOffset = 0;
        tH.defaultAddNext = true;
    }
    tH.resetDefaultAddNext = function resetDefaultAddNext() {
        tH.defaultAddNextOffset = 0;
        tH.defaultAddNext = false;
    }
    tH.addTestStep = function addTestStep(fx_testLink, offset) {
        var addFx = tH.test.add;
        if ( offset ) {
            addFx = tH.test.addNext;
        }
        if ( tH.defaultAddNext ) {
            addFx = tH.test.addNext;
            //console.error('default add next')
            // if ( offset == null ) { //add as if live

            if ( tH.defaultAddNextOffset == null ) {
                tH.defaultAddNextOffset = 0
            }

            offset =  tH.defaultAddNextOffset

            tH.defaultAddNextOffset++
            //  }
        }
        addFx(fx_testLink, offset);
        if ( tH.defaultAddNextOffset ) { offset += 1}
        addFx(function reportToServer() {
            var delayTime = sh.dv(tH.test.delayTime, 10)
            setTimeout(tH.test.cb, delayTime)
        },offset)
        if ( tH.defaultAddNextOffset ) { offset += 1}
        addFx(function addStandardDelayTime() {
            var delayTime = sh.dv(tH.test.delayTime, 10)
            setTimeout(tH.test.cb, delayTime)
        },offset)
    }
    tH.add = tH.addTestStep;

    tH.addSync = function addSyncFunction(fx, error) {
        var addFx = tH.test.addSync;
        addFx(fx, null);
    }
    tH.addPlainFx = tH.addSync;

    tH.addAttrTest = function addAttrTest(jquery, attr, val, error) {
        tH.add(function attiributeTest() {
            var ui = $(jquery)
            var uiVal = ui.attr(attr);

            var eq = uiVal == val;

            tH.assert(eq, 'Failed assertion', attr, '!= ', val, error)

            tH.test.cb();
        })
    }




    tH.addLogPanel = function addLogPanel() {
        /*
         var divId = '#testSearchTest';
         if ( uiUtils.ifFound(divId) ) { return; }
         uiUtils.panel.br(divId);

         */

        function clearLogPanel() {
            $('#logCurrent').html('');
            $('#logPrevious').html('');
        }
        clearLogPanel();



        $('#txtInvokeCount').text(' ('+window.testHelper.data.invokeCount+')');
        console.error('txtInvokeCount', window.testHelper.data.invokeCount);

        tH.data.origTestLogPanelBgcolor = '#f2f2f2';


        var isHere = $('#annotation').length
        if ( isHere > 1 ) {

        } else {
            var annotation = $('<img/>')
            annotation.attr('src', 'test3/images/cursor-png.png')
            $('body').append(annotation)
            annotation.attr('id','annotation')
            uiUtils.makeAbs(annotation, 100)
            annotation.addClass('transitionAll');
            annotation.css('z-index',  10002)
            annotation.hide();
        }

        if ( $('#testLogPanel').length > 0 ) {
            return;
        }



        var panel = $('<div style="background-color: #f2f2f2; padding:10px;' +
            ' border: solid 1px #666666; position: fixed; ' +
            'bottom: 260px; right: 10px; ' +
            'max-height:85%; overflow:auto; ' +
            '    max-height: calc(100% - 340px);'+
            ' display: none; " id="testLogPanel">'+
            '<b>Test Log</b>' +
            '<span id="txtInvokeCount"></span>' +
            '<div id="logPrevious"></div> ' +
            '<div id="logCurrent"></div> ' +
            '  </div>');
        $('body').append(panel)
        $('#testLogPanel').css('opacity', 0.7);
        panel.css('z-index',  10002)

        /*if ( $('#testLogPanel').length == 0 ) {
         $('body').append('<div style="background-color: #f2f2f2; padding:10px;' +
         ' border: solid 1px #666666; position: fixed; ' +
         'bottom: 260px; right: 10px; ' +
         'max-height:85%; overflow:auto; ' +
         '    max-height: calc(100% - 320px);'+
         ' display: none; " id="testLogPanel">'+
         '<b>Test Log</b>' +
         '<div id="logPrevious"></div> ' +
         '<div id="logCurrent"></div> ' +
         '  </div>')
         $('#testLogPanel').css('opacity', 0.7);
         }*/
    }


    tH.addTransportPanel =function addTransportPanel() {
        var cfg = {}
        cfg.id = 'testTransportPanel';
        cfg.clearIfFound = true
        if ( window.uiUtils.makePanel(cfg) ) {
            return; //already made
        }
        uiUtils.flagCfg = {};
        uiUtils.flagCfg.id = cfg.id;
        uiUtils.flagCfg.addTo = $(cfg.id);

        var urlBase = 'test3/'

        if ( window.location.pathname ) {
            if ( window.location.pathname.includes('test3/')) {
                urlBase = '';
            }
        }


        //window.uiUtils.addTitle('Transport Panel');
        window.uiUtils.addImage( urlBase+'images/play-button.png', 'btnPlay');
        window.uiUtils.addTooltip('Play')
        window.uiUtils.addClick(function onPlay(){
            if ( window.testHelper.transport.status == 'stopped') {
                window.testHelper.rerunLastTest();
                return;
            }
            if ( window.testHelper.transport.status == 'paused') {
                window.testHelper.transport.playing = false;
                window.testHelper.transport.pause = false;
                window.testHelper.transport.status = 'playing'

                uiUtils.enable('#btnPause')
                uiUtils.enable('#btnStop')
                uiUtils.enable('#btnRewind')

                window.testHelper.fxResumeTest();
                return;
            }
        });

        window.uiUtils.addImage( urlBase+'images/pause.png', 'btnPause')
        window.uiUtils.addClick(function onPause(){
            uiUtils.enable('#btnPlay')
            uiUtils.disable('#btnPause')
            window.testHelper.transport.playing = false;
            window.testHelper.transport.pause = true;
            window.testHelper.transport.status = 'paused'
        });

        window.uiUtils.addImage( urlBase+'images/stop.png', 'btnStop')
        window.uiUtils.addClick(function onStop(){
            window.testHelper.transport.playing = false;
            window.testHelper.transport.pause = false;
            window.testHelper.transport.status = 'stopped'
            uiUtils.disable('#btnPause')
            uiUtils.disable('#btnStop')
        });

        window.uiUtils.addImage( urlBase+'images/rewind.png', 'btnRewind')
        window.uiUtils.addClick(function onRewind(){
            window.testHelper.rerunLastTest();
        });


        window.uiUtils.ws()
        window.uiUtils.addLabel( '0', 'txtCurrentStepIndex');
        window.uiUtils.addLabel( '/' );
        window.uiUtils.addLabel( '0', 'txtTotalStepsCount');

        uiUtils.disable('#btnPlay')
        uiUtils.disable('#btnPause')
        uiUtils.disable('#btnStop')
        uiUtils.disable('#btnRewind')


        window.testHelper.transport = {};
        window.testHelper.transport.playing = true;
        uiUtils.enable('#btnPause')
        uiUtils.enable('#btnStop')
        uiUtils.enable('#btnRewind')


        window.testHelper.transport.finished = function finished() {
            window.testHelper.transport.status = 'stopped'
            uiUtils.disable('#btnPause');
            uiUtils.disable('#btnStop');
            uiUtils.disable('#btnRewind');
        }

        // debugger;
        return;
        window.uiUtils.br();
        window.uiUtils.addButton('Contact', function onContact() {
            window.location.hash = '#contact';
        });

        window.uiUtils.br();
    }
}
defineTestTransportFxs();

function defineTestTransportTimeout(tH) {

    tH.setTestTimeout = function setTestTimeout(timeoutSeconds) {
        tH.work.token.timeout = timeoutSeconds;
    }


    tH.testHoldUpForever = function testHoldUpForever(asdf) {
        debugger
        //why: create an item that does not work ...
        tH.add(function waitLink1() {
            var waitTime = 1
            setTimeout(function resumeTest(){
                tH.log('test 2')
                tH.test.cb();

                //   debugger;
            }, waitTime* 1000)
        })

        tH.add(function waitLink2() {
            var waitTime = 3
            setTimeout(function resumeTest(){
                tH.logNow('holding it up ... for ever 2')
                //  tH.test.cb();
                // debugger;
            }, waitTime* 1000)
        });
    }
}

function defineTestMethods() {
    function click(strOrJ) {
        tH.add(function clickAction() {

            if ($.isArray(strOrJ)) {
                //array of items
                var prev = $;
                $.each(strOrJ, function (k,v) {
                    // prev = $(prev)
                    if (v.charAt(0)=='>') {
                        v = v.slice(1)
                        prev = $(prev)
                        prev = tH.findByContent(v,prev);
                        return;
                    }
                    prev = prev.find(v)
                })
                // debugger;
                element = prev;
            }
            else if ($.isFunction(strOrJ)) {
                element = strOrJ() ;
            } else {
                var element = tH.findByContent(strOrJ);
            }

            if ( element != null &&
                element.length == 0 &&
                $.isString(strOrJ) &&
                strOrJ.charAt(0)=='#') {
                element = $(strOrJ)
            }

            if ( element == null ) {
                //
                element = {length:'null'};
                console.info('Element is null', strOrJ )
            } else {

                //debugger;
                //TODO: fail if do not find object?
                //Optional ? ... never used too much cognitive load ..
                //if need to verify if exists, then verify
                element.css('color', 'red');
                element.click();
            }
            console.log('click', strOrJ, element.length)
            tH.test.cb();
        })
    }
    tH.click = click;

    tH.clickNow = function clickNow(strOrJ) {
        //why: click but do not navigte
        var element = $(strOrJ);
        element.css('color', 'red');
        element[0].click();
        // element[0].click();
        element.click();
        //    console.error('endhash-W', 2, window.location.href );
        console.log('click', strOrJ, element.length)
        tH.moveCursorTo(element);
    }
    function clickJ(strOrJ) { //find based on jquery
        tH.add(function clickAction() {
            // console.error('endhash-W', 1, window.location.href );
            var element = $(strOrJ);
            element.css('color', 'red');
            if ( element[0] == null || element[0].click == null ) {
                console.error('no match for', strOrJ)
            }
            element[0].click();
            // element[0].click();
            element.click();
            //    console.error('endhash-W', 2, window.location.href );
            console.log('click', strOrJ, element.length)
            tH.test.cb();


            tH.moveCursorTo(element);

            //   console.error('endhash-W', 3, window.location.href );
        })
    }


    tH.clickTest2 = function clickTest2() {
        setTimeout(setYValue, 1500)
        function setYValue() {
//return;
            window.y = 5;
            console.log(
                'clicked test 2'
            )
        }
    }


    clickJ.desc = 'Click button. Get element from jquery stringn'
    tH.clickJ = clickJ;


    function pressEnter(strOrJ) { //find based on jquery
        tH.add(function pressEnterAction() {
            var element = $(strOrJ);
            element.css('color', 'red');


            var e = jQuery.Event("keydown");
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            e.charCode = 13
            element.trigger(e)

            var e = jQuery.Event("keypress");
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            e.charCode = 13
            element.trigger(e)

            var e = jQuery.Event("keyup");
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            e.charCode = 13

            element.trigger(e)
            console.log('pressEnter', strOrJ, element.length)


            tH.test.cb();


            tH.moveCursorTo(element);

            //   console.error('endhash-W', 3, window.location.href );
        })
    }


    pressEnter.desc = 'Press enter. Get element from jquery stringn'
    tH.pressEnter = pressEnter;

    function verify(fx, error) {
        tH.add(function clickAction() {
            if ($.isFunction(fx)) {
                var result = fx();
            }
            else {
                var result = $(fx).length > 0;
            }
            console.log('result',result)
            if ( result != true ){
                tH.fail(['failed to verify',error, fx])


            }
            tH.test.cb();
        })
    }
    var verifyExists = verify;
    tH.verifyExists = verify;
    tH.verify = verify;


    tH.logNextLink = function logNextLink(str) {
        var args = sh.convertArgumentsToArray(arguments)
        if ( args.length > 0 )
            str = args.join(' ');
        var lastStr = null; //stor epreviosu string
        tH.add(function log() {
            // console.error('endhash-Z',90, window.location.href );
            console.log('logged',str)
            $('#testLogPanel').show()
            $('#logCurrent').html(str)
            if ( tH.lastStr ) {
                //console.log(lastStr)
                $('#logPrevious').append('<div>'+tH.lastStr+'</div>')
            }
            tH.lastStr = str;
            tH.test.cb();
            //  console.error('endhash-Z',91, window.location.href );
        })
    };
    tH.trace = tH.log3 = tH.logNext = tH.logNextLink;

    tH.logNow = function logCurrently(str) {
        var args = sh.convertArgumentsToArray(arguments)
        if ( args.length > 0 )
            str = args.join(' ');
        // function log() {
        // console.log('logged',str)
        $('#testLogPanel').show()
        /*
         $('#testLogPanel').animate({
         scrollTop: $(jquery).offset().top
         }, 300);*/
        uiUtils.scrollToBottom('#testLogPanel')

        //debugger
        $('#logCurrent').html(str)
        if ( tH.lastStr !== null ) { //why this crazyiness?
            //console.log(lastStr)
            var container =  $('#logPrevious')
            if ( container.length == 0 ) {
                console.log('asdf', container, 'is embty')
            }
            container.append('<div>'+tH.lastStr+'</div>')
        }
        tH.lastStr = str;
        //  tH.test.cb();
        //   }
    }
    tH.log2 = tH.log = tH.logNow;
    function wait(waitTime) {
        tH.add(function waitLinkTime() {
            setTimeout(function resumeTest(){
                tH.test.cb();
            }, waitTime* 1000);
        })
    }
    wait.desc = 'Wait x seconds'
    tH.wait = wait;
    function waitFor(fx, maxTimes, delay, failWhenDone) {
        maxTimes = sh.dv(maxTimes, 10)
        delay = sh.dv(delay, 250)
        failWhenDone = sh.dv(failWhenDone, true);


        var dbgWait = false;

        if ( tH.waitForError ) {
            //console.error('waitFor', tH.waitForError);
            var waitForError = tH.waitForError;
        }
//debugger
        tH.add(function waitFor_Action() {
//debugger
            var innerT  = new PromiseHelperV3();
            var token = {};
            innerT.silentToken = true
            token.name = 'waitfor-str'
            innerT.wait = token.simulate==false;
            innerT.startChain(token)
            innerT.maxIterations = maxTimes;
            innerT.iteration = 0;

            innerT.addNext(testWaitForCondition)
            innerT.addNext(addWaitForDelay)
            function testWaitForCondition() {
                try {
                    var lastAttempt = innerT.iteration > innerT.maxIterations;
                    var result = fx(lastAttempt);
                } catch(e) {
                    if ( waitForError ) {
                        console.error('waitFor', waitForError);
                        //tH.waitForError = null;
                    }
                    console.error('failed on', fx.name, e)
                    var result = fx(lastAttempt);
                }
                if ( dbgWait) {
                    console.log('waitfor-result', result,
                        innerT.iteration, innerT.maxIterations, fx.name)
                }
                if ( result != true ){
                    if (lastAttempt) {
                        if ( failWhenDone ) {
                            if ( waitForError ) {
                                console.error('waitFor', waitForError);
                                //tH.waitForError = null;
                            }

                            window.fxFailed = fx;
                            tH.fail(['failed on thing ',
                                fx.name,
                                innerT.iteration ,
                                innerT.maxIterations])
                            throw new Error(
                                ['failed on thing ',fx.name,
                                    innerT.iteration ,
                                    innerT.maxIterations].join(' ')
                            )

                        } else {
                            tH.test.cb();
                        }
                    } else {
                        innerT.iteration++
                        innerT.addNext(testWaitForCondition)
                        innerT.addNext(addWaitForDelay)
                        innerT.cb();
                    }
                } else {
                    tH.waitForError = null;
                    tH.test.cb();
                }
            }
            function addWaitForDelay () {
                setTimeout(innerT.cb, delay)
            }

        })
    }
    tH.waitFor = waitFor;
    function changeLocation(url) {
        tH.add(function log() {
            console.log('url',url)
            window.location = url;
            tH.test.cb();
        })
    }
    changeLocation.desc = 'change url, can ad test into url'
    tH.changeLocation = changeLocation;
    function runFx(fx) {
        tH.add(function runFx() {
            fx();
            tH.test.cb();
        })
    }
    runFx.desc = 'run arbitrary method (fx)'
    tH.runFx = runFx;
    tH.run = runFx;
    function runFxNext(fx) {
        /*debugger;
         tH.add(function runFx() {
         fx();
         tH.test.cb();
         })*/
        tH.addTestStep(function runFxNext() {
            fx();
            tH.test.cb();
        }, true, 0)
    }
    runFxNext.desc = 'run arbitrary method (fx), add after current fx'
    tH.runFxNext = runFxNext;
    tH.runNext = runFxNext;
    function runFxAsync(fx) {
        tH.add(function log() {
            fx();
        })
    }
    runFx.desc = 'run arbitrary method (fx), dev must call cb to continue'
    tH.runFxAsync = runFxAsync;
    tH.runAsync = runFxAsync;

    //add description of step for failure
    function addDesc(desc) {
        //fidn previous callback and add this string to it
        tH.log(desc)
    }
    tH.desc=addDesc;

    tH.fail = function failTest(errorArr, asdf) {
        //alert('test failed')
        tH.logNow('  ')
        tH.logNow(' ');
        tH.logNow('_________');
        tH.logNow('Test Failed')
        $('#testLogPanel').css({'background-color':'#F9C09D'});

        throw new Error(errorArr.join(' '))

    }


    /*
     //why are these deprectated?
     tH.waitForHide = function waitForHide(jquery) {
     tH.waitFor(function isDialogVisible(){ //waitForHide
     if (
     $(jquery).css("opacity") == "0" ||
     $(jquery).css("display") == "none" ||
     $(jquery).css("visibility") == "hidden"
     ) {
     return true
     }

     return false;//==$(jquery).is(":visible")
     });
     };
     tH.waitForShow = function waitForShow(jquery) {
     tH.waitFor(function isDialogVisible(){ //waitForShow
     console.log('jquery wait for', jquery)
     if ($(jquery).css("opacity") != "0" &&
     $(jquery).css("visibility") != "hidden" ) {
     return true
     }
     return true;//==$(jquery).is(":visible")
     });
     };
     tH.verifyHidden = function waitForShow(jquery) {
     tH.waitFor(function isDialogVisible(){ //waitForHide
     if ($(jquery).css("opacity") == "0") {
     return true
     }
     return false==$(jquery).is(":visible")
     });
     };
     tH.verifyShow = function waitForShow(jquery) {
     tH.verify(function isDialogVisible(){ //waitForHide
     if ($(jquery).css("opacity") != "0") {
     return true
     }
     return true==$(jquery).is(":visible")
     });
     };
     tH.moreThanX = function ensureMoreThanXJqueryElements(jquery, count) {
     tH.verify(function verifySearchResults() { //verify more than 6
     return $(jquery).length > count
     });
     }

     tH.clickOne = function clickOne(jquery, index) {
     tH.run(function clickOne() { //verify more than 6
     index = sh.dv(index, 0);
     var elements = $(jquery);
     if ( index < 0) {
     index = elements.length+ index;
     }
     var element = $(jquery).children()[index];
     // console.log('...function to run' , elements.length, index, element, elements )
     //  console.log('...function to run' , element.text())
     $(jquery).children()[index].click();
     });
     }*/
}
defineTestMethods();


function defineCompoundMethods() {
    tH.waitForHide = function waitForHide(jquery, waitForFailureReason) {
        var dbgWait = false;
        if ( waitForFailureReason )
            tH.waitForError = waitForFailureReason + ' (waitForHide) ' + jquery
        tH.waitFor(function isUIHidden(){ //waitForHide
            //var jquery = tH.convertJquery(jquery)
            var jq = tH.convertJquery2(jquery)
            if ( jq.length == 0 ) {
                console.warn('jqueryIs 0 length', jquery, 'isUIHidden')
                return false;
            }
            var opacity = $(jquery).css("opacity");
            var isVislbe= $(jquery).is(":visible");
            if ( dbgWait ) {
                console.log('opacit', jq, opacity, isVislbe)
            }
            if ( opacity == "0") {
                return true
            }
            return false==isVislbe
        });
    };
    tH.waitForShow = function waitForShow(jquery, waitForFailureReason) {
        if ( waitForFailureReason )
            tH.waitForError = waitForFailureReason + ' (waitForShow) ' + jquery
        tH.waitFor(function isDialogVisible(){ //waitForHide
            var jq = tH.convertJquery2(jquery)
            tH.moveCursorTo(jq)
            if ( jq.length == 0 ) {
                console.warn('jqueryIs 0 length', jquery)
                return false;
            }
            /*if ($(jquery) != "0") {
             return true
             }*/
            if ($(jq).css("opacity") == "0") {
                return false
            }
            return true==$(jq).is(":visible")
        });
    };
    tH.verifyHidden = function verifyHidden(jquery) {
        tH.waitFor(function isDialogVisible(){ //waitForHide
            var jquery = tH.convertJquery(jquery)
            if ($(jquery).css("opacity") == "0") {
                return true
            }
            return false==$(jquery).is(":visible")
        });
    };
    tH.verifyShow = function verifyShow(jquery) {
        tH.verify(function isDialogVisible(){ //waitForHide
            if ($(jquery).css("opacity") != "0") {
                return true
            }
            return true==$(jquery).is(":visible")
        });
    };
    tH.moreThanX = function ensureMoreThanXJqueryElements(jquery, count) {
        tH.verify(function verifySearchResults() { //verify more than 6
            return $(jquery).length > count
        });
    }

    tH.clickOne = function clickOneOfElementsInJquery(jquery, index) {
        tH.run(function clickOne() { //verify more than 6
            index = sh.dv(index, 0);
            var elements = $(jquery);
            if ( index < 0) {
                index = elements.length+ index;
            }
            var element = $(jquery).children()[index];
            // console.log('...function to run' , elements.length, index, element, elements )
            //  console.log('...function to run' , element.text())
            $(jquery).children()[index].click();
        });
    }


    tH.set = function setTextField(jquery, text) {
        tH.runAsync(function settext() { //verify more than 6
            $(jquery).focus();
            // $(jquery).keydown();
            var e = new Event("keydown");
            e.key="a";    // just enter the char you want to send
            e.keyCode=e.key.charCodeAt(0);
            e.which=e.keyCode;
            e.altKey=false;
            e.ctrlKey=true;
            e.shiftKey=false;
            e.metaKey=false;
            e.bubbles=true;
            $(jquery)[0].dispatchEvent(e)


            $(jquery).val(text)
            $(jquery).change();
            //$(jquery).keyup();

            var e = new Event("keyup");
            e.key="a";    // just enter the char you want to send
            e.keyCode=e.key.charCodeAt(0);
            e.which=e.keyCode;
            e.altKey=false;
            e.ctrlKey=true;
            e.shiftKey=false;
            e.metaKey=false;
            e.bubbles=true;
            $(jquery)[0].dispatchEvent(e)

            $(jquery).focusout();
            $(jquery).blur();
            console.log('setting ', jquery, 'to text()')
            setTimeout(function waitToContinue(){
                tH.test.cb();
            }, 500)
        });
    }
    tH.setItem = tH.set;

    tH.makeRed = function makeRed(jquery, text) {
        tH.run(function makeRed() { //verify more than 6
            $(jquery).css({color:'red !important'})
            $(jquery).css({'background-color':'black'})
            $(jquery).css('cssText', 'color: red !important');
        });
    }
    tH.makeGreen = function highlightGreen() {
        tH.run(function makeGreen() { //verify more than 6
            $('#testLogPanel').css({'background-color':'#C3E5C4'});
            debugger;
            window.location.hash =tH.windowLocationHash;
        });
    }
    tH.moveCursorTo = function moveCursorTo(jquery) {
        var annotation = $('#annotation')
        annotation.show();

        jquery = tH.convertJquery(jquery)

        var element = $(jquery)
        if ( element.length == 0 ) {
            //not found
            return;
        }
        /*var position = $(element).offset();
         if ( position == null ) {
         console.warn('position si null', element, position)
         return;
         }*/

        if ( jquery.trigger == null ) {
            var element = $(jquery)
            var position = $(element).offset();

            position.left += element.width();
        } else {
            element = $((jquery));
            var position = $(element).offset();
        }

        if ( position == null ){
            console.warn('failed to curosr to ', jquery)
            return;
        }
        //var dbg = [position.left , $('body').width()]
        //debugger;
        if ( position.left >= $('body').width() * .80 ) {
            delete position.left;
            position.right = 20;
            console.log('move on left size')
            //positon.left = $('body').width - 250;
        }
        if ( position.left )
            position.left += 10;
        position.top += 10;
        console.log('where is', jquery, position)
        annotation.css(position)
    }
    tH.pointTo = function pointTo(jquery, msg ) {
        tH.run(function add(){
            tH.pointToNow(jquery,msg)
            return;
            if ( tH.pointedTo != true ) {
                tH.pointedTo = true
                $("<style>   .tz-framework-annotation {    box-shadow: 3px 3px 5px #c4c4c4;      position: absolute;        top: 40px;        padding: 0px 5px;        margin-left: 30px;        background-color: #F05A28;       border-radius: 0px;        border: 1px solid #C6360A;        color: white;  }</style>                ").appendTo("head");
            }

            var annotation = $('<div class="tz-framework-annotation" >  </div> ');

            var glyph = $('<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>');
            annotation.append(glyph)
            annotation.append(msg)

            if ($.isFunction(jquery)) {
                var fxJquery = jquery;
                jquery = fxJquery();
            }

            if ( jquery.trigger == null ) {
                var element = $(jquery)
                var position = $(element).offset();
                position.left += element.width();
            } else {
                element = $((jquery));
                var position = $(element).offset();
            }

            //var dbg = [position.left , $('body').width()]
            //debugger;
            if ( position.left >= $('body').width() * .80 ) {
                delete position.left;
                position.right = 20;
                //positon.left = $('body').width - 250;
            }
            annotation.css(position)
            $('body').append(annotation)
        })
    }

    tH.pointToNow = function pointToNow(jquery, msg ) {
        if ($.isFunction(jquery)) {
            var fxJquery = jquery;
            jquery = jquery();
        }
        //debugger;
        if ( jquery == null ) {
            console.info('cannot log b/c item is null', msg)
            return;
        }


        if ( tH.pointedTo != true ) {
            tH.pointedTo = true
            $("<style>   .tz-framework-annotation {  z-index:10001;   box-shadow: 3px 3px 5px #c4c4c4;      position: absolute;        top: 40px;        padding: 0px 5px;        margin-left: 30px;        background-color: #F05A28;       border-radius: 0px;        border: 1px solid #C6360A;        color: white;  }</style>                ").appendTo("head");
        }

        tH.scrollToNow(jquery)
        var annotation = $('<div class="tz-framework-annotation" >  </div> ');

        var glyph = $('<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>');
        annotation.append(glyph)
        annotation.append(msg)

        if ( jquery.trigger == null ) {
            var element = $(jquery)


        } else {
            element = $((jquery));
        }

        //debugger;



        if ( element ) {
            var position = $(element).offset();
            position.left += element.width();
        }
        if ( position == null ) {
            position = {};
        }

        //var dbg = [position.left , $('body').width()]
        //debugger;
        var pageWidth = $('body').width()
        if ( false && position.left >= pageWidth * .80 ) {
            position.right = pageWidth - position.left;
            delete position.left;
            console.info('switching alignment to right for', msg)
            //positon.left = $('body').width - 250;
        }

        annotation.css(position)
        console.log('change to date', position, msg)
        $('body').append(annotation)
    }
    tH.clearPointers = function clearPointers(jquery, msg ) {
        tH.run(function clearPointers(){
            var annotations = $('.tz-framework-annotation');
            annotations.remove();
        })
    }
    tH.scrollTo = function body(jquery) {
        tH.run(function makeRed() { //verify more than 6
            $('html, body').animate({
                scrollTop: $(jquery).offset().top
            }, 500);
        });
    }

    tH.scrollToNow = function body(jquery) {
        $('html, body').animate({
            scrollTop: $(jquery).offset().top
        }, 300);
    }

    tH.scrollToTopNow = function () {
        window.scrollTo(0, 0);
    }

    tH.scrollToTop = function () {
        tH.run(function scrollToTopWrapper() {
            tH.scrollToTopNow()
        })
    }
    tH.getUIElement = function getUIElement( query , startOnElement) {
        if ( query == null ) {
            query = {}
            query.type
            query.attrs
            query.attrsNotEq
            query.children = [] //array, each level re applies query
            var query = {
                type:'input',
                //text:'Des',
                //html:'Des',
                textEq:null,
                attrs:{type:'radio', value:'Desk'},
                children:['#DICERId','div' ]
            }
        }
        function q(val) {
            return "'"+val+"'"
        }
        var jquery = '';
        if ( query.jquery ) {
            jquery = query.jquery;
        }
        if ( query.id ) {
            jquery = '#'+query.id.replace('#','');
        }

        if ( query.type ) {
            jquery += query.type;
        }
        if ( query.attrs ) {
            var attrsQuery = ''
            $.each(query.attrs, function addAttr(k,v) {
                attrsQuery += '['+k+'='+q(v)+']'
            })
            jquery += attrsQuery;
        }
        if ( query.text ) {
            jquery += ":contains("+query.text+")";
        }

        if ( startOnElement == null ) {
            startOnElement = $;
        }
        if ( query.childOf ) {
            query.children = query.childOf;
        }
        if ( query.children ) {
            //
            //jquery += query.type;
            var currentElement = startOnElement;
            $.each(query.children, function (k,nestingQuery) {
                currentElement = getUIElement(nestingQuery, currentElement)
            });
            startOnElement = currentElement;
        }
        //debugger;
        if ( startOnElement != $ )
            startOnElement = $(startOnElement);
        // debugger;
        var items
        if (query.debug || true == true ) {
            console.info('query is', jquery, query)
        }
        if ($.isString(query)) {
            items  = startOnElement.find(query);
        } else {
            items = startOnElement.find(jquery)
        }
        // console.log('in')
        // debugger
        if ( query.html ) {
            var filteredResults = [];
            $.each(items, function filterChildren (k,ui) {
                //debugger;
                if ( $(ui).html().indexOf(query.html) != -1 ) {
                    filteredResults.push(ui)
                }
            });
            var allItems = items;
            items = filteredResults;
        }
        if ( query.getParentUpUntil ) {
            var parent = $($(items).parent());
            //debugger;

            while( parent != null ) {
                if ( parent.is(query.getParentUpUntil)  ) {
                    return $(parent);
                }
                parent = $(parent.parent());

            }
            console.error('could not find parent')
            return [];
        }
        return items;
    };
}
defineCompoundMethods();


function defineContinuitiyMethods() {
    tH.nextTest = function nextTest(testName_, text) {
        var config = {};
        config.testName = testName_
        uiUtils.setVal('nextTest', config);
    }
    //check for next test
    function checkForNextTest() {

        //if cookie, reset to null
        var nextTest = uiUtils.getVal('nextTest');

        // debugger;
        if ( nextTest) {
            window.testInProgress = true;
            //debugger;
            uiUtils.setVal('nextTest', null); //clear cookie
            if ( tH.params.runTest=='true' ){
                console.log('have next test, but runTest is true')
                return;
            }
            function runTestX(testName, testDelay) {
                var testDelay = parseInt(testDelay)
                testDelay= sh.dv(testDelay, 0);
                // debugger;
                if ( testName ){
                    console.info(
                        'Running test', testName, ''
                    )

                    setTimeout(function runTest_WhenUserTestsLoaded() {
                        if ( window.testsLoaded != true ) {
                            console.warn('tests not loaded yet')
                            setTimeout(runTest, 200+testDelay)
                            return;
                        }
                        debugger; //debug this 12-17-2016-is it correct?
                        tH.runTest(testName)
                    }, 200+testDelay)
                } else{
                    runTest();
                }
            }

            runTestX(nextTest.testName)
        }
    }

    checkForNextTest()

}
defineContinuitiyMethods();

function defineTimeHelpers () {
    tH.getTimer = function getTimer(str){
        var time = tH.timers[str]
        var diff = new Date().getTime() - time.getTime();
        diff = diff / 1000
        return diff;
    }
    tH.setTimer = function setTimer(str) {
        if ( tH.timers == null ) {
            tH.timers = {};
        }
        tH.timers[str]=new Date();
    }
}
defineTimeHelpers()
if ( typeof $ === 'undefined' ) {
    var jqueryImpersonator = {};
    function JqueryImpersonatorFx() {
        var self  = this;
        self.css = function () {
        }
        self.click = function click() {
        }

        return self;
    };
    JqueryImpersonatorFx.isFunction = function (x){}
    var $ = JqueryImpersonatorFx
}


tH.runTest = function runTest(testName) {
    tH.currentTestName = testName;
    window.lastRunTestName = testName;
    window.tests[testName](tH);
    //debugger;
    // window.testHelper.fxStartNextTest();
}

tH.rerunLastTest = function reRunLastTest() {
    tH.runTest(window.lastRunTestName);
}

function whenReady(){
    if ( window.whenReadyHasRunTesting ) {
        return;
    }
    window.whenReadyHasRunTesting = true;
    //http://localhost:10050/test2/test2.html?runTest=true
    if ( tH.params.runTest=='true' || window.runTest == true ) {
        var testName = tH.params.testName;
        var testDelay = parseInt(tH.params.testDelay);
        testDelay= sh.dv(testDelay, 0);
        if ( isNaN(testDelay)) {
            testDelay = 500;
        }
        if ( testName ){
            //debugger
            console.info(
                'Running test', testName, '', window.tests, testDelay
            )
            setTimeout(function runTest_WhenTestFrameworkLoaded() {
                if ( window.tests.loaded != true ) {
                    setTimeout(runTest, 500);
                    console.debug('waiting for test to load...')
                    return;
                };
                // debugger
                tH.runTest(testName)
            }, 200+testDelay)
        } else{
            runTest();
        }
    } else {

        console.log(
            'Skipped All tests....', tH.params.testName,
            tH.params.runTest
        )
    }

}
whenReady()


function runTest() {
    /*.add(self.searchByName)
     .log()
     // .add(self.getFirstQuery)
     //  .add(self.convertMagnetLinkToTorrent)
     .log()
     .add(self.returnMagnetLink)
     .end();*/
    var t = tH.createNewTest();
    tH.test = t;

    /*setTimeout(function lateAlert(){
     alert('...')
     }, 1000)*/
//changeLocation('http://www.yahoo.com') //forward to another url ... and test
    tH.clickJ('#btnTest');
    tH.verifyExists('#btnTest')
    tH.click('test')
    tH.click('test 2', false)
    tH.log('before waitfor')
    tH.waitFor(function(){
        return window.y == 5
    })
    tH.log('after waitfor')
}

//http://localhost:10050/test2/test2.html?runTest=true&testName=testA
function testStackingDemo2B(runIt) {
// return
    window.tests.testA = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.click('test 2');
        tH.log('test 2');
        tH.wait(1);
        tH.log('test 2');
        tH.set('#txtArea', 'set the text')
        /*tH.run(function(){

         })*/
        tH.run(function(){
            alert('ran test 2')
        });
    }
    if ( runIt ) {
        window.tests.testA(tH);
    }
}
testStackingDemo2B();

//http://localhost:10050/test2/test2.html?runTest=true&testName=testFeatures2
function testStackingDemo3() {
    var iteration = 0;
    window.tests.testFeatures2 = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.click('test 2');
        tH.log('test 2 iteration:'+(iteration+1) )
        tH.run(function maybeShow(){
            $('#txtArea').text('Test1')
            setTimeout(function () {
                if ( Math.random() > 0.5 ){
                    $('#txtArea').text('TestChanged')
                };
            }, 3000);
        })
        tH.wait(1)
        tH.waitFor(function doesTextEaqualTestChanged(){
            return $('#txtArea').text() == 'TestChanged'
        }, 4, 1000, false)
        tH.run(function testIfShown(){
            var shown = $('#txtArea').text() == 'TestChanged';
            if ( shown ) {
                tH.log2('<div class="alert-warning">saw it</div>')
                console.debug('was shown....')
            } else {
                tH.log2('<div class="alert-warning">not</div>')
                tH.test.stop();
                setTimeout(function runTestLater() {
                    window.tests.testFeatures2(tH);
                }, 10)
            }
        })
        tH.log('test 2 ' + iteration)
        tH.run(function(){
            // alert('ran test 2')
            if ( iteration > 3)
                return;
            iteration++
            setTimeout(function runTestLater() {
                window.tests.testFeatures2(tH);
            }, 10)
        })
    }
    window.tests.testFeatures2.desc = 'Try to test 2 features'
}
testStackingDemo3();


//http://localhost:10050/test2/test2.html?runTest=true&testName=testA
function testCSVTest(runIt) {
// return
    window.tests.testCSV = function define_testCSV(tH) {
        //var i = new TestCSV()
        var i = new TestCSVConvertor(); 
       // i.getTestScript('csvScripts/testCSVScript.txt', onGot)
        //var url = 'csvScripts/testCSVScript.txt';
        var url = 'csvScripts/test.txt';
        i.loadScript2(url, onGotItems)
        function onGotItems(objs, str,txt) {
            var t = tH.createNewTest();
            //convertor(contents)
//debugger
            console.log('objs', objs)
            $.each(objs, function onADdObj(k,v) {
                var fx = v[v.fx]
                var fx = tH[v.fx]
                if ( fx == null ) {
                    console.error('did not find', v.fx)
                    return;
                }
                console.log('go to', fx, v.args)
                //sh.callIfDefined(fx, v.args)
                fx.apply(this, v.args)
            })

            function origTest() {
                tH.click('test 2');
                tH.log('test 2');
                tH.wait(1);
                tH.log('test 2');
                tH.set('#txtArea', 'set the text')
            }
            /*tH.run(function(){

             })*/
            tH.run(function () {
                console.debug('ran test 2')
            });
        }
    }
    window.tests.testCSV.desc = 'load from csv'
    if ( runIt ) {
        window.tests.testA(tH);
    }
}
testCSVTest();

