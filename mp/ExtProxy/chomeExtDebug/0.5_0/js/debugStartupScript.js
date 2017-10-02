/*
@author ebooks.wtf@yandex.com
@license do what you want with this simple chrome extension
@date 2016-02-28
@version 0.5
 */
var four = 2 + 2
console.log('boody')
eval('four = 3 + 2; console.log("fff", "four")')
//window.$ = $;


console.log('loaded', 'debugStartupScript.js')

function loadScriptSync(src, fxDone) {
    var s = document.createElement('script');
    s.src = src;
    s.type = "text/javascript";
    s.onload = function () {
        console.log('Done', 'script.js');
        //debugger
        if (fxDone) {
            fxDone()
        }
        console.log('loaded')
    }
    //debugger
    s.async = false;                                 // <-- this is important
    document.getElementsByTagName('head')[0].appendChild(s);
    //debugger
}

//loadScriptSync('amz_hijacks.js')


function ChromeExtLoader() {
    var p = ChromeExtLoader.prototype;
    p = this;
    var self = this;

    self.data = {};
    self.data.baseUrl = "http://localhost:10110/file/"  +
         "media/sf_Dropbox/projects/crypto/"  +
          "mp/ExtProxy/chomeExtDebug/0.5_0/js/"
    p.init = function init(config) {
        //self.settings = sh.dv(config, {});
        self.method();
    }

    p.method = function method(config) {
    }

    p.loadUrl = function loadLocalUrl(urlPre, fxDone) {
        var url = urlPre;
        var url = "http://localhost:10110/file/" +
            "media/sf_Dropbox/projects/crypto/" +
            "mp/ExtProxy/chomeExtDebug/0.5_0/js/" +
            urlPre
        url += '?=' + Math.random();

        $.ajax({
            url: url,
            success: function (data) {
                console.log('loaded ', urlPre)
                eval(data);
                if (fxDone) {
                    fxDone(data, urlPre)
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('xhr', url, textStatus, errorThrown)
            },
            dataType: "text"
        });
    }


    p.loadScripts = function loadScripts(_scripts2, fxDone) {

        if (_scripts2.length == 0) {
            console.log('finished');
            if (fxDone) fxDone();
            return;
        }
        var url = _scripts2.shift();
        /*if ( window.preamble == null ) {
            window.preamble = window.location.origin + '/test3/'
        }
        //if ( url.includes(window.preamble) == false ) {
        //    debugger
        url = window.preamble + url;
        //}*/

        var debug = false;
        // debug = true;
        if (debug) {
            console.log('downloading', url)
        }


        self.loadUrl(url, function doneLoadingFile() {
            if (debug) {
                console.error('what is window tests?', url, window.tests);
            }

            function loadNextScript() {
                loadScripts(_scripts2, fxDone);
            }

            setTimeout(loadNextScript, 50)

        })

        return;

        jQuery.getScript(url)
            .done(function onLoaded() {
            })
            .always(function doneLoadingFile() {
                if (debug) {
                    console.error('what is window tests?', url, window.tests);
                }

                function loadNextScript() {
                    loadScripts(_scripts2, fxDone);
                }

                setTimeout(loadNextScript, 50)

            })
            .fail(function (a, b, c, d) {
                console.error('failed to load', url, a == null, b, c, d)
                console.error(c.stack)
            });
    }

    p.loadInitScripts = function loadInitScripts(fxDone) {
        self.loadScripts([
            'lib/shelpers-mini.js',
            'lib/ui_utils.js',
        ], fxDone)
    };
    p.loadJquery = function loadJquery(fxDone) {
        loadScriptSync(
            self.data.baseUrl+'lib/jquery-3.1.1.min.js',
            fxDone)
    };

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

var loader = new ChromeExtLoader();
var config = {};
loader.init(config)

window.uiTag = 'uiReloadableChromeExt'

function onBtn() {
    if ( window.socket ) {
        var urlPage = '/media/sf_Dropbox/projects/crypto/mp/ExtProxy/chomeExtDebug/0.5_0/js/debugStartupScript.js'
        window.socket.emit('window.invoke.loopback', urlPage)
        var urlPage = 'G:/Dropbox/projects/crypto/mp/ExtProxy/chomeExtDebug/0.5_0/js/debugStartupScript.js'
        window.socket.emit('window.invoke.loopback', urlPage)
        return;
    }
    if (window.$ == null || window.jQuery == null ) {
        console.warn('jquery not found ... going to load it... ')
        loader.loadJquery(function init2() {
            loader.loadInitScripts(initStuff)
        })
        //debugger;
    } else {
        loader.loadInitScripts(initStuff)
        addBtnToReloadExt();
        //  initStuff()
    }

    function initStuff() {
        //loader.loadSet()
        $('.' + window.uiTag).remove();
        if (window.location.host.includes('b-ok.org') ||
            window.location.host.includes('book4you.org') ) {
            loader.loadScripts([
                'lib/ListExtractorScraper.js',
                'bookzzAnotSearcher.js'
            ])
        }

        if (window.location.host.includes('amazon.com')) {
           // alert('ok in amazon')
            loader.loadScripts([
                'ideas/amz_hijacks.js',
              //  'bookzzAnotSearcher.js'
            ])
        }

        var ebooklogin = window.location.host.includes('ebooklogin.com')
        if (window.location.host.includes('ebook.farm') || ebooklogin ) {
            // alert('ok in amazon')
            loader.loadScripts([
                'ideas/update_ebookfarm.js',
                //  'bookzzAnotSearcher.js'
            ])
        }

        function urlInc(str) {
           return window.location.host.includes(str)
        }


        if ( urlInc('myvidster.com') ) {
            // alert('ok in amazon')
            loader.loadScripts([
                'ideas/update_myVidster.js',
            ])
        }

        if (window.location.host.includes('news.ycombinator.com')) {
            // alert('ok in amazon')
            loader.loadScripts([
                'lib/ListExtractorScraper.js',
                'ideas/news.ycombinator.com.js',
                //  'bookzzAnotSearcher.js'
            ])
        }


        //  loader.loadUrl('bookzzAnotSearcher.js')
        // loader.loadUrl('bookzzAnotSearcher.js')
    }
}

setTimeout(function onLoadLater() {
    onBtn()
},200)


//--allow-running-insecure-content
function addBtnToReloadExt() {
    //

    var btn = $('<button style="position:absolute">Retryz</button>')
    btn.css('position', 'absolute');
    btn.css('z-index', '500');
    btn.css('top', '0px');
    btn.css('position', 'absolute');
    btn.click(function load() {
        onBtn()
    })


    $('body').append(btn)

    function processAmazon() {
//console.clear()
        console.log('processAmazon')

// debugger
        function ok() {
            console.log('cleaning up layouts')
            //var element = document.getElementById('div-gpt-ad')
            // element.outerHTML = "";
            // delete element;
            $('#amsDetailRightEBookTall_feature_div').html('')
            //$('#div-gpt-ad').remove();
            $('#navSwmHoliday').remove()
            $('#nav-swmslot').remove();
            $('#sendSampleBox').remove();

            var ids = ['sponsored-products-dp_feature_div',
                'redeemCode', 'tellAFriendBylineBox_feature_div',
                'kcpApp_feature_div', //try kindle button,
                'quickPromoBucketContent', //random content above
                'nav-subnav', //advance search resleas bes sellers ...ugh
                'heroQuickPromo_feature_div',
                'aboutEbooksSection', //word wise
                'sponsoredLinksCsaIframe', //other links,
                //'nav-logo',
                'nav-xshop',
                'nav-upnav',
                'universal-hero-quick-promo',
                'ad',
                'amsDetailRightPBookTall',
                'sitbLogo', //look inside
            ]

            $.each(ids, function removeId(k, id) {
                if (id.trim() == '') return;
                var ui = $('#' + id)
                ui.remove()
            })
            $('[name="goKindleStaticPopDiv"]').remove();
            $('[name="submit.give-as-gift"]').remove();


            //fix kindle bar
            $('.print-list-price').remove();
            $('.print-sold-by').remove();
            //for books remove book price
            $('.a-column.a-span7.a-text-right.a-span-last').remove()

            'Unlimited reading. Over 1 million titles.' //go up to and elete
            $('.a-section .a-spacing-small .a-spacing-top-micro .a-text-left').remove();
            $('#deliverTo').remove()
            $('.botmORDivider').remove();

            $('#giftButtonStack').remove()

            //remove unlimited icon
            $('.a-icon.a-icon-kindle-unlimited.a-icon-medium').parent().parent().remove()

            $('.nav-search-scope').css('border-radius', '0px')
            $('.nav-search-submit').css('border-radius', '0px')
            $('.nav-search-dropdown').css('border-radius', '0px')

            $('nav-left').find('nav-line-1').remove(); //remove departmetns drop down
            $('#nav-shop').find('.nav-line-2').remove(); //remove departmetns drop down
            $('#nav-logo').css('opacity', '0')


            function getText(ui) {
                ui = $(ui);
                var text = ui.text().toLowerCase().trim();
                return text;
            }

            function changeTextTo(from, to, type, like) {


                if (like === undefined) like = true;
                if (from.length == 1) {
                    from.text(to)
                    return;
                }


                from = from.trim().toLowerCase();

                var uiItems = $(type)
                $.each(uiItems, function (k, ui) {
                    ui = $(ui)

                    var txt = getText(ui)
                    var isLike = like && txt.includes(from)
                    if (isLike == false && type == 'span') {
                        // console.log(txt, '$', from)
                    }
                    if (txt == from || isLike) {
                        ui.text(to)
                    }
                })
            }

            // changeTextTo('buy now with', 'buy', 'a')
            changeTextTo('read for free', 'read', 'span')
            //.css('padding-top', '10px')
            //changeTextTo('#one-click-button', 'buy')
            $('#one-click-button').parent().text('buy')


            var removeH2Titles = [
                'Editorial Reviews',
                'Book Details',
                'More About the Author',
                'More About the Author',
                'Customer Reviews',
                'Customers Who Bought This Item Also Bought',
                'Product Details',
                'Editorial Reviews',
                'Frequently Bought Together'
            ]
            $.each(removeH2Titles, function on(k, v) {
                removeH2Titles[k] = v.trim().toLowerCase()
            })

            //console.log('ok', $('h2'))
            $.each($('h2'), function (k, ui) {
                ui = $(ui)
                var txt = ui.text().trim().toLowerCase();
                console.log('txt-h2', txt)
                if (removeH2Titles.includes(txt)) {
                    ui.remove();
                    return;
                }
            })


            var removeH3Titles = [
                'Biography',
                'Amazon.com Review',
                'Top Customer Reviews',
                'Most Recent Customer Reviews',
                'Customer Images',
                'Amazon Author Rank'
            ]
            $.each(removeH2Titles, function on(k, v) {
                removeH2Titles[k] = v.trim().toLowerCase()
            })

            // console.log('ok', $('h3'))
            $.each($('h3'), function (k, ui) {
                ui = $(ui)
                var txt = ui.text().trim().toLowerCase();
                console.log('txt', txt)
                if (removeH3Titles.includes(txt)) {
                    ui.remove();
                    return;
                }
            })

            debugger
        }

        ok()
        //return;
        //debugger
        setTimeout(ok, 0)
        setTimeout(ok, 500)

        setTimeout(ok, 2500)

    }

//debugger
//processAmazon();
}
