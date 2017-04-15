Index: mp/SpeakerJava2/SpeakServer/public_html/sr.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/sr.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/sr.js	(revision )
@@ -0,0 +1,405 @@
+/**
+ * Created by morriste on 12/19/2016.
+ */
+
+function SR() {
+    var self = this;
+    var p = this;
+    self.data = {};
+    self.settings = {}
+    self.settings.dbg = {}
+    self.settings.dbg.calls = false;
+    p.init = function init() {
+
+        self.data.jquery = '#tags';
+        self.data.ui = $('#tags');
+
+
+        self.history.initHistory();
+
+
+
+        uiUtils.onEnter(self.data.ui, self.onEnterAction);
+
+
+        $(document).on("click", function() {
+            self.data.ui.focus();
+        });
+
+        $(document).on("dblclick", function() {
+            self.refreshActions();
+        });
+        return;
+
+        uiUtils.onEnter(self.data.ui, self.onEnterAction);
+
+    }
+    p.getList = function getList() {
+        var urlPrepend = 'sr/'
+        uiUtils.utils.getR(urlPrepend+'actions.csv', function onGotJSON(data){
+            uiUtils.utils.getR(urlPrepend+'actions2.csv', function onGotJSON(data2){
+                self.data.itemData = data;
+                console.log('...', data);
+                var items = convertCSV(data);
+                var items2 = convertCSV(data2);
+                console.log('...', items2);
+                self.utils.addItems(data, false)
+                self.utils.addItems(data2)
+            });
+            return;
+            self.data.itemData = data;
+            console.log('...', data)
+            var items = convertCSV(data)
+            console.log('...', items)
+            self.data.items = items;
+            var dict = {};
+            $.each(items, function asdf(k,v){
+                dict[v.name] = v;
+            });
+            self.data.dictActions = dict;
+            self.updateAutocomplete()
+        })
+    }
+
+    p.updateAutocomplete = function updateAutocomplete() {
+        var names = []
+        $.each(self.data.items, function onX (k,v) {
+            names.push(v.name)
+        })
+        console.debug('adding items', names)
+        $( "#tags" ).autocomplete({
+            source: names
+        });
+    }
+
+    p.onAction = function onAction(actionName){
+        var action = self.data.dictActions[actionName];
+        if ( action == null ) {
+            console.error('action not found ...');
+            return;
+        }
+        self.history.addHistory(actionName);
+        if ( actionName.endsWith('*') ) {
+            console.info('action * found ...', 'ignoring');
+            self.utils.asdf()
+            return;
+        }
+
+        console.info(actionName, JSON.stringify(action));
+
+
+        if ( self.utils.openWindow(action.cmd) ) {
+            return;
+        }
+        if ( self.utils.actions.showText(action.cmd, action)) {
+
+            return;
+        }
+
+
+        uiUtils.utils.getR('doAction',
+            {actionName:actionName},
+            function onPerformedAction(data){
+                console.log('performed action')
+                self.utils.reset();
+            })
+    }
+
+
+    p.onPrev = function onPrev(){
+        self.data.currentIndex++
+        if (  self.data.currentIndex >= self.data.history.length  ) {
+            self.data.currentIndex = 0;
+        }
+
+        var item = self.data.history[self.data.currentIndex];
+
+
+        console.log('onPrev',  self.data.currentIndex, item, self.data.history.length)
+
+
+        if ( item ) {
+            return item;
+        }
+    }
+    p.onPrev_Next = function onPrev_Next(){
+        self.data.currentIndex--
+        if (  self.data.currentIndex < 0  ) {
+            self.data.currentIndex =  self.data.history.length-1;
+        }
+        var item = self.data.history[self.data.currentIndex];
+
+        console.log('onPrev_Next',  self.data.currentIndex, item, self.data.history.length)
+
+
+        if ( item ) {
+            return item;
+        }
+    }
+
+    p.onEnterAction = function onEnterAction(actionName){
+
+        //self.history.addHistory();
+
+        var input = {};
+        input.text = self.data.ui.val();
+        input.split = input.text.split(' ');
+        if ( input.split <= 1) {
+            console.warn('enter input with 1 word', val)
+        };
+        input.firstWord = input.split[0];
+        input.rest = input.split.slice(1).join(' ');
+
+        var action = self.data.dictSearchable[input.firstWord];
+        if ( action == null ) {
+            console.info('action not found ...', input.firstWord);
+            return;
+        }
+
+        self.history.addHistory(actionName);
+
+        function qq(text) {
+            return "\"" + text + "\""
+        }
+
+        //var override =
+        //var cmdOverride = action.cmd.replace('%W%', qq(input.rest) )
+        var cmdOverride = action.cmd.replace('%W%', (input.rest) )
+
+        console.info(actionName, JSON.stringify(action))
+
+
+
+        if ( self.utils.openWindow(cmdOverride) ) {
+            return;
+        }
+
+        uiUtils.utils.getR('doAction',
+            {actionName:actionName,
+                cmdOverride:cmdOverride
+            },
+            function onPerformedAction(data){
+                console.log('performed action')
+                self.utils.clearFocus();
+            })
+    }
+
+    p.refreshActions = function refreshActions() {
+
+        uiUtils.showTemp({
+            id:'txtStatus2',
+            text:'Refreshing...'
+        })
+        self.server.reloadActions(
+            function onRefreshed() {
+                self.getList();
+            }
+        )
+
+    }
+
+    p.server = {};
+    p.server.reloadActions = function reloadActions(fxDone) {
+        uiUtils.utils.getR('reloadActions',
+            // {actionName:actionName},
+            function onRefreshedActions(data){
+                console.log('reloadActions', 'fxDone')
+                callIfDefined(fxDone)
+            })
+    }
+
+    function defineHistory() {
+        p.history = {};
+        p.history.initHistory = function initHistory() {
+            self.data.history = [];
+            self.data.currentIndex = 0;
+        }
+        p.history.addHistory = function addHistory(val) {
+            //var val = self.data.ui.val('')
+            self.data.history.push(val);
+        }
+        p.history.showHistory = function showHistory() {
+            console.log('history', self.data.history);
+        }
+        p.showHistory = p.history.showHistory;
+    }
+    defineHistory();
+
+    function defineUtils() {
+        p.utils = {};
+
+        p.utils.addItems = function addItem(items, update) {
+            var dict = dv(self.data.dictActions, {})
+            self.data.dictSearchable = dv( self.data.dictSearchable, {});
+            var itemsFinal = [];
+            if ( $.isString(items)) {
+                items = convertCSV(items)
+            }
+
+            $.each(items, function asdf(k,v){
+                dict[v.name] = v;
+            });
+
+            //check for aliases
+            var idx = 0;
+            $.each(dict, function onHandleAliases(k,v) {
+                idx++;
+                if ( v.cmd == null ) {
+                    console.info('skip line', v)
+                    return;
+                }
+                if ( v.name.startsWith('|') ) {
+                    var parent = v.name.slice(1)
+                    var match = dict[parent]
+                    if ( match == null ) {
+                        console.error('broken on', v.name, match)
+                        delete dict[v.name];
+                    } else {
+                        dict[v.name] = match;
+                    }
+                }
+                if (v.name.endsWith('*')) {
+                    var searchableName = v.name.slice(0,-2);
+                    self.data.dictSearchable[searchableName] = v;
+                }
+                itemsFinal.push(v)
+                console.info( idx, v.name, JSON.stringify(v))
+                // dict[v.name] = v;
+            });
+
+            self.data.items = itemsFinal;
+
+            self.data.dictActions = dict;
+            if ( update != false ) {
+                self.updateAutocomplete()
+            }
+
+        }
+        p.utils.clearFocus = function clearFocus(){
+            self.data.ui.val('')
+            self.data.ui.focus()
+            setTimeout(self.data.ui.focus, 50);
+        }
+
+
+
+        p.utils.reset = p.utils.clearFocus;
+
+        p.utils.asdf = function asdf(wait) {
+            if ( wait != false ) {
+                setTimeout(self.utils.asdf, 50, false)
+                return;
+            }
+            function setInputSelection(input, startPos, endPos) {
+                input.focus();
+                if (typeof input.selectionStart != "undefined") {
+                    input.selectionStart = startPos;
+                    input.selectionEnd = endPos;
+                } else if (document.selection && document.selection.createRange) {
+                    // IE branch
+                    input.select();
+                    var range = document.selection.createRange();
+                    range.collapse(true);
+                    range.moveEnd("character", endPos);
+                    range.moveStart("character", startPos);
+                    range.select();
+                }
+            }
+
+            var input = self.data.ui[0];
+            var txt = self.utils.getText();
+            setInputSelection(input, txt.length-1, txt.length);
+            return false;
+        }
+
+        p.utils.getText = function getText() {
+            return  self.data.ui.val()
+        }
+
+        function defineCMD() {
+            p.utils.openWindow = function openWindow(cmdOverride) {
+                return; //can't open proper window, use remove
+                if ( cmdOverride.startsWith('http')) {
+                    //   window.open(cmdOverride, '_blank');
+                    window.open(cmdOverride, '_blank',
+                        //    "height=200,width=200");
+                        '_blank', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');
+                    self.utils.reset();
+                    return true
+                }
+            }
+
+            p.utils.actions = {};
+            p.actions = p.utils.actions;
+            p.utils.actions.showText = function showText(cmdOverride, action) {
+                if ( cmdOverride.startsWith('$')) {
+                    if ( self.settings.dbg.actions ) {
+                        console.info('running show text commadn',
+                            cmdOverride, action)
+                    }
+                    var cmd = action.cmd.slice(1);
+                    $('#txtAnswer').text(cmd);
+
+                    var speak = {};
+
+                    var speakCmd = action.name.replace('problem:', '');
+
+                    var speakText =[ 'problem... ',speakCmd,
+                        '... ',
+                        'answer ...',
+                        cmd]
+
+                    speakText = speakText.join(' ')
+                    console.log('speakText', speakText)
+                    window.quickSpeaker.speak(speakText)
+
+                    setTimeout(function clearText() {
+                        $('#txtAnswer').text("");
+                    }, 8000)
+
+                    return true;
+                }
+                return; //can't open proper window, use remove
+            }
+        }
+
+        defineCMD();
+    }
+    defineUtils();
+}
+
+
+var alwaysReload = true;
+if ( window.sr == null || alwaysReload ) {
+    window.sr = new SR();
+    window.sr.init();
+}
+
+
+console.info('req')
+window.sr.getList();
+
+function asdf() {
+    console.log('ll5')
+}
+setTimeout(asdf, 500);
+
+function listenForRefresh() {
+    var socket = io()
+
+    setTimeout(function listenLaterToAvoidM(){
+        socket.on('reload', function onReload(msg){
+
+            console.log('reload...')
+            //if ( uiUtils.skipIf(msg.id, sr.data, 'lastReload') ) { return; }
+            if ( msg.id != sr.data.lastReload ) {
+                return;
+            }
+            sr.data.lastReload = msg.id;
+            location.reload() //TODO: just reload actions
+            //sr.reloadActions;
+
+        });
+    }, 3000)
+}
+listenForRefresh();
Index: mp/SpeakerJava2/SpeakServer/public_html/ParseCSV.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/ParseCSV.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/ParseCSV.js	(revision )
@@ -0,0 +1,209 @@
+
+function defineParseCSV() {
+    function CSVParser() {
+
+        var self = this;
+        var p = this;
+
+        p.init = function init() {
+
+        }
+        var isNode = false;
+        var sh = {}
+        var convertCSV = function convertCSV(contents) {
+            if ( isNode ) {
+                //var $ = sh;
+            }
+            sh.toCamelCase = function toCamelCase(str) {
+                return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
+                    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
+                    return index == 0 ? match.toLowerCase() : match.toUpperCase();
+                });
+            }
+
+            function removeFromBegAndEndOfStr(text, removeStr) {
+                if (  text == null || text.startsWith == null ) {
+                    debugger;
+                }
+
+                if ( text.startsWith(removeStr) &&
+                    text.endsWith(removeStr)) {
+
+                    text = text.replace(removeStr, '')
+                    text = text.slice(0,text.length-removeStr.length)
+                }
+//    if ( sh.endsWith(text, removeStr)) {
+//        text = text.slice(0,text.length-removeStr.length)
+//    }
+                return text;
+            }
+
+            function unquote(text) {
+                return removeFromBegAndEndOfStr(text, '"')
+            }
+
+            sh.unquote = unquote
+
+            sh.CSVtoArray = // Return array of string values, or NULL if CSV string not well formed.
+                function CSVtoArray(text) {
+                    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
+                    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
+                    // Return NULL if input string is not well formed CSV string.
+                    if (!re_valid.test(text)) return null;
+                    var a = [];                     // Initialize array to receive values.
+                    text.replace(re_value, // "Walk" the string using replace with callback.
+                        function(m0, m1, m2, m3) {
+                            // Remove backslash from \' in single quoted values.
+                            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
+                            // Remove backslash from \" in double quoted values.
+                            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
+                            else if (m3 !== undefined) a.push(m3);
+                            return ''; // Return empty string.
+                        });
+                    // Handle special case of empty last value.
+                    if (/,\s*$/.test(text)) a.push('');
+                    return a;
+                };
+
+            var lines = contents.split('\n')
+            var it = {};
+            it.objs = [];
+            $.each(lines, function procLine(k,line) {
+                var fields = line.split(',')
+                var fields2 = sh.CSVtoArray(line)
+                if ( fields2 == null && fields.length > 0 ) {
+                    fields2 = fields; //possibly invalid
+                    console.warn('possibliy invalid line', fields2)
+                }
+                if ( fields.length != fields2.length ) {
+                    //    debugger;
+                }
+                fields=fields2
+                if ( line.trim() == '' )
+                    return;
+                if  ( k == 0 ) {
+                    it.columnNames = fields;
+                    return;
+                }
+                var unquoted = []
+                $.each(it.columnNames, function addCol(cI, colName) {
+                    var fixed = colName
+                    unquoted.push(sh.toCamelCase(sh.unquote(colName)))
+                })
+                it.columnNames = unquoted;
+                //console.error(k, line, fields)
+                var obj = {};
+
+                $.each(it.columnNames, function addCol(cI, col) {
+                    var val  = fields[cI];
+                    if ( val == null ) {
+                        return;
+                    }
+                    val = sh.unquote(val);
+                    obj[col] = val;
+                })
+                it.objs.push(obj);
+            })
+            console.log('how many?', it.objs.length)
+            //  sh.each.print(it.objs)
+            // process.exit();
+            return it.objs;
+        }
+        window.convertCSV = convertCSV;
+    }
+
+    var o = new CSVParser();
+    return CSVParser;
+}
+defineParseCSV();
+
+function convertCSV_X(contents) {
+    var sh = {}
+    sh.toCamelCase = function toCamelCase(str) {
+        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
+            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
+            return index == 0 ? match.toLowerCase() : match.toUpperCase();
+        });
+    }
+
+    function removeFromBegAndEndOfStr(text, removeStr) {
+        if ( text.startsWith(removeStr) &&
+            text.endsWith(removeStr)) {
+
+            text = text.replace(removeStr, '')
+            text = text.slice(0,text.length-removeStr.length)
+        }
+//    if ( sh.endsWith(text, removeStr)) {
+//        text = text.slice(0,text.length-removeStr.length)
+//    }
+        return text;
+    }
+
+    function unquote(text) {
+        return removeFromBegAndEndOfStr(text, '"')
+    }
+
+    sh.unquote = unquote
+
+    sh.CSVtoArray = // Return array of string values, or NULL if CSV string not well formed.
+        function CSVtoArray(text) {
+            var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
+            var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
+            // Return NULL if input string is not well formed CSV string.
+            if (!re_valid.test(text)) return null;
+            var a = [];                     // Initialize array to receive values.
+            text.replace(re_value, // "Walk" the string using replace with callback.
+                function(m0, m1, m2, m3) {
+                    // Remove backslash from \' in single quoted values.
+                    if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
+                    // Remove backslash from \" in double quoted values.
+                    else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
+                    else if (m3 !== undefined) a.push(m3);
+                    return ''; // Return empty string.
+                });
+            // Handle special case of empty last value.
+            if (/,\s*$/.test(text)) a.push('');
+            return a;
+        };
+
+    var lines = contents.split('\n')
+    var it = {};
+    it.objs = [];
+    $.each(lines, function procLine(k,line) {
+        var fields = line.split(',')
+        var fields2 = sh.CSVtoArray(line)
+        if ( fields2 == null && fields.length > 0 ) {
+            fields2 = fields; //possibly invalid
+            console.warn('possibliy invalid line', fields2)
+        }
+        if ( fields.length != fields2.length ) {
+            //    debugger;
+        }
+        fields=fields2
+        if ( line.trim() == '' )
+            return;
+        if  ( k == 0 ) {
+            it.columnNames = fields;
+            return;
+        }
+        var unquoted = []
+        $.each(it.columnNames, function addCol(cI, colName) {
+            var fixed = colName
+            unquoted.push(sh.toCamelCase(sh.unquote(colName)))
+        })
+        it.columnNames = unquoted;
+        //console.error(k, line, fields)
+        var obj = {};
+
+        $.each(it.columnNames, function addCol(cI, col) {
+            var val  = fields[cI];
+            val = sh.unquote(val);
+            obj[col] = val;
+        })
+        it.objs.push(obj);
+    })
+    console.log('how many?', it.objs.length)
+    //  sh.each.print(it.objs)
+    // process.exit();
+    return it.objs;
+}
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/testBrowserEval.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/testBrowserEval.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/testBrowserEval.js	(revision )
@@ -0,0 +1,181 @@
+//alert('i am in')
+console.log(' inside ... .... test ....');
+
+
+
+// Anonymous "self-invoking" function
+(function() {
+
+
+    //text ...
+    //get words
+    //hieghlight 4 words at a time
+    //send to server, wait for response
+    //send next 4 words
+
+    //if jquery alreay loaded
+    if ( typeof $ != "undefined" ) {
+        loadManifest($);
+        return;
+    }
+    //console.log('$', $)
+    // Load the script
+    var script = document.createElement("SCRIPT");
+    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
+    script.type = 'text/javascript';
+    document.getElementsByTagName("head")[0].appendChild(script);
+
+    // Poll for jQuery to come into existance
+    var checkReady = function(callback) {
+        if (window.jQuery) {
+            callback(jQuery);
+        }
+        else {
+            window.setTimeout(function() { checkReady(callback); }, 100);
+        }
+    };
+
+    // Start polling...
+    checkReady( loadManifest )
+    function loadManifest($) {
+
+        /**
+         * function to load a given css file
+         */
+        loadCSS = function(href) {
+            var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
+            $("head").append(cssLink);
+        };
+
+        /**
+         * function to load a given js file
+         */
+        loadJS = function(src) {
+            var jsLink = $("<script type='text/javascript' src='"+src+"'>");
+            $("head").append(jsLink);
+        };
+
+
+        loadJS2 = function loadJS2(src, fx) {
+            var script = document.createElement('script');
+            script.src = src;
+            script.onload = function (a) {
+                //alert('got js ' + src)
+                if ( fx != null ) {
+                    fx(a)
+                }
+            };
+            document.head.appendChild(script);
+        };
+
+
+        // Use $ here...
+        console.log('jquery', window.location.href);
+        if ( window.location.href.indexOf('mail.google.com') != -1 ) {
+            console.log('do not modify gmail')
+            return;
+        }
+        if ( window.location.href.indexOf('padmapper.com') != -1 ) {
+            console.log('do not modify padmapper')
+            return;
+        }
+
+        var baseUrl = 'https://local.helloworld3000.com:8043/apps/speak/'
+        var baseBaseUrl = 'https://local.helloworld3000.com:8043/'
+        var loadEval = true
+        if ( window.location.href.indexOf('127.0.0.1') == -1 ) {
+            console.log('do not load sockets outside fo local host');
+            loadEval = false
+        }
+       // alert('reload ' +  window.location.href +
+       //     ' '  + window.location.href.indexOf('127.0.0.1') + ' ' +  loadEval )
+        if ( loadEval ) {
+            function loadEvalApp(){
+                // alert('load eval')
+                loadJS2(baseBaseUrl+
+                    'socket.io-1.2.0.js.', function loadedSocket(a){
+
+                    //return;
+                    var socket = io(baseBaseUrl);
+                    $('form').submit(function(){
+                        socket.emit('chat message', $('#m').val());
+                        $('#m').val('');
+                        return false;
+                    });
+                    socket.on('chat message', function(msg){
+                        if (msg.indexOf('eval-')==0) {
+                            msg = msg.replace('eval-', '')
+                            eval(msg);
+                        }
+                        console.log('chat')
+                        $('#messages').append($('<li>').text(msg));
+                    });
+                    socket.on('window.invoke', function(msg){
+                        console.log('invoke.window', msg)
+                        if ( window.fxInvoke == null ) {
+                            return;
+                        }
+                        window.fxInvoke(msg);
+                    });
+                    window.socket = socket;
+                })
+            }
+            loadEvalApp();
+        }
+
+
+
+
+
+        //var baseUrl = 'https://127.0.0.1:8043/apps/speak/'
+        //load app
+        $.ajax({
+            url: baseUrl + "manifest.json",
+
+            success: function f(d){
+                console.log('manifest', d)
+
+                // load the css file
+                // loadCSS("style.css");
+
+                // load the js file
+                // loadJS("one.js");
+                //self.goEach();
+                $.each(d.files, function (i,file) {
+                    if (file.match(".js$")) {
+                        // ...
+                        loadJS( baseUrl +file);
+                    } else if (file.match(".css$")) {
+                        loadCSS( baseUrl +file);
+                    } else if (file.match(".html$") ) {
+                        $.get( baseUrl +file, function( my_var ) {
+                            var h = $('<div>'+my_var+'</div>')
+                            var t = $(h).find('#appendToApp')
+                            if ( t != null ) {
+                                $('body').append(t);
+                            }
+                            // my_var contains whatever that request returned
+                        })
+                    }
+                    //loadCSS("style.css");
+                });
+            },
+            dataType: "json"
+        }).done(function( html ) {
+            //console.log('d', html)
+        });;
+
+
+
+        /*
+
+
+         $('html').click(function(event) {
+         //Hide the menus if visible
+         console.log('click it',event)
+         });
+
+         */
+
+    };
+})();
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/MaryTTSSpeaker.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/MaryTTSSpeaker.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/MaryTTSSpeaker.js	(revision )
@@ -0,0 +1,214 @@
+var sh = require('shelpers').shelpers;
+var shelpers = require('shelpers');
+var EasyRemoteTester = shelpers.EasyRemoteTester;
+//where is mary?
+//C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.1.2\marytts-5.1.2\bin
+
+function MaryTTSSpeaker() {
+    var p = MaryTTSSpeaker.prototype;
+    p = this;
+    var self = this;
+    self.settings = {}
+    self.data = {};
+    p.init = function init(url, appCode) {
+
+    }
+
+    p.test = function test() {
+        var port = 59125
+        var baseUrl = 'http://127.0.0.1:'+port
+        var t = EasyRemoteTester.create('Test say basics',{showBody:false});
+        var data = {};
+        t.settings.baseUrl = baseUrl
+        var urls = {};
+        urls.notes = {};
+        urls.say = t.utils.createTestingUrl('say')
+        urls.process = t.utils.createTestingUrl('process')
+
+        var maryXML =
+            '<?xml version="1.0" encoding="UTF-8" ?> '+
+            '<maryxml version="0.4" '+
+            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
+            'xmlns="http://mary.dfki.de/2002/MaryXML" '+
+            'xml:lang="en"> '+
+            '    <prosody rate="+200%" pitch="+20%" range="-10%" volume="loud"> '+
+            '    This is something you have to see! '+
+            '    </prosody> '+
+            '    </maryxml>'
+
+        var req = {}
+        //  req.INPUT_TEXT  = 'hello world'
+        req.INPUT_TYPE= 'TEXT'
+        req.OUTPUT_TYPE ='AUDIO'
+        //req.OUTPUT_TYPE ='WORDS'
+        //  req.INPUT_TEXT = 'Willkommen in der Welt der Sprach-synthese'
+        req.INPUT_TEXT  = 'hello world, ddvwere are you'
+        req.LOCALE  = 'en_US'
+        req.AUDIO="WAVE_FILE"
+
+
+        var maryXML2 = '<?xml version="1.0" encoding="UTF-8" ?> '+
+            '<maryxml version="0.4" '+
+            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
+            'xmlns="http://mary.dfki.de/2002/MaryXML" '+
+            'xml:lang="en-US"> '+
+            'Welcome<boundary breakindex="4"/>to the world of speech synthesis! '+
+            '</maryxml>'
+
+
+        var maryXML=[ '<?xml version="1.0" encoding="UTF-8"?>',
+            '<maryxml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://mary.dfki.de/2002/MaryXML" version="0.4" xml:lang="en-US">',
+            '<p>',
+            '<prosody rate="150%">Welcome to the world of speech synthesis!</prosody>',
+            '</p>',
+            '</maryxml>']
+
+        maryXML = maryXML.join(' \n')
+
+        console.log('mary', maryXML)
+
+        //request raw xml
+        var req = {}
+        //  req.INPUT_TEXT  = 'hello world'
+        req.INPUT_TYPE= 'RAWMARYXML'
+        req.OUTPUT_TYPE ='AUDIO'
+        // req.OUTPUT_TYPE ='WORDS'
+        //  req.INPUT_TEXT = 'Willkommen in der Welt der Sprach-synthese'
+        req.INPUT_TEXT  = maryXML
+        req.INPUT_TEXT  = maryXML
+        req.LOCALE  = 'en_US'
+        req.AUDIO="WAVE_FILE"
+
+        // req.AUDIO_OUT= "WAVE_FILE"
+        // req.VOICE='bits3'
+        var t2 = t.clone('test a few voices notes');
+        t2.getR(urls.process).with(req)
+            .addFx(function onResult(asdf, resp) {
+                if ( resp.statusCode != 200 ) {
+                    // console.error('result', asdf)
+                    console.error(asdf.toString());
+                    //  console.error(asdf.toString('utf8'));
+                    return
+                }
+                sh.writeFile('sample.wav', asdf, false, true)
+                return;
+                sh.writeFile('x2.wav', asdf, false, false)
+                var fs = require('fs')
+                fs.writeFileSync('sample.wav',  asdf);
+            })
+            .fxFail(function onFault(e){
+                console.error(e)
+            })
+
+        //.bodyHas('status').notEmpty()
+        //t2.getR(urls.say).with({text:'test', rate:20}).bodyHas('status').notEmpty()
+        // t2.getR(urls.say).with({text:'test', rate:350}).bodyHas('status').notEmpty()
+        //t2.getR(urls.say).with({text:'voice', voice:'Heather'}).bodyHas('status').notEmpty()
+        return;
+
+    }
+
+    p.kill  = function kill() {
+        self.data.killed = true;
+    }
+
+    p.speak = function speak(cfg) {
+        var port = 59125
+        var baseUrl = 'http://127.0.0.1:'+port
+        var t = EasyRemoteTester.create('Test say basics',{showBody:false});
+        var data = {};
+        t.settings.baseUrl = baseUrl
+        var urls = {};
+        urls.notes = {};
+        urls.say = t.utils.createTestingUrl('say')
+        urls.process = t.utils.createTestingUrl('process')
+
+
+        cfg.text = self.utils.escapeXML(cfg.text)
+
+        //cfg.rate = sh.dv(cfg.rate, '+20%')
+        cfg.rate = sh.dv(cfg.rate, '100%')
+
+        var maryXML=[ '<?xml version="1.0" encoding="UTF-8"?>',
+            '<maryxml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://mary.dfki.de/2002/MaryXML" version="0.4" xml:lang="en-US">',
+           // '<p>',
+            '<prosody rate="'+cfg.rate+'" range="-10%" >'+cfg.text+'</prosody>',
+         //   '</p>',
+            '</maryxml>'];
+
+        maryXML = maryXML.join(' \n')
+
+        self.settings.showMaryXML = true
+        if ( self.settings.showMaryXML )
+            console.log('mary', maryXML)
+
+        //request raw xml
+        var req = {}
+        req.INPUT_TYPE= 'RAWMARYXML'
+        req.OUTPUT_TYPE ='AUDIO'
+        req.INPUT_TEXT  = maryXML
+        req.INPUT_TEXT  = maryXML
+        req.LOCALE  = 'en_US'
+        req.AUDIO="WAVE_FILE"
+
+        // req.AUDIO_OUT= "WAVE_FILE"
+        // req.VOICE='bits3'
+        var t2 = t.clone('test a few voices notes');
+        t2.getR(urls.process).with(req)
+            .addFx(function onResult(error, resp, body) {
+                if (resp == null) {
+                    console.error('response is null');
+                    console.error(error);
+                    return
+                }
+                if ( resp.statusCode != 200 ) {
+                    console.error(body.toString());
+                    return
+                }
+                var file = 'sample.wav';
+                file = sh.fs.resolve(file);
+                sh.writeFile('sample.wav', body, false, true)
+                if ( self.data.killed != true )
+                sh.callIfDefined(cfg.fx, file)
+                return;
+            })
+            .fxFail(function onFault(e){
+                console.error(e)
+            })
+    }
+
+    p.proc = function debugLogger() {
+        if ( self.silent == true) {
+            return
+        }
+        sh.sLog(arguments)
+    }
+
+    p.utils = {}
+    p.utils.escapeXML = function escapeXML(str) {
+        return str.replace(/&/g, '&amp;')
+            .replace(/</g, '&lt;')
+            .replace(/>/g, '&gt;')
+            .replace(/"/g, '&quot;')
+            .replace(/'/g, '&apos;');
+/*
+AS of date titel should up near the title
+*/
+
+
+    }
+
+
+}
+
+exports.MaryTTSSpeaker = MaryTTSSpeaker;
+
+if (module.parent == null) {
+
+    var s = new MaryTTSSpeaker();
+    s.init()
+    s.test()
+}
+
+
+
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/Set-WindowStyle.ps1
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/Set-WindowStyle.ps1	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/Set-WindowStyle.ps1	(revision )
@@ -0,0 +1,36 @@
+function Set-WindowStyle {
+param(
+    [Parameter()]
+    [ValidateSet('FORCEMINIMIZE', 'HIDE', 'MAXIMIZE', 'MINIMIZE', 'RESTORE',
+                 'SHOW', 'SHOWDEFAULT', 'SHOWMAXIMIZED', 'SHOWMINIMIZED',
+                 'SHOWMINNOACTIVE', 'SHOWNA', 'SHOWNOACTIVATE', 'SHOWNORMAL')]
+    $Style = 'SHOW',
+
+    [Parameter()]
+    $MainWindowHandle = (Get-Process –id $pid).MainWindowHandle
+)
+    $WindowStates = @{
+        'FORCEMINIMIZE'   = 11
+        'HIDE'            = 0
+        'MAXIMIZE'        = 3
+        'MINIMIZE'        = 6
+        'RESTORE'         = 9
+        'SHOW'            = 5
+        'SHOWDEFAULT'     = 10
+        'SHOWMAXIMIZED'   = 3
+        'SHOWMINIMIZED'   = 2
+        'SHOWMINNOACTIVE' = 7
+        'SHOWNA'          = 8
+        'SHOWNOACTIVATE'  = 4
+        'SHOWNORMAL'      = 1
+    }
+
+    $Win32ShowWindowAsync = Add-Type –memberDefinition @”
+    [DllImport("user32.dll")]
+    public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
+    “@ -name “Win32ShowWindowAsync” -namespace Win32Functions –passThru
+
+    $Win32ShowWindowAsync::ShowWindowAsync($MainWindowHandle, $WindowStates[$Style]) | Out-Null
+    Write-Verbose ("Set Window Style '{1} on '{0}'" -f $MainWindowHandle, $Style)
+
+}
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/sr/actions.csv
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/sr/actions.csv	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/sr/actions.csv	(revision )
@@ -0,0 +1,6 @@
+name,cmd
+dog,cat
+mydocs2,x:\
+dirc,c:\
+yahoo,http://yahoo.com
+msdirectory,http://slashn-na-na.webfarm.ms.com/itsmg/slashn/webapp/#/defaultPage
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/eval_client.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/eval_client.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/eval_client.js	(revision )
@@ -0,0 +1,816 @@
+/**
+ * Created by user on 8/15/15.
+ */
+
+
+$.urlParam = function(name){
+    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
+    if (results==null){
+        return null;
+    }
+    else{
+        return results[1] || 0;
+    }
+}
+
+
+
+var getUrlParameter = function getUrlParameter(sParam) {
+    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
+        sURLVariables = sPageURL.split('&'),
+        sParameterName,
+        i;
+
+    for (i = 0; i < sURLVariables.length; i++) {
+        sParameterName = sURLVariables[i].split('=');
+
+        if (sParameterName[0] === sParam) {
+            return sParameterName[1] === undefined ? true : sParameterName[1];
+        }
+    }
+};
+
+
+
+//http://localhost:5557/index.html?rec=true&file=a.txt
+function Utilx() {
+    var p = this;
+    var self = this;
+
+    p.start = function () {
+        self.file = getUrlParameter('file')
+        if ( self.file != null ) {
+            $.ajax({
+                url: '/getFile',
+                data: {file:self.file},
+                success: function (data) {
+                    //$(".result").html(data);
+                    //alert("Load was performed.");
+                },
+                //dataType: dataType
+            });
+        }
+    }
+}
+
+
+
+
+var utils = new Utilx()
+utils.start();
+//console.log('....', getUrlParameter('rec'))
+
+console.log('ready')
+window.nospeaker = true
+window.initializedAddOnApps = true
+//var socket = io('http://localhost:5600');
+var socket = io( );
+$('form').submit(function(){
+    socket.emit('chat message', $('#m').val());
+    $('#m').val('');
+    return false;
+});
+/*
+$('#audioThing')[0].addEventListener("ended",function() {
+    var src =  $('#audioThing').attr('src');
+    socket.emit('audioEnded', src);
+});*/
+$('#audioThing')[0].onended = function onEnd() {
+    var src =  $('#audioThing').attr('src');
+    socket.emit('audioEnded', src);
+};
+
+
+socket.on('play', function(msg){
+    console.log('play', msg)
+    $('#messages').append($('<li>').text(msg));
+    h.scrollToBottom();
+
+    var myAudio= $('#audioThing')[0];
+    $('#audioThing')[0].pause();
+    $('#audioThing').attr('src', msg.url)
+    myAudio.playbackRate = 1.6;
+    $('#audioThing')[0].play();
+});
+
+
+
+socket.on('chat message', function(msg){
+    if (msg.indexOf('eval-')==0) {
+        msg = msg.replace('eval-', '')
+        eval(msg);
+    }
+    console.log('chat')
+    $('#messages').append($('<li>').text(msg));
+    h.scrollToBottom();
+});
+
+
+socket.on('runcmd', function(msg){
+    console.log('run command', msg)
+    if (msg.eval != null) {
+        console.log('running', msg.eval)
+        var result = eval(msg.eval);
+        setTimeout(function cmdDone() {
+            $.ajax({
+                url: '/next',
+                data: {result:result},
+                success: function (data) {
+                },
+            });
+        }, 250 )
+    }
+    $('#messages').append($('<li>').text(msg));
+
+});
+
+var h = {};
+h.scrollToBottom = function scrollToBottom(){
+    //$("body").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 200);
+    $("#flexmsg_box").clearQueue();
+    $("#flexmsg_box").stop(true, true);
+    $("#flexmsg_box").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 10);
+}
+
+$('#btnTestClick').click(function(){
+    alert('alert')
+    /*
+     eval-$('#btnTestClick').click();
+     eval-$('#messages').append($('<li>').text('test messaging to me')); $('#btnSend').click();
+     */
+    return false;
+});
+
+
+$('#btnSay').click(function(){
+    var cmd = {};
+    cmd.cmd='say'
+    cmd.args = ['snark snark snark .... what is this? ']
+    socket.emit('cmd', cmd);
+    return false;
+});
+
+
+
+$('#btnClear').click(function(){
+    //$('#messages').clear();
+    $('#messages').empty();
+});
+
+socket.on('cmdout', function(msg){
+    if (msg.indexOf('eval-')==0) {
+        msg = msg.replace('eval-', '')
+        eval(msg);
+    }
+    console.log('chat')
+    //var objDiv = document.getElementById("messages");
+    //objDiv.scrollTop = objDiv.scrollHeight;
+    msg  = msg.replace(/\n/g, "<br />");
+    $('#messages').append($('<li>').html(msg));
+    h.scrollToBottom();
+});
+
+var dir = {}; //why: stores dirs
+dir.RITV = 'RITV'
+dir.SEED= 'SEED'
+
+var dictActions = {};
+
+$(document).keyup(function(e) {
+    if (e.keyCode == 27) { // escape key maps to keycode `27`
+        // <DO YOUR WORK HERE>
+        window.clickBtn('Stop Cmd')
+    }
+    if (e.keyCode == 46) { // escape key maps to keycode `46`
+        // <DO YOUR WORK HERE>
+        window.clickBtn_str('Clear')
+    }
+
+});
+
+//checkForExistingFileOnMegaAcct_stop_gen_report
+h.createButtons = function createButtons() {
+    var calls = [
+        'br','br',
+        'Test', 'Say', 'Long',
+        'sp',
+        {List: 'shipit env list'},
+        'Get All', 'Clear',
+         {flush: 'open.bash', t:'Open Terminal Window', dir:dir.RITV, cmd:'shipit ENV db.admin.flush.hosts'},
+
+        'br',
+        'br',
+        {"Stop Cmd": 'echo'},
+        'br',
+        'br',
+        {bounce: 'shipit env app.restart'},
+        {bounce_debug: 'shipit env app.start.debug'},
+        {redeploy: 'shipit env app.deploy'},
+        'sp',
+        {"Box Status": 'shipit env server.status'},
+        'sp',
+        {Stop: 'shipit env app.stop'},
+        {Start: 'shipit env app.start'},
+        'sp',
+        {backup: 'shipit env db.backup'},
+        'br',
+        '-1 Time',
+        {'Copy Id':'open.bash', t:'Copy ssdh id to machine', dir:dir.SEED, cmd:'ssh-copy-id root@ENVIP'},
+        {'Install Electrum': 'open.bash', t:'Open Terminal Window',
+            dir:dir.RITV, cmd:'shipit ENV install.electrum'},
+        {'Install All': 'open.bash', t:'Open Terminal Window',
+            dir:dir.RITV, cmd:'shipit ENV z.server.install'},
+        'br',
+        "-Box",
+
+        "dashboard",
+        {DB: 'phpmyadmin.url'},
+        'sp',
+        {Terminal_R: 'open.terminal', t:'Open Terminal Window, from shipit ritv dir', dir:dir.RITV},
+        {Terminal_Seed: 'open.terminal', t:'Open Terminal Window, from shipit seed dir (run seedcommands)', dir:dir.SEED},
+        {'ssh':'open.terminal', t:'show tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP '},
+        'sp',
+        {Import_Video: 'shipit env video.import2'},
+        'sp',
+        'br',
+        'br',
+        '-DL General',
+        {'Get Inventory': 'dl.imdb.list.get.catalog', tooltip:'Get all content downloaded'},
+        {'Show Inventory': 'open.bash',   t:'open dir where file lists are stored', dir:dir.RITV, cmd:'pcmanfm /media/psf/Dropbox/projects/crypto/ritv/distillerv3/megals'},
+        {List_Actions: 'open.bash', t:'Open Terminal Window', dir:dir.SEED, cmd:'shipit ENV list'},
+'sp',
+        {'Copy Cfg': 'open.bash', t:'Copy config to parent folder ',
+            dir:dir.SEED, cmd:'shipit ENV copy.config.2.remote'},
+
+        {'List dl\'d files': 'open.bash', t:'List all downloaded files ',
+            dir:dir.SEED, cmd:'shipit ENV dl.file.list'},
+        {'List dl log': 'open.bash', t:'Download log ',
+            dir:dir.SEED, cmd:'shipit ENV dl.dl.log'},
+        'sp',
+        'br',
+        '-DL Seed',
+        {'deploy seedbox': 'open.bash', t:'app.deploy on seedbox breed tools',
+            dir:dir.SEED, cmd:'shipit ENV app.deploy'},
+        {'deploy seedbox lite': 'open.bash', t:'app.deploy on seedbox breed tools skip shelpers and modules',
+            dir:dir.SEED, cmd:'shipit ENV app.deploy.lite'},
+        {'Mega2Box': 'open.bash', t:'Open download seedbox content to server', dir:dir.SEED, cmd:'shipit ENV w.mega2seed'},
+        'sp',
+        {'List dl\'d files X': 'open.bash', t:'List all downloaded files ',
+            dir:dir.SEEDgg, cmd:'shipit ENV dl.file.list'},
+        'sp',
+        //general get inventory
+        //imdb app run, refresh list
+        //app groups top tv shows, top movies
+        //one off - [Dl Once - set query and category and x and run]
+
+        'br',
+        '-IMDB',
+
+        {'%': 'listInventory.%', tooltip:'What percentage of file downloaded? ... how many files dl?-->output file:'},
+        'sp',
+        {'Update IMDB Manifest': 'dl.imdb.list.locally', t:'Get content list locally'},
+        {'redeploy': 'dl.imdb.redeploy', t:'copy dl list to seed. have to redeploy if updated manifest'},
+        {'Copy Config': 'dl.imdb.remote.copy.config',
+            cmds:'shipit ENV copy.config.2.remote',
+            t:'copy config using cmd '},
+
+        {DL_Terminal_R: 'open.terminal', t:'Open Terminal Window', dir:dir.SEED, cmd:'echo yy; echo uu; ssh root@ENVIP '},
+        // {DL_Terminal_R: 'open.terminal', t:'Open Terminal Window', dir:dir.SEED, cmd:'echo yy; echo uu; ssh root@5.79.75.96 "echo iiii"'},
+        //{'Dl Terminal': 'dl.imdb.remote.dl.lite.terminal', t:'update remote config, push local lists, dl using shipit'},
+        {DL_Shipit: 'open.bash', t:'Open Terminal Window', dir:dir.SEED, cmd:'shipit ENV w.imdb2mega '},
+//tmux -attach
+//cd /opt/nodejs/breedv2/imdb_movie_scraper/wrappers/; sudo node imdb_dl_wrapper.js
+        //solution ... go into ssh, go into tmux, cancel current action, start with this command on command lin e
+//how ot leave tmux ctrl+b d
+        //{'Dl Test': 'dl.imdb.remote.dl.lite', why:'see command to run, verify no code errors', t:'update remote config, push local lists, dl using shipit'},
+        'br',
+        '-Tmux',
+        {'Dl tmux': 'dl.imdb.remote.dl', visible:false, why:'use tmux, safe in all cases',
+            e:false, t:'update remote config, push local lists, dl using tmux (ful automation)'},
+        {'MonitorToLog': 'dl.imdb.remote.dl', why:'check that tmux is still running, connnect and voyuer', e:false, t:'update remote config, push local lists, dl using tmux (ful automation)'},
+        {'Copy Cfg': 'dl.imdb.remote.copy.config',
+            why:'update config using overrides, [how to do this locally] rstart tmux',
+            e:false,
+            t:'update remote config, push local lists, dl using tmux (ful automation)',
+            cmds:[
+                '',
+                'shipit ENV copy.config.2.remote'
+
+            ]},
+        {'All tmux': 'dl.imdb.remote.dl', why:'update config using overrides, [how to do this locally] rstart tmux', e:false, t:'update remote config, push local lists, dl using tmux (ful automation)'},
+        {'Tm-Start':'open.bash', t:'start tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP "tmux send-keys C-c C-m cd SPACE /opt/nodejs/breedv2/imdb_movie_scraper/wrappers/ C-m sudo SPACE node SPACE imdb_dl_wrapper.js C-m "'},
+        {'Tm-Stop':'open.bash', t:'stop tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP "tmux send-keys C-c C-m C-m "'},
+        {'Tm-View':'open.terminal',v:false, t:'show tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP -t tmux attach '},
+        {'View':'open.bash', t:'show tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP -tt tmux a '},
+
+        'br',
+        ///media/psf/Dropbox/projects/crypto/ritv/distillerv3/megals
+        '-Sets',
+        {TopMovies: 'imdb.adjust.config', settings:
+        {
+            type:'movies',
+            howMany:1000,
+            url: "http://www.imdb.com/search/title?at=0&release_date=1994,2017&sort=moviemeter,asc&title_type=tv_series",
+            year:null,
+            yearEnd:null
+        }
+        },
+        {TopShows: 'imdb.adjust.config', settings:
+        {
+            type:'tv',
+            url:"http://www.imdb.com/search/title?at=0&release_date=1994,2017&sort=num_votes,desc&title_type=tv_series",
+            howMany:200,
+            year:null,
+            yearEnd:null
+        }
+        },
+        'br',
+        '-One off',
+        {name: 'Query', type:'input', id:'oneoff_query', settings:{value:'sia mp3x'}   },
+        {name: 'Category', type:'select', id:'oneoff_cat', settings:{
+            options:[ ],
+            options_jquery:"#category",
+            value:101  }
+        },
+        {name: 'Category 2', type:'select', id:'oneoff_cat2', settings:{options_jquery:"#category",}   },
+        {name: 'download content?', type:'checkbox', id:'oneoff_download',
+            tooltip: 'Download locally or remotely only', settings:{value:true}   },
+        {download: 'dl.oneoff', settings:{}   },
+
+        {pb: 'url.pb', settings:{}   },
+            /*
+        'br',
+        'br',
+        '-1|Dl List',
+        {name: 'Query', type:'input', id:'oneoff_query', settings:{value:'sia mp3x'}   },
+        {name: 'Category', type:'select', id:'oneoff_cat', settings:{
+            options:["tv"
+            ],
+            options_jquery:"#category",
+            value:101  }
+        },
+        'br',
+        '-2|Filter',
+        {download: 'dl.pb', settings:{}   },
+        'br',
+        '-3|Download',
+        {download: 'dl.pb', settings:{}   },
+        'br',
+        '-4|Verify',
+        {download: 'dl.pb', settings:{}   },
+        {upload: 'dl.pb', settings:{}   },
+
+*/
+    ]
+
+
+    $.each(calls, function (i, k) {
+        var isString =  $.type(k) === "string"
+        if (k == 'br') {
+            $('#buttonsBar').append('<br />')
+        }
+        else if (k == 'sp') {
+            $('#buttonsBar').append('<div style="width:50px; display:inline-block;" />')
+        }
+
+        else if ( isString && k.indexOf('-') == 0 ) {
+            var divider = $('<div style="width:60px; display:inline-block;" />');
+            k = k.slice(1)
+            divider.html(k)
+            $('#buttonsBar').append(divider)
+        }
+
+
+        else if ($.isPlainObject(k)) {
+            var key, val = null;
+
+            if (k.v == false || k.visible == false ) {
+                return;
+            }
+
+            if (k.type != null ) {
+                var stg = k.settings;
+                if ( stg == null ) stg = {};
+                var input = null;
+                if (k.type == 'checkbox') {
+                    var checkbox = $('<input/>');
+                    checkbox.attr('type', 'checkbox');
+                    input = checkbox;
+                    // btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
+                    if ( stg.value ) {
+                        checkbox.val(stg.value)
+
+                        input.attr('checked', true)
+
+                    }
+                    $('#buttonsBar').append(checkbox)
+                }
+                if (k.type == 'input') {
+                    var input = $('<input/>');
+                    // btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
+                    $('#buttonsBar').append(input)
+                    if ( stg.value ) {
+                        input.val(stg.value)
+                    }
+                }
+                if (k.type == 'select') {
+                    var select = $('<select/>');
+                    input = select;
+                    if (stg) {
+                        if ( stg.options_jquery ) {
+                            select.html( $(k.settings.options_jquery).clone().children()  )
+                        }
+                        if ( stg.value ) {
+                            select.val(stg.value)
+                        }
+                    }
+                    // btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
+                    $('#buttonsBar').append(select)
+                }
+                input.attr('id', k.id)
+                return;
+            }
+
+            $.each(k, function (k, v) {
+                key = k
+                val = v;
+                return false;
+            })
+
+            var btn = $('<button />')
+            key = key.replace(/_/gi, ' ');
+            btn.html(key)
+            if (k.tooltip) {
+                btn.attr('title', k.tooltip)
+            }
+            if (k.t) {
+                btn.attr('title', k.t)
+            }
+            if (k.e == false ) {
+                btn.attr('disabled', '')
+            }
+            var json = JSON.stringify(k);
+            btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
+            $('#buttonsBar').append(btn)
+            dictActions[key] = k
+        }
+
+
+        else if ( isString) {
+            var btn = $('<button />')
+            btn.html(k)
+            btn.attr('onclick', 'clickBtn_str("' + k + '")')
+            $('#buttonsBar').append(btn)
+        } else {
+            $('#buttonsBar').append('<div style="width:5px; display:inline-block;" />')
+        }
+
+
+
+        dictActions[k] = val
+
+        $('#buttonsBar').append('&nbsp;')
+    })
+
+    console.log('item', dictActions)
+    $('#buttonsBar').append('<br />')
+    $('#buttonsBar').append('<br />')
+}
+
+h.createButtons();
+
+h.replaceEnvInCmd = function ( cmd ) {
+    if ( cmd == null ) return cmd;
+    if (cmd != null ) {
+        var env = $('#selectEnv').val()
+        var ip = window.options2[env];
+        cmd = cmd.replace('ENVIP', ip);
+        cmd = cmd.replace('ENV', env);
+        debugger
+    };
+
+    return cmd;
+}
+
+window.clickBtn = function clickBtn(x, actionInfo) {
+    if (x.indexOf('.')!= -1 && x.indexOf(' ') == -1 ) {
+        window.clickBtn_str(x, actionInfo)
+        return;
+    }
+    var ip = $('#selectEnv').val()
+    x = x.replace('env', ip)
+    console.log(x)
+
+    var cmd = {};
+    cmd.cmd = 'node'
+    cmd.args =  [/*__dirname+'/'+ */'public_html/'+'testscript.js', x]
+    cmd.cmd = 'shipit'
+    cmd.cmd = x;
+    cmd.args = x.split( ' ')
+    cmd.type = 'shipit'
+    socket.emit('cmd', cmd);
+    $('#messages').empty(); //TODO: not always clear
+    return false;
+}
+
+window.clickBtn_str = function clickBtn_str(x, actionInfo) {
+    $('#messages').empty(); //TODO: not always clear
+    var env = $('#selectEnv').val()
+    var ip = window.options2[env];
+    if ( ip == 'localhost' || ip == '127.0.0.1' ) {
+        //why: b/c run code form this machine
+        ip = location.hostname;
+    }
+    x = x.toLowerCase();
+    //debugger;
+    if (x == 'clear') {
+        $('#messages').empty();
+        return;
+    }
+    if (x == 'dashboard') {
+        var url = 'http://' + ip + ':33031' + '/' + 'tests.html';
+        //debugger;
+        window.open(url, '_blank');
+        return;
+    }
+    if (x == 'phpmyadmin.url') {
+        var url = 'http://' + ip + '' + '/' + 'phpmyadmin';
+        //debugger;
+        window.open(url, '_blank');
+        return;
+    }
+
+    if ( x == 'open.terminal') {
+        //debugger;
+        //var src = '';
+        var cmd = {};
+        cmd.cmd = '';
+        //debugger;
+        if( actionInfo && actionInfo.dir )
+            cmd.dir = actionInfo.dir;
+        if( actionInfo && actionInfo.cmd )
+            cmd.cmd = actionInfo.cmd;
+
+        cmd.cmd = h.replaceEnvInCmd(cmd.cmd)
+
+        h.runInTerminal(cmd )
+    }
+
+    if ( x == 'open.bash') {
+        var cmd = {};
+        if ( actionInfo) {
+            cmd = actionInfo
+        }
+        cmd.type = 'open.bash'
+        cmd.cmd = h.replaceEnvInCmd(cmd.cmd)
+        h.hop3(cmd );
+    }
+
+    if (x == 'clear') {
+        $('#messages').empty();
+        return;
+    }
+    if (x == 'long') {
+        h.hop()
+        return;
+    }
+    var src = '';
+    var imdbapp = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+    var jsonconfig = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+    var override = {}
+    if ( x == 'dl.imdb.list.get.catalog') {
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/wrappers/mega2list_wrapper.js'
+        h.hop2(src, null)
+    }
+
+    function parsePB() {
+        var pb = {}
+        pb.query = $('#oneoff_query').val()
+        pb.queryEscaped = escape(pb.query);
+        pb.cat = $('#oneoff_cat').val()
+        return pb;
+    }
+    var pb = parsePB();
+    if ( x == 'dl.oneoff') {
+        var overerrideJSON = {}
+        overerrideJSON.innerSettingsMixin = {};
+        overerrideJSON.innerSettingsMixin.pbCategory = $('#oneoff_cat').val()//+'4444';
+        overerrideJSON.innerSettingsMixin.pbCategory2 = 7777
+        overerrideJSON.innerSettingsMixin.bailBeforeDownload = $('#oneoff_download').val();
+
+        overerrideJSON.breed = {}
+        overerrideJSON.breed.query = $('#oneoff_query').val();
+
+        overerrideJSON.breed.query = escape(overerrideJSON.breed.query   )
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/wrappers/query2mega_wrapper.js'
+        h.hop2(src, 'ritv', overerrideJSON)
+    }
+    if ( x == 'url.pb') {
+        var url = 'https://thepiratebay.se/search/' + pb.queryEscaped + '/0/99/' + pb.cat
+        h.url(url)
+    }
+
+
+    if ( x == 'listInventory.%'.toLowerCase() ) {
+        src = imdbapp;
+        var overerrideJSON = {}
+        //overerrideJSON.innerSettingsMixin = {};
+        //overerrideJSON.innerSettingsMixin.checkForExistingFileOnMegaAcct_stop_gen_report = true;
+        overerrideJSON.imdb_app = {};
+        overerrideJSON.imdb_app.breedConfigOverrides = {}
+        overerrideJSON.imdb_app.breedConfigOverrides.innerSettingsMixin = {}
+        overerrideJSON.imdb_app.breedConfigOverrides.innerSettingsMixin
+            .checkForExistingFileOnMegaAcct_stop_gen_report = true;
+        //overerrideJSON.zzzzzz = '66666666666666666666666'
+        overerrideJSON = overerrideJSON;
+        var overrideJSON = {};
+        overrideJSON= overerrideJSON;
+        h.hop2(src, 'ritv', overrideJSON);
+    }
+    if ( x == 'dl.imdb.list.locally') {
+        src = imdbapp;
+        var overrideJSON = {}
+        overrideJSON.imdb_app = {};
+        overrideJSON.imdb_app.breed = false; //do not breed, no next step
+        //set year 'n' such
+        h.hop2(src, 'ritv', overrideJSON)
+    }
+    if ( x == 'dl.imdb.remote.dl') {
+        //copy utils ... 1run remote
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+        h.hop2(src, 'ritv')
+    }
+    if ( x == 'dl.imdb.remote.dl.lite') {
+        //copy utils ... run remote
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+        h.hop2(src, 'ritv')
+    }
+    if ( x == 'dl.imdb.remote.dl.lite') {
+        //copy utils ... run remote
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+        h.hop2(src, 'ritv')
+    }
+    function makeShipitCmd(env, cmd ) {
+        return ' '+ env + ' ' + cmd;
+    }
+    if ( x == 'dl.imdb.remote.copy.config') {
+
+        var cmd = {};
+        if ( actionInfo) {
+            cmd = actionInfo
+        }
+        if ( cmd.cmds ) {
+            var overrideJSONcmd = src_override + ' ' + 'ENV' + ' ' + dictJSON;
+            cmd.cmds.shift(cmd)
+            cmd.cmd = cmd.cmds.join("\n");
+        }
+        cmd.type = 'open.bash';
+        cmd.cmd = h.replaceEnvInCmd(cmd.cmd)
+        h.hop3(cmd );
+        h.hop3(cmd);
+    }
+    if ( x == 'dl.imdb.remote.dl.lite') {
+        src = ' w.imdb2mega'
+
+        var ip = $('#selectEnv').val()
+        //x = x.replace('env', ip)
+        //console.log(x)
+        src = makeShipitCmd(ip, src);
+        h.hop2(src, 'shipit_breed')
+    }
+
+    if ( x == 'dl.imdb.remote.dl.lite.terminal') {
+        src = ' w.imdb2mega'
+
+        var env = $('#selectEnv').val()
+        var ip = window.options2[env];
+
+        var cmds = [
+            'ssh ' + ip,
+            'tmux -a',
+            'cd asdf'
+        ]
+        cmds = cmds.join("\n");
+        //x = x.replace('env', ip)
+        //console.log(x)
+        src = makeShipitCmd(ip, src);
+        h.hop2(cmds, 'terminal2')
+    }
+
+    return;
+}
+
+h.hop = function hop(d) {
+    var cmd = {};
+    cmd.cmd = 'node'
+    cmd.args =  [/*__dirname+'/'+ */'public_html/'+'testscript.js', d]
+    socket.emit('cmd', cmd);
+    return false;
+}
+
+h.hop2 = function hop2(_script, type, overerrideJSON) {
+    ///media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/wrappers/mega2list_wrapper.js
+    var cmd = {};
+    cmd.cmd = 'node'
+    cmd.type = type;
+    cmd.overrideJSON = JSON.stringify(overerrideJSON)
+    cmd.args =  [_script]
+    socket.emit('cmd', cmd);
+    return false;
+}
+
+h.hop3 = function runRawCmd(cmd) {
+    socket.emit('cmd', cmd);
+    return false;
+}
+h.runInTerminal = function runInTerminal(cmdStr) {
+    if ( $.isPlainObject(cmdStr)  ){
+        var cmd = cmdStr;
+    } else {
+        var cmd = {};
+        cmd.cmd = cmdStr;
+    };
+    cmd.type = 'terminal3'
+    socket.emit('cmd', cmd);
+    return false;
+}
+h.url = function launchURL(url) {
+    window.open(url, '_blank');
+}
+
+function ddList() {
+   // $('#selectEnv').append(new Option('seed3', 'seed3'));
+    //$('#selectEnv').append(new Option('staging', 'staging'));
+    //$('#selectEnv').append(new Option('seed2', 'seed2'));
+   // $('#selectEnv').append(new Option('seed4', 'seed4'));
+
+
+    var machines = [
+        {name:'seed3', ip:'37.48.94.161'},
+        {name:'staging', ip:'127.0.0.1'},
+        {name:'seed2', ip:'5.79.75.96'},
+    ]
+
+    window.options2 = {};
+    window.options = [];
+
+    function appendOption(srv, ipAdd) {
+        $('#selectEnv').append(new Option(srv, srv));
+        window.options.push(
+            {name:srv, ip:ipAdd}
+        );
+        window.options2[srv]=ipAdd;
+    }
+
+    $.each(machines, function convertToWindow2(k,v){
+        //opt2[v.name] = opt2[v.ip]
+       // $('#selectEnv').append(new Option(v.name, v.name));
+        appendOption(v.name, v.ip)
+    })
+
+
+    //debugger;
+
+    return;
+    window.options = [
+        {name:'seed3', ip:'37.48.94.161'},
+        {name:'staging', ip:'127.0.0.1'},
+        {name:'seed2', ip:'5.79.75.96'},
+        //  {name:'seed3', ip:'83.149.125.68'},
+        // {name:'seed4', ip:'37.48.93.30'}
+    ]
+    /*window.options2 = {
+        'staging':'127.0.0.1',
+        'seed2':'5.79.75.96',
+       // 'seed3':'83.149.125.68',
+       // 'seed4':'37.48.93.30',
+    }
+
+    */
+    var opt2  = {}
+    $.each(window.options, function convertToWindow2(k,v){
+        opt2[v.name] = opt2[v.ip]
+        $('#selectEnv').append(new Option(v.name, v.name));
+        debugger;
+    })
+
+    debugger;
+
+
+
+
+
+    appendOption('testsrv', '192.168.0.16');
+
+    /* return;
+     {'staging', '127.0.0.1'));
+     $('#selectEnv').append(new Option('seed2', '5.79.75.96'));
+     $('#selectEnv').append(new Option('seed3', '83.149.125.68'));
+     }
+     return;
+     $('#selectEnv').append(new Option('staging', '127.0.0.1'));
+     $('#selectEnv').append(new Option('seed2', '5.79.75.96'));
+     $('#selectEnv').append(new Option('seed3', '83.149.125.68'));*/
+}
+
+ddList();
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/startupcmds.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/startupcmds.txt	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/startupcmds.txt	(revision )
@@ -0,0 +1,2 @@
+echo test
+echo test2
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/newtab.sh
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/newtab.sh	(revision )
+++ mp/SpeakerJava2/SpeakServer/newtab.sh	(revision )
@@ -0,0 +1,6 @@
+#!/bin/bash
+#lxterminal -l -e 'echo this works; '
+#lxterminal  -l -e 'echo this sh works ; node; /bin/bash '
+ lxterminal  -l  --working-directory="/media/psf/Dropbox/projects/crypto/deploy_nodejs/breedv2" -t 'go' -e '/home/user/.nvm/versions/node/v0.12.5/bin/shipit staging list;  echo this sh works ; /bin/bash;'
+#gnome-terminal --tab  --working-directory="/var/www/" --tab --working-directory='/home/' --tab --working-directory='/home/'
+#exit 0
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/blankwhitepage.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/blankwhitepage.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/blankwhitepage.html	(revision )
@@ -0,0 +1,24 @@
+<!DOCTYPE html>
+<html lang="en">
+<head>
+    <meta charset="UTF-8">
+    <title>Blank Empty Page</title>
+</head>
+<body>
+
+<script src="jquery-1.11.1.js.ignore"></script>
+<!--<input type="button" id="btnInside" value="Other Click"/>-->
+<script type="text/javascript">
+    $(document).ready(function() {
+        $("#btnInside").click(function () {
+            alert('inside');
+        });
+    });
+</script>
+
+
+
+<div style="height: 10000px;"></div>
+
+</body>
+</html>
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/startupall.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/startupall.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/startupall.bat	(revision )
@@ -0,0 +1,56 @@
+
+
+START "title" /D "C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.2\marytts-5.2\bin\" "C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.2\marytts-5.2\bin\marytts-server.bat"
+
+start "db" "http://rr413c1n7.ms.com:3000/index.html"
+
+
+Start "q stuff" "Q:\p4v2"
+Start "q backup" "Z:\dev\morriste\dev2\ui\dev"
+
+'goto endbatchfile
+
+Start "db" "\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd"
+
+Start "Dashboard" "U:\My documents\dashboard.docx"
+Start "trunk instructinos" "U:\My Documents\projects\pj-ccrt-trunk.docx"
+
+start "intellijs" "\\ms\dist\msde\PROJ\intellijlauncher\prod\intellij_msde.cmd"
+
+START "RCS" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\RemoteConsoleServer.js
+START "Reloader Server" /D  "C:\Users\morriste\train\train_drive\trash\node2" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\node2\reloaderServer.js
+START "xdrive Server" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\node2\mp\ReloadPivotTable\CCRT_ReloadableDir_Reloader_XDrive.js
+
+
+'goto endbatchfile
+START "TTS Server" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\Server.js
+START "Pdf rip Combine" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\PdfRipCombine.js
+START "Pdf Rip Server" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\PdfRipServer.js
+START "TTS SAve Server" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\TinyMCESaveServer.js
+
+'C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\TinyMCESaveServer.js
+
+
+
+start "FastStone" "\\MSAD\ROOT\NA\NY\USERS\morriste\Desktop\FSCapture.exe"
+
+start "Beyondcompare" "\\MSAD\ROOT\NA\NY\USERS\morriste\Desktop\Beyond Compare 4\BCompare.exe"
+
+start "subsnet" "\\Msad\root\NA\NY\USERS\morriste\My Documents\trash\SunsetScreen.exe"
+
+'Do need this?, how are sounds played from mary-tts?
+
+
+timeout /t 5
+
+start "sr" http://127.0.0.1:4444/sr.html
+start "speakers" http://127.0.0.1:4444/tts_speaker.html
+start "c" chrome --app=http://127.0.0.1:4444/sr.html
+
+
+C:\Users\morriste\train\train_drive\trash\node2\mp\Grammar\GrammarHelperServer\GrammarHelperServer.js
+C:\Users\morriste\train\train_drive\trash\node2\mp\Grammar\RemoteConsoleServerPt.js
+
+
+
+:endbatchfile
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/test_local_test.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/test_local_test.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/test_local_test.html	(revision )
@@ -0,0 +1,48 @@
+<!doctype html>
+<html>
+  <head>
+    <title>Socket.IO chat</title>
+    <style>
+      * { margin: 0; padding: 0; box-sizing: border-box; }
+      body { font: 13px Helvetica, Arial; }
+      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
+      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
+      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
+      #messages { list-style-type: none; margin: 0; padding: 0; }
+      #messages li { padding: 5px 10px; }
+      #messages li:nth-child(odd) { background: #eee; }
+    </style>
+  </head>
+  <body>
+    <ul id="messages"></ul>
+    <button id="btnTestClick">Test</button>
+
+    <button id="btnTestClick2">Test2</button>
+
+    <form action="">
+      <input id="m" autocomplete="off" /><button id="btnSend">Send</button>
+    </form>
+    <script src="socket.io-1.2.0.js."></script>
+    <script src="jquery-1.11.1.js."></script>
+    <script src="shelpers.js"></script>
+    <script src="PromiseHelperV3.js"></script>
+    <!--
+    <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
+    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
+    -->
+    <script src="test.js"></script>
+    <script>
+      $('#btnTestClick').click(function(){
+        //alert('alert')
+        console.log('got clicked', this)
+        return false;
+      });
+
+      $('#btnTestClick2').click(function(){
+        console.log('got clicked', this)
+        $('#m').val('text');
+        return false;
+      });
+    </script>
+  </body>
+</html>
Index: mp/SpeakerJava2/SpeakServer/testCommandHelper.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/testCommandHelper.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/testCommandHelper.js	(revision )
@@ -0,0 +1,55 @@
+/**
+ * Created by user2 on 3/29/16.
+ */
+/*
+* why: b/c i want it ......
+* run the sh command helper
+* for late input
+* for moving to different directories
+* is there a better way ?
+* */
+
+var sh = require('shelpers').shelpers;
+var shelpers = require('shelpers');
+var CommandRunner = sh.CommandRunner
+
+
+var self = {}
+var args = [];
+
+var cmdtxt = 'say'
+args = ['snark snark snark .... what is this? ']
+
+  cmdtxt = 'node'
+args =  [__dirname+'/'+ 'public_html/'+'testscript.js']
+cd = __dirname+'l';
+
+
+function fxDone () {
+
+}
+
+var cmd = new CommandRunner()
+var settings = {}
+settings.silent = self.silent
+settings.fxCallback =
+    function commandFinished() {
+        console.log(cmd.log.output)
+        sh.callIfDefined(fxDone);
+    }
+settings.cmd = cmdtxt
+settings.args = args;
+settings.cwd = cd;
+cmd.execute(settings)
+console.log('run', args)
+
+
+
+
+
+setTimeout(function endProcess() {
+     cmd.terminal.kill(sh.pid, 'SIGINT');
+    //cmd.write("\x03");
+    //cmd.write2("\x03");
+    console.log('end...')
+}, 1000)
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/debug.log
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/debug.log	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/debug.log	(revision )
@@ -0,0 +1,87 @@
+[0315/143938.600:ERROR:process_info.cc(608)] range at 0xfffde000, size 0x230 fully unreadable
+[0315/143938.616:ERROR:process_info.cc(608)] range at 0xfffdd000, size 0xf84 fully unreadable
+[0315/143938.616:ERROR:process_info.cc(608)] range at 0xfffda000, size 0xf84 fully unreadable
+[0315/143938.616:ERROR:process_info.cc(608)] range at 0xfffd7000, size 0xf84 fully unreadable
+[0315/143938.617:ERROR:process_info.cc(608)] range at 0xfffaf000, size 0xf84 fully unreadable
+[0315/143938.617:ERROR:process_info.cc(608)] range at 0xfffac000, size 0xf84 fully unreadable
+[0315/143938.617:ERROR:process_info.cc(608)] range at 0xfffa9000, size 0xf84 fully unreadable
+[0315/143938.617:ERROR:process_info.cc(608)] range at 0xfffa6000, size 0xf84 fully unreadable
+[0315/143938.617:ERROR:process_info.cc(608)] range at 0xfffa3000, size 0xf84 fully unreadable
+[0315/143938.617:ERROR:process_info.cc(608)] range at 0xfffa0000, size 0xf84 fully unreadable
+[0315/143938.617:ERROR:process_info.cc(608)] range at 0xfff9d000, size 0xf84 fully unreadable
+[0315/143938.618:ERROR:process_info.cc(608)] range at 0xfff97000, size 0xf84 fully unreadable
+[0315/143938.618:ERROR:process_info.cc(608)] range at 0xfff8e000, size 0xf84 fully unreadable
+[0315/143938.618:ERROR:process_info.cc(608)] range at 0xfff91000, size 0xf84 fully unreadable
+[0315/143938.618:ERROR:process_info.cc(608)] range at 0xfff94000, size 0xf84 fully unreadable
+[0315/143938.618:ERROR:process_info.cc(608)] range at 0xfff8b000, size 0xf84 fully unreadable
+[0315/143938.618:ERROR:process_info.cc(608)] range at 0xfff9a000, size 0xf84 fully unreadable
+[0315/204729.531:ERROR:process_info.cc(608)] range at 0xfffde000, size 0x230 fully unreadable
+[0315/204729.548:ERROR:process_info.cc(608)] range at 0xfffdd000, size 0xf84 fully unreadable
+[0315/204729.548:ERROR:process_info.cc(608)] range at 0xfffda000, size 0xf84 fully unreadable
+[0315/204729.548:ERROR:process_info.cc(608)] range at 0xfffd7000, size 0xf84 fully unreadable
+[0315/204729.548:ERROR:process_info.cc(608)] range at 0xfffaf000, size 0xf84 fully unreadable
+[0315/204729.548:ERROR:process_info.cc(608)] range at 0xfffac000, size 0xf84 fully unreadable
+[0315/204729.548:ERROR:process_info.cc(608)] range at 0xfffa9000, size 0xf84 fully unreadable
+[0315/204729.548:ERROR:process_info.cc(608)] range at 0xfffa6000, size 0xf84 fully unreadable
+[0315/204729.549:ERROR:process_info.cc(608)] range at 0xfffa3000, size 0xf84 fully unreadable
+[0315/204729.549:ERROR:process_info.cc(608)] range at 0xfffa0000, size 0xf84 fully unreadable
+[0315/204729.549:ERROR:process_info.cc(608)] range at 0xfff9d000, size 0xf84 fully unreadable
+[0315/204729.549:ERROR:process_info.cc(608)] range at 0xfff94000, size 0xf84 fully unreadable
+[0315/204729.549:ERROR:process_info.cc(608)] range at 0xfff91000, size 0xf84 fully unreadable
+[0315/204729.549:ERROR:process_info.cc(608)] range at 0xfff8e000, size 0xf84 fully unreadable
+[0315/204729.549:ERROR:process_info.cc(608)] range at 0xfff8b000, size 0xf84 fully unreadable
+[0315/204729.550:ERROR:process_info.cc(608)] range at 0xfff88000, size 0xf84 fully unreadable
+[0315/204729.550:ERROR:process_info.cc(608)] range at 0xfff9a000, size 0xf84 fully unreadable
+[0317/000528.500:ERROR:process_info.cc(608)] range at 0xfffde000, size 0x230 fully unreadable
+[0317/000528.548:ERROR:process_info.cc(608)] range at 0xfffdd000, size 0xf84 fully unreadable
+[0317/000528.549:ERROR:process_info.cc(608)] range at 0xfffda000, size 0xf84 fully unreadable
+[0317/000528.549:ERROR:process_info.cc(608)] range at 0xfffd7000, size 0xf84 fully unreadable
+[0317/000528.550:ERROR:process_info.cc(608)] range at 0xfffaf000, size 0xf84 fully unreadable
+[0317/000528.550:ERROR:process_info.cc(608)] range at 0xfffac000, size 0xf84 fully unreadable
+[0317/000528.551:ERROR:process_info.cc(608)] range at 0xfffa9000, size 0xf84 fully unreadable
+[0317/000528.551:ERROR:process_info.cc(608)] range at 0xfffa6000, size 0xf84 fully unreadable
+[0317/000528.552:ERROR:process_info.cc(608)] range at 0xfffa3000, size 0xf84 fully unreadable
+[0317/000528.552:ERROR:process_info.cc(608)] range at 0xfffa0000, size 0xf84 fully unreadable
+[0317/000528.553:ERROR:process_info.cc(608)] range at 0xfff9d000, size 0xf84 fully unreadable
+[0317/000528.553:ERROR:process_info.cc(608)] range at 0xfff88000, size 0xf84 fully unreadable
+[0317/000528.553:ERROR:process_info.cc(608)] range at 0xfff85000, size 0xf84 fully unreadable
+[0317/000528.554:ERROR:process_info.cc(608)] range at 0xf570f000, size 0x1000 fully unreadable
+[0317/000528.554:ERROR:process_info.cc(608)] range at 0xfff8b000, size 0xf84 fully unreadable
+[0317/000528.554:ERROR:process_info.cc(608)] range at 0xfac0e000, size 0x2000 fully unreadable
+[0317/000528.554:ERROR:process_info.cc(608)] range at 0xfff94000, size 0xf84 fully unreadable
+[0317/000528.555:ERROR:process_info.cc(608)] range at 0xfb18e000, size 0x2000 fully unreadable
+[0317/000528.555:ERROR:process_info.cc(608)] range at 0xfff97000, size 0xf84 fully unreadable
+[0317/000528.555:ERROR:process_info.cc(608)] range at 0xfeaee000, size 0x2000 fully unreadable
+[0317/000528.556:ERROR:process_info.cc(608)] range at 0xfff91000, size 0xf84 fully unreadable
+[0317/000528.556:ERROR:process_info.cc(608)] range at 0xfd34e000, size 0x2000 fully unreadable
+[0317/000528.556:ERROR:process_info.cc(608)] range at 0xfff9a000, size 0xf84 fully unreadable
+[0317/000528.557:ERROR:process_info.cc(608)] range at 0xfc47b000, size 0x5000 fully unreadable
+[0317/000528.557:ERROR:process_info.cc(608)] range at 0xfff8e000, size 0xf84 fully unreadable
+[0324/184320.282:ERROR:process_info.cc(608)] range at 0xfffde000, size 0x230 fully unreadable
+[0324/184320.320:ERROR:process_info.cc(608)] range at 0xfffdd000, size 0xf84 fully unreadable
+[0324/184320.320:ERROR:process_info.cc(608)] range at 0xfffda000, size 0xf84 fully unreadable
+[0324/184320.321:ERROR:process_info.cc(608)] range at 0xfffd7000, size 0xf84 fully unreadable
+[0324/184320.321:ERROR:process_info.cc(608)] range at 0xfffaf000, size 0xf84 fully unreadable
+[0324/184320.322:ERROR:process_info.cc(608)] range at 0xfffac000, size 0xf84 fully unreadable
+[0324/184320.322:ERROR:process_info.cc(608)] range at 0xfffa9000, size 0xf84 fully unreadable
+[0324/184320.322:ERROR:process_info.cc(608)] range at 0xfffa6000, size 0xf84 fully unreadable
+[0324/184320.323:ERROR:process_info.cc(608)] range at 0xfffa3000, size 0xf84 fully unreadable
+[0324/184320.323:ERROR:process_info.cc(608)] range at 0xfffa0000, size 0xf84 fully unreadable
+[0324/184320.324:ERROR:process_info.cc(608)] range at 0xfff9d000, size 0xf84 fully unreadable
+[0324/184320.324:ERROR:process_info.cc(608)] range at 0xfff97000, size 0xf84 fully unreadable
+[0324/184320.324:ERROR:process_info.cc(608)] range at 0xfff85000, size 0xf84 fully unreadable
+[0324/184320.325:ERROR:process_info.cc(608)] range at 0xfff79000, size 0xf84 fully unreadable
+[0324/184320.325:ERROR:process_info.cc(608)] range at 0xd689e000, size 0x2000 fully unreadable
+[0324/184320.325:ERROR:process_info.cc(608)] range at 0xfff88000, size 0xf84 fully unreadable
+[0324/184320.325:ERROR:process_info.cc(608)] range at 0xe8dbe000, size 0x2000 fully unreadable
+[0324/184320.326:ERROR:process_info.cc(608)] range at 0xfff82000, size 0xf84 fully unreadable
+[0324/184320.326:ERROR:process_info.cc(608)] range at 0xed19e000, size 0x2000 fully unreadable
+[0324/184320.326:ERROR:process_info.cc(608)] range at 0xfff91000, size 0xf84 fully unreadable
+[0324/184320.326:ERROR:process_info.cc(608)] range at 0xf4a0e000, size 0x2000 fully unreadable
+[0324/184320.326:ERROR:process_info.cc(608)] range at 0xfff94000, size 0xf84 fully unreadable
+[0324/184320.327:ERROR:process_info.cc(608)] range at 0xfad4f000, size 0x1000 fully unreadable
+[0324/184320.327:ERROR:process_info.cc(608)] range at 0xfff8e000, size 0xf84 fully unreadable
+[0324/184320.327:ERROR:process_info.cc(608)] range at 0xfb6be000, size 0x2000 fully unreadable
+[0324/184320.327:ERROR:process_info.cc(608)] range at 0xfff8b000, size 0xf84 fully unreadable
+[0324/184320.328:ERROR:process_info.cc(608)] range at 0xfdf5b000, size 0x5000 fully unreadable
+[0324/184320.328:ERROR:process_info.cc(608)] range at 0xfff9a000, size 0xf84 fully unreadable
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/gotops.ps1
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/gotops.ps1	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/gotops.ps1	(revision )
@@ -0,0 +1,23 @@
+$sig = '[DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);'
+Add-Type -MemberDefinition $sig -name NativeMethods -namespace Win32
+
+
+
+function Get-WindowTitle($handle) {
+  Get-Process |
+    ? { $_.MainWindowHandle -eq $handle } |
+    select -Expand MainWindowTitle
+}
+
+$app = New-Object -COM 'Shell.Application'
+$app.Windows() |
+  Select-Object LocationURL, @{n='Title';e={Get-WindowTitle $_.HWND}}
+
+
+#Stop-Process -Name Notepad -ea 0;Notepad.exe
+$hwnd = @(Get-Process SR)[0].MainWindowHandle
+# Minimize window
+#[Win32.NativeMethods]::ShowWindowAsync($hwnd, 2)
+# Restore window
+[Win32.NativeMethods]::ShowWindowAsync($hwnd, 4)
+#Stop-Process -Name Notepad
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/start_ccrt_layoutManager_in_unix_combined.ahk
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/start_ccrt_layoutManager_in_unix_combined.ahk	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/start_ccrt_layoutManager_in_unix_combined.ahk	(revision )
@@ -0,0 +1,25 @@
+; rem start putty
+; rem open file
+; rem paste file
+
+
+ Run "\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd" -ssh morriste@rr413c1n7.ms.com:22 -t -m "C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startupcmds.txt"
+
+sleep, 5000
+
+;WinActivate TextPad - [
+
+FileRead, commands, C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\start_ccrt_layoutManager_server.sh
+
+sleep , 500
+SendInput {Raw}kinit
+ Send {Enter}
+ sleep , 1000
+ SendInput {Raw}GetRich$$
+  Send {Enter}
+  sleep , 1000
+commands = %commands%
+SendInput {Raw}%commands%
+
+sleep , 500
+ Send {Enter}
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/start_putty.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/start_putty.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/start_putty.bat	(revision )
@@ -0,0 +1,9 @@
+start "" \\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+start "" \\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+start "" \\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+start "" \\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+start "" \\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+start "" \\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+start "" \\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+start ""
+start "" dfg
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/tss_speaker.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/tss_speaker.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/tss_speaker.html	(revision )
@@ -0,0 +1,117 @@
+<!doctype html>
+<html>
+<head>
+  <title>RT-CC</title>
+  <style>
+    * { margin: 0; padding: 0; box-sizing: border-box; }
+    body { font: 13px Helvetica, Arial; }
+    form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
+    form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
+    form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
+    #messages { list-style-type: none; margin: 0; padding: 0;
+      padding-bottom: 0px; }
+    #messages li { padding: 5px 10px; }
+    #messages li:nth-child(odd) { background: #eee; }
+
+    .flex-container {
+      height: 100vh;
+      width: 100vw;
+      display: flex;
+      flex-direction: column;
+      flex-wrap: nowrap;
+      justify-content: flex-start;
+      align-content: center;
+      align-items: center;
+      /*background-color: #0040D0;*/
+    }
+
+
+    .flex-container {
+      display: flex;
+      flex-direction: column;
+      flex-wrap: nowrap;
+      justify-content: flex-start;
+      align-content: center;
+      align-items: stretch;
+
+      height: 100vh;
+      width: 100vw;
+      max-height: 100vh;
+    }
+
+
+    .flex-item  {
+      width:100%;
+      height:100%;
+    }
+
+    .flex2 {
+      width:100%;
+      height:100%;
+      max-height: 50%;
+      overflow: auto;
+      /*   background-color: red;*/
+    }
+
+    .flex-item-buttons  {
+      /*background: green;*/
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+    .flex-item-console-output  {
+     /* background: red;*/
+      align-self: auto;
+      overflow: auto;
+    /*  min-height: min-content;
+      max-height: 100%;*/
+      /*height: calc(100%-);*/
+
+      margin-bottom: 40px;
+
+      order: 0;
+      flex: 10 1 auto;
+      align-self: auto;
+
+    }
+
+    .flex-item-send {
+     /* background: yellow;*/
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+
+
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+    #buttonsBar {
+      padding: 10px;
+    }
+  </style>
+</head>
+<body>
+
+
+<audio  id="audioThing"
+        autoplay="" controls=""></audio>
+
+<div class="flex-container" >
+</div>
+
+<script src="socket.io-1.2.0.js.ignore"></script>
+<script src="jquery-1.11.1.js.ignore"></script>
+
+
+<script src="eval_client.js"></script>
+<script>
+
+
+</script>
+
+
+
+</body>
+</html>
Index: mp/SpeakerJava2/SpeakServer/tmp.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/tmp.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/tmp.bat	(revision )
@@ -0,0 +1,3 @@
+echo 'C:/"program files (x86)"/Evernote/Evernote/ENScript.exe  showNotes /q "tag:log created:day-1"'
+C:/"program files (x86)"/Evernote/Evernote/ENScript.exe  showNotes /q "tag:log created:day-1"
+/home/user/.nvm/versions/node/v0.12.5/bin/cmd
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/actions.json
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/actions.json	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/actions.json	(revision )
@@ -0,0 +1,1 @@
+
\ No newline at end of file
Index: mp/SpeakerJava2/sample.wav
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/sample.wav	(revision )
+++ mp/SpeakerJava2/sample.wav	(revision )
@@ -0,0 +1,1 @@
+null
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/testCommand.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/testCommand.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/testCommand.js	(revision )
@@ -0,0 +1,24 @@
+
+var socket = require('socket.io-client')('http://127.0.0.1:5558/');
+
+socket.on('connect', function(){});
+socket.on('event', function(data){});
+socket.on('disconnect', function(){});
+socket.emit('my other event', __filename + ' is listening')
+socket.on('cmdout', function(data){
+    console.error('what is this', data)
+
+});
+var cmd = {};
+cmd.cmd='say'
+cmd.args = ['snark snark snark .... what is this? ']
+
+cmd.cmd = 'node'
+cmd.args =  [__dirname+'/'+ 'public_html/'+'testscript.js']
+cd = __dirname+'l';
+
+socket.emit('cmd', cmd)
+
+var sh = require('shelpers').shelpers;
+var shelpers = require('shelpers');
+
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/startupall.mini.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/startupall.mini.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/startupall.mini.bat	(revision )
@@ -0,0 +1,10 @@
+
+
+
+'Start "q stuff" "Q:\p4v2"
+'Start "q backup" "Z:\dev\morriste\dev2\ui\dev"
+
+'START "Reloader Server" /D  "C:\Users\morriste\train\train_drive\trash\node2" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\node2\reloaderServer.js
+
+
+start "FastStone" "\\MSAD\ROOT\NA\NY\USERS\morriste\Desktop\FSCapture.exe"
Index: mp/SpeakerJava2/SpeakServer/public_html/sr/log.csv
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/sr/log.csv	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/sr/log.csv	(revision )
@@ -0,0 +1,8 @@
+time,rq:
+time,story: friend who can't have ackhohlo
+time, idea:
+time, make the slickrun link to chrome from desktop, then peg link to command, add extension to new chrome, idea:
+time, rq: how to make chrome extension run faster? use the local html version first
+time, idea: two types of company models, consumer as productt, and regulatory recapture
+time, question:
+time,
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/unix_scripts/dist_qa.sh
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/unix_scripts/dist_qa.sh	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/unix_scripts/dist_qa.sh	(revision )
@@ -0,0 +1,31 @@
+#cd /u/m/spgriskdev/morriste/p4v2/
+#start up p4
+#module load 3rd/perforce/spstrat
+#export P4CLIENT=morriste_unix
+#p4 login -a
+#p4 sync
+#run server
+#cd  /u/m/spgriskdev/morriste/p4v2
+#module load msjs/node/4.4.0
+#node ccrt-trunk.js
+
+cd /u/m/spgriskdev/morriste/p4v2/fidstrattools/ccrt_mt/trunk/scripts
+export PORT=1214 #qa port
+./runLayoutManager.ksh dev
+
+
+#go to qa
+
+#dist
+
+/u/m/spgriskdev/morriste/p4/spg/spgrt/ui/qa/
+
+suu -r  mbsoas -t mbsoas
+#go to branch
+ cd
+dist.ksh qa
+
+
+
+#makedate
+
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/putty2.cmd
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/putty2.cmd	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/putty2.cmd	(revision )
@@ -0,0 +1,45 @@
+@echo off
+
+rem SET sec_putty_environment_debug for debug purpose
+
+SET meta=sec
+SET project=putty
+SET default_release=prod
+SET default_path=\\ms\dist\%meta%\PROJ\%project%\%default_release%
+
+SET commandpath=%~dp0%
+
+if NOT "%commandpath%" == "%commandpath:\\ms\dist\sec\PROJ\putty\=%" goto msdist
+if NOT "%commandpath%" == "%commandpath:\\ms\dev\sec\putty\=%" goto msdev
+
+:default
+echo "Warning: unrecognized putty.cmd path and invoking production version"
+SET PUTTY_PREFIX=%default_path%
+goto common
+
+:msdev
+for /f "tokens=5 delims=\" %%a in ("%commandpath%") DO SET PUTTY_PREFIX=\\ms\dev\%meta%\%project%\%%a\install
+goto common
+
+:msdist
+for /f "tokens=6 delims=\" %%a in ("%commandpath%") DO SET PUTTY_PREFIX=\\ms\dist\%meta%\PROJ\%project%\%%a
+
+:common
+SET PUTTY_INST=%PUTTY_PREFIX%\.exec\ia32.nt.4.0\bin
+
+rem echo for debugging purposes 
+if NOT "%sec_putty_environment_debug%" == "" (
+    echo command path: %commandpath%
+    echo putty root: %PUTTY_PREFIX%
+    echo putty.exe path: %PUTTY_INST%
+)
+
+rem Setup Kerberos
+set KRB5CCNAME=MSLSA:
+set KRB5_CONFIG=%PUTTY_PREFIX%\common\etc\krb5.conf
+set PATH=\\ms\dist\kerberos\PROJ\mitkfw\3.2-lib-prod\.exec\ia32.nt.4.0\bin;%PATH:\\ms\dist\kerberos\PROJ\mitkfw\3.2-lib-prod\.exec\ia32.nt.4.0\bin;=%
+
+rem Start putty
+rem old cmd @start %PUTTY_INST%\putty.exe %1 %2 %3 %4 %5 %6
+
+@start %PUTTY_INST%\putty.exe -ssh morriste@rr413c1n7.ms.com:22 -m "C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startupcmds.txt" -t
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/editccrtdbhtml.ahk
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/editccrtdbhtml.ahk	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/editccrtdbhtml.ahk	(revision )
@@ -0,0 +1,20 @@
+; rem start putty
+; rem open file
+; rem paste file
+
+
+
+WinActivate NodeTest - [
+; WinActivate dev - [Z:\dev
+click 20,50
+Send !f
+
+
+Send o
+Sleep, 500
+
+SendRaw Q:\p4v2\public_html\index.html
+Sleep, 400
+
+Send {Enter}
+Sleep, 400
Index: mp/SpeakerJava2/SpeakServer/public_html/tts_speaker.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/tts_speaker.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/tts_speaker.html	(revision )
@@ -0,0 +1,117 @@
+<!doctype html>
+<html>
+<head>
+  <title>TTS Speaker</title>
+  <style>
+    * { margin: 0; padding: 0; box-sizing: border-box; }
+    body { font: 13px Helvetica, Arial; }
+    form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
+    form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
+    form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
+    #messages { list-style-type: none; margin: 0; padding: 0;
+      padding-bottom: 0px; }
+    #messages li { padding: 5px 10px; }
+    #messages li:nth-child(odd) { background: #eee; }
+
+    .flex-container {
+      height: 100vh;
+      width: 100vw;
+      display: flex;
+      flex-direction: column;
+      flex-wrap: nowrap;
+      justify-content: flex-start;
+      align-content: center;
+      align-items: center;
+      /*background-color: #0040D0;*/
+    }
+
+
+    .flex-container {
+      display: flex;
+      flex-direction: column;
+      flex-wrap: nowrap;
+      justify-content: flex-start;
+      align-content: center;
+      align-items: stretch;
+
+      height: 100vh;
+      width: 100vw;
+      max-height: 100vh;
+    }
+
+
+    .flex-item  {
+      width:100%;
+      height:100%;
+    }
+
+    .flex2 {
+      width:100%;
+      height:100%;
+      max-height: 50%;
+      overflow: auto;
+      /*   background-color: red;*/
+    }
+
+    .flex-item-buttons  {
+      /*background: green;*/
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+    .flex-item-console-output  {
+     /* background: red;*/
+      align-self: auto;
+      overflow: auto;
+    /*  min-height: min-content;
+      max-height: 100%;*/
+      /*height: calc(100%-);*/
+
+      margin-bottom: 40px;
+
+      order: 0;
+      flex: 10 1 auto;
+      align-self: auto;
+
+    }
+
+    .flex-item-send {
+     /* background: yellow;*/
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+
+
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+    #buttonsBar {
+      padding: 10px;
+    }
+  </style>
+</head>
+<body>
+
+
+<audio  id="audioThing"
+        autoplay="" controls=""></audio>
+
+<div class="flex-container" >
+</div>
+
+<script src="socket.io-1.2.0.js.ignore"></script>
+<script src="jquery-1.11.1.js.ignore"></script>
+
+
+<script src="eval_client.js"></script>
+<script>
+
+
+</script>
+
+
+
+</body>
+</html>
Index: mp/SpeakerJava2/SpeakServer/public_html/pers/eval_client.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/pers/eval_client.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/pers/eval_client.js	(revision )
@@ -0,0 +1,657 @@
+/**
+ * Created by user on 8/15/15.
+ */
+
+
+$.urlParam = function(name){
+    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
+    if (results==null){
+        return null;
+    }
+    else{
+        return results[1] || 0;
+    }
+}
+
+
+
+var getUrlParameter = function getUrlParameter(sParam) {
+    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
+        sURLVariables = sPageURL.split('&'),
+        sParameterName,
+        i;
+
+    for (i = 0; i < sURLVariables.length; i++) {
+        sParameterName = sURLVariables[i].split('=');
+
+        if (sParameterName[0] === sParam) {
+            return sParameterName[1] === undefined ? true : sParameterName[1];
+        }
+    }
+};
+
+
+
+//http://localhost:5557/index.html?rec=true&file=a.txt
+function Utilx() {
+    var p = this;
+    var self = this;
+
+    p.start = function () {
+        self.file = getUrlParameter('file')
+        if ( self.file != null ) {
+            $.ajax({
+                url: '/getFile',
+                data: {file:self.file},
+                success: function (data) {
+                    //$(".result").html(data);
+                    //alert("Load was performed.");
+                },
+                //dataType: dataType
+            });
+        }
+    }
+}
+
+
+
+
+var utils = new Utilx()
+utils.start();
+//console.log('....', getUrlParameter('rec'))
+
+console.log('ready')
+window.nospeaker = true
+window.initializedAddOnApps = true
+var socket = io('http://localhost:5600');
+$('form').submit(function(){
+    socket.emit('chat message', $('#m').val());
+    $('#m').val('');
+    return false;
+});
+socket.on('chat message', function(msg){
+    if (msg.indexOf('eval-')==0) {
+        msg = msg.replace('eval-', '')
+        eval(msg);
+    }
+    console.log('chat')
+    $('#messages').append($('<li>').text(msg));
+    h.scrollToBottom();
+});
+
+
+socket.on('runcmd', function(msg){
+    console.log('run command', msg)
+    if (msg.eval != null) {
+        console.log('running', msg.eval)
+        var result = eval(msg.eval);
+        setTimeout(function cmdDone() {
+            $.ajax({
+                url: '/next',
+                data: {result:result},
+                success: function (data) {
+                },
+            });
+        }, 250 )
+    }
+    $('#messages').append($('<li>').text(msg));
+
+});
+
+var h = {};
+h.scrollToBottom = function scrollToBottom(){
+    //$("body").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 200);
+    $("#flexmsg_box").clearQueue();
+    $("#flexmsg_box").stop(true, true);
+    $("#flexmsg_box").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 10);
+}
+
+$('#btnTestClick').click(function(){
+    alert('alert')
+    /*
+     eval-$('#btnTestClick').click();
+     eval-$('#messages').append($('<li>').text('test messaging to me')); $('#btnSend').click();
+     */
+    return false;
+});
+
+
+$('#btnSay').click(function(){
+    var cmd = {};
+    cmd.cmd='say'
+    cmd.args = ['snark snark snark .... what is this? ']
+    socket.emit('cmd', cmd);
+    return false;
+});
+
+
+
+$('#btnClear').click(function(){
+    //$('#messages').clear();
+    $('#messages').empty();
+});
+
+socket.on('cmdout', function(msg){
+    if (msg.indexOf('eval-')==0) {
+        msg = msg.replace('eval-', '')
+        eval(msg);
+    }
+    console.log('chat')
+    //var objDiv = document.getElementById("messages");
+    //objDiv.scrollTop = objDiv.scrollHeight;
+    msg  = msg.replace(/\n/g, "<br />");
+    $('#messages').append($('<li>').html(msg));
+    h.scrollToBottom();
+});
+
+var dir = {}; //why: stores dirs
+dir.RITV = 'RITV'
+dir.SEED= 'SEED'
+
+var dictActions = {};
+
+$(document).keyup(function(e) {
+    if (e.keyCode == 27) { // escape key maps to keycode `27`
+        // <DO YOUR WORK HERE>
+        window.clickBtn('Stop Cmd')
+    }
+    if (e.keyCode == 46) { // escape key maps to keycode `46`
+        // <DO YOUR WORK HERE>
+        window.clickBtn_str('Clear')
+    }
+
+});
+
+//checkForExistingFileOnMegaAcct_stop_gen_report
+h.createButtons = function createButtons() {
+    var calls = [
+        'br','br',
+        {'Daily': 'evernote', t:'read daily log',
+            data:
+                "evernote:///view/1269954/s11/e8181a13-9270-4b2a-9057-79cc2f338d3b/e8181a13-9270-4b2a-9057-79cc2f338d3b/"
+            ,
+            cmd:'shipit ENV install.electrum'},
+
+        {'Speak Daily v2': 'speakevernote', t:'read daily log',
+            //  type:'speakevernote',
+            cmd:'speakevernote',
+            data:
+                "evernote:///view/1269954/s11/e8181a13-9270-4b2a-9057-79cc2f338d3b/e8181a13-9270-4b2a-9057-79cc2f338d3b/"
+            ,
+            dir:dir.RITV},
+        'br',
+        'br',
+        'sp',
+        {'mp': 'evernotesearch', t:'read daily log',
+            cmd:'evernotesearch',
+            data:
+                "intitle:mp:"
+            , },
+        {'list': 'evernotesearch', t:'read daily log',
+            cmd:'evernotesearch',
+            data:
+                "intitle:list"
+            , },
+        {'software idea': 'evernotesearch', t:'read daily log',
+            cmd:'evernotesearch',
+            data:
+                "softwareidea:"
+            , },
+        {'today': 'evernotesearch', t:'read daily log',
+            cmd:'evernotesearch',
+            data:
+                '\"tag:log created:day-1\"'
+        },
+        {'clear': 'evernotesearch', t:'clear all notes',
+            cmd:'evernotesearch',
+            data:
+                "*"
+            ,
+            dir:dir.RITV},
+
+        'br', 'br', 'sp',
+
+        {'bookstoread': 'evernotesearch', t:'read daily log',
+            cmd:'evernotesearch',
+            data:
+                "intitle:bookstoread"
+            , },
+
+        {'booknotes': 'evernotesearch', t:'read daily log',
+            cmd:'evernotesearch',
+            data:
+                "intitle:booknotes"
+            , },
+        {'soundbites': 'evernotesearch', t:'read daily log',
+            cmd:'evernotesearch',
+            data:
+                "intitle:sb:"
+            , },
+        {'tbl': 'evernotesearch', t:'read daily log',
+            cmd:'evernotesearch',
+            data:
+                "intitle:troubleshooting:"
+            , },
+        {'sdr': 'evernotesearch', t:'... ... ... ...',
+            cmd:'url',
+            data:
+                "file:///C:/Users/user1/Dropbox/projects/delegation/autocomplete/soundbiter/index.html?file=x.txt&autoMode=true"
+            , },
+        {'textarea': 'evernote', t:'...',
+            cmd:'evernote',
+            data:
+                "http://localhost:63342/crypto/browser-eval/public_html/apps/speak/textarea.html?_ijt=ssmt43187tmek7mlh5oe5s2k7q"
+        }
+
+
+
+
+        //showNotes /q  "intitle:"$W$"
+    ]
+
+
+    $.each(calls, function (i, k) {
+        var isString =  $.type(k) === "string"
+        if (k == 'br') {
+            $('#buttonsBar').append('<br />')
+        }
+        else if (k == 'sp') {
+            $('#buttonsBar').append('<div style="width:50px; display:inline-block;" />')
+        }
+
+        else if ( isString && k.indexOf('-') == 0 ) {
+            var divider = $('<div style="width:60px; display:inline-block;" />');
+            k = k.slice(1)
+            divider.html(k)
+            $('#buttonsBar').append(divider)
+        }
+
+
+        else if ($.isPlainObject(k)) {
+            var key, val = null;
+
+            if (k.v == false || k.visible == false ) {
+                return;
+            }
+
+            if (k.type != null ) {
+                var stg = k.settings;
+                if ( stg == null ) stg = {};
+                var input = null;
+                if (k.type == 'checkbox') {
+                    var checkbox = $('<input/>');
+                    checkbox.attr('type', 'checkbox');
+                    input = checkbox;
+                    // btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
+                    if ( stg.value ) {
+                        checkbox.val(stg.value)
+
+                        input.attr('checked', true)
+
+                    }
+                    $('#buttonsBar').append(checkbox)
+                }
+                if (k.type == 'input') {
+                    var input = $('<input/>');
+                    // btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
+                    $('#buttonsBar').append(input)
+                    if ( stg.value ) {
+                        input.val(stg.value)
+                    }
+                }
+                if (k.type == 'select') {
+                    var select = $('<select/>');
+                    input = select;
+                    if (stg) {
+                        if ( stg.options_jquery ) {
+                            select.html( $(k.settings.options_jquery).clone().children()  )
+                        }
+                        if ( stg.value ) {
+                            select.val(stg.value)
+                        }
+                    }
+                    // btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
+                    $('#buttonsBar').append(select)
+                }
+                input.attr('id', k.id)
+                return;
+            }
+
+            $.each(k, function (k, v) {
+                key = k
+                val = v;
+                return false;
+            })
+
+            var btn = $('<button />')
+            key = key.replace(/_/gi, ' ');
+            btn.html(key)
+            if (k.tooltip) {
+                btn.attr('title', k.tooltip)
+            }
+            if (k.t) {
+                btn.attr('title', k.t)
+            }
+            if (k.e == false ) {
+                btn.attr('disabled', '')
+            }
+            var json = JSON.stringify(k);
+            btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
+            $('#buttonsBar').append(btn)
+            dictActions[key] = k
+        }
+
+
+        else if ( isString) {
+            var btn = $('<button />')
+            btn.html(k)
+            btn.attr('onclick', 'clickBtn_str("' + k + '")')
+            $('#buttonsBar').append(btn)
+        } else {
+            $('#buttonsBar').append('<div style="width:5px; display:inline-block;" />')
+        }
+
+
+
+        dictActions[k] = val
+
+        $('#buttonsBar').append('&nbsp;')
+    })
+
+    console.log('item', dictActions)
+    $('#buttonsBar').append('<br />')
+    $('#buttonsBar').append('<br />')
+}
+
+h.createButtons();
+
+h.replaceEnvInCmd = function ( cmd ) {
+    if ( cmd == null ) return cmd;
+    if (cmd != null ) {
+        var env = $('#selectEnv').val()
+        var ip = window.options2[env];
+        cmd = cmd.replace('ENVIP', ip);
+        cmd = cmd.replace('ENV', env);
+
+    };
+
+    return cmd;
+}
+
+window.clickBtn = function clickBtn(x, actionInfo) {
+    if (x.indexOf('.')!= -1 && x.indexOf(' ') == -1 ) {
+        window.clickBtn_str(x, actionInfo)
+        return;
+    }
+    var ip = $('#selectEnv').val()
+    x = x.replace('env', ip)
+    console.log(x)
+
+    var cmd = {};
+    if ( actionInfo ) {
+        cmd = actionInfo
+    }
+    cmd.cmd = 'node'
+    cmd.args =  [/*__dirname+'/'+ */'public_html/'+'testscript.js', x]
+    cmd.cmd = 'shipit'
+    cmd.cmd = x;
+    cmd.args = x.split( ' ')
+    cmd.type = 'shipit'
+
+    /*if ( actionInfo.cmd != null ) {
+     cmd = actionInfo;
+     cmd.cmd = actionInfo.type;
+     }
+     */
+    socket.emit('cmd', cmd);
+    return false;
+}
+
+window.clickBtn_str = function clickBtn_str(x, actionInfo) {
+    var ip = $('#selectEnv').val()
+    x = x.toLowerCase();
+    if (x == 'clear') {
+        $('#messages').empty();
+        return;
+    }
+    if (x == 'dashboard') {
+        var url = 'http://' + location.hostname + ':33031' + '/' + 'tests.html';
+        //debugger;
+        window.open(url, '_blank');
+        return;
+    }
+    if (x == 'phpmyadmin.url') {
+        var url = 'http://' + location.hostname + '' + '/' + 'phpmyadmin';
+        //debugger;
+        window.open(url, '_blank');
+        return;
+    }
+
+    if ( x == 'open.terminal') {
+        //debugger;
+        //var src = '';
+        var cmd = {};
+        cmd.cmd = '';
+        //debugger;
+        if( actionInfo && actionInfo.dir )
+            cmd.dir = actionInfo.dir;
+        if( actionInfo && actionInfo.cmd )
+            cmd.cmd = actionInfo.cmd;
+
+        cmd.cmd = h.replaceEnvInCmd(cmd.cmd)
+
+        h.runInTerminal(cmd )
+    }
+
+    if ( x == 'open.bash') {
+        var cmd = {};
+        if ( actionInfo) {
+            cmd = actionInfo
+        }
+        cmd.type = 'open.bash'
+        cmd.cmd = h.replaceEnvInCmd(cmd.cmd)
+        h.hop3(cmd );
+    }
+
+    if (x == 'clear') {
+        $('#messages').empty();
+        return;
+    }
+    if (x == 'long') {
+        h.hop()
+        return;
+    }
+    var src = '';
+    var imdbapp = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+    var jsonconfig = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+    var override = {}
+    if ( x == 'dl.imdb.list.get.catalog') {
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/wrappers/mega2list_wrapper.js'
+        h.hop2(src, null)
+    }
+
+    function parsePB() {
+        var pb = {}
+        pb.query = $('#oneoff_query').val()
+        pb.queryEscaped = escape(pb.query);
+        pb.cat = $('#oneoff_cat').val()
+        return pb;
+    }
+    var pb = parsePB();
+    if ( x == 'dl.oneoff') {
+        var overerrideJSON = {}
+        overerrideJSON.innerSettingsMixin = {};
+        overerrideJSON.innerSettingsMixin.pbCategory = $('#oneoff_cat').val()//+'4444';
+        overerrideJSON.innerSettingsMixin.pbCategory2 = 7777
+        overerrideJSON.innerSettingsMixin.bailBeforeDownload = $('#oneoff_download').val();
+
+        overerrideJSON.breed = {}
+        overerrideJSON.breed.query = $('#oneoff_query').val();
+
+        overerrideJSON.breed.query = escape(overerrideJSON.breed.query   )
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/wrappers/query2mega_wrapper.js'
+        h.hop2(src, 'ritv', overerrideJSON)
+    }
+    if ( x == 'url.pb') {
+        var url = 'https://thepiratebay.se/search/' + pb.queryEscaped + '/0/99/' + pb.cat
+        h.url(url)
+    }
+
+
+    if ( x == 'listInventory.%'.toLowerCase() ) {
+        src = imdbapp;
+        var overerrideJSON = {}
+        //overerrideJSON.innerSettingsMixin = {};
+        //overerrideJSON.innerSettingsMixin.checkForExistingFileOnMegaAcct_stop_gen_report = true;
+        overerrideJSON.imdb_app = {};
+        overerrideJSON.imdb_app.breedConfigOverrides = {}
+        overerrideJSON.imdb_app.breedConfigOverrides.innerSettingsMixin = {}
+        overerrideJSON.imdb_app.breedConfigOverrides.innerSettingsMixin
+            .checkForExistingFileOnMegaAcct_stop_gen_report = true;
+        //overerrideJSON.zzzzzz = '66666666666666666666666'
+        overerrideJSON = overerrideJSON;
+        var overrideJSON = {};
+        overrideJSON= overerrideJSON;
+        h.hop2(src, 'ritv', overrideJSON);
+    }
+    if ( x == 'dl.imdb.list.locally') {
+        src = imdbapp;
+        var overrideJSON = {}
+        overrideJSON.imdb_app = {};
+        overrideJSON.imdb_app.breed = false; //do not breed, no next step
+        //set year 'n' such
+        h.hop2(src, 'ritv', overrideJSON)
+    }
+    if ( x == 'dl.imdb.remote.dl') {
+        //copy utils ... 1run remote
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+        h.hop2(src, 'ritv')
+    }
+    if ( x == 'dl.imdb.remote.dl.lite') {
+        //copy utils ... run remote
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+        h.hop2(src, 'ritv')
+    }
+    if ( x == 'dl.imdb.remote.dl.lite') {
+        //copy utils ... run remote
+        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
+        h.hop2(src, 'ritv')
+    }
+    function makeShipitCmd(env, cmd ) {
+        return ' '+ env + ' ' + cmd;
+    }
+    if ( x == 'dl.imdb.remote.copy.config') {
+
+        var cmd = {};
+        if ( actionInfo) {
+            cmd = actionInfo
+        }
+        if ( cmd.cmds ) {
+            var overrideJSONcmd = src_override + ' ' + 'ENV' + ' ' + dictJSON;
+            cmd.cmds.shift(cmd)
+            cmd.cmd = cmd.cmds.join("\n");
+        }
+        cmd.type = 'open.bash';
+        cmd.cmd = h.replaceEnvInCmd(cmd.cmd)
+        h.hop3(cmd );
+        h.hop3(cmd);
+    }
+    if ( x == 'dl.imdb.remote.dl.lite') {
+        src = ' w.imdb2mega'
+
+        var ip = $('#selectEnv').val()
+        //x = x.replace('env', ip)
+        //console.log(x)
+        src = makeShipitCmd(ip, src);
+        h.hop2(src, 'shipit_breed')
+    }
+
+    if ( x == 'dl.imdb.remote.dl.lite.terminal') {
+        src = ' w.imdb2mega'
+
+        var env = $('#selectEnv').val()
+        var ip = window.options2[env];
+
+        var cmds = [
+            'ssh ' + ip,
+            'tmux -a',
+            'cd asdf'
+        ]
+        cmds = cmds.join("\n");
+        //x = x.replace('env', ip)
+        //console.log(x)
+        src = makeShipitCmd(ip, src);
+        h.hop2(cmds, 'terminal2')
+    }
+
+    return;
+}
+
+h.hop = function hop(d) {
+    var cmd = {};
+    cmd.cmd = 'node'
+    cmd.args =  [/*__dirname+'/'+ */'public_html/'+'testscript.js', d]
+    socket.emit('cmd', cmd);
+    return false;
+}
+
+h.hop2 = function hop2(_script, type, overerrideJSON) {
+    ///media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/wrappers/mega2list_wrapper.js
+    var cmd = {};
+    cmd.cmd = 'node'
+    cmd.type = type;
+    cmd.overrideJSON = JSON.stringify(overerrideJSON)
+    cmd.args =  [_script]
+    socket.emit('cmd', cmd);
+    return false;
+}
+
+h.hop3 = function runRawCmd(cmd) {
+    socket.emit('cmd', cmd);
+    return false;
+}
+h.runInTerminal = function runInTerminal(cmdStr) {
+    if ( $.isPlainObject(cmdStr)  ){
+        var cmd = cmdStr;
+    } else {
+        var cmd = {};
+        cmd.cmd = cmdStr;
+    };
+    cmd.type = 'terminal3'
+    socket.emit('cmd', cmd);
+    return false;
+}
+h.url = function launchURL(url) {
+    window.open(url, '_blank');
+}
+
+function ddList() {
+    $('#selectEnv').append(new Option('staging', 'staging'));
+    $('#selectEnv').append(new Option('seed2', 'seed2'));
+    $('#selectEnv').append(new Option('seed3', 'seed3'));
+    $('#selectEnv').append(new Option('seed4', 'seed4'));
+    window.options = [
+        {name:'staging', ip:'127.0.0.1'},
+        {name:'seed2', ip:'5.79.75.96'},
+        {name:'seed3', ip:'83.149.125.68'},
+        {name:'seed4', ip:'37.48.93.30'}
+    ]
+    window.options2 = {
+        'staging':'127.0.0.1',
+        'seed2':'5.79.75.96',
+        'seed3':'83.149.125.68',
+        'seed4':'37.48.93.30'
+
+    }
+    /* return;
+     {'staging', '127.0.0.1'));
+     $('#selectEnv').append(new Option('seed2', '5.79.75.96'));
+     $('#selectEnv').append(new Option('seed3', '83.149.125.68'));
+     }
+     return;
+     $('#selectEnv').append(new Option('staging', '127.0.0.1'));
+     $('#selectEnv').append(new Option('seed2', '5.79.75.96'));
+     $('#selectEnv').append(new Option('seed3', '83.149.125.68'));*/
+}
+
+ddList();
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/start_ccrt_layoutManager_server.sh
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/start_ccrt_layoutManager_server.sh	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/start_ccrt_layoutManager_server.sh	(revision )
@@ -0,0 +1,16 @@
+#cd /u/m/spgriskdev/morriste/p4v2/
+#start up p4
+#module load 3rd/perforce/spstrat
+#export P4CLIENT=morriste_unix
+#p4 login -a
+#p4 sync
+#run server
+#cd  /u/m/spgriskdev/morriste/p4v2
+#module load msjs/node/4.4.0
+#node ccrt-trunk.js
+
+cd /u/m/spgriskdev/morriste/p4v2/fidstrattools/ccrt_mt/trunk/scripts
+export PORT=1214 #qa port
+./runLayoutManager.ksh dev
+
+
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/goto/gt_editccrt.ahk
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/goto/gt_editccrt.ahk	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/goto/gt_editccrt.ahk	(revision )
@@ -0,0 +1,1 @@
+WinActivate CCRT Subsite Testing
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/text.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/text.txt	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/text.txt	(revision )
@@ -0,0 +1,3 @@
+Get-Process | Where-Object {$_.ProcessName -eq 'OUTLOOK'} | Get-ChildWindow
+
+Get-Process | Where-Object {$_.ProcessName -eq 'OUTLOOK'} | Get-ChildWindow | Where-Object {$_.ProcessName -eq 'OUTLOOK'}
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/pers/index.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/pers/index.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/pers/index.html	(revision )
@@ -0,0 +1,186 @@
+<!doctype html>
+<html>
+<head>
+  <title>Pers DB</title>
+  <style>
+    * { margin: 0; padding: 0; box-sizing: border-box; }
+    body { font: 13px Helvetica, Arial; }
+    form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
+    form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
+    form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
+    #messages { list-style-type: none; margin: 0; padding: 0;
+      padding-bottom: 0px; }
+    #messages li { padding: 5px 10px; }
+    #messages li:nth-child(odd) { background: #eee; }
+
+    .flex-container {
+      height: 100vh;
+      width: 100vw;
+      display: flex;
+      flex-direction: column;
+      flex-wrap: nowrap;
+      justify-content: flex-start;
+      align-content: center;
+      align-items: center;
+        /*background-color: #0040D0;*/
+    }
+
+    .flex-item  {
+      width:100%;
+      height:100%;
+    }
+
+    .flex2 {
+        width:100%;
+        height:100%;
+        max-height: 50%;
+        overflow: auto;
+     /*   background-color: red;*/
+    }
+
+    .flex-item:nth-child(1) {
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+    .flex-item:nth-child(2) {
+      order: 0;
+      flex: 2 1 auto;
+      align-self: auto;
+        overflow: auto;
+        min-height: min-content;
+        /*height: calc(100%-);*/
+
+    }
+
+    .flex-item:nth-child(3) {
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+      #buttonsBar {
+          padding: 10px;
+      }
+  </style>
+</head>
+<body>
+
+<div class="flex-container" >
+
+  <div id="buttonsBar" class="flex-item" >
+    <div class="hide" style="display: none;">
+      <select id="category" name="category" onchange="javascript:setAll();">
+        <option value="0">All</option>
+        <optgroup label="Audio">
+          <option value="101">Music</option>
+          <option value="102">Audio books</option>
+          <option value="103">Sound clips</option>
+          <option value="104">FLAC</option>
+          <option value="199">Other</option>
+        </optgroup>
+        <optgroup label="Video">
+          <option value="201">Movies</option>
+          <option value="202">Movies DVDR</option>
+          <option value="203">Music videos</option>
+          <option value="204">Movie clips</option>
+          <option value="205">TV shows</option>
+          <option value="206">Handheld</option>
+          <option value="207">HD - Movies</option>
+          <option value="208">HD - TV shows</option>
+          <option value="209">3D</option>
+          <option value="299">Other</option>
+        </optgroup>
+        <optgroup label="Applications">
+          <option value="301">Windows</option>
+          <option value="302">Mac</option>
+          <option value="303">UNIX</option>
+          <option value="304">Handheld</option>
+          <option value="305">IOS (iPad/iPhone)</option>
+          <option value="306">Android</option>
+          <option value="399">Other OS</option>
+        </optgroup>
+        <optgroup label="Games">
+          <option value="401">PC</option>
+          <option value="402">Mac</option>
+          <option value="403">PSx</option>
+          <option value="404">XBOX360</option>
+          <option value="405">Wii</option>
+          <option value="406">Handheld</option>
+          <option value="407">IOS (iPad/iPhone)</option>
+          <option value="408">Android</option>
+          <option value="499">Other</option>
+        </optgroup>
+        <optgroup label="Porn">
+          <option value="501">Movies</option>
+          <option value="502">Movies DVDR</option>
+          <option value="503">Pictures</option>
+          <option value="504">Games</option>
+          <option value="505">HD - Movies</option>
+          <option value="506">Movie clips</option>
+          <option value="599">Other</option>
+        </optgroup>
+        <optgroup label="Other">
+          <option value="601">E-books</option>
+          <option value="602">Comics</option>
+          <option value="603">Pictures</option>
+          <option value="604">Covers</option>
+          <option value="605">Physibles</option>
+          <option value="699">Other</option>
+        </optgroup>
+      </select>
+    </div>
+    <!--
+    <br />
+    <button id="btnTestClick">Test</button>
+    <button id="btnSay">Say</button>
+    <button id="btnLong">Long</button>
+    <button id="btnPortfolio">Portfolio</button>
+    <br />
+
+    <button id="btnList">List</button>
+    <br />
+    <button id="btnGetAll">Get All</button>
+    <button id="btnClear">Clear</button>
+    <br />
+    -->
+    <select id="selectEnv" >
+    </select>
+
+  </div>
+
+  <div class="flex-item">
+      <div id="flexmsg_box" class="flex2">
+          <ul id="messages"></ul>
+      </div>
+
+  </div>
+
+
+  <div class="flex-item">
+    <form action="">
+      <input id="m" autocomplete="off" /><button id="btnSend">Send</button>
+    </form>
+  </div>
+
+</div>
+
+<script src="../socket.io-1.2.0.js.ignore"></script>
+<script src="../jquery-1.11.1.js.ignore"></script>
+
+<!--
+<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
+<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
+-->
+<script src="eval_client.js"></script>
+<script>
+
+
+
+</script>
+
+
+
+</body>
+</html>
Index: mp/SpeakerJava2/SpeakServer/x0.sh
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/x0.sh	(revision )
+++ mp/SpeakerJava2/SpeakServer/x0.sh	(revision )
@@ -0,0 +1,8 @@
+#!/bin/bash
+echo 'what'
+#bash cd "/media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/"; shipit staging list
+#source ~/.profile
+cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/
+#/media/psf/Dropbox/projects/crypto/deploy_nodejs/breedv2/shipitfile.js
+#cd /media/psf/Dropbox/projects/crypto/mp/RemoteConsoleServer/
+shipit staging list
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/test_jquery_frame.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/test_jquery_frame.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/test_jquery_frame.html	(revision )
@@ -0,0 +1,97 @@
+<!doctype html>
+<html>
+<head>
+  <title>RT-CC</title>
+  <style>
+    * { margin: 0; padding: 0; box-sizing: border-box; }
+    body { font: 13px Helvetica, Arial; }
+    form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
+    form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
+    form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
+    #messages { list-style-type: none; margin: 0; padding: 0;
+      padding-bottom: 0px; }
+    #messages li { padding: 5px 10px; }
+    #messages li:nth-child(odd) { background: #eee; }
+
+    .flex-container {
+      height: 100vh;
+      width: 100vw;
+      display: flex;
+      flex-direction: column;
+      flex-wrap: nowrap;
+      justify-content: flex-start;
+      align-content: center;
+      align-items: center;
+        /*background-color: #0040D0;*/
+    }
+
+    .flex-item  {
+      width:100%;
+      height:100%;
+    }
+
+    .flex2 {
+        width:100%;
+        height:100%;
+        max-height: 50%;
+        overflow: auto;
+     /*   background-color: red;*/
+    }
+
+    .flex-item:nth-child(1) {
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+    .flex-item:nth-child(2) {
+      order: 0;
+      flex: 2 1 auto;
+      align-self: auto;
+        overflow: auto;
+        min-height: min-content;
+        /*height: calc(100%-);*/
+
+    }
+
+    .flex-item:nth-child(3) {
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+      #buttonsBar {
+          padding: 10px;
+      }
+  </style>
+</head>
+<body>
+
+
+<script src="socket.io-1.2.0.js.ignore"></script>
+<script src="jquery-1.11.1.js.ignore"></script>
+
+
+
+
+<iframe src="http://www.yahoo.com" width="100%" height="600px"></iframe>
+
+<input type="button" id="btnOutside" value="Click me"/>
+
+
+<script>
+
+  $(document).ready(function() {
+    $("#btnOutside").click(function () {
+      var url = 'http://www.yahoo.com'
+      $('iframe[src="'+url+'"]').contents().find("#btnInside").click();
+      $('iframe[src="'+url+'"]').contents().find("span").css('background-color', 'red');
+    });
+  });
+
+</script>
+
+
+
+</body>
+</html>
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/startcmdwithscript2.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/startcmdwithscript2.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/startcmdwithscript2.bat	(revision )
@@ -0,0 +1,8 @@
+'Start "db" "\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd"
+
+
+''"\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd" -ssh morriste@rr413c1n7.ms.com:22 -t -m "C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startupcmds.txt"
+
+
+'Start "db" "\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd"
+"C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\putty2.cmd" -ssh morriste@rr413c1n7.ms.com:22 -t -m "C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startupcmds.txt"
Index: mp/SpeakerJava2/speaker.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/speaker.js	(revision )
+++ mp/SpeakerJava2/speaker.js	(revision )
@@ -0,0 +1,138 @@
+var sh = require('shelpers').shelpers;
+var shelpers = require('shelpers');
+var EasyRemoteTester = shelpers.EasyRemoteTester;
+//where is mary?
+//C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.1.2\marytts-5.1.2\bin
+
+function SpeakerMaryTTS() {
+    var p = SpeakerMaryTTS.prototype;
+    p = this;
+    var self = this;
+    p.init = function init(url, appCode) {
+    }
+
+    p.test = function test() {
+        var port = 59125
+        var baseUrl = 'http://127.0.0.1:'+port
+        var t = EasyRemoteTester.create('Test say basics',{showBody:false});
+        var data = {};
+        t.settings.baseUrl = baseUrl
+        var urls = {};
+        urls.notes = {};
+        urls.say = t.utils.createTestingUrl('say')
+        urls.process = t.utils.createTestingUrl('process')
+
+        var maryXML =
+            '<?xml version="1.0" encoding="UTF-8" ?> '+
+            '<maryxml version="0.4" '+
+            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
+            'xmlns="http://mary.dfki.de/2002/MaryXML" '+
+            'xml:lang="en"> '+
+            '    <prosody rate="+200%" pitch="+20%" range="-10%" volume="loud"> '+
+            '    This is something you have to see! '+
+            '    </prosody> '+
+            '    </maryxml>'
+
+        var req = {}
+        //  req.INPUT_TEXT  = 'hello world'
+        req.INPUT_TYPE= 'TEXT'
+        req.OUTPUT_TYPE ='AUDIO'
+        //req.OUTPUT_TYPE ='WORDS'
+        //  req.INPUT_TEXT = 'Willkommen in der Welt der Sprach-synthese'
+        req.INPUT_TEXT  = 'hello world, ddvwere are you'
+        req.LOCALE  = 'en_US'
+        req.AUDIO="WAVE_FILE"
+
+
+        var maryXML2 = '<?xml version="1.0" encoding="UTF-8" ?> '+
+            '<maryxml version="0.4" '+
+            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
+            'xmlns="http://mary.dfki.de/2002/MaryXML" '+
+            'xml:lang="en-US"> '+
+            'Welcome<boundary breakindex="4"/>to the world of speech synthesis! '+
+            '</maryxml>'
+
+
+        var msg = '';
+        msg = 'Welcome to the world of speech synthesis!';
+        msg = ' '+
+                'Willkommen'
+
+        var maryXML=[ '<?xml version="1.0" encoding="UTF-8"?>',
+            '<maryxml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://mary.dfki.de/2002/MaryXML" version="0.4" xml:lang="en-US">',
+            '<p>',
+            '<prosody rate="150%">'+msg+'</prosody>',
+            '</p>',
+            '</maryxml>']
+
+        maryXML = maryXML.join(' \n')
+
+        console.log('mary', maryXML)
+
+        //request raw xml
+        var req = {}
+        //  req.INPUT_TEXT  = 'hello world'
+        req.INPUT_TYPE= 'RAWMARYXML'
+        req.OUTPUT_TYPE ='AUDIO'
+       // req.OUTPUT_TYPE ='WORDS'
+        //  req.INPUT_TEXT = 'Willkommen in der Welt der Sprach-synthese'
+        req.INPUT_TEXT  = maryXML
+        req.INPUT_TEXT  = maryXML
+        req.LOCALE  = 'en_US'
+        req.AUDIO="WAVE_FILE"
+
+        // req.AUDIO_OUT= "WAVE_FILE"
+        // req.VOICE='bits3'
+        var t2 = t.clone('test a few voices notes');
+        t2.getR(urls.process).with(req)
+            .addFx(function onResult(asdf, resp) {
+                if ( resp.statusCode != 200 ) {
+                    // console.error('result', asdf)
+                    console.error(asdf.toString());
+                    //  console.error(asdf.toString('utf8'));
+                    return
+                }
+                sh.writeFile('sample.wav', asdf, false, true)
+                return;
+                sh.writeFile('x2.wav', asdf, false, false)
+                var fs = require('fs')
+                fs.writeFileSync('sample.wav',  asdf);
+            })
+            .fxFail(function onFault(e){
+                console.error(e)
+            })
+
+        //.bodyHas('status').notEmpty()
+        //t2.getR(urls.say).with({text:'test', rate:20}).bodyHas('status').notEmpty()
+        // t2.getR(urls.say).with({text:'test', rate:350}).bodyHas('status').notEmpty()
+        //t2.getR(urls.say).with({text:'voice', voice:'Heather'}).bodyHas('status').notEmpty()
+        return;
+
+    }
+
+
+    p.speak = function speak(txt, saveSpeak) {
+
+    }
+
+    p.proc = function debugLogger() {
+        if ( self.silent == true) {
+            return
+        }
+        sh.sLog(arguments)
+    }
+
+
+}
+
+exports.SpeakerMaryTTS = SpeakerMaryTTS;
+
+if (module.parent == null) {
+
+    var s = new SpeakerMaryTTS();
+    s.init()
+    s.test()
+}
+
+
+
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/startr_sr.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/startr_sr.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/startr_sr.bat	(revision )
@@ -0,0 +1,1 @@
+"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-running-insecure-content --allow-outdated-plugins --always-authorize-plugins --profile-directory="profile 1"
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/startccrtserver_in_unix_combined.ahk
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/startccrtserver_in_unix_combined.ahk	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/startccrtserver_in_unix_combined.ahk	(revision )
@@ -0,0 +1,38 @@
+; rem start putty
+; rem open file
+; rem paste file
+
+
+ Run "\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd" -ssh morriste@rr413c1n7.ms.com:22 -t -m "C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startupcmds.txt"
+
+sleep, 5000
+
+;WinActivate TextPad - [
+
+FileRead, commands, C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startccrtserver.sh
+
+
+StringReplace, commands, commands, "`r`n", `r`n, UseErrorLevel
+; CR
+StringReplace, commands, commands, ``r, `r, All
+; LF
+StringReplace, commands, commands, ``n, `n, All
+; Tab
+StringReplace, commands, commands, ``t, `t, All
+
+
+sleep , 500
+SendInput {Raw}kinit
+ Send {Enter}
+ sleep , 1000
+ SendInput {Raw}GetRich$$
+  Send {Enter}
+  sleep , 1000
+; Clipboard = commands
+commands = %commands%
+SendInput {Raw}%commands%
+; SendInput commands
+; SendInput {commands}\
+
+sleep , 500
+ Send {Enter}
Index: mp/SpeakerJava2/SpeakServer/public_html/sr/actions2.csv
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/sr/actions2.csv	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/sr/actions2.csv	(revision )
@@ -0,0 +1,165 @@
+name,cmd
+ccrt,http://ccrt/
+prod,|ccrt
+qa,http://ccrt-qa/
+dev,http://rr413c1n7.ms.com:10051/ccrt/index.html
+ccrt-dev,|dev
+dev-reloadable,http://rr413c1n7.ms.com:10051/ccrt/index_reloader.html#/reloadablePage
+trunk,http://ccrt-trunk/
+ccrt-trunk,|trunk
+ccrt-reloader,http://rr413c1n7.ms.com:10051/ccrt/index_reloader.html#/reloadablePage
+reloader,|ccrt-reloader
+trunk2,http://rr413c1n7.ms.com:10055/ccrt/index.html
+outlook,outlook
+pt-layouts,\\msad\root\NA\NY\LIB\fid\SPSTRAT\DESK\spgrt\ccrt\siteconfig\rev\morriste,ccrt pivt table layouts
+dirptlayouts,|pt-layouts
+dirc,c:\
+dirp4,q:\
+dirp4v2,Q:\p4v2
+dirsrc,|dirp4v2
+dirbackup,\\Msad\root\NA\NY\USERS\morriste\My Documents\backup
+dirputty,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell
+pdfplayer,http://localhost:10100/index.html#/player
+dirccrt,Q:\p4\spg\spgrt\ui\dev\
+q,q:\
+mydocs,u:\My documents
+yahoo,http://yahoo.com
+dirproject,U:\My Documents\projects
+pj,|dirproject
+dirlogs,U:\My Documents\worklogs
+dirtrash,U:\My Documents\trash
+dirMyDocs,|mydocs
+dirdownloads,\\Msad\root\NA\NY\users\morriste\My Documents\downloads
+calendar,https://calendar.google.com/calendar/render#main_7
+cal,|calendar
+hnsearch *,https://hn.algolia.com/?query=%W%&sort=byPopularity&prefix&page=0&dateRange=all&type=story
+hn,https://news.ycombinator.com/
+pocket,https://getpocket.com/a/queue/
+getpocket,|pocket
+
+weather,https://www.google.com/search?q=weatherh&oq=weatherh+&aqs=chrome..69i57.745j0j7&sourceid=chrome&ie=UTF-8#q=weather+10036
+news,https://news.google.com/news?hl=en&pz=1&ftcl=true&zx=4jsatqrgp9xo&pog=false
+
+#comment line
+#> means use many aliases until the end
+#< means this is the command script
+>a,b,c,d,e,g,f,http://alphabet.com
+newspocket,https://getpocket.com/a/recommended/
+tts,http://127.0.0.1:4444/
+speak,|tts//Send
+#group
+init,[tts,speaker]
+readit,http://127.0.0.1:10100/tinymce.html#/player
+speaker,http://127.0.0.1:10100/tinymce.html#/player
+pdfconvertoer,http://127.0.0.1:10100/tinymce.html#/player
+autosave,http://127.0.0.1:10100/tinymce_autosave.html
+gsamz *,https://www.google.com/search?q=%W%+amazon
+gs *,https://www.google.com/search?q=%W%
+newtor,https://torrentfreak.com/
+docerr,http://wiki-na.ms.com/CCRT/ErrorsAndNotifications
+docs,http://wiki-na.ms.com/CCRT/
+docsui,http://wiki-na.ms.com/CCRT/UIDeveloperSetup
+ccrt-docs,|docs
+twiki,|docs
+docserr,http://wiki-na.ms.com/CCRT/ErrorsAndNotifications
+digg,http://digg.com/
+dbgithub,https://github.com/brthrmnss?tab=repositories
+dbgithubcrypto,https://github.com/brthrmnss/crypto
+ghshelpers,https://github.com/brthrmnss/crypto/blob/master/node_modules/shelpers/lib/shelpers.js
+downgithubtesting,https://minhaskamal.github.io/DownGit/#/home?url=https:%2F%2Fgithub.com%2Fbrthrmnss%2Fcrypto%2Ftree%2Fmaster%2Fmp%2FtestingFramework
+downgithubgrammar,https://minhaskamal.github.io/DownGit/#/home?url=https:%2F%2Fgithub.com%2Fbrthrmnss%2Fcrypto%2Ftree%2Fmaster%2Fmp%2FGrammarHelperServer
+dbgittrade,https://github.com/brthrmnss/CJS
+dbgittransfer,|dbgittrade
+dbgitreader,https://github.com/brthrmnss/TTS-ReaderV2,
+dirWorking,C:\Users\morriste\train\train_drive\trash\
+dirWorkTrash,C:\Users\morriste\train\train_drive\trash\trash
+dirnodeprj,C:\Users\morriste\train\train_drive\trash\
+tasknewdoc,
+kanban,http://syp.kanbantool.com/boards/177652-ytest
+desktop,Y:\NA\NY\users\morriste\Desktop
+beyondcompare,Y:\NA\NY\users\morriste\Desktop\Beyond Compare 4\BCompare.exe
+capture,\\MSAD\ROOT\NA\NY\USERS\morriste\Desktop\FSCapture.exe
+marytts,C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.2\marytts-5.2\bin\marytts-server.bat
+putty,\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+cmd,cmd
+docsnodejs,http://wiki.ms.com/NodeJS/WebHome
+tasktimesheet,https://www.fieldglass.net/?next=%2Ftime_sheet_list.do
+timesheetpassword,$20MFG_Mor2  password4
+putty,\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+dashboard,"U:\My documents\dashboard.docx"
+docsdashboard,|dashboard
+docstrunkconfig,"U:\My Documents\projects\pj-ccrt-trunk.docx"
+docsccrttrunkdoc,|docstrunkconfig
+putty6,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\sr\start_putty.bat
+problem:racingthoughts,$have a book read to you, listen to eckart tolle, power of now, listen to mindcalm, mediate 10 minutes, bring it on,close eye for 10mins
+problem:bored,$kill jelf
+q:how to open chrome taskmanager?,shortcut esc + shift
+problem:$moving slow, not focused: broom, listen to youtube rap instrumentals
+problem:$falling asleep at work: listen to youtou music instrumetnals
+what is most important?:$rc, $, moment release,chaning,being self, simplicity
+
+dirlayoutsdev,\\v\region\na\appl\fid\fidstrattools\data\ccrt\Config\dev\site
+dirlayoutsqa,\\v\region\na\appl\fid\fidstrattools\data\ccrt\Config\qa\site
+dirlayoutsprod,\\v\region\na\appl\fid\fidstrattools\data\ccrt\Config\prod\site
+
+readit,http://127.0.0.1:10100/tinymce.html#/player
+focus,http://127.0.0.1:4444/blankwhitepage.html
+platitudes,http://127.0.0.1:4444/platitudes.html
+#task force show completion  - alt -f
+#task bring window to front, command line .. pwoershell if that is what it is ...
+#howto reload grammar
+#howto reload ccrt, ccrt reloader, reloaderServer.js
+#howto reload sr
+i hate myself: more than 100 thoughts? presence can only be felt in the now
+holidays,http://www.calendarpedia.com/holidays/federal-holidays-2017.html
+
+flexbox;http://the-echoplex.net/flexyboxes/?fixed-height=on&legacy=on&display=flex&flex-direction=row&flex-wrap=nowrap&justify-content=center&align-items=center&align-content=stretch&order%5B%5D=0&flex-grow%5B%5D=0&flex-shrink%5B%5D=1&flex-basis%5B%5D=auto&align-self%5B%5D=auto&order%5B%5D=0&flex-grow%5B%5D=0&flex-shrink%5B%5D=1&flex-basis%5B%5D=auto&align-self%5B%5D=auto&order%5B%5D=0&flex-grow%5B%5D=0&flex-shrink%5B%5D=1&flex-basis%5B%5D=auto&align-self%5B%5D=auto
+
+nback,http://brainscale.net/dual-n-back
+blankwhitepage,http://127.0.0.1:4444/blankwhitepage.html
+
+timer5m,https://www.google.com/search?q=timer+5+mins
+timer10m,https://www.google.com/search?q=timer+10+mins
+timer15m,https://www.google.com/search?q=timer+15+mins
+timer30m,https://www.google.com/search?q=timer+30+mins
+json,http://www.bodurov.com/JsonFormatter/
+ccrt-dashboard,http://hz413c1n7.ms.com:3000/index.html
+
+
+listwishlist, https://www.amazon.com/gp/registry/wishlist/2Y4JZ0RMMKX29/ref=nav_wishlist_lists_1
+listaorders, https://www.amazon.com/gp/css/order-history/ref=nav_nav_orders_first
+listamazonorders,|listaorders
+
+prog,C:\Program Files
+dirProgramFiles,|prog
+progx32,C:\Program Files (x86)
+db,http://rr413c1n7.ms.com:3000/index.html
+
+helpdeskremote,http://wiki.ms.com/Remote/HelpDesk
+
+gtccrt,C:\Users\morriste\train\train_drive\trash\node2\mp\RDK\AutoHotKey\gt_webstorm_ccrt.ahk
+gtactions,C:\Users\morriste\train\train_drive\trash\node2\mp\RDK\AutoHotKey\gt_webstorm_dev-actions.ahk
+editactions,|gtactions
+gtrdk,C:\Users\morriste\train\train_drive\trash\node2\mp\RDK\AutoHotKey\gt_webstorm_dev-rdk.ahk
+gtdev,C:\Users\morriste\train\train_drive\trash\node2\mp\RDK\AutoHotKey\gt_webstorm_dev.ahk
+editgotos,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\editahkgotos.ahk
+gteditgotos,|editgotos
+p4,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\gtp4.ahk
+
+windowspy,C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Applications\AutoHotkey\AutoIt3 Window Spy
+
+
+gtreloader,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\goto\gt_reloader.ahk
+
+gtccrtdb,C:\Users\morriste\train\train_drive\trash\node2\mp\RDK\AutoHotKey\gt_ccrt_db.ahk
+ccrtdb,|grccrtdb
+editccrttrunkjs,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\editccrtserverjs.ahk
+editccrtdb,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\editccrtdbhtml.ahk
+
+runccrtcb,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startccrtserver_in_unix_combined.ahk.ahk
+startccrtdb,|ruccrtdb
+startlayoutmanager,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\start_ccrt_layoutManager_in_unix_combined.ahk
+#startccrtdb,|ruccrtdb
+
+
+gttestccrt,C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\goto\gt_editccrt.ahk
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/endProcess.sh
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/endProcess.sh	(revision )
+++ mp/SpeakerJava2/SpeakServer/endProcess.sh	(revision )
@@ -0,0 +1,3 @@
+PID=$1
+PGID=$(ps opgid= "$PID")
+kill -QUIT -"$PGID"
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/x.sh
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/x.sh	(revision )
+++ mp/SpeakerJava2/SpeakServer/x.sh	(revision )
@@ -0,0 +1,28 @@
+#!/bin/bash
+cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv;
+/home/user/.nvm/versions/node/v0.12.5/bin/shipit staging list
+exit
+
+#source ~/.nvm/nvm.sh
+#nvm use 0;
+echo 'what'
+echo $PATH
+ whoami
+#export PATH
+cd /media/psf/Dropbox/projects/crypto/mp/RemoteConsoleServer
+cd /media/psf/Dropbox/projects/crypto/mp
+cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv;
+pwd
+source ~/.profile
+
+#source ~/.nvm/nvm.sh
+source ~/.profile
+source ~/.bashrc
+shipit staging list
+exit
+#bash cd "/media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/"; shipit staging list
+
+cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/
+#/media/psf/Dropbox/projects/crypto/deploy_nodejs/breedv2/shipitfile.js
+cd /media/psf/Dropbox/projects/crypto/mp/RemoteConsoleServer/
+shipit staging list
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/tmp.sh
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/tmp.sh	(revision )
+++ mp/SpeakerJava2/SpeakServer/tmp.sh	(revision )
@@ -0,0 +1,5 @@
+#!/bin/bash
+echo '/home/user/.nvm/versions/node/v6.4.0/bin/shipit seed3 app.deploy'
+PATH=$PATH:/home/user/.nvm/versions/node/v6.4.0/bin/
+cd /media/sf_projects/crypto/deploy_nodejs/breedv2
+/home/user/.nvm/versions/node/v6.4.0/bin/shipit seed3 app.deploy
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/QuickSpeaker.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/QuickSpeaker.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/QuickSpeaker.js	(revision )
@@ -0,0 +1,219 @@
+
+function defineQuickSpeak() {
+    function QuickSpeaker() {
+
+        var self = this;
+        var p = this;
+
+        p.init = function init() {
+
+        }
+
+        p.speak = function speak(text, fx, cfg) {
+            if (text.text != null) {
+                cfg = text;
+            }
+            if (cfg == null) {
+                cfg = {}
+                cfg.text = text;
+
+            }
+            cfg.fx = fx;
+            if (cfg.rate == null) {
+                cfg.rate = $('#inputRate').val();
+            }
+            if (cfg.rate == null) {
+                cfg.rate = 6
+            }
+
+            if (cfg.voice == null) {
+                cfg.voice = 'IVONA 2 Brian';
+            }
+
+            cfg.text = cfg.text.trim();
+            cfg.text = cfg.text.replace(/&nbsp;/gi, ' ');
+            cfg.text = cfg.text.replace(/OMG/g, ' oh-my-god ');
+            cfg.text = cfg.text.replace(/UX/gi, ' you-eye ');
+            cfg.text = cfg.text.replace(/UI/gi, ' you-x ');
+
+
+            if (cfg.text ==
+                'Continue reading the main story') {
+                cfg.text = '';
+            }
+
+
+            if (cfg.text == 'ADVERTISEMENT') {
+                cfg.text = '';
+            }
+
+
+            if (cfg.text == 'Photo') {
+                cfg.text = '';
+            }
+
+
+            var desired = cfg.text.replace(/[^\w\s]/gi, '')
+            if (desired.length == 0) {
+                console.warn('no readable rhcaractesr', cfg.text)
+                if (cfg.fx) cfg.fx();
+                return;
+            }
+
+            function isUpperCase(str) {
+                return str === str.toUpperCase();
+            }
+
+            if (isUpperCase(cfg.text)) {
+                var brokenStr = '';
+                for (var i = 0, len = cfg.text.length; i < len; i++) {
+                    var char = (cfg.text[i]);
+                    brokenStr += ' ' + char
+                }
+                cfg.text = brokenStr
+            }
+
+
+            cfg.text = window.convertWords(cfg.text)
+
+            console.log('speak:', 'trim', cfg.text.trim().endsWith('reply'), cfg.text)
+            var speakOnce = false
+            var date = new Date();
+
+            cfg.text = cfg.text.replace('->', ' refers to ');
+
+            $.ajax({
+                url: "http://localhost:4444/say",
+                data: {
+                    text: cfg.text,
+                    rate: cfg.rate,
+                    playAudio: true,
+                    volume: 25,
+                    voice: cfg.voice,
+                },
+                type: 'post',
+                type: 'get',
+                success: function (result) {
+                    var endDate = new Date();
+                    console.log('total time',
+                        (endDate.getTime() - date.getTime()) / 1000);
+                    if (cfg.fx) cfg.fx()
+                }
+            });
+
+
+        }
+
+        p.convertWords = function convertWords(text){
+            text = text.trim();
+            text = text.replace(/&nbsp;/gi,' ');
+            text = text.replace(/OMG/g,' oh-my-god ');
+            text = text.replace(/UX/gi,' you-eye ');
+            text = text.replace(/UI/gi,' you-x ');
+            text = text.replace(':(',' sad face ');
+            text = text.replace(':)',' happy face ');
+
+            function isUpperCase(str) {
+                return str === str.toUpperCase();
+            }
+
+            var words = text.split(' ');
+            var words2 = []
+            $.each(words, function convertIF(k, word)  {
+                if (isUpperCase(word)) {
+                    console.debug('upper case word', word)
+                    word = self.convertWordToAcrronym(word)
+                    words2.push(word);
+                    return;
+                }
+                var lastChar = word.slice(-1)[0]
+                if ( $.isNumeric(lastChar)) {
+                    word = self.convertWordToAcrronym(word)
+                    words2.push(word);
+                    return;
+                }
+                words2.push(word)
+            })
+            text = words2.join(' ')
+            //  if ( text.toString().isUpperCase())
+
+            if ( text ==
+                'Continue reading the main story') {
+                text = '';
+            }
+
+
+            if ( text == 'ADVERTISEMENT') {
+                text = '';
+            }
+
+
+            if ( text == 'Photo') {
+                text = '';
+            }
+
+            console.log('what is output', text)
+            return text;
+        }
+
+
+        /*
+
+         ps4 PSN PS4 UX UI OMG
+
+         :(
+
+         ps4...   PSN...   PS4 UX UI OMG
+
+         :)
+
+         P-S-N
+
+         p-s-nn
+
+         pe-ess-inn
+
+         pe ess inn
+
+         p.s.n
+
+         */
+
+        p.convertWordToAcrronym = function convertWordToAcrronym(word) {
+            var brokenStr = '';
+            for (var i = 0, len = word.length; i < len; i++) {
+                var char = (word[i]);
+                char = char.toLowerCase()
+                if ( char == 'a') {
+                    char = 'ayy'
+                }
+                if ( char == 'b') {
+                    char = 'bee'
+                }
+                if ( char == 'c') {
+                    char = 'see'
+                }
+                if ( char == 'p') {
+                    char = 'pee'
+                }
+                if ( char == 's') {
+                    char = 'ess'
+                }
+                if ( char == 'n') {
+                    char = 'inn'
+                }
+                brokenStr += ' ' + char
+            }
+            brokenStr+='.'
+            word = brokenStr;
+            return brokenStr
+        }
+
+    }
+
+    var o = new QuickSpeaker();
+    window.speak = o.speak
+    window.convertWords = o.convertWords;
+    window.quickSpeaker = o;
+}
+defineQuickSpeak();
Index: mp/SpeakerJava2/SpeakServer/tmp.sh___jb_tmp___
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/tmp.sh___jb_tmp___	(revision )
+++ mp/SpeakerJava2/SpeakServer/tmp.sh___jb_tmp___	(revision )
@@ -0,0 +1,9 @@
+#!/bin/bash
+echo 'shipit staging list'
+PATH=$PATH:/home/user/.nvm/versions/node/v6.2.1/bin/
+#. ~/.nvm/nvm.sh
+#env node
+echo $PATH
+
+cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/
+/home/user/.nvm/versions/node/v6.2.1/bin/shipit staging list
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/sr/scratch.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/sr/scratch.txt	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/sr/scratch.txt	(revision )
@@ -0,0 +1,8 @@
+mp: buy headphones
+why: so can listen to pc and to bluetooth
+goal: come to work and swithc e headphones
+
+
+amaZOn - anny newspicnes ... like fennel ... love this stuff
+ask chef ot mak tinciture ... can't u do it yourself?
+ask chef to bring alchocol
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/TestTextArea.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/TestTextArea.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/TestTextArea.html	(revision )
@@ -0,0 +1,162 @@
+<!DOCTYPE html>
+<html>
+<head lang="en">
+    <meta charset="UTF-8">
+    <title>Update?</title>
+
+    <script  src="jquery-1.11.1.js." ></script>
+    <script>
+
+    </script>
+
+    <script  src="scrollText.js" ></script>
+
+
+    <style>
+
+    </style>
+</head>
+<body>
+
+<div id="controls" class="container-controls">
+    <button id="voc_btnBack" cBack</button>
+    <button id="voc_btnFor" >For</button>
+    <button id="voc_btnRestart" >Restart</button>
+    <span>|</span>
+    <button id="voc_btnPlay" >Play</button>
+    <button id="voc_btnPause" >Pause</button>
+    <input  id="inputRate" type="number" name="quantity" value="260" min="20" max="500">
+</div>
+
+ <button id="btnStart" >Start</button>
+<article id="story" data-uuid="017d4059-f4f2-3c28-8cb9-61f007f03946" data-type="story"
+         data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2">
+    <header class="canvas-header D(n) D(b)--sm D(b)--md"
+            data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.0"><h1
+            class="Lh(1.1) Fz(25px)--sm Fz(32px) Mb(17px)--sm Mb(20px) Mb(30px)--lg Ff($ff-primary) Lts($lspacing-md) Fw($fweight) Fsm($fsmoothing) Fsmw($fsmoothing) Fsmm($fsmoothing)"
+            data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.0.0">Warning Signs of Predators for
+        Parents</h1></header>
+    <div class="auth-attr W(100%) Mb(5px)--sm Mb(20px) D(n) D(ib)--sm D(ib)--md"
+         data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1">
+        <div class="auth-prov-logos D(tbc) Va(t)" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.0"><img
+                class="Trsdu(.42s) Bdrs(45%) Mend(10px) Mah(84px) Maw(84px) Mah(40px)--sm Maw(40px)--sm"
+                src="https://s.yimg.com/ny/api/res/1.2/Z8PauvTid.FPrPlS264BJw--/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO2ZpPWZpbGw7dz04NDtoPTg0O2lsPXBsYW5l/http://magazines.zenfs.com/resizer/2.0/FIT_TO_WIDTH-w266/4c3da7d2f8a668f9d3d45d4c2c0a68ddec512bd3.png.cf.jpg"
+                data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.0.0"></div>
+        <div class="auth-prov-soc Mend(4px) Va(m) D(tbc) H(84px) H(40px)--sm"
+             data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.1">
+            <div class="D(ib)" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.1.0">
+                <div class="author Mb(4px) Mend(4px) D(ib)"
+                     data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.1.0.0">
+                    <div class="author-name C(#000) Fz(14px) Fw(b) Lh(18px) Td(n) Mend(3px)"
+                         data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.1.0.0.0">Jennifer O'Neill
+                    </div>
+                    <div class="author-title C(#999) Fw(b) Mend(3px) D(n)--sm"
+                         data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.1.0.0.1">Writer
+                    </div>
+                </div>
+                <div class="provider Mb(4px)" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.1.0.1">
+                    <div class="provider-name C(#999) Fw(b)"
+                         data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.1.0.1.0">Yahoo Parenting
+                    </div>
+                </div>
+                <div class="date" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.1.1.0.2">August 21,
+                    2015
+                </div>
+            </div>
+        </div>
+    </div>
+
+    <div class="canvas-body C(#26282a) Cl(start) Fz(18px) Fz(16px)--sm Fz(20px)--lg Lh(1.6) Ff($ff-secondary)"
+         data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4"><p
+            class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+            style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$1"><i>How
+        can you tell if someone has ulterior motives for wanting to get closer to your child? An expert identifies three
+        red flags you want to watch out for. (Photo: Corbis Images)</i></p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$2">News about
+            sexual offenders is dominating the headlines — most recently about Subway pitchman Jared Fogle, who is
+            reportedly <a
+                    href="http://www.cnn.com/2015/08/21/us/subway-jared-fogle-informant-child-pornography-allegations/"
+                    rel="nofollow" target="_blank">planning</a> to plead guilty to child porn charges and crossing state
+            lines to pay for sex with minors, and admitted teen molester Josh Duggar.&nbsp;</p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$3"><i><b>STORY</b>:&nbsp;<a
+                href="https://www.yahoo.com/parenting/should-the-duggar-family-really-be-stunned-by-127253598772.html">Should
+            the Duggar Family Really Be ‘Stunned’ by Josh’s Cheating Scandal?&nbsp;</a></i></p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$4">But
+            parents who assume their child could never be a victim should know that the reality is nine out of 10
+            children who are sexually abused are victimized by someone they know — including relatives, family friends,
+            clergy, teachers, and babysitters, according to the <a href="http://www.nationalcac.org" rel="nofollow"
+                                                                   target="_blank">National Children’s Advocacy
+                Center</a> (NCAC).&nbsp;</p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$5"><i><b>STORY</b>:&nbsp;<a
+                href="https://www.yahoo.com/parenting/heres-what-experts-had-to-say-about-that-118138013097.html">Here’s
+            What Experts Had to Say About That Viral Child-Abduction Video</a></i></p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$6">“The
+            offender usually uses coercion and manipulation, not physical force, to engage the child,” reports the
+            American Academy of Pediatrics in a sexual abuse prevention <a
+                    href="https://www.aap.org/en-us/about-the-aap/aap-press-room/news-features-and-safety-tips/pages/Parent-Tips-for-Preventing-and-Identifying-Child-Sexual-Abuse.aspx"
+                    rel="nofollow" target="_blank">tip sheet</a> for parents. Deborah Callins, prevention director at
+            the NCAC, tells Yahoo Parenting, “They take advantage of a child’s natural curiosity.” So how can mothers
+            and fathers identify the close people most likely to have ulterior motives, or who might want to take
+            advantage of your child? Here are a few simple ways to see the red flags that are often right in front of
+            you:&nbsp;</p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$7"><b>Take
+            cues from your kids.</b><br>“Parents can protect their children by being better listeners,” she says. “Are
+            they hearing what their child is actually meaning? If a child states he or she doesn’t want to spend time
+            with a particular person, the parents may assume their child thinks the person is boring. But the real
+            message the child might be trying to send is that the person makes him or her feel uncomfortable.” So stop a
+            moment and try to really get to the heart of the matter before you insist that little Madison drive to the
+            park with Uncle Jim to play on the swings if she’s dragging her feet. “Your children could be sending you
+            little hints,” explains Callins. “You need to dig a little for more information.”&nbsp;</p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$8"><b>Consider
+            whether someone seems to be ‘testing’ your child’s ability to protect himself. <br></b>Does a family friend
+            always insist on “hugging, touching, kissing, tickling, wrestling with or holding a child, even when the
+            child does not want this physical contact or attention?” asks sexual abuse prevention organization <a
+                    href="http://www.stopitnow.org/" rel="nofollow" target="_blank">Stop It Now!</a> in its resource
+            sheet, <a
+                    href="http://www.stopitnow.org/ohc-content/behaviors-to-watch-out-for-when-adults-are-with-children"
+                    rel="nofollow" target="_blank">Behaviors to Watch Out for When Adults are with Children</a>. Such
+            seemingly innocuous behaviors indicate that the adult is ignoring a child’s social, emotional and physical
+            boundaries — and that’s a big red flag.&nbsp;</p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$9"><b>Take
+            note if a person is sexually suggestive around your kid.</b><br>If someone always tends to point out sexual
+            images, or tells dirty or suggestive jokes in the presence of kids, take heed, suggests Stop It Now! That
+            goes for comments about a child’s “developing body” or a teen’s dating details, too. “It may be nothing, or
+            it may be a warning signal that the person is grooming your child,” explains Callins. He or she may be
+            trying to figure out how curious your child is about sex, how much they know about it, and whether they may
+            be willing to participate in it. “Perhaps the parent doesn’t even realize that it’s an issue — ‘Oh, that’s
+            just how my cousin is,’ or ‘That’s just how he talks,’” she says. “But it could also be a test.”&nbsp;</p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$10">Callins
+            advises removing your child from such a situation if it makes you or your kid uncomfortable, and then
+            talking about it separately afterward with both the person and your child. “That way, it’s out in the air,”
+            she says. And that way there’s no question about your boundaries — and whether you’ll be aware if somebody
+            tries to cross them.</p>
+
+        <p class="canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm canvas-atom" data-type="text"
+           style="letter-spacing:.01em;" data-reactid=".20d7bg9ymm8.0.2.4.0.0.$Col1-0-ContentCanvas.2.4.0:$11"><i>Please
+            follow @YahooParenting on </i><a href="http://facebook.com/yahooparenting" rel="nofollow"
+                                             target="_blank"><i>Facebook</i></a><i>, </i><a
+                href="https://twitter.com/yahooparenting" rel="nofollow" target="_blank"><i>Twitter</i></a><i>, </i><a
+                href="http://instagram.com/yahooparenting" rel="nofollow" target="_blank"><i>Instagram</i></a><i>, and&nbsp;</i><a
+                href="http://www.pinterest.com/yahoo" rel="nofollow" target="_blank"><i>Pinterest</i></a><i>. Have an
+            interesting story to share about your family? Email us at YParenting (at) Yahoo.com.</i><br></p></div>
+</article>
+</body>
+</html>
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/gtp4.ahk
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/gtp4.ahk	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/gtp4.ahk	(revision )
@@ -0,0 +1,1 @@
+WinActivate morriste_MORRISTEW7_4408
Index: mp/SpeakerJava2/SpeakServer/public_html/testscript.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/testscript.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/testscript.js	(revision )
@@ -0,0 +1,16 @@
+/**
+ * Created by user2 on 3/30/16.
+ */
+
+
+
+
+for ( var i = 0; i < 20; i++) {
+
+    function innerFx (y) {
+
+        console.log('k', y)
+
+    }
+    setTimeout(innerFx, i*500, i)
+}
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/bat2.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/bat2.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/bat2.bat	(revision )
@@ -0,0 +1,77 @@
+goto comment
+...skip this...
+
+start commonad servers
+'start remote console
+'x drive listener
+'
+open putty adn run ccrt script
+reloader js
+autosave
+tts server
+
+
+open html & files
+
+open speaker
+open slick run
+
+can do this all in seperate processes?
+
+shut it down, and start server manually and see what happens
+
+open dashb aord docuknet
+
+open dashboard
+:comment
+
+'START "title" [/D path] [options] "command" [parameters]
+
+
+START "title" /D "C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.2\marytts-5.2\bin\" "C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.2\marytts-5.2\bin\marytts-server.bat"
+
+'START "title" [/D path] [options] "command" [parameters]
+
+C:\Users\morriste\node\node.exe
+
+goto endbatchfile
+C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.2\marytts-5.2\bin\marytts-server.bat
+
+C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\Server.js
+C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\PdfRipCombine.js
+C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\PdfRipServer.js
+'Do need this?, how are sounds played from mary-tts?
+C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\sayServerMaryTTS.js
+
+
+http://127.0.0.1:4444/sr.html
+http://127.0.0.1:4444/tts_speaker.html
+
+C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\RemoteConsoleServer.js
+C:\Users\morriste\train\train_drive\trash\node2\reloaderServer.js
+
+
+
+C:\Users\morriste\train\train_drive\trash\node2\mp\ReloadPivotTable\CCRT_ReloadableDir_Reloader_XDrive.js
+
+putty,\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+putty,\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+dashboard,"U:\My documents\dashboard.docx"
+docstrunkconfig,"U:\My Documents\projects\pj-ccrt-trunk.docx"
+
+
+Z:\dev\morriste\dev2\ui\dev
+Q:\p4v2
+
+
+rr413c1n7.ms.com:3000/index.html
+
+
+rr413c1n7.ms.com:10051/ccrt/index_reloader.noreload.html#/RevenuePT
+rr413c1n7.ms.com:10051/ccrt/index_reloader.html#/externalRevenuePT
+'//with tests
+
+
+cd  /u/m/spgriskdev/morriste/p4v2
+run-ccrt-trunk.ksh
+:endbatchfile
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/startccrtserver.sh
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/startccrtserver.sh	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/startccrtserver.sh	(revision )
@@ -0,0 +1,10 @@
+cd /u/m/spgriskdev/morriste/p4v2/
+#start up p4
+module load 3rd/perforce/spstrat
+export P4CLIENT=morriste_unix
+p4 login -a
+p4 sync
+#run server
+cd  /u/m/spgriskdev/morriste/p4v2
+module load msjs/node/4.4.0
+node ccrt-trunk.js
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/bat.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/bat.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/bat.bat	(revision )
@@ -0,0 +1,64 @@
+/*
+start commonad servers
+'start remote console
+'x drive listener
+'
+open putty adn run ccrt script
+reloader js
+autosave
+tts server
+
+
+open html & files
+
+open speaker
+open slick run
+
+can do this all in seperate processes?
+
+shut it down, and start server manually and see what happens
+
+open dashb aord docuknet
+
+open dashboard
+*/
+
+C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.2\marytts-5.2\bin\marytts-server.bat
+
+C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\Server.js
+C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\PdfRipCombine.js
+C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\PdfRipServer.js
+'Do need this?, how are sounds played from mary-tts?
+C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\sayServerMaryTTS.js
+
+
+http://127.0.0.1:4444/sr.html
+http://127.0.0.1:4444/tts_speaker.html
+
+C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\RemoteConsoleServer.js
+C:\Users\morriste\train\train_drive\trash\node2\reloaderServer.js
+
+
+
+C:\Users\morriste\train\train_drive\trash\node2\mp\ReloadPivotTable\CCRT_ReloadableDir_Reloader_XDrive.js
+
+putty,\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+putty,\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd
+dashboard,"U:\My documents\dashboard.docx"
+docstrunkconfig,"U:\My Documents\projects\pj-ccrt-trunk.docx"
+
+
+Z:\dev\morriste\dev2\ui\dev
+Q:\p4v2
+
+
+rr413c1n7.ms.com:3000/index.html
+
+
+rr413c1n7.ms.com:10051/ccrt/index_reloader.noreload.html#/RevenuePT
+rr413c1n7.ms.com:10051/ccrt/index_reloader.html#/externalRevenuePT
+'//with tests
+
+
+cd  /u/m/spgriskdev/morriste/p4v2
+run-ccrt-trunk.ksh
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/pstest.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/pstest.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/pstest.bat	(revision )
@@ -0,0 +1,1 @@
+powershell -noexit "& ""C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\sr\gotops.ps1"""
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/startcmdwithscript.bat
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/startcmdwithscript.bat	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/startcmdwithscript.bat	(revision )
@@ -0,0 +1,4 @@
+'Start "db" "\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd"
+
+
+"\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd" -ssh morriste@rr413c1n7.ms.com:22 -t -m "C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startupcmds.txt"
Index: mp/SpeakerJava2/SpeakServer/public_html/index.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/index.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/index.html	(revision )
@@ -0,0 +1,117 @@
+<!doctype html>
+<html>
+<head>
+  <title>RT-CC</title>
+  <style>
+    * { margin: 0; padding: 0; box-sizing: border-box; }
+    body { font: 13px Helvetica, Arial; }
+    form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
+    form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
+    form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
+    #messages { list-style-type: none; margin: 0; padding: 0;
+      padding-bottom: 0px; }
+    #messages li { padding: 5px 10px; }
+    #messages li:nth-child(odd) { background: #eee; }
+
+    .flex-container {
+      height: 100vh;
+      width: 100vw;
+      display: flex;
+      flex-direction: column;
+      flex-wrap: nowrap;
+      justify-content: flex-start;
+      align-content: center;
+      align-items: center;
+      /*background-color: #0040D0;*/
+    }
+
+
+    .flex-container {
+      display: flex;
+      flex-direction: column;
+      flex-wrap: nowrap;
+      justify-content: flex-start;
+      align-content: center;
+      align-items: stretch;
+
+      height: 100vh;
+      width: 100vw;
+      max-height: 100vh;
+    }
+
+
+    .flex-item  {
+      width:100%;
+      height:100%;
+    }
+
+    .flex2 {
+      width:100%;
+      height:100%;
+      max-height: 50%;
+      overflow: auto;
+      /*   background-color: red;*/
+    }
+
+    .flex-item-buttons  {
+      /*background: green;*/
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+    .flex-item-console-output  {
+     /* background: red;*/
+      align-self: auto;
+      overflow: auto;
+    /*  min-height: min-content;
+      max-height: 100%;*/
+      /*height: calc(100%-);*/
+
+      margin-bottom: 40px;
+
+      order: 0;
+      flex: 10 1 auto;
+      align-self: auto;
+
+    }
+
+    .flex-item-send {
+     /* background: yellow;*/
+      order: 0;
+      flex: 0 1 auto;
+      align-self: auto;
+
+
+      flex: 0 1 auto;
+      align-self: auto;
+    }
+
+    #buttonsBar {
+      padding: 10px;
+    }
+  </style>
+</head>
+<body>
+
+
+<audio  id="audioThing"
+        autoplay="" controls=""></audio>
+
+<div class="flex-container" >
+</div>
+
+<script src="socket.io-1.2.0.js.ignore"></script>
+<script src="jquery-1.11.1.js.ignore"></script>
+
+
+<script src="eval_client.js"></script>
+<script>
+
+
+</script>
+
+
+
+</body>
+</html>
Index: mp/SpeakerJava2/SpeakServer/public_html/other.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/other.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/other.html	(revision )
@@ -0,0 +1,20 @@
+<!DOCTYPE html>
+<html lang="en">
+<head>
+    <meta charset="UTF-8">
+    <title>Title</title>
+</head>
+<body>
+
+<script src="jquery-1.11.1.js.ignore"></script>
+<input type="button" id="btnInside" value="Other Click"/>
+<script type="text/javascript">
+    $(document).ready(function() {
+        $("#btnInside").click(function () {
+            alert('inside');
+        });
+    });
+</script>
+
+</body>
+</html>
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/testCommandHelper_shipit.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/testCommandHelper_shipit.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/testCommandHelper_shipit.js	(revision )
@@ -0,0 +1,121 @@
+/**
+ * Created by user2 on 3/29/16.
+ */
+/*
+* why: b/c i want it ......
+* run the sh command helper
+* for late input
+* for moving to different directories
+* is there a better way ?
+* */
+
+var sh = require('shelpers').shelpers;
+var shelpers = require('shelpers');
+var CommandRunner = sh.CommandRunner
+
+
+
+var sh = require('shelpers').shelpers;
+var shelpers = require('shelpers');
+
+
+
+
+
+
+function BasicClass() {
+    var p = BasicClass.prototype;
+    p = this;
+    var self = this;
+    p.init = function init(url, appCode) {
+
+        var self = {}
+        var args = [];
+
+        var cmdtxt = 'say'
+        args = ['snark snark snark .... what is this? ']
+
+        cmdtxt = 'cmd'
+        args =  [__dirname+'/'+ 'public_html/'+'testscript.js']
+        cd = __dirname+'l';
+
+        cmdtxt = 'ssh'
+        args = ['-tt', '127.0.0.1']
+
+
+        cmdtxt = 'su'
+        args = ['-c', 'whoami', 'user']
+
+        cmdtxt = 'shipit'
+        cd = '/media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/'
+
+        cmdtxt = './x.sh'
+
+
+        //cmdtxt = '/home/user/.nvm/versions/node/v0.12.5/bin/shipit staging list'
+
+        function fxDone () {
+
+        }
+
+        var cmd = new CommandRunner()
+        var settings = {}
+        settings.silent = self.silent
+        settings.fxCallback =
+            function commandFinished() {
+                console.log(cmd.log.output)
+                sh.callIfDefined(fxDone);
+            }
+        settings.cmd = cmdtxt
+        settings.args = args;
+        settings.cwd = cd;
+        cmd.execute(settings)
+        console.log('run', args)
+
+
+
+        setTimeout(function endProcess() {
+            cmd.terminal.kill(sh.pid, 'SIGINT');
+            //cmd.write("\x03");
+            //cmd.write2("\x03");
+            console.log('end...')
+        }, 1000)
+
+    }
+
+    p.proc = function debugLogger() {
+        if ( self.silent == true) {
+            return
+        }
+        sh.sLog(arguments)
+    }
+
+
+}
+
+exports.BasicClass = BasicClass;
+
+if (module.parent == null) {
+/*
+
+    // http://nodejs.org/api.html#_child_processes
+    var sys = require('sys')
+    var exec = require('child_process').exec;
+    var child;
+// executes `pwd`
+    child = exec("shipit", function (error, stdout, stderr) {
+        console.log('stdout: ' + stdout);
+        console.error('stderr: ' + stderr);
+        if (error !== null) {
+            console.log('exec error: ' + error);
+        }
+    });
+*/
+
+
+
+    var b = new BasicClass();
+    b.init();
+}
+
+
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/editccrtserverjs.ahk
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/editccrtserverjs.ahk	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/editccrtserverjs.ahk	(revision )
@@ -0,0 +1,20 @@
+; rem start putty
+; rem open file
+; rem paste file
+
+
+
+WinActivate NodeTest - [
+; WinActivate dev - [Z:\dev
+click 20,50
+Send !f
+
+
+Send o
+Sleep, 1000
+
+SendRaw Q:\p4v2\ccrt-trunk.js
+Sleep, 400
+
+Send {Enter}
+Sleep, 400
Index: mp/SpeakerJava2/SpeakServer/public_html/sr.html
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/sr.html	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/sr.html	(revision )
@@ -0,0 +1,193 @@
+<!DOCTYPE html>
+<html lang="en">
+<head>
+    <meta charset="UTF-8">
+    <title>SR</title>
+
+
+    <script src="js/socket.io-1.2.0.js.ignore"></script>
+    <script src="js/jquery-1.11.1.js.ignore"></script>
+    <script src="js/jquery-ui-1.12.1.js"></script>
+    <link rel="stylesheet" href="js/jquery-ui.css">
+
+    <script>
+        $( function() {
+            var availableTags = [
+                "ActionScript",
+                "AppleScript",
+                "Asp",
+                "BASIC",
+                "C",
+                "C++",
+                "Clojure",
+                "COBOL",
+                "ColdFusion",
+                "Erlang",
+                "Fortran",
+                "Groovy",
+                "Haskell",
+                "Java",
+                "JavaScript",
+                "Lisp",
+                "Perl",
+                "PHP",
+                "Python",
+                "Ruby",
+                "Scala",
+                "Scheme"
+            ];
+            $( "#tags" ).autocomplete({
+                source: availableTags,
+                //autoFocus : true
+            });
+
+            // response: function( event, ui ) {}
+
+            $( "#tags" ).on( "autocompleteselect",
+                    function onSelected( event, ui ) {
+                        console.log(event, ui)
+                        console.log('item', ui)
+                        window.sr.onAction(ui.item.label);
+
+                        //   console.log('what', $('#tags').val());
+                    } );
+
+
+            /*  $( "#tags" ).on( "autocompleteopen", function( event, ui ) {
+             console.log('yyy', event, ui, ui.item)
+             } )
+             $( "#tags" ).on( "autocompletesearch", function( event, ui ) {
+             console.log('yyy', event, ui, ui.item)
+             } )*/
+
+            var last = {};
+
+            $( "#tags" ).on( "autocompleteresponse", function onAutocompleteResponse( event, ui ) {
+                // store for later if user presses tab
+                last.content = ui.content;
+                console.log(ui.content)
+            } )
+
+
+
+            $('#tags').keydown(function onKeyDown(e) {
+                var code = e.keyCode || e.which;
+
+                if (code === 9) {
+                    e.preventDefault();
+                    // myFunction();
+                    // alert('it works!');
+                    var firstItem = last.content[0]
+                    console.debug('testing', code, firstItem)
+
+                    $(this).autocomplete('close');
+                    if ( firstItem )
+                        window.sr.onAction(firstItem.label);
+
+                    $(this).val(firstItem.label)
+                    //console.debug('testing', code, last.content)
+                }
+
+                console.log('code', code)
+                if (code == 40) {
+                   // console.log('sdf', 40)
+                    e.preventDefault();
+                    var lastItem =  window.sr.onPrev();
+                    last.content = [{label:lastItem}];
+                    $(this).val(lastItem)
+                }
+                if (code == 38 ) {
+                    e.preventDefault();
+                    var lastItem =  window.sr.onPrev_Next();
+                    last.content = [{label:lastItem}];
+                    $(this).val(lastItem)
+                }
+            });
+
+            /* $( "#tags" ).on( "autocompletechange",
+             function onSelected( event, ui ) {
+             console.log(event, ui)
+             console.log('item', ui)
+             console.log('what', $('#tags').val());
+             } );*/
+
+        } );
+    </script>
+
+    <style>
+        .txt2 {
+            background: #fcfcfc;
+            border: solid 1px gray;
+            padding: 4px;
+            color: #666666;
+            font-size: 14px;
+        }
+        body {
+            font-family: Helvetica, Arial;
+        }
+    </style>
+</head>
+<body>
+<div class="ui-widget">
+    <label for="tags"> </label>
+    <input id="tags" class="txt2">
+    <span id="txtStatus2"></span>
+</div>
+
+<br />
+
+<div id="txtAnswer" ></div>
+
+
+
+<div id="txtAnswerX" ></div>
+<!--
+<script src="eval_client.js"></script>
+
+-->
+
+
+<script type="application/javascript" src="js/ui_utils.js"></script>
+
+
+<script type="application/javascript" src="ParseCSV.js"></script>
+<script type="application/javascript" src="sr.js"></script>
+<script type="application/javascript" src="QuickSpeaker.js"></script>
+
+<script src="http://localhost:10110/g/js/reloader.js" ></script>
+<script>
+    if ( window.reloader) {
+        reloader.reloadWhen('sr.html')
+
+        reloader.filter = '/public_html/'
+        //reloader.filter = '\\public_html\\'
+        reloader.reloadWhenFx('drawPB.js', function onTestOneJs(a, b, c) {
+            //console.log('pussy', a,b,c)
+            //window.drawPBJS.go();
+        })
+        //reloader
+    } else {
+        window.sr = new SR();
+        window.sr.init();
+        window.sr.getList();
+    }
+</script>
+
+<script>
+    $(window).focus(function(e) {
+// Do Focus Actions Here
+        console.log('font')
+        window.sr.utils.asdf();
+    });
+
+    $( document ).ready(function onPageReady() {
+        console.log('font')
+        window.sr.utils.asdf();
+        setTimeout(window.sr.utils.asdf, 500)
+    });
+
+</script>
+
+
+</body>
+</html>
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/remoteTests.sh
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/remoteTests.sh	(revision )
+++ mp/SpeakerJava2/SpeakServer/remoteTests.sh	(revision )
@@ -0,0 +1,18 @@
+#!/bin/bash
+echo '/home/user/.nvm/versions/node/v0.12.5/bin/shipit staging list'
+cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/breedv2
+
+
+
+#connect into tmux
+ssh root@5.79.75.96 -t tmux a
+-l
+SPACE
+
+ssh -tt root@5.79.75.96 << EOF
+ echo yyy
+ echo yyyid
+ tmux attach
+ echo yyy
+EOF
+#/home/user/.nvm/versions/node/v0.12.5/bin/shipit staging list
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/editahkgotos.ahk
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/editahkgotos.ahk	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/editahkgotos.ahk	(revision )
@@ -0,0 +1,10 @@
+WinActivate NodeTest - [
+Send ^+r
+SendRaw editahkgotos.ahk
+Sleep, 400
+
+
+Send {Enter}
+
+; // Send {Enter}
+; // #Send {Enter}
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/RemoteConsoleServer.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/RemoteConsoleServer.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/RemoteConsoleServer.js	(revision )
@@ -0,0 +1,1010 @@
+/**
+ * Created by user on 8/2/15.
+ */
+
+/**
+ * This is a mini server, that allows users to
+ * append to notes
+ *
+ * https://github.com/marytts/marytts/issues/213
+ */
+
+
+var sh = require('shelpers').shelpers;
+var shelpers = require('shelpers');
+
+var express = require('express');
+var config = global.config;
+
+var express = require("express");
+var app = express();
+
+var bodyParser = require('body-parser');
+
+app.use(bodyParser());
+
+//var open = require('open')
+
+
+
+var http = require('http').Server(app);
+var io = require('socket.io')(http);
+
+
+
+/**
+ * Created by user on 7/30/15.
+ */
+var sh = require('shelpers').shelpers;
+var shelpers = require('shelpers');
+var EasyRemoteTester = shelpers.EasyRemoteTester;
+
+
+function BrowserEvalServer() {
+    var p = BrowserEvalServer.prototype;
+    p = this;
+    var self = this;
+    self.data = {};
+
+    //specify url of everest folder
+    var baseUrl = 'http://127.0.0.1';
+
+    //create urls
+    var t = EasyRemoteTester.create('Test evenote basics',{})
+    t.settings.baseUrl = baseUrl
+    var urls = {};
+    urls.notes = {};
+    urls.reload = t.utils.createTestingUrl('reload')
+    urls.getFile = t.utils.createTestingUrl('getFile')
+    urls.notes.update = t.utils.createTestingUrl('notes')
+    urls.notes.get = t.utils.createTestingUrl('notes')
+
+    self.dirPrjRoot = '/media/psf/Dropbox/projects/crypto/deploy_nodejs'
+    self.dirPrjRoot = '/media/sf_projects/crypto/deploy_nodejs'
+
+    /**
+     * Setup middleware and routes
+     * @param url
+     * @param appCode
+     */
+    p.start = function start(url, appCode) {
+        //Add middleware for cross domains
+        app.use(function(req, res, next) {
+            res.header("Access-Control-Allow-Origin", "*");
+            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
+            next();
+        });
+
+        app.use(function(req, res, next) {
+            res.header("Access-Control-Allow-Origin", "*");
+            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
+            next();
+        });
+
+        self.settings = {};
+        self.settings.port = 5558
+        self.settings.port2 = 3000
+
+        self.settings.port = 4444
+        self.settings.port2 = 3002
+        baseUrl += ':' + self.settings.port;
+
+        self.data.id = 'RCS'+Math.random();
+
+        // app.post('/append_named',   self.appendNoteNamed);
+        //self.setupSession();
+        //var port = 3000
+        http.listen(self.settings.port, function () {
+            console.log('started')
+            console.log('go to ', baseUrl)
+            console.log('.', 'http://127.0.0.1:4444/testSay?text=Who%20are%20you?&rate=100%')
+        })
+
+        // open('http://localhost:5557')
+        // http://localhost:5557/index.html
+        var server = app.listen(self.settings.port2);
+        // var io = require('socket.io').listen(server, { log: true });
+
+        console.log('path', __dirname)
+        app.use(express.static(__dirname + '/public_html'))
+        app.use(express.static(__dirname + '/testFiles'));
+        //app.use(express.static(__dirname + '/testFileds'));
+        var path = __dirname + '/../../node_modules/shelpers/lib'
+        path = sh.fs.resolve(path)
+        console.log('path', path)
+        app.use(express.static(path))
+        //app.use(express.static(__dirname ) );// + '/public_html'))
+        self.appSocket = io
+        io.sockets.on('connection', function (socket) {
+            console.log('new connnnn')
+            self.pSocket = socket;
+            socket.emit('news', { hello: 'world' });
+            socket.emit('reload', {why:'grammar', count:self.data.id});
+
+            socket.on('my other event', function (data) {
+                console.log(data);
+            });
+
+            socket.on('audioEnded', function onAudioEndedUI (data) {
+                self.proc('audioEnded', data);
+                sh.callIfDefined(self.data.fxEndAudio)
+                self.data.fxEndAudio = null;
+            });
+            /*socket.on('chat message', function (data) {
+             console.log(data);
+             });*/
+            socket.on('chat message', function(msg){
+                io.emit('chat message', msg);
+            });
+
+
+            socket.on('window.invoke', function (x) {
+                console.log('window invoke')
+                socket.broadcast.emit('window.invoke', x);
+            })
+
+            socket.on('cmd', function (data) {
+                console.log('data', data);
+
+                if ( self.cmd ) {
+                    if ( sh.isWin() == false )
+                        self.cmd.kill();
+                    // self.cmd.kill();
+                    //self.cmd.kill();
+                }
+
+                var CommandRunner = sh.CommandRunner
+
+                //var self = {}
+
+                var dir_nodejs = '/home/user/.nvm/versions/node/v0.12.5/bin/'
+                var altVersion = '/home/user/.nvm/versions/node/v6.2.1/bin/'
+                var altVersion = '/home/user/.nvm/versions/node/v6.4.0/bin/'
+
+                if ( sh.fileExists(altVersion)){
+                    dir_nodejs = altVersion;
+                }
+                var dir_shipit = dir_nodejs+'shipit';
+
+                if ( sh.isMac() ) {
+
+                }
+                else if ( data.data ) {
+                    //why: if data, it is new type
+                    console.log('p', data)
+                    if (data.cmd == 'speakevernote') {
+
+                        data.cmd = 'ruby'
+                        data.args = ['C:/Users/user1/Dropbox/projects/soundboard/automate_android_store/autoit/evernote_speak_note_link.rb',
+                            data.data]
+                    }
+
+                    if (data.cmd == 'evernote') {
+
+                        //cmd /k "cd c:\myfolder & startbatch.bat"
+                        data.cmd = 'cmd'
+                        data.args = [
+                            "/k",
+                            'start',
+                            data.data]
+                    }
+
+
+
+                    if (data.cmd == 'evernotesearch') {
+
+                        //cmd /k "cd c:\myfolder & startbatch.bat"
+                        data.cmd = 'cmd'
+                        data.args = [
+                            //"/k",
+                            'C:/"program files (x86)"/Evernote/Evernote/ENScript.exe ',
+                            "showNotes",
+                            '/q',
+                            data.data]
+
+                        var args = data.args.join(' ')
+                        /* if ( data.data.indexOf(' ') != -1 ) {
+                         data.data = data.data.split( ' ')
+                         }*/
+                        if ( sh.isArray(data.data)) {
+                            data.args.pop()
+                            data.args = data.args.concat(data.data)
+                        }
+
+
+
+                        var filename = __dirname + '/' + 'tmp.bat';
+                        var contents = '';
+                        contents = [
+                            "echo '"+args+"'",
+                            args
+                        ]
+                        /*,
+                         ,
+                         'cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/']
+                         */
+                        contents.push(dir_nodejs+ data.cmd);
+                        sh.writeFile(filename, contents.join(sh.n));
+                        data.args = [filename]
+                        data.cmd = filename
+
+                    }
+
+                    if (data.cmd == 'evernote') {
+
+                        //cmd /k "cd c:\myfolder & startbatch.bat"
+                        data.cmd = 'cmd'
+                        data.args = [
+                            "/k",
+                            'start',
+                            data.data]
+                    }
+                }
+                else {
+
+                    if ( data.type  == 'shipit' ) {
+
+                        data.cwd = self.dirPrjRoot+'/ritv';
+                        var filename = __dirname + '/' + 'tmp.sh'
+                        var contents = '';
+                        contents = ['##!/bin/bash',
+                            "echo '"+data.cmd+"'",
+                            'PATH=$PATH:'+dir_nodejs,
+                            //'node="'+dir_nodejs+'node'+'"',
+                            //  '. ~/.nvm/nvm.sh',
+                            //   'env node',
+                            'echo $PATH',
+                            ,
+                            'cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/']
+                        contents.push(dir_nodejs+ data.cmd);
+                        sh.writeFile(filename, contents.join(sh.n))
+                        sh.fs.makeExec = function makeExecutable(filename) {
+                            sh.run('chmod +x ' + filename);
+                        }
+                        sh.fs.makeExec(filename)
+
+                        data.cmd = filename;
+                        data.args = [];
+                    }
+
+                    if ( data.type  == 'shipit_breed' ) {
+
+                        data.cwd = self.dirPrjRoot+'/breedv2';
+                        data.cmd = dir_shipit;
+                        //data.args = [];
+
+
+
+                        data.cwd = self.dirPrjRoot+'/breedv2';
+                        var filename = __dirname + '/' + 'tmp.sh'
+                        var contents = '';
+                        contents = ['#!/bin/bash',
+                            "echo '"+data.cmd+"'",
+                            'cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/breedv2/',
+
+
+                        ]
+                        data.cmd = 'shipit'
+                        contents.push(dir_nodejs + data.cmd + ' '  + data.args.join(' '));
+                        sh.writeFile(filename, contents.join(sh.n))
+                        sh.fs.makeExec = function makeExecutable(filename) {
+                            sh.run('chmod +x ' + filename);
+                        }
+                        sh.fs.makeExec(filename)
+
+                        data.cmd = filename;
+                        data.args = [];
+                    }
+
+                    if ( data.type  == 'ritv' ) {
+                        data.cwd = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/' //mega2list_wrapper.js
+                        if ( data.overrideJSON ) {
+                            //create override file
+                            data.args.push("overrideJSON")
+                            data.args.push( data.overrideJSON )
+                        };
+                    }
+
+                    //why: open a terminal and run a command
+                    if ( data.type  == 'terminal3' ) {
+                        //create file based on newtab.sh
+                        var cmd = data.cmd +   '; echo this sh works ; /bin/bash;'
+                        if ( data.cmd == '') {
+                            var cmd = data.cmd +   'echo this sh works ; /bin/bash;'
+                        }
+                        cmd = sh.replace(cmd, 'shipit', dir_shipit)
+                        var cwd = self.dirPrjRoot+'/breedv2';
+                        if ( data.dir == 'RITV') {
+                            cwd = self.dirPrjRoot+'/ritv'
+                        }
+                        var contents =
+                            [
+                                '#!/bin/bash',
+                                'lxterminal  -l  --working-directory="'+cwd+'" ' +
+                                " -t 'go' -e '"+cmd+"'"
+
+                            ]
+
+                        var filename = __dirname + '/' + 'tmp.sh'
+                        sh.writeFile(filename, contents.join(sh.n))
+                        sh.fs.makeExec = function makeExecutable(filename) {
+                            sh.run('chmod +x ' + filename);
+                        }
+                        sh.fs.makeExec(filename)
+                        data.cmd = filename;
+                        data.args = [];
+                    }
+
+                    sh.writeShFile = function writeShFile (filenameTmpSh, contents ) {
+                        if ( sh.isArray(contents)){
+                            contents = contents.join(sh.n);
+                        }
+                        sh.writeFile(filenameTmpSh, contents);
+                        sh.fs.makeExec = function makeExecutable(filenameTmpSh) {
+                            sh.run('chmod +x ' + filenameTmpSh);
+                        }
+                        sh.fs.makeExec(filenameTmpSh)
+                    }
+
+                    var filenameTmpSh = __dirname + '/' + 'tmp.sh'
+
+                    if ( data.type  == 'open.bash' ) {
+                        //run a bash command from cmd line
+                        if ( data.dir == null )
+                            data.dir = self.dirPrjRoot+'/ritv';
+                        data.cmd = sh.replace(data.cmd, 'shipit', dir_shipit );
+                        //'/home/user/.nvm/versions/node/v0.12.5/bin/shipit')
+
+                        if ( data.dir == 'RITV') {
+                            data.dir = self.dirPrjRoot+'/ritv'
+                        }
+                        if ( data.dir == 'SEED') {
+                            data.dir = self.dirPrjRoot+'/breedv2'
+                        }
+
+                        var contents = [];
+                        contents = ['#!/bin/bash',
+                            "echo '"+data.cmd+"'",
+                            'PATH=$PATH:'+dir_nodejs,
+                            'cd ' + data.dir,
+                            data.cmd
+                        ]
+                        sh.writeShFile(filenameTmpSh, contents.join(sh.n))
+                        data.cmd = filenameTmpSh;
+                        data.args = [];
+                    }
+                }
+
+
+                self.proc('what is command', sh.toJSONString(data) )
+
+
+                function fxDone () {
+
+                }
+
+                var cmd = new CommandRunner()
+                var settings = data
+                settings.silent = self.silent
+                settings.fxCallback =
+                    function commandFinished() {
+                        console.log(cmd.log.output)
+                        sh.callIfDefined(fxDone);
+                    }
+
+                settings.fxEcho = function onOutput(line){
+                    console.log('fxEcho', line)
+                    io.emit('cmdout', line);
+                    socket.broadcast.emit('cmdout', line);
+                }
+
+
+                self.cmd = cmd;
+
+                //settings.cmd = cmdtxt
+                //settings.args = args;
+                cmd.execute(settings)
+                //console.log('run', args)
+
+            });
+        });
+
+        self.server = app;
+        self.newRoutes();
+
+        self.getCSVFiles();
+    }
+
+
+    p.getCSVFiles = function getCSVFiles() {
+        self.proc('getCSVFiles')
+        sh.convertCSV = function convertCSV(contents) {
+            var $ = sh;
+            sh.toCamelCase = function toCamelCase(str) {
+                return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
+                    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
+                    return index == 0 ? match.toLowerCase() : match.toUpperCase();
+                });
+            }
+
+            function removeFromBegAndEndOfStr(text, removeStr) {
+                if (  text == null || text.startsWith == null ) {
+                    debugger;
+                }
+                if ( text.startsWith(removeStr) &&
+                    text.endsWith(removeStr)) {
+
+                    text = text.replace(removeStr, '')
+                    text = text.slice(0,text.length-removeStr.length)
+                }
+//    if ( sh.endsWith(text, removeStr)) {
+//        text = text.slice(0,text.length-removeStr.length)
+//    }
+                return text;
+            }
+
+            function unquote(text) {
+                return removeFromBegAndEndOfStr(text, '"')
+            }
+
+            sh.unquote = unquote
+
+            sh.CSVtoArray = // Return array of string values, or NULL if CSV string not well formed.
+                function CSVtoArray(text) {
+                    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
+                    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
+                    // Return NULL if input string is not well formed CSV string.
+                    if (!re_valid.test(text)) return null;
+                    var a = [];                     // Initialize array to receive values.
+                    text.replace(re_value, // "Walk" the string using replace with callback.
+                        function(m0, m1, m2, m3) {
+                            // Remove backslash from \' in single quoted values.
+                            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
+                            // Remove backslash from \" in double quoted values.
+                            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
+                            else if (m3 !== undefined) a.push(m3);
+                            return ''; // Return empty string.
+                        });
+                    // Handle special case of empty last value.
+                    if (/,\s*$/.test(text)) a.push('');
+                    return a;
+                };
+
+            var lines = contents.split('\n')
+            var it = {};
+            it.objs = [];
+            $.each(lines, function procLine(k,line) {
+                var fields = line.split(',')
+                var fields2 = sh.CSVtoArray(line)
+                if ( fields2 == null && fields.length > 0 ) {
+                    fields2 = fields; //possibly invalid
+                    console.warn('possibliy invalid line', fields2)
+                }
+                if ( fields.length != fields2.length ) {
+                    //    debugger;
+                }
+                fields=fields2
+                if ( line.trim() == '' )
+                    return;
+                if  ( k == 0 ) {
+                    it.columnNames = fields;
+                    return;
+                }
+                var unquoted = []
+                $.each(it.columnNames, function addCol(cI, colName) {
+                    var fixed = colName
+                    unquoted.push(sh.toCamelCase(sh.unquote(colName)))
+                })
+                it.columnNames = unquoted;
+                //console.error(k, line, fields)
+                var obj = {};
+
+                $.each(it.columnNames, function addCol(cI, col) {
+                    var val  = fields[cI];
+                    if ( val == null ) {
+                        return;
+                    }
+                    val = sh.unquote(val);
+                    obj[col] = val;
+                })
+                it.objs.push(obj);
+            })
+            console.log('how many?', it.objs.length)
+            //  sh.each.print(it.objs)
+            // process.exit();
+            return it.objs;
+        }
+
+        /*var y = sh.readJSONFile(__dirname+ '/' + 'public_html/'
+         + 'actions.json');*/
+        var dirCSV = sh.readFile(__dirname+ '/' + 'public_html/sr/'
+            + 'actions.csv');
+        var yyy = sh.convertCSV(dirCSV)
+        console.log(yyy);
+        var dict = {};
+        sh.each(yyy, function kc(k,v) {
+            dict[v.name] = v;
+        });
+
+        var dirCSV2 = sh.readFile(__dirname+ '/' + 'public_html/sr/'
+            + 'actions2.csv');
+        var yyy = sh.convertCSV(dirCSV2)
+        sh.each(yyy, function kc(k,v) {
+            dict[v.name] = v;
+        });
+
+        var actionsLengths = 0;
+        sh.each(dict, function onHandleAliases(k,v) {
+            if ( v.cmd == null ) {
+                console.info('skip line', v)
+                return;
+            }
+            if ( v.cmd.startsWith('|') ) {
+                var parent = v.cmd.slice(1)
+                var match = dict[parent]
+                if ( match == null ) {
+                    console.error('broken on', v.name, match)
+                    delete dict[v.name];
+                } else {
+                    dict[v.name] = match;
+                }
+            } else {
+                //   dict[v.name] = v;
+            }
+            actionsLengths++
+        });
+
+
+        self.data.dictActions = dict;
+        self.data.actionsLengths = actionsLengths;
+
+    }
+
+    self.newRoutes = function newroutes() {
+
+
+
+
+        self.server.get('/getFile', function (req, res) {
+            var fileName = req.query.file;
+            console.log(req.query.file, 'file....');
+
+            function LoadFile () {
+                var self = this;
+                var p = this;
+                p.init = function init() {
+
+                };
+
+                p.loadTestFile = function loadTestFile(file) {
+                    var contents = sh.readFile('testFiles/'+file)
+                    var addTo = []
+                    var config = {}
+                    config.ignore = ['data: WARNING: Skip: ',
+                        'WARNING: Skipping FS',
+                        'data: ERROR: Can',
+                        'child process '
+                    ]
+                    config.ignoreComments = true;
+                    config.fxProc = function parseCmd(item){
+                        var fields = item.split(',')
+                        var fixed = [];
+                        sh.each(fields, function x(i,f){
+                            f=f.trim()
+                            fixed.push(f);
+                        });
+                        fields = fixed;
+
+                        function CmdConvertor() {
+                            var self = this;
+                            var p = this;
+                            p.init = function init(d) {
+                                self.output = {};
+                                self.output.orig  =d;
+                                var firstField = d[0];
+                                var second = d[1];
+
+                                var helper = {};
+
+                                helper.typeIs = function isType(type) {
+                                    type = type.toLowerCase();
+                                    if ( type == firstField.toLowerCase())
+                                        return true;
+                                    return false;
+                                };
+
+                                helper.makeQuery = function makeQuery(asdf) {
+                                    if ( asdf.indexOf(' ')==-1) {
+                                        return '#'+asdf;
+                                    }
+                                    return asdf;
+                                };
+
+                                self.orig = d;
+
+                                if ( helper.typeIs('click')) {
+                                    var template = "$('#query').click();"
+                                    var query = second;
+                                    query = helper.makeQuery(query)
+                                    template = template.replace('#query', query);
+                                    self.output.eval = template;
+                                }
+
+                                return  self.output;
+                            };
+                        }
+
+
+                        var y  = new CmdConvertor();
+
+                        return y.init(fields)
+                        return fixed;
+                    }
+                    var lines = sh.each.lines(contents, config)
+                    self.lines = lines;
+                    return lines;
+                };
+            }
+
+
+            var l = new LoadFile();
+            self.lines = l.loadTestFile(fileName);
+            console.log('loaded', l.lines.length)
+            //console.log(sh.toJSONString(l.lines));
+            setTimeout(function () {
+                self.sendNext();
+            }, 400);
+            //process.exit();
+            res.json({status:'ok'});
+        });
+
+
+        self.server.get('/next', function (req, res) {
+                var fileName = req.query.file;
+                console.log( 'next', 'file....');
+                setTimeout(function () {
+                    self.sendNext();
+                }, 400)
+                res.end('ok');
+            }
+        )
+
+        self.server.get('/reloadActions', function onReloadActions(req, res) {
+                self.getCSVFiles();
+                res.end('reloaded ' + self.data.actionsLengths);
+            }
+        )
+
+        // process.exit();
+        self.server.get('/doAction', function onAction(req, res) {
+            var fileName = req.query.file;
+            var action = self.data.dictActions[req.query.actionName]
+            console.log('what is', req.query)
+            console.log(req.query.actionName, 'file....', action);
+
+            var cmdOverride = req.query.cmdOverride;
+
+            if (action ) {
+                var cmd = action.cmd;
+            }
+
+            var cmd2 = '';
+            if ( cmdOverride ) {
+                cmd = cmdOverride;
+                console.log('overrideCmd', cmdOverride);
+                cmd2 = 'start ' + ' "" ' + cmdOverride
+            }
+
+            if ( cmd && cmd.includes(':')) {
+                cmd = sh.qq(cmd)
+            }
+
+            cmd2 = 'start ' + ' "" ' + cmd
+
+            console.log('cmd2', cmd2)
+            console.log("\t", 'cmd', cmd)
+
+            if ( cmd.startsWith('http') || cmd.startsWith('"http')) {
+                cmd2= ['start', '""', 'chrome',
+                    '--new-window', cmd]
+                cmd2 = cmd2.join(' ')
+            }
+
+            sh.run(cmd2)
+
+            res.send('ok');
+        });
+
+
+    }
+
+    p.open = function method(dirToOpen) {
+        //C:\Users\Leniel>start %windir%\explorer.exe "C:\Users\Leniel\Desktop"
+        var cmd = 'start %windir%\\explorer.exe '+
+            sh.qq(dirToOpen)
+        var cmd = 'explorer '+
+            sh.qq(dirToOpen)
+        try {
+            sh.run(cmd)
+        } catch ( e ) {
+            console.error('what?')
+        }
+        //return
+        var fileBat = 'test.bat';
+        sh.writeFile(fileBat, cmd);
+        var cmd2 = 'start test.bat'
+        sh.run(cmd2)
+
+
+    }
+
+    self.sendNext = function sendNextCommand() {
+        if ( self.lines.length == 0 ) {
+            console.log('all work is done');
+            return;
+        }
+        var cmd = self.lines.shift();
+        if ( self.pSocket == null ) {
+            self.proc('pSocket is null')
+            return;
+        }
+        self.proc('sent')
+        self.appSocket.emit('runcmd', cmd);
+        self.appSocket.emit('chat message', "llllllllllllllllllllllll");
+    }
+
+    self.setupSession = function setupSession() {
+        var t = EasyRemoteTester.create('Test evenote basics',{});
+        var data = {};
+
+        t.settings.baseUrl = baseUrl;
+
+
+        t.xadd(function reload() {
+                t.quickRequest( urls.reload,
+                    'get', onResult )
+                function onResult(body) {
+                    // console.log('body', body)
+                    t.assert(body.id>0, 'post-verify did not let me do a search');
+                    t.cb();
+                }
+            }
+        );
+
+        t.add(function getFiles() {
+                t.quickRequest( urls.getFile,
+                    'get', onResult, {file:'a.txt'} )
+                function onResult(body) {
+                    // console.log('body', body)
+                    t.assert(body.status=='ok', 'did not parse file');
+                    t.cb();
+                }
+            }
+        );
+    }
+
+
+    function defineRoutes(){
+        self.say = function sayRoute(req, res){
+            console.log('... say route ... ')
+            var speakOpts = {};
+            if ( req.body ) {
+                speakOpts       = req.body;
+            }
+            if ( req.query && req.query.text ) {
+                speakOpts       = req.query;
+            }
+            speakOpts.text = sh.dv(speakOpts.text, speakOpts.txt);
+            speakOpts.text = sh.dv(speakOpts.text, ' ')
+
+            speakOpts.playAudio = speakOpts.playAudio == 'true';
+            speakOpts.speakOnce = speakOpts.speakOnce == 'true';
+
+            speakOpts.text = speakOpts.text.replace(/"/g, "'");
+            speakOpts.text = speakOpts.text.replace(/“/g, "'");
+
+            if ( speakOpts.rate ) {
+                if ( sh.isNumber(speakOpts.rate)) {
+                    speakOpts.rate = speakOpts.rate * 100 / 5;
+                    speakOpts.rate += '%'
+                }
+            }
+
+            self.proc('speak', speakOpts.rate, speakOpts.text)
+
+            speakOpts.fx = function () {
+                if ( res.send )
+                    res.send('');
+            }
+            self.speak(speakOpts) ;
+            return;
+        }
+
+        self.testSay = function testSay(req, res){
+            function test() {
+                var req2 = {};
+                req2.body = {};
+                req2.body.text = 'sentence.'
+                if ( req.query ) {
+                    req2 = req;
+                }
+                req2.body.playAudio = 'true'
+                var res = {};
+                res.json =function () {}
+                self.say(req2, res)
+            }
+            test();
+            res.send(sh.getTimeStamp())
+        }
+
+        self.getSound = function getSound(req, res){
+            res.sendfile('sample.wav');
+        }
+
+
+        p.speak = function speak(  speakOpts){
+            if ( speakOpts.speakOnce   ){
+                if (  self.speaking != 0 && self.speaking != null ) {
+                    console.warn('ignoring speaking', self.speaking)
+                    fx(true)
+                    return;
+                }
+            }
+            self.speaking = Math.random();
+            console.log("speak.text: "+speakOpts.text);
+
+            var MaryTTSSpeaker = require('./MaryTTSSpeaker').MaryTTSSpeaker;
+            var m = new MaryTTSSpeaker();
+
+            if ( self.data.oldMary ) {
+                //ensure old requests are responded to express allows 6 concurrent connections
+                self.data.oldMary.kill();
+                sh.callIfDefined(self.data.fxEndAudio)
+            }
+            self.data.oldMary = m;
+            var fxEnd = speakOpts.fx;
+            /* setTimeout(function () {
+             sh.callIfDefined(fxEnd)
+             }, 2000)*/
+            self.data.fxEndAudio = fxEnd;
+
+            var cfg = speakOpts;
+            cfg.fx = function done(file){
+                //what is time?
+                var url = '/getSound'
+                url +='?'+ new Date()
+                io.sockets.emit('play', { hello: 'world', file: file,
+                    url: url});
+                // self.appSocket.emit('play', { hello: 'world' });
+            }
+            m.speak(cfg)
+
+            return;
+
+
+            function runThing() {
+                if ( self.lastCp ) {
+                    self.lastCp.kill('SIGINT')
+                }
+                // EXECUTION
+                var cp = child_process.exec(gb, function (err, stdout, stderr){
+                    self.speaking = 0;
+                    if ( isMac ) {
+                        var cmd2convert = 'lame -m m '+file+'.aiff '+file+'.mp3';
+                        var cmd2convert = 'ffmpeg -i '+file+'.aiff '+file+'.wav';
+                        console.log('cmd2convert', cmd2convert)
+
+                        if ( playAudio == true ) {
+                            var cmd2play = 'afplay ' + file+'.aiff';
+                            console.log('playAudio')
+                            var cp = child_process.exec(cmd2play, function (err, stdout, stderr){
+                                fx(true);
+                                console.log('....')
+                                // if ( playAudio != true ) {
+
+                                // }
+
+                            });
+                            return;
+                        }
+
+                        var cp = child_process.exec(cmd2convert, function (err, stdout, stderr){
+                            fx(true);
+                            console.log('finished converting')
+                        });
+                        return
+                    }
+
+                    fx(true);
+                    //console.log('done speaking', text, stdout);
+                });
+                self.lastCp = cp;
+
+            }
+            return;
+        }
+
+        p.listVoices = function listVoices(req, res){
+            //console.log("speak.text: "+text);
+            var child_process = require('child_process');
+            var gb = "say -v '?'"
+            var isMac = sh.isWin() == false
+            //  rate = 7
+            if(sh.isWin()){ //windows
+                gb = 'cscript "C:\\Program Files\\Jampal\\ptts.vbs" -vl ';
+            }
+            console.log('log', gb)
+            // EXECUTION
+            var cp = child_process.exec(gb, function (err, stdout, stderr){
+                if ( isMac ) {
+                    var cmd2convert = 'lame -m m '+file+'.aiff '+file+'.mp3';
+                    var cmd2convert = 'ffmpeg -i '+file+'.aiff '+file+'.wav';
+                    console.log('cmd2convert', cmd2convert)
+                    var cp = child_process.exec(cmd2convert, function (err, stdout, stderr){
+                        fx(true);
+                    });
+                    return
+                }
+
+                res.send(stdout)
+                //console.log('done speaking', text, stdout);
+            });
+            return;
+        }
+    }
+    defineRoutes();
+
+
+    app.use(function(req, res, next) {
+        res.header("Access-Control-Allow-Origin", "*");
+        res.header("Access-Control-Allow-Origin", req.headers['origin']);
+        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
+        next();
+    });
+
+    app.post('/say', self.say);
+    app.get('/testSay', self.testSay);
+    app.get('/say', self.say);
+    app.get('/list', self.listVoices);
+    app.get('/getSound', self.getSound);
+
+
+    p.test = function test() {}
+
+
+    p.proc = function debugLogger() {
+        if ( self.silent == true) {
+            return;
+        }
+        sh.sLog(arguments)
+    }
+
+
+}
+
+exports.BrowserEvalServer = BrowserEvalServer;
+
+if (module.parent == null) {
+    var e = new BrowserEvalServer()
+    e.start();
+
+    e.test();
+
+    var req = {};
+    req.body = {};
+    req.body.text = 'sentence.'
+    req.body.playAudio = 'true'
+    var res = {};
+    res.json =function () {}
+    // e.say(req, res)
+
+    setTimeout(function(){
+        e.say(req, res)
+    }, 1000)
+
+    /*  setTimeout(function(){
+     e.say(req, res)
+     }, 3000)*/
+
+}
+
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/sample.wav
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/sample.wav	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/sample.wav	(revision )
@@ -0,0 +1,273 @@
+RIFFXw  WAVEfmt      �>   }    data4w      	   
+ 
+ 
+ 	 
+ 
+  
+ 	  	 
+        	                                                                                              	    
+ 	  	  	 	  
+ 
+ 	      
+ 
+  
+ 
+       
+     
+  
+   	   
+ 	 	 
+ 
+  
+ 
+                       ��                 ��������      ����    ����    ��      ����������������������������      ������  ��������                  ��      ����
+      ��           	   
+    
+ 
+  	   	                           �� �� ����/ ����  
+      ��   �� ���� ������  ����   ����������������������������  ��������������  ����  ��  ����  ������  ������                          	                   	                	        
+          
+ �� ��K  ��p 	 ��D  ��s ��  p ��(  ������ ��
+ ����! �� 8 ��- ����, ���� ����  	 ���� �������� ����   ��  ����  ��  ����
+ ���� 	     	 ��  ��  ��	                         
+      	 
+  
+     
+     	  	          	  
+      	    ��  ��    ��	 ����������    ��      ��        ��  ��������������  ����  ����  ��������    ����      ��  ��  	 ��       ��   ��  ��   ��        	                                             ��     ��������������������           ��  ������������������  ������    ������������������  ������������������������������ ��������/ ! ����������  �������� ��������������������������   ����4  ����! , ����T  ��  ; : ����i  �� /  �� = ����8 1 ���� ( �� �� % ���� 1 ��
+ # ��   ����i �������  ���`  �� ������  ��������W  u���T T E�  
+ % ����� ������M ��1 ������- � B���3 Y F =� � ������, w B�R������� g� ��	 H [ ��S��  ��   n ��| A  �� � i D�x��/ ����xp �������1 � d� ��� X��;�2�����~ ���jz���_�l��$B��{�^�w����� ����� .�; �� ������� �E��`��] ��P�9� 2���h] ��� �  4 ��� � �� ;�^ 2��@���2���3�������I ��9�������� k Q�+`.�����u�S��r�����yS���v|�_�� �{�s��e�����
+ F�a��� ��B�"�Y�� z��q��� ����R��"�  <��6�T������ ���������c����� ���M E ~�O~ 
+�� ��� )�� f��Q�[��&�"`�������x�u��������� ( ��� {��y��!�)�.+�j�[�> *��#��+��������S ���_ � �� ��&�� D "� ��4��, ������ � ��� {���(r�o�E,��������V  F Z���R�����A H�� � ������������ 4�#�>�K���(X���7���'� 4����<�����` ������������E 8s������|�c���!
+��	��	�����f
+���
+? l����X 4���&Xb�����S�_��S�����e�	����m���� k����A�
+2�A��� G��J.�C�� �	��������:�t�������i� ��g0]�)��� A��Y	����/`��������E	Y���9�������q�����'c� ����!@��\x�6�<Z�S��9�������wsM���N_ ?������<����� � .��P����2���������k� ���q���0OU�����~���� �	b����:F����% f�,3�� ���	�����D�� v��%�{������!�r��d�O����������*em�`�U�P�gW����� ��L7�	�����7���|��w�C�|d�[�\����0z��T��S ���	���6�� o���������e������%>����^�r������������i �������Ty��v�����cYQ m��7���� ������������`� |�7�9����6��������t���R1�4��V�8 ��	CZ���� � ��/�x! !�G�I~����	� ����t���g�����N���N����o�v{r����� W���X ��A���N R{���@�h���f�F�� �
+��������
+ Y�c���� �=�i��e�\)�������K�������Y
+1��m�W��*��`7��,���$�p���1��������������h�,��	g 	�Y��) +������������[	���� T���S�7����a��;�����I��
+���}�*�����j�������~���������}��K�R�	
+�D�0u�m���4m�r����}���1��FY����5{���� +�8	h�������m���Vo9�L!���V ��� k�6+e�^�J����<�x�+
+��g��v^��}
+b�������������P��k��� <���� ��U)�@"� ��|hw��	�1���]
+`����-g����S� R� ��n �������������H����� U.�|� d ������
+\�, ����/	��p��S�
+�����������������������	Gg�-)�E�g��
+�� #��rg����O��M`��A���������	�����	*���	Z ��������VA��������W��o��
+	��Y
+y���S���������E�����@+�� &����8	e����� ��*���J���?6 ��� ������y��Z �����" s�V����X[����Q����������!�:�X�����] ������M�4��t�[���n `-��' L�d��? � ��i �����[�� *���������� g�j�� ����h���� z �_ ��CU @� D ���) if����%  ��<�  N W���7���!�R�� x����� �U �;� }I � D r���~�����a�F�m���/�t��������
+��������%�
+�L���_������������{�A�������������h����������-�u(��a>
+�	�
+�J��#C�
+�
+�
+�
+&S	�	`
+ 	l	;	L	�	�'	#
+n	�	�pN	%P�r��u��v��������������-�H��.����R���~�0����Z���k����x��	��x�q�!
+���/�����	K"����� z ��C�#���q�����+����	#�
+�
+��`�m���
+�
+
+�P��$t�<dF���8�
+��
+�	 
+G
+I]�5�� ��T�����Q���1���9���+�!��'���(��P�����bҡ��Ư��b�+�O�K
+��bj�~
+7�2;	9�����������=�!���f	��
+6C1��	
+��]��   5�������������� 7����LFt���
+y���� &���U � ���g�27J�&��G h����g���.�j�X��3���A���y�F�Ѻ�b�F��sD�j#�"����&��������������������
+�9����F�
+��svL��U���8������!�� �������l�e�2<Z*y�+��� j��8 D L � ��Zus
+Y��������+����������aߺڻ�������kўֻݽ�������
+7�8	C
+	���-�����6���	�q��t��(<
+O#	��	�O��9�A>��h�������0���I  ��� ��+X�J�:W��81	��*]`#�� f�����-���������W�<l������{�����������(�}Ո��=Ѩ�����z��������O��	���/�  �^�2��%�����W�% ���/
+R��{
+t5#��
+Q�� ����5�������J�q�6�����A�>rR�	�?+���C �+�AE	���5�i U�l����� �5���V� �!���w���%�����9�;���и�͡���j����=�IY
+8���	��so��� ^�2���+���#���.�����|�.�	�}J!�{
+	P����[���m�
+ � ���r�������n���>>G	-
++W���
+?�
+s
+8 E����� ���� v��
+,k�rT������8��������s����͑�������b�]��
+	���
+��
+�JV~�P��������B��N�E����<��
+qsF��P��
+6	��������� h�8�U���+�=���� GP�
+$�4��	�k|����
+a�, e����*s�S ������If��������������������e��6���G�"����0q	���Z=@ ��
+�����������m�� ������
+b	C	�SP`r
+jj
+�= �T����d���:���������U�`X	Y�	��
+G�
+�KO��
+Kn�+����l-X#�_ ~�#c�c�p�Sx�; �����|�����%����ݯ��y�3��|�=�+�<� O^��	`=!�i	6
+�s	���������U��� �
+�!����7��� o7V�
+�
+�*�'1		mo�s� �z�����]���A�-��L��
+�)�
+�9��@
+�
+Y c!j�� m�+���Y��p x;��i|�w�W���L�%����T�I��M�6�ܦ�޻�C�X�����f�)�a�d�  0
+��
+��.�E�i�� �8L	�� �&cF������W� � �$H�Q����BK�A���y�4		r9�0�h��1��n�;���B�����j�p ������v�4�#��������=�"���O���j���i��ߨ�$����D�����$�b�e���j�sh��
+�FU
+?}�%�gY	����
+
+O
+I�[����t�7��������w���� u���#q�#�������	��u��	�	V	���P<o�����@��q�
+�  ��:������J� �����������������P��*��ߊ���k��v�������&��9�:�����@&
+�^���z��s�������
+`	����>u��Y�������-�<�$���p � � � Q�g��5���BL�V	
+	'	d	�	1
+�	]	Qk�<(���C��Q�� �  ����R�����#����� �'�������D��$�
+��<�@�����e���8�{�a�3�s������4���;���2
+�
+���oR5�A���"��
+N	r����i ^�������C�������c�6 � � k }`�t���g	�	�	�	�	#
+�
+n
+�	*
+[
+�	.���J�J�vGG�'p  ����+�����{��t������b���1�=�+�����%�3�K��]�����/�b�N�d�z��V����i���&����.�<�| �	�<&��
+�E�b��������
+^�
+s	��+�V� ?�����������P��� � � � i��K&k�d	N	"	8	B	6
+�			����!�c���k   ������f�?�	���:���j���9���X������P�Z�~�C� ������M����[������\��2���d�q�����z�a�
+���g�r�X �,��	�
+�|
+U%IS����d<
+�V
+��|��Ts� � s � g � ]V�����2�&<�����w\��Y�(��{��� 8 ����)�������������~�h�Y�K�-�������l����@���6�����,���8���y���r�����(�����g�}�^�;���e�q�����B���O����O�\�A�������<�y���;b/���p�b	s	�	�	
+O
+�	�	�	b		�_�1�8�5��v+����}�@�}M�OoV�H��� @��� @
+� � � Z    ����M�:������h�&���������O�C����������x���{�6�!������g�[�1�O�`�V�L�,�V�b�x�����;�@���s����������v�E����������c��������D�^���������= g � � � 
+1ig�����-ETqs���������������lbTO/#�����XS'
+� � � � � � x S ) .   ����������������������w�^�U�R�W�\�\�Z�R�W�R�P�K�D�R�M�W�\�\�k�k�������������������������������������     ����     " , , ) 1 1 ? D D M > A ? F T T g ` _ _ R X S Z ^ ^ c R O I E H A M H F N ; = 6 = H > B 7 4 8 5 ; 9 7 6 9 8 7 < 7 7 7 1 / & "   " "  "   # !  ! !   & )  	  &  	 
+    	      %    #  !   "   
+ ?  B ���� ��,���w��������N  n���� 6 ����P *   9 �� ��*���w�v �      !         !                          
+         
+   	                        ��  ������������������������������������������������������������  �� ��
+ ��
+ ��    & ��� ��=$��I���������x6�`�@������ !���������m�k � �	��g��
+�	Z������A�$�<|�?�p��� �u��xj���t 5� ����>�3 ����Q�� 1�����U�U�I 3�(k�\� * ���� b �����3�
+ ��s��t� �K����� � ��� B�����  �� � ��d�!8i�:��	 ����Ed�X�8���������f�F�'������k���Q�O�d�N � f �� P ��� :�������4�	�-�o�^���R������ g������ � ��  b���} ����� �Y�.\��o �������3 �� *����w?���5�O�� �� K� � ��j��������������� ,����N ���&�!��F���R ����������k� ���@�]�{������������m���A�������� ��q��s,m	����me6�R���� ��������<�U��L�����t 5 � v@@�����0.!�R�.��P��k ��� %z� �@�F�����������j���h� �  /���������W���0�%��������l��G�����\����F�������o���	 �I]U�
+�
+�h�
+���
+{�]������u���
+�k���E�1�������f � B�j�v!
+y��
+�	T�E qBIf��+��������������]�s�_�0������G����O�Q�\����<� � b �������v������0�u�'JF���	��=����#�K  ����"�����g�����A�c���������4�q���@�0�s�"�b�:�����/��MV�
+���#;��@���	�
+�E����������
+� �=�a���������v�|�����6�����;
+�.��
+�	.			Y�c��  ��A�+�a���|��[���(����j�?���6�U�E � ��?��{\��"�'��..'&T �����l���^���r4h�O��� ��-�g���:���X���D��{�	��1�i�p������������g����\
+
+���,w����/�
+�;
+���l���=�;���U�j����p�w�
+�������������W��	~8�
+��	T	�	�	�}Y�����7��@��h������������j��� t � E3n���@��"���� ����������]�$ i�� X����m�5�������Q���;( ������^�H�D�_����u�����#������N�����V�9���_�Z������:��c�	Bz%
+P��	1��
+�{�X�
+�x�M�.�����4�|�����R�c�P�D�q ���g�q]�<	"���!�cBN@mg�O����Y�����!�`����������E�R�����������	�"�  '�0�%]a���� �M,O�=��u>"�" ����0H�>�S�'�]�#>��������g�����6��X����x�����k��P��������� ���l��^e
+���	�	1��A�}�� ������i�(���9��������� : �� � X�O'jw�l�~�l��m�}�W * ���o�( ���
+������$�=�������+�P������� �d��)�=�0n�~���X]Dj?p�T9��?"�+k��F�.���N :z���H�c�������4���R�S���x��P���5���6�Q���	�\�� ��<����lWJ��
+�
+�OQ�
+��#�L�k�A�m��
+�M���������8�?������ � !�!�_hT�e�9e7Q�h����z �� i  f���k���S�������� �������g�����:�[�	 *�c�X�����l�l���j?��)�le��q.g%�����'�� � 
+ ��F���+�����A����3�������� �y��2��!�B����#�����s����S��>5	�	~�;��"�
+q	�Gy69��z  3�G�:�(������t�$�����J��������1 � � � � � @o�����|�m*� � ! ����N�����������������������-�t��� [ � � � Eh��X�7h�\H�?�0�A4���g����+��T��7Y k���A�����5���(������B�T�C��������H�C����������������(�>����!
+��{
+A�E�4�
+�
+
++M�
+�		$��{���f ����3����� �����s�.����H�O�4�4�S�����p���:�����:�����t � j�;u���sTR;����~3� � � t G &       ��T � ~O�2!��ne�����v������	�Q����� ����^�O���d���^�������u�N�	�C�������������B��4�P�M�p���  ��m�	D��
+t>����e�
+n
+���
+�	!	��L
+�� ����	�\�����O���������u������������w���g���b����Y���@ � 3�V��������c9���V � � i I $ !     � �.�aag����*�$*:���p	�)Hnq�8 �������'���z�����O�a� �!�f���d�Q�������������T��$�������N��q�n��
+QA
+�
+����N�i�
+
+'@
+�	q&���_*
+ ��:������{�0�����s�_�c�|��������e���4������d���}�  o � _��%o������hM!����x� � � � � � � � � K�q�7s� �Q��6+����`��"�]s� ��������������x�b�U�������#���[��[�������Y�I��J���[�I������i�3n=�!�	�
+w�O
+{
+�
+�
+ 
+�M�
+b	���'2� ����<������S������_�?�2�\������A���Z���S�����U���8 � Y�#X>�
+70��_bKR&P7�Kb����5|�0]���%  apF)����c_��� P ����^�b�����Q����� �!�U�����C���X���Z����+�H���)����C�1�C����������@�
+F��1	_
+Me�
+ �
+y
+g
+2
+�Z�s�
+�	�N���T
+��8�p�n������w�#��������u�������D�����O�����1���b���> � 1b��O�����cB5,R#f@0V!�Xs��,�K�y���BJ��u,���� � ��A�����^���+�����q����h�������>���������#��������D�R������n���S���+���2���:���P�  z �>�F�����������H��%�c��;��P� � m Y 8 C ( ��  ���������������� ( R [ z � � � � � � � � !73IEVq���������~f[1� � � � � � � x q 3  ��[������8������b����X�0�
+�'�)���������������6�M���������"�H��������������1�������< E T N Y ] ] [ o � � � � � � � � � B����������������*������RbE~,R.!� � � T 1  8  * ����/ �� ��, ��f k�N�&���jE ����, ���������}���5�x�����5���A����b���:���m�
+ ��$���G���L ������d� 
+�� b���
+ � 8���� ��G G [ ��� ��� ��� �  8 ������& �� ,   � i �����E P�� s��N �G� � d ��*��� L k����  ��� i�d��q ��� ( ��q @ L \����N �� � ���������  ��  8 �� k ������ ���H��� 3 }�o k�B��]  � ��� ����*`����5 $�� � <  x�B]�!��� � t���� � �Y 7U� ���� , ��i ��� �8 @����N -���� � ������& :�� �  ��q 3r�]:���� ��� ��?C����� i�������3N� %�� 
+� ���� �]@ ��� f � ��Y G��(��� ���� ��/ ��f�8 C ���5�w	�J������� ������_C�
+ ������ ���� e �Y}g���r�����6F���� ���^�U� ����bv�����l����W�}�+������C���;r��% y7�R�� � m��]B�� �����Y���� ��k�� �  ��P�x�T��G����"�J+�&�y{�n�^��(�~/��U$� � ny <��pi���Wk 4��p~����� 8�'��6������	p�V��� ��Z��&�b������������%_���Z	��J�W	���%�
+������������"�u se ��0k��zo����pr��� �� n�� ���Z��H ^�CR���*
+���������� �q���� �/�o������B�����+#�Y�������$��������h
+���\����_�&����n���&� So�_��y�[�9g���4����! 9� h4�@�� vF����K��������� ; ��|�f����h7�x�=S�W. �����L����� ���y7�%��G���� ��f� ����X ��u ����7����V�	����V�����
+��d���5�� �������� � ��5�8�6r����������	%�?��p���C�����
+����	o�������+��H������ �����*���8R��Ex�Yc��� ���Y�6�x����[
+��� U�� ���
+B���7s���� P�e �����k������:*�� 4d���W� ���2�Q������v�\!�����*��| M���+���H��R��c��id�d�  �� �^ �� ���q���� ����^���M�
+ ��y���q�����7�3��������V�� )�|����������j����� ��
+���������g�� )���������B)���(������9�� ��� �������28���u>���
+� ;�����v�����i��Q��V���5��������4� ���e��S����� O��8�e ������ �$ ��d���m����5z���^����������� Q����2�Qs�X �2���'2���Q�� l��������	���� �v���k��7 ��^�U���Q�u��������8�N �����0���� �B����. ����s����@' Q � �| ��O4 �������e���(���n; ��<~� ���.��L�����s���A!�c�_���D ����X ������Y�'�1�q����	
+�?�a����c�6��+�O�������a_��������1�����/E�n������j&�����U���h�����	Q�����G�����"* +�r -	���	�0����M���L�6�������b�3�������o)����4����	���Q|�)����J��?����� ��������D����s�� �����(���>���������� V/I���������k�� wn������M�2���[ � ��2�D���1��;�r K A h�+��C�3� �����y������4y����y������� �o�������$���1�}��> ��P�X�e ���c�&%���^ ��IC�����
+��U��+B�L�� 4�U,�c�X��i��M������<����?���V���i�����+1�X �k ��B�T�����X���7
+:����@N�. ��������<����OP���Q ��hQ��� �� �����n���Z
+�������{�����<���yX �� l������}�������3����u ������� ��� ���v��� ���������	��  � � ��[�s�y�*�H ������
+{�� ��� ���������������� ������J���z��)�� 0� E��be�-�M�\�f~,�X�����~�S� �h�Y���� ����4� 4�p�+�	�q  ��L�a��b�y(l�c�0�����1�4 k��/���~���	����� w5�5�e�����P^����7���w� ��A ���^%B�R�6  ��i���%��T��(����?�Z��H ��S�;�� ^T�K��X ����4 I�| K ��}%�| <����R� N�����[ ������� K ��c�s����D "��������� �����y�.�Qj��. l2�� ������ 6c�2�0h ��� ��� &A ��� t* d������8&� z��� ��������^ �?�!���l�� y��V�JQ 1�J�[����iB���R���[ ���������� ��_�R������� O���A ��v��H ���� H �O�� e �5�����v���+�����1 %�����Q B�o���. ��+�� ����
+ ��2�E�   �������� �����  ����u s�������������  ��  ������ ����� ��}�� � ����� L��������#��[�^ � }���H ��* 7 ���  ��e � ����� D  �� � (� D ����� ��?�� > �7 � 2���� e 8���� ��l�* Rl���8x �; � c���� ����� ��  ��h �� !   ����x ! �� � �����  L�. ��Y�� � ����  ����E��/� ?���"H 5�; 1 4  ���� � ����o b ����K ����� ����� %V��� � ?���� ����� ������K ��}�  ���� ������U ����� U ����� ��/� | ��Y�b  Y� D ����
+  ����������i� ����
+ ��l���' ������1 ����! ���� ��������  ������[ ��}�
+ ; ����
+ Y�   ������
+ ������p��� }�}�  ��v�������������������������i�����s�����������                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ��������  ������  ����  ��������������������������������������������  ��v� ���� ��s��� ����
+ ���������������������������������������������������������������������������������������������������������������������������� ����  ��
+  ���� ������ ����������������  
+      
+     
+  
+   
+ 
+ 
+   
+ 
+ 
+   
+    ����  ��  ����   ��                '     	     ����  ������ �������� ���� ���� ������	 ���� " z��� �������������������������������������� ���� ������������������������������ ���� 9 �������� ����   ���� ��������_�����A�������m������������������������������~�����f���l��������n�����                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ��^�u���������������������������������������8 ��������������n���1 ��d�  ����������������������������  �������� ����  
+   ������������������������������������ $ ����   ������  ����  ���� ' ��   �������������������������������� ��
+ 1 1      ������������������������������  ��  ����
+ ������ ����
+ ' ����! 8   + 8 
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/powershell/goto/gt_reloader.ahk
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/powershell/goto/gt_reloader.ahk	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/powershell/goto/gt_reloader.ahk	(revision )
@@ -0,0 +1,1 @@
+WinActivate CCRT Reloader
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/public_html/txt.txt
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/public_html/txt.txt	(revision )
+++ mp/SpeakerJava2/SpeakServer/public_html/txt.txt	(revision )
@@ -0,0 +1,1 @@
+what is this?
\ No newline at end of file
Index: mp/SpeakerJava2/SpeakServer/ssh.js
IDEA additional info:
Subsystem: com.intellij.openapi.diff.impl.patch.CharsetEP
<+>UTF-8
===================================================================
--- mp/SpeakerJava2/SpeakServer/ssh.js	(revision )
+++ mp/SpeakerJava2/SpeakServer/ssh.js	(revision )
@@ -0,0 +1,44 @@
+/**
+ * Created by user on 4/2/16.
+ */
+var SSH = require('simple-ssh');
+
+var ssh = new SSH({
+    host: 'localhost',
+    user: 'user',
+    agent: process.env.SSH_AUTH_SOCK,
+    agentForward: true
+});
+
+ssh.exec('echo $PATH', {
+    out: function(stdout) {
+        console.log(stdout);
+    }
+}).start();
+
+/*** Using the `args` options instead ***/
+ssh.exec('shipit', {
+    args: ['$PATH'],
+    pty: true,
+    out: function(stdout) {
+        console.log(stdout);
+    },
+    err: function(stderr) {
+        console.log(stderr); // this-does-not-exist: command not found
+    }
+}).start();
+/*** Using the `args` options instead ***/
+ssh.exec('su -c whoami root', {
+    pty: true,
+    out: function(stdout) {
+        console.log(stdout);
+    },
+    err: function(stderr) {
+        console.log(stderr); // this-does-not-exist: command not found
+    }
+}).start();
+ssh.on('error', function(err) {
+    console.log('Oops, something went wrong.');
+    console.error(err);
+    ssh.end();
+});
\ No newline at end of file
