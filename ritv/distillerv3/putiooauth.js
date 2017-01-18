/**
 * Created by user1 on 1/14/2017.
 */



/*
 t4200twwkw4l6v644750
 1685
 DMOFFFQT
 */

var OAuth = require('oauth');

//it('gets bearer token', function(done){
    var OAuth2 = OAuth.OAuth2;
    var twitterConsumerKey = 'your key';
    var twitterConsumerSecret = 't4200twwkw4l6v644750';
    var oauth2 = new OAuth2(twitterConsumerKey,
        twitterConsumerSecret,
        'https://api.twitter.com/',
        null,
        'oauth2/token',
        null);
    oauth2.getOAuthAccessToken(
        '',
        {'grant_type':'client_credentials'},
        function (e, access_token, refresh_token, results){
            console.log('bearer: ',access_token);
            //done();
        });
//});