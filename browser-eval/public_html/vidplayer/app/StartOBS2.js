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


function StartOBS2() {
    var p = StartOBS2.prototype;
    p = this;
    var self = this;
    p.init = function init(config, isConfigOverridden) {
        config = sh.dv(config, {});
        self.json = config;
        if  ( isConfigOverridden == true ) {

        } else {
            self.settings = config.start_chrome;

            if ( self.settings != null &&  self.settings.enabled == false ) {
                console.log('exiting', 'StartOBS2', 'config', self.settings);
                return;
            }
        };
        var channel =  self.json.channel_name
        sh.runAsync(/*'start ' +*/
                '"C:/Program Files/OBS/OBS.exe" -multi -portablex -profile '+sh.qq(channel)+' -scenecollection '+
                sh.qq(channel)+'-start',
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

exports.StartOBS2 = StartOBS2;

StartOBS2.StartOBS2 = function StartOBS2_(file ){
    var m = new StartOBS2();
    var config = RLE_LoadConfigHelper.readJSONFile(file);
    m.init(config);
    return m;
}

StartOBS2.StartOBS2Bulk = function StartOBS2Bulk(chans ){
    sh.each(chans, function (i, channel) {
        var m = new StartOBS2();
        var config = {};
        config.channel_name = channel;
        m.init(config, true);
    })

    return m;
}

if (module.parent == null) {
    var m = new StartOBS2();
    var config = RLE_LoadConfigHelper.readJSONFile('local_config.json');
    //m.init(config)
    //m.test();

    StartOBS2.StartOBS2Bulk(['cnn', 'espn', 'fx'])

}






