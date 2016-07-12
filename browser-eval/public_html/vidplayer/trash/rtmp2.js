/**
 * Created by user2 on 8/24/15.
 */
var rtmpdump = require('rtmpdump');
var fs = require('fs');

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

sh.fs.rmrf('vids/')
sh.makePathIfDoesNotExist('vids/')

var options = {
    rtmp: 'rtmp://10.211.55.4/live/live',
    //playpath: 'live',
    //pageUrl: 'http://host.tld/somepage.html',
    //swfVfy: 'http://host.tld/player.swf',
    v: null // parameter-less command line switches must have null as a value
};

var stream = rtmpdump.createStream(options);

stream.on('connected', function(info) {
    // info provides various details about the stream
    // duration, resolution, codecs, ...
    console.log(info);
});
/*stream.on('data', function () {
 console.log('...data')
 })*/
stream.on('readable', function () {
    //console.log('...readablereadablereadablereadablereadablereadable')
})
options.sentProgress = false;
options.fStream = fs.createWriteStream('vids/video1.flv');
var called = false;
stream.on('data', function (data) {
   //console.log('data', data.length)

    if ( called ){
        //process.exit()
    } else {


    };
    // process.exit()
    if ( options.pre == null   ) {
        options.pre = data;
    } else {
        var haveHeaderBytes = options.pre.length > 65536;
        haveHeaderBytes = ! options.sentProgress
        if ( haveHeaderBytes ) {
            //options.pre += data;
            var newBuffer = Buffer.concat([options.pre, data]);
            options.pre = newBuffer;
        }
        else {
            if (  options.wroteFile != true ){
                console.log('writing start....')
                called = true;
                var fileStart = fs.createWriteStream('vids/video'+'Pre'+'.flv');
                fileStart.write( options.pre );
                options.wroteFile = true
            }

        }
    }

    //called = true
})
options.lastSwitch = 0;
options.count = 1;
var splitEvery = 2000
//splitEvery = 4000;
var split = true;
stream.on('progress', function(kbytes, elapsed, percent) {

    kbytes = parseInt(kbytes)
    if ( kbytes > 0 ) {
        options.sentProgress = true
    }
    //if more than 1 second has past
    //you can see that the vids are working ...
    if ( parseInt(elapsed) > 0 ) {
       // options.sentProgress = true

    }
    if ( split && kbytes > (splitEvery + options.lastSwitch)  ) {
        console.log('switch', options.lastSwitch)
        options.lastSwitch  = kbytes
        options.count++;
        stream.unpipe(options.fStream );

        options.fStream.end()
        function createS() {
            if( options.count > 2) {
                process.exit();
                return;
            }
            stream.unpipe()
            options.fStream = fs.createWriteStream('vids/video'+options.count+'.flv');
            options.fStream.write(options.pre  )
           // options.fStream.write(options.pre.toString('binary'), 'binary' )
            /// process.exit();
            stream.pipe(options.fStream );
        }
        options.fStream.on('close', function () {
            console.log('...', 'close');
            createS()
        })
        options.fStream.on('end', function () {
            console.log('...', 'end');
        })
        //options.fStream = fs.createWriteStream('vids/video'+options.count+'.flv');
        // stream.pipe(options.fStream );
        // options.fStream = fs.createWriteStream('vids/video'+options.count+'.flv');
        //stream.pipe(options.fStream );
    }

    console.log('%s kbytes read, %s secs elapsed, %s%%', kbytes, elapsed, percent);
});

stream.on('error', function(err) {
    // as usual, unhandled error events will throw
    console.log(err);
    process.exit(1);
});

stream.pipe(options.fStream );