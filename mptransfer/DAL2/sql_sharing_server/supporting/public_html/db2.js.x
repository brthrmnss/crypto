/**
 * Created by morriste on 8/3/16.
 */


var utils = {};
utils.getIntoDiv = function ( url , toDiv, name, fx) {
    $.ajax({
        url: url,
    })
        .fail(function( data , t, e) {
            console.error(e)
        })
        .done(function( data ) {
            if ( console && console.log ) {
                console.log( "Sample of data:", data.slice( 0, 100 ) );
            }

            var dataPP = data.replace(/\n/gi, "<br />")
            dataPP = dataPP.replace(/\t/gi, "&emsp; "+"&nbsp;"+"&nbsp;"+"&nbsp;")
            $('#'+toDiv).html(dataPP)
            if ( fx ) fx(data)


        });
}

utils.addBtn = function ( url , toDiv, name) {
    if ( name == null )
        name = url;
    var btn = $('<button></button>');
    btn.html(name);
    btn.click(onClickAutoGen)
    function onClickAutoGen(){
        utils.getIntoDiv(url, toDiv, '',
            function createJumpLinks(data){
                var json = JSON.parse(data);

                var containerJumpLinks = $('<div></div>')

                $.each(json.dictPeersToIp, function (peerName,ip) {
                    var btn = $('<button></button>');
                    btn.html(peerName);
                    btn.click(function onClick(){
                        var url = ip+'/dashboard_dal.html'
                        utils.redirectTo(url, toDiv, '')

                    })
                    containerJumpLinks.append(btn);
                })

                containerJumpLinks.append($("<br />"));

                $('#'+toDiv).prepend(containerJumpLinks)

        })
    }
    $('#'+toDiv+'_cfg').append(btn);

    var btn = $('<button></button>');
    btn.html('~');
    var showXHide = true;
    btn.click(function onClick(){
        showXHide = ! showXHide;
        if ( showXHide ) {
            $('#'+toDiv).removeClass('hide')
        } else {
            $('#'+toDiv).addClass('hide')
        }
    })
    $('#'+toDiv+'_cfg').append(btn);

    var ret = {};
    ret.fx = onClickAutoGen;
    return ret
}
utils.addDBAction = function ( txt, createDiv ) {
    var div = $('<div></div>');
    div.attr('id', createDiv+'_cfg');

    $('body').append(div)
    var div = $('<div></div>');
    div.css("height", '200px')
    div.css("overflow", 'auto')
    div.attr('id', createDiv);
    $('body').append(div);


   /* var div = $('<div>------</div>');
    $('body').append(div);*/
}


$( document ).ready(init)

function init() {
    utils.addDBAction('get config', 'config')
    var result = utils.addBtn('/getConfig', 'config')
    result.fx();

    //utils.addInfo('get config')

   // utils.br();

    utils.addDBAction('get config', 'listRecords')
    utils.addBtn('/getConfig', 'listRecords')

    utils.addDBAction('get config', 'node_enable')
    utils.addBtn('/getConfig', 'node_enable')
}