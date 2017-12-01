/**
 * Why: class is an example iterator for jsonsettestiterator
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var SearchPB_Test = sh.require('ritv/distillerv3/utils/SearchPBTest.js').SearchPB_Test
//var SearchPB_Test = require('G:/Dropbox/projects/crypto/ritv/distillerv3/utils/SearchPBTest.js').SearchPB_Test


function JSONSetIteratorPB_IMDB() {
    var p = JSONSetIteratorPB_IMDB.prototype;
    p = this;
    var self = this;
    self.settings = {};
    self.data = {}
    var dbg = {};
    dbg.skipDl = true;
    dbg.skipDl = false
    self.dbg = dbg;

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.settings.showSkippedAttempts = sh.dv(self.settings.showSkippedAttempts, true)
        self.settings.showSkippedAttempts = sh.dv(self.settings.showFailedAttempts, true)

        if (  global.ignoreDupesIMDBPB  ) {
            self.settings.showSkippedAttempts =false
            self.settings.showSkippedAttempts = false
        }

        config = self.settings;
        self.getFiles();
    }

    p.getFiles = function getFiles(config) {

    }

    p.fxCallback = function fxCallback(item,  fxOrig, i, runner) {
        delete item.throwErrorWhenQueryNotFound
        var skipUrls = false;
        skipUrls = true;
        var doNotRetryPbNotFound = true;
        // doNotRetryPbNotFound = false

        function fx(o) {

            var dbg = [ item]

            //debugger;
            //sh.x()
            fxOrig(o)
        }

        //self.utils.cleanItem(item)

        if ( item.name == null ) {
            item.name = item.title;
        }

        if ( self.utils.ignoreDupesIMDBs(item, fx, i)) {
            return
        }


        if ( self.utils.removeLowRating(item, fx, i)) {
            return
        }

        if ( self.utils.ignoreShows(item, fx, i)) {
            return;
        }




        if ( self.utils.filterShows(item, fx, i)) {
            return;
        }

        if (  skipUrls ) {
            if ( item.urlTorrent != null ) {
                fx();
                return;
            }
        }

        if ( doNotRetryPbNotFound &&  item.pbNotFound == true ) {
            fx();
            return;
        }

        if ( item.skip == true ) {
            console.error('what is title', item)
            fx()
            return;
        }

        self.item = item; //why: for util fx access
        self.i = i;
        self.runner = runner;
        self.utils.createPbQueries(item, fx)
        return

        self.utils.addQueryComplete(item)

        var maxI = -1
        if ( maxI > 0 && i > maxI ) {
            runner.finishedWriting();
            return;
        }

        item.query = item.name;
        self.utils.downloadItem(item)

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

    p.fxAddItem = function fxAddItem(item) {
        self.utils.cleanItem(item)
    }

    p.fxDone = function onDone(){
        if ( self.data.modeHighlight1Query )
            self.runner.data.listFiltered=self.replaceListfileterdIwth;
        // self.runner.data.listFiltered=[];
        self.modifyDirMega(self.runner.data.listFiltered)
        self.proc('total size', self.runner.data.totalSize)
    }
    p.test = function test(config) {
    }


    p.modifyDirMega = function modifyDirMega(completedFilteredItems) {
        sh.each(completedFilteredItems, function kv(k,v) {
            //console.log('v', v)
            if ( v.dirRemoteMega == null ) {
                return;
                sh.throw('how did this happen dirRemoteMega')
            }
            if ( v.nameTorrent == null ) {
                return;
                sh.throw('how did this happen nameTorrent')
            }
            v.dirRemoteMega +=  v.nameTorrent+'/'

            v.dirRemoteMega = sh.fs.clean2(v.dirRemoteMega)

            //TODO: Remove ... test thits later
            //asdf.g

        })
    }


    function defineUtils() {
        var utils = {};
        self.utils = {};

        self.utils.downloadItem = function downloadItem(item) {
            //why: invoked when action processed
            //console.log('....what', sh.toJSON(item))
            console.log('....what', sh.toJSONString(config));
            var options = {};
            options.token = {};

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

            go.go(options);
        }

        self.utils.downloadItem2 = function downloadItem2(item, queries, fx) {
            //why: invoked when action processed
            //console.log('....what', sh.toJSON(item))
            // console.log('....what', sh.toJSONString(config));
            var options = {};
            options.token = {};

            //var SearchPB_Test = require('G:/Dropbox/projects/crypto/ritv/distillerv3/utils/SearchPBTest.js').SearchPB_Test


            console.log('downloadItem2', queries)


            item = sh.clone(item)
            if ( queries !== false ) {
                item.queriesAlternates = queries;
                item.query = null;
            } else {
                //do it raw ... do not modify ...
            }

            var go = new SearchPB_Test();
            //options.silent = true; //bookmark.settings. dbg torent searh
            options.cacheOnly = true //
            options.dbgErrorsInErrorConsole = true
            options.list = [item];
            options.token.fxBail = function (x) {
                console.log('bail')
                throw new Error(x)
            }
            options.retry = 3
            options.fxReturnFirstResult = function onDoneSearchPB(url) {
                var urlDbgStr = url;
                if (url == null) {
                    urlDbgStr = 'null'
                } else {
                    urlDbgStr = url.length
                }
               
                var queryDbgStr = sh.toNull(item.query, 'length')
                self.proc('-->SearchPB complete:', queryDbgStr, urlDbgStr);
               // console.log(fx.name, 'ok')
               // asdf.g
                try {
                    fx(url)
                } catch ( e ) {
                    console.error('acught', e)
                }

                return

            }

            go.go(options);
        }


        self.utils.isItemTVShow =  function isItemTVShow() {
            if ( self.item.series == true )
                return true;

            return false;
        }

        self.utils.removeLowRating = function removeLowRating( item, fx, i) {
            var rating = parseInt(item.rating);
            if ( rating && rating < 6.0  ) {
                self.proc(i, item.name, item);
                //  asdf.g
                item.filtered = true;
                fx()
                return true;
            }
            if ( item.series ) {
                // asdf.g
                if ( rating && rating < 7.0  ) {
                    self.proc(i, 'series', item.name, item);
                    //asdf.seriesisnotwellrated_do.not.add
                    item.filtered = true;
                    fx()
                    return true;
                }
            }
            return false;
        }

        self.utils.ignoreDupesIMDBs = function ignoreDupesIMDBs( item, fx, i) {
            if ( item.imdb_id == null ) {
                return false
            }
            if ( item.skip == true ) {
                return false
            }
            if (  global.ignoreDupesIMDBPB  ) {
                var key = item.imdb_id
                if ( global.ignoreDupesIMDBPB.includes(key)) {
                    console.log('have this key', key)
                    //asdf.imdbpbdupesactive.duplicated
                    item.filtered = true;
                    fx()
                    return true;
                }
                global.ignoreDupesIMDBPB.add(key, item)
                
                //console.log('imdb dupe check', item.imdb_id, item)
                //asdf.imdbpbdupesactive
            }
            //console.log('sd', sh.ignoreDupesIMDBPB )
           // asdf.g
            return false;
            var rating = parseInt(item.rating);
            if ( rating && rating < 6.0  ) {
                self.proc(i, item.name, item);
                //  asdf.g
                item.filtered = true;
                fx()
                return true;
            }
            if ( item.series ) {
                // asdf.g
                if ( rating && rating < 7.0  ) {
                    self.proc(i, 'series', item.name, item);
                    asdf.g
                    item.filtered = true;
                    fx()
                    return true;
                }
            }
            return false;
        }

        self.utils.ignoreShows = function ignoreShows ( item, fx, i) {
            var bannedShows = [' with John Oliver','',
                'One Piece',
                'Top Gear',
                'MythBusters',
                'Dan Patrick',
                'The Late Show',
                'The King of Queens',
                'The Daily Show'];
            if ( sh.isAnyInAny(item.name, bannedShows) ) {
                self.proc(i, item.name, item);
                //  asdf.g
                item.filtered = true;
                fx()
                return true;
            }
            return false;
        }

        self.utils.filterShows = function filterShows ( item, fx, i) {
            /* var bannedShows = [' with John Oliver','','One Piece'];
             if ( sh.isAnyInAny(item.name, bannedShows) ) {
             self.proc(i, item.name, item);
             //  asdf.g
             item.filtered = true;
             fx()
             return;
             }*/

            var highlight = null;

            // highlight = 'game of thrones'
            // highlight = 'leverage'
            //highlight = 'black books'
            //highlight = 'grey'
            //highlight = null;
            //highlight = 'house M.d.'
            //highlight = 'My Name Is Earl'
            //highlight = 'My Name Is Earl'
            // highlight = 'naruto'
            // highlight = 'O.C.'
            //highlight = 'American God'
            if( highlight!=null) {

                sh.log.line = function () {
                    var str = '';
                    sh.each.times(80, function () {
                        str += '-'
                    })
                    console.log(str)
                    return str;
                }
                if ( self.data.warnedAboutFilterWithLine != true ) {
                    self.data.warnedAboutFilterWithLine = true;
                    sh.log.line()
                    self.proc('warning a filter is set', highlight)
                    sh.log.line()
                    sh.log.line()
                }
                self.runner.settings.storeOutputFileElsewhere = true;
                if (false == sh.includes(item.name, highlight, true)) {
                    item.filtered = true;
                    fx()
                    return true;
                }
            }

            var dictReplacements = {};
            dictReplacements["Grey's Anatomy"] = 'Greys Anatomy'
            dictReplacements["House M.D."] = 'House MD'
            dictReplacements['Hagane no renkinjutsushi'] = 'Fullmetal_Alchemist'
            dictReplacements['Naruto: Shippûden'] = 'Naruto'
            dictReplacements['Chappelle\'s'] = 'Chappelle'
            dictReplacements['Law & Order: Special Victims Unit'] = 'SVU'
            dictReplacements['Awkward.'] = 'Awkward'
            dictReplacements['The O.C.'] = 'The OC'
            dictReplacements['Dragon Ball Z'] = 'Dragon Ball'
            dictReplacements['Agents of S.H.I.E.L.D.'] = 'Agents of SHIELD'
            dictReplacements['Nip/Tuck'] = 'Nip Tuck'


            var replacement = dictReplacements[item.title]
            if ( replacement ) {
                item.title = replacement
            }            return false;
        }



        self.utils.cleanItem = function cleanItem(item) {
            delete item.episodeNameList
            delete item.upsertQuery
            delete item.currentEpisode
            delete item.nextEpisode
            delete item.image
            delete item.queriesSeasons
            delete item.episodeList
            delete item.rawIMDB
            delete item.qu
            delete item.episodeSummary
            delete item.rating;
            delete item.rated;
            delete item.responses;
            delete item.desc;
            delete item.runtime;
            delete item.bookmark;
            delete item.genres;
            delete item.imdb_url;
        }
        self.utils.createPbQueries = function createPbQueries(item, fxEnd) {



            item.qu = [];

            var miniUtils = {}
            miniUtils.prepForDisplay = function (item) {
                if ( item == null )
                    return
                if (item.ifFail)
                    item.ifFail = '-->' + item.ifFail.name
                if (item.queries)
                    item.queries = '@' + item.queries.length
                return item;
            }

            miniUtils.fillQueries = function fillQueries(name, items, replaceIf) {
                var queryList = [];
                sh.each(items, function addToList(k,v) {
                    if ( replaceIf ) {
                        if ( sh.includes(v, replaceIf, true)) {
                            v = v.replace(replaceIf, '')
                        }
                    }

                    var newQuery = name + ' ' + v;
                    queryList.push(newQuery)
                })
                return queryList;
            }

            //ASD.F

            var nameSaveable = sh.stripSpecialChars(item.title);
            if (self.utils.isItemTVShow() == false) {
                item.query = item.title + ' ' + sh.unwrap(item.year, '(');
                item.query = sh.str.removeAccents( item.query)
                item.dirRemoteMega = '/Root/movies/';
                item.dirRemoteMega += nameSaveable + '_' + item.year + '/'
                item.dirRemoteMega += item.imdb_id + '/'


                self.utils.downloadItem2(item, false,
                    onGotTorrentLink
                );
                //self.utils.downloadItem


                function onGotTorrentLink(torrentResult) {
                    self.proc('result')
                    //asdf.g
                    var item2 = sh.clone(item)
                    self.utils.addPb(item2, {})
                    self.data.item2 = item2;
                    // item2.name += ' ' + node.name;
                    if (torrentResult) {
                        self.utils.addPb(item2, torrentResult)
                        //asdf.g
                        console.log("Current node", item2.name, 'found');
                        //node.ifFail = null;
                        // node.successful = true;
                        // node.successful2 = true //is this ok?
                        // af(node)
                        self.utils.addToParent(item2, torrentResult)
                    } else {
                        item2.urlTorrentNotFound = true;
                        item2.successful = false
                    }

                    fxEnd()


                }


                return;

            } else {
                if ( item.seasons == null ) {
                    sh.throw('need a seasons for a tv show....')
                }
                item.dirRemoteMega = '/Root/tv/';
                item.dirRemoteMega += nameSaveable + '_' + item.year + '/';
                item.dirRemoteMega += item.imdb_id + '/'

                var base = {};



                //why: add for each season
                var currentItem = null;
                var seasonBaseLevel2 =  {
                    type: 'querySet',
                    name: "Add Each Season Wrapper",
                    why: "Try to get every season",
                    queries: [],
                    dirRemoteMega:item.dirRemoteMega,
                    ifFail:null
                }

                var queries = [];
                var queriesObjs = [];

                var baseSeason =  {
                    type: 'querySet',
                    name: "Add Each Season",
                    why: "Try to get every season",
                    queries: [],
                    dirRemoteMega:item.dirRemoteMega,
                    ifFail:null
                }

                var seasons = sh.each.times(item.seasons, function asdf(k,seasonNumber){

                    var seasonQuery = sh.clone(baseSeason)
                    seasonQuery.name += ' ' + seasonNumber
                    seasonQuery.seasonNumber = seasonNumber
                    seasonQuery.queries = miniUtils.fillQueries(item.title,
                        [
                            "season "+seasonNumber,
                            "S"+sh.str.pad(seasonNumber,2),
                            "season "+sh.str.pad(seasonNumber,2),
                        ]
                    )
                    seasonQuery.dirRemoteMega = [seasonQuery.dirRemoteMega,
                        'Season', '_', seasonNumber ,'/'].join('')
                    queries.push( [item.name,"season", seasonNumber].join( ' ') )
                    queriesObjs.push(seasonQuery)
                })
                seasonBaseLevel2.queries = queriesObjs;

                // if ( item.ended == false ) {
                //take last 2 episodes and make a episode list for it for it ....
                var last2Seasons = queriesObjs.slice(-2);


                var seasons = sh.each(last2Seasons, function addEpisodesToLastSeason(k,queryInstruction){

                    var yyy =[];
                    var epiWrapper = sh.clone(base)
                    queryInstruction.ifFail = epiWrapper
                    epiWrapper.name = 'Epi wrapper'

                    epiWrapper.why = 'Epi wrapper for ' + sh.qq(queryInstruction.name)
                    epiWrapper.queries = [];

                    queryInstruction.ifFail = epiWrapper

                    if ( item.episodeNameList == null ) {
                        //item.episodeNameList = item.episodeSummary2

                        item.episodeNameList = [];
                        var seasonsBlock =  item.episodeSummary2.split( ' ')
                        sh.each(seasonsBlock, function onS(k,v) {
                            var str = v.trim();
                            if ( str == '' ) { return }
                            var spt = str.split('E')
                            var seasonNumber = parseInt(spt[0].slice(1))
                            var episodeCount = parseInt(spt[1])

                            sh.each.times(episodeCount, function on(k,episodeNumber) {
                                var y = ['S',
                                    sh.str.pad(seasonNumber,2),
                                    'E', sh.str.pad(episodeNumber,2) ].join('')
                                item.episodeNameList.push(y)
                            })
                        })

                    }

                    sh.each(item.episodeNameList, function asdf(k,v) {

                        var y = v.split('E')
                        var s = y[0].replace('S', '');
                        var e = y[1];
                        s = parseFloat(s)
                        e = parseFloat(e)
                        if ( queryInstruction.seasonNumber == s) {
                            var epi = sh.clone(base)
                            epi.name = 'Add episode '+ v;
                            epi.parentName = queryInstruction.name;
                            epi.why =  "DL Episode"
                            epi.type =  'querySet'
                            epi.queries = [item.name+' '+v];

                            epi.dirRemoteMega = queryInstruction.dirRemoteMega //too lazy to fix it
                            epiWrapper.queries.push(epi);
                            asdf.g
                        }
                        return;
                    });

                    /*
                     queries.push( [item.name,"season", seasonNumber].join( ' ') )
                     var seasonQuery = sh.clone(base)
                     seasonQuery.name += ' ' + seasonNumber
                     seasonQuery.dirRemoteMega = [seasonQuery.dirRemoteMega,
                     'Season', '_', seasonNumber ,'/'].join('')
                     queriesObjs.push(seasonQuery)
                     */
                })
                //console.log(item.episodeNameList)

                // }

                //  console.log(queries)
                // console.log(queriesObjs)
                //   process.exit()
                /*  base.queries = miniUtils.complete(item.title,
                 [
                 "Friends season 1 - 10",
                 "Friends all seasons",
                 "Friends complete s01-s10",
                 "Friends complete series",
                 "Friends 10 seasons",
                 "Friends complete 1-10"
                 ],
                 "Friends"
                 )

                 item.qu = base;
                 */
                currentItem = base;
                /* var newQueryInstruction =  miniUtils.addBlock({},
                 [])*/
                var newItem;
                base.ifFail = newItem;
                base = newItem; //pass to next block

                item.qu = seasonBaseLevel2;

                if (  item.ended ) {
                    // asdf.g
                    //where to save
                    //what to do  next
                    //
                    var currentItem = null;
                    var completeSeries =  {
                        type: 'querySet',
                        name: "Complete Season",
                        why: "Try to get entire show first if possible",
                        queries: [],
                        dirRemoteMega:item.dirRemoteMega,
                        ifFail:null
                    }


                    var seasons = sh.each.times(item.seasons)
                    var queryExpandedSeasons = ['season',  seasons.join(' ')].join(' ')
                    completeSeries.queries = miniUtils.fillQueries(item.title,
                        [
                            "Friends season 1-"+item.seasons,
                            "Friends seasons 1-"+item.seasons,
                            "Friends all seasons",
                            "Friends complete s01-s"+sh.str.pad(item.seasons),
                            "Friends complete series",
                            "Friends "+item.seasons+ " seasons",
                            //"Friends "+item.seasons+ " season", broke the OC
                            "Friends complete 1-"+item.seasons,
                            "Friends complete 1 - "+item.seasons, //Black Books
                            queryExpandedSeasons
                        ],
                        "Friends"
                    )

                    //console.log(completeSeries.queries)


                    item.qu = base;

                    completeSeries.ifFail = seasonBaseLevel2;
                    item.qu = completeSeries;
                }



                if ( self.dbg.showQuerySet ) {
                    self.proc('queryset:')
                    console.log(sh.toJSONString(item.qu))
                }





            }



            var itHelper = {}
            itHelper.parentItemFailIfFailDict = {}

            var traverse = require('traverse-async').traverse;
            traverse(item.qu, function(node, next){
                if ( node == null || node.type != 'querySet') {
                    //console.error("Current node",node);
                    next();
                    return;
                }
                console.log("Current node",node.name, self.i);
                if ( this.parent ) {
                    /*if ( sh.isArray(this.parent) && this.parent[0].successful )  {
                     console.error('skipping', '...', node.name);
                     af(node);
                     next();
                     return;
                     }*/
                    if ( node.skipBcParentPassed )  {
                        if (self.settings.showSkippedAttempts)
                        console.error(sh.t, item.title, 'skipping', '...', node.name);
                        af(node);
                        next();
                        return;
                    }
                    if ( this.parent.successful )  {
                        af(node);
                        if (self.settings.showSkippedAttempts)
                        console.error('&', item.title, 'skipping', '...', node.name);
                        next();
                        return;
                    }
                    itHelper.parent = this.parent;
                }

                // node.successful = true;
                function af( node_) {
                    node_.successful = true;
                    //why" turn off all children nodes
                    if ( node_.ifFail ) {
                        sh.each(node_.ifFail.queries, function (k,v) {
                            if ( sh.isString(v) ) {
                                return;
                            }
                            v.successful = true
                            v.skipBcParentPassed = true
                        })
                        node_.ifFail.successful = true
                    }
                }
                // console.log("Current node", miniUtils.prepForDisplay(node));
                //console.log("Context object", this);
                //af(node)
                // next();
                // return;

                if ( node.queries.length > 0 ) {
                    if ( sh.isString(node.queries[0]) ) {
                        var item_b = sh.clone(item)
                        item_b.dirRemoteMega = node.dirRemoteMega;
                        item_b.parentName = node.parentName;
                        item_b.name = node.name;
                        // item_b.dirRemoteMega = node.dirRemoteMega;
                        //sh.mergeObjects(node, item_b)
                        if ( self.dbg.skipDl != true  ) {
                            self.utils.downloadItem2(item_b, node.queries,
                                onGetTorrentLink
                            );
                        } else { //why: skip download to dbg error states
                            item_b.queriesAlternates = node.queries;
                            onGetTorrentLink(null)
                        }

                        function onGetTorrentLink(torrentResult) {
                            var item2 = sh.clone(item_b)
                            self.utils.addPb(item2, {})
                            item2.name+=' '+ node.name;
                            if ( torrentResult ) {
                                self.utils.addPb(item2, torrentResult)
                                console.log("Current node",node.name, 'found');
                                //asdf.g
                                //node.ifFail = null;
                                // node.successful = true;
                                // node.successful2 = true //is this ok?
                                af(node)
                                self.utils.addToParent(item2, torrentResult)
                            } else {
                                if ( node.ifFail) {
                                    if (self.settings.showFailedAttempts)
                                    console.error('failed on ... ', item.title, node.name, 'but have more...')
                                    itHelper.parentItemFromIfFail = item2;
                                    itHelper.parentItemFailIfFailDict[node.name] = item2;
                                } else {
                                    item2.urlTorrentNotFound = true;
                                    self.utils.addToParent(item2, torrentResult)
                                    item2.successful = false
                                    node.successful = false
                                    var parent = itHelper.parentItemFailIfFailDict[item2.parentName]
                                    if ( parent != null ) {
                                        if ( itHelper.parent && itHelper.parent.indexOf(node) ==  itHelper.parent.length-1 ) {

                                            sh.each.find = function findItemByPropValue (arr, prop, val) {
                                                var itemWithValue = null;
                                                sh.each(arr, function searchForPropOnItem(k,item) {
                                                    if ( item[prop] == val ) {
                                                        itemWithValue = item;
                                                    }
                                                })
                                                return itemWithValue
                                            }
                                            var oneSuccessfulQueryFromQuerySet = sh.each.find(itHelper.parent, 'successful', true)
                                            if ( oneSuccessfulQueryFromQuerySet == null ) {
                                                // debugger;
                                                self.proc('entire query set failed, using parent', sh.qq(item2.name),parent.name)
                                                parent.urlTorrentNotFound = true;
                                                self.utils.removeFromParent(itHelper.parent.length)
                                                self.utils.addToParent(parent, null)
                                            }
                                        }
                                    }
                                    // console.error('failed', node.name, JSON.stringify( itHelper.parent))
                                    if ( itHelper.parentItemFromIfFail ) {
                                        //     console.error('failed', itHelper.parentItemFromIfFail.name, JSON.stringify(itHelper.parentItemFromIfFail.ifFail))
                                    }
                                }
                            }
                            next();
                        }
                        return;
                    }

                }

                console.log('no queryes for ', node.queries)
                next();
            }, function(newObj) {
                console.log("Done!");
                // asdf.g
                item.filtered = true
                self.item.filtered = true
                fxEnd()
            });

            return;


            sdf.g.h.d.is.this.hit
            //  process.exit()

            var queryList = {};

            /*  {completeSeries:[],
             seasonsAndEpisodes:[]}*/
            //1. conditional iffs to block out content
            //2. ways to determine what is added
            //3. bulk queries to find content

            var tree = {
                type: 'querySet',
                name: "Complete Season",
                why: "Try to get show first if possible",
                queries: [],
                ifFail: //if fail means we don't add this if it fails
                {
                    name: "seasonsAndEpisodes",
                    type: 'querySet',
                    why: "Try to get all seasons and episodes",
                    queries: [
                        {
                            name: "season1",
                            type: 'querySet',
                            why: "Try to get season 1",
                            queries: [],
                            dirRemoteMega: 'whatever...',
                            ifFail: null //if fails ... we are screwed
                        },
                        {
                            name: "season2-",
                            type: 'querySet',
                            why: "Try to get all seasons and episodes",
                            queries: []
                        },
                        {
                            name: "episode-6x1",
                            type: 'querySet',
                            why: "Try to get all seasons and episodes",
                            queries: [],
                            dirRemoteMega: 'something about the season and file '
                        },
                    ]
                },

            }







            //create the tree ... to through the tree...
            //

            sh.goThroughTree = function goThroughTree(obj, level) {
                for (var k in obj) {
                    if (typeof obj[k] == "object" && obj[k] !== null)
                        goThroughTree(obj[k], level + 1);
                    else {
                        // do something...
                    }
                }
            }
            sh.goThroughTree = function goThroughTree(obj, level) {
                var listCollectedItems = [];
                function goThroughTree_InnerFx(obj, level) {
                    if (level == null)
                        level = 0
                    if (obj.type == 'querySet') {
                        var tabs = "\t"
                        sh.each.times(level, function () {
                            //asdf.g
                            tabs += "\t"
                        })
                        var obj2 = sh.clone(obj);
                        if (obj2.ifFail)
                            obj2.ifFail = '-->' + obj2.ifFail.name
                        if (obj2.queries)
                            obj2.queries = '@' + obj2.queries.length
                        console.log(tabs, JSON.stringify(obj2))


                        listCollectedItems.push(obj2)
                    }
                    for (var k in obj) {
                        if (typeof obj[k] == "object" && obj[k] !== null)
                            goThroughTree(obj[k], level + 1);
                        else {
                            // do something...
                        }
                    }
                }
                return listCollectedItems;
            }
            var listCollectedItems = sh.goThroughTree(tree)



            sh.tree = {};
            //sh.tree.async
            sh.goThroughTree = function goThroughTree(tree) {
                var listCollectedItems = [];
                function goThroughTree_InnerFx(obj, level) {
                    if (level == null)
                        level = 0
                    if (obj.type == 'querySet') {
                        var tabs = "\t"
                        sh.each.times(level, function () {
                            tabs += "\t"
                        })
                        var obj2 = sh.clone(obj);
                        if (obj2.ifFail)
                            obj2.ifFail = '-->' + obj2.ifFail.name
                        if (obj2.queries)
                            obj2.queries = '@' + obj2.queries.length
                        console.log(tabs, JSON.stringify(obj2))


                        listCollectedItems.push(obj2)
                    }
                    for (var k in obj) {
                        if (typeof obj[k] == "object" && obj[k] !== null)
                            goThroughTree_InnerFx(obj[k], level + 1);
                        else {
                            // do something...
                        }
                    }
                }
                goThroughTree_InnerFx(tree)
                return listCollectedItems;
            }
            var listCollectedItems = sh.goThroughTree(tree)

            sh.goThroughTreeAsync = function goThroughTreeAsync(tree){

            }
            sh.tree.async = sh.goThroughTreeAsync;
            sh.tree.async(tree, function processBranchOrLeaf(itemm, fxDoneWithBorL) {

            })

            var traverse = require('traverse-async').traverse;

            traverse(tree, function(node, next){
                console.log("Current node", miniUtils.prepForDisplay(node));
                //console.log("Context object", this);
                next();
            }, function(newObj) {
                self.proc('done with tree?')
            });



            return;


            //item.query =  item.dirMegegaRemote

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
                    item.queriesAlternates = sh.dv(item.queriesAlternates, [])
                    item.queriesAlternates.push(queryExpandedSeasons)
                }
            }
        }

        self.utils.addQueryComplete = function addQueryComplete(item) {
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
                    item.queriesAlternates = sh.dv(item.queriesAlternates, [])
                    item.queriesAlternates.push(queryExpandedSeasons)
                }
            }
        }



        self.utils.addPb = function addPB(item, url) {
            item.size = url.size;
            item.urlTorrent = url.urlTorrent;
            item.nameTorrent = url.nameTorrent
        }

        self.utils.addToParent = function addToParentX(item) {
            //shoudl we remove item?

            self.item.filtered = true; //10-30-16 make flag to not do this ...
            self.utils.cleanItem(item)
            self.runner.data.listFiltered.push(item);
            if (  self.runner.data.totalSize == null ) {
                self.runner.data.totalSize = 0;
            }
            if ( sh.isNumber(item.size))
                self.runner.data.totalSize += item.size;
        }

        self.utils.removeFromParent = function removeFromParent(length) {
            //this is so bad... TODO: chaNGE TO PARENT
            self.runner.data.listFiltered =
                self.runner.data.listFiltered.slice(0,-length)
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

exports.JSONSet = JSONSetIteratorPB_IMDB;
exports.IteratorClass =  JSONSetIteratorPB_IMDB

exports.JSONSetIteratorPb2 = JSONSetIteratorPB_IMDB;

if (module.parent == null) {
    var instance = new JSONSetIteratorPB_IMDB();
    var config = {};
    instance.init(config)
    instance.test();
    instance.fxCallback({}, function done(){

    })
}



