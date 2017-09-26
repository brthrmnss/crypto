/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 *
 * //http://localhost:6008/
 * //this and run db2host?
 */

var shelpers = require('shelpers');
var sh = require('shelpers').shelpers;

var PromiseHelperV3 = shelpers.PromiseHelperV3;
var EasyRemoteTester = shelpers.EasyRemoteTester;

var fileScript = sh.fs.join(__dirname, 'supporting', 'TestRCScripts.js');
var RCScripts = require(fileScript).RCScripts;

var Workflow_ImportVidsAgain = require('./supporting/Workflow_ImportVidsAgain.js').Workflow_ImportVidsAgain

var Workflow_UploadAndRun = require('./supporting/Workflow_UploadAndRun.js').Workflow_UploadAndRun
var RC_HelperFxs = require(fileScript).RC_HelperFxs;

if (module.parent == null) {

    var json = 'G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\tasks\\boodtylisttest-full.6.17.2017.output.pbVerified.json.output.breed.json'
    json = sh.readJSONFile(json)

    var fileListOfFiles =  json.fileFileList
    var fileDlManifest = json.listDlManifest


    //fileList = json.listDlManifest
    //fileManifest =  json.fileManifest



    function runServer() {
        var self = {};
        self.cmds = {}
        self.cmds.sendStatus = sh.displayInput
        var fx = sh.noOp;
        var cmd = {}; 
        cmd = 'G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\tasks\\boodtylisttest-full.6.17.2017.output.pbVerified.json.output.breed.json'
        cmd = sh.readJSONFile(cmd)
        cmd.fileManifest = cmd.listDlManifest
        
        //begin live code
        
        
        var fileDlManifest = cmd.fileManifest
        //  var fileDlManifest = sh.fs.join(self.data.dirDlManifests, cmd.fileManifest);
        if (fileDlManifest.includes('/') == false && fileDlManifest.includes('\\') == false) {
            var fileDlManifest = sh.fs.join(self.data.dirDlManifests, cmd.fileManifest);
        }

        var fileFileList = cmd.fileFileList
        console.log('fileFileList', '<<<<<<<<<<<', fileFileList)
        if ( fileFileList ) {
            console.log('...', '')
        }
        if (fileFileList.includes('/') == false && fileFileList.includes('\\') == false) {
            var fileFileList = sh.fs.join(self.data.dirFileList, cmd.fileFileList);
        }

        console.log('fileFileList', '------------', fileFileList)

        self.cmds.sendStatus('running tool');
        var type = 'taskCheckProgressLite'
        self.cmds.sendStatus('running taskCheckProgressLite', type);

        RCScripts.verifyComplete(fileDlManifest, fileFileList, function onDone(output) {
            console.log('found how many?', output.foundCount);

            output.itemsValid = null;
            output.itemsFound = null;
            output.lines = output.lines.length
            output.result = 'found ' + output.foundCount;
            // sh.throwIf(output.foundCount != 2, 'did not match write count of items');
            fx(output);
            self.cmds.sendStatus('done with  ' +
                type + ' ' + output.foundCount, type, output);
        });
    }

    //runServer()






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
       // cfg.doNotImport_fileList = true;

        cfg.maxImportFileListCount = 100
        cfg.maxImportFileListCount = 10
        RC_HelperFxs.checkPercentageCompleteDeep(cfg);
    }


    testCheckPercentage_Deep()


}


