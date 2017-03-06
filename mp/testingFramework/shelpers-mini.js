/**
 * Helpers methods
 */

(function () {

    var isNode = true

    if (typeof exports === 'undefined' || exports.isNode == false) {
        isNode = false
    }

    window.isNode = isNode
    
    if ( isNode ) {
        var path = require('path')
    } else {
       /* require = function () {
            return {};
        }*/
    }

    function trim1(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }


    var helper = {}
    var sh = helper;

    var str = {}
    sh.str = str;
    sh.fs = {};

    function defineBasics() {
        sh.defaultValue = function defaultValue(input, ifNullUse) {
            if (input == null) {
                return ifNullUse
            }
            return input;
        }
        sh.dv = sh.defaultValue;


        function convertArgumentsToArray(_arguments) {
            var args = Array.prototype.slice.call(_arguments, 0);
            return args
        }
        sh.convertArgumentsToArray = convertArgumentsToArray;



        function toJSONString(o, printJSON) {
            printJSON = sh.defaultValue(printJSON, false)
            var json = JSON.stringify(o, "\t", "\t")
            if (printJSON) {
                console.log(json)
            }
            return json;
        }

        sh.toJSONString = toJSONString;


        function callIfDefined(fx) {
            var args = convertArgumentsToArray(arguments)
            args = args.slice(1, args.length)

            if (fx == undefined)
                return args[0];


            // console.debug('args', tojson(args))
            return fx.apply(null, args)
            //return;
        }

        sh.callIfDefined = callIfDefined;


        function q(text, escapeQuote) {
            if (escapeQuote == true) {
                return "\'" + text + "\'"
            }
            return "'" + text + "'"
        }

        sh.q = q;


        function qq(text, escapeQuote) {
            if (escapeQuote == true) {
                return "\'" + text + "\'"
            }
            return "'" + text + "'"
        }

        sh.qq = qq;


        sh.qq = function qq(text) {
            return "\"" + text + "\""
        }
        sh.paren = function paren(text) {
            return "(" + text + ")"
        }

        sh.bracket =  function bracket(text) {
            return "[" + text + "]"
        }

        sh.isObject = function isObject(obj) {
            if ( $.isFunction(obj)) {
                return false;
            }
            if ( obj == null ) {
                return false;
            }
            return typeof obj == 'object'
        }
        sh.isString = $.isString
        sh.isArray = $.isArray
        sh.includes = function includes(arr, f, v) {
            return arr.includes(f)
        }

        sh.startsWith =
            function startsWith (str, subStr) {
                if (str == null) {
                    return;
                }
                return str.indexOf(subStr) == 0 ;
            }



        sh.copyProps = function copyProps(from, to) {
            sh.each(from, function(k,v){
                to[k]=v;
            })
        }

        sh.printCol = function printCol( arr) {
            sh.each(arr, function on(k,v) {
                console.log(v)
            })
        }

    }
    defineBasics();

    function defineErrors() {
        sh.errors = {}


        /**
         * Simple log, show prototype (class) and method name
         */
        sh.sLog = function sLog() {
            var args = sh.convertArgumentsToArray(arguments[0])



            var stackTrace = sh.errors.getStackTrace()
            var calls = stackTrace.split("\n");
            var trueCall = calls[4]
            var prototypeName = calls[5]

            function getS(s) {
                if ( s == null ) {
                    return '';
                }
                s = s.split("at ")[1];
                return s
            }

            trueCall = getS(trueCall);
            prototypeName = getS(prototypeName);

            function stripPrototype(s) {
                //FlexMXMLtoStyleExplorerConvertor.convertFile (C:\Users\user1\Dropbox\projects\crypto\proxy\css\convertMXMLSkinToExplorer.js:40:44)
                s = s.split(".")[0];
                return s
            }

            //LineProcHelper.getLineWith (C:\Users\user1\Dropbox\projects\crypto\proxy\css\convertMXMLSkinToExplorer.js:29:30)
            function getLinePrototype(s) {
                var methodCall = s.split(" (")[0] //LineProcHelper.getLineWith
                var prototype = methodCall.split(".")[0];
                var method = methodCall.split(".")[1];
                var line = "(" + s.split(" (")[1]; //(c:\)
                return {prototype: prototype, method: method, line: line}
            }

            var lists = getLinePrototype(trueCall)
            var prototype = lists.prototype;
            var method = lists.method;
            var line = lists.line;

            prototypeName = stripPrototype(prototypeName);
            //console.log(stackTrace + 'llllllllll')
            /*console.log(trueCall)
             console.log(prototypeName)*/

            //console.log(stackTrace)
            // args.unshift(label)
            args.unshift(lists.method);
            args.unshift(lists.prototype);
            args.unshift('>>>*> ');
            args.push(lists.line);
            var str = "\t" + args.join(" ") + "\n"
            str = args.join(" ")
            console.log(str)
            //var fx = console.log;
            //fx.apply(null, args)
            //console.log()
            return str;
        }

        sh.errors.jumpError = function jumpError(msg, lines, ifFalse , postAdd, throwError) {
            if (ifFalse != null) {
                if (ifFalse != false) {
                    return;
                }

            }

            //user may not secify lines, but condition


            var stackTrace = sh.errors.getStackTrace()

            var calls = stackTrace.split("\n");

            //console.log(calls.join("\n"))


            lines = sh.dv(lines, 3);
            if (lines < 0) {
                lines *= -1
            }


            var old = calls.slice(1 + 2, lines)
            var newCalls = calls.slice(lines);

            newCalls.unshift('Error: ' + msg);


            if (postAdd != null)
                newCalls = newCalls.concat('', 'from', postAdd)

            newCalls = newCalls.concat('', 'via', old)


            var e = new Error(msg)
            e.stack = newCalls.join("\n")
            // e.stack = 'ooo'
            //e.message = 'dfsdf'
            if (throwError != false) {

                throw(e);
            }
            else {
                console.error(e.stack)
            }



            return true;

        }

        sh.errors.storeError = function jumpError( lines ) {

            var stackTrace = sh.errors.getStackTrace()

            var calls = stackTrace.split("\n");

            //console.log(calls.join("\n"))


            lines = sh.dv(lines, 3);
            if ( lines < 0 ) { lines *= -1 }


            var newCalls = calls.slice(lines);

            //newCalls.unshift('Error: ' + msg);

            //var e =new Error(msg)
            //e.stack = newCalls.join("\n")
            // e.stack = 'ooo'
            //e.message = 'dfsdf'
            //throw(e);
            return newCalls;

        }






        function getStackTrace() {
            var err = new Error();

            return err.stack;
        }
        sh.errors.getStackTrace = getStackTrace
    }
    defineErrors();


    function defineTimer() {
        sh.timeElapsed = function timeElapsed(lastDate) {
            var currentTime = new Date();
            var time = currentTime.getTime() - lastDate.getTime();
            return time / 1000;
        }

        function EasyTimer() {
            this.start = function start() {
                this.startTime = new Date();
                this.running = true
            }

            this.stop = function stop() {
                this.duration = sh.timeElapsed(this.startTime).toFixed(2)
                this.running = false;
            }


            this.remaining = function remaining(percentDone) {
                this.duration = sh.timeElapsed(this.startTime).toFixed(2)
                var remainingPercentage = 1-percentDone;
                var percRatio = remainingPercentage/percentDone
                var secsRemaining = this.duration*percRatio
                var minsRemaining = secsRemaining / 60
                return minsRemaining.toFixed(2)
            }

            this.secs = function secs(format) {
                if (this.running) {
                    this.stop()
                }

                var output = this.duration
                //this.duration = sh.timeElapsed(this.startTime).toFixed(2)
                if (format != false) {
                    output = ' ' + sh.paren(this.duration+ ' s')
                }
                return output;
            }

        }
        sh.EasyTimer = EasyTimer;
    }
    defineTimer()


    function defineEach() {
        sh.each = function each(object, callback, args) {

            var name, i = 0, length = object.length;

            if (args) {
                if (length === undefined) {
                    for (name in object)
                        if (callback.apply(object[name], args) === false)
                            break;
                } else
                    for (; i < length;)
                        if (callback.apply(object[i++], args) === false)
                            break;

                // A special, fast, case for the most common use of each
            } else {
                if (length === undefined) {
                    for (name in object)
                        if (callback.call(object[name], name, object[name]) === false)
                            break;
                } else
                    for (var value = object[0];
                         i < length && callback.call(value, i, value) !== false; value = object[++i]) {
                    }
            }

            return object;
        }
    }
    defineEach();

    function defineLines() {
        //AKA Lines helper
        sh.each.lines = function lines(items, config) {
            config = sh.dv(config, {})


            if (sh.isObject(items)) {
                config = items;
            }
            ;
            if (config.str != null) {
                items = config.str.split('\n');
            }
            ;
            if (config.file != null) {
                var contents = sh.readFile(config.file);
                items = contents.split('\n');
            }
            ;


            if (sh.isString(items)) {
                items = items.split('\n');
            }

            var lines = [];
            lines = sh.dv(config.addTo, []);


            sh.each(items, function processLine(i, line) {

                if (line == null) {
                    return;
                }
                if (line.trim() == '' && config.skipEmpty != false) {
                    return;
                }

                if (config.ignore != null) {
                    var ignoreFault = false;
                    sh.each(config.ignore, function testIgnoreLineFilter(x, ignore) {
                        if (sh.includes(line, ignore)) {
                            ignoreFault = true
                            return false;
                        }
                    });
                    if (ignoreFault) {
                        return;
                    }
                    ;
                }

                if (config.ignoreEnd != null) {
                    var ignoreFault = false;
                    sh.each(config.ignoreEnd, function testIgnoreLineFilter(x, ignoreEnd) {
                        var indexOfEnding = line.length - ignoreEnd.length;
                        var indexOfEnder = line.toLowerCase().indexOf(ignoreEnd.toLowerCase(), indexOfEnding);
                        var endGt = indexOfEnder > 0
                        var okGt = indexOfEnder == line.length - ignoreEnd.length
                        if (sh.includes(line, ignoreEnd) && okGt) {
                            ignoreFault = true
                            return false;
                        }
                    });
                    if (ignoreFault) {
                        return;
                    }
                    ;
                }


                if (config.ignoreComments) {
                    var commentStartingChars = ["'", '//', '#']
                    if (sh.isArray(config.ignoreComments)) {
                        commentStartingChars = config.ignoreComments
                    }
                    var ignoreFault = false;
                    sh.each(commentStartingChars, function testIgnoreLineFilter(x, ignore) {
                        if (sh.startsWith(line, ignore)) {
                            return false;
                        }
                    });
                    if (ignoreFault) {
                        return;
                    }
                    ;
                }

                if (config.fxProc != null) {
                    config.line = line;
                    config.includes = function includes(val) {
                        return config.line.indexOf(val) != -1;
                    };

                    config.remove = function remove(val) {
                        config.line = config.line.replace(val, '');
                        return config;
                    };

                    line = sh.callIfDefined(config.fxProc, line, i, lines.length)
                    if (line == null)
                        return;
                    if (line == false)
                        return false; //stop processing
                }


                if (config.appendToLine != null) {
                    line += config.appendToLine
                }

                lines.push(line)

            })

            return lines;
        }
    }
    defineLines();

    if (typeof exports === 'undefined') {
        exports = {}
        exports.isNode = false;
        //must be in browser
    }
    exports.shelpers = helper;

//used by browser/node.js agnostic scripts
//todo: add more robust solution
    helper.isNode = true
    helper.isBrowser = false
    if (typeof require !== 'undefined') {}
    else {
        helper.isBrowser = true
        helper.isNode = false
    }


    var shelpers = sh;
    window.sh = sh;
    /*
     for (var i=0;i<cars.length;i++)
     {
     document.write(cars[i] + "<br>");
     }
     */

    if ( isNode ) {
        if (module.parent == null) {
            function runShelpersTests(){
                testEachProp()
                return;
                //helper.tests.testDictArray()
                //helper.tests.writeFile2Test();
            }
            debugger
            runShelpersTests();
        }
    }

})();