/* eslint-disable no-unused-vars */
var $searchInput = document.querySelector('.search-input');
var $searchForm = document.querySelector('.search-form');
var $viewSelectorAll = document.querySelectorAll('.view');

function userSearch(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.weatherapi.com/v1/current.json?key=182e266b7561494e81d230926211611&q=' + $searchInput.value + '&aqi=no');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
  });
  xhr.send();
  $searchForm.reset();
  switchView('search-bar-result');
}

$searchForm.addEventListener('submit', userSearch);

/// // VIEW NAVIGATION /////

function switchView(viewName) {

  for (var i = 0; i < $viewSelectorAll.length; i++) {
    if ($viewSelectorAll[i].getAttribute('data-view') === viewName) {
      $viewSelectorAll[i].className = 'view';
    } else {
      $viewSelectorAll[i].className = 'view hidden';
    }
  }
}

function handleViewNavigation(event) {
  $searchForm.reset();
  var buttonDataView = event.target.getAttribute('data-view');
  switchView(buttonDataView);
}
