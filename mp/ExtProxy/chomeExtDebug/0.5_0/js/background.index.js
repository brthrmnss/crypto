function getword(info, tab) {
    console.log("Word " + info.selectionText + " was clicked.");

    console.log('created context menuy')

    // debugger

    var xhr = new XMLHttpRequest();

    // xhr.open("GET", "http://www.example.com?par=0", false);
    xhr.open("GET", "http://127.0.0.1:4444/speakText?text=" + info.selectionText, false);
    xhr.send();

    var result = xhr.responseText;

    return;

    chrome.tabs.create({
        url: "http://www.google.com/search?q=" + info.selectionText,
    });
}

chrome.contextMenus.create({
    title: "Read: %s",
    contexts: ["selection"],
    onclick: getword,
});

console.log('created context menuy')

function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
}
function genericOnClick2(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));


    function doStuffWithDOM(vs) {
        //alert("I received the following DOM content:\n" + vs);
        console.log('size-in', vs.length)
        var url = "http://127.0.0.1:4444/speakText2"


        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("response").innerText = xhr.responseText;
                console.log(xhr.responseText);
            }
        };

        xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhr.send(vs);

        var obj = {};
        obj.html = vs;
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(obj))
    }

    /*    chrome.tabs.sendMessage(tab.id, {text: "report_back"},
     doStuffWithDOM);
     */

    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        /* If the received message has the expected format... */
        if (msg.text && (msg.text == "what_is_my_id")) {

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                /*chrome.tabs.sendMessage(tab.id, {text: "report_back"},
                 doStuffWithDOM);*/
                debugger
                sendResponse(tab.id, tab)
            });

            // sendResponse( vs);
        }
    });

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tab.id, {text: "report_back", id: tab.id, tab: tab},
            doStuffWithDOM);
    });


    return
    if ('createRange' in document && 'getSelection' in window) {
        // firefox, opera, webkit
        var range = document.createRange();
        range.selectNodeContents(document.body);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    } else if ('createTextRange' in document.body) {
        // ie
        document.body.createTextRange().select();
    }

    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    if (range) {
        var div = document.createElement('div');
        div.appendChild(range.cloneContents());
        vs = div.innerHTML;
    }


    var url = "http://127.0.0.1:4444/speakText2"


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("response").innerText = xhr.responseText;
            console.log(xhr.responseText);
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(vs);

}

chrome.contextMenus.create(
    {"title": "Read All", "onclick": genericOnClick2});
/*

 var parent = chrome.contextMenus.create({"title": "Test parent item"});
 var child1 = chrome.contextMenus.create(
 {"title": "Child 1", "parentId": parent, "onclick": genericOnClick});
 var child2 = chrome.contextMenus.create(
 {"title": "Child 2", "parentId": parent, "onclick": genericOnClick});
 console.log("parent:" + parent + " child1:" + child1 + " child2:" + child2);

 */

/*
 chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
 var tab = tabs[0]
 // debugger
 chrome.tabs.sendMessage(tab.id, {text: "what_is_my_id"},
 doStuffWithDOM);
 setTimeout(function onsdf() {
 debugger
 chrome.tabs.sendMessage(tab.id, {text: "what_is_my_id"},
 doStuffWithDOM);
 },500)
 });
 */

function fx2() {

}

if (window.sendHelper == null) {
    var sendHelper = {}
    sendHelper.data = {};
    var self = sendHelper;
    window.sendHelper = sendHelper;
} else {
    var sendHelper = window.sendHelper
    var self = sendHelper;
}


self.data.dictTabs = {}
sendHelper.tryToClaim = function tryToClaim(a, b) {
    debugger
}
sendHelper.validItem = function validItem(a, evalBrowserName) {
    if ( evalBrowserName == null &&   self.data.dictTabs[a] &&
            self.data.dictTabs[a].evalBrowserName != null) {
        return;
    }
    self.data.dictTabs[a] = {atab: true, evalBrowserName: evalBrowserName}
}

sendHelper.clearItems = function clearItems(a) {
    self.data.dictTabs = {};
}

chrome.tabs.onCreated.addListener(function onNewTabCreated(tab, again) {
    console.debug('created', tab)
    //debugger
    chrome.tabs.sendMessage(tab.id,
        {
            text: "new_TabX", id: tab.id,
            tab: tab,
            sendHelper: sendHelper
        },
        fx2);

    if (again != true) {
        setTimeout(function ok() {
            onNewTabCreated(tab, true)
        }, 1500)
        return;
    }

});

chrome.tabs.onUpdated.addListener(function onUpdate(tabId, changeInfo, tab, again) {
    console.debug('updated', tab, tabId)
    //debugger
    if (tab.url.includes('clearsession')) {
        console.debug('log...')
        sendHelper.data.dictTabs = {}
    }

    console.log('updateX', sendHelper.data.dictTabs[tab.id])
    chrome.tabs.sendMessage(tab.id,
        {
            text: "update_TabX", id: tab.id,
            tab: tab,
            sendHelper: sendHelper,
            loadedBoomBoom: sendHelper.data.dictTabs[tab.id]
        }, null,
        function onActive(evalBrowserName) {
            console.log('got new tab', evalBrowserName)
            sendHelper.validItem(tab.id, evalBrowserName)
        });

    if (again != true) {
        setTimeout(function ok() {
            onUpdate(tabId, changeInfo, tab, true)
        }, 1500)
        return;
    }
})