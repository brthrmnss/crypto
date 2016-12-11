/**
 * Created by user on 7/24/15.
 */

/*
 Downloads the file from imdb_app_breed
 why: downloads a pre-compiled download list.
 */

var ritvConfigHelper = require('ritvHelpers');
var imdb_dl_app = require('./../imdb_dl_app').imdb_dl_app;
var sh = require('shelpers').shelpers;

if ( module.parent == null ) {


    var y = { dirDownload: '/media/sdb/incoming/downloads',
        throwErrorWhenQueryNotFound: false,
        deleteExtractedFiles: true,
        deleteDownloadedFiles: true,
        ignoreCookies: true,
        pbCategory: null,
        pbCategory2: null,
        dirCopyExtractedFilesTo: '/media/incoming/finished',
        dirRemoteMega: '/Root/query/hacking wireless/',
        '__why is dirRemoteMega being ignored? i standardized it ... but still very smislieading': '',
        ignoreDlCookie: true,
        outterSettings: { asdf: 'asdf' },
        __pbCategory: 207,
        __pbCategory2: 201,
        megaUsername: 'mhvodyob@sharklasers.com',
        megaPassword: '@jN3pW$U&qUvRt^D',
        putioUsername: 'trevmoreano',
        putioPassword: '12121212',
        minFreeSpaceGB: 0,
        dirFullExtractionDir: 'plaeset',
        showTransfersInfo: false,
        dirDownloadOthers: [
            '/media/incoming/downloads2'
        ],
        Why: 'verify downloads, but do not download',
        _checkForExistingFileOnMegaAcct: true,
        _checkForExistingFileOnMegaAcct_stop_gen_report: true,
        checkForExistingFileOnMegaAcct_stop_gen_report: false,
        checkForExistingFileOnMegaAcct: false,
        _bailBeforeDownload: true,
        skipTestMega: true,
        uploadToMega: false,
        fail_GetJSONLink: false,
        __skipDownload_EndAfterParsingList: true,
        dir_downloads:
            [ '/media/sda/finished',
                '/media/sdb/finished',
                '/media/sdc/finished',
                '/media/sdd/finished',
                '/media/psf/Home/incoming' ],
        dir_downloads_win: [ 'c:/media/dls', 'e:/media/dls', 'g:/media/dls', 'i:/media/dls' ],
        query: 'hacking wireless',
        name: 'hacking wireless' }




    var config = ritvConfigHelper.ritvHelpers.getConfig();
    // process.chdir('../');

    var defaultSettings = config.innerSettingsMixin;



    var CombineScript = require('./../../distillerv3/Step3_TDownloader.js').CombineScript;
    var instance = new CombineScript()


    var settingsObj = {};

    sh.copyProps(defaultSettings, settingsObj);

    settingsObj.checkForExistingFileOnMegaAcct =false;
    settingsObj.urlTorrent = 'magnet:?xt=urn:btih:07afbc5ca68e290cb79b98669908262f3eebe26a&dn=Jason+Derulo+-+Want+to+Want+Me+-+Single+%7BMP3-2015%7D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'
    settingsObj.deleteUnzipPrev =  true; 

    settingsObj.fxBail = function step3FxBailReceiver(msg ) {
        // token.msg = msg;
        // token.bailMsg = msg;
        //  options.fxBail(msg)
        console.log('test ok? ... verified mega', msg);
    }

    settingsObj.callback = function fxCallback(ok){
        console.log('test ok? ... verified mega', true);
        // self.verifiedMega = true;
        // cb();
    }

    settingsObj.query = 'jason derulo mp3';
    settingsObj.deleteDownloadedFiles = false
    settingsObj.deleteExtractedFiles = false
    settingsObj.stopAtUnZipError = true;
    settingsObj.skip_doNotCheckDownloadsEarly_alwaysPassIfExistingFile = true
    settingsObj.skip_doNotCheckDownloadsEarly_alwaysPassIfExistingFile = false
    //settingsObj.requestLogin =  "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 3.2 Final//EN\">\n<title>Redirecting...</title>\n<h1>Redirecting...</h1>\n<p>You should be redirected automatically to target URL: <a href=\"/your-files?\">/your-files?</a>.  If not click the link."
    transvsfer = {
        "status": "OK",
        "transfers": [
            {
                "availability": 68,
                "callback_url": null,
                "client_ip": null,
                "created_at": "2016-09-19T08:48:01",
                "created_torrent": false,
                "current_ratio": 3.18,
                "down_speed": 0,
                "download_id": 21622107,
                "downloaded": 1364073200,
                "error_message": null,
                "estimated_time": -1,
                "extract": false,
                "file_id": null,
                "finished_at": null,
                "id": 36850669,
                "is_private": false,
                "links": [],
                "name": "Fear The Walking Dead Season 2",
                "peers_connected": 59,
                "peers_getting_from_us": 3,
                "peers_sending_to_us": 8,
                "percent_done": 68,
                "save_parent_id": 0,
                "seconds_seeding": 0,
                "simulated": false,
                "size": 2001464566,
                "source": "magnet:?xt=urn:btih:8d01a5f97f187ae82370cfd8ac870a1a0a2f8ed0&dn=Fear+The+Walking+Dead+Season+2&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969",
                "status": "DOWNLOADING",
                "status_message": "\u2193 0.0 B/s, \u2191 3.9 K/s | 59 peers, 3 leechers |\n        downloaded: 1.3 G / 1.9 G, uploaded: 4.0 G | availability: 68%",
                "subscription_id": null,
                "torrent_link": "/v2/transfers/36850669/torrent",
                "tracker_message": null,
                "type": "TORRENT",
                "up_speed": 4000,
                "uploaded": 4339724450
            },
            {
                "availability": null,
                "callback_url": null,
                "client_ip": null,
                "created_at": "2016-09-24T14:12:42",
                "created_torrent": false,
                "current_ratio": 0.00,
                "down_speed": 0,
                "download_id": 21656532,
                "downloaded": 0,
                "error_message": null,
                "estimated_time": null,
                "extract": false,
                "file_id": 426122441,
                "finished_at": "2016-09-24T14:12:43",
                "id": 36927109,
                "is_private": false,
                "links": [],
                "name": "Jason Derulo - Want to Want Me - Single {MP3-2015}",
                "peers_connected": 0,
                "peers_getting_from_us": 0,
                "peers_sending_to_us": 0,
                "percent_done": 100,
                "save_parent_id": 0,
                "seconds_seeding": 0,
                "simulated": true,
                "size": 8440912,
                "source": "magnet:?xt=urn:btih:07afbc5ca68e290cb79b98669908262f3eebe26a&dn=Jason+Derulo+-+Want+to+Want+Me+-+Single+%7BMP3-2015%7D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969",
                "status": "COMPLETED",
                "status_message": "Completed 1 hour ago.",
                "subscription_id": null,
                "torrent_link": "/v2/transfers/36927109/torrent",
                "tracker_message": null,
                "type": "TORRENT",
                "up_speed": 0,
                "uploaded": 0
            }
        ]
    }

    settingsObj.token = { __pbCategory: 207,
        __pbCategory2: 201,
        megaUsername: 'mhvodyob@sharklasers.com',
        megaPassword: '@jN3pW$U&qUvRt^D',
        putioUsername: 'trevmoreano',
        putioPassword: '12121212',
        minFreeSpaceGB: 0,
        ignoreCookies: false,
        dirFullExtractionDir: 'plaeset',
        showTransfersInfo: false,
        dirCopyExtractedFilesTo: 'g:/media/dls/incoming/finished',
        dirDownload: 'g:/media/dls/incoming/downloads',
        dirDownloadOthers: [ '/media/incoming/downloads2' ],
        deleteDownloadedFiles: false,
        deleteExtractedFiles: false,
        Why: 'verify downloads, but do not download',
        _checkForExistingFileOnMegaAcct: true,
        _checkForExistingFileOnMegaAcct_stop_gen_report: true,
        checkForExistingFileOnMegaAcct_stop_gen_report: false,
        showConfigDoNotDownload: false,
        _bailBeforeDownload: true,
        skipTestMega: true,
        uploadToMega: false,
        fail_GetJSONLink: false,
        __skipDownload_EndAfterParsingList: true,
        dir_downloads: [ 'c:/media/dls', 'e:/media/dls', 'g:/media/dls', 'i:/media/dls' ],
        dir_downloads_win: [ 'c:/media/dls', 'e:/media/dls', 'g:/media/dls', 'i:/media/dls' ],
        checkForExistingFileOnMegaAcct: false,
        urlTorrent: 'magnet:?xt=urn:btih:07afbc5ca68e290cb79b98669908262f3eebe26a&dn=Jason+Derulo+-+Want+to+Want+Me+-+Single+%7BMP3-2015%7D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969',
        query: 'jason derulo mp3',
        //skip_doNotCheckDownloadsEarly_alwaysPassIfExistingFile: true,
        token: {},
        bail: false,
        test: undefined,
        urlMagnet: null,
        storeUploadInQuery: true,
        dirRemoteStorageInner: undefined,
        dirRemoteMega: 'media',
        extractFiles: true,
        dirExtractFiles: 'g:/media/dls/downloads/extractions',
        cmdMega: 'g:\\Dropbox\\projects\\crypto\\ritv\\distillerv3/megacmd',
        pbCategory: 0,
        pbMinSeederCount: 5,
        silentToken: true,
        dirOutput: 'g:/media/dls/incoming/finishedmedia',
        downloadFile: true,
        downloadFileDir: 'g:/media/dls/incoming/downloads',
        showFileList: false,
        showTransfers: undefined,
        match:
        { availability: null,
            callback_url: null,
            client_ip: null,
            created_at: '2016-09-24T14:12:42',
            created_torrent: false,
            current_ratio: 0,
            down_speed: 0,
            download_id: 21656532,
            downloaded: 0,
            error_message: null,
            estimated_time: null,
            extract: false,
            file_id: 426122441,
            finished_at: '2016-09-24T14:12:43',
            id: 36927109,
            is_private: false,
            links: [],
            name: 'Jason Derulo - Want to Want Me - Single {MP3-2015}',
            peers_connected: 0,
            peers_getting_from_us: 0,
            peers_sending_to_us: 0,
            percent_done: 100,
            save_parent_id: 0,
            seconds_seeding: 0,
            simulated: true,
            size: 8440912,
            source: 'magnet:?xt=urn:btih:07afbc5ca68e290cb79b98669908262f3eebe26a&dn=Jason+Derulo+-+Want+to+Want+Me+-+Single+%7BMP3-2015%7D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969',
            status: 'COMPLETED',
            status_message: 'Completed 1 hour ago.',
            subscription_id: null,
            torrent_link: '/v2/transfers/36927109/torrent',
            tracker_message: null,
            type: 'TORRENT',
            up_speed: 0,
            uploaded: 0 },
        settings:
        { downloadFile: true,
            downloadFileDir: 'g:/media/dls/incoming/downloads' },
        rewriteExisting: false,
        completedFileInLibrary:
        { availability: null,
            callback_url: null,
            client_ip: null,
            created_at: '2016-09-24T14:12:42',
            created_torrent: false,
            current_ratio: 0,
            down_speed: 0,
            download_id: 21656532,
            downloaded: 0,
            error_message: null,
            estimated_time: null,
            extract: false,
            file_id: 426122441,
            finished_at: '2016-09-24T14:12:43',
            id: 36927109,
            is_private: false,
            links: [],
            name: 'Jason Derulo - Want to Want Me - Single {MP3-2015}',
            peers_connected: 0,
            peers_getting_from_us: 0,
            peers_sending_to_us: 0,
            percent_done: 100,
            save_parent_id: 0,
            seconds_seeding: 0,
            simulated: true,
            size: 8440912,
            source: 'magnet:?xt=urn:btih:07afbc5ca68e290cb79b98669908262f3eebe26a&dn=Jason+Derulo+-+Want+to+Want+Me+-+Single+%7BMP3-2015%7D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969',
            status: 'COMPLETED',
            status_message: 'Completed 1 hour ago.',
            subscription_id: null,
            torrent_link: '/v2/transfers/36927109/torrent',
            tracker_message: null,
            type: 'TORRENT',
            up_speed: 0,
            uploaded: 0 },
        matchFileId: 426122441,
        finishedTransfer:
        { availability: null,
            callback_url: null,
            client_ip: null,
            created_at: '2016-09-24T14:12:42',
            created_torrent: false,
            current_ratio: 0,
            down_speed: 0,
            download_id: 21656532,
            downloaded: 0,
            error_message: null,
            estimated_time: null,
            extract: false,
            file_id: 426122441,
            finished_at: '2016-09-24T14:12:43',
            id: 36927109,
            is_private: false,
            links: [],
            name: 'Jason Derulo - Want to Want Me - Single {MP3-2015}',
            peers_connected: 0,
            peers_getting_from_us: 0,
            peers_sending_to_us: 0,
            percent_done: 100,
            save_parent_id: 0,
            seconds_seeding: 0,
            simulated: true,
            size: 8440912,
            source: 'magnet:?xt=urn:btih:07afbc5ca68e290cb79b98669908262f3eebe26a&dn=Jason+Derulo+-+Want+to+Want+Me+-+Single+%7BMP3-2015%7D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969',
            status: 'COMPLETED',
            status_message: 'Completed 1 hour ago.',
            subscription_id: null,
            torrent_link: '/v2/transfers/36927109/torrent',
            tracker_message: null,
            type: 'TORRENT',
            up_speed: 0,
            uploaded: 0 },
        urlDownload: 'https://s12.put.io/zipstream/4436042.zip?token=6da30856717811e6849a0aa4ff2eaa1d',
        contentDownloadName: '01 Want to Want Me.mp3.zip',
        contentFileSize: '8441054',
        pathDownload: 'g:/media/dls/incoming/downloads/01 Want to Want Me.mp3.zip' }

    

    settingsObj.token = null;

    instance.go(settingsObj)

}