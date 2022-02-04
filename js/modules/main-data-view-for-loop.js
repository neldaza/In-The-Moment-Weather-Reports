/* eslint-disable no-undef */

function mainDataViewForLoop(city) {
  var dataViewDiv = document.createElement('div');
  var containerDiv = document.createElement('div');
  var rowDiv = document.createElement('div');
  var columnFullDiv = document.createElement('div');
  var h1ListHeading = document.createElement('h1');
  var cityNameUl = document.createElement('ul');
  var h1ListHeadingTextContent = city.cityName;

  dataViewDiv.setAttribute('data-view', city.cityName);
  dataViewDiv.setAttribute('data-city-id', city.cityName);
  cityNameUl.setAttribute('class', city.cityName);
  cityNameUl.setAttribute('data-city-id', city.cityName);
  dataViewDiv.setAttribute('class', 'view hidden');
  containerDiv.setAttribute('class', 'container');
  rowDiv.setAttribute('class', 'row');
  columnFullDiv.setAttribute('class', 'column-full text-align-center');
  h1ListHeading.setAttribute('class', 'list-heading');
  h1ListHeading.append(h1ListHeadingTextContent);

  columnFullDiv.append(h1ListHeading, cityNameUl);
  rowDiv.append(columnFullDiv);
  containerDiv.append(rowDiv);
  dataViewDiv.append(containerDiv);

  return dataViewDiv;
}

module.exports = mainDataViewForLoop;
