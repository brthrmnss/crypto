





/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;

function OpenFileInWebstorm() {
    var p = OpenFileInWebstorm.prototype;
    p = this;
    var self = this;
    p.init = function init(config, appCode) {
        config = sh.dv(config, {})
        self.settings =  config
        var file = 'gt_fileinwebstorm_template.ahk'
        var content = sh.readFile(__dirname + '/' + file)
        var v = process.argv[2]
        var v1 = process.argv[3]
        self.proc('arg', v, v1)
        if ( self.settings.file ){
            v = self.settings.file;
        }
        content = content.replace('=FILE=', v)
        var fileAHK = 'a.ahk'
        sh.writeFile(fileAHK, content)
        console.log(content)
       // return;
        sh.run(fileAHK)
        return
    }
    p.openFile = p.init;
    
    p.init3 = function init3(url, appCode) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }
}


if (module.parent == null) {

    var y = new OpenFileInWebstorm();
    y.init();
}

exports.OpenFileInWebstorm = OpenFileInWebstorm;
