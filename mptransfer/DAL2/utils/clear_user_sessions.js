/**
 * Utility Script clears all sessions in db
 */
var shelpers = require('shelpers');
var sh = shelpers.shelpers;
var rh = require('rhelpers');


var dirSessions = sh.getUserHome()+'/'+"sessions_login_api"


var cluster_settings  = require( '../' + 'cluster_config.json' );
if ( cluster_settings.sessions != null ) {
    dirSessions= cluster_settings.sessions.dirSessions;

}

var server_config = rh.loadRServerConfig(true);

dirSessions= server_config.loginAPI.dir_sessions;
sh.fs.rmrf(dirSessions);
//sh.fs.rmrf('/home/user/ritv/dir_sessions');

dirSessions= server_config.global.dir_login_consumer_sessions;
sh.fs.rmrf(dirSessions);

//CrednetialServerquickStart
var dirSessions = sh.getUserHome() + '/' + 'trash/vidserv/'+'login_api_sessions';
sh.fs.rmrf(dirSessions);
var dirSessions = sh.getUserHome()+'/trash/vidserv/'+'test_login_consumer_api_sessions';
sh.fs.rmrf(dirSessions);
