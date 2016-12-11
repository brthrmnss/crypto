/**
 * Created by morriste on 2/23/16.
 */
//http://codepen.io/chriscoyier/pen/tIuBL
(function(document) {
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
                btn.attr('onclick', 'window.runTest2("'+testName+'")')
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

})(document);