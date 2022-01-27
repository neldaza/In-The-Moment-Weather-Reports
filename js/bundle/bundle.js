(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

// Modules
var srcUpdate = require('./modules/srcUpdate');
var deleteReport = require('./modules/deleteReport');
var handleViewNavigation = require('./modules/handleViewNavigation');
var mainDataViewForLoop = require('./modules/mainDataViewForLoop');
var reportsPageRenderForLoop = require('./modules/reportsPageRenderForLoop');
var newReportEntry = require('./modules/newReportEntry');
var { userSearch } = require('./modules/userSearch');
var submitFunction = require('./modules/submitFunction');
var { showDeleteModal, hideDeleteModal } = require('./modules/showDeleteModal');

// Event Targets
var $searchForm = document.querySelector('.search-form');
var $form = document.querySelector('.entry-form-submit');
var $photoUrl = document.querySelector('.photo-url');
var mainElement = document.querySelector('.main');
var $searchNavbar = document.querySelector('.search-anchor');
var $createNewReportButton = document.querySelector('.create-new-report-button');
var $goBackButton = document.querySelector('.go-back-button-event');
var $reportsNavbar = document.querySelector('.reports-anchor');
var $deleteReportYes = document.querySelector('.yes-button');
var $noButton = document.querySelector('.no-button');

// Event Listeners
$photoUrl.addEventListener('input', srcUpdate);
$form.addEventListener('submit', submitFunction);
$searchForm.addEventListener('submit', userSearch);
$reportsNavbar.addEventListener('click', handleViewNavigation);
$searchNavbar.addEventListener('click', handleViewNavigation);
$createNewReportButton.addEventListener('click', handleViewNavigation);
$deleteReportYes.addEventListener('click', deleteReport);
$goBackButton.addEventListener('click', handleViewNavigation);
$noButton.addEventListener('click', hideDeleteModal);

// Loops
var $firstCityUl = document.querySelector('.first-city-ul');
var $secondCityUl = document.querySelector('.second-city-ul');

if (data.entries.length === 0) {
  data.cities = [];
}

var $noRecordingsText = document.querySelector('.no-recorded');

if (data.entries.length !== 0) {
  $noRecordingsText.className = 'no-recorded hide';
} else {
  $noRecordingsText.className = 'no-recorded';
}

for (var a = 0; a < data.cities.length; a++) {
  mainElement.append(mainDataViewForLoop(data.cities[a]));
  if (data.cities.length === 1) {
    $firstCityUl.append(reportsPageRenderForLoop(data.cities[a]));
  } else if (a % 2 === 0) {
    $secondCityUl.append(reportsPageRenderForLoop(data.cities[a]));
  } else {
    $firstCityUl.append(reportsPageRenderForLoop(data.cities[a]));
  }
}

for (var w = 0; w < data.entries.length; w++) {
  var $ulSelectorAll = document.querySelectorAll('ul');
  for (var x = 0; x < $ulSelectorAll.length; x++) {
    if ($ulSelectorAll[x].getAttribute('data-city-id') === data.entries[w].cityName) {
      $ulSelectorAll[x].prepend(newReportEntry(data.entries[w]));
      $ulSelectorAll[x].addEventListener('click', e => {
        const target = e.target;
        if (target.matches('a')) {
          showDeleteModal(e);
        }
      });
    }
  }
}

var $reportsCityNameSelectorAll = document.querySelectorAll('.reports-city-name');
for (var b = 0; b < $reportsCityNameSelectorAll.length; b++) {
  $reportsCityNameSelectorAll[b].addEventListener('click', handleViewNavigation);
}

},{"./modules/deleteReport":2,"./modules/handleViewNavigation":3,"./modules/mainDataViewForLoop":4,"./modules/newReportEntry":6,"./modules/reportsPageRenderForLoop":8,"./modules/showDeleteModal":9,"./modules/srcUpdate":10,"./modules/submitFunction":11,"./modules/userSearch":13}],2:[function(require,module,exports){
/* eslint-disable no-undef */
var switchView = require('./switchView');

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

},{"./switchView":12}],3:[function(require,module,exports){
var switchView = require('./switchView');

var $form = document.querySelector('.entry-form-submit');
var $formPlaceholderImg = document.querySelector('.placeholder-img');
var $searchForm = document.querySelector('.search-form');

function handleViewNavigation(event) {
  $formPlaceholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $searchForm.reset();
  var buttonDataView = event.target.getAttribute('data-view');
  switchView(buttonDataView);
}

module.exports = handleViewNavigation;

},{"./switchView":12}],4:[function(require,module,exports){
/* eslint-disable no-undef */

function mainDataViewForLoop(cityName) {
  var dataViewDiv = document.createElement('div');
  var containerDiv = document.createElement('div');
  var rowDiv = document.createElement('div');
  var columnFullDiv = document.createElement('div');
  var h1ListHeading = document.createElement('h1');
  var cityNameUl = document.createElement('ul');
  var h1ListHeadingTextContent = document.createTextNode(cityName);

  dataViewDiv.setAttribute('data-view', cityName);
  dataViewDiv.setAttribute('data-city-id', cityName);
  cityNameUl.setAttribute('class', cityName);
  cityNameUl.setAttribute('data-city-id', cityName);
  dataViewDiv.setAttribute('class', 'view hidden');
  containerDiv.setAttribute('class', 'container');
  rowDiv.setAttribute('class', 'row');
  columnFullDiv.setAttribute('class', 'column-full text-align-center');
  h1ListHeading.setAttribute('class', 'list-heading');
  h1ListHeading.appendChild(h1ListHeadingTextContent);

  columnFullDiv.append(h1ListHeading, cityNameUl);
  rowDiv.append(columnFullDiv);
  containerDiv.append(rowDiv);
  dataViewDiv.append(containerDiv);

  return dataViewDiv;
}

module.exports = mainDataViewForLoop;

},{}],5:[function(require,module,exports){
var { showDeleteModal } = require('./showDeleteModal');

var $cityResultName = document.querySelector('.city-name');

function newMainDataView() {
  var dataViewDiv = document.createElement('div');
  var containerDiv = document.createElement('div');
  var rowDiv = document.createElement('div');
  var columnFullDiv = document.createElement('div');
  var h1ListHeading = document.createElement('h1');
  var cityNameUl = document.createElement('ul');
  var h1ListHeadingTextContent = document.createTextNode($cityResultName.textContent);

  dataViewDiv.setAttribute('data-view', $cityResultName.textContent);
  dataViewDiv.setAttribute('class', 'data-view-div view hidden');
  containerDiv.setAttribute('class', 'container');
  rowDiv.setAttribute('class', 'row');
  columnFullDiv.setAttribute('class', 'column-full text-align-center');
  h1ListHeading.setAttribute('class', 'list-heading');
  h1ListHeading.appendChild(h1ListHeadingTextContent);
  cityNameUl.setAttribute('data-city-id', $cityResultName.textContent);
  cityNameUl.setAttribute('class', 'report-ul');
  cityNameUl.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('a')) {
      showDeleteModal(e);
    }
  });

  columnFullDiv.append(h1ListHeading, cityNameUl);
  rowDiv.append(columnFullDiv);
  containerDiv.append(rowDiv);
  dataViewDiv.append(containerDiv);

  return dataViewDiv;
}

