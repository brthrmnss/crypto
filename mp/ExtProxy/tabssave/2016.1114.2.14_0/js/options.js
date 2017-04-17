var whitelist;
var bgPage = chrome.extension.getBackgroundPage();

$(document).ready(function(){
  
  bgPage.trackButton(GA_EXTENSION_PAGE_TRACK, ACTION_OPTIONS_PAGE_OPEN);
  
  setupPageState();
  
  setupHandlers();
  
});


function setupPageState(){
  var appName = chrome.i18n.getMessage("appName");
  var shortName = chrome.i18n.getMessage("shortName");
  $("#extShortName").text(shortName);
  $("#extName").text(appName);
  $("title").text("Options - " + appName);
  
  chrome.storage.sync.get({"syncStorage": DEFAULT_SYNCSTORAGE}, function(sSt){
    $("#syncStorage").prop("checked", sSt["syncStorage"]);
    
    setLS(sSt.syncStorage, function(){
      ls.get({
        "allowDuplicatesAcrossWindows"  : DEFAULT_ALLOWDUPLICATESACROSSWINDOWS,
        "browserAction"                 : DEFAULT_BROWSERACTION,         // Show popup
        "ignoreHash"                    : DEFAULT_IGNOREHASH,
        "moveTabToWindowEnd"            : DEFAULT_MOVETABTOWINDOWEND,
        "originalTabBehaviour"          : DEFAULT_ORIGINALTABBEHAVIOUR,
        "refreshOriginal"               : DEFAULT_REFRESHORIGINAL,
        "showContextMenu"               : DEFAULT_SHOWCONTEXTMENU, // Show context menu with duplicate option
        "showNotifications"             : DEFAULT_SHOWNOTIFICATIONS,  
        "startState"                    : DEFAULT_STARTSTATE,                  // Start with default off to prevent all tabs closing when they are redirected to the same wifi sign-in page on guest/public wifis
        "whitelist"                     : DEFAULT_WHITELIST,
        "donated"                       : DEFAULT_DONATED,
      }, function(st){
        
        $("#allowDuplicatesAcrossWindows").prop("checked", st["allowDuplicatesAcrossWindows"]);
        $("#browserAction").val(st["browserAction"]);
        $("#ignoreHash").prop("checked", st["ignoreHash"]);
        $("#moveTabToWindowEnd").prop("checked", st["moveTabToWindowEnd"]);
        $("#originalTabBehaviour").val(st["originalTabBehaviour"]);
        $("#refreshOriginal").prop("checked", st["refreshOriginal"]);
        $("#showNotifications").prop("checked", st["showNotifications"]);
        $("#startState").val(st["startState"]);
        
        // $("#showContextMenu").val(st["showContextMenu"]);
        st["showContextMenu"].split(",").forEach(function(item){
          $(".showContextCheckbox[value='"+ item +"']").prop("checked", true);
        });
        
        
        whitelist = st["whitelist"];
        
        loadHelpMessages();
        positionHelps();
        loadWhitelist();
        
        if(st["donated"] === true)
          showDonate(true);
      });
    });
  });
    
  localSt.get({"closedDuplicates": DEFAULT_CLOSED_DUPLICATES}, function(lSt){
    if(lSt.closedDuplicates.length > MIN_SHOW_STATS_PAGE)
      $("#statsLink").show();
    else
      $("#statsLink").hide();
  });  
}

