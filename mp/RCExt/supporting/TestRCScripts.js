/**
 * Created by user1 on 1/28/2017.
 */

var sh = require('shelpers').shelpers;
var RitvHelper = require(__dirname + '/../../../ritv/node_modules/ritvHelpers/index.js').ritvHelpers;
var rch = RitvHelper.ritvHelper;
var SNTestWorkflow = sh.require('ritv/distillerv3/tools/santizename/wrappers/' + 'SN_test_workflow.js')
    .SNTestWorkflow

var file_GetFileListFromRemoteScript = './WorkflowGetFilesFromRemoteMachine.js';
var GetFileListFromRemote = require(file_GetFileListFromRemoteScript).GetFileListFromRemote;


var RC_HelperFxs = {}
RC_HelperFxs.getDlDirs = function getDLDirs(dirs) {
    var Step2 = rch.getBreed();
    var config = rch.getConfig();

    var defaultSettings = config.innerSettingsMixin;
    var breedConfig = config.breed;

    var dirs = config.innerSettingsMixin.dir_downloads
    if (sh.isWin()) {
        dirs = config.innerSettingsMixin.dir_downloads_win
    }

    return dirs;
}

//RC_HelperFxs.runX
RC_HelperFxs.listFilesInDirectories = function listFilesInDirectories(fileOutput2, fxDone, dirs, withSizes) {
    //

    if (dirs == null) {
        console.log('using based irectories')
        dirs = RC_HelperFxs.getDlDirs(dirs)
    }
    console.log('fix directories', dirs, withSizes)
    var res = null
    var dirCWDOrig = process.cwd()


    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)


    var fileOutput = sh.fs.makePath(__dirname, 'trash', 'output.txt')
    var fileOutputMoveTo = sh.fs.makePath(__dirname, 'trash', 'output2.txt')

    if (fileOutput2) {
        fileOutputMoveTo = fileOutput2;
    }


    var files = [];

    sh.async(dirs, function onEachDir(dir, fx) {


        var fileStore = sh.fs.makePath(dirTrash, sh.stripBadFiles(dir) + '.filelist.txt')
        sh.run('> ' + fileStore  )

        if (false == sh.fs.exists(dir)) {
            console.log('does not exist', dir)
            fx()
            return;
        }
        files.push(fileStore)
        process.chdir(dir)

        var cmd = 'dir /s /b /a >' + fileStore

        if (sh.isWin()) {

        } else {
            // cmd = 'ls -R ' + dir + ' >' + fileStore
            cmd = 'find ' + dir + ' -name "*.*"  -print ' + ' >> ' + fileStore //+ '; echo;';
            if ( withSizes ) {
                process.chdir('/')
                var cmd = 'du -h '+dir+' >' + fileStore
            }
        }

        sh.runAsync(cmd, function onRunSync() {
            console.log('done')
            fx();
        })

        process.chdir(dirCWDOrig);
        console.log('file in log', dir, fileStore);
        // sh.run()

    }, function onEachDirsDione() {


        sh.fs.joinFiles(files, fileOutputMoveTo)
        if (res) {
            res.send('onGetFiles');
        }

        sh.cid(fxDone, fileOutputMoveTo)
    })


    return;
}

