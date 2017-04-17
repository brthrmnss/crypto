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
    var tH = testHelper;
    tH.settings = {};
    tH.settings.clickAsRed = false;
    tH.settings.onlyVisibleItems = true; //why click something that is invisible? we have a clickHidden
    tH.settings.hoverOnClick = true;
    tH.settings.pretendToType = true;
    tH.settings.defaultTestDelay = 500;

    testHelper.data.blueAreaClass = 'blueTransAnnotation'
    testHelper.data.dictEvalFx = {};
    testHelper.data.dictEvalFx2 = {};





    //console.error('txtInvokeCount', window.testHelper.data.invokeCount);
    if (lastTestHelper) {
        testHelper.data.invokeCount =
            lastTestHelper.data.invokeCount;

    }
    if ( testHelper.data.invokeCount == null ||
        isNaN(testHelper.data.invokeCount)  ) {
        testHelper.data.invokeCount = 0;
    }
    //console.error('txtInvokeCount', window.testHelper.data.invokeCount);

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
    testHelper.findByContent = function (content, altRoot, returnAllElements_ifHidden) {
        if ($.isFunction(content)) {
            return content = content();
        }



        if ( $.isString(content) == false ) {
            if ( $.isNumeric(content )) {
                content = content.toString();
            }
        }
        console.debug('what is input', content)

        if ( content ) {
            if ( content.startsWith('$2') ) {
                // content = content.replace('$2 ', '')
                content = content.replace('$2', '')
            }
            content = content.trim().toLowerCase();
            if ( content.includes('|||')) {
                var split = content.split('|||')
                var typeOf = split[0]
                content = split[1]
            }
        }




        var root = $('body');
        if ( altRoot ) {
            if ( $.isString(altRoot) ) {
                altRoot  = $(altRoot)
            }
            root = altRoot;
        }
        var yyy = root.find('*')
            .filter(
                function(){
                    if ( typeOf ) {
                        if ( $(this).is(typeOf) ==false ) {
                            return false;
                        }
                    }
                    return $(this).text().trim().toLowerCase() === content;
                })
        if ( returnAllElements_ifHidden === true) {
            return yyy;
        }
        var visibleItems = $();
        $.each(yyy, function isVisible(k,ui) {
            if ( $(ui).is(':visible') ) {
                visibleItems.push(ui)
            }
        })
        //visibleItems = $(visibleItems)
        return visibleItems
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
            if ( content.startsWith('$2')) {
                return null; //this is speical mode
            }
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
        if ( window.testStop ) {
            window.testStop()
        };

        var work = new PromiseHelperV3();
        window.testInProgress = true;
        var t = work;
        var token = {};
        token.silentToken = true
        token.delayChain = 500;
        token.timeout = 30;

        if ( window.testHelper.defaults.timeout )
            token.timeout = testHelper.defaults.timeout;

        //debugger;

        token.name = tH.currentTestName;
        work.wait = token.simulate==false;

        work.fxStop = function onTestStop_TimeoutLikely(msg){
            tH.fail('timeout', msg)
        }

        function startTestLater() {
            work.startChain(token)
        }


        function createFxs() {

            /*var dictFxs = {};
             dictFxs.c = function callC(arg1, arg2) {
             console.log('testproxy', arg1, arg2)
             }*/

            var handler = {
                get: function(target, name, reciever) {
                    console.log('get-testproxy', target, name, reciever)
                    var origMethod = window.testHelper.data.dictEvalFx[name];
                    if ( origMethod == null ) {
                        throw new Error(['could not find fx',
                            '"'+name+'"']
                            .join(' '))
                    }
                    return function (...args) {
                        var args2 = args
                        args2.unshift(name)
                        tH.fx.apply(this, args2)
                        return;
                        // let result = origMethod.apply(this, args);
                        console.log('callmeth', name + JSON.stringify(args)
                            + ' -> ' + JSON.stringify(result));
                        //return result;
                    };

                    return name in target ?
                        target[name] :
                        37;
                },
                /*
                 apply: function(target, that, args) {
                 console.log('fx-testproxy', target, that, args)

                 return;
                 sup.apply(that, args);
                 base.apply(that, args);
                 }*/
            };

            var proxyFxs = new Proxy({}, handler);
            //p.a = 1;
            tH.fxs = proxyFxs
        }
        createFxs();
        // tH.fxs

        //debugger;
        window.testHelper.data.invokeCount++;
        //console.error('txtInvokeCount', window.testHelper.data.invokeCount);

        $('#testLogPanel').css({'background-color':tH.data.origTestLogPanelBgcolor});
        $('#testLogPanel').css({'background-color':'#f2f2f2'});

        $('.'+tH.data.blueAreaClass).remove()

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

        //debugger
        //tH.data = {};

        defineAssertions(tH)
        defineTestTransportTimeout(tH)

        var timer = new sh.EasyTimer()


        timer.start()
        tH.logNow('starting test', sh.q(tH.currentTestName) );
        t.fxDone3 = function on_finishedTest() {
            tH.logNow('test ended', sh.q(tH.currentTestName), timer.secs() );
            $('#testLogPanel').css({'background-color':'#C3E5C4'});
            $('#testTransportPanel').css({'background-color':'#C3E5C4'});
            window.testHelper.transport.finished();
            $('#txtTotalStepsCount').text(t.data.methods.currentIndex);
            //$('#annotation').hide()
            $('#annotation').css('opacity', 0.4)
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
            $('#txtCurrentStepIndex').text(tx.data.methods.currentIndex+1);
            $('#txtTotalStepsCount').text(tx.data.methods.count);


            var currentStep = (tx.data.methods.currentIndex+1)
            var totalSteps = tx.data.methods.count

            var percent = (currentStep/totalSteps) //*100 //.toFixed(0)
            percent = percent * 100
            percent = percent.toFixed(0)
            //console.error('lll', percent, currentStep, totalSteps)
            var strPercentPaddingText = '    '
            var keep = 2 - percent.toString().length
            strPercentPaddingText = strPercentPaddingText.slice(0,keep)
            $('#txtPercentPadding').text(strPercentPaddingText);
            $('#txtPercent').text(percent+'%');

            $('#testTransportPanelProgress').css('width', percent+'%')



            /*console.debug('what is x?', tx.data.methods.currentIndex,
             tx.data.methods.count);*/
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

    tH.data.level = 0
    tH.data.levels = []
    tH.defaultAddNextOffset = 0
    tH.setDefaultAddNext = function setDefaultAddNext() {
        // console.error('adding', ' +', tH.data.level, tH.defaultAddNextOffset, tH.data.levels)
        tH.data.level++
        if ( tH.defaultAddNextOffset> 0 ) {
            //tH.data.level++
            // debugger
            // tH.defaultAddNextOffset = 0;
        }
        //var lblInfo = {};
        tH.data.levels.push(tH.defaultAddNextOffset)
        if (tH.data.levels.length == 0 ) {
            //tH.data.level++
            // tH.defaultAddNextOffset = 0;
        } else {
            // debugger
        }
        tH.defaultAddNextOffset = 0;

        tH.defaultAddNext = true;
    }
    tH.resetDefaultAddNext = function resetDefaultAddNext() {
        //  console.error('adding', ' -', tH.data.level, tH.defaultAddNextOffset, tH.data.levels)
        // tH.defaultAddNextOffset = 0;
        var level = tH.data.levels.pop();
        tH.defaultAddNextOffset = level;
        tH.defaultAddNext = false;
        //set last vazlue
        tH.data.level--


    }

    tH.nextTimeoutTime = function nextTimeoutTime(time) {
        tH.test.data.nextTimeoutSeconds = time;
    }

    tH.addTestStep = function addTestStep(fx_testLink, offset, sync) {
        var addFx = tH.test.add;
        if ( offset ) {
            addFx = tH.test.addNext;
        }
        if ( sync ) {
            var oldFx = fx_testLink;
            fx_testLink = function fx_testLinkSync() {
                oldFx()
                tH.test.cb()
            }
        }
        if ( tH.defaultAddNext ) {
            addFx = tH.test.addNext;
            //console.error('default add next')
            // if ( offset == null ) { //add as if live

            if ( tH.defaultAddNextOffset == null ) {
                debugger
                asdf.stop.this.is.wrong.set.the.val
                tH.defaultAddNextOffset = 0
            }

            offset =  tH.defaultAddNextOffset
            //how would someone knwo where to offset it? this is unnecsary
            tH.defaultAddNextOffset++
            //  }
        }
        addFx(fx_testLink, offset);
        if ( tH.defaultAddNext ) {offset += 1; tH.defaultAddNextOffset++ }
        addFx(function reportToServer() {
            // reportToServer.defaultFx = true
            var delayTime = sh.dv(tH.test.delayTime, 10)
            setTimeout(tH.test.cb, delayTime)
        },offset)
        tH.test.data.lastMethodAdded.defaultFx = true;
        if ( tH.defaultAddNext ) { offset += 1;  tH.defaultAddNextOffset++}
        addFx(function addStandardDelayTime() {
            // addStandardDelayTime.defaultFx = true
            var delayTime = sh.dv(tH.test.delayTime, 10)
            setTimeout(tH.test.cb, delayTime)
        },offset)
        tH.test.data.lastMethodAdded.defaultFx = true;


        //console.error('defaultAddNext', 'tH.defaultAddNextOffset', tH.defaultAddNextOffset)

        var ui = $('#divContainerTest');
        var div = $('<div/>');
        var t = uiUtils.tag('table')
        //ui.append(div)

        tH.data.stepCount ++
        div.append('step ' + tH.data.stepCount)
        div.append(t)
        $.each(tH.test.methods, function addEachStep(k,m) {
            if ( m.fx.defaultFx == true ) {
                return;
            }
            var tr = uiUtils.tag('tr')
            var td = uiUtils.tag('td')
            tr.append(td);
            t.append(tr)
            td.append(m.fx.name  )

            var td = uiUtils.tag('td')
            tr.append(td);
            td.append(  m.fx.yData)
            // debugger
        })
        ui.append(div)

        //lastFx.fxDesc = 'standardDelayTime'
    }
    tH.add = tH.addTestStep;

    tH.addStep = function addStep(fx) {

        if ( fx.name == null || fx.name == '' ) {
            throw new Error ('name this')
        }
        //console.error('what is nane', fx.name)
        function tH_addStep_fx2() {
            tH.setDefaultAddNext()

            fx()
            tH.resetDefaultAddNext();
        }

        tH.addTestStep(tH_addStep_fx2)

    }

    if ( tH.data.stepCount == null ) {
        tH.data.stepCount = 0;
    }
    $('#divContainerTest').html('')

    tH.addSync = function addSyncFunction(fx, setupDefault, error) {
        var addFx = tH.test.addSync;

        if ( setupDefault != false ) {
            var oldFx = fx;
            function outerWrapper() {
                tH.setDefaultAddNext();
                oldFx();
                tH.resetDefaultAddNext()
            }
            fx = outerWrapper;
        }
        //if ( tH.defaultAddNext ) {
        /* tH.test.addNext(function syncNext(){
         fx()
         tH.test.cb();
         })
         return;*/
        //}
        tH.addTestStep(fx, null, true)
        //addFx(fx, null);
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



    var urlBase = 'test3/'
    if ( window.preamble ) {
        urlBase = window.preamble;
    }

    if ( window.location.pathname ) {
        if ( window.location.pathname.includes('test3/')) {
            urlBase = '';
        }
    }

    tH.data.urlBase = urlBase


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

        console.log('addLogPanel')

        $('#txtInvokeCount').text(' ('+window.testHelper.data.invokeCount+')');
        //console.error('txtInvokeCount', window.testHelper.data.invokeCount);

        tH.data.origTestLogPanelBgcolor = '#f2f2f2';


        var isHere = $('#annotation').length
        if ( isHere > 1 ) {

        } else {
            var annotation = $('<img/>')
            annotation.attr('src', urlBase+'images/cursor-png.png')
            $('body').append(annotation)
            annotation.attr('id','annotation')
            uiUtils.makeAbs(annotation, 100)
            annotation.addClass('transitionAll');
            annotation.css('z-index',  10002)
            annotation.css('transition','all 0.1s ease-out')
            annotation.hide();
        }

        $('#annotation').hide(); //if already on page
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
            '<div id="logTable"></div> ' +
            '<div id="logMsgNow"></div> ' +
            '  </div>');
        $('body').append(panel)
        panel.find('#logMsgNow').css('border-top', 'solid 1px #666666');
        panel.css('max-width', '350px')
        panel.css('min-width', '350px')
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
        uiUtils.centerVertically()
        uiUtils.flagCfg = {};
        uiUtils.lastUI.addClass('unselectable')
        uiUtils.lastUI.css('z-index', 500000)
        //uiUtils.flagCfg.id = cfg.id;
        uiUtils.flagCfg.addTo = $(cfg.id);


        uiUtils.flagCfg.addTo.css('transition','all 0.1s ease-out')

        var div = $('<div></div>')
        div.css('width', '100%')
        div.css('height', '10%')
        window.uiUtils.flagCfg.addTo.append(div)
        div.css('background', 'black');
        div.css('opacity', 0.3);
        div.css('position', 'absolute');
        div.css('left', '0px');
        div.css('bottom', '0px');
        div.attr('id', 'testTransportPanelProgress')
        div.css('transition','all 0.1s ease-out')
        //uiUtils.copySize(div);

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
        window.uiUtils.addTooltip('Pause Test')
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
            window.testHelper.transport.status = 'stopped';
            uiUtils.disable('#btnPause');
            uiUtils.disable('#btnStop');
            tH.fail('Tested Ended...')
        });

        window.uiUtils.addImage( urlBase+'images/rewind.png', 'btnRewind')
        window.uiUtils.addTooltip('Rewind/Retry')
        window.uiUtils.addClick(function onRewind(){
            window.testHelper.rerunLastTest();
        });


        window.uiUtils.ws()
        uiUtils.wH(10)

