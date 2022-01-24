/* eslint-disable no-undef */
function reportsPageRenderForLoop(cityName) {
  var li = document.createElement('li');
  var h2 = document.createElement('h2');
  var h2TextContent = cityName;

  li.setAttribute('data-view', cityName);
  li.setAttribute('class', 'reports-city-name-holder');
  h2.setAttribute('class', 'reports-city-name');
  h2.setAttribute('data-view', cityName);

  h2.append(h2TextContent);
  li.append(h2);

  return li;
}

module.exports = reportsPageRenderForLoop;
