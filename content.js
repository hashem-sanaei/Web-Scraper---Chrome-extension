chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getJobDetails') {
      var jobDetailsElement = document.querySelector('.description__text');
      if (jobDetailsElement) {
        chrome.storage.sync.set({ 'jobDetails': jobDetailsElement.textContent }, function() {
          console.log('Job details saved to storage.');
        });
        sendResponse({ jobDetails: jobDetailsElement.textContent });
      } else {
        sendResponse({ jobDetails: 'No job details found on this page.' });
      }
    }
  });