

var isBrowser = false

if (typeof exports === 'undefined' || exports.isNode == false) {
    if (typeof exports === 'undefined') {
        exports = {}
        exports.isNode = false;
        //must be in browser
    }
    if ( exports.shelpers == null ) {
        window.sh = uiUtils;
    }
    isBrowser = true
}


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
        self.settings.fields = sh.dv(self.settings.fields, []);
        self.method();
    }

    p.method = function method(config) {
    }

    p.test = function test(config) {
        if ( self.settings.jquery ) {
            self.$ = $;
            self.processJqueryToGetList();
            return;
        }

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

        if ( self.settings.defaultAnnotation ) {
            self.$('.'+self.settings.defaultAnnotation).remove();
        }

        if ( self.settings.maxItems )
            items = items.slice(0,self.settings.maxItems)


        debugger

        var listItems = [];
        sh.each(items, function onProcessItem(k,v) {
            var ui = $(v)
            var listItem = {};
            sh.each(self.settings.fields, function getfield(k,v) {
                var item = ui.find(v.query)
                var val = item.text().trim()

                if ( v.fxText ) {
                    val = v.fxText(val)
                }
                v.val = val;
                if ( v.parent) {
                    item = $(item.parent())
                }
                v.ui = item;
                if ( v.keepAttr) {
                    val = item.attr(v.keepAttr);
                }

                if ( v.action == 'makeui') {
                    self.props.actions.makeUI(v, listItem)
                }

                if ( v.doNotStore ) {
                    return;
                }

                listItem[v.prop] = val
            })
            listItem.ui = ui[0];
            listItems.push(listItem)
        })

        self.data.listItems = listItems;
        self.data.items = items;

        self.proc('export')
        if ( self.settings.showOutput != false ) {
            console.log(listItems)
            console.log(listItems[0])
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
        self.data.lastField = t;
        return t;
    }


    definePropHelpers = function defeinPropHelpers() {
        p.props   = {};
//debugger
        p.props.defaultAnnotation = function defaultAnnotation(defA) {
            self.settings.defaultAnnotation = defA
        }

        p.props.doNotStore = function doNotStore( ) {
            self.data.lastField.doNotStore = true;
        }

        p.props.addItem = function addItem(typeA) {
            //var fields = self.settings.fields;
            var t = self.data.lastField
            sh.throwIfNull(t, 'lastField not set, this is modifier, add field first')
            sh.copyProps(typeA,t);
            t.action = 'makeui'
            //fields.push(t)
            //self.data.lastField = t;
            return t;
        }
        p.props.actions = {}
        p.props.actions.makeUI = function actOnMakeUI(def, liOutput) {

            //  console.debug('def', def.ui)
            var uiOrig = def.ui;
            //return;
            if ( def.type == 'a') {

                uiUtils.runIfFx = function runIfFx(fxPotential) {
                    var args = uiUtils.args(arguments)
                    args = args.slice(1)
                    if ( $.isFunction(fxPotential)) {
                        return fxPotential.apply(null, args)
                    }
                    return fxPotential
                }
                uiUtils.clone = uiUtils.c = function clone(obj) {
                    return JSON.parse(JSON.stringify(obj))
                }
                def.link = uiUtils.runIfFx(def.href, liOutput)

                console.debug('sdf', def.href  )
                var cfg = uiUtils.addLink(def)
                var ui = cfg.ui;
                if ( self.settings.defaultAnnotation ) {
                    ui.addClass(self.settings.defaultAnnotation)
                }
                //   console.debug('new ui', ui)
                //   ui.text('dfsdfsdfsd')
                uiOrig.after(ui)
                // uiOrig.css('color', 'red')
            }
            // uiOrig.ui.css('background', 'red')
            return def;
            //return t;
        }

    }
    definePropHelpers();

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

if ( exports.isNode !== false && module.parent == null) {
    var instance = new ListExtractorScraper();
    var config = {};
    config.file = 'example_bookzz.html';

    instance.init(config)
    instance.setupAreas('#searchResultBox', '.resItemBox')
    instance.setupLiField('name', instance.utils.prop('itemprop', 'name'))
    instance.setupLiField('author', instance.utils.prop('itemprop', 'author'))

    instance.test();

} else
{

}



 