/* eslint-disable no-undef */
var switchView = require('./switch-view');
var { reshuffleDataCities, removeAllChildNodes } = require('./reshuffle-data-cities');
var reportsPageRenderForLoop = require('./reports-page-render-for-loop');

var $firstCityUl = document.querySelector('.first-city-ul');
var $secondCityUl = document.querySelector('.second-city-ul');
var $noRecordingsText = document.querySelector('.no-recorded');

function deleteReport(event) {
  var $liSelectorAll = document.querySelectorAll('li');
  for (var a = 0; a < $liSelectorAll.length; a++) {
    var $ulSelectorAll = document.querySelectorAll('ul');
    for (var x = 0; x < $ulSelectorAll.length; x++) {
      if ($ulSelectorAll[x].getAttribute('data-city-id') === $liSelectorAll[a].getAttribute('data-city-id') &&
      parseInt($liSelectorAll[a].getAttribute('data-entry-id')) === data.editing.entryId) {
        $ulSelectorAll[x].removeChild($liSelectorAll[a]);
        for (var i = 0; i < data.entries.length; i++) {
          if (data.entries[i].entryId === data.editing.entryId) {
            data.entries.splice(i, 1);
            if (data.entries.length === 0) {
              removeAllChildNodes($firstCityUl);
              removeAllChildNodes($secondCityUl);
              $noRecordingsText.className = 'no-recorded';
              data.editing = null;
              switchView('reports-page');
              return;
            }
          }
        }
      }
    }
  }

  var presentCities = [];
  var deletedCity = [];

  for (var b = 0; b < data.entries.length; b++) {
    for (var q = 0; q < data.cities.length; q++) {
      if (data.cities[q].cityName === data.entries[b].cityName) {
        presentCities.unshift(data.cities[q]);
      } else {
        deletedCity.push(data.cities[q]);
      }
    }
  }

  var $cityNameHolderSelectorAll = document.querySelectorAll('.reports-city-name-holder');
  for (var n1 = 0; n1 < $cityNameHolderSelectorAll.length; n1++) {
    if ($cityNameHolderSelectorAll[n1].getAttribute('data-view') === deletedCity[0].cityName) {
      var $dataViewDivSelectorAll = document.querySelectorAll('.data-view-div');
      for (x1 = 0; x1 < $dataViewDivSelectorAll.length; x1++) {
        if ($dataViewDivSelectorAll[x1].getAttribute('data') === 'new-main-data-view' &&
        $dataViewDivSelectorAll[x1].getAttribute('data-view') === deletedCity[0].cityName) {
          var $main = document.querySelector('.main');
          $main.removeChild($divSelectorAll[x1]);
        }
      }
      removeAllChildNodes($firstCityUl);
      removeAllChildNodes($secondCityUl);
      var setCities = new Set(presentCities);
      var final = Array.from(setCities);
      reshuffleDataCities(final);
      data.cities = final;
      for (d = 0; d < data.cities.length; d++) {
        if (data.cities[d].cityCount === 1) {
          $firstCityUl.append(reportsPageRenderForLoop(data.cities[d]));
        } else if (data.cities[d].cityCount % 2 === 0) {
          $secondCityUl.append(reportsPageRenderForLoop(data.cities[d]));
        } else {
          $firstCityUl.append(reportsPageRenderForLoop(data.cities[d]));
        }
        switchView('reports-page');
        data.editing = null;
      }
      return;
    }
  }

  switchView(`${data.editing.cityName}`);
  data.editing = null;
}

module.exports = deleteReport;
