//console.log('...', $('#btnStart'),  $.isReady)





function tX() {

    var self = this;
    var  p = this;

    p.startOnSel = function startOnSel() {
        console.log('startSel', self.sel)
        self.start(self.sel)
    }

    p.start = function (jquery, words) {
        var el = $(jquery);
        if (el.attr('id')=='appendToApp') {
            el = $(self.sel2);
        }

        self.currentId = Math.random();
        self.el = el;
        var txt = el.text();
        var sentences = txt.split('. ');
        var sentences2 = [];
        $.each(sentences, function modifySentenceForNewLines(k,sentence) {
            var newSentences = sentence.split("\n");
            sentences2 = sentences2.concat(newSentences)
        });
        sentences =sentences2


        function cleanSentences(_sentences) {
            var sentencesCleaned = [];
            $.each(_sentences, function modifySentenceForNewLines(k,sentence) {
                sentence = sentence.trim();
                if ( sentence == '' || sentence == null )
                    return;
                sentencesCleaned.push(sentence)
            });
            return sentencesCleaned;
        }
        sentences2 = cleanSentences(sentences2);

        self.lookFor = sentences;
        self.timePerWord = 200
        self.rate = 300;
        self.rate = 350;
        //var sentences = self.el.html().split('.');
        //self.lookFor = sentences;


        //var words = txt.split(' ');
        //self.lookFor = words;
        var newSentences = [];
        $.each(sentences, function breakDownMore(i,sentence) {
            var words = sentence.split(' ');
            var count = 0;
            var newSent = [];
            for ( var i = 0; i < words.length; i ++ ) {
                /*if ( i % 5 == 0 ) {
                 sentNew.push( words.slice(0,5).join(' ') )
                 words = words.slice(6)
                 }*/
                var word = words[i]
                var y = word.replaceX("\n", "")
                word = word.replace("\n", '')
                if ( word == "\n")
                    continue;
                if ( word.trim() == '')
                    continue;
                newSent.push(word)
                count++
                if ( count == 5 ) {
                    newSentences.push( newSent.join(' ') )
                    newSent = [];
                    count = 0
                };

            }
            if ( newSent.length > 0 ) {
                newSentences.push( newSent.join(' ') )
            }
        })


        //back to sentences

        var newSentences = txt.match( /[^\.!\?]+[\.!\?]+/g );
        //sentences with whitespace after
        // newSentences = txt.replace(/([.?!\n\r])\s*(?=[A-Z])/gi, "$1|").split("|")

        var txtTransformed =  txt.replace(/(?:\r\n|\r|\n)/g, '|');
        txtTransformed =  txt.replace(/[\W+](?:\r\n|\r|\n)/gi, '|');

        txtTransformed = txtTransformed.replace(/([.?!])\s*(?=[A-Z])/gi, "$1|")
        newSentences =  txtTransformed.split("|");

        self.index = 0;
        self.lookFor = newSentences;
        self.lookFor = sentences2;
        self.lookFor = self.sentences;
        self.lookForAll = self.lookFor.concat();
        self.goEach();
        window.speakText = txt;
        console.log('starting...', newSentences.length ) //, newSentences)
    }

    p.back = function onBack() {
        self.index -= 5
        if ( self.index < 0 ) { self.index = 0 };
        self.lookFor = self.lookForAll.slice( self.index)
        self.state();
    }

    p.forward = function onNext() {
        self.index += 5
        if ( self.index < 0 ) { self.index = 0 };
        self.lookFor = self.lookForAll.slice( self.index)
        self.state();
    }

    p.restart = function onRestart() {
        self.index  = 0
        self.lookFor = self.lookForAll.concat();
        self.state();
        self.play();
    }

    p.play = function play() {
        self.pause = false
        self.goEach();
    }

    p.pause = function pause() {
        self.pause = true
        $('html,body').clearQueue();
        $('html,body').stop();
    }

    p.setRate = function setRate(rate) {
        self.timePerWord =1000* 1/(rate*1/60);
        self.rate = rate;
        console.log(self.timePerWord, rate)
    }

    p.state = function state() {
        console.log('... ', self.index, self.lookFor)
    }

    p.goEach = function () {
        if ( self.lookFor.length == 0 ) {
            console.log('done', 'or empty [] sentences')
            return;
        }
        if (  self.pause == true ) {
            console.log('paused')
            return;
        }
        self.index ++
        var sentence = self.lookFor.shift()

        //var html = self.el.html()
        //if ( self.lastReplacement != null ) {
        //    html = html.replaceX(self.lastReplacement[1], self.lastReplacement[0]);
        //}
        var rep = "<span class='smallcaps'>"+sentence+"</span>"
        self.lastReplacement = [sentence, rep];
        //html = html.replaceX(self.lastReplacement[0], self.lastReplacement[1]);
        //self.el.html(html)
        self.el.html(self.el.html().replaceX('<span class="smallcaps">','<span>'))
        self.el.wrapInTag({"words" : [sentence], tag:'span'});

        var target = $('.smallcaps');
        if (target.length) {
            $('html,body').clearQueue();
            $('html,body').stop();
            $('html,body').animate({
                scrollTop: target.offset().top-200
            }, 500);
            //return false;
        }
//return;
        console.log('update', sentence, self.lookFor.length)
        if ( self.testMode == true ) {
            setTimeout(self.goEach, self.timePerWord * sentence.split().length);
        } else {
            var curId = self.currentId;

            if ( self.rate == null ) {
                self.rate  = $('#inputRate').val()
            }

            if ( self.voice == null ) {
                self.voice =  'IVONA 2 Brian'
            }

            //var rate = 7
            var voice = null;
            if ( voice == null ) {
                voice = 'IVONA 2 Emma';
                voice = 'IVONA 2 Brian';
                voice = self.voice;
            }
            // debugger
            console.log('trim',  sentence.trim().endsWith('reply'), sentence)
            if (  sentence.trim().endsWith('reply') ) {
                if ( self.voice == 'IVONA 2 Brian' ) {
                    //self.voice = 'IVONA 2 Joey'
                    self.voice = 'IVONA 2 Emma';
                } else{
                    self.voice = 'IVONA 2 Brian'
                }
               // voice = self.voice
                sentence = sentence.trim().slice(-5)
                sentence += 'end comment.'
            }
            //self.voice = voice;
            var speakOnce = false
            var date = new Date();
            $.ajax({
                url: "http://localhost:4444/say",
                data: {
                    text:sentence,
                    rate:self.rate,
                    playAudio:true,
                    volume:25,
                    voice:voice,
                    speakOnce:speakOnce,
                    //voice:'IVONA 2 Gwyneth'
                },
                type:'post',
                success: function(result){
                    if ( curId != self.currentId ) {
                        return;
                    }

                    var endDate = new Date();
                    console.log('total time', (endDate.getTime()-date.getTime())/1000);
                    self.goEach();
                }
            });





            return;
            $.ajax({
                url: "https://local.helloworld3000.com:4444/say",
                data:{text:sentence,
                    rate:self.rate},
                success: function f(d){
                    if ( curId != self.currentId ) {
                        return;
                    }
                    self.goEach();
                },
                dataType: "text"
            }).done(function( html ) {
                //console.log('d', html)
            });;
        }

    }

    // http://stackoverflow.com/a/9795091
    $.fn.wrapInTag = function (opts) {
        // http://stackoverflow.com/a/1646618
        function getText(obj) {
            return obj.textContent ? obj.textContent : obj.innerText;
        }

        var tag = opts.tag || 'strong'
        var    words = opts.words || []
        try {
            var regex = RegExp(words.join('|'), 'gi')
        } catch ( e ) {}
        var  replacement = '<' + tag + ' class="smallcaps" >$&</' + tag + '>';

        // http://stackoverflow.com/a/298758
        $(this).contents().each(function () {
            if (this.nodeType === 3) //Node.TEXT_NODE
            {
                try {
                    // http://stackoverflow.com/a/7698745
                    $(this).replaceWith(getText(this).replace(regex, replacement));
                } catch ( e ) {}
            }
            else if (!opts.ignoreChildNodes) {
                $(this).wrapInTag(opts);
            }
        });
    };


    p.getSentencesFromSelectedElement = function getSentencesFromSelectedElement() {
        var filtered = [];
        var _children = $(self.sel).children();
        var skipTypes =['blockquote', 'a', 'figure', 'img']


        var filtered2 = $(self.sel).find('*').filter(
            function(index) {
                var isLeaf = $(this).children().length === 0;
                return isLeaf;
            }
        );

        //clone
        var clone = $($(self.sel).clone())
        var clonePre = $(clone.clone())
        var cloneChildren = clone.find('*');
        var i = 0;
        var filtered3 = $(self.sel).find('*').filter(
            function stripOutLinks (index) {
                i++;
                var isValidText= false;
                var ui  = $(this);
                var tagName = ui.get(0).tagName.toLowerCase();
                var parentTagName = $(ui.parent()).get(0).tagName.toLowerCase();
                if ( skipTypes.indexOf(parentTagName) == -1 &&
                    skipTypes.indexOf(tagName) == -1 ) {
                    isValidText = true;
                    // console.log(tagName, ui, ui.text())
                } else {
                    if ( tagName == "a") {
                        if ( ui.children().length === 0 )
                            return isValidText;
                    }
                    ui.css({'background-color':'green'});
                    var removeChild = $(cloneChildren[i]);
                    removeChild.remove();
                }
                // var isLeaf = ui.children().length === 0;
                return isValidText;
            }
        );


        console.log('clone text', clone.text().length, clonePre.text()==clone.text());


        self.splitStringIntoSentences( clone.text() );

        debugger

        console.log('...')
        return filtered3;


        $.each(_children, function stripOutLinks(k,ui) {
            ui = $(ui);
            if ( skipTypes.indexOf(ui.get(0).tagName.toLowerCase()) != -1 ) {
                filtered.push(ui)
            } else {
                ui.css({'background-color':'green'});
            }
        });


        console.log('...')
        return filtered;

    }
    p.splitStringIntoSentences = function splitStringIntoSentences(str, clone) {

        //var txt = el.text();
        var sentences = str.split('. ');
        var sentences2 = [];
        $.each(sentences, function modifySentenceForNewLines(k,sentence) {
            var newSentences = sentence.split("\n");
            //sentences2 = sentences2.concat(newSentences)
            $.each(newSentences, function modifySentenceForNewLines(k,sentence) {
                sentence = sentence.trim();
                if ( sentence == '' || sentence == null )
                    return;
                sentences2.push(sentence)
            });
        });

        sentences = sentences2;
        self.sentences = sentences;
        return sentences;

    }

    var utils = {};
    utils.selectElementText = function selectElementText(el, win) {
        win = win || window;
        var doc = win.document, sel, range;
        if (win.getSelection && doc.createRange) {
            sel = win.getSelection();
            range = doc.createRange();
            range.selectNodeContents(el);
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (doc.body.createTextRange) {
            range = doc.body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }
    }

    self.utils = utils;

    $('iframe[notKeep!="true"]').remove();
    //$('iframe').remove();
}




function doReady () {

    console.log( "ready...!" );
    //t.start('#story', 4)
    $('#btnStart').click(function(event) {


    })


    if (  $('#voc_startOnSelection').length == 0 ) {
        console.log('try again...')
        setTimeout(doReady, 300)
        return;
    }

    $('#voc_startOnSelection').click(t.startOnSel)
    $('#doSel').change(changeEnabled);

    function changeEnabled(event) {
        t.enabled = this.checked;
        console.log('on',  t.enabled, this.checked, $('#doSel').val());
        //debugger
        localStorage.setItem('reader_Enabled', t.enabled );
        console.log( 'value',
            localStorage.getItem('reader_Enabled'),
            localStorage.getItem('reader_Enabled')==true,
            localStorage.getItem('reader_Enabled')=='true'
        )
    }
    //changeEnabled();


    $('#voc_btnBack').click(t.back)
    $('#voc_btnFor').click(t.forward)
    $('#voc_btnRestart').click(t.restart)
    $('#voc_btnPlay').click(t.play)
    $('#voc_btnPause').click(t.pause)
    $('#inputRate').change(function onChanged(event) {
        var val = $(event.target).val()
        console.log('changed', $(event.target).val() );
        t.setRate(val)
    });



    $('html').click(function(event) {
        //Hide the menus if visible
        // console.log('click it',event)

        //console.log('clicked',  $('#doSel')[0].checked)

        if ( t.enabled == false ) {
            // console.log('not enabled')
            return;
        }
        console.log('starting selection')
        var tar = $(event.target)
        var ancestor = $(tar).closest("article");
//if parent is control box
        if (tar.parents('.container-controls').length) {
            return;
        }


        t.utils.selectElementText(event.target);


        var p = tar.parent();

        t.sel = t.sel2;
        t.sel2 = p





        t.utils.selectElementText(event.target.parentNode);
        var y = p.children()
        $.each(y, function (i, j ) {
            //  console.log(j);
            // selectElementText(j);
        })

        //console.log('SetSelection to', 'click for sel', tar, tar.text(),  t.sel,  t.sel2);

        //t.sel = tar; //override existing code
        t.sel = event.target.parentNode; // 7/10/2016 - upgrade parent node
        console.log('SetSelection to', 'click for sel', tar, 'text length',  tar.text().length,  t.sel,  t.sel2);
        //console.log('click', tar, tar.text());


        var yyy = t.getSentencesFromSelectedElement();

    });


    function loadStorage() {
        // false;
        t.enabled = localStorage.getItem('reader_Enabled')=="true"
        $('#doSel')[0].checked = t.enabled;
        console.log('storage', t.enabled, $('#doSel')[0].checked,
            localStorage.getItem('reader_Enabled'), $('#doSel')[0].checked )


    }

    loadStorage();

    console.log( "ready!" );
};

/*
 if ( $.isReady ) {
 setTimeout(function () {
 console.log( "ready!" );
 // doReady();
 }, 5);
 }*/



if ( self == top ) {
    t = new tX();
    String.prototype.replaceX = function replace( find, replaceWith) {
        function escapeRegExp(string) {
            if ( string == null )
                return null;
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }


        // So in order to make the replaceAll function above safer, it could be modified to the following if you also include escapeRegExp:

        // function replaceAll(string, find, replace) {
        if ( this == null )
            return null;
        if ( this.replace == null )
            return null;
        return this.replace(new RegExp(escapeRegExp(find), 'g'), replaceWith);
    }
    console.log( "readys!", self!==top );
    $( document ).ready( doReady ) ;
}
