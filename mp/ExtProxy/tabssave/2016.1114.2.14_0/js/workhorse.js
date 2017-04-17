localStorage.showPocketNotificationQuery = localStorage.showPocketNotificationQuery || "0";

chrome.alarms.create("tabListCleaner",{
  delayInMinutes: 0,
  periodInMinutes: 2
});

localSt.get("weeklyNotificationTimestamp", function(st){
  var alarmOptions = {
    periodInMinutes: 7*24*60 // 1 Week
  };
  
  if(st && st.weeklyNotificationTimestamp)
    alarmOptions.when = st.weeklyNotificationTimestamp + 7*24*60*60*1000;
    // alarmOptions.delayInMinutes = 0;
  
  chrome.alarms.create("weeklyStatsAlarm",alarmOptions);
});

chrome.alarms.onAlarm.addListener(function(alarm){
  
  switch(alarm.name){
    case "tabListCleaner":
      removeDuplicatesFromTabList();
      break;
    
    case "weeklyStatsAlarm":
      weeklyNotification();
      break;
      
    default:
      console.warn("Unidentified alarm: " + alarm.name);
  }
});

function weeklyNotification(){
  localSt.get({
    "closedDuplicates" : [], 
    "weeklyNotificationTimestamp" : 0
  }, function(st){
    
    // Calculate this week's total
    var count = 0;
    var notificationOptions;
    
    for (var i = 0; i < st.closedDuplicates.length; i++)
      if(st.closedDuplicates[i].timestamp > st.weeklyNotificationTimestamp)
        count++;
    
    if(count > MIN_DUPLICATES_NOTIFICATION_DISPLAY && st.weeklyNotificationTimestamp > 0){
      // Track notification display in GA
      trackButton(WEEKLY_STATS_NOTIFICATION_ID, "displayed_weekly", count);
      
      notificationOptions = {
        id: WEEKLY_STATS_NOTIFICATION_ID,
        title: "Another Clutter Free week",
        message: count + " duplicate tabs prevented this week!",
        requireInteraction: true
      };
      
      if(st.closedDuplicates.length > MIN_SHOW_STATS_PAGE)
        notificationOptions.buttons = [{
          title: "See details",
          iconUrl: chrome.extension.getURL("img/stats_button_icon.svg"),
        }];
      
      // Show notification
      showNotification(notificationOptions);
      
    } else if(st.closedDuplicates.length > MIN_DUPLICATES_NOTIFICATION_DISPLAY){
      // Track notification display in GA
      trackButton(WEEKLY_STATS_NOTIFICATION_ID, "displayed_total", st.closedDuplicates.length);
      
      notificationOptions = {
        id: WEEKLY_STATS_NOTIFICATION_ID,
        title: "Clutter Free keeping lean",
        message: st.closedDuplicates.length + " duplicate tabs prevented so far!",
        requireInteraction: true
      };
      
      if(st.closedDuplicates.length > MIN_SHOW_STATS_PAGE)
        notificationOptions.buttons = [{
          title: "See details",
          iconUrl: chrome.extension.getURL("img/stats_button_icon.svg")
        }];
      
      // Show notification
      showNotification(notificationOptions);
    } else
      console.log("No notification condition satisfied");
    
    // Save new timestamp from which next notification's total will be calculated
    localSt.set({"weeklyNotificationTimestamp": Date.now()});
  });  
}

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
  switch(notificationId){
    
    case WEEKLY_STATS_NOTIFICATION_ID:{
      if(buttonIndex === 0){
        // Track opening of stats page
        trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_SHOW_STATS);
        
        // Open stats page
        chrome.tabs.create({url: "stats.html"});
        
      } else {
        
        // Donation clicked
        trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_DONATE);
        setDonated(true, notificationId);
        
      }
      break;
    }
      
    case EXTENSION_UPDATED_NOTIFICATION_ID:{
      if(buttonIndex === 0){
        
        trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_SHOW_CHANGES);
        chrome.tabs.create({url: UPDATE_NOTES_URL});
        
      } else {
        
        // Donation clicked
        trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_DONATE);
        setDonated(true, notificationId);
        
      }
      break;
    }
      
    case DUPLICATES_FOUND_NOTIFICATION_ID:{
      switch(buttonIndex){
        
        case 0:{
          // Close duplicate tabs
          trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_CLOSE_DUPLICATES);
          removePreExistingDuplicateTabs(true);
          break;
        }
          
        case 1:{
          // Mark (marked) duplicates as unmarked
          trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_KEEP_DUPLICATES);
          for (var i = 0; i < tabList.length; i++) {
            if(tabList[i]["isDuplicate"] === true){
              delete tabList[i].isDuplicate;
            }
          }
          break;
        }
        
        case 2:{
          // Donation clicked
          trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_DONATE);
          setDonated(true, notificationId);
          break;
        }
          
      }
      break;
    }
    
    case TABS_RESTORED_NOTIFICATION_ID:{
      // Donation clicked
      trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_DONATE);
      setDonated(true, notificationId);
      break;
    }
    
    case URL_WHITELISTED_NOTIFICATION_ID:{
      switch(buttonIndex){
        
        case 0:{
          // Open Settings
          trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_OPEN_OPTIONS);
          chrome.runtime.openOptionsPage();
          break;
        }
        
        case 1:{
          // Donation clicked
          trackButton(GA_NOTIFICATION_TRACK, notificationId, BUTTON_DONATE);
          setDonated(true, notificationId);
          break;
        }
      }
      break;
    }
    default:
      console.warn("Unknown notification: ", notificationId);
  }
  
  
  // Clear notification
  chrome.notifications.clear(notificationId, function(wasCleared){});
});

