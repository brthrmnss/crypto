var tabList = [];
var initList = [];
var isFirstTabCreated = false;
var deDupStatus= "off";
var shortName = chrome.i18n.getMessage("shortName");

var upgradeNotification = false; // true || false

var allowDuplicatesAcrossWindows = DEFAULT_ALLOWDUPLICATESACROSSWINDOWS;
var ignoreHash = DEFAULT_IGNOREHASH;
var refreshOriginal = DEFAULT_REFRESHORIGINAL;
var moveTabToWindowEnd = DEFAULT_MOVETABTOWINDOWEND;
var originalTabBehaviour = DEFAULT_ORIGINALTABBEHAVIOUR;
var whitelist = DEFAULT_WHITELIST;
var whitelistRegexString;

// Check if we're using sync or local storage
chrome.storage.sync.get({"syncStorage": DEFAULT_SYNCSTORAGE}, function(sst){
  console.log("onload, syncStorage", sst.syncStorage);
  
  // Set ls accordingly
  setLS(sst.syncStorage, function(){
    
    // Now continue to load and setup extension
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
      "storageLoaded"                 : false,
      "whitelist"                     : DEFAULT_WHITELIST,
      "donated"                       : DEFAULT_DONATED,
    }, function(st){
      
      // Save to storage if not previously stored (new install)
      if(!st["storageLoaded"])
        ls.set(st, function(){
          er = chrome.runtime.lastError
          if(er)
            console.error(er);
        });
      
      allowDuplicatesAcrossWindows = st["allowDuplicatesAcrossWindows"];
      ignoreHash = st["ignoreHash"];
      refreshOriginal = st["refreshOriginal"];
      moveTabToWindowEnd = st["moveTabToWindowEnd"];
      originalTabBehaviour = st["originalTabBehaviour"];
      whitelist = st["whitelist"];
      makeWhitelistRegex();
      deDupStatus = st["startState"];
      
      setBadgeColour(st["startState"] == "on" ? ON_COLOUR : OFF_COLOUR);
      setBadgeAction(st["browserAction"]);
      
      // Add listeners for updated, closed, attached, replaced states
      getAllTabs("startup");
      
      browserActionContextMenus();
      chrome.contextMenus.onClicked.addListener(contextMenuHandler);
      setContextMenu();  
    });
  });
});


/**
 * 
 * On Install/Update, track version numbers in GA
 * On Install, also add unInstall URL
 * 
 */
chrome.runtime.onInstalled.addListener(function(details){
  console.log("onInstalled", details);
  
  if(details.reason !== "chrome_update"){
    
    var version = chrome.app.getDetails().version;
    
    //Log versions to Google Analytics
    trackButton("appVersion", version);
    trackButton("previousVersion", details.previousVersion);
    trackButton("chromeVersion", getChromeVersion());
    trackButton("appUpdateType", details.reason, version);
    
    console.log("prev version", details.previousVersion);
        
    // set ls, open options
    if(details.reason === "install"){
      
      chrome.storage.sync.get({"syncStorage": DEFAULT_SYNCSTORAGE}, function(st){
        console.log("syncStorage", st.syncStorage);
        // If syncStorage is true, fetch remote settings, else do nothing (keep local/default ones)
        if(st.syncStorage === true)
          swapStorage(true, chrome.runtime.openOptionsPage);
        else
          chrome.runtime.openOptionsPage();
      });
      
    }
    
    // Set UNINSTALL_URL
    chrome.management.getSelf(function(e){
      if(e.installType != "development")
        chrome.runtime.setUninstallURL(UNINSTALL_URL);
    });
    
    // Show notification if install, or upgradeNotification is true
    if(details.reason === "install" || upgradeNotification){
      showNotification({
        title: chrome.i18n.getMessage("shortName") + " " + (details.reason == 'install' ? "Installed" : "Updated"),
        message: "Extension '" + chrome.i18n.getMessage("appName") + "' was " + (details.reason == 'install' ? "installed." : "updated to latest version."),
        contextMessage: (details.reason == 'install' ? "Installed version " + version : "Upgraded to " + version + " from " + details.previousVersion),
        requireInteraction: false,
        id: EXTENSION_UPDATED_NOTIFICATION_ID,
        isClickable: true,
        buttons: [{
          title: "See what's new in this update",
          iconUrl: chrome.extension.getURL("img/changes.svg")
        }],
      });
    }
    
  }
  
  getAllTabs("update");
  isFirstTabCreated = true;
});
  

