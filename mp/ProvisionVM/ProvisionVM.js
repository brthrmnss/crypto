var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var RitvHelper = require('ritvHelpers').ritvHelpers;
var rch = RitvHelper.ritvHelper;

function ProvisionVM() {
    var p = ProvisionVM.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.method();

        self.createDir();
    }

    p.createDir = function createDir(config) {

        var config = rch.getConfig();
        var defaultSettings = config.innerSettingsMixin;
        var breedConfig = config.breed;

        if ( sh.isWin() ) {

        } else{
            defaultSettings.dir_downloads
        }

        sh.mkdirp()

        return;

       // G:\Dropbox\projects\crypto\ritv\distillerv3\bulkerLists\breed.json
       var file =  sh.require('ritv/distillerv3/'+'/bulkerLists/breed.json', true)
        console.log(file, 'file')
        var json = sh.readJSONFile(file)
        //options.fileStoreList = __dirname + '/bulkerLists/breed.json';


    }

    p.method = function method(config) {
    }

    p.test = function test(config) {
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir+'/'+ file;
            return file;
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

exports.ProvisionVM = ProvisionVM;

if (module.parent == null) {
    var instance = new ProvisionVM();
    var config = {};
    instance.init(config)
    instance.test();
}



