var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


sh.each.print.values = function printOnlyValues(x) {
    var vals = [];
    sh.each(x, function (k,v) {
        vals.push(v)
    })
    //console.log(vals.join(', '))
    return vals.join(', ');
}

sh.CSVtoArray = // Return array of string values, or NULL if CSV string not well formed.
    function CSVtoArray(text) {
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        // Return NULL if input string is not well formed CSV string.
        if (!re_valid.test(text)) return null;
        var a = [];                     // Initialize array to receive values.
        text.replace(re_value, // "Walk" the string using replace with callback.
            function(m0, m1, m2, m3) {
                // Remove backslash from \' in single quoted values.
                if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
                // Remove backslash from \" in double quoted values.
                else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
                else if (m3 !== undefined) a.push(m3);
                return ''; // Return empty string.
            });
        // Handle special case of empty last value.
        if (/,\s*$/.test(text)) a.push('');
        return a;
    };



function JSONSet() {
    var p = JSONSet.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.getFiles();
    }

    p.getFiles = function getFiles() {
        var filename = sh.getFileName(self.settings.fileInput);
        var filename2 = sh.getFileNameOnly(filename);

        var dirOutput  = __dirname + '/' + 'output/'
        var fileWork = dirOutput  + filename;

        if ( self.settings.announce != false ) {
            self.proc(filename)
            self.proc(filename2)
        }

        self.data.fileInput = self.settings.fileInput;
        self.data.fileWork = fileWork + '.work.json';
        self.data.fileOutput = fileWork  + '.output.json';
        self.data.fileOutput2 = fileWork  + '.output2.json';

        self.data.fileOutputTemplate = fileWork  //why:: add files later

        sh.throwErrorIfFileNotFound = function throwErrorIfFileNotFound(file, msg) {
            msg = sh.dv(msg, '')
            if ( sh.fileExists( file ) == false ) {
                throw new Error(msg +  '  file not found: ' + file)
            }
        }

        sh.throwErrorIfFileNotFound(self.data.fileInput, 'inputFileNotFound')

        self.data.work = sh.fs.readJSONFile(self.data.fileWork ,{info:{},list:[]}, true )

        if ( self.settings.resetList )
            self.data.work.list = []; //always reset each time wtf ...


        if ( self.settings.fxGetItems) {
            //console.log('fxGetItems', self.settings)
            self.data.work.list = self.settings.fxGetItems(self.settings)
            if ( self.data.work.list == null ) {
                console.log('blank list')
                self.data.work.list = [];
            }
            /*     if (  self.settings.includeAllItems == true ) {
             adf.g.g
             self.data.work.list = [];
             self.proc('include all items')
             }
             */

            //asdf.g

        }



        //self.data.work.list = []; //why: force refresh
        if ( self.data.work.list.length == 0 ) {
            self.proc('list is emtpy, so grabbing from input file')
            if ( self.data.fileInput.indexOf('.csv') != -1 ) {
                var contents = sh.readFile(self.data.fileInput);
                var lines = contents.split('\n')
                var it = {};
                it.objs = [];
                sh.each(lines, function procLine(k,line) {
                    var fields = line.split(',')
                    var fields2 = sh.CSVtoArray(line)
                    if ( fields.length != fields2.length ) {
                        //    debugger;
                    }
                    fields=fields2
                    if ( line.trim() == '' )
                        return;
                    if  ( k == 0 ) {
                        it.columnNames = fields;
                        return;
                    }
                    var unquoted = []
                    sh.each(it.columnNames, function addCol(cI, colName) {
                        var fixed = colName
                        unquoted.push(sh.toCamelCase(sh.unquote(colName)))
                    })
                    it.columnNames = unquoted;
                    //console.error(k, line, fields)
                    var obj = {};




                    sh.each(it.columnNames, function addCol(cI, col) {
                        var val  = fields[cI];
                        val = sh.unquote(val);
                        obj[col] = val;
                    })
                    it.objs.push(obj);
                })
                self.proc('how many?', it.objs.length)
                //  sh.each.print(it.objs)
                // process.exit();
                self.data.work.list = it.objs;
            } else {
                self.data.work.list = sh.fs.readJSONFile(self.data.fileInput, null, false)
            }
        }

        if ( self.settings.inputIsOutput_doesNotFilter ) {
            //why: do not save file
            self.proc('processing output file as input')
            self.data.work.list = sh.fs.readJSONFile(self.data.fileOutput ,null, false )

        }


        // gfg.g
        //sh.fs.readJSONFile(self.data.fileOutput ,{list:[]}, true )

        self.index = 0;

        self.data.work.info.lastTouched = new Date();
        self.data.work.info[self.settings.fileIterator]=new Date();

        self.data.listFiltered = [];
        self.data.listMatched = []
        var IteratorClass = require(self.settings.fileIterator).IteratorClass;
        var inst = new IteratorClass();
        inst.runner = self;
        sh.callIfDefined(inst.init, self.settings)
        sh.async(self.data.work.list, function procEachItem(item, _fxDone) {


            if ( self.settings.fxPreProcess ) {
                item =
                    self.settings.fxPreProcess(item);
            }

            function fxDone(){
                if ( self.settings.delayEachInvocation != true  ) {
                    _fxDone();
                } else {
                    setTimeout(function delayForStackSizeExceede() {
                        _fxDone();
                    })
                }

            }
            function fxIteratorDone(json) {
                self.index ++;
                /*if ( json == null ) {
                 self.proc('remove item')
                 return
                 }*/
                /*if ( item.filetered != true  )
                 {
                 self.filteredItems
                 }*/
                if( item.filtered == true ) {
                    self.data.listMatched.push(item);
                    //asdf.g
                    // console.error('filtered', inst.name , sh.each.print.values(item) )
                    fxDone();
                    return;
                }

                sh.callIfDefined(inst.fxAddItem, item);
                self.data.listFiltered.push(item);
                item.index = self.data.listFiltered.length;
                fxDone();
            }

            inst.item = item;
            inst.fx = fxIteratorDone;
            inst.index = self.index;
            inst.runner = self;
            inst.utils2 = self.utils2;
            inst.fxCallback(item, fxIteratorDone, self.index, self)
        }, function allDone() {
            inst.runner = self;
            sh.callIfDefined(inst.fxDone)
            self.proc('what is length', self.data.listFiltered.length)

            // process.exit()

            self.finishedWriting()
        })
    }

    p.finishedWriting = function finishedWriting() {
        sh.each(self.data.listFiltered, function addIndexToList (k,v) {
            v.index = k;
        });
        sh.each(self.data.listMatched, function addIndexToList (k,v) {
            v.index = k;
        });
        if ( self.settings.inputIsOutput_doesNotFilter ) {
            //why: do not save file
            self.proc('not saving the output file again')
            sh.callIfDefined(self.settings.fxDone)
            //self.data.work.list = sh.fs.readJSONFile(self.data.fileOutput ,null, false )
            return;
        }
        if ( self.settings.storeOutputFileElsewhere ) {
            sh.fs.writeJSONFile(self.data.fileOutput2, self.data.listFiltered  )
            sh.callIfDefined(self.settings.fxDone)
            return;
        }
        //asdf.g
        if ( self.settings.announce != false ) {
            self.proc('...', 'finished')
        }

        var saveOutput = true;
        if ( self.settings.includeAllItems ){
            saveOutput = false;
        }

        if ( saveOutput ) {
            self.data.work.info.count = self.data.work.list.length;
            self.data.work.info.filterCount = self.data.listFiltered.length;
            sh.fs.writeJSONFile(self.data.fileWork, self.data.work)
            sh.fs.writeJSONFile(self.data.fileOutput, self.data.listFiltered)
        }
        sh.callIfDefined(self.settings.fxDone);
    }

    p.createAdditionalFile = function createAdditionalJSONFile(name, data) {
        var fileStore = self.data.fileOutputTemplate+'.'+name+''+'.json';
        //self.proc('...', 'finished')
        sh.fs.writeJSONFile(fileStore, data);
    }
    p.createAdditionalFlatFile = function createAdditionalFlatFile(name, data) {
        var fileStore = self.data.fileOutputTemplate+'.'+name+''+'.txt';
        //self.proc('...', 'finished')
        if ( sh.isArray(data)) {data = data.join("\n")};
        sh.writeFile(fileStore, data);
    }

    p.test = function test(config) {
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir+'/'+ file;
            return file;
        }

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
        var u2 = {};
        p.utils2 = u2;
        u2.sumArray = function sumArray(arr, prop, extratxt) {
            extratxt = sh.dv(extratxt, '')
            var amt = 0;
            sh.each(arr, function asdf(k,item) {
                amt += parseFloat(item[prop]);
            })
            amt = amt.toFixed(2)
            self.proc(extratxt, '$', amt)
            return amt;
        }

        u2.filterIfPropMatches = function filterIfPropMatches(item, validMatches, lookFor) {
            if ( sh.isAnyInAny(item.description,
                    validMatches)){
                return true;
                //item.filtered = true;
                //return item.filtered;
            }

            if ( sh.isAnyInAny(item.originalDescription,
                    validMatches)){
                return true;
            }

        }

        u2.percentageOfWorkList =
            function percentageOfWorkList(arr, extratxt, length_) {
                extratxt = sh.dv(extratxt, '')
                //console.error(extratxt, 't')

                var lengthTotal = sh.dv(length_, self.data.work.list.length)
                var percentage = sh.percent(
                    arr.length/lengthTotal

                )
                self.proc(extratxt, arr.length,
                    percentage
                )

                return percentage
            }

        u2.percentageOfTotal = function percentageOfTotal(arr, txt) {
            self.data.work.count
        }

    }
    defineUtils()
}

exports.JSONSet = JSONSet;

if (module.parent == null) {
    var instance = new JSONSet();
    var config = {};
    config.fileInput = 'G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/IMDB_App_Output/tv_series_top_250_num_votes,desc_1994,2017.json.dl.json.filtered.json';
    config.fileIterator = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/JSONSetTestIterator.js'
    instance.init(config)
    instance.test();
}


