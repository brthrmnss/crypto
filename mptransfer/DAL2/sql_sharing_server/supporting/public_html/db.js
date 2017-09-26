/**
 * Created by morriste on 8/3/16.
 */


$.isString = function isString(x) {
    return toString.call(x) === "[object String]"
}

var utils = {};
utils.getIntoDiv = function ( url , toDiv, name, fx, data) {
    $.ajax({
        url: url,
        data: data,
    })
        .fail(function( data , t, e) {
            console.error(e)
        })
        .done(function( data ) {
            if ( console && console.log ) {
                var dataStr = data;
                if ( !$.isString(data)) {
                    dataStr = JSON.stringify(data);//.toString()
                }
                console.log( "Sample of data:", dataStr.slice( 0, 100 ) );
            }

            if ( fx ) fx(data)


        });
}

utils.addBtn = function addBtn ( cfg ) { //url , toDiv, name) {
    if ( cfg.name == null )
        cfg.name = cfg.url;
    var divCfg =   $('#'+cfg.toDiv+'_cfg')
    var div =   $('#'+cfg.toDiv )
    var btn = $('<button></button>');
    btn.html(cfg.name);
    btn.click(onClickAutoGen)
    function onClickAutoGen(){
        utils.getIntoDiv(cfg.url, cfg.toDiv, '',
            function postClickAction(data){

                console.log('go results for ', cfg.url)
                try {
                    if ($.isString(data)) {
                        var dataPP = data.replace(/\n/gi, "<br />")
                        dataPP = dataPP.replace(/\t/gi, "&emsp; "+"&nbsp;"+"&nbsp;"+"&nbsp;")
                        div.html(dataPP)
                    }
                    else {
                        var dataPP = JSON.stringify(data, '<br />', '&emsp;');
                        dataPP = dataPP.replace(/\t/gi, "&emsp; "+"&nbsp;"+"&nbsp;"+"&nbsp;")

                        var pre = $('<pre></pre>')
                        pre.html(dataPP)
                        //debugger
                        div.html(pre)
                    }

                } catch ( e ) { console.error('catched', e)}

                if ( cfg.fx ) {
                    var cfg2 = {
                        url: cfg.url,
                        div: div,
                        data:data
                    };
                    cfg.fx(cfg2)
                }
                return;
            }, cfg.data)
    }
    divCfg.append(btn);

    var btn = $('<button></button>');
    btn.html('~');
    var showXHide = true;
    btn.click(function onClick(){
        showXHide = ! showXHide;
        if ( showXHide ) {
            div.removeClass('hide')
        } else {
            div.addClass('hide')
        }
    })
    divCfg.append(btn);

    var ret = {};
    ret.fx = onClickAutoGen;
    return ret
}
utils.addDBAction = function ( txt, createDiv ) {
    var div = $('<div></div>');
    div.attr('id', createDiv+'_cfg');

    $('body').append(div)
    var div = $('<div></div>');
    div.css("max-height", '200px')
    div.css("overflow", 'auto')
    div.attr('id', createDiv);
    $('body').append(div);


    /* var div = $('<div>------</div>');
     $('body').append(div);*/
}

utils.redirectTo = function redirectTo(url ) {
    console.log('....', url)
    window.location = url;
}

$( document ).ready(init)

