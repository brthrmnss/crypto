/**
 * Created by user2 on 8/24/15.
 */
// window.x = 'yes'
var rtmpdump = require('rtmpdump');

var fs = require('fs');

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

setTimeout(function () {
    console.log('after 5 secs')
}, 4000)



function Emitter() {
    var self = this;
    self.methods = [];
    self.addListener = function addFxCallback(fx, eventType, associatedObject) {
        self.methods.push({fx:fx, eventType:eventType, obj:associatedObject});
    };
    self.removeAll = function removeAll( associatedObject) {
        var newMethodArray = [];
        sh.each(self.methods, function invokeAllMethods(i, config) {
            if ( config.obj == associatedObject) {
                return;
            }
            newMethodArray.push(config)
        });
        self.methods = newMethodArray;
    };
    self.send = function sendMessageToMethods(eventType, data) {
        sh.each(self.methods, function invokeAllMethods(i, config) {
            config.fx(data);
        });
    };
}
Emitter.new = function createNewEmitter() {
    return new Emitter();
}
rtmpdump.emitter = Emitter.new()
 rtmpdump.startStream = function () {

 }
rtmpdump.emitter.addListener( function onStartStreaming() {
    console.log('streaming....')
});

function testEmitter() {
    rtmpdump.emitter.addListener( function onStartStreaming(data) {
        console.log(1, 'streaming....', data);

        rtmpdump.emitter.removeAll('cnn')
        rtmpdump.emitter.addListener( function onStartStreaming(data) {
            console.log(2, 'streaming....2', data);
        })
        rtmpdump.emitter.send('startStreaming', 777)

    }, 'startStreaming', 'cnn');

    rtmpdump.emitter.send('startStreaming', 777)
}

testEmitter()
//return

