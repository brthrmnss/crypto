
/*
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var request = require('request')
var EasyRemoteTester = shelpers.EasyRemoteTester;
var cheerio = require('cheerio');

var SearchPBCachedRequest = sh.require('ritv/distillerv3/utils/SearchPBCachedRequest.js').SearchPBCachedRequest;

var d = 'mp/ExtProxy/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/ListExtractorScraper.js'
var ListExtractorScraper = sh.require(d).ListExtractorScraper


function SearchBookzz() {
    var p = SearchBookzz.prototype;
    p = this;
    var self = this;

    self.settings = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
       // self.method();
    }

    p.searchBookzz = function searchBookzz(query, fxDone) {

        var url = 'http://bookzz.org/s/?q='+query+'&yearFrom=&yearTo=&language=&extension=&t=0'

        var exactMatching = true
        if ( exactMatching ) {
            url += '&e=1'
        }

        var options = {}
        options.url = url
        options.encoding = null
        options.timeout = 60 * 1000;




        var fxCallback = function onRecievePBResults(err, resp, body) {
            if (resp == null) {
                var msg = 'SearchPB.js resp is null ' + url
                console.error(msg, err)
                self.bail(msg)
                return;
            }
            console.log('go')

            if (err && resp.headers == null) {
                var msg = 'SearchPB.js resp.headers is null'
                console.error(msg)
                //self.bail(msg)
                //return;
            }
            //handle gzip encoding
            if (resp.headers != null && resp.headers['content-encoding'] == 'gzip') {
                var zlib = require('zlib');
                zlib.gunzip(body, function (err, dezipped) {
                    //callback(dezipped.toString());
                    resp.headers['content-encoding'] = null
                    fxCallback(err, resp, dezipped.toString())
                });
                return;
            } else {
                // callback(body);
            }

            self.processTorrentLinks(body);

        }



        p.processTorrentLinks = function processTorrentLinks(body, token, cb) {
            $ = cheerio.load(body);
            self.proc('bod length', body.length )

            var y = y

            var instance = new ListExtractorScraper();
            var config = {};
            config.body = body;

            config.fxDone = function onFinished(result) {
                var h = sh.eachHelper(result);
                h.prependToProp('link', 'http://bookzz.org');


                self.proc('found x', result.length);

                var data = {};
                data.length = result.length;

                h.propLowercase('type')

                console.log('---', result);

                var readable = h.findWhereXinY('type', ['epub', 'mobi', 'rtf'])
                var pdfs = h.findWhere('type', 'pdf')
 
                data.readableLength = readable.length;
                data.pdfLength = pdfs.length;

                if ( readable.length > 0 ) {
                    var first = readable[0]
                    data.url = first.link;
                    data.first = first;
                }


                sh.callIfDefined(self.settings.fxDone, result, data)
            }
            //= 'example_bookzz.html';

            instance.init(config)
            instance.setupAreas('#searchResultBox', '.resItemBox')
            instance.setupLiField('name', instance.utils.prop('itemprop', 'name'))
            instance.setupLiField('author', instance.utils.prop('itemprop', 'author'))
            instance.setupLiField('lang', instance.utils.prop('itemprop', 'inLanguage'))
            var f = instance.setupLiField('link', instance.utils.prop('itemprop', 'name' ))
            f.keepAttr = 'href'
            f.parent = true;
            var f = instance.setupLiField('type',
                instance.utils.prop('title', 'Electronic library download book  '))
            f.fxText = function fxText(txt) {
                txt = sh.dv(txt)
                var txt2 = txt;
                txt2 = txt2.replace('Download ', '')
                txt2 = sh.unwrap(txt2)
                if ( txt2.includes(')')){
                    txt2 = txt2.split(')')[0]
                }
                return txt2;

            }
            instance.parseContents();
        }


        var instance = new SearchPBCachedRequest();
        var config = {};
        config.fileExt = '.html'
        config.ignoreIf = 'Database maintenance, please check back in 10 minutes.'
        config.dir = __dirname + '/../../../CachedRequests/searchPB_SearchPBCachedRequests/'
        instance.init(config)
        instance.request(options, fxCallback)
        //instance.test();
        // request(options, fxCallback)
    }


    function defineUtils() {
        p.utils = {};
        p.utils.doesFileExist =   function doesFileExist(file, dir, msg) {
            var file2 = dir + '/' +  file;
            var file3 = sh.fs.resolve(file2)
            self.proc('does exist', file3, msg)
            if ( sh.fileExists(file3)) {
                return file3;
            }
            return false;
        }
    }
    defineUtils()

    p.test = function test(){
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.SearchBookzz = SearchBookzz;

if (module.parent == null) {

    var i = new SearchBookzz();
    var config = {}
    config.fxDone = function onTestComplete(list, data) {
        console.log('test complete', list.length, data)
    }
    i.init(config)
    //i.searchBookzz('crimson moon')
    //i.searchBookzz('ddddBeneath A Crimson Moon Michels Christine')
    i.searchBookzz('Beneath A Crimson Moon Michels Christine')
    //i.launchSupportingTools();
}