//        debugger;

        uiUtils.addSpan();

        //window.uiUtils.pad(0,0,0,10)
        //uiUtils.bg('red')
        uiUtils.changeContainer();

        window.uiUtils.addLabel( '0', 'txtCurrentStepIndex');
        var txtCurrentStepIndex = uiUtils.getLast();
        uiUtils.color('black')
        uiUtils.tooltip('Current Index')
        window.uiUtils.addLabel( '/' );
        window.uiUtils.addLabel( '0', 'txtTotalStepsCount');
        window.uiUtils.addLabel( ' ', '');
        window.uiUtils.addLabel( '0', 'txtPercentPadding');
        window.uiUtils.addLabel( '0', 'txtPercent');
        uiUtils.popContainer()

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
            uiUtils.enable('#btnPlay');
            uiUtils.disable('#btnPause');
            uiUtils.disable('#btnStop');
            uiUtils.disable('#btnRewind');
        }

        window.testHelper.transport.finishFailed = function finishedFailed() {
            window.testHelper.transport.status = 'stopped'
            uiUtils.disable('#btnPlay');
            uiUtils.disable('#btnPause');
            uiUtils.disable('#btnStop');
            uiUtils.color(txtCurrentStepIndex, '#CB0300')
            //  uiUtils.disable('#btnRewind');
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
    function click(strOrJ, parentJ) {
        function clickAction() {

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
            } else if ( strOrJ.jquery && parentJ == null ) {
                element = strOrJ; //$(strOrJ)
            } else {
                var element = tH.findByContent(strOrJ, parentJ);
            }

            if ( element != null &&
                element.length == 0 &&
                $.isString(strOrJ) &&
                strOrJ.charAt(0)=='#') {
                element = $(strOrJ)
            }

            if ( element == null ||element.length == 0  ) {
                //
                element = {length:'null'};
                console.info('Element is null', strOrJ )
            } else {

                //debugger;
                //TODO: fail if do not find object?
                //Optional ? ... never used too much cognitive load ..
                //if need to verify if exists, then verify
                element = tH.utils.filterVisible(element)



                if ( tH.settings.clickAsRed ) {
                    var firstElement = element[0]
                    var firstElementUI = $(firstElement);
                    firstElementUI.css('color', 'red');
                    var originalColor =  firstElementUI.css('color');
                }
                if ( element.length > 1 ) {
                    console.error('ele', element, 'moving', strOrJ, parentJ )
                }


                var timeMouseClickAnimation = 500
                if ( tH.settings.hoverOnClick == true ) {
                    element.mouseover();

                    element.hover();
                    element.mouseenter();

                    var origBackground = element.css('background-color');
                    //element.css('background-color', '#013461')

                    if ( origBackground ){
                        origBackground = null;
                    }

                    tH.moveCursorTo(element) ; //move to cursor

                    var annotation = $('#annotation')
                    annotation.css('opacity', 0.4)
                    annotation.css('border-bottom', 'solid 10px #013461' )

                    setTimeout(function animateClickAction() {
                        annotation.css('border-bottom', '' )
                        annotation.css('opacity', 1)
                    }, 200)

                    setTimeout(function () {
                        element.click();
                        element.mouseout()
                        element.mouseleave();

                        element.css('background-color',origBackground);

                        var m = $('.' + tH.data.blueAreaClass)
                        m.remove();

                    }, timeMouseClickAnimation)
                }
                else {
                    tH.moveCursorTo(element) ;
                    element.click();
                }


            }
            console.debug('clickAction', strOrJ, 'el',  element.length)

            tH.logNow.nextClick();

            var nameForLog = strOrJ
            if ( strOrJ.name ) {
                nameForLog = strOrJ.name
            }
            if ( strOrJ.jquery ) {
                nameForLog = strOrJ.text().trim().slice(0,25        )
            }
           // debugger;
            tH.logNow(/*'---', 'clickAction',*/ nameForLog, parentJ, element.length)

            if ( element.length == 0 || element.length == null ) {
                console.warn('\t','clickActionDidNotfind', strOrJ, parentJ, 'not found')
                console.warn('clickAction', strOrJ, 'el', 'has more than 1 result', element.length)
                tH.logNow.nextIndent();
                tH.logNow.nextWarning();
                tH.logNow('too many items', strOrJ, 'has more than 1')
            }

            if ( element.length > 1) {
                console.warn('clickAction', strOrJ, 'el', 'has more than 1 result', element.length)
                tH.logNow.indentNext
                tH.logNow.nextWarning();
                tH.logNow('too many items', strOrJ, 'has more than 1')
            }

            if ( tH.settings.hoverOnClick == true ) {
                setTimeout(function () {
                    tH.test.cb();
                }, timeMouseClickAnimation)
            } else {
                tH.test.cb();
            }
        }
        clickAction.fxDesc = uiUtils.args(arguments).join(' ')

        tH.add(clickAction)
    }
    tH.click = click;
    tH.clickNext = function clickNext() {
        tH.setDefaultAddNext();
        var args = uiUtils.args(arguments)
        tH.click.apply(this, args)
        tH.resetDefaultAddNext();
    }

    tH.utils = {}
    tH.utils.filterVisible = function filtervisible(element) {
        var elementFiltered = elementFiltered;
        if ( tH.settings.onlyVisibleItems ) {
            elementFiltered = element.filter(':visible')
            elementFiltered = elementFiltered.filter(function() {
                var opacity = $(this).css('opacity')
                if ( opacity == false ) { return false; }

                var ui = $(this)
                var parents = ui.parents();
                elementFiltered = parents.filter(function() {
                    return $(this).css('opacity') == '0';
                });

                if ( elementFiltered.length > 0 ) {
                    return false;
                }
                return true;
            });
        }
        return elementFiltered
    }
    tH.utils.remove = function remove() {
        var m = $('.' + tH.data.blueAreaClass)
        m.remove();
    }
    tH.clickNow = function clickNow(strOrJ, parentJ, tryText ) {
        //why: click but do not navigte
        var element = $(strOrJ);
        if ( element.length == 0 && tryText != false ) {
            var element = tH.findByContent(strOrJ, parentJ);
        }

        element = tH.utils.filterVisible(element)


        if ( tH.settings.clickAsRed ) {
            var firstElement = element[0]
            var firstElementUI = $(firstElement);
            firstElementUI.css('color', 'red');
        }
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
            element = tH.utils.filterVisible(element)
            if ( element[0] == null || element[0].click == null ) {
                console.error('no match for', strOrJ)
            }



            if ( tH.settings.clickAsRed ) {
                var firstElement = element[0]
                var firstElementUI = $(firstElement);
                firstElementUI.css('color', 'red');
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

            element = tH.utils.filterVisible(element)
            if ( tH.settings.clickAsRed ) {
                var firstElement = element[0]
                var firstElementUI = $(firstElement);
                firstElementUI.css('color', 'red');
            }

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
    tH.dbg = tH.l = tH.trace = tH.log3 = tH.logNext = tH.logNextLink;

    tH.msgStatus = function msgStatus(str) {
        var args = sh.convertArgumentsToArray(arguments)
        if ( args.length > 0 )
            str = args.join(' ');
        $('#testLogPanel').show()
        uiUtils.scrollToBottom('#testLogPanel')
        //debugger
        $('#logMsgNow').html(str)
    }

/*
    function defineSimpleLoggingMethods() {
        tH.logNow = function logCurrently(str) {
            var args = sh.convertArgumentsToArray(arguments)
            if (args.length > 0)
                str = args.join(' ');
            // function log() {
            // console.log('logged',str)
            $('#testLogPanel').show()
            /!*
             $('#testLogPanel').animate({
             scrollTop: $(jquery).offset().top
             }, 300);*!/
            uiUtils.scrollToBottom('#testLogPanel')

            //debugger
            $('#logCurrent').html(str)
            if (tH.lastStr !== null) { //why this crazyiness?
                //console.log(lastStr)
                var container = $('#logPrevious')
                if (container.length == 0) {
                    console.log('asdf', container, 'is embty')
                }
                container.append('<div>' + tH.lastStr + '</div>')
            }
            tH.lastStr = str;
            //  tH.test.cb();
            //   }
        }
        tH.log2 = tH.log = tH.logNow;
    }
*/

    function defineAdvLoggingMethods() {
        tH.logNow = function logCurrently(options, str) {
            var args = sh.convertArgumentsToArray(arguments)
            if (args.length > 0) {
                str = args.join(' ');
            }

            var u = uiUtils;

            if ($.isObject(options)) {
                if (args.length == 1 && options.str) {
                    str = options.str
                }
                str = args.slice(1).join(' ');
            } else {
                options = {}
                options.str = str;
            }

            var testLogPanel = $('#testLogPanel');

            // function log() {
            // console.log('logged',str)
            testLogPanel.show()
            /*
             $('#testLogPanel').animate({
             scrollTop: $(jquery).offset().top
             }, 300);*/
            uiUtils.scrollToBottom('#testLogPanel')

            //debugger


            var testLogTable = 'testLogPanelTable'
            var existingTable = $('#' + testLogTable);
            //if (tH.test.data.table == null) {

            if ( tH.test && tH.test.data.table == null ) {
                tH.test.data.table = tH.data.table
                tH.data.table = null //fix annoyance
            }

            if (tH.data.table == null) {
                tH.data.logging = {};
                tH.data.logging.tab = 0
                tH.data.logging.indent = function (why) {

                    //debugger
                    tH.data.logging.tab++
                    console.debug('tabi', tH.data.logging.tab, why)
                }
                tH.data.logging.outdent = function (why) {
                    //debugger
                    tH.data.logging.tab--
                    console.debug('tabo', tH.data.logging.tab, why)
                }

                if (existingTable.length == 0) {
                    u.addTo(testLogPanel.find('#logTable'));
                    // debugger
                    tH.data.table = u.make({tag:'table'}).ui;
                    u.setId(testLogTable);
                } else {
                    tH.data.table = existingTable
                }
                tH.data.table.html('')

                //tH.test.data.table = $('#' + testLogTable);
            } else {
                //csv convertor logs before panel is created
                if (tH.data.table.length == 0) {
                    tH.data.table = existingTable
                }
            }

            u.addTo(tH.data.table)
            u.make({tag:'div'})
            //u.make({tag:'tr'})
            // u.addTo(tH.data.table)
            u.addToLast()

            //u.flagCfg.addClass = 'tdCell'

            var tdBase = {}
            tdBase.addStyles = {width:'25px'}
            tdBase.addClass = 'tdCell'

            u.make({tag:'td', text:options.number}, tdBase)
            if (tH.data.logging.tab > 0 ) {
                //debugger
                //u.makeA('div')
                //u.pad(10*tH.data.logging.tab)
                //u.lastUI.css('padding-left', 10*tH.data.logging.tab+'px')
            }
            var tempIndent= 0;
            if ( tH.data.nextIndent ) {
                tH.data.nextIndent =null;
                tempIndent+=1;
            }

            if ( tH.data.logging.tab + tempIndent > 0 ) {
                //debugger
                //u.makeA('div', {prepend:true})
                //debugger
                //u.makeA('div' ,{addTo:uiUtils.lastUI,
                //    prepend:true})
                u.pad(10*tH.data.logging.tab)

                // u.wH(10*tH.data.logging.tab, 10)
                //u.bg('red')
                //u.removeWrap()
                //u.lastUI.css('padding-left', 10*tH.data.logging.tab+'px')
            }
            //u.flagCfg.addClass = null;

            //u.flagCfg.addStyles = {width:'25px'}

            u.make({tag:'td', text:tH.data.timePast}, tdBase)

            u.make({tag:'td', text:options.type}, tdBase)
            if ( tH.data.nextIndent ) {
                tH.data.nextIndent =null;
                tempIndent+=1;
            }
            if ( tH.data.nextWarning ) {
                //debugger
                tH.data.nextWarning =null;
                u.makeA('img' ,{addTo:uiUtils.lastUI,
                        prepend:true})
                var img = uiUtils.lastUI
                img.attr('src', tH.data.urlBase+'images/icons/warning.png')

            }
            if ( tH.data.nextFx ) {
                //debugger
                tH.data.nextFx =null;
                u.makeA('img' ,{addTo:uiUtils.lastUI,
                        prepend:true})
                var img = uiUtils.lastUI
                img.attr('src', tH.data.urlBase+'images/icons/function.png')

            }
            if ( tH.data.nextClick ) {
                //debugger
                tH.data.nextClick =null;
                u.makeA('img' ,{addTo:uiUtils.lastUI,
                    prepend:true})
                var img = uiUtils.lastUI
                img.attr('src', tH.data.urlBase+'images/icons/mouse-pointer.png')

            }

            tdBase.addStyles = {}
            u.make({tag:'td', text:options.str}, tdBase)


            //u.flagCfg.addStyles = {}

            return;



            //debugger
            $('#logCurrent').html(str)
            if (tH.lastStr !== null) {
                //why this crazyiness? 4-13-17: log after appearnce
                //console.log(lastStr)
                var container = $('#logPrevious')
                if (container.length == 0) {
                    console.log('asdf', container, 'is embty')
                }
                container.append('<div>' + tH.lastStr + '</div>')
            }
            tH.lastStr = str;
            tH.logNow.lastItem = options;
            // tH.test.cb();
            // }
        }

        tH.logNow.nextIndent = function nextIndent() {
            tH.data.nextIndent = true;
        }
        tH.logNow.nextWarning = function nextWarning() {
            tH.data.nextWarning = true;
           // debugger
        }
        tH.logNow.nextClick = function nextClick() {
            tH.data.nextClick = true;
        }
        tH.logNow.nextFx = function nextFx() {
            tH.data.nextFx = true;
        }
        tH.log2 = tH.log = tH.logNow;
    }
    defineAdvLoggingMethods()

    if ( tH.settings.logIsLowNow) {
        tH.log2 = tH.log = tH.logNow;
    } else {
        tH.log = tH.logNextLink;
    }


    tH.callFxX = function callFx(evalName, rest_args) {
        if ( evalName == null ) {
            console.error('need a name for')
        }
        var evalTxt =  window.testHelper.data.dictEvalFx[evalName];
        if ( evalTxt == null ) {
            console.error('could not find evalFx in stored', evalName)
            return;
        }

        var args = uiUtils.args(arguments)
        // args.shift();


        tH.add(function callFx() {
            tH.data.logging.indent()
            //  tH.add(function runEval_Later() {
            tH.logNow('running stored fx', evalName)

            //console.debug('running stored fx', evalName, evalTxt.trim(), v.args)

            var strs = [];
            $.each(args, function copyArg(k,v) {
                if ( k == 0 ) { return } //skip evalName
                var str = 'var arg'+(k) + ' = ' + '"'+v+'"'
                //  console.debug('str', k, str)
                strs.push(str)
            })


            console.debug('||running stored fx', evalName, strs )

            var codeStr_CreateArgs = strs.join('\n')
            //console.debug('code',codeStr_CreateArgs)
            eval(codeStr_CreateArgs)
            // console.log('arg1', arg1, 'arg2', arg2 )
            tH.setDefaultAddNext()
            eval(evalTxt);
            tH.resetDefaultAddNext()
            tH.test.cb();
            // })
            tH.data.logging.outdent()
        })

    }

    tH.fx = function fx(fxName, restargs) { //find based on jquery
        // if ( v.fx == 'fx' || v.fx == 'fxasync') {
        var evalName = fxName
        if ( evalName == null ) {
            console.error('need a name for', v)
            tH.fail('Cannot start test. failed to find fx named',
                JSON.stringify(v)
            )
            return;
        }
        var evalTxt =  window.testHelper.data.dictEvalFx[evalName];
        var fxInfo =  window.testHelper.data.dictEvalFx2[evalName];
        if ( evalTxt == null ) {
            console.error('could not find evalFx in stored', evalName)
            tH.fail('Cannot start test. failed to find fx named', sh.qq(evalName))
            throw new Error('cant find')
            return;
        }

        var v = fxInfo;
        v = sh.clone(fxInfo); //clone so areguments are different ecah time
        v.args = uiUtils.args(arguments)

        console.error('what mode', evalName, tH.defaultAddNext,
            tH.defaultAddNextOffset, v.args)
        function dAddNextOffsetnEval_Later() {
            tH.data.logging.indent();
            tH.logNow.nextFx();
            var invokedArgs = v.args.concat();
            if ( invokedArgs[0] == evalName ) { //remove first arg as it is same as evalName
                invokedArgs.shift()
            }
            tH.logNow( '||-f', uiUtils.b(evalName), uiUtils.paren(v.line), tH.defaultAddNextOffset, invokedArgs.join(' '))
    

            //console.debug('running stored fx', evalName, evalTxt.trim(), v.args)
            console.debug('running stored fx', evalName, v.args)

            var strs = [];

            var argumentsToDef = v.args;
            if  ( v.args.args ) {
                argumentsToDef = v.args.args;
                argumentsToDef.unshift(evalName) ; //inputs are consistent
            }
            //debugger


            var argVals = [];
            $.each(argumentsToDef, function copyArg(k,v) {
                if ( k == 0 ) { return } //skip evalName
                var str = 'var arg'+(k) + ' = ' + '"'+v+'"'
                var origArg = v;
                //  console.debug('str', k, str)
                strs.push(str)
                //debugger
                if ( $.isNumeric(v) == false ) {
                    v = sh.qq(v)
                }
                if ( origArg === "true" || origArg === true ) {
                    v = true
                }
                if ( origArg === "false" || origArg === false ) {
                    v = false
                }
                //
                argVals.push(v)
            })

            var codeStr_CreateArgs = strs.join('\n')
            //console.debug('code',codeStr_CreateArgs)
            eval(codeStr_CreateArgs)

            if ( fxInfo && fxInfo.needSignatureCalled ) {
                //asdf.g
                evalTxt += '\n'
                var runFxEvalStr = evalName + '('+argVals.join(',') +')';
                evalTxt += '\n'+runFxEvalStr;
            }

            // console.log('arg1', arg1, 'arg2', arg2 )
            try {
                tH.setDefaultAddNext()
                tH.data.logging.indent();
                tH.data.logging.indent();
                eval(evalTxt);
                //debugger
                //tH.data.logging.outdent();
                tH.resetDefaultAddNext()
            } catch ( e ) {
                //debugger
                console.error('error running eval', evalName)
                console.error(e)

                window.e = e;
                console.error('full listing', '\n\t',
                    evalTxt.trim())

                // console.error(e.stack)
                tH.logNow('error in fx', sh.qq(evalName))
                tH.logNow(e)
                tH.logNow(e.stack)
                try {
                    tH.fail('see above')
                } catch ( e ) {
                }


                eval(evalTxt);
            }

            if ( v.fx != 'fxasync') { //how to set? ...have different callback
                tH.test.cb();
            }
            tH.data.logging.outdent();
        }

        if ( tH.data.nextIsNow ) {
            dAddNextOffsetnEval_Later()
            return;
        }
        tH.add(dAddNextOffsetnEval_Later)

        tH.add(function backOutDent() {
            tH.data.logging.outdent();
            tH.data.logging.outdent();
            tH.test.cb()
        })

        dAddNextOffsetnEval_Later.yData = evalName;
        //dAddNextOffsetnEval_Later.yData = '4444'
        return;
        //  }
    }
    tH.fxNow = function fxNow(fxName, restargs) {
        tH.data.nextIsNow = true;
        var args = uiUtils.args(arguments)
        tH.fx.apply(this, args)
    }

    function wait(waitTime) {
        if ( $.isString(waitTime ) ) {
            waitTime = parseFloat(waitTime)
        }
        tH.add(function waitLinkTime() {
            setTimeout(function resumeTest(){
                tH.test.cb();
            }, waitTime* 1000);
        })
    }
    wait.desc = 'Wait x seconds'
    tH.wait = wait;
    function waitFor(fx, maxTimes, delay, failWhenDone) {
        if (  tH.data.maxTimesNext ) {
            maxTimes = sh.dv(maxTimes,
                tH.data.maxTimesNext)
            tH.data.maxTimesNext = null;
        }
        maxTimes = sh.dv(maxTimes, 10)
        delay = sh.dv(delay, 250)
        failWhenDone = sh.dv(failWhenDone, true);


        var dbgWait = false;
        dbgWait = true

        if ( tH.waitForError ) {
            //console.error('waitFor', tH.waitForError);
            var waitForError = tH.waitForError;
        }
        //debugger
        //console.error('what is the thtoken','1', tH.test.token)
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


                var waitForError_withoutStackTrace = waitForError
                var splitAt = 'Error' //'at Object.w'
                if ( waitForError && waitForError.includes(splitAt)) {
                    waitForError_withoutStackTrace = waitForError.split(splitAt)[0] //remove stack trace
                }


                if ( innerT.iteration != 0 && innerT.iteration % 10 == 0 ) {
                    tH.logNow('____','still waiting for', waitForError_withoutStackTrace)
                }

                console.log(fx.name, innerT.iteration, result, waitForError_withoutStackTrace)

                if ( result != true ){
                    if (lastAttempt) {
                        if ( failWhenDone ) {
                            if ( waitForError ) {
                                console.error('waitFor', waitForError);
                                //tH.waitForError = null;
                            }

                            window.fxFailed = fx;
                            var msg =  ['failed on thing ',fx.name,
                                waitForError,
                                innerT.iteration ,
                                innerT.maxIterations].join(' ');

                            tH.fail(msg)
                            throw new Error(
                                msg
                            )

                        } else {
                            if ( tH.testWaitforfxFail) {
                                //debugger;
                                tH.testWaitforfxFail()
                            }
                            //debugger
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
                    // console.error('what is the thtoken', tH.test.token)
                    tH.test.cb();
                }
            }
            function addWaitForDelay () {
                setTimeout(innerT.cb, delay)
            }

            innerT.addNext(testWaitForCondition)
            innerT.addNext(addWaitForDelay)
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
        if ( errorArr.join ) {
            errorArr = errorArr.join(' ')
        }
        var args = uiUtils.args(arguments)
        errorArr = args.join(' ')
        tH.logNow('  ')
        tH.logNow(' ');
        tH.logNow('_________');
        tH.logNow('Test Failed', errorArr, asdf, tH.waitForError, tH.stepError)
        $('#testLogPanel').css({'background-color':'#F9C09D'});
        $('#testTransportPanel').css({'background-color':'#F9C09D'});
        window.testHelper.transport.finishFailed();
        tH.test.isPlaying = false;
        tH.test.stop();
        var annotation = $('#annotation')
        annotation.hide();

        throw new Error(errorArr)

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
    tH.waitForHide = function waitForHide(jquery, waitForFailureReason, parentJq) {
        var dbgWait = false;
        if ( waitForFailureReason )
            tH.waitForError = waitForFailureReason + ' (waitForHide) ' + jquery
        tH.waitFor(function isUIHidden(){ //waitForHide
            //var jquery = tH.convertJquery(jquery)
            var jq = tH.convertJquery2(jquery)
            if ( jq.length == 0 || parentJq !=  null ) {
                jq = testHelper.findByContent(jquery, parentJq, true )//try to search for name)
            }
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


    tH.waitForNone = function waitForNone(jquery, waitForFailureReason, parentJq) {
        var dbgWait = false;
        if ( waitForFailureReason )
            tH.waitForError = waitForFailureReason + ' (waitForHide) ' + jquery
        tH.waitFor(function isUIHidden(){ //waitForHide
            //var jquery = tH.convertJquery(jquery)
            var jq = tH.convertJquery2(jquery)
            if ( jq.length == 0 || parentJq !=  null ) {
                jq = testHelper.findByContent(jquery, parentJq, true )//try to search for name)
            }
            if ( jq.length == 0 ) {
                if ( dbgWait ) {
                    console.log('none found, so all good', jq, opacity, isVislbe)
                }
                return true
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


    tH.waitForShow = function waitForShow(jquery, waitForFailureReason, parentJq, times ) {

        var s = new Error().stack
        var stepMsg = [waitForFailureReason,'(waitForShow) ',
            jquery, parentJq, s].join(' ')

        /* if ( waitForFailureReason ) {
         tH.waitForError = [waitForFailureReason,'(waitForShow) ',jquery, parentJq].join(' ')
         }
         else {
         tH.waitForError = '' + ' (waitForShow) ' + jquery
         }*/
        tH.waitForError = stepMsg;
        tH.waitFor(function isDialogVisible_waitForShow(){ //waitForHide
            try {
                var jq = tH.convertJquery2(jquery)
            } catch (e) {
                console.error('could not convert', e, 'is bad name?')
            }
            if ( jq.length == 0 || parentJq != null ) {
                jq = testHelper.findByContent(jquery, parentJq)//try to search for name)
            }
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
            return true==$(jq).is(":visible");
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


    tH.set = function setTextField(jquery, text, _pretendToType) {
        var pretendToType = tH.settings.pretendToType;
        if ( _pretendToType ){
            pretendToType = false
            if ( _pretendToType == true || _pretendToType == 'true') {
                pretendToType = true
            }
        }
        tH.runAsync(function setText() { //verify more than 6
            // debugger;
            if ( $.isFunction(jquery)) {
                element = jquery();
            }  else {
                var element = $(jquery)
            }
            element = tH.utils.filterVisible(element)
            if ( element.length == 0 ) {
                tH.fail('did not find items for',sh.qq( jquery), 'set to',sh.qq( text) )
            }

            var setHelper = sH = {};
            sH.data = {};
            sH.focusIn = function focusIn() {
                element.focus();
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
                element[0].dispatchEvent(e)

                sH.setValue();

                sH.data.originalBoxShadow = element.css('box-shadow')
                element.css('box-shadow','0px 0px 4px #666666');

            }
            sH.setValue = function setValue() {

                //element.keyup();
                tH.moveCursorTo(element);
                console.log('setting ', jquery, 'to text()')
                if ( pretendToType != true ) {
                    element.val(text)
                    element.change();
                    sH.focusOut();
                } else {
                    var chars = [];
                    for ( var i = 0; i < text.length; i++ ) {
                        chars.push(text.charAt(i))
                    }
                    element.val('')
                    $.each(chars, function onEachChar(i, char ) {
                        setTimeout(function typeChar() {
                            var textSt = text.slice(0,i+1)
                            console.log('textSt', i, text.length, textSt)
                            element.val(textSt)
                            element.keydown();
                            element.keypress();
                            element.keyup();
                            //element.blur();
                            element.change();
                            if ( i == text.length -1 ) {
                                sH.focusOut();
                            }
                        }, 140*i);
                    })
                }

            }
            sH.focusOut = function focusOut() {

                var e = new Event("keyup");
                e.key="a";    // just enter the char you want to send
                e.keyCode=e.key.charCodeAt(0);
                e.which=e.keyCode;
                e.altKey=false;
                e.ctrlKey=true;
                e.shiftKey=false;
                e.metaKey=false;
                e.bubbles=true;
                element[0].dispatchEvent(e)

                element.focusout();
                element.blur();
                element.css('box-shadow',sH.data.originalBoxShadow);
                sH.nextLinkInChain();
            }

            sH.nextLinkInChain = function nextLinkInChain() {
                setTimeout(function waitToContinue(){
                    tH.test.cb();
                }, 500)
            }

            sH.focusIn()



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
        //on_finishedTest
        tH.run(function makeGreen() { //verify more than 6
            $('#testLogPanel').css({'background-color':'#C3E5C4'});
            debugger;
            window.location.hash =tH.windowLocationHash;
        });
    }



    /* tH.evalFx = function evalFx() {
     tH.run(function makeGreen() { //verify more than 6
     $('#testLogPanel').css({'background-color':'#C3E5C4'});
     debugger;
     window.location.hash =tH.windowLocationHash;
     });
     }*/


    tH.moveCursorTo = function moveCursorTo(jquery) {
        var jqueryOrig = jquery;
        //todo have another annotation ... that is blue area to show click spot
        //prob move cursor to far right
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

            //  if ( jquery.offsetWidthForAnnotation ) {
            //   position.left += element.width(); //yes, go to left when element are passed in
            //  }
        }



        if ( position == null ){
            console.warn('failed to cursor to ', jquery, 'position was null')
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

        if ( position.left != null ) {
            position.left += element.width();
            position.left -= 0.1*element.width(); //nudge over so inside component
            // position.left -= 10;
        }



        position.top += 10;

        // console.log('where is', jquery, position)
        annotation.css(position)




        if ( position.top < 11 || position.left < 11 ) {
            //console.error('moving to','odd position',
            //jquery, position, element)
        }


        //element.find('.'+tH.data.blueAreaClass).remove();
        if ( tH.data.dictBlueAnnotations == null ) {
            tH.data.dictBlueAnnotations = {};
        }

        var annotationHelper = aH = {};
        aH.clerAnnotations = function clerAnnotations() {
            var m = $('.' + tH.data.blueAreaClass)
            m.remove();
        }
        aH.addAnnotations = function addAnnotations() {
            var prevAnnoations = tH.data.dictBlueAnnotations[jqueryOrig]
            prevAnnoations = jquery[0].prevAnnoations;
            $.each(jquery, function removePrevAnno(k, ui) {
                // console.debug(k, ui)
                var prevAnnoations = ui.prevAnnoations;
                if (prevAnnoations) {
                    //   console.debug('oooo')
                    prevAnnoations[0].remove();
                }
                if ($(ui).hasClass(tH.data.blueAreaClass)) {
                    // console.debug('has a thing', ui)
                    $(ui).text('asdfasdf')
                    //  $(ui).remove();
                    // $(ui).empty()
                    ui.remove()
                }
            })

            var m = jquery.find('.' + tH.data.blueAreaClass)
            m.remove();
            m.empty()
            //console.debug('first arr', prevAnnoations, jquery.length, jquery[0].prevAnnoations, m)
            if (prevAnnoations) {
                //prevAnnoations.remove();
                //asdf.g
                prevAnnoations[0].remove()
                prevAnnoations.empty()
            }

            //  debugger;

            var firstElement = $(element[0]) //important or we will duplicae extra items
            firstElement.css('color', 'orange');
            uiUtils.reset();
            var blueArea = uiUtils.addFloatingDiv()
            blueArea.css('z-index', 100000)
            //var blueArea = uiUtils.getLast();
            blueArea.addClass(tH.data.blueAreaClass)
            uiUtils.opac(0.3)
            uiUtils.bg('#002F64')
            uiUtils.copySize(firstElement, blueArea)
            uiUtils.copyPosition(firstElement, blueArea)
            var firstElementClone = firstElement.clone();
            firstElementClone.css('color', 'orange');
            blueArea.append(firstElementClone)
            //return
            uiUtils.addOverlay(blueArea, '#002F64');
            uiUtils.bg('#002F64')

            jquery[0].prevAnnoations = blueArea;
            tH.data.dictBlueAnnotations[jqueryOrig] = blueArea;
            uiUtils.reset();
        }
        aH.clerAnnotations();
        aH.addAnnotations();

        setTimeout(aH.clerAnnotations, 100)
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


tH.runTest = function runTest(testName, arg1, arg2, arg3) {
    if ( tH.test ) {
        tH.test.stop();
        console.debug('stopped old test', tH.test)
    }
    tH.currentTestName = testName;
    window.lastRunTestName = testName;


    if ( tH.settings.doNotUpdateArgsOnNextTest_changeOnNext ) {
        tH.settings.doNotUpdateArgsOnNextTest = false;
    }
    var definitionTest = 'defs.js.txt'

    if ( arg1 && arg1.includes(definitionTest)) {
        tH.settings.doNotUpdateArgsOnNextTest = true; //reload rela test when defs changed
        setTimeout(function onReload(){
            if ( window.lastRunTestName && window.lastRunTestName.includes(definitionTest)) {
                return;
            }
            console.info('got a def, so rerunning last test')
            tH.rerunLastTest()
        }, 1000)
    }

    if ( tH.settings.doNotUpdateArgsOnNextTest == true  ) {
        tH.settings.doNotUpdateArgsOnNextTest_changeOnNext = true;
    } else {
        window.lastRunArg1 = arg1;
        window.lastRunArgs = uiUtils.args(arguments)
        uiUtils.addToUrl('testName', testName)
        uiUtils.addToUrl('arg1', arg1, true)
    }

    window.tests[testName](tH, arg1, arg2, arg3);


    // tH.settings.doNotUpdateArgsOnNextTest = false;
    //debugger;
    // window.testHelper.fxStartNextTest();
}

tH.rerunLastTest = function reRunLastTest() {
    tH.runTest(window.lastRunTestName, window.lastRunArg1);
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
            testDelay = tH.settings.defaultTestDelay;
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

    window.tests.testCSV = function define_testCSV(tH, urlX, urlConst, skipRun) {
        //var i = new TestCSV()
        var i = new TestCSVConvertor();
        // i.getTestScript('csvScripts/testCSVScript.txt', onGot)
        //var url = 'csvScripts/testCSVScript.txt';
        var lastArg1 = uiUtils.getUrlVal('arg1')

        if ( urlX == null && lastArg1 ){
            console.debug('using last var', lastArg1)
            urlX = lastArg1;
        }
        var url = 'csvScripts/test.txt';
        if ( urlX && urlX.startsWith('http') == false ) {
            url = urlX;
            url = urlBase=urlX.split('test3/')[1]
        }

        if ( window.preamble ) {
            url = window.preamble + url
        }
        if ( urlX ) {
            if ( urlX.startsWith('http') == true) {
                url = urlX;
            } else {
                if ( window.preamble) {
                    url = window.preamble + urlX;
                }
            }
            if ( window.preamble
                && window.preamble.length > 0 &&
                urlX.startsWith(window.preamble) == true) {
                url = urlX; //why: ok b/c proper starting char
            }
        }


        if (urlConst) {
            url = urlConst;
        }

        lastArg = url;
        if (url && url.startsWith(window.preamble)) {

            lastArg = url.replace(window.preamble, '')

        }
        //  debugger
        if ( skipRun != true && tH.settings.doNotUpdateArgsOnNextTest != true)
            uiUtils.addToUrl('arg1', lastArg)


        var fileUrl = '';
        if ( url ) {
            var fileUrl = url.split('/')
                .slice(-1)
                .join('/')
        }
        tH.logNow('url:', fileUrl)

        console.log('url:', url)

        if ( window.testStop ) {
            window.testStop()
        }
        //end the current test
        //tH.

        // debugger
        i.loadScript2(url, onGotItem2_Redirect, fxFail)
        function onGotItem2_Redirect(objs, str, txt) {
            try {
                onParseTestItems(objs, str, txt)
            } catch ( e ) {
                console.error('Error', 'issue parsing test')
                console.error(e)
            }
        }

        function fxFail() {
            tH.fail('could not load the url', url)
        }

        function onParseTestItems(objs, str,txt) {
            var t = tH.createNewTest();
            //convertor(contents)
            // debugger
            console.log('objs', objs)
            $.each(objs, function onAddConvertedTestStep(k,v) {
                var fx = v[v.fx]
                var fx = tH[v.fx]
                if ( v.fx =='evalFx') {


                    var evalName = v.args[0];
                    var runEval = v.args[1]==true;

                    var evalOffset = 2;
                    if ( v.args.defName ) {
                        evalName = v.args.defName;
                        runEval = v.args.runDefOnInit
                        evalOffset = 1;
                        v.lines.unshift('function ' + v.args.fxSignature+'{')
                        v.lines.push('}')
                    }

                    var str = '\n';
                    for ( var i = 0; i < v.line+evalOffset; i++ ) {
                        str += '\n'
                    }

                    var evalTxt = str+v.lines.join('\n')

                    if ( runEval ) {
                        tH.add(function runEval_AtDef() {
                            console.debug('storing fx', evalName)
                            tH.logNow('storing fx', evalName)
                            console.debug('running stored fx', evalName, evalTxt.trim())
                            tH.logNow('running stored fx', evalName, tH.defaultAddNextOffset)
                            //eval(evalTxt);

                            try {
                                tH.setDefaultAddNext()
                                eval(evalTxt);
                                tH.resetDefaultAddNext()
                            } catch ( e ) {
                                console.error('error running eval', evalName)
                                console.error(e)
                                console.error(e.stack)
                                tH.logNow('error in fx', evalName)
                                tH.logNow(e)
                                tH.logNow(e.stack)
                                tH.fail('see above')
                            }

                            tH.test.cb();
                        })
                    }
                    if ( evalName != null ) {
                        window.testHelper.data.dictEvalFx[evalName] = evalTxt;

                        var info = v;
                        info.needSignatureCalled = v.args.defName != null
                        window.testHelper.data.dictEvalFx2[evalName] = info;

                    }
                    return;
                }
                if ( v.fx == 'fx' || v.fx == 'fxasync') {
                    var evalName = v.args[0];
                    if ( v.args.defName ) {
                        evalName = v.args.defName;
                    }
                    if ( evalName == null ) {
                        console.error('need a name for', v)
                        tH.fail('Cannot start test. failed to find fx named',
                            JSON.stringify(v)
                        )
                        return;
                    }
                    var evalTxt =  window.testHelper.data.dictEvalFx[evalName];
                    var fxInfo =  window.testHelper.data.dictEvalFx2[evalName];
                    if ( evalTxt == null ) {
                        console.error('could not find evalFx in stored', evalName)
                        tH.fail('Cannot start test. failed to find fx named', sh.qq(evalName))
                        throw new Error('cant find')
                        return;
                    }

                    function runEval_Later_L() {
                        tH.data.logging.indent()
                        //console.debug('running stored fx', evalName, evalTxt.trim(), v.args)
                        console.debug('running stored fx', evalName, v.args)

                        var strs = [];

                        var argumentsToDef = v.args;
                        if  ( v.args.args ) {
                            argumentsToDef = v.args.args;
                            argumentsToDef.unshift(evalName) ; //inputs are consistent
                        }
                        // debugger


                        var argVals = [];
                        /*$.each(argumentsToDef, function copyArg(k,v) {
                         if ( k == 0 ) { return } //skip evalName
                         var str = 'var arg'+(k) + ' = ' + '"'+v+'"'
                         //  console.debug('str', k, str)
                         strs.push(str)
                         if ( $.isNumeric(v) == false ) {
                         v = sh.qq(v)
                         }

                         argVals.push(v)
                         })*/

                        $.each(argumentsToDef, function copyArg(k,v) {
                            if ( k == 0 ) { return } //skip evalName
                            var str = 'var arg'+(k) + ' = ' + '"'+v+'"'
                            var origArg = v;
                            //  console.debug('str', k, str)
                            strs.push(str)
                            //debugger
                            if ( $.isNumeric(v) == false ) {
                                v = sh.qq(v)
                            }
                            if ( origArg === "true" || origArg === true ) {
                                v = true
                            }
                            if ( origArg === "false" || origArg === false ) {
                                v = false
                            }
                            //
                            argVals.push(v)
                        })



                        tH.logNow.nextFx();
                        tH.logNow(  '/L1', uiUtils.b(evalName), uiUtils.paren(v.line), tH.defaultAddNextOffset, argVals)


                        var codeStr_CreateArgs = strs.join('\n')
                        //console.debug('code',codeStr_CreateArgs)
                        eval(codeStr_CreateArgs)

                        if ( fxInfo && fxInfo.needSignatureCalled ) {
                            //asdf.g
                            evalTxt += '\n'
                            var runFxEvalStr = evalName + '('+argVals.join(',') +')';
                            evalTxt += '\n'+runFxEvalStr;
                        }

                        var completed = false;
                        // console.log('arg1', arg1, 'arg2', arg2 )
                        try {
                            tH.setDefaultAddNext()
                            eval(evalTxt);
                            tH.resetDefaultAddNext()
                            completed = true;
                            //debugger
                        } catch ( e ) {

                            // debugger
                            try {
                                tH.fail('see above')
                            } catch ( e ) {
                                //  tH.fail('see above')
                            }
                            //  debugger
                            //debugger
                            console.error('error running eval', evalName)
                            //console.error(e)

                            console.error('full listing', '\n\t',
                                evalTxt.trim())
                            console.error('---', e)
                            // console.error(e.stack)
                            tH.logNow('error in fx', sh.qq(evalName))
                            tH.logNow(e)
                            tH.logNow(e.stack)
                            eval(evalTxt);

                            return;

                        }
                        if ( completed == false ) {
                            // tH.fail('see above',  sh.qq(evalName))
                            //debugger
                        }

                        if ( v.fx != 'fxasync') {
                            tH.test.cb();
                        }

                        tH.data.logging.outdent()
                    }
                    tH.add(runEval_Later_L)
                    runEval_Later_L.yData = evalName;
                    return;
                }
                if ( v.fx == 'bookmark') {
                    var bookmarkName = v.args.join(' ');
                    var fxBookmark = function bookmark() {
                        tH.logNow(v.line+'.', 'bookmark', bookmarkName)
                        tH.test.cb();
                    }
                    fxBookmark.bookmarkName = bookmarkName
                    fxBookmark.fxDesc = 'bookmark: '+bookmarkName
                    tH.add(fxBookmark)
                    return;
                }

                if ( v.fx == 'if') {
                    //var bookmarkName = v.args.join(' ');
                    var fxIf = function fxIf() {
                        tH.logNow('if condition', JSON.stringify(v.args[0]).toString().slice(0,12))
                        console.log('v', v)
                        // return;
                        var firstArg = v.args[0]
                        var cfg = v.args[0]
                        // debugger;
                        var ui = [];
                        if ( cfg.find ) {
                            var ui = tH.findByContent(cfg.find, cfg.parent )
                        }
                        console.debug('ui', ui)
                        if ( ui.length > 0 ){
                            if ( cfg.goto ) {
                                tH.logNow('   >', 'if condition matched',
                                    'jump forward to', cfg.goto)
                                var t = tH.test;
                                var foundFx = null;


                                var fxName = 'remove---'

                                $.each(t.methods, function findBookmark(k,v) {
                                    console.log('remove', 'pre',k,
                                        v.fx.fxDesc, v.fx.name)
                                })

                                console.log(fxName, '...')

                                $.each(t.methods.concat(), function findBookmark(k,v) {
                                    if ( cfg.goto &&  v && v.fx &&
                                        v.fx.bookmarkName == cfg.goto) {
                                        //debugger
                                        console.error('remove', 'matched', cfg.goto, v.fx.bookmarkName)
                                        foundFx = true;
                                        return false;
                                    }
                                    console.log('remove', 'rex', k, v.fx.fxDesc, v.fx.name)
                                    var index = t.methods.indexOf(v);
                                    t.methods.splice(index, 1)
                                    t.data.methods.count--;
                                    /* tH.logNow('removing step ', v.name)
                                     console.log('removing step ',
                                     'new size', t.methods.length, v)*/
                                })

                                console.log('...')
                                //  console.log('remove', t.methods)
                                // console.table(t.methods)
                                //  console.log(JSON.stringify(t.methods))
                                //debugger
                                $.each(t.methods, function findBookmark(k,v) {
                                    console.log('remove', 'list',
                                        v.fx.fxDesc, v.fx.name)
                                })
                            }
                        } else {
                            tH.logNow('   >', 'if condition failed')
                        }


                        tH.test.cb();
                    }
                    tH.add(fxIf)
                    return;
                }

                if ( fx == null ) {
                    console.error('did not find', v.fx)
                    return;
                }
                console.log('go to', v.fx, fx.name, v.args)
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






//http://localhost:10050/test2/test2.html?runTest=true&testName=testA
function testCSVTestP(runIt) {
// return
    window.tests.testCSV2 = function define_testCSV2(tH) {
        //var i = new TestCSV()
        var i = new TestCSVConvertor();
        // i.getTestScript('csvScripts/testCSVScript.txt', onGot)
        //var url = 'csvScripts/testCSVScript.txt';
        var url = '../test3/csvScripts/testWorkflow1.txt';

        //debugger
        window.tests.testCSV(tH, url, url)
    }
    window.tests.testCSV2.desc = 'load from csv 2'
    /*if ( runIt ) {
     window.tests.testA(tH);
     }*/
}
testCSVTestP();





function defineTestLoaders() {
    window.autoTestFrameworko = function autoloadTestFramework() {
        window.location += '?loadTestFramework=true'
    }
}
defineTestLoaders();


/*

 var div = uiUtils.addDialog({
 id:"ssErrorDialog",

 })

 var ui = uiUtils.getLast();
 ui.append('sdfsdf')
 uiUtils.pos.br(ui)

 ///debugger
 */



tH.utils.loadDefsOnInit = function loadDefsOnInit() {
    if ( window.testingFrameworkLoaded !== true ) {
        console.info('waiting for load to finished')
        setTimeout(tH.utils.loadDefsOnInit, 300);
        return;
    }
    window.testDefs = 'csvScripts/defs.js.txt';
    if ( window.testDefs == null ) {
        return;
    }
    var urlDefs = 'csvScripts/defs.js.txt';
    tH.settings.doNotUpdateArgsOnNextTest = true;
    tH.runTest('testCSV', urlDefs, null, true)
}

tH.utils.loadDefsOnInit();