chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var currentTab = tabs[0];
    chrome.tabs.executeScript(
      currentTab.id,
      {
        code: `
          var jobDetailsElement = document.querySelector('.description__text');
          if (jobDetailsElement) {
            chrome.storage.sync.set({ 'jobDetails': jobDetailsElement.textContent }, function() {
              console.log('Job details saved to storage.');
            });
            return jobDetailsElement.textContent;
          } else {
            return 'No job details found on this page.';
          }
        `
      },
      function (result) {
        document.getElementById('job-details').value = result[0];
      }
    );
  });