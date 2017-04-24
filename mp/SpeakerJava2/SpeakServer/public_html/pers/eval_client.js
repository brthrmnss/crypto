/**
 * Created by user on 8/15/15.
 */


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
}



var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};



//http://localhost:5557/index.html?rec=true&file=a.txt
function Utilx() {
    var p = this;
    var self = this;

    p.start = function () {
        self.file = getUrlParameter('file')
        if ( self.file != null ) {
            $.ajax({
                url: '/getFile',
                data: {file:self.file},
                success: function (data) {
                    //$(".result").html(data);
                    //alert("Load was performed.");
                },
                //dataType: dataType
            });
        }
    }
}




var utils = new Utilx()
utils.start();
//console.log('....', getUrlParameter('rec'))

console.log('ready')
window.nospeaker = true
window.initializedAddOnApps = true
var socket = io('http://localhost:5600');
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg){
    if (msg.indexOf('eval-')==0) {
        msg = msg.replace('eval-', '')
        eval(msg);
    }
    console.log('chat')
    $('#messages').append($('<li>').text(msg));
    h.scrollToBottom();
});


socket.on('runcmd', function(msg){
    console.log('run command', msg)
    if (msg.eval != null) {
        console.log('running', msg.eval)
        var result = eval(msg.eval);
        setTimeout(function cmdDone() {
            $.ajax({
                url: '/next',
                data: {result:result},
                success: function (data) {
                },
            });
        }, 250 )
    }
    $('#messages').append($('<li>').text(msg));

});

var h = {};
h.scrollToBottom = function scrollToBottom(){
    //$("body").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 200);
    $("#flexmsg_box").clearQueue();
    $("#flexmsg_box").stop(true, true);
    $("#flexmsg_box").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 10);
}

$('#btnTestClick').click(function(){
    alert('alert')
    /*
     eval-$('#btnTestClick').click();
     eval-$('#messages').append($('<li>').text('test messaging to me')); $('#btnSend').click();
     */
    return false;
});


$('#btnSay').click(function(){
    var cmd = {};
    cmd.cmd='say'
    cmd.args = ['snark snark snark .... what is this? ']
    socket.emit('cmd', cmd);
    return false;
});



$('#btnClear').click(function(){
    //$('#messages').clear();
    $('#messages').empty();
});

socket.on('cmdout', function(msg){
    if (msg.indexOf('eval-')==0) {
        msg = msg.replace('eval-', '')
        eval(msg);
    }
    console.log('chat')
    //var objDiv = document.getElementById("messages");
    //objDiv.scrollTop = objDiv.scrollHeight;
    msg  = msg.replace(/\n/g, "<br />");
    $('#messages').append($('<li>').html(msg));
    h.scrollToBottom();
});

var dir = {}; //why: stores dirs
dir.RITV = 'RITV'
dir.SEED= 'SEED'

var dictActions = {};

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        // <DO YOUR WORK HERE>
        window.clickBtn('Stop Cmd')
    }
    if (e.keyCode == 46) { // escape key maps to keycode `46`
        // <DO YOUR WORK HERE>
        window.clickBtn_str('Clear')
    }

});

