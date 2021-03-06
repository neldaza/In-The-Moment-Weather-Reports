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
