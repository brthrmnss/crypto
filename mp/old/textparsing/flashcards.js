/**
 * Created by user1 on 2/7/14.
 *
 * C:\Users\user1\Dropbox\Work\work\scripts\text_parsing
 *
 * Input: TExt file with ? or ? <<
 *
 * Output, html friendly table
 */


var isBrowser = false
var isNode = true

if (typeof require !== 'undefined') {
    var fs = require("fs")
    var sh = require('shelpers').shelpers;
}
else {
    isBrowser = true
    isNode = false
    exports = {}

    module = {}
    module.parent = {} //do not do node tests
}



/*if ( typeof shelpers == 'undefined' ) {
 var shelpers = require('shelpers').shelpers;
 }*/



var types = {}
types.PreambleMode = '>>'

var settings = {}
settings.implyParentMeansQuestionMark = true


function GoThroughFile() {
    var self = this;
    var p = GoThroughFile.prototype;
    p.initialize = function initialize(file_input, raw_text_input) {
        //replace text
        if (file_input != null) {
            file_input = file_input.replace("\\", '/')
            self.file_input = file_input

            self.lines = self.open_file()
            self.lines = shelpers.remove_win_newlines(self.lines)
            self.lines = self.lines.split("\n")
        }

        //puts input_file

        var txt_input;
        if (raw_text_input != null) {
            //if (raw_text_input.prototype == String) {
            self.lines = raw_text_input.split("\n");
            // }
        }

        self.txt_input = txt_input

        //puts    'top', @txt_input.class, txt_input.class, 'top'

    }

    var tab = "\t"
    p.process = function process() {
        var lines = self.lines; //()
        var line_count = 0,
            parsed_lines = [],
            line_output = [],
            tab = "\t",
            answer = '',
            prompt = ''

        var iterator = {}
        iterator.inThreadMode=false
        iterator.inPreambleMode=false

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            line_count += 1
            //req: ignore comments
            if (line.slice(0, 1) == '--') {
                continue;
            }
            //req: ignore blank lines
            if (line == null || line == true) {
                continue;
            }
            //req: ignore blank lines
            if (line.trim()=='') {
                //continue;
            }
            /* if (shelpers.strip(line) == '') {
             self.proc('blank line')
             continue;
             }*/




            var includesSB = self.line_includes(line, 'sb')
            if ( self.conversionSettings != null &&
                self.conversionSettings.sbOnly ) {
                if ( includesSB == false ) {
                    continue;
                }
            }
            //req: if line includesSB, remove sb
            if ( includesSB ) {
                answer = answer.replace("\tsb", "")
                line = line.replace("\tsb", "")
            }



            self.proc(i,line)

            //Uility: Multiple lines
            if (iterator.inThreadMode) {
                if (line.trim() == '' ) {
                    line_output = prompt + '?' + tab + answer
                    self.proc(tab, 'iterator.inThreadMode.exitThread', iterator.inThreadModeStart, line_output)
                    iterator.inThreadMode = false
                    parsed_lines.push(line_output)
                    //asdf.gd
                }
                else {
                    //puts answer
                    self.proc(tab, 'iterator.inThreadMode', iterator.inThreadModeStart, line_output)
                    //self.proc('thread', line_output)
                    answer += line.strip() + ', '
                }
                //self.proc(tab, 'in thread', line)
                continue
            }

            //append the inPrenableModeStart and add each line
            //good when you have multiple questions that have the same basic prompt, but underneath have different pronts
            if (iterator.inPreambleMode) {
                if (line.trim() == '' ) {
                    //line_output = prompt + '?' + tab + answer
                    self.proc(tab, 'iterator.inPreambleMode.exit', sh.paren(iterator.inPreambleModeStart), line_output)
                    iterator.inPreambleMode = false
                    //parsed_lines.push(line_output)
                }
                else {
                    self.proc(tab, 'iterator.inPreambleMode', sh.paren(iterator.inPreambleModeStart), line_output)
                    //answer += line.strip() + ', '
                    parsed_lines.push(
                        self.createLine(line.trim(), iterator.inPreambleModeStart)
                    )
                }
                //self.proc(tab, 'in thread', line)
                continue
            }


            var line_output = '';

            var brokenByTabs = line.split("\t")
            //req:if line has more than 3 lines we are in tab mode
            if ( brokenByTabs.length >= 3 ) {

                line_output = brokenByTabs[0]
                if (brokenByTabs[1] != '' ) {
                    line_output += ' ' + sh.paren(brokenByTabs[1])
                } else {
                    if ( brokenByTabs[2] == '' ) {
                        continue
                    }
                }
                line_output += '?'+tab + brokenByTabs[2]
                //var line_output = prompt + '?' + tab + answer
            }
            else if (self.line_includes(line, '?')) {// //only 1
                line = shelpers.strip(line)

                //next if line_includes line, 'on'
                split = line.split('?')
                prompt = split[0]
                //answer = split[1]
                //what is 2nd one's size?
                //puts split.inspect
                if (prompt.length < 3 && split.size == 2) {
                    self.proc('small')
                    continue;
                }
                answer = split.slice(1).join('?')
                console.log('proc line', line, answer)
                if (answer.empty() || answer.strip().empty()) {
                    self.proc('answer empty')
                    continue;
                }

                //handle strict tab mode ... for excel sheets
                var secondTab = answer.split('\t')
                //secondTab.shift()
                //secondTab.join("\t")

                //remove all empty tabs
                var lastIndex = secondTab[secondTab.length-1]
                if ( lastIndex =='') {
                    secondTab.pop();
                }

                if ( secondTab.length > 2 ) {
                    var lineSplitTabMode = line.split('\t');
                    prompt = lineSplitTabMode.shift()
                    var firstCell = lineSplitTabMode[0]
                    if ( firstCell=='' || firstCell == '"') {
                        lineSplitTabMode.shift();
                    }
                    var promptPostAmble = lineSplitTabMode[0]
                    if ( promptPostAmble[0]!='(') {
                        promptPostAmble = sh.paren(promptPostAmble)
                    }
                    if ( !sh.includes(prompt, '?')) {
                        prompt += '?'
                    }
                    prompt += ' ' + promptPostAmble;
                    //join all remaining elements
                    answer = lineSplitTabMode.slice(1).join(' ');
                    answer = answer;
                }

                //answer = ''

                if (answer.strip().slice(-2) == '<<') {
                    //if (answer.strip() == '<<') {//answer.include?('<<') //answer.strip == '<<' ){
                    //puts "asdf"
                    //asdf.g
                    iterator.inThreadMode = true
                    iterator.inThreadModeStart = line
                    self.proc('entering thread mode for', sh.qq(line))
                    //puts 'answer:'+answer
                    answer = ''
                    continue
                }

                if (answer.strip().slice(-2) == types.PreambleMode) {
                    iterator.inPreambleMode = true
                    iterator.inPreambleModeStart = line.replace(types.PreambleMode, '')
                    self.proc('entering inPreambleMode for', sh.qq(iterator.inPreambleModeStart))
                    answer = ''
                    continue
                }


                answer = answer.trim()

                var line_output = prompt + '?' + tab + answer
                //console.log(line_output)
            }
            else {
                self.proc('line had no match', line)
                continue
            }

            parsed_lines.push(line_output);

        }
        self.parsed_lines = parsed_lines;
        self.convertToItems()
        return parsed_lines;
    }

    p.open_file = function open_file() {

    }

    /**
     * Convert all items to objects
     */
    p.convertToItems = function convertToItems() {
        self.array = []
        sh.each( self.parsed_lines, function parseLines(i,x) {
            var item = {}
            var splitline = x.split("\t")
            item.prompt = splitline[0];
            item.answer = splitline[1];
            self.array.push(item)
        })
    }

    p.proc = function proc() {
        var args = sh.convertArgumentsToArray(arguments)
        //args.unshift(debugName)
        //args.unshift('>>>>proc logic')
        sh.log.apply(self, args)
    }


    p.open_file = function open_file() {
        var lines = fs.readFileSync(self.file_input, 'utf8')
        if (self.txt_input != null) lines = self.txt_input;
        self.lines = lines;
        return lines
    }


    p.line_includes = function line_includes(line, include) {
        return shelpers.includes(line, include)
    }

    p.content_between = function line_includes(start, ending) {
        var line = line.split(start)[1]
        //puts line.inspect
        line = line.split(ending)[0]
        line
        return line
    }

    p.createTable = function createTable() {

        var rows = [];
        for (var i = 0; i < self.parsed_lines.length; i++) {
            var line = self.parsed_lines[i];
            var row = '<tr>' + '<td>' + line + '</td>' + '</tr>'
            rows.push(row);
        }

        rows = rows.join();
        rows = rows.replace(/\t/g, '</td><td>')
        var table = '<html>' + '<table>' + rows + '</table>' + '</html>';

        return table
    }

    p.showResults = function showResults() {
        sh.each( self.parsed_lines, function(i,o){
            //console.log(i,o)
            console.log(o.replace('(', '|').replace(')', '|'))
        })
    }


    p.createLine = function createLine(line, preamble) {
        var prompt = ''
        var answer = ''
        var split

        if (sh.includes(line, '?')) {
            split  = line.split('?')
            prompt = split[0]
            prompt += '?'
            answer = split[1]
            if ( sh.includes(answer, '\t')) {
                var answerSplit = answer.split('\t');
                var promptPostAmble = answerSplit[0]
                answer = answerSplit[1];
            }
        }
        else if (  settings.implyParentMeansQuestionMark &&   sh.includes(line, ')') ) {
            split = line.split(')')
            prompt = split[0]
            prompt += ')'
            answer = split[1]
        } else { //if line does nto have question mark ... continue on ...

            answer = line
        }

        prompt = prompt.trim()
        answer = answer.trim()


        if (preamble != null) {
            prompt =  preamble  + ' ' + prompt
        }

        var y = [prompt,   '\t', answer]
        y = y.join('')

        return y

    }



}

