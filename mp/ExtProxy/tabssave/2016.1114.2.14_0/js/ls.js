var ls;

var localSt = chrome.storage.local;
localSt.fetch = function(param){
  localSt.get(param, function(st){
    console.log(st);
  });
}

var syncSt = chrome.storage.sync;
syncSt.fetch = function(param){
  syncSt.get(param, function(st){
    console.log(st);
  });
}


function setLS(syncStorage, callback){
  
  ls = syncStorage ? chrome.storage.sync : chrome.storage.local;
  
  ls.fetch = function(param){
    ls.get(param, function(st){
      console.log(st);
    });
  }
  
  if(callback) callback();
}