chrome.notifications.onClicked.addListener(function(notificationId){
  chrome.notifications.clear(notificationId, function(){
    switch(notificationId){
      
      case EXTENSION_UPDATED_NOTIFICATION_ID:{
        trackButton(GA_NOTIFICATION_TRACK, notificationId, ACTION_SHOW_CHANGES);
        
        chrome.tabs.create({url: UPDATE_NOTES_URL});
        break;
      }
        
      case WEEKLY_STATS_NOTIFICATION_ID:{
        // Track opening of stats page
        trackButton(GA_NOTIFICATION_TRACK, notificationId, ACTION_SHOW_STATS);
        
        // Open stats page
        chrome.tabs.create({url: "stats.html"});
        break;
      }
        
      case TABS_RESTORED_NOTIFICATION_ID:
        // Do nothing
        break;
      
      case URL_WHITELISTED_NOTIFICATION_ID:
        trackButton(GA_NOTIFICATION_TRACK, notificationId, ACTION_OPEN_SETTINGS);
        chrome.runtime.openOptionsPage();
        break;
      
      default:
        console.warn("Unidentified notification", notificationId);
    }
  });
});

chrome.tabs.onCreated.addListener(function(tab){
  if(!isFirstTabCreated){
    ls.get({"startState": DEFAULT_STARTSTATE}, function(st){
      deDupStatus = st["startState"];
      getAllTabs("update");
      isFirstTabCreated = true;
    });
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  
  if(tab.incognito) return;
  
  if(!isFirstTabCreated || tabList.length === 0){
    getAllTabs("update");
    isFirstTabCreated = true;
  }
  
  // if(tab.url || changeInfo.url)
  //   console.log("UPDATED: " + (changeInfo.url || tab.url), changeInfo);
  
  var initListIndex = findInList({
    searchList: INIT,
    searchKey: 'tabId',
    searchValue: tab.id
  });
  
  // Do not check for duplicates in the tabs from initList till they've completed loading one-time
  if(initListIndex > -1 && (initList[initListIndex]["status"] != "complete")){
    // console.log("Tab: " + tabId + " is in initList, and not yet loaded.");
    // update URL in initList if changeInfo["url"] has changed
    if(!!changeInfo["url"]){
      updateList({
        'list' : INIT,
        'arrIndex' : initListIndex,
        'update' : 'url',
        'newValue' : tab["url"],
      });
    }
    // update initListIndex.status to if changeInfo.status has changed
    if(!!changeInfo.status){
      updateList({
        'list' : INIT,
        'arrIndex' : initListIndex,
        'update' : 'status',
        'newValue' : changeInfo.status,
      });
    }
    
  } else if(!!changeInfo["url"]){
    // Only need to proceed if url is being updated
    
    chrome.tabs.sendMessage(tab.id, {type: "urlchange"});
    
    // If extension state == "off", save updated tab to list and return
    if(deDupStatus == "off" || inWhiteList(changeInfo["url"])){
      // Check if tab is already in list
      var tabListIndex = findInList({
        searchKey: 'tabId',
        searchValue: tabId
      });
      if(tabListIndex == -1){
        // New tab
        addToList(tab);
        // console.log("Tab: " + tabId + ' Added. List size: ' + tabList.length + ".", "(In Update: New Tab Created - inwhitelist or dedup off)");
      } else {
        // update url for the tab in list
        updateList({
          "update" : "url",
          "arrIndex" : tabListIndex,
          "newValue" : tab["url"],
          "completed": changeInfo.status === "complete"
        });
        // console.log("Tab: " + tabId + ' Updated. List size: ' + tabList.length + ".", "(In Update: Tab URL changed - navigation, inwhitelist or dedup off)");
      }
    
    } else if(!isURLShortener(changeInfo["url"])) {
      // Extension is on, url not in whitelist, not from urlShortener, so proceed
      
      // Check if url is already in tab list
      var urlListIndex = findInList({
        searchKey: 'url',
        windowId: tab.windowId,
        searchValue: changeInfo["url"]
      });
      
      // Also check if duplicate tab is not 'self'
      if(urlListIndex > -1 && tabList[urlListIndex].tabId != tabId){
        
      //
      // We have a duplicate tab, close this and switch to original
      //
          
        // Check if old tab really exists in browser
        chrome.tabs.get(tabList[urlListIndex].tabId, function(tab2){
          
          var lastError = chrome.runtime.lastError;
          if(lastError !== undefined){
            // Old tab doesn't exist anymore
            console.log("last-error: ", lastError);
            
            // Remove old tab from tabList
            tabList.splice(urlListIndex,1);
            
            // Check if new tab is already in list
            var tabListIndex = findInList({
              searchKey: 'tabId',
              searchValue: tabId
            });
            
            if(tabListIndex == -1){
              // Add new tab to tabList
              addToList(tab);
              // console.log("Tab: " + tabId + ' Added. List size: ' + tabList.length + ".", "(In Update: Expired duplicate removed from list and new tab added)");
            } else {
              // Update url for new tab in tabList
              updateList({
                "update" : "url",
                "arrIndex" : tabListIndex,
                "newValue" : tab["url"],
                "completed": changeInfo.status === "complete"
              });
              // console.log("Tab: " + tabId + ' Updated. List size: ' + tabList.length + ".", "(In Update: Expired duplicate removed from list and source tab's URL updated)");
            }
            
          } else {
            // If old tab exists, close&switch
            closeAndSwitch({
              closeTabId: tabId,
              switchToTabIndex: urlListIndex
            });
            // console.log("Tab: " + tabId + ' Duplicate prevented. List size: ' + tabList.length + ".", "(In Update: Sending close & switch from onUpdated)");
          }
          
          setBadgeText(tabList.length);
        });
      } else {
        // New unique url
        // If tab already exists, update, else add
        
        // Check if tab is already in list
        var tabListIndex = findInList({
          searchKey: 'tabId',
          searchValue: tabId
        });
        if(tabListIndex == -1){
          // New tab
          addToList(tab);
          // console.log("Tab: " + tabId + ' Added. List size: ' + tabList.length + ".", "(In Update: New Tab Created - not inwhitelist && dedup on)");
        } else {
          // update url for the tab in list
          updateList({
            "update" : "url",
            "arrIndex" : tabListIndex,
            "newValue" : tab["url"],
            "completed": changeInfo.status === "complete"
          });
          // console.log("Tab: " + tabId + ' Updated. List size: ' + tabList.length + ".", "(In Update: Tab URL changed - navigation, not inwhitelist && dedup on)");
        }
      }
      
    }
  }
  
  setBadgeText(tabList.length);
  
  // If page loaded, and it's a Pocket page, insert cf script and css
  if(changeInfo.status === "complete" && /getpocket.com\/(a|beta)/i.test(tab["url"]) === true){
    chrome.tabs.insertCSS(tabId, {
      file: "css/cf.css",
    }, function(){
      chrome.tabs.executeScript(tabId, {
        file: "js/ext/jquery-2.1.1.min.js",
      }, function(){
        chrome.tabs.executeScript(tabId, {
          file: "js/cf.js",
        });
      });
    });
  }
});

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId){

  // Find removed tabid in tabList
  var tabListIndex = findInList({
    searchKey: 'tabId',
    searchValue: removedTabId
  });

  // Found
  if(tabListIndex > -1){
    // update to new tabId
    updateList({
      'update' : 'tabId',
      'arrIndex' : tabListIndex,
      'newValue' : addedTabId
    });

    chrome.tabs.get(addedTabId, function(tab){
      // If url not undefined
      if(!tab["url"]) return;
      
      tab["url"] = tab["url"];
      
      // If extension state == "off", save updated tab to list and return
      if(deDupStatus == "off" || inWhiteList(tab["url"])){
        // update url for the tab in list
        updateList({
          'update' : 'url',
          'arrIndex' : tabListIndex,
          'newValue' : tab["url"]
        });
        console.log("Tab: " + tab.id + ' Updated. List size: ' + tabList.length + ".", "(In Replace - inwhitelist or dedup off)");
        return;
      }

      // Check if url is already in tab list
      var urlListIndex = findInList({
        searchKey: 'url',
        windowId: tab.windowId,
        searchValue: tab["url"]
      });

      if(urlListIndex > -1 && tabList[urlListIndex].tabId != tab.id){
        // If url is already in list (urlIndex > -1 && urlIndex != tabListIndex) 
        // We have a duplicate tab, close this and switch to original
        closeAndSwitch({
          closeTabId: addedTabId,
          switchToTabIndex: urlListIndex
        });
        console.log("Tab: " + tab.id + ' Duplicate prevented. List size: ' + tabList.length + ".", "(In Replace - close&switch called)");
      } else {
        // Else update this tab's url
        updateList({
          'update' : 'url',
          'arrIndex' : tabListIndex,
          'newValue' : tab["url"]
        });
        console.log("Tab: " + tab.id + ' Replaced. List size: ' + tabList.length + ".", "(In Replace - non-duplicate, URL updated)");
      }
      setBadgeText(tabList.length);
    });
  } else 
    setBadgeText(tabList.length);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  var tabListIndex = findInList({
    searchKey: 'tabId',
    searchValue: tabId
  });
  if(tabListIndex > -1){
    removeFromList(tabListIndex);
  }
  
  setBadgeText(tabList.length);
  console.log("Tab: " + tabId + ' Removed. List size: ' + tabList.length);
});

