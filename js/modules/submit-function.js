/* eslint-disable no-undef */

var reportsPageRender = require('./reports-page-render');
var newReportEntry = require('./new-report-entry-with-img');
var newReportEntryNoImg = require('./new-report-entry-no-img');
var newMainDataView = require('./new-main-data-view');
var switchView = require('./switch-view');
var { showDeleteModal } = require('./show-delete-modal');
var { reshuffleDataCities } = require('./reshuffle-data-cities');

var $cityResultName = document.querySelector('.city-name');
var $form = document.querySelector('.entry-form-submit');
var $cityResultTime = document.querySelector('.city-time');
var $firstCityUl = document.querySelector('.first-city-ul');
var mainElement = document.querySelector('.main');
var $secondCityUl = document.querySelector('.second-city-ul');
var $noRecordingsText = document.querySelector('.no-recorded');

function submitFunction(event) {
  event.preventDefault();
  var cityName = $cityResultName.textContent;
  var photoTitleValue = $form.elements.photoTitle.value;
  var commentsValue = $form.elements.comments.value;
  var photoUrlValue = $form.elements.photoUrl.value;
  var radioChecked = $form.elements.choice.value;
  var time = $cityResultTime.textContent;
  var date = data.date;
  var submissionObject = { cityName, photoTitleValue, photoUrlValue, commentsValue, radioChecked, time, date };
  if (data.entries.length === 0) {
    data.cities.push({
      cityName: submissionObject.cityName,
      cityCount: data.nextCityCount
    });
    reshuffleDataCities(data.cities);
    $firstCityUl.appendChild(reportsPageRender());
    mainElement.appendChild(newMainDataView());
    const $ulSelectorAll = document.querySelectorAll('ul');
    for (var c = 0; c < $ulSelectorAll.length; c++) {
      if ($ulSelectorAll[c].getAttribute('data-city-id') === submissionObject.cityName) {
        submissionObject.entryId = 1;
        if (!submissionObject.photoUrlValue) {
          $ulSelectorAll[c].append(newReportEntryNoImg(submissionObject));
        } else {
          $ulSelectorAll[c].append(newReportEntry(submissionObject));
        }
        $ulSelectorAll[c].addEventListener('click', e => {
          const target = e.target;
          if (target.matches('a')) {
            target.addEventListener('click', showDeleteModal);
          }
        });
      }
    }
    data.nextCityCount++;
    data.nextEntryId++;
    data.entries.unshift(submissionObject);
    $noRecordingsText.className = 'no-recorded hide';
    $form.reset();
    switchView('search-bar');
    return;
  }
  for (var i = 0; i < data.cities.length; i++) {
    if (data.cities[i].cityName === submissionObject.cityName) {
      submissionObject.entryId = data.nextEntryId;
      const $ulSelectorAll = document.querySelectorAll('ul');
      for (var d = 0; d < $ulSelectorAll.length; d++) {
        if ($ulSelectorAll[d].getAttribute('data-city-id') === submissionObject.cityName) {
          if (!submissionObject.photoUrlValue) {
            $ulSelectorAll[d].append(newReportEntryNoImg(submissionObject));
          } else {
            $ulSelectorAll[d].append(newReportEntry(submissionObject));
          }
        }
      }
      data.nextEntryId++;
      data.entries.unshift(submissionObject);
      $form.reset();
      switchView('search-bar');
      return;
    }
  }
  data.cities.push({
    cityName: submissionObject.cityName,
    cityCount: data.nextCityCount
  });
  reshuffleDataCities(data.cities);
  submissionObject.entryId = data.nextEntryId;
  if (data.cities.length % 2 === 0) {
    $secondCityUl.append(reportsPageRender());
  } else {
    $firstCityUl.append(reportsPageRender());
  }
  mainElement.appendChild(newMainDataView());
  const $ulSelectorAll = document.querySelectorAll('ul');
  for (var f = 0; f < $ulSelectorAll.length; f++) {
    if ($ulSelectorAll[f].getAttribute('data-city-id') === submissionObject.cityName) {
      if (!submissionObject.photoUrlValue) {
        $ulSelectorAll[f].append(newReportEntryNoImg(submissionObject));
      } else {
        $ulSelectorAll[f].append(newReportEntry(submissionObject));
      }
    }
  }
  data.nextCityCount++;
  data.nextEntryId++;
  data.entries.unshift(submissionObject);
  $form.reset();
  switchView('search-bar');
}

module.exports = submitFunction;
