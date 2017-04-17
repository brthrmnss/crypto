console.log("hi");
var eventList = [
  // "onBeforeNavigate",
  "onCreatedNavigationTarget",
  // "onCommitted",
  "onCompleted",
  "onDOMContentLoaded",
  "onErrorOccurred",
  // "onReferenceFragmentUpdated",
  // "onTabReplaced",
  // "onHistoryStateUpdated"
];

eventList.forEach(function(e) {
  console.log("hi");
  chrome.webNavigation[e].addListener(function(data) {
    if(data && data.frameId != undefined && data.frameId == 0)
      console.log(e, data.tabId, {url: data.url, type: JSON.stringify(data.transitionQualifiers)});
  });
});


chrome.webNavigation["onBeforeNavigate"].addListener(function(data) {
  console.log("onBeforeNavigate", data.tabId, {url: data.url, type: JSON.stringify(data.transitionQualifiers)});
  // Check and add to list
  // processURLChange("onCommitted", data);
});


chrome.webNavigation["onHistoryStateUpdated"].addListener(function(data) {
  processURLChange("onHistoryStateUpdated", data);
});


chrome.webNavigation["onReferenceFragmentUpdated"].addListener(function(data) {
  processURLChange("onReferenceFragmentUpdated", data);
});


chrome.webNavigation["onCommitted"].addListener(function(data) {
  processURLChange("onCommitted", data);
});

function processURLChange(sourceEvent, data){
  console.log(sourceEvent, data.tabId, {url: data.url, type: JSON.stringify(data.transitionQualifiers)});
  // check and update list --- iff transitionQualifiers contain redirect, update only url, leave base_url alone  
  
  return;
  var initListIndex = findInList({
    searchList: INIT,
    searchKey: 'tabId',
    searchValue: data.tabId
  });
  
  // Do not check for duplicates in the tabs from initList till they've completed loading one-time
  if(initListIndex > -1 && (initList[initListIndex]["status"] != "complete")){
    // update URL in initList if changeInfo.url has changed
    if(!!data.url){
      updateList({
        'list' : INIT,
        'arrIndex' : initListIndex,
        'update' : 'url',
        'newValue' : tab.url,
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
    
  } else if(!!data.url){
    // Only need to proceed if url is being updated
    chrome.tabs.sendMessage(data.tabId, {type: "urlchange"});
    
    // If extension state == "off", save updated tab to list and return
    if(deDupStatus == "off" || inWhiteList(data.url)){
      // Check if tab is already in list
      var tabListIndex = findInList({
        searchKey: 'tabId',
        searchValue: data.tabId
      });
      if(tabListIndex == -1){
        // New tab
        addToList(tab);
        console.log("Tab: " + data.tabId + ' Added. List size: ' + tabList.length + " elements. (In Update: New Tab Created - inwhitelist or dedup off)");
      } else {
        // update url for the tab in list
        updateList({
          "update" : "url",
          "arrIndex" : tabListIndex,
          "newValue" : tab.url,
          "completed": changeInfo.status === "complete"
        });
        console.log("Tab: " + data.tabId + ' Updated. List size: ' + tabList.length + " elements. (In Update: Tab URL changed - navigation, inwhitelist or dedup off)");
      }
    } else {
      // Extension is on, url not in whitelist, so proceed
      
      // Check if url is already in tab list
      var urlListIndex = findInList({
        searchKey: 'url',
        windowId: tab.windowId,
        searchValue: changeInfo.url
      });
      
      // Also check if duplicate tab is not 'self'
      if(urlListIndex > -1 && tabList[urlListIndex].tabId != data.tabId){
      // We have a duplicate tab, close this and switch to original
        
        // Check if old tab really exists in browser
        chrome.tabs.get(tabList[urlListIndex].tabId, function(tab2){
          var lastError = chrome.runtime.lastError;
          if(lastError !== undefined){
            // Old tab doesn't exist anymore
            console.log("last-error: ");
            console.log(lastError);
            
            // Remove old tab from tabList
            tabList.splice(urlListIndex,1);
            
            // Check if new tab is already in list
            var tabListIndex = findInList({
              searchKey: 'tabId',
              searchValue: data.tabId
            });
            
            if(tabListIndex == -1){
              // Add new tab to tabList
              addToList(tab);
              console.log("Tab: " + data.tabId + ' Added. List size: ' + tabList.length + " elements. (In Update: Expired duplicate removed from list and new tab added)");
            } else {
              // Update url for new tab in tabList
              updateList({
                "update" : "url",
                "arrIndex" : tabListIndex,
                "newValue" : tab.url,
                "completed": changeInfo.status === "complete"
              });
              console.log("Tab: " + data.tabId + ' Updated. List size: ' + tabList.length + " elements. (In Update: Expired duplicate removed from list and source tab's URL updated)");
            }
          } else {
            // If old tab exists, close&switch
            closeAndSwitch({
              closeTabId: data.tabId,
              switchToTabIndex: urlListIndex
            });
            console.log("Tab: " + data.tabId + ' Duplicate prevented. List size: ' + tabList.length + " elements. (In Update: Sending close & switch from onUpdated)");
          }
        });
      } else {
        // New unique url
        // If tab already exists, update, else add
        
        // Check if tab is already in list
        var tabListIndex = findInList({
          searchKey: 'tabId',
          searchValue: data.tabId
        });
        if(tabListIndex == -1){
          // New tab
          addToList(tab);
          console.log("Tab: " + data.tabId + ' Added. List size: ' + tabList.length + " elements. (In Update: New Tab Created - not inwhitelist && dedup on)");
        } else {
          // update url for the tab in list
          updateList({
            "update" : "url",
            "arrIndex" : tabListIndex,
            "newValue" : tab.url,
            "completed": changeInfo.status === "complete"
          });
          console.log("Tab: " + data.tabId + ' Updated. List size: ' + tabList.length + " elements. (In Update: Tab URL changed - navigation, not inwhitelist && dedup on)");
        }
      }
    }
  }
  
  // If page loaded, and it's a Pocket page, insert cf script and css
  if(changeInfo.status === "complete" && /getpocket.com\/(a|beta)/i.test(tab.url) === true){
    chrome.tabs.insertCSS(data.tabId, {
      file: "css/cf.css",
    }, function(){
      chrome.tabs.executeScript(data.tabId, {
        file: "js/ext/jquery-2.1.1.min.js",
      }, function(){
        chrome.tabs.executeScript(data.tabId, {
          file: "js/cf.js",
        });
      });
    });
  }
}


// chrome.webRequest.onBeforeRequest.addListener(function(details){
//   console.log(details);
// }, {
//   urls: ["*://*/*"],
//   types: ["main_frame"]
// });
