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


    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tab.id, {text: "report_back"},
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
