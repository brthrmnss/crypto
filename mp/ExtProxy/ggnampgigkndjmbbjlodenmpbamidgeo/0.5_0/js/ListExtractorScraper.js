

var isBrowser = false
if ( isBrowser ) {

} else {
    var sh = require('shelpers').shelpers;
    var shelpers = require('shelpers');
    var cheerio = require('cheerio');

}
function ListExtractorScraper() {
    var p = ListExtractorScraper.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.method();
    }

    p.method = function method(config) {
    }

    p.test = function test(config) {
        self.settings.file =  'example_bookzz.html';
        var contents = sh.readFile(self.settings.file)


        self.proc('size', contents.length)


        self.contents = contents;
        $ = cheerio.load(contents);
        self.$ = $;


        self.processJqueryToGetList();
    }


    p.parseContents = function parseContents(body) {

        if ( body == null ) {
            body = self.settings.body;
        }

        self.contents = body;
        $ = cheerio.load(self.contents);
        self.$ = $;

        self.processJqueryToGetList();
    }


    p.processJqueryToGetList  = function processJqueryToGetList(mainList, listItem) {
        var listContainer = self.$(self.settings.list)
        if ( listContainer.length == 0 ) {
            self.proc('coudl not find list', self.settings.list)
            sh.callIfDefined(self.settings.fxDone, [])
            return
        }
        var items = listContainer.find(self.settings.listItem)
        self.proc('---',items.length, self.settings.listItem)

        var listItems = [];
        sh.each(items, function onProcessItem(k,v) {
            var ui = $(v)
            var listItem = {};
            sh.each(self.settings.fields, function getfield(k,v) {

                var item = ui.find(v.query)
                var val = item.text()
                if ( v.fxText ) {
                    val = v.fxText(val)
                }
                if ( v.parent) {
                    item = $(item.parent())
                }
                if ( v.keepAttr) {
                    val = item.attr(v.keepAttr);
                }

                listItem[v.prop] = val
            })

            listItems.push(listItem)
        })

        self.proc('export')
        if ( self.settings.showOutput != false ) {
            console.log(listItems)
        }

        sh.callIfDefined(self.settings.fxDone, listItems)
    }

    p.setupAreas  = function setupAreas(mainList, listItem) {
        self.settings.list = mainList;
        self.settings.listItem = listItem;
    }

    p.setupLiField = function setupLiField(prop, jq) {
        self.settings.fields = sh.dv(self.settings.fields, []);
        var fields = self.settings.fields;
        var t = {};
        t.prop = prop
        t.query= jq
        fields.push(t)
        return t;
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.prop = function jqueryProp(attr, val) {
            var file = sh.bracket(attr+'='+sh.qq(val));
            return file;
        }

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.ListExtractorScraper = ListExtractorScraper;

if (module.parent == null) {
    var instance = new ListExtractorScraper();
    var config = {};
    config.file = 'example_bookzz.html';

    instance.init(config)
    instance.setupAreas('#searchResultBox', '.resItemBox')
    instance.setupLiField('name', instance.utils.prop('itemprop', 'name'))
    instance.setupLiField('author', instance.utils.prop('itemprop', 'author'))

    instance.test();
}



 