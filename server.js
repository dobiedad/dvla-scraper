var express = require('express');
var sass = require('node-sass');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var app = express();
var morgan = require('morgan');
var webdriver = require('selenium-webdriver'),
  By = require('selenium-webdriver').By,
  until = require('selenium-webdriver').until,
  chrome = require('phantomjs');

var webDriver = new webdriver.Builder()
  .forBrowser('phantomjs')
  .build();

var scrape = require('./scrape');
var webdriver = require('selenium-webdriver'),
  until = require('selenium-webdriver').until,
  chrome = require('phantomjs');

var driver = new webdriver.Builder()
  .forBrowser('phantomjs')
  .build();
var jsonfile = require('jsonfile');
var writeToPath = __dirname + '/dates.json';

app.use(sassMiddleware({
    src: __dirname,
    dest: path.join(__dirname, ''),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/'
}));
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, '')));

app.get('/', function(req, res) {
 res.sendFile(path.join(__dirname + '/index.html'));
});

var licenseNumber =  "ENTER YOUR LICENCE",
var theoryPassNumber = "ENTER YOUR THEORY PASS NUMBER",
var postcode = "ENTER YOUR POSTCODE",

app.get('/scrape/:licenseNumber/:theoryPassNumber/:location', function(req, res) {
  scrape(webDriver, req.params.licenseNumber, req.params.theoryPassNumber, req.params.location).then(function(data) {
    res.send(200,data);
  });
});
app.listen(4321);
