var By = require('selenium-webdriver').By;
var _ = require('underscore');
var moment = require('moment');

function scrape(webDriver, licenseNumber, theoryPassNumber, location) {
  function loginWith(webDriver, licenseNumber, theoryPassNumber) {
    return webDriver.get('https://driverpracticaltest.direct.gov.uk/login').then(function() {
      return webDriver.findElement(By.id('driving-licence-number')).sendKeys(licenseNumber).then(function() {
        return webDriver.findElement(By.id('use-theory-test-number')).click().then(function() {
          return webDriver.findElement(By.id('theory-test-pass-number')).sendKeys(theoryPassNumber).then(function() {
            return webDriver.findElement(By.id('booking-login')).click();
          });
        });
      });
    });
  }

  function loginAndGetTestDates(webDriver, licenseNumber, theoryPassNumber, location) {
    return loginWith(webDriver, licenseNumber, theoryPassNumber).then(function() {
      return findTestCentresIn(location).then(function(url) {
        return findTestCentresAndDatesAndLoadMoreWith(url).then(function(data) {
          return data;
        });
      });
    });
  }

  var jsonfile = require('jsonfile');
  var writeToPath = __dirname + '/dates.json';

  console.log("SCRAPE.JS CALLED");

  function getCentresAndDates() {
    var centreSelector = {
      css: '.test-centre-details span h2'
    };
    var dateSelector = {
      css: '.test-centre-details span h5'
    };
    var testUrlSelector = {
      css: '.test-centre-details-link'
    };
    var data = [];
    return webDriver.findElements(testUrlSelector).then(function(links) {
      return webDriver.findElements(centreSelector).then(function(centres) {
        return webDriver.findElements(dateSelector).then(function(dates) {
          var centrePromises = centres.map(function(centre) {
            return centre.getText();
          });
          var datePromises = dates.map(function(date) {
            return date.getText();
          });
          var UrlPromises = links.map(function(link) {
            return link.getAttribute('href');
          });
          return Promise.all(UrlPromises).then(function(urlPromises) {
            return Promise.all(centrePromises).then(function(testCentre) {
              return Promise.all(datePromises).then(function(testDate) {
                var date = testDate.map(function(date) {
                  if (date.match("No dates found")){
                    return "";
                  }
                  else {
                    console.log(date + "PLACES IT CRASHES");
                    var validDate = /(\d\d\/\d\d\/\d\d\d\d)/.exec(date)[1];
                    return validDate;
                  }
                });

                data = testCentre.map(function(centre, i) {
                  return {
                    centre: centre,
                    date: moment(date[i], "DD/MM/YYYY"),
                    britishDate: date[i],
                    url: urlPromises[i]
                  };
                });

                var sortedData = _.sortBy(data, function(data) {
                  return data.date;
                });

                jsonfile.writeFile(writeToPath, sortedData, {
                  spaces: 1
                }, function(err) {});

                return sortedData;
              });
            });
          });
        });
      });
    });
  }

  function findTestCentresIn(location) {
    webDriver.manage().window().setSize(1280, 1024);
    return webDriver.findElement(By.id('test-centre-change')).click().then(function() {
      var testCentresInput = webDriver.findElement(By.id('test-centres-input'));
      return testCentresInput.clear().then(function() {
        return testCentresInput.sendKeys(location).then(function() {
          return webDriver.findElement(By.id('test-centres-submit')).click().then(function() {
            return webDriver.findElement(By.css('#fetch-more-centres')).then(function(link) {
              return link.getAttribute('href');
            });
          });
        });
      });
    });
  }

  function findTestCentresAndDatesAndLoadMoreWith(listOfTestCentresUrl) {
    var limit = 20;
    function navigateToTestCentreListAndClickShowMoreResults() {
      if (limit-- > 0) {
        return webDriver.navigate().to(listOfTestCentresUrl).then(function() {
          return navigateToTestCentreListAndClickShowMoreResults();
        });
      }
      return getCentresAndDates();
    }
    return navigateToTestCentreListAndClickShowMoreResults();
  }

  return loginAndGetTestDates(webDriver, licenseNumber, theoryPassNumber, location);
}

module.exports = scrape;
