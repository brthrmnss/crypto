
function defineQuickSpeak() {
    function QuickSpeaker() {

        var self = this;
        var p = this;

        p.init = function init() {

        }

        p.speak = function speak(text, fx, cfg) {
            if (text.text != null) {
                cfg = text;
            }
            if (cfg == null) {
                cfg = {}
                cfg.text = text;

            }
            cfg.fx = fx;
            if (cfg.rate == null) {
                cfg.rate = $('#inputRate').val();
            }
            if (cfg.rate == null) {
                cfg.rate = 6
            }

            if (cfg.voice == null) {
                cfg.voice = 'IVONA 2 Brian';
            }

            cfg.text = cfg.text.trim();
            cfg.text = cfg.text.replace(/&nbsp;/gi, ' ');
            cfg.text = cfg.text.replace(/OMG/g, ' oh-my-god ');
            cfg.text = cfg.text.replace(/UX/gi, ' you-eye ');
            cfg.text = cfg.text.replace(/UI/gi, ' you-x ');


            if (cfg.text ==
                'Continue reading the main story') {
                cfg.text = '';
            }


            if (cfg.text == 'ADVERTISEMENT') {
                cfg.text = '';
            }


            if (cfg.text == 'Photo') {
                cfg.text = '';
            }


            var desired = cfg.text.replace(/[^\w\s]/gi, '')
            if (desired.length == 0) {
                console.warn('no readable rhcaractesr', cfg.text)
                if (cfg.fx) cfg.fx();
                return;
            }

            function isUpperCase(str) {
                return str === str.toUpperCase();
            }

            if (isUpperCase(cfg.text)) {
                var brokenStr = '';
                for (var i = 0, len = cfg.text.length; i < len; i++) {
                    var char = (cfg.text[i]);
                    brokenStr += ' ' + char
                }
                cfg.text = brokenStr
            }


            cfg.text = window.convertWords(cfg.text)

            console.log('speak:', 'trim', cfg.text.trim().endsWith('reply'), cfg.text)
            var speakOnce = false
            var date = new Date();

            cfg.text = cfg.text.replace('->', ' refers to ');

            $.ajax({
                url: "http://localhost:4444/say",
                data: {
                    text: cfg.text,
                    rate: cfg.rate,
                    playAudio: true,
                    volume: 25,
                    voice: cfg.voice,
                },
                type: 'post',
                type: 'get',
                success: function (result) {
                    var endDate = new Date();
                    console.log('total time',
                        (endDate.getTime() - date.getTime()) / 1000);
                    if (cfg.fx) cfg.fx()
                }
            });


        }

        p.convertWords = function convertWords(text){
            text = text.trim();
            text = text.replace(/&nbsp;/gi,' ');
            text = text.replace(/OMG/g,' oh-my-god ');
            text = text.replace(/UX/gi,' you-eye ');
            text = text.replace(/UI/gi,' you-x ');
            text = text.replace(':(',' sad face ');
            text = text.replace(':)',' happy face ');

            function isUpperCase(str) {
                return str === str.toUpperCase();
            }

            var words = text.split(' ');
            var words2 = []
            $.each(words, function convertIF(k, word)  {
                if (isUpperCase(word)) {
                    console.debug('upper case word', word)
                    word = self.convertWordToAcrronym(word)
                    words2.push(word);
                    return;
                }
                var lastChar = word.slice(-1)[0]
                if ( $.isNumeric(lastChar)) {
                    word = self.convertWordToAcrronym(word)
                    words2.push(word);
                    return;
                }
                words2.push(word)
            })
            text = words2.join(' ')
            //  if ( text.toString().isUpperCase())

            if ( text ==
                'Continue reading the main story') {
                text = '';
            }


            if ( text == 'ADVERTISEMENT') {
                text = '';
            }


            if ( text == 'Photo') {
                text = '';
            }

            console.log('what is output', text)
            return text;
        }


        /*

         ps4 PSN PS4 UX UI OMG

         :(

         ps4...   PSN...   PS4 UX UI OMG

         :)

         P-S-N

         p-s-nn

         pe-ess-inn

         pe ess inn

         p.s.n

         */

        p.convertWordToAcrronym = function convertWordToAcrronym(word) {
            var brokenStr = '';
            for (var i = 0, len = word.length; i < len; i++) {
                var char = (word[i]);
                char = char.toLowerCase()
                if ( char == 'a') {
                    char = 'ayy'
                }
                if ( char == 'b') {
                    char = 'bee'
                }
                if ( char == 'c') {
                    char = 'see'
                }
                if ( char == 'p') {
                    char = 'pee'
                }
                if ( char == 's') {
                    char = 'ess'
                }
                if ( char == 'n') {
                    char = 'inn'
                }
                brokenStr += ' ' + char
            }
            brokenStr+='.'
            word = brokenStr;
            return brokenStr
        }

    }

    var o = new QuickSpeaker();
    window.speak = o.speak
    window.convertWords = o.convertWords;
    window.quickSpeaker = o;
}
defineQuickSpeak();
