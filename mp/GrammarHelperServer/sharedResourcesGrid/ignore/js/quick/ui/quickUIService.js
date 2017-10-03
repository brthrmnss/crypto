'use strict';
/**
 * Helper shows vanilla reloadable helper test service
 * why: When you want to reload services with your apps
 */
( function () {

    //console.debug('quis','reloding quickUI')
    var isNode = true

    if (typeof exports === 'undefined' || exports.isNode == false) {
        isNode = false
    }

    function QuickUIConvertor() {/**/
        var self = this;
        var p = this;

        self.data = {}
        self.data.squares = []

        p.getAttributes = function (el) {
            var nodes = [], values = [];
            var attrs = {};
            if (el == null) {
                debugger;
            }
            if (el.attributes == null) {
                el.attributes = []
                debugger;
            }
            for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
                att = atts[i];
                nodes.push(att.nodeName);
                values.push(att.nodeValue);
                attrs[att.nodeName] = att.nodeValue
            }
            attrs.$names = nodes;
            return attrs
        };

        p.getCSS = function (el) {
            var nodes = [], values = [];
            var css = {};
            for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
                att = atts[i];
                nodes.push(att.nodeName);
                values.push(att.nodeValue);
                css[att.nodeName] = att.nodeValue
            }
            css.$names = nodes;
            return css
        };


        p.process = function process(elStart, dictTypes, dictAttrs) {
            //console.info('process quick inf', dictAttrs)

            $.each(dictAttrs, function checkAttrForInvalidName(name, attr) {
                if (name.toLowerCase() != name) {
                    console.debug('quis','Invalid .... bad name', name, attr, 'angular will dash case names',
                        'contentArea must be content-area')
                    throw new Error('invalid name ' + name)
                }
            })
            //console.debug('quis','loading version', QuickUIConvertor.version, window.QuickUIConvertor.version)
            var children = elStart.find('*');
            children.push(elStart); //add starting element
            var ifx = function ifXHasPropCallFxWithVal(x, prop, fx) {
                if (x[prop] != null) {
                    fx(x[prop])
                }
            }

            var qUS = {};


            qUS.transformElement = function transformElement(el, def, type, attrs) {
                var q = $(el);
                var qOrig = $(el);

                //do before changed by changeTo
                ifx(def, 'addHTML', function (addHTML) {
                        q.append($(addHTML))
                    }
                );
                ifx(def, 'fx', function (fx) {
                    fx(el, def)
                });
                ifx(def, 'addClass', function (addClass) {
                    q.addClass(addClass)
                });
                ifx(def, 'addCSS', function addStyles(addCSS) {
                    $.each(addCSS, function (k, v) {
                        //why" do not override empty props
                        var val = q.css(k);
                        //  console.info('addCSS', 'val', k, val)
                        if (val == '-50%') {
                            var dbg = q;
                            window.dbg = q;
                            var attr = {};
                            console.log('left style', q[0].style, attr)
                            // debugger
                        }
                        if (val && val.toString().indexOf('!!!') != -1) {
                            debugger;
                        }
                        q.css(k, v)
                    })
                    // q.css(addCSS)
                });

                if (def.changeTo != null) {
                    q = q.replaceTagName(def.changeTo);
                }
                ;
                if (def.replaceWith != null) {
                    //console.log(q, q.html())
                    var qCLone = q.clone();

                    var attributes = qCLone.prop("attributes");

                    var newUI = $(def.replaceWith);
                    var childrenNew = newUI.children();
                    var childrenOld = q.children();


                    qUS.CCCZZZ = childrenNew


                    // debugger
                    //var yClone = q.replaceWith( def.replaceWith ); //TODO: Keep attributes?
                    var yClone = newUI.replaceAll(q);
                    if (q[0].textContent) {
                        yClone[0].textContent = q[0].textContent
                        //debugger
                    }

                    yClone.append(childrenOld)

                    if (def.addStyles) {
                        $.each(def.addStyles, function ok(k, v) {
                            yClone.css(k, v)
                        })
                    }
                    if (def.addAttrs) {
                        $.each(def.addAttrs, function ok(k, v) {
                            yClone.attr(k, v)
                        })
                    }
                    //debugger;

                    window.sh.qq = function qq(text) {
                        return "\"" + text + "\""
                    }

                    var attributesNew = $(def.replaceWith);
                    $.each(attributesNew, function copyPro() {
                        var val = this.value;
                        if (val == null) {
                            val = ''
                        }
                        console.debug('quis','as set2', this.name, window.sh.qq(val))
                        q.attr(this.name, val);
                        yClone.attr(this.name, val);
                    });

                    console.debug('quis','as', attributes, q, 't', yClone, childrenNew)
                    //no attrtibutes here
                    $.each(attributes, function copyPro() {
                        var val = this.value;
                        if (val == null) {
                            val = ''
                        }
                        console.debug('quis','as set', this.name, window.sh.qq(val))
                        q.attr(this.name, val);
                        yClone.attr(this.name, val);
                    });
                    var attributes = yClone.prop("attributes");
                    console.debug('quis','asyClone', attributes)
                   /* if ( yClone[0].textContent) {
                        q[0].textContent = yClone[0].textContent
                        //debugger
                    }*/

                    q = yClone;
                    if (def && def.type == 'screen') {
                      //  debugger
                    }
                } ;

                //console.debug('quis','dbg.iput--', el, def, type, attrs)

                ifx(def, 'fxModifyElementRaw', function on_fxModifyElementRaw(fxModifyElementRaw) {
                    // debugger
                    fxModifyElementRaw(q, attrs)
                });
                //console.debug( 'tpes',type, def, def.wrapContentFx)
                ifx(def, 'wrapContentFx', function wrapContent(wrapContentFx) {

                    var children = q.children()

                    var html = q.html();
                    // console.debug('quis','sdfsdf', q.html(), qOrig.text())
                    //  q.empty();
                    var content = wrapContentFx(children)
                    content = $(content);
                    // console.debug('quis','whil', children, 'text', children.html(), q.html())
                    // debugger;
                    // q.children().remove()
                    q.html('')
                    q.append(content)

                    content.html(html)
                    //content.append('zzz');
                    // q.text('sdfsdsdfsdfsd')
                });


                return q;

            }

            //debugger
            //todo run jquery to find elements to apply transforms
            $.each(children, function onPEE(i2, iE2) {
                onProcessEachElement(i2, iE2)
            });

            function onProcessEachElement(i, inputElement) {
                //console.log(i);
                var q = $(inputElement);
                var element = null;
                var el = element = q[0];
                var pre = {}
                pre.el = el;

                pre.children = $(el).children();
                var type = element.tagName.toLowerCase();
                pre.type = type;
                var attrs = self.getAttributes(element);////.attr();

                var it = {};

                var typeDef = dictTypes[type];
                if (typeDef != null) {
                    qUS.CCCZZZ = null;

                    el = element = qUS.transformElement(el, typeDef, type, attrs);
                    q = $(el);
                    el = element = el[0];
                    // debugger
                    var attrsNew = self.getAttributes(element);
                    $.each(attrsNew, function copyProp(k, v) {
                        attrs[k] = v;
                    });
                    //attrs = attrs.concat(attrsNew);
                    type = element.tagName.toLowerCase();
                    var _t = $(this); //
                    if (pre.type == 'screen') {
                        pre.newChildren = q.children();
                        console.debug('quis','new children', pre.newChildren.length)
                        // debugger
                    }
                    //el.textContent = 'dddd'+pre.el.textContent
                    /*if (q.get(0) != null && q.get(0).lastChild) {
                        q.get(0).lastChild.nodeValue = pre.el.textContent
                    }*/
                    /*if (pre.el.textContent) {
                        q[0].textContent = pre.el.textContent
                        //debugger
                    }*/
                    //console.debug('quis','yyy', type)
                    if (qUS.CCCZZZ) {
                        //debugger
                        $.each(qUS.CCCZZZ, function kv(k, v) {
                            children.push(v)
                            console.debug('quis','as add', v)
                            onProcessEachElement(-1, v);
                            //_t.append(v);
                            //  debugger;
                        });
                    } else {
                        //not sure wy the cczz

                        /* $.each(pre.children, function kv(k, v) {
                             //children.push(v)
                             console.debug('quis','---***', v)
                                 q.append(v)//.
                             onProcessEachElement(-1, v);
                             //_t.append(v);
                             //  debugger;
                         });*/

                    }

                }

                attrs = self.getAttributes(element);
                type = element.tagName.toLowerCase();

                var ifxEq = function ifXHasPropCallFxWithVal(x, prop, val) {
                    if (x[prop] == val) {
                        return true;
                    }
                    return false;
                }

                /// debugger
                $.each(attrs, function (attrName, val) {
                    attrName = attrName.toLowerCase();
                    //search for matching attr change definition in dictionary
                    //apply dictAttrs blocks
                    var attrDef = dictAttrs[attrName]
                    if (attrName == 'bg-test') {
                        //debugger
                    }
                    if (attrDef == null) {

                        if (attrName.indexOf('!') != -1) { //why: set final settings
                            console.log('matched it', attrName, val)
                            attrName = attrName.replace('!', '')
                            q.css(attrName, val)
                        }
                        // console.debug('quis','attrs', attrName, val)
                        if (attrName == 'faketext') {
                            if (val == "abc123") {
                                // sdf.g
                                q.text('a b c d e f g h i j k l m n ' +
                                    'o p q r s t u v w x y z ' + '123456789')
                            }
                        }
                        return;
                    }
                    //debugger
                    if (attrDef.keep !== true) {
                        q.attr(attrName, null);
                    }
                    if (attrDef.alert)
                        console.warn('alert triggered', q, attrName, val);
                    if (attrDef.addClassToChildren) {
                        $.each(q.children(), function addStyleChild(k, v) {
                            $(v).addClass(attrDef.addClassToChildren)
                        });
                    }


                    //debugger

                    if (attrDef.modifyChildrenFx) { //use method to modify children
                        $.each(q.children(), function addStyleChild(k, v) {
                            var childAttrs = self.getAttributes(v);////.attr();
                            var css = self.getCSS(v)
                            attrDef.modifyChildrenFx($(v), k, childAttrs, css, attrs)
                            //$(v).addClass('show-child-containers')
                        });
                    }
                    if (attrDef.modifyElementFx) { //use method to modify children
                        attrDef.modifyElementFx(q, attrs)
                    }

                    if (attrDef.wrapContentFx) { //use method to modify children
                        var content = attrDef.wrapContentFx()
                        content = $(content);
                        var children = q.children().remove()
                        debugger;
                        q.append(content)
                        content.append(children);
                    }


                    if (attrDef.debugChildren) {
                        it.debugChildren = true;
                    }


                    var skipAttr = false;
                    //TODO: what was purpose of ifVal?
                    /*if ( ifxEq(attrDef, 'ifVal', true ) ) {
                     if ( val == 'true' || val == true ) {

                     } else {
                     return;
                     }
                     };*/
                    if (skipAttr == true)
                        return;
                    qUS.transformElement(el, attrDef);

                })

                if (q.attr('id') == 'positioningDiv') {
                    console.log('repeatUI', attrs)
                    //  debugger
                }


                //console.log('repeatUI', attrs)
                if (attrs.repeatui) {
                    var times = attrs.repeatui
                    var parent = q.parent();
                    console.log('repeatUI', times, q)
                    for (var i = 0; i < times; i++) {
                        var cloneQ = $(q).clone();
                        cloneQ.css("top", ((i * 45) - 200) + 'px');
                        cloneQ.css("left", (-100) + '%');
                        //cloneQ.attr("topx",(i*60)+'px');
                        //cloneQ.text((i*60)+'px')
                        parent.append(cloneQ)
                    }
                }

                if (attrs.repeatuix) {
                    var times = attrs.repeatuix
                    var parent = q.parent();
                    console.log('repeatUIx', times, q)
                    for (var i = 0; i < times; i++) {
                        var cloneQ = $(q).clone();
                        //addeach attribute with re_ in front
                        $.each(attrs, function processRepeatAttrs(k, v) {
                            if (k.indexOf('re_') == 0) {
                                var att = k.slice(3, k.length)
                                cloneQ.css(att, eval(v));
                            }
                        })
                        // cloneQ.css("top",((i*45)-200)+'px');
                        // cloneQ.css("left",(-100)+'%');
                        //cloneQ.attr("topx",(i*60)+'px');
                        //cloneQ.text((i*60)+'px')
                        parent.append(cloneQ)
                    }
                }


                if (it.debugChildren || attrs['debugChildren']) { //can debug all of type, or just one from dom
                    $.each(q.children(), function addStyleChild(k, v) {
                        $(v).addClass('show-child-containers')
                    });
                }

            }

        }


        p.processDefaults = function processDefaults(elStart) {

            var dictTypes = {};
            var dictAttrs = {};

            //alert('d')

            dictTypes['t'] = {changeTo: 'textarea', addHTML: '<checkbox>sdfsdf', addClass: 'textarea_class'};
            dictTypes['tx'] = {changeTo: 'div', addHTML: '<checkbox>', addClass: 'textarea_class'};
            dictTypes['navbtn'] = {changeTo: 'div', addHTML: '<checkbox>', addClass: 'navBtn'};
            dictTypes['mini-panel'] = {addClass: 'mini-panel', changeTo: 'div'};


            dictTypes['btn'] = {
                addClass: "btnFake2",
                changeTo: 'div'
            };

            dictTypes['center-content'] = {
                wrapContentFx: function warpContent(contents, index, attrs, css) {
                    //  debugger
                    return '<div class="center-content-layout-item"><!-- auto center -->'
                    //  +'ddd'+
                    '</div>'
                },
                addClass: "center-content-container",
                changeTo: 'div'
            };

            //debugger
            dictTypes['glyph'] = {
                fxModifyElementRaw: function on__fxModifyElementRaw(q, attrs) {
                    //debugger

                    //  if ( attrs.icon )

                    var sh = {};
                    sh.length = function length(myObj) {
                        var size = Object.keys(myObj).length;
                        return size;
                    }
                    sh.getAttr = function getAttr(obj, index, keyVal) {
                        var length = 0
                        var val = null;
                        $.each(obj, function onK(k, v) {

                            if (length == index) {
                                val = v;
                                if (keyVal) {
                                    val = k;
                                }
                                return false;
                            }
                            length++;
                        })
                        return val;
                    }
                    var attrs2 = JSON.parse(JSON.stringify(attrs));
                    if (attrs2.$names) {
                        delete attrs2.$names
                    }

                    var l = sh.length(attrs2)

                    var attrIcon = sh.getAttr(attrs2, 0, true)

                    var icon = null;
                    if (attrs.icon) {
                        icon = attrs.icon;
                        delete attrs['icon']
                    }
                    if (l == 1) {
                        icon = attrIcon;
                    }
                    //debugger
                    if (q[0].attributes.icon) {
                        var icon2 = q[0].attributes.icon.value
                        icon = icon2;
                    }
                    // console.debug('quis','icon?', attrs.icon, icon2, attrs,l, attrIcon)
                    // console.debug('quis','\t', 'icon?', q, q.html(),  '|', icon)

                    if (icon) {
                        q.addClass('glyphicon-' + icon)
                    }


                },
                addClass: "glyphicon",
                changeTo: 'span'
            };


            dictAttrs['prettybtn'] = {addClass: 'mbButton marty'};
            dictTypes['spacer'] = {replaceWith: '<div style="width:10px;height:10px;"></div>'};
            dictTypes['hr2'] = {replaceWith: '<div style="width:100%;height:2px;"></div>'};

            dictTypes['hr3'] = {replaceWith: '<div bg-lightgray  style="width:100%;height:20px;"></div>'};
            dictTypes['hr4'] = {replaceWith: '<div bg-lightgray xbg-test style="width:100%;height:20px;"></div>'};

            dictTypes['hr4'] = {
                replaceWith: '<div style="width:100%;">' +
                '<div bg-lightgray marlr20 zbg-test style="width:100t%;height:1px;"></div>' +
                '</div>'
            };

            dictTypes['w100'] = {replaceWith: '<div style="width:100%;"></div>'};

            dictTypes['screen'] = {
                type:'screen',
                replaceWith: '<div  scroll >' +
                //  '<div bg-lightgray marlr20 zbg-test style="width:100t%;height:1px;"></div>' +
                '</div>',
                addAttrs: {'gray-border': ''},
                addStyles: {'width': '315px', 'height': '519px'},
            };


            dictAttrs['makeredbtn'] = {ifVal: true, addClass: 'redbtn', addHTML: '<span>red btns</span>'};
            dictAttrs['horizontal-layout'] = {
                ifVal: true, addClass: 'horizontal-flex-container',
                addClassToChildren: 'horizontal-flex-container-flex-item',
                //debugChildren:true,
                modifyChildrenFx: function (child, index, attrs, css, parAttrs) {
                    if (attrs.stretch != null) {
                        child.addClass('horizontal-flex-container-flex-item-stretch');
                    }
                    //debugger
                    //console.debug('quis','attrs', parAttrs)
                    if (parAttrs['padnochildren'] == null) {
                        child.addClass('pad10');
                    }
                },
                _addHTML: '<span>red btn</span>', alert: true
            }
            ;


            dictAttrs['is-square'] = {
                ifVal: true,
                //addClass: 'horizontal-flex-container',
                // addClassToChildren: 'horizontal-flex-container-flex-item pad10',
                //debugChildren:true,
                modifyElementFx: function (child, index, attrs, css) {
                    self.data.squares.push(child); // = [child]
                    //debugger
                },
            }


            dictAttrs['add-class-to-children'] = {
                modifyChildrenFx: function (child, index, attrs, css, parentAttrs) {
                    var addToClassChildren = parentAttrs['add-class-to-children']
                    if (addToClassChildren != null) {
                        child.addClass(addToClassChildren);
                    }
                },
                alert: true
            };
            dictAttrs['upcase'] = {
                addCSS: {'text-transform': 'uppercase'}
            }
            dictAttrs['tight'] = {
                addCSS: {'letter-spacing': '-1px'}
            }
            dictAttrs['loose'] = {
                addCSS: {'letter-spacing': '1px'}
            }
            dictAttrs['bold'] = {
                addCSS: {'font-weight': 'bold'}
            }

            dictAttrs['absolute'] = {
                addCSS: {'position': 'absolute', top: '0px', left: '0px'}
            }

            dictAttrs['abs'] = {
                addCSS: {'position': 'absolute'}
            }
            dictAttrs['tr'] = {
                addCSS: {'position': 'absolute', top: '10px', right: '10px'}
            }

            dictAttrs['bottom'] = {
                addCSS: {'position': 'absolute', top: '', bottom: '0px'}
            }
            dictAttrs['relative'] = {
                addCSS: {'position': 'relative'}
            }
            dictAttrs['aboslute-container'] = {
                addCSS: {'position': 'relative'}
            }
            dictAttrs['bg-offwhite'] = {
                addCSS: {'background-color': '#EAEAE2'}
            }
            dictAttrs['bg-white'] = {
                addCSS: {'background-color': 'white'}
            }
            dictAttrs['bg-blue'] = {
                addCSS: {'background-color': '#09FFFF'}
            }

            dictAttrs['bg-llgray'] = {
                addCSS: {'background-color': '#FFFAE3'}
            }


            /* dictAttrs['bg-blue'] = {
             addCSS: {'background-color': '#2F416C'}
             }
             */
            dictAttrs['bg-red'] = {
                addCSS: {'background-color': 'red'}
            }
            dictAttrs['bg-green'] = {
                addCSS: {'background-color': 'green'}
            }
            dictAttrs['bg-orange'] = {
                addCSS: {'background-color': 'orange'}
            }

            dictAttrs['gray-border'] = {
                addCSS: {'border': 'solid 1px #EFEFEF'}
            }
            dictAttrs['bg-lightgray'] = {
                addCSS: {'background-color': '#D6D6D6'}
            }
            dictAttrs['lightgray'] = {
                addCSS: {'color': '#D6D6D6'}
            }
            dictAttrs['bg-black'] = {
                addCSS: {'background-color': 'black'}
            }
            dictAttrs['bg-test'] = {
                addCSS: {'background-color': 'blue'}
            }
            dictAttrs['hide'] = {
                addCSS: {'display': 'none'}
            }

            dictAttrs['wh5050'] = {
                addCSS: {
                    'width': '50%',
                    'height': '50%'
                }
            }
            dictAttrs['mar10'] = {
                addCSS: {'margin': '10px'}
            }
            dictAttrs['mar20'] = {
                addCSS: {'margin': '20px'}
            }
            dictAttrs['pad10'] = {
                addCSS: {'padding': '10px'}
            }
            dictAttrs['pad20'] = {
                addCSS: {'padding': '10px'}
            }
            dictAttrs['nudge-left-2'] = {
                addCSS: {'margin-left': '-2px'}
            }
            dictAttrs['padlr20'] = {
                addCSS: {
                    'padding-left': '20px',
                    'padding-right': '20px'
                }
            }
            dictAttrs['marlr20'] = {
                addCSS: {
                    'margin-left': '20px',
                    'margin-right': '20px'
                }
            }

            dictAttrs['rl20'] = {
                addCSS: {
                    'left': '20px',
                    'right': '20px'
                }
            }

            dictAttrs['pad5'] = {
                addCSS: {'padding': '5px'}
            }

            dictAttrs['white'] = {
                addCSS: {
                    'color': 'white',
                }
            }
            dictAttrs['mw100'] = {
                addCSS: {
                    'max-width': '100%',
                }
            }
            dictAttrs['w100'] = {
                addCSS: {
                    'width': '100%',
                }
            }

            dictAttrs['h100'] = {
                addCSS: {
                    'height': '100%',
                }
            }

            dictAttrs['h100px'] = {
                addCSS: {
                    'height': '100px',
                }
            }
            dictAttrs['h125px'] = {
                addCSS: {
                    'height': '125px',
                }
            }


            dictAttrs['h2'] = {
                addCSS: {
                    'height': '2px',
                }
            }

            dictAttrs['h1'] = {
                addCSS: {
                    'height': '1px',
                }
            }
            dictAttrs['lrpad20'] = {
                addCSS: {
                    'padding-left': '20px',
                    'padding-right': '20px',
                }
            }

            dictAttrs['lrmar20'] = {
                addCSS: {
                    'margin-left': '20px',
                    'margin-right': '20px',
                }
            }

            dictAttrs['wh100'] = {
                addCSS: {
                    'width': '100%',
                    'height': '100%'
                }
            }

            dictAttrs['clip'] = {
                addCSS: {
                    'overflow': 'hidden',
                }
            }

            dictAttrs['clip-y'] = {
                addCSS: {
                    'overflow-x': 'hidden',
                }
            }


            dictAttrs['scroll'] = {
                addCSS: {
                    'overflow': 'auto',
                }
            }

            dictAttrs['w50'] = {
                addCSS: {
                    'width': '50%',
                }
            };
            dictAttrs['w30'] = {
                addCSS: {
                    'width': '30%',
                }
            };
            dictAttrs['h50'] = {
                addCSS: {
                    'height': '50%',
                }
            }


            dictAttrs['top10'] = {
                addCSS: {
                    'top': '10px',
                }
            };
            dictAttrs['right10'] = {
                addCSS: {
                    'right': '10px',
                }
            }
            dictAttrs['left10'] = {
                addCSS: {
                    'left': '10px',
                }
            }

            dictAttrs['left0'] = {
                addCSS: {
                    'left': '0px',
                }
            }

            dictAttrs['min-width-250'] = {
                addCSS: {
                    'min-width': '250px',
                }
            }
            dictAttrs['min-height-50'] = {
                addCSS: {
                    'min-height': '50px',
                }
            }

            dictAttrs['mw250'] = {
                addCSS: {
                    'min-width': '250px',
                }
            }
            dictAttrs['mh50'] = {
                addCSS: {
                    'min-height': '50px',
                }
            }


            dictAttrs['content-area'] = {
                addCSS: {
                    'height': '250px',
                    'width': '250px',
                }
            }

            self.process(elStart, dictTypes, dictAttrs);


            p.postStuff = function postStuff() {
                $.each(self.data.squares, function asdf(k, v) {
                    var ui = $(v)
                    var widthOfChild = ui.width();
                    ui.css({'height': widthOfChild + 'px'});
                    // debugger
                })
            }

            setTimeout(p.postStuff, 100)


            p.postStuff2 = function postStuff2() {
                var ui = $('[parentWidth]')
                $.each(ui, function asdf(k, v) {
                    var ui = $(v)
                    var par = ui.parents('.parentWidthWrapper')
                    if (par.length == 0) {
                        console.warn('broken')
                        return;
                    }

                    ui.width(par.width())


                    //var widthOfChild = ui.width();
                    //ui.css({'height':widthOfChild+'px'});
                    // debugger
                })
            }

            setTimeout(p.postStuff2, 1500)


        }
    }


    if (isNode) {
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
    } else {
        $.fn.replaceTagName = function (replaceWith) {
            var tags = [],
                i = this.length;
            while (i--) {
                var newElement = document.createElement(replaceWith),
                    thisi = this[i],
                    thisia = thisi.attributes;
                for (var a = thisia.length - 1; a >= 0; a--) {
                    var attrib = thisia[a];
                    if (attrib.name.indexOf('!') != -1) {
                        continue;
                    }
                    newElement.setAttribute(attrib.name, attrib.value);
                }
                ;
                newElement.innerHTML = thisi.innerHTML;
                $(thisi).after(newElement).remove();
                tags[i] = newElement;
            }
            return $(tags);
        };

    }

    /*
     function QuickUIService() {
     var self = this;
     var p = this;

     p.init = function init() {

     };

     p.new = function create() {
     return new QuickUIService();
     }
     }*/

    //alert('reloaded then')
    //window.QuickUIService != QuickUIService;

    /*  if ( window.QuickUIConvertorVersion == null ) window.QuickUIConvertorVersion = 0;
     window.QuickUIConvertorVersion++;
     window.QuickUIConvertor.version =  window.QuickUIConvertorVersion;
     console.debug('quis','reloading', window.QuickUIConvertor.version)

     var reloadableHelperTestService = function reloadableHelperTestService( sh, pubSub ) {
     function createService() {
     var service = new QuickUIService();
     if ( window.QuickUIService != null ) {
     service = new window.QuickUIService();
     };
     service.QuickUIConvertor = QuickUIConvertor;
     return service
     }
     var service = createService();
     service.create = function create() {
     return createService();
     };

     return service;
     };*/


    if (typeof angular != 'undefined') {
        //debugger
        var wrapperRelodableService = window.reloadableHelper.makeServiceReloadable('QuickUIService', QuickUIConvertor)

        // debugger;
        angular.module('com.sync.quick').factory('quickUI', wrapperRelodableService);
    }
}());
