/**
 * Created by user1 on 2/7/14.
 *
 * serve up file, use flash cards to process it
 */
var fs = require("fs")
var shelpers = require('../proxy/helpers/shelpers').shelpers;
var request = require('request'),
    express = require('express');
var Flashcards = require('./flashcards.js').Flashcards;
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

var port = process.env.PORT || 9000;

app.configure(function () {
        app.set("view options", { layout: false, pretty: true });
        app.use(express.favicon());
        app.use("/public", express.static(__dirname + '/public'));
    }
);

app.listen(port);

// Routes
app.get('/', function (req, resp) {
    resp.render('index.jade', {pageTitle: 'Some title'});
});

app.get('/index.html', function (req, res) {
    res.sendfile('form.html')
})


app.post('/submit.html', function (req, res) {
    var formData = req.body.user;
    console.log(formData);
    var x = new Flashcards();
    x.initialize(null, formData);
    x.process();
    res.write(x.createTable());
    res.end();
})


app.get('/submit.html', function (req, res) {
    var formData = fs.readFileSync('oracle2.txt')
    console.log(formData)
    var x = new flashcards(formData)
    var results = x.process()
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        result = '<tr>' + '<td>' + result + '</td>' + '</tr>'
    }
    results = results.join("")
    results = results.replace("\t", '</td><td>')
    res.write('<html>' + '<table>' + results + '</table>' + '</html>')
    res.end()
})


app.get('/test', function (req, res) {
    var formData = fs.readFileSync('oracle2.txt')
    var x = new Flashcards()//, formData)
   // x.initialize('./oracle2.txt')
    x.initialize(null, formData)
    var results = x.process()
    res.write(x.createTable())
    res.end()
})

var open = require('open')
open('http://localhost:9000/index.html')
//http://localhost:9000/index.html

