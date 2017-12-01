/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


function AxelDownloader() {
    var p = AxelDownloader.prototype;
    p = this;
    var self = this;
    p.get = function get(options) {
        self.settings = options; 
        var CommandRunner = sh.CommandRunner();

        //var cmd = new CommandRunner();
        // cmd.launchCmd(json.cmd, json.args, fxCallbackTestComplete)
        // cmd.logOutput = true

        var url = options.url;
        options.origUrl = url;
        //var url = sh.urls.makeRelative(url)


        if ( options.password != null ) {
            var url = sh.urls.removeProtocol(url)
            url = 'https://'+options.username+':'+ sh.q(options.password) +'@'+ url;
            options.url= url;
        }
        var args = []
        var argsJoined = []
        sh.each(options, function createOptions(i, param) {
            if ( sh.includes(['username', 'password'], i) ) {
                return;
            }
            // args += param
            var arg = i;
            argsJoined.push(i)
            if ( param != null ) {
                argsJoined.push('=' + param)
                arg += '=' +param;
            }

            argsJoined.push(' ')


            args.push(arg)
        })

        argsJoined = argsJoined.join('')


        var CommandRunner = sh.CommandRunner
        var cR  = new CommandRunner();
        var settings ={}
        settings.cmd = 'axel'

        if ( sh.isWin() ) {
            settings.cmd = __dirname + '/'+'axel.exe'
        }

        settings.args = [options.url ]
        if ( sh.isWin() ) {
            settings.args.push('-a')
        }
        if ( options.renameFileTo != null ) {
            settings.args = settings.args.concat('-o',   sh.qq(options.renameFileTo)) ;
        }


        //TODO: Warn if file already exists ... b/c we will not overwrite it 

        self.proc('oarg', settings.args)

        self.cR = cR;
        var fxCallbackTestComplete = function fxCallbackTestComplete() {
            if ( self.cR.hasError ) {
                console.error('quitting on axel downloader')
                return;
            }

            var doesFileExists =  sh.fs.exists(options.renameFileTo)

            self.proc('>>>>did file download: exists:', doesFileExists)
            if ( doesFileExists == false ) {
                if ( options.tryMultipleTimes != false && options.lastAttempt != true ) {
                    if ( options.maxRetries == null ) {
                        options.maxRetries = 3
                    } else {
                        
                    }
                    options.retryCount = sh.dv(options.retryCount, options.maxRetries)
                    options.retryCount--;

                    options.url = options.origUrl

                    if ( options.retryCount == 0  ) {
                        options.lastAttempt = true
                    }

                    self.proc('failed, waiting a second')
                    self.proc('failed, waiting a second')
                    self.proc('failed, waiting a second')
                    setTimeout(function onRetry() {
                        //options.lastAttempt = true
                        self.get(options)
                    }, 3000)
                    return;
                }
                sh.throw('file did not download', options.renameFileTo, options.lastAttempt, options.retryCount)
            }
            self.proc('>>>>done downloading file', options.renameFileTo)
            if ( options.fxCallback != null ) {
                options.fxCallback(options.renameFileTo)
            }
        }
       // settings.silent = true
        if ( options.silent )
            settings.silent = options.silent
        var lastDownloadPercentage = 0 ;
        function fxEcho(line) {
            //[  0%] [0            1           2            3           ] [  19.8KB/s] [07:14]
            for ( var i = lastDownloadPercentage; i < 100; i=i+10){
                var fileId = options.url;
                if ( options.renameFileTo != null ) {
                    fileId= options.renameFileTo
                }
                if ( sh.includes(line, i+'%'+']')) {
                    console.log(i + '%', fileId)
                    lastDownloadPercentage = i+10; //do not show 0 more than 1x

                    sh.callIfDefined(self.settings.fxStatus, i + '%' + ' '+ fileId)

                }

            }
            //  console.log('echo mdega', line)
            return;
        }
        settings.fxEcho =  fxEcho
        settings.fxCallback = fxCallbackTestComplete
        settings.doNotLog = true ;//do not keep runnign log of output commands ... b/c it overwealms
        //the log output ..
        cR.execute(settings)
        return;

        var cmd = new sh.CommandRunner();
        cmd.launchCmd(json.cmd, json.args, fxCallbackTestComplete)
        cmd.logOutput = true
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }

}


if (module.parent == null) {

    var n = new AxelDownloader()
    var options = {}
    options.a = null;
    options.n = 16;
    options.username = 'trevmoreano'
    options.password = '12121212'

    //options.url = "https://trevmoreano:'12121212'@s09.put.io/zipstream/2521125.zip?token=2e4c00de322f11e4bf39002481265109"
    options.url = "https://s09.put.io/zipstream/2521125.zip?token=2e4c00de322f11e4bf39002481265109"
    options.url = "https://s11.put.io/zipstream/2535971.zip?token=01606bb68b7011e3b864002481265109"
    options.url = "https://www.jetbrains.com/help/webstorm/2016.2/webstorm-editor.html"
    delete options.username
    delete options.password

    //options.silent = true

    options.renameFileTo = '/home/user/trash/asdf.exe';
//options.output = 'g:/media/incoming/finished'

    if ( sh.isWin() ) {
        // options.output = 'g:/media/incoming/f2'
        options.renameFileTo = 'G:/media/incoming/finished.html';
        // delete options.renameFileTo
    }
    options.fxCallback = function fxCallback(ok) {
        console.log('ok')
    }
    n.get(options)

    // n.getC('trevmoreano', '12121212', "https://@s09.put.io/zipstream/2521125.zip?token=2e4c00de322f11e4bf39002481265109"
}


exports.AxelDownloader = AxelDownloader;

