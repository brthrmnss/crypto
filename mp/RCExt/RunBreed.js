/**
 * Created by user1 on 1/14/2017.
 */


var sh = require('shelpers').shelpers;


//var ritvConfigHelper = require('ritvHelpers');
//var RitvHelper = require('G:/Dropbox/projects/crypto/ritv/node_modules/ritvHelpers/index.js').ritvHelpers;
//var RitvHelper = require('G:/Dropbox/projects/crypto/ritv/node_modules/ritvHelpers/index.js').ritvHelpers;
var RitvHelper = require('ritvHelpers').ritvHelpers;
var rch = RitvHelper.ritvHelper;


var JSONFileHelper = require('shelpers').JSONFileHelper


var XY = {}
XY.startBreed = function startBreed(filePath_orConfig, file2Type, ignoreMissing) {
    //asd.gd.d
    // console.log('ok', filePath_orConfig, ignoreMissing)
    //   asdf.g.d.d

    exitHelperScripts()

//var dl_putio_app = require('./../dl_putio_app').dl_putio_app;

    var Step2 = rch.getBreed();
    var config = rch.getConfig();

//var args = sh.getNodeArguments();
//var i = new dl_putio_app();

    var defaultSettings = config.innerSettingsMixin;
    var breedConfig = config.breed;
//var mergedInnerSettings =
    sh.mergeObjects(defaultSettings, breedConfig.innerSettingsMixin, true);
//, false );

    breedConfig.innerSettingsMixin.skipExistingDirCheck = true; //remove when live
    config.innerSettingsMixin.skipExistingDirCheck = true;

    var worklfileTestJSON = filePath_orConfig;// __dirname+'/'+'testData/' + 'test_dl_manifest.json';

    var jh = new JSONFileHelper();

    sh.hostname = function hostmane() {
        var os = require('os')
        var hostname = os.hostname();
        console.log('hostnane', hostname)
        return hostname
    }
    if ( sh.hostname().includes('VirtualBox')) {
        config.innerSettingsMixin.minFreeSpaceGB = 0.1;
    }

    if (sh.isObject(filePath_orConfig)) {
        if (filePath_orConfig.file) {
            //var fileTestJSON = filePath_orConfig.file;
            var fileQueryPath = filePath_orConfig.file;
            var queries = sh.readJSONFile(fileQueryPath)


        } else {
            fileQueryPath = file2Type
            queries = filePath_orConfig; //from remote file
        }
    }

    if (sh.isString(filePath_orConfig)) {
        var fileQueryPath = filePath_orConfig
        var queries = sh.readJSONFile(fileQueryPath)
        console.log(sh.n, 'loading file', fileQueryPath, 'ok ..')
    }

    if (fileQueryPath) {
        var configJSONLogFile = {};
        //configJSONLogFile.addToTop = false;
        var dirLogs = sh.fs.getTrashDir() + 'dl.logs/';
        sh.mkdirp(dirLogs)
        configJSONLogFile.propUpsert = 'namePb'
        configJSONLogFile.file = dirLogs + sh.fs.leaf(fileQueryPath) + '.runBreed.TXRun.json';
        jh.init(configJSONLogFile);
    }

    //config.multiplyAddItems = 10

    console.log('queries length', queries.length)
    var queriesFiletered = [];
    config.queries = queries;

    var filterX = 'King\'s'
    filterX = 'Jumanji'
    filterX = 'Howl';
    filterX = null;

    if (filterX) {
        sh.log.lines(10)
        console.error(
            'filterX', filterX
        )
        sh.log.lines(10)
    }
    //

    var filterTorName = ''

    filterTorName = null;
    if ( filterTorName ) {

    }
    var filterTorName_SkipFirst = false;
    filterTorName_SkipFirst = true;

    if ( false && sh.hostname().includes('VirtualBox')  ) {
        filterX = 'X-Files'
        filterTorName = 'The X-Files Season 1, 2, 3, 4, 5, 6, 7, 8, 9 + Extras DVDRip HDT'
    }



    var queriesDeDupe = sh.each.removeDupes(queries, 'urlTorrent');

    sh.each(queriesDeDupe, function onQueries(k, query) {
        var qO = query;
        if (qO.skip == true) {
            return;
        }
        if (query.dirRemoteMega == null) {
            query.dirRemoteMega = "/Root/movies/Toy_Story_3_2010/tt0435761/"

            query.dirRemoteMega = "/Root/dls/" + qO.title + '/'
        }
        if (qO.urlMagnet) {
            qO.urlTorrent = qO.urlMagnet;
        }
        if (qO.urlTorrent == null) {
            if (ignoreMissing != true) {
                console.log('skipping', qO.name, 'no torrent')
                return;
            }
            console.error('issue with', query)
            sh.throw('need a magnet link for ', query);
        }
        var size = qO.size;
        if (sh.isString(size) && size.includes('MB')) {
            size = size.replace('MB', '')
            size = parseFloat(size) / 1000;
        }
        qO.size = size
        if (filterX) {
            if (qO.title.includes(filterX) == false) {
                return
            }
        }
        if ( filterTorName ) {
            if ( qO.nameTorrent ==null || qO.nameTorrent.includes(filterTorName) == false ) {
                return false;
            }
            if ( filterTorName_SkipFirst ) {
                filterTorName = null;
            }
        }
        queriesFiletered.push(qO)
    })


    function filterQueries_RemoveCompleted() {
        var queriesFiletered_Previous = []
        jh.data.file = sh.dv(jh.data.file, [])
        var loadedList = sh.clone(jh.data.file)
        var h = {}
        h.countPrevItems = loadedList.length
        var itemsFinished = sh.each.keepIf(loadedList, 'msg', 'downloaded')
        h.countFinishedPrevItems = itemsFinished.length
        var dictFinishedItems_ByTorName = sh.dict.addItems(itemsFinished, 'nameTorrent', true)
        sh.each(queriesFiletered, function onQueries(k, query) {
            var qO = query;
            if ( qO.nameTorrent == null ) {
                console.error('no name on this item', qO)
              //  return
            }
            var nameTorrent = qO.nameTorrent;
            if (dictFinishedItems_ByTorName.includes(nameTorrent)) {
                console.log('rmoved', nameTorrent)
                return;
            }
            queriesFiletered_Previous.push(qO)
        })
        h.queriesInput = queriesFiletered.length
        h.queriesFiltered = queriesFiletered_Previous.length

        h.savings = sh.percent(
            1 - (queriesFiletered_Previous.length /
            queriesFiletered.length)
        )

        sh.log.skipLines()
        console.log('filtered stuff:', h)
        sh.log.skipLines()
        return queriesFiletered_Previous;
    }

    queriesFiletered = filterQueries_RemoveCompleted()
//    asdf.g

    if (queriesFiletered.length > 10) {
        config.innerSettingsMixin.timeoutDlSecs = 60 * 10/3
        //sh.time.minutes(10)

        /*
         if (sh.isWin()) {
         config.innerSettingsMixin.timeoutDlSecs = 0.1
         config.innerSettingsMixin.timeoutDl_Time_Secs = 0.1
         }
         */
    }

    /*if (queriesFiletered.length > 1000) {
        queriesFiletered = queriesFiletered.slice(500)
        queriesFiletered = queriesFiletered.slice(300)
    }//is machine) { }*/

    console.log('reduced', queries.length, 'to', queriesFiletered.length)

    //asdf.g
    config.queries = queriesFiletered;

    function duplicateQueyres() {
        var queriesDuplicated = [];
        sh.each(config.queries, function onQueries(k, queryObj) {
            sh.each.times(5, function duplicateQuery(ky, time) {
                qO = sh.clone(queryObj)
                queriesDuplicated.push(qO)
            })
        })
        config.queries = queriesDuplicated;
    }

    config.fxOnItemComplete = function fxOnItemComplete(settingsObj) {
        //asdf.g
        var settingsObj2 = {};

        var props = ['dirOutput', 'dirRemoteMega', 'dirDownload',
            'name', 'query', 'title', 'size',
            'pathDownloadedFile',
            'nameTorrent',
            'globalStatus', 'status', 'msg', 'oldCookie',
            'urlTorrent']


        sh.copyProps(settingsObj, settingsObj2, props);
        if (settingsObj2.oldCookie) {
            settingsObj2.oldCookie.token = null;
        }

        settingsObj2.namePb = [settingsObj2.title, settingsObj2.name, settingsObj2.nameTorrent].join('-')

        console.error('list-competed -early', settingsObj2.namePb, settingsObj2)

        var oldSettingsObj = jh.add(settingsObj2, true);
        jh.saveFile();
        sh.log.file(jh.settings.file)
        //debugger
    }

    // duplicateQueyres();

    //config.file_list = fileTestJSON;

    return Step2.breed(config, false);

    /*
     http://localhost:8888/callbackurl
     */

}

