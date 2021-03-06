
var srcUpdate = require('./modules/src-update');
var deleteReport = require('./modules/delete-report');
var handleViewNavigation = require('./modules/handle-view-navigation');
var mainDataViewForLoop = require('./modules/main-data-view-for-loop');
var reportsPageRenderForLoop = require('./modules/reports-page-render-for-loop');
var newReportEntry = require('./modules/new-report-entry-with-img');
var newReportEntryNoImg = require('./modules/new-report-entry-no-img');

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
      if (!data.entries[w].photoUrlValue) {
        $ulSelectorAll[x].prepend(newReportEntryNoImg(data.entries[w]));
      } else {
        $ulSelectorAll[x].prepend(newReportEntry(data.entries[w]));
      }
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
