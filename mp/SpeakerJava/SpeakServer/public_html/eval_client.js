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
//var socket = io('http://localhost:5600');
var socket = io( );
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
/*
$('#audioThing')[0].addEventListener("ended",function() {
    var src =  $('#audioThing').attr('src');
    socket.emit('audioEnded', src);
});*/
$('#audioThing')[0].onended = function onEnd() {
    var src =  $('#audioThing').attr('src');
    socket.emit('audioEnded', src);
};


socket.on('play', function(msg){
    console.log('play', msg)
    $('#messages').append($('<li>').text(msg));
    h.scrollToBottom();

    var myAudio= $('#audioThing')[0];
    $('#audioThing')[0].pause();
    $('#audioThing').attr('src', msg.url)
    myAudio.playbackRate = 1.6;
    $('#audioThing')[0].play();
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
        'Test', 'Say', 'Long',
        'sp',
        {List: 'shipit env list'},
        'Get All', 'Clear',
         {flush: 'open.bash', t:'Open Terminal Window', dir:dir.RITV, cmd:'shipit ENV db.admin.flush.hosts'},

        'br',
        'br',
        {"Stop Cmd": 'echo'},
        'br',
        'br',
        {bounce: 'shipit env app.restart'},
        {bounce_debug: 'shipit env app.start.debug'},
        {redeploy: 'shipit env app.deploy'},
        'sp',
        {"Box Status": 'shipit env server.status'},
        'sp',
        {Stop: 'shipit env app.stop'},
        {Start: 'shipit env app.start'},
        'sp',
        {backup: 'shipit env db.backup'},
        'br',
        '-1 Time',
        {'Copy Id':'open.bash', t:'Copy ssdh id to machine', dir:dir.SEED, cmd:'ssh-copy-id root@ENVIP'},
        {'Install Electrum': 'open.bash', t:'Open Terminal Window',
            dir:dir.RITV, cmd:'shipit ENV install.electrum'},
        {'Install All': 'open.bash', t:'Open Terminal Window',
            dir:dir.RITV, cmd:'shipit ENV z.server.install'},
        'br',
        "-Box",

        "dashboard",
        {DB: 'phpmyadmin.url'},
        'sp',
        {Terminal_R: 'open.terminal', t:'Open Terminal Window, from shipit ritv dir', dir:dir.RITV},
        {Terminal_Seed: 'open.terminal', t:'Open Terminal Window, from shipit seed dir (run seedcommands)', dir:dir.SEED},
        {'ssh':'open.terminal', t:'show tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP '},
        'sp',
        {Import_Video: 'shipit env video.import2'},
        'sp',
        'br',
        'br',
        '-DL General',
        {'Get Inventory': 'dl.imdb.list.get.catalog', tooltip:'Get all content downloaded'},
        {'Show Inventory': 'open.bash',   t:'open dir where file lists are stored', dir:dir.RITV, cmd:'pcmanfm /media/psf/Dropbox/projects/crypto/ritv/distillerv3/megals'},
        {List_Actions: 'open.bash', t:'Open Terminal Window', dir:dir.SEED, cmd:'shipit ENV list'},
'sp',
        {'Copy Cfg': 'open.bash', t:'Copy config to parent folder ',
            dir:dir.SEED, cmd:'shipit ENV copy.config.2.remote'},

        {'List dl\'d files': 'open.bash', t:'List all downloaded files ',
            dir:dir.SEED, cmd:'shipit ENV dl.file.list'},
        {'List dl log': 'open.bash', t:'Download log ',
            dir:dir.SEED, cmd:'shipit ENV dl.dl.log'},
        'sp',
        'br',
        '-DL Seed',
        {'deploy seedbox': 'open.bash', t:'app.deploy on seedbox breed tools',
            dir:dir.SEED, cmd:'shipit ENV app.deploy'},
        {'deploy seedbox lite': 'open.bash', t:'app.deploy on seedbox breed tools skip shelpers and modules',
            dir:dir.SEED, cmd:'shipit ENV app.deploy.lite'},
        {'Mega2Box': 'open.bash', t:'Open download seedbox content to server', dir:dir.SEED, cmd:'shipit ENV w.mega2seed'},
        'sp',
        {'List dl\'d files X': 'open.bash', t:'List all downloaded files ',
            dir:dir.SEEDgg, cmd:'shipit ENV dl.file.list'},
        'sp',
        //general get inventory
        //imdb app run, refresh list
        //app groups top tv shows, top movies
        //one off - [Dl Once - set query and category and x and run]

        'br',
        '-IMDB',

        {'%': 'listInventory.%', tooltip:'What percentage of file downloaded? ... how many files dl?-->output file:'},
        'sp',
        {'Update IMDB Manifest': 'dl.imdb.list.locally', t:'Get content list locally'},
        {'redeploy': 'dl.imdb.redeploy', t:'copy dl list to seed. have to redeploy if updated manifest'},
        {'Copy Config': 'dl.imdb.remote.copy.config',
            cmds:'shipit ENV copy.config.2.remote',
            t:'copy config using cmd '},

        {DL_Terminal_R: 'open.terminal', t:'Open Terminal Window', dir:dir.SEED, cmd:'echo yy; echo uu; ssh root@ENVIP '},
        // {DL_Terminal_R: 'open.terminal', t:'Open Terminal Window', dir:dir.SEED, cmd:'echo yy; echo uu; ssh root@5.79.75.96 "echo iiii"'},
        //{'Dl Terminal': 'dl.imdb.remote.dl.lite.terminal', t:'update remote config, push local lists, dl using shipit'},
        {DL_Shipit: 'open.bash', t:'Open Terminal Window', dir:dir.SEED, cmd:'shipit ENV w.imdb2mega '},
//tmux -attach
//cd /opt/nodejs/breedv2/imdb_movie_scraper/wrappers/; sudo node imdb_dl_wrapper.js
        //solution ... go into ssh, go into tmux, cancel current action, start with this command on command lin e
//how ot leave tmux ctrl+b d
        //{'Dl Test': 'dl.imdb.remote.dl.lite', why:'see command to run, verify no code errors', t:'update remote config, push local lists, dl using shipit'},
        'br',
        '-Tmux',
        {'Dl tmux': 'dl.imdb.remote.dl', visible:false, why:'use tmux, safe in all cases',
            e:false, t:'update remote config, push local lists, dl using tmux (ful automation)'},
        {'MonitorToLog': 'dl.imdb.remote.dl', why:'check that tmux is still running, connnect and voyuer', e:false, t:'update remote config, push local lists, dl using tmux (ful automation)'},
        {'Copy Cfg': 'dl.imdb.remote.copy.config',
            why:'update config using overrides, [how to do this locally] rstart tmux',
            e:false,
            t:'update remote config, push local lists, dl using tmux (ful automation)',
            cmds:[
                '',
                'shipit ENV copy.config.2.remote'

            ]},
        {'All tmux': 'dl.imdb.remote.dl', why:'update config using overrides, [how to do this locally] rstart tmux', e:false, t:'update remote config, push local lists, dl using tmux (ful automation)'},
        {'Tm-Start':'open.bash', t:'start tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP "tmux send-keys C-c C-m cd SPACE /opt/nodejs/breedv2/imdb_movie_scraper/wrappers/ C-m sudo SPACE node SPACE imdb_dl_wrapper.js C-m "'},
        {'Tm-Stop':'open.bash', t:'stop tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP "tmux send-keys C-c C-m C-m "'},
        {'Tm-View':'open.terminal',v:false, t:'show tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP -t tmux attach '},
        {'View':'open.bash', t:'show tmux remotely', dir:dir.SEED, cmd:'ssh root@ENVIP -tt tmux a '},

        'br',
        ///media/psf/Dropbox/projects/crypto/ritv/distillerv3/megals
        '-Sets',
        {TopMovies: 'imdb.adjust.config', settings:
        {
            type:'movies',
            howMany:1000,
            url: "http://www.imdb.com/search/title?at=0&release_date=1994,2017&sort=moviemeter,asc&title_type=tv_series",
            year:null,
            yearEnd:null
        }
        },
        {TopShows: 'imdb.adjust.config', settings:
        {
            type:'tv',
            url:"http://www.imdb.com/search/title?at=0&release_date=1994,2017&sort=num_votes,desc&title_type=tv_series",
            howMany:200,
            year:null,
            yearEnd:null
        }
        },
        'br',
        '-One off',
        {name: 'Query', type:'input', id:'oneoff_query', settings:{value:'sia mp3x'}   },
        {name: 'Category', type:'select', id:'oneoff_cat', settings:{
            options:[ ],
            options_jquery:"#category",
            value:101  }
        },
        {name: 'Category 2', type:'select', id:'oneoff_cat2', settings:{options_jquery:"#category",}   },
        {name: 'download content?', type:'checkbox', id:'oneoff_download',
            tooltip: 'Download locally or remotely only', settings:{value:true}   },
        {download: 'dl.oneoff', settings:{}   },

        {pb: 'url.pb', settings:{}   },
            /*
        'br',
        'br',
        '-1|Dl List',
        {name: 'Query', type:'input', id:'oneoff_query', settings:{value:'sia mp3x'}   },
        {name: 'Category', type:'select', id:'oneoff_cat', settings:{
            options:["tv"
            ],
            options_jquery:"#category",
            value:101  }
        },
        'br',
        '-2|Filter',
        {download: 'dl.pb', settings:{}   },
        'br',
        '-3|Download',
        {download: 'dl.pb', settings:{}   },
        'br',
        '-4|Verify',
        {download: 'dl.pb', settings:{}   },
        {upload: 'dl.pb', settings:{}   },

*/
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
        debugger
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
    cmd.cmd = 'node'
    cmd.args =  [/*__dirname+'/'+ */'public_html/'+'testscript.js', x]
    cmd.cmd = 'shipit'
    cmd.cmd = x;
    cmd.args = x.split( ' ')
    cmd.type = 'shipit'
    socket.emit('cmd', cmd);
    $('#messages').empty(); //TODO: not always clear
    return false;
}

window.clickBtn_str = function clickBtn_str(x, actionInfo) {
    $('#messages').empty(); //TODO: not always clear
    var env = $('#selectEnv').val()
    var ip = window.options2[env];
    if ( ip == 'localhost' || ip == '127.0.0.1' ) {
        //why: b/c run code form this machine
        ip = location.hostname;
    }
    x = x.toLowerCase();
    //debugger;
    if (x == 'clear') {
        $('#messages').empty();
        return;
    }
    if (x == 'dashboard') {
        var url = 'http://' + ip + ':33031' + '/' + 'tests.html';
        //debugger;
        window.open(url, '_blank');
        return;
    }
    if (x == 'phpmyadmin.url') {
        var url = 'http://' + ip + '' + '/' + 'phpmyadmin';
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
   // $('#selectEnv').append(new Option('seed3', 'seed3'));
    //$('#selectEnv').append(new Option('staging', 'staging'));
    //$('#selectEnv').append(new Option('seed2', 'seed2'));
   // $('#selectEnv').append(new Option('seed4', 'seed4'));


    var machines = [
        {name:'seed3', ip:'37.48.94.161'},
        {name:'staging', ip:'127.0.0.1'},
        {name:'seed2', ip:'5.79.75.96'},
    ]

    window.options2 = {};
    window.options = [];

    function appendOption(srv, ipAdd) {
        $('#selectEnv').append(new Option(srv, srv));
        window.options.push(
            {name:srv, ip:ipAdd}
        );
        window.options2[srv]=ipAdd;
    }

    $.each(machines, function convertToWindow2(k,v){
        //opt2[v.name] = opt2[v.ip]
       // $('#selectEnv').append(new Option(v.name, v.name));
        appendOption(v.name, v.ip)
    })


    //debugger;

    return;
    window.options = [
        {name:'seed3', ip:'37.48.94.161'},
        {name:'staging', ip:'127.0.0.1'},
        {name:'seed2', ip:'5.79.75.96'},
        //  {name:'seed3', ip:'83.149.125.68'},
        // {name:'seed4', ip:'37.48.93.30'}
    ]
    /*window.options2 = {
        'staging':'127.0.0.1',
        'seed2':'5.79.75.96',
       // 'seed3':'83.149.125.68',
       // 'seed4':'37.48.93.30',
    }

    */
    var opt2  = {}
    $.each(window.options, function convertToWindow2(k,v){
        opt2[v.name] = opt2[v.ip]
        $('#selectEnv').append(new Option(v.name, v.name));
        debugger;
    })

    debugger;





    appendOption('testsrv', '192.168.0.16');

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