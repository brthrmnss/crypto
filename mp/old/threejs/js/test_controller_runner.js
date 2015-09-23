/**
 * Created by user1 on 3/8/14.
 */
//var wnd = window.open('http://www.yahoo.com');
//var wnd = window.open('http://www.cnn.com');

var settings = {}
var sh = exports.shelpers
var TableHelpers = exports.TableHelpers;

function SocketClient() {
    var self = this;
    self.windows = {}
    var socket = io.connect('http://localhost:8050');
    socket.on('news', function (data) {
        /*if (data.action == BookendConstants.ACTION_TEST_STATUS) {
         self.updateStatus(data)
         return;
         }*/
        //http://stackoverflow.com/questions/10702344/how-to-open-and-then-close-a-window-without-getting-blocked-as-a-popup
        console.log(data);
        socket.emit('my other event', { my: 'data' });
        // socket.emit('news', { my: 'data' });
        if ( data.action == 'runTest') {
            // var randomDelay =  100+Math.random()*1000;
            var delayTime = Math.random()*100
            if ( settings.lastTime != null ) {
                if (settings.lastTime < 1000+ new Date().getTime())  {
                    delayTime+= 1500
                }
            }
            settings.lastTime = new Date().getTime();
            // setTimeout( function xx() {
                try {
                /*if ( settings.lastWnd != null ) {
                 settings.lastWnd.close()
                 }*/


                var wndx = window.open(data.url, 'x test '+data.action.id+ Math.random(), "left=400");
                self.windows[data.id] = wndx
                console.log('launch new window', data.id, wndx,  self.windows)
                console.log(data.url)
                if ( settings.testWindowClosing == true ) {
                    setTimeout(function() {
                        console.log('close', wndx)
                        //wnd.open('', '_self', '');
                        wndx.close();
                    }, 1000);
                }

            } catch (e) {
                console.error(e, e.stack)

            }
            // }, delayTime)
            //return false;
        }
        if ( data.action == 'runTest_Finished') {
            try {
                var wnd = self.windows[data.id]
                console.log('close', wnd, data.id, self.windows)
                //wnd.open('', '_self', '');
                wnd.close();
                //return false;
            } catch (e) {}
        }

        if ( data.action == 'model') {
            var divStatus = $('#divStatus')
            var status = sh.toJSONString(data.data)
            status = status.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
            status = status.replace(/\n/g, '<br />');
            divStatus.html(status)

            console.log('go',sh.toJSONString(data.data), divStatus)
        }
    });


    socket.on('runTest', function (data) {

        /*if (data.action == BookendConstants.ACTION_TEST_STATUS) {
         self.updateStatus(data)
         return;
         }*/
        console.log(data);
        socket.emit('my other event', { my: 'data' });
        // socket.emit('news', { my: 'data' });
    });

    self.socket = socket;
}


