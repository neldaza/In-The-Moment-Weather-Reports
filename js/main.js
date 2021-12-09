/* eslint-disable no-unused-vars */
var $searchInput = document.querySelector('.search-input');
var $searchForm = document.querySelector('.search-form');
var $cityResultName = document.querySelector('.city-name');
var $cityResultTime = document.querySelector('.city-time');
var $weatherStatusResult = document.querySelector('.weather-status');
var $fahrenheitResult = document.querySelector('.fahrenheit-td');
var $humidityResult = document.querySelector('.humidity-td');
var $gustResult = document.querySelector('.gust-td');
var $cloudCoverageResult = document.querySelector('.cloud-cover-td');
var $feelsLikeResult = document.querySelector('.feels-like-td');
var $windMphResult = document.querySelector('.wind-mph-td');
var $precipitationResult = document.querySelector('.precipitation-td');
var $visibilityResult = document.querySelector('.visibility-td');
var $form = document.querySelector('.entry-form-submit');
var $formPlaceholderImg = document.querySelector('.placeholder-img');
var $photoUrl = document.querySelector('.photo-url');
var $firstCityUl = document.querySelector('.first-city-ul');
var $secondCityUl = document.querySelector('.second-city-ul');
let XHRDate = '';
var mainElement = document.querySelector('.main');

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
    XHRDate = timeAndDateArray[0];
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

function srcUpdate(event) {
  $formPlaceholderImg.setAttribute('src', $photoUrl.value);

}

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

/// // BOTH DOM TREE FUNCTIONS /////

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

function mainHTMLDOMNewDataViewSubmissionRender() {
  var dataViewDiv = document.createElement('div');
  var containerDiv = document.createElement('div');
  var rowDiv = document.createElement('div');
  var columnFullDiv = document.createElement('div');
  var h1ListHeading = document.createElement('h1');
  var cityNameUl = document.createElement('ul');
  var h1ListHeadingTextContent = document.createTextNode($cityResultName.textContent);

  dataViewDiv.setAttribute('data-view', $cityResultName.textContent);
  dataViewDiv.setAttribute('class', 'view hidden');
  containerDiv.setAttribute('class', 'container');
  rowDiv.setAttribute('class', 'row');
  columnFullDiv.setAttribute('class', 'column-full text-align-center');
  h1ListHeading.setAttribute('class', 'list-heading');
  h1ListHeading.appendChild(h1ListHeadingTextContent);
  cityNameUl.setAttribute('class', $cityResultName.textContent);

  columnFullDiv.append(h1ListHeading, cityNameUl);
  rowDiv.append(columnFullDiv);
  containerDiv.append(rowDiv);
  dataViewDiv.append(containerDiv);

  dataViewDiv.addEventListener('click', handleViewNavigation);

  return dataViewDiv;
}

function mainHTMLDOMNewListSubmissionRender(entry) {

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

  mainRowLi.setAttribute('class', 'row flex-wrap-wrapped');
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

/// /  FOR LOOPS FOR LOADING /////

function reportsPageRenderForLoop(cityName) {
  var li = document.createElement('li');
  var h2 = document.createElement('h2');

  li.setAttribute('data-view', cityName);
  li.setAttribute('class', 'reports-city-name-holder');
  h2.setAttribute('class', 'reports-city-name');
  h2.setAttribute('data-view', cityName);
  var h2TextContent = cityName;

  h2.append(h2TextContent);
  li.append(h2);

  return li;
}

function DOMDataViewForLoop(cityName) {
  var dataViewDiv = document.createElement('div');
  var containerDiv = document.createElement('div');
  var rowDiv = document.createElement('div');
  var columnFullDiv = document.createElement('div');
  var h1ListHeading = document.createElement('h1');
  var cityNameUl = document.createElement('ul');
  var h1ListHeadingTextContent = document.createTextNode(cityName);

  dataViewDiv.setAttribute('data-view', cityName);
  dataViewDiv.setAttribute('class', 'view hidden');
  containerDiv.setAttribute('class', 'container');
  rowDiv.setAttribute('class', 'row');
  columnFullDiv.setAttribute('class', 'column-full text-align-center');
  h1ListHeading.setAttribute('class', 'list-heading');
  h1ListHeading.appendChild(h1ListHeadingTextContent);
  cityNameUl.setAttribute('class', cityName);

  columnFullDiv.append(h1ListHeading, cityNameUl);
  rowDiv.append(columnFullDiv);
  containerDiv.append(rowDiv);
  dataViewDiv.append(containerDiv);

  return dataViewDiv;
}

for (var a = 0; a < data.cities.length; a++) {
  var city = data.cities[a];
  mainElement.append(DOMDataViewForLoop(city));
  if (data.cities.length === 1) {
    $firstCityUl.append(reportsPageRenderForLoop(data.cities[a]));
  } else if (a % 2 === 0) {
    $secondCityUl.append(reportsPageRenderForLoop(data.cities[a]));
  } else {
    $firstCityUl.append(reportsPageRenderForLoop(data.cities[a]));
  }
}

for (var w = 0; w < data.entries.length; w++) {
  const $ulSelectorAll = document.querySelectorAll('ul');
  for (var x = 0; x < $ulSelectorAll.length; x++) {
    if ($ulSelectorAll[x].getAttribute('class') === data.entries[w].cityName) {
      $ulSelectorAll[x].append(mainHTMLDOMNewListSubmissionRender(data.entries[w]));
    }
  }
}

/// /////

$photoUrl.addEventListener('input', srcUpdate);
$form.addEventListener('submit', submitFunction);
$searchForm.addEventListener('submit', userSearch);

/// // VIEW NAVIGATION /////
var $searchNavbar = document.querySelector('.search-anchor');
var $createNewReportButton = document.querySelector('.create-new-report-button');
var $goBackButton = document.querySelector('.go-back-button-event');
var $reportsNavbar = document.querySelector('.reports-anchor');
var $reportsCityNameSelectorAll = document.querySelectorAll('.reports-city-name');

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

function handleViewNavigation(event) {
  $formPlaceholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $searchForm.reset();
  var buttonDataView = event.target.getAttribute('data-view');
  switchView(buttonDataView);
}

for (var b = 0; b < $reportsCityNameSelectorAll.length; b++) {
  $reportsCityNameSelectorAll[b].addEventListener('click', handleViewNavigation);
}

const $deleteModal = document.querySelector('.cancel-background');
function showDeleteModal() {
  $deleteModal.className = 'cancel-background flex justify-content-center position-fixed view';
}

var $deleteReportTextSelectorAll = document.querySelectorAll('.delete-report-text');
for (var n = 0; n < $deleteReportTextSelectorAll.length; n++) {
  $deleteReportTextSelectorAll[n].addEventListener('click', showDeleteModal);
}

$reportsNavbar.addEventListener('click', handleViewNavigation);
$searchNavbar.addEventListener('click', handleViewNavigation);
$createNewReportButton.addEventListener('click', handleViewNavigation);
$goBackButton.addEventListener('click', handleViewNavigation);
