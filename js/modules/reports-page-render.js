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
