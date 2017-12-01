console.log('loaded', 'update_myVideos.js')

function PaginatorC() {
    var self = this;

    var p = self;
    self.data = {};
    self.data.clearUI = 'yyEbF'

    p.init = function init() {
        self.settings = {};
        self.settings.divPaginator = '.pagination'

        var pag = $(self.settings.divPaginator).first()
        var pages = pag.find('li').find('a')
        console.log('pages', pages)

        var pagesnum = [];
        var seenActive = false;
        var maxPages = 8
        pages.each(function collectPages(k, v) {
            var page = $(v)
            if (page.hasClass('active') || page.find('.active').length > 0) {
                seenActive = true
                return;
            }
            if (seenActive == false) {
                return;
            }
            //debugger
            if (page.hasClass('no-page') || page.find('.no-page').length > 0) {
                return;
            }
            if (pagesnum.length > maxPages) {
                return false;
            }
            pagesnum.push(page)
        })


        // console.clear();
        $.each(pagesnum, function addUrl(k, ui) {
            // var  page = $(v)
            var a = ui
            //    debugger
            var url = a.attr('href')
            console.log(ui.text(), url, ui)

            var div = uiUtils.tag('div')

            var id = 'page_' + ui.text()
            div.attr('id', id)

            if ($('#' + id).length == 0) {
                0
                var span = uiUtils.tag('span')
                span.text('....' + id)
                div.append(span)
                $('.mozaique').append(div);
            } else {
                return;
            }

            var helper = {};


            var cfg = {}
            //cfg.div = '.modal-contact .content'
            // cfg.append = true
            // cfg.divCreatable = u.join2('holder', self.settings.id)
            cfg.div = '#' + id
            //cfg.url = "/themes/minimal_v0" + "/js/comps/simpleList.html"
            cfg.url = url
            // cfg.jqOnHTML = '.mozaique'
            cfg.fxHTMLRaw = function fxHTMLRaw(html) {
                var ui = $(html)
                var ui2b = ui.find('.mozaique')
                var ui2 = ui2b.html()

                ui2 = ui2.split('<script>').join('<xscript>')
                ui2 = ui2.split('</script>').join('</xscript>')

                debugger
                var xscripts = [];
                var ui2Parsed = $(ui2)
                $.each(ui2Parsed, function findXScripts(k, v) {
                    if (v.nodeName == 'XSCRIPT') {
                        xscripts.push(v.innerText)
                        v.innerText = 'dfsdf'
                        v.remove()
                        v.innerText = ''
                        $(v).remove()
                    }

                    if (v.nodeName == 'IMG') {
                        helper.rotator.prototype.addThumb(v)
                    }

                    if (v.nodeName == '#text') {
                       // v.remove()
                        v.innerText  = 'ddd'
                    }
                })

                function setTimeoutOnLater() {
                    var yy = xscripts.join('\n');

                    //  debugger;
                    eval(yy);
                    console.log('eval this');
                }

                setTimeout(setTimeoutOnLater, 1200)
                console.log('update vids')
                console.log('txt', $(ui2))


                //debugger;
                return ui2Parsed
                var span = uiUtils.tag('span')
                span.text('data')
                return span.html();
            }


            //my/shirt.js now has some dependencies, a cart and inventory
//module in the same directory as shirt.js
            /*     define(["./cart", "./inventory"], function(cart, inventory) {
             //return an object to define the "my/shirt" module.
             debugger
             return {
             color: "blue",
             size: "large",
             addToCart: function() {
             inventory.decrement(this);
             cart.add(this);
             }
             }
             }
             );
             */

            function updateFx(e) {
                var t = !1;
                if ("object" == typeof e) t = e, e = t.id.substr(6); else {
                    var t = document.getElementById("video_" + e);
                    if (!t)return void console.error("Video div id " + e + " not found")
                }
                var n = xv.dom.getChildrenRecursive(t), i = E();
                for (var o in n) {
                    var a = n[o];
                    if ("IMG" !== a.nodeName) "A" != a.nodeName || -1 !== a.href.indexOf("/THUMBNUM") && (a.href = a.href.replace(/THUMBNUM/g, i)); else {
                        var r = a.getAttribute("data-idcdn"), s = a.getAttribute("data-src");
                        if (!s)continue;
                        if (-1 == s.indexOf("/thumbs"))continue;
                        -1 !== s.indexOf(".THUMBNUM.") && (s = s.replace(/THUMBNUM/g, i)), s = this.replaceThumbUrl(s, r), a.setAttribute("data-src", s), this.thumb_lazyload[e + "_" + Math.floor(600 * Math.random())] = a, this.checkThumbToDisplay(a)
                    }
                }
            }

            //debugger
            cfg.fxDone = function on() {
                console.log('loaded', id)
            };
            //cfg.replaceThis = 'dialogMyLibrary';
            //  cfg.withThis = self.settings.id;
            uiUtils.utils.loadPage(cfg)

            /* $("#thumb_space2").load(l, x, function () {
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

            //mozaique
        })


        function setTimeoutOnLater() {
            var img = $('img')
            require(["lib/helpers/thumbs/rotator"], function (rotator) {
                //debugger;
                console.log('rotator', rotator)
                var thumbs = {}
                rotator.prototype.thumbs = thumbs;
                thumbs.data = {}
                thumbs.data.thumbz = []
                thumbs.data.thumbz = [];
                thumbs.index = function (item) {
                    return thumbs.data.thumbz.indexOf(item)
                }
                thumbs.add = function (item) {
                    return thumbs.data.thumbz.push(item)
                }
                //helper.rotator = rotator;

                var imgs = $('img')
                $.each(imgs, function onK(k, v) {
                    debugger
                    rotator.prototype.thumbs = thumbs;
                    rotator.prototype.addThumb(v)
                })
                rotator.prototype.initEngine();
                //  debugger;
               // eval(yy);
                console.log('eval this');
            })
        }

        setTimeout(setTimeoutOnLater, 1800)

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
        $('iframe').each(function okRemove(k, v) {
            var ui = $(v)
            if (ui.parents('#video_space').length > 0) {
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


function MyVids() {
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

        var imgs = $('img')
        $.each(imgs, function onI(k, v) {
            var img = $(v);
            var src = img.attr('src');
            if (src && src.includes('traffic')) {
                img.remove();
                return;
            }
        })

        var pag = new PaginatorC
        pag.init();
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
        $('iframe').each(function okRemove(k, v) {
            var ui = $(v)
            if (ui.parents('#video_space').length > 0) {
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


if (window.location.host.includes('videos.com')) {
    var i = new MyVids();
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

