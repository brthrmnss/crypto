/*
 @author ebooks.wtf@yandex.com
 @license do what you want with this simple chrome extension
 @date 2016-02-28
 @version 0.5
 */
var four = 2 + 2
console.log('quickstart')
eval('four = 3 + 2; console.log("fff", "four")')
//window.$ = $;


function urlInc(str) {
    return window.location.toString().includes(str)
}
function urlInc2(str) {
    return window.location.host.includes(str)
}


/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing
         the web-pages DOM content as argument */
      //  debugger
        if ('createRange' in document && 'getSelection' in window) {
            // firefox, opera, webkit
            var range= document.createRange();
            range.selectNodeContents(document.body);
            var selection= window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        } else if ('createTextRange' in document.body) {
            // ie
            document.body.createTextRange().select();
        }

        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        if (range) {
            var div = document.createElement('div');
            div.appendChild(range.cloneContents());
            vs=div.innerHTML;
        }

        console.log('size', vs.length)

        sendResponse( vs);
    }
});


function initBoomBoom() {



    if (window.socket == null) {
        /* var baseBaseUrl = 'http://127.0.0.1:14002/'
         var socket = io(baseBaseUrl);
         window.socket=socket;*/
        console.warn('what is this reloading boomboom')
        setTimeout(initBoomBoom, 500)
        //debugger
        return
    }
    window.sendEvalResult = function df(data, name) {
        data._key = name;
        window.socket.emit('window.eval.result', data, name)
    }
    window.socket.on('window.invoke', function(msg){
        console.log('invoke.window', msg)
    });
    window.socket.on('window.eval', function (msg) {
        console.log('window.eval', msg)
        //console.clear();
        if (msg.forId ) {
            if ( msg.forTabName != window.boomBoomId) {
                if ( self.data.tabName == null )  {
                    if ( self.data.fxOthers(msg.forTabName) == null ) {
                        self.data.tabName = msg.forTabName
                        self.data.fxClaim(self, msg.forTabName)
                    }
                }
                return;
            }
        }
        console.log('window.eval', msg)
        var result = eval(msg.evalStr)


        if (msg.noReturn != true) {
            var data = {}
            data.result = result;
            data.keyId = msg.keyId;
            window.socket.emit('window.eval.result', data)
        }

    });

    window.sendEvalResultFromMsg = function df(msg, result, name) {
        var data = {}
        data.__name = name;
        data.result = result;
        data.keyId = msg.keyId;
        window.socket.emit('window.eval.result', data)
    }

    /* chrome.tabs.sendMessage(tab.id, {text: "what_is_my_id"},
     function onGotId(id, b, c) {
     console.log('err')
     debugger;
     });

     */
    //debugger
    //debugger
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse, sendHelper) {
        /* If the received message has the expected format... */
        //debugger
        if (msg.text && (msg.text == "new_TabX")) {
            //debugger;
            window.boomBoomId = msg.id;
            self.data.tabId = msg.id;
            window.localStorage.setItem('valid_tab_'+msg.id, 'true')
            console.log('id', msg.id, msg);
            // msg.sendHelper.tryToClaim(self,  self.data.tabId);
            // sendResponse( vs);
        }

        if (msg.text && (msg.text == "update_TabX")) {
            //debugger;
            window.boomBoomId = msg.id;
            self.data.tabId = msg.id;
            console.log('id', msg.id, msg);
            window.localStorage.setItem('valid_tab_'+msg.id, 'true')
            sendResponse(msg.id)
            //  msg.sendHelper.tryToClaim(self,  self.data.tabId);
            // sendResponse( vs);
        }
    });

}



if (urlInc('boomboom')) {
    console.debug('boomboom')
    var self = {}
    self.data = {};


    //debugger;
    initBoomBoom()
} else {
    window.initBoomBoom = initBoomBoom;
   // debugger
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse, sendHelper) {
        if (msg.text && (msg.text == "update_TabX")) {
           // debugger;
            //self.data.tabId = msg.id;
           // var val = window.localStorage.getItem('valid_tab_'+msg.id)
            if ( msg.loadBoomBoom == true ) {
                window.initBoomBoom();
            }
            console.log('id', msg.id, msg);
            //  msg.sendHelper.tryToClaim(self,  self.data.tabId);
            // sendResponse( vs);
        }
    });
}

if ( urlInc('clearsessions')) {
    $.each(localStorage, function(key, val){
        if ( key.includes('valid_tab_')) {
            localStorage.removeItem(key);
        }
    });


}


function handleV() {
    if (urlInc2('videos.com')) {
        if (urlInc('profiles/')) {
            return;
        }
        debugger
        function removeIframes(index) {
            var iframes = document.querySelectorAll('a');
            iframes.forEach(function onK(k, v) {
                //console.log(k, v)
                if (k.parentElement.id == 'video_space') {
                    return;
                }
                if (k.href.includes('.trafficfactory')) {
                    k.remove()
                }

            })
            //console.log('iframes', iframes.length)
            //$('iframe').remove()

            if (index == null) {
                index = 0
            }
            index++
            if (index == 20) {
                return;
            }
            setTimeout(removeIframes, 50, index)
        }

        removeIframes(0)

        //document.querySelector('#taboola-below-article-thumbnails').remove()
        if (document.querySelector('#video-sponsor-links')) {
            document.querySelector('#video-sponsor-links').remove()
        }

        var y = document.querySelector('#video-subscribe')
        if (y) {
            y.remove()
        }

    }

    if (urlInc('myvidster.com')) {
        function removeIframes(index) {
            var iframes = document.querySelectorAll('iframe');
            iframes.forEach(function onK(k, v) {
                //console.log(k, v)
                if (k.parentElement.id == 'video_space') {
                    return;
                }
                k.remove()
            })
            //console.log('iframes', iframes.length)
            //$('iframe').remove()

            if (index == null) {
                index = 0
            }
            index++
            if (index == 20) {
                return;
            }
            setTimeout(removeIframes, 50, index)
        }

        removeIframes(0)

        document.querySelector('#taboola-below-article-thumbnails').remove()
        document.querySelector('#comment_space').remove()
    }

}
handleV();