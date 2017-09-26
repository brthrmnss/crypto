/**
 * Created by user2 on 2/14/16.
 */

/**
 *
 *
 * listens for changes
 * changes files
 */

/*
 made for remote to linux
 */


function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.init = function init(config) {
        //  self.settings = sh.dv(config, {});
        self.createHelpers()
        self.method();

    }

    p.method = function method(config) {


        document.currentScript
        if (document.currentScript) {
            var src = document.currentScript.src;
            var ip = src;
            ip = ip.replace('http://', '')
            if (ip.includes(':')) {
                ip = ip.split(':')[0];
                src = src.replace('127.0.0.1', ip)
                var baseBaseUrlConnect = 'http://127.0.0.1:14002/'
                src = src.replace('127.0.0.1', ip)

                window.xReloader_ip = ip;
                window.xReloaderServer = 'http://' + ip + ':' + '10110/'
            }

        }

        self.data.ip


        self.utils.loadScripts(
            [
                baseBaseUrl + 'jquery.js',
                baseBaseUrl + 'ui_utils.js',
                baseBaseUrl + 'socket.io-1.2.0.js',
                baseBaseUrl + 'g/js/' + 'reloaderGH.js'
            ],
            function loadedSocket(a) {
                console.log('...')
            })
    }

    p.test = function test(config) {
    }


    p.createHelpers = function createHelpers() {
        var loadJS2 = function loadJS2(src, fx) {
            var script = document.createElement('script');
            script.src = src;
            script.onload = function (a) {
                //alert('got js ' + src)
                if (fx != null) {
                    fx(a)
                }
            };
            document.head.appendChild(script);
        };

        self.utils.loadJS2 = loadJS2;

        var loadScript2 = function loadScript2(_scripts2, fxDone) {

            if (_scripts2.length == 0) {
                console.log('finished');
                if (fxDone) fxDone();
                return;
            }
            var url = _scripts2.shift();
            if (window.preamble == null) {
                window.preamble = window.location.origin + '/test3/'
            }
            //if ( url.includes(window.preamble) == false ) {
            //    debugger
            url = window.preamble + url;
            //}


            var debug = false;
            // debug = true;
            if (debug) {
                console.log('downloading', url)
            }
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

        self.utils.loadScripts = loadScript2


        var loadScript2 = function loadScript2(_scripts2, fxDone) {
            if (_scripts2.length == 0) {
                console.log('finished');
                if (fxDone) fxDone();
                return;
            }
            var url = _scripts2.shift();
            if (window.preamble == null) {
                window.preamble = window.location.origin  //+ '/test3/'
            }
            //if ( url.includes(window.preamble) == false ) {
            //    debugger
            url = window.preamble + url;
            //}


            var debug = false;
             debug = true;
            if (debug) {
                console.log('downloading', url)
            }
            loadJS2(url, function doneLoadingFile() {
                if (debug) {
                    console.error('what is window tests?', url, window.tests);
                }
                function loadNextScript() {
                    loadScript2(_scripts2, fxDone);
                }

                setTimeout(loadNextScript, 50)
            })

        }

        self.utils.loadScripts = loadScript2

    }

    p.utils = {};

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}


var instance = new BasicClass();
var config = {};
instance.init(config)
//nstance.test();
//instance.createHelpers()
//instance.loadReloader()


var baseUrl = 'https://127.0.0.1:8043/apps/speak/'
var baseBaseUrl = 'https://127.0.0.1:8043/'
var baseBaseUrl = 'http://127.0.0.1:4080/'
var baseBaseUrl = 'http://127.0.0.1:5557/'
var baseBaseUrl = 'http://127.0.0.1:14002/'
//var baseBaseUrl = 'http://127.0.0.1:3000/'
var baseBaseUrlConnect = 'http://127.0.0.1:3001/'

//var
//var win = window.location.host.includes(':')[0]


//debugger
