/*
 * A Peer is a Node.
 * Each physical server runs 1 peer which handles
 * communication to other peers
 * */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;

var MySQLDataRepo = require('./../dbconnectors/MySQLConnector').MySQLDataRepo;


function Peer() {
    var p = Peer.prototype;
    p = this;
    var self = this;

    var types = {};
    types.SyncVersion_AreYouCurrentWithMe = 'SyncVersion_AreYouCurrentWithMe';
    types.SyncGet_Records = 'SyncGet_Records'; //ask peer to send back records
    types.RequestSync = 'RequestSync';//tell peers to make sync request
    types.SyncData_SendComplete = 'SyncData_SendComplete';//tell peers to make sync request
    types.SyncData = 'SyncData'; //Data results coming back
    types.CrudCreate = 'CrudCreate';
    types.CrudUpdate = 'CrudUpdate =';
    types.CrudDelete = 'CrudDelete';

    types.debug = {}
    types.debug.syncing = 'syncing'

    p.init = function method1(url, appCode) {
        self.linksTo = [];
        self.peers = self.linksTo;
        url = sh.dv(url, {});
        self.settings = url;
        if ( self.settings.name == null ) {
            self.settings.name = self.name;
        }

        self.settings.fileSettings = 'settings/'+self.name+'_dal_node.json'
        self.settings.fileLog = 'logs/'+self.name+'_dal_node_log.txt'

        self.settings.fileDataMoves = 'logs/'+'moves.txt'
        self.utils.log.moveRecord(true);

        self.data = {};
        self.data.counts = {};
        self.data.counts.recordsSent = 0;
        self.data.counts.recordsReceived = 0;
        self.data.counts.syncAttempts = 0;
        self.data.timeStart = new Date();


        self.data.converged = false

        self.actorLog = []; //important events only ...

        self.data.port;

        self.dictPeers = {};

        self.types = {};
        self.types = types;

        self.repo = new MySQLDataRepo();
        self.repo.name = self.name;
        self.repo.init(null,  self.fxStartInit);
        self.repo.silent = true;

        self.settings.peers= [];
    }

    p.linkTo = function linkTo(peer) {
        self.linksTo.push(peer)
        self.dictPeers[peer.name]=peer;
        self.settings.peers.push(peer.name);

        peer.maxVersion = 0;
        peer.maxVersionSent = 0;

        peer.haveRecievedAllChanges = function () {
            return peer.maxVersionChanged == true;
        }

        peer.unSentChanges = function () {
            return peer.maxVersionSent != self.repo.getVersion()
        }


        peer.getName = function () {
            return self.name + '-->'+peer.name
        }


    }

    function defineUtils() {
        p.utils = {};
        /**
         * I need to forward a crud request to a pper
         * but i do not want to duplicate them
         * so go through my peers, if any of my peers, links to this node, then do not forward it
         *
         * IE, b links to a, c and d
         * requests from c, should go to a,
         * requests from a should go to c and d
         * @param x
         */
        p.utils.forwardRequestsTo = function (nodeFrom) {
            var sendTo = [];
            sh.each(self.peers, function (i, peer) {
                if (peer == nodeFrom) {
                    return;
                }
                if (peer.settings.peers.indexOf(nodeFrom.name)) {
                    return;
                }
                sendTo.push(peer);
            });

            return sendTo;
        }

        p.log = function log(msg) {
            self.actorLog.push(msg);
            if ( self.globalLog != null ) {
                self.globalLog.push(sh.getTimeStamp()+':' + msg);
            }
        }

        p.saveLog = function saveLog() {
            var strFile = each.print(self.actorLog)
            sh.writeFile(self.settings.fileLog, strFile);
            return;
            var stg = {};
            stg.name = self.settings.fileLog;
            stg.dir = 'logs';
            stg.content = strFile;
            sh.writeFile2(stg);
        }

        p.utils.log = {};
        p.utils.log.moveRecord = function (log) {
            if ( log == true ) {
                sh.writeFile(self.settings.fileDataMoves, '');
                return
            }
            var fs = require('fs');
            var time = self.data.timeStart.getTime()
            time = new Date().getTime() - self.data.timeStart.getTime();
            time = time/1000
            time = time.toFixed(0)+ ': ';
            log = time + log;
            fs.appendFile(self.settings.fileDataMoves, log+sh.n, function (err) {

            });
        }

        /**
         * Check all peers, are we converged?
         */
        p.utils.convergenceTest = function convergenceTest() {



            self.data.converged = false;
            var unconvergedPeers = [];
            /*sh.each(self.peers, function checkConvergence (i, peer) {
             if (peer.my_version != peer.version ) {
             self.proc('version mismatch',
             peer.name, peer.my_version , peer.version )
             unconvergedPeers.push(peer);
             return false;
             }
             if (peer.my_version != self.repo.getVersion() ) {
             self.proc('versions not match my current version',
             peer.name, sh.q( peer.my_version ), self.repo.getVersion(), peer.syncing )
             unconvergedPeers.push(peer);
             return false;
             }
             });*/
            /*Logic: We have converged when we have sent a max version
             that correlates with our max version to each peer.
             When each peer's maxVersion changed is false
             (meaning they have sycned all records in atleats 1 time)
             (the max version recieved did not change after the last
             incoming sync)
             */
            console.error('convergence test...', self.name)
            sh.each(self.peers, function checkConvergence (i, peer) {
                //have i recieved all changes?
                if (peer.maxVersionChanged == true  ) {
                    console.error('conv-recieved: have not confirmed max version',
                        peer.name, peer.my_version , peer.version )
                    unconvergedPeers.push(peer);
                    return false;
                }
                if ( peer.unSentChanges() ) {
                    console.error('i have not sent to peer my max version',
                        peer.maxVersionSent != self.repo.getVersion(),
                        peer.maxVersionSent - self.repo.getVersion(),
                        peer.getName(), sh.q( peer.maxVersionSent ), self.repo.getVersion(), peer.syncing )
                    unconvergedPeers.push(peer);
                    return false;
                }
            });
            if ( unconvergedPeers.length == 0 ) {
                self.data.converged = true;
                //self.log('converged')
            } else {
                self.data.converged = false;
                //self.log('converged')
            }

            self.data.lastSyncTime = new Date();
        }
    }
    defineUtils();

    function defineConnection() {
        p.connectToOthers = function connectToOthers(url, appCode) {
            var sockets = [];
            self.sockets = sockets;
            sh.each( self.linksTo, function (i,peer) {
                var url = 'http://localhost'+':'+ peer.settings.port;
                console.log('trying to reach', peer.name, url)
                var socket = require('socket.io-client')(url);

                var methodInterceptor = function methodInterceptor() {

                }
                var fxOn_Orig = socket.on;
                socket.on = function onSocketSecurityHelper (type, fx ) {
                    //asdf.g
                    fxOn_Orig(type, function securityInterceptor(){
                        arguments = sh.convertArgumentsToArray(arguments);
                        if ( self.settings.password ) {
                            if ( data.password != self.settings.password ) {
                                console.error('no auth')
                                return ;
                            }
                        }
                        fx.apply(socket, arguments);
                    });
                };
                var fxEmit = socket.emit;
                socket.emit = function emitSocketSecurityHelper (  ) {
                    arguments = sh.convertArgumentsToArray(arguments);
                    var data = arguments[0];

                    if ( self.settings.password ) {
                        data.password = self.settings.password
                    }

                    fxEmit.apply(socket, arguments);
                }

                socket.on('connect', function(){
                    console.log('connected', peer.name, self.name )
                    self.con.sync();
                });
                socket.on('event', function(data){});
                socket.on('disconnect', function(){});
                sockets.push(socket);
                peer.data.url= url;
                peer.socket = socket;
                //TODO: get stored version from db
            });


            self.connected = true
            self.fxStartInit();

        }


        p.fxStartInit = function () {

            if ( self.repo.ready != true ||
                self.connected != true
            ) {
                return
            }
            if ( self.ranInit == true ) {
                return
            }
            self.ranInit = true;
            setTimeout(function () {
                if ( self.fxStart != null )
                    self.fxStart();

            }, 500)
        }

        p.start = function start( ) {
            // self.linksTo.push(url)

            // Setup basic express server
            var express = require('express');
            var app = express();
            var server = require('http').createServer(app);
            var io = require('socket.io')(server);
            var port = process.env.PORT || 3000;
            self.defineRoutes(app)
            port = sh.dv(  self.settings.port, port);
            console.log(self.name, port );
            server.listen(port, function () {
                console.log('Server listening at port %d', port, self.name);
                self.connectToOthers();
            });
            // Routing
            app.use(express.static(__dirname + '/public'));
            // Chatroom
            // usernames which are currently connected to the chat
            var usernames = {};
            var numUsers = 0;
            io.on('connection', function (socket) {
                self.socket = socket;
                self.con.defineCrud();
                self.con.defineCrud_Sync();
                self.con.defineSync();
                var addedUser = false;
                // when the client emits 'new message', this listens and executes
                socket.on('new message', function (data) {
                    // we tell the client to execute 'new message'
                    socket.broadcast.emit('new message', {
                        username: socket.username,
                        message: data
                    });
                });
                // when the client emits 'add user', this listens and executes
                socket.on('add user', function (username) {
                    // we store the username in the socket session for this client
                    socket.username = username;
                    // add the client's username to the global list
                    usernames[username] = username;
                    ++numUsers;
                    addedUser = true;
                    socket.emit('login', {
                        numUsers: numUsers
                    });
                    // echo globally (all clients) that a person has connected
                    socket.broadcast.emit('user joined', {
                        username: socket.username,
                        numUsers: numUsers
                    });
                });
                // when the client emits 'typing', we broadcast it to others
                socket.on('typing', function () {
                    socket.broadcast.emit('typing', {
                        username: socket.username
                    });
                });



                // when the client emits 'stop typing', we broadcast it to others
                socket.on('stop typing', function () {
                    socket.broadcast.emit('stop typing', {
                        username: socket.username
                    });
                });
                // when the user disconnects.. perform this
                socket.on('disconnect', function () {
                    // remove the username from global usernames list
                    if (addedUser) {
                        delete usernames[socket.username];
                        --numUsers;
                        // echo globally that this client has left
                        socket.broadcast.emit('user left', {
                            username: socket.username,
                            numUsers: numUsers
                        });
                    }
                });
            });

        }
    }
    defineConnection();

    function defineProcesses() {

        p.con = {};
        p.connection = p.con;

        p.connection.startConnection = function startconnect() {
            // self.sycned=false;
        }

        /**
         * Tell peers to get my newest updates if they are out of
         * date with me.
         */
        p.con.sync = function sync_AskPeers(onlyThisPeer, forceSync) {
            self.settings.version = self.repo.getVersion();

            var peers = self.peers;
            if ( onlyThisPeer != null ) {
                peers = [onlyThisPeer];
            };

            self.utils.convergenceTest();
            self.proc('converged', self.data.converged);
            if ( forceSync != true && self.data.converged ) {
                //converged
                self.proc('skipping unnecessary sync');
                //Ex: This changes the grammar ...
                //syncChangesIfIHaveNewOnesToSend
                //return;
            }

            sh.each( peers, function askPeerToSync(i,peer) {

                if ( peer.syncing == true ) {
                    peer.syncAgain = true;
                    self.proc('cancel', 'sync peering', peer.name );
                    return;
                };
                self.proc('sync peering', peer.name );

                if ( peer.countSyncs == null ) {
                    peer.countSyncs = 0;
                }
                peer.countSyncs ++;

                var my_version = self.settings.version;
                /*if ( peer.my_version == null ){
                 peer.my_version = -1;//force initial sync
                 }*/
                //if ( peer.my_version !=  self.settings.version ){
                if ( peer.init != true  ){
                    peer.init = true;
                    peer.my_version = -1;//force initial sync
                    my_version = -1;
                    //FIX: should we only do this 1x time?
                }

                if( peer.limiter == null ) {
                    function Limiter() {
                        var self = this;
                        var p = this;
                        self.measurements = [];
                        p.addCount = function addCount() {
                            self.measurements.push({
                                date: new Date()
                            })
                        }

                        p.howManyInLastSecs = function howManyInLastMinute() {
                            var count = 0
                            var filtered = []
                            sh.each(self.measurements, function proces(i,x) {
                                if ( sh.time.diffLessThanSecs(x.date, 10) ) {
                                    count++
                                    filtered.push(x)
                                }
                            })
                            self.measurements = filtered;
                            return count;
                        }
                    }
                    peer.limiter = new Limiter();
                }

                peer.limiter.addCount();
                if (peer.limiter.howManyInLastSecs() > 5) {
                    console.warn('WARNING', 'lots of request from peer',self.name,
                        '-->', peer.name);
                }


                console.warn('sync requst',self.name,
                    '-->', peer.name, peer.version,  my_version );

                peer.rSync = true;
                //console.log('syncstart',peer.syncInt )
                /*
                 peer.socket.emit(types.SyncVersion_AreYouCurrentWithMe, {
                 version:peer.version,
                 // my_version:  self.settings.version my_version
                 //why do you keep setting this to my_version?
                 //this only works on end nodes ...
                 //each peer connection needs to have a sync number
                 my_version:my_version,
                 name:self.name,
                 data:sh.clone(self.settings)
                 });
                 */

                if ( self.getRecsFromPeer(peer) == false ) {
                    return;
                }
                peer.socket.emit(types.SyncGet_Records, {
                    version:peer.version,
                    my_version:my_version,
                    syncId:peer.syndIdStr,
                    name:self.name,
                    data:sh.clone(self.settings)
                });
            });
        };



        self.getRecsFromPeer = function (peer) {
            if ( peer.syncing == true ) {
                asdf.g
                self.logSync('skipping sync')
                return false;
            }
            peer.syncing = true;
            peer.countIn = 0 ;
            peer.sets = [];
            if ( peer.syncId == null ) {
                peer.syncId=0;

            }
            peer.recordsReceived = 0;
            peer.recordsSent = 0;
            peer.maxVersionChanged = false; //if set to true,
            //means newer records was recieved
            peer.syncId++;
            peer.syndIdStr = peer.getName() + '_'+peer.syncId;
            clearInterval(peer.syncInt);
            self.logSync('creating',peer.syndIdStr )
            var errorStack = new Error()
            peer.syncInt = setInterval( function longSync(){
                console.error(
                    self.settings.name, peer.name,
                    'still syncing ... after 4 secs', peer.syndIdStr)
                console.error(errorStack.stack)
                console.error(peer)
                process.exit();
            }, 4000);
        }

        /**
         * Confusing Grammar leads to confusion
         * This method is more practical
         *
         * Send my version all data to peers
         * send up to
         */
        p.con.sync_Forward = function () {
            //self.settings.version = self.repo.getVersion();
            sh.each( self.peers, function (i,peer) {
                //Translation: I am at version X for your client.x-x--xPlease send any updates
                //Check your version for me ... if there is  not a match ... request
                //an update
                peer.socket.emit(types.SyncVersion_AmICurrentWithYou, {
                    version:peer.version,
                    name:self.name,
                    data:sh.clone(self.settings)
                });
            });
        };

        p.con.requestSync = function () {

            self.repo.setVersion(requestSyncAction)

            function requestSyncAction() {
                self.settings.version = self.repo.getVersion();
                sh.each( self.peers, function (i,peer) {
                    self.proc(sh.q(self.name), 'asking', sh.q(peer.name), 'to sync');
                    peer.socket.emit(types.RequestSync, {
                        version:peer.version,
                        name:self.name,
                        data:sh.clone(self.settings)
                    });
                });
            }

        };

        p.con.defineSync = function () {
            //Translation: This peer is at version X, is he current?
            //if not, tell him to sync to me
            self.socket.on(types.SyncVersion_AreYouCurrentWithMe, function areWeInSync(data) {

                var peer = self.dictPeers[data.data.name];



                if ( peer.syncing == true ) {
                    self.procNextSyncing();
                    self.proc('already syincing', peer.getName())
                    return;
                } else {
                    self.procNextSyncing();
                    self.proc('try sync', peer.getName())
                }
                console.warn('received requst', peer.getName(), peer.syncing)

                self.data.counts.syncAttempts++;
                //peer.count.syncAttempts++
                var peers_version = data.my_version; //data.data.version;
                var peersVersion_vFrom = peers_version;

                var vMyVersionOfDbForPeer = peer.version;
                if ( peer.version == null ) {
                    vMyVersionOfDbForPeer = 0;
                }

                var msg = [types.SyncVersion_AreYouCurrentWithMe,
                    sh.q( data.name), 'has asked', 'me',
                    sh.paren(sh.q(self.name)), 'to sync with him',
                    'i my connection is at at version', vMyVersionOfDbForPeer,
                    'he is at version', peersVersion_vFrom
                ].join(' ');
                self.log(msg);
                self.procNextSyncing();
                self.proc(msg);
                self.logSync('received requst', msg)
                //self.logSync('no sync necessary', data.attemptId);

                //peersVersion_vFrom > vMyVersionOfDbForPeer
                //new peer may have records on odd versions ... if there is no match, then sync?
                if ( peersVersion_vFrom !=  vMyVersionOfDbForPeer ) {
                    // console.log('>>>>>>>>>>>>>>>>')
                    // console.log('>>>>>>>>>>>>>>>>')
                    // console.log('>>>>>>>>>>>>>>>>')
                    self.procNextSyncing();
                    self.proc('need to update', sh.q(peer.name), 'is at ',
                        peersVersion_vFrom, 'I am at',
                        vMyVersionOfDbForPeer)



                    self.getRecsFromPeer();

                    //translation: I need to update, please give me all data between versions
                    peer.socket.emit(types.SyncGet_Records, {
                        from: vMyVersionOfDbForPeer,
                        to: peersVersion_vFrom, ///my top version
                        name: self.name,
                        data: sh.clone(self.settings)
                    });
                } else {
                    self.logSync('no sync necessary', data.attemptId);
                    //FIX: Tell peer you are at version, update
                    //R: Without this check, will repeadily sync
                    /*self.syncOK = function syncOK() {
                     peer.socket.emit(types.SyncData_SendComplete, {
                     from:peersVersion_vFrom,
                     to:peersVersion_vFrom,
                     name:self.name,
                     data:sh.clone(self.settings),
                     newVersion:peersVersion_vFrom,
                     noSync:true
                     });
                     }*/
                    // self.syncOK();
                    self.utils.convergenceTest();
                }
                /*else if ( peersVersion_vFrom < vMyVersionOfDbForPeer ) {
                 self.proc('need to Reverse -- update', sh.q(peer.name), 'is at ',
                 peersVersion_vFrom, 'I am at',
                 vMyVersionOfDbForPeer)
                 self.con.sync(peer)
                 } else {
                 self.proc('no need to sync', sh.q(peer.name), 'is at ',
                 peersVersion_vFrom, 'I am at',
                 vMyVersionOfDbForPeer)
                 }*/
            });

            /*
             //Translation: This peer is at version X, is he current?
             //if not, tell him to sync to me
             self.socket.on(types.SyncVersion_AreYouCurrentWithMe, function (data) {
             var peer = self.dictPeers[data.data.name];

             var vFrom = data.version;
             var vFrom_PeersVersion = vFrom;

             var vTo = peer.version; //self.settings.version;
             vTo = self.repo.getVersion();
             if ( vTo == null ) {
             vTo = 0
             }
             var vMyVersionOfDb = vTo;




             //  var vTo = data.data.version;
             // var vFrom = self.settings.version;
             self.proc(types.SyncVersion_AmICurrentWithYou, 'sync test', self.name,
             vMyVersionOfDb ,'peers version is ', data.name, vFrom_PeersVersion);

             if ( vFrom_PeersVersion < vMyVersionOfDb ) {
             self.proc('need to update', sh.q(peer.name), 'is at ', vFrom_PeersVersion, 'I am at', vMyVersionOfDb)
             //translation: I need to update, please give me all data between versions
             peer.socket.emit(types.SyncGet_Records, {
             from:vFrom,
             to:vTo,
             name:self.name,
             data:sh.clone(self.settings)
             });
             }
             });

             */




            //TODO: should we sync all peers? ... no b/c if new node comes up it needs what
            //it needs
            //handle sync requests
            //translation: this peer needs some data to update, send back records
            self.socket.on(types.SyncGet_Records, function onSync_Get (data) {
                var peer = self.dictPeers[data.data.name];


                if ( peer.syncToId != null ) {
                    asdf.g
                }
                peer.syncToId = data.syndIdStr;
                if ( peer.syncingTo == true ) {
                    asdf.g
                }
                peer.syncingTo = true
                peer.setsOut = [];
                peer.countOut = 0

                self.data.convergedAt = new Date();
                var vFrom = data.data.version;
                var vTo = self.settings.version;
                var vSentToPeer = peer.my_version;

                // console.log =
                self.procNext();
                self.proc('Got sync request from ', sh.q(peer.name),
                    '---', types.SyncGet_Records, sh.q(self.name),
                    self.settings.version ,'from',
                    data.name, data.data.version, 'my-v', vSentToPeer);

                //self.proc(self.name, 'need to get', vFrom)

                if (vFrom == vTo && vSentToPeer == vFrom ) {
                    self.logSync('skipping sync', 'versions are the same');
                    self.utils.convergenceTest();
                    peer.syncingTo = false
                    peer.syncToId = null;
                    peer.socket.emit(types.SyncData_SendComplete, {
                        from:vFrom,
                        to:vFrom,
                        name:self.name,
                        data:sh.clone(self.settings),
                        newVersion:vFrom,
                    });
                    return;
                };

                //callback will update records
                //var records =
                //specify the last version sent to the host

                var queryLimits = {};
                if ( data.fullSync != true ) {
                    queryLimits.from = peer.maxVersionSent
                    //queryLimits.from = 'z'
                }
                self.repo.getRecords(queryLimits,
                    function onSendRecords(records, version, lastPage) {

                        var version = null;
                        if ( records.length > 0 ) {
                            version = records[0].global_updated_at.getTime();
                        } else {
                            console.error('no records sent?, not last page?', lastPage)
                        }
                        self.procNext(types.debug.syncing);
                        self.proc(sh.q(self.name)+':', 'sending ',
                            version, 'to', sh.q(peer.name), records.length,
                            peer.syncToId)

                        peer.countOut++;
                        //peer.sets.push(records)
                        peer.setsOut.push({
                            ids: sh.each.prop(records, 'id'),
                            records:records,
                            lastPage:lastPage
                        })

                        sh.each(records, function goThroughRec(i,record) {
                            var newMaxVersion = record.global_updated_at;
                            var newMaxVersion2 = newMaxVersion.getTime()
                            if ( peer.maxVersionSent < newMaxVersion2 ) {
                                peer.maxVersionSent = newMaxVersion2;
                            }
                            peer.recordsSent++;
                        })



                        peer.socket.emit(types.SyncData, {
                            from:vFrom,
                            to:version,
                            name:self.name,
                            data:sh.clone(self.settings),
                            newVersion:version,
                            records:records //TODO: enforce maximum size
                        });
                        self.data.counts.recordsSent++;
                        //if sync over ...
                        if ( lastPage ){
                            peer.socket.emit(types.SyncData_SendComplete, {
                                from:vFrom,
                                to:version,
                                name:self.name,
                                data:sh.clone(self.settings),
                                newVersion:version,
                            });

                            //peer.sets.push('lastpage')

                            peer.my_version = version;
                            peer.version = version;

                            peer.syncingTo = false;
                            peer.syncToId = peer.syncToId;
                            //
                            // self.repo.setVersion(postSyncSync_IHaveJustSendAndUpdateOut_DoesAnyoneElseNeedAnUpdate)
                            self.procOnlyNext = true;
                            self.proc('done syncing', version);
                            self.utils.convergenceTest();
                            function postSyncSync_IHaveJustSendAndUpdateOut_DoesAnyoneElseNeedAnUpdate() {
                                //do not version here .. this was a send...
                                //bk:peerversioning
                                //peer.version = self.repo.getVersion();
                                setTimeout(function(){

                                    //self.con.requestSync();
                                    self.con.sync();
                                }, 1000);
                            };

                        }
                    });
                //if ( vFrom > vTo ) {
                //}
            });

            self.socket.on(types.SyncData, function onRecieveData (data) {
                var peer = self.dictPeers[data.data.name];
                var vTo = data.data.version;
                vTo = data.newVersion;
                var vFrom = peer.version;
                self.procNext();
                self.proc(  types.SyncData, self.name,
                    self.settings.version ,'from', data.name,vFrom, '-->', vTo, peer.syndIdStr);
                self.proc(types.SyncData, 'connection', sh.paren(sh.q(self.name)+','+sh.q(peer.name))
                    , 'up to version', vTo);

                sh.each(data.records, function goThroughRec(i,record) {
                    if ( self.settings.showRecordsIncoming == true )
                    {
                        console.error(peer.name+'-->'+self.name+':',record.id, record.source_node, record.name )
                    }
                    var y =[ peer.name+'-->'+self.name+':',record.id, record.source_node, record.name].join(' ')
                    self.utils.log.moveRecord(y);

                    var newMaxVersion = record.global_updated_at;
                    var newMaxVersion2 = new Date(newMaxVersion).getTime()

                    if ( peer.maxVersion < newMaxVersion2 ) {
                        peer.maxVersion = newMaxVersion2
                        peer.maxVersionChanged = true;
                        //self.logSync('--updated version to',  peer.maxVersion )
                    }

                    peer.recordsReceived++;

                })




                var records= data.records;
                peer.countIn+= records.length;
                peer.sets.push({
                    ids: sh.each.prop(data.records, 'id'),
                    records:data.records,
                    //lastpage:lastpage
                })



                self.data.counts.recordsReceived++;
                self.repo.upsert(data.records);
                peer.version = vTo;
                peer.version = peer.maxVersion; //still not sending more recent
                // peer.my_version  = vTo;


            });


            self.socket.on(types.SyncData_SendComplete, function (data) {
                var peer = self.dictPeers[data.data.name];
                var vTo = data.data.version;
                var vFrom = peer.version;
                vTo = data.newVersion;
                //console.log(  types.SyncData_SendComplete, self.name,
                //    self.settings.version ,'from', data.name,vFrom, '-->', vTo);
                self.procNext(types.debug.syncing);
                var msg = [types.SyncData_SendComplete,'brought', 'connection', sh.paren(sh.q(self.name)+','+sh.q(peer.name))
                    , 'up to version', vTo, '|', peer.syndIdStr].join(' ');

                //self.proc(msg)
                self.logSync(msg);
                self.proc('send data complete');
                peer.version = vTo;

                //?peer.my_version = vTo;
                peer.sets.push('true1')
                //var otherPeers = self.utils.forwardRequestsTo(peer)
                //no need toworry about peer as # shuld be thesame
                //self.con.requestSync();
                //tell my peers to sync to me
                self.repo.setVersion(function setVersionAfterSync(){
                    //Fix: my version s the version sent down the wire
                    //peer.my_version = self.repo.getVersion();
                    self.utils.convergenceTest();
                    self.log(msg + ' i have x records');
                    peer.sets.push('true2')
                    self.logSync(types.SyncData_SendComplete,
                        'finished',
                        self.repo.getVersion(), self.data.converged);
                    // console.log('done sync',peer.syncInt )
                    peer.rSync = false;
                    peer.syncing = false;
                    clearInterval(peer.syncInt)
                    peer.sets.push('true3')
                    //if ( data.noSync != true ) {

                    //logic: keep syncing until no new records are recieved
                    if ( peer.maxVersionChanged == false ) {
                        self.logSync('no records changed' , '', 'maxVersionChanged'
                            ,'/xhnFWS...');
                        if ( peer.doReverseSync != false ) {
                            peer.doReverseSync = false;
                            // self.con.sync();
                            setTimeout(function onUpdate() {
                                self.con.requestSync();
                            }, 500)
                        }
                        return;
                    }
                    //logic: keep syncing, until done
                    peer.doReverseSync = true;
                    setTimeout(function onUpdate() {
                        self.logSync(types.SyncData_SendComplete,
                            'resync',
                            self.repo.getVersion(), self.data.converged);
                        self.con.sync();
                    }, 599)



                })


            });

            self.socket.on(types.RequestSync, function (data) {
                self.con.sync();
            });
        }




        p.con.syncDance = function () {

            var dance = new Dance();
            from
            to

            /*
             tell b we are dancing
             lock
             send count my records
             send 1 and 5 record to b,
             b will confirm it recieved to (should it send it's own updates?) ... no for simplicty
             send 5-10 .. until all done

             flaw: what if records inbetween were modified

             2  - simpliest cast
             send first 5 record ids and updated time to b.
             if b has an issue, it will send those 5 records to B
             does offset have to match?

             how to implement:
             modify sendrecords to , sendrecords_verify
             sendrecords_verify only sends updated dates and sources
             b recieves sendrecords_verify pulls query for dates, and matches them, if there is an error send
             get full set,
             if OK;
             b sends - get record after X -- this means no dancing
             a, if no more , just send sync complete

             if Bad:
             b sends sendrecord_verify_getfullset
             a rec sr_v_gfs and sends back full records
             */
        }

        /**
         * C R U D L
         * Create method stubs for each action
         * update the version after each update, forward processing to repo
         *
         * method to send creation
         * method to handle creation
         */
        p.connection.defineCrud = function defineCrud() {

            p.connection.create = function create(records, version) {
                version = sh.dv(version, self.repo.getVersion());
                self.settings.version = version;
                sh.each( self.peers, function (i,peer) {
                    peer.socket.emit(types.CrudCreate, {
                        version:self.settings.version,
                        name:self.name,
                        records:records,
                        data:sh.clone(self.settings)
                    });
                });
            }

            self.socket.on(types.CrudCreate, function (data) {
                var peer = self.dictPeers[data.data.name];
                var vTo = data.data.version;
                self.proc(self.name, types.CrudCreate, vTo)
                //callback will update records
                self.repo.create(data.records)
            });

            p.connection.update = function update(records, version) {
                version = sh.dv(version, self.repo.getVersion());
                self.settings.version = version;
                sh.each( self.peers, function (i,peer) {
                    peer.socket.emit(types.CrudUpdate, {
                        version:self.settings.version,
                        name:self.name,
                        records:records,
                        data:sh.clone(self.settings)
                    });
                });
            }

            self.socket.on(types.CrudUpdate, function (data) {
                var peer = self.dictPeers[data.data.name];
                var vTo = data.data.version;
                self.proc(self.name, types.CrudUpdate, vTo)
                //callback will update records
                self.repo.update(data.records)
            });




            p.connection.delete = function fxDelete(records, version) {
                version = sh.dv(version, self.repo.getVersion());
                self.settings.version = version;
                sh.each( self.peers, function (i,peer) {
                    peer.socket.emit(types.CrudDelete, {
                        version:self.settings.version,
                        name:self.name,
                        records:records,
                        data:sh.clone(self.settings)
                    });
                });
            }

            self.socket.on(types.CrudDelete, function (data) {
                var peer = self.dictPeers[data.data.name];
                var vTo = data.data.version;
                self.proc(self.name, types.CrudDelete, vTo)
                //callback will update records
                self.repo.fxDelete(data.records)
            });


        }

        /**
         * Override crud methods with methods that sync
         */
        p.connection.defineCrud_Sync = function defineCrud() {

            p.connection.create = function create(records, version) {
                self.log('creating records', records.length);
                self.repo.upsert(records, function recordsCreated() {
                    self.con.sync();
                })
                //self.data.converged = false;
                return;
                /*
                 version = sh.dv(version, self.repo.getVersion());
                 self.settings.version = version;
                 sh.each( self.peers, function (i,peer) {
                 peer.socket.emit(types.CrudCreate, {
                 version:self.settings.version,
                 name:self.name,
                 records:records,
                 data:sh.clone(self.settings)
                 });
                 });*/
            }

            self.socket.on(types.CrudCreate, function (data) {
                var peer = self.dictPeers[data.data.name];
                var vTo = data.data.version;
                self.proc(self.name, types.CrudCreate, vTo)
                //callback will update records
                self.repo.create(data.records)
            });

            p.connection.update = function update(records, version) {
                version = sh.dv(version, self.repo.getVersion());
                self.settings.version = version;
                sh.each( self.peers, function (i,peer) {
                    peer.socket.emit(types.CrudUpdate, {
                        version:self.settings.version,
                        name:self.name,
                        records:records,
                        data:sh.clone(self.settings)
                    });
                });
            }

            self.socket.on(types.CrudUpdate, function (data) {
                var peer = self.dictPeers[data.data.name];
                var vTo = data.data.version;
                self.proc(self.name, types.CrudUpdate, vTo)
                //callback will update records
                self.repo.update(data.records)
            });




            p.connection.delete = function fxDelete(records, version) {
                version = sh.dv(version, self.repo.getVersion());
                self.settings.version = version;
                sh.each( self.peers, function (i,peer) {
                    peer.socket.emit(types.CrudDelete, {
                        version:self.settings.version,
                        name:self.name,
                        records:records,
                        data:sh.clone(self.settings)
                    });
                });
            }

            self.socket.on(types.CrudDelete, function (data) {
                var peer = self.dictPeers[data.data.name];
                var vTo = data.data.version;
                self.proc(self.name, types.CrudDelete, vTo)
                //callback will update records
                self.repo.fxDelete(data.records)
            });


        }
        /**
         * TODO: implement smark check-sum feature
         */
        p.connection.verify = function defineVerify() {
            //divert to sync
            self.con.sync();
        }


    }

    defineProcesses();


    function defineSavingState() {


        p.saveState = function saveState() {
            /*
             peers
             */
            var save = {}
            save.settings = self.settings;
            var peersTemp = [];
            sh.each(self.peers, function onConnectPeer(i, peer) {
                var tempPeer = {}
                tempPeer.name = peer.name;
                tempPeer.settings = peer.settings;
                tempPeer.version = peer.version;
                peersTemp.push(tempPeer)
            });
            save.peers = peersTemp;
            save.version = self.version;

            var str = JSON.stringify(save);
            str = sh.toJSONString(save);
            sh.writeFile(self.settings.fileSettings, str);
        }

        p.loadState = function loaState() {
            var obj = sh.readFile(self.settings.fileSettings, '');
            obj = JSON.parse(obj);


            var peer = self.dictPeers[data.data.name];

            if (self.settings.reloadPeers != false) {
                self.peersX = obj.peers;
                //go thoguth peers, reconnect them up
                sh.each(self.peersX, function onConnectPeer(i, peer) {
                    self.linkTo(peer);
                });
            }
        }

        p.saveSettingsEveryXMinutes = function saveSettingsEveryXMinutes(min) {
            clearInterval(self.saveInterval);
            self.saveInterval = setInterval(self.saveState, 1000 * 60 * min)
        }


    }
    defineSavingState();

    function defineReset() {
        p.reset = function reset() {
            //clear peers
            //reset my version
            sh.each(self.peers, function (i, peer) {
                peer.my_version  = -1;
            });
            self.con.sync();
        }
    }
    defineReset();

    self.defineRoutes = function defineRoutes(server) {
        server.get('/config', function (req, res) {
            res.end('....')
        });

        server.get('/counts', function (req, res) {
            self.repo.dbHelper2.count( function(count) {
                res.end(count.toString())
            });
        });

        server.get('/search', function (req, res) {
            self.repo.dbHelper2.count( function(count) {
                res.end(count)
            });
        });

        server.get('/converged', function (req, res) {
            res.end(self.data.converged.toString())
        });

        /*
         server.get('/config', function (req, res) {
         res.end('....')
         });
         */


    }

    /**
     * Show the next proc statement
     */
    p.procNext = function procNext() {
        self.procOnlyNextMode = true
    }

    p.procNextSyncing = function procNextSyncing() {
        self.procOnlyNextMode = true
    }

    p.logSync = function logSync() {
        arguments = sh.convertArgumentsToArray(arguments)
        arguments.unshift('lg'+self.name+'-Peer:')

        console.log.apply(console, arguments);
        //return sh.sLog(arguments)
        // self.logSync('no sync necessary', data.attemptId);

    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        if ( self.procOnlyNext == true ) {
            self.procOnlyNextMode = true
        }
        if ( self.procOnlyNextMode == true ) {
            if ( self.procOnlyNext == false ) {
                return;
            }
        }
        if ( self.procOnlyNext == true ) {
            self.procOnlyNext = false
        }
        arguments = sh.convertArgumentsToArray(arguments)
        arguments.unshift(self.name+'-Peer:')
        return sh.sLog(arguments)
    }
}

exports.Peer = Peer;


process.on('uncaughtException', function (err) {
    console.log(err);
    console.error(err.stack);
    process.exit();
})