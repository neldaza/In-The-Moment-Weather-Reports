var switchView = require('./switchView');

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
