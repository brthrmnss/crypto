/**
 * Created by user on 8/2/15.
 */

/**
 * This is a mini server, that allows users to
 * append to notes
 *
 * Expects everest to be running.
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var express = require('express');
var config = global.config;

var express = require("express");
var app = express();

var bodyParser = require('body-parser');





app.use(bodyParser());


/**
 * Created by user on 7/30/15.
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
var enml = require('enml-js')
var c = enml.ENMLOfPlainText('broom')


var utils = {};
utils.replaceNewline = function (txt) {
    var txt2 = txt.replace(/(\r\n|\n|\r)/gm, '<br clear="none" />');
    return txt2;
}


function EvernoteHelperware() {
    var p = EvernoteHelperware.prototype;
    p = this;
    var self = this;

    //specify url of everest folder
    var baseUrl = 'http://127.0.0.1:8081';

    //create urls
    var t = EasyRemoteTester.create('Test evernote basics',{});
    t.settings.baseUrl = baseUrl;
    var urls = {};
    urls.notes = {};
    urls.reload = t.utils.createTestingUrl('reload');
    urls.notes.list = t.utils.createTestingUrl('notes');
    urls.notes.update = t.utils.createTestingUrl('notes');
    urls.notes.get = t.utils.createTestingUrl('notes');

    /**
     * Setup middleware and routes
     * @param url
     * @param appCode
     */
    p.start = function start(url, appCode) {
        //Add middleware for cross domains
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.post('/append_named', self.appendNoteNamed);
        app.get('/notes', self.getRecentNotes)
        self.setupSession();

        app.listen(5556)
    }

    self.setupSession = function setupSession() {
        var t = EasyRemoteTester.create('Test evernote basics',{});
        var data = {};

        t.settings.baseUrl = baseUrl;


        t.add(function reload() {
                t.quickRequest( urls.reload,
                    'get', onResult )
                function onResult(body) {
                    // console.log('body', body)
                    t.assert(body.id>0, 'did not find a user ');
                    t.cb();
                    self.test();
                }
            }
        );
    }

    function defineRoutes() {
        self.appendNoteNamed = function appendNoteNamed( req, res ) {

            var baseUrl = 'http://127.0.0.1:8081';
            var t = EasyRemoteTester.create('Test evenote basics',{});
            var data = {};

            t.settings.baseUrl = baseUrl


            var noteName = req.body.name
            var noteGuid = req.body.guid;
            if ( req.body.title != null ) {
                var noteName = req.body.title
            }
            //quote the note name .... searches will take the whole name into consideration

            var orCreate = req.body.orCreate == 'true' || req.body.orCreate == true
            var newContents = req.body.newContents;

            var clearNote = req.body.clearNote == 'true' || req.body.clearNote == true
            var getContentsOnly = req.body.getContentsOnly == 'true' || req.body.getContentsOnly == true

            var plainMode = false; //

            function truthy(val ) {
                return  val == 'true' || val == true;
            };

            var jsonMode = truthy(req.body.jsonMode);
            var jsonOnly1 =  truthy(req.body.jsonOnly1);
            var json = req.body.json;
            var flatJSONRep = req.body.flat;
            flatJSONRep = sh.dv(flatJSONRep, '');
            if ( json != null && jsonMode == null ) {
                throw 'need json mode'
            }

            var jsonStarter = '' + '<div> _' + noteName
            var jsonEnder = noteName + '_ </div>' +'';


            var ennoteBlank = '<en-note style="word-wrap: break-word; -webkit-nbsp-mode: space; -webkit-line-break: after-white-space;"/>';
            var ennoteStarter = '<en-note style="word-wrap: break-word; -webkit-nbsp-mode: space; -webkit-line-break: after-white-space;">';
            var ennoteClosingTag = '</en-note>';

            var br = '<br clear="none" />';

            data.note = {};

            data.newNote = false

            var noteReplaceContentsWith = null;

            function createNewNote() {
                data.newNote = true
                var newNote = {};
                newNote.title = noteName;
                newNote.content =
                    enml.ENMLOfPlainText('');

                t.quickRequest(urls.notes.get,
                    'post', result, newNote)
                function result(body) {
                    data.note.guid = body.guid;
                    data.note = body;
                    // console.log('new note ....', body)

                    t.cb();
                }
            }

            t.add(function reload() {
                    t.quickRequest( urls.reload,
                        'get', onResult )
                    function onResult(body) {
                        // console.log('body', body)
                        t.assert(body.id>0, 'post-verify did not let me do a search');
                        t.cb();
                    }
                }
            );


            t.add(function onSearchNote() {
                    //console.log('\n')
                    //asdf.g
                    var query = {};
                    //noteName = "mp: logger: requests"

                    query.words = sh.qq(noteName);
                    if ( noteGuid == null ) {
                        t.quickRequest(urls.notes.get,
                            'get', result, query)
                    } else {
                       // t.quickRequest(urls.notes.get+'/?guid' + noteGuid,
                         t.quickRequest(urls.notes.get+'/' + noteGuid,
                            'get', result, null)
                    }
                    function result(body) {
                        //console.log('search', body)

                        console.log('notes from search', query.words, body.totalNotes)
                        if ( body.totalNotes == 0 ) {
                            if ( noteGuid != null ) {
                                res.send('note not found....')
                                return;
                            }
                            t.addNext( createNewNote )
                            t.cb()
                        } else
                        {
                            if ( body.guid == null && body.totalNotes == null ) {
                                throw 'what type of request is this?'
                            }
                            if ( body.guid != null ) {
                                data.note = body
                            } else {

                                data.note = body.notes[0]//.guid
                            }
                            t.cb();
                        }
                    }
                }
            );


            function openNote(contents, newContents, openOnly ) {
                var noteContent = contents
                //replace any new lines
                if ( newContents ) {
                    newContents = newContents.replace(/(\r\n|\n|\r)/gm, '<br clear="none" />');
                };
                //open note, remove ending tag
                var closingTag = '</en-note>';
                if ( data.note.content.indexOf(closingTag) != -1 ) {
                    noteContent = data.note.content.replace(closingTag, '');
                };
                if ( newContents ) {
                    //append new contents
                    noteContent += newContents;
                }

                if ( openOnly != true ) {
                    //close note
                    noteContent += closingTag;
                }
                return noteCotent
            }
            t.add(function onGetFirstNote() {
                    t.quickRequest(urls.notes.get + '/' + data.note.guid,
                        'get', result, {})
                    function result(body) {
                        data.note.content = body.content;

                        if ( jsonMode == true ) {
                            var jsonRet = {};

                            if ( json != null ) {
                                var jsonS = json ; //json.split('"').join('\\"');
                                newContents = //
                                    jsonStarter +
                                        flatJSONRep +
                                    jsonS +
                                    jsonEnder //+ br
                            }
                            if (data.note.content.indexOf(jsonStarter) != -1) {

                                data.topHalf = data.note.content.split(jsonStarter)[0];
                                data.bottomHalf = data.note.content.split(jsonEnder)[1];
                                //console.log(data.note.content);
                                data.json = data.note.content.split(jsonStarter)[1];
                                data.json = data.json.split(jsonEnder)[0];

                                if ( jsonOnly1 ) {
                                    newContents =  data.topHalf  +
                                        newContents +
                                        data.bottomHalf;
                                    noteReplaceContentsWith = newContents;
                                }


                                jsonRet = JSON.parse(data.json);
                                //turn;
                                //asdf.g
                            }else {
                                if ( jsonOnly1 ) {
                                    //var starter = '<en-note style="word-wrap: break-word; -webkit-nbsp-mode: space; -webkit-line-break: after-white-space;"/> '
                                  //  newContents = starter + newContents;
                                    //noteReplaceContentsWith = newContents;
                                }
                            }

                        } else {
                            //get data only ...
                            var noteContent = body.content;
                            var text = noteContent
                            text = text.replace(/(<\/(div|ui|li)>)/ig,"\n");
                            text = text.replace(/(<(li)>)/ig,"\n");
                            text = sh.replace(text, '<br clear="none" />',"\n");
                            text = text.replace(/(<([^>]+)>)/ig,"");
                            text = text.replace(/(\r\n|\n|\r)/gm,"\n");
                            //text = text.replace(/(\s+)/gm," ");

                            sh.str.replaceStringsFromString = function replaceStringsFromString(strs, str) {
                                var newStr = str;
                                sh.each(strs, function removeFromStr(i,str){
                                    newStr = sh.replace(newStr, str, '');
                                })
                                return newStr
                            }
                            text = sh.str.replaceStringsFromString(  [ennoteClosingTag, ennoteBlank, ennoteStarter], text);
                        }

                        if ( getContentsOnly ) {
                            var ret = {status: 'ok',
                                note:data.newNote,
                                newNote:data.newNote,
                                data:text,
                                content: data.note.content,
                                guid: data.note.guid };
                            if ( jsonMode == true ) {
                                ret.json  = jsonRet
                            }
                            res.send(ret);
                            return;
                        }

                        t.cb();
                    }
                }
            );

            t.add(function onUpdateFirstNode() {

                    var origNoteContent = data.note.content;
                    if ( plainMode ) {
                        data.note.content =
                            enml.PlainTextOfENML(data.note.content);
                        var cleanedContents = data.note.content
                        if ( clearNote ) {
                            data.note.content = '';
                            newContents = '';
                        }
                        if ( newContents ) {
                            newContents = newContents.replace(/(\r\n|\n|\r)/gm, br);
                        };

                        data.note.content = data.note.content + newContents;
                        data.note.content = enml.ENMLOfPlainText(data.note.content);
                    } else {
                        var noteContent = '';

                        //make a blank note
                        if ( clearNote ) {
                            data.note.content = enml.ENMLOfPlainText('');
                            newContents = '';
                        };

                        //replace any new lines
                        if ( newContents ) {
                            newContents = newContents.replace(/(\r\n|\n|\r)/gm, '<br clear="none" />');
                        };
                        //open note, remove ending tag
                        var closingTag = '</en-note>';
                        if ( data.note.content.indexOf(closingTag) != -1 ) {
                            noteContent = data.note.content.replace(closingTag, '');
                        };
                        var closeSingleTag = 'after-white-space;"/>'
                        if ( data.note.content.indexOf(closeSingleTag) != -1 ) {
                            noteContent = data.note.content.replace(closeSingleTag, 'after-white-space;">');
                        }
                        //append new contents
                        noteContent += newContents;
                        //close note
                        noteContent += closingTag;
                        if ( noteReplaceContentsWith ) {
                            noteContent = noteReplaceContentsWith;
                        }
                        data.note.content = noteContent;
                    };

                    console.log('clearNote', clearNote,sh.n,origNoteContent,sh.n,
                        data.note.content   );

                    t.quickRequest(urls.notes.get + '/' + data.note.guid,
                        'post', result, data.note)
                    function result(body) {
                        console.log('body', body)
                        if ( body.errorCode != null )  {
                            console.error('content was...')
                            res.status(401);
                            res.send(body);
                            return;
                        }
                        t.cb();
                        res.send({status: 'ok',
                            noteName:noteName,
                            note:data.newNote,
                            newNote:data.newNote,
                            content: data.note.content,
                            guid: data.note.guid });
                    }
                }
            );


        }

        self.getRecentNotes = function getRecentNotes(req, res ) {
            var query = '';
            t.quickRequest( urls.notes.get ,
                'get', result,  query )
            function result(body) {
                res.json(body);
            }
        }


    }
    defineRoutes();

    p.test = function test() {
        var baseUrl = 'http://127.0.0.1:5556'
        var t = EasyRemoteTester.create('Test evenote basics',{showBody:false});
        var data = {};
        t.settings.baseUrl = baseUrl
        var urls = {};
        urls.notes = {};
        urls.append_named = t.utils.createTestingUrl('append_named')
        urls.notes.append_named = t.utils.createTestingUrl('append_named')
        urls.notes.list = t.utils.createTestingUrl('notes')
        urls.notes.update = t.utils.createTestingUrl('notes')
        urls.notes.get = t.utils.createTestingUrl('notes')
        urls.notes.appendNote = t.utils.createTestingUrl('appendNote')


        var blankNote = enml.ENMLOfPlainText('');
        var note2Name = 'test_note_y_8'
        var note1Name = 'test_99'


        var t2 = t.clone('test recent notes');
        t2.getR(urls.notes.get).with({}).bodyHas('notes').notEmpty().storeHere('notes', 'notes').and();


        function defineTestAppendNote() {

            //clear note
            //append and verify

            //var t2 = t.clone('test append to note');

            //var guid = t2.data.notes[0].guid;
            var guid = null;
            var noteName = 'asdftest node';
            t2.postR(urls.append_named).with({name:noteName, guid:guid, getContentsOnly:true})
                .bodyHas('content').storeHere('guid', 'guid');

            /*var guid = t2.data.notes[0].guid;
            t2.getR(urls.notes.append_named).with({name:noteName, guid:t2.data.note.guid, getContentsOnly:true})
                .bodyHas('contents').storeHere('note')

            eq(blankNote);*/
            t2.add(function clearNote1() {
                var req = {}
                req.newContents = '\ntester'
                //req.name = noteName
                req.clearNote = true;
                req.guid = t2.data.guid;
                console.log('guid', guid)
                //asdf.g
                t.quickRequest( urls.append_named,
                    'post', onResult, req )
                function onResult(body) {
                   t2.cb();
                    //console.log('body', body)
                    return true; //should continue
                }
            })

            var newContent = '"what is this"';
            t2.postR(urls.append_named).with({guid:guid, newContents:newContent}, function(req){
                req.guid = t2.data.guid
            })
                .bodyHas('content').includes(newContent).showBody();


        }

        t2.addSync(defineTestAppendNote)
        return;

        function append2Note1() {
            var req = {}
            req.newContents = '\ntester'
            req.name = 'test_99'
            //req.clearNote = true;
            t.quickRequest( urls.append_named,
                'post', onResult, req )
            function onResult(body) {
                // t.assert(body.id>0, 'post-verify did not let me do a search');
                t.cb();
            }
        };

        function clearNote1() {
            var req = {}
            req.newContents = '\ntester'
            req.name = 'test_99'
            req.clearNote = true;
            t.quickRequest( urls.append_named,
                'post', onResult, req )
            function onResult(body) {
                // t.assert(body.id>0, 'post-verify did not let me do a search');
                t.cb();
            }
        }




        function checkNoteContentsFor(noteName, content ) {
            return function append_Note() {
                var req = {}
                req.name = noteName
                req.getContentsOnly = true
                //req.clearNote = true;
                t.quickRequest(urls.append_named,
                    'post', onResult, req)
                function onResult(body) {
                    t.assert(body.content.indexOf(content) != -1,
                        'did not find content in contents ');
                    t.cb();
                }
            };
        }

        function append2NoteGen(noteName, content ) {
            return function append_Note() {
                var req = {}
                req.newContents = content
                req.name = noteName
                //req.clearNote = true;
                t.quickRequest(urls.append_named,
                    'post', onResult, req)
                function onResult(body) {
                    var convertedContent = utils.replaceNewline(content)
                    t.assert(body.content != null,
                        'did not append ' + JSON.stringify(body, "\t", "\t") );
                    console.log(body.content.indexOf(convertedContent), '--->');

                    t.assert(body.content.indexOf(convertedContent) != -1,
                        'did not append ' + convertedContent + ' to: '  + body.content);
                    t.cb();
                }
            };
        }

        function clearNoteGen(noteName) {
            return function clearNote() {
                var req = {}
                req.name = noteName
                req.clearNote = true;
                t.quickRequest(urls.append_named,
                    'post', onResult, req)
                function onResult(body) {
                    t.assert(body.content = blankNote, 'did not clear body');
                    t.cb();
                }
            }
        }

        /*
         t.add( clearNote1 );
         t.add( append2Note1 );
         t.add( clearNoteGen(    note2Name) );
         t.add( append2NoteGen(  note2Name, 'yyyy\n') );
         t.add( append2NoteGen(  note2Name, 'uuuW\n') );
         t.add( checkNoteContentsFor(  note1Name, 'tester') );
         */


        function testJSON() {
            function getJSONNote(noteName, content, json) {
                return function append_Note() {
                    var req = {}
                    req.name = noteName
                    req.getContentsOnly = true
                    req.jsonMode = true;
                    t.quickRequest(urls.append_named,
                        'post', onResult, req)
                    function onResult(body) {
                        if ( content != null ) {
                            t.assert(body.content.indexOf(content) != -1,
                                'did not find content in contents ');
                        }
                        t.assert(body.json != null,
                            'did not get json ');

                        if ( json != null ) {
                            sh.each ( json, function checkProp(prop, val) {
                                t.assert( json[prop] == val , 'props not matching');
                            })
                        }
                        t.cb();
                    }
                };
            }
            function saveJSONNote(noteName, json) {
                return function append_Note() {
                    var req = {}
                    req.name = noteName
                    //req.getContentsOnly = true
                    req.jsonMode = true;
                    req.jsonOnly1 = true;
                    req.json = JSON.stringify(json);
                    t.quickRequest(urls.append_named,
                        'post', onResult, req)
                    function onResult(body) {
                        var jsonS = req.json///.split('"').join('\\"')
                        if ( json != null ) {
                            console.log(body.content, jsonS);
                            t.assert(body.content.indexOf(jsonS) != -1,
                                'did not find content in contents ');
                        }
                        t.cb();
                    }
                };
            }
            function verifyJSON(noteName, json, oneInstance) {
                return function append_Note() {
                    var req = {}
                    req.name = noteName
                    req.getContentsOnly = true
                    req.jsonMode = true;
                    var jsonStarter = '' + '<div> _' + noteName
                    var jsonEnder = noteName + '_ </div>' +'';
                    //req.json= json
                    t.quickRequest(urls.append_named,
                        'post', onResult, req)
                    function onResult(body) {
                        /*if ( content != null ) {
                         t.assert(body.content.indexOf(content) != -1,
                         'did not find content in contents ');
                         }*/
                        console.log('content was', body.content)
                        t.assert(body.content.indexOf(jsonStarter) != -1,
                            'did not find content in contents ');
                        t.assert(body.content.indexOf(jsonEnder) != -1,
                            'did not find content in contents ');
                        t.assert(body.content.indexOf(JSON.stringify(json)) != -1,
                            'did not find content in contents ');

                        if ( oneInstance ) {
                            var startAt = body.content.indexOf(jsonStarter)
                            t.assert(body.content.indexOf(jsonStarter,startAt+1) == -1,
                                'more than 1 instance in file... ');
                            t.assert(body.content.split(jsonStarter).length == 2,
                                'more than 1 instance in file... ');
                        }

                        if ( json != null ) {
                            sh.each ( body.json, function checkProp(prop, val) {
                                t.assert( json[prop] == val , 'props not matching ' + prop + ' ' + val);
                            })
                        }
                        t.cb();
                    }
                };
            }
            var jsonNoteName = 'today_log_thing_json'
            var json = {}
            json.name = 'jain'
            //t.add(clearNoteGen(jsonNoteName));
            //get json
            t.add(getJSONNote(jsonNoteName));
            //save json
            t.add(saveJSONNote(jsonNoteName, json));
            //verify json
            t.add(verifyJSON(jsonNoteName, json));
            //do not change and retest
            //save json again
            t.add(saveJSONNote(jsonNoteName, json));
            //verify changes
            t.add(verifyJSON(jsonNoteName, json));

            json.x_tone='jasdfklj'
            //save json again
            t.add(saveJSONNote(jsonNoteName, json));
            //verify changes
            t.add(verifyJSON(jsonNoteName, json, true));


        }
        testJSON();
    }


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.EvernoteHelperware = EvernoteHelperware;

if (module.parent == null) {
    var e = new EvernoteHelperware()
    e.start();





}



