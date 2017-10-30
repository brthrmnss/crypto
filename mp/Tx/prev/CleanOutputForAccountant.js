
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var columnify = require('columnify')

function BasicClass3() {
    var p = BasicClass3.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;



        self.method();
    }

    p.method = function method() {
        var contents = sh.readFile(self.settings.file)
        var cfgContent = {}
        cfgContent.noCamel = true;
        var csvRows = sh.convertCSV(contents, cfgContent)
        var cfg = {}
        cfg.columnSplitter = ',';

        sh.fxPassThrough = function () {
            var args = sh.args(arguments)
            var str = args.join('');
          //  console.log('ok', str)
            if ( str.includes(',') ) {
                str = sh.qq(str)
            }

            return str
        }

        sh.fxPassThrough2 = function (cell) {
            var args = sh.args(arguments)
            var str = cell
            console.log('ok', str)
            if ( str.includes(',') ) {
                str = sh.qq(str)
            }

            return str
        }
        cfg.headingTransform = sh.fxPassThrough;
        cfg.dataTransform = sh.fxPassThrough2;
       // console.log(csvRows)
        var keys = sh.each.getKeys(csvRows[0])
        console.log(keys)
        sortedColumnNames = [ 'NAME',
            'SUM',
            'LENGTH',
            'PER$',
            'DATE',
            'DESCRIPTION',
            'ORIGINALDESCRIPTION',
            'AMOUNT',

            'CATEGORY',
            'PEACHTREEACCT',
            'debug',

            'WHY',
            'PERCCOUNT',
            'ITEMCOUNT',

            'ACCOUNTNAME',
            'LABELS',
            'NOTES',
            'INDEX',

            'TRANSACTIONTYPE',
            ];
        cfg.columns = sortedColumnNames
        var columns = columnify(csvRows, cfg);

        var fileOutput = sh.fs.changeFilename(self.settings.file, 'final_output_for_accountant.csv')
        sh.writeFile(fileOutput, columns)

        sh.log.file(fileOutput)
       // console.log(columns)
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
    }
    defineUtils()
}

exports.BasicClass3 = BasicClass3;

if (module.parent == null) {
    var instance = new BasicClass3();
    var config = {};
    config.file = 'G:/Dropbox/projects/crypto/mp/Tx/prev/output/mint 2014.csv.final_output_filtered.csvoutput_for_accountant.csv'
    instance.init(config)
    instance.test();
}



