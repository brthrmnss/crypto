

var isBrowser = false
if ( isBrowser ) {

} else {
    var sh = require('shelpers').shelpers;
    var shelpers = require('shelpers');
    var cheerio = require('cheerio');
    var shelpers = require('shelpers');
    var ListExtractorScraper = require('./ListExtractorScraper.js').ListExtractorScraper
}
function ListExtractorScraper2() {
    var p = ListExtractorScraper2.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

       // self.goRun();
    }
/*
    p.goRun2 = function goRun2(config) {
        
        
        return;
        var instance = new ListExtractorScraper();
        var config = {};
        config.file = 'example_bookzz.html';

        instance.init(config)
        instance.setupAreas('#searchResultBox', '.resItemBox')
        instance.setupLiField('name', instance.utils.prop('itemprop', 'name'))
        instance.setupLiField('author', instance.utils.prop('itemprop', 'author'))
        instance.test();
    }

    p.goRun = function goRun(config) {
        var instance = new ListExtractorScraper();
        var config = {};
        config.file = 'example_bookzz.html';

        instance.init(config)
        instance.setupAreas('#searchResultBox', '.resItemBox')
        instance.setupLiField('name', instance.utils.prop('itemprop', 'name'))
        instance.setupLiField('author', instance.utils.prop('itemprop', 'author'))
        instance.test();
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


    p.processJqueryToGetList  = function processJqueryToGetList(mainList, listItem) {
        var listContainer = self.$(self.settings.list)
        if ( listContainer.length == 0 ) {
            self.proc('coudl not find list', self.settings.list)
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
                listItem[v.prop] = item.text()
            }) 

            listItems.push(listItem)
        })

        self.proc('export')
        console.log(listItems)
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
    }*/


    function defineUtils() {
        var utils = {};
        p.utils = utils;
      /*  utils.prop = function jqueryProp(attr, val) {
            var file = sh.bracket(attr+'='+sh.qq(val));
            return file;
        }*/

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.ListExtractorScraper2 = ListExtractorScraper2;

if (module.parent == null) {
    var instance = new ListExtractorScraper2();
    var config = {};
    config.file = 'example_bookzz.html';

    instance.init(config)
    instance.goRun();
}