chrome.windows.onRemoved.addListener(function(windowId){
  for (var i = tabList.length - 1; i >= 0; i--) {
    if(tabList[i].windowId == windowId) removeFromList(i);
  }
  
  setBadgeText(tabList.length);
  console.log("All tabs for window: " + windowId + ' removed in onDetached. List size: ' + tabList.length);
});

chrome.tabs.onDetached.addListener(function(tabId, detachInfo){
  var tabListIndex = findInList({
    searchKey: 'tabId',
    searchValue: tabId
  });
  if(tabListIndex > -1){
    removeFromList(tabListIndex);
  }
  
  setBadgeText(tabList.length);
  console.log("Tab: " + tabId + ' removed in onDetached. List size: ' + tabList.length);
});

chrome.tabs.onAttached.addListener(function(tabId, attachInfo){
  chrome.tabs.get(tabId, function(tab){
    if(!tab.incognito){
      addToList(tab);
      console.log("Tab: " + tabId + ' added in onAttached;  List size: ' + tabList.length);
    }
    setBadgeText(tabList.length);
  });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  switch(message.type){
    case "showPocketNotificationQuery":
      sendResponse(localStorage.showPocketNotificationQuery);
      break;
    
    case "showPocketNotificationUpdate":
      localStorage.showPocketNotificationQuery = message.value;
  }
});

