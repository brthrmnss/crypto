var fs = require('fs');
var path = require('path');
var url = require('url');
var express = require('express')
var exec = require("child_process").exec;
var https = require('https');
//var sh = require('./public/shelpers').shelpers;
var sh = require ('shelpers').shelpers
var open = require('open')

function JenkinsLoggingHelper(results) {
    var p = JenkinsLoggingHelper.prototype;
    var self = this;
    self.results = results;

    this.addTimeout = function addTimeout(id, url) {
        self.results[id]=url; //{url:url, id:id}
        url.status = 'timeout'
    }

}
function TestRunnerServer(settingsOverride) {

    var p = TestRunnerServer.prototype;
    var self = this;


    self.settings = {}
    self.testResults = {}

    //pass in test results (logging should contain allreasults)
    self.logging = new JenkinsLoggingHelper(self.testResults)
    self.repeatedTests = {}
    self.testCompleteCallback = null //set to recieve ifnormation on test passing

// This line is from the Node.js HTTPS documentation.
    var options = {
        key: fs.readFileSync('public/agent2-key.pem'),
        cert: fs.readFileSync('public/agent2-cert.pem')
    };

// Create an HTTPS service identical to the HTTP service.

    var jumpboxProperties = {}
    jumpboxProperties.jumpboxURL = 'http://dev-d-20m76.paychex.com/'
    jumpboxProperties.startSocket = true;

    jumpboxProperties.startSocket

    if (settingsOverride) {
        jumpboxProperties = settingsOverride;
        self.settings = settingsOverride
    }


    if (self.settings != null && self.settings.converterSettings == null) {
        self.settings.converterSettings = {silent: true} //turn off verbose logging by default
    }

    var FlexMonkeyCSVtoJSONConverter = require('./tests/json/convertCSVtoJSON').FlexMonkeyCSVtoJSONConverter;

    //if ( testMode != true ) {
    //    jumpboxProperties.startSocket = false;
    //}
    // if ( true !=  testMode ) {

    //}
    var app = express();

    if (jumpboxProperties.startSocket) {
        https.createServer(options, app).listen(3011); //what's this server for?
        var app2 = require('http').createServer(handler)
        var io = require('socket.io').listen(app2)
        app2.listen(3002);
    }
    var BookendConstants = {}
    BookendConstants.ACTION_TEST_STATUS = 'ACTION_TEST_STATUS'
    BookendConstants.ACTION_END_TEST = 'ACTION_END_TEST'


    function handler(req, res) {
        fs.readFile(__dirname + '/index.html',
            function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }
                res.writeHead(200);
                res.end(data);
            });
    }

    var appSocket = null

    if (jumpboxProperties.startSocket) {
        io.sockets.on('connection', function (socket) {
            appSocket = socket;
            socket.emit('news', { hello: 'world' });
            socket.on('my other event', function (data) {
                console.log(data);
            });
        });
    }

    app.use(express.bodyParser());

    app.get('/', function (req, res) {
        res.send('Hello World');
    });


    var url = process.argv[2];
    if (url == "''") {
        url = null
    }
    console.log(url);

    var arguments = process.argv.splice(2);

