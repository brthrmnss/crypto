/**
 * Test call to youtube search.
 * This was failing through the "SparkServer" proxy
 * @type {exports}
 */

var request = require('request');
request = request.defaults({jar: true, followAllRedirect:false,
    followRedirect: false, rejectUnauthorized:false});


var reqoptions = {}
reqoptions.url  = 'https://www.youtube.com/results?lclk=long&filters=long&search_query=Furious+72015'
request(reqoptions, function (error, response, body) {
    if (response != null && body == null) {
        body = response.body;
    }

    console.log(body)
    console.log(body.indexOf('404') == -1, 7)
})






