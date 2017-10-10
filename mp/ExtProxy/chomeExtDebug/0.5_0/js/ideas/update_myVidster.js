console.log('loaded', 'update_myVidster.js')

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
    }

    p.fixImages = function fixImages() {
        $('.mvp_grid_panel_title').css('text-align', 'left')
        $('.mvp_grid_panel_details').css('text-align', 'left')
        $('img.photos').css('border', '0px solid black')
        $('img.photos').css('width', 'inherit')

        $('.details3').parent().css('min-width', '800px')
    }
    p.updateISBNsWithLinks = function updateISBNsWithLinks() {
        self.fixImages()

        $('#comment_space').remove()

        // $('.details_video').remove();
        //$('iframe').remove();
        $('iframe').each(function okRemove(k,v) {
            var ui = $(v)
            if ( ui.parents('#video_space').length > 0 ) {
                return;
            }
           // console.log('---', ui, ui.parents('#video_player'))
            ui.remove();
        })

        $('#taboola-below-article-thumbnails').remove();

        $('.at-share-btn-elements').remove();
        $('.addthis_sharing_toolbox').remove()
        $('.footer').remove();
        $('.home-header').remove();
        $('.home-sub').remove();
        self.post()
    }


    p.post = function post() {

        var onClick = $('.pagination').find('a').last().attr('onclick')


        if (  $("#thumb_space2").length == 0  /*uiUtils.getUIById('thumb_space2')*/ ) {
            var div= uiUtils.tag('div')
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
            thumb_num = 250
            x = {
                action: "display_channel",
                channel_id: "" + channel_id + "",
                page: "" + page + "",
                thumb_num: "" + thumb_num + "",
                count: "" + count + ""
            };
            l = '/processor.php';
            $("#thumb_space2").load(l, x, function () {
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
            });



        }

        console.log('ok', onClick)

        var thing = eval(onClick)
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


if (window.location.host.includes('myvidster.com')) {
    var i = new ChromeExtMod();
    i.init();
    /*
     i.processAmazon();
     i.getEbookFromBookzz();
     i.getWTF();*/
    i.updateISBNsWithLinks();
}
else {
    console.warn('why did u do this? myvidster.com not in hostname')
}

/*
 G:/Dropbox/projects/crypto/mp/ExtProxy/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 http://localhost:10110/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 */
