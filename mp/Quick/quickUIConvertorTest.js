

var isNode = true

if (typeof exports === 'undefined' || exports.isNode == false) {
    isNode = false
}



////Header end
function runTest(evalStr1) {
    /*
     var y = $(evalStr1);
     var children = y.children();
     //console.log('eval', children,  y.find('*').children(),  y.children().find('*') )
     //if ( children.length == 0 ) {
     evalStr1 = '<div>'+evalStr1+'</div>'
     y = $(evalStr1);

     //console.log('eval', children,  y.find('*'),  y.children().find('*') )
     var children = y.find('*'); //.children();
     */



    var cloneSrc = $('#divStart').clone();
    $('#divResult').append(cloneSrc);


    var start = '#divResult'
    if ($.type(start)=='string'){
        start = $(start)
    }

    //var children = $('#divStart').find('*');
    var children = start.find('*');
    //var children = $('#divStart').find('*');
    console.log('ready?',start.length > 0)
    //}
    //console.log('eval', children);
    var setupTestHereStr = ''
    var token = {}

    var dictTypes = {};
    var dictAttrs = {};

    dictTypes['t']={changeTo:'textarea', addHTML:'<checkbox>', addClass:'textarea_class'};
    dictTypes['tx']={changeTo:'div', addHTML:'<checkbox>', addClass:'textarea_class'};
    dictAttrs['prettybtn']={addClass:'mbButton marty'};
    dictAttrs['makeredbtn']={ifVal:true, addClass:'redbtn', addHTML:'<span>red btn</span>'};

    var helper = new QuickUIConvertor();
    helper.process(start, dictTypes, dictAttrs)

}


var isNode = true

if (typeof exports === 'undefined' || exports.isNode == false) {
    isNode = false;
}

if ( isNode ) {
    runTest();
} else
{
    /* $.get("testHelper.js", function(response) {
     var logfile = response;
     runTest(logfile)
     });
     */
    $(document).ready(runTest)
    //  runTest();
    //return;
    /* $.ajax({
     url: "CSSTest/a.html",
     // data: data,
     success: function f(d){
     runTest(d);
     },
     dataType: "text"
     }).done(function( html ) {
     //console.log('d', html)
     });;
     */
    //runTest();
}

//how to add transport on page?
