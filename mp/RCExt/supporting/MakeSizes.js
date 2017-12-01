var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');



function convertStrToSize(str, testMode) {


    var splitter = '@@@'

    var cfg = {};
    cfg.str = str;
    cfg.fxProc = function processLines(line) {

        var file = sh.str.after(line, splitter)
        file = file.trim()
        var size = sh.str.before(line, splitter)
        file = sh.fs.slash(file)
        size = parseFloat(size)
        size2 = size
        size2 = size2 / 1000
        if (size2 < 1000) {
            if (size2.toString().includes('.')) {
                size2 = size2.toFixed(1)
            }
            size2 += 'K'
        } else {
            size2 = size2 / 1000
            if (size2 < 1000) {
                if (size2.toString().includes('.')) {
                    size2 = size2.toFixed(0)
                }
                size2 += 'M'
            } else {
                size2 = size2 / 1000
                if (size2 < 1000) {
                    if (size2.toString().includes('.')) {
                        size2 = size2.toFixed(1)
                    }
                    size2 += 'G'
                } else {
                    size2 = size2 / 1000
                    size2 = size2.toFixed(0)
                    if (size2 < 1000) {
                        size2 += 'T'
                    } else {

                    }
                }
            }
        }
        if ( testMode )
        console.log(/*size, */size2, sh.t, file)
        return [size2, sh.t, file].join('')
        // return val;
        //['/downloads/cookies/']
    }
//cfg.ignoreEnd = ['.txt', '.search'];
    var lines = sh.each.lines(cfg);

    return lines.join(sh.n)
}


exports.convertStrToSize = convertStrToSize;

if (module.parent == null) {

    var file = "G:/Dropbox/projects/crypto/mp/RCExt/data/filelists/http___192.168.1.163_6024_.withSizes.txt"

    var contents = sh.readFile(file)

    var lines = exports.convertStrToSize(contents)
    console.log(lines)
}