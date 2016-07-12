/**
 * Created by user2 on 9/5/15.
 */

/*
 Why: Loads config from configs directory
 Can inherit configs
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function RLE_LoadConfigHelper() {
    var p = RLE_LoadConfigHelper.prototype;
    p = this;
    var self = this;
    p.init = function init(config, pathOnly) {
        if ( config == null ) {
            throw new Error('null config')
        }
        //self.settings = sh.dv(config, {});
        function getFileConfig(config, pathOnly) {
            var fileConfig = null;
            if (sh.fileExists(config)) {
                fileConfig = config;
            }
            if (sh.fileExists('configs/' + config)) {
                fileConfig = config;
            }
            if (fileConfig == null && !sh.includes(config, '.json')) {
                config += '.json';
            }
            var dirConfigs = __dirname +'/'+ '../configs/';
            var fileInConfigDir = dirConfigs + config;
            if (sh.fileExists(fileInConfigDir)) {
                fileConfig = fileInConfigDir;
            }

            var data = sh.readJSONFile(fileConfig, null, false);
            //self.proc(fileConfig, sh.fileExists(fileInConfigDir))
            //self.proc(sh.fs.resolve('../configs/' + config))
            var fileParentConfig = data.parent_file_config;
            if ( fileParentConfig != null ) {
                var parent = sh.readJSONFile(dirConfigs + fileParentConfig);
                sh.mergeObjects(parent, data);
            }
            if ( pathOnly == true ) {
                return fileConfig;
            }
            return data;
        }
        var data = getFileConfig(config, pathOnly);
        //sh.toJSONString(data, true);
        //console.log('...')

        return data;
    }

    p.method = function method(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.RLE_LoadConfigHelper = RLE_LoadConfigHelper;

RLE_LoadConfigHelper.loadConfig = function loadConfig(configFile) {
    var instance = new RLE_LoadConfigHelper();
    return instance.init(configFile);
};

RLE_LoadConfigHelper.readJSONFile = RLE_LoadConfigHelper.loadConfig;

RLE_LoadConfigHelper.loadConfigPath = function loadConfigPath(configFile) {
    var instance = new RLE_LoadConfigHelper();
    return instance.init(configFile, true);
};


if (module.parent == null) {
    var instance = new RLE_LoadConfigHelper();
    var config = {};
    config = 'vm_guest'
    config = 'vm_guest_cnn'
    config = 'vm_host'
    instance.init(config)

    var configs = ['vm_guest',
        'vm_guest_cnn', 'vm_host'];
    sh.each(configs, function loadConfig(i,config){
        instance.init(config);
    });
}