RC_HelperFxs.verifyComplete = function verifyComplete(fileManifest, fileList, fxDone) {

    var output = {}

    dirs = RC_HelperFxs.getDlDirs()

    sh.throwIfNull(fileList, 'need a list of files')

    sh.throwIfNull(fileManifest, 'need a fileManifest')
    console.log('--verifyComplete%', fileManifest, fileList);

    sh.each.lineToDict = function linetodict(file) {
        var file = sh.readFile(file);
        file = file.replace(/\r/g, "");
        var cfg = {};
        cfg.str = file;
        cfg.ignoreEnd = ['.txt', '.search'];
        var lines = sh.each.lines(cfg);
        console.log('lines', lines.length);

        output.lines = lines;
        //console.log('lines after', lines.length)
        var dictFiles = {}
        sh.each(lines, function addtoLine(k, line) {
            line = sh.replaceBackslash(line)
            //   var y = line.split('/');
            if (line.includes('/Root/') == null) {
                return;
            }
            line = '/Root/' + sh.str.after(line, '/Root/')

            var filePath = line;

            var dirs = line.split('/')
            if (dirs[0] == '') {
                dirs.shift()
            }

            var dir3 = dirs.slice(0, 4)
            var dir4 = dirs.slice(0, 5)

            var dir3_path = '/'+dir3.join('/')+'/'
            var dir4_path = '/'+dir4.join('/')+'/'

            if (filePath.includes('/tt')) {
                // console.log(dir4)
                //  console.log(dir5)
                // asdf.g
                /*  if ( dir4.slice(-1)[0].startsWith('tt')) {
                 dictFiles[dir4_path] = line;
                 }

                 if ( dir5.slice(-1)[0].startsWith('tt')) {
                 console.log('\t',  dir5.slice(-1))
                 dictFiles[dir5_path] = line;
                 asdf.g
                 }*/

                if (filePath.includes('Root/tv/') && filePath.includes('/Season_')) {
                    dictFiles[dir4_path] = line;
                    //TOD what about spidoes?
                } else {
                    dictFiles[dir3_path] = line;
                }

                // dictFiles[dir5] = line;

            }
            //  dictFiles[line] = line;
        })

        return dictFiles;
    }

    var dbg = false;

    var dict = sh.each.lineToDict(fileList);
    //  console.log('display.dict', dict)
    //sh.each.print(dict)
    //  sh.exit('howmany')

    var json = sh.fs.readJSONFile(fileManifest);
    var count = 0;

    var itemsValid = []
    var itemsFound = []
    var foundCount = 0;
    sh.each(json, function onJ(k, jsonObj) {
        if (jsonObj.skip == true) {
            return;
        }

        if (jsonObj.urlTorrent == null) {
            return; //don't have file
        }

        var dirRemoteMega = jsonObj.dirRemoteMega;

        // console.log(k, 'what ?', dirRemoteMega)
        var found = false;

        itemsValid.push(json)

        var dirMatch = dirRemoteMega
        dirMatch = sh.replaceBackslash(dirMatch);

        if ( dbg ) {
            if (k < 100) {
                console.log('------dir', dirMatch);
            }
        }
        var foundObj = dict[dirMatch];
        if (foundObj) {
            //asdf.g
            found = true;
            itemsFound.push(json)
            foundCount++
           // return false;
        }

        count++;
        //console.log('|||', count, jsonObj);

    })

    var outputLite = {}

    outputLite
    outputLite.file = fileManifest;
    outputLite.foundCount = foundCount;
    outputLite.expectedCount = itemsValid.length
    outputLite.count = foundCount;
    output.itemsFound = itemsFound
    output.itemsValid = itemsValid;

    outputLite.percent = sh.toPercent(foundCount / itemsValid.length);

    sh.copyProps(outputLite, output)

    output.output = sh.join(output.foundCount + '/' +
        output.expectedCount, output.percent);

    sh.callIfDefined(fxDone, output, outputLite)
    return;

}

RC_HelperFxs.checkPercentageCompleteDeep =
    function checkPercentageCompleteDeep(cfg) {
        SNTestWorkflow.testWorkflow(cfg)
        return
    }

RC_HelperFxs.getFileListUsingSockets =
    function getFileListUsingSockets(config, fxDoneProc) {

        var instance = new GetFileListFromRemote();
        /*  var config = {};
         config.ip = '127.0.0.1'
         config.port = '6014'

         config.socket = self.data.socketBreed;
         config.ip = data.ip;
         config.port = data.port;*/
        //config.localTest = true
        config.fxDone = function fxDone_GettingList() {
            sh.fxForward(fxDoneProc, arguments);

            return;
            self.proc('sending a result back.....')
            if (instance.data.socket && self.data.socketBreed == null) {
                self.data.socketBreed = instance.data.socket;
            }
        }
        instance.init(config)

        return;
    }


exports.RC_HelperFxs = RC_HelperFxs;
exports.RCScripts = RC_HelperFxs;

