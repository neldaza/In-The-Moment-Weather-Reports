/* eslint-disable no-undef */

var reportsPageRender = require('./reportsPageRender');
var mainHTMLDOMNewListSubmissionRender = require('./mainHTMLDOMNewListSubmissionRender');
var mainHTMLDOMNewDataViewSubmissionRender = require('./mainHTMLDOMNewDataViewSubmissionRender');
var switchView = require('./switchView');

var $cityResultName = document.querySelector('.city-name');
var $form = document.querySelector('.entry-form-submit');
var $cityResultTime = document.querySelector('.city-time');
const XHRDate = '';
var $firstCityUl = document.querySelector('.first-city-ul');
var mainElement = document.querySelector('.main');
var $secondCityUl = document.querySelector('.second-city-ul');

function submitFunction(event) {
  event.preventDefault();
  var cityName = $cityResultName.textContent;
  var photoTitleValue = $form.elements.photoTitle.value;
  var commentsValue = $form.elements.comments.value;
  var photoUrlValue = $form.elements.photoUrl.value;
  var radioChecked = $form.elements.choice.value;
  var time = $cityResultTime.textContent;
  var date = XHRDate;
  var submissionObject = { cityName, photoTitleValue, photoUrlValue, commentsValue, radioChecked, time, date };

  if (data.entries.length === 0) {
    data.cities.push(submissionObject.cityName);
    $firstCityUl.appendChild(reportsPageRender());
    mainElement.appendChild(mainHTMLDOMNewDataViewSubmissionRender());
    const $ulSelectorAll = document.querySelectorAll('ul');
    for (var c = 0; c < $ulSelectorAll.length; c++) {
      if ($ulSelectorAll[c].getAttribute('class') === submissionObject.cityName) {
        $ulSelectorAll[c].append(mainHTMLDOMNewListSubmissionRender(submissionObject));
      }
    }
    submissionObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(submissionObject);
    $form.reset();
    switchView('search-bar');
    return;
  }
  for (var i = 0; i < data.cities.length; i++) {
    if (data.cities[i] === submissionObject.cityName) {
      submissionObject.entryId = data.nextEntryId;
      const $ulSelectorAll = document.querySelectorAll('ul');
      for (var d = 0; d < $ulSelectorAll.length; d++) {
        if ($ulSelectorAll[d].getAttribute('class') === submissionObject.cityName) {
          $ulSelectorAll[d].append(mainHTMLDOMNewListSubmissionRender(submissionObject));
        }
      }
      data.nextEntryId++;
      data.entries.unshift(submissionObject);
      $form.reset();
      switchView('search-bar');
      return;
    }
  }
  data.cities.push(submissionObject.cityName);
  submissionObject.entryId = data.nextEntryId;
  if (data.cities.length % 2 === 0) {
    $secondCityUl.append(reportsPageRender());
  } else {
    $firstCityUl.append(reportsPageRender());
  }
  mainElement.appendChild(mainHTMLDOMNewDataViewSubmissionRender());
  const $ulSelectorAll = document.querySelectorAll('ul');
  for (var f = 0; f < $ulSelectorAll.length; f++) {
    if ($ulSelectorAll[f].getAttribute('class') === submissionObject.cityName) {
      $ulSelectorAll[f].append(mainHTMLDOMNewListSubmissionRender(submissionObject));
    }
  }
  data.nextEntryId++;
  data.entries.unshift(submissionObject);
  $form.reset();
  switchView('search-bar');
}

module.exports = submitFunction;
