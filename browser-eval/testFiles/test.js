

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



////Header end
function runTest(evalStr1) {
    var setupTestHereStr = ''
    var token = {}
    var work = new PromiseHelperV3();
    token.silentToken = true;
    work.wait = token.simulate == false;
    work.startChain(token);

    eval(evalStr1 );

    setupTestHereStr = makeE();
    eval(setupTestHereStr);

    //showTransportPanel();

    //goToYahoo
    click('#btnTestClick');
    click('#btnTestClick2');
    pause(2);
    verify('#m', 'text');
    verify('#m', 'text2');
    optional();
    verify('#m', 'text3');
    sideMethod(function(){
        setTimeout(function(){
            //return;
            $('#m').val('text3');
        }, 2)
    })
    retry(6);
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
   /* $.get("testHelper.js", function(response) {
        var logfile = response;
        runTest(logfile)
    });
*/
    $.ajax({
        url: "testHelper.js",
       // data: data,
        success: function f(d){
           runTest(d)
        },
        dataType: "text"
    }).done(function( html ) {
        //console.log('d', html)
    });;

    //runTest();
}

//how to add transport on page?
