var plastiq = require('plastiq');
var jquery = require('jquery');
var httpism = require('httpism');
global.jQuery = jquery;
global.$ = jquery;

var h = plastiq.html;

function render(model) {

  function getTests() {
    $("#modal").show();
    var url = '/scrape/' + model.licenseNumber + '/' + model.theoryPassNumber + '/' + model.postcode;
    return httpism.get(url).then(response => {
      model.tests = response.body;
      $("#modal").hide();
    }).catch(error => {
      // TODO: do something to let the user know it failed!
      $("#modal").hide();
      alert(error)
    });
  }

  return h('div',
    h('div#modal.hidden',
       h('img', {src: 'http://loading.io/assets/img/default-loader.gif'})
    ),
    h('h1', 'Find the earliest practical driving test date near you'),
    h('div.input',
      h('input', {
        type: 'text',
        placeholder: "Your Licence Number",
        binding: [model, 'licenseNumber']
      }),
      h('div.border-line')
    ),
    h('div.input',
      h('input', {
        type: 'text',
        placeholder: "Your Theory Pass Number",
        binding: [model, 'theoryPassNumber']
      }),
      h('div.border-line')
    ),
    h('div.input',
      h('input', {
        type: 'text',
        placeholder: "Your Post Code",
        binding: [model, 'postcode']
      }),
      h('div.border-line')
    ),
    h('a.flat-button', {
      onclick: getTests
    }, 'find cancellations'),
    h('ul#tests',
      model.tests.map(test => {
        return h('a.test', {
         href: test.url
         },
         h('li.test', test.centre + ' - ' + test.britishDate)
       )
      })
    )
  );
}
var tests = [
 {
  "centre": "Worthing",
  "date": "2016-03-18T00:00:00.000Z",
  "britishDate": "18/03/2016",
  "url": "https://driverpracticaltest.direct.gov.uk/manage?execution=e1s2&csrftoken=e3QY6ydCfgYK6YsaUvhdveVFsncpyIlF&_eventId=proceed&centreID=149"
 },
 {
  "centre": "Eastbourne",
  "date": "2016-03-18T00:00:00.000Z",
  "britishDate": "18/03/2016",
  "url": "https://driverpracticaltest.direct.gov.uk/manage?execution=e1s2&csrftoken=e3QY6ydCfgYK6YsaUvhdveVFsncpyIlF&_eventId=proceed&centreID=108"
 },
 {
  "centre": "Winchester",
  "date": "2016-03-18T00:00:00.000Z",
  "britishDate": "18/03/2016",
  "url": "https://driverpracticaltest.direct.gov.uk/manage?execution=e1s2&csrftoken=e3QY6ydCfgYK6YsaUvhdveVFsncpyIlF&_eventId=proceed&centreID=434"
 },
 {
  "centre": "Mitcham (London)",
  "date": "2016-03-19T00:00:00.000Z",
  "britishDate": "19/03/2016",
  "url": "https://driverpracticaltest.direct.gov.uk/manage?execution=e1s2&csrftoken=e3QY6ydCfgYK6YsaUvhdveVFsncpyIlF&_eventId=proceed&centreID=1942"
 },
 {
  "centre": "Reigate",
  "date": "2016-03-21T00:00:00.000Z",
  "britishDate": "21/03/2016",
  "url": "https://driverpracticaltest.direct.gov.uk/manage?execution=e1s2&csrftoken=e3QY6ydCfgYK6YsaUvhdveVFsncpyIlF&_eventId=proceed&centreID=132"
 }
]

var model = {
  name: '',
  licenseNumber: "ENTER YOUR LICENCE",
  theoryPassNumber: "ENTER YOUR THEORY PASS NUMBER",
  postcode: "ENTER YOUR POSTCODE",
  tests: tests
};

window.model = model;

plastiq.append(document.body, render, model);
