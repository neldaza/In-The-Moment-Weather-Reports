var $cityResultName = document.querySelector('.city-name');

function newMainDataView() {
  var dataViewDiv = document.createElement('div');
  var containerDiv = document.createElement('div');
  var rowDiv = document.createElement('div');
  var columnFullDiv = document.createElement('div');
  var h1ListHeading = document.createElement('h1');
  var cityNameUl = document.createElement('ul');
  var h1ListHeadingTextContent = document.createTextNode($cityResultName.textContent);

  dataViewDiv.setAttribute('data', 'new-main-data-view');
  dataViewDiv.setAttribute('data-view', $cityResultName.textContent);
  dataViewDiv.setAttribute('class', 'data-view-div view hidden');
  containerDiv.setAttribute('class', 'container');
  rowDiv.setAttribute('class', 'row');
  columnFullDiv.setAttribute('class', 'column-full text-align-center');
  h1ListHeading.setAttribute('class', 'list-heading');
  h1ListHeading.appendChild(h1ListHeadingTextContent);
  cityNameUl.setAttribute('data-city-id', $cityResultName.textContent);
  cityNameUl.setAttribute('class', 'report-ul');

  columnFullDiv.append(h1ListHeading, cityNameUl);
  rowDiv.append(columnFullDiv);
  containerDiv.append(rowDiv);
  dataViewDiv.append(containerDiv);

  return dataViewDiv;
}

module.exports = newMainDataView;
