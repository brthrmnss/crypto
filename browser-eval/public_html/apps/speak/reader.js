

function findSentencesInHtml(parent) {

    window.parent = parent;
    console.log('starting point is', parent)

    if ($.isString == null ) {
        $.isString = function isString (obj) {
            return (Object.prototype.toString.call(obj) === '[object String]');
        }
    }
    //TODO
    //colorize all sentences
    //prev sentences add to list of 'current sentencces'

    //get all images ... and have images work with sentences
    //why: when viewing sentence, see image. so it is like tv show

    var h = {};
    h.settings = {};
    h.settings.debugSpans = false;
    h.currentSentence='';
    h.sentences = [];
    h.dictSentences = {};
    h.dictSentences2 = {};
    h.currentSpans = {};
    h.addSentence = function addSentence(str, ui, why) {
        return;
        h.sentences.push(str)
        h.dictSentences[h.sentences.length-1]={txt:str, ui:ui, why:why};
        h.currentSentence = '';
    }
    h.addSentence2 = function addSentence(str, _parent, why, child) {
        h.sentences.push(str)
        var dictObj =  {txt:h.currentSentence+str,
            ui:_parent, why:why,
            spans:h.currentSpans};
        h.dictSentences2[h.sentences.length-1]= dictObj
        var span = $('<span style="opacity: 0.2;">'+ str +'</span>')
        // dictObj[str]=span;

        h.currentSpans[str]=(span);
        _parent.append(span); //add to div

        h.currentSentence = ''; //refresh
        h.currentSpans = {};
    }


    h.addSentence2Fragment = function addSentence2Fragment(str, _parent, why) {
        //create span, add to currentSpans to track sentence fragement
        var span = $('<span style="opacity: 0.2;">'+ str +'</span>')
        _parent.append(span); //add to div
        h.currentSpans[str]=(span);
    }


    h.colorizeSentences = function colorizeSentences() {
        $.each(h.dictSentences2, function processChar(i,dictObj) {
            //var color =
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            randomColor = '#'+randomColor
            $.each(dictObj.spans, function processChar(y,span) {
                span.css({'color':randomColor})
                $(span).css( 'color',randomColor)
            });
        });

    }

    h.utils = {};
    h.utils.splitIntoSentencesSafe = function splitIntoSentencesSafe(str, _parent, child) {
        var sentences = [];
        var currentSentence = ''
        //currentSentence = h.currentSentence;
        var endAt = null;
        var strArr = [];
        for ( var i = 0; i < str.length; i++) {
            strArr.push(str[i]);
        }
        $.each(strArr, function processChar(i,char) {
            var nextChar = str[i+1]
            var valid = ['. ', '! ', '? ', '" ']
            var join = char+nextChar;
            $.each(valid, function compareForEndSent(k,v) {
                if ( v == join ) {
                    endAt = v;
                    return false;
                }
            })
            currentSentence+=char
            if ( endAt ) {
                sentences.push(currentSentence)
                h.addSentence(currentSentence, h.lastParent[0], 'split inside sentence')

                h.addSentence2(currentSentence,
                    _parent,'',
                    child
                )
                currentSentence = ''
                endAt = null;
            }
        });
        if ( currentSentence != '' ) {
            sentences.push(currentSentence)
            h.addSentence2Fragment(currentSentence,
                _parent
            )

        }
        if (h && false ) {
            //every sentence
            //var parent = h.lastParent[0]
            //debugger;
//            var span = $('<span style="opacity: 0.2;">'+sentences.join(",")+'</span>')
//            _parent.append(span)
            $.each(sentences, function addSpansToArea(i,sentence) {
                var span = $('<span style="opacity: 0.2;">'+sentence+'</span>')
                _parent.append(span)
            });

            // $(parent).html(sentences.join('---'))
        }

        return sentences;
    }

    function getChild(parent_) {
        var children = $(parent_).children('*')
        var children = $(parent_).children('*')
        var children = $(parent_).contents()

        $.each(children, function process(i,child){
            if ( $.isString(child) || child.nodeName=='#text' ) {
                var nodeTxt = child.nodeValue;
                if ( child.nodeValue.trim() != '' ){
                    if ( h.settings.debugSpans )
                        console.log('',child, parent_)
                    var txt = child.nodeValue;
                    //$(child).wrapInner('<span class="addIn">');

                    var span = document.createElement('span');
                    parent_[0].insertBefore(span, child);
                    // debugger;
                    span.appendChild(child); //wrap in span

                    //return false;
                    var splitSentences = h.utils.splitIntoSentencesSafe(txt, $(span))
                    if ( splitSentences.length > 0 && h.settings.debugSpans ) {
                        console.log('sentences', splitSentences)
                    }

                    child.nodeValue = '$'; //clear content of nodes
                    h.currentSentence += txt;

                    h.lastParent = parent_
                    //h.currentSpans.push
                } else {
                    if ( nodeTxt == "\n" &&
                        h.currentSentence.trim().length > 0 )
                        h.addSentence(h.currentSentence, h.lastParent[0], 'new line')
                }

            } else if  ( child.nodeName == 'IMG') {
                //console.log('..', child)
                //TODO: addImageToCurrentDictionaryObject
            }
            else {
                // console.log('raw',child.nodeName, child)
            }
            /*else { //} ( child.nodeName == 'img') {
             console.log('..', child)
             }*/

            //  console.log('raw',child)
            var child = $(child)
            getChild(child)
        })
    }

    getChild(parent)


    h.colorizeSentences();
    window.h = h;

    console.log('h', window.h)


    return;
    $.each()
    x.contents();
    $.isString()

}



setTimeout(function startSearch() {
    var parent = $('[itemprop="articleBody"]')
    parent = $(parent)
    var children = $(parent).children('*')
    findSentencesInHtml(parent)
}, 1000)