function App3() {
    var p = App3.prototype;
    var self = this;
    var BookendConstants = {}
    BookendConstants.ACTION_TEST_STATUS = 'ACTION_TEST_STATUS'
    var sh = exports.shelpers
    var CUSTOM_ENV = '...'
    self.init = function init() {
        self.settings = {}
        self.settings.simulate_app_status = true
        //http://localhost:3001/test_controller.html?simulate=true?username=Test1234

        console.log('init app2', exports.shelpers)
        self.getModel();

        $("#btnGo").click(function clickhandler(ev) {
            if (self.submitMode) {
                $("#formSubmit").submit(function (event) {
                    if (self.guid.length != "00CTL0HXHDD8HBMH5IE5".length) {
                        alert("Invalid guid, try another username");
                        event.preventDefault();
                    }
                    return;
                });
                return;
            }
            var url = updateUrl();
            window.open(url, 'window name', 'window settings');
            return false;
            ev.stopPropagation();
            ev.preventDefault();
            //Your code here
        });

        $("#btnGo").click(function () {
            // alert( "Handler for .click() called." );
        });

        $("#btnGo").click(function () {
            // alert( "Handler for .click() called." );
        });


        var divCustomEnv = $("#divCustomEnv");
        divCustomEnv.hide()

        var s = new SocketClient()
        self.socketClient = s;

        var updateUrl = self.updateUrl;

        //updateUrl()
        //setTimeout(updateUrl, 500)

    }

    self.pushModel = function pushModel() {

    }



    self.getModel = function getModel() {
        var rq = $.ajax({
            type: 'get',
            url: '../model',
            //dataType:'jsonp',
            success: function (data) {
                // do something
                console.log('model', data)
                //console.log('me vs this', this, this)
                //dump('asdf')
                //fs.result = true;
                self.model = JSON.parse(data)
                self.updateUI();
            }

        })

        rq.fail(function failGetModel(jqXHR, textStatus, errorThrown) {
            console.log('failed', textStatus, errorThrown)
        })
    }


    self.getAppStatus = function getAppStatus(url,fxCallback) {
        var fake = self.settings.simulate_app_status;
        console.log('getAppStatus', url)
        var data = null;
        if (fake ) {
            url = '../getAppStatus'
            data = {url: url, fake:fake}
        }
        var rq = $.ajax({
            type: 'get',
            url: url ,
            data: data,
            dataType:'jsonp',
            timeout:4000,
            success: function (data) {
                fxCallback(data)
                console.log('ok', url)
            }
        })

        rq.fail(function failGetModel(jqXHR, textStatus, errorThrown) {
            //console.log('failed', textStatus, errorThrown, jqXHR.status, url)
            // setTimeout(function(){fxCallback('404')},500)
            //setTimeout(function(){fxCallback(jqXHR.status)},500)
            ////console.log('error', url)

        })

        rq.always(function failGetModel(jqXHR, textStatus, errorThrown) {
            console.log('always', textStatus, errorThrown, url)
            // setTimeout(function(){fxCallback('404')},500)
            var status = jqXHR.status
            if ( errorThrown.hasOwnProperty('status')) {
                status = errorThrown.status
            }
            if ( status == 0 ) status = 404
            setTimeout(function(){fxCallback(status)},500)

        })
    }



    self.updateUI = function updateUI() {
        self.model.files
        var files = self.model.files

        /*        //get selection
         var select = $("#selectTest")
         var selectedItem = $("#selectTest").val()
         $("#selectTest").empty()
         for (var i = 0; i < files.length; i++) {
         var item = files[i];
         var label = item.replace("./tests/", "")
         //Creates the item
         var itemval = '<option value="' + item + '">' + label + '</option>';
         //Appends it within your select element
         select.append(itemval)//;?
         }
         //reset selection
         select.val(selectedItem)*/
        /*populateSelect(files, 'name', 'label', 'selectTest', function removeTest(item) {
         return item.item.replace("./tests/", "")
         })*/


        $("#selectTest").empty()
        for (var i = 0; i < files.length; i++) {
            var item = files[i];
            var label = item.replace("./tests/", "")
            //Creates the item
            var itemval = '<option value="' + item + '">' + label + '</option>';
            //Appends it within your select element
            $("#selectTest").append(itemval)//;?
        }



        self.updateStatus({})
        self.updateStatusTable({});
        self.decorateUpdateStatusUI()
    }



    self.runTest = function runTest(data) {
        console.log('run test')
    }

    self.updateStatus = function updateStatus(data) {
        var queuePos = data.queuePos;
        var commands = data.commands;


        var resultTbl = "#resultTbl"
        self.table = $(resultTbl);
        if (self.table == null) {
            return;
        }

        if (commands != null) {
            console.log(commands)
            commands = JSON.parse(commands)
            t.clearTable();
            t.makeHeader(['#', 'name', 'speed', 'time', ''])
            var rowColumns = ['runnerQueuePos', 'jsonType', 'created_at', 'success', 'results', 'jsonStr' ,
                'shortDescription'];
            for (var idx in commands) { //so content will wrap better
                var command = commands[idx];
                command.jsonStr = command.jsonStr.replace(/,/g, ", ")
                command.shortDescription = command.shortDescription.replace(/,/g, ", ")
            }
            t.addRows(commands, rowColumns)


            if (self.lastCurrentPosition != null) {
                // $("#"+'item_'+self.lastCurrentPosition).removeClass('label')
                //$("#"+'item_'+self.lastCurrentPosition).removeClass('label-important')
                //self.lastHighlight.pulsate("destroy");
                self.lastHighlight.removeClass('error')
            }
            var highlight = $("#" + 'item_' + queuePos).parent().parent();//('tbody')
            //highlight.pulsate({ color: "#bf1c56" });
            //highlight.addClass('label')
            //highlight.addClass('label-important')
            self.lastCurrentPosition = queuePos
            self.lastHighlight = highlight

            highlight.addClass('error')


            $('html,body').animate({scrollTop: $("#" + 'item_' + queuePos).offset().top + 0 - 100});

        }

    }


    /**
     * Utils
     * @param data
     */

    /**
     * Attach fx to click handler of div in 500 ms.
     * Utility: When creating buttons in a list, they are not available for
     * click handlers until a  few frames later.
     * TODO: throw error if div not found
     * @param div_id
     * @param fx -
     */
    self.addJqueryClickLater = function addJqueryClickLater(div_id, fx, args) {
        setTimeout(function addListenerLater() {
            var div = $("#"+div_id);
            if ( args == null ) {
                div.click(fx)
            } else
            {
                div.click(function clickHandler() {
                    fx.apply(div, args)
                })
            }

        },500)
    }

    self.uiGet = function uiGet(div_id) {
        var div = $("#"+div_id);
        return div
    }


    /**
     * Decorate teh weblogic static page
     */
    self.decorateUpdateStatusUI = function decorateUpdateStatusUI() {
        var btnPlay = self.uiGet('btnPlay');
        var btnStop = self.uiGet('btnStop');
        var btnPurge = self.uiGet('btnPurge');
        var btnRedeploy = self.uiGet('btnRedeploy');


        btnPlay.click(self.noPermission)
        btnStop.click(self.noPermission)
        btnPurge.click(self.noPermission)
        btnRedeploy.click(self.noPermission)

    }

    self.noPermission =  function noPermission(e) {
        alert('You do not have permission to perform that action.')
        e.stopImmediatePropagation();
        e.preventDefault();
    }


    self.updateStatusTable = function updateStatusTable(data) {
        var queuePos = data.queuePos;
        var commands = data.commands;
        []

    }
}


var App3 = new App3()


function onClick(type) {
    console.log('x', type)
    return false;
}