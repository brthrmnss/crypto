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