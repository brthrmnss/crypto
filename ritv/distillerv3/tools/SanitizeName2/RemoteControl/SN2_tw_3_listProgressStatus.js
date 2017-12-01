

//

//var fileTest = "G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/ContentLists/output/test1.json.json.output.pbVerified.json.output.breed.clustered.json"



var Workflow_GetDlProgress = require('./SN2_test_workflow.js').Workflow_GetDlProgress
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var i = new Workflow_GetDlProgress();
var file = sh.fs.resolve('files/test1.json')
var cfg = {};
i.init(cfg)
i.loadFile(file)
//i.getProgressLite()
i.getProgressLiteStatus()
//i.postProcessList()