chrome.browserAction.onClicked.addListener(function(){
  ls.get("browserAction", function(st){
    var browserAction = st && st["browserAction"] !== undefined ? st["browserAction"] : DEFAULT_BROWSERACTION;
    
    switch(browserAction){
      
      case "duplicate":
        duplicateThisURL();
        trackButton(GA_BROWSER_ACTION_BUTTON_TRACK, ACTION_DUPLICATE_TAB);
        break;
        
      case "toggleState":
        toggleState();
        trackButton(GA_BROWSER_ACTION_BUTTON_TRACK, ACTION_TOGGLE_EXTENSION_STATE);
        break;
    }
  });
});


chrome.storage.onChanged.addListener(function(changes, areaName){
  // console.info(areaName, changes);
  
  if(areaName === SYNC_STORAGE_NAME && 
    changes.hasOwnProperty("syncStorage") && 
    changes["syncStorage"].hasOwnProperty("newValue")){
    // localStorage["syncStorage"] !== changes["syncStorage"].newValue.toString()){
    
    swapStorage(changes["syncStorage"].newValue);
  }
  
  if(changes.hasOwnProperty("allowDuplicatesAcrossWindows") && changes["allowDuplicatesAcrossWindows"].hasOwnProperty("newValue"))
    allowDuplicatesAcrossWindows = changes["allowDuplicatesAcrossWindows"].newValue;
  
  if(changes.hasOwnProperty("ignoreHash") && changes["ignoreHash"].hasOwnProperty("newValue"))
    ignoreHash = changes["ignoreHash"].newValue;
  
  if(changes.hasOwnProperty("refreshOriginal") && changes["refreshOriginal"].hasOwnProperty("newValue"))
    refreshOriginal = changes["refreshOriginal"].newValue;
  
  if(changes.hasOwnProperty("moveTabToWindowEnd") && changes["moveTabToWindowEnd"].hasOwnProperty("newValue"))
    moveTabToWindowEnd = changes["moveTabToWindowEnd"].newValue;
  
  if(changes.hasOwnProperty("originalTabBehaviour") && changes["originalTabBehaviour"].hasOwnProperty("newValue"))
    originalTabBehaviour = changes["originalTabBehaviour"].newValue;
  
  if(changes.hasOwnProperty("whitelist") && changes["whitelist"].hasOwnProperty("newValue")){
    whitelist = changes["whitelist"].newValue;
    makeWhitelistRegex();
  }
});


function swapStorage(syncStorage, callback){
  
  // Set ls variable
  setLS(syncStorage);
  
  // Move stuff to other storage
  if(syncStorage){
    
    // Move from local to sync
    chrome.storage.local.get(function(lSt){
      chrome.storage.sync.get(function(sSt){
        var st = {};
        
        for(var key in lSt){
          // Data in sSt takes priority over data in lSt
          st[key] = sSt.hasOwnProperty(key) && sSt[key] !== undefined ? sSt[key] : lSt[key];
        }
        
        // closed duplicates & timestamp don't transfer to sync storage
        delete(st["closedDuplicates"]);
        delete(st["weeklyNotificationTimestamp"]);
        
        // Merge whitelist
        if(st["whitelist"].length < 1){
          st[whitelist] = lSt["whitelist"];
        } else {
          for (var i = lSt["whitelist"].length - 1; i >= 0; i--) {
            if(st["whitelist"].indexOf(lSt["whitelist"][i]) == -1)
              st["whitelist"].push(lSt["whitelist"][i]);
          }
        }
        
        // save updated/merged data to sync storage
        chrome.storage.sync.set(st, callback);
      });
    });
  } else {
    
    // Move from sync to local
    chrome.storage.sync.get(function(st){
      // "syncStorage" setting always stays in storage.sync
      delete(st["syncStorage"]);
      
      chrome.storage.local.set(st, callback);
    });
  }  
}


function updateBrowserActionTitle(title, tabId){
  title = title ? title.toString() : (shortName + " is " + deDupStatus + ". You have " + tabList.length + " tabs open.");
  
  var titleObject = {"title": title};
  if(tabId)
    titleObject["tabId"] = tabId;
  
  chrome.browserAction.setTitle(titleObject);
}


function setBadgeText(text, tabId){
  var badgeText = {"text": text.toString()};
  if(tabId)
    badgeText["tabId"] = tabId;
  
  chrome.browserAction.setBadgeText(badgeText);
  updateBrowserActionTitle();
}


