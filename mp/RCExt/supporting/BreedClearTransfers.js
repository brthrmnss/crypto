
/**
 * Created by user1 on 1/14/2017.
 */


var sh = require('shelpers').shelpers;


//var ritvConfigHelper = require('ritvHelpers');
//var RitvHelper = require('G:/Dropbox/projects/crypto/ritv/node_modules/ritvHelpers/index.js').ritvHelpers;
//var RitvHelper = require('G:/Dropbox/projects/crypto/ritv/node_modules/ritvHelpers/index.js').ritvHelpers;
var RitvHelper = require('ritvHelpers').ritvHelpers;
var rch = RitvHelper.ritvHelper;


var XY = {}
XY.startBreed = function startBreed(filePath_orConfig, ignoreMissing) {

//var dl_putio_app = require('./../dl_putio_app').dl_putio_app;

    var Step2 = rch.getBreed();
    var DistillerV2 = rch.getDistiller();
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



    //var DistillerV2 = require('./DistillerV2').DistillerV2
    var distillerOptions = {}
    sh.mergeObjects(breedConfig.innerSettingsMixin, distillerOptions)
    distillerOptions.downloadFile = true;
//    distillerOptions.downloadFileDir = token.dirDownload;
 //   distillerOptions.dir_downloads = token.dir_downloads;


    distillerOptions.dirExtractFiles = 'x::SDF?SDFSdf'
    distillerOptions.urlTorrent = 'x::SDF?SDFSdf'
    distillerOptions.downloadFileDir = 'x::SDF?SDFSdf'
    distillerOptions.query = 'clear-transfers'

    distillerOptions.clearTransfers = true
    distillerOptions.fxBail = function fxBail(o) {
     //   asdf.g
        console.log('did not work', o.msg)
    }
    //console.log(breedConfig)

    distillerOptions.callback = function onDoneClear()  {
        console.log('don clear')
    }


    var go = new DistillerV2()
    go.go(distillerOptions);


    //return Step2.breed(config, false);

    /*
     http://localhost:8888/callbackurl
     */

}

exports.XY = XY;

if ( module.parent == null ) {
   function test() {
       var filePath =  __dirname+'/'+'testData/' + 'test_dl_manifest.json';
       var y = XY.startBreed(filePath)



       var testStopDL = false; 
       if ( testStopDL != true ) {
           return;
       }

       setTimeout(function () {
           y.stopDl();
           //return
           y = XY.startBreed(filePath)
       }, 500)


       setTimeout(function () {
           //y.stopDl();
       }, 3*1000)
   }

    test();
}
