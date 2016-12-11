/**
 * Created by user on 7/24/15.
 */
/**
 *
 * Make sense of various scripts
 *
 * Gave up on rotten api ... imdb is owned by amazon ... use that site
 *
 * Takes small input,
 * find content on imdb, creates json output
 * creates file list
 * then forwards to breeder
 *
 */
var IMDB_Scraper = require('./imdb_scraper').IMDB_Scraper
var sh = require('shelpers').shelpers
var imdb_api_get_content = require('./imdb_api_get_content').imdb_api_get_content;
var Step2 = require('./../distillerv3/Step2_BulkTDownloader.js').BulkerScript;


var SanitizeNamesFromDB = require('./../distillerv3/tools/santizename/SanitizeNamesFromDB.js').SanitizeNamesFromDB

function imdb_dl_app2() {
    var self = this;
    var p = this;

    self.loadConfig = function loadConfig(cfg, switchesOverride) {
        //why: function input is default config
        var s = {};
        var switches = {};
        if ( switchesOverride )
            s = switchesOverride;
        //s.addPBToDlList = true;
        //s.addPBToDlListFast = true;
        //cfg.mode_get_dl_size = true; //TODO: make break out file
        s.upadteIMDBDB = true
        if (cfg.fixListOnly) {
            //why: 
            s = {};
            //s.
            cfg.skipImdbSearch = true;
            //cfg.useExistingDlListIfFound = true;
            s.addPBToDlList = true
            cfg.fixListOnlyAddPB = true;
            cfg.fixListOnly_Step1_skipIfFiltered = true; //have to delete filtered list to recreate

            // cfg.mode_completedItemsOnly = true
            cfg.fixListOnly_Step1_skipIfFiltered = false;

            // cfg.filterExistingFromDBEnabled = false;
        }

        if (s.addPBToDlList) {
            cfg.useExistingDlListIfFound = false;
            cfg.addPbLinks = true;
            cfg.breed = false;

            // cfg.addPbLinks = false;
        }

        if (s.upadteIMDBDB) {
            cfg.skipImdbSearch = false;
            cfg.useExistingDlListIfFound = false;
        }

        if (s.addPBToDlListFast) {
            cfg.useExistingDlListIfFound = false;
            cfg.addPbLinks = true;
            cfg.breed = false;
            cfg.howMany = 10
            cfg.howMany = 3
            // cfg.skipImdbSearch = false;
            cfg['dl.imdb.shorten.list.to.2.items'] = true
        }

        if (s.breedRemote) {
            //do not download on remote system
            cfg.useExistingDlListIfFound = true;
            cfg.addPbLinks = false;
            cfg.breed = true;
        }

        if ( s.limitDownloadItems ) {
            cfg.howMany = s.limitDownloadItems;
        }

        self.settings = cfg;
        if (self.settings.tv == true) {
            self.settings.type = 'tv';
        }
        console.log(cfg)
        console.log('breed ', self.settings.breed)
        
        self.config_addTestSettings(); 
        
        //process.exit();
        // asdf.g
        self.start();
    }

    self.config_addTestSettings  = function config_addTestSettings() {
        self.settings.testPBDupes = true;
    }

    self.start = function () {
        self.dl_list(self.settings)
    }

    self.dl_list = function (type, year, howMany, dirStore, yearEnd) {

        var settings = {};


        if (self.settings != null) {
            type = self.settings.type;

            year = self.settings.year;
            howMany = self.settings.howMany;
            yearEnd = self.settings.yearEnd

            settings = sh.clone(self.settings);
        }
        //there is no default for the year b/c it iwll still work
        //TODO: Test indie

        var imdb = new IMDB_Scraper();
        //get top 250 tvshows

        if (type == 'tv') {
            settings.tv = true
        }
        if (type == 'indie') {
            settings.movieIndie = true
        }
        howMany = sh.dv(howMany, 50)
        settings.pageCount = howMany / 50
        settings.dirDownload = sh.getUserHome() + '/trash/imdb/'
        settings.query = '';
        settings.baseUrls = 'http://www.imdb.com/search/title?at=0&release_date=1994,2013&sort=num_votes,desc&title_type=tv_series'
        settings.output_type = 'list';
        settings.output_type = 'raw_json_list' //dl the raw list only
        //settings.saveToJSON = true; //do u really need this?
        settings.year = year;
        settings.yearEnd = yearEnd;
        settings.output = 'tv_top_150_list.json';
        var defaultName = false;
        if (defaultName) {
            settings.dirDownload += 'topQuery';
            settings.output = 'last_list.json';
        }
        else {
            type = sh.dv(type, 'movies')
            var name = [type, 'top', howMany, year,].join('_');
            if (yearEnd != null) {
                name += '_' + yearEnd;
            }
            if (self.settings.sortBy != null) {
                name += '_' + self.settings.sortBy;
            }
            //settings.dirDownload +=  name + '/'//named internally
            settings.output = name + '.json'
        }
        if (settings.url != null) {
            var qs = require('qs')
            var query = qs.parse(settings.url)


            var name = [query.title_type, 'top', howMany, query.sort || '', query.release_date || ''].join('_');
            settings.output = name + '.json'
        }

        console.log('asdf', settings.output, query)



        settings.output = 'IMDB_App_Output/' + settings.output;
        self.settings.output_espidoes_dir = 'IMDB_App_Output/shows/'
        self.settings.output_torrents_dir = 'IMDB_App_Output/tors/'
        var fileOutputDlList = settings.output + '.dl.json'

        self.settings.fileOutputDlList = fileOutputDlList;


        self.settings.fileOutputDlListFiltered = self.settings.fileOutputDlList + '.filtered.json'
        self.settings.fileOutputDlListFilteredWithTorrents = self.settings.fileOutputDlList + '.filtered.tors.json'


        //skipo ahead to breeding
        if (self.settings.useExistingDlListIfFound == true) {
            if (sh.fileExists(settings.output) && sh.fileExists(self.settings.fileOutputDlList)) {
                self.proc('loading existing files', 'useExistingDlListIfFound')
                self.breed();
                return;
            }
            ;
            self.proc('could not load existing files, ', '...');
        }


        //store settings for later
        self.dlSettings = settings; // = false;
        imdb.settings = settings;

        if (self.settings.skipImdbSearch) {
            self.createDlList();
            return;
        }


        settings.fxDone = self.createDlList;

        if (self.dlSettings.tv == true) {
            settings.fxDone = self.getListOfShows;
        }

        if (self.settings.stopAfterIMDBSearch) {
            settings.fxDone = null;
        }

        imdb.loadSettings(settings);
        return settings;
    };

    function defineHandleModes() {
        self.handleDirectDownloadFile = function handleDirectDownloadFile() {
            //only breed

            if (self.settings.directDownloadFile ) {
                //adf.g
                self.proc('directDownloadFile, ', self.settings.directDownloadFile);
                self.settings.fileOutputDlList = __dirname + '/'  +  self.settings.directDownloadFile;

                self.settings.breed = true;

                var yyy = sh.fileExists(self.settings.fileOutputDlList);

                if ( yyy ) {
                    self.proc('loading existing files', 'useExistingDlListIfFound')
                    self.breed();
                    return true;
                };
                self.proc('could not load existing files, ', '...',  self.settings.fileOutputDlList);
                return true;
            }
        }

    }
    defineHandleModes();

    self.getListOfShows = function getListOfShows(confirmed) {

        //asdf.g
        var fileOutput = self.dlSettings.output;
        var list = JSON.parse(sh.readFile(fileOutput));

        //augment to json epsidoe einformation

        if (self.settings['dl.imdb.shorten.list.to.2.items'] == true) {
            //list = list.slice(0, 2);
            list = list.slice(0, 4);
        }

        sh.writeFile(fileOutput + '.b4.episodes.json', sh.toJSONString(list));
        //sh.writeFile(fileOutput + '.b4.episodes.json', sh.toJSONString(list));
        var options = {};
        options.unique = true;
        imdb_api_get_content.get_episodes(list, function done(o) {
            console.log('done....', options)
            function saveEachFile() {
                sh.each(o, function saveEachFileEpisode(imdb, showJSON) {
                    var fileName = self.settings.output_espidoes_dir + '/' + imdb + '.json'
                    sh.writeFile(fileName, sh.toJSONString(showJSON))
                })
            }

            saveEachFile();
            sh.writeFile(fileOutput, sh.toJSONString(list));
            self.createDlList();
        }, options);

        //var e = require('./episodes/IMDB_SeriesEpisodeDownloader').IMDB_SeriesEpisodeDownloader;
        //var e = require('./episodes/IMDB_SeriesEpisodeDownloader').IMDB_SeriesEpisodeDownloader;

        // self.createDlList(true); //
    }


    //TODO: make dl imdb_id, if series, auto download contents
    //TODO: bring in dlfile from Step2


    self.createDlList = function createDLList(confirmed) {
        asdf.g
        var fileOutput = self.dlSettings.output;
        var list = JSON.parse(sh.readFile(fileOutput));


        var dlEntryList = [];
        sh.each(list, function addEachEntryToDlList(i, jsnFile) {
            var dlEntry = {};
            var j = jsnFile;
            var unidecode = require('unidecode');

            j.title = unidecode(j.title);
            self.replaceNames(j, dlEntry);
            dlEntry.name = j.title;
            dlEntry.name = j.title;
            dlEntry.query = j.title;
            dlEntry.rating = parseFloat(j.rating);
            dlEntry.imdb_id = j.imdb_id;
            dlEntry.series = j.series;


            if ( dlEntry.rating < 8  ) {
                return; //skip low rating

            }


            var nameSaveable = sh.stripSpecialChars(j.title);
            //var querySaveable = sh.stripSpecialChars(dlEntry.query);
            //if movies, /movies/moviename(query)/imdbid/extracted stuff
            //can search by id,
            //if bad download, know what you are supposed to have
            if (self.dlSettings.tv != true) {
                dlEntry.query = j.title + ' ' + sh.unwrap(j.year, '(');
                dlEntry.dirRemoteMega = '/Root/movies/';
                dlEntry.dirRemoteMega += nameSaveable + '_' + j.year + '/'
                dlEntry.dirRemoteMega += j.imdb_id + '/'
            } else {
                //for each query
                //self.proc(jsnFile)
                if (jsnFile.age > 8) { //if ended
                    //is this wise? complet eseries
                    var q = '';
                    dlEntry = sh.clone(dlEntry);

                    if (j.title) {
                        var replaceSets = [
                            ['Death Note: Desu nôto', 'death note']
                        ];

                    }



                    q = [j.title, q].join(' ');
                    q += ' complete series';
                    dlEntry.query = q;

                    //if tv: /tv/showname/imdbid/query/extrated stuff
                    var querySaveable = sh.stripSpecialChars(q);

                    dlEntry.dirRemoteMega = '/Root/tv/';
                    dlEntry.dirRemoteMega += nameSaveable + '_' + j.year + '/';
                    dlEntry.dirRemoteMega += j.imdb_id + '/'
                    dlEntry.seasons = parseInt(j.seasons)

                    if ( dlEntry.seasons == 0 || isNaN(dlEntry.seasons)) {
                        throw new Error('why seasons 0? ' + sh.toJSONString(dlEntry));
                    }

                    dlEntry.dirRemoteMega += querySaveable + '/';

                    dlEntryList.push(dlEntry)
                    dlEntry.index = dlEntryList.length;

                    var q = [];
                    dlEntry.queriesAlternates = q;

                    if ( dlEntry.seasons == 1 ) {
                        q.push([j.title, 'season', 1].join(' '))
                    } else {
                        q.push([j.title, 'season', 1, '-', dlEntry.seasons].join(' '))
                    }
                    q.push([j.title, 'all seasons'].join(' '))
                    q.push([j.title, 'complete', 's'+sh.str.pad(1,2)+'-'+'s'+
                    sh.str.pad(dlEntry.seasons, 2)].join(' '))
                    q.push([j.title, 'complete series'].join(' '))
                    q.push([j.title, dlEntry.seasons, 'seasons'].join(' ')) //all 8 seasons
                    q.push([j.title, 'complete', 1+'-'+dlEntry.seasons].join(' '))

                    /*
                     Coupling Season 1 - 4 Complete DVDRip - x264 - MKV by RiddlerA
                     The Sopranos S01-S06 COMPLETE 720p BluRay x264-REWARD
                     Seinfeld Complete Series + extras-720p WEBrip AAC EN-SUB x264-[MULVAcoded]
                     That 70's Show Complete All 8 Seasons
                     Carnivale.S01-S02.Complete.480p.WEB-DL.x264-Sticky83 (Silver Torrent)
                     The West Wing (1999) Seasons 1-7 -E.Rev Complete 480p MKV x264
                     */


                    return;
                }

                if ( self.settings.mode_completedItemsOnly ) {
                    return;
                }

                //console.error('qS', jsnFile.queriesSeasons)

                sh.each(jsnFile.queriesSeasons, function addQ(i, q) {
                    dlEntry = sh.clone(dlEntry);

                    q = [j.title, q].join(' ');
                    dlEntry.query = q;

                    //if tv: /tv/showname/imdbid/query/extrated stuff
                    var querySaveable = sh.stripSpecialChars(q);

                    //REQ: To ensure we get complete seasons add complete
                    //Note: we do this after the mega dir is created
                    if (q.indexOf('Season ') == 0) {
                        q += ' complete';
                        //dlEntry.query = q;
                    }
                    ;

                    dlEntry.dirRemoteMega = '/Root/tv/';
                    dlEntry.dirRemoteMega += nameSaveable + '_' + j.year + '/';
                    dlEntry.dirRemoteMega += j.imdb_id + '/'
                    dlEntry.dirRemoteMega += querySaveable + '/';

                    dlEntryList.push(dlEntry)
                    dlEntry.index = dlEntryList.length;
                });

                return;
            }

            dlEntryList.push(dlEntry)
            dlEntry.index = dlEntryList.length;
        });

        dlEntryList = dlEntryList.sort('rating')

        function compare(a,b) {
            if (a.rating > b.rating)
                return -1;
            else if (a.rating < b.rating)
                return 1;
            else
                return 0;
        }

        dlEntryList.sort(compare);

        var strDlList = sh.toJSONString(dlEntryList)
        //console.log(strDlList)
        sh.writeFile(self.settings.fileOutputDlList, strDlList);
        console.error(self.settings.fileOutputDlList, 'yyy')
        self.filterDlList(dlEntryList)
    }


    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }


}