function init() {
    utils.addDBAction('get config', 'config')
    var getConfigBtnObj = utils.addBtn(
        {
            url:'/getConfig',
            toDiv:'config',

            fx:createJumpLinks
        }
    )
    getConfigBtnObj.fx();





    function createJumpLinks(cfg){

        var json = JSON.parse(cfg.data);

        var containerJumpLinks = $('<div></div>')

        utils.dictPeersToIp = json.dictPeersToIp;
        $.each(json.dictPeersToIp, function (peerName,ip) {
            var btn = $('<button></button>');
            btn.html(peerName);
            btn.click(function onClick(){
                var url = ip+'/dashboard_dal.html'
                if ( url.indexOf('http://')==-1)
                    url = 'http://'+url
                utils.redirectTo(url )

            })
            containerJumpLinks.append(btn);
        })

        containerJumpLinks.append($("<br />"));

        cfg.div.prepend(containerJumpLinks)


        utils.newDiv = function newDeiv() {
            return  $('<div></div>');
        }
        utils.appendToDiv = function  appendToDiv(div, txt){
            var newDiv = ($('<span></span>'));
            newDiv.html(txt)
            div.append(newDiv)
        }

        utils.addBtn = function  appendToDiv(div, txt, url){
            var btn = ($('<button></button>'));
            btn.html(txt)
            div.append(btn)
            btn.click(function onClick(){
                if ($.isFunction(url)) {
                    return url();
                }
                // var url = ip+'/dashboard_dal.html'
                if ( url.indexOf('http://')==-1)
                    url = 'http://'+url
                utils.redirectTo(url )
            })
        }

        utils.addBr = function addBrToDiv(addToDiv) {
            var ui = $('<br />')
            if ( addToDiv == null ) {
                addToDiv = utils.div
            }
            addToDiv.append(ui)
        }

        utils.add = function add(ui, addToDiv){
            if ( addToDiv == null ) {
                addToDiv = utils.div
            }
            addToDiv.append(ui)
        }
        utils.form = {};
        utils.form.createTicker = function createTicker(cfg ) {//name, val, min, max) {
            var ui = $('<input type="number" />')
            ui.val(cfg.val)
            ui.attr('id', cfg.id);
            ui.css({width:'30px'})
            return ui;
        }

        utils.url = function url(cfg) {
            if ( cfg.url.indexOf('http://')==-1) {
                cfg.url = 'http://'+cfg.url
            }

            function getDataFromUrl() {
                var data = {};
                data = cfg.data;
                if ($.isFunction(cfg.data) ) {
                    data = cfg.data();
                }
                //debugger;
                $.ajax({
                    url: cfg.url,
                    data: data,
                })
                    .fail(function( data , t, e) {
                        console.error(e)
                    })
                    .done(function( data ) {
                        if ( cfg.fx ) cfg.fx(data)
                    });
            }
            return getDataFromUrl;
        }
        utils.urls = {};
        utils.urls.getValueJSON = function getValueJSON(cfg, storeAs) {
            function getJSON() {

                if ($.isString(cfg)) {
                    cfg = {storeAs:storeAs, jqueryVal:cfg}
                }

                var json = {};
                json[cfg.storeAs] = cfg.prop
                if ( cfg.fx ) {
                    json[cfg.storeAs] = cfg.fx()
                }
                if ( cfg.jqueryVal ) {
                    var ui = $(cfg.jqueryVal);
                    json[cfg.storeAs]  =  ui.val();
                }

                return json;

            }


            return getJSON;
        }


        utils.convertJSONBoolean = function convertJSONBoolean(val) {
            if ( val == 'true' ) {
                val  = true;
            }
            if ( val == 'false' )
                val = false;

            return val;
        }

        function createUpDownPath() {
            var containerJumpUpDown  = $('<div></div>')
            if ( json.subServer ) {
                utils.appendToDiv(containerJumpUpDown, 'subServer')
                utils.addBtn(containerJumpUpDown, 'p',
                    json.topServerIp+'/dashboard_dal.html')
            }

            if ( json.topServer ) {
                utils.appendToDiv(containerJumpUpDown, 'topServer');
                $.each(json.tableServers, function(k,v){
                    utils.addBtn(containerJumpUpDown, v.tableName,
                        v.ip+'/dashboard_dal.html')
                });
            }
            containerJumpUpDown.append($("<br />"));
            cfg.div.prepend(containerJumpUpDown)
            containerJumpUpDown.append($("<br />"));
        }
        createUpDownPath();

        function createSyncPath() {
            var containerJumpUpDown  = utils.newDiv()
            utils.div = containerJumpUpDown;

            /*utils.appendToDiv(containerJumpUpDown, json.enableAutoSync);

            utils.addBtn(containerJumpUpDown, 'toggle-autoSync',
                utils.url(
                    {
                        url:json.ip+'/dbUpdateSettings',
                        data:utils.urls.getValueJSON(
                            {
                                fx: function toggleSync() {
                                    var x = json.enableAutoSync;
                                    x = utils.convertJSONBoolean(x)
                                    return ! x
                                },
                                storeAs: 'enableAutoSync'
                            }
                        ),
                        fx:getConfigBtnObj.fx,
                    }
                )
            )*/


            utils.appendToDiv(containerJumpUpDown, json.enableSync);
            utils.addBtn(containerJumpUpDown, 'toggle-enableSync',
                utils.url(
                    {
                        url:json.ip+'/dbUpdateSettings',
                        data:utils.urls.getValueJSON(
                            {
                                fx: function toggleSync() {
                                    var x = json.enableSync;
                                    x = utils.convertJSONBoolean(x)
                                    return ! x
                                },
                                storeAs: 'enableSync'
                            }
                        ),
                        fx:getConfigBtnObj.fx,
                    }
                )
            )

            utils.addBr();
            //utils.form.addTicker(containerJumpUpDown,  json.syncTime);
            var t = utils.form.createTicker({id:"numUpdateTime", val:json.syncTime});
            utils.add(t)
            utils.addBtn(containerJumpUpDown, 'update',
                utils.url(
                    {
                        url:json.ip+'/dbUpdateSettings',
                        data:utils.urls.getValueJSON('#numUpdateTime', 'syncTime')
                    }
                )
            );
            // $.each(json.tableServers, function(k,v){
            // utils.addBtn(containerJumpUpDown, v.tableName,
            //    v.ip+'/dashboard_dal.html', {syncTime:0} )
            // });
            utils.appendToDiv(containerJumpUpDown,  json.syncTime)
            utils.addBr();
            utils.addBr();
            cfg.div.prepend(containerJumpUpDown)
            utils.addBr();
        }
        createSyncPath();



        $('#txtTitle').html([json.name,json.tableName,'db'].join(' '));


    }



    function createPeerBtns(cfg) {
        //debugger;
        // var json = JSON.parse(cfg.data);

        var containerJumpLinks = $('<div></div>')
        var tableTop = $('<table></table>');
        //debugger;

        var homeVersion = null;

        function process(obj, x,y) {

            var vvv = new Date(obj.v).getTime();
            if ( homeVersion == null ) {
                homeVersion = vvv;
                vvv = 0
            }
            else {
                vvv =   vvv - homeVersion;
                vvv =  (vvv / 1000).toFixed()
                if ( Math.abs(vvv) < 60 ) {
                    vvv += 's'
                }else {
                    vvv = (vvv / 60).toFixed()
                    if (  Math.abs(vvv) < 60 ) {
                        vvv += 'm'
                    } else {
                        vvv = (vvv / 60).toFixed()
                        if (  Math.abs(vvv) < 60 ) {
                            vvv += 'h'
                        } else {
                            vvv =  (vvv / 24).toFixed()
                            if (  Math.abs(vvv) < 60 ) {
                                vvv += 'd'
                            }
                        }
                    }

                }

            }

            //debugger;
            var btn = $('<button></button>');
            btn.html([/*x,y,*/obj.name,vvv,'(',obj.count,')'].join(' '))
            containerJumpLinks.append(btn);

            var tr = $('<tr></tr>');
            for ( var i = 0; i < x; i++ ) {
                var td = $('<td></td>');
                // td.append(btn.clone())
                tr.append(td);
            }
            var td = $('<td></td>');
            //td.html([x,y,obj.name])
            td.append(btn.clone())
            tr.append(td);
            tableTop.append(tr)


            if ( obj.nestedResults == null ) return;
            $.each(obj.nestedResults, function procNested(k,nestedObj) {
                process(nestedObj, x+1, k+y+1)
            })
        }
        process(cfg.data, 1,1)

        cfg.div.prepend(containerJumpLinks)

        cfg.div.prepend(tableTop)

        return;
        utils.dictPeersToIp = dictPeersToIp;
        $.each(json.dictPeersToIp, function (peerName,ip) {
            var btn = $('<button></button>');
            btn.html(peerName);
            btn.click(function onClick(){
                var url = ip+'/dashboard_dal.html'
                if ( url.indexOf('http://')==-1)
                    url = 'http://'+url
                utils.redirectTo(url )

            })
            containerJumpLinks.append(btn);
        })

        containerJumpLinks.append($("<br />"));

        cfg.div.prepend(containerJumpLinks)

        $('#txtTitle').html(json.name + ' ' + 'db');
    }

//utils.addInfo('get config')

// utils.br();


    utils.addDBAction('get config', 'listRecords')
    var result = utils.addBtn(
        {
            url:'/listRecords',
            toDiv:'listRecords',
            fx:function updateColor(cfg) {
                function TableUtils() {
                    var self = this;
                    var p = self;
                    p.addCell = function addCell(btn) {
                        var td = $('<td></td>');
                        td.append(btn )
                        self.td = td;
                        self.tr.append(td);
                    }
                    p.addRow = function addRow(btn) {
                        var tr = $('<tr></tr>');
                        self.tr = tr;
                        self.tbl.append(tr)
                    }
                    p.createTable = function c() {
                        var tbl = $('<table></table>')
                        self.tbl = tbl
                        return self.tbl
                    }

                    p.makeLink = function makeLink(title, url, desc, target) {
                        var a = $('<a></a>')
                        a.attr('href', url)
                        a.attr('title', desc)
                        a.html(title)
                        if ( target === true )
                            a.attr('target', '_blank')
                        return a;
                    }
                }
                var tableUtils = new TableUtils()
                var tbl = tableUtils.createTable()


                $.each(cfg.data, function addButton(k,v){
                    var btn = $('<btn></btn>')
                    //debugger
                    btn.html([v.id, v.name].join(' '))
                    tableUtils.addRow()
                    tableUtils.addCell(btn)
                    var id = '/'+ v.id
                    var link = tableUtils.makeLink('x', '/deleteRecord'+id, 'remove link', true)
                    tableUtils.addCell(link)
                    var link = tableUtils.makeLink('--', '/purgeRecord'+id, 'remove link', true)
                    tableUtils.addCell(link)

                })
                //debugger
                cfg.div.prepend(tbl)
            }
        }
    )




    utils.addDBAction('Add Record', 'addRecord')
    var result = utils.addBtn(
        {
            url:'/addRecord',
            toDiv:'addRecord',

            // fx:createJumpLinks
        }
    )


    utils.addDBAction('Full Sync', 'fullSync')
    var result = utils.addBtn(
        {
            data:{
                type:'sync',
                fromPeer:'?'
            },
            url:'/atomicAction',
            toDiv:'fullSync',
            name:'Full Sync'
            // fx:createJumpLinks
        }
    )


//atomicAction
    utils.addDBAction('Get Peers', 'getPeersInfo')
    var result = utils.addBtn(
        {
            why: 'See all peers and count and version of peers',
            url:'/atomicAction',
            toDiv:'getPeersInfo',
            name:'Count Cluster',
            data:{
                type:'count',
                fromPeer:'?'
            },
            // fx:createJumpLinks
        }
    )

    utils.addDBAction('Count', 'countRecords')
    var result = utils.addBtn(
        {
            url:'/countRecords',
            toDiv:'countRecords',
            // fx:createJumpLinks
        }
    )

    utils.addDBAction('Get Peers', 'getAllPeers')
    var result = utils.addBtn(
        {
            why: 'Get all peers, and create btns for all peers',
            url:'/atomicAction',
            toDiv:'getAllPeers',
            name:'Get All Cluster',
            data:{
                type:'count',
                fromPeer:'?'
            },
            fx:createPeerBtns
        }
    )


    utils.addDBAction('Delete Purged', 'deletePurged')
    var result = utils.addBtn(
        {
            why: 'Remove purged',
            url:'/purgeDeletedRecords',
            toDiv:'deletePurged',
            name:'Remove all purged records',
            data:{
                type:'count',
                fromPeer:'?'
            },
        }
    )




    utils.addDBAction('isSynced', 'isSynced')
    var result = utils.addBtn(
        {
            why: 'Get all peers, and create btns for all peers',
            url:'/isClusterSynced',
            toDiv:'isSynced',
            name:'isSynced?',
            data:{
                type:'count',
                fromPeer:'?'
            },
            fx:function markColor(cfg) {
                //debugger
                if ( cfg.data.synced )
                    cfg.div.css('background-color', 'green' )
                else
                    cfg.div.css('background-color', 'red' )
            }
            // fx:createPeerBtns
        }
    )


    utils.addDBAction('get config', 'node_enable')
    utils.addBtn('/getConfig', 'node_enable')
}