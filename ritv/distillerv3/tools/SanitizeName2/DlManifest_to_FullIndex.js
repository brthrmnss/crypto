//DLManifest_to_FullIndex_Workflow


/**
 * Created by user1 on 8/12/2017.
 */


/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;

function CacheHelper() {
    var p = CacheHelper.prototype;
    p = this;
    var self = this;
    self.data = {};
    self.data.vals = {}

    p.init = function init(url, appCode) {

    }

    p.setVal = function setKey(k, v) {
        self.data.vals[k] = v
    }

    p.getVal = function getKey(k, appCode) {
        return self.data.vals[k];
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }
}


if (module.parent == null) {
    var c = new CacheHelper()
    c.setVal('b', 555)
}


exports.CacheHelper = CacheHelper;


sh.cacheHelper = function cacheHelper(cfg) {
    if (sh.isNumber(cfg.fxDone)) {
        var fxDoneIndex = cfg.fxDone;
        cfg.fxDone = cfg.args[cfg.fxDone]
        cfg.args[fxDoneIndex] = interceptor;
    }
    cfg.key = JSON.stringify(cfg.args)
    var prevResult = cfg.cacheHelper.getVal(cfg.key)

    if (prevResult) {
        cfg.fxDone.apply(this, prevResult)
        return;
    }

    function interceptor() {
        var args = sh.args(arguments)
        cfg.fxDone.apply(this, args)

        cfg.cacheHelper.setVal(cfg.key, args)
    }


    // var args = sh.args(arguments);
    //args.shift(); //remove fx
    cfg.fx.apply(this, cfg.args)


}


var shelpers = require('shelpers')
var sh = require('shelpers').shelpers;
var PromiseHelperV3 = shelpers.PromiseHelperV3;