//arg 2 is the port number, default is 3001
    self.settings.serverPortNumber = sh.defaultValue(self.settings.serverPortNumber, 3001);
    console.log('starting server on port', self.settings.serverPortNumber)
    //return;
    //console.log('serverPort', serverPortNumber)

    var open = require('open', 'internet explorer');
    if (url != null && url != '') {
        url = url.replace(/\\/g, '/')
        open(url);
    }
    var openController = arguments[2]
    if (self.settings.openController == 'true') {
        var urlContrller = 'http://localhost:' + self.settings.serverPortNumber + '/test_controller.html?port=' + self.settings.serverPortNumber
        open(urlContrller);
    }
    var time = new Date()
    time = (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getFullYear() + ' ' + (time.getHours() + 1) + '-' + time.getMinutes() + '-' + time.getSeconds().toString();

    function getTimeStamp() {
        var str = "";

        var currentTime = new Date()
        var hours = currentTime.getHours()
        var minutes = currentTime.getMinutes()
        var seconds = currentTime.getSeconds()

        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        str += hours + "_" + minutes + "_" + seconds// + " ";
        //(time.getMonth() + 1)+'-'+time.getDate()+'-'+time.getFullYear()+' '+(time.getHours()+1)+'-'+time.getMinutes()+'-'+time.getSeconds().toString();
        str = (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + '-' + currentTime.getFullYear() + '_' + str;

        /* if(hours > 11){
         str += "PM"
         } else {
         str += "AM"
         }*/
        return str;
    }


    /**
     * The id is randomly generated
     * the UserGenId is set manually.
     * if userGenId is set, we will try that manually...
     * @param id
     * @param userGenId
     * @returns {*}
     */
    function setIdBasedOnUserGenId(id, userGenId) {
        return id;
        if (userGenId != null && userGenId != '') {
            return userGendId
        }
        return id;
    }

    var log = "";

    app.get('/crossdomain.xml', function (req, res) {
        var xml = '<?xml version=\"1.0\"?>  <!DOCTYPE cross-domain-policy SYSTEM \"http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd\"> <cross-domain-policy>' +
            ' <allow-access-from domain=\"*\" />' +
            '</cross-domain-policy> '
        res.send(xml);
    });

    app.get('/eval_as3', function (req, res) {
        console.log('Starting');

        var directory = '';
        var url = require('url');
        var url_variables_query = url.parse(req.url, true).query;

        if (url_variables_query.file != null)
            directory = url_variables_query.file;


        var prettyPrint = false
        //pretty print
        if (url_variables_query.pp != null)
            prettyPrint = url_variables_query.pp;

        console.log('Request:.', 'compile_from_directory', directory, fs.existsSync(directory))
        console.log('Request:.',[  'localhost:',
            self.settings.serverPortNumber, '/',
            'eval_as3', '?file=', directory, '&pp=true' ].join(''))

        //res.end('no')
        //return;
        if (directory == 'any') {
            console.log('any')
            var converter = new FlexMonkeyCSVtoJSONConverter();
            var json = converter.convert(path.join(__dirname + '/tests/json', 'test.csv'))
            var json = converter.convert(path.join(__dirname + '/tests/json', 'qlTest.csv'))
            res.send(json);
            res.end()
            return json;
        }
        console.log('---')
        var error = {error: 'unspecified'}
        if (directory.indexOf('.csv') != -1 || directory.indexOf('.xlsx') != -1) {
            console.log('json test')

            //if ( sh.isAbsPath(directory))

            if (fs.existsSync(directory) == false) {
                error.message = 'bad file input'
                res.send(error);
                res.end()
                return
            }

            var converter = new FlexMonkeyCSVtoJSONConverter();
            if (self.settings != null && self.settings.converterSettings) {
                converter.settings = self.settings.converterSettings;
            }
            function sendConvertedJsonTestResult(json) {

                if (url_variables_query.pp) {
                    var parsed = JSON.parse(json)
                    json = sh.toHTMLStr(sh.toJSONString(parsed))
                }
                res.send(json);
                res.end()
                return json;
            }

            var json = converter.convert(directory, sendConvertedJsonTestResult)
            return;
        }

        console.log('exec ruby')
        exec('ruby compile_from_directory.rb ' + directory, function (err, stdout, stderr) {
            console.log(stdout);

            if (err != null) {
                console.log("could not compile that test b/c")
                console.log(err, stderr)
                res.end()
                return;
            }

            var fileSystem = require('fs');
            var path = require('path');

            var filePath = path.join(__dirname, '/output/test.swf');
            res.download(filePath);
            console.log("Sent swf: " + filePath);
        });

    });
    app.post('/bookendtest', function (req, res) {
        var action = req.body.action
        var id = req.body.TEST_EXEC_ID;
        var userGenId = req.body.TEST_USER_GEN_ID;
        id = setIdBasedOnUserGenId(id, userGenId)
        var currentTest = self.testResults[id];

        if (!fs.existsSync(path.join(__dirname, '/logs'))) {
            fs.mkdir(path.join(__dirname, '/logs'));
        }

        if (action == BookendConstants.ACTION_TEST_STATUS) {
            console.log("/bookendtest:", action);
        } else {
            console.log("/bookendtest: ", req.query, req.body);
        }


        if (appSocket) {
            appSocket.emit('news', req.body);
        }
        //var filePath = path.join(__dirname, '/logs/' + time + '.txt');
        if (req.body.action === 'ACTION_START_TEST_PROCESSING') {

            self.testResults[id] = {}
            self.testResults[id].screenshots = [];
            if (appSocket) {
                appSocket.emit('news', { hello: 'start' });
            }
            log = ''
            /*fs.writeFile(filePath, "", function(err) {
             if(err) {
             console.log(err);
             }
             });*/
        } else if (req.body.action === BookendConstants.ACTION_END_TEST) {
            //write file
            var json = {}
            json.commands = req.body.commands
            console.log()
            console.log(json.commands)
            console.log()
            json.name = req.body.test_name
            json.testDesc = req.body.testDesc
            currentTest.name = req.body.test_name
            try {
                currentTest.testDesc = JSON.parse(req.body.testDesc)
            } catch (e) {
            }
            var str = JSON.stringify(json)

            var testName = req.body.test_name
            testName = testName.replace(/[^a-zA-Z0-9_-]/g, '_');
            var filePath = path.join(__dirname, '/logs/test_log_' + testName + getTimeStamp() + '.txt');

            sh.writeFile(filePath, str)


            var sentCommands = JSON.parse(json.commands)
            var commands = [];
            for (var c in sentCommands) {
                var command = sentCommands[c]
                var copy = {}
                copy.shortDescription = command.shortDescription
                copy.name = command.name
                copy.commandDuration = command.commandDuration
                copy.description = command.description
                try {
                    var jsonObj = command.jsonObj
                    copy.lineNumber = jsonObj.lineNumber;
                } catch (e) {
                }
                commands.push(copy)
            }
            str = JSON.stringify(commands, null, "\t")

            console.log(
                str
            )

            var filePath = path.join(__dirname, '/logs/test_log_quick_' + testName + getTimeStamp() + '.txt');
            sh.writeFile(filePath, str)
            if (self.settings.showTimingsPageAfterTests) {
                open(filePath, 'firefox')
            }

            currentTest.commands = commands;
            //currentTest.commands = commands;
            currentTest.error = req.body.error;
            if (currentTest.error == 'null') {
                currentTest.error = null;
            }

            var previousRuns = self.repeatedTests[testName]
            if (previousRuns == null) {
                previousRuns = []
            }
            self.repeatedTests[testName] = previousRuns
            previousRuns.push(currentTest)

            if (self.testCompleteCallback != null) {
                self.testCompleteCallback(id, userGenId, testName, currentTest)
            }

        } else if (req.body.action === 'ACTION_END_TEST_PROCESSING') {


            if (appSocket) {
                appSocket.emit('news', { hello: 'end' });
            }
            var testFile = req.body.testFile;
            var count = req.body.count;
            testFile = testFile.replace(/[^a-zA-Z0-9_-]/g, '');
            var filePath = path.join(__dirname, '/logs/log_' + testFile + getTimeStamp() + '.txt');
            log = log + "\n" + JSON.stringify(req.body);
            log = log
                + "\n" + req.body.memory
            currentTest.memory = req.body.memory;
            fs.writeFile(filePath, log, function (err) {

                if (err) {
                    console.log(err);
                } else {
                    console.log("The log file was saved!");
                    if (url != null && url != '') {
                        if (self.settings.exitAfterLogging != false) {
                            process.exit();
                        }
                    }
                }
            });

            //dump pictures
            if (currentTest != null) {
                var screenshots = currentTest.screenshots
                console.log('making images for', currentTest.screenshots)

                if (screenshots.length == 0) {
                    'no screenshots'
                    res.end()
                    return;
                } else {
                    var scrreenshotsFile = path.join(__dirname, '/logs/screenshots_' + testFile + getTimeStamp() + '.html');
                    self.storeScreenshots(screenshots, scrreenshotsFile)
                }
            }
        }

        res.end()
    });


    self.storeScreenshots = function storeScreenshots(screenshots, fileNamePath) {
        console.log('making images for', screenshots)
        if (screenshots.length == 0) {
            'no screenshots'
            return;
        }
        var htmlContent = ''
        sh.each(screenshots, function (key, value) {
            var fileNAme = sh.getFileName(value)
            var br = '<br />'
            htmlContent += '<b>' + (key + 1) + '.</b> '
            var css = "style='border:1px solid #000000'"
            htmlContent += '<b>' + fileNAme + '</b>' + ':<br />' + '<img src="' + fileNAme + '" alt="some_text" ' + css + '>' + '<br/><br/>' + br + br + br + br + br
        });
        var html = ''
        html = sh.readFile('public/screenshotsTemplate.html')
        html = html.replace(/PICCONTENT/gi, htmlContent)
        //sh.makePathIfDoesNotExist(fileNamePath)
        sh.writeFile(fileNamePath, html);
    }

    app.post('/log_to_console', function (req, res) {
        console.log("/log_to_console: ", req.query, req.body);
        log = log + req.body.console.toString() + "\n";
        res.end()
    });

    app.post('/timings', function (req, res) {
        console.log("/timings: ", req.query, req.body);
        var testFile = req.body.testFile;
        var count = req.body.count;
        testFile = testFile.replace(/[^a-zA-Z0-9_-]/g, '');
        var filePath = path.join(__dirname, '/logs/timings_' + testFile + getTimeStamp() + '_' + count + '.xml');
        fs.writeFile(filePath, req.body.timings, function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.end()
    });


    app.get('/get_app_startup_data', function (req, res) {
        console.log("/timings: ", req.query, req.body);
        var testFile = req.body.testFile;
        var count = req.body.count;
        testFile = testFile.replace(/[^a-zA-Z0-9_-]/g, '');
        var filePath = path.join(__dirname, '/logs/timings_' + testFile + getTimeStamp() + '_' + count + '.xml');
        fs.writeFile(filePath, req.body.timings, function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.end()
    });

    /*

     app.get('/shelpers.js', function  shelpers(req, res) {
     console.log("/timings: ", req.query, req.body);
     var filePath = "C:\\Users\\user1\\Dropbox\\projects\\crypto\\proxy\\helpers\\shelpers.js"

     var content = null
     if ( fs.existsSync(filePath)) {
     content = fs.readFileSync(filePath,  'utf-8');
     } else {
     content = fs.readFileSync('shelpers.js',  'utf-8');
     }
     //res.write(content)
     res.writeHead(200);
     res.end(content);
     });

     */


    app.get('/model', function (req, res) {
        console.log("/model: ", req.query, req.body);
        var dir_tests = __dirname + '/tests';
        console.log('model', dir_tests);
        var model = {g: 'g'}

        var walk = require('walk');
        var files = [];

        var environments = []

        function makeEnv(name, url) {
            return {name: name, url: url}
        }

        environments.push(makeEnv('N', 'https://myappsimpn.paychex.com/'))
        environments.push(makeEnv('N1', 'https://myappsimpn.paychex.com/'))
        environments.push(makeEnv('DevShare3.', 'http://vcmyapps.paychex.com/'))
        environments.push(makeEnv('Other', '...'))
        model.environments = environments;


// Walker options
        var walker = walk.walk(dir_tests, { followLinks: false });

        walker.on('file', function (root, stat, next) {
            // Add this file to the list of files
            files.push(root + '/' + stat.name);
            next();
        });

        walker.on('end', function () {
            console.log(files);

            model.files = files


            model = JSON.stringify(model)
            res.send(model)
            res.end()
        });


    });

    function getFileNameFromPath(file) {
        if (file == null) {
            return null
        }
        var split = null;
        if (file.indexOf('/') == -1) {
            var split = file.split('\\')
        } else {
            var split = file.split('/')
        }
        var file = split.slice(-1)
        return file
    }

    app.post('/save_image_base64', function (req, res) {
        console.log("/save_image_base64: ", req.query, req.body);
        var testFile = req.body.testFile;
        var count = req.body.count;
        var content = 'sdf'
        var base64Data = req.body.fileData;
        var fileName = req.body.fileName;
        var test_id = req.body.test_id;
        //get file name
        test_id = getFileNameFromPath(test_id)
        content = base64Data;
        var filePath = path.join(__dirname, '/logs/screenshot_' + test_id + '_' + fileName + '_' + getTimeStamp() + '_' + count + '.jpg');

        var action = req.body.action
        var id = req.body.TEST_EXEC_ID;
        id = req.body.test_id; //should be test_exec_id TODO: Change ...
        var userGenId = req.body.TEST_USER_GEN_ID;
        id = setIdBasedOnUserGenId(id, userGenId)
        var currentTest = self.testResults[id];
        if (currentTest != null) {
            currentTest.screenshots.push(filePath)
        } else {
            console.error('cannot find current test to store images')
        }
        fs.writeFile(filePath, content, 'base64', function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.end()
    });

    app.post('/save_image_base64d', function (req, res) {
        console.log('save_image_base64')
        /* var tempPath = req.files.file.path,
         targetPath = path.resolve('./uploads/image.png');
         */
        var base64Data = req.body.fileData;
        var filename = req.body.fileName + ".png"

        var filePath = path.join(__dirname, '/logs/log_' + getTimeStamp() + filename);
        var filePath = path.join(__dirname, '/logs/log_l.txt');

        console.log(filePath)
        //  console.log( base64Data)
        //fs.writeFileSync(filename, base64Data, 'base64')//, 'base64', function(err) {
        // fs.writeFileSync(filename+'g', 'dddd');

        /*fs.writeFile(filename, base64Data, function (err) {

         if (err) {
         console.log(err);
         } else {
         console.log("The pic file was saved!");
         }
         });*/

        fs.writeFile(filename + 'g', 'dddd', function (err) {

            if (err) {
                console.log(err);
            } else {
                console.log("The pic file was saved!");
            }
        });
        res.end();
        // ...
    });

    //make module

    app.get('/testResults', function testsResults(req, res) {
        var clone = sh.clone(self.testResults)
        sh.each(function (x, item) {
            delete item['description']
            delete item['commands']
            delete item['screenshots']
        })
        res.end(sh.toJSONString(self.testResults))
    })
    app.get('/testResultsFull', function testsResults(req, res) {
        res.end(sh.toJSONString(self.testResults))
    })
    app.get('/testsResults2', function testsResults2(req, res) {
        res.end(JSON.stringify(self.testResults, null, "\t"))
    })
    app.get('/getRepeatedTests', function testsResults(req, res) {
        res.end(JSON.stringify(self.repeatedTests, null, "\t"))
    })


    app.get('/getAvgTimings', function getAvgTimings(req, res) {
        var avg = {}

        sh.goThroughtEAch
        //self.repeatedTests={}

        res.end(JSON.stringify(self.repeatedTests, null, "\t"))
        ///
    })

function setupGetGuid() {
    var dirScripts = 'C:/Users/user1/Dropbox/projects/crypto/proxy/serviceCalls'//where are files stored?
    if (fs.existsSync(dirScripts) == false) {
        dirScripts = 'J:/smorris1/flexmonkey/pngproxy/proxy/serviceCalls'
    }
    var AnalyzePortalCall = require(dirScripts + '/' + 'analyzePortal.js')
    var getUserPartyAccess = require(dirScripts + '/' + 'analyzeGetUserAccess.js')
    console.log(getUserPartyAccess)
    /*
     function fxResult(output,token) {
     console.log('done', output)
     }
     getUserPartyAccess.simulateCall( fxResult)

     return;*/
    app.get('/getGuid', function getGuid(req, res) {
        console.log("/getGuid: ", req.query);
        var content = null
        var user = req.query.username
        var env = req.query.env;
        var simulate = req.query.simulate == 'true';

        var h = new AnalyzePortalCall.AnalyzePortalCall();
        var errorJson = JSON.stringify({error: 'cannot find that guid'})

        function fxDoneCall(result) {
            if (result == null) {
                errorJson
                res.end(errorJson);
            }
            var json = JSON.stringify(result)
            json = h.json;
            json = JSON.stringify(h.json)
            //res.writeHead(200);
            res.end(json);
        }

        if (simulate) {
            AnalyzePortalCall.simulateCall(fxDoneCall)
        } else {
            console.log('start....')
            try {
                var call = h.analyzePortal(user, env, fxDoneCall, null, null, false, true)
                call.fxError = function gotError(e) {
                    console.log('start....')
                    console.log('caught error....', e)
                    console.error(e)
                    var errorJson = JSON.stringify({error: e})
                    res.end(errorJson)
                    console.log('done', e)
                }
            } catch (e) {
                console.log('start....')
                console.log('caught error....', e)
                console.error(e)
                var errorJson = JSON.stringify({error: e})
                res.end(errorJson)
                console.log('done', e)

            }
        }

    });


    app.get('/getPartyAccess', function getGuid(req, res) {
        console.log("/getPartyAccess: ", req.query);
        var errorJson = JSON.stringify({error: 'cannot find that guid'})

        function DelegateToScriptHelper() {
            var self = this;
            var p = DelegateToScriptHelper.prototype;
            p.makeRequest = function makeRequest(args, fx, callback) {
            }
            p.makeResponse = function makeRequest(args, fx, callback) {
            }
        }

        var requestHelper = new DelegateToScriptHelper()
        var content = null
        var user = req.query.username
        var env = req.query.env;
        var simulate = req.query.simulate == 'true';

        /// return
        var json = null;
        console.log('simulate', simulate)
        //var getUserPartyAccess = getUserPartyAccess.getUserPartyAccess;
        function fxDoneCall(output, userAccessSummaryBySections, userAccessList) {
            if (output == null) {
                errorJson
                res.end(errorJson);
            }
            //var json = JSON.stringify(result)
            //json = h.json;
            json = JSON.stringify(userAccessSummaryBySections)
            if (req.query.callback != null) {
                json = req.query.callback + '(' + json + ');'
            }
            console.log(json)
            //res.writeHead(200);
            res.end(json);
        }

        if (simulate) {
            getUserPartyAccess.simulateCall(fxDoneCall)
        } else {

            console.log('start....')
            try {
                var AnalyzeGetUserAccess = getUserPartyAccess.AnalyzeGetUserAccess
                var h = new AnalyzeGetUserAccess()
                var call = h.analyzePortal(user, env, fxDoneCall, null, null, false, true)
                call.fxError = function gotError(e) {
                    console.log('start....')
                    console.log('caught error....', e)
                    console.error(e)
                    var errorJson = JSON.stringify({error: e})
                    res.end(errorJson)
                    console.log('done', e)
                }
            } catch (e) {
                console.log('start....')
                console.log('caught error....', e)
                console.error(e)
                var errorJson = JSON.stringify({error: e})
                res.end(errorJson)
                console.log('done', e)

            }
        }

    });

}

    try {
        setupGetGuid()
    } catch(e){
        console.error('.....')
    }
    function DelegateToScriptHelper() {
        var self = this;
        self.req = null //set to express response
        var p = DelegateToScriptHelper.prototype;
        p.makeRequest= function makeRequest(fx, callback ) {
            try {
                fx()
                /*var AnalyzeGetUserAccess = getUserPartyAccess.AnalyzeGetUserAccess
                 var h = new AnalyzeGetUserAccess()
                 var call = h.analyzePortal(user, env, fxDoneCall, null, null, false, true)
                 */ call.fxError  = self.errorHandler
            } catch ( e ) {
                console.log('start....')
                console.log('caught error....', e)
                console.error(e)
                var errorJson = JSON.stringify({error:e})
                self.res.end(errorJson)
                console.log('done', e)
            }
        }

        /**
         * should be dispatching events instead
         */
        p.errorHandler = function errorHandler(e) {
            console.log('start....')
            console.log('caught error....', e)
            console.error(e)
            var errorJson = JSON.stringify({error:e})
            res.end(errorJson)
            console.log('done', e)
        }

        p.makeResponse= function makeRequest(json    ) {

        }


        p.invoke= function invoke(fx , req, res, simulate   ) {
            self.req = req
            self.res = res
            if ( simulate==true ) {
                self.fxSimulate()
                return
            }
            self.makeRequest(fx)
        }

        p.done= function done(output   ) {
            if ( output == null ) {
                res.end(self.errorJson);
            }
            var  json = JSON.stringify(output)
            if (self.req.query.callback != null ) {
                json =  self.req.query.callback+'(' +json +');'
            }
            console.log(json)
            self.res.end(json);
        }

        p.errorJson  = JSON.stringify({error:'cannot find that guid'})
    }

    app.get('/getPartyAccess2', function  getPartyAccess2(req, res) {
        console.log("/getPartyAccess2: ", req.query );
        var requestHelper = new DelegateToScriptHelper()
        var content = null
        var user = req.query.username
        var env = req.query.env;
        var simulate = req.query.simulate=='true';
        /// return
        var json = null;
        console.log('simulate', simulate)
        function  fxProcessResult(output,userAccessSummaryBySections,userAccessList) {
            if ( output == null ) {
                errorJson
                res.end(errorJson);
            }
            //var json = JSON.stringify(result)
            //json = h.json;
            json = JSON.stringify(userAccessSummaryBySections)
            if (req.query.callback != null ) {
                json =  req.query.callback+'(' +json +');'
            }
            console.log(json)
            //res.writeHead(200);
            res.end(json);
        }

        function simulateCall() {
            getUserPartyAccess.simulateCall(fxProcessResult)
        }

        function getUserPartyAccess() {
            username = args[0]
            h.onlyRetrieveAccessForThisCaid=caid;
            h.analyzeGetUserAccessFromUsername(args[0], args[1], fxProcessResult)
        }
        //var getUserPartyAccess = getUserPartyAccess.getUserPartyAccess;
        requestHelper.simulate = simulateCall
        requestHelper.invoke(fx, req, simulate)

    });


    app.get('/changeAccess', function  changeAccess(req, res) {
        console.log("/changeAccess: ", req.query );
        var requestHelper = new DelegateToScriptHelper()
        var content = null
        var user = req.query.username
        var env = req.query.env;
        var simulate = req.query.simulate=='true';

        console.log('simulate', simulate)
        function  fxProcessResult(output,userAccessSummaryBySections,userAccessList) {
            requestHelper.done(null)
        }

        function simulateCall() {
            getUserPartyAccess.simulateCall(fxProcessResult)
        }

        function fxGetUserPartyAccess() {
            username = args[0]
            h.onlyRetrieveAccessForThisCaid=caid;
            h.analyzeGetUserAccessFromUsername(args[0], args[1], fxProcessResult)
        }
        //var getUserPartyAccess = getUserPartyAccess.getUserPartyAccess;
        requestHelper.fxSimulate = simulateCall
        requestHelper.invoke(fxGetUserPartyAccess, req, res, simulate)

    });




    app.get('/jumpbox_login', function jumpbox_login (req, res) {
        console.log('jumpbox_login', req.query, req.body)
        /* var tempPath = req.files.file.path,
         targetPath = path.resolve('./uploads/image.png');
         */
        var username = req.body.username;
        var password = req.body.password
        var url  = req.query.url
        console.log('/jumpbox_login', 'goto', url)
        // res.redirect('http://bbc.co.uk');
        res.redirect(url);

        //res.end(url);
        // ...
    });


    app.get('/getAppStatus', function getStatus (req, res) {
        console.log('getAppStatus', req.query, req.body)
        /* var tempPath = req.files.file.path,
         targetPath = path.resolve('./uploads/image.png');
         */
        var url = req.query.url;
        if ( req.query.fake == 'true' ) {
            url = 'fake'
        }
        console.log('done', url, jumpboxProperties.jumpboxURL )

        res.end(url);
        // ...
    });

    /*
     app.get('/getFMLib', function  shelpers(req, res) {
     console.log("/timings: ", req.query, req.body);
     var filePath = "C:\\Users\\user1\\Dropbox\\projects\\crypto\\proxy\\helpers\\shelpers.js"
     var file = "payx-framework-ui-automation-flexmonkey.swf"
     var content = null
     if ( fs.existsSync(filePath)) {
     content = fs.readFileSync(filePath,  'utf-8');
     } else {
     content = fs.readFileSync('shelpers.js',  'utf-8');
     }
     //res.write(content)
     res.writeHead(200);
     res.end(content);
     });
     */



    p.start = function start(fxStartServerCallback) {
        //http://dev-d-20m76.paychex.com/landing_static/swc/payx-framework-ui-automation-flexmonkey.swf

        app.use(express.static(__dirname + '/public'));
        //open('http://localhost:3001/app.html')
        //enable users to keep on running test until something launches

        var myErrorHandler=function(err, req, res, next){
            console.log('d...', err, err.message, err.stack)
            console.error(err.stack);
        };
        app.configure(function(){
            app.use(myErrorHandler);
        });



        var handler=function(err){
            //console.log('d...', error)
            if ( err.code == 'EADDRINUSE') {
                self.settings.serverPortNumber++
                startServerInner()
                //process.unbind('uncaughtException',handler)
            }
        };
        process.on('uncaughtException',handler)

        function startServerInner() {
            self.proc('try to launch on port', self.settings.serverPortNumber)
            var s = app.listen(self.settings.serverPortNumber);
            s.on('listening',function(){
                console.log('ok, server is running');

                process.removeListener ('uncaughtException',handler)
                //sdf.g
                if (fxStartServerCallback!=null) {
                    fxStartServerCallback()
                }
                // asdf.g
            });
            s.on('EADDRINUSE',function(){
                console.log('error', ', server is running');
            });
        }
        startServerInner();


        self.settings.serverLaunched=false;
        self.findNextAvailablePort( function launchServer(){
            app.listen(self.settings.serverPortNumber);
            self.proc('Express server started on port ' + self.settings.serverPortNumber);
            //sh.callIfDefined(fxStartServerCallback);
        })
        /*while (self.settings.serverLaunched == false ) {
         try {
         app.listen(self.settings.serverPortNumber);
         self.proc('Express server started on port ' + self.settings.serverPortNumber);
         self.settings.serverLaunched=true;
         } catch ( e ) {
         self.settings.serverPortNumber++
         }
         }*/

    }


    p.findNextAvailablePort = function findNextAvailablePort() {

    }


    /**
     * Logging mixin
     */
    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.TestRunnerServer = TestRunnerServer

if (module.parent==null) {
    var testMode = false
    //testMode = true
    if ( testMode == true ) {

        sh.makePathIfDoesNotExist('c:/trash/compile.js')
        var server = new TestRunnerServer(0,true)
        //jumpboxProperties.startSocket=false
        var screenshots = []
        screenshots.push('C:/Users/user1/Dropbox/projects/qtp/projects/extras/logs/screenshot_undefined3-13-2014_22_49_27_undefined.jpg')
        screenshots.push('C:/Users/user1/Dropbox/projects/qtp/projects/extras/logs/screenshot_undefined3-13-2014_22_49_45_undefined.jpg')
        server.storeScreenshots(screenshots, 'c:/trash/compile.js/screensshots.html')
        return
    }
    var server = new TestRunnerServer();
    server.start();

}