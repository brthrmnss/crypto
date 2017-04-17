'use strict';

var bgPage;

var state;

$(document).ready(function(){
  bgPage = chrome.extension.getBackgroundPage();
  
  bgPage.trackButton(GA_EXTENSION_PAGE_TRACK, ACTION_POPUP_PAGE_OPEN);
  
  state = bgPage.getState();
  
  // Set initial Enable/Disable text
  $("#toggleStateLink").text((state ? "Disable" : "Enable") + " ClutterFree");
  
  if(state === false){
    $("#duplicateTabLink").hide();
  }
  
  $("#tools a:not(.disabled)").click(function(e){
    var id = this.id;
    switch(id){
      case "toggleStateLink":
        $(this).text((bgPage.toggleState() ? "Disable" : "Enable") + " ClutterFree");
        
        bgPage.trackButton(GA_POPUP_TRACK, ACTION_TOGGLE_EXTENSION_STATE, !state);
        
        if(state === false){
          state = true;
          $("#duplicateTabLink").show();
        } else {
          state = false;
          $("#duplicateTabLink").hide();
        }
        break;
      
      case "showOptionsLink":
        bgPage.trackButton(GA_POPUP_TRACK, ACTION_OPEN_SETTINGS);
        chrome.runtime.openOptionsPage();
        break;
      
      case "duplicateTabLink":
        bgPage.trackButton(GA_POPUP_TRACK, ACTION_DUPLICATE_TAB);
        bgPage.duplicateThisURL();
        // window.close();
        break;
      
      case "recoverLostLink":
        bgPage.trackButton(GA_POPUP_TRACK, ACTION_RESTORE_LOST_TABS);
        bgPage.restoreLost();
        break;
      
      case "whitelistThisLink":
        bgPage.trackButton(GA_POPUP_TRACK, ACTION_ADD_TO_WHITELIST);
        bgPage.whitelistThisLink();
        window.close();
        break;
      
      case "closeDuplicatesLink":
        bgPage.trackButton(GA_POPUP_TRACK, ACTION_CLOSE_PRE_EXISTING_DUPLICATES);
        bgPage.removePreExistingDuplicateTabs();
        window.close();
      
      default:
        console.warn("Unhandled action", id);
    }
    e.preventDefault();
  });

  $("body").on("click", "a.external_link, a.internal_link", function(e){
    bgPage.trackButton(GA_POPUP_PAGE_LINKS_TRACK, this.id === "versionSpan" ? C306_APP_UPDATES : this.id);
    return true;
  });
  
  $("#versionSpan").text("v"+chrome.runtime.getManifest().version);
  
  bgPage.ls.get({"donated": DEFAULT_DONATED}, function(st){
    if(st["donated"] === true)
      showDonate(true);
  });
  
  $(".btnDonate").on("click", function(){
    bgPage.ls.set({"donated": true});
    bgPage.trackButton(GA_POPUP_TRACK, ACTION_DONATED, true);
    bgPage.trackButton(GA_DONATED_TRACK, true, "popupBottom");
    showDonate(true);
    return true;
  });  
});


function showDonate(donated){
  if(donated){
    $(".preDonate").hide();
    $(".postDonate").show();
    $(".btnDonate").removeClass("btn-red").addClass("btn-green");
  } else {
    $(".postDonate").hide();
    $(".preDonate").show();
    $(".btnDonate").removeClass("btn-green").addClass("btn-red");
  }
}
