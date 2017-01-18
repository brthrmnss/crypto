 
/*
 start server - specify file
 run server locally with commands
 end all command procsses
 expose json of inner array
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function DemoInnerScript() {
    var p = DemoInnerScript.prototype;
    p = this;
    var self = this;
    self.data= {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});

    }

    p.runActions = function runActions( ) {
        self.data.count = 0;
        self.data.runData = {};
        if ( self.settings.action == 'run10') {
            //sh.each.times(10,
            function runTask() {
                if ( self.data.stop ) {
                    console.error('stoppign now')
                    return
                }
                self.data.count++
                self.proc('count', self.data.count)
                var data = {};
                data.ranTask = 'count ' + self.data.count;
                self.data.runData[self.data.count] = data
                if (self.data.count < 10) {
                    function fxPlayNext() {
                        setTimeout(runTask, 2000)
                    }

                    if ( self.data.paused ) {

                    }
                    fxPlayNext();
                }
            }
            runTask()
        }
    }
    p.runConfig = function runConfig(config) {
    }

    p.stopRun = function stopRun() {

    }

    p.pauseRun = function pauseRun() {

    }
    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.DemoInnerScript = DemoInnerScript;

if (module.parent == null) {
    var instance = new DemoInnerScript();
    var config = {};
    config.action = 'run10'
    instance.init(config)
    instance.runActions();

}


