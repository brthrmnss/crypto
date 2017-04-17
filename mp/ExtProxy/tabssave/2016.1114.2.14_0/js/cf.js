var MIN_DEFAULT_VIEWS = 10;
var ppStrings = [
  "Get a better Pocket",
  "Shortcut to a better Pocket",
  "High Perfomance Pocket",
  "Get better with Pocket",
  // "Improve your Pocket",
  "Target: Pocket Zero!",
  "Supercharge your Pocket",
  "Supercharged Pocket reading",
  "Accelerate your Pocket experience!",
  "Power user tool for Pocket",
];

var debug = false;

var ppStringsIndex = Math.round(Math.random()*(ppStrings.length-1));

$(document).ready(function(){
  
  if(debug) console.log(ppStringsIndex);
  
  setTimeout(showAcceleReaderPrompt, 5000);
  
  $("body").on("click", "#ppAdvertCloseButton", function(e){
    e.preventDefault();
    $("#ppinstall").hide();
    chrome.runtime.sendMessage({
      type: "showPocketNotificationUpdate",
      value: false
    });
  });
  
  $("body").on("click", "#ppinstall", function(e){
    if(e.target.id === "ppAdvertCloseButton") return;
    e.preventDefault();
    window.open("https://chrome.google.com/webstore/detail/accelereader-power-up-you/ndaldjfflhocdageglcnflfanmdhgfbi" + 
                "?utm_source=ClutterFreePromoBanner&utm_medium=ext&utm_campaign=InAppPromoBanners&utm_content=ppStrings" + 
                ppStringsIndex, "_blank");
    // Allow close button to appear
    chrome.runtime.sendMessage({
      type: "showPocketNotificationUpdate",
      value: MIN_DEFAULT_VIEWS
    });
  });
  
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.type === "urlchange"){
      ppStringsIndex = Math.round(Math.random()*(ppStrings.length-1));
      $("#ppinstall .cfteaser").text(ppStrings[ppStringsIndex]);
    }
  });
});


function showAcceleReaderPrompt(){
  // if(/getpocket.com\/(a|beta)/i.test(location.href) === true && $("#totalEstimateNode").length === 0){
  if($("#totalEstimateNode").length === 0 && $("#timeEstimateNode").length === 0){
    // On getPocket, but pocket extension not installed
    chrome.runtime.sendMessage({type: "showPocketNotificationQuery"}, function(response){
      if(response !== "false"){
        // Show popup in bottom right corner
        $("body").append("<a id='ppinstall' target='_blank' title='Install AcceleReader - Power up your Pocket experience!'" + 
                         "href='https://chrome.google.com/webstore/detail/accelereader-power-up-you/ndaldjfflhocdageglcnflfanmdhgfbi'" +
                         "?utm_source=ClutterFreePromoBanner&utm_medium=ext&utm_campaign=InAppPromoBanners&utm_content=ppStrings" + ppStringsIndex + 
                         "class='cfhidden'>" +
                         "<span class='show-minimised cfblock cfteaser'></span>" + 
                         "<img src='" + chrome.extension.getURL("img/close-64.png") + "' id='ppAdvertCloseButton'" + 
                         (parseInt(response) >= MIN_DEFAULT_VIEWS ? "" : "class='cfhidden'") + "></a>");
        
        $("#ppinstall .cfteaser").text(ppStrings[ppStringsIndex]);
        $("#ppinstall").fadeIn(1500);
        
        chrome.runtime.sendMessage({
          type: "showPocketNotificationUpdate",
          value: parseInt(response) + 1,
        });
      }
    });
  } else {
    if(debug) console.log("already installed, or not pocket");
    // $("#ppinstall .cfteaser").text(ppStrings[ppStringsIndex]);
  }  
}
