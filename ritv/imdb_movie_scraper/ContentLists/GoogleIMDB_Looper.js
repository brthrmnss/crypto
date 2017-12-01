/*
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var request = require('request')
var EasyRemoteTester = shelpers.EasyRemoteTester;

function Looper() {
    var p = Looper.prototype;
    p = this;
    var self = this;

    self.settings = {}
    self.data = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.settings.output = sh.dv(self.settings.output, {});
        console.log(self.settings)
        sh.throwIfNull(self.settings.clazz, 'Provde a clazz')
    }

    p.runLoop = function runLoop(dataItemsList, fxDone) {
        self.data.fxDone2 = fxDone;

        var listOutput = [];
        self.data.progress = listOutput
        self.data.dataItemsList = dataItemsList

        var indexIteration = 0
        sh.async(dataItemsList, function onDownloadList(dataIteration, cb) {
                indexIteration++;
                self.data.indexIteration = indexIteration;
                console.log();
                console.log(':::', 'running', indexIteration);
                var instance = new self.settings.clazz();
                var config = {};
                self.utils.mergeIf(config, self.settings.configTemplate)

                config.fxDone = function onFinishedIteration(list) {

                    console.log(':::', indexIteration, 'finished')
//asdf.g

                    if (self.settings.output.joinArrays) {
///                        asdf.g
                        //instance[self.settings.prop](dataIteration)
                        listOutput = listOutput.concat(list)
                    } else {
                        listOutput.push(list)
                    }
                    self.data.progress = listOutput
                    cb()
                };

                sh.cid(self.settings.fxIteration);

                config.data = dataIteration;
                //  config.skipIfListExists = skipIfListExists;
                instance.init(config)

                sh.cid(self.settings.fxRunIteration, instance, config, self);
                sh.cid(self.settings.fxRun, instance, config, self);

                //files.push(instance)

                //console.log('config', config)
                //return;

                if (self.settings.prop) {
                    instance[self.settings.prop](dataIteration)
                }

            },
            function onDone_CombineInto1DlList() {

                if (self.settings.fxPostProcess) {
                    listOutput = sh.cid(self.settings.fxPostProcess, listOutput);
                }


                sh.cid(self.settings.fxDone, listOutput)
                sh.cid(self.data.fxDone2, listOutput)

            }
        )
    }


    function defineUtils() {
        p.utils = {};
        p.utils.mergeIf = function mergeIf(cfgReal, cfgTemplate) {


            if (cfgTemplate == null) return;
            sh.merge(cfgTemplate, cfgReal)
            return;


        }

        p.utils.doesFileExist = function doesFileExist(file, dir, msg) {
            var file2 = dir + '/' + file;
            var file3 = sh.fs.resolve(file2)
            self.proc('does exist', file3, msg)
            if (sh.fileExists(file3)) {
                return file3;
            }
            return false;
        }
    }

    defineUtils()

    p.test = function test() {
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.Looper = Looper;
var dirScript = 'ritv/imdb_movie_scraper/' +
    'wrappers/imdb_app_v3_wrapper.js'
var ConvertXToIMDB_PB_List = sh.require(dirScript).ConvertXToIMDB_PB_List

console.log(exports.reloadAny, module.parent)
if (module.parent == null || exports.reloadAny) {

    var i = new Looper();
    var config = {}
    config.fxDone = function onTestComplete(list, data) {
        console.log('test complete', list.length)


        var skipIfListExists = true;

        var fileListOutputName = 'boodtylisttest.6.17.2017'
        var fileListOutputName = 'boodtylisttest-full.6.17.2017'
        var listIds = sh.each.collect(list, 'listId')


        console.log('boo', listIds)
        config.looperCfg = ConvertXToIMDB_PB_List.downloadLists(listIds,
            skipIfListExists, fileListOutputName,
            function onSaved(file) {
                console.log(file, '...')
                sh.log.file(file)
            })


    }

    var lineCount = 0
    var fxOld = console.log; //
    console.log = function () {
        var args = sh.args(arguments)
        lineCount++
        //fxOld('...', args)
    }


    setInterval(function howLins() {

        var debugStr = sh.toNull(config.looperCfg, 'files', 'length'); //.files.length
        //var queryDbgStr = sh.toNull(item.query, 'length')
        fxOld('lines', lineCount, i.data.indexIteration,
            i.data.progress.length, i.data.dataItemsList.length, 'length',
            debugStr,
            sh.percent(debugStr / i.data.progress.length))
        // fxOld('loop', config.looperCfg)
        //self.data.progress
    }, 5000)

    config.clazz = sh.require2(__dirname, 'GoogleIMDBListRipper').GoogleIMDBListRipper

    config.prop = 'searchGoogle'

    config.output = {};
    config.output.joinArrays = true

    var itConfig = {}
    itConfig.pages = 3
    config.configTemplate = itConfig; // = 3

    config.fxPostProcess = function fxPost(list) {

        var listFiltered = []
        sh.each(list, function onV(k, v) {
            v.name = sh.getContentBefore(v.name, ' - a list')

            if (v.listId == 'ls076553273') {
                //asdf.g
                return
            }
            if (v.listId == null) {
                console.error(v.listId, '...', 'no id', v)
                return;
            }
            v.listId = sh.getContentBefore(v.listId, '%')

            console.log(sh.t, k, '', v.name, v.listId)
            listFiltered.push(v)
        })

        return listFiltered;

    }


    config.pages = 3;

    config.pages = 1;
    i.init(config)
//i.searchBookzz('crimson moon')
//i.searchBookzz('ddddBeneath A Crimson Moon Michels Christine')
    var items = [
        // 'horror films',
        //   'reddit',
        'romance',
        'romantic',
        'uk',
        'party',
        'youth',
        'gangster',
        'hip hop',
        'date',
        'sports',
        'commedy',
        'funny',
        'nominated',
        'female',
        'male',
        'nigerian',
        'bollywood',

        'choice',
        'emmy',
        'oscar',

        'cannes',

        'war',
        'epic',
        'sad',
        'inspirational',
        'space',
        'sci fi',
        'space opera',
        'hard sci',
        'tear',
        'angry',
        'girl',
        'boy',
        'nerd',
        'international',
        'rich',
        'sex', 'sexy', 'horny',
        'business',
        'foreign', 'chinese', 'russian',
        'african',
        'latin',
        'spanish',
        '90', '70', '80', '2000', '201',
        'relationship',
        'anime',
        'nightmare',
        'classic',
        'scary',
    ]
    i.runLoop(items); //'horror films')
//i.launchSupportingTools();
}

//director site:imdb.com/list


//sh.reload.reloadFile(__filename)

//console.log('boo')

//exports.IMDBContentList = IMDBContentList;