exports.XY = XY;

function exitHelperScripts() {

    sh.log.error.disable()

    if (sh.isWin() == false) {
        // return;
        sh.runFailable('pkill -f axel')
        sh.runFailable('killall axel')
        sh.runFailable('killall unzip')
    } else {
        //sh.run('pkill -f axel')
        sh.runFailable('taskkill /f /im axel.exe')
        sh.runFailable('taskkill /f /im unzip.exe')
    }

    sh.log.error.enable()
}

function cleanupExit() {
    process.stdin.resume();//so the program will not close instantly

    function exitHandler(options, err) {

        console.error = sh.noOp;
        exitHelperScripts()
        if (options.cleanup) console.log('clean');
        if (err) console.log(err.stack);
        if (options.exit) process.exit();
    }

//do something when app is closing
    process.on('exit', exitHandler.bind(null, {cleanup: true}));

//catches ctrl+c event
    process.on('S' +
        'IGINT', exitHandler.bind(null, {exit: true}));
}
if (sh.isWin()) {
    cleanupExit()
}


if (module.parent == null) {
    function test() {
        var filePath = __dirname + '/' + 'testData/' + 'test_dl_manifest.json';
        filePath = __dirname+ '/testData/test_dl_manifest.json'

        var nodeArgs = sh.getNodeArguments()
            var filePathArg = nodeArgs[0]
        if ( sh.isString(nodeArgs[0]))
        {
            console.log('override arg with file', filePathArg)
            if ( filePathArg.includes('/') == false ) {
                filePathArg = sh.join(__dirname, 'manifest', filePathArg)
            }
            filePath = filePathArg
            console.log('--override arg with file', filePathArg)
        }        //var filePath = 'G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/IMDB_App_Output/dlListsWrapC/boodtylisttest-full.6.17.2017.json';
        //filePath = sh.requirePath( 'mp/RCExt/data/uploadedLists/boodtylisttest-full.6.17.2017.json.output.pbVerified.json.output.breed.json')
        var y = XY.startBreed(filePath)


        var testStopDL = false;
        if (testStopDL != true) {
            return;
        }

        setTimeout(function () {
            y.stopDl();
            //return
            y = XY.startBreed(filePath)
        }, 500)


        setTimeout(function () {
            //y.stopDl();
        }, 3 * 1000)
    }

    test();
}
else {
  //  test();
}