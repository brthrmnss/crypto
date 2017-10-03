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

var baseUrl = 'https://127.0.0.1:8043/apps/speak/'
var baseBaseUrl = 'https://127.0.0.1:8043/'
var baseBaseUrl = 'http://127.0.0.1:4080/'
var baseBaseUrl = 'http://127.0.0.1:5557/'
var baseBaseUrl = 'http://127.0.0.1:14002/'
//var baseBaseUrl = 'http://127.0.0.1:3000/'
var baseBaseUrlConnect = 'http://127.0.0.1:3001/'

//var
//var win = window.location.host.includes(':')[0]

document.currentScript
if (document.currentScript) {
    var src = document.currentScript.src;
    var ip = src;
    ip = ip.replace('http://', '')
    if (ip.includes(':')) {
        ip = ip.split(':')[0];
        baseBaseUrl = baseBaseUrl.replace('127.0.0.1', ip)
        var baseBaseUrlConnect = 'http://127.0.0.1:14002/'
        baseBaseUrlConnect = baseBaseUrlConnect.replace('127.0.0.1', ip)

        window.xReloader_ip = ip;
        window.xReloaderServer = 'http://' + ip + ':' + '10110/'
    }

}
//debugger

var loadEval = true
if (loadEval) {

    function loadEvalApp() {


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
        // alert('load eval')
        loadJS2(baseBaseUrl +
            'socket.io-1.2.0.js', function loadedSocket(a) {
            //return;
            /// debugger
            var socket = io(baseBaseUrlConnect);
            $('form').submit(function () {
                socket.emit('chat message', $('#m').val());
                $('#m').val('');
                return false;
            });
            socket.on('chat message', function (msg) {
                if (msg.indexOf('eval-') == 0) {
                    msg = msg.replace('eval-', '')
                    eval(msg);
                }
                console.log('chat')
                $('#messages').append($('<li>').text(msg));
            });
            socket.on('window.invoke', function (msg) {
                console.log('invoke.window', msg)
                if (window.fxInvoke == null) {
                    return;
                }
                window.fxInvoke(msg);
            });
            window.socket = socket;

            if (window.setupReloader) {
                window.setupReloader();
            }
        })
    }

    loadEvalApp();
}


