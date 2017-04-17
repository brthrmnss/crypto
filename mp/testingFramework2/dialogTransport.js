/**
 */
function startupDialog(document) {
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

}

window.dialogTransport = {}

window.dialogTransport.init = function init() {
    var divId = '#testFrameworkTransport';
    if ( uiUtils.ifFound(divId) ) { return; }
    uiUtils.panel.br(divId);

    var cfg = {};
    cfg.id = divId;
    cfg.url =  window.preamble + '/' + 'dialogTransport.html';

    uiUtils.utils.loadPage(cfg)
    
    cfg.fxDone = function asdf() {
        startupDialog(document)
    }
};

if ( uiUtils.inUrl('dialogTransport=true') ) {
    window.dialogTransport.init();
}


//debugger;