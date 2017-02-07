/**
 * Created by user1 on 1/28/2017.
 */


/**
 * Created by user1 on 1/28/2017.
 */

var sh = require('shelpers').shelpers;

var SNTestWorkflow = {}

SNTestWorkflow.testWorkflow = function testWorkflow(fileManifest, fileList, fxDone) {
    var output = {}


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

    var SanitizeNamesFromDB = require('./SanitizeNamesFromDB').SanitizeNamesFromDB;

   // var ritvConfigHelper = require('ritvHelpers');
   // var defaultConfig = ritvConfigHelper.ritvHelpers.getConfig();
//
    var i = new SanitizeNamesFromDB();
    i.init();
    //i.testMode();
    // i.iterateOverFiles_InMega();
    // i.iterateOverFiles();
    i.settings.maxFiles = null
    i.settings.logging = true
    i.settings.mode2 = true;
    //i.settings.maxComparisons = 100
    //var collect = file.map(function (x ) { return x.imdb_id})
    var imdbIds = []
   // if ( i.settings.mode2 == true ) {
        sh.each(json, function addId(i, imdb) {
            if ( imdb.skip ) {
                return;
            }
            if ( imdb.urlTorrentNotFound == true )
                return;
            var query = imdb;
            query.imdb_id= imdb.imdb_id
            if ( imdb.series) {
                asdf.g
                query.seasonNumber = imdb.query.split(' ').slice(-1)[0]
            }
            if ( imdb.seasonNumber) {
                query.seasonNumber = imdb.seasonNumber;
            }
            query.query = imdb.query


            console.log(imdb.name, query.imdb_id)
            imdbIds.push(query)
        })
    /*} else {
        sh.each(file, function addId(i, imdb) {
            var imdbId = imdb.imdb_id
            if ( imdbIds.indexOf(imdbId) != -1 ) {
                return;
            }
            if ( imdb.urlTorrentNotFound == true )
                return;

            console.log(imdb.name, imdbId)
            imdbIds.push(imdbId)
        })
    }*/

    i.compareDB(imdbIds)
    //i.tests.testSaveNewMovie();

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

exports.SNTestWorkflow = SNTestWorkflow;

if ( module.parent == null ) {
    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)

    var fileOutput = sh.fs.makePath(dirTrash, 'output.txt')
    var fileOutputMoveTo = sh.fs.join(__dirname, 'testData', 'fileListTest.txt');

    var fileDlManifest = sh.fs.join(__dirname, 'testData', 'listIds_ls051393312.json');

    SNTestWorkflow.testWorkflow(fileDlManifest, fileOutputMoveTo, function onDone(output) {

       console.log('done')
       return;
        console.log('found how many?', output.foundCount);
        sh.throwIf(output.foundCount != 2, 'did not match write count of items');
    });
}
//XO.runX();

