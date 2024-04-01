const { By, until, Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function extractJobDetails() {
  const options = new chrome.Options();
  options.addExtensions('./dist/extension.crx');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.linkedin.com/jobs/');
    const jobDetailsElement = await driver.wait(until.elementLocated(By.css('.description__text')), 10000);
    const jobDetails = await jobDetailsElement.getText();

    chrome.storage.sync.set({ 'jobDetails': jobDetails }, function() {
      console.log('Job details saved to storage.');
    });

    chrome.runtime.sendMessage({ action: 'getJobDetails' }, function(response) {
      console.log(response.jobDetails);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await driver.quit();
  }
})();