//checkForExistingFileOnMegaAcct_stop_gen_report
h.createButtons = function createButtons() {
    var calls = [
        'br','br',
        {'Daily': 'evernote', t:'read daily log',
            data:
                "evernote:///view/1269954/s11/e8181a13-9270-4b2a-9057-79cc2f338d3b/e8181a13-9270-4b2a-9057-79cc2f338d3b/"
            ,
            cmd:'shipit ENV install.electrum'},

        {'Speak Daily v2': 'speakevernote', t:'read daily log',
            //  type:'speakevernote',
            cmd:'speakevernote',
            data:
                "evernote:///view/1269954/s11/e8181a13-9270-4b2a-9057-79cc2f338d3b/e8181a13-9270-4b2a-9057-79cc2f338d3b/"
            ,
            dir:dir.RITV},
        'br',
        'br',
        'sp',
        {'mp': 'evernotesearch', t:'read daily log',
            cmd:'evernotesearch',
            data:
                "intitle:mp:"
            , },
        {'list': 'evernotesearch', t:'read daily log',
            cmd:'evernotesearch',
            data:
                "intitle:list"
            , },
        {'software idea': 'evernotesearch', t:'read daily log',
            cmd:'evernotesearch',
            data:
                "softwareidea:"
            , },
        {'today': 'evernotesearch', t:'read daily log',
            cmd:'evernotesearch',
            data:
                '\"tag:log created:day-1\"'
        },
        {'clear': 'evernotesearch', t:'clear all notes',
            cmd:'evernotesearch',
            data:
                "*"
            ,
            dir:dir.RITV},

        'br', 'br', 'sp',

        {'bookstoread': 'evernotesearch', t:'read daily log',
            cmd:'evernotesearch',
            data:
                "intitle:bookstoread"
            , },

        {'booknotes': 'evernotesearch', t:'read daily log',
            cmd:'evernotesearch',
            data:
                "intitle:booknotes"
            , },
        {'soundbites': 'evernotesearch', t:'read daily log',
            cmd:'evernotesearch',
            data:
                "intitle:sb:"
            , },
        {'tbl': 'evernotesearch', t:'read daily log',
            cmd:'evernotesearch',
            data:
                "intitle:troubleshooting:"
            , },
        {'sdr': 'evernotesearch', t:'... ... ... ...',
            cmd:'url',
            data:
                "file:///C:/Users/user1/Dropbox/projects/delegation/autocomplete/soundbiter/index.html?file=x.txt&autoMode=true"
            , },
        {'textarea': 'evernote', t:'...',
            cmd:'evernote',
            data:
                "http://localhost:63342/crypto/browser-eval/public_html/apps/speak/textarea.html?_ijt=ssmt43187tmek7mlh5oe5s2k7q"
        }




        //showNotes /q  "intitle:"$W$"
    ]


    $.each(calls, function (i, k) {
        var isString =  $.type(k) === "string"
        if (k == 'br') {
            $('#buttonsBar').append('<br />')
        }
        else if (k == 'sp') {
            $('#buttonsBar').append('<div style="width:50px; display:inline-block;" />')
        }

        else if ( isString && k.indexOf('-') == 0 ) {
            var divider = $('<div style="width:60px; display:inline-block;" />');
            k = k.slice(1)
            divider.html(k)
            $('#buttonsBar').append(divider)
        }


        else if ($.isPlainObject(k)) {
            var key, val = null;

            if (k.v == false || k.visible == false ) {
                return;
            }

            if (k.type != null ) {
                var stg = k.settings;
                if ( stg == null ) stg = {};
                var input = null;
                if (k.type == 'checkbox') {
                    var checkbox = $('<input/>');
                    checkbox.attr('type', 'checkbox');
                    input = checkbox;
                    // btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
                    if ( stg.value ) {
                        checkbox.val(stg.value)

                        input.attr('checked', true)

                    }
                    $('#buttonsBar').append(checkbox)
                }
                if (k.type == 'input') {
                    var input = $('<input/>');
                    // btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
                    $('#buttonsBar').append(input)
                    if ( stg.value ) {
                        input.val(stg.value)
                    }
                }
                if (k.type == 'select') {
                    var select = $('<select/>');
                    input = select;
                    if (stg) {
                        if ( stg.options_jquery ) {
                            select.html( $(k.settings.options_jquery).clone().children()  )
                        }
                        if ( stg.value ) {
                            select.val(stg.value)
                        }
                    }
                    // btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
                    $('#buttonsBar').append(select)
                }
                input.attr('id', k.id)
                return;
            }

            $.each(k, function (k, v) {
                key = k
                val = v;
                return false;
            })

            var btn = $('<button />')
            key = key.replace(/_/gi, ' ');
            btn.html(key)
            if (k.tooltip) {
                btn.attr('title', k.tooltip)
            }
            if (k.t) {
                btn.attr('title', k.t)
            }
            if (k.e == false ) {
                btn.attr('disabled', '')
            }
            var json = JSON.stringify(k);
            btn.attr('onclick', 'clickBtn("' + val + '", '+json+')')
            $('#buttonsBar').append(btn)
            dictActions[key] = k
        }


        else if ( isString) {
            var btn = $('<button />')
            btn.html(k)
            btn.attr('onclick', 'clickBtn_str("' + k + '")')
            $('#buttonsBar').append(btn)
        } else {
            $('#buttonsBar').append('<div style="width:5px; display:inline-block;" />')
        }



        dictActions[k] = val

        $('#buttonsBar').append('&nbsp;')
    })

    console.log('item', dictActions)
    $('#buttonsBar').append('<br />')
    $('#buttonsBar').append('<br />')
}

h.createButtons();

h.replaceEnvInCmd = function ( cmd ) {
    if ( cmd == null ) return cmd;
    if (cmd != null ) {
        var env = $('#selectEnv').val()
        var ip = window.options2[env];
        cmd = cmd.replace('ENVIP', ip);
        cmd = cmd.replace('ENV', env);

    };

    return cmd;
}

