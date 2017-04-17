var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
//where is mary?
//C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.1.2\marytts-5.1.2\bin

function SpeakerMaryTTS() {
    var p = SpeakerMaryTTS.prototype;
    p = this;
    var self = this;
    p.init = function init(url, appCode) {
    }

    p.test = function test() {
        var port = 59125
        var baseUrl = 'http://127.0.0.1:'+port
        var t = EasyRemoteTester.create('Test say basics',{showBody:false});
        var data = {};
        t.settings.baseUrl = baseUrl
        var urls = {};
        urls.notes = {};
        urls.say = t.utils.createTestingUrl('say')
        urls.process = t.utils.createTestingUrl('process')

        var maryXML =
            '<?xml version="1.0" encoding="UTF-8" ?> '+
            '<maryxml version="0.4" '+
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
            'xmlns="http://mary.dfki.de/2002/MaryXML" '+
            'xml:lang="en"> '+
            '    <prosody rate="+200%" pitch="+20%" range="-10%" volume="loud"> '+
            '    This is something you have to see! '+
            '    </prosody> '+
            '    </maryxml>'

        var req = {}
        //  req.INPUT_TEXT  = 'hello world'
        req.INPUT_TYPE= 'TEXT'
        req.OUTPUT_TYPE ='AUDIO'
        //req.OUTPUT_TYPE ='WORDS'
        //  req.INPUT_TEXT = 'Willkommen in der Welt der Sprach-synthese'
        req.INPUT_TEXT  = 'hello world, ddvwere are you'
        req.LOCALE  = 'en_US'
        req.AUDIO="WAVE_FILE"


        var maryXML2 = '<?xml version="1.0" encoding="UTF-8" ?> '+
            '<maryxml version="0.4" '+
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
            'xmlns="http://mary.dfki.de/2002/MaryXML" '+
            'xml:lang="en-US"> '+
            'Welcome<boundary breakindex="4"/>to the world of speech synthesis! '+
            '</maryxml>'


        var msg = '';
        msg = 'Welcome to the world of speech synthesis!';
        msg = ' '+
                'Willkommen'

        var maryXML=[ '<?xml version="1.0" encoding="UTF-8"?>',
            '<maryxml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://mary.dfki.de/2002/MaryXML" version="0.4" xml:lang="en-US">',
            '<p>',
            '<prosody rate="150%">'+msg+'</prosody>',
            '</p>',
            '</maryxml>']

        maryXML = maryXML.join(' \n')

        console.log('mary', maryXML)

        //request raw xml
        var req = {}
        //  req.INPUT_TEXT  = 'hello world'
        req.INPUT_TYPE= 'RAWMARYXML'
        req.OUTPUT_TYPE ='AUDIO'
       // req.OUTPUT_TYPE ='WORDS'
        //  req.INPUT_TEXT = 'Willkommen in der Welt der Sprach-synthese'
        req.INPUT_TEXT  = maryXML
        req.INPUT_TEXT  = maryXML
        req.LOCALE  = 'en_US'
        req.AUDIO="WAVE_FILE"

        // req.AUDIO_OUT= "WAVE_FILE"
        // req.VOICE='bits3'
        var t2 = t.clone('test a few voices notes');
        t2.getR(urls.process).with(req)
            .addFx(function onResult(asdf, resp) {
                if ( resp.statusCode != 200 ) {
                    // console.error('result', asdf)
                    console.error(asdf.toString());
                    //  console.error(asdf.toString('utf8'));
                    return
                }
                sh.writeFile('sample.wav', asdf, false, true)
                return;
                sh.writeFile('x2.wav', asdf, false, false)
                var fs = require('fs')
                fs.writeFileSync('sample.wav',  asdf);
            })
            .fxFail(function onFault(e){
                console.error(e)
            })

        //.bodyHas('status').notEmpty()
        //t2.getR(urls.say).with({text:'test', rate:20}).bodyHas('status').notEmpty()
        // t2.getR(urls.say).with({text:'test', rate:350}).bodyHas('status').notEmpty()
        //t2.getR(urls.say).with({text:'voice', voice:'Heather'}).bodyHas('status').notEmpty()
        return;

    }


    p.speak = function speak(txt, saveSpeak) {

    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.SpeakerMaryTTS = SpeakerMaryTTS;

if (module.parent == null) {

    var s = new SpeakerMaryTTS();
    s.init()
    s.test()
}



