/**
 * Created by morriste on 2/23/16.
 */
function dialogSearchTests(document) {
    //'use strict';
    window.tests
    var tbody = $('#testTable').find('tbody');
    tbody.html('');
    //debugger
    $.each(window.tests, function addTestTolist(testName,test){
        var tr = $('<tr/>');
        for ( var i = 0; i < 3; i++) {
            var td = $('<td/>');
            tr.append(td);
            if ( i == 0 )
                td.html(testName)
            if ( i == 1 )
                td.html(test.desc)
            if ( i == 2 ) {
                var btn = $('<button/>')
                btn.html('play')
                btn.addClass('btn btn-primary')
                //btn.attr('onclick', onRunTest)
                btn.on('click', onRunTest );

                function onRunTest() {
                    uiUtils.addToUrl('runTest', 'true');
                    uiUtils.addToUrl('testName', testName);
                    window.runTest2(testName)
                }
                td.html(btn)
            }
            tbody.append(tr)
        }
    });
    // debugger;
    //'use strict';
    var LightTableFilter = (function(Arr) {
        var _input;
        function _onInputEvent(e) {
            _input = e.target;
            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
            Arr.forEach.call(tables, function(table) {
                Arr.forEach.call(table.tBodies, function(tbody) {
                    Arr.forEach.call(tbody.rows, _filter);
                });
            });
        }
        function _filter(row) {
            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }
        return {
            init: function() {
                var inputs = document.getElementsByClassName('light-table-filter');
                Arr.forEach.call(inputs, function(input) {
                    input.oninput = _onInputEvent;
                });
            }
        };
    })(Array.prototype);
    if (document.readyState === 'complete') {
        LightTableFilter.init();
    } else {
        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'complete') {
                LightTableFilter.init();
            }
        });
    }


    function asdf() {
        $('#txtSearch').focus();''
    }
    setTimeout(asdf, 50)
    setTimeout(asdf, 500)
}


window.dialogTransport = {}
 
window.dialogTransport.init = function init() {
    var divId = '#testSearchTest';
    if ( uiUtils.ifFound(divId) ) { return; }
    uiUtils.panel.br(divId);

    var cfg = {};
    cfg.id = divId;
    cfg.url =  window.preamble + '/' + 'dialogSearchTests.html';

    uiUtils.utils.loadPage(cfg)

    cfg.fxDone = function asdf() {
        //startupDialog(document)
        dialogSearchTests(document)
        
        cfg.ui.css('opacity', 0.7)

        function testTestName() {

            var testName = uiUtils.utils.getParams()['testName'];
            //console.error('what is test name', testName)
            //$('#txtSearchTestNames').text(testName);
            $('#txtSearchTestNames').val(testName);
            //$('#txtSearchTestNames').change();
            function asdf() {
                $('#txtSearchTestNames').trigger('input');
            }
            setTimeout(asdf, 500)
        }
        setTimeout(testTestName, 300)
        setTimeout(testTestName, 1500)
    }
};

if ( uiUtils.inUrl('dialogSearchTests=true') ) {
    window.dialogTransport.init();
}

