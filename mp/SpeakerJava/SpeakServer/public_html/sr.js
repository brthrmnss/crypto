/**
 * Created by morriste on 12/19/2016.
 */

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
        self.history.addHistory(actionName);
        if ( actionName.endsWith('*') ) {
            console.info('action * found ...', 'ignoring');
            self.utils.asdf()
            return;
        }

        console.info(actionName, JSON.stringify(action));


        if ( self.utils.openWindow(action.cmd) ) {
            return;
        }
        if ( self.utils.actions.showText(action.cmd, action)) {

            return;
        }


        uiUtils.utils.getR('doAction',
            {actionName:actionName},
            function onPerformedAction(data){
                console.log('performed action')
                self.utils.reset();
            })
    }


    p.onPrev = function onPrev(){
        self.data.currentIndex++
        if (  self.data.currentIndex >= self.data.history.length  ) {
            self.data.currentIndex = 0;
        }

        var item = self.data.history[self.data.currentIndex];


        console.log('onPrev',  self.data.currentIndex, item, self.data.history.length)


        if ( item ) {
            return item;
        }
    }
    p.onPrev_Next = function onPrev_Next(){
        self.data.currentIndex--
        if (  self.data.currentIndex < 0  ) {
            self.data.currentIndex =  self.data.history.length-1;
        }
        var item = self.data.history[self.data.currentIndex];

        console.log('onPrev_Next',  self.data.currentIndex, item, self.data.history.length)


        if ( item ) {
            return item;
        }
    }

    p.onEnterAction = function onEnterAction(actionName){

        //self.history.addHistory();

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

        self.history.addHistory(actionName);

        function qq(text) {
            return "\"" + text + "\""
        }

        //var override =
        //var cmdOverride = action.cmd.replace('%W%', qq(input.rest) )
        var cmdOverride = action.cmd.replace('%W%', (input.rest) )

        console.info(actionName, JSON.stringify(action))



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
            self.data.currentIndex = 0;
        }
        p.history.addHistory = function addHistory(val) {
            //var val = self.data.ui.val('')
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
                if ( v.cmd == null ) {
                    console.info('skip line', v)
                    return;
                }
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

        function defineCMD() {
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

            p.utils.actions = {};
            p.actions = p.utils.actions;
            p.utils.actions.showText = function showText(cmdOverride, action) {
                if ( cmdOverride.startsWith('$')) {
                    if ( self.settings.dbg.actions ) {
                        console.info('running show text commadn',
                            cmdOverride, action)
                    }
                    var cmd = action.cmd.slice(1);
                    $('#txtAnswer').text(cmd);

                    var speak = {};

                    var speakCmd = action.name.replace('problem:', '');

                    var speakText =[ 'problem... ',speakCmd,
                        '... ',
                        'answer ...',
                        cmd]

                    speakText = speakText.join(' ')
                    console.log('speakText', speakText)
                    window.quickSpeaker.speak(speakText)

                    setTimeout(function clearText() {
                        $('#txtAnswer').text("");
                    }, 8000)

                    return true;
                }
                return; //can't open proper window, use remove
            }
        }

        defineCMD();
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