function addToList(newTab){
  if(arguments && arguments[1] && (arguments[1] == INIT || arguments[1] == "both")){
    initList.push({
      tabId : newTab.id,
      url : newTab["url"].replace(TRAILING_SLASH_REGEX,"$1$3"),
      windowId: newTab.windowId,
      status: newTab.status //init
    });
    if(arguments[1] == INIT) return;
  }
  tabList.push({
    tabId : newTab.id,
    url : newTab["url"].replace(TRAILING_SLASH_REGEX,"$1$3"),
    previousUrl : "chrome://newtab",
    windowId: newTab.windowId
  });
  return tabList;
}

function updateList(updateObj){
  if(updateObj.list && updateObj.list == INIT){
    
    if(updateObj.update === "url")
      updateObj.newValue = updateObj.newValue.replace(TRAILING_SLASH_REGEX,"$1$3");
    
    initList[updateObj.arrIndex][updateObj.update] = updateObj.newValue;
    return initList;
    
  } else {
    
    var oldTabId = tabList[updateObj.arrIndex]["tabId"];
    
    for (var i=0; i < tabList.length; i++) {
      
      if(tabList[i]["tabId"] === oldTabId) {
        
        if(updateObj.update === "url"){
          tabList[i]["previousUrl"] = tabList[i]["url"];
          updateObj.newValue = updateObj.newValue.replace(TRAILING_SLASH_REGEX,"$1$3");
        }
        
        if(updateObj.completed !== undefined)
          tabList[i].completed = updateObj.completed;
        
        tabList[i][updateObj.update] = updateObj.newValue;
      }
    }
    return tabList;
  }
}