module.exports = newMainDataView;

},{"./showDeleteModal":9}],6:[function(require,module,exports){

function newReportEntry(entry) {

  var mainRowLi = document.createElement('li');
  var firstColumnHalfDiv = document.createElement('div');
  var secondColumnHalfDiv = document.createElement('div');
  var submittedImg = document.createElement('img');
  var timeDateTitleDiv = document.createElement('div');
  var listTitleDiv = document.createElement('div');
  var titleH2 = document.createElement('h2');
  var listTimeDateDiv = document.createElement('div');
  var dateH3 = document.createElement('h3');
  var timeH3 = document.createElement('h3');
  var descriptionRowDiv = document.createElement('div');
  var listDescriptionP = document.createElement('p');
  var wasWeatherRowDiv = document.createElement('div');
  var wasWeatherDiv = document.createElement('div');
  var wasWeatherH4 = document.createElement('h4');
  var wasWeatherPDiv = document.createElement('div');
  var wasWeatherP = document.createElement('p');
  var titleH2TextContent = document.createTextNode(entry.photoTitleValue);
  var dateH3TextContent = document.createTextNode(entry.date);
  var timeh3TextContent = document.createTextNode(entry.time);
  var listDescriptionPTextContent = document.createTextNode(entry.commentsValue);
  var wasWeatherH4TextContent = document.createTextNode('Was the official weather report accurate for this day?');
  var wasWeatherPTextContent = document.createTextNode(entry.radioChecked);
  var deleteReportRowDiv = document.createElement('div');
  var firstColumnHalfDeleteRow = document.createElement('div');
  var secondColumnHalfDeleteRow = document.createElement('div');
  var deleteRowTextA = document.createElement('a');
  var deleteRowTextContent = document.createTextNode('Delete This Report');

  mainRowLi.setAttribute('class', 'entry-li row flex-wrap-wrapped');
  mainRowLi.setAttribute('data-entry-id', entry.entryId);
  mainRowLi.setAttribute('data-city-id', entry.cityName);
  firstColumnHalfDiv.setAttribute('class', 'column-half');
  secondColumnHalfDiv.setAttribute('class', 'column-half');
  submittedImg.setAttribute('src', entry.photoUrlValue);
  submittedImg.setAttribute('alt', 'user-submitted-img');
  submittedImg.setAttribute('class', 'list-img');
  timeDateTitleDiv.setAttribute('class', 'list-time-date-and-title row align-items-center');
  listTitleDiv.setAttribute('class', 'list-title column-75');
  titleH2.setAttribute('class', 'margin-block-unset');
  titleH2.appendChild(titleH2TextContent);
  listTimeDateDiv.setAttribute('class', 'list-time-and-date column-25');
  dateH3.setAttribute('class', 'margin-block-unset');
  dateH3.appendChild(dateH3TextContent);
  timeH3.setAttribute('class', 'margin-block-unset');
  timeH3.appendChild(timeh3TextContent);
  descriptionRowDiv.setAttribute('class', 'row');
  listDescriptionP.setAttribute('class', 'list-description column-full margin-block-unset');
  listDescriptionP.appendChild(listDescriptionPTextContent);
  wasWeatherRowDiv.setAttribute('class', 'was-weather row');
  wasWeatherDiv.setAttribute('class', 'column-75 flex align-items-center');
  wasWeatherH4.setAttribute('class', 'was-weather-h4');
  wasWeatherH4.appendChild(wasWeatherH4TextContent);
  wasWeatherPDiv.setAttribute('class', 'column-25 flex align-items-center justify-content-center');
  wasWeatherP.setAttribute('class', 'was-weather-p');
  wasWeatherP.appendChild(wasWeatherPTextContent);
  deleteReportRowDiv.setAttribute('class', 'delete-report row border-bottom-white width-100p');
  firstColumnHalfDeleteRow.setAttribute('class', 'column-half');
  secondColumnHalfDeleteRow.setAttribute('class', 'column-half text-align-right');
  deleteRowTextA.setAttribute('class', 'delete-report-text margin-block-unset');
  deleteRowTextA.appendChild(deleteRowTextContent);
  firstColumnHalfDiv.append(submittedImg);

  listTitleDiv.append(titleH2);
  listTimeDateDiv.append(timeH3, dateH3);
  timeDateTitleDiv.append(listTitleDiv, listTimeDateDiv);

  descriptionRowDiv.append(listDescriptionP);

  wasWeatherDiv.append(wasWeatherH4);
  wasWeatherPDiv.append(wasWeatherP);
  wasWeatherRowDiv.append(wasWeatherDiv, wasWeatherPDiv);

  secondColumnHalfDeleteRow.append(deleteRowTextA);
  deleteReportRowDiv.append(firstColumnHalfDeleteRow, secondColumnHalfDeleteRow);

  secondColumnHalfDiv.append(timeDateTitleDiv, descriptionRowDiv, wasWeatherRowDiv, deleteReportRowDiv);

  mainRowLi.append(firstColumnHalfDiv, secondColumnHalfDiv);

  return mainRowLi;
}

module.exports = newReportEntry;

},{}],7:[function(require,module,exports){
var handleViewNavigation = require('./handleViewNavigation');
var $cityResultName = document.querySelector('.city-name');

function reportsPageRender() {
  var li = document.createElement('li');
  var h2 = document.createElement('h2');
  var h2TextContent = document.createTextNode($cityResultName.textContent);

  li.setAttribute('data-view', $cityResultName.textContent);
  li.setAttribute('class', 'reports-city-name-holder');
  h2.setAttribute('class', 'reports-city-name');
  h2.setAttribute('data-view', $cityResultName.textContent);
  h2.appendChild(h2TextContent);
  li.append(h2);

  li.addEventListener('click', handleViewNavigation);
  h2.addEventListener('click', handleViewNavigation);

  return li;
}

module.exports = reportsPageRender;

},{"./handleViewNavigation":3}],8:[function(require,module,exports){
/* eslint-disable no-undef */
function reportsPageRenderForLoop(cityName) {
  var li = document.createElement('li');
  var h2 = document.createElement('h2');
  var h2TextContent = cityName;

  li.setAttribute('data-view', cityName);
  li.setAttribute('class', 'reports-city-name-holder');
  h2.setAttribute('class', 'reports-city-name');
  h2.setAttribute('data-view', cityName);

  h2.append(h2TextContent);
  li.append(h2);

  return li;
}

module.exports = reportsPageRenderForLoop;

},{}],9:[function(require,module,exports){
/* eslint-disable no-undef */
const $deleteModal = document.querySelector('.whole-delete-modal');

function showDeleteModal(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === parseInt(event.target.closest('li').getAttribute('data-entry-id'))) {
      data.editing = data.entries[i];
      $deleteModal.className = 'whole-delete-modal view';
      return;
    }
  }
}