function setBadgeColour(colour, tabId){
  var badgeColor = {"color": colour};
  if(tabId)
    badgeColor["tabId"] = tabId;
  
  chrome.browserAction.setBadgeBackgroundColor(badgeColor);
}


function setBadgeAction(action){
  if(action === "popup"){
    chrome.browserAction.setPopup({"popup": "popup.html"});
  } else {
    chrome.browserAction.setPopup({"popup": ""});
  }
  // remake browser action context menus
  browserActionContextMenus();
}


function browserActionContextMenus(){
  // Remove all before (re)creating
  chrome.contextMenus.remove("toggleState", function(){
    chrome.runtime.lastError;
    
    chrome.contextMenus.remove("toggleState_separator", function(){
      chrome.runtime.lastError;
      
      chrome.contextMenus.remove("duplicate", function(){
        chrome.runtime.lastError;
        
        chrome.contextMenus.remove("whitelist", function(){
          chrome.runtime.lastError;
          
          chrome.contextMenus.remove("restoreLost", function(){
            chrome.runtime.lastError;
            
            chrome.contextMenus.remove("closeAllDuplicates", function(){
              chrome.runtime.lastError;
              
              ls.get(["startState", "browserAction"], function(st){
                var startState = (st && st["startState"] !== undefined ? st["startState"] : DEFAULT_STARTSTATE);
                var browserAction = (st && st["browserAction"] !== undefined ? st["browserAction"] : DEFAULT_BROWSERACTION);
                
                if(browserAction !== "toggleState"){
                  // toggleState
                  chrome.contextMenus.create({
                    type: "normal",
                    id: "toggleState",
                    title: (startState == "off" ? "Enable" : "Disable") + " Extension",
                    contexts: ["browser_action"],
                  }, browserActionContextMenuCreatorCallback);
                  
                  // separator
                  chrome.contextMenus.create({
                    type: "separator",
                    id: "toggleState_separator",
                    title: "",
                    contexts: ["browser_action"],
                  }, browserActionContextMenuCreatorCallback);
                }
                
                if(browserAction !== "popup"){
                
                  if(browserAction !== "duplicate"){
                    // duplicateTab
                    chrome.contextMenus.create({
                      type: "normal",
                      id: "duplicate",
                      title: "Duplicate this tab",
                      contexts: ["browser_action"],
                    }, browserActionContextMenuCreatorCallback);
                  }
                  
                  // whitelist
                  chrome.contextMenus.create({
                    type: "normal",
                    id: "whitelist",
                    title: "Whitelist this tab",
                    contexts: ["browser_action"],
                  }, browserActionContextMenuCreatorCallback);
                  
                  // closeAllDuplicates
                  chrome.contextMenus.create({
                    type: "normal",
                    id: "closeAllDuplicates",
                    title: "Close all duplicate tabs*",
                    contexts: ["browser_action"],
                  }, browserActionContextMenuCreatorCallback);
                  
                  // restoreLost
                  chrome.contextMenus.create({
                    type: "normal",
                    id: "restoreLost",
                    title: "Restore all tabs from startup",
                    contexts: ["browser_action"],
                  }, browserActionContextMenuCreatorCallback);
                }
              });
            });
          });
        });
      });
    });
  });
}


function browserActionContextMenuCreatorCallback(){
  var er = chrome.runtime.lastError;
  if(er) console.warn("if browserAction context menu not created, it should show here: ", er);
}


function setContextMenu(){
  ls.get({
    "showContextMenu": DEFAULT_SHOWCONTEXTMENU
  }, function(st){
    
    var showContextMenu = st["showContextMenu"];
    
    chrome.contextMenus.remove("dTRightClick",function(){
      var lastError = chrome.runtime.lastError;
      if(lastError) console.warn("setContextMenu dTRightClick", lastError);
      
      chrome.contextMenus.remove("contentduplicate",function(){
        var lastError = chrome.runtime.lastError;
        if(lastError) console.warn("setContextMenu contentduplicate", lastError);
        
        chrome.contextMenus.remove("contentwhitelist",function(){
          var lastError = chrome.runtime.lastError;
          if(lastError) console.warn("setContextMenu contentwhitelist", lastError);
          
          chrome.contextMenus.remove("contentmoveToLast",function(){
            var lastError = chrome.runtime.lastError;
            if(lastError) console.warn("setContextMenu contentmoveToLast", lastError);
            
            st["showContextMenu"].split(",").forEach(function(el){
              chrome.contextMenus.create({
                type: "normal",
                id: "content"+el,
                title: chrome.i18n.getMessage("contextMenuText_"+el),
                contexts: ["page"],
              }, function(){
                var er = chrome.runtime.lastError;
                if(er) console.warn("if page context menu not created, it should show here: " + el, er);
              });
            });
            
          });
        });
      });
    });

  });
}


