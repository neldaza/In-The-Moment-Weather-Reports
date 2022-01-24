/* eslint-disable no-undef */
function reportsPageRenderForLoop(cityName) {
  var li = document.createElement('li');
  var h2 = document.createElement('h2');
  var h2TextContent = cityName;

  for (var i = 0; i < data.cities.length; i++) {
    li.setAttribute('data-view', data.cities[i]);
    h2.setAttribute('data-view', data.cities[i]);
  }
  li.setAttribute('class', 'reports-city-name-holder');
  h2.setAttribute('class', 'reports-city-name');

  h2.append(h2TextContent);
  li.append(h2);

  return li;
}

module.exports = reportsPageRenderForLoop;