function hideDeleteModal(event) {
  $deleteModal.className = 'whole-delete-modal view hidden';
}

module.exports = { showDeleteModal, hideDeleteModal };

},{}],10:[function(require,module,exports){
var $formPlaceholderImg = document.querySelector('.placeholder-img');
var $photoUrl = document.querySelector('.photo-url');

function srcUpdate(event) {
  $formPlaceholderImg.setAttribute('src', $photoUrl.value);

}

module.exports = srcUpdate;

},{}],11:[function(require,module,exports){
/* eslint-disable no-undef */

var reportsPageRender = require('./reportsPageRender');
var newReportEntry = require('./newReportEntry');
var newMainDataView = require('./newMainDataView');
var switchView = require('./switchView');
var { showDeleteModal } = require('./showDeleteModal');

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
    data.cities.unshift(submissionObject.cityName);
    $firstCityUl.appendChild(reportsPageRender());
    mainElement.appendChild(newMainDataView());
    const $ulSelectorAll = document.querySelectorAll('ul');
    for (var c = 0; c < $ulSelectorAll.length; c++) {
      if ($ulSelectorAll[c].getAttribute('data-city-id') === submissionObject.cityName) {
        submissionObject.entryId = 1;
        $ulSelectorAll[c].append(newReportEntry(submissionObject));
        $ulSelectorAll[c].addEventListener('click', e => {
          const target = e.target;
          if (target.matches('a')) {
            target.addEventListener('click', showDeleteModal);
          }
        });
      }
    }
    data.nextEntryId++;
    data.entries.unshift(submissionObject);
    $noRecordingsText.className = 'no-recorded hide';
    $form.reset();
    switchView('search-bar');
    return;
  }
  for (var i = 0; i < data.cities.length; i++) {
    if (data.cities[i] === submissionObject.cityName) {
      submissionObject.entryId = data.nextEntryId;
      const $ulSelectorAll = document.querySelectorAll('ul');
      for (var d = 0; d < $ulSelectorAll.length; d++) {
        if ($ulSelectorAll[d].getAttribute('data-city-id') === submissionObject.cityName) {
          $ulSelectorAll[d].append(newReportEntry(submissionObject));
        }
      }
      data.nextEntryId++;
      data.entries.unshift(submissionObject);
      $form.reset();
      switchView('search-bar');
      return;
    }
  }
  data.cities.unshift(submissionObject.cityName);
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
      $ulSelectorAll[f].append(newReportEntry(submissionObject));
    }
  }
  data.nextEntryId++;
  data.entries.unshift(submissionObject);
  $form.reset();
  switchView('search-bar');
}

