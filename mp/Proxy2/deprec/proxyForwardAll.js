/**
 * Created by user1 on 9/20/2016.
 */
var httpProxy = require('http-proxy');
var url = require('url');








var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    var url2 = req.url.replace('/?url=','')
    var urlObj = url.parse(url2);
    console.log(url2, urlObj)
    var u = {}
    var u = {
        host: urlObj.host,
        port :  80,
        enable :
        {
            xforward: true
        },
        target:url2
    }
    proxy.web(req, res, u  );


    proxy.on('proxyReq', function(proxyReq, req, res, options) {

        proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    });

});

console.log("listening on port 9000")
server.listen(9000);


function sdf () {
    httpProxy.createServer(function asdf(req, res, proxy) {

        console.log(req, res)
        var urlObj = url.parse(req.url);

        req.headers['host'] = urlObj.host;
        req.headers['url'] = urlObj.href;

        proxy.proxyRequest(req, res, {
            host: urlObj.host,
            port: 80,
            enable: {xforward: true}
        });
    }).listen(9000, function () {
        console.log("Waiting for requests...");
    });
}

//http://127.0.0.1:9000/?url=www.imdb.com