function removeFromList(tabListIndex){
  var oldTabId = tabList[tabListIndex]["tabId"];  
  var oldWindowId = tabList[tabListIndex]["windowId"];  
  
  for (var i=0; i < tabList.length; i++) {
    if(tabList[i]["tabId"] === oldTabId && tabList[i]["windowId"] === oldWindowId) {
      tabList.splice(tabListIndex,1);
    }
  }  
}

function findInList(searchObj){
  // Remove any trailing '/' before comparing.
  if(searchObj["searchKey"] === "url")
    searchObj["searchValue"] = searchObj["searchValue"].replace(TRAILING_SLASH_REGEX,"$1$3").toLowerCase();
  
  
  if(searchObj["searchList"] && searchObj["searchList"] == INIT){
    if(searchObj["searchKey"] === "url"){
      for (var i=0; i < initList.length; i++) {
        if(((!allowDuplicatesAcrossWindows)||(allowDuplicatesAcrossWindows && initList[i].windowId === searchObj.windowId)) && (initList[i]["url"].toLowerCase() === searchObj["searchValue"] || initList[i]["url"].toLowerCase() === SUSPENDERPREFIX+searchObj["searchValue"])){
          return i;
        }
      }
    } else {
      for (var i=0; i < initList.length; i++) {
        if (initList[i][searchObj["searchKey"]] === searchObj["searchValue"]) {
          return i;
        }
      }
    }
  } else {
    if(searchObj["searchKey"] === "url" && ignoreHash){
      // Remove hash from searchValue
      var searchURL = searchObj["searchValue"].substr(0,searchObj["searchValue"].indexOf("#") > -1 ? searchObj["searchValue"].indexOf("#") : searchObj["searchValue"].length);
      var tabListURL = "";
      
      for (var i = 0; i < tabList.length; i++) {
        tabListURL = tabList[i]["url"].substr(0,tabList[i]["url"].indexOf("#") > -1 ? tabList[i]["url"].indexOf("#") : tabList[i]["url"].length).toLowerCase();
        
        if(((!allowDuplicatesAcrossWindows)||(allowDuplicatesAcrossWindows && tabList[i].windowId === searchObj.windowId)) && (tabListURL === searchURL || tabListURL === SUSPENDERPREFIX+searchURL)){
          return i;
        }
      }
    } else if(searchObj["searchKey"] === "url"){
      for (var i = 0; i < tabList.length; i++) {
        if(((!allowDuplicatesAcrossWindows)||(allowDuplicatesAcrossWindows && tabList[i].windowId === searchObj.windowId)) && (tabList[i]["url"].toLowerCase() === searchObj["searchValue"] || tabList[i]["url"].toLowerCase() === SUSPENDERPREFIX+searchObj["searchValue"])){
          return i;
        }
      }
    } else {
      for (var i = 0; i < tabList.length; i++) {
        if (tabList[i][searchObj["searchKey"]] === searchObj["searchValue"]) {
          return i;
        }
      }
    }
  }
  
  return -1;
}

function switchToTab(switchToTabIndex){
  var originalTabOptions = {
    active: true
  }
  
  if(tabList[switchToTabIndex]["url"].match(SUSPENDERPREFIX))
    originalTabOptions["url"] = tabList[switchToTabIndex]["url"].replace(SUSPENDERPREFIX, "");
  
  chrome.tabs.update(tabList[switchToTabIndex]["tabId"], originalTabOptions, function(updatedTab){
    if(refreshOriginal){
      chrome.tabs.reload(updatedTab.id, {bypassCache: true});
    }
    
    // And switch to original tab's window
    chrome.windows.update(tabList[switchToTabIndex]["windowId"], {
      focused: true
    });
  });
}

