/* eslint-disable no-undef */
function reportsPageRenderForLoop(cityName) {
  var li = document.createElement('li');
  var h2 = document.createElement('h2');
  var a = document.createElement('a');
  var h2TextContent = cityName;

  li.setAttribute('data-view', cityName);
  li.setAttribute('class', 'reports-city-name-holder');
  h2.setAttribute('class', 'reports-city-name');
  h2.setAttribute('data-view', cityName);
  a.setAttribute('data-view', cityName);
  a.setAttribute('class', 'reports-city-name-a');

  h2.append(h2TextContent);
  a.append(h2);
  li.append(a);

  return li;
}

module.exports = reportsPageRenderForLoop;
