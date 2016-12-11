var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var SearchPB = require('./../../distillerv3/utils/SearchKT').SearchPB
var SearchPB_Test = require('./../../distillerv3/utils/SearchKT_Test').SearchKT_Test



function SearchPBAutomator() {
    var p = SearchPBAutomator.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.method(); 
    }

    p.method = function method(config) {

        var dlEntryList = sh.readJSONFile('searchPBTestFiles/'+'test_file.json')

        var count = 0;
        sh.async(dlEntryList,
            function getTorrentLinkFor(json, _fxDone) {
                count++;
                if ( count % 25 == 0 ) {
                    // asdf.g
                    self.proc(count, sh.percent(count/dlEntryList.length))
                  //  updateDLFile();
                }
                var it = {}
                it._fxDone = _fxDone;
                function fxDone_onGotTorrentLink() {
                    // setTimeout(function () {
                    if (json.query.indexOf(' Broke Girls S05E20') != -1 ){
                        debugger;
                    }
                    self.proc('completed', json.query)

                    if ( foundTorrents.indexOf(json.urlTorrent) != -1 ) {
                        json.urlTorrent = 'skip_duplicate'
                        json.size = 0
                    } else {
                        foundTorrents.push(json.urlTorrent)
                    };

                    if ( json.urlTorrent == null ) {
                        notFound.push(json.query)
                    }
                    var dlSize = parseInt(json.size)
                    if (!isNaN(dlSize)) {
                        //console.log(dlSize)
                        size += dlSize;
                    }


                    it._fxDone();
                    it._fxDone = null;


                    //  }, 1)

                }
                self.proc('start', json.query);
                SearchPB.searchPBQuick(json, function (result) {
                    fxDone_onGotTorrentLink(result)
                } )

                //self.getPB(json, );
            },
            function doneUploadingFiles() {
                console.log('done upload files ')

                updateDLFile()

                onStepFinished_doneGettingTorrentLinks();



                self.proc('size', size, 'GB')
                console.error('not found', notFound)
            }
        )

        return;
    }

    p.test = function test(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.SearchPBAutomator = SearchPBAutomator;

if (module.parent == null) {
    var instance = new SearchPBAutomator();
    var config = {};
    instance.init(config)
    instance.test();
}



