
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

        p.changeAll = function changeAll() {
            var first = $('a[title="Download this torrent using magnet"]')
            var rows = $("#main-content").find("tbody").find('tr')

            $.each(rows, function markRow(k, row) {
                row = $(row)
                var info = self.utils.getInfo(row)
                if ( k == 0 )
                console.log('info', info)
                //  return false;

                var boo = $(' <a/> ');
                boo.html(' mag&nbsp;');
                boo.addClass('bbb');
                var urlObj = {};
                urlObj.name = info.name;
                urlObj.url = info.href;
                var url = '';
                url = 'http://localhost:10110/mag' + '?'+ $.param(urlObj);
                info.urlMag = url;
                //boo.attr('href', url  );
                boo.click(function onClickDl() {
                    console.log('u', info.urlMag);
                    $.ajax({
                        url: info.urlMag,
                        //datattype: "html",
                        //data: data,
                        success: function (data) {

                            console.log('ok with', info.name, data)
                            //var output = p.utils.parseBodyHTML(data);

                            // debugger;
                           // div.html(output.body.html());

                           // output.addStyles();

                           // callIfDefined(cfg.fxDone, data)
                        },
                        error: function (a,b,c) {
                           // debugger;
                            console.error('cannot get loadPage info');
                           // gUtils.remoteFailed(a,b,c)
                        }
                    });
                })
                boo.insertAfter(info.magLink);

                var aSearch = $(' <a/> ')
                aSearch.html(' search ' );
                aSearch.addClass('bbb')
                var url = '';
                url = 'https://www.google.com/search?q=' + 'amazon' + ' ' + info.name;
                    aSearch.attr('href', url  );
                aSearch.attr('target', '_blank');
                //first.parent().append(boo)
                aSearch.insertAfter(info.title);
            })

        }


        p.utils = {};
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
    p.clearOld()
    p.changeAll();


    window.countOneTest++;
    console.log('what is this', window.countOneTest)


}
drawPBJS.go();