function closeAndSwitch(switchObj){
  
  // Add url to closedDuplicates
  localSt.get("closedDuplicates", function(st){
    st.closedDuplicates = st.closedDuplicates || [];
    var duplicateURL = tabList[switchObj.switchToTabIndex]["url"];
    
    // If URL is from Great Suspender, decode it before saving
    if(duplicateURL.match(SUSPENDERPREFIX))
      duplicateURL = duplicateURL.replace(SUSPENDERPREFIX, "");
    
    // If URL is same as last url, return
    if(st.closedDuplicates.length > 0 && // at least one entry in the array to compare against
       duplicateURL === st.closedDuplicates[st.closedDuplicates.length - 1]["url"] && // same url as current
       st.closedDuplicates[st.closedDuplicates.length - 1].timestamp - Date.now() <= 1000) // was added less than a second back
      return;
    
    st.closedDuplicates.push({
      url: duplicateURL,
      timestamp: Date.now(),
    });
    
    localSt.set({"closedDuplicates": st.closedDuplicates});
  });
  
  // If originalTabBehaviour is closeAndSwitch, close tab, else just switch
  if(originalTabBehaviour === "justSwitch"){
    
    // Send 'closeTab' one back in history, or close it if new
    var currTab = tabList[findInList({
      searchKey: "tabId",
      searchValue: switchObj.closeTabId
    })];
    
    if(currTab){
      // var previousUrl = currTab.previousUrl;
      var previousUrl = currTab["url"];
      
      // console.log("REDIRECT FROM: " + tab["url"]);
      console.log("REDIRECT TO: " + previousUrl);
      
      // Send 'closeTab' one back in history
      chrome.tabs.update(switchObj.closeTabId, {url: previousUrl}, function(updatedTab){
      });
      
    } else {
      // New tab, from create - close it
      chrome.tabs.remove(switchObj.closeTabId);
    }
    
  } else {
    // "closeAndSwitch" or "closeAndStay"
    
    // Close 'closeTab'
    chrome.tabs.remove(switchObj.closeTabId);
    
  }
  
  //moveTabToWindowEnd
  if(moveTabToWindowEnd)
    chrome.tabs.move(tabList[switchObj.switchToTabIndex]["tabId"], {index: -1});
  
  
  // Switch to target tab
  if(originalTabBehaviour !== "closeAndStay")
    switchToTab(switchObj.switchToTabIndex);  
}

function duplicateThisURL(url){
  if(url){
    url = url_parameter(url, getDeDupParam(), 1);
    
    chrome.tabs.create({
      url: url
    });
  } else {
    chrome.tabs.query({
      currentWindow: true,
      active: true,
      windowType: "normal"
    },function(tabs){
      // return;
      var currID = tabs[0].id;
      chrome.tabs.get(currID, function(tab){
        var url = url_parameter(tab["url"], getDeDupParam(), 1);

        chrome.tabs.create({
          url: url
        });
      });
    });
  }
}

function getDeDupParam(){
  return "deDup"+Math.ceil(Math.random()*1000000);
}

function inWhiteList(url){
  url = url.replace(SUSPENDERPREFIX, "");
  
  if(whitelistRegexString === undefined)
    makeWhitelistRegex();
  
  if(whitelistRegexString != ""){
    var matches = url.match(RegExp(whitelistRegexString,'i'));
    
    if(matches){
      return true;
    } else {
      return false;
    }
    
  } else {
    return false;
  }
}

function makeWhitelistRegex(){
  whitelistRegexString = whitelist.length > 0 ? (".*" + whitelist.join('|') + ".*") : "";
}

function addToWhiteList(url){
  if(whitelist.indexOf(url) > -1)
    return;
  
  whitelist.push(url);
  ls.set({"whitelist": whitelist});
}

function removeFromWhiteList(url){
  var index = whitelist.indexOf(url);
  if(index > -1){
    whitelist.splice(index, 1);
    ls.set({"whitelist": whitelist});   
  }
}

function getAllTabs(run){
  if(run === "startup"){
    chrome.windows.getAll({populate: true}, function(windows){
      // Iterate over windows
      for (var i = 0; i < windows.length; i++) {
        // Get window ID
        var winID = windows[i].id;

        // Iterate over tabs
        for (var j = 0; j < windows[i].tabs.length; j++) {
          if(windows[i].tabs[j]["url"])
            windows[i].tabs[j]["url"] = windows[i].tabs[j]["url"].replace(TRAILING_SLASH_REGEX,"$1$3");
          addToList(windows[i].tabs[j], INIT);
        }
      }
      setBadgeText(initList.length);
    });
  } else {
    chrome.windows.getAll({populate: true}, function(windows){
      tabList = [];
      // Iterate over windows
      for (var i = 0; i < windows.length; i++) {
        // Get window ID
        var winID = windows[i].id;
        
        // Iterate over tabs
        for (var j = 0; j < windows[i].tabs.length; j++) {
          if(findInList({
            searchKey: 'tabId',
            searchValue: windows[i].tabs[j].tabId
          }) == -1){
            if(windows[i].tabs[j]["url"])
              windows[i].tabs[j]["url"] = windows[i].tabs[j]["url"].replace(TRAILING_SLASH_REGEX,"$1$3");
            addToList(windows[i].tabs[j]);
          }
        }
      }
      setBadgeText(tabList.length);
      console.log('Created tab list: ' + tabList.length);
    });
  }
}

