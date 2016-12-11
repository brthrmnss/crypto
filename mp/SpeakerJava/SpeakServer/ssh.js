/**
 * Created by user on 4/2/16.
 */
var SSH = require('simple-ssh');

var ssh = new SSH({
    host: 'localhost',
    user: 'user',
    agent: process.env.SSH_AUTH_SOCK,
    agentForward: true
});

ssh.exec('echo $PATH', {
    out: function(stdout) {
        console.log(stdout);
    }
}).start();

/*** Using the `args` options instead ***/
ssh.exec('shipit', {
    args: ['$PATH'],
    pty: true,
    out: function(stdout) {
        console.log(stdout);
    },
    err: function(stderr) {
        console.log(stderr); // this-does-not-exist: command not found
    }
}).start();
/*** Using the `args` options instead ***/
ssh.exec('su -c whoami root', {
    pty: true,
    out: function(stdout) {
        console.log(stdout);
    },
    err: function(stderr) {
        console.log(stderr); // this-does-not-exist: command not found
    }
}).start();
ssh.on('error', function(err) {
    console.log('Oops, something went wrong.');
    console.error(err);
    ssh.end();
});