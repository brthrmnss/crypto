/**
 * Created by user2 on 2/14/16.
 */

/**
 *
 *
 * listens for changes
 * changes files
 */



var baseUrl = 'https://127.0.0.1:8043/apps/speak/'
var baseBaseUrl = 'https://127.0.0.1:8043/'
var baseBaseUrl = 'http://127.0.0.1:4080/'
var baseBaseUrl = 'http://127.0.0.1:5557/'
var baseBaseUrl = 'http://127.0.0.1:14002/'
var baseBaseUrl = 'http://127.0.0.1:3000/'
var baseBaseUrlConnect = 'http://127.0.0.1:3001/'
var loadEval = true
if ( loadEval ) {

    function loadEvalApp(){


        var loadJS2 = function loadJS2(src, fx) {
            var script = document.createElement('script');
            script.src = src;
            script.onload = function (a) {
                //alert('got js ' + src)
                if ( fx != null ) {
                    fx(a)
                }
            };
            document.head.appendChild(script);
        };
        // alert('load eval')
        loadJS2(baseBaseUrl+
            'socket.io-1.2.0.js', function loadedSocket(a){
            //return;
            // debugger
            var socket = io(baseBaseUrlConnect);
            $('form').submit(function(){
                socket.emit('chat message', $('#m').val());
                $('#m').val('');
                return false;
            });
            socket.on('chat message', function(msg){
                if (msg.indexOf('eval-')==0) {
                    msg = msg.replace('eval-', '')
                    eval(msg);
                }
                console.log('chat')
                $('#messages').append($('<li>').text(msg));
            });
            socket.on('window.invoke', function(msg){
                console.log('invoke.window', msg)
                if ( window.fxInvoke == null ) {
                    return;
                }
                window.fxInvoke(msg);
            });
            window.socket = socket;
        })
    }
    loadEvalApp();
}



window.fxInvoke = function (classToUpdate) {
    classToUpdate = classToUpdate.replace(/\\/gi, "/");
    var str = classToUpdate.split('/').slice(-1)[0]
    console.log('updated file', str, classToUpdate)


    if ( reloader.filterAll && classToUpdate.includes(reloader.filterAll) == false ) {
        return;
    }
    console.clear();

    var stopSearchingForReloadMatches = false;

    if ( reloader.reloadWhensFxs ) {
        $.each(reloader.reloadWhensFxs, function onReloadWhenFxs(i, reloadWhenFxObj) {
            var match =  classToUpdate.toLowerCase().includes(reloadWhenFxObj.file.toLowerCase())
            if ( match ) {
                var result = reloadWhenFxObj.fx(classToUpdate)
                if ( result == true ) {
                    console.log('result cancels further matches')
                    stopSearchingForReloadMatches = true;
                    return false; //break out of loop
                }
            }
        })
    }

    if ( stopSearchingForReloadMatches ) {
        return;
    }


    if ( reloader.filter && classToUpdate.includes(reloader.filter) == false ) {
        return;
    }


    if ( window.fxInvokes ) {
        $.each(window.fxInvokes, function ( i, fx) {
            fx(classToUpdate)
        })
    }

    if ( reloader.reloadWhens ) {
        $.each(reloader.reloadWhens, function onReloadWhen (i, reloadWhen) {
            var match =  classToUpdate.toLowerCase().includes(reloadWhen.toLowerCase())
            if ( match ) {
                location.reload();
            }
        })
    }

    if ( classToUpdate.indexOf('://') != -1 ) {
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


    if ( classToUpdate.indexOf('://') == -1 ) {
        reloadFile = classToUpdate; //why: sent a http
    }

    if ( reloader.dictRemappingReloadFileUrls ) {
        $.each(reloader.dictRemappingReloadFileUrls, function onReloadWhenFxs(path, replaceWith) {
            var match =  reloadFile.includes(path)
            if ( match ) {
                reloadFile = reloadFile.replace(path, replaceWith)
            }
        })
    }

    var reloadFile = classToUpdate.replace('/Users/user2/Dropbox/projects/delegation/Reader/TTS-Reader/www/', '')

    var splitter = 'Reader/TTS-Reader/www/'
    if ( classToUpdate.indexOf(splitter) != -1 )  {
        var reloadFile = classToUpdate.split(splitter)[1];
    }

    splitter = 'TTS-Reader/www/'
    if ( classToUpdate.indexOf(splitter) != -1 )  {
        var reloadFile = classToUpdate.split(splitter)[1];
    }


    window.reloadFile(reloadFile)



}

$.getScript2 = function getScript2(url, callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
    var existing = $('script[src="' + url + '"]');
    console.log('lll',  existing.length )
    existing.remove();
    // Handle Script loading
    {
        var done = false;

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function(){
            if ( !done && (!this.readyState ||
                this.readyState == "loaded" || this.readyState == "complete") ) {
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
    if ( file.endsWith('.js')) {

        if ( false == file.includes('://')) {
            file = 'http://'+window.location.host + '/' + file
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
            crossDomain:true
        })
            .error(function(s, b,c,d,e,f,g) {
                console.error(c.stack);
            })
            .done(function() {
                // sh.callIfDefined(fx)
            });

    }
}


var reloader = {};
reloader.reloadWhens = [];
reloader.reloadWhen = function reloadWhen(asdf){
    reloader.reloadWhens.push(asdf);
}

reloader.reloadWhensFxs = [];
reloader.reloadWhenFx = function reloadWhenFx(asdf,fx){
    reloader.reloadWhensFxs.push({file:asdf, fx:fx});
}



reloader.dictRemappingReloadFileUrls = {};
reloader.addReloadMapping = function addReloadMapping(path,replaceWith){
    reloader.dictRemappingReloadFileUrls[path] = replaceWith
}


window.onerror = function onError(errorMsg, url, lineNumber,d,e) {
    //debugger;
    if ( errorMsg.includes('app is not defined')) {
        console.warn('ignore app')
        return;
    }

    var msg = [errorMsg, url, lineNumber].join(' ')
    console.log('error', errorMsg, url, lineNumber)
    if ( errorMsg.includes('Uncaught SyntaxError:')) {
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

window.onerror = function onError(errorMsg, url, lineNumber,d,e) {
    //debugger;
    if ( window.skipDefaultErrorAlerter == true )   {
        return
    }
    if ( errorMsg.includes('app is not defined')) {
        console.warn('ignore app')
        return;
    }

    var msg = [errorMsg, url, lineNumber].join(' ')
    console.log('error', errorMsg, url, lineNumber)
    if ( errorMsg.includes('Uncaught SyntaxError:')) {
        alert(msg, 'syntax error')
    }

    return;


    document.getElementById("p1").innerHTML = [errorMsg, url, lineNumber
        ,
        e.stack].join('<br />');
    //  alert('issue with this page ' + errorMsg + ' ' + lineNumber)
}

