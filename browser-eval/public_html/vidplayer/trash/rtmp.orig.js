/**
 * Created by user2 on 8/24/15.
 */
var rtmpdump = require('rtmpdump');
var fs = require('fs');

var options = {
    rtmp: 'rtmp://10.211.55.4/live',
    playpath: 'live',
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

stream.on('progress', function(kbytes, elapsed, percent) {

    console.log('%s kbytes read, %s secs elapsed, %s%%', kbytes, elapsed, percent);
});

stream.on('error', function(err) {
    // as usual, unhandled error events will throw
    console.log(err);
    process.exit(1);
});

stream.pipe(fs.createWriteStream('video.mp4'));