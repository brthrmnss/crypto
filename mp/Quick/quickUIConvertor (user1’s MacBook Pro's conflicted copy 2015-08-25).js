

var isNode = true;

if (typeof exports === 'undefined' || exports.isNode == false) {
    isNode = false;
}

if ( isNode ) {
    var shelpers = require('shelpers')
    var sh = shelpers.shelpers;
    var PromiseHelperV3 = shelpers.PromiseHelperV3;

    $ = function jqueryImpersonator() {
        return $;
    }
    $.click = function () {

    }
    $.click = function () {

    }
    $.attr = function () {

    }
    $.val = function () {

    }
    console.log($, '$')
}else {
    $.fn.replaceTagName = function(replaceWith) {
        var tags = [],
            i    = this.length;
        while (i--) {
            var newElement = document.createElement(replaceWith),
                thisi      = this[i],
                thisia     = thisi.attributes;
            for (var a = thisia.length - 1; a >= 0; a--) {
                var attrib = thisia[a];
                newElement.setAttribute(attrib.name, attrib.value);
            };
            newElement.innerHTML = thisi.innerHTML;
            $(thisi).after(newElement).remove();
            tags[i] = newElement;
        }
        return $(tags);
    };

    var helper = {};
    helper.getAttributes = function (el) {
        var nodes=[], values=[];
        var attrs = {};
        for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++){
            att = atts[i];
            nodes.push(att.nodeName);
            values.push(att.nodeValue);
            attrs[att.nodeName]=att.nodeValue
        }
        attrs.$names = nodes;
        return attrs
    }
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
    var children = $('#divStart').find('*');
    console.log($('#divStart'))
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

    var ifx = function ifXHasPropCallFxWithVal(x, prop, fx) {
        if ( x[prop] != null ) {
            fx(x[prop])
        }
    }

    function transformElement( el, def) {
        var q = $(el);
        //do before changed by changeTo
        ifx(def, 'addHTML', function(addHTML){
                q.append($(addHTML))}
        );


        ifx(def, 'fx', function(fx){fx(el, def)} );
        ifx(def, 'addClass', function(addClass){q.addClass(addClass)} );

        if ( def.changeTo != null ) {
            q.replaceTagName( def.changeTo );
        };

    }

    //todo run jquery to find elements to apply transforms
    $.each(children, function (i,yy) {
        console.log(i);
        //search for attribute (dictionary)
        var q = $(yy);
        var el = element = q[0];
        var type = element.tagName.toLowerCase();
        var attrs = helper.getAttributes(element);////.attr();

        var typeDef = dictTypes[type]
        if ( typeDef != null ) {
            transformElement(el, typeDef);
        }

        var ifxEq = function ifXHasPropCallFxWithVal(x, prop, val) {
            if ( x[prop] == val ) {
                return true
            }
            return false;
        }
        $.each(attrs, function (attrName, val) {
            //search for matching attr change definition in dictionary
            var attrDef =  dictAttrs[attrName]
            if ( attrDef != null ) {
                if ( attrDef.keep !== true ) {
                    q.attr(attrName, null);
                }
                var skipAttr = false;
                if ( ifxEq(attrDef, 'ifVal', true ) ) {
                    if ( val == 'true' || val == true ) {

                    } else {
                        return;
                    }
                };
                if ( skipAttr )
                    return;
                transformElement(el, attrDef);

            }
        })
    });
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
