/**
 * Created by user1 on 1/14/2017.
 */


var sh = require('shelpers').shelpers;


//var ritvConfigHelper = require('ritvHelpers');
var RitvHelper = require('G:/Dropbox/projects/crypto/ritv/node_modules/ritvHelpers/index.js').ritvHelpers;
var rch = RitvHelper.ritvHelper;



var XY = {}
XY.startBreed = function startBreed(filePath_orConfig, ignoreMissing) {

//var dl_putio_app = require('./../dl_putio_app').dl_putio_app;

    var Step2 = rch.getBreed();
    var config = rch.getConfig();

//var args = sh.getNodeArguments();
//var i = new dl_putio_app();

    var defaultSettings = config.innerSettingsMixin;
    var breedConfig = config.breed;
//var mergedInnerSettings =
    sh.mergeObjects( defaultSettings, breedConfig.innerSettingsMixin, true );
//, false );

    breedConfig.innerSettingsMixin.skipExistingDirCheck = true; //remove when live
    config.innerSettingsMixin.skipExistingDirCheck = true;
    
    var fileTestJSON = filePath_orConfig;// __dirname+'/'+'testData/' + 'test_dl_manifest.json';
    if ( sh.isObject(filePath_orConfig) ) {
        if (filePath_orConfig.file) {
            var fileTestJSON = filePath_orConfig.file;
            var queries = sh.readJSONFile(fileTestJSON)
        } else {
            queries = filePath_orConfig; //from remote file
        }
    }

    if ( sh.isString(filePath_orConfig) ) {
        var queries = sh.readJSONFile(filePath_orConfig)
    }

    //config.multiplyAddItems = 10

    console.log('queries length', queries.length)
    config.queries = queries;

    sh.each(queries, function onQueries(k,query) {

        var qO = query;
        if ( qO.skip == true ) {
            return;
        }
        if ( query.dirRemoteMega == null ) {
            query.dirRemoteMega =  "/Root/movies/Toy_Story_3_2010/tt0435761/"

            query.dirRemoteMega =  "/Root/dls/"+qO.title+'/'
        }
        if ( qO.urlMagnet ) {
            qO.urlTorrent = qO.urlMagnet;
        }
        if ( qO.urlTorrent == null) {
            if ( ignoreMissing != true ) {
                console.log('skipping', qO.name, 'no torrent')
                return;
            }
            console.error('issue with', query)
            sh.throw('need a magnet link for ', query);
        }
        var size = qO.size;
        if ( sh.isString(size) && size.includes('MB')) {
            size = size.replace('MB', '')
            size = parseFloat(size)/1000;
        }
        qO.size = size
    })

//config.file_list = fileTestJSON;

    return Step2.breed(config, false);

    /*
     http://localhost:8888/callbackurl
     */

}

exports.XY = XY;

if ( module.parent == null ) {
    var filePath =  __dirname+'/'+'testData/' + 'test_dl_manifest.json';
    var y = XY.startBreed(filePath)

    setTimeout(function () {
        y.stopDl();
        //return
        y = XY.startBreed(filePath)
    }, 500)


    setTimeout(function () {
        y.stopDl();
    }, 3*1000)
}
