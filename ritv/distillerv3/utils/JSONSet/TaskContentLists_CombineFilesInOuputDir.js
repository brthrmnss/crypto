var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var JSONSetRunner = require('./JSONSetRunner').JSONSetRunner;


if (module.parent == null) {
    var dir = 'output'
    var files = sh.fs.getFilesInDirectory2(dir)
    var content = '';
    var finalList= [];
    var size = 0
    sh.each(files, function processFile(k,file) {
        if ( sh.includes(file, '.output.json') == false ) {
            return;
        }
        if ( sh.includes(file, 'tv_series_top_')   ) {
            return;
        }


        console.log(file)
        //return;
        var objs = sh.readJSONFile(file)
        sh.each(objs, function openfile(k,obj) {
            if ( obj.size == null ) return;
            if (obj.series == true ) return;
            size += parseFloat(obj.size);
            console.log(size, obj.name)

           // console.log("\t", obj)
            finalList.push(obj)
            obj.index = finalList.length
        })
    })


    //console.log(file)
    sh.writeJSONFile('all.json', finalList)

}



