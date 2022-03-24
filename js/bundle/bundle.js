(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

var srcUpdate = require('./modules/src-update');
var deleteReport = require('./modules/delete-report');
var handleViewNavigation = require('./modules/handle-view-navigation');
var mainDataViewForLoop = require('./modules/main-data-view-for-loop');
var reportsPageRenderForLoop = require('./modules/reports-page-render-for-loop');
var newReportEntry = require('./modules/new-report-entry');
var { userSearch } = require('./modules/user-search');
var submitFunction = require('./modules/submit-function');
var { showDeleteModal, hideDeleteModal } = require('./modules/show-delete-modal');
var invalidTextHide = require('./modules/invalid-text-hide');
var { reshuffleDataCities } = require('./modules/reshuffle-data-cities');
var { showImageInput, hideImageInput } = require('./modules/toggle-image-input');

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
var $headerH2 = document.querySelector('.header-h2-a');
var $firstCityUl = document.querySelector('.first-city-ul');
var $secondCityUl = document.querySelector('.second-city-ul');
var $searchBar = document.querySelector('.search-input');
var $yesImageUrlRadio = document.querySelector('.yes-url-radio');
var $noImageUrlRadio = document.querySelector('.no-url-radio');

$photoUrl.addEventListener('input', srcUpdate);
$form.addEventListener('submit', submitFunction);
$searchForm.addEventListener('submit', userSearch);
$reportsNavbar.addEventListener('click', handleViewNavigation);
$searchNavbar.addEventListener('click', handleViewNavigation);
$createNewReportButton.addEventListener('click', handleViewNavigation);
$deleteReportYes.addEventListener('click', deleteReport);
$goBackButton.addEventListener('click', handleViewNavigation);
$noButton.addEventListener('click', hideDeleteModal);
$headerH2.addEventListener('click', handleViewNavigation);
$yesImageUrlRadio.addEventListener('click', showImageInput);
$noImageUrlRadio.addEventListener('click', hideImageInput);
$searchBar.onkeydown = invalidTextHide;

if (data.entries.length === 0) {
  data.cities = [];
}

var $noRecordingsText = document.querySelector('.no-recorded');

if (data.entries.length !== 0) {
  $noRecordingsText.className = 'no-recorded hide';
} else {
  $noRecordingsText.className = 'no-recorded';
}

reshuffleDataCities(data.cities);
for (var a = 0; a < data.cities.length; a++) {
  mainElement.append(mainDataViewForLoop(data.cities[a]));
  if (data.cities[a].cityCount === 1) {
    $firstCityUl.prepend(reportsPageRenderForLoop(data.cities[a]));
  } else if (data.cities[a].cityCount % 2 === 0) {
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

var $liSelectorAll = document.querySelectorAll('li');
for (var b = 0; b < $liSelectorAll.length; b++) {
  $liSelectorAll[b].addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.reports-city-name-a')) {
      handleViewNavigation(e);
    } else if (target.matches('h2')) {
      handleViewNavigation(e);
    }
  });
}

},{"./modules/delete-report":2,"./modules/handle-view-navigation":3,"./modules/invalid-text-hide":4,"./modules/main-data-view-for-loop":5,"./modules/new-report-entry":7,"./modules/reports-page-render-for-loop":8,"./modules/reshuffle-data-cities":10,"./modules/show-delete-modal":11,"./modules/src-update":12,"./modules/submit-function":13,"./modules/toggle-image-input":15,"./modules/user-search":16}],2:[function(require,module,exports){
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

},{"./reports-page-render-for-loop":8,"./reshuffle-data-cities":10,"./switch-view":14}],3:[function(require,module,exports){
var switchView = require('./switch-view');

var $form = document.querySelector('.entry-form-submit');
var $formPlaceholderImg = document.querySelector('.placeholder-img');
var $searchForm = document.querySelector('.search-form');
var $invalidCity = document.querySelector('.invalid-city');

function handleViewNavigation(event) {
  $formPlaceholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $invalidCity.className = 'invalid-city hide';
  $form.reset();
  $searchForm.reset();
  var buttonDataView = event.target.getAttribute('data-view');
  switchView(buttonDataView);
}

module.exports = handleViewNavigation;

},{"./switch-view":14}],4:[function(require,module,exports){
var $invalidCity = document.querySelector('.invalid-city');
var $invalidNetwork = document.querySelector('.invalid-network');

function invalidTextHide(event) {
  if ($invalidCity.className === 'invalid-city red-text show') {
    $invalidCity.className = 'invalid-city hide';
  } else if ($invalidNetwork.className === 'invalid-network red-text show') {
    $invalidNetwork.className = 'invalid-network hide';
  }
}

module.exports = invalidTextHide;

},{}],5:[function(require,module,exports){
/* eslint-disable no-undef */

function mainDataViewForLoop(city) {
  var dataViewDiv = document.createElement('div');
  var containerDiv = document.createElement('div');
  var rowDiv = document.createElement('div');
  var columnFullDiv = document.createElement('div');
  var h1ListHeading = document.createElement('h1');
  var cityNameUl = document.createElement('ul');
  var h1ListHeadingTextContent = city.cityName;

  dataViewDiv.setAttribute('data-view', city.cityName);
  dataViewDiv.setAttribute('data-city-id', city.cityName);
  cityNameUl.setAttribute('class', city.cityName);
  cityNameUl.setAttribute('data-city-id', city.cityName);
  dataViewDiv.setAttribute('class', 'view hidden');
  containerDiv.setAttribute('class', 'container');
  rowDiv.setAttribute('class', 'row');
  columnFullDiv.setAttribute('class', 'column-full text-align-center');
  h1ListHeading.setAttribute('class', 'list-heading');
  h1ListHeading.append(h1ListHeadingTextContent);

  columnFullDiv.append(h1ListHeading, cityNameUl);
  rowDiv.append(columnFullDiv);
  containerDiv.append(rowDiv);
  dataViewDiv.append(containerDiv);

  return dataViewDiv;
}

module.exports = mainDataViewForLoop;

},{}],6:[function(require,module,exports){
var $cityResultName = document.querySelector('.city-name');

function newMainDataView() {
  var dataViewDiv = document.createElement('div');
  var containerDiv = document.createElement('div');
  var rowDiv = document.createElement('div');
  var columnFullDiv = document.createElement('div');
  var h1ListHeading = document.createElement('h1');
  var cityNameUl = document.createElement('ul');
  var h1ListHeadingTextContent = document.createTextNode($cityResultName.textContent);

  dataViewDiv.setAttribute('data', 'new-main-data-view');
  dataViewDiv.setAttribute('data-view', $cityResultName.textContent);
  dataViewDiv.setAttribute('class', 'data-view-div view hidden');
  containerDiv.setAttribute('class', 'container');
  rowDiv.setAttribute('class', 'row');
  columnFullDiv.setAttribute('class', 'column-full text-align-center');
  h1ListHeading.setAttribute('class', 'list-heading');
  h1ListHeading.appendChild(h1ListHeadingTextContent);
  cityNameUl.setAttribute('data-city-id', $cityResultName.textContent);
  cityNameUl.setAttribute('class', 'report-ul');

  columnFullDiv.append(h1ListHeading, cityNameUl);
  rowDiv.append(columnFullDiv);
  containerDiv.append(rowDiv);
  dataViewDiv.append(containerDiv);

  return dataViewDiv;
}

module.exports = newMainDataView;

},{}],7:[function(require,module,exports){
var { showDeleteModal } = require('./show-delete-modal');

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
  listDescriptionP.setAttribute('class', 'list-description column-full margin-block-unset overflow');
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
  mainRowLi.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.delete-report-text')) {
      showDeleteModal(e);
    }
  });

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

},{"./show-delete-modal":11}],8:[function(require,module,exports){
/* eslint-disable no-undef */
var handleViewNavigation = require('./handle-view-navigation');

function reportsPageRenderForLoop(city) {
  var li = document.createElement('li');
  var h2 = document.createElement('h2');
  var a = document.createElement('a');
  var h2TextContent = city.cityName;

  li.setAttribute('data-view', city.cityName);
  li.setAttribute('class', 'reports-city-name-holder');
  li.setAttribute('data-city-count', city.cityCount);
  h2.setAttribute('class', 'reports-city-name');
  h2.setAttribute('data-view', city.cityName);
  a.setAttribute('data-view', city.cityName);
  a.setAttribute('class', 'reports-city-name-a');

  h2.append(h2TextContent);
  a.append(h2);
  li.append(a);

  li.addEventListener('click', handleViewNavigation);
  a.addEventListener('click', handleViewNavigation);
  h2.addEventListener('click', handleViewNavigation);

  return li;
}

module.exports = reportsPageRenderForLoop;

},{"./handle-view-navigation":3}],9:[function(require,module,exports){
/* eslint-disable no-undef */
var handleViewNavigation = require('./handle-view-navigation');

var $cityResultName = document.querySelector('.city-name');

function reportsPageRender() {
  var li = document.createElement('li');
  var h2 = document.createElement('h2');
  var a = document.createElement('a');
  var h2TextContent = document.createTextNode($cityResultName.textContent);

  li.setAttribute('data-view', $cityResultName.textContent);
  li.setAttribute('class', 'reports-city-name-holder');
  if (data.entries === 0) {
    li.setAttribute('data-city-count', 1);
  } else {
    li.setAttribute('data-city-count', data.nextCityCount);
  }
  h2.setAttribute('class', 'reports-city-name');
  h2.setAttribute('data-view', $cityResultName.textContent);
  a.setAttribute('data-view', $cityResultName.textContent);
  a.setAttribute('class', 'reports-city-name-a');

  h2.appendChild(h2TextContent);
  a.append(h2);
  li.append(a);

  li.addEventListener('click', handleViewNavigation);
  a.addEventListener('click', handleViewNavigation);
  h2.addEventListener('click', handleViewNavigation);

  return li;
}

module.exports = reportsPageRender;

},{"./handle-view-navigation":3}],10:[function(require,module,exports){
/* eslint-disable no-undef */

function reshuffleDataCities(citiesArray) {
  let count = 1;
  for (var i = 0; i < citiesArray.length; i++) {
    citiesArray[i].cityCount = count;
    count++;
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

module.exports = { reshuffleDataCities, removeAllChildNodes };

},{}],11:[function(require,module,exports){
/* eslint-disable no-undef */
const $deleteModal = document.querySelector('.whole-delete-modal');

function showDeleteModal(event) {
  $deleteModal.className = 'whole-delete-modal view';
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === parseInt(event.target.closest('li').getAttribute('data-entry-id'))) {
      data.editing = data.entries[i];
    }
  }
}

function hideDeleteModal(event) {
  $deleteModal.className = 'whole-delete-modal view hidden';
}

module.exports = { showDeleteModal, hideDeleteModal };

},{}],12:[function(require,module,exports){
var $formPlaceholderImg = document.querySelector('.placeholder-img');
var $photoUrl = document.querySelector('.photo-url');

function srcUpdate(event) {
  $formPlaceholderImg.setAttribute('src', $photoUrl.value);

}

module.exports = srcUpdate;

},{}],13:[function(require,module,exports){
/* eslint-disable no-undef */

var reportsPageRender = require('./reports-page-render');
var newReportEntry = require('./new-report-entry');
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
        $ulSelectorAll[c].append(newReportEntry(submissionObject));
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
      $ulSelectorAll[f].append(newReportEntry(submissionObject));
    }
  }
  data.nextCityCount++;
  data.nextEntryId++;
  data.entries.unshift(submissionObject);
  $form.reset();
  switchView('search-bar');
}

