// initialize video.js
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var helper = {};
helper.getChannel = function getChannel() {
    var channel = getUrlParameter('channel');
    if ( channel == null ) {
        channel = 'cnn';
    }
    helper.channel = channel;
    helper.files = []
    helper.getVids()
    var y = setInterval(helper.getVids,
        5*1000);
}

helper.getVids = function () {
    //http://127.0.0.1:9550/index_playlist_test.html?channel=cnn&baseUrl=http://192.168.1.16:9550&debug=true#episode-1
//http://127.0.0.1:9550/index_playlist_test.html?channel=cnn&baseUrl=http://192.168.1.16:9550#episode-1
    var url = "getRecent";
    var baseUrl = getUrlParameter('baseUrl')
    helper.baseUrl = '';
    if ( baseUrl != null ) {
        url = baseUrl + '/' + url;
        helper.baseUrl = baseUrl + '/';
    }

    var debugMode = getUrlParameter('debug');
    if ( debugMode != 'true') {
        helper.hideDebug();
    }
    //request
    $.ajax({
        url: url ,
        data:{channel:helper.channel},
        cache: false,
        success: function gotResponse(html){
            //console.log('files', html)
            $("#results").append(html);

            var files = html.files;
            files = files.map(function addBaseUrl(urlVid){
                return helper.baseUrl+urlVid;
            })
            var newFiles = [];
            $.each(files, function addEachFile(i,file){
                if ( helper.files.indexOf(file) != -1 ) {
                    return;
                }
                helper.files.push(file);
                newFiles.push(file)
            });

            if ( helper.removeInvalidTracks != false ) {
                var id = 'video'
                var tracks=document.querySelectorAll(".vjs-track");
                tracks =  Array.prototype.slice.call(tracks);
                $.each(tracks, function removeInvalidTracks(i, track) {
                    //var el = $(track)
                    var src=track.getAttribute('data-src');
                    if ( files.indexOf(src) == -1 ) {
                        console.log('removing a track');
                        track.parentNode.parentNode.removeChild(track.parentNode);
                    }
                });
            }

            helper.addVideos(newFiles);

        },
        error:function () {
            console.log('splat*')
        }
    });
    //response
}

helper.hideDebug = function hideDebug() {
    $('#video-playlist-vjs-playlist').hide();
    $('#video-log').hide();
    $('#trackName').hide();

} ;

helper.getChannel();

//note in the data-src's above that there are no file extensions, e.g., .m4v
videojs("#video-playlist", {"height":"auto", "width":"auto"}).ready(function(event){
    var myPlayer=this;

    console.log(myPlayer.el().id);
    var id =  myPlayer.el().id;
    var playlist = myPlayer.playlist({
        'continuous': true,
        loopAll:false,
        maxTracks:5,
        onTrackSelected: function playTrack() {
            if ( playlist.lastPlayer != null ) {
                playlist.lastPlayer.play();
                return;
            }
            myPlayer.play();
        },
        fxChangeTrack:function fxChangeTrack(track, index, len){
            helper.getVids()
            $("#trackName").html($(track).attr('data-src'));
            //if last one encounters ... make a monitor .. but
        }
    });


    //play track before previous track finished


    //if(typeof myPlayer.L!="undefined") myPlayer.id_=myPlayer.L;

    function resizeVideoJS(){
        var width = document.getElementById(myPlayer.el().id).parentElement.offsetWidth;
        var aspectRatio=8/12;
        myPlayer.width(width).height( width * aspectRatio);
    }

    resizeVideoJS(); // Initialize the function
    window.onresize = resizeVideoJS; // Call the function on resize

    helper.hidePlayer = function () {

    };

    helper.preloadVideo = function addSourceToVideo(element, src, type) {
        var source = document.createElement('source');
        source.src = src;
        source.type = type;
        element.appendChild(source);
    }

    helper.addVideos = function (addVideos, playNow, type) {
        var tracks=document.querySelectorAll("#"+id+"-vjs-playlist .vjs-track");
        var ul=$("#"+id+"-vjs-playlist ul");

        /*
        </li>
        <li >
        <a class='vjs-track' href='#episode-1' data-index='1'
        data-src='test_vids/vids.converted/video3.flv'>
            Onarbor Demo Video</a>
        </li>
          */
        $.each(addVideos, function addVideo(i,video) {
            var li =$('<li/>');
            var a =$('<a/>');
            a.addClass('vjs-track')
            a.html(video);
            li.append(a);
            ul.append(li);
            a.attr('data-src',  video);

            var el=$("#"+"video_preload");

            //helper.preloadVideo(el[0], video, 'video/mp4');

            playlist.addTrack(a[0]);
        })
    };
});




