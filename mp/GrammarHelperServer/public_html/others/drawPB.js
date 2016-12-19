
var drawPBJS = {};

if ( window.countOneTest == null )
    window.countOneTest = 0;

drawPBJS.go = function go() {

    var utils = {};

    function PBR() {
        var p = PBR.prototype;
        p = this;
        var self = this;
        self.data = {};
        p.init = function method1(url, appCode) {
        }


        p.clearOld = function clearOld() {
            $('.bbb').remove();
            $('.xAddedElement').remove();
        }
        p.changeIt = function changeIt(url, appCode) {
            var first = $('a[title="Download this torrent using magnet"]')
            first = $(first[1])
            console.log('first', first)
            var a = first;
            var boo = $(' <a/> ')
            boo.html(' mag&nbsp;');
            boo.addClass('bbb')
            var x = {}
            x.name = a.attr('name')
            x.url = a.attr('href')

            var url = '';
            url = 'http://localhost:10110/mag' + '?'+ $.param(x);
            boo.attr('href', url  );
            //first.parent().append(boo)
            boo.insertAfter(first);
        }

        p.processEachResultRow = function processEachResultRow() {
            var first = $('a[title="Download this torrent using magnet"]')
            var rows = $("#main-content").find("tbody").find('tr')

            $.each(rows, function markRow(k, row) {
                row = $(row)
                var info = self.utils.getInfo(row)
                if ( k == 0 )
                    console.log('info', info)
                //  return false;

                var linkDownloadMagnet = $(' <img/> ');
                linkDownloadMagnet.html(' mag&nbsp;');
                linkDownloadMagnet.attr('src', 'http://localhost:10110/others/images/download.png')
                linkDownloadMagnet.addClass('xAddedElement');
                linkDownloadMagnet.css('height', '12px');
                linkDownloadMagnet.css('cursor', 'pointer');
                var urlObj = {};
                urlObj.name = info.name;
                urlObj.url = info.href;
                var url = '';
                url = 'http://localhost:10110/mag' + '?'+ $.param(urlObj);
                info.urlMag = url;
                //boo.attr('href', url  );
                linkDownloadMagnet.click(function onClickDl() {
                    console.log('u', info.urlMag);
                    $.ajax({
                        url: info.urlMag,
                        //datattype: "html",
                        //data: data,
                        success: function (data) {
                            console.log('ok with', info.name, data)
                        },
                        error: function (a,b,c) {
                            console.error('cannot get loadPage info');
                        }
                    });
                })
                linkDownloadMagnet.insertAfter(info.magLink);

                //clear event handlers
                var magLinkClone = info.magLink.clone();
                magLinkClone.css('opacity', 1);
                magLinkClone.css('opacity', 1);
                magLinkClone.insertAfter(info.magLink);
               // magLinkClone.attr('href', '')
                magLinkClone.attr('href', 'javascript: void(0)');
                info.magLink.remove();
                magLinkClone.click(function onClickDlMagLinkIcon() {
                    console.log('u', info.urlMag);
                    $.ajax({
                        url: info.urlMag,
                        success: function (data) {
                            console.log('ok with', info.name, data)
                            magLinkClone.css('opacity', 0.6);
                        },
                        error: function (a,b,c) {
                            console.error('cannot get loadPage info');
                        }
                    });
                })


                var aSearch = $(' <a/> ')
                aSearch.html(' search ' );
                aSearch.addClass('xAddedElement');

                var iconSearch = $(' <img/> ')
                iconSearch.attr('src', 'http://localhost:10110/others/images/search.png')
                iconSearch.attr('title', 'search in google for torrent')
                aSearch.html('' );
                aSearch.append(iconSearch)

                iconSearch.css('height', '10px');
                iconSearch.css('cursor', 'pointer');
                var url = '';
                url = 'https://www.google.com/search?q=' + 'amazon' + ' ' + info.name;
                aSearch.attr('href', url  );
                aSearch.attr('target', '_blank');

                aSearch.click(function onClickDlMagLinkIcon() {
                    console.log('u', info.urlMag);
                    aSearch.css('opacity', 0.6);
                })


                //first.parent().append(boo)
                aSearch.insertBefore(info.title);
            })

        }

        p.changeFlatLinks = function changeFlatLinks() {
            var links = $('td[colspan=9]').find('a');
            if ( links.length == 0 ) {
                var links = $('div[align=center]').find('a');
            }
            var links = $('a');

            var xml = 'http://localhost:3000/proxy?url=https://thepiratebay.org/search/epub/0/7/0'
            var loc = window.location.href;
            if ( loc == 'http://localhost:10110/others/GoonerTPB%20-%20TPB.html' )
                loc= xml;
            console.log('loc', loc)

            console.log('what are found links?', links.length)

            //return;
            if (loc.includes('url=')) {
                var pre = loc.split('url=')[0]+'url='
                var post = loc.split('url=')[1]
                console.log('per', pre, post)

                if ( post.includes('://')) {
                    var prePost = post.split('/').slice(0,3)
                }

                var yyyy = pre + prePost.join('/')
                console.log('prePost', yyyy)
            }


            var form = $('form');
            self.utils.replaceLinks(form, yyyy,pre, 'action')
           // return;

            $.each(links, function proxCLink(k,v) {

                self.utils.replaceLinks(v, yyyy, pre)
                return;
                /*var ui = $(v);
                var txt = ui.text();

                if ( $.isNumeric(txt) == false ) {
                    return;
                }

                var href2 = ui.attr('href2');
                if ( href2) {
                    ui.attr('href', href2);
                }

                var href = ui.attr('href')

                if ( href.indexOf('/') != 0 ) {
                    return;
                }
                console.log('y', txt, href)
                console.log('\t', 'to', yyyy+href)
                ui.attr('href2', href);
                ui.attr('href', yyyy+href)*/
            });
            //$('a').each(function processLink(k,))
        }

        p.utils = {};

        p.utils.replaceLinks = function replaceLinks(v, newRoot, newRootPre, prop) {
            var ui = $(v);
            var txt = ui.text();

            /*if ( $.isNumeric(txt) == false ) {
                return;
            }*/

            if ( prop == null ) {
                prop = 'href';
            }
            var propBackup = prop+'2';
            var href2 = ui.attr(propBackup);
            if ( href2) {
                ui.attr(prop, href2);
            }

            var href = ui.attr(prop);

            //debugger
            if ( href.indexOf('/') != 0 ) {
                console.log('y', txt, href);
                console.log('\t', 'to', newRootPre+href);
                ui.attr(propBackup, href);
                ui.attr(prop, newRootPre+href);
            } else{
                console.log('y', txt, href);
                console.log('\t', 'to', newRoot+href);
                ui.attr(propBackup, href);
                ui.attr(prop, newRoot+href);

            }

            return ui;
        }



        p.utils.getInfo = function getInfo(row) {
            var a = row.find('a[title="Download this torrent using magnet"]');
            var ret = {};

            ret.href = a.attr('href');


            ret.magLink = a;
            var title = row.find('.detName').find('a');
            ret.title = title

            ret.name = title.html();
            ret.nameOrig = ret.name;

            if ( ret.name ) {
                ret.name = ret.name.replace(/epub/gi, '');
                ret.name = ret.name.replace(/\(\)/gi, '');
            }
            return ret;
        }


        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return
            }
            sh.sLog(arguments)
        }
    }

    var p = new PBR();
    p.changeFlatLinks();

    p.clearOld()
    p.processEachResultRow();



    window.countOneTest++;
    console.log('what is this', window.countOneTest)


}
drawPBJS.go();
