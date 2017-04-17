/**
 * Created by user2 on 2/14/16.
 */

/**
 *
 *
 * listens for changes
 * changes files
 */

//alert('....')

window.initializedAddOnApps = true
var baseUrl = 'https://127.0.0.1:8043/apps/speak/'
var baseBaseUrl = 'https://127.0.0.1:8043/'
var baseBaseUrl = 'http://127.0.0.1:4080/'
var baseBaseUrl = 'http://127.0.0.1:14002/'
var loadEval = true
if ( loadEval ) {
    function loadEvalApp(){

        console.log('load eval...')
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
            'socket.io-1.2.0.js.ignore', function loadedSocket(a){

            //return;
            var socket = io(baseBaseUrl);
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
                console.clear();
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
    var str = classToUpdate.split('/').slice(-1)[0]
    console.log('updated file', str, classToUpdate)


    var reloadFileX = classToUpdate.replace(
        '/Users/user2/Dropbox/projects/learn angular/port3/app/', '')

    var reloadFileX = classToUpdate.replace(
        '/Users/user2/Dropbox/projects/crypto/mp/GrammarHelperServer/', 'g/');

    //debugger;
    if (window.fxInvokes) {
        $.each(window.fxInvokes, function (i, fx) {
            fx(reloadFileX)
        })
    }

    if ( classToUpdate.indexOf('Reader/') == -1) {
        return;
    }
    var reloadFile = classToUpdate.replace('/Users/user2/Dropbox/projects/delegation/Reader/TTS-Reader/www/', '')
    window.reloadFile(reloadFile)
}


window.reloadFile = function reloadFile(file, fx) {
    // $scope.watchFile(file)
    console.log('reloadFile', file);
    jQuery.ajax({
        url: file,
        dataType: "script",
        cache: true
    })
        .error(function(s, b,c,d,e,f,g) {
            //alert('error loading ' +  file + ' ' + c + ' ' + b) //don't like the alert it is obtrusive

            console.error(c.stack);
        })
        .done(function() {
            // sh.callIfDefined(fx)
        });
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

