// Called when the user clicks on the browser action.
//chrome.browserAction.onClicked.addListener(function(tab) {
//    // No tabs or host permissions needed!
//
//    chrome.tabs.executeScript(null, {file: "jquery-2.2.1.js"});
//    chrome.tabs.executeScript(null, {file: "content_script.js"});
//});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method == "getKeywords") {
		if (localStorage['keywords']) {
			sendResponse({
				keywords: localStorage['keywords']
			});
		} else {
			localStorage.setItem('keywords', '');
		}
	} else {
		if (request.method == "sendDefenseCount") {
			if (request.param) {
				localStorage.setItem('defenseCount', request.param);
			}
		} else {
			sendResponse({});
		}
	}
});



// show the popup when the user clicks on the page action.
//chrome.pageAction.onClicked.addListener(function(tab) {
//    chrome.pageAction.show(tab.id);
//    chrome.tabs.executeScript(null, {file: "jquery-2.2.1.js"});
//    chrome.tabs.executeScript(null, {file: "content_script.js"});
//});

// listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
	if (tab.url.toLowerCase().indexOf("bilibili.com") > -1) {
		chrome.pageAction.show(id);
		chrome.pageAction.setPopup({
			tabId: id,
			popup: 'popup.html'
		});
	}
});