//var SanitizeNamesFromDB = require('./SanitizeNamesFromDB').SanitizeNamesFromDB;
var IMDB_Scraper = sh.require('ritv/imdb_movie_scraper/imdb_scraper.js').IMDB_Scraper
var imdb_api_get_content = sh.require('ritv/imdb_movie_scraper/imdb_scraper.js').imdb_api_get_content


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function DLManifest_to_FullIndex_Workflow() {
    var p = DLManifest_to_FullIndex_Workflow.prototype;
    p = this;
    var self = this;
    self.data = {};
    self.data.imdbs = {}
    self.data.errors = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});

        sh.throwIfNull(self.settings.fileDlManifest, 'need a list of fileDlManifest')
        //self.settings.fileImport_ClearAll = true; //why: test using diffen types of files
        //self.settings.searchOnServerName = 'testFakeMachine';

        sh.log.file('starting with', self.settings.fileDlManifest)
        self.data.listOutputCSV = sh.fs.moveTo(self.settings.fileDlManifest, 'sn2_Output', 'expected.csv')
        self.data.listOutputJSON = sh.fs.moveTo(self.settings.fileDlManifest, 'sn2_Output', 'expected.json')
        self.data.listOutputJSON_withDlItem = sh.fs.moveTo(self.settings.fileDlManifest, 'sn2_Output', 'expected_by_dlItem.json')
        self.data.dlManifest = sh.readJSONFile(self.settings.fileDlManifest);
        sh.fs.mkdirp(self.data.listOutputCSV, true)

        self.data.list = {};

        self.runTestWorkflow();

    }


    p.runTestWorkflow = function runTestWorkflow() {
        var token = {}
        var work = new PromiseHelperV3();
        token.silentToken = true
        work.wait = token.simulate == false;

        work.startChain(token)
            .add(self.getIMDBs)
            .add(self.attachIMDB_toList)
            .add(self.lastStep)
            .end();

    }

    function defineSteps() {
        p.getIMDBs = function getIMDBs(token, cb) {
            var imdbs = sh.each.removeIfStr(self.data.dlManifest, 'item.imdb_id==null')
            var imdbs = sh.each.removeIfStr(self.data.dlManifest, 'item.skip==true')
            self.proc('skipped', imdbs.length)
            var imdbs = sh.each.removeIfStr(self.data.dlManifest, 'item.urlTorrent==null')
            self.proc('skipped- not found', imdbs.length)

            if ( self.settings.skipNonEpisodes) {
                imdbs = sh.each.removeIfStr(self.data.dlManifest, 'false == item.name.includes("Add episode ")')
            }


               // if ( false == outputIMDB.name.includes('Add episode ') ) {
            //var imdbs = sh.each.collect(imdbs, 'imdb_id')
            //var imdbs = sh.each.uniques(imdbs, 'imdb_id'); //teh seasons have same imdb_id
            self.proc('uniques', imdbs.length)
//sh.x()
            if (self.settings.countMaxDlItems) {
                imdbs = imdbs.slice(0, self.settings.countMaxDlItems)
                self.proc('uniques', 'countMaxDlItems', imdbs.length)
            }

            //self.data.imdbs_ids = imdbs
            self.data.imdbs = imdbs;

            cb()
        }

        p.attachIMDB_toList = function attachIMDB_toList(token, cb) {
            var imdb = new IMDB_Scraper();

            global.noIMDBContentDB = true

            self.data.allReqdFiles = [];
            self.data.dlItems_reqFiles = [];
            var i = 0;

            var h = {};
            h.addItem_to_FileList = function addItem_to_FileList(item, v) {
                var name = [item.imdb_id, sh.qq(item.title)].join(',')
                if (v) {
                    name = [name,
                        [sh.str.pad(v.seasonNumber, 2), 'x', sh.str.pad(v.episodeNumber, 2)]
                            .join(',')].join(',')
                }

                if (self.data.current_dlItem.name.includes('Add Each Season ')) {
                    var season = self.data.current_dlItem.name
                    season = sh.str.after(season, 'Add Each Season')
                    season = sh.str.after(season, 'Add Each Season')
                    var season = parseFloat(season)
                    //console.error('season-->', season)
                    //sf.g
                    if (season != v.seasonNumber) {
                        return;
                    }
                }

                if (self.data.current_dlItem.name.includes('Add episode ')) {
                    //"Add episode S07E13 Add episode S07E13",
                    var season = self.data.current_dlItem.name
                    season = sh.str.after(season, 'Add episode ')
                    season = sh.str.after(season, 'Add episode ')
                    var split = season.split('E')
                    season = split[0].slice(1);
                    var season = parseFloat(season)
                    var episode = parseFloat(split[1])
                   // console.error('season-->', season, episode)
                   // console.error('season-->', self.data.current_dlItem)
                    //sh.exit()
                    //sf.g
                    if (season != v.seasonNumber) {
                        return;
                    }
                    if (episode != v.episodeNumber) {
                        return;
                    }
                }

                self.data.allReqdFiles.push(name)
                //console.log(name, v)
                if (self.settings.stopAtLength &&
                    self.data.allReqdFiles.length > self.settings.stopAtLength) {
                    //  sh.x('ok it is ...')
                    // asdf.g
                    self.data.exitIt = true;
                }
                self.data.current_dlItem.expectedFiles.push(name)
                var id = sh.join(item.query, item.title);
                //sh.log.iteration(self.data.allReqdFiles.length, i, 200, id)

                return name;
            }
            self.data.oldIMDBs = {};

            self.data.cacheHelper = new CacheHelper();

            sh.async(self.data.imdbs, function process_getIMDBInfo(outputIMDB, _fxDone) {
                    function fxDone() {
                        sh.later(_fxDone)
                    }



                    var item = outputIMDB.output;
                    item = {imdb_id: outputIMDB.imdb_id};
                    item = outputIMDB;
                    i++

                    var dlItem = sh.clone(outputIMDB)
                    //asdf.g
                    self.data.dlItems_reqFiles.push(dlItem)
                    self.data.current_dlItem = dlItem;
                    dlItem.expectedFiles = [];

                    sh.log.iteration(i, self.data.imdbs, 20, sh.join('dl-item--', item.title, sh.paren(item.name)) )


                    if (self.data.exitIt) {
                        fxDone();
                        //    asdf.g
                        return
                    }

                    var settings = {}
                    settings.ttList = [item.imdb_id]
                    if (item.imdb_id == null) {
                        console.error('item null', item)
                        fxDone()
                        return;
                    }

                    sh.log.disable()
                    settings.fxDone = function fxDone_XA(fItem) {
                        sh.log.enable();
                        var firstItem = fItem.data.movies_meta[0];
                        if (firstItem == null) {
                            console.error(sh.t, 'failed on', item.title)
                            fxNextSkip('could not get this item');
                            return;
                        }

                        //self.data.oldIMDBs[firstItem.imdb_id] = firstItem;


                        if (firstItem.series) {
                            var opts = {saveToDB: false}

                            // var epiJSON = JSON.parse(item.epi)
                            //var i = new imdb_api_get_content();
                            sh.log.disable()
                            if (firstItem.lastEpisodeObj) {
                                asdf.g
                                onProcessEpisodes(firstItem.lastEpisodeObj)
                                return;
                            }


                            sh.cacheHelper(
                                {
                                    cacheHelper: self.data.cacheHelper,
                                    fx: imdb_api_get_content.get_episodes,
                                    fxDone: onProcessEpisodes,
                                    fxDone: 1,
                                    //key:0
                                    args: [firstItem.imdb_id, onProcessEpisodes, opts],
                                }
                            );
                            /*  imdb_api_get_content.get_episodes(firstItem.imdb_id,
                             onProcessEpisodes, opts)*/


                            function onProcessEpisodes(episodeItem) {
                                sh.log.enable();
                                var content = episodeItem[firstItem.imdb_id];

                                firstItem.lastEpisodeObj = episodeItem; //cache for later

                                function getEpi_FromContent(s, e) {
                                    // sh.throwIfNull(s, 'need season')
                                    var found = null;
                                    sh.each(content.episodeList, function onFindEpisode(k, v) {
                                        h.addItem_to_FileList(item, v)
                                    })
                                    return found;
                                }

                                imdbEpisode = getEpi_FromContent(/*epiJSON.s, epiJSON.e*/)

                                onGotEspidoes();
                            }
                        }
                        else {
                            item.title = firstItem.title;
                            item.imdb_id2 = firstItem.imdb_id;

                            h.addItem_to_FileList(item)

                            onGotEspidoes();
                        }

                        function onGotEspidoes(asdf) {
                            item.ratingCount = firstItem.ratingCount


                            // console.log('ok', firstItem.title, firstItem.ratingCount)
                            fxDone()
                            //console.error('imdb loop complete', self.data.indexIteration, item.index, firstItem.title, firstItem.ratingCount)
                        }
                    }
                    settings.redoDelayTimeSecs = 3
                    settings.redoCountMax = 1;
                    //sh.log.disable();
                    imdb.settings = settings;


                    var oldIMDB = self.data.oldIMDBs[item.imdb_id]
                    if (oldIMDB) {
                        asdf.g
                        var fItem = {};
                        fItem.data = {}
                        // fItem.data.movies_meta  = {};
                        fItem.data.movies_meta = [oldIMDB]
                        settings.fxDone(fItem)
                        //asdf.g
                        return;
                    }

                    imdb.loadSettings(settings)
                }
                ,
                function onsdf() {

                    cb()

                }
            )
        }


        p.fault = function fault(i, localFilePath) {
            var args = sh.args(arguments)
            console.log()
            console.error(sh.t, sh.fs.leaf(localFilePath))
            console.error(sh.t, sh.t, args.join(' '))
            if (sh.isString(localFilePath) == false) {
                sh.throw('need error as localFilePath step 2nd')
            }
            //asdf.g
            //self.data.errors.push(args)
            self.data.errors[localFilePath] = args;
        }


        p.lastStep = function lastStep() {


            self.proc('output-length', self.data.allReqdFiles.length)

            sh.writeJSONFile(self.data.listOutputJSON_withDlItem, self.data.dlItems_reqFiles)
            sh.writeJSONFile(self.data.listOutputJSON, self.data.allReqdFiles)
            sh.writeFile(self.data.listOutputCSV, self.data.allReqdFiles.join('\n'))
//debugger
            sh.log.file(self.data.listOutputJSON_withDlItem, 'output')

//asdf.g
            sh.callIfDefined(self.settings.fxDone, self.data, self)
            sh.callIfDefined(self.settings.fxDone2, self)
            return;
        }
    }

    defineSteps();

    function defineUtils() {
        p.utils = {};
    }

    defineUtils();

    p.test = function test(config) {
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

DLManifest_to_FullIndex_Workflow.explodeDLManifestToExpectedFileList =
    function explodeDLManifestToExpectedFileList(cfg, fxDone) {
    var instance = new DLManifest_to_FullIndex_Workflow();
    var config = {};
    config = cfg;
    cfg.fxDone2 = function onTestRepeat(self) {
        //debugger
        sh.cid(fxDone, self)

    }
    instance.init(config)
    return;

}

exports.DLManifest_to_FullIndex_Workflow = DLManifest_to_FullIndex_Workflow;

if (module.parent == null) {
    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)

    // var fileOutput = sh.fs.makePath(dirTrash, 'output.txt')
    var fileListOfFiles = sh.fs.join(__dirname, 'testData', 'fileListTest.txt');
    var fileListOfFiles = 'G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___95.211.137.145_6024_.txt';
    var fileDlManifest = sh.fs.join(__dirname, 'testData', 'listIds_ls051393312-b.json');


    ///media/sf_Dropbox/projects/crypto/mp/RCExt/manifests/boodtylisttest-full.6.17.2017.json.output.pbVerified.json.output.breed.json
    var json = 'G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\tasks\\boodtylisttest-full.6.17.2017.output.pbVerified.json.output.breed.json'
    json = sh.readJSONFile(json)

    var fileListOfFiles = json.fileFileList
    var fileDlManifest = json.listDlManifest


    // var fileListOfFiles  = 'G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\tasks\\boodtylisttest-full.6.17.2017.output.pbVerified.json.output.breed.json'


    var cfg = {}
    cfg.fileDlManifest = fileDlManifest
    cfg.repeat = true
   // cfg.countMaxDlItems = 400
    //cfg.countOffset = 400
    //cfg.skipNonEpisodes = true

    DLManifest_to_FullIndex_Workflow.explodeDLManifestToExpectedFileList(cfg, function onDone(output) {
//asdf.g
        console.log('testWorkflow', 'done', output)
        return;
        console.log('found how many?', output.foundCount);
        sh.throwIf(output.foundCount != 2, 'did not match write count of items');
    });
}
//XO.runX();


//exports.BasicClass = BasicClass;

if (module.parent == null) {
    /*    var instance = new BasicClass();
     var config = {};
     instance.init(config)
     instance.test();*/
}
