(function() {

    videojs.plugin('playlist', function(options) {
        //this.L="vjs_common_one";


        console.log(this);
        var id=this.el().id;

        //console.log('begin playlist plugin with video id:'+id);

        //console.log(this);
        //var id=this.tag.id;
        //assign variables
        var tracks=document.querySelectorAll("#"+id+"-vjs-playlist .vjs-track"),
            trackCount=tracks.length,
            player=this,
            currentTrack=tracks[0],
            index=0,
            play=true,
            onTrackSelected=options.onTrackSelected;
        tracks =  Array.prototype.slice.call(tracks);

        var player1 = player;

        //options.tracks  = tracks; //make this bindable
        var data={
            tracks: tracks,
            trackCount: trackCount,
            play:function(){
                return play;
            },
            index:function(){
                return index;
            },
            prev:function(){
                var j=index-1;
                //console.log('j'+j);
                if(j<0 || j>trackCount) j=0;
                trackSelect(tracks[j]);
            },
            next:function(){
                var j=index+1;
                //console.log('j'+j);
                if(j<0 || j>trackCount) j=0;
                trackSelect(tracks[j]);
            }
        };

        data.use2Players = false;
        data.use2Players = true;
        data.use1PlayerToPreload = true;

        //standard setup
        data.use2Players = true;
        data.use1PlayerToPreload = false;

        data.overlapVideoPlay = false;
        data.overlapVideoPlay = true;

        data.preloadNextVideo = true;
        data.preloadNextVideo = false; //turn off so overlap.

        data.srcs_SkippedEndings = [];

        data.makeFullscreen = true;
        data.uiFadePlayers = true;
        //data.uiFadePlayers = false;
        data.uiDelayLoading = 0.4
        data.vidsPreloadPlay = false;
        //data.vidsPreloadPlay = true;

        if ( data.use2Players == true ) {
            var player2 = videojs('video-playlist2');
            //q: how to set height on player?



            function makeFullScreen() {
                $('#video-playlist2').css('height', '100%');
                $('#video-playlist2').css('width', '100%');
                $('#video-playlist2').css('height', '100vh');
                $('#video-playlist2').css('width', '100vw');


                $('#video-playlist2').prependTo(document.body);
                $('#video-playlist').prependTo(document.body);

                //$('#video-playlist').css('height', '100% !important');
                //$('#video-playlist').css('width', '100% !important');

                setTimeout(function delay_setHeightOfPlayer_PreventsUnknownOverrides() {
                    $('#video-playlist').css('height', '100%');
                    $('#video-playlist').css('width', '100%');
                    $('#video-playlist').css('height', '100vh');
                    $('#video-playlist').css('width', '100vw');
                }, 200);


                $('#video-playlist2').css('top', '0px');
                $('#video-playlist2').css('left', '0px');


                $('#video-playlist').css('top', '0px');
                $('#video-playlist').css('left', '0px');


                $('#video-playlist').css('background', 'black');
                $('#video-playlist2').css('background', 'black');
                $('#video-playlist').css('border-radius', '0px');
                $('#video-playlist2').css('border-radius', '0px');



                //hide overflow on the body ...
                //why: prevents scrollbar at bottom of page
                $('body').css('overflow', 'hidden');
                $('body').css('padding', '0px');
                //hide fullscreen

            }

            var fullscreen = getUrlParameter('fullscreen')
            if ( data.makeFullscreen && fullscreen  != 'false'  ) {
                //debugger
                makeFullScreen();
            }

        }

        data.history = [];

        data.addHistory = function addHistory(msg) {
            var currentdate = new Date();
            //date = currentdate.toString()+':';
            var date = currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
            date += ': ';
            data.history.push(date + ' ' + msg)
            $('#video-log').html(data.history.join('<br/>'));
        }

        function clickTrack (){
            //var track=this;
            //index=this.getAttribute('data-index');
            //console.log("a is clicked and index position is"+this.getAttribute('data-index')+"the data-src is "+this.getAttribute('data-src'));
            //console.log("a is clicked and index position is"+index+"the data-src is "+this.getAttribute('data-src'));

            trackSelect(this);
        }
        //manually selecting track
        for(var i=0; i<trackCount; i++){
            tracks[i].onclick = clickTrack;
        };
        //options.tracks = tracks;
        data.addTrack  = function addTrack(track) {
            track.onclick = function (){
                trackSelect(track);
            };

            data.tracks.push(track);

            if ( data.firstRunDelay == true ) {
                console.log('firstRunDelay', 'active');
                return;
            }
            //when the first track comes in, wait to load in 2nd track ....
            //TODO: remove this complexity, when 2nd track comes in
            //if video player is empty, then load in 2nd track ... more consistent
            if (  data.tracks.length == 1 &&
                data.ranOnce != true  ) {
                data.ranOnce = true;
                data.firstRunDelay = true;
                console.log('video has not run once, so starting');
                setTimeout(function delayInitStartFor2ndTrack() {
                    data.firstRunDelay = false;
                    trackSelect(track);
                }, 250);
                return;
            }
            if ( data.startOnNext == true  ) {
                console.log('startOnNext set so starting ')
                data.startOnNext = false;
                trackSelect(track)
            }
            if ( data.lastPlayer.paused() == true  ) {
                if ( data.userPaused ) {
                    console.log('user pasued ... so staying paused...')
                    return;
                }
                //handle condition where array of objects come in at once
                if ( data.waitingForStart != null ) {
                    console.log('paused but waiting for start')
                } else {
                    console.log('video was not playing ... so starting')
                    trackSelect(track)
                }
            }

            if ( data.lastPlayer.paused() == false && data.lastPlayer.src() == null  ) {
                console.log('player crashed?')
                if ( data.waitingForStart != null ) {
                    console.log('paused but waiting for start')
                } else {
                    console.log('player crashed?', ' ... so starting')
                    trackSelect(track)
                }
            }

            if ( options.maxTracks != null && options.maxTracks < data.tracks.length ) {
                var firstTrack = data.tracks[0];
                if ( firstTrack == data.currentTrack ) {
                    //why?: because the current track should be allowed to finish
                    console.log('clean up queue', 'cant remove current video')
                } else {
                    console.log('clean up queue', 'removee a video b/c have too many', firstTrack)
                    data.tracks.shift();
                    firstTrack.parentNode.removeChild(firstTrack);
                }

            }
        };
        //options.

        // for continuous play
        if(typeof options.continuous=='undefined' || options.continuous==true){
            //console.log('options.continuous==true');

            player.on("ended", onVideoEnded )

            function onVideoEnded (checkForSource){
                if ( data.skipNext_onVideoEndedEvent == true ) {
                    //data.autoEnd = data.lastPlayer;
                    //data.autoEndSrc = data.src();
                    data.skipNext_onVideoEndedEvent = false;
                    console.debug('skip next on video ending event ')
                    return;
                }
                console.log('on ended');
                //refresh the tracks ....
                var tracks = document.querySelectorAll("#"+id+"-vjs-playlist .vjs-track")
                tracks =  Array.prototype.slice.call(tracks);
                data.tracks = tracks;
                if ( checkForSource != false ) {
                    data.addHistory('ended: ' + data.lastPlayer.src())
                    index++;

                    //video listing might have changed ... try to find next index
                    var currentIndex = 0;
                    var foundVideo = false;
                    for (var i = 0; i < data.tracks.length; i++) {
                        var dataTrackEl = data.tracks[i];
                        var dataTrack = $(dataTrackEl);
                        var src = dataTrack.attr('data-src');

                        //sometimes the source has the full url including protocol
                        var srcInSrc = data.lastPlayer.src().indexOf(src) != -1
                        if (data.lastPlayer.src() == src || srcInSrc) {
                            currentIndex = i;
                            console.log('real index is...', index, 'vs', currentIndex)
                            index = currentIndex + 1;
                            foundVideo = true
                        }

                    }
                    ;
                    if ( foundVideo == false ) {
                        console.log('vid is no longer available, starting queue for top')
                        index = 0;
                    }
                } else {
                    console.log('trying next video...')
                    console.log('in abnormal state....')
                    index++;
                }



                if(index>=data.tracks.length){
                    //console.log('go to beginning');
                    if ( options.loopAll != false )
                        index=0;
                    else
                        console.log('at the end ...')
                }
                else;// console.log('trigger click next track');

                console.log('after...', index, data.tracks.length);
                //?
                if ( index == data.tracks.length ) {
                    data.startOnNext = true;
                }
                data.tracks[index].click();

            };// on ended

            player.on("pause",onUserPause );
            function onUserPause(){
                data.userPaused = true;
                console.log('on user pause');

                if ( data.overlapVideoPlay != true ) {
                    console.log('overlabVideoPlay', 'clear it out');
                    //when next video ends skip to next video
                    //why: prevents playlist from stopping , after pause
                    data.skipNext_onVideoEndedEvent = false;
                    data.srcs_SkippedEndings = [];
                    return;
                }
                //console.log('on paused');
            };
            player.on("play",onUserPlay );
            player.on('timeupdate',    onVideoTimeUpdate );
            function onUserPlay(){
                data.userPaused = false;
                console.log('on user play');
                if ( data.firstForVide == true ) {
                    data.firstForVide = false;
                    //To Prevent skipping, jump into vid
                    //data.lastPlayer.currentTime(0.25)
                }
            };

            function onVideoTimeUpdate(e){


                if ( data.overlapVideoPlay != true ) {
                    return;
                }
                var vidDuration =  data.lastPlayer.duration();
                var vidCurrentTime = data.lastPlayer.currentTime();

                var vPlayer = videojs(e.target.id)

                var vidDuration =  vPlayer.duration();
                var vidCurrentTime = vPlayer.currentTime();
                var src = vPlayer.src()

                if (data.srcs_SkippedEndings.length >= 2) {
                    data.srcs_SkippedEndings.shift();
                }
                var timeLeft = vidDuration - vidCurrentTime;
                //console.log('onVideoTimeUpdate', y, data.lastPlayer.currentTime() )
                 //console.log('onVideoTimeUpdate', vidDuration, vidCurrentTime, timeLeft )
                if ( vidDuration > 0  ) {

                    var overlapTime = 1;
                    overlapTime = 0.3
                    overlapTime = 0.4
                    overlapTime = 0.45
                    if ( timeLeft < overlapTime ) {
                        if ( data.srcs_SkippedEndings.indexOf(src) != -1  ) {
                            console.debug('want to skip, but already ended ', src)
                            return;
                        }

                        data.srcs_SkippedEndings.push(src)
                        console.log('little time left ... go to next one..');

                        //data.autoEnd = data.lastPlayer;
                        //data.autoEndSrc = data.src();
                        //data.skipNext_onVideoEndedEvent = false;
                        /*setTimeout(function startLater() {
                         onVideoEnded();
                         }, 50)*/
                        onVideoEnded();
                        data.skipNext_onVideoEndedEvent = true;
                        //data.autoEnded = function isPlayerTheSame(ply) {
                        //    if ( )
                        //}
                        //TODO: Start playing the next video ...
                        //this will dl vidoe and have it ready
                        //mute video
                        //when time to start clip, unmute, and play from time = 0 ;
                    }
                }
                //   function(){
                //     console.log('the time was updated to: ' + this.currentTime);
                //});
            };


            /*player.on("loaderror", function(){
             console.log('on loaderror');
             });
             player.on("loadError", function(){
             console.log('on loadError');
             });*/
            player.on("error", onVideoError );
            function onVideoError(event){
                if ( data.otherPlayer == videojs(event.target.id) ) {
                    console.log('error on other player video...')
                    //alert('...hhh...')
                    //other player had error ... not an issue
                    return;
                }
                console.log('on error');
                onVideoEnded(false);
                //remove video ...
            };

            if ( data.use2Players == true ) {
                player2.on("ended",         onVideoEnded)
                player2.on("pause",         onUserPause);
                player2.on("play",          onUserPlay);
                player2.on("error",         onVideoError);
                player2.on('timeupdate',    onVideoTimeUpdate );


            }
        }
        else;// console.log('dont play next!');

        //track select function for onended and manual selecting tracks
        var trackSelect=function(track){

            if ( track == null ) {
                return;
            }
            data.currentTrack = track;
            data.waitingForStart = track;
            data.firstForVide = true;


            var playerCurrent = player1;
            if ( data.use2Players == true ) {
                if ( data.use1PlayerToPreload != true  ) {
                    //debugger
                    //regular loading of switching
                    if ( data.lastPlayer == player1 ) {
                        data.lastPlayer = player2;
                        playerCurrent = player2;
                        data.otherPlayer = player1;
                    } else {
                        data.lastPlayer = player1;
                        data.otherPlayer = player2;
                    }
                } else {
                    //the other player is always player 2
                    //if ( data.lastPlayer == player1 ) {
                    data.lastPlayer = player1;
                    data.otherPlayer = player2;
                    /*} else {
                     data.lastPlayer = player1;
                     data.otherPlayer = player2;
                     }*/
                }

            } else {
                data.lastPlayer = player1;
                playerCurrent = player1;
            }


            //targettedPlayer

            setTimeout(function () {
                if ( data.lastPlayer.paused() ) {
                    console.log(data.lastPlayer.src(), 'didi not start ....')
                }
                data.waitingForStart = null;
            }, 2000)
            //get new src
            var src=track.getAttribute('data-src');
            index=parseInt(track.getAttribute('data-index')) || index;

            data.nextSrc = data.tracks[index+1]
            if ( data.nextSrc != null ) {
                data.nextSrc = data.nextSrc.getAttribute('data-src');
            }

            //console.log('track select click src:'+src);
            if ( options.fxChangeTrack != null ) {
                options.fxChangeTrack(track, tracks.indexOf(track), tracks.length)
            }



            data.addHistory( 'watch '+src)
            if(playerCurrent.techName=='youtube'){
                playerCurrent.src([
                    { type: type="video/youtube", src:  src}
                ]);
            }
            else{

                if(playerCurrent.el().firstChild.tagName=="AUDIO" || (typeof options.mediaType!='undefined' && options.mediaType=="audio") ){

                    playerCurrent.src([
                        { type: "audio/mp4", src:  src+".m4a" },
                        { type: "audio/webm", src: src+".webm" },
                        { type: type="video/youtube", src:  src},
                        { type: "audio/ogg", src: src+".ogg" }
                        /*{ type: "audio/mpeg", src:  src+".mp3" },
                         { type: "audio/ogg", src: src+".oga" }*/
                    ]);
                }
                else{
                    //console.log("video");
                    /* player.src([
                     { type: "video/mp4", src:  src+".mp4" },
                     { type: type="video/youtube", src:  src},
                     { type: "video/webm", src: src+".webm" }
                     //{ type: "video/ogv", src: src+".ogv" }
                     ]);*/

                    var type="video/mp4"
                    var ext = src.split('.').slice(-1)[0];
                    if ( ext == 'flv') {
                        type="video/flv"
                    }
                    //try to prevent resetting src
                    if ( playerCurrent.src() == src ) {
                        console.log('save vid ...')
                    } else {
                        console.log('playing src:', src)
                        /*if ( data.vidsPreloadPlay ) {
                            //set volume of current player
                            data.lastPlayer.volume(1);
                        }*/
                        playerCurrent.src([
                            {type: type, src: src},
                        ]);
                    }

                    if ( data.use2Players == true ) {
                        if ( data.preloadNextVideo == false ) {
                            console.debug('data.preloadNextVideo is false', data.otherPlayer.id())
                            setTimeout(function setSrcLater_ToAvoidInterruptCurrentPlayerWhichHas25SecsLeft() {
                                data.otherPlayer.src([
                                    {type: type, src: data.nextSrc},
                                ]);
                                if ( data.vidsPreloadPlay ) {
                                    data.otherPlayer.volume(0.0)
                                    data.otherPlayer.play();
                                    //play first 3 seconds,then go back to beggining
                                    setTimeout(function delay_goBackTo0() {
                                        data.otherPlayer.volume(1.0)
                                        data.otherPlayer.pause();
                                        data.otherPlayer.currentTime(0);
                                    }, 3*1000)
                                }
                            }, 1000)

                        } else {
                            debugger
                            console.log('load next source', data.nextSrc)
                            data.otherPlayer.src([
                                {type: type, src: data.nextSrc},
                            ]);

                        }
                    }
                }
            }


            //console.debug('playing ', playerCurrent)
            if(play) playerCurrent.play();
            if (true==true) {
                // $('#'+data.otherPlayer.id()).css('opacity', '0.50');
                //$($('#'+playerCurrent.id()).children()[0]).css('opacity', '1');
                //$($('#'+data.otherPlayer.id()).children()[0]).css('opacity', '0.0');

                if ( data.uiFadePlayers ) {


                    setTimeout(function delay_playerSwitch_PreventsLoadingIcon() {
                        $('#'+playerCurrent.id()).css('opacity', '1');
                        $('#'+data.otherPlayer.id()).css('opacity', '0.0');
                        $('#'+playerCurrent.id()).css('z-index', 9999);
                        $('#'+data.otherPlayer.id()).css('z-index', 5);
                    }, data.uiDelayLoading*1000 );


                    $('#'+playerCurrent.id()).css('position', 'absolute');
                    $('#'+data.otherPlayer.id()).css('position', 'absolute');

                }

                console.log('on', playerCurrent.id(), data.otherPlayer.id())
            }


            //remove 'currentTrack' CSS class
            for(var i=0; i<trackCount; i++){
                if (tracks[i].className.indexOf('currentTrack') !== -1) {
                    tracks[i].className=tracks[i].className.replace(/\bcurrentTrack\b/,'nonPlayingTrack');
                }
            }
            //add 'currentTrack' CSS class
            track.className = track.className + " currentTrack";
            if(typeof onTrackSelected === 'function') onTrackSelected.apply(track);

        }

        //if want to start at track other than 1st track
        if(typeof options.setTrack!='undefined' ){
            options.setTrack=parseInt(options.setTrack);
            currentTrack=tracks[options.setTrack];
            index=options.setTrack;
            play=false;
            //console.log('options.setTrack index'+index);
            trackSelect(tracks[index]);
            play=true;
        }
        if (window.location.hash) {
            var hash = window.location.hash.substring(9);
            play = false;
            trackSelect(tracks[hash]);
        }


        return data;
    });
//return videojsplugin;
})();
