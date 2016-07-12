

var isNode = true

if (typeof exports === 'undefined' || exports.isNode == false) {
    isNode = false
}

if ( isNode ) {
    var shelpers = require('shelpers')
    var sh = shelpers.shelpers;
    var PromiseHelperV3 = shelpers.PromiseHelperV3;

    $ = function jqueryImpersonator() {
        return $;
    }
    $.click = function () {

    }
    $.click = function () {

    }
    $.attr = function () {

    }
    $.val = function () {

    }
    console.log($, '$')
}

var testHelper = {};

testHelper.send = function send() {
    var args = sh.convertArgumentsToArray(arguments);
    var firstArg = args[0];
    var msgError = args.join(' ')
    if ( firstArg == false ) {
        throw new Error('fault ... ' + msgError);
    }

    if ( firstArg == 'failed') {
        console.error('send result', msgError);
    }
    //send the result
    console.log('send result')
}
testHelper.click =  function  click(q) {
    console.log('click', q)
    $(q).click();
    testHelper.send('clicked');
}
testHelper.pause =  function  pause(time) {
    console.log('pasuse', time);
    setTimeout(function(){
        testHelper.send('clicked');
    }, time*1000)

}
testHelper.setVal =  function  setVal(query, val) {
    $(query).val(val);
    testHelper.send(val)
}
testHelper.getVal =  function  getVal(query, val) {
    var val = $(query).val();
    testHelper.send(val)
}
testHelper.getProp =  function  getProp(query, prop) {
    var val = $(query).attr(prop);
    testHelper.send(val)
}
testHelper.setProp =  function  setProp(query, prop, val) {
    var val = $(query).attr(prop, val);
    var val = $(query).attr(prop);
    testHelper.send(val)
}
testHelper.logOut =  function  setProp() {
    console.log.apply(console, arguments)
    testHelper.send('done')
}
testHelper.setProp =  function  setProp(query, prop, val) {
    var val = $(query).attr(prop, val);
    var val = $(query).attr(prop);
    testHelper.send(val)
}
testHelper.get = function get(query){
    return $(query)
}


testHelper.verify =  function  verify(query, prop, val) {
    var curVal = $(query).attr(prop);
    if ( val == undefined ) {
        curVal = $(query).val();
        val = prop;
        prop = ''
    }
    if ( val == curVal) {
        testHelper.send(val)
        return;
    }
    testHelper.send(false,  query, ',', prop, sh.qq(curVal), '!=', val)
}



testHelper.waitFor = function waitFor(query, timeout) {
    if ( timeout == undefined ) {
        timeout = 10*1000;
    }
    if ( timeout < 0 ){
        testHelper.send('out of time')
        return;
    }
    if (  $(query).length == 0 ) {
        setTimeout(waitFor, 500, timeout-500)
        return;
    }
    testHelper.send('found')
}


function setupTestHere() {


    var self = {}
    self.searchByName = function search(token, cb) {
        console.log('searchByName')
        //asdf.g
        cb();
    }


    self.returnMagnetLink = function returnMagnetLink(token, cb) {

        setTimeout(function () {
            console.log('returnMagnetLink')
            cb()
        }, 200)
        ;
    }
    var token = {}
    var work = new PromiseHelperV3();
    token.silentToken = true
    work.wait = token.simulate == false;
    work.startChain(token)
        .add(self.searchByName)
        .log()
        //.add(self.getFirstQuery)
        //.add(self.convertMagnetLinkToTorrent)
        .log()
        .add(self.returnMagnetLink)
        .end();

    var fxSend = send;

    send = function cmdFinished(results){
        fxSend(results)
        work.cb();
    }

    var fxSend = testHelper.send;
    testHelper.send = function cmdFinished(results){
        sh.forwardArgsTo(fxSend, arguments);
        work.cb();
    };

    var fx_click = click;
    var click = function addClick() {
        var args = arguments;
        work.add(function newClickStep() {
            sh.forwardArgsTo(fx_click, args);
        })

    }
}