module.exports = submitFunction;

},{"./newMainDataView":5,"./newReportEntry":6,"./reportsPageRender":7,"./showDeleteModal":9,"./switchView":12}],12:[function(require,module,exports){
function switchView(viewName) {
  var $viewSelectorAll = document.querySelectorAll('.view');
  for (var i = 0; i < $viewSelectorAll.length; i++) {
    if ($viewSelectorAll[i].getAttribute('data-view') === viewName) {
      $viewSelectorAll[i].className = 'view';
    } else {
      $viewSelectorAll[i].className = 'view hidden';
    }
  }
}
module.exports = switchView;

},{}],13:[function(require,module,exports){
/* eslint-disable no-undef */
var switchView = require('./switchView');

var $cityResultName = document.querySelector('.city-name');
var $cityResultTime = document.querySelector('.city-time');
var $weatherStatusResult = document.querySelector('.weather-status');
var $fahrenheitResult = document.querySelector('.fahrenheit-td');
var $humidityResult = document.querySelector('.humidity-td');
var $gustResult = document.querySelector('.gust-td');
var $cloudCoverageResult = document.querySelector('.cloud-cover-td');
var $feelsLikeResult = document.querySelector('.feels-like-td');
var $visibilityResult = document.querySelector('.visibility-td');
var $windMphResult = document.querySelector('.wind-mph-td');
var $precipitationResult = document.querySelector('.precipitation-td');
var $searchForm = document.querySelector('.search-form');
var $searchInput = document.querySelector('.search-input');

function userSearch(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.weatherapi.com/v1/current.json?key=182e266b7561494e81d230926211611&q=' + $searchInput.value + '&aqi=no');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var XHRLocalTime = xhr.response.location.localtime;
    var timeAndDateString = '';
    timeAndDateString += '' + XHRLocalTime + '';
    var timeAndDateArray = [];
    var currentTimeOrDate = '';

    for (var a = 0; a < timeAndDateString.length; a++) {
      if (timeAndDateString[a] === ' ') {
        timeAndDateArray.push(currentTimeOrDate);
        currentTimeOrDate = '';
      } else {
        currentTimeOrDate += timeAndDateString[a];
      }

    }
    timeAndDateArray.push(currentTimeOrDate);

    var weatherStatus = Object.values(xhr.response.current.condition)[0];

    $cityResultName.textContent = xhr.response.location.name + ', ' + xhr.response.location.region;
    $cityResultTime.textContent = timeAndDateArray[1] + ' UTC';
    data.date = timeAndDateArray[0];
    $weatherStatusResult.textContent = weatherStatus;
    $fahrenheitResult.textContent = xhr.response.current.temp_f + '\xB0' + ' ' + 'Fahrenheit';
    $feelsLikeResult.textContent = 'Feels like ' + xhr.response.current.feelslike_f + '\xB0' + ' Fahreinheit';
    $gustResult.textContent = xhr.response.current.gust_mph + 'mph' + ' Gust';
    $cloudCoverageResult.textContent = xhr.response.current.cloud + '%' + ' Cloud Coverage';
    $visibilityResult.textContent = xhr.response.current.vis_miles + ' Miles Visibility';
    $windMphResult.textContent = xhr.response.current.wind_mph + 'mph' + ' Wind';
    $precipitationResult.textContent = xhr.response.current.precip_in + 'in' + ' Precipitation';
    $humidityResult.textContent = xhr.response.current.humidity + '%' + ' Humidity';

  });
  xhr.send();
  $searchForm.reset();
  switchView('search-bar-result');
}

module.exports = { userSearch };

},{"./switchView":12}]},{},[1]);
