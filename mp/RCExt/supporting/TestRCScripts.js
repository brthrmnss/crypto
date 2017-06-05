/**
 * Created by user1 on 1/28/2017.
 */

var sh = require('shelpers').shelpers;
var RitvHelper = require(__dirname + '/../../../ritv/node_modules/ritvHelpers/index.js').ritvHelpers;
var rch = RitvHelper.ritvHelper;
var SNTestWorkflow = sh.require('ritv/distillerv3/tools/santizename/wrappers/'+'SN_test_workflow.js')
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
    if (  sh.isWin() )
    {
        dirs = config.innerSettingsMixin.dir_downloads_win
    }

    return dirs;
}

//RC_HelperFxs.runX
RC_HelperFxs.listFilesInDirectories = function listFilesInDirectories(fileOutput2, fxDone, dirs) {
    //

    if ( dirs == null ) {
        console.log('using based irectories')
        dirs = RC_HelperFxs.getDlDirs(dirs)
    }
    console.log('fix directories', dirs)
    var res = null
    var dirCWDOrig = process.cwd()


    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)


    var fileOutput = sh.fs.makePath(__dirname, 'trash', 'output.txt')
    var fileOutputMoveTo = sh.fs.makePath(__dirname, 'trash', 'output2.txt')

    if ( fileOutput2 ) {
        fileOutputMoveTo = fileOutput2;
    }

    var files = [];

    sh.async(dirs, function onEachDir(dir,fx) {

        var fileStore = sh.fs.makePath(dirTrash, sh.stripBadFiles(dir)+ '.filelist.txt')

        if ( false == sh.fs.exists(dir) ) {
            console.log('does not exist', dir)
            fx()
            return;
        }
        files.push(fileStore)
        process.chdir(dir)

        var cmd = 'dir /s /b /a >' + fileStore

        if ( sh.isWin() ) {

        } else {
            cmd = 'ls -R '+dir+' >' + fileStore
        }

        sh.runAsync(cmd, function onRunSync() {
            console.log('done')
            fx();
        })

        process.chdir(dirCWDOrig);
        console.log('file in log', dir, fileStore);
        // sh.run()

    }, function onEachDirsDione(){


        sh.fs.joinFiles(files, fileOutputMoveTo)
        if ( res ) { res.send('onGetFiles'); }

        sh.cid(fxDone,fileOutputMoveTo )
    })


    return;
}

RC_HelperFxs.verifyComplete = function verifyComplete(fileManifest, fileList, fxDone) {

    var output = {}

    dirs = RC_HelperFxs.getDlDirs()

    sh.throwIfNull(fileList, 'need a list of files')

    sh.throwIfNull(fileManifest, 'need a fileManifest')
    console.log('--verifyComplete%', fileManifest, fileList);

    sh.each.lineToDict =function linetodict(file) {
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
        sh.each(lines, function addtoLine(k,line) {
            line = sh.replaceBackslash(line)
            //   var y = line.split('/');
            dictFiles[line] = line;
        })

        return dictFiles;
    }


    var dict = sh.each.lineToDict(fileList);
    //console.log('display.dict', dict)
    //sh.exit('howmany')

    var json = sh.fs.readJSONFile(fileManifest);
    var count = 0;

    var itemsValid = []
    var itemsFound = []
    var foundCount = 0;
    sh.each(json, function onJ(k,jsonObj) {
        if (jsonObj.skip==true) {
            return;
        }

        if ( jsonObj.urlTorrent == null ) {
            return; //don't have file
        }

        var dirRemoteMega = jsonObj.dirRemoteMega;

        var found = false;

        itemsValid.push(json)
        sh.each(dirs, function onK(k,v) {
            var dirC = sh.fs.join(v, 'incoming/finished/', dirRemoteMega);
            dirC  =  sh.replaceBackslash(dirC);
            //console.log('------dir', dirC);
            var foundObj = dict[dirC];
            if ( foundObj) {
                found = true;
                itemsFound.push(json)
                // asdf.g
                foundCount++
                return false;
            }
        })

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

    outputLite.percent = sh.toPercent(foundCount/itemsValid.length);

    sh.copyProps(outputLite, output)

    output.output = sh.join(output.foundCount+'/'+
        output.expectedCount, output.percent);

    sh.callIfDefined(fxDone, output, outputLite)
    return;

}

RC_HelperFxs.checkPercentageCompleteDeep =
    function checkPercentageCompleteDeep(fileDlManifest, fileListOfFiles, fxDone) {
        SNTestWorkflow.testWorkflow(fileDlManifest, fileListOfFiles, function onDone1(output, lite) {
            console.log('testWorkflow', 'done')
            //asdf.g
            //var line = sh.clone(output)

            sh.cid(fxDone,output, lite)
            return;
            console.log('found how many?', output.foundCount);
            sh.throwIf(output.foundCount != 2, 'did not match write count of items');
        });
        return;
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
            if ( instance.data.socket && self.data.socketBreed == null ) {
                self.data.socketBreed = instance.data.socket;
            }
        }
        instance.init(config)

        return;
    }


exports.RC_HelperFxs = RC_HelperFxs;
exports.RCScripts = RC_HelperFxs;

if ( module.parent == null ) {
    RC_HelperFxs.runX



    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)

    var fileOutput = sh.fs.makePath(dirTrash, 'output.txt')
    var fileOutputMoveTo = sh.fs.join(__dirname, '/../testData', 'fileListTest.txt');
    var fileListOfFiles = fileOutputMoveTo
    var fileDlManifest = 'G:/Dropbox/projects/crypto/mp/RCExt/manifests/listIds_ls051393312.json'


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



    function fx2() {
        RC_HelperFxs.checkPercentageCompleteDeep(fileDlManifest,
            fileListOfFiles, function onDone(fileOutput, lite) {
              //asdf.g
               console.error(lite)
                console.log('onDone fx2 zzzfile output', fileOutput);
                //  asdf.g
                //sh.throwIf(output.foundCount != 2, 'did not match write count of items');
            }, null);
    }


    fx2()

    /*
     RCScripts.verifyComplete(fileDlManifest, fileOutputMoveTo, function onDone(output) {
     console.log('found how many?', output.foundCount);
     sh.throwIf(output.foundCount != 2, 'did not match write count of items');
     });
     */

}
//RC_HelperFxs.runX();

