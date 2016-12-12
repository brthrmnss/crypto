/**
 * Created by user2 on 3/12/16.
 */


var scripts2 = [
    'shelpers-mini.js',
    'PromiseHelperV3.js',
    'testFramework.js',
    'tests.js',
    'dialogTransport.js',
    'dialogSearchTests.js',
]
var loadScript2 = function loadScript2(_scripts2, fxDone) {

    if ( _scripts2.length == 0 ) {
        console.log('finished');
        if ( fxDone ) fxDone();
        return;
    }
    var url = _scripts2.shift();
    if ( window.preamble == null ) {
        window.preamble = window.location.origin + '/test3/'
    }
    //if ( url.includes(window.preamble) == false ) {
    //    debugger
    url = window.preamble + url;
    //}


    var debug = false;
   // debug = true;
    if ( debug ) {
        console.log('downloading', url)
    }
    jQuery.getScript(url)
        .done(function onLoaded() {
        })
        .always(function doneLoadingFile () {
            if ( debug ) {
                console.error('what is window tests?', url, window.tests);
            }
            function loadNextScript(){
                loadScript2(_scripts2, fxDone);
            }
            setTimeout(loadNextScript, 50)

        })
        .fail(function (a,b,c,d) {
            console.error('failed to load', url, a==null,b,c,d)
            console.error(c.stack)
        });
}


function loadTestFramework(fxDone, force) {
    if ( force != true ) {
        if (window.tH && window.tH.add) {
            fxDone();
            return;
        }
    }
    loadScript2(scripts2.concat(), fxDone2)
    function fxDone2() {
        window.tests.loaded = true;
        if ( fxDone ) { fxDone() }
    }
}

var runTest = window.location.href.indexOf('runTest=true') !=-1
var loadTestFrameworkInUrl =  window.location.href.indexOf('loadTestFramework=true') !=-1


if (  runTest || loadTestFrameworkInUrl ) {
    loadScript2(scripts2.concat());
}

function loadTests() {
    uiUtils.addToUrl('loadTestFramework', true)
    uiUtils.addToUrl('dialogSearchTests', true)

    // uiUtils.addToUrl('testParam2', true)
    //  return;
    loadTestFramework(function onDone(){
        //console.log('test framework loaded')
    })
}

var cookie =  localStorage.getItem('nextTest')
cookie = JSON.parse(cookie);
if ( cookie ) {
    loadScript2(scripts2.concat());
}
