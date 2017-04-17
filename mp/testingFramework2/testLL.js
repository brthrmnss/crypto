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
    'TestCSVConvertor.js',
    'TestCSV.js',
]
var loadScript2 = function loadScript2(_scripts2, fxDone) {

    if ( _scripts2.length == 0 ) {
        if ( fxDone ) fxDone();
        return;
    }
    var url = _scripts2.shift();
    if ( window.preamble == null ) {
        window.preamble = window.location.origin + '/testingFramework/'
    }
    //if ( url.includes(window.preamble) == false ) {
    //    debuggerf
    if ( url.startsWith('http') == false ) {
        url = window.preamble + url;
    }
    //}


    var debug = false;
    // debug = true;
    if ( debug ) {
        console.log('downloading', url)
    }


    function loadJSViaScriptTag(src, fx) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function onLoadedScript(a) {
            //alert('got js ' + src)
            if ( fx != null ) {
                fx(a)
            }
        };

        script.onerror = function onscriptLoadingFailed (a,b,c,d) {
            console.error('failed to load', url, a==null,b,c,d)
            console.error(c)
        };
        document.head.appendChild(script);
    };

    loadJSViaScriptTag(url, function onLoadNextScript() {
        function loadNextScript(){
            loadScript2(_scripts2, fxDone);
        }
        setTimeout(loadNextScript, 50)
    });


    return;

    function loadJSVia_JQuery$getScript ( url, fxDone) {
        jQuery.getScript(url)
            .done(function onLoaded() {
            })
            .always(function doneLoadingFile() {
                if (debug) {
                    console.error('what is window tests?', url, window.tests);
                }
                function loadNextScript() {
                    loadScript2(_scripts2, fxDone);
                }

                setTimeout(loadNextScript, 50)

            })
            .fail(function (a, b, c, d) {
                console.error('failed to load', url, a == null, b, c, d)
                console.error(c.stack)
            });
    }
}


function loadTestFrameworkFiles(fxDone, force) {
    if ( force != true ) {
        if (window.tH && window.tH.add) {
            console.warn('test framework already loaded')
            if ( fxDone ) { fxDone() }
            return;
        }
    }


    var currentScript = document.currentScript //just in case user does not set pre-amble
    if ( currentScript ) {
        window.preamble = currentScript.src.replace('testLL.js', '')
        console.info('guessed pre-amble to be', window.preamble)
    }

    /*
    if ( window.uiUtils == null ) {
        //why: load ui+utils if not already specified
        scripts2.unshift('ui_utils.js')
    }
    */

    if ( window.uiUtils == null ) {
        //why: load ui+utils if not already specified
        //debugger
        scripts2.unshift('ui_utils.js')
    }
    if ( window.jQuery == null ) {
        //why: load ui+utils if not already specified
        scripts2.unshift('jquery.js.ignore_scan')
        //debugger
    }
    loadScript2(scripts2.concat(), onFinishedLoadingTestFramework)

    function onFinishedLoadingTestFramework() {
        console.info('finished loading all scripts', scripts2.length);
        window.tests.loaded = true;
        window.testingFrameworkLoaded = true;
        if ( fxDone ) { fxDone() }
    }
}

window.testFrameworkReload = function () {

}


var runTest = window.location.href.indexOf('runTest=true') !=-1
var loadTestFrameworkInUrl =  window.location.href.indexOf('loadTestFramework=true') !=-1


if (  runTest || loadTestFrameworkInUrl ) {
    loadTestingFramework()
    //loadScript2(scripts2.concat());
}

function loadTestingFramework(fxDone, force) {

    // uiUtils.addToUrl('testParam2', true)
    //  return;
    loadTestFrameworkFiles(testFrameworkingLoaded, force)

    function testFrameworkingLoaded() {
        //debugger;
        uiUtils.addToUrl('loadTestFramework', true); //
        uiUtils.addToUrl('dialogSearchTests', true); //show test dialog for UX conv.
        console.info('loadTestingFramework - test framework loaded')
       // window.dialogTransport.init()
        if ( window.fxTLLLoaded ) {
            window.fxTLLLoaded();
        }
        callIfDefined(fxDone);
        return;
        uiUtils.repeatUntil(
            function isDialogReady()  {
                return window.dialogTransport != null
            },
            function initDialog() {
                window.dialogTransport.init()
            }
        )
    }

}

window.loadTestingFramework = loadTestingFramework; //<-- Entry Point


window.ltf = function loadTestingFrameworkForce(fxDone) {
    loadTestingFramework(fxDone, true)
}

var cookie =  localStorage.getItem('nextTest')
cookie = JSON.parse(cookie);
if ( cookie ) {
    loadScript2(scripts2.concat());
}
