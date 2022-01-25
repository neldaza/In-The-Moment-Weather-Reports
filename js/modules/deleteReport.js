/* eslint-disable no-undef */
var switchView = require('./switchView');

function deleteReport(event) {
  event.preventDefault();

  var $liSelectorAll = document.querySelectorAll('li');
  for (var a = 0; a < $liSelectorAll.length; a++) {
    if ($liSelectorAll[a].getAttribute('data-entry-id') === data.editing.entryId) {
      var specificReport = $liSelectorAll[a];
      var $ulSelectorAll = document.querySelectorAll('ul');
      for (var x = 0; x < $ulSelectorAll.length; x++) {
        var specificUl = $ulSelectorAll[x];
        if (specificUl.getAttribute('class') === specificReport.getAttribute('data.city-id')) {
          var reportUl = $ulSelectorAll[x];
          var reportLi = $liSelectorAll[a];
          reportUl.removeChild(reportLi);
          data.entries.splice(i, 1);
          switchView(event.target.getAttribute('data-view'));
        }
      }
    }
  }
}

//   var $liSelectorAll = document.querySelectorAll('li');
//   var nodeListArray = [];
//   for (var a = 0; a < $liSelectorAll.length; a++) {
//     if (data.entries[i].entryId === parseInt($liSelectorAll[a].getAttribute('data-entry-id'))) {
//       var $cityUlsSelectorAll = document.querySelectorAll('ul');
//       for (var b = 0; b < $cityUlsSelectorAll.length; b++) {
//         if ($liSelectorAll[a].getAttribute('data-city-id') === $cityUlsSelectorAll[b].getAttribute('class')) {
//           nodeListArray.push($liSelectorAll[a]);
//           $cityUlsSelectorAll[b].removeChild($liSelectorAll[a]);
//           data.entries.splice(i, 1);
//           switchView(event.target.getAttribute('data-view'));
//           return;
//         }
//       }
//     }
//   }
// }

module.exports = deleteReport;