window.clickBtn = function clickBtn(x, actionInfo) {
    if (x.indexOf('.')!= -1 && x.indexOf(' ') == -1 ) {
        window.clickBtn_str(x, actionInfo)
        return;
    }
    var ip = $('#selectEnv').val()
    x = x.replace('env', ip)
    console.log(x)

    var cmd = {};
    if ( actionInfo ) {
        cmd = actionInfo
    }
    cmd.cmd = 'node'
    cmd.args =  [/*__dirname+'/'+ */'public_html/'+'testscript.js', x]
    cmd.cmd = 'shipit'
    cmd.cmd = x;
    cmd.args = x.split( ' ')
    cmd.type = 'shipit'

    /*if ( actionInfo.cmd != null ) {
     cmd = actionInfo;
     cmd.cmd = actionInfo.type;
     }
     */
    socket.emit('cmd', cmd);
    return false;
}

window.clickBtn_str = function clickBtn_str(x, actionInfo) {
    var ip = $('#selectEnv').val()
    x = x.toLowerCase();
    if (x == 'clear') {
        $('#messages').empty();
        return;
    }
    if (x == 'dashboard') {
        var url = 'http://' + location.hostname + ':33031' + '/' + 'tests.html';
        //debugger;
        window.open(url, '_blank');
        return;
    }
    if (x == 'phpmyadmin.url') {
        var url = 'http://' + location.hostname + '' + '/' + 'phpmyadmin';
        //debugger;
        window.open(url, '_blank');
        return;
    }

    if ( x == 'open.terminal') {
        //debugger;
        //var src = '';
        var cmd = {};
        cmd.cmd = '';
        //debugger;
        if( actionInfo && actionInfo.dir )
            cmd.dir = actionInfo.dir;
        if( actionInfo && actionInfo.cmd )
            cmd.cmd = actionInfo.cmd;

        cmd.cmd = h.replaceEnvInCmd(cmd.cmd)

        h.runInTerminal(cmd )
    }

    if ( x == 'open.bash') {
        var cmd = {};
        if ( actionInfo) {
            cmd = actionInfo
        }
        cmd.type = 'open.bash'
        cmd.cmd = h.replaceEnvInCmd(cmd.cmd)
        h.hop3(cmd );
    }

    if (x == 'clear') {
        $('#messages').empty();
        return;
    }
    if (x == 'long') {
        h.hop()
        return;
    }
    var src = '';
    var imdbapp = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
    var jsonconfig = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
    var override = {}
    if ( x == 'dl.imdb.list.get.catalog') {
        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/wrappers/mega2list_wrapper.js'
        h.hop2(src, null)
    }

    function parsePB() {
        var pb = {}
        pb.query = $('#oneoff_query').val()
        pb.queryEscaped = escape(pb.query);
        pb.cat = $('#oneoff_cat').val()
        return pb;
    }
    var pb = parsePB();
    if ( x == 'dl.oneoff') {
        var overerrideJSON = {}
        overerrideJSON.innerSettingsMixin = {};
        overerrideJSON.innerSettingsMixin.pbCategory = $('#oneoff_cat').val()//+'4444';
        overerrideJSON.innerSettingsMixin.pbCategory2 = 7777
        overerrideJSON.innerSettingsMixin.bailBeforeDownload = $('#oneoff_download').val();

        overerrideJSON.breed = {}
        overerrideJSON.breed.query = $('#oneoff_query').val();

        overerrideJSON.breed.query = escape(overerrideJSON.breed.query   )
        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/wrappers/query2mega_wrapper.js'
        h.hop2(src, 'ritv', overerrideJSON)
    }
    if ( x == 'url.pb') {
        var url = 'https://thepiratebay.se/search/' + pb.queryEscaped + '/0/99/' + pb.cat
        h.url(url)
    }


    if ( x == 'listInventory.%'.toLowerCase() ) {
        src = imdbapp;
        var overerrideJSON = {}
        //overerrideJSON.innerSettingsMixin = {};
        //overerrideJSON.innerSettingsMixin.checkForExistingFileOnMegaAcct_stop_gen_report = true;
        overerrideJSON.imdb_app = {};
        overerrideJSON.imdb_app.breedConfigOverrides = {}
        overerrideJSON.imdb_app.breedConfigOverrides.innerSettingsMixin = {}
        overerrideJSON.imdb_app.breedConfigOverrides.innerSettingsMixin
            .checkForExistingFileOnMegaAcct_stop_gen_report = true;
        //overerrideJSON.zzzzzz = '66666666666666666666666'
        overerrideJSON = overerrideJSON;
        var overrideJSON = {};
        overrideJSON= overerrideJSON;
        h.hop2(src, 'ritv', overrideJSON);
    }
    if ( x == 'dl.imdb.list.locally') {
        src = imdbapp;
        var overrideJSON = {}
        overrideJSON.imdb_app = {};
        overrideJSON.imdb_app.breed = false; //do not breed, no next step
        //set year 'n' such
        h.hop2(src, 'ritv', overrideJSON)
    }
    if ( x == 'dl.imdb.remote.dl') {
        //copy utils ... 1run remote
        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
        h.hop2(src, 'ritv')
    }
    if ( x == 'dl.imdb.remote.dl.lite') {
        //copy utils ... run remote
        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
        h.hop2(src, 'ritv')
    }
    if ( x == 'dl.imdb.remote.dl.lite') {
        //copy utils ... run remote
        src = '/media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/imdb_dl_app.js'
        h.hop2(src, 'ritv')
    }
    function makeShipitCmd(env, cmd ) {
        return ' '+ env + ' ' + cmd;
    }
    if ( x == 'dl.imdb.remote.copy.config') {

        var cmd = {};
        if ( actionInfo) {
            cmd = actionInfo
        }
        if ( cmd.cmds ) {
            var overrideJSONcmd = src_override + ' ' + 'ENV' + ' ' + dictJSON;
            cmd.cmds.shift(cmd)
            cmd.cmd = cmd.cmds.join("\n");
        }
        cmd.type = 'open.bash';
        cmd.cmd = h.replaceEnvInCmd(cmd.cmd)
        h.hop3(cmd );
        h.hop3(cmd);
    }
    if ( x == 'dl.imdb.remote.dl.lite') {
        src = ' w.imdb2mega'

        var ip = $('#selectEnv').val()
        //x = x.replace('env', ip)
        //console.log(x)
        src = makeShipitCmd(ip, src);
        h.hop2(src, 'shipit_breed')
    }

    if ( x == 'dl.imdb.remote.dl.lite.terminal') {
        src = ' w.imdb2mega'

        var env = $('#selectEnv').val()
        var ip = window.options2[env];

        var cmds = [
            'ssh ' + ip,
            'tmux -a',
            'cd asdf'
        ]
        cmds = cmds.join("\n");
        //x = x.replace('env', ip)
        //console.log(x)
        src = makeShipitCmd(ip, src);
        h.hop2(cmds, 'terminal2')
    }

    return;
}

