console.log('loaded', 'update_googleSearch.js')

function ChromeExtMod() {
    var self = this;

    var p = self;
    self.data = {};
    self.data.clearUI = 'yyEbF'

    p.init = function init() {
        if (window.what == null) {
            window.what = 0
        } else {
            window.what += 1;
        }
        console.log('3yyy-4', window.what)
        //console.clear()
        $('.' + self.data.clearUI).remove();

        document.title = 'Web Speech2Text'

        $('#start_img').css('margin-top', '1px')
        $('#start_img').css('margin-right', '1px')

        $('#info_start').remove()
        $('#div_language').css('opacity', '0');//()
        $('h1').remove()
        self.addListenController()
    }

    p.addListenController = function addListenContrl() {
        var cfgListen = {
            str: [176],
            fx: function ok() {
                console.log('hit next play button')
                $('#start_button').click()
            },
            codeMode: true,
            ignoreText: true
        }
        uiUtils.listenForKeyCodes(cfgListen);
    }

    p.listenForEventsOnDivResults = function updateISBNsWithLinks() {
        $('#comment_space').remove()
        // select the target node
        var target = document.getElementById('final_span');

        // create an observer instance
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                console.log(mutation.type, mutation);
                console.log('\t',  $(target).text() )
            });
        });
        //debugger
        // configuration of the observer:
        var config = {attributes: true, childList: true, characterData: true};

        // pass in the target node, as well as the observer options
       // observer.observe(target, config);
        // self.post()

        var y = {}
        y.ready = true;
        $('#start_button').click(function onX() {
            y.ready = ! y.ready
            if ( y.ready == false ) {
                return;
            }
            function  getTextLater() {
                var text =  $(target).text()
                console.log('text', text)
                self.postText(text)
            }
            setTimeout(getTextLater, 900)

        })
    }


    p.postText = function postText(text) {
        var l = "http://127.0.0.1:8080/postText"
        if ( text == self.data.lastText) {
            return;
        }
        self.data.lastText = text;
        $.ajax({
            type: "get",
            dataType: "text",
            url: l,
            data: {body:text},
            success: function (data, textStatus, xhr) {
               console.log('saved', data)
            },
            error: function (xhr, textStatus, errorThrown) {

                console.error('yyy', textStatus, xhr)
                //do nothing
            }
        });
    }
    p.post = function post() {

        var onClick = $('.pagination').find('a').last().attr('onclick')

        if (window.yCount == null) {
            window.yCount = 0
            console.log('skpped initia load')
            return;
        }
        window.yCount++
        var dbg = [window.chrome, window, document, this]
        console.log('dbg', dbg)
        console.log('xi', chrome.extension)

        /* var manifest = chrome.runtime.getManifest();
         console.log(manifest.name);
         console.log(manifest.version);
         debugger
         */
        if ($("#thumb_space2").length == 0  /*uiUtils.getUIById('thumb_space2')*/) {
            var div = uiUtils.tag('div')
            uiUtils.lastUI = div;
            div.attr('id', 'thumb_space2')
            // uiUtils.bg('orange')
            div.css('min-height', '20px')
            div.insertAfter('#thumb_space')
        }


        function display_channel() {
            //console.log('booty', arguments)
            var args = uiUtils.args(arguments)
            console.log('booty', args)
            return args
        }

        //http://www.myvidster.com/channel/45142/Favorites#/11
        function display_channel(channel_id, page, thumb_num, count) {
            //thumb_num = parseInt(thumb_num)+120
            //thumb_num = parseInt(thumb_num)+10

            if (window.tryXTimes) {
                var newPageCount = window.tryXTimes
                window.tryXTimes = null;
                for (var i = 0; i < newPageCount; i++) {
                    let pageNext = parseInt(page) + i + 1
                    //debugger
                    display_channel(channel_id, pageNext, thumb_num, count)
                }
            }
            //   debugger
            /*
             action:display_channel
             channel_id:1461961
             page:13
             thumb_num:50
             count:2167183
             */
            thumb_num = 50
            let xDataForReq = {
                action: "display_channel",
                channel_id: "" + channel_id + "",
                page: "" + page + "",
                thumb_num: "" + thumb_num + "",
                count: "" + count + ""
            };


            if (channel_id.includes('|||')) {
                var split = channel_id.split('|||')
                delete  xDataForReq.channel_id;
                xDataForReq.action = split[0]; //display_user
                xDataForReq.disp_name = split[1];
            }

            //  debugger
            l = '/processor.php';


            $.ajax({
                type: "post",
                dataType: "text",
                url: l,
                data: xDataForReq,
                success: function (data, textStatus, xhr) {

                    var div = $('<div/>')
                    div.append('page ' + page)
                    var newUI = $(data)
                    div.append(newUI)
                    $("#thumb_space2").append(div)
                    //debugger;
                    self.fixImages()
                    var pag = $('div.pagination').last()
                    var a = pag.find('a')
                    // debugger;
                    $.each(a, function onRemoveClick(k, v) {
                        v.onclick = null;
                        var a = $(v)
                        v.onclick = function onClick_PageNumber() {
                            var y = JSON.parse(JSON.stringify(x))
                            var pageNum = parseInt(a.text().trim())
                            y.page = pageNum;
                            console.log('click', a.text(), y)
                            display_channel(y.channel_id, y.page, y.thumb_num, y.count);
                        }
                    })
                },
                error: function (xhr, textStatus, errorThrown) {

                    console.error('yyy', textStatus, xhr)
                    //do nothing
                }
            });

            /*$("#thumb_space2").load(l, x, function () {
             self.fixImages()
             var pag = $('div.pagination').last()
             var a = pag.find('a')
             // debugger;
             $.each(a, function onRemoveClick(k,v) {
             v.onclick = null;
             var a = $(v)
             v.onclick=function onClick_PageNumber() {
             var y = JSON.parse(JSON.stringify(x))
             var pageNum = parseInt(a.text().trim())
             y.page = pageNum;
             console.log('click', a.text(), y)
             display_channel(y.channel_id, y.page, y.thumb_num, y.count);
             }
             })
             });*/


        }

        function display_user(disp_name, page, thumb_num, from, count) {
            /*  x = {
             action: "display_user",
             disp_name: "" + disp_name + "",
             page: "" + page + "",
             thumb_num: "" + thumb_num + "",
             count: "" + count + ""
             };
             l = '/processor.php';
             $("#thumb_space").load(l, x);
             */
            display_channel("display_user" + '|||' + disp_name, page, thumb_num, count)
        }


        console.log('ok', onClick)
        debugger
        window.tryXTimes = 10
        var thing = eval(onClick)
        window.tryXTimes = null
        /*    {action:display_channel
         channel_id:45142
         page:3
         thumb_num:16
         count:43093}
         */

        '/processor.php'
        console.log('this', onClick, thing)

    }

    function defineUtils() {
        var u = {};
        p.utils = u;
        u.searchGoogle = function searchGoogle(txt) {
            var u = 'https://www.google.com/search?q=' + txt + '&btnI'
            return u
        }

    }

    defineUtils();
}


if (window.xCount == null) {
    window.xCount = 0
}
window.xCount++
console.log('xCount', window.xCount)


var urlPath = 'chrome/demos/speech.html'
if (window.location.toString().includes(urlPath)) {
    if ( window.xCount >  1) {
        var i = new ChromeExtMod();
        i.init();
       // debugger
        /*
         i.processAmazon();
         i.getEbookFromBookzz();
         i.getWTF();*/
        i.listenForEventsOnDivResults();
    }

}
else {
    console.warn('why did u do this? myvidster.com not in hostname')
}

/*
 G:/Dropbox/projects/crypto/mp/ExtProxy/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 http://localhost:10110/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 */
