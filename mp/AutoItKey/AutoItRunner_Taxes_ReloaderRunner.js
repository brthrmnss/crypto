

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var f = sh.runWhenFileChanged(__dirname, 'AutoItRunner_Taxes_CheckVM.js')
if ( Array.prototype.includes == null ) {
    Array.prototype.includes =  function includes(  value){
        var found = this.indexOf( value ) != -1;
        //console.log('found', found)
        return found
    }
}
f.settings.otherValidFiles = ['AutoItRunner.js']
var found = f.settings.otherValidFiles.includes('AutoItRunner.js')
console.log('found', found)