function restoreLost(){
  var verbose = false;
  if(arguments && arguments[0]){
    verbose = arguments[0];
    console.log("going verbose...");
    console.log("Found in initList but not in tabList: ");
  }

  // 
  if(tabList.length == 0){
    // fill tabList -- this should never happen!!
  }
  var tabCount = 0;
  // Iterate over tabs in initList
  for (var i = initList.length - 1; i >= 0; i--) {
    // For each tab.id, check if it's in tabList
    if(findInList({
      searchKey: 'tabId',
      searchValue: initList[i].tabId
    }) == -1){
      if(verbose){
        console.log(initList[i]);
      } else {
        // If not in tabList
        // add a dedup number and launch
        var url = url_parameter(initList[i]["url"], getDeDupParam(), 1);
        chrome.tabs.create({
          url: url
        }, function(newTab){
          // add the new deduped tab.id & url to initlist
          addToList(newTab, "both");
        });
        // remove this old tab.id, url from initlist
        tabCount++;
        initList.splice(i,1);
      }
    }
  }
  
  ls.get({
    "showNotifications": DEFAULT_SHOWNOTIFICATIONS
  }, function(st){
    if(st.showNotifications)
      showNotification({
        id: TABS_RESTORED_NOTIFICATION_ID,
        title: 'Tabs restored',
        message: tabCount + ' tab' + (tabCount > 1 ? 's' : '') + 'restored.'
      });
  });
}

function whitelistThisLink(url){
  ls.get({
    "showNotifications": DEFAULT_SHOWNOTIFICATIONS
  }, function(st){
    
    if(url){
      url = url.replace(SUSPENDERPREFIX, "");
      
      addToWhiteList(url);
      
      if(st.showNotifications){
        showNotification({
          id: URL_WHITELISTED_NOTIFICATION_ID,
          title: 'Whitelist updated',
          message: 'Page added to whitelist',
          contextMessage: url,
          buttons:[{
            title: "Open settings",
            iconUrl: chrome.extension.getURL("img/settings.svg"),
          }]
        });
      }
    
    } else {
      
      chrome.tabs.query({
        currentWindow: true,
        active: true,
        windowType: "normal"
      },function(tabs){
        
        var currID = tabs[0].id;
        
        chrome.tabs.get(currID, function(tab){
          
          if(tab.url && tab.url.trim() !== ""){
            
            var url = tab.url.replace(SUSPENDERPREFIX, "");
            
            addToWhiteList(url);
            
            if(st.showNotifications){
              showNotification({
                id: URL_WHITELISTED_NOTIFICATION_ID,
                title: 'Whitelist updated',
                message: 'Page added to whitelist',
                contextMessage: url,
                buttons:[{
                  title: "Open settings",
                  iconUrl: chrome.extension.getURL("img/settings.svg"),
                }]
              });
            }
          }
        });
      });
    }
  });
}

function removeDuplicatesFromTabList(){
  // Remove duplicate tab entries
  var isDuplicate = false;
  for (var j = 0; j < tabList.length; j++) {
    for (var i = tabList.length - 1; i >= 0; i--) {
      if(tabList[i].tabId == tabList[j].tabId && tabList[i]["url"] == tabList[j]["url"] && tabList[i].windowId == tabList[j].windowId && i != j){
        console.log("duplicate: " + j + " = " + i);
        tabList.splice(i,1);
      }
    }
  }
  
  var currList = [];
  chrome.windows.getAll({populate: true}, function(windows){
    for (var j = tabList.length - 1; j >= 0; j--) {
      var found = false;
      // Iterate over windows
      for (var i = 0; i < windows.length; i++) {
        // Iterate over tabs in window
        for (var l = 0; l < windows[i].tabs.length; l++) {
          if(tabList[j].tabId === windows[i].tabs[l].id){
            found = true;
            break;
          }
        }
        if(found === true) break;
      }
      if(found === false) tabList.splice(j,1);
    }
    setBadgeText(tabList.length);

  });
}

