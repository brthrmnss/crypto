/**
 * Created by user on 8/20/15.
 */

//load json file
//register configs
//run jquery onit



var sh = require('shelpers').shelpers

var dir = 'CSSTest/'

var y   = sh.readFile(dir+'css.css');
var css = require('css');
var options = {};
var obj = css.parse(y, options);
sh.writeJSONFile(dir+'test1.json', obj)
var contents = sh.readFile(dir+'/a.html');

var cheerio = require('cheerio');

var $ = cheerio.load(contents, {
 normalizeWhitespace: true,
 xmlMode: true
});

var acts = [
 {}
]


function forEach(start, fx) {
 fx(item)
}

forEac($(), function asdf(item) {
 sh.each(acts, function doAction(i, act) {
  var act = Action.parse(act);
  if ( act.isTag()) {
   if ( act.data.changeTo != null ) {
    item.name = act.data.changeTo
   }
  }
 })
} )

var children = $().children()[0];
console.log('children', $.children())


//html file
//load 'directions' file
//likely css with new skin names?

/*
 1. create 'replacement tags'
 2. create variables
 3. create dom

 define style in css
 define variables in css

 define style in html
 define variables in html

 load in css, xml convertors, look at convertors on component

 go though each element
 */