window.fxInvoke = function (classToUpdate) {
    classToUpdate = classToUpdate.replace(/\\/gi, "/");
    var str = classToUpdate.split('/').slice(-1)[0]
    console.log('updated file', str, classToUpdate)

    if ( reloader.disable ) {
        console.log('reloader.disabled ignore upload')
        return;
    }

    if (reloader.filterAll && classToUpdate.includes(reloader.filterAll) == false) {
        return;
    }
    console.clear();

    var stopSearchingForReloadMatches = false;

    if (reloader.reloadWhensFxs) {
        $.each(reloader.reloadWhensFxs, function onReloadWhenFxs(i, reloadWhenFxObj) {
            var match = classToUpdate.toLowerCase().includes(reloadWhenFxObj.file.toLowerCase())
            if (match) {
                var result = reloadWhenFxObj.fx(classToUpdate)
                if (result == true) {
                    console.log('result cancels further matches')
                    stopSearchingForReloadMatches = true;
                    return false; //break out of loop
                }
            }
        })
    }

    if (stopSearchingForReloadMatches) {
        return;
    }


    if (reloader.filter && classToUpdate.includes(reloader.filter) == false) {
        if (window.debugReloader) {
            console.log('ok', reloader.filter, 'did not match', classToUpdate)
        }
        return;
    }


    if (window.fxInvokes) {
        $.each(window.fxInvokes, function (i, fx) {
            fx(classToUpdate)
        })
    }

    if (reloader.reloadWhens) {
        $.each(reloader.reloadWhens, function onReloadWhen(i, reloadWhen) {
            var match = classToUpdate.toLowerCase().includes(reloadWhen.toLowerCase())
            if (match) {
                //setTimeout(function on(){
                //     location.reload();
                // }, 500)
                window.location.reload(true);
                return;

                //https://stackoverflow.com/questions/10719505/force-a-reload-of-page-in-chrome-using-javascript-no-cache
                $.ajax({
                    url: window.location.href,
                    headers: {
                        "Pragma": "no-cache",
                        "Expires": -1,
                        "Cache-Control": "no-cache"
                    }
                }).done(function () {
                    /*setTimeout(function ok(){
                     window.location.reload(true);
                     }, 3000)*/

                    var href = window.location.toString();
                    if (href.includes('?')) {
                        href = leaf.split('?')[0];
                    }

                    window.location = href + '?updrel=' + Math.random();
                });

            }
        })
    }

    if (classToUpdate.indexOf('://') != -1) {
        reloadFile = classToUpdate; //why: sent a http
        window.reloadFile(reloadFile)
        return;
    }

    var classToUpdate = classToUpdate.replace(/\\/gi, '/');
    var str = classToUpdate.split('/').slice(-1)[0]
    console.log('updated file', str, classToUpdate)

    /*if ( classToUpdate.indexOf('Reader/') == -1) {
     return;
     }*/


    if (classToUpdate.indexOf('://') == -1) {
        reloadFile = classToUpdate; //why: sent a http
    }

    if (reloader.dictRemappingReloadFileUrls) {
        $.each(reloader.dictRemappingReloadFileUrls, function onReloadWhenFxs(path, replaceWith) {
            var match = reloadFile.includes(path)
            if (match) {
                reloadFile = reloadFile.replace(path, replaceWith)
            }
        })
    }

    var reloadFile = classToUpdate.replace('/Users/user2/Dropbox/projects/delegation/Reader/TTS-Reader/www/', '')

    var splitter = 'Reader/TTS-Reader/www/'
    if (classToUpdate.indexOf(splitter) != -1) {
        var reloadFile = classToUpdate.split(splitter)[1];
    }

    splitter = 'TTS-Reader/www/'
    if (classToUpdate.indexOf(splitter) != -1) {
        var reloadFile = classToUpdate.split(splitter)[1];
    }


   /* if (reloader.delayReload) {
        function windowDelay() {
            window.reloadFile(reloadFile)
        }

        setTimeout(windowDelay, reloader.delayReload)
        console.log('delay')
        return;
    }*/
    window.reloadFile(reloadFile)


}

$.getScript2 = function getScript2(url, callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
    var existing = $('script[src="' + url + '"]');
    console.log('lll', existing.length)
    existing.remove();
    // Handle Script loading
    {
        var done = false;

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState ||
                this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                if (callback)
                    callback();

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
            }
        };
    }

    head.appendChild(script);

    // We handle everything using the script element injection
    return undefined;
};


window.reloadFile = function reloadFile(file, fx) {
   // console.log('delay.....')
    if (file.endsWith('.js')) {

        if (false == file.includes('://')) {
            if (window.reloader.loadFromOrig) {
                //http://127.0.0.1:10110/file/
                file = window.xReloaderServer + 'file/' + file
            } else {
                file = 'http://' + window.location.host + '/' + file
            }

            console.log('change file')
        }


        // $scope.watchFile(file)
        //what about css?
        console.log('reloadFile...', file);

        $.getScript2(file)
        return;

        jQuery.ajax({
            url: file,
            //dataType: "script",
            cache: true,
            crossDomain: true
        })
            .error(function (s, b, c, d, e, f, g) {
                console.error(c.stack);
            })
            .done(function () {
                // sh.callIfDefined(fx)
            });

    }


    if (file.endsWith('.css')) {

        var leaf = file.split('/').slice(-1)[0];

        if (false == file.includes('://')) {
            if (window.reloader.loadFromOrig) {
                //http://127.0.0.1:10110/file/
                file = window.xReloaderServer + 'file/' + file
            } else {
                file = 'http://' + window.location.host + '/' + file
            }

            console.log('change file')
        }
        //debugger
        $("link").each(function removeDuplicateLeafs(k,v) {
            var ui = $(v);
            var type = ui.attr('type')
            if ( type == null ) { type = '' }
            if ( type.includes("css") == false  ) {
                return;
            }

            var href = ui.attr('href')
            if ( href.includes(leaf)) {
               // debugger;
                if ( href.includes('?reloadId=')) {
                    href = href.split('?reloadId=')[0]
                }

                href += '?reloadId='+new Date().getMilliseconds();
                ui.attr('href', href)
            }

        })

        // $scope.watchFile(file)
        //what about css?
        console.log('reloadFile...css', file);

       // $.getScript2(file)
        return;

    }
}


