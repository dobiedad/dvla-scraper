## DVLA Scraper
Scraper for finding driving test date cancellation. I passed my driving test before i managed to finish this project off as a website. Pull requests are welcome

## Install
##### [NPM](https://www.npmjs.com/)

#### Clone repo  

```
git clone https://github.com/dobiedad/dvla-scraper
```

## Run the Scraper


#### 1) Go into the project
```
cd dvla-scraper
```
#### 2) Install packages
```
npm install
```

#### 4) Edit Credentials in testScrape.js
```
Edit the following variables

var licenseNumber =  "ENTER YOUR LICENCE",
var theoryPassNumber = "ENTER YOUR THEORY PASS NUMBER",
var postcode = "ENTER YOUR POSTCODE",

```
#### 5) Run the scraper
```
node testScrape.js
```
#### 6) When the scraper is finished it will generate a file with all the data
```
 dates.json
```

## Run the Website


#### 1) Go into the project
```
cd dvla-scraper
```
#### 2) Install packages
```
npm install
```

#### 4) Run Watchify to watch changes
```
watchify index.js -o bundle.js

```
#### 5) Run server
```
node server.js
```
