console.log('loaded', 'amz_hijack.js')

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
        console.clear()
        $('.' + self.data.clearUI).remove();
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
            u.addLink({
                text: '&nbsp;go',
                title: 'Readable length',
                blank: true, href: url
            })


            u.lastUI.addClass(self.data.clearUI);

        })
    }

    p.getStories = function getStories() {
        if (typeof ListExtractorScraper === 'undefined') {
            ListExtractorScraper = window.exports.ListExtractorScraper;
        }

        if ($('.itemlist').length > 0) {
            console.log('story')
            var tr = $('.itemlist').find('tr')
            var list = [];

            var currentStory = {}

            //return;

            var colors = [
                '#CD5C5C',
                '#F08080',
                '#FA8072',
                '#E9967A',
                '#FFA07A'
            ]

            var str = 'storiesAnnotated'
            try {
                var oldUIs = $('.' + str)
                console.log(oldUIs)
                oldUIs.each(tr, function onVK(k, v) {
                    var ui = $(v)
                    ui.removeClass(str)
                    ui.css('background-color', '');
                });
            } catch ( e ) {
                console.error(e)
            }

            var index =0 ;

            //console.log(window.sh, 's')
            $.each(tr, function onK(k, v) {
                //var list = {}
                var td = $(v)
                if (td.find('.title').length > 0) {
                    var currentStory = {}
                    list.push(currentStory)
                    currentStory.title = 'd'
                    index++
                    if ( index > colors.length -1 ){
                        index = 0
                    }
                    var colorsNext = colors[index]
                    td.addClass(str)
                    td.css('background-color', colorsNext)
                }
            })


            /*
            #CD5C5C
#F08080
#FA8072
#E9967A
#FFA07A
             */

            console.log('list', list)
            //$()
            return

        }
        //if ( window.location.includes())

        var y = {}


        var instance = new ListExtractorScraper();
        var config = {};
//config.file = 'example_bookzz.html';
        config.jquery = true;

        // config.maxItems = 1;

        instance.init(config)
        instance.setupAreas('.itemlist', '.athing')
        instance.setupLiField('name', instance.utils.prop('itemprop', 'name'))
        instance.setupLiField('author', instance.utils.prop('itemprop', 'author'))


        instance.setupLiField('searchGood', instance.utils.prop('itemprop', 'name'))
        instance.props.doNotStore()
        instance.props.addItem({
            type: 'a', text: 'GR',
            blank: true,
            addStyles: {padding: '2px'},
            href: function makeRef(o) {
                //    debugger
                return 'https://www.google.com/search?q=goodreads ' + o.name + ' ' + o.author + '&btnI'
            }
        })


        instance.setupLiField('searchAmz', instance.utils.prop('itemprop', 'name'))
        instance.props.defaultAnnotation('extrasAnnots')
        instance.props.doNotStore()
        instance.props.addItem({
            type: 'a', text: 'Search',
            blank: true,
            href: function makeRef(o) {
                //    debugger
                return "http://www.google.com/search?btnI=I'm+Feeling+Lucky&q=" +
                    'amazon ' + o.name + ' ' + o.author //+ '&btnI'
                return 'https://www.google.com/search?q=amazon ' + o.name + ' ' + o.author + '&btnI'
            }
        })


        instance.test();

        window.instance = instance;
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


if (window.location.host.includes('news.ycombinator.com')) {
    var i = new ChromeExtMod();
    i.init();
    //alert('d')
    /*
    i.processAmazon();
    i.getEbookFromBookzz();
    i.getWTF();*/
    //i.updateISBNsWithLinksG();
    i.getStories();
} else {
    console.warn('why did u do this? amazon.com not in hostname')
}

/*

 G:/Dropbox/projects/crypto/mp/ExtProxy/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 http://localhost:10110/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 */
