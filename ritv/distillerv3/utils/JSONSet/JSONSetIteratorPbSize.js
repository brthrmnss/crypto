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
        self.size = 0;
        self.data.itemsMissing = []
        self.data.itemsFound = [];
        self.data.itemsDupe = [];
        self.urls= [];
        // self.getFiles();
    }

    p.fxCallback = function fxCallback(item,  fx, i, runner) {
        var skipUrls = false
        skipUrls = true
        var size = parseFloat(item.size);
        if ( item.urlTorrent ==null ) {
            self.data.itemsMissing.push(item)
            fx();
            return;
        }

        var dupe = false;

        if ( self.utils.filterShows(item, fx, i)) {
            return;
        }

        if ( sh.includes(self.urls, item.urlTorrent)) {
            self.data.itemsDupe.push(item)
            dupe = true
            item.skip = 'b.c duplicate'
            // fx();
            //  return;
        }


        if ( self.data.dictBlockRanges == null) {
            var dictBlockRanges = {}
            dictBlockRanges['Supernatural'] = {
                allow: 'Season 1-10',
                blockIfLessThan: 10
            }
            dictBlockRanges['Smallville'] = {
                allow: 'Season 1 - 10',
                blockIfLessThan: 10
            }
            dictBlockRanges['Curb Your Enthusiasm'] = {
                allow: 'Season 1 - 8',
                blockIfLessThan: 8
            }
            dictBlockRanges['The West Wing'] = {
                allow: 'Season 1 to 7',
                blockIfLessThan: 7
            }
            dictBlockRanges['Bones'] = {
                allow: '[Season 1 - 6 COMPLETE]',
                blockIfLessThan: 6
            }
            dictBlockRanges['Buffy the Vampire Slayer'] = {
                allow: 'Season 1 to 7',
                blockIfLessThan: 7
            }
            dictBlockRanges['Doctor Who'] = {
                allow: 'S01 - S09',
                blockIfLessThan: 9
            }
            dictBlockRanges['NCIS'] = {
                allow: 'Season 1 - 7 Complete',
                blockIfLessThan: 7
            }
            self.data.dictBlockRanges = dictBlockRanges
        }
        var dictBlockRanges = self.data.dictBlockRanges;
        //Supernatural, 1-10, can save 60gbs?
        //small vile skip 2-10, if 1 - 10 found
        //Curb Your Enthusiasm Season 1 - 8
        //The West Wing - Season 1 to 7
        // Bones [Season 1 - 6 COMPLETE]
        //Buffy The Vampire Slayer - Season 1 to 7 - Mp4 480ip
        //Doctor Who Season S01 - S09 1 - 9 Complete
        //NCIS Season 1 - 7 Complete

        var ist = dictBlockRanges[item.title]
       // console.error( item.name, item.title, ist)
        if ( ist && ! sh.includes(item.name, 'Add episode', false) ) {
          //  console.error( item.name)
            if (  ist.allowed1x != true &&
                sh.includes(item.nameTorrent, ist.allow ) ) {
                // asdf.g
                ist.allowed1x = true
            } else {
                var seasonNumber = item.name.split(' ').slice(-1)[0]

                console.error(seasonNumber, item.name)
                // console.log(seasonNumber, item)
                if ( sh.isNumber(seasonNumber) == false ) {
                    //console.log()
                    throw new Error('yxy number bad')
                }
                seasonNumber = parseFloat(seasonNumber);
                if ( seasonNumber <= ist.blockIfLessThan ) {
                    // asdf.g
                    self.proc('skipping this b/c too small',seasonNumber, item)
                    fx()
                    return;
                }
            }

        }


        self.urls.push(item.urlTorrent)
        if ( isNaN(size)) {
            self.data.itemsMissing.push(item)
            fx();
            return;
        }

        self.data.itemsFound.push(item);
        if ( dupe == false ) {
            self.size += size;
        }
        fx()
        return;

    }



    p.fxDone = function fxDone(config) {
        self.proc('...', (self.size/1000).toFixed(2), 'TB');
        self.proc('missing', self.data.itemsMissing.length);
        self.proc('missing', 100*(self.data.itemsMissing.length/
            self.data.itemsFound.length).toFixed(2), '%');
        self.runner.createAdditionalFile('missing', self.data.itemsMissing);

        sh.sortByName(self.data.itemsFound, 'title', 'name')
        var itemsFound =sh.each.print(self.data.itemsFound,
            ['title', 'name', 'nameTorrent', 'size'], false, false);
        self.runner.createAdditionalFlatFile('listFlat', itemsFound)

        self.makeMaths()

        self.proc('missing')
        sh.sortByName(self.data.itemsMissing, 'title', 'name')
        var itemsMissing = sh.each.print(self.data.itemsMissing,
            ['title', 'name' ], false, false)
        self.runner.createAdditionalFlatFile('missingFlat', itemsMissing)



        self.runner.createAdditionalFile('dl.list',  self.data.itemsFound)
    }


    p.makeMaths = function makeMaths() {
        self.data.complete = [];
        //go through items
        var currentShow = {}
        var shows = [];

        sh.each( self.data.itemsFound , function asdf (k,v) {
            //  debugger
            if ( currentShow.title == null ) { //first time
                currentShow.title = v.title
                currentShow.seasons = [];
                currentShow.episodes = []
            }
            if ( v.title != currentShow.title ) {
                //console.log(v.title, currentShow.title)
                //stats
                sumShow(currentShow)
                currentShow = {}
                currentShow.title = v.title
                currentShow.seasons = [];
                currentShow.episodes = []

            }
            //console.log( currentShow.title, v.name)
            if ( v.title == currentShow.title ) {
                if ( sh.includes(v.name, 'Add Each Season ', false) ) {
                    currentShow.seasons.push(v);
                }
                if ( sh.includes(v.name, 'Add episode S', false) ) {
                    currentShow.episodes.push(v);
                }
                // console.log(v)
            }
        })

        function sumShow(currentShow) {

            if ( currentShow.seasons == null ) {
                return;
            }
            currentShow.seasonSumRaw = sh.each.sum( currentShow.seasons, 'size' );
            var uniques = sh.each.uniques(currentShow.seasons, 'urlTorrent') //base sum on uniques

            currentShow.seasonSum = sh.each.sum( uniques, 'size' );
            if ( currentShow.seasonSumRaw == currentShow.seasonSum ) {
                delete currentShow.seasonSumRaw
            }
            currentShow.seasonMedian = sh.each.median( currentShow.seasons, 'size' );
            currentShow.seasonAvg = currentShow.seasonSum/currentShow.seasons.length;

            if  ( currentShow.episodes.length > 0 ) {
                currentShow.episodeSum = sh.each.sum(currentShow.episodes, 'size');
                currentShow.episodeMedian = sh.each.median(currentShow.episodes, 'size');
                currentShow.episodeAvg = currentShow.episodeSum / currentShow.episodes.length;
            }

            var issues = []
            currentShow.issues =issues; //why: so appears in json output in proper order
            if ( currentShow.seasonAvg > 25  ) {
                issues.push(sh.join('huge season avg ', currentShow.seasonAvg))
            }

            if ( currentShow.seasonSum > 100  ) {
                issues.push(sh.join('huge show ', currentShow.seasonSum))
            }
            if ( currentShow.seasonAvg > currentShow.seasonMedian*2.5  ) {
                issues.push(sh.join('seasonAvg much higher than median', currentShow.seasonAvg , 'vs', currentShow.seasonMedian, 'bulk seasons?'))
            }

            var dupes = sh.each.dupes(currentShow.seasons, 'urlTorrent')
            var seasonUqnieus = sh.each.uniques(currentShow.seasons, 'urlTorrent')
            if ( dupes.length > 0 ) {
                //console.error('dupes', dupes)
                issues.push(sh.join('dupes', sh.paren(dupes.length), sh.each.collect(dupes, 'name')) )
                currentShow.dupes = dupes;
                if ( currentShow.seasons && dupes.length == currentShow.seasons.length ) {
                    issues.push('All seasons are the same@@@')
                }
            }

            sh.splitIntoWords = function asdf(k, extraDivisions) {
                var titleWordsArray = k.toLowerCase().split(' ');
                var words = []
                sh.each(titleWordsArray, function trim(k,word){
                    words.push(word.trim())
                })
                return words;
            }
            //why: check for 1 - 10 spanning showns
            var possibleRange = null;
            sh.each(seasonUqnieus, function tryToFindRanges(k,season){
                var words = sh.splitIntoWords(season.nameTorrent)
                /* if ( sh.includes(words, '-') == false  && sh.includes(words, 'to')==false) {
                 return;
                 }*/

                //issues.push(sh.join('possible contains range',season.nameTorrent))
                //why: test for number between range 1- 5 vs nicis - season
                sh.each(words, function lookForRanges(k,word) {
                    var nextWord = words[k+1]
                    var prevWord = words[k-1]
                    var prevIsNumber = sh.isNumber(prevWord)
                    var nextIsNumber = sh.isNumber(nextWord)
                    if ( prevIsNumber  && nextIsNumber) {
                        issues.push(sh.join('possible contains range',season.nameTorrent))
                        return false;
                    }

                })

            })


            if ( issues.length >0 ){
                currentShow.debugSeasons = currentShow.seasons;
            }

            // if ( possibleRange ) {
            ///    issues.push(sh.join('possible contains range',possibleRange))
            // }

            if  ( currentShow.episodes.length > 0 ) {
                var startLength =  issues.length
                if ( currentShow.episodeAvg > 1.2  ) {
                    issues.push(sh.join('huge episodeAvg > 1.2 GBs', currentShow.episodeAvg))
                }
                if ( currentShow.episodeAvg > currentShow.episodeMedian*2.5  ) {
                    issues.push(sh.join('episodeAvg much higher than median', currentShow.episodeAvg , 'vs', currentShow.episodeMedian, 'bulk episdoes?'))
                }

                if ( issues.length > startLength ){
                    currentShow.debugEpisodes = currentShow.episodes;
                }
            }

            if ( issues.length > 0 ) {
                //currentShow.issues = issues
            } else {
                delete currentShow.issues
            }

            shows.push(currentShow)
        }
        sumShow(currentShow)

        var mathsOK = [];
        var mathsError = [];
        var mathsErrorFull = [];
        sh.each(shows, function(k,v) {
            v = sh.clone(v)
            delete v.seasons
            delete v.episodes
            if ( v.issues != null ) {


                var simpleNoDupes = sh.clone(v)
                delete simpleNoDupes.dupes
                mathsError.push(simpleNoDupes)
                //console.error(simpleNoDupes)
                var filterFields = ['name', 'seasons', 'urlTorrent', 'size', 'nameTorrent']
                var filterFields = ['name', 'seasons', 'size', 'nameTorrent']
                if ( v.dupes ) {
                    sh.each(v.dupes, function (k, dupe) {
                        sh.each.filterPropsOnObject(dupe, filterFields)
                    });
                }
                if ( v.debugSeasons ) {
                    sh.each(v.debugSeasons, function (k, dupe) {
                        sh.each.filterPropsOnObject(dupe, filterFields)
                    });
                }
                if ( v.debugEpisodes ) {
                    sh.each(v.debugEpisodes, function (k, dupe) {
                        sh.each.filterPropsOnObject(dupe, filterFields)
                    });
                }
                mathsErrorFull.push(v)

            } else {
                mathsOK.push(v)
                // console.log(v)
            }
        })

        self.runner.createAdditionalFile('mathsOK', mathsOK)
        self.runner.createAdditionalFile('mathsError', mathsError)
        self.runner.createAdditionalFile('mathsErrorFull', mathsErrorFull)
        self.proc('errors on ', mathsError.length, 'shows')
    }
    p.test = function test(config) {
    }

    function defineUtils() {
        var utils = {};
        p.utils = utils
        p.utils.filterShows = function filterShows ( item, fx, i) {
            var highlight = null;

            //highlight = 'game of thrones'
            //highlight = 'Modern Family'
            //highlight = 'The West Wing'
            // highlight = 'O.C.'
          //  highlight = 'buffy'
            if( highlight!=null) {
                self.runner.settings.storeOutputFileElsewhere = true;
                if (false == sh.includes(item.title, highlight, true)) {
                    item.filtered = true;
                    fx()
                    return true;
                }
            }

            return false;
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



