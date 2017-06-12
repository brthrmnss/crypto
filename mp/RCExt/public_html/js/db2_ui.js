var u = uiUtils;


function onInitDB() {
    //console.log('...ddd')
    console.log('pppppppppp')
    function Db2() {
        var self = this;
        self.data = {}

        self.types = {};

        self.data.port = 6022;
        self.data.portHoist = 6022;
        self.data.portHoist2 = 6022+2;
        self.data.portData = '6018';
        self.data.ip = '127.0.0.1';
        self.data.ip = window.location.hostname
        self.data.url = self.data.ip + ':'+ self.data.port;
        self.data.baseUrl = 'http://' + self.data.url;
        self.data.baseDataUrl = 'http://' + self.data.ip + ':'+ self.data.portData;
        self.data.urlHoist =  'http://' + self.data.url;

        self.data.ui = {};
        self.data.timeAutosave = 10;
        self.data.timeRecentPages = 10;
        self.data.countAutosave = 0;

        self.data.timeStart = new Date();

        self.data.dbg = {};
        self.data.dbg.autosaving = false;

        self.settings = {};
        self.settings.lblWidth = 80;

        var p = this;

        p.init = function init() {

            if ( window.oldInstance ) {
                window.oldInstance.destroyTAS();
                self.data.socket = window.oldInstance.data.socket;
                self.data.socket.removeAllListeners()
                uiUtils.data.socket = self.data.socket;


                self.data.socketHoist = window.oldInstance.data.socketHoist;
                self.data.socketHoist.removeAllListeners()
                uiUtils.data.socketHoist = self.data.socketHoist;

                uiUtils.socket.dict = {};
            }
            window.oldInstance = self;


            self.data.active = true;
            /*  // self.autoSave(true);
             // var cfg = uiUtils.callMethodRepeat(self.getRecentPageList, self.data.timeRecentPages, self.data, 'active')
             //cfg.log = 'updated'

             setTimeout(function init2() {
             self.getRecentPageList(self.haveNewListLoadFirstOne)
             }, 1000)*/

            self.data.taskReqd = uiUtils.makeUIDict();

            var rH = new RenderHelper()
            self.renderHelper = rH
            rH.init(self);

            self.connectSocket();

            self.createUI();


            //return;

            self.createUI.taskManagement();
            self.createUI1();

            self.createUI2();
            self.createUI3();
            self.createVerifyBlock();

            self.isConnected()


            //what is it?
            self.setupInitVals = function setupInitVals() {
                var ui = uiUtils.setVal2(self.data.ui.txtTaskName2, 'Test Task2');
                self.getPreviousTasks()
            }
            self.setupInitVals();

            self.render()


            //self.getFileList(); 
            // uiUtils.setText(self.data.ui.txtTaskNameOverride, 'listIds_ls051393312.json');
        }


        function defineRemote() {



            p.getInitDbVars = function getInitDbVars() {
                var data = {} ;
                data.otherSide = self.data.baseDataUrl;

                var url = self.getUrlR('initDBVars')
                uiUtils.getUrl(url,
                    data,
                    function onGotRecentList(sdf){
                        console.log('onGotRecentList', sdf)
                        debugger
                        uiUtils.setSelect(self.data.ui.recentPages,
                            sdf, 'name', 'name');
                        callIfDefined(fxDone);
                    }
                );
            }
            p.connectSocket = function connectSocket() {
                //if ( self.data.socket !+ null )
                //whyat?

                //var socketAddress  = self.data.ip + ':'+ self.data.port

                var socket = io(); // );
                socket.on('chat message', function(msg){
                    if (msg.indexOf('eval-')==0) {
                        msg = msg.replace('eval-', '')
                        eval(msg);
                    }
                    console.log('chat')
                    $('#messages').append($('<li>').text(msg));
                    h.scrollToBottom();
                });
                self.data.socket = socket;
                uiUtils.socket.upgradeSocket(socket)
                uiUtils.data.socket = self.data.socket;

                var portHoist = (parseInt(self.data.port)+2)
                console.log('portHoist', portHoist)

                var socketAddress  = self.data.ip + ':'+ portHoist
                if ( window.socketAddress ) {
                    console.info('window socketaddress')
                    var socketAddress  =  window.socketAddress;
                }

                var socket2 = io( 'http://'+socketAddress );

                socket2.on('chat message', function onGotChatMessage(msg){
                    if (msg.indexOf('eval-')==0) {
                        msg = msg.replace('eval-', '')
                        eval(msg);
                    }

                    console.log('chat')
                    $('#messages').append($('<li>').text(msg));
                    h.scrollToBottom();
                });
                uiUtils.socket.upgradeSocket(socket2)
                self.data.socketHoist = socket2;
                uiUtils.data.socketHoist = self.data.socketHoist;
            }

            p.testSocket = function testSocket() {
                var cmd = {};
                cmd.cmd='say'
                cmd.args = ['snark snark snark .... what is this? ']
                self.data.socket.emit('cmd', cmd);
            }
            p.isConnected = function isConnected(fxDone) {
                var port = uiUtils.getVal2(self.data.ui.txtPort)

                var url = 'http://'+ port + //window.location.hostname + ':' + 6007 +
                    '/valid';

                var baseBreedUrl = 'http://'+ port

                console.log('what is url', url)

                self.data.baseBreedUrl = baseBreedUrl;

                uiUtils.setText(self.data.ui.txtConnectedStatus, '...loading...')
                uiUtils.getUrl(url, function onGotConnectedStatus(sdf){
                    console.log('onGotConnectedStatus', sdf)
                    uiUtils.setText(self.data.ui.txtConnectedStatus, sdf)
                    if ( sdf == 'connected') {
                        uiUtils.setHtml(self.data.ui.txtConnectedStatus, uiUtils.glyph('ok'))
                    }
                });



                var url = 'http://'+ port + //window.location.hostname + ':' + 6007 +
                    '/hostname';
                uiUtils.getUrl(url, function onGotConnectedStatus(hostname){
                    console.log('onHostname', hostname)
                    self.data.hostname = hostname
                });
            }


            p.autoSave = function autoSave(repeat, fxDone) {
                if (self.data.active != true) {
                    console.warn('done with this tas');
                    return;
                }
                self.data.countAutosave++;
                if ( self.data.dbg.autosaving )
                    console.info('autosavesave', self.data.countAutosave);

                if (repeat) {
                    setTimeout(self.autoSave, self.data.timeAutosave * 1000, true)
                }

                self.onSave(function onSaved(){
                    if ( self.data.dbg.autosaving )
                        console.log('autosaved...')
                    callIfDefined(fxDone)
                })
            }

            p.getRecentPageList = function getRecentPageList(fxDone) {
                var url = 'http://'+ window.location.hostname + ':' + 6007
                    + '/listFiles';
                uiUtils.getUrl(url, function onGotRecentList(sdf){
                    console.log('onGotRecentList', sdf)
                    debugger
                    uiUtils.setSelect(self.data.ui.recentPages,
                        sdf, 'name', 'name');
                    callIfDefined(fxDone);
                });
            }

            p.onSave = function onSave(fxDone, nameOverride){

                var tM = tinyMCE.get('mainContent')
                if ( tM == null ) {
                    console.warn('tinyMCE was null')
                    return;
                }
                var b = $(tM.getBody());
                var content = b.html();
                if ( self.data.dbg.saveContent )
                    console.log('saving content', content);
                var url = 'http://'+ window.location.hostname + ':' + 6007
                    + '/saveFile';
                var data = {name:'test2', body:content}

                data.name = self.data.currentName;
                if ( nameOverride){
                    data.name = nameOverride;
                }
                if ( data.name == null  ) {
                    //ignoring pointless save
                    console.warn('ignoring save, b/c player is blank')
                    callIfDefined(fxDone)
                    return;
                }
                uiUtils.postUrl(url, data, function onData(sdf){
                    if ( self.data.dbg.saveContent )
                        console.log('response', sdf)
                    // tinyMCE.get('mainContent').setContent(sdf)
                    callIfDefined(fxDone)
                });
            };

            p.removeFile = function removeFile(name, fxDone) {
                //fxDone = uiUtils.ifFxReplace(nameOverride, fxDone)
                var url = 'http://'+ window.location.hostname + ':' + 6007
                    + '/removeFile';
                var data = {}
                data.name =  name
                console.log('removing file named:', data.name);
                uiUtils.getUrl(url, data, function onRemovedOldName(sdf){
                    console.log('removed old name', data.name, sdf)
                    callIfDefined(fxDone)
                });
            }





            p.onSaveTest = function onSaveTest(){
                self.onSave(function onSaveTest(){
                    console.log('saved it')
                }, 'test2');
            };

            p.onRetrieve = function onRetrieve(fxDone, nameOverride){
                // console.log('go');
                var url = 'http://'+ window.location.hostname + ':' + 6007
                    + '/readFile';
                var data  =  {name:'test2'};
                data.name = self.data.currentName;
                if ( nameOverride){
                    data.name = nameOverride;
                }
                uiUtils.getUrl(url,data, function onRetrievedData(sdf){
                    console.log('onRetrievedData', sdf)
                    tinyMCE.get('mainContent').setContent(sdf)
                    callIfDefined(fxDone)
                });
            }

            p.onRetrieveTest = function onRetrieveTest(){
                self.onRetrieve(null, 'test2');
            }


            p.haveNewListLoadFirstOne = function haveNewListLoadFirstOne(){
                console.log('loading first one in list')
                var newName = uiUtils.getVal2(self.data.ui.recentPages);
                if ( newName == null ) {
                    console.info('no other files left ')
                    return; //finished
                }
                self.data.currentName = newName;
                self.onRetrieve(function onRetrieved(){
                    console.log('retrieved')
                    self.render();
                    tinyMCE.activeEditor.focus();
                });

            };

            self.onNew = function onNew() {
                self.data.currentName = null ;
                self.data.currentName = Math.random();
                self.utils.setFocus()
                self.render();
            }
        }
        defineRemote();

        p.onReuseThisPreviousJobTask = function onReuseThisPreviousJobTask(item) {
            console.log('user wants to resume', item);
            //push
            self.tasks.getTask()

            u.setVal2( self.data.ui.txtTaskName2, item)
            //todo show a button to clear this setting
            //todo set the input values back ...
            //self.data.listDlManifest = item;
            self.render();
        }

        p.onReuseThisPreviousJob = function selectOnReuse(item) {
            console.log('user wants to resume', item)
            //todo show a button to clear this setting
            //todo set the input values back ...
            debugger
            self.data.listDlManifest = item;
            self.render();
        }

        var lblWidth = 80;

        p.createUI = function createUI() {

            $('#divSaveArea').html('')
            self.data.ui.save = '#divSaveArea'
            $(self.data.ui.save).css('padding', '10px');
            var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );


            uiUtils.br(); uiUtils.br();
            uiUtils.addLabel({text:"Server Brd",
                width:lblWidth+0,
                id:"lblTestServer"})
            uiUtils.makeBtn(uiUtils.lastId(), 'Test socket');
            uiUtils.onClick(uiUtils.lastId(), self.testSocket)


            uiUtils.spacer();

            // uiUtils.br()
            uiUtils.addTextInput({
                text:self.data.url,
                id:'txtIpHostport',
                onDebounce:function onUserChangedIpAddressManually(newName) {
                    console.log('debouched', newName)

                    var ip = newName;
                    var port = null
                    if ( ip.includes(':')) {
                        var split = ip.split(':')
                        ip = split[0];
                        port = split[1];
                    }
                    uiUtils.setVal('lastManualIp', ip)
                    if ( newName == '' ) {
                        console.info('cleared this')
                        debugger;
                    }
                    self.addNewAddress(ip)
                    // debugger;
                    return;

                    //return;
                    self.autoSave(false, onSaved_SaveWithNewName)

                    function onSaved_SaveWithNewName(){
                        console.debug('saved content');
                        self.onSave(onSaved_WithNewName_DeleteOldName, newName)
                    }

                    function onSaved_WithNewName_DeleteOldName(){
                        self.data.lastSaveName = self.data.currentName;
                        console.debug('delete old name', self.data.lastSaveName);
                        self.removeFile( self.data.lastSaveName, onRemovedOldFile)
                        self.data.currentName = newName;
                    }

                    function onRemovedOldFile(){
                        console.debug('complete')
                        self.getRecentPageList();
                    }

                }
            })
            self.data.ui.txtPort = uiUtils.lastId();
            self.data.ui.txtBreedServerUrl = uiUtils.lastId();


            uiUtils.addLabel({id:'txtConnectedStatus',
                addSpacerBefore:true,
                text:'not connected'})
            self.data.ui.txtConnectedStatus = uiUtils.lastId();

            uiUtils.addLabel({id:'txtServerStatus',
                addSpacerBefore:true,
                text:''})
            self.data.ui.txtServerStatus = uiUtils.lastId();







            function createOtherIpds() {
                self.data.ui.ddOtherIps = 'ddOtherIps';
                self.onSwitchIp = function onSwitchIp(eee) {
                    self.data.url = eee
                    //  self.data.url = u.getVal2( self.data.ui.ddOtherIps)
                    u.setVal2(self.data.ui.txtPort, eee)
                    self.isConnected()

                    window.socketAddress = eee;
                    window.onInitDB();

                    var url = self.data.baseDataUrl
                        + '/resetSockets';
                    uiUtils.getUrl(url, function getPreviousTasksList(sdf){
                        console.log('sockets reset');
                    })
                }
                uiUtils.addSelect({
                    tooltip:'Pick Different Ip this',
                    id:self.data.ui.ddOtherIps ,
                    fxDone:self.onSwitchIp
                })
                self.data.ui.ddOtherIps = uiUtils.lastId();
                u.kv = function kv(arr) {
                    var vals = {};
                    sh.each(arr, function xk(k,v) {
                        var val = {}
                        vals[v]=v

                        //  vals.push(val)
                    })
                    console.error('vals', vals)
                    return vals;
                }
                uiUtils.updateSelect(self.data.ui.ddOtherIps,
                    u.kv([
                        'localhost'+':'+(self.data.portHoist+2),
                        '192.168.1.159'+':'+(self.data.portHoist+2),
                        '192.168.1.160'+':'+(self.data.portHoist+2),
                        '9'+'5.21'+''+'1.13'+''+'7.1'+'45'+':'+(self.data.portHoist+2),
                        '8'+'5.21'+''+'1.13'+''+'7.1'+'45'+':'+(self.data.portHoist+2),
                    ])
                );



                self.addNewAddress = function addNewAddress(ipAdd) {
                    uiUtils.select.addOption(self.data.ui.ddOtherIps, lastManualIp, lastManualIp)
                    uiUtils.setVal2(self.data.ui.ddOtherIps, lastManualIp)
                }


                var lastManualIp = uiUtils.getVal('lastManualIp')
                if ( lastManualIp ) {
                    self.addNewAddress(lastManualIp);
                }

                if ( window.socketAddress ) {
                    uiUtils.setVal2(self.data.ui.ddOtherIps, window.socketAddress)
                    u.setVal2(self.data.ui.txtPort, window.socketAddress)
                }

                return;
                self.getTasks(function initTaskListSelectionForFirst() {

                    uiUtils.selectAction(self.data.ui.ddPrevTaskList)

                })
            }
            createOtherIpds()









            uiUtils.socket.addListener('updateStatus', function onStatusUpdated(e) {
                console.log('updateStatus', e)
                var msg = e.msg;


                if ( e.result ) {
                    var val = e.result;
                    var outputType = e.type + '_'+'output'
                    self.data[outputType] = val;
                    console.info('set result', outputType, val)
                    self.render()
                }

                if ( e.output ) {
                    var val = e.output;
                    var outputType = e.type + '_'+'output'
                    self.data[outputType] = val;
                    console.info('set output', outputType, val)
                    self.render()
                }



                if ( e.type == 'dlRemoteFileList') {
                    //TODO: Remove stuff when u start ... restart sockets ...
                    uiUtils.setTextSD(self.data.ui.txtDlRemoteFileListStatus, msg);

                    return;
                }


                if ( e.complete == true ) {
                    //self.utils.addToLog(e)
                    //uiUtils.setTextSD(se)
                    var taskName = e.type+'_output'
                    self.data[taskName] = e.result
                    self.render()
                }



                //  debugger
                if ( e.type == 'initGFFRM' /*'dlRemoteFileList'*/
                    && e.initGFFRM ) {
                    if ( e.fileExists ) {
                        self.data.fileFileList = e.file;
                        self.render();
                        //  debugger
                    } else {
                        console.warn('what?')
                    }
                    // debugger
                    self.render();
                    return;
                }


                var defV = self.data.forwardOutputType[e.type]
                if ( defV ) {
                    //TODO: Remove stuff when u start ... restart sockets ...
                    uiUtils.setTextSD(defV, msg);
                    return;
                }


                uiUtils.setText(self.data.ui.txtServerStatus , msg);
                self.data.lastLogText = msg;
                setTimeout(function onClearStatusText() {
                    if ( self.data.lastLogText == msg ) {
                        uiUtils.setText(self.data.ui.txtServerStatus , '');
                    }
                }, 5000)
            });



        }

        p.createUI.taskManagement = function taskManagement() {


            uiUtils.addSection(function onAddReuse() {
                uiUtils.br()
                uiUtils.hr()
                uiUtils.addLabel({
                    width:self.settings.lblWidth+0,
                    addSpaceAfter:true,
                    text:'TM'})
                /*
                 recent list
                 name override
                 settings list
                 save button
                 */

                uiUtils.addSelect({
                    text:'yeah',
                    tooltip:'Reuse this',
                    id:'ddPrevTaskList',
                    fxDone:self.onReuseThisPreviousJobTask
                })
                self.data.ui.ddPrevTaskList = uiUtils.lastId();
                uiUtils.updateSelect('ddPrevTaskList', [1,2,3,4,5]);
                self.getTasks(function initTaskListSelectionForFirst() {

                    uiUtils.selectAction(self.data.ui.ddPrevTaskList)

                })
                u.addBtn({
                        title: 'Delete Task',
                        text: 'Delete Task',  },
                    function onRefreshTask() {
                        self.removeTask()
                    })

                uiUtils.addBtn(
                    { text: 'Refresh', },
                    function onRefreshTask() {
                        self.getTasks()
                    }
                )



                u.br()
                uiUtils.addLabel({
                    width:self.settings.lblWidth+0,
                    addSpaceAfter:true,
                    text:'Name'})
                uiUtils.addTextInput({
                    placeholder:'Task Name',
                    id:'txtTaskName2',
                    onDebounce:function onChanged(newName) {
                        self.data.lastNameIsDefault = false;
                        console.log('debouched', newName)
                        uiUtils.show(self.data.ui.txtRefreshTaskName)
                    }
                })
                self.data.ui.txtTaskName2 = uiUtils.lastId();


                /*u.br()
                 uiUtils.addLabel({
                 width:self.settings.lblWidth+0,
                 addSpaceAfter:true,
                 text:'V'})
                 uiUtils.addLabel({id:'txtCurrentTaskValues',
                 text:'{}'})
                 self.data.ui.txtCurrentTaskValues = uiUtils.lastId();*/



                self.utils.addRowLbl = function addLblForForm(txtLbl) {
                    u.br()
                    u.addLabel({
                        width:self.settings.lblWidth+0,
                        addSpaceAfter:true,
                        text:txtLbl})
                }


                self.utils.addRowLbl('File List');
                uiUtils.addLabel({id:'txt.fileFileList',
                    text:''})
                self.renderHelper.pushData('self.data.fileFileList');

                self.utils.addRowLbl('Dl List');
                uiUtils.addLabel({id:'txt.listDlManifest',
                    text:''})
                self.renderHelper.pushData('self.data.listDlManifest');

                self.utils.addRowLbl();
                u.addBtn({
                    text: 'Save Task',
                    //addSpacerBefore:true,
                    fxClick: self.saveTask,
                    data:{
                        //query:self.getValFrom(self.data.ui.txtOneOffQuery),
                        //cmd:'searchpb'
                    }
                })


                p.onTestC = function onTestC() {

                }

                self.utils.addRowLbl();
                u.addBtn({
                    text: 'Test Load',
                    //addSpacerBefore:true,
                    fxClick: self.onC,
                    data:{
                        //query:self.getValFrom(self.data.ui.txtOneOffQuery),
                        //cmd:'searchpb'
                    }
                })

                return;
                /*

                 uiUtils.addLabel(
                 {//id:'txtRefreshTaskName',
                 //addSpacerBefore:true,
                 tooltip:"Reuse existing item",
                 html:u.glyph('inbox')})
                 */

                uiUtils.spacer()
                uiUtils.addSelect({
                    text:'yeah',
                    tooltip:'Reuse this',
                    id:'ddPrevTasks',
                    fxDone:self.onReuseThisPreviousJob
                })
                self.data.ui.ddPrevTasks = uiUtils.lastId();
                uiUtils.updateSelect('ddPrevTasks', [1,2,3,4,5]);


                return //fix this later
                uiUtils.addBtn(
                    {
                        title: 'Upload a new item',
                        text: 'Status',
                        html: uiUtils.glyph('upload')
                    },
                    function onNew(){
                        u.error('not implemented yet')
                    }
                )


                uiUtils.addBtn(
                    {
                        title: 'Show progress and items',
                        text: 'Status',
                        html: uiUtils.glyph('trash')
                    },
                    function onNew(){
                        return
                        var url = uiUtils.getLocation('getStatus2', 6022);
                        uiUtils.openNewWindow(url)

                        u.error('not implemented yet ')
                    }
                )
            })


        }

        p.createUI1 = function createUI1() {


            return;

            uiUtils.addSection(function onAddReuse() {
                uiUtils.br()
                uiUtils.hr()

                uiUtils.addLabel({text:'R', width:lblWidth+0})
                /*

                 uiUtils.addLabel(
                 {//id:'txtRefreshTaskName',
                 //addSpacerBefore:true,
                 tooltip:"Reuse existing item",
                 html:u.glyph('inbox')})
                 */

                uiUtils.spacer()
                uiUtils.addSelect({
                    text:'yeah',
                    tooltip:'Reuse this',
                    id:'ddPrevTasksR',
                    fxDone:self.onReuseThisPreviousJob
                })
                self.data.ui.ddPrevTasksR = uiUtils.lastId();
                uiUtils.updateSelect('ddPrevTasksR', [1,2,3,4,5]);


                return //fix this later
                uiUtils.addBtn(
                    {
                        title: 'Upload a new item',
                        text: 'Status',
                        html: uiUtils.glyph('upload')
                    },
                    function onNew(){
                        u.error('not implemented yet')
                    }
                )


                uiUtils.addBtn(
                    {
                        title: 'Show progress and items',
                        text: 'Status',
                        html: uiUtils.glyph('trash')
                    },
                    function onNew(){
                        return
                        var url = uiUtils.getLocation('getStatus2', 6022);
                        uiUtils.openNewWindow(url)

                        u.error('not implemented yet ')
                    }
                )
            })


            uiUtils.addSection(function onAddTaskName() {
                uiUtils.br()
                uiUtils.hr()
                uiUtils.addLabel({id:'x',
                    width:lblWidth+0,
                    text:'Task Name'})
                uiUtils.spacer();
                uiUtils.addTextInput({
                    placeholder:'Task Name',
                    id:'txtTaskName',
                    onDebounce:function onChanged(newName) {
                        self.data.lastNameIsDefault = false;
                        console.log('debouched', newName)
                        uiUtils.show(self.data.ui.txtRefreshTaskName)
                    }
                })
                self.data.ui.txtTaskName = uiUtils.lastId();


                uiUtils.addLabel({
                    text:uiUtils.getTimestamp()+'.json',
                    id:'txtTaskDate'
                })
                self.data.ui.txtTaskDate = uiUtils.lastId();
                uiUtils.addLabel({id:'txtRefreshTaskName',
                    addSpacerBefore:true,
                    tooltip:"refresh name",
                    text:'reload'})
                self.data.ui.txtRefreshTaskName = uiUtils.lastId();
                uiUtils.setHtml(self.data.ui.txtRefreshTaskName, uiUtils.glyph('refresh'))
                uiUtils.makeBtn(self.data.ui.txtRefreshTaskName, 'Refresh Name')
                uiUtils.onClick(self.data.ui.txtRefreshTaskName, function onClickedRefresh() {
                    self.data.lastNameIsDefault = true;
                    self.data.lastNameType = null
                    uiUtils.hide(self.data.ui.txtRefreshTaskName)
                    uiUtils.setText(self.data.ui.txtTaskName, '');
                })
                uiUtils.hide(self.data.ui.txtRefreshTaskName)


                uiUtils.br()
                uiUtils.addLabel({id:'x',
                    width:lblWidth+0,
                    text:''})
                uiUtils.spacer();
                uiUtils.addTextInput({
                    placeholder:'Task Name Override',
                    id:'txtTaskNameOverride',
                    onDebounce:function onChanged(newName) {
                        //self.data.lastNameIsDefault = false;
                        //console.log('debouched', newName)
                        //uiUtils.show(self.data.ui.txtRefreshTaskName)
                    }
                })
                self.data.ui.txtTaskNameOverride = uiUtils.lastId();

                uiUtils.hr()
            })

        }

        p.createUI2 = function createUI2() {

            var divParent = $('#divSaveArea');
            var div = uiUtils.addDiv('divAreaInput').ui;
            divParent.append(div);
            self.data.ui.divParent = uiUtils.lastId();



            //   self.renderHelper.idRequires('txtBEE', 'self.data.listFileList')
            //  self.renderHelper.blockIfNull( self.data.ui.divParent, 'self.data.listDlManifest')
            //$('#divSaveArea').html('')
            //var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );


            uiUtils.br()
            uiUtils.hr()

            uiUtils.addLabel({text:'Input', width:lblWidth, addSpaceAfter:true})

            uiUtils.addLabel({text:"", id:"txtUpdateStatus"})
            self.data.ui.txtConfigServerStatus = uiUtils.lastId();
            uiUtils.socket.addListener('updateStatus',
                function onFxDone_OnGotStatusMessage(msg) {
                    uiUtils.setText(self.data.ui.txtConfigServerStatus,
                        msg.msg)
                    uiUtils.clearText(3, self.data.ui.txtConfigServerStatus)

                    var txt = msg.msg


                    var time = uiUtils.secs(self.data.timeStart, new Date()).toFixed(1);
                    txt = '<b>' + time + ':' + '</b> ' + txt;

                    $('#messages').append($('<li>').html(txt));

                    uiUtils.scrollToBottom($('#flexmsg_box'))
                    // $('#flexmsg_box').text('asdf')


                })
            uiUtils.br()


            uiUtils.btnDefaults = {minWidth:100}

            var h = {}
            h.create1Off = function create1Off() {

                uiUtils.addRadio({name: 'searchType', value: '1off',
                    addSpacerAfter:true, selected:true}, 'radioSearchType')

                uiUtils.addChange(function onBook(e, ui, val) {
                    console.error('ok', e, ui, val)
                    self.data.searchType = e;
                    window.lastWindowSelection = e;
                }, null, true)

                if ( window.lastWindowSelection ) {
                    setTimeout(function asdf() {
                        console.log('xy', window.lastWindowSelection)
                        uiUtils.setRadioVal('searchType', window.lastWindowSelection, true)
                    }, 999)
                    // uiUtils.setVal2('searchType', window.lastWindowSelection )

                }

                self.data.ui.txtUIRadio = uiUtils.lastId();


                uiUtils.addRow('searchType_1_off_span',
                    function onAdd1ff() {


                        uiUtils.addLabel({
                            text: "1 Off",
                            width: lblWidth,
                            title: 'Search for 1 item'
                        })
                        // div.append('1 Off');
                        uiUtils.spacer();
                        uiUtils.addTextInput({
                            text: 'sia mp3 single',
                            placeholder: 'query',
                            id: 'txtOneOffQuery',
                            onDebounce: function onChanged(newName) {
                                console.log('debouched', newName)
                            }
                        })
                        self.data.ui.txtOneOffQuery = uiUtils.lastId();

                        //console.error('what is mag', self.onGetMag)
                        uiUtils.addBtn({
                            text: 'Get Mag',
                            addSpacerBefore: true,
                            fxClick: self.onGetMag,
                            data: {
                                query: self.getValFrom(self.data.ui.txtOneOffQuery),
                                cmd: 'searchpb'
                            }
                        })

                        uiUtils.addBtn({
                            id: 'btnCreateDM_query',
                            text: 'Create DM',
                            addSpacerAfter: true,
                            data: {
                                tor: self.getValFromData('queryTor'),
                                query: self.getValFrom(self.data.ui.txtOneOffQuery),
                                title: self.utils.combineFields('"1off"', 'query'),
                                cmd: 'makemani'
                            },
                            fxClick: self.onCreateDM,
                            enabled: false
                        })
                        self.data.ui.btnCreateDM_query = uiUtils.lastId();
                        uiUtils.disable(self.data.ui.btnCreateDM_query);

                        uiUtils.addLabel({id: "txtQueryResultInfo", text: ''})
                        self.data.ui.txtQueryResultInfo = uiUtils.lastId();

                        uiUtils.style('margin-bottom', '-1px')

                    }, true);

                uiUtils.leaveRow()
                uiUtils.br()

            }

            self.types.radioSearchType = 'searchType'

            h.createListIds = function createListIds(){
                uiUtils.addRadio({name:'searchType', value:'listLsIds', addSpacerAfter:true})

                uiUtils.addRow('searchType_listLsIds_span',
                    function onAdd1ff() {
                        uiUtils.addLabel({text:"List ls Ids", width:lblWidth})
                        // div.append('1 Off');
                        uiUtils.spacer();
                        uiUtils.addTextInput({
                            text:'ls051393312',
                            placeholder:'list ids seperated by commas/space',
                            id:'txtListIds',
                            onDebounce:function onChanged(newName) {
                                console.log('debouched', newName)
                            } })
                        self.data.ui.txtListIds = uiUtils.lastId();


                        var btn = u.lastUI;
                        console.log('max1', btn.text())
                        //debugger;

                        uiUtils.addBtn({
                            text: 'Get Lists & Create DM 2',
                            addSpacerBefore:true,
                            fxClick: self.onGetListsAndCreateDM,
                            data:{
                                //query:self.getValFrom(self.data.ui.txtName),
                                listIds:self.getValFrom(self.data.ui.txtListIds),

                                //query:self.getValFrom(self.data.ui.txtOneOffQuery),
                                title:self.utils.combineFields('"List ls Ids"','abv:listIds'),

                                cmd:'listids'

                            }
                        })

                        var btn = u.lastUI;
                        console.log('max', btn.text())

                        self.renderHelper.idRequiresVal(u.getLast(), self.data.ui.txtListIds)


                    }, true);
                uiUtils.br()
            }

            h.createListOfTt_Ids = function createListOfTt_Ids(){
                uiUtils.addRadio({name:'searchType', value:'listTTIds', addSpacerAfter:true})
                uiUtils.addLabel({text:"List tt Ids", width:lblWidth})
                // div.append('1 Off');
                uiUtils.spacer();
                var defaultText = [
                    'tt0068646',
                    'tt0108052',
                    'tt0108757'
                ].join(', ')
                uiUtils.addTextInput({
                    text:defaultText,
                    placeholder:'imdbids , or " "',
                    id:'txtTTIds',
                    onDebounce:function onChanged(newName) {
                        console.log('debouched', newName)
                    } })
                self.data.ui.txtTTIds = uiUtils.lastId();

                uiUtils.addBtn({
                    text: 'Create DM 3',
                    addSpacerBefore:true,
                    fxClick: self.onGetListsAndCreateDM,
                    data:{
                        listIds:self.getValFrom(self.data.ui.txtTTIds),
                        // listMethod:'ttIds',
                        // listStoreMethod:'ttIds',
                        title:self.utils.combineFields('"ttids"','abv:listIds'),
                        cmd:'listids',
                        wrapType: "ttIds"
                    }
                })

                uiUtils.br()
            }
            h.createIdList = function createIdList(){
                return;
                uiUtils.addLabel({text:"List ttIds", width:lblWidth})
                // div.append('1 Off');
                uiUtils.spacer();
                var defaultText = [
                    'tt0068646',
                    'tt0108052',
                    'tt0108757'
                ].join(', ')
                uiUtils.addTextInput({
                    text:defaultText,
                    placeholder:'imdbids , or " "',
                    id:'txtTTIds',
                    onDebounce:function onChanged(newName) {
                        console.log('debouched', newName)
                    } })
                self.data.ui.txtTTIds = uiUtils.lastId();

                uiUtils.addBtn({
                    text: 'Create DM',
                    addSpacerBefore:true,
                    fxClick: self.onGetListsAndCreateDM,
                    data:{
                        listIds:self.getValFrom(self.data.ui.txtTTIds),
                        // listMethod:'ttIds',
                        // listStoreMethod:'ttIds',
                        cmd:'listids',
                        wrapType: "ttIds"
                    }
                })

                uiUtils.br()
            }
            h.create_dlConfigList = function create_dlConfigList(){
                uiUtils.addRadio({name:'searchType', value:'imdbSearch', addSpacerAfter:true})
                uiUtils.addLabel({text:"IMDB Search", width:lblWidth-0})
                uiUtils.spacer();

                uiUtils.addDiv(
                    {id:'dl config',
                        width:180
                    })
                //uiUtils.addBorder();
                uiUtils.makeInline();
                uiUtils.changeContainer();

                uiUtils.addDD({
                    id:"ddContentType",
                    options:['Movies', "TV"],
                    addSpaceAfter:true,
                });
                self.data.ui.ddContentType = uiUtils.lastId();

                uiUtils.addDD({
                    id:"ddSortType",
                    options:['Popularity', "Views"],
                    addSpaceAfter:false,
                });
                self.data.ui.ddSortType = uiUtils.lastId();

                uiUtils.br();

                var year = new Date().getFullYear();

                //uiUtils.addLabel({text:"", width:lblWidth})
                //uiUtils.spacer();
                uiUtils.addNumber({
                    id:"ddSearchYearStart",
                    defaultValue:year,
                    width:60,
                    addSpaceAfter:true,
                });
                self.data.ui.ddSearchYearStart = uiUtils.lastId();

                uiUtils.addNumber({
                    id:"ddSearchYearEnd",
                    defaultValue:year,
                    width:60,
                    addSpaceAfter:true,
                });
                self.data.ui.ddSearchYearEnd = uiUtils.lastId();

                uiUtils.addNumber({
                    id:"ddHowMany",
                    defaultValue:50,
                    defaultValue:5,
                    tooltip:"Limit per year",
                    width:60,
                    addSpaceAfter:true,
                });
                self.data.ui.ddHowMany = uiUtils.lastId();

                uiUtils.popContainer();

                self.toLowerCase =function toLowerCase(val) {
                    val = val.toLowerCase();
                    return val;
                }

                uiUtils.addBtn({
                    text: 'Create DM 4',
                    addSpacerBefore:true,
                    fxClick: self.onGetListsAndCreateDM,
                    data:{
                        contentType:self.getValFrom(self.data.ui.ddContentType),
                        type:self.getValFrom(self.data.ui.ddContentType,self.toLowerCase, 'TV'),
                        maxImdbListSize:self.getValFrom(self.data.ui.ddHowMany),
                        sortType:self.getValFrom(self.data.ui.ddSortType),
                        year:self.getValFrom(self.data.ui.ddSearchYearStart),
                        yearEnd:self.getValFrom(self.data.ui.ddSearchYearEnd),
                        cmd:'listids',
                        wrapType: "imdbSearch",
                        title:self.utils.combineFields('"imdb"','type',
                            'sortType',
                            'year',
                            'yearEnd',
                            'maxImdbListSize'),
                    }
                })


                uiUtils.br();

                return;
            }

            h.createFile = function createFile(){
                uiUtils.addLabel({text:"File", width:lblWidth})
                // div.append('1 Off');
                uiUtils.spacer();
                uiUtils.addTextInput({
                    text:'',
                    placeholder:'auto complete file names',
                    id:'txtOnOffQuery',
                    onDebounce:function onChanged(newName) {
                        console.log('debouched', newName)
                    } })
                self.data.ui.txtName = uiUtils.lastId();

                uiUtils.addBtn({
                    text: 'Create DM',
                    addSpacerBefore:true,
                    fxClick: self.onGetMag
                })

                uiUtils.br()
            }

            h.createQueryUrl = function createQueryUrl(){
                return;
                uiUtils.addLabel({text:"QueryUrl", width:lblWidth})
                // div.append('1 Off');
                uiUtils.spacer();
                uiUtils.addTextInput({
                    text:'',
                    placeholder:'query str',
                    id:'txtOnOffQuery',
                    onDebounce:function onChanged(newName) {
                        console.log('debouched', newName)
                    } })
                self.data.ui.txtName = uiUtils.lastId();

                uiUtils.addBtn({
                    text: 'Perform Search & Create DM',
                    addSpacerBefore:true,
                    fxClick: self.onGetMag
                })

                uiUtils.br()
            }


            h.create1Off();
            h.createListIds();
            h.createListOfTt_Ids();
            h.createIdList();
            h.create_dlConfigList();
            // h.createFile(); //TODO: This is by the task name ...
            h.createQueryUrl();





            function extraStuff() {

                uiUtils.addSelect({
                    text: 'yeah',
                    id: 'ddPaper',
                })
                self.data.ui.recentPages = uiUtils.lastId();
                uiUtils.updateSelect('ddPaper', [1, 2, 3, 4, 5]);




                //uiUtils.addBtn()
                uiUtils.addBtn(
                    {
                        text: 'Load',
                    },
                    function onRetrieve() {
                        var newName = uiUtils.getVal2(self.data.ui.recentPages);
                        console.log('onRetrieve', newName);
                        //return;
                        self.autoSave(false, function onSaveDone() {
                            //self.data.lastSaveName = self.data.currentName;
                            //self.removeOldName( self.data.lastSaveName);
                            console.log('auto saved damn thing')
                            self.data.currentName = newName;
                            self.onRetrieve(function onRetrieved() {
                                console.log('saved and rerieved')
                                self.render();
                            });
                        });
                    }
                )


                uiUtils.spacer();

                uiUtils.addBtn(
                    { text: 'Delete', },
                    function onDelete() {
                        var newName = uiUtils.getVal2(self.data.ui.recentPages);
                        console.log('onDelete - remove from recents', newName);
                        self.autoSave(false, onSaveDone_RemoveFromList)
                        function onSaveDone_RemoveFromList() {
                            console.log('auto saved damn thing')
                            self.removeFile(newName, onRemovedFromList_UpdateUI)
                        };

                        function onRemovedFromList_UpdateUI() {
                            console.log('file removed, update ui')
                            if (self.data.currentName != newName) ;
                            {
                                self.getRecentPageList();
                                return; //finished
                            }

                            self.getRecentPageList(self.haveNewListLoadFirstOne);

                        };
                    }
                )



                uiUtils.spacer();
                uiUtils.addBtn(
                    {
                        text: 'New',
                    },
                    function onNew() {
                        var newName = uiUtils.getVal2(self.data.ui.recentPages);
                        console.log('onNew - remove from recents', newName);
                        self.autoSave(false, onSaveDone_RemoveFromList)
                        function onSaveDone_RemoveFromList() {
                            console.log('auto saved ');
                            // self.removeFile(newName, onRemovedFromList_UpdateUI)

                            self.onNew();
                        }
                    }
                )


                uiUtils.br()

                uiUtils.addBtn({
                    text: 'Test Save',
                }, self.onSaveTest)

                uiUtils.spacer();

                uiUtils.addBtn({
                    text: 'Test Retrieve',
                }, self.onRetrieveTest)

                uiUtils.spacer();

                uiUtils.addBtn({
                    text: 'Refresh',
                }, self.getRecentPageList);


                uiUtils.br();
                uiUtils.br();
            }

        }
        p.createUI3 = function createUI3() {
            var divParent = $('#divSaveArea');
            var div = uiUtils.addDiv('divAreaRun').ui;
            self.data.ui.divAreaRun = uiUtils.lastId();

            divParent.append(div);
            //$('#divSaveArea').html('')
            //var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );

            uiUtils.br()
            uiUtils.hr()

            self.renderHelper.blockIfNull( self.data.ui.divAreaRun, 'self.data.listDlManifest')

            div.append('Run');
            //once the x is ready, ten u can disable
            uiUtils.br()


            self.types.uploadAndRun = 'uploadAndRun'
            var _UploadAndRun =   {
                url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                ip:self.data.ip,
                port:self.data.portHoist2,
                cmd: self.types.uploadAndRun
                //fileManfiest is added automatically ..
            }

            /*       uiUtils.addBtn({
             title:'Dl',
             text: '~',
             title: 'Download File List',
             text: 'Status',
             html: uiUtils.glyph('cloud-download'),
             */

            uiUtils.addBtn(
                {
                    text: 'Upload & Run',
                    html:  uiUtils.glyph('play'),
                    tootlip: 'uploads and runs current file, will end current file running',
                    fxClick: self.onServerTask,
                    data:_UploadAndRun
                }
            )
            /*,

             function onUploadAndRun(){
             var name = self.getTaskTitle();
             console.log('run with', name);

             var data = {};

             data.taskName = name;

             data.taskName = t.data.listDlManifest.split('/').slice(-1)

             var url = uiUtils.getLocation('useConfig', 6022);

             if ( window.socketAddress ) {
             var ip = window.socketAddress.split(':')[0];
             url = url.replace(window.location.hostname, ip)
             debugger
             }


             // return;
             uiUtils.getUrl(url, function onGotRecentList(sdf){
             console.log('onGotRecentList', sdf)

             }, data);

             return;
             }
             )
             */
            // uiUtils.spacer();

            uiUtils.addBtn(
                {
                    text: 'Stop',
                    html:  uiUtils.glyph('stop'),
                },
                function onStop(){
                    var url = uiUtils.getLocation('stop', 6022);
                    uiUtils.getUrl(url, function onStop2(sdf){
                        console.log('onStop2', sdf)
                    }, null);
                }
            )


            uiUtils.spacerSlim();
            uiUtils.addBtn(
                {
                    title: 'Show progress and items',
                    text: 'Status',
                    html: uiUtils.glyph('th-list')
                },
                function onNew(){
                    var url = uiUtils.getLocation('getStatus2', 6022, self.data.baseBreedUrl);
                    uiUtils.openNewWindow(url)


                }
            )


            //uiUtils.spacer();
            uiUtils.addBtn({
                    title:'Show All Elements',
                    text: '~',
                    title: 'Show progress and items',
                    text: 'Status',
                    html: uiUtils.glyph('list-alt')
                },
                function onNew(){
                    var url = uiUtils.getLocation('getStatus', 6022, self.data.baseBreedUrl);
                    uiUtils.openNewWindow(url)
                }
            )


            uiUtils.spacer();


            uiUtils.addBtn({
                    title:'Dl',
                    text: '~',
                    title: 'Show More options',
                    text: 'Show Menu Options',
                    html: uiUtils.glyph('menu-right')
                },
                function onNew(){
                }
            )

            uiUtils.addBtn({
                    title:'Dl',
                    text: '~',
                    title: 'Download Manifest',
                    text: 'Status',
                    html: uiUtils.glyph('download-alt')
                },
                function onNew(){
                }
            )

            return;
        }

        p.createVerifyBlock = function createVerifyBlock() {

            var divParent = $('#divSaveArea');
            var div = uiUtils.addDiv('divAreaVerify').ui;
            divParent.append(div);
            //$('#divSaveArea').html('')
            //var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );

            uiUtils.br()
            uiUtils.hr()

            div.append('Verify');

            uiUtils.spacerSlim();

            uiUtils.addBtn({
                    title:'nudge',
                    text: '~',
                    title: 'Reset Socket',
                    text: 'Status',
                    html: uiUtils.glyph('repeat'),
                    fxClick: self.onServerTaskNudge,
                    //  data:downloadButtonData
                }
            )
            u.fadeInOnHover(uiUtils.lastUI)

            uiUtils.spacerSlim();

            uiUtils.addBtn({
                    title:'clear',
                    text: '~',
                    title: 'clear log',
                    text: 'Status',
                    html: uiUtils.glyph('blackboard'),
                    fxClick: self.onServerTaskClear,
                    //  data:downloadButtonData
                }
            )
            u.fadeInOnHover(uiUtils.lastUI)



            uiUtils.br()

            self.data.forwardOutputType = {};
            self.types.dlRemoteFileList = 'dlRemoteFileList';

            var downloadButtonData =   {
                url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                ip:self.data.ip,
                port:self.data.portHoist2,
                ///howh to get this?
                //fileManifest:self.getFxVal(self.data.utils.getManifestName),
                //url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                cmd: self.types.dlRemoteFileList
            }

            uiUtils.addBtn({
                    title:'Dl',
                    text: '~',
                    title: 'Download File List',
                    text: 'Status',
                    html: uiUtils.glyph('cloud-download'),
                    fxClick: self.onServerTask,
                    data:downloadButtonData
                }
            )


            var initData = u.clone(downloadButtonData);
            initData.initGFFRM = true;
            self.onServerTask(null, initData)




            uiUtils.spacerSlim();
            uiUtils.addBtn({
                    title:'Dl',
                    text: '~',
                    title: 'View File List',
                    text: 'Status',
                    html: uiUtils.glyph('info-sign'),
                    fxClick: self.openThings,
                    data:{
                        file:self.getValFromData('self.data.fileFileList'),
                    }
                },
            )

            //data.fileFileList = self.data.fileFileList;
            //data.fileManifest = self.data.fileManifest;





            uiUtils.addLabel({id:'txtDlRemoteFileListStatus',
                addSpacerBefore:true,
                text:''})
            self.data.ui.txtDlRemoteFileListStatus = uiUtils.lastId();
            u.br()




            var widthIndent = 72
            function addNewMethods() {
                uiUtils.spacer({width:widthIndent});
                self.types.taskCheckProgressLite = 'taskClearLocalDB';
                uiUtils.addBtn({
                        title: 'Task Clear  Local DB',
                        text: 'Status',
                        html: uiUtils.glyph('remove'),
                        fxClick: self.onServerTask,
                        data: {
                            url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                            ip:self.data.ip,
                            port:self.data.portHoist2,
                            cmd: self.types.taskCheckProgressLite
                        }
                    }
                )
                uiUtils.spacerSlim();

                self.types.taskCheckProgressLite = 'taskImportIntoLocalDB';
                uiUtils.addBtn({
                        title: 'Task Import into Local DB',
                        text: 'Status',
                        html: uiUtils.glyph('upload'),
                        fxClick: self.onServerTask,
                        data: {
                            url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                            ip:self.data.ip,
                            port:self.data.portHoist2,
                            cmd: self.types.taskCheckProgressLite
                        }
                    }
                )
                uiUtils.spacerSlim();


                u.br()
            }


            addNewMethods()


            function addManiFilterMethods() {
                uiUtils.spacer({width:widthIndent});
                self.types.taskCheckProgressLite = 'taskFilterManifestLocally';
                uiUtils.addBtn({
                        title: 'Filter Manifest Locally',
                        text: 'Status',
                        html: uiUtils.glyph('modal-window'),
                        fxClick: self.onServerTask,
                        data: {
                            url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                            ip:self.data.ip,
                            port:self.data.portHoist2,
                            cmd: self.types.taskCheckProgressLite
                        }
                    }
                )
                uiUtils.spacerSlim();

                self.types.taskCheckProgressLite = 'taskFilterManifestGlobally';
                uiUtils.addBtn({
                        title: 'Filter Manifest Globally',
                        text: 'Status',
                        html: uiUtils.glyph('globe'),
                        fxClick: self.onServerTask,
                        data: {
                            url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                            ip:self.data.ip,
                            port:self.data.portHoist2,
                            cmd: self.types.taskCheckProgressLite
                        }
                    }
                )
                uiUtils.spacerSlim();


                u.br()
            }


            addManiFilterMethods()


            uiUtils.collector.start()

            self.types.taskCheckProgressLite = 'taskCheckProgressLite';
            uiUtils.addBtn({
                    title: 'Check Progress Lite',
                    text: 'Status',
                    html: uiUtils.glyph('adjust'),
                    fxClick: self.onServerTask,
                    data: {
                        url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                        ip:self.data.ip,
                        port:self.data.portHoist2,
                        cmd: self.types.taskCheckProgressLite
                    }
                }
            )
            uiUtils.spacerSlim();
            /*uiUtils.addBtn({
             title:'Dl',
             text: '~',
             title: 'View Sanitized files',
             text: 'Status',
             html: uiUtils.glyph('info-sign'),
             fxClick: self.openThings,
             data:{
             file:self.getValFromData('self.data.fileT2_CheckProgressList'),
             }
             }
             )*/
            uiUtils.spacer({width:'25'});
            uiUtils.spacerSlim();
            //self.types.checkProgressLite = 'checkProgressLite';
            uiUtils.addLabel({id:'txt_'+self.types.taskCheckProgressLite });
            self.data.ui.txt_checkProgressLite = uiUtils.lastId();
            self.data.forwardOutputType[self.types.taskCheckProgressLite] =
                self.data.ui.txt_checkProgressLite

            uiUtils.addLabel({id:['txt',self.types.taskCheckProgressLite,'output']});
            self.renderHelper.pushData( 'self.data.'+ [self.types.taskCheckProgressLite, 'output'].join('_') );
            //self.renderHelper
            u.br()


            self.types.sanitizeFileList = 'sanitizeFileList';
            uiUtils.addBtn({
                title: 'Santize file list - Generate sanitize report',
                text: 'Status',
                html: uiUtils.glyph('compressed'),
                fxClick: self.onServerTask,
                data: {
                    url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                    ip:self.data.ip,
                    port:self.data.portHoist2,
                    cmd: self.types.sanitizeFileList
                }
            })
            uiUtils.spacerSlim();
            /* uiUtils.addBtn({
             title:'Dl',
             text: '~',
             title: 'View Sanitized files',
             text: 'Status',
             html: uiUtils.glyph('info-sign'),
             fxClick: self.openThings,
             data:{
             file:self.getValFromData('self.data.fileT3_SantiziedFileList'),
             }
             }  )
             */
            function onX(){
                var y = self.data.listDlManifest+'.recipet.json'
                return y
            }
            uiUtils.addBtn({
                    title:'Dl',
                    text: '~',
                    title: 'View File List',
                    text: 'Status',
                    html: uiUtils.glyph('info-sign'),
                    fxClick: self.openThings,
                    data:{
                        file:self.getFx(onX),
                    }
                },
            )

            uiUtils.addLabel({id:'txt_'+self.types.sanitizeFileList });
            self.data.ui.txt_sanitizeFileList = uiUtils.lastId();
            self.data.forwardOutputType[self.types.sanitizeFileList] = self.data.ui.txt_sanitizeFileList

            //
            uiUtils.addLabel({id:['txt',self.types.sanitizeFileList,'output']});
            self.renderHelper.pushData( 'self.data.'+ [self.types.sanitizeFileList, 'output'].join('_') );


            /*     u.br()


             uiUtils.addBtn({
             title:'Tell Box to run import scriopt',
             text: '~',
             title: 'Remote Import files',
             text: 'Status',
             html: uiUtils.glyph('transfer')
             },
             function onOpenDb(){
             console.log('...')
             var url = u.getVal2(self.data.ui.txtPort)
             u.changePort = function changePort(url, portTo) {
             if ( url.includes(':')) {
             url = url.split(':')[0]
             }

             if ( url.startsWith('http')==false) {
             url = 'http://'+url;
             }
             var output = url + ':'+ portTo

             return output;
             }
             url = uiUtils.changePort(url, 5600)
             url += '/index.html567.html'
             console.log(url, '')
             uiUtils.openNewWindow(url)
             }
             )

             */
            u.br()

            self.types.importRecFile = 'importRecFile';
            uiUtils.addBtn({
                    title:'Push Sanitized Files to Server',
                    text: '~',
                    title: 'Upload back to server',
                    text: 'Status',
                    html: uiUtils.glyph('cloud-upload'),
                    fxClick: self.onServerTask,
                    data: {
                        url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                        ip:self.data.ip,
                        port:self.data.portHoist2,
                        cmd: self.types.importRecFile
                    }
                }
            )
            uiUtils.spacerSlim();
            uiUtils.addLabel({id:'txt_'+self.types.importRecFile });
            self.data.ui.txt_importRecFile = uiUtils.lastId();
            self.data.forwardOutputType[self.types.importRecFile] = self.data.ui.txt_importRecFile

            uiUtils.addLabel({id:['txt',self.types.importRecFile,'output']});
            self.renderHelper.pushData( 'self.data.'+ [self.types.importRecFile, 'output'].join('_') );


            var uiElements = uiUtils.collector.stop()

            //idRequires
            self.renderHelper.idRequires(uiElements, 'self.data.fileFileList')


            self.render();

            return;


            uiUtils.addTextInput({
                text:self.data.url,
                id:'txtIpHostpost_Verify',
                onDebounce:function onChanged(newName) {
                    console.log('debouched', newName)
                    self.autoSave(false, onSaved_SaveWithNewName)

                    function onSaved_SaveWithNewName(){
                        console.debug('saved content');
                        self.onSave(onSaved_WithNewName_DeleteOldName, newName)
                    }

                    function onSaved_WithNewName_DeleteOldName(){
                        self.data.lastSaveName = self.data.currentName;
                        console.debug('delete old name', self.data.lastSaveName);
                        self.removeFile( self.data.lastSaveName, onRemovedOldFile)
                        self.data.currentName = newName;
                    }

                    function onRemovedOldFile(){
                        console.debug('complete')
                        self.getRecentPageList();
                    }

                }
            })

            self.data.ui.txtIpPortVerify = uiUtils.lastId();


            uiUtils.addBtn(
                {
                    text: 'DL Manifest & Files',
                    addSpacer: true,
                    fxClick: self.onTestHoistServer,
                    data: {
                        //url: self.data.ui.txtBreedServerUrl,
                        //tor:self.getValFromData('queryTor'),
                        url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                        cmd: 'testit'
                    }
                }
            );

            uiUtils.addBtn(
                {
                    text: 'Test',
                    addSpacer: true,
                    fxClick: self.onTestHoistServer,
                    data: {
                        //url: self.data.ui.txtBreedServerUrl,
                        //tor:self.getValFromData('queryTor'),
                        url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                        cmd: 'testit'
                    }
                }
            );
            /*   uiUtils.addBtn(
             {
             text: 'Get File List',
             addSpacer: true,
             fxClick: self.onHoistServerTask,
             data: {
             //url: self.data.ui.txtBreedServerUrl,
             //tor:self.getValFromData('queryTor'),
             url:self.getValFrom(self.data.ui.txtBreedServerUrl),
             cmd: 'getFileList'
             }
             }
             );*/
            /*  uiUtils.addBtn(
             {
             text: '% Complete',
             title:'folder found in expected directory',
             addSpacer:true,
             fxClick: self.onHoistServerTask,
             data: {
             url:self.getValFrom(self.data.ui.txtBreedServerUrl),
             cmd: 'sanitizeFileList'
             }
             },
             self.statusComplete
             );
             */
            uiUtils.addBtn(
                {
                    text: 'Santize File List',
                    tooltip: 'Check each id for oexpected match',
                    addSpacer:true,
                    fxClick: self.onServerTask,
                    data: {
                        url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                        ///howh to get this?
                        //fileManifest:self.getFxVal(self.data.utils.getManifestName),
                        //url:self.getValFrom(self.data.ui.txtBreedServerUrl),
                        cmd: 'sanitizeFileList'
                    }
                },
                self.statusComplete
            );

            var idDivHoistStatus = 'divContentLogStatus'
            var div = uiUtils.addDiv(idDivHoistStatus).ui;


            console.log('self',self.data.socketHoist)
            self.data.socketHoist.listenForStatus( idDivHoistStatus);
            self.data.socket.listenForStatus( idDivHoistStatus);

            /*
             uiUtils.addBtn(
             {
             text: 'Content Verify',
             tooltip: 'Check each id for oexpected match',
             addSpacer:true
             },
             self.statusComplete
             );

             */


            uiUtils.br(); uiUtils.br();

        }


        p.getPreviousTasks = function getPreviousTasks(fxDone) {

            var url = self.data.baseDataUrl
                + '/listFiles';
            uiUtils.getUrl(url, function getPreviousTasksList(sdf){
                console.log('getPreviousTasksList', sdf)
                uiUtils.setSelect(self.data.ui.ddPrevTasks,
                    sdf, 'name', 'name');
                //clickofactiontosethitsvalu
                uiUtils.selectAction(self.data.ui.ddPrevTasks)
                callIfDefined(fxDone);
            }, null, function onError(){
                alert('server is not running start autoaveserver')
            });
        }


        function setupTasks() {
            p.getTasks = function getTasks(fxDone) {
                var url = self.data.baseDataUrl
                    + '/listTasks';
                uiUtils.getUrl(url, function getTasks_OK(taskList){
                    console.log('getTasks_OK', taskList)
                    //TODO: Ensure curent list is selected
                    uiUtils.setSelect(self.data.ui.ddPrevTaskList,
                        taskList, 'name', 'name');

                    callIfDefined(fxDone);
                }, null, function onError(){
                    alert('could not list srv')
                });
            }
            p.saveTask = function saveTask(fxDone) {
                var url = self.data.baseDataUrl
                    + '/saveTask';

                /* copy all relevant props

                 */


                //  debugger
                var task = {}

                self.taskXName()

                task.name = uiUtils.getVal2(self.data.ui.txtTaskName2)

                //self.data.taskName;
                task.fileFileList = self.data.fileFileList
                task.listDlManifest = self.data.listDlManifest

                task.props = {}
                task.props = uiUtils.ripProps($('#divAreaInput'))


                console.info('boo', task)
                //return

                var data = {};
                data.name = task.name;
                data.body = task;

                uiUtils.postUrl(url,
                    data, function getPreviousTasksList(sdf){
                        self.getTasks();
                        u.cid(fxDone);
                    },  function onError(){
                        // alert('server is not running start autoaveserver')
                    });
            }

            // setTimeout(p.saveTask, 1500)
            p.removeTask = function removeTask(fxDone) {
                var url = self.data.baseDataUrl
                    + '/removeTask';
                var data = {};
                data.name =
                    uiUtils.getVal2(self.data.ui.ddPrevTaskList );
                // debugger
                uiUtils.getUrl(url, function getPreviousTasksList(sdf){
                    self.getTasks();
                    u.cid(fxDone);
                }, data, function onError(){
                    alert('server is not running start autoaveserver')
                });
            }

            p.tasks = {};
            p.tasks.getTask = function getTask(fxDone) {
                var url = self.data.baseDataUrl
                    + '/getTask';
                var data = {};

                // debugger

                data.name =
                    uiUtils.getVal2(self.data.ui.ddPrevTaskList );
                // debugger
                uiUtils.getUrl(url, function getPreviousTasksList(task){

                    console.info(task)


                    self.data.fileFileList =  task.fileFileList
                    self.data.listDlManifest =  task.listDlManifest
                    self.render();
                    //debugger;
                    uiUtils.ripPropsSet(task.props)
                    u.cid(fxDone);
                }, data, function onError(){
                    alert('server is not running start autoaveserver')
                });
            }


        }
        setupTasks();


        p.keyup = function onKeyup(content, e) {
            if ( content == '' ) {
                console.log('cleared')
                self.autoSave();
                self.data.currentName = null;
            }
            if ( self.data.currentName == null ) {
                self.data.currentName = Math.random()
                self.render();
            }
        }



        p.render = function render() {
            console.log('render', self.data.ui.txtName)
            uiUtils.setText(self.data.ui.txtName, self.data.currentName);

            //if task not set, disable all of verify
            //if task not set, disable upload and stop

            if ( self.data.fileManifest ) {
                //uiUtils.enable(self.data.runStep)
            } else {
                //uiUtils.disable(self.data.runStep)
            }


            var mini = {}
            mini.listDlManifest = self.data.listDlManifest;
            mini = JSON.stringify(mini)
            uiUtils.setVal(self.data.ui.txtCurrentTaskValues , mini)

            //get list from server ....?

            self.renderHelper.render();



        }

        function createUtils() {
            p.utils = {};
            p.utils.setFocus = function setFocus() {
                tinyMCE.activeEditor.focus();
                // $("#mainContent").tinymce().focus();
                tinymce.execCommand('mceFocus',false,'mainContent');
                uiUtils.later( tinymce.execCommand, 'mceFocus',false,'mainContent')//;)
            }

            /*  p.getUrlR = function getUrlR(route) {
             var url = 'http://'+ window.location.hostname + ':' + 6007
             + '/'+route;
             // var str = ''
             return url
             }
             */

            p.utils.getPath = function getPath(part) {
                if ( part.startsWith('/')) {

                } else {
                    part = '/'+part;
                }
                var url = 'http://'+ window.location.hostname + ':' + 6018
                    + part;
                return url;
            }

        }
        createUtils()


        function defineRemoteUtils() {

            p.utils.makeTaskName = function makeTaskName(type, name) {


                var taskTitle = self.getTaskTitle();
                if ( self.data.lastNameIsDefault == false ) {
                    console.warn('last name already set')
                    return taskTitle;
                }
                //is taskName at default? false, then leave and use that name
                if ( self.data.lastNameIsDefault == true || self.data.lastNameIsDefault== null) {
                    //  was the lastType this type, then ignore
                    if ( self.data.lastNameType == type ) {
                        console.warn('type is same')
                        return taskTitle;
                    }

                }


                self.resetTaskTitle(name);
                self.data.lastNameIsDefault = true;
                self.data.lastNameType = type;
                var taskTitle = self.getTaskTitle();
                return taskTitle;

                //self.resetTaskTitle2();


                /*
                 is task name defined? then set default
                 */

            }


            function defineRemotingMethods() {
                p.onGetMag = function onGetMag(e) {
                    console.error('e','onGetMag', self.data.socket)
                    //console.error(e)
                    var target = $(e.target)
                    console.log('d', target.attr('data'), e.target.data);
                    var data = self.utils.processDARK(e.target.data);
                    console.log('yy', data);

                    uiUtils.disable(self.data.ui.btnCreateDM_query);
                    uiUtils.socket.emitOne('runcmd', data, function onResult(data2) {
                        console.log('obobodf..sdf. .sdf.sd', data2, data2.a);
                        uiUtils.enable(self.data.ui.btnCreateDM_query);
                        if ( data2.a != null )
                            uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.a.title)
                        else {
                            uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.b)
                        }
                        self.data.queryTor = data2.a;
                    })

                }

                p.onGetListsAndCreateDM = function onGetListsAndCreateDM(e) {
                    //  console.error('e', self.data.socket)
                    //console.error(e)
                    var target = $(e.target)
                    console.log('onGetListsAndCreateDM', target.attr('data'), e.target.data);
                    var data = self.utils.processDARK(e.target.data);


                    if ( data.listMethod == null ) {
                        data.listIds = sh.splitStrIntoArray(data.listIds)
                    } else {
                        data[data.listStoreMethod] = sh.splitStrIntoArray(data[data.listMethod])
                    }

                    var nameOfTask = 'listIds'
                    if ( data.wrapType  ) {
                        nameOfTask =  data.wrapType;
                    }


                    if ( nameOfTask == 'imdbSearch') {
                        taskName = self.utils.makeTaskName(this,
                            [nameOfTask,
                                data.type,
                                data.type,
                                data.maxImdbListSize,
                                data.year,
                                data.yearEnd
                            ].join('_'));
                    } else {
                        var taskName = self.utils.makeTaskName(this, nameOfTask+'_'+data.listIds[0]+'_'+data.listIds.length);
                    }

                    data.taskName = taskName;

                    if  (data.title) {
                        var title = data.title;
                        console.log('title', title, data);
                        data.title = title;
                        data.taskName = title;
                    }
                    //debugger;

                    console.log('going with', this.name, data);

                    // return;
                    uiUtils.disable(self.data.ui.btnCreateDM_query);
                    // uiUtils.socket.nextEmit(this);
                    uiUtils.socket.emitOne('runcmd', data, function onResult(data2) {
                        console.log('obobodf..sdf. .sdf.sd', data2, data2.a);
                        uiUtils.enable(self.data.ui.btnCreateDM_query);

                        if ( data2.a != null ) {
                            uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.a.title)
                            self.data.listDlManifest = data2.a.fileDLManifest;
                        }
                        else {
                            uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.b)
                        }
                        self.data.queryTor = data2.a;


                        self.saveTask();
                        self.render();

                    })
                    return;
                    // return;
                    self.data.socket.emit('cmd',
                        data
                    )
                }

                p.onCreateDM = function onCreateDM(e) {
                    var data = self.utils.getUIData(e);
                    console.log('onCreateDM', data);
                    var title = data.title
                    console.log('title', title, data);
                    data.title = title;
                    uiUtils.socket.emitOne('runcmd', data, function onResult(data2) {
                        console.log('onCreatedDM', data2, data2.a);

                        self.data.listDlManifest = data2.a.fileDLManifest;
                        self.saveTask();
                        self.render();
                        //uiUtils.enable(self.data.ui.btnCreateDM_query);
                        //uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.a.title);
                    })
                }

                p.onTestHoistServer = function onTestHoistServer(e) {
                    // console.error(e)
                    var target = $(e.target)
                    // console.log('d', target.attr('data'), e.target.data);
                    var data = self.utils.processDARK(e.target.data);
                    console.log('onServerTask', data);
                    var title = self.getTaskTitle();
                    //   uiUtils.disable(self.data.ui.btnCreateDM_query);
                    uiUtils.socket.nextEmit(this);
                    console.log('title', title, data);
                    data.title = title;
                    /*uiUtils.socket.addListener('updateStatus', function onStatusUp dated(e) {
                     console.log('e1', e)
                     })
                     */
                    /*   self.data.socketHoist.on('updateStatus', function onStatusUpdated(e) {
                     console.log('e2', e)
                     })*/
                    self.data.socketHoist.emit2('runcmd', data, function onResult(data2) {
                        console.log('obobodf..sdf. .sdf.sd', data2, data2.a);
                        uiUtils.enable(self.data.ui.btnCreateDM_query);
                        uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.a.title);
                    });
                    return;
                }

                p.onHoistServerTask = function onHoistServerTask(e) {
                    var target = $(e.target)
                    var data = self.utils.processDARK(e.target.data);
                    var title = self.getTaskTitle();
                    uiUtils.socket.nextEmit(this);
                    console.log('onHoistServerTask', 'title', title, data);
                    data.title = title;
                    self.data.socketHoist.emit2('runcmd', data, function onResult(data2) {
                        console.log('obobodf..sdf. .sdf.sd', data2, data2.a);

                        if ( data.cmd == 'getFileList') {
                            console.log('...')
                            self.data.socketHoist.updateStatus('pussy')
                            self.data.socketHoist.updateStatus('dl file', data2.a)

                            //var url = http://127.0.0.1:6022/desktop_f4o5qnc.list.files.txt
                            var url =self.data.urlHoist + '/' + data2.a;
                            self.data.socketHoist.updateStatus('dl file', url)

                            var cmdDlFileList = {}
                            cmdDlFileList.cmd = 'dlFileList';
                            cmdDlFileList.url  = url;
                            self.data.socket.emit2('runcmd', cmdDlFileList, function onResult(data3) {
                                console.log('cmdDLFileList', data3)
                            })
                        }
                        //uiUtils.enable(self.data.ui.btnCreateDM_query);
                        //uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.a.title);
                    });
                    return;
                }

                p.openThings = function openThings(e, dataOverride) {
                    var data = {}
                    var targetData = self.utils.getUIData(e,dataOverride);
                    data.file = targetData.file;

                    url = self.utils.getPath('/openFile')

                    uiUtils.getUrl(url, function onGotRecentList(sdf){
                            console.log('onGotRecentList', sdf)
                            //debugger
                            return;
                            uiUtils.setSelect(self.data.ui.recentPages,
                                sdf, 'name', 'name');
                            callIfDefined(fxDone);
                        },
                        data);
                }
                p.onServerTaskNudge = function onServerTaskNudge(e, dataOverride) {
                    var data = {}
                    //var targetData = self.utils.getUIData(e,dataOverride);
                    //data.file = targetData.file;

                    url = self.utils.getPath('/resetSockets')

                    uiUtils.getUrl(url, function onGotRecentList(sdf){
                            console.log('resetSockets', sdf)
                            return;
                        },
                        data);
                }
                p.onServerTaskClear = function onServerTaskClear(e, dataOverride) {
                    var data = {}
                    $('#messages').empty();
                    var url = self.utils.getPath('/clearLog')

                    uiUtils.getUrl(url, function onGotRecentList(sdf){
                            console.log('resetSockets', sdf)
                            return;
                        },
                        data);
                }

                p.onServerTask = function onServerTask(e, dataOverride) {
                    // console.error(e)
                    var data = self.utils.getUIData(e, dataOverride);
                    console.log('onServerTask--', data);
                    //var title = self.getTaskTitle();
                    var title = self.taskXName();

                    //   uiUtils.disable(self.data.ui.btnCreateDM_query);
                    //uiUtils.socket.nextEmit(this);

                    data.title = title;
                    //self.data.fileFileList = self.data.hostname+'.list.files.txt'
                    data.fileFileList = self.data.fileFileList;
                    self.data.fileManifest = title;
                    data.fileManifest = self.data.fileManifest;
                    data.fileManifest = self.data.listDlManifest

                    console.log('title', title, data);
                    data.url = self.getValFrom(self.data.ui.txtBreedServerUrl)

                    u.contentAfter = function contentAfter(str, find) {
                        if ( str.includes(find)) {
                            str = str.split(find)[1]
                        }
                        return str;
                    }

                    u.contentBefore = function contentBefore(str, find) {
                        if ( str.includes(find)) {
                            str = str.split(find)[0]
                        }
                        return str;
                    }

                    uiUtils.getIp =  function getIP(url) {
                        url = u.contentAfter(url, '://')
                        url = u.contentBefore(url, ':')
                        return url;
                    }

                    //uiUtils.getIp(data.url)
                    data.url = uiUtils.getVal2(self.data.ui.txtBreedServerUrl)
                    data.ip = uiUtils.getIp(data.url)
                    //data.port =

                    //return;
                    uiUtils.socket.emit('runcmd', data, function onResult(data2) {
                        console.log('obobodf..sdf. .sdf.sd', data2, data2.a);

                        if ( data.cmd == 'sanitizeFileList' ) {

                            console.log('ok?', data2.a.percent, data2.a.found)
                            self.data.socket.updateStatus(data2.a.percent, data2.a.found)
                            return;
                        }

                        uiUtils.enable(self.data.ui.btnCreateDM_query);
                        uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.a.title);
                    })
                    return;
                }


                p.setTaskTitle = function setTaskTitle() {
                    uiUtils.setText(self.data.ui.txtTaskName, self.data.txtTaskName)
                }


                /*     p.getTaskTitle = function getTaskTitle() {
                 self.data.txtTaskName =  uiUtils.getVal2(self.data.ui.txtTaskName)
                 var taskName = self.data.txtTaskName +
                 uiUtils.getVal2(self.data.ui.txtTaskDate);

                 var txtTaskNameOverride = uiUtils.getVal2(self.data.ui.txtTaskNameOverride)
                 if ( txtTaskNameOverride ) {
                 taskName = txtTaskNameOverride;
                 }
                 //console.log('..', 'txtTaskNameOverride', txtTaskNameOverride)
                 return taskName;
                 }*/


                p.getTaskTitle =  p.taskXName = function tasXName() {
                    var name  = uiUtils.getVal2(self.data.ui.txtTaskName2)
                    //debugger
                    if ( name == null || name == '') {
                        var defaultName = 'Task'+'_'+uiUtils.getTimestamp2(true);
                        var ui = uiUtils.setVal2(self.data.ui.txtTaskName2, defaultName);
                        //  debugger
                    }
                    //debugger
                    var name  = uiUtils.getVal2(self.data.ui.txtTaskName2)
                    return name;

                }

                /*
                 self.taskXName = function tasXName() {
                 var name  = uiUtils.getVal2(self.data.ui.txtTaskName2)
                 //debugger
                 if ( name == null || name == '') {
                 var defaultName = 'Task'+'_'+uiUtils.getTimestamp2(true);
                 var ui = uiUtils.setVal2(self.data.ui.txtTaskName2, defaultName);
                 //  debugger
                 }
                 //debugger
                 var name  = uiUtils.getVal2(self.data.ui.txtTaskName2)
                 return name;

                 }*/

                p.resetTaskTitle = function resetTaskTitle(dv) {
                    var ui = self.data.ui.txtTaskName;
                    uiUtils.ifEmpty(ui, function createFakeName(ui){
                        if ( dv ) {
                            ui.val(dv);
                            return;
                        }
                        ui.val(Math.random());
                    })
                }
                p.resetTaskTitle2 = function resetTaskTitle2() {
                    var ui = self.data.ui.txtTaskDate;
                    ui.html('_'+uiUtils.getTimestamp());
                }
            }

            defineRemotingMethods();


            function defineutils()  {

                self.getValFrom = function getValFrom(val, fxPost) {
                    var instruction = {'getValFromId':val};
                    if ( fxPost ) {
                        instruction.fxPost = fxPost;
                    }

                    return instruction
                }

                self.getValFromData = function getValFromData(val) {
                    return {'getValFromData':val}
                }

                self.getFx = function getFx(fx) {
                    return {'getFx':fx}
                }

                self.utils.combineFields = function comF() {
                    var args = u.args(arguments)
                    return {'combineFields':args}
                }



                p.utils.processDARK = function processDark(s) {
                    if ( s == null ) {
                        console.error('s is null', s)
                    }
                    var other = {};
                    $.each(s, function processFieldIfHasInstructions (k, v) {
                        other[k] = v;
                        if (v.getValFromId) {
                            var val = $(v.getValFromId).val();
                            if ( v.fxPost ) {
                                val = v.fxPost(val)
                            }
                            other[k] = val;
                        }
                        if ( v.getValFromData) {
                            var val = self.data[v.getValFromData];
                            if ( v.getValFromData.startsWith('self.')) {
                                val = eval(v.getValFromData);
                            }
                            other[k] = val;
                        }

                        if ( v.getFx) {
                            var val = v.getFx()
                            other[k] = val;
                        }

                        if ( v.combineFields) {
                            var fieldsToCombine = v.combineFields;

                            var resultsOfCombine = [];

                            $.each(fieldsToCombine, function onX(k, v) {
                                var val = v;
                                if ( v.startsWith('"') && v.endsWith('"')) {
                                    val = val.slice(1,-1)
                                } else if ( v.startsWith('abv' ) ) {
                                    var field_ = v.split(':')[1];
                                    var orig = val = other[field_]
                                    val = val.slice(0,7) +'_'+ val.length
                                    // debugger
                                }
                                else {
                                    val = other[v]
                                }

                                resultsOfCombine.push(val)
                            });

                            var str = resultsOfCombine.join('_');
                            other[k] = str;
                        }

                    });
                    return other;
                }

                p.utils.getUIData = function getUIData(e,dataOverride) {
                    if ( dataOverride == null ) {
                        var target = $(e.target)
                        var targetData = e.target.data;
                    } else {
                        targetData = dataOverride;
                    }

                    // console.log('d', target.attr('data'), e.target.data);
                    var data = self.utils.processDARK(targetData);
//debugger
                    return data;
                }


            }
            defineutils()

            /* self.data.socket.on('searchpb', function(msg){
             if (msg.indexOf('eval-')==0) {
             msg = msg.replace('eval-', '')
             eval(msg);
             }
             console.log('chat')
             //var objDiv = document.getElementById("messages");
             //objDiv.scrollTop = objDiv.scrollHeight;
             msg  = msg.replace(/\n/g, "<br />");
             $('#messages').append($('<li>').html(msg));
             h.scrollToBottom();
             });*/

        }
        defineRemoteUtils();

        p.destroyTAS = function destroyTAS() {
            self.data.active = false;
        }
    }



    var t = new Db2()
    t.init()

    window.t = t;

}

window.onInitDB = onInitDB
onInitDB()