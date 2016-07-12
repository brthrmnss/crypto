/**
 * Created by user on 7/30/15.
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
var enml = require('enml-js')
var c = enml.ENMLOfPlainText('broom')



var baseUrl = 'http://127.0.0.1:8081'
var t = EasyRemoteTester.create('Test evenote basics',{});
var data = {};

t.settings.baseUrl = baseUrl

var urls = {};
urls.notes = {};
urls.reload = t.utils.createTestingUrl('reload')
urls.notes.list = t.utils.createTestingUrl('notes')
urls.notes.update = t.utils.createTestingUrl('notes')
urls.notes.get = t.utils.createTestingUrl('notes')
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

function basicTest() {
    t.add(function onListEvernote() {
            t.quickRequest(urls.notes.list,
                'get', result, {imdb_id: "tt101"})
            function result(body) {
                console.log('body', body)
                data.firstNote = body.notes[0];
                t.assert(body.startIndex == 0, 'did not get relevant results');
                t.cb();
            }
        }
    );

    t.add(function createNewNote() {
            var newNote = {};
            newNote.title = 'test note ....'
            newNote.content =
                enml.ENMLOfPlainText('');

            t.quickRequest(urls.notes.get,
                'post', result, newNote)
            function result(body) {
                console.log('new note ....', body)
               // t.cb();
            }
        }
    );

    t.add(function onGetFirstNode() {
            t.quickRequest(urls.notes.get + '/' + data.firstNote.guid,
                'get', result, {imdb_id: "tt101"})
            function result(body) {
                console.log('body', body.content)
                //   t.assert(body.startIndex==0, 'did not get relevant results');
                 t.cb();
            }
        }
    );

    t.add(function onUpdateFirstNode() {
            data.firstNote.content = 'ssss' + new Date().toDateString() //, false, true;
            data.firstNote.content =
                enml.ENMLOfPlainText(data.firstNote.content);
            t.quickRequest(urls.notes.get + '/' + data.firstNote.guid,
                'post', result, data.firstNote)
            function result(body) {
                console.log('body', body)
                //   t.assert(body.startIndex==0, 'did not get relevant results');
                t.cb();
            }
        }
    );

}
basicTest();

t.add(function onSearchNote() {
        console.log('\n')
        //asdf.g
        var query = {};
        query.words = 'sdfsdf'
        t.quickRequest( urls.notes.get ,//+ '/'+data.firstNote.guid,
            'get', result,  query )
        function result(body) {
            console.log('search', body)
            //   t.assert(body.startIndex==0, 'did not get relevant results');
            t.cb();
        }
    }
);


//login
//append to note
//appent to not if exists

//build helper ware