function toggleState(){
  ls.get({"browserAction": DEFAULT_BROWSERACTION}, function(st){
    if(st["browserAction"] !== "toggleState")
      chrome.contextMenus.update("toggleState", {
        title: (deDupStatus == "off" ? "Enable" : "Disable") + " Extension",
      }, function(){
        var err = chrome.runtime.lastError;
        if(err)
          console.log(err);
      });
  });
  
  if(deDupStatus == "off"){
    deDupStatus = "on";
    setBadgeColour(ON_COLOUR);
    updateBrowserActionTitle();
    
    // Check for duplicates and show notification if there's any
    var duplicateCount = markDuplicateTabs();
    if(duplicateCount > 0){
      showNotification({
        id: DUPLICATES_FOUND_NOTIFICATION_ID,
        title: "Duplicate tabs found",
        message: duplicateCount + " duplicate tabs found. Close them?",
        contextMessage: "Click notification to dismiss.",
        buttons: [
          {
            title: "Close duplicate tabs",
            iconUrl: chrome.extension.getURL("img/icon_tab_close.svg"),
          },
          {
            title: "Keep all tabs",
            iconUrl: chrome.extension.getURL("img/icon_stop.svg"),
          }
        ]
      });
    }
    
    return true;
  } else {
    deDupStatus = "off";
    setBadgeColour(OFF_COLOUR);
    updateBrowserActionTitle();
    return false;
  }
}

function getState(){
  return deDupStatus === "on";
}

function isURLShortener(url){
  return urlShortenersRegex.test(url);
}

function markDuplicateTabs(){
  var duplicateCount = 0;
  
  // Mark duplicate tabs
  for (var i = 0; i < tabList.length; i++) { // -- will keep newest duplicate, close old ones
  // for (var i = tabList.length - 1; i >= 0; i--) { // -- will keep oldest duplicate, close recent ones
    if(inWhiteList(tabList[i]["url"])) // URL in whitelist
      continue;
    
    if(tabList[i]["isDuplicate"] === true)
      duplicateCount++;
    else {
      for (var j = i + 1; j < tabList.length; j++) { // -- will keep newest duplicate, close old ones
      // for (var j = i - 1; j >= 0; j--) { // -- will keep oldest duplicate, close recent ones
        if(!tabList[j]["isDuplicate"] && (
           tabList[i]["url"] == tabList[j]["url"] ||  // same url
           SUSPENDERPREFIX + tabList[i]["url"] == tabList[j]["url"] || // suspended vs active
           tabList[i]["url"] == SUSPENDERPREFIX + tabList[j]["url"] // active vs suspended
        )){
          tabList[i]["isDuplicate"] = true;
          duplicateCount++;
          break;
        }
      }
    }
  }
  
  return duplicateCount;
}

function removePreExistingDuplicateTabs(fromNotification){
  
  // Remove any duplicate entries in array before starting
  removeDuplicatesFromTabList();
  
  var duplicateCount = markDuplicateTabs();
  
  if(duplicateCount > 0){
    
    // Remove duplicate tabs
    for (var i = tabList.length - 1; i >= 0; i--) {
      if(tabList[i]["isDuplicate"] === true){
        chrome.tabs.remove(tabList[i]["tabId"]);
        tabList.splice(i,1);
      }
    }
    
    // Update badge text
    setBadgeText(tabList.length);
    
    // Show notification
    if(fromNotification !== true){
      showNotification({
        id: PREVIOUS_DUPLICATES_REMOVED_NOTIFICATION_ID,
        title: "Removed duplicates",
        message: duplicateCount + " duplicate tabs removed.",
        contextMessage: "Click notification to dismiss.",
      });
    }
  }
}

function setDonated(donated, from){
  if(donated){
    ls.set({"donated": true});
    trackButton(GA_DONATED_TRACK, true, from);
    chrome.tabs.create({url: DONATE_URL});
  } else {
    console.log("setDonated(false)","Shouldn't be here if not donated.");
  }
}

// From: http://browse-tutorials.com/snippet/alter-url-get-parameters-using-javascript
function url_parameter(url, param, value) {
  // Find given parameter.
  var val = new RegExp('(\\?|\\&)' + param + '=.*?(?=(&|$))'),
    parts = url.toString().split('#'),
    url = parts[0],
    hash = parts[1],
    qstring = /\?.+$/,
    return_url = url;
 
  // Check for parameter existance: Replace it and determine whether & or ? will be added at the beginning.
  if (val.test(url)) {
    // If value empty and parameter exists, remove the parameter.
    if (!value.length) {
      return_url = url.replace(val, '');
    }
    else {
      return_url = url.replace(val, '$1' + param + '=' + value);
    }
  }
  // If there are query strings add the param to the end of it.
  else if (qstring.test(url)) {
    return_url = url + '&' + param + '=' + value;
  }
  // Add if there are no query strings.
  else {
    return_url = url + '?' + param + '=' + value;
  }
 
  // Add hash if it exists.
  if (hash) {
    return_url += '#' + hash;
  }
  return return_url;
}

