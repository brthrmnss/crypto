/**
 * Created by user2 on 4/11/16.
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var rh = require('rhelpers');

function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;
    p.init = function init(url, appCode) {
        self.startTime = new Date();

        var ex = []
        for (var i = 0; i < 1000; i++) {
            ex.push(i)
        }

        sh.async(ex, function doIt(i, fx) {
            //console.log(i)
            fx()

        }, function ended() {

            self.proc('how long', sh.time.secs(self.startTime));
             self.testOver();
        })


       // self.proc('how long', sh.time.secs(self.startTime));
    }
    p.testOver = function testOver() {
        var testOverrides = {
            "mysql":{
                "ip" : "127.0.0.1",
                //"databasename" : "yetidb",
                "user" : "yetidbuser",
                "pass" : "aSDDD545y^",
                // "port" : "3306"
            },
            "global":{
              //  "environment":"productionx"
            },
        }
        rh.addConfigOverride(testOverrides);

        var	sequelize = rh.getSequelize();
        self.sequelize = sequelize;


        self.startTime = new Date();

        var ex = []
        for ( var i = 0;  i < 1000; i++ ) {
            ex.push(i)
        }


        sh.async(ex, function doIt(i, fx){

            var query = {
                where: {
                  //  username: Math.random(),
                }
            }

            self.sequelize.models.user.findAll(query).then(function (objs) {
                if ( objs == null || objs.length ==0  ) {
                    //return;
                }
           //     self.proc(i, query)
                fx()
            }).catch(function(error) {
                console.error('error occurred', error, error.stack)
                throw (new Error(error));
            });
        }, function ended() {
            self.proc('how long', sh.time.secs(self.startTime));
        })





    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.BasicClass = BasicClass;

if (module.parent == null) {

    var i = new BasicClass()
    i.init();
}


