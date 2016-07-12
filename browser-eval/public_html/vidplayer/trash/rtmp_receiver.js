var child_process = require('child_process');

var  cmd = "rtmpdump -v -r rtmp://localhost/live/live -o dump.flv"
var opts = {};
//opts.timeout = 5000;
var  ipAdd = child_process.execSync(cmd, opts )

