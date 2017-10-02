console.log('loaded', 'ebookfarm.js')

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
        debugger
        console.clear()
        $('.' + self.data.clearUI).remove();

        debugger
    }

    p.updateISBNsWithLinks = function updateISBNsWithLinks() {
        var lis = $('.panel-body').find('ul').find('li')
        $.each(lis, function onProc(k, v) {
            var ui = $(v)


            var text = ui.text()
            if (text.toUpperCase() != text) {
                return;
            }
          //  debugger
            var u = uiUtils;
            uiUtils.flagCfg = {};
            uiUtils.flagCfg.addTo = ui;
            // uiUtils.flagCfg.addSpacerAfter = true;

           // uiUtils.addSpan({text: '&nbsp;go', title: 'How Many macthes'})
          //  u.lastUI.attr('target', 'blank')
            var url = self.utils.searchGoogle('amazon ' + text)
            u.addLink({text:  '&nbsp;go',
                title: 'Readable length',
                blank: true, href: url})


            u.lastUI.addClass(self.data.clearUI);

        })
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


if (window.location.host.includes('ebook.farm')) {
    var i = new ChromeExtMod();
    i.init();
    /*
    i.processAmazon();
    i.getEbookFromBookzz();
    i.getWTF();*/
    i.updateISBNsWithLinks();
}
else if (window.location.host.includes('ebooklogin.com')) {
    $('#googleBtn').click()
}
else {
    console.warn('why did u do this? ebook.farm/login.com not in hostname')
}

/*

 G:/Dropbox/projects/crypto/mp/ExtProxy/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 http://localhost:10110/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 */