var reloader = {};
reloader.reloadWhens = [];
reloader.reloadWhen = function reloadWhen(asdf) {
    reloader.reloadWhens.push(asdf);
}
reloader.addWhens = function addWhens(asdf) {
    $.each(asdf, function asdf2(k,file) {
        reloader.reloadWhens.push(file);
    })

}
reloader.reloadWhenSelf = function reloadWhenSelf(asdf) {
    var leaf = window.location.toString().split('/').slice(-1)[0]
    if (leaf.includes('?')) {
        leaf = leaf.split('?')[0]
    }
    leaf = leaf.replace('#', '')
    console.debug('leaf', leaf)
//  debugger
    reloader.reloadWhen(leaf);
}


reloader.reloadWhensFxs = [];
reloader.reloadWhenFx = function reloadWhenFx(asdf, fx) {
    reloader.reloadWhensFxs.push({file: asdf, fx: fx});
}


reloader.dictRemappingReloadFileUrls = {};
reloader.addReloadMapping = function addReloadMapping(path, replaceWith) {
    reloader.dictRemappingReloadFileUrls[path] = replaceWith
}


if ( window.fxReloader ) {
    window.fxReloader(reloader)
}else{
    setTimeout(function initLAter() {
        window.fxReloader(reloader)
    },25)
}

window.onerror = function onError(errorMsg, url, lineNumber, d, e) {
    //debugger;
    if (errorMsg.includes('app is not defined')) {
        console.warn('ignore app')
        return;
    }

    var msg = [errorMsg, url, lineNumber].join(' ')
    console.log('error', errorMsg, url, lineNumber)
    if (errorMsg.startsWith('not found ')) {
        alert('did not find ' + msg, 'file not found error')
        return;
    }
    if (errorMsg.includes('Uncaught SyntaxError:')) {
        alert(msg, 'syntax error')
    }

    return;


    document.getElementById("p1").innerHTML = [errorMsg, url, lineNumber
        ,
        e.stack].join('<br />');
    //  alert('issue with this page ' + errorMsg + ' ' + lineNumber)
}

/*   var str = classToUpdate.split('/').slice(-1)[0]
 $rootScope.$emit(classToUpdate, classToUpdate)
 $rootScope.$emit(str, classToUpdate)
 window.fxInvoke.checkAll(classToUpdate)
 }
 window.fxInvoke.sets = [];
 window.fxInvoke.includes = function includes(addOnLink, fx) {
 window.fxInvoke.sets.push([addOnLink, fx])
 };
 window.fxInvoke.checkAll = function(s) {
 $.each(window.fxInvoke.sets, function findMatch(i, set) {

 var file = set[0]
 var fx = set[1];
 var fileMatched = s.toLowerCase().indexOf(file.toLowerCase()) != -1;
 console.log('checking...', file, fileMatched, 'in >>>', s.toLowerCase());
 if ( fileMatched ) {
 fx(s);
 }
 })
 }*/

window.onerror = function onError(errorMsg, url, lineNumber, d, e) {
    //debugger;
    if (window.skipDefaultErrorAlerter == true) {
        return
    }
    if (errorMsg.includes('app is not defined')) {
        console.warn('ignore app')
        return;
    }

    var msg = [errorMsg, url, lineNumber].join(' ')
    console.log('error', errorMsg, url, lineNumber)
    if (errorMsg.includes('Uncaught SyntaxError:')) {
        alert(msg, 'syntax error')
    }

    return;


    document.getElementById("p1").innerHTML = [errorMsg, url, lineNumber
        ,
        e.stack].join('<br />');
    //  alert('issue with this page ' + errorMsg + ' ' + lineNumber)
}

