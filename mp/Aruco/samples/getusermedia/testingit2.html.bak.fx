<html>

<head>
    <title>Augmented Reality Marker Detector</title>

    <script type="text/javascript" src="libs/polyfill.js"></script>

    <script type="text/javascript" src="cv.js"></script>
    <script type="text/javascript" src="aruco.js"></script>
    <style media="screen">
        .container {
            width: 200px;
            height: 200px;
            border: 1px solid #CCC;
            margin: 0 auto 60px;
            position: relative;
        // position: absolute;
            -webkit-perspective: 600px;
            -moz-perspective: 600px;
            -o-perspective: 600px;
            perspective: 600px;
        }

        .panel {
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0.7;
            color: white;
            background: red;
        }

        #translate-z-negative .panel {
            -webkit-transform: translateZ( -200px );
            -moz-transform: translateZ( -200px );
            -o-transform: translateZ( -200px );
            transform: translateZ( -200px );
        }

        #translate-z-positive .panel {
            -webkit-transform: translateZ( 200px );
            -moz-transform: translateZ( 200px );
            -o-transform: translateZ( 200px );
            transform: translateZ( 200px );
        }

        #rotate-x .panel {
            -webkit-transform: rotateX( 45deg );
            -moz-transform: rotateX( 45deg );
            -o-transform: rotateX( 45deg );
            transform: rotateX( 45deg );
        }

        #rotate-y .panel {
            -webkit-transform: rotateY( 45deg );
            -moz-transform: rotateY( 45deg );
            -o-transform: rotateY( 45deg );
            transform: rotateY( 45deg );
        }

        #rotate-z .panel {
            -webkit-transform: rotateZ( 45deg );
            -moz-transform: rotateZ( 45deg );
            -o-transform: rotateZ( 45deg );
            transform: rotateZ( 45deg );
        }
    </style>

</head>

<body style="font-family: monospace;">

<center>
    <div style="margin: 10px;"><strong>-= Augmented Reality Marker Detector =-</strong></div>
<div style="width:640px; height:480px; background-color: #d2d2d2" id="canvasBackboard" >

    <!--   <div id="translate-z-negative" class="container">
           <div class="panel">translateZ( -200px )</div>
       </div>

       <div id="translate-z-positive" class="container">
           <div class="panel">translateZ( 200px )</div>
       </div>

       <div id="rotate-x" class="container">
           <div class="panel">rotateX( 45deg )</div>
       </div>

       <div id="rotate-y" class="container">
           <div class="panel">rotateY( 45deg )</div>
       </div>

       <div id="rotate-z" class="container">
           <div class="panel">rotateZ( 45deg )</div>
       </div>-->

    <div id="outerContainer">
        <div id="innerContainer" style="
font-size: 1em;
padding: 0%;
/*
transform: scale(1.0) scaleZ(1.0) rotateZ(16deg) rotateY(300deg) translateX(-416px) translateY(540px) translateZ(-881px);

transform: scale(1.0) scaleZ(1.0) rotateZ(0deg) rotateY(0deg) translateX(1000px) translateY(0px) translateZ(0px);
*/

/*

transform-origin: 0% 0%;
perspective: 100;
perspective-origin: 50% 50%;
*/
">Transform this!<p></p>
        </div>


    </div>

</div>

<p style="
transform: scale(1.0) scaleZ(1.0) rotateZ(360deg) translateZ(-68px);
transform-origin: 0% 0%;
perspective: 100;-webkit-transform: scale(1.0) scaleZ(1.0) rotateZ(360deg) translateZ(-68px);
-webkit-transform-origin: 0% 0%;
-webkit-perspective: 100;
-webkit-perspective-origin: 50% 50%;
-moz-transform: scale(1.0) scaleZ(1.0) rotateZ(360deg) translateZ(-68px);
-moz-transform-origin: 0% 0%;
-moz-perspective: 100;
-moz-perspective-origin: 50% 50%;
-o-transform: scale(1.0) scaleZ(1.0) rotateZ(360deg) translateZ(-68px);
-o-transform-origin: 0% 0%;
-o-perspective: 100;
-o-perspective-origin: 50% 50%;
-ms-transform: scale(1.0) scaleZ(1.0) rotateZ(360deg) translateZ(-68px);
-ms-transform-origin: 0% 0%;
-ms-perspective: 100;
-ms-perspective-origin: 50% 50%;
transform: scale(1.0) scaleZ(1.0) rotateZ(360deg) translateZ(-68px);
transform-origin: 0% 0%;
perspective: 100;
perspective-origin: 50% 50%;
">
    dddd
    This element has been skewed horizontally and vertically. You can still select the text, and otherwise interact with
    the element, as you would if it weren’t transformed.
</p>
</center>


<center>
    <div style="margin: 10px;"><strong>-= Augmented Reality Marker Detector =-</strong></div>
    <video id="video" autoplay="true" style="display:none;"></video>
    <canvas id="canvas" style="width:640px; height:480px;"></canvas>
    <div style="margin: 15px;"><strong>Powered by <a href="http://code.google.com/p/js-aruco/">js-aruco</a></strong>
    </div>
</center>



<p style="-webkit-transform: skew(32deg, 0deg);
 -moz-transform: skew(32deg, 0deg);
 -o-transform: skew(32deg, 0deg);
 -ms-transform: skew(32deg, 0deg);
 transform: skew(32deg, 0deg)">
    This element has been skewed horizontally and vertically. You can still select the text, and otherwise interact with
    the element, as you would if it weren’t transformed.</p>

error: 0
x: -416 y: 100 z: 881
yaw: -55 pitch: -4 roll: -1


</body>



<script>
    //http://westciv.com/tools/3Dtransforms/
    document.getElementById("outerContainer").style.color = "blue";

    var transform = ''

    var xOffset = 0
    xOffset = 0
   var yOffset = 0
   // xOffset = -150
    var translateX = (640*.5)  - 410 + xOffset
    transform += "translateX("+translateX+"px) ";

    var translateY = (480*.5)  + yOffset
    transform += "translateY("+translateY+"px) ";


    var translateZ =  -0//(480*.5)  - 100
    translateZ  = -881
    transform += "translateZ("+translateZ+"px) ";

    var perspective =  2//(480*.5)  - 100
    // document.getElementById("demodd").style.transform = "perspective("+perspective+")";
    //    transform += "perspective("+perspective+"px)";


    var innerTransform = ''
    //http://theboredengineers.com/2012/05/the-quadcopter-basics/
    var rotateX = -0
    rotateX = -1
    //  rotateX = -180
    innerTransform += "rotateX("+rotateX+"deg) ";
    var rotateY = -4
    innerTransform += "rotateY("+rotateY+"deg) ";
    var rotateZ = -55
    rotateZ = -55
    innerTransform += "rotateZ("+rotateZ+"deg) ";

    //var transformO = -55
    document.getElementById("innerContainer").style.transformOrigin="0 0";
    document.getElementById("innerContainer").style.transformOrigin=translateX+100 + "px " + translateY
    document.getElementById("innerContainer").style.transformOrigin="100 0"
    //http://www.w3schools.com/cssref/css3_pr_perspective.asp
    //http://css-tricks.com/almanac/properties/p/perspective/
    var perspective =  10000//(480*.5)  - 100
    //var btransform = "perspective("+perspective+"px)";

    document.getElementById("canvasBackboard").style.perspective = perspective

    document.getElementById("outerContainer").style.transform = transform

     document.getElementById("innerContainer").style.transform = innerTransform
</script>

</html>