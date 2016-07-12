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


function StartChrome() {
    var p = StartChrome.prototype;
    p = this;
    var self = this;
    p.init = function init(config, isConfigOverridden) {
        config = sh.dv(config, {});
        self.json = config;
        if  ( isConfigOverridden == true ) {

        } else {
            self.settings = config.start_chrome;

            if ( self.settings != null &&  self.settings.enabled == false ) {
                console.log('exiting', 'StartChrome', 'config', self.settings);
                return;
            }
        }



        sh.runAsync(/*'start ' +*/
                '"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" ' +
                '--user-data-dir=c:/trash/channels/'+self.json.channel_name+' --no-default-browser-check --restore-last-session --no-first-run --disable-web-security --allow-file-access-from-files --disk-cache-size=100 --enable-easy-off-store-extension-install -allow-running-insecure-content',
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

exports.StartChrome = StartChrome;

StartChrome.StartChrome = function StartChrome_(file ){
    var m = new StartChrome();
    var config = RLE_LoadConfigHelper.readJSONFile(file);
    m.init(config);
    return m;
}

StartChrome.StartChromeBulk = function StartChromeBulk(chans ){
    sh.each(chans, function (i, channel) {
        var m = new StartChrome();
        var config = {};
        config.channel_name = channel;
        m.init(config, true);
    })

    return m;
}

if (module.parent == null) {
    var m = new StartChrome();
    var config = RLE_LoadConfigHelper.readJSONFile('local_config.json');
    //m.init(config)
    //m.test();

    StartChrome.StartChromeBulk(['cnn', 'espn', 'fx'])

}