module.exports = submitFunction;

},{"./new-main-data-view":6,"./new-report-entry":7,"./reports-page-render":9,"./reshuffle-data-cities":10,"./show-delete-modal":11,"./switch-view":14}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
var $imageInput = document.querySelector('.image-url-holder');
var $placeholderImage = document.querySelector('.placeholder-img');

function showImageInput(event) {
  if ($imageInput.className === 'image-url-holder width-80p margin-auto hidden' &&
    $placeholderImage.className === 'placeholder-img hidden') {
    $imageInput.className = 'image-url-holder width-80p margin-auto view';
    $placeholderImage.className = 'placeholder-img view';
  }
}

function hideImageInput(event) {
  if ($imageInput.className === 'image-url-holder width-80p margin-auto view' &&
    $placeholderImage.className === 'placeholder-img view') {
    $imageInput.className = 'image-url-holder width-80p margin-auto hidden';
    $placeholderImage.className = 'placeholder-img hidden';
  }
}

module.exports = { showImageInput, hideImageInput };

},{}],16:[function(require,module,exports){
/* eslint-disable no-undef */
var switchView = require('./switch-view');

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
var $loadingSpinner = document.querySelector('.lds-spinner');
var $invalidText = document.querySelector('.invalid-city');
var $invalidNetwork = document.querySelector('.invalid-network');

function userSearch(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.weatherapi.com/v1/current.json?key=3b2c49a9fe25484891c190823223101&q=' + $searchInput.value + '&aqi=no');
  xhr.onerror = function () {
    $searchForm.className = 'search-form position position-relative flex show';
    $loadingSpinner.className = 'lds-spinner hide';
    $invalidNetwork.className = 'invalid-network red-text show';
  };
  xhr.onprogress = function () {
    $searchForm.className = 'search-form position position-relative flex hide';
    $loadingSpinner.className = 'lds-spinner show';
    if (xhr.status === 400) {
      $searchForm.className = 'search-form position position-relative flex show';
      $loadingSpinner.className = 'lds-spinner hide';
      $invalidText.className = 'invalid-city red-text show';
    } else if (xhr.status === 200) {
      $loadingSpinner.className = 'lds-spinner hide';
      $searchForm.className = 'search-form position position-relative flex show';
    }
  };
  xhr.responseType = 'json';
  xhr.onload = function () {
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

    $loadingSpinner.className = 'lds-spinner hide';
    $searchForm.className = 'search-form position position-relative flex show';
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
    $searchForm.reset();
    switchView('search-bar-result');
  };
  xhr.send();
}

module.exports = { userSearch };

},{"./switch-view":14}]},{},[1]);
