
// Modules
var srcUpdate = require('./modules/src-update');
var deleteReport = require('./modules/delete-report');
var handleViewNavigation = require('./modules/handle-view-navigation');
var DOMDataViewForLoop = require('./modules/new-data-view-FL');
var reportsPageRenderForLoop = require('./modules/reports-page-render-FL');
var mainHTMLDOMNewListSubmissionRender = require('./modules/new-main-html-list');
var showDeleteModal = require('./modules/show-delete-modal');
var submitFunction = require('./modules/submit-function');
var userSearch = require('./modules/user-search');

// Event Targets
var $searchForm = document.querySelector('.search-form');
var $form = document.querySelector('.entry-form-submit');
var $photoUrl = document.querySelector('.photo-url');
var $firstCityUl = document.querySelector('.first-city-ul');
var $secondCityUl = document.querySelector('.second-city-ul');
var mainElement = document.querySelector('.main');
var $searchNavbar = document.querySelector('.search-anchor');
var $createNewReportButton = document.querySelector('.create-new-report-button');
var $goBackButton = document.querySelector('.go-back-button-event');
var $reportsNavbar = document.querySelector('.reports-anchor');
var $deleteReportYes = document.querySelector('.delete-report-yes');

// Event Listeners
$photoUrl.addEventListener('input', srcUpdate);
$form.addEventListener('submit', submitFunction);
$searchForm.addEventListener('submit', userSearch);
$deleteReportYes.addEventListener('click', deleteReport);
$reportsNavbar.addEventListener('click', handleViewNavigation);
$searchNavbar.addEventListener('click', handleViewNavigation);
$createNewReportButton.addEventListener('click', handleViewNavigation);
$goBackButton.addEventListener('click', handleViewNavigation);
$deleteReportYes.addEventListener('click', deleteReport);
$reportsNavbar.addEventListener('click', handleViewNavigation);
$searchNavbar.addEventListener('click', handleViewNavigation);
$createNewReportButton.addEventListener('click', handleViewNavigation);
$goBackButton.addEventListener('click', handleViewNavigation);

// Loops
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
  var $ulSelectorAll = document.querySelectorAll('ul');
  for (var x = 0; x < $ulSelectorAll.length; x++) {
    if ($ulSelectorAll[x].getAttribute('class') === data.entries[w].cityName) {
      $ulSelectorAll[x].append(mainHTMLDOMNewListSubmissionRender(data.entries[w]));
    }
  }
}

var $reportsCityNameSelectorAll = document.querySelectorAll('.reports-city-name');
for (var b = 0; b < $reportsCityNameSelectorAll.length; b++) {
  $reportsCityNameSelectorAll[b].addEventListener('click', handleViewNavigation);
}

var $deleteReportTextSelectorAll = document.querySelectorAll('.delete-report-text');
for (var n = 0; n < $deleteReportTextSelectorAll.length; n++) {
  $deleteReportTextSelectorAll[n].addEventListener('click', showDeleteModal);
}