exports.imdb_dl_app2 = imdb_dl_app2;
/*
 Stardard way to start script ...
 */
exports.startScript = function startScript(configToUse) {
    var path = require('path')
    var fileDefaultConfig = path.resolve(__dirname+'/../defaultConfig.json')
    var cfg = sh.readJSONFile(  args[0], null, false);

}




if ( module.parent == null ) {
    var path = require('path');
    var args = sh.getNodeArguments();
    //if no args, use standard defaultConfig.json

    function getConfig(fileConfig) {
        var cfg = sh.readJSONFile( fileConfig, null, false);
        //if args1 is json object
        //use defaultConfig if present
        if ( cfg.updateDefaultConfig != null ) {
            cfg = sh.readJSONFile(cfg.updateDefaultConfig, null, false);
        }

        if ( cfg.imdb_app != null  ){
            cfg = cfg.imdb_app;
        }
        return cfg;
    }

    var fileDefaultConfig = path.resolve(__dirname+'/../defaultConfig.json');

    if ( args.length == 0 ) { //use default config

        var cfg = getConfig(fileDefaultConfig)
    }

    //3:31/2016 default and json
    if ( args[0] == 'overrideJSON' && args[1] != null) {
        //var fileDefaultConfig = path.resolve(__dirname+'/../defaultConfig.json');
        //args.push(fileDefaultConfig);
        var overrideJSON = JSON.parse(args[1]);
        var cfg = getConfig(fileDefaultConfig)

        //3:31/2016 default and json
        if ( args[0] == 'overrideJSON' && args[1] != null) {
            //var fileDefaultConfig = path.resolve(__dirname+'/../defaultConfig.json');
            //args.push(fileDefaultConfig);
            var overrideJSON = JSON.parse(args[1]);

            if ( overrideJSON ) {
                console.error('override', overrideJSON)
                //asdf.g
            }
        }

    }



    //how to access breed modes?
    if ( args.length == 1  ) { //send json file as 1st arg
        console.log( args[0] );
        //var i = new imdb_dl_app();
        // i.loadConfig(cfg);
        // return
        cfg = getConfig(args[0])
    }

    //return ; //3/31/16 stop here
    /*   var list = ['tt0944947']
     imdb_api_get_content.get_episodes(list, function done(o) {
     console.log('done....')
     }, {})

     return;*/

    var i = new imdb_dl_app2();

    var config = {};
    config.type = null;
    config.year =  1994;
    config.yearEnd = 1995;

    config = {
        "type":"movies",
        "year":"2012",
        "yearEnd":"2013",
        "type":"tv",
        "year":"2012",
        "yearEnd":"2013",
        "breed":true,
        "useExistingDlListIfFound":true
    }


    if ( cfg ) {
        config = cfg;
    };

    //config.tv = true;
    //config.breed = true;

    //config.stopAfterIMDBSearch = true;
    //config.skipImdbSearch = true;

    i.overrideJSON = overrideJSON
    if ( overrideJSON ) {
        console.error('override', overrideJSON)
        sh.mergeObjects2(overrideJSON.imdb_app, cfg);
    }
    console.error('where we at', process.cwd(), overrideJSON, cfg.breed )


    //process.exit();
    i.loadConfig(config)


    /*i.dl_list('movies',1994,100).fxDone = function() {
     i.createDlList();
     }
     return;
     i.dl_list('tv',1994,100)*/
}