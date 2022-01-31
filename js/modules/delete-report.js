/* eslint-disable no-undef */
var switchView = require('./switch-view');

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
          }
        }
        if (data.entries.length === 0) {
          var $firstCityUl = document.querySelector('.first-city-ul');
          var $secondCityUl = document.querySelector('.second-city-ul');
          var $noRecordingsText = document.querySelector('.no-recorded');
          while ($firstCityUl.firstChild) {
            $firstCityUl.removeChild($firstCityUl.firstChild);
          }
          while ($secondCityUl.firstChild) {
            $secondCityUl.removeChild($secondCityUl.firstChild);
          }
          $noRecordingsText.className = 'no-recorded';
          switchView('reports-page');
          return;
        }
        switchView(`${data.editing.cityName}`);
        return;
      }
    }
  }
}

module.exports = deleteReport;
