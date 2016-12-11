/**
 * Why: class is an example iterator for jsonsettestiterator
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function JSONSetTestIterator() {
    var p = JSONSetTestIterator.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.getFiles();
    }

    p.getFiles = function getFiles(config) {

    }

    p.fxCallback = function fxCallback(item,  fx, i, runner) {
        delete item.throwErrorWhenQueryNotFound
        var skipUrls = false;
        skipUrls = true;
        var doNotRetryPbNotFound = true;
       // doNotRetryPbNotFound = false
        var highlight = 'firefly';
        highlight = null
        highlight = 'sopranos';
       // highlight = 'atlantis';

    
        sh.isAnyInAny(item.name, [' with John Oliver','','One Piece'])
        
        
      highlight = null
        if ( highlight ) {
            self.data.modeHighlight1Query = true;
            if ( self.hitHihglihgted != true ) {
                self.replaceListfileterdIwth = [];//=runner.data.listFiltered
                self.hitHihglihgted = true;
                // runner.data.listFiltered = [];
                // asdf.g
            }

            if ( sh.includes( item.query, highlight, true))  {
                self.replaceListfileterdIwth.push(item)
                skipUrls = false;
            } else {

                //runner.data.listFiltered = []
                fx();
                return;
            };
        };


        if (  skipUrls ) {
            if ( item.urlTorrent != null    ) {
                fx();
                return;
            };


        };

        if ( doNotRetryPbNotFound    &&  item.pbNotFound == true ) {
            fx();
            return;
        };



        self.item = item; //why: for util fx access
        self.utils = {};
        self.utils.isItemTVShow =  function isItemTVShow() {
            if ( self.item.series == true )
                return true;

            return false;
        }
        if ( self.utils.isItemTVShow() ) {
            if ( item.seasons < 1 || item.seasons == null  ) {
                // fx();
                //return; //why: bail b/c nothign to expand
            } else if ( item.clonedFrom != null ) {
            }
            else
            {

                var seasons = sh.each.times(item.seasons)
                var queryExpandedSeasons = [item.name , 'season',  seasons.join(' ')].join(' ')
                // asdf.g

                item.queriesAlternates.push(queryExpandedSeasons)
            }
        }

        //why: invoked when action processed
        //console.log('....what', sh.toJSON(item))
        console.log('....what', sh.toJSONString(config));
        var options = {};
        options.token = {};

        var SearchPB_Test = require('G:/Dropbox/projects/crypto/ritv/distillerv3/utils/SearchPBTest.js').SearchPB_Test

        var go = new SearchPB_Test();
        options.list = [item];
        options.token.fxBail = function (x) {
            console.log('bail')
            throw new Error(x)
        }
        options.fxReturnFirstResult = function onDone(url) {
            console.log('SearchPB complete:', url);
            if ( url ) {
                item.size = url.size;
                item.urlTorrent = url.urlTorrent;
                item.nameTorrent = url.nameTorrent
            }
            else  {
                item.pbNotFound = true

                if ( self.expandItem(item, fx, i, runner) ) {
                    return;
                }
            }

            fx();
        }



        var maxI = -1
        if ( maxI > 0 && i > maxI ) {
            runner.finishedWriting();
            return;
        }

        go.go(options);



        return;

    }

    var y = {
        "name": "The Sopranos",
        "query": "The Sopranos  complete series",
        "rating": 9.2,
        "imdb_id": "tt0141842",
        "series": true,
        "dirRemoteMega": "/Root/tv/The_Sopranos_1999/tt0141842/The_Sopranos__complete_series/",
        "seasons": 6,
        "index": 222,
        "queriesAlternates": [
            "The Sopranos season 1 - 6",
            "The Sopranos all seasons",
            "The Sopranos complete s01-s06",
            "The Sopranos complete series",
            "The Sopranos 6 seasons",
            "The Sopranos complete 1-6"
        ],
        "boo1": true,
        "pbCategory": 208,
        "pbMinSeederCount": 5,
        "urlTorrent": null,
        "pbNotFound": true
    }

    p.expandItem = function expandItem_Complete(item,  fx, i, runner) {
        if ( item.seasons < 1 || item.seasons == null  ) {
            // fx();
            return; //why: bail b/c nothign to expand
        }

        if ( sh.includes(item.query, ' complete series', true) ) {

        } else {
            //fx();
            return;
        }

        var items = sh.each.times(item.seasons)

        var iterationController = {}
        iterationController.couldNotFindATorrent = false;
        sh.async(items, function epxandItemIntoSeasons(number, fxDoneWihtCloning) {

            function xRayFinishedGettingClonedUrl() {
                var y = clonedItem.urlTorrent
                runner.data.listFiltered.push(clonedItem);
                //  asdf.g
                if ( clonedItem.pbNotFound ) {
                    //asdf.f
                    iterationController.couldNotFindATorrent = true
                }
                fxDoneWihtCloning()
                return;
            }

            var clonedItem = sh.clone(item);
            clonedItem.clonedFrom = item.query;
            clonedItem.queriesAlternates = null;
            clonedItem.query =  item.name + ' ' + 'season ' + number;
            clonedItem.dirRemoteMega = item.dirRemoteMega.replace('__complete_series',   '_season_' + number);
            delete clonedItem.pbNotFound;
            self.fxCallback(clonedItem, xRayFinishedGettingClonedUrl, number, runner)
        }, function doneExpanding() {
           // asdf.g
            /*if ( iterationController.couldNotFindATorrent == false ) {
              //  asdf.d
                item.filtered = true; //why: prevent adding item
            }*/
            item.filtered = true; //always remove filtered item...
            fx();
        })


        return true;

    }


    p.fxDone = function onDone(){
        if ( self.data.modeHighlight1Query )
          self.runner.data.listFiltered=self.replaceListfileterdIwth;
        // self.runner.data.listFiltered=[];
    }
    p.test = function test(config) {
    }

    function defineUtils() {
        var utils = {};
        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.JSONSet = JSONSetTestIterator;
exports.IteratorClass =  JSONSetTestIterator

if (module.parent == null) {
    var instance = new JSONSetTestIterator();
    var config = {};
    instance.init(config)
    instance.test();
    instance.fxCallback({}, function done(){

    })
}