function makeE() {
    var final = ''
    /*
    var initial = "    ";
    var str = initial +
        ['var fxSend = send;',
            'send = function cmdFinished(results){',
            '    //fxSend(results)',
            "console.log('work', work.cb);",
            '    work.cb();',
            '}',
            ''].join("\n" +initial);
    var initial = "    ";
    var str = initial +
        ['var fxSend = testHelper.send;',
            'testHelper.send = function cmdFinished(results){',
            '    //fxSend(results)',
            '        sh.forwardArgsTo(fxSend, arguments);',
            '    work.cb();',
            '}'].join("\n" +initial);
    final+= str + sh.n;
*/
    //var cmds = [];
    sh.each(testHelper, function (fxName,fx){
        if ( fxName == 'send')
            return;
        var initial = "    ";
        var str = initial +
            ['var fx_click = testHelper.click;',
                'var click = function add_click() {',
                '    var args = arguments;',
                '    var cmdParams = {};//redoArgs:[click,args]};',
                '    work.cmdParams = cmdParams;',
                "    //console.log('...', 'add a click....');",
                '    var fxLink = function new_click_step() {',
                '        work.cmdParams = sh.dv(cmdParams.redoCmdParamsY, cmdParams);',
                '        sh.callIfDefined(work.cmdParams.fxSide)',
                '        sh.forwardArgsTo(fx_click, args);',
                '    };',
                '    work.add(fxLink);',
                '    cmdParams.fxRedo = fxLink;',
                '',
                '};'].join("\n" +initial);
        str = sh.replace(str, 'click', fxName)
        final+= str + sh.n;
    });


    //console.log('outputstr', final)


    return final;

}
var setupTestHereStr ='';

////Header end
function runTest() {
    var setupTestHereStr = ''
    var token = {}
    var work = new PromiseHelperV3();
    token.silentToken = true
    work.wait = token.simulate == false;
    work.startChain(token)
    setupTestHereStr = makeE();
    eval(setupTestHereStr)

    var fxSend = testHelper.send;
    testHelper.send = function cmdFinished(result){
        var redo = false;
        //bleh
        var args = sh.convertArgumentsToArray(arguments);
        if ( result == false && work.cmdParams.optional ) {
            args[0] = 'failed';
        };
        if ( result == false && work.cmdParams.countRetries > 0
          ) {
            if ( work.cmdParams.countRetriesRemaining == null ) {
                work.cmdParams.countRetriesRemaining =
                    work.cmdParams.countRetries -1
            } else {
                work.cmdParams.countRetriesRemaining--;
            }

            if ( work.cmdParams.countRetriesRemaining != 0 ) {
                //args[0] = '....';
                args[0] = 'failed'
                args.push(work.cmdParams.countRetriesRemaining +  ' remain');
                redo = true
            } else  {

                args.push('exhausted retry attempts');
            }

        };
        sh.forwardArgsTo(fxSend, args);
        if ( redo ) {
            //var redoCmdParams = work.cmdParams;
            work.addNext(function(){
                setTimeout(function pause(){
                    work.cb()
                }, 500);
            })
            work.addNext(work.cmdParams.fxRedo, 1);
            //work.cmdParams.redoCmdParams = redoCmdParams;
        }
        work.cb();
    };
    var optional = function makeLastCmdOptional() {
        work.cmdParams.optional = true;
    }
    var sideMethod = function addSideMethodAlongCmd(fx) {
        work.cmdParams.fxSide = fx;
    }
    var retry = function setRetries(countRetries) {
        work.cmdParams.countRetries = countRetries;
    }

    click('#btnTestClick')
    click('#btnTestClick2')
    pause(2)
    verify('#m', 'text')
    verify('#m', 'text2')
    optional();
    verify('#m', 'text3')
    sideMethod(function(){
        setTimeout(function(){
            //return;
            $('#m').val('text3');
        }, 2)
    })
    retry(6)
    logOut('go through....');
    //click('ff[')
    //enter
}


var isNode = true

if (typeof exports === 'undefined' || exports.isNode == false) {
    isNode = false
}

if ( isNode ) {
    runTest();
} else
{
    runTest();
}

//how to add transport on page?
