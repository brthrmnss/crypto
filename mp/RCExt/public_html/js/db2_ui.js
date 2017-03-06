/**
 * Created by user1 on 1/1/2017.
 */
function splitStrIntoArray(str, splitOnChar, allowNull) {
    allowNull = defaultValue(allowNull, true)
    splitOnChar = defaultValue(splitOnChar, null)
    if (str == null) {
        if (allowNull) {
            return []
        } else {
            throw new Error('str not valid', str)
        }
    }
    var output = null
    //ignore if split
    if (str instanceof Array) {
        return str;
    }
    //allow user to seopcify char to split
    if (splitOnChar != null) {
        if (str.indexOf(splitOnChar) != -1) {
            output = str.split(splitOnChar)
        } else {
            output = []
        }
    }
    else {
        //otherwsie fallback on common options
        if (str.indexOf(', ') != -1) {
            output = str.split(', ')
        } else if (str.indexOf(',') != -1) {
            output = str.split(',')
        } else if (str.indexOf(' ') != -1) {
            output = str.split(' ')
        } else {
            output = [str] //just one
        }
    }
    return output
}
var sh = {}
sh.splitStrIntoArray = splitStrIntoArray


function onInitDB() {
    //console.log('...ddd')

    function Db2() {
        var self = this;
        self.data = {}
        self.data.port = 6012;
        self.data.portHoist = 6012;
        self.data.portData = '6008';
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

        self.data.dbg = {};
        self.data.dbg.autosaving = false;
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


            self.connectSocket();

            t.createUI();
            t.createUI2();
            t.createUI3();
            t.createVerifyBlock();

            self.isConnected()


            self.getPreviousTasks();


           // uiUtils.setText(self.data.ui.txtTaskNameOverride, 'listIds_ls051393312.json');
        }


        function defineRemote() {

            p.connectSocket = function connectSocket() {
                //if ( self.data.socket !+ null )
                //whyat?
                var socket = io( );
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

                var socket = io( 'http://'+self.data.ip + ':'+ portHoist );
                socket.on('chat message', function(msg){
                    if (msg.indexOf('eval-')==0) {
                        msg = msg.replace('eval-', '')
                        eval(msg);
                    }
                    console.log('chat')
                    $('#messages').append($('<li>').text(msg));
                    h.scrollToBottom();
                });
                uiUtils.socket.upgradeSocket(socket)
                self.data.socketHoist = socket;
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
                console.log('what is url', url)
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

        var lblWidth = 80;

        p.createUI = function createUI() {

            $('#divSaveArea').html('')
            self.data.ui.save = '#divSaveArea'
            $(self.data.ui.save).css('padding', '10px');
            var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );


            uiUtils.br(); uiUtils.br();
            uiUtils.addLabel({text:"Server Brd", id:"txtServer"})
            uiUtils.makeBtn(uiUtils.lastId(), 'Test socket');
            uiUtils.onClick(uiUtils.lastId(), self.testSocket)

            uiUtils.br()
            uiUtils.addTextInput({
                text:self.data.url,
                id:'txtIpHostpost',
                onDebounce:function onChanged(newName) {
                    console.log('debouched', newName)
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

            uiUtils.socket.addListener('updateStatus', function onStatusUpdated(e) {
                console.log('e', e)
                var msg = e.msg;
                uiUtils.setText(self.data.ui.txtServerStatus , msg);
                self.data.lastLogText = msg;
                setTimeout(function onClearStatusText() {
                    if ( self.data.lastLogText == msg ) {
                        uiUtils.setText(self.data.ui.txtServerStatus , '');
                    }
                }, 5000)
            });


            uiUtils.br()
            uiUtils.hr()





            uiUtils.addSection(function onAddTaskName() {
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

                uiUtils.addLabel({text:"", width:lblWidth+0})
                uiUtils.spacer()
                uiUtils.addSelect({
                    text:'yeah',
                    id:'ddPrevTasks',
                })
                self.data.ui.ddPrevTasks = uiUtils.lastId();
                uiUtils.updateSelect('ddPrevTasks', [1,2,3,4,5]);

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
            //$('#divSaveArea').html('')
            //var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );

            uiUtils.addLabel({text:'Input', width:lblWidth, addSpaceAfter:true})

            uiUtils.addLabel({text:"", id:"txtUpdateStatus"})
            self.data.ui.txtConfigServerStatus = uiUtils.lastId();
            uiUtils.socket.addListener('updateStatus',
                function onFxDone_OnGotStatusMessage(msg) {
                    uiUtils.setText(self.data.ui.txtConfigServerStatus,
                        msg.msg)
                    uiUtils.clearText(3, self.data.ui.txtConfigServerStatus)
                })
            uiUtils.br()


            uiUtils.btnDefaults = {minWidth:100}

            var h = {}
            h.create1Off = function create1Off(){

                uiUtils.addRow();
                uiUtils.addLabel({text:"1 Off",
                    width:lblWidth,
                    title: 'Search for 1 item'})
                // div.append('1 Off');
                uiUtils.spacer();
                uiUtils.addTextInput({
                    text:'sia mp3 single',
                    placeholder:'query',
                    id:'txtOneOffQuery',
                    onDebounce:function onChanged(newName) {
                        console.log('debouched', newName)
                    } })
                self.data.ui.txtOneOffQuery = uiUtils.lastId();

                self.getValFrom = function getValFrom(val) {
                    return {'getValFromId':val}
                }

                self.getValFromData = function getValFromData(val) {
                    return {'getValFromData':val}
                }



                //console.error('what is mag', self.onGetMag)
                uiUtils.addBtn({
                    text: 'Get Mag',
                    addSpacerBefore:true,
                    fxClick: self.onGetMag,
                    data:{
                        query:self.getValFrom(self.data.ui.txtOneOffQuery),
                        cmd:'searchpb'
                    }
                })

                uiUtils.addBtn({
                    id:'btnCreateDM_query',
                    text: 'Create DM',
                    addSpacerAfter:true,
                    data:{
                        tor:self.getValFromData('queryTor'),
                        query:self.getValFrom(self.data.ui.txtOneOffQuery),
                        cmd:'makemani'

                    },
                    fxClick: self.onCreateDM,
                    enabled:false
                })
                self.data.ui.btnCreateDM_query = uiUtils.lastId();


                uiUtils.addLabel({id:"txtQueryResultInfo", text:''})
                self.data.ui.txtQueryResultInfo = uiUtils.lastId();

                uiUtils.style('margin-bottom', '-1px')

                uiUtils.leaveRow()


                //   uiUtils.br()

            }
            h.createListIds = function createListIds(){
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

                uiUtils.addBtn({
                    text: 'Get Lists & Create DM',
                    addSpacerBefore:true,
                    fxClick: self.onGetListsAndCreateDM,
                    data:{
                        //query:self.getValFrom(self.data.ui.txtName),
                        listIds:self.getValFrom(self.data.ui.txtListIds),
                        cmd:'listids'

                    }
                })

                uiUtils.br()
            }

            h.createListOfTt_Ids = function createListOfTt_Ids(){
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
                uiUtils.addLabel({text:"dl config", width:lblWidth-0})
                uiUtils.spacer();

                uiUtils.addDiv(
                    {id:'dl config',
                        width:170
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

                //uiUtils.addLabel({text:"", width:lblWidth})
                //uiUtils.spacer();
                uiUtils.addNumber({
                    id:"ddSearchYearStart",
                    defaultValue:2017,
                    width:60,
                    addSpaceAfter:true,
                });
                self.data.ui.ddSearchYearStart = uiUtils.lastId();

                uiUtils.addNumber({
                    id:"ddSearchYearEnd",
                    defaultValue:2017,
                    width:60,
                    addSpaceAfter:true,
                });
                self.data.ui.ddSearchYearEnd = uiUtils.lastId();

                uiUtils.popContainer();

                uiUtils.addBtn({
                    text: 'Create DM',
                    addSpacerBefore:true,
                    fxClick: self.onGetListsAndCreateDM,
                    data:{
                        contentType:self.getValFrom(self.data.ui.ddContentType),
                        sortType:self.getValFrom(self.data.ui.ddSortType),
                        yearStart:self.getValFrom(self.data.ui.ddSearchYearStart),
                        yearEnd:self.getValFrom(self.data.ui.ddSearchYearEnd),
                        cmd:'listConfig',
                        wrapType: "ttIds"
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
                    {
                        text: 'Delete',
                    },
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
            uiUtils.br(); uiUtils.br();
            var divParent = $('#divSaveArea');
            var div = uiUtils.addDiv('divAreaRun').ui;
            divParent.append(div);
            //$('#divSaveArea').html('')
            //var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );


            div.append('Run');
            uiUtils.br()

            uiUtils.addBtn(
                {
                    text: 'Upload & Run',
                    tootlip: 'uploads and runs current file, will end current file running'
                },
                function onUploadAndRun(){
                    var name = self.getTaskTitle();
                    console.log('run with', name);

                    var data = {};
                    data.taskName = name;

                    var url = uiUtils.getLocation('useConfig', 6012);

                    // return;
                    uiUtils.getUrl(url, function onGotRecentList(sdf){
                        console.log('onGotRecentList', sdf)

                    }, data);

                    return;
                }
            )



            uiUtils.spacer();

            uiUtils.addBtn(
                {
                    text: 'Stop',
                },
                function onStop(){
                    var url = uiUtils.getLocation('stop', 6012);
                    uiUtils.getUrl(url, function onStop2(sdf){
                        console.log('onStop2', sdf)
                    }, null);
                }
            )


            uiUtils.spacer();
            uiUtils.addBtn(
                {
                    text: 'Status',
                },
                function onNew(){
                    var url = uiUtils.getLocation('getJSONPath', 6012);
                    uiUtils.openNewWindow(url)

                }
            )



            uiUtils.br()

            return;
        }
        p.createVerifyBlock = function createVerifyBlock() {


            var divParent = $('#divSaveArea');
            var div = uiUtils.addDiv('divAreaVerify').ui;
            divParent.append(div);
            //$('#divSaveArea').html('')
            //var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );


            uiUtils.br(); uiUtils.br();
            div.append('Verify');
            uiUtils.br()
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
            uiUtils.addBtn(
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
            );
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
            uiUtils.getUrl(url, function onGotRecentList(sdf){
                // console.log('onGotRecentList', sdf)
                uiUtils.setSelect(self.data.ui.ddPrevTasks,
                    sdf, 'name', 'name');
                callIfDefined(fxDone);
            }, null, function onError(){
                alert('server is not running start autoaveserver')
            });
        }


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
        }

        function createUtils() {
            p.utils = {};
            p.utils.setFocus = function setFocus() {
                tinyMCE.activeEditor.focus();
                // $("#mainContent").tinymce().focus();
                tinymce.execCommand('mceFocus',false,'mainContent');
                uiUtils.later( tinymce.execCommand, 'mceFocus',false,'mainContent')//;)
            }


        }
        createUtils()


        function defineRemoteUtils() {
            p.utils.processDARK = function processDark(s) {
                var other = {};
                $.each(s, function (k, v) {
                    other[k] = v;
                    if (v.getValFromId) {
                        var val = $(v.getValFromId).val();
                        other[k] = val;
                    }
                    if ( v.getValFromData) {
                        var val = self.data[v.getValFromData];
                        other[k] = val;
                    }

                });
                return other;
            }

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
                    console.error('e', self.data.socket)
                    //console.error(e)
                    var target = $(e.target)
                    console.log('d', target.attr('data'), e.target.data);
                    var data = self.utils.processDARK(e.target.data);
                    console.log('yy', data);

                    uiUtils.disable(self.data.ui.btnCreateDM_query);
                    uiUtils.socket.nextEmit(this);
                    uiUtils.socket.emit('runcmd', data, function onResult(data2) {
                        console.log('obobodf..sdf. .sdf.sd', data2, data2.a);
                        uiUtils.enable(self.data.ui.btnCreateDM_query);

                        if ( data2.a != null )
                            uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.a.title)
                        else {
                            uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.b)
                        }
                        self.data.queryTor = data2.a;
                    })
                    return;
                    // return;
                    self.data.socket.emit('cmd',
                        data
                    )
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

                    var taskName = self.utils.makeTaskName(this, nameOfTask+'_'+data.listIds[0]+'_'+data.listIds.length);

                    data.taskName = taskName;

                    console.log('going with', this.name, data);

                    // return;
                    uiUtils.disable(self.data.ui.btnCreateDM_query);
                    uiUtils.socket.nextEmit(this);
                    uiUtils.socket.emit('runcmd', data, function onResult(data2) {
                        console.log('obobodf..sdf. .sdf.sd', data2, data2.a);
                        uiUtils.enable(self.data.ui.btnCreateDM_query);

                        if ( data2.a != null )
                            uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.a.title)
                        else {
                            uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.b)
                        }
                        self.data.queryTor = data2.a;
                    })
                    return;
                    // return;
                    self.data.socket.emit('cmd',
                        data
                    )
                }

                p.onCreateDM = function onCreateDM(e) {
                    // console.error(e)
                    var target = $(e.target)
                    // console.log('d', target.attr('data'), e.target.data);
                    var data = self.utils.processDARK(e.target.data);
                    console.log('onCreateDM', data);



                    self.resetTaskTitle('1off_query_'+data.query);
                    //self.resetTaskTitle2();
                    var title = self.getTaskTitle();

                    // return;
                    //   uiUtils.disable(self.data.ui.btnCreateDM_query);
                    uiUtils.socket.nextEmit(this);
                    console.log('title', title, data);
                    data.title = title;

                    uiUtils.socket.emit('runcmd', data, function onResult(data2) {
                        console.log('obobodf..sdf. .sdf.sd', data2, data2.a);
                        uiUtils.enable(self.data.ui.btnCreateDM_query);
                        uiUtils.setHtml(self.data.ui.txtQueryResultInfo, data2.a.title);
                    })
                    return;
                    // return;
                    self.data.socket.emit('cmd',
                        data
                    )
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

                            //var url = http://127.0.0.1:6012/desktop_f4o5qnc.list.files.txt
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

                p.onServerTask = function onServerTask(e) {
                    // console.error(e)
                    var target = $(e.target)
                    // console.log('d', target.attr('data'), e.target.data);
                    var data = self.utils.processDARK(e.target.data);
                    console.log('onServerTask', data);
                    var title = self.getTaskTitle();
                    //   uiUtils.disable(self.data.ui.btnCreateDM_query);
                    uiUtils.socket.nextEmit(this);
                    
                    
                    data.title = title;
                    self.data.fileFileList = self.data.hostname+'.list.files.txt'
                    data.fileFileList = self.data.fileFileList;
                    self.data.fileManifest = title;
                    data.fileManifest = self.data.fileManifest;
                    console.log('title', title, data);
                    
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


                p.getTaskTitle = function getTaskTitle() {
                    self.data.txtTaskName =  uiUtils.getVal2(self.data.ui.txtTaskName)
                    var taskName = self.data.txtTaskName +
                        uiUtils.getVal2(self.data.ui.txtTaskDate);

                    var txtTaskNameOverride = uiUtils.getVal2(self.data.ui.txtTaskNameOverride)
                    if ( txtTaskNameOverride ) {
                        taskName = txtTaskNameOverride;
                    }
                    //console.log('..', 'txtTaskNameOverride', txtTaskNameOverride)
                    return taskName;
                }

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



}

window.onInitDB = onInitDB
onInitDB()