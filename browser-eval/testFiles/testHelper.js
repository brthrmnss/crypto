/**
 * Created by user on 8/20/15.
 */




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




function makeE() {
    var final = ''

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
//File is evaled in to simplify testing
/*
var fx_click = testHelper.click;
var click = function add_click() {
    var args = arguments;
    var cmdParams = {};//redoArgs:[click,args]};
    work.cmdParams = cmdParams;
    //"    //console.log('... 'add a click....');",
    var fxLink = function new_click_step() {
        work.cmdParams = sh.dv(cmdParams.redoCmdParamsY, cmdParams);
        sh.callIfDefined(work.cmdParams.fxSide)
        sh.forwardArgsTo(fx_click, args);
    };
    work.add(fxLink);
    cmdParams.fxRedo = fxLink;
};
*/

//modify send command to support retrying commands
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
};
var sideMethod = function addSideMethodAlongCmd(fx) {
    work.cmdParams.fxSide = fx;
};
var retry = function setRetries(countRetries) {
    work.cmdParams.countRetries = countRetries;
};