h.hop = function hop(d) {
    var cmd = {};
    cmd.cmd = 'node'
    cmd.args =  [/*__dirname+'/'+ */'public_html/'+'testscript.js', d]
    socket.emit('cmd', cmd);
    return false;
}

h.hop2 = function hop2(_script, type, overerrideJSON) {
    ///media/psf/Dropbox/projects/crypto/ritv/imdb_movie_scraper/wrappers/mega2list_wrapper.js
    var cmd = {};
    cmd.cmd = 'node'
    cmd.type = type;
    cmd.overrideJSON = JSON.stringify(overerrideJSON)
    cmd.args =  [_script]
    socket.emit('cmd', cmd);
    return false;
}

h.hop3 = function runRawCmd(cmd) {
    socket.emit('cmd', cmd);
    return false;
}
h.runInTerminal = function runInTerminal(cmdStr) {
    if ( $.isPlainObject(cmdStr)  ){
        var cmd = cmdStr;
    } else {
        var cmd = {};
        cmd.cmd = cmdStr;
    };
    cmd.type = 'terminal3'
    socket.emit('cmd', cmd);
    return false;
}
h.url = function launchURL(url) {
    window.open(url, '_blank');
}

function ddList() {
    $('#selectEnv').append(new Option('staging', 'staging'));
    $('#selectEnv').append(new Option('seed2', 'seed2'));
    $('#selectEnv').append(new Option('seed3', 'seed3'));
    $('#selectEnv').append(new Option('seed4', 'seed4'));
    window.options = [
        {name:'staging', ip:'127.0.0.1'},
        {name:'seed2', ip:'5.79.75.96'},
        {name:'seed3', ip:'83.149.125.68'},
        {name:'seed4', ip:'37.48.93.30'}
    ]
    window.options2 = {
        'staging':'127.0.0.1',
        'seed2':'5.79.75.96',
        'seed3':'83.149.125.68',
        'seed4':'37.48.93.30'

    }
    /* return;
     {'staging', '127.0.0.1'));
     $('#selectEnv').append(new Option('seed2', '5.79.75.96'));
     $('#selectEnv').append(new Option('seed3', '83.149.125.68'));
     }
     return;
     $('#selectEnv').append(new Option('staging', '127.0.0.1'));
     $('#selectEnv').append(new Option('seed2', '5.79.75.96'));
     $('#selectEnv').append(new Option('seed3', '83.149.125.68'));*/
}

ddList();