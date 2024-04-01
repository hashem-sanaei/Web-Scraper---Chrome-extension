chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
      file: "content.js"
    });
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getJobDetails') {
      chrome.storage.sync.get('jobDetails', function(data) {
        sendResponse({ jobDetails: data.jobDetails || 'No job details found' });
      });
      return true;
    }
  });