var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var fs = require('fs');
var http = require("http");
var app = express();

var sh = require('shelpers').shelpers;
//var MergeEpub = require('./www/js/MergeEpub.js').MergeEpub;
//var JSONFileHelper = require('./www/js/JSONFileHelper').JSONFileHelper

console.log('change dir')
process.chdir(__dirname);

if (!String.prototype.includes) {
    String.prototype.includes = function () {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

var baseUrl = 'http://127.0.0.1:4444'
var request = require('request');
var querystring = require('querystring');

var request = require('request');

// UPLOAD FILES
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/')			// DESTINATION FILES
    },
    filename: function (req, file, cb) {
        if (typeof file === 'undefined')
            return;
        //var ext = file.originalname.split('.').pop();
        cb(null, file.originalname);
    }
});


var bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json


//http://127.0.0.1:8080/epub.html/150%20Best%20Mini%20Interior%20Ideas%20-%20Francesc%20Zamora.epub
var upload = multer({storage: storage});


// CORS middleware
var allowCrossDomain = function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

app.use(allowCrossDomain);


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.error('what...', 66)
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({storage: storage}).single('img_val');


app.post('/doUp2', function (req, res) {
    upload(req, res, function (err) {
        console.error('what...', 5, req.headers)
        if (err) {
            return res.end("Error uploading file.");
        }
        if (req.body.img_val) {
            var base64Data = req.body.img_val.replace(/^data:image\/png;base64,/, "");
            var base = 'x'
            if (req.body.name != null) {
                base = req.body.name;
            }
            var filename = base + '.png'
            var fileName = __dirname + '/' + 'uploads/' + filename
            console.log('write to', filename)
            require("fs").writeFileSync(fileName, base64Data, 'base64');

            //sh.writeFile(fileName, req.body.img_val, true, true)
        }
        if (req.file) {
            var filename = req.file.originalname// + '.png'
            if (req.body.name != null) {
                filename = req.body.name + '.png';
            }
            var fileName = __dirname + '/' + 'uploads/' + filename
            console.log('write to', filename)
            var fs = require('fs')
            encoding = 'binary'

            var contents = fs.readFileSync(req.file.path, encoding)//.toString()
            //fs.readFileSync
            require("fs").writeFileSync(fileName, contents, 'binary');


            fs.unlinkSync(req.file.path)


            //sh.writeFile(fileName, req.body.img_val, true, true)
        }
        res.end("File is uploaded");
    });
});


app.data = sh.dv(app.data, {})

//app.get("/saveToKey", onGetListOfArticles);

app.post("/saveToKey", on_saveToKey);

function on_saveToKey(req, res) {
    //why: show list of all articles
    var text = req.body.key;
    text += '.txt'
    var filename = __dirname + '/uploads/' + text
    var contents = req.body.data;
    sh.writeFile(filename, contents)
    res.send(txt)
}


app.get("/joinFiles", onJoinFiles);

function onJoinFiles(req, res) {
    //why: show list of all articles
    var dirUploads = __dirname + '/uploads/'
    var files = sh.fs.getFilesInDirectory(dirUploads, false, true, true, null, req.query.filterStr, true)
    var text = req.body.key;
    text += '.txt'
    var filename = __dirname + '/uploads/' + text
    var contents = req.body.data;
    sh.writeFile(filename, contents)
    res.send(txt)
}


function defineShelpers() {
    if (String.prototype.endsWith == null) {
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
    ;
}
defineShelpers()


sh.fs.exists = function fileExists(dir, error) {
    var fs = require("fs")
    var fileFound = fs.existsSync(dir)

    if (fileFound == false && error) {
        console.error('could not find ', dir, fileFound)
        sh.throw('notfound - ' + error)
    }
    return fileFound;
}
sh.fs.exists(__dirname + '/www', 'y u not have it?')
app.use(express.static(__dirname + '/www'));                 	// set the static files location /www/img will be /img for users
//app.use(express.static();
app.use('/uploads', express.static(__dirname + '/uploads'))
//app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', 'extended': 'true'}));

app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json


// GET FILE CONTENT
app.post('/readFile/:name', function (req, res) {

    console.log("body: " + JSON.stringify(req.body)); // form fields
    //console.log("query: "+JSON.stringify(req.query));
    //console.log("param: "+JSON.stringify(req.param));

    fs.readFile(__dirname + '/uploads/' + req.body['file_name'], function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.type('text/plain'); // set content-type
        return res.send(data);
    });

    //res.status(204).end();
});


// listen (start app with node Server.js) ======================================
var port = 12001
app.listen(port);
console.log("App listening on port", port);

function testReq() {
    var req = {}
    req.url = 'http://127.0.0.1:' + port + '/speak'
    req.method = 'POST'
    req.json = {}
    req.json.text = 'boo.'
    //return
    request(req, function onResponse(error, response, body) {
        if (!error && response.statusCode == 200) {
            //	console.log(body) // Show the HTML for the Google homepage.
        }
        //console.log("\n\n\n\n\n\n")
        console.log('->', 'logged', error)
        //console.error('result', error, body)
        testReq2();
    })

}

