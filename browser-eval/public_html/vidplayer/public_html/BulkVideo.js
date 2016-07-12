/**
 * Created by user2 on 8/24/15.
 */

function BulkVideo() {
    var p = BulkVideo.prototype;
    p = this;
    var self = this;
    p.init = function method1(settings) {
        self.settings = settings;
        self.target = $(self.settings.target);
    }

    p.createVideo = function createVideo(div_id) {

        var vid = $('#example_video_1').clone()
        vid.attr('id', div_id)
        self.target.append(vid)
        var vj = videojs(div_id);
        vj.on("ended", function () {
            console.log('it over', div_id)
        })
        return vj;
    }

    p.preloadContent = function (div_id, url ) {

        var vid = {};

        function addSourceToVideo(element, src, type) {
            var source = document.createElement('source');
            source.src = src;
            source.type = type;
            element.appendChild(source);
        }


        var progressHandler = function(e) {
            if( video.duration ) {
                var percent = (video.buffered.end(0)/video.duration) * 100;
                console.log( percent );
                if( percent >= 100 ) {
                    console.log("loaded!");
                }
                video.currentTime++;
            }
        }

        var video = document.getElementById(div_id)[0];
        if ( video == null ) {
            video = $('#'+div_id)[0] ;
        }
        addSourceToVideo( video, url, self.settings.videoType);
        //addSourceToVideo( video, "http://your-server.com/clip.mp4", "video/mp4");
        video.addEventListener("progress", progressHandler,false);
    };

    p.getVideo = function get(div_id) {
        //var vid = $(div)[0]
        var vid = videojs(div_id);
        return vid;
    }
    p.playVideo = function playVideo(div_id, url, playNow ) {
        var vid = self.getVideo(div_id)
        // $('#'+div_id).find('source').attr('src', url)
        // $('#'+div_id).find('source').attr('type', 'video/flv')
        vid.src([
            { type: self.settings.videoType, src: url }
        ])
        /* vid.on("timeupdate", function () {
         console.log('timeupdate', this.duration(), vid.currentTime(), vid.paused());
         })
         vid.load();*/
        if ( playNow == false ) {
            vid.pause()
        }
    }

    p.onNext = function onNext() {

    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


    p.createXVideos = function ( count ) {
        for ( var i = 0; i < count ; i++) {
            var div_id ='vid_'+(i+1);
            self.createVideo(div_id ) ;

            var vid = videojs(div_id);
            vid.on("ended", function () {
                console.log('it over', div_id)
                //do a check this.url
                self.playersEmpty = true;
                self.currentUrl = null;
                self.playNextVideo()
            })

            if ( self.settings.hideVideoOnInit != false )
                $('#'+div_id).hide();
        };
        self.numPlayers = count;

    };

    p.addVideo = function addVideo( fileV ) {
        if ( self.videos == null ) {
            self.videos = [];
        };

        self.videos.push(fileV);

        if ( self.havePlayedAVideo == null ) {
            self.havePlayedAVideo = true;
            self.playNextVideo();
        };

        if ( self.playersEmpty == true ) {
            self.playersEmpty = false
            self.playNextVideo();
        }


        self.preloadContent('vid_1', fileV)
        self.preloadPlayNextVideo();

    };

    p.playNextVideo = function () {
        if ( self.currentIndex == null ) {
            self.currentIndex = self.numPlayers
        }
        var last_div_id = 'vid_'+(self.currentIndex+1);

        //$('#'+last_div_id).hide();

        self.currentIndex++
        if ( self.currentIndex >= self.numPlayers ) {
            self.currentIndex = 0
        }


        var div_id = 'vid_'+(self.currentIndex+1);
        $('#'+div_id).show();
        var vid = videojs(div_id);

        var url = self.videos.shift();
        if ( url == null ) {
            self.playersEmpty = true
            return;
        }


        self.playVideo(div_id, url );

        self.settings.nextVideo = null;
        self.preloadPlayNextVideo();

        self.playersEmpty = false;
        self.currentUrl = url;
        vid.play();



    }


    p.preloadPlayNextVideo = function () {
        if ( self.settings.nextVideo != null ) {
            return;
        }
        //preload?
        var nextUrl = self.videos[0];
        if ( nextUrl != null ) {
            var nextVidIndex = self.utils.getNextIndex();
            //self.playersEmpty = true
            self.playVideo(self.utils.getVidByIndex(nextVidIndex), nextUrl, false );
            self.settings.nextVideo = nextUrl;
        };
    }

    function defineUtils () {
        p.utils = {};
        p.utils.getNextIndex = function () {
            var tempindex = self.currentIndex+1
            if ( tempindex >= self.numPlayers ) {
                tempindex = 0
            }
            return tempindex;

        };
        p.utils.getVidByIndex = function getVidByIndex (index) {
            if ( index == undefined ) {
                index = self.currentIndex;
            }
            var div_id = 'vid_'+(index+1);
            return div_id;

        }
    }

    defineUtils();

}






$( document ).ready(function() {
    var b = new BulkVideo();
    var videoType = 'video/mp4';
    videoType = 'video/flv';
    //videoType = 'video/mp4';
    var settings = {'target':'#vid_target', videoType:videoType};
    settings.hideVideoOnInit = false;
    b.init(settings);

    b.createXVideos(3);

    /* b.addVideo('vids/video1.flv')
     b.addVideo('vids/video2.flv')
     b.addVideo('vids/video3.flv')
     b.addVideo('vids/video4.flv')
     */
    /**/
     b.addVideo('vids/video1.flv')
     b.addVideo('vids/video2.flv')
     b.addVideo('vids/video3.flv')
     b.addVideo('vids/video4.flv')
     /**/
    return;
    b.addVideo('vids.converted/video1.flv.mp4')
    b.addVideo('vids.converted/video2.flv.mp4')
    b.addVideo('vids.converted/video3.flv.mp4')
    b.addVideo('vids.converted/video4.flv.mp4')


    //b.playNextVideo();
    return
    b.addVideo('1.flv')
    b.addVideo('2.flv')
    b.addVideo('3.flv')
    b.addVideo('2.flv')
    b.addVideo('1.flv')
    b.addVideo('1.flv')
    b.addVideo('1.flv')
    b.addVideo('2.flv')
    b.addVideo('3.flv')
    return;




    b.createVideo('v1')
    b.createVideo('v2')
    b.playVideo('v1', 'dump.flv')
    //b.playVideo('v1', '2.flv')
//v1.whenDone()
});