function contextMenuHandler(info, tab){
  
  switch(info.menuItemId){
    case "toggleState":
      trackButton(GA_BROWSER_ACTION_CONTEXT_MENU_TRACK, ACTION_TOGGLE_EXTENSION_STATE, !deDupStatus);
      toggleState();
      break;
      
    case "duplicate":
      trackButton(GA_BROWSER_ACTION_CONTEXT_MENU_TRACK, ACTION_DUPLICATE_TAB);
      duplicateThisURL(tab.url);
      break;
      
    case "whitelist":
      trackButton(GA_BROWSER_ACTION_CONTEXT_MENU_TRACK, ACTION_ADD_TO_WHITELIST);
      whitelistThisLink(tab.url);
      break;
      
    case "openSettings":
      trackButton(GA_BROWSER_ACTION_CONTEXT_MENU_TRACK, ACTION_OPEN_SETTINGS);
      chrome.runtime.openOptionsPage();
      break;
      
    case "restoreLost":
      trackButton(GA_BROWSER_ACTION_CONTEXT_MENU_TRACK, ACTION_RESTORE_LOST_TABS);
      restoreLost();
      break;
      
    case "contentduplicate":
      trackButton(GA_PAGE_CONTEXT_MENU_TRACK, ACTION_DUPLICATE_TAB);
      duplicateThisURL(tab.url);
      break;
      
    case "contentwhitelist":
      trackButton(GA_PAGE_CONTEXT_MENU_TRACK, ACTION_ADD_TO_WHITELIST);
      whitelistThisLink(tab.url);
      break;
      
    case "contentmoveToLast":
      trackButton(GA_PAGE_CONTEXT_MENU_TRACK, ACTION_MOVE_TO_LAST);
      moveToLast(tab.id);
      break;
      
    case "dTRightClick":
      console.warn("dTRightClick happened. Shouldn't have!");
      break;
            
    case "closeAllDuplicates":
      trackButton(GA_BROWSER_ACTION_CONTEXT_MENU_TRACK, ACTION_TOGGLE_EXTENSION_STATE);
      removePreExistingDuplicateTabs();
      break;
      
    default:
      console.warn("Unidentified context menu", info.menuItemId);
  }
}


function moveToLast(tabId){
  chrome.tabs.get(tabId, function(tab){
    var err = chrome.runtime.lastError;
    if(err) console.warn("Couldn't move tab", err);
    if(!chrome.runtime.lastError && tab){
      chrome.tabs.move(tab.id, {
        index: -1
      }, function(t){
        var nextErr = chrome.runtime.lastError;
        if(nextErr) console.warn("Couldn't move tab", nextErr);
      });
    }
  });
}


/**
 * showNotification
 * Displays a chrome.notification for the extension with click through URLs and event tracking 
 * @param {object} notif Object with details of notification - title, message, context, iconType
 * @return {null} null
 */
function showNotification(notif){
  ls.get({"donated": DEFAULT_DONATED}, function(st){
    var options = {
      contextMessage: notif.contextMessage || "",
      iconUrl: notif.iconUrl || NOTIFICATION_ICON_URL,
      isClickable: notif.isClickable || false,
      message: notif.message,
      requireInteraction: notif.requireInteraction || false,
      title: notif.title || "",
      type: notif.type || "basic",
    };
    
    if(notif.buttons)
      options.buttons = notif.buttons;
    else
      options.buttons = [];
    
    //If no buttons, or less than 2 buttons, add a support/donate button
    if(!st.donated &&
      (!options.buttons || options.buttons.length < 2)){
        options.buttons.push({
          title: "Support ClutterFree!",
          iconUrl: chrome.extension.getURL("img/donate.png"),
        });
    }
    
    chrome.notifications.create(notif.id || "", options, function(id){
      console.log("notification: ", id);
    });
  });
}


function getChromeVersion(){
  return /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1] || "none found";
}
