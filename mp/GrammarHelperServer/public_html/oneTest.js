
var oneTestJS = {};

if ( window.countOneTest == null )
    window.countOneTest = 0;

oneTestJS.go = function go() {
    window.countOneTest++;
    console.log('what is this', window.countOneTest)
}
oneTestJS.go();  