GoThroughFile.convertToArray =
    function convertToArray(str, content, conversionSettings) {
        var fc = new GoThroughFile()
        fc.initialize(str)
        //in server we pass in form
        if ( content == null ) {
            content = fs.readFileSync(str)
        }
        fc = new GoThroughFile()
        fc.conversionSettings = conversionSettings;
        fc.initialize(null, content.toString())
        fc.process()
        fc.showResults()
        //console.log(fc.createTable())

        return fc.array;
    }



exports.Flashcards = GoThroughFile;

if (module.parent == null) {
    str = 'G:\\My Documents\\work\\scripts\\text_parsing\\flashcards_flattened.txt'
    str = './oracle2.txt'
    str = './jobinterviewsoundbites3.txt'
    str = 'C:\\Users\\user1\\Dropbox\\projects\\delegation\\autocomplete\\soundbiter\\x.txt'
    fc = new GoThroughFile()

    fc.initialize(str)

    //in server we pass in form
    var formData = fs.readFileSync(str)
    fc = new GoThroughFile()
    fc.initialize(null, formData.toString())
////build_zip = GoThroughFile.new(null, "\n sssd sdf sdf \n yogh? you down? \n mark? fight \n heart ? 666")
    //console.log(fc.process())
    fc.process()
    fc.showResults()
    console.log(fc.createTable())

    var array =  GoThroughFile.convertToArray(str)
    array=array;
}