if (module.parent == null) {
    RC_HelperFxs.runX


    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)

    var fileOutput = sh.fs.makePath(dirTrash, 'output.txt')
    var fileOutputMoveTo = sh.fs.join(__dirname, '/../testData', 'fileListTest.txt');
    var fileListOfFiles = fileOutputMoveTo
    var fileDlManifest = 'G:/Dropbox/projects/crypto/mp/RCExt/manifests/listIds_ls051393312.json'


    var fileListOfFiles = fileOutputMoveTo
    var fileDlManifest = 'G:/Dropbox/projects/crypto/mp/RCExt/manifests/listIds_ls051393312.json'
    var fileDlManifestLite = 'G:/Dropbox/projects/crypto/mp/RCExt/testData/listIds_ls051393312.lite.json'

    fileListOfFiles = "G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___localhost_6024_.txt"
    fileListOfFilesZZZ = "G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___localhost_ZZZZ_.txt"
    fileDlManifest = "G:\\Dropbox\\projects\\crypto\\ritv/imdb_movie_scraper/IMDB_App_Output/dlListsWrapC/List ls Ids_ls05139_11.json"

    function fx1() {
        RC_HelperFxs.verifyComplete(fileDlManifest, fileOutputMoveTo, function onDone(output, lite) {
            console.error(lite)
            console.log('found how many?', output.foundCount);
            sh.throwIf(output.foundCount != 2, 'did not match write count of items');
        });
    }


    /*
     var fileOutput = sh.fs.makePath(dirTrash, 'file.list.test.txt')
     RC_HelperFxs.listFilesInDirectories(fileOutput, function onDone(fileOutput, lite) {
     //console.error(lite)
     console.log('file output', fileOutput);
     //sh.throwIf(output.foundCount != 2, 'did not match write count of items');
     }, null);
     */


    function testCheckPercentage_Deep() {
        var cfg = {}
        cfg.fileList = fileListOfFiles
        cfg.fileManifest = fileDlManifest
        cfg.fxDone = function onDone(fileOutput, lite) {
            //asdf.g
            console.error(lite)
            //  console.log('onDone fx2 zzzfile output', fileOutput);


            //asdf.g


            //  asdf.g
            //sh.throwIf(output.foundCount != 2, 'did not match write count of items');
        };

        //cfg.searchGlobalAllServers = true;


        cfg.checkFileSizes = true; //import the size in the filelist
        //make dl list get the import dl list
        cfg.checkForIMDB = true; //
        cfg.checkForFilePath = true; //match if ay portion is in file name ///so it would not concern with the end of file name ...
        //that's enough

        RC_HelperFxs.checkPercentageCompleteDeep(cfg);
    }


    //testCheckPercentage_Deep()


    function testCheckPercentage_Deep2() {
        var cfg = {}
        cfg.fileList = fileListOfFilesZZZ
        cfg.fileManifest = fileDlManifestLite

        cfg.fxDone = function onDone(data2) {
            if (data2 == null) {
                data2 = {}
            }
            //  sh.x('kko')
            //console.error(data2)
            // sh.x('kko')


            var cfg = {}
            cfg.fileList = fileListOfFilesZZZ
            cfg.fileManifest = fileDlManifestLite
            cfg.fxDone = function onDone(data) {
                console.error(sh.n, sh.n, sh.n, sh.n)
                console.error(data2.countFound, data.countFound)
                console.error(data2.countDLList, data.countDLList)
                console.error(data2.countNA, data.countNA)
                console.error(data2.percentValid, data.percentValid)
                sh.x('zzz999')
                //sh.x('kko')
            };
            cfg.doNotImport_fileList = true;
            cfg.checkFileSizes = true; //import the size in the filelist
            cfg.searchAllServers = true
            RC_HelperFxs.checkPercentageCompleteDeep(cfg);

        };
        //  cfg.fxDone()
        // return;

        //cfg.searchGlobalAllServers = true;
        cfg.doNotImport_fileList = true;
        cfg.checkFileSizes = true; //import the size in the filelist
        //make dl list get the import dl list
        cfg.checkForIMDB = true; //
        cfg.checkForFilePath = true; //match if ay portion is in file name ///so it would not concern with the end of file name ...
        //that's enough
        //cfg.searchOnServerName = 'http___localhost_6024_.txt'
        RC_HelperFxs.checkPercentageCompleteDeep(cfg);
    }

    testCheckPercentage_Deep2()


    /*
     RCScripts.verifyComplete(fileDlManifest, fileOutputMoveTo, function onDone(output) {
     console.log('found how many?', output.foundCount);
     sh.throwIf(output.foundCount != 2, 'did not match write count of items');
     });
     */

}
//RC_HelperFxs.runX();

