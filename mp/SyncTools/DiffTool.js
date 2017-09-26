var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

sh.fs.goToDir = function goToDir(file) {
    sh.run('start "explorer" ' + file);
}

function DiffTool() {
    var p = DiffTool.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.automateSyncing();
    }

    p.automateSyncing = function automateSyncing() {
        var zip = sh.requirePathSH('bin/diff/diff.exe')

        var dirBlank = sh.fs.join(__dirname, 'blank')
        var dir = sh.require('mp/testingFramework', true)
        var cmd = '';
        cmd = [zip, 'diff --brief -Nr' , dir, dirBlank]
        cmd = cmd.join(' ')

        console.log('zip', cmd)

        var dirBase =  sh.fs.goUpDir(dir);


        console.log('dirBase', dirBase)

        //  asdf.g

        console.log('into', sh.changeWorkingDirectory(dirBase) )
        console.log('')

        sh.run2(cmd)
        /*if (self.settings.listDirsToZip) {
         self.zipDirs()
         }*/
    }
    p.zipDirs = function zipDirs(dirs) {
        var zip = sh.requirePathSH('bin/zip.exe')
        if (dirs) {
            self.settings.listDirsToZip = dirs
        }

        //self.settings.dirZipOutput = sh.dv(self.settings.dirZipOutput)
        sh.dv2(self.settings, 'dirZipOutput', sh.fs.trash('DiffTool/outputZips/'))

        sh.log.file(self.settings.dirZipOutput, 'here is file')

        sh.fs.goToDir(self.settings.dirZipOutput, 'here is file');

        sh.each(self.settings.listDirsToZip, function zipDir(k, dir) {
            var options = {};
            options.callback = function onDone(dirExtract, token) {
                console.log('done', dirExtract)
            }



            var dirLeaf = leaf = sh.fs.leaf(dir)
            var fileOutput = [self.settings.dirZipOutput, leaf + '.zip'].join('/')

            var cmd = '';
            cmd = [zip, '-r9', fileOutput, dirLeaf]
            cmd = cmd.join(' ')

            console.log('zip', cmd)

            var dirBase =  sh.fs.goUpDir(dir);


            console.log('dirBase', dirBase)

            //  asdf.g

            console.log('into', sh.changeWorkingDirectory(dirBase) )
            console.log('')

            sh.run2(cmd)

            /*

             cmd = ['cd '+dirBase, cmd]

             sh.run2(cmd)

             console.log('finished')
             */
            return;
            options.dirExtract = 'home/user/trash/downloads/Wiz Khalifa - No Sleep.mp3.zip ex'
            options.fileToExtract = '/home/user/trash/downloads/Wiz Khalifa - No Sleep.mp3.zip'
            options.fileToExtract = sh.fs.trash() + '/downloads/Wiz Khalifa - No Sleep.mp3.zip'
            options.dirExtract = options.fileToExtract + 'ex/'
            var go = new FileExtractor()
            go.go(options);
        })
    }

    p.unZip = function unZip(fileZip, dirTo) {
        sh.dv2(self.settings, 'dirZipOutput', sh.fs.trash('DiffTool/outputZips/'))

        // sh.log.file(self.settings.dirZipOutput,'here is file')


        var options = {};
        options.callback = function onDone(dirExtract, token) {
            console.log('done', dirExtract)
        }

        var unzip = sh.requirePathSH('bin/unzip.exe')

        var leaf = sh.fs.leaf(fileZip)
        leaf = sh.replace(leaf, '.zip', '')

        var cmd = '';
        cmd = [unzip, fileZip, '-d', dirTo]
        cmd = cmd.join(' ')

        console.log('zip', cmd)

        sh.run(cmd)

        console.log('finished')

        //sh.fs.goToDir(dirTo+'/'+leaf, 'here is file');

    }

    p.moveFiles = function moveFiles(file, toDir) {
        var fileTo = sh.fs.join(toDir, sh.fs.leaf(file))
        sh.fs.mkdirp(toDir)
        console.log(toDir)
        sh.fs.cp2(file, fileTo)
        // asdf.g
        console.log('file', file, fileTo)
        return fileTo;
    }
    p.method = function method() {
    }

    p.test = function test(config) {
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir + '/' + file;
            return file;
        }

        p.proc = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }

    defineUtils()
}

exports.DiffTool = DiffTool;

if (module.parent == null) {
    var instance = new DiffTool();
    var config = {};
    instance.init(config)

    var dirs = []
    dirs.push('C:/Users/user1/Dropbox/projects/crypto/node_modules/shelpers')
    dirs.push('C:/Users/user1/Dropbox/projects/crypto/mp/SlickRun')
    dirs.push('C:/Users/user1/Dropbox/projects/crypto/mp/GrammarHelperServer')
    instance.zipDirs(dirs)

    var listFiles = []
    //instance.downloadFiles(listFile, true)
    var fileDownloaded = "C:/Users/user1/trash/DiffTool/outputZips/shelpers.zip"
    var dirIncomingFiles = sh.fs.trash('DiffTool/incoming/')
    var dirUnzipped =  sh.fs.trash('DiffTool/unziped/')
    var outputFile = instance.moveFiles(fileDownloaded, dirIncomingFiles);
    //instance.unZip(outputFile, dirUnzipped)
    //startBeyondCompareDiff


    //isntance.diff(dir1, dir2)
    instance.test();
}



 