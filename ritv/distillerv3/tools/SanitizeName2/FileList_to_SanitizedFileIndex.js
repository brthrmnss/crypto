/**
 * Created by user1 on 8/12/2017.
 */


/**
 * Created by user1 on 1/28/2017.
 */


/**
 * Created by user1 on 1/28/2017.
 */

var shelpers = require('shelpers')
var sh = require('shelpers').shelpers;
var PromiseHelperV3 = shelpers.PromiseHelperV3;

var SNTestWorkflow = {}

//var SanitizeNamesFromDB = require('./SanitizeNamesFromDB').SanitizeNamesFromDB;
var IMDB_Scraper = sh.require('ritv/imdb_movie_scraper/imdb_scraper.js').IMDB_Scraper
var imdb_api_get_content = sh.require('ritv/imdb_movie_scraper/imdb_scraper.js').imdb_api_get_content


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function FileList_to_FullIndex_Workflow() {
    var p = FileList_to_FullIndex_Workflow.prototype;
    p = this;
    var self = this;
    self.data = {};
    self.data.imdbs = {}
    //self.data.errors = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});

        self.data.timer = sh.timer();

        self.data.timer.time('since start')

        //self.settings.fileImport_ClearAll = true; //why: test using diffen types of files 
        //self.settings.searchOnServerName = 'testFakeMachine';
     
        var fileOutputPremable = 'sn2_Output'
        
        if ( self.settings.doError ) {
            self.data.listOutputErrorsTxt = sh.fs.moveTo(self.settings.fileList, fileOutputPremable, 'error.txt')
            fileOutputPremable += 'errorRevision2'
            self.settings.fileList = self.data.listOutputErrorsTxt;

        }
        
        self.data.listOutputCSV = sh.fs.moveTo(self.settings.fileList, fileOutputPremable, '.csv')
        self.data.listOutputJSON = sh.fs.moveTo(self.settings.fileList, fileOutputPremable, '.json')
        self.data.listWorkJSON = sh.fs.moveTo(self.settings.fileList + '.work', fileOutputPremable, '.json')
        self.data.listOutputErrorsJSON = sh.fs.moveTo(self.settings.fileList, fileOutputPremable, 'error.json')
        self.data.listOutputErrorsCSV = sh.fs.moveTo(self.settings.fileList, fileOutputPremable, 'error.csv')
        self.data.listOutputErrorsTxt = sh.fs.moveTo(self.settings.fileList, fileOutputPremable, 'error.txt')
        self.data.listOutputDuplicatesCSV = sh.fs.moveTo(self.settings.fileList, fileOutputPremable, 'dupe_files.csv')

        sh.fs.makePathToFile(self.data.listOutputCSV)
        self.data.work = sh.readJSONFile(self.data.listWorkJSON, {}, true);
        self.data.errors = sh.readJSONFile(self.data.listOutputErrorsJSON, {}, true);
        self.data.outputs = sh.readJSONFile(self.data.listOutputJSON, {}, true);

        var fileListContents = sh.readFile(self.settings.fileList);
        //contents = contents.replace(/\r/g, "");
        var files = sh.breakStringIntoLinesSafe(fileListContents)
        files = self.utils.filterFilesOnly(files)
        self.data.files = files;



        sh.log.file(self.settings.fileList, 'file list input')
        sh.log.file(self.data.listOutputJSON, 'listOutputJSON')
        sh.log.file(self.data.listOutputErrorsJSON, 'listOutputErrorsJSON')

        var output = {}

        sh.throwIfNull(self.settings.fileList, 'need a list of files')

        // sh.x()
        self.runTestWorkflow();

    }


    p.runTestWorkflow = function runTestWorkflow() {
        var token = {}

        var work = new PromiseHelperV3();
        token.silentToken = true
        work.wait = token.simulate == false;

       // console.log('what is', self.importFilesIntoFileDB)
        work.startChain(token)
        //import files, santizie, put in database toDB
            .add(self.filterFileList)
            .add(self.sanitizeFileNames)
            .add(self.attachIMDB)
            // return;b
            //go through all files and make sure files exist
            .add(self.iterateOverDlManifest_and_findFiles)
            .add(self.lastStep)
            //.log()
            .end();

    }

    function defineSteps() {
        p.filterFileList = function filterFileList(token, cb) {
            // self.data.listFiles = sh.fs.readFile(self.settings.fileList);


            console.log('>>>', 'what is size of files', self.data.files.length)

            var files = self.data.files;
            //files = self.utils.filterStrings(files, self.settings.fileFilter)
            if (self.settings.countOffset) {
                files = files.slice(self.settings.countOffset)
            }

            if (self.settings.countMaxFiles) {
                files = files.slice(0, self.settings.countMaxFiles)
            }

           // asdf.g
            // self.data.files = files;
            var filesNormalized = [];
            sh.each(files, function noramlizeFile(k, file) {
                var file2 = sh.fs.norm(file)
                filesNormalized.push(file2);
            })

            if (self.settings.countMaxFilesToExamine) {
                self.proc('reached max files to countMaxFilesToExamine',
                    'self.settings.countMaxFilesToExamine',
                    self.settings.countMaxFilesToExamine)
                filesNormalized = filesNormalized.slice(0, self.settings.countMaxFilesToExamine)
            }

            var leafs = [];
            var filteredFiles = [];
            var validFiles = [];
            self.data.moreItems = false
            self.data.dupeLeafs = []
            self.data.count_previousSuccesses = 0
            self.data.count_previousErrors = 0
            var oldErrors = sh.readJSONFile(self.data.listOutputErrorsJSON, {}, true);
            console.log('>>>starting input:', filesNormalized.length);
            //console.log('what is size of files', self.data.files.length)

            sh.each(filesNormalized, function process_RemoveBadFiles(i, localFilePath) {
                if (sh.endsWith(localFilePath, '.txt')) {
                    return
                }
                if (sh.endsWith(localFilePath, '.srt')) {
                    return
                }
                if (sh.endsWith(localFilePath, '.nfo')) {
                    return
                }
                if (sh.endsWith(localFilePath, '/sample.mkv')) {
                    return
                }
                if (sh.endsWith(localFilePath, '/sample.avi')) {
                    return
                }
                //"genie-sample.mkv"
                var sampleStr = localFilePath.slice(-("sample".length + 4), -4)
                if (sampleStr == 'sample') {
                    return
                }
                if (sh.includes(localFilePath, '(sample)')) {
                    return
                }
                //sh.x(sampleStr)
                if (sh.includes(localFilePath, '/sample')) {
                    return
                }
                var dirExtractions = '/extractions/'
                if (localFilePath.includes(dirExtractions)) {
                    return;
                }
                if (localFilePath == 'no episode info ') {
                    return
                }
                if (sh.includes(localFilePath, '.sample.')) {
                    return
                }
                var fifthCharFromEnd = localFilePath.slice(-5, -4)
                var fourth = localFilePath.slice(-4, -3)
                if (fifthCharFromEnd != '.' &&
                    fourth != '.') {
                    return; //not a standard file
                }
                var leaf = sh.fs.leaf(localFilePath).toLowerCase();
                if (leafs.includes(leaf)) {
                    self.data.dupeLeafs.push(leaf)
                    return;
                }
                leafs.push(leaf)

                validFiles.push(localFilePath)
            })


            var filterFiles_SkipPrevious = []
            //filteredFiles
            sh.each(validFiles, function process_PreviousProcessedFiles(i, localFilePath) {
                filteredFiles.push(localFilePath)
                if (self.utils.haveProcessedFilePreviously(localFilePath)) {
                    return;
                }

                if (self.settings.countMaxFilesToSanitize_EachIteration) {
                    if (filteredFiles.length >= self.settings.countMaxFilesToSanitize_EachIteration) {
                        self.data.moreItems = true;
                        self.proc('reached max files to sanitized', 'self.settings.countMaxFilesToSanitize_EachIteration', self.settings.countMaxFilesToSanitize_EachIteration)
                        return false;
                    }
                }
                filterFiles_SkipPrevious.push(localFilePath)
            })

            filteredFiles = filterFiles_SkipPrevious;

            self.data.listFiles = filteredFiles;
            self.proc('how many  self.data.dupeLeafs?', sh.toPercent2(self.data.dupeLeafs, filesNormalized))
            self.proc('how many valid files?', sh.toPercent2(validFiles, filesNormalized))
            //self.data.dupeLeafs.length)
            //return;
           // var fileToBeConsideredLength = filesNormalized.length - self.data.dupeLeafs.length;
            self.data.validFiles = validFiles;
            self.proc('how many files were prev-successes?', sh.toPercent2(self.data.count_previousSuccesses,validFiles))
            self.proc('how many files were prev-errors?', sh.toPercent2(self.data.count_previousErrors, validFiles))

            if (self.data.listFiles.length == 0) {
                self.proc('there are no files to process ....', 'complete')
            } else {
                self.proc('files to process', self.data.listFiles.length)
            }

            self.proc('how many  files to process?', 'iteration:', self.data.listFiles.length, 'all:', sh.paren(validFiles.length))

//

            cb()
        }

        p.sanitizeFileNames = function sanitizeFileNames(token, cb) {
            var NameSanitizer = sh.require('ritv/distillerv3/tools/santizename/NameSanitizer').NameSanitizer
            var nS = new NameSanitizer();

            var config = {}
            config.showAllItemsAtEnd = false;
            config.manualMode = true
            config.showOutput = false;
            config.log = false
            nS.init(config);


            sh.each(self.data.listFiles, function process_RemoveBadFiles(i, localFilePath) {


                sh.log.iteration(i, self.data.listFiles, 100, localFilePath)

                var fileNames = [localFilePath]; //search for local path
                //input filenames,
                var fileList = nS.utils.filterFileList(fileNames); //convert filenames to epi/season #


               // debugger
                var processedFile = fileList[0]
                var output = {}
                output.input = localFilePath
                output.output = fileList[0];

                //console.log(processedFile)

                if (sh.isString(processedFile) || fileList.length == 0) {
                    //cb()
                    self.fault('sanitize failed', localFilePath, processedFile,
                        sh.paren(sh.fs.leaf(localFilePath)), sh.qq(localFilePath) /*, '', fileNames*/);
                    return;
                }
                if (processedFile.imdb_id == null) {
                    self.fault('did not have imdb_id', localFilePath, processedFile)
                }
                var notRealTVShow = false;
                if (processedFile.tvMode && localFilePath.includes('/tv/') == false) {
                    console.log(sh.t, 'ugh not tv show ... should not be tagged at this', localFilePath)
                    notRealTVShow = true
                }
                if (processedFile.tvMode && notRealTVShow != true) {
                    var eJSON = JSON.parse(processedFile.epi)
                    if ( eJSON.e2 ) {
                        console.error('e2', 'settinge@2', eJSON.e2, 'e2')
                        //asdf.g
                    }
                    // processedFile.epiJSON = eJSON;
                    if (sh.isNumber(eJSON.s) == false || eJSON.s == 0) {
                        self.fault('no season', localFilePath, eJSON, fileNames); //no season
                        return;
                    }

                    if (sh.isNumber(eJSON.e) == false || eJSON.e == 0) {
                        self.fault('no episode', localFilePath, eJSON, fileNames); //no season
                        return;
                    }
                }

                self.data.outputs[localFilePath] = (output)
                //self.data.outputs.push(output)

            })

            cb()
        }


        p.fault = function fault(i, localFilePath) {
            var args = sh.args(arguments)
            console.log()
            console.error(sh.t, sh.fs.leaf(localFilePath))
            console.error(sh.t, sh.t, args.join(' '))
            if (sh.isString(localFilePath) == false) {
                sh.throw('need error as localFilePath step 2nd')
            }
            //asdf.g
            //self.data.errors.push(args)
            self.data.errors[localFilePath] = args;
        }

        p.attachIMDB = function attachIMDB(token, cb) {
            var imdb = new IMDB_Scraper();

            global.noIMDBContentDB = true

            var i = 0;

            var outputItems =  sh.each.collect(self.data.outputs )

            sh.async(outputItems, function process_getIMDBInfo(outputIMDB, _fxDone) {


                function fxDone() {
                    sh.later(_fxDone)
                }



                var item = outputIMDB.output;

                //  processedFile.epiJSON = eJSON;

                i++
                /*  if (i < 400) {
                 //console.log('item', item)
                 fxDone()
                 return;
                 }*/
                if (sh.log.iteration(i, self.data.outputs, 100, item)) {

                    //self.data.work = sh.readJSONFile(self.data.listWorkJSON, {}, true);
                    //sh.writeJSONFile(self.data.listWorkJSON, self.data.work)

                }
                if (!item.sanitized.includes('dead mans')) {
                    // fxDone()
                    // return;
                }


                /*  if (i > 400) {
                 console.log('item', item)
                 console.error('item', item)
                 }*/
//asdf.g

                var settings = {}
                settings.ttList = [item.imdb_id]
                if (item.imdb_id == null) {
                    console.log('item null', item)
                    fxDone()
                    return;
                }
                //settings.ttList = ['tt1234588']

                //console.log('item for it', item)
                //  asdf.g
                sh.log.disable()
                settings.fxDone = function fxDone_XA(fItem) {
                    sh.log.enable();
                    var firstItem = fItem.data.movies_meta[0];
                    if (firstItem == null) {
                        console.error(sh.t, 'failed on', item.title)
                        console.error(sh.t, 'failed on', item)
                       // fxNextSkip('could not get this item');
                        return;
                    }

                    self.data.imdbs[firstItem.imdb_id] = firstItem;


                    if (firstItem.series) {
                        var opts = {saveToDB: false}
                        var epiJSON = JSON.parse(item.epi)
                        //var i = new imdb_api_get_content();
                        sh.log.disable()
                        if (firstItem.lastEpisodeObj) {
                            onasdf(firstItem.lastEpisodeObj)
                            return;
                        }

                        imdb_api_get_content.get_episodes(firstItem.imdb_id,
                            onasdf, opts)


                        function onasdf(episodeItem) {
                            sh.log.enable();
                            var content = episodeItem[firstItem.imdb_id];

                            firstItem.lastEpisodeObj = episodeItem; //cache for later

                            function getEpi_FromContent(s, e) {
                                sh.throwIfNull(s, 'need season')
                                var found = null;
                                sh.each(content.episodeList, function onFindEpisode(k, v) {
                                    if (parseFloat(v.episodeNumber) == parseFloat(e)) {
                                        if (parseFloat(v.seasonNumber) == parseFloat(s)) {
                                            found = v;
                                            return false;
                                        }
                                    }
                                })
                                return found;
                            }

                            imdbEpisode = getEpi_FromContent(epiJSON.s, epiJSON.e)

                            //outputIMDB.imdbEpisode = imdbEpisode;
                            //item.episodeSummary2 = content.episodeSummary2

                            delete item.i
                            if (imdbEpisode == null) {
                                //console.error(item.imdb_id, item.name, item.name)
                                //console.error(outputIMDB)
                                outputIMDB.error = 'could not get episode'
                                self.fault('could not get episode for', outputIMDB.input, outputIMDB)
                                fxDone()
                                return
                            }
                            item.episode_name = imdbEpisode.title;
                            item.imdb_id2 = imdbEpisode.imdb_id;
                            item.series_id = firstItem.imdb_id;
                            item.series_name = firstItem.title;

                            //item.name = null
                            // delete item.name

                            //asdf.g
                            //episodeItem.episodeSummmary
                            onGotEspidoes();
                            // debugger
                        }
                    }
                    else {
                        item.title = firstItem.title;
                        item.imdb_id2 = firstItem.imdb_id;
                        onGotEspidoes();
                    }

                    function onGotEspidoes(asdf) {
                        item.ratingCount = firstItem.ratingCount
                        /* item.ratingCount = firstItem.ratingCount

                         // console.log('asdf', firstItem.ratingCount, fItem.data.movies_meta.length)
                         if (firstItem.ratingCount) {
                         if (item.series == true) {
                         if (firstItem.ratingCount < 20000) {
                         // asdf.g
                         console.error(sh.t, 'too low', item.title, sh.paren(firstItem.ratingCount))
                         fxNextSkip('series rating too low');
                         return;
                         }
                         } else {
                         //asdf.g
                         }
                         } else {
                         fxNextSkip();
                         return;
                         }*/

                        if (self.settings.resumeMode != false) {
                            //debugger
                            self.data.work[outputIMDB.input] = outputIMDB;
                        }
                        // console.log('ok', firstItem.title, firstItem.ratingCount)
                        fxDone()
                        //console.error('imdb loop complete', self.data.indexIteration, item.index, firstItem.title, firstItem.ratingCount)
                    }
                }
                settings.redoDelayTimeSecs = 3
                settings.redoCountMax = 1;
                //sh.log.disable();
                imdb.settings = settings;


                var oldIMDB = self.data.imdbs[item.imdb_id]
                if (oldIMDB) {
                    // asdf.g
                    var fItem = {};
                    fItem.data = {}
                    // fItem.data.movies_meta  = {};
                    fItem.data.movies_meta = [oldIMDB]
                    settings.fxDone(fItem)
                    //asdf.g
                    return;
                }

                imdb.loadSettings(settings)
            }, function onsdf() {

                cb()

            })
        }


        p.iterateOverDlManifest_and_findFiles = function iterateOverDlManifest_and_findFiles(token, cb) {

            sh.each(self.data.listFiles, function process_RemoveBadFiles(i, localFilePath) {
            })

            cb()
        }


        p.lastStep = function lastStep() {
            sh.writeJSONFile(self.data.listWorkJSON, self.data.work)

            self.proc('finisehd output', self.data.outputs.length)

            self.data.lastAddedCount = self.data.outputs.length;
            sh.log.file('listWorkJSON', self.data.listWorkJSON);
            // return;

            /*
             var output = sh.each.collect(self.data.outputs, 'output')
             var old_output = sh.readJSONFile(self.data.listOutputJSON, [], true)
             output = old_output.concat(output)
             */

            //var output = sh.each.collect(self.data.outputs, 'output')
            var oldOutputItems = sh.readJSONFile(self.data.listOutputJSON, {}, true)
            var outputItems = oldOutputItems;
            sh.each.merge(self.data.outputs, oldOutputItems);
            // var count = sh.each.count(oldOutputItems)
            var outputItemList = sh.each.collect(oldOutputItems, 'output')
            //output = old_output.concat(output)

           // console.log(self.data.outputs)
            //sh.x()
            sh.each.number(outputItemList, 'i')

            if (outputItemList.length > 0) {
                sh.writeFile(self.data.listOutputCSV, sh.toCSV(outputItemList))
                sh.log.file('output list listOutputCSV', self.data.listOutputCSV);
            }

            self.proc('output item count', outputItemList.length)
            self.proc('how many files were successes?', sh.toPercent2(outputItemList,  self.data.files))


            var listItems = [];
            sh.each(outputItemList, function ok(k,v) {
                if ( v.tvMode ) {
                    var json = JSON.parse(v.epi)
                    listItems.push(json)
                }
            })
            sh.writeJSONFile(self.data.listOutputJSON, outputItems);
            sh.log.file(' listOutputJSON', self.data.listOutputJSON);

            var oldErrors = sh.readJSONFile(self.data.listOutputErrorsJSON, {}, true);
            sh.each.copyTo(self.data.errors, oldErrors)
            //  console.log(oldErrors)
            //  console.error(self.data.errors)
            //  asdf.g
            sh.writeJSONFile(self.data.listOutputErrorsJSON, oldErrors)

            var missingFiles = sh.each.getKeys(oldErrors)
            sh.writeFile(self.data.listOutputErrorsCSV, missingFiles.join('\n'))
            sh.log.file(' listOutputErrorsCSV', self.data.listOutputErrorsCSV);
            self.proc('missingFiles item count', missingFiles.length)
            sh.writeFile(self.data.listOutputDuplicatesCSV, self.data.dupeLeafs.join('\n'))

            var fs = require('fs');
            var list = sh.each.getKeys(self.data.errors);
            list.push('');
            var strList = list.join('\n');
            fs.appendFileSync(self.data.listOutputErrorsTxt, strList);


            //....

            //sh.toCol(self.data.listOutputJSON, 0 )
            //= sh.fs.moveTo(self.settings.fileList, fileOutputPremable, '.json')
            //sh.fs.mkdirp(self.data.listOutputCSV, true)

            //asdf.g
            // sd.ggg
            //sh.exit('what is fxdone', self.settings.fxDone)
            sh.callIfDefined(self.settings.fxDone, self.data, self);
            sh.callIfDefined(self.settings.fxDone2, self);
        }
    }

    defineSteps();

    function defineUtils() {
        p.utils = {};


        p.utils.filterFilesOnly = function filterFilesOnly(files) {
            var filteredFiles = [];
            sh.each(files, function removeFileIfNotValidVid(i, localFilePath) {
                if (sh.endsWith(localFilePath, '.txt')) {
                    return
                }
                if (sh.endsWith(localFilePath, '.srt')) {
                    return
                }
                if (sh.endsWith(localFilePath, '.nfo')) {
                    return
                }
                if (localFilePath == 'no episode info ') {
                    return
                }
                if (sh.includes(localFilePath, '.sample.')) {
                    return
                }

                var skipBc = null;
                var removeFileTypes = ['.icon', '.epub', '.pdf', '.ico', '.mobi',
                    '.jpg', '.png', '.htm', '.rar', '.xml',
                    '.smi']
                sh.each(removeFileTypes, function onFile(k, v) {
                    if (sh.endsWith(localFilePath, v)) {
                        skipBc = v
                        return false;
                    }
                });

                var removeFileTypes = ['.sample.', '-sample.']
                sh.each(removeFileTypes, function onFile(k, v) {
                    if (sh.includes(localFilePath, v)) {
                        skipBc = v
                        return false;
                    }
                });

                if (skipBc) {
                    return
                }


                var includeFileType = ['.mp4',
                    '.mkv', '.avi', '.m4v', '.wmv']
                var includesFileType = null
                sh.each(includeFileType, function onFile(k, fileExt) {
                    if (localFilePath.toLowerCase().endsWith(fileExt)) {
                        includesFileType = fileExt
                        return false;
                    }
                });

                if (includesFileType == null) {
                    return
                }
                var fifthCharFromEnd = localFilePath.slice(-5, -4)
                var fourth = localFilePath.slice(-4, -3)
                if (fifthCharFromEnd != '.' &&
                    fourth != '.') {
                    return; //not a standard file
                }
                filteredFiles.push(localFilePath)
            })
            var showRemovedItems = false;
            //showRemovedItems = true
            if (showRemovedItems) {
                sh.each(files, function showRemovedFiles(i, origfile) {
                    if (filteredFiles.indexOf(origfile) == -1) {
                        console.error(origfile)
                    }
                })
                process.exit()
            }
            var showIncludedItems = false;
            //showIncludedItems = true
            if (showIncludedItems) {
                sh.each(filteredFiles, function showAllIncludedFiles(i, origfile) {
                    // if ( i < 9000 )
                    console.log(i, origfile)
                })
                process.exit()
            }
            return filteredFiles;
        }

        p.utils.haveProcessedFilePreviously = function haveProcessedFilePreviously(localFilePath) {
            if (self.settings.resumeMode != false) {
                // debugger
                var foundB4 = self.data.work[localFilePath]

                //if (foundB4.)


                if (foundB4) {

                    var validItem = false
                    //console.log('ok', foundB4)
                    var isTV = foundB4.output.line.includes('root/movies') == false
                    if (isTV == false) {
                        //clear bad props
                        foundB4.tvMode = false;
                        foundB4.epi = null;
                        delete foundB4.epi;

                        var foundInOutput = self.data.outputs[localFilePath]
                        //console.log('foundInOutput', foundInOutput)

                        if (foundInOutput == null) { //copy to output
                            self.data.outputs[localFilePath] = foundB4
                        }
                        validItem = true;
                        //self.data.work = {}
                        // asdf.movie
                        //self.data
                    } else {
                        foundB4.tvMode = true;

                        if (sh.ifDoesNotHaveProp(foundB4.output, 'imdb_id2', 'did not process')) {
                            validItem = false;
                            console.log('>>>>> broken theng ...----', foundB4)
                            asdfg.g
                        } else {
                            var foundInOutput = self.data.outputs[localFilePath]
                            //console.log('foundInOutput', foundInOutput)

                            if (foundInOutput == null) {
                                self.data.outputs[localFilePath] = foundB4
                            }

                            validItem = true;
                        }

                    }


                    //debugger

                    if ( validItem ) {
                        self.data.count_previousSuccesses++
                        return true;
                    }
                }

               // asdf.g
                var foundError = self.data.errors[localFilePath]
                //self.data.count_previousSkipped++
                if (foundError) {
                    self.data.count_previousErrors++
                    return true;
                }


            }

            return false;
        }
    }

    defineUtils();

    p.test = function test(config) {
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

FileList_to_FullIndex_Workflow.testWorkflow = function testWorkflow(cfg, fxDone2) {
    sh.throwIfNull(cfg.fileList, 'only accept configs')
    var instance = new FileList_to_FullIndex_Workflow();
    var config = {};
    config = cfg;
    cfg.fxDone2 = function onTestRepeat(self) {
        if (config.repeat) {
            console.log('repeating', self.data.lastAddedCount, self.data.moreItems)
        }
        self.data.timer.getTime('since start on repeat')
       // self.data.timer.start()
        if (self.data.moreItems /*self.data.lastAddedCount > 0*/) {
            instance.runTestWorkflow()
            //instance.init(config)
        } else {
            sh.cid(fxDone2, self, instance)
        }
    }
    instance.init(config)
    return;

}

exports.FileList_to_FullIndex_Workflow = FileList_to_FullIndex_Workflow;
FileList_to_FullIndex_Workflow.basicTest = function basicTest(cfgMerge){


    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)

    // var fileOutput = sh.fs.makePath(dirTrash, 'output.txt')
    var fileListOfFiles = sh.fs.join(__dirname, 'testData', 'fileListTest.txt');
    var fileListOfFiles = 'G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___95.211.137.145_6024_.txt';
    var fileDlManifest = sh.fs.join(__dirname, 'testData', 'listIds_ls051393312-b.json');

    // var fileListOfFiles  = 'G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\tasks\\boodtylisttest-full.6.17.2017.output.pbVerified.json.output.breed.json'

    fileListOfFiles = 'G:/Dropbox/projects/crypto/mp/RCExt/supporting/trash/1921681169dmediadls.filelist.txt'
    var cfg = {}
    sh.merge(cfgMerge, cfg)

    cfg.fileList = fileListOfFiles
    //cfg.countMaxFiles = 10000
    cfg.countMaxFilesToSanitize_EachIteration = 10000
    cfg.countMaxFilesToSanitize_EachIteration = 1000
    cfg.countMaxFilesToExamine = 1000
    //cfg.countMaxFilesToSanitize_EachIteration = 1
    cfg.repeat = true
    //
    // cfg.countMaxFiles = 400
    //cfg.countOffset = 400
    FileList_to_FullIndex_Workflow.testWorkflow(cfg, function onDone(output) {
        //asdf.g
        console.log('testWorkflow', 'done', output)
        return;
        console.log('found how many?', output.foundCount);
        sh.throwIf(output.foundCount != 2, 'did not match write count of items');
    });
}
if (module.parent == null) {

    FileList_to_FullIndex_Workflow.basicTest()

}
//XO.runX();


//exports.BasicClass = BasicClass;

if (module.parent == null) {
    /*    var instance = new BasicClass();
     var config = {};
     instance.init(config)
     instance.test();*/
}
