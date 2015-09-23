/**
 * Created by user on 8/20/15.
 */

var sh = require('shelpers').shelpers
var properties = require('properties')
var fs = require('fs')
var path = require('path')


//var contents = sh.readFile('apress-pro-angularjs-2014.txt');
//var contents = sh.readFile('apress-pro-angularjs-2014.txt');


/*
go through each line
if line begins with number and is less than < 10000 you good
if line beings with 'chapter' remove line
if line has < indent next line
 */


var nodeUtil = require("util"),
    fs = require('fs'),
    _ = require('underscore'),
    PDFParser = require("pdf2json");

var pdfParser = new PDFParser();

//pdfParser.on("pdfParser_dataReady", _.bind(_onPFBinDataReady, self));

//pdfParser.on("pdfParser_dataError", _.bind(_onPFBinDataError, self));

var pdfFilePath = 'apress-pro-angularjs-2014.pdf';



var parser = new PDFParser()

parser.on('pdfParser_dataReady', function(pdf) {
    console.log('just first page', pdf.data.Pages[0] );

    pdf.data.Pages[0].Texts.forEach(function(text) {
        console.log(unescape(text.R[0].T))
    })

    sh.writeJSONFile('page0.json', pdf.data.Pages[0])
})

parser.on('pdfParser_dataError', console.log)

parser.loadPDF(path.join(__dirname, pdfFilePath))


return;


//pdfParser.loadPDF(pdfFilePath);

// or call directly with buffer
fs.readFile(pdfFilePath, function (err, pdfBuffer) {
    if (!err) {
        console.log('parse')
        var y = pdfParser.parseBuffer(pdfBuffer);
        return;
    }
})

