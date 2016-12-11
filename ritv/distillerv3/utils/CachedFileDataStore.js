var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function CachedFileDataStore() {
    var p = CachedFileDataStore.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        config.dir = sh.dv(config.dir, 'cachedRequests')
        config.cachedTime = sh.dv(config.cachedTime, null)//14*sh.time.days )
        self.method();
    }

    p.method = function method(config) {
    }

    p.test = function test(config) {
        p.clear('thing.json')
        p.get('thing.json')
        var contents = 'asdfasdf'
        p.set('thing.json', contents)
        p.get('thing.json') == contents
        var same = p.get('thing.json') == contents
        console.error('the same', same)

        var contents2 = 'asdfasdf'
        p.set('thing.json', contents2)
        var same = p.get('thing.json') == contents2
        console.error('the same', same)


        p.clear('thing.json')
        var same = p.get('thing.json') == null
        console.error('the same', same)


        var contents2 = 'asdfasdf'
        var file2= 'thing3.json'
        p.set(file2, contents2)
        var same = p.get(file2) == contents2
        self.settings.cachedTime = 100
        self.settings.cachedTime = -1
        console.error('the same')

        setTimeout(function onTryLater () {
            p.set(file2, contents2)
            var same = p.get(file2) == null
            if ( same != true )
                    console.error('the same', 'did not time out')
        },3000)
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };

    p.set = function setDataStoreValue(file, contents) {
        //var file = self.settings.dir+'/'+ file;
        var file = self.utils.getFilePath(file);
        sh.mkdirp(self.settings.dir);
        sh.writeFile(file, contents);
    }

    p.clear = function setDataStoreValue(file, contents) {
        var file = self.utils.getFilePath(file);
        sh.deleteFile(file, true);
    }

    p.get = function getDataStoreValue(key) {
        var file = self.settings.dir+'/'+ key;


        if ( sh.fileExists(file) == false ) { //skip downloalding torrent again
            return null;
        };


        if ( self.settings.cachedTime != null ) {
            if ( sh.fs.isFileOrderThanAgoMS(file, self.settings.cachedTime) ) {
                self.proc('aged out on file')
                return null;
            }
        }

        return sh.readFile(file);
    }

    p.readTorrent = function readTorrent() {

    }
    p.searchPB = function searchPB_redirect(opts) {
        var torrentFileName = it.getTorrentFileName(opts);

        if ( sh.fileExists(torrentFileName)) { //skip downloalding torrent again
            var oldTorrentJSON = sh.readJSONFile(torrentFileName);
            if (oldTorrentJSON) {
                sh.mergeObjectsForce(oldTorrentJSON, json);
                return true;
            };
        };

        //TODO: Make a check that will enable overriding of values
        if ( opts.pbCategory2 != null ) { //try to find 2nd category
            var origPbCategory = opts.pbCategory;
            opts.pbCategory = opts.pbCategory2;
            var torrentFileName = it.getTorrentFileName(opts);
            if ( sh.fileExists(torrentFileName)) {
                var oldTorrentJSON = sh.readJSONFile(torrentFileName);
                if (oldTorrentJSON) {
                    sh.mergeObjectsForce(oldTorrentJSON, json);
                    //fxDone();
                    return true;
                }
            };
            opts.pbCategory = origPbCategory;
        }
        if ( json.urlTorrentNotFound === true) {
            //fxDone();
            return true; //skip if could not find torrent last time
        };
        opts.stopWhen1Found = true;
        opts.list = [];
        opts.list = [opts.query];
        if ( json.queriesAlternates ) {
            opts.list = [];

            sh.each(json.queriesAlternates,  function add720(k,v) {
                opts.list.push(v + ' ' + 'q:hdtv')
            });

            opts.list = opts.list.concat(json.queriesAlternates);

        };
        //try to read file
        it.pirateBaySearcher.go(opts)
        return false;
    }



    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir+'/'+ file;
            return file;
        }
    }
    defineUtils()


}

exports.CachedFileDataStore = CachedFileDataStore;

if (module.parent == null) {
    var instance = new CachedFileDataStore();
    var config = {};
    instance.init(config)
    instance.test();

}