function StartRTMPSplit(dir, urlStream, timeout, firstIteration) {


    /*setTimeout(function () {
        console.log('after 5 secs')
    }, 5000);*/


    var channel = urlStream.split('/').slice(-1)[0]
    /*
     process.on('uncaughtException', function (err) {
     console.log('swallow exepctiaon')
     console.log(err);
     ctrl.retrySwitch = true
     })
     */

    if ( timeout == undefined ) {
        timeout = 120;
    }
    //sh.fs.rmrf(dir);
    sh.makePathIfDoesNotExist(dir);
    var dirTemp = __dirname + '/' + 'temp/'; //store files before explode


    try {
        if ( firstIteration == true || firstIteration == null )
            sh.fs.rmrf(dirTemp);
    } catch ( e ) {
        console.log('cannot delete dirTemp')
    }
    sh.makePathIfDoesNotExist(dirTemp);
    var options = {
        rtmp: urlStream,
        timeout:timeout,
        //playpath: 'live',
        //pageUrl: 'http://host.tld/somepage.html',
        //swfVfy: 'http://host.tld/player.swf',
        v: null // parameter-less command line switches must have null as a value
    };

    var ctrl = {};

    var stream = rtmpdump.createStream(options);
    stream.name = 'start'
    ctrl.removeStream = function removeStream(stream) {
        stream.removeListener('progress', onProgress);
        stream.unpipe()
        stream.kill();
        setTimeout(function copyFile() {
            sh.copyFile2(dirTemp+ctrl.fileMoveToOld,dir+ctrl.fileMoveToOld,false, false, true);
        },500)

    };

    console.log('......');

    ctrl.stream = stream;

    stream.on('connected', function(info) {
        // info provides various details about the stream
        // duration, resolution, codecs, ...
        console.log(info);
    });

    ctrl.sentProgress = false;

    ctrl.lastSwitch = 0;
    ctrl.count = 1;

    var fileVideo = sh.getTimeStamp()+'video'+ctrl.count+'.flv'
    ctrl.fStream = fs.createWriteStream(dirTemp+fileVideo);
    ctrl.fileMoveTo = fileVideo;
    ctrl.streamReady = true; //first time do not switch     var videoFlipFudgeFactor = 0;

    var videoFlipFudgeFactor = 200;//500+200+500; //q: is flipping delay effectual?
    videoFlipFudgeFactor = 0;
    var splitEvery = 2000
    splitEvery = 500
    //splitEvery = 100
    splitEvery = 300
    //splitEvery = 4000;
    ctrl.unlinkOldStream_AfterDelay = false;
    ctrl.unlinkOldStream_WhenRtmpDumpGivesStatus = false;
    ctrl.unlinkOldStream_WhenMethodCalled = true;

    var verbose = false

    var split = true;
    var stopAfterxFiles = 4;

    ctrl.retrySwitch = false;

    stopAfterxFiles = 0;
    stream.on('progress', onProgress);

    function onProgress (kbytes, elapsed, percent) {
        var isCurrentStream = ctrl.stream == this;
        if ( ctrl.retrySwitch ) {
            // asdf.g
            console.log('retry')
            ctrl.retrySwitch = false;

            //old  stream becomes current
            var brokenfStream = ctrl.fStream;
            var brokenStream = ctrl.stream;
            //destroy stream
            brokenStream.unpipe(/*ctrl.fStreamOld*/);
            ctrl.removeStream(brokenStream);
            brokenfStream.end();
            brokenfStream.removeListener('progress', onProgress);

            //old stream is current
            ctrl.fStream = ctrl.fStreamOld;
            ctrl.stream = ctrl.streamOld;

            createNewStream();
            return;

            //ctrl.stream = ctrl.streamOld;
            ctrl.lastSwitch  = kbytes - splitEvery;
            isCurrentStream = true
        }
        if ( isCurrentStream == false ) {
            if ( verbose )
                console.log('on uncurrent stream',
                    '%s kbytes read, %s secs elapsed, %s%%',
                    kbytes, elapsed, percent,this.name, this==ctrl.stream);

            return;
        }
        kbytes = parseInt(kbytes);
        if (  ctrl.streamReady == false &&
            this == ctrl.stream &&  kbytes > 0+videoFlipFudgeFactor  ) {
            ctrl.sentProgress   = true;
            ctrl.streamReady    = true;
            if ( ctrl.unlinkOldStream_WhenRtmpDumpGivesStatus == false ) {
                unlinkOldStream();
            }

            console.log(this.name, 'ready', new Date())

            console.log('>>>>>>end time',  ctrl.time.getTime() - new Date().getTime() )
            ctrl.timeStart = new Date()
        }

        function unlinkOldStream() {
            ctrl.streamOld.unpipe(/*ctrl.fStreamOld*/);
            ctrl.removeStream(ctrl.streamOld);
            ctrl.fStreamOld.end();
            ctrl.fStreamOld.removeListener('progress', onProgress);
        }

/*

        rtmpdump.startStream = function onStartStreaming(streamId) {
            console.log('started streaming.... removing', channel, streamId)

            if ( streamId != channel ) {
                console.log('stream doesnt match channel', streamId)
                return;
            }


            if ( ctrl.unlinkOldStream_WhenMethodCalled ) {
                setTimeout(function x() {
                    unlinkOldStream();
                }, 20);
            }
        }
*/

        //if more than 1 second has past
        //you can see that the vids are working ...
        if ( parseInt(elapsed) > 0 ) {
            // ctrl.sentProgress = true
        }

        if ( split && kbytes > (splitEvery + ctrl.lastSwitch)  ) {
            console.log('switch',ctrl.count, ctrl.lastSwitch)
            ctrl.lastSwitch  = kbytes
            ctrl.count++;
            //stream.unpipe(ctrl.fStream );
            //ctrl.fStream.end()
            function createNewStream() {
                if( stopAfterxFiles > 0 && ctrl.count > stopAfterxFiles) {
                    process.exit();
                    return;
                }


                //return;
                //ctrl.stream.removeListener('progress', onProgress)
                //switch to alt stream;
                var newStream = rtmpdump.createStream(options);
                newStream.on('progress', onProgress)
                ctrl.streamOld = ctrl.stream;
                ctrl.stream = newStream;

                ctrl.streamReady = false;

                newStream.name  = 'Str '  + ctrl.count
                //return;

                var fileVideo = sh.getTimeStamp()+'video'+ctrl.count+'.flv'
                ctrl.fStreamOld = ctrl.fStream;
                ctrl.fStream = fs.createWriteStream(dirTemp+fileVideo);
                ctrl.fileMoveToOld = ctrl.fileMoveTo;
                ctrl.fileMoveTo = fileVideo;

                newStream.pipe(ctrl.fStream );
                console.log('creating a new stream',ctrl.count, ctrl.fileMoveTo, dirTemp+fileVideo)
                ctrl.lastSwitch = 0;

                ctrl.time = new Date()
                console.log('start time', ctrl.time)

                function addListenerForRTMPServerToEndStream() {
                    function onStartStreaming(streamId) {
                        rtmpdump.emitter.removeAll(channel)
                        console.log('started streaming.... removing', channel, streamId)

                        if ( streamId != channel ) {
                            console.log('stream doesnt match channel', streamId)
                            return;
                        }


                        if ( ctrl.unlinkOldStream_WhenMethodCalled ) {
                            setTimeout(function x() {
                                unlinkOldStream();
                            }, 20);
                        }
                    }
                    rtmpdump.emitter.addListener(onStartStreaming, 'startStreaming', channel);
                }
                addListenerForRTMPServerToEndStream();

                if ( ctrl.unlinkOldStream_AfterDelay ) {
                    //terminate old stream instantly
                    //unlinkOldStream();
                    //terminal old stream after 1 sec
                    setTimeout(function terminateLater() {
                        console.log('unklink')
                        unlinkOldStream();
                    }, 4190+200+100)
                }

            }

            createNewStream()
            /*ctrl.fStream.on('close', function () {
             console.log('...', 'close');
             createNewStream()
             })
             ctrl.fStream.on('end', function () {
             console.log('...', 'end');
             })*/
            //ctrl.fStream = fs.createWriteStream('vids/video'+ctrl.count+'.flv');
            // stream.pipe(ctrl.fStream );
            // ctrl.fStream = fs.createWriteStream('vids/video'+ctrl.count+'.flv');
            //stream.pipe(ctrl.fStream );
        }
        if ( verbose )
            console.log( '%s kbytes read, %s secs elapsed, %s%%', kbytes, elapsed, percent,this.name, this==ctrl.stream);
    }



    stream.on('error', function(err) {
        // as usual, unhandled error events will throw
        console.log(err);
        process.exit(1);
    });

    stream.pipe(ctrl.fStream );




}

exports.RTMPSplit = StartRTMPSplit


if ( module.parent == null ) {
    // StartRTMPSplit('../vids/', 'rtmp://10.211.55.4/live/live', 120);
    StartRTMPSplit('../vids/', 'rtmp://127.0.0.1/live/live', 120);
}