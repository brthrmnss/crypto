/**
 * Created by user1 on 1/28/2017.
 */


var RitvHelper = require(__dirname + '/../../ritv/node_modules/ritvHelpers/index.js').ritvHelpers;
var rch = RitvHelper.ritvHelper;

var sh = require('shelpers').shelpers;

var XO = {}
XO.getDlDirs = function getDLDirs(dirs) {
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

XO.runX = function runX(fileOutput2, dirs) {
    //


    dirs = XO.getDlDirs(dirs)

    console.log('sdf', dirs)
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


        sh.joinFiles(files, fileOutputMoveTo)
        if ( res ) { res.send('onGetFiles'); }
    })


    return;
}

XO.verifyComplete = function verifyComplete(fileManifest, fileList, fxDone) {


    var output = {}

    dirs = XO.getDlDirs()

    sh.throwIfNull(fileList, 'need a list of files')

    sh.throwIfNull(fileManifest, 'need a fileManifest')
    console.log('verifyComplete%', fileManifest, fileList);

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
    console.log('dict', dict)
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
            console.log('dir', dirC);
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
        console.log(count, jsonObj);

    })

    output.foundCount = foundCount;
    output.count = foundCount;
    output.itemsFound = itemsFound
    output.itemsValid = itemsValid;

    sh.callIfDefined(fxDone, output)

    return;
    var dirScript = 'G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/'+
        'wrappers/imdb_app_v3_wrapper.js'
    var ConvertXToIMDB_PB_List = require(dirScript).ConvertXToIMDB_PB_List

    fH.dlLists = function dlLists(token, cb) {
        self.proc('dlLists');

        // return;
        if (cmd.wrapType == 'ttIds') {
            ConvertXToIMDB_PB_List.downloadIds(fx.data.listIds, true, fx.data.taskName, onSavedFile);
            return;

        }
        if (cmd.wrapType == 'idList') {
            ConvertXToIMDB_PB_List.downloadIdList(fx.data.listIds, true, fx.data.taskName, onSavedFile);
            return;
        }



        // if (cmd.wrapType == 'lsList') {
        ConvertXToIMDB_PB_List.downloadLists(fx.data.listIds, true, fx.data.taskName, onSavedFile);

        function onSavedFile(file) {
            console.log('finished with lax', file);
            self.utils.storeConfig(fx.data.taskName, file);

            cb();
        }

        //dl list

    }
    fH.storeInFile = function storeInFile(token, cb) {
        self.proc('storeInFile')
        fx(fx.data.taskName, 'size');
        //create manifest and return manifest name
        cb();
    }


    var token = {}

    var work = new PromiseHelperV3();
    token.silentToken = true
    work.wait = token.simulate == false;
    work.startChain(token)
        .add(fH.startCmd_Dl)
        .add(fH.dlLists)
        .add(fH.storeInFile)
        //.log()
        .end();
    self.cmds.sendStatus('msg ... starting search')

    return;




    var Step2 = rch.getBreed();
    var config = rch.getConfig();

//var args = sh.getNodeArguments();
//var i = new dl_putio_app();

    var defaultSettings = config.innerSettingsMixin;
    var breedConfig = config.breed;


    var dirs = config.innerSettingsMixin.dir_downloads
    if (  sh.isWin() )
    {
        dirs = config.innerSettingsMixin.dir_downloads_win
    }


    console.log('sdf', dirs)
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
    })


    return;
}

exports.RCScripts = XO;

if ( module.parent == null ) {
    XO.runX



    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)

    var fileOutput = sh.fs.makePath(dirTrash, 'output.txt')
    var fileOutputMoveTo = sh.fs.join(__dirname, 'testData', 'fileListTest.txt');
    
    var fileDlManifest = sh.fs.join(__dirname, 'testData', 'listIds_ls051393312.json');

    XO.verifyComplete(fileDlManifest, fileOutputMoveTo, function onDone(output) {
        console.log('found how many?', output.foundCount);
        sh.throwIf(output.foundCount != 2, 'did not match write count of items');
    });
}
//XO.runX();

