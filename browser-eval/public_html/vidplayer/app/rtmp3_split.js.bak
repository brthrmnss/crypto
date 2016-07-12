/**
 * Created by user2 on 8/24/15.
 */
var rtmpdump = require('rtmpdump');
var fs = require('fs');

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


function StartRTMPSplit(dir, urlStream, timeout) {

    if ( timeout == undefined ) {
        timeout = 120;
    }
    sh.fs.rmrf(dir);
    sh.makePathIfDoesNotExist(dir);
    var dirTemp = 'temp/'; //store files before explode
    sh.fs.rmrf(dirTemp);
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
    //splitEvery = 4000;
    var split = true;
    var stopAfterxFiles = 4
    stopAfterxFiles = 0;
    stream.on('progress', onProgress);

    function onProgress (kbytes, elapsed, percent) {
        var isCurrentStream = ctrl.stream == this;
        if ( isCurrentStream == false ) {
            return;
        }
        kbytes = parseInt(kbytes)
        if (  ctrl.streamReady == false &&
            this == ctrl.stream &&  kbytes > 0+videoFlipFudgeFactor  ) {
            ctrl.sentProgress = true
            ctrl.streamReady = true;
            setTimeout(function delayCloseStream() {
                ctrl.removeStream(ctrl.streamOld);
            }, 200);

            console.log(this.name, 'ready')
        }
        //if more than 1 second has past
        //you can see that the vids are working ...
        if ( parseInt(elapsed) > 0 ) {
            // ctrl.sentProgress = true

        }
        if ( split && kbytes > (splitEvery + ctrl.lastSwitch)  ) {
            console.log('switch',ctrl.count, ctrl.lastSwitch)
            ctrl.lastSwitch  = kbytes
            ctrl.count++;
            stream.unpipe(ctrl.fStream );
            ctrl.fStream.end()
            function createS() {
                if( stopAfterxFiles > 0 && ctrl.count > stopAfterxFiles) {
                    process.exit();
                    return;
                }

                //return;

                //switch to alt stream;
                var newStream = rtmpdump.createStream(options);
                newStream.on('progress', onProgress)
                ctrl.stream = newStream;
                ctrl.streamOld = stream;
                ctrl.streamReady = false;

                newStream.name  = 'Str '  + ctrl.count
                //return;
                ctrl.stream.unpipe()
                var fileVideo = sh.getTimeStamp()+'video'+ctrl.count+'.flv'
                ctrl.fStream = fs.createWriteStream(dirTemp+fileVideo);
                ctrl.fileMoveToOld = ctrl.fileMoveTo;
                ctrl.fileMoveTo = fileVideo;


                //ctrl.fStream.write(ctrl.pre  )
                // ctrl.fStream.write(ctrl.pre.toString('binary'), 'binary' )
                /// process.exit();
                newStream.pipe(ctrl.fStream );

                ctrl.lastSwitch = 0;
            }
            ctrl.fStream.on('close', function () {
                console.log('...', 'close');
                createS()
            })
            ctrl.fStream.on('end', function () {
                console.log('...', 'end');
            })
            //ctrl.fStream = fs.createWriteStream('vids/video'+ctrl.count+'.flv');
            // stream.pipe(ctrl.fStream );
            // ctrl.fStream = fs.createWriteStream('vids/video'+ctrl.count+'.flv');
            //stream.pipe(ctrl.fStream );
        }

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
    StartRTMPSplit('../vids/', 'rtmp://10.211.55.4/live/live', 120);
}