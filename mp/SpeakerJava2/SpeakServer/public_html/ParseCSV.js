
function defineParseCSV() {
    function CSVParser() {

        var self = this;
        var p = this;

        p.init = function init() {

        }
        var isNode = false;
        var sh = {}
        var convertCSV = function convertCSV(contents) {
            if ( isNode ) {
                //var $ = sh;
            }
            sh.toCamelCase = function toCamelCase(str) {
                return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
                    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                    return index == 0 ? match.toLowerCase() : match.toUpperCase();
                });
            }

            function removeFromBegAndEndOfStr(text, removeStr) {
                if (  text == null || text.startsWith == null ) {
                    debugger;
                }

                if ( text.startsWith(removeStr) &&
                    text.endsWith(removeStr)) {

                    text = text.replace(removeStr, '')
                    text = text.slice(0,text.length-removeStr.length)
                }
//    if ( sh.endsWith(text, removeStr)) {
//        text = text.slice(0,text.length-removeStr.length)
//    }
                return text;
            }

            function unquote(text) {
                return removeFromBegAndEndOfStr(text, '"')
            }

            sh.unquote = unquote

            sh.CSVtoArray = // Return array of string values, or NULL if CSV string not well formed.
                function CSVtoArray(text) {
                    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
                    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
                    // Return NULL if input string is not well formed CSV string.
                    if (!re_valid.test(text)) return null;
                    var a = [];                     // Initialize array to receive values.
                    text.replace(re_value, // "Walk" the string using replace with callback.
                        function(m0, m1, m2, m3) {
                            // Remove backslash from \' in single quoted values.
                            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
                            // Remove backslash from \" in double quoted values.
                            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
                            else if (m3 !== undefined) a.push(m3);
                            return ''; // Return empty string.
                        });
                    // Handle special case of empty last value.
                    if (/,\s*$/.test(text)) a.push('');
                    return a;
                };

            var lines = contents.split('\n')
            var it = {};
            it.objs = [];
            $.each(lines, function procLine(k,line) {
                var fields = line.split(',')
                var fields2 = sh.CSVtoArray(line)
                if ( fields2 == null && fields.length > 0 ) {
                    fields2 = fields; //possibly invalid
                    console.warn('possibliy invalid line', fields2)
                }
                if ( fields.length != fields2.length ) {
                    //    debugger;
                }
                fields=fields2
                if ( line.trim() == '' )
                    return;
                if  ( k == 0 ) {
                    it.columnNames = fields;
                    return;
                }
                var unquoted = []
                $.each(it.columnNames, function addCol(cI, colName) {
                    var fixed = colName
                    unquoted.push(sh.toCamelCase(sh.unquote(colName)))
                })
                it.columnNames = unquoted;
                //console.error(k, line, fields)
                var obj = {};

                $.each(it.columnNames, function addCol(cI, col) {
                    var val  = fields[cI];
                    if ( val == null ) {
                        return;
                    }
                    val = sh.unquote(val);
                    obj[col] = val;
                })
                it.objs.push(obj);
            })
            console.log('how many?', it.objs.length)
            //  sh.each.print(it.objs)
            // process.exit();
            return it.objs;
        }
        window.convertCSV = convertCSV;
    }

    var o = new CSVParser();
    return CSVParser;
}
defineParseCSV();

function convertCSV_X(contents) {
    var sh = {}
    sh.toCamelCase = function toCamelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    function removeFromBegAndEndOfStr(text, removeStr) {
        if ( text.startsWith(removeStr) &&
            text.endsWith(removeStr)) {

            text = text.replace(removeStr, '')
            text = text.slice(0,text.length-removeStr.length)
        }
//    if ( sh.endsWith(text, removeStr)) {
//        text = text.slice(0,text.length-removeStr.length)
//    }
        return text;
    }

    function unquote(text) {
        return removeFromBegAndEndOfStr(text, '"')
    }

    sh.unquote = unquote

    sh.CSVtoArray = // Return array of string values, or NULL if CSV string not well formed.
        function CSVtoArray(text) {
            var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
            var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
            // Return NULL if input string is not well formed CSV string.
            if (!re_valid.test(text)) return null;
            var a = [];                     // Initialize array to receive values.
            text.replace(re_value, // "Walk" the string using replace with callback.
                function(m0, m1, m2, m3) {
                    // Remove backslash from \' in single quoted values.
                    if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
                    // Remove backslash from \" in double quoted values.
                    else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
                    else if (m3 !== undefined) a.push(m3);
                    return ''; // Return empty string.
                });
            // Handle special case of empty last value.
            if (/,\s*$/.test(text)) a.push('');
            return a;
        };

    var lines = contents.split('\n')
    var it = {};
    it.objs = [];
    $.each(lines, function procLine(k,line) {
        var fields = line.split(',')
        var fields2 = sh.CSVtoArray(line)
        if ( fields2 == null && fields.length > 0 ) {
            fields2 = fields; //possibly invalid
            console.warn('possibliy invalid line', fields2)
        }
        if ( fields.length != fields2.length ) {
            //    debugger;
        }
        fields=fields2
        if ( line.trim() == '' )
            return;
        if  ( k == 0 ) {
            it.columnNames = fields;
            return;
        }
        var unquoted = []
        $.each(it.columnNames, function addCol(cI, colName) {
            var fixed = colName
            unquoted.push(sh.toCamelCase(sh.unquote(colName)))
        })
        it.columnNames = unquoted;
        //console.error(k, line, fields)
        var obj = {};

        $.each(it.columnNames, function addCol(cI, col) {
            var val  = fields[cI];
            val = sh.unquote(val);
            obj[col] = val;
        })
        it.objs.push(obj);
    })
    console.log('how many?', it.objs.length)
    //  sh.each.print(it.objs)
    // process.exit();
    return it.objs;
}