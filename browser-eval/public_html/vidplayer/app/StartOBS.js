/**
 * Created by user2 on 8/26/15.
 */
/*

Why: Starts OBS using command line settings
 https://jp9000.github.io/OBS/general/shortcut.html
 */
/*
kfc: if crashes can be restarted without stuggle
 */



var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
var RLE_LoadConfigHelper = require('./utils/RLE_LoadConfigHelper').RLE_LoadConfigHelper;


function StartOBS() {
    var p = StartOBS.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        config = sh.dv(config, {});
        self.json = config;
        self.settings = config.obs;
        if ( self.settings == null || self.settings.enabled == false ) {
            console.log('exiting', 'StartOBS');
            return;
        }

        /*sh.runAsync('start ' +
            sh.qq(__dirname+'\\'+''+'start_obs_potable.bat'),
            null, function() {
            console.log('done')
        });
*/

        sh.runAsync('start ' +
            'start_obs_portable.bat',
            {
                cwd:__dirname
            }, function() {
                console.log('done')
            });
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.StartOBS = StartOBS;

StartOBS.startOBS = function StartOBS_(file){
    var m = new StartOBS();
    var config = RLE_LoadConfigHelper.readJSONFile(file);
    m.init(config);
    return m;
}

if (module.parent == null) {
    var m = new StartOBS();
    var config = RLE_LoadConfigHelper.readJSONFile('local_config.json');
    m.init(config)
    //m.test();
}






