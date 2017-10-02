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
    return window.location.host.includes(str)
}


if (urlInc('videos.com')) {
    //debugger
    function removeIframes(index) {
        var iframes = document.querySelectorAll('a');
        iframes.forEach(function onK(k, v) {
            //console.log(k, v)
            if (k.parentElement.id == 'video_space') {
                return;
            }
            if ( k.href.includes('.trafficfactory') ){
                k.remove()
            }

        })
        //console.log('iframes', iframes.length)
        //$('iframe').remove()

        if ( index == null ) {
            index = 0
        }
        index++
        if ( index == 20 ) {
            return;
        }
        setTimeout(removeIframes, 50, index)
    }
    removeIframes(0)

    //document.querySelector('#taboola-below-article-thumbnails').remove()
    if(  document.querySelector('#video-sponsor-links') ) {
        document.querySelector('#video-sponsor-links').remove()
    }

    var y = document.querySelector('#video-subscribe')
    if(  y ) {
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

        if ( index == null ) {
            index = 0
        }
        index++
        if ( index == 20 ) {
            return;
        }
        setTimeout(removeIframes, 50, index)
    }
    removeIframes(0)

    document.querySelector('#taboola-below-article-thumbnails').remove()
    document.querySelector('#comment_space').remove()
}