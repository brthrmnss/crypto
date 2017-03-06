

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var f = sh.runWhenFileChanged(__dirname, 'TestCSVConvertor.js')

/*
 f.settings.otherValidFiles = ['AutoItRunner.js']
 var found = f.settings.otherValidFiles.includes('AutoItRunner.js')
 console.log('found', found)
 */