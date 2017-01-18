/**
 * Created by morriste on 12/19/2016.
 */



function convertCSV(contents) {
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

function SR() {
    var self = this;
    var p = this;
    self.data = {};
    self.settings = {}
    self.settings.dbg = {}
    self.settings.dbg.calls = false;
    p.init = function init() {

        self.data.jquery = '#tags';
        self.data.ui = $('#tags');


        self.history.initHistory();



        uiUtils.onEnter(self.data.ui, self.onEnterAction);


        $(document).on("click", function() {
            self.data.ui.focus();
        });

        $(document).on("dblclick", function() {
            self.refreshActions();
        });
        return;

        uiUtils.onEnter(self.data.ui, self.onEnterAction);

    }
    p.getList = function getList() {
        var urlPrepend = 'sr/'
        uiUtils.utils.getR(urlPrepend+'actions.csv', function onGotJSON(data){
            uiUtils.utils.getR(urlPrepend+'actions2.csv', function onGotJSON(data2){
                self.data.itemData = data;
                console.log('...', data);
                var items = convertCSV(data);
                var items2 = convertCSV(data2);
                console.log('...', items2);
                self.utils.addItems(data, false)
                self.utils.addItems(data2)
            });
            return;
            self.data.itemData = data;
            console.log('...', data)
            var items = convertCSV(data)
            console.log('...', items)
            self.data.items = items;
            var dict = {};
            $.each(items, function asdf(k,v){
                dict[v.name] = v;
            });
            self.data.dictActions = dict;
            self.updateAutocomplete()
        })
    }

    p.updateAutocomplete = function updateAutocomplete() {
        var names = []
        $.each(self.data.items, function onX (k,v) {
            names.push(v.name)
        })
        console.debug('adding items', names)
        $( "#tags" ).autocomplete({
            source: names
        });
    }

    p.onAction = function onAction(actionName){
        var action = self.data.dictActions[actionName];
        if ( action == null ) {
            console.error('action not found ...');
            return;
        }
        if ( actionName.endsWith('*') ) {
            console.info('action * found ...', 'ignoring');
            self.utils.asdf()
            return;
        }

        console.info(actionName, JSON.stringify(action));


        if ( self.utils.openWindow(action.cmd) ) {
            return;
        }

        self.history.addHistory();
        uiUtils.utils.getR('doAction',
            {actionName:actionName},
            function onPerformedAction(data){
                console.log('performed action')
                self.utils.reset();
            })
    }

    p.onEnterAction = function onEnterAction(actionName){

        var input = {};
        input.text = self.data.ui.val();
        input.split = input.text.split(' ');
        if ( input.split <= 1) {
            console.warn('enter input with 1 word', val)
        };
        input.firstWord = input.split[0];
        input.rest = input.split.slice(1).join(' ');

        var action = self.data.dictSearchable[input.firstWord];
        if ( action == null ) {
            console.info('action not found ...', input.firstWord);
            return;
        }


        function qq(text) {
            return "\"" + text + "\""
        }

        //var override =
        //var cmdOverride = action.cmd.replace('%W%', qq(input.rest) )
        var cmdOverride = action.cmd.replace('%W%', (input.rest) )

        console.info(actionName, JSON.stringify(action))

        self.history.addHistory();

        if ( self.utils.openWindow(cmdOverride) ) {
            return;
        }

        uiUtils.utils.getR('doAction',
            {actionName:actionName,
                cmdOverride:cmdOverride
            },
            function onPerformedAction(data){
                console.log('performed action')
                self.utils.clearFocus();
            })
    }

    p.refreshActions = function refreshActions() {

        uiUtils.showTemp({
            id:'txtStatus2',
            text:'Refreshing...'
        })
        self.server.reloadActions(
            function onRefreshed() {
                self.getList();
            }
        )

    }

    p.server = {};
    p.server.reloadActions = function reloadActions(fxDone) {
        uiUtils.utils.getR('reloadActions',
            // {actionName:actionName},
            function onRefreshedActions(data){
                console.log('reloadActions', 'fxDone')
                callIfDefined(fxDone)
            })
    }

    function defineHistory() {
        p.history = {};
        p.history.initHistory = function initHistory() {
            self.data.history = [];
        }
        p.history.addHistory = function addHistory() {
            var val = self.data.ui.val('')
            self.data.history.push(val);
        }
        p.history.showHistory = function showHistory() {
            console.log('history', self.data.history);
        }
        p.showHistory = p.history.showHistory;
    }
    defineHistory();

    function defineUtils() {
        p.utils = {};

        p.utils.addItems = function addItem(items, update) {
            var dict = dv(self.data.dictActions, {})
            self.data.dictSearchable = dv( self.data.dictSearchable, {});
            var itemsFinal = [];
            if ( $.isString(items)) {
                items = convertCSV(items)
            }

            $.each(items, function asdf(k,v){
                dict[v.name] = v;
            });

            //check for aliases
            var idx = 0;
            $.each(dict, function onHandleAliases(k,v) {
                idx++;
                if ( v.name.startsWith('|') ) {
                    var parent = v.name.slice(1)
                    var match = dict[parent]
                    if ( match == null ) {
                        console.error('broken on', v.name, match)
                        delete dict[v.name];
                    } else {
                        dict[v.name] = match;
                    }
                }
                if (v.name.endsWith('*')) {
                    var searchableName = v.name.slice(0,-2);
                    self.data.dictSearchable[searchableName] = v;
                }
                itemsFinal.push(v)
                console.info( idx, v.name, JSON.stringify(v))
                // dict[v.name] = v;
            });

            self.data.items = itemsFinal;

            self.data.dictActions = dict;
            if ( update != false ) {
                self.updateAutocomplete()
            }

        }
        p.utils.clearFocus = function clearFocus(){
            self.data.ui.val('')
            self.data.ui.focus()
            setTimeout(self.data.ui.focus, 50);
        }

        p.utils.reset = p.utils.clearFocus;

        p.utils.asdf = function asdf(wait) {
            if ( wait != false ) {
                setTimeout(self.utils.asdf, 50, false)
                return;
            }
            function setInputSelection(input, startPos, endPos) {
                input.focus();
                if (typeof input.selectionStart != "undefined") {
                    input.selectionStart = startPos;
                    input.selectionEnd = endPos;
                } else if (document.selection && document.selection.createRange) {
                    // IE branch
                    input.select();
                    var range = document.selection.createRange();
                    range.collapse(true);
                    range.moveEnd("character", endPos);
                    range.moveStart("character", startPos);
                    range.select();
                }
            }

            var input = self.data.ui[0];
            var txt = self.utils.getText();
            setInputSelection(input, txt.length-1, txt.length);
            return false;
        }

        p.utils.getText = function getText() {
            return  self.data.ui.val()
        }

        p.utils.openWindow = function openWindow(cmdOverride) {
            return; //can't open proper window, use remove
            if ( cmdOverride.startsWith('http')) {
                //   window.open(cmdOverride, '_blank');
                window.open(cmdOverride, '_blank',
                    //    "height=200,width=200");
                    '_blank', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');
                self.utils.reset();
                return true
            }
        }
    }
    defineUtils();
}


var alwaysReload = true;
if ( window.sr == null || alwaysReload ) {
    window.sr = new SR();
    window.sr.init();
}


console.info('req')
window.sr.getList();

function asdf() {
    console.log('ll5')
}
setTimeout(asdf, 500);

function listenForRefresh() {
    var socket = io()

    setTimeout(function listenLaterToAvoidM(){
        socket.on('reload', function onReload(msg){

            console.log('reload...')
            //if ( uiUtils.skipIf(msg.id, sr.data, 'lastReload') ) { return; }
            if ( msg.id != sr.data.lastReload ) {
                return;
            }
            sr.data.lastReload = msg.id;
            location.reload() //TODO: just reload actions
            //sr.reloadActions;

        });
    }, 3000)
}
listenForRefresh();