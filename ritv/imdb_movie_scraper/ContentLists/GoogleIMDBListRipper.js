
/*
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var request = require('request')
var EasyRemoteTester = shelpers.EasyRemoteTester;
var cheerio = require('cheerio');

var SearchPBCachedRequest = sh.require('ritv/distillerv3/utils/SearchPBCachedRequest.js').SearchPBCachedRequest;

//G:\Dropbox\projects\crypto\mp\GrammarHelperServer\public_html\others\ExtBookzz\ListExtractorScraper.js
var d = 'mp/ExtProxy/amazonAnots/0.1_0/js/extras_maybe/ListExtractorScraper.js'
//G:\Dropbox\projects\crypto\mp\ExtProxy\ggnampgigkndjmbbjlodenmpbamidgeo\0.5_0\js\extras_maybe\ListExtractorScraper.js
//var d = 'mp/GrammarHelperServer/public_html/others/ExtBookzz/ListExtractorScraper.js'
var ListExtractorScraper = sh.require(d).ListExtractorScraper


function GoogleIMDBListRipper() {
    var p = GoogleIMDBListRipper.prototype;
    p = this;
    var self = this;

    self.settings = {}
    self.data = {};
    self.data.listOutput = [];

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.settings.showOutput =  sh.dv(self.settings.showOutput, false);
        //console.log('~~~ page', self.settings )
        //asdf.g
        //console.log('\\\\', self.settings.showOutput)
        //  asdf.g
        //  return;
        // self.method();
    }

    p.searchGoogle = function searchGoogle(query) {

        //var url = 'http://bookzz.org/s/?q='+query+'&yearFrom=&yearTo=&language=&extension=&t=0'
        //var url = 'http://book4you.org/s/?q='+query+'&yearFrom=&yearTo=&language=&extension=&t=0'
        //query = query.split(' ').join('+');
        query = query  + ' site:imdb.com/list'
        //director+site%3Aimdb.com%2Flist+
        var url = 'https://www.google.com/search?q='+query+'&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a&gws_rd=ssl#q='+query

        var url = 'https://www.google.com/search?q='+query+'&ie=utf-8'

        self.settings.pages = sh.dv(self.settings.pages, 1)



        //console.log('~~~ page', self.settings.pages)
       //return;

        var urls = []
        if ( self.settings.pages ) {
           // urls = [];


            var length = 0
            sh.each.times(self.settings.pages, function onCreateUrl(k,v) {

                var url2 = url +  '&start='+length
                url2 = url2.replace(' ', '+')
                length += 10
                urls.push(url2);
            })
        }


        //console.log(url)
        self.data.query = query;

        self.data.indexPage = 0;

        sh.async(urls, function onDlL(url, cb) {
            self.data.indexPage += 1;
            self.ripUrl(url, null, cb )
        }, function onComplete() {

            var dupes = []
            var filteredBadLists = [];
            sh.each(self.data.listOutput, function onUpdate(k,v) {
                v.name = v.name.replace('IMDb: ', '')
                if ( v.listId == null ) {
                    return
                }
                if ( dupes.includes(v.listId) ) {
                    console.error('there is a dupe', v.listId, v.name, v )
                    return;
                    throw new Error(v.listId+'is dupe'+v+v.name)}
                dupes.push(v.listId)
                filteredBadLists.push(v)
            })


            filteredBadLists = self.data.listOutput

            if ( self.settings.showOutput ) {
                //console.log('---', result);
                sh.each.print(self.data.listOutput, ['listId', 'name'])
            } else  {
            }

            sh.callIfDefined(self.settings.fxDone, self.data.listOutput)
            //console.log(self.data.listOutput)

        })
        return;


        self.data.query = query;
        console.log('searchGoogle', query, url)

        console.log('file:///sdf.sdf')
        self.data.url = url;
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
            console.log(sh.t, 'bodyresult length', body.length)

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


        var instance = new SearchPBCachedRequest();
        var config = {};
        config.fileExt = '.html'
        config.ignoreIf = 'Database maintenance, please check back in 10 minutes.'
        config.dir = __dirname + '/../../../CachedRequests/google_SearchPBCachedRequests/'
        instance.init(config)
        instance.request(options, fxCallback)
        //instance.test();
        // request(options, fxCallback)
    }


    p.ripUrl = function ripUrl(url, desc, cb) {
        self.proc('searchGoogle',   url)

       // console.log('file:///sdf.sdf')
        self.data.url = url;
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
            console.log(sh.t, 'body result length', body.length)

            if (err && resp.headers == null) {
                var msg = 'SearchPB.js resp.headers is null'
                console.error(msg)
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
            self.processTorrentLinks(body, null, cb, true);
        }


        var instance = new SearchPBCachedRequest();
        var config = {};
        config.fileExt = '.html'
        config.ignoreIf = 'Database maintenance, please check back in 10 minutes.'
        config.dir = __dirname + '/../../../CachedRequests/google_SearchPBCachedRequests/'
        instance.init(config)
        instance.request(options, fxCallback)
        //instance.test();
        // request(options, fxCallback)
    }

    p.processTorrentLinks = function processTorrentLinks(body, token, cb, noClose) {
        $ = cheerio.load(body);
        self.proc('body length', body.length )

        //var y = y

        var instance = new ListExtractorScraper();
        var config = {};
        config.body = body;

        config.showOutput = self.settings.showOutput;

        config.fxDone = function onFinished(result) {
            var h = sh.eachHelper(result);
            //h.prependToProp('link', 'http://bookzz.org');

            self.proc(self.data.query, 'found x', result.length, 'page', self.data.indexPage);

            var data = {};


            //h.propLowercase('type')


            if ( self.settings.showOutput ) {
                console.log('---', result);
            } else  {
            }

            function postProc() {
                data.length = result.length;
                var readable = h.findWhereXinY('type', ['epub', 'mobi', 'rtf'])
                var pdfs = h.findWhere('type', 'pdf')

                data.readableLength = readable.length;
                data.pdfLength = pdfs.length;

                if (readable.length > 0) {
                    var first = readable[0]
                    data.url = first.link;
                    data.first = first;
                }

                data.url = self.data.url;
            }

            if ( noClose ) {
                self.data.listOutput = self.data.listOutput.concat(result);
                cb()
            } else {
                sh.callIfDefined(self.settings.fxDone, result, data)
            }
        }
        //= 'example_bookzz.html';

        instance.init(config)
        instance.setupAreas('#search', '.g')
        instance.setupLiField('name', instance.utils.prop('itemprop', 'name'))
        // instance.setupLiField('author', instance.utils.prop('itemprop', 'author'))
        //instance.setupLiField('link3', instance.utils.prop('itemprop', 'data-href'))
        instance.setupLiField('link2', function onUI(ui, $, listItem) {
            var u = ui.find('h3')
            u = $(u)
            var url = $(u.find('a')).attr('href')

            if ( url == null ) {
                return null;
            }
            if ( url.includes('url?q=')) {
                url = sh.getContentAfter(url, '/url?q=')
            }
            if ( url.includes('list/ls') == false ) {
                return 'bad url ' + url;
            }

            url = sh.getContentBetween(url, 'list/', '/', false)

            //console.log('debeg input', '...', u.length,  url, u.text())
            listItem.listId = url;
            listItem.name = u.text();


            return url;

            //sh.x();
            asdf.g
            return 'junk'
        })
        //instance.setupLiField('lang', instance.utils.prop('itemprop', 'inLanguage'))

        instance.parseContents();
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

exports.GoogleIMDBListRipper = GoogleIMDBListRipper;

if (module.parent == null || exports.reloadAny) {

    var i = new GoogleIMDBListRipper();
    var config = {}
    config.fxDone = function onTestComplete(list, data) {
        console.log('testin GILR complete', list.length, data)
    }
    config.pages = 3
    i.init(config)
    //i.GoogleIMDBListRipper('crimson moon')
    //i.GoogleIMDBListRipper('ddddBeneath A Crimson Moon Michels Christine')
    i.searchGoogle('horror films')
    //i.launchSupportingTools();
}

//director site:imdb.com/list



//sh.reload.reloadFile(__filename)

console.log('GILR')

//exports.IMDBContentList = IMDBContentList;

