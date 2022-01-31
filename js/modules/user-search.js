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
  xhr.open('GET', 'https://api.weatherapi.com/v1/current.json?key=182e266b7561494e81d230926211611&q=' + $searchInput.value + '&aqi=no');
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
