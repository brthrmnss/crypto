/**
 * Created by user1 on 10/16/2016.
 */


console.log('reload')



var sh = require('shelpers').shelpers;
sh.t ="\t"
var shelpers = require('shelpers');
var Url = require('url');

function ProxyReload() {
    var p = ProxyReload.prototype;
    p = this;
    var self = this;

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        //self.method();
    }

    p.getHost = function getHost(req,res) {
        if (req.query.url!=null) {
            return null;
        }

        var output = null;
        var referer = req.headers['referer'];
        var isFromProxy = sh.includes(referer,'url=', true)
        console.log(sh.t, '>>>>> redirect request', req.originalUrl, isFromProxy, referer)
        if ( isFromProxy ) {
            referer = referer.split('url=')[1]
            referer = decodeURIComponent( referer);
            console.error(sh.t, 'refere', referer);
            var url = referer + '' + req.originalUrl;
            var originalUrl = req.originalUrl
            if ( sh.startsWith( originalUrl, '/proxy') ) {
                console.error(sh.t, 'strip', 'proxy')
                originalUrl = originalUrl.replace('/proxy', '')
                if ( sh.includes(originalUrl, 'ui=2')) {
                    'https://mail.google.com/mail/u/0/?ui=2&view=bsp&ver=ohhl4rw8mbn4'
                    'https://gmail.com/u/0/?ui=2&view=bsp&ver=ohhl4rw8mbn4'
                    'https://gmail.com/mail/u/0/?ui=2&view=bsp&ver=ohhl4rw8mbn4'
                    referer += 'mail/u/0/'
                }
            }
            referer = 'https://mail.google.com/mail/u/0/'
            var url = referer + '' + originalUrl;
            output = referer;
            console.log(sh.t,'getHost...', output, req.originalUrl)
            return output;
        }
        referer = 'https://mail.google.com/mail/u/0/'
        output = referer;
        console.error(sh.t,'||| failed', 'getHost...', output, req.originalUrl)
        return output;
    }

    p.getPath = function getPath(req,res) {
        var output = null;
        console.log('getPath...', output)

        if (req.query.url!=null) {
            return null;
        }

        var output = null;
        var referer = req.headers['referer'];
        var isFromProxy = sh.includes(referer,'url=', true)
        console.log(sh.t, '>>>>> redirect request', req.originalUrl, isFromProxy, referer)
        if ( isFromProxy ) {
            referer = referer.split('url=')[1]
            referer = decodeURIComponent( referer);
            console.error(sh.t, 'refere', referer)
            var originalUrl = req.originalUrl
            if ( sh.startsWith( originalUrl, '/proxy') ) {
                console.error(sh.t, 'strip', 'proxy')
                originalUrl = originalUrl.replace('/proxy', '')
                if ( sh.includes(originalUrl, 'ui=2')) {
                    'https://mail.google.com/mail/u/0/?ui=2&view=bsp&ver=ohhl4rw8mbn4'
                    'https://gmail.com/u/0/?ui=2&view=bsp&ver=ohhl4rw8mbn4'
                    'https://gmail.com/mail/u/0/?ui=2&view=bsp&ver=ohhl4rw8mbn4'
                    referer += 'mail/u/0/'
                }
            }
            referer = 'https://mail.google.com/mail/u/0/'
            var url = referer + '' + originalUrl;
            var path = Url.parse(url).path
            output = path;
            console.log(sh.t,'getPath...', output, req.originalUrl)
            return output;
        }

        console.error(sh.t,'|||failed', 'getPath...', output, req.originalUrl)
        return output;


        return output;
    }

    p.test = function test(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.ProxyReload = ProxyReload;

if (module.parent == null) {
    var instance = new ProxyReload();
    var config = {};
    instance.init(config)
    instance.test();
}



