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


var SanitizeNamesFromDB = sh.fs.resolve(__dirname + '/'+
    '../distillerv3/tools/santizename/wrappers/SanitizeNamesFromDB.js', true)

var SanitizeNamesFromDB = require(SanitizeNamesFromDB).SanitizeNamesFromDB




function imdb_dl_app() {
    var self = this;
    var p = this;
    self.data = {}
    self.data.minRating = 6.0

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


        if ( s.doNotBreed ) {
            cfg.breed = false;
        }


        /*if ( s.doNotBreed ) {
         self.settings.breed = false;
         }*/


        if ( s.limitDownloadItems ) {
            cfg.howMany = s.limitDownloadItems;
        }

        self.settings = cfg;
        if (self.settings.tv == true) {
            self.settings.type = 'tv';
        }
        console.log(cfg)
        self.proc('breed ', self.settings.breed)

        self.config_addTestSettings();

        //process.exit();
      //asdf.g
        self.start();
    }

    self.config_addTestSettings  = function config_addTestSettings() {
        self.settings.testPBDupes = true;
    }

    self.start = function () {
        self.downloadListOfIMDBIds();
    }
    self.downloadListOfIMDBIds = function downloadListOfIMDBIds(type, year, howMany, dirStore, yearEnd) {

        var scraperSettings = {};
        var ss = scraperSettings



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
            ss.tv = true
        }
        if (type == 'indie') {
            ss.movieIndie = true
        }
        howMany = sh.dv(howMany, 50)
        ss.pageCount = howMany / 50
        ss.dirDownload = sh.getUserHome() + '/trash/imdb/'
        ss.query = '';
        ss.baseUrls = 'http://www.imdb.com/search/title?at=0&release_date=1994,2013&sort=num_votes,desc&title_type=tv_series'
        ss.output_type = 'list';
        ss.output_type = 'raw_json_list' //dl the raw list only
        //settings.saveToJSON = true; //do u really need this?
        ss.year = year;
        ss.yearEnd = yearEnd;
        ss.years = self.settings.years;
        ss.output = 'tv_top_150_list.json';
        var defaultName = false;
        if (defaultName) {
            ss.dirDownload += 'topQuery';
            ss.output = 'last_list.json';
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
            ss.output = name + '.json'
        }
        if (ss.url != null) {
            var qs = require('qs')
            var query = qs.parse(ss.url)
            var name = [query.title_type, 'top', howMany, query.sort || '', query.release_date || ''].join('_');
            ss.output = name + '.json'
        }

        ss.urlList = self.settings.urlList;
        ss.urlsList = self.settings.urlsList;
        ss.ttList = self.settings.ttList;
        if ( self.settings.output ) {
            //  asdf.g
            //bookmark.outptu changed
            self.output = null;
            //ss.output = self.settings.output;

            if ( ss.output.includes('/') == false || ss.output.includes('\\') == false  ) {
                console.log('output', ss.output)
                //self.settings.output = sh.fs.makePath(/*__dirname, */'IMDB_App_Output', self.settings.output);
                ss.output = self.settings.output;
                if ( ss.output.includes('/') == false && ss.output.includes('\\') == false  ) {
                    this.path.is.not.valid
                }
               // zzz.g.d.d
            }
        }
        /*if ( self.settings.fileOutput ) {
         //  asdf.g
         //bookmark.outptu changed
         self.output = null;
         //ss.output = self.settings.output;
         if ( self.settings.fileOutput.includes('/') == false  ) {
         self.settings.fileOutput = sh.fs.makePath(/!*__dirname, *!/'IMDB_App_Output', self.settings.fileOutput);
         ss.output = self.settings.fileOutput;
         }
         }*/
        //    asdf.g
        console.log('downloadListOfIMDBIds', ss.output, query);


        //asdf.g
        p.createOutputFilePaths = function createOutputFilePaths(fileOutputDlList2) {
            var dir = 'IMDB_App_Output'
            var dirRootApp= sh.fs.makePath(__dirname, 'IMDB_App_Output/')+'/';

            if ( fileOutputDlList2.includes(dir) == false ) {
                if( sh.fs.isAbs(fileOutputDlList2) == false ) {
                    fileOutputDlList2 = dirRootApp + fileOutputDlList2;
                }
            }
            self.settings.output_espidoes_dir = dirRootApp+'shows/'
            self.settings.output_torrents_dir = dirRootApp+'tors/'
            var fileOutputDlList = fileOutputDlList2 + '.dl.json'

            self.settings.fileOutputDlList = fileOutputDlList;
            return fileOutputDlList2
        }

        ss.output = self.createOutputFilePaths(ss.output) //ss.fileOuttput


        self.settings.fileOutputDlListFiltered = self.settings.fileOutputDlList + '.filtered.json'
        self.settings.fileOutputDlListFilteredWithTorrents = self.settings.fileOutputDlList + '.filtered.tors.json'


        //skipo ahead to breeding
        if (self.settings.useExistingDlListIfFound == true) {
            if (sh.fileExists(settings.output) && sh.fileExists(self.settings.fileOutputDlList)) {
                self.proc('loading existing files', 'useExistingDlListIfFound')
                self.breed();
                return;
            }
            self.proc('could not load existing files, ', '...');
        }

            if ( self.handleDirectDownloadFile() ) {
                return; //only breed
            }


        //get current size
        if (self.settings.mode_get_dl_size) {
            var urlTorrents = [];
            var size = 0
            sh.fileExists(self.settings.fileOutputDlList)
            var jsonDLList = sh.readJSONFile(self.settings.fileOutputDlList);

            sh.fileExists(self.settings.fileOutputDlListFilteredWithTorrents)
            var jsonDLList = sh.readJSONFile(self.settings.fileOutputDlListFilteredWithTorrents);

            sh.each(jsonDLList, function addEachEntryToDlList(i, jsnFile) {
                var dlEntry = {};
                var dlSize = parseFloat(jsnFile.size)
                if (jsnFile.xname != null) {
                    return;
                }
                var urlTorrent = jsnFile.urlTorrent;
                if (urlTorrents.indexOf(urlTorrent) != -1) {
                    return;
                }
                urlTorrents.push(urlTorrent)
                //console.log(jsnFile)
                console.error(jsnFile.name, dlSize, jsnFile.size)
                if (!isNaN(dlSize) && dlSize != 0) {
                    //console.log(dlSize)
                    size += dlSize;
                } else {
                    console.error(dlSize, jsnFile.size)
                }
            });
            self.proc('size', size, 'GB')
            // asdf.g
            process.exit();
        }

        //store settings for later
        self.dlSettings = settings; // = false;
        imdb.settings = settings;


        if (self.settings.skipImdbSearch) {
            self.createDlList();
            return;
        }


        //settings.fxDone = self.createDlList;

        // if (self.dlSettings.tv == true) {
        ss.fxDone = function onDoneWithIMDB_ids(scraper, fileJSONOutput_IDs) {
            self.proc('what is file>?', '', fileJSONOutput_IDs)
            self.data.fileJSON_IMDBIds = fileJSONOutput_IDs
            if ( self.dlSettings.fileOutput == null && fileJSONOutput_IDs ) {
                // self.dlSettings.output = self.data.fileJSON_IMDBIds;
                var fileNameOutput = sh.getFileName(self.data.fileJSON_IMDBIds)
                var y2 = self.createOutputFilePaths(fileNameOutput)
                self.proc('update and replaced the thing', ' self.dlSettings.output')
                //asdf.g
                self.dlSettings.output = fileJSONOutput_IDs;
                //self.settings.output = ''
            }
             //asdf.bookmark.gotallimdbids
            self.downloadEpisodeInfo();
        }
        //  }

        if (self.settings.stopAfterIMDBSearch) {
            asdf.g
            self.proc('self.settings.stopAfterIMDBSearch')
            ss.fxDone = null;
        }
        /*
         1100/day
         170 k 40k
         160 base...
         1100
         */
        if (self.settings.configRipper ) {
            sh.copyProps(self.settings.configRipper, ss);
        }


        imdb.loadSettings(ss);
        return ss;
    };

    function defineHandleModes() {
        self.handleDirectDownloadFile = function handleDirectDownloadFile() {
            //only breed

            if (self.settings.directDownloadFile ) {
                //adf.g
                self.proc('directDownloadFile, ', self.settings.directDownloadFile);
                self.settings.fileOutputDlList = __dirname + '/'  +  self.settings.directDownloadFile;

                self.settings.breed = true;

                if ( self.settings.breedStop == true ) {
                    self.settings.breed = false;
                }

                var yyy = sh.fileExists(self.settings.fileOutputDlList);

                if ( yyy ) {
                    self.proc('loading existing files', 'useExistingDlListIfFound')
                    self.breed();
                    return true;
                }
                ;
                self.proc('could not load existing files, ', '...',  self.settings.fileOutputDlList);
                return true;
            }
        }

    }
    defineHandleModes();

    self.downloadEpisodeInfo = function downloadEpisodeInfo(scraper) {
        //rename
        if ( scraper ) {
            var fileOutput = sh.stripSpecialChars(scraper.data.renameTo);
            self.dlSettings.output  =__dirname + '/'+'IMDB_App_Output/' +fileOutput+'.json';
            self.proc('renamed output file to', self.dlSettings.output)
        }


        var fileOutput =  self.dlSettings.output;



        var list = JSON.parse(sh.readFile(fileOutput));
        
        //add numbers to easy coun ting
        sh.each(list, function onAddNumbers(k,item) {
            item.index = k;
        })

        //augment to json epsidoe einformation

        if (self.settings['dl.imdb.shorten.list.to.2.items'] == true) {
            //list = list.slice(0, 2);
            list = list.slice(0, 4);
        }

        sh.writeFile(fileOutput + '.b4.episodes.json', sh.toJSONString(list));


        if ( self.settings.maxImdbListSize) {
            list = list.slice(0, self.settings.maxImdbListSize);
            self.proc('maxImdbListSize', 'clipping size', self.settings.maxImdbListSize, list.length)
            // asdf.g
        }




        //self.createDlList();
       // return;

        //sh.writeFile(fileOutput + '.b4.episodes.json', sh.toJSONString(list));
        var options = {};
        options.unique = true;
        options.skipBadIds = true
        optionsClone = sh.clone(options);
        imdb_api_get_content.get_episodes(list, function done(o) {
            self.proc('done....', optionsClone, fileOutput)
            function saveEachFile() {
                sh.each(o, function saveEachFileEpisode(imdb, showJSON) {
                    if ( showJSON.series === false ) {
                        return // skip movies (they have no expidoes)
                    }
                    sh.fs.mkdirp(self.settings.output_espidoes_dir);
                    var fileName = /*__dirname + '/'+*/ self.settings.output_espidoes_dir + '/' + imdb + '.json'
                    sh.writeFile(fileName, sh.toJSONString(showJSON))
                })
            }
            //asdf.g
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


        if ( self.settings.stopAfterGetIMDB ) {
            self.proc('stopAfterGetIMDB')
            //asdf.g
            //self.proc('ok.......', self.settings.fxDone)
            if (self.settings.fxDone)
                console.log('createDLList', 'done and', self.settings.fxDone.name)
            // asdf.g
            sh.callIfDefined(self.settings.fxDone, self.dlSettings.output)
            return;
        }


        var fileOutput = self.dlSettings.output;
        var list = JSON.parse(sh.readFile(fileOutput));


        var dlEntryList = [];
        sh.each(list, function addEachEntryToDlList(i, jsnFile) {
            var dlEntry = {};
            var j = jsnFile;

            if ( j.imdb_id == null  ) {
                self.proc('bad input no imdbId', j)
                return;

            }
            var unidecode = require('unidecode');

            j.title = unidecode(j.title);
            self.replaceNames(j, dlEntry);
            dlEntry.name = j.title;
            dlEntry.name = j.title;
            dlEntry.query = j.title;
            dlEntry.rating = parseFloat(j.rating);
            dlEntry.imdb_id = j.imdb_id;
            dlEntry.series = j.series;


            if ( dlEntry.rating < self.data.minRating  ) {
                self.proc('failed minin mu randing', self.data.minRating, j.title)
                return; //skip low rating

            }


            var nameSaveable = sh.stripSpecialChars(j.title);
            //var querySaveable = sh.stripSpecialChars(dlEntry.query);
            //if movies, /movies/moviename(query)/imdbid/extracted stuff
            //can search by id,
            //if bad download, know what you are supposed to have
            //if (self.dlSettings.tv != true) {
            if (self.dlSettings.tv != true && j.series !== true ) {
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

                console.log('what is the queries? ...', jsnFile)

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
        // asdf.g
        var strDlList = sh.toJSONString(dlEntryList)
        //console.log(strDlList)
        sh.writeFile(self.settings.fileOutputDlList, strDlList);
        console.error(self.settings.fileOutputDlList, 'yyy')
        self.filterDlList(dlEntryList)
    }

    function defineFilterList() {


        p.filterDlList = function filterDlList(dlEntryList) {
            function onStepFinished_F(_filtereddlList) {
                if ( _filtereddlList) {
                    filtereddlList = _filtereddlList;
                }
                updateDLFile()
                self.getPBLinks(filtereddlList)
            }

            if (self.settings.fixListOnly != true) {
                // asdf.g
                onStepFinished_F(dlEntryList);

                return;
            }


            if ( self.settings.fixListOnly_Step1_skipIfFiltered) {
                if ( sh.fileExists(self.settings.fileOutputDlListFiltered)) {
                    var prevList = sh.readJSONFile(self.settings.fileOutputDlListFiltered)
                    onStepFinished_F(prevList);
                    return;
                }
            }
            var count = 0;
            var skipped = 0;

            var filtereddlList = [];

            function updateDLFile() {
                var strDlList = sh.toJSONString(filtereddlList)
                sh.writeFile(self.settings.fileOutputDlListFiltered, strDlList);
            }

            self.proc('getting -define- pb links for', dlEntryList.length);
            sh.async(dlEntryList,
                function checkIfContentInDB(json, _fxDone) {
                    count++;
                    if (count % 25 == 0) {
                        // asdf.g
                        self.proc(count, sh.percent(count / dlEntryList.length))
                        updateDLFile();
                    }
                    var it = {}
                    it._fxDone = _fxDone;

                    //self.proc('start', json.query);

                    function fxDone_onGot_LxF() {
                        // setTimeout(function () {
                        if (json.query.indexOf(' Broke Girls S05E20') != -1) {
                            debugger;
                        }
                        //self.proc('completed', json.query)
                        if ( json.skip ) {
                            skipped++
                        } else {
                        }


                        if ( self.modifyAndFilter_BasedOnName(json) != false ) {

                        } else {
                            filtereddlList.push(json);
                        }
                        it._fxDone();
                        it._fxDone = null;
                        //  }, 1)

                    }

                    self.filter_showsNotInDB_BasedONIMDB_ID(json, fxDone_onGot_LxF);
                },
                function doneUploadingFiles() {
                    console.log('done filtering json blocks ', 'skilpped', skipped)
                    //   asdf.g
                    updateDLFile()


                    if (self.settings.fixListOnlyAddPB ) {
                        onStepFinished_F()
                        return;
                    }
                    //self.breed();
                }
            )
            //self.getPBLinks(dlEntryList)
        }



        p.filter_showsNotInDB_BasedONIMDB_ID = function getLxFx(json, fxDone, json2) {
            json2 = json;




            if ( self.settings.filterExistingFromDBEnabled == false ) {
                fxDone()
                return;
            }

            //console.log(json)


            if (self.dbEpisodes == null ) {
                self.dbEpisodes = new SanitizeNamesFromDB();
                self.dbEpisodes.init();
            }

            self.dbEpisodes.settings.logConsole = false;

            var data = self.dbEpisodes.getInfoFromJSON(json, true)

            /*
             var arr = [
             [self.dbEpisodes.findIMDB, data],
             [self.dbEpisodes.findIMDB, data],
             ]
             arr.fxIteration = function onGotMatches(matches) {
             self.proc('matches for', json.name, matches.length)
             // asdf.g
             if (matches.length > 0 )  {
             json2.skip = true;
             json2.match = matches[0].localFilePath;
             //asdf.g
             }
             json.boo = true
             fxDone()
             })
             */

            self.dbEpisodes.findIMDB(data, function onGotMatches(matches) {
                self.proc('matches for', json.name, matches.length)
                // asdf.g
                if (matches.length > 0 )  {
                    json2.skip = true;
                    json2.match = matches[0].localFilePath;
                    //asdf.g
                }

                json.boo1 = true
                //if you don't have s01e01, then you cannot skip this item
                if ( data.seasonNumberEnd == null || json2.skip != true ) {
                    fxDone()
                } else {
                    data.seasonNumber = data.seasonNumberEnd;
                    self.dbEpisodes.findIMDB(data, function onGotMatches(matches) {
                        self.proc('matches for ending', json.name, matches.length)
                        // asdf.g
                        if (matches.length > 0 )  {
                            json2.skip = true;
                            json2.matchEnding = matches[0].localFilePath;
                            //asdf.g
                        } else {
                            json2.skip = false;
                        }

                        if ( json2.skip == true ) {
                            //     asdf.g
                        }
                        json.boo2 = true
                        fxDone()
                    })
                }
            })


        }


        p.modifyAndFilter_BasedOnName = function modifyAndFilter_BasedOnName(json) {

            var skip = false;
            sh.each(self.settings.breedConfigOverrides.skipItems, function skipItemIfBad(k, name) {
                if (json.name.indexOf(name) == 0 ) {
                    skip = true;
                    //asdf.g
                    return false;
                }
            });

            if (skip)
                return true;

            return false;
        }

        p.replaceNames = function replaceNames(json, dlEntry) {


            var wordPairs= self.settings.breedConfigOverrides.overrideWordPairs;
            if ( wordPairs == null )
                return;

            //var itemsChanged = [];

            var dict = {};
            wordPairs.forEach(function createDictionary(pair) {
                dict[pair[0]] = pair[1];
            })

            //self.items.forEach(function(item) {
            var replacedPartOfName = false;
            sh.each(dict, function(k, v) {
                var match =k;
                var replaceWith =v;
                if ( match == null || replaceWith == null) {
                    return;
                }
                //item.queryOverride = 'xxx';
                if ( sh.includes(json.title, match)) {
                    //  asdf.g
                    if ( json.titleOriginal==null ) {
                        json.titleOriginal = json.title;
                    }
                    json.title = sh.replace(json.title, match, replaceWith)
                    //itemsChanged.push(item)
                    replacedPartOfName = true;
                    return false;
                };

            });

            if ( replacedPartOfName )
                dlEntry.f = json.title;

        }

    }
    defineFilterList();

    function defineGetPB() {
        p.getPBLinks = function getPBLinks(dlEntryList) {


            if ( self.settings.exitBeforeBreed ) {
                self.proc('exitBeforeBreed', self.settings.exitBeforeBreed, 'len', dlEntryList.length)
                return;
            }



            asdf.g
            function onStepFinished_doneGettingTorrentLinks() {
                if (self.settings.fixListOnly) {
                    return; //if only filtering, do not breed
                }
                self.breed();
            }

            if (self.settings.addPbLinks != true) {
                onStepFinished_doneGettingTorrentLinks();
                return;
            }

            if (self.settings.fixListOnly) {
                if (self.settings.fixListOnlyAddPB != true) {
                    //onStepFinished_doneGettingTorrentLinks();
                    return;
                }

                //replace dl list with pre working filetered list
                var prev_dlEntryList = sh.readJSONFile(self.settings.fileOutputDlListFilteredWithTorrents, [], true)
                if (prev_dlEntryList.length == 0) {
                    prev_dlEntryList = null;
                }
                dlEntryList = sh.dv(prev_dlEntryList, dlEntryList);
                self.proc('list is', dlEntryList.length);
                //  process.exit()
            }

            var count = 0;

            function updateDLFile() {
                var fileOutput = self.settings.fileOutputDlList;
                if (self.settings.fixListOnly) {
                    fileOutput = self.settings.fileOutputDlListFilteredWithTorrents;
                }
                var strDlList = sh.toJSONString(dlEntryList);
                sh.writeFile(fileOutput, strDlList);
                //asdf.g
            }

            var notFound = [];
            var foundTorrents = [];
            var size = 0


            if (self.settings.testPBDupes) {
                dlEntryList.unshift(sh.clone(dlEntryList[0])); //add the 2nd one 2x
            }

            self.proc('getting pb links for', dlEntryList.length);
            sh.async(dlEntryList,
                function getTorrentLinkFor(json, _fxDone) {
                    count++;
                    if (count % 25 == 0) {
                        // asdf.g
                        self.proc(count, sh.percent(count / dlEntryList.length))
                        updateDLFile();
                    }
                    var it = {}
                    it._fxDone = _fxDone;
                    function fxDone_onGotTorrentLink() {
                        // setTimeout(function () {
                        if (json.query.indexOf(' Broke Girls S05E20') != -1) {
                            debugger;
                        }
                        self.proc('completed', json.query)

                        if (foundTorrents.indexOf(json.urlTorrent) != -1) {
                            json.urlTorrent = 'skip_duplicate'
                            json.size = 0
                        } else {
                            foundTorrents.push(json.urlTorrent)
                        }
                        ;

                        if (json.urlTorrent == null) {
                            notFound.push(json.query)
                        }
                        var dlSize = parseInt(json.size)
                        if (!isNaN(dlSize)) {
                            //console.log(dlSize)
                            size += dlSize;
                        }


                        it._fxDone();
                        it._fxDone = null;


                        //  }, 1)

                    }

                    self.proc('start', json.query);
                    self.getPB(json, fxDone_onGotTorrentLink);
                },
                function doneUploadingFiles() {
                    console.log('done upload files ')

                    updateDLFile()

                    onStepFinished_doneGettingTorrentLinks();


                    self.proc('size', size, 'GB')
                    console.error('not found', notFound)
                }
            )


        }
        var SearchPB = require('./../distillerv3/utils/SearchKT').SearchPB
        var SearchPB_Test = require('./../distillerv3/utils/SearchKT_Test').SearchKT_Test


        //exports.SearchPB_Test = SearchPB_Test;

        p.getPB = function getPB(json, fxDone) {
            if (json.urlTorrentNotFound) {
                self.proc('previously could not find torrent for ', json.name)
                fxDone();
                return;
            }
            delete json.urlTorrentNotFound
            if (json.urlTorrent != null) {
                self.proc('already have json', json.name)
                fxDone();
                return;
            }

            var options = {}

            var it = {};
            it.saveTorrent = function saveTorrent(jsonTor, opts) {
                var torrentFileName = it.getTorrentFileName(opts);
                sh.mkdirp(torrentFileName.split('/').slice(0, -1).join('/'))
                sh.fs.writeJSONFile(torrentFileName, jsonTor);
            }
            it.getTorrentFileName = function getTorrentFileName(opts) {
                //store torrent
                var torrentFileName = sh.stripSpecialChars(opts.query);
                if (opts.pbCategory) {
                    torrentFileName += '_' + opts.pbCategory;
                }
                ;
                var fileTorrent = self.settings.output_torrents_dir + '/';
                if (it.isTV) {
                    fileTorrent += 'tv/' + json.name + '/'
                } else {
                    fileTorrent += 'movie/'
                }
                fileTorrent += torrentFileName + '.mag'
                return fileTorrent;
            }
            it.readTorrent = function readTorrent() {

            }
            it.searchPB = function searchPB_redirect(opts) {
                var torrentFileName = it.getTorrentFileName(opts);

                if (sh.fileExists(torrentFileName)) { //skip downloalding torrent again
                    var oldTorrentJSON = sh.readJSONFile(torrentFileName);
                    if (oldTorrentJSON) {
                        sh.mergeObjectsForce(oldTorrentJSON, json);
                        return true;
                    }
                    ;
                }
                ;

                //TODO: Make a check that will enable overriding of values
                if (opts.pbCategory2 != null) { //try to find 2nd category
                    var origPbCategory = opts.pbCategory;
                    opts.pbCategory = opts.pbCategory2;
                    var torrentFileName = it.getTorrentFileName(opts);
                    if (sh.fileExists(torrentFileName)) {
                        var oldTorrentJSON = sh.readJSONFile(torrentFileName);
                        if (oldTorrentJSON) {
                            sh.mergeObjectsForce(oldTorrentJSON, json);
                            //fxDone();
                            return true;
                        }
                    }
                    ;
                    opts.pbCategory = origPbCategory;
                }
                if (json.urlTorrentNotFound === true) {
                    //fxDone();
                    return true; //skip if could not find torrent last time
                }
                ;
                opts.stopWhen1Found = true;
                opts.list = [];
                opts.list = [opts.query];
                if (json.queriesAlternates) {
                    opts.list = [];

                    sh.each(json.queriesAlternates, function add720(k, v) {
                        opts.list.push(v + ' ' + 'q:hdtv')
                    });

                    opts.list = opts.list.concat(json.queriesAlternates);

                }
                ;
                //try to read file
                it.pirateBaySearcher.go(opts)
                return false;
            }
            it.isTVShow = function isTV() {
                var isTV = json.dirRemoteMega.indexOf('/tv/') != -1;
                it.isTV = isTV;
                return isTV;
            }
            it.isTVShow();


            //sh.mergeObjects(token, options)
            options.query = json.query;
            /*options.pbCategory = token.pbCategory;
             options.pbCategory2 = token.pbCategory2;*/
            options.pbCategory = 207;
            options.pbCategory2 = 201;

            if (it.isTV) {
                options.pbCategory = 208;
                options.pbCategory2 = 205;
            }

            options.pbMinSeederCount = 5;

            var go = new SearchPB_Test();

            it.pirateBaySearcher = go;
            options.callback = function onDone(_urlTorrent, t, torLinkJSON) {
                json.urlTorrent = _urlTorrent;
                sh.mergeObjectsForce(torLinkJSON, json);
                self.proc('token.urlTorrent', options.query, _urlTorrent);
                it.saveTorrent(torLinkJSON, options);

                fxDone();
            }
            options.fxBail = function bailX(msg) {

                var bailOnQuery = false;

                sh.waitXSecs(3, function finishIn3Secs() {
                    json.urlTorrentNotFound = true
                    fxDone();
                })


            }

            //go.go(options);
            var skipped = it.searchPB(options);
            if (skipped) {
                fxDone();
                //  return;
            }
        }

        p.getPBOld = function getPB(json, fxDone) {
            if (json.urlTorrentNotFound) {
                self.proc('previously could not find torrent for ', json.name)
                fxDone();
                return;
            }
            delete json.urlTorrentNotFound
            if (json.urlTorrent != null) {
                self.proc('already have json', json.name)
                fxDone();
                return;
            }

            var options = {}

            var it = {};
            it.saveTorrent = function saveTorrent(jsonTor, opts) {

                var torrentFileName = it.getTorrentFileName(opts);
                sh.mkdirp(torrentFileName.split('/').slice(0, -1).join('/'))
                //asdf.g
                sh.fs.writeJSONFile(torrentFileName, jsonTor);
                // asdf.g
            }
            it.getTorrentFileName = function getTorrentFileName(opts) {
                //store torrent
                var torrentFileName = sh.stripSpecialChars(opts.query);
                if (opts.pbCategory) {
                    torrentFileName += '_' + opts.pbCategory;
                }
                ;
                var fileTorrent = self.settings.output_torrents_dir + '/';
                if (it.isTV) {
                    fileTorrent += 'tv/' + json.name + '/'
                } else {
                    fileTorrent += 'movie/'
                }
                fileTorrent += torrentFileName + '.mag'
                return fileTorrent;
            }
            it.readTorrent = function readTorrent() {

            }
            it.searchPB = function searchPB_redirect(opts) {
                var torrentFileName = it.getTorrentFileName(opts);

                if (sh.fileExists(torrentFileName)) { //skip downloalding torrent again
                    var oldTorrentJSON = sh.readJSONFile(torrentFileName);
                    if (oldTorrentJSON) {
                        sh.mergeObjectsForce(oldTorrentJSON, json);
                        return true;
                    }
                    ;
                }
                ;

                //TODO: Make a check that will enable overriding of values
                if (opts.pbCategory2 != null) { //try to find 2nd category
                    var origPbCategory = opts.pbCategory;
                    opts.pbCategory = opts.pbCategory2;
                    var torrentFileName = it.getTorrentFileName(opts);
                    if (sh.fileExists(torrentFileName)) {
                        var oldTorrentJSON = sh.readJSONFile(torrentFileName);
                        if (oldTorrentJSON) {
                            sh.mergeObjectsForce(oldTorrentJSON, json);
                            //fxDone();
                            return true;
                        }
                    }
                    ;
                    opts.pbCategory = origPbCategory;
                }
                if (json.urlTorrentNotFound === true) {
                    //fxDone();
                    return true; //skip if could not find torrent last time
                }
                ;
                opts.list = [];
                opts.list = [opts.query]
                if (json.queriesAlternates) {
                    opts.list = opts.list.concat(json.queriesAlternates);
                }
                //try to read file
                it.pirateBaySearcher.go(opts)
                return false;
            }
            it.isTVShow = function isTV() {
                var isTV = json.dirRemoteMega.indexOf('/tv/') != -1;
                it.isTV = isTV;
                return isTV;
            }
            it.isTVShow();


            //sh.mergeObjects(token, options)
            options.query = json.query;
            /*options.pbCategory = token.pbCategory;
             options.pbCategory2 = token.pbCategory2;*/
            options.pbCategory = 207;
            options.pbCategory2 = 201;

            if (it.isTV) {
                options.pbCategory = 208;
                options.pbCategory2 = 205;
            }

            options.pbMinSeederCount = 5;

            var go = new SearchPB_Test();

            it.pirateBaySearcher = go;
            options.callback = function onDone(_urlTorrent, t, torLinkJSON) {
                json.urlTorrent = _urlTorrent;
                sh.mergeObjectsForce(torLinkJSON, json);
                self.proc('token.urlTorrent', options.query, _urlTorrent);
                it.saveTorrent(torLinkJSON, options);

                fxDone();
            }
            options.fxBail = function bailX(msg) {

                var bailOnQuery = false;
                //TODO: if have to add a 3rd category, store searchInCategory in array
                //and verify each attempt
                //feature: bookmark.searchAgain without category restrictions
                if (options.pbCategory != null) {
                    if (options.pbCategory2 == null) {
                    } else {

                        options.pbCategory = options.pbCategory2
                        options.pbCategory2 = null;

                        sh.waitXSecs(3, function tryAgain() {
                            var skipped = it.searchPB(options);
                            if (skipped) {
                                fxDone();
                                //  return;
                            }
                        })
                        return;
                        //retry
                        //token.query = token.query.replace('720p', '')
                        // self.searchByName(token, cb, token.pbCategory2)
                    }
                } else {

                }

                sh.waitXSecs(3, function finishIn3Secs() {
                    json.urlTorrentNotFound = true
                    fxDone();
                })


            }

            //go.go(options);
            var skipped = it.searchPB(options);
            if (skipped) {
                fxDone();
                //  return;
            }
        }

    }
    defineGetPB();

    /* var types = {};
     types.content.movies = 'movies'
     types.content.indie = 'inedi';
     types.content.tv_shows ='tv'*/


    /*
     Let breed script handle filtering (based on filenames)
     */
    self.breed =function breed() {
        if ( self.settings.breed != true ) {
            //asdf.g
            self.proc('bree not true')
            return;
        }


        if ( self.settings.force != true ) {
            //var f = filter.filterFiles(list)
        }

        var ritvConfigHelper = require('ritvHelpers');
        var defaultConfig = ritvConfigHelper.ritvHelpers.getConfig(self.overrideJSON);
        if ( defaultConfig.imdb_app.breedConfigOverrides )
        {
            self.proc('defaultConfig.imdb_app.breedConfigOverrides', 'is true')
            var breedConfigOverrides = defaultConfig.imdb_app.breedConfigOverrides
        }
        if ( self.settings.breedConfigOverrides ) {
            breedConfigOverrides = self.settings.breedConfigOverrides
        }
        process.exit();

        //.error('breedConfigOverrides', breedConfigOverrides)
        //process.exit()
        Step2.breed({type:self.settings.type,
                list:self.settings.fileOutputDlList}, true,
            breedConfigOverrides);
    }

    self.convertMegaInformationToPBDlList = function () {
    }

    self.convert_ListOfTVShows_toPBDList = function () {
    }

    self.verifyFilesDL = function list() {
        //check downloaded mega lists ..
        //do we have file? ... check if 'cookies' in folder?
    }


    self.task_createListOfLinksFromFiles = function (list) {
        //etiher content list...
        //take in imdb ids ...
        //make content list in thml format....
        //will make one for each show
    }

    self.dl_tv_shows = function () {
        //serach for tv
        //run list into couchpotato
        //
    }


    /**
     * Playlists for users
     */
    self.dl_ContentList = function() {

    }

    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }


}



exports.imdb_dl_app =imdb_dl_app;
/*
 Stardard way to start script ...
 */
exports.startScript = function startScript(configToUse) {
    var path = require('path')
    var fileDefaultConfig = path.resolve(__dirname+'/../defaultConfig.json')
    var cfg = sh.readJSONFile(  args[0], null, false);

}




if ( module.parent == null ) {






    //list of ids
    //list id
    //url quick
    //output is finalized list ...
    //output should be list of files in indempto folders
    //



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

    var i = new imdb_dl_app();

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



    //config.howMany = 1;
    //config.skipImdbSearch = true;
    config.maxImdbListSize = 4;
    config.exitBeforeBreed = true
    config.bustEpisodes = true;

    function testYearMatch() {
        config.year =  1994;
        config.yearEnd = 1995;
        config.pageCount = 1
    }
    function testUrlList() {
        config.urlsList = [
            'http://www.imdb.com/search/title?at=0&start=201&title_type=tv_series&sort=moviemeter,asc&release_date=1994,1995'
        ]
        config.output = '2urlllist_tts.json'
        config.fileOutput = '2urlllist_tts.json'
    }
    function testListOFImdbs() {
        config.ttList = [
            'tt0068646',
            'tt0108052',
            'tt0108757'
        ]
        config.output = '2random_tts.json'

    }
    function testIMDBList() {
        config.urlList = 'http://www.imdb.com/list/ls004043006/'
    }

    //config.fileOutput = ''
    //process.exit();

    //testListOFImdbs();
    testUrlList()
    // testYearMatch()


    i.loadConfig(config)


    /*i.dl_list('movies',1994,100).fxDone = function() {
     i.createDlList();
     }
     return;
     i.dl_list('tv',1994,100)*/
}