function testReq2() {
    var req = {}
    req.url = 'http://127.0.0.1:' + port + '/store_doc'
    req.method = 'GET'
    req.json = {};
    req.json.text = 'boo.';
    req.json.dir = 'C:/trash/epub/books/Shirtmaking_%20Developing%20Skills%20-%20David%20Coffin/book3.html';
    req.json.dir = 'Shirtmaking_%20Developing%20Skills%20-%20David%20Coffin'
    req.json.bookmark = 'booty booty'
    req.json.note = '';
    //return
    request(req, function onResponse(error, response, body) {
        if (!error && response.statusCode == 200) {
            //	console.log(body) // Show the HTML for the Google homepage.
        }
        //console.log("\n\n\n\n\n\n")
        console.log('->', 'logged', error);
        //console.error('result', error, body)
    })
}
//setTimeout(testReq, 1000)


function asdf() {
    var shelpers = require('shelpers');
    var EasyRemoteTester = shelpers.EasyRemoteTester;
    var sh = require('shelpers').shelpers;
    var shelpers = require('shelpers');

    var self = {};

    var EasyRemoteTester = shelpers.EasyRemoteTester;
    var baseUrl = 'http://127.0.0.1:' + port;
    var t = EasyRemoteTester.create('Test say basics', {showBody: false});
    var data = {};
    t.settings.baseUrl = baseUrl
    var urls = {};
    urls.notes = {};
    urls.testMemory = t.utils.createTestingUrl('testMemory')
    urls.play = t.utils.createTestingUrl('play')
    urls.stop = t.utils.createTestingUrl('stop')
    urls.joinFiles = t.utils.createTestingUrl('joinFiles')
    urls.saveToKey = t.utils.createTestingUrl('saveToKey')
    urls.doUp2 = t.utils.createTestingUrl('doUp2')
    //self.tests.t = t;

    //self.tests.urls = urls;

    // p.tests.uploadTestConfig = function uploadTestConfig(t2, fileTestConfigName, callX) {
    //var urls = self.tests.urls;
    //var fileTestConfigName = 'test_demoInnerScriptConfig3.json';
    /*
     var fileTestConfig = __dirname + '/' + 'testData/' + fileTestConfigName
     var fileConfigDest = __dirname + '/' + 'configs/' + fileTestConfigName
     if (sh.fs.exists(fileConfigDest)) {
     sh.deleteFile(fileConfigDest);
     }
     */

    var preamble = 'testSet1'
    var data = 'asdfasf'


    t.getR(urls.joinFiles).with({filterStr: preamble})
        .fxDone(function onDeleteFileAfterUpload() {
            console.log('...', '777')
            //  sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
        })

    return;

    t.postR(urls.saveToKey).with({key: preamble + 'test1.html', data: data})//.upload(fileTestConfig)
    //.bodyHas('status').notEmpty()
        .fxDone(function onDeleteFileAfterUpload() {
            console.log('...', '777')
            //  sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
        })
    t.postR(urls.saveToKey).with({key: preamble + 'testSet1.html', data: data})//.upload(fileTestConfig)
    //.bodyHas('status').notEmpty()
        .fxDone(function onDeleteFileAfterUpload() {
            console.log('...', '777')
            //  sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
        })


    var fileTestPic = __dirname + '/www' + '/' + 'PercentSign.png'
    t.postR(urls.doUp2).with({key: preamble + 'testSet1', data: data}).upload(fileTestPic, 'img_val')
    //.bodyHas('status').notEmpty()
        .fxDone(function onDeleteFileAfterUpload() {
            console.log('...', '777')
            //  sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
        })

    return


    t.getR(urls.saveToKey).with({key: preamble + 'cnn', data: data})//.upload(fileTestConfig)
    //.bodyHas('status').notEmpty()
        .fxDone(function onDeleteFileAfterUpload() {
            console.log('...', '777')
            //  sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
        })


    return;

    t.getR(urls.uploadPicture).with({name: 'test.png'}).upload(fileTestConfig)
    //.bodyHas('status').notEmpty()
        .fxDone(function onDeleteFileAfterUpload() {
            //  sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
        })


    t.getR(urls.combineFiles).with({wildcard: '*p'}).upload(fileTestConfig)
    //.bodyHas('status').notEmpty()
        .fxDone(function onDeleteFileAfterUpload() {
            //  sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
        })
    var makeFail = '';
    //makeFail = '35345
    var call = t2.getR(self.tests
        .urls.playCustom)
        .with({file: fileTestConfigName + makeFail, rate: 20})

    if (callX) {
        call.bodyHas('name').notEmpty();
    }
    //  }
}

asdf();

