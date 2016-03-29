var scrape = require('./scrape');
var webdriver = require('selenium-webdriver');

var licenseNumber =  "ENTER YOUR LICENCE";
var theoryPassNumber = "ENTER YOUR THEORY PASS NUMBER";
var postcode = "ENTER YOUR POSTCODE";

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
driver.manage().window().setSize(1280, 1024);
console.log("TESTSCRAPE.JS CALLED");

scrape(driver, licenseNumber, theoryPassNumber, postcode).then(function(results) {
  console.log("FINISHED SCRAPING!", results);
});