function setupHandlers(){
  
  /** 
   ** 
   ** Layout Handlers
   ** 
   **/
  
  $("#cx-edit-help-content div").hover(function(){
    $(this).css("display", "inherit");
  },function(){
    $(this).css("display", "none");
  });

  $("section").hover(function(){
    $("#"+this.id+"Help").css("visibility", "visible");
  },function(){
    $("#"+this.id+"Help").css("visibility", "hidden");
  });

  $("section *").focusin(function(){
    $("#"+$(this).parents("section").attr("id")+"Help").css("visibility", "visible");
  });
  $("section *").focusout(function(){
    $("#"+$(this).parents("section").attr("id")+"Help").css("visibility", "hidden");
  });

  $(document).resize(positionHelps);
  
  $("body").on("click", "a.external_link, a.internal_link", function(e){
    bgPage.trackButton(GA_OPTION_PAGE_LINKS_TRACK, this.id);
    return true;
  });
  
  /** 
   ** 
   ** Settings Handlers
   ** 
   **/
  
  $("#whitelistAddForm").on("submit", addToWhitelist);
  $("#whitelistRemoveForm").on("submit", removeFromWhitelist);
  
  $("#startState").change(function(e){
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_START_STATE, this.value);
    ls.set({"startState": this.value});
  });
  
  $(".showContextCheckbox").change(function(e){
    
    var contextMenuArr = [];
    if(this.value === "off"){
      this.checked = true;
      $(".showContextCheckbox[value!='off']").prop("checked", false);
      contextMenuArr = ["off"];
    }
    
    else{
      $(".showContextCheckbox[value='off']").prop("checked", false);
      $(".showContextCheckbox:checked").each(function(){
        contextMenuArr.push(this.value);
      });
    }
    
    ls.set({"showContextMenu": contextMenuArr.join(",")});
    
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_SHOW_CONTEXT_MENU, contextMenuArr.join(","));
    bgPage.setContextMenu();
  });

  $("#browserAction").change(function(e){
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_BROWSER_ACTION, this.value);
    ls.set({"browserAction": this.value});
    bgPage.setBadgeAction(this.value);
  });

  $("#originalTabBehaviour").change(function(e){
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_ORIGINAL_TAB_BEHAVIOUR, this.value);
    ls.set({"originalTabBehaviour": this.value});
  });
  
  $("#ignoreHash").change(function(e){
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_IGNORE_HASH, this.checked);
    ls.set({"ignoreHash": this.checked});
  });
  
  $("#allowDuplicatesAcrossWindows").change(function(e){
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_ALLOW_DUPLICATES_ACROSS_WINDOWS, this.checked);
    ls.set({"allowDuplicatesAcrossWindows": this.checked});
  });
  
  $("#showNotifications").change(function(e){
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_SHOW_NOTIFICATIONS, this.checked);
    ls.set({"showNotifications": this.checked});
  });
  
  $("#refreshOriginal").change(function(e){
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_REFRESH_ORIGINAL, this.checked);
    ls.set({"refreshOriginal": this.checked});
  });
  
  $("#moveTabToWindowEnd").change(function(e){
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_MOVE_TAB_TO_WINDOW_END, this.checked);
    ls.set({"moveTabToWindowEnd": this.checked});
  });
  
  $("#syncStorage").change(function(e){
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_SYNC_STORAGE, this.checked);
    swapStorage(this.checked);
  });
  
  $(".btnDonate").on("click", function(){
    ls.set({"donated": true});
    
    var source = $(this).hasClass("topButton") ? "OptionsTitle" : "OptionsContent";
    bgPage.trackButton(GA_OPTION_PAGE_LINKS_TRACK, ACTION_DONATED, source);
    bgPage.trackButton(GA_DONATED_TRACK, true, source);
    
    showDonate(true);
    return true;
  });
}

function loadHelpMessages(){
  $("#cx-edit-help-content div").each(function(){
    $("#"+this.id).html(chrome.i18n.getMessage(this.id));
  });
}

function positionHelps(){
  $("section").each(function(){
    $("#"+this.id+"Help").css({
      top: $(this).position().top-37,
    });
  });
}

function loadWhitelist(){
  for (var i = 0; i < whitelist.length; i++) {
    $("#whitelistSelect").append($("<option></option>").val(i).text(whitelist[i]));
  }
}

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

function addToWhitelist(){
  var tempURL = $("#whitelistInput").val();
  if(tempURL != ""){
    if(whitelist.indexOf(tempURL) == -1){
      
      whitelist.push(tempURL);
      ls.set({"whitelist": whitelist});
      bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_WHITELIST_MODIFIED, ACTION_WHITELIST_ADD);
      
      $("#whitelistSelect").append("<option value=\""+(whitelist.length-1)+"\">"+tempURL+"</option>");
    }
    $("#whitelistInput").val("");
  }
  return false;
}
  
function removeFromWhitelist(){
  // Get ids of selected item(s), remove from storage & select-options
  if($("#whitelistSelect option:selected").length > 0){
    var removedArr = [];
    $("#whitelistSelect option:selected").each(function(){
      removedArr.push($(this).val());
    });
    
    // Clear whitelist select element
    $("#whitelistSelect").html("")
    
    for (var i = whitelist.length-1; i >= 0; i--) {
      if(removedArr.indexOf(i.toString()) > -1) whitelist.splice(i,1);
    }
    
    // Refill whitelist select element with updated whitelist
    for (var i = 0; i < whitelist.length; i++) $("#whitelistSelect").append($("<option></option>").val(i).text(whitelist[i]));
    
    
    bgPage.trackButton(GA_SETTINGS_CHANGED_TRACK, SETTING_WHITELIST_MODIFIED, ACTION_WHITELIST_REMOVE);
    ls.set({"whitelist": whitelist});
  }
  return false;
}

/**
 * swapStorage
 * Reset value of ls, copy data from old storage to new, add ls.fetch
 * @param {boolean} syncStorage Flag describing whether to save in sync or local
 * @return {void} Nothing
 */
function swapStorage(syncStorage){
  // Set syncStorage value
  chrome.storage.sync.set({"syncStorage": syncStorage});
  
  // Reset ls variable
  ls = syncStorage ? chrome.storage.sync : chrome.storage.local;
  
  // Add ls.fetch
  ls.fetch = function(param){
    ls.get(param, function(st){
      console.log(st);
    });
  }
  
  // Data swap between sync and local happens in storage change listener in background script
}
