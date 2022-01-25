/* eslint-disable no-undef */
var switchView = require('./switchView');

function deleteReport(event) {
  var $liSelectorAll = document.querySelectorAll('li');
  for (var a = 0; a < $liSelectorAll.length; a++) {
    var $ulSelectorAll = document.querySelectorAll('ul');
    for (var x = 0; x < $ulSelectorAll.length; x++) {
      if ($ulSelectorAll[x].getAttribute('class') === $liSelectorAll[a].getAttribute('data-city-id')) {
        $ulSelectorAll[x].removeChild($liSelectorAll[a]);
        for (var i = 0; i < data.entries.length; i++) {
          if (data.entries[i].entryId === data.editing.entryId) {
            data.entries.splice(i, 1);
          }
        }
        switchView(`${data.editing.cityName}`);
        return;
      }
    }
  }
}

module.exports = deleteReport;
