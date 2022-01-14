var handleViewNavigation = require('./handleViewNavigation');

function mainHTMLDOMNewListSubmissionRender(entry) {

  var mainRowLi = document.createElement('li');
  var firstColumnHalfDiv = document.createElement('div');
  var secondColumnHalfDiv = document.createElement('div');
  var submittedImg = document.createElement('img');
  var timeDateTitleDiv = document.createElement('div');
  var listTitleDiv = document.createElement('div');
  var titleH2 = document.createElement('h2');
  var listTimeDateDiv = document.createElement('div');
  var dateH3 = document.createElement('h3');
  var timeH3 = document.createElement('h3');
  var descriptionRowDiv = document.createElement('div');
  var listDescriptionP = document.createElement('p');
  var wasWeatherRowDiv = document.createElement('div');
  var wasWeatherDiv = document.createElement('div');
  var wasWeatherH4 = document.createElement('h4');
  var wasWeatherPDiv = document.createElement('div');
  var wasWeatherP = document.createElement('p');
  var titleH2TextContent = document.createTextNode(entry.photoTitleValue);
  var dateH3TextContent = document.createTextNode(entry.date);
  var timeh3TextContent = document.createTextNode(entry.time);
  var listDescriptionPTextContent = document.createTextNode(entry.commentsValue);
  var wasWeatherH4TextContent = document.createTextNode('Was the official weather report accurate for this day?');
  var wasWeatherPTextContent = document.createTextNode(entry.radioChecked);
  var deleteReportRowDiv = document.createElement('div');
  var firstColumnHalfDeleteRow = document.createElement('div');
  var secondColumnHalfDeleteRow = document.createElement('div');
  var deleteRowTextA = document.createElement('a');
  var deleteRowTextContent = document.createTextNode('Delete This Report');

  mainRowLi.setAttribute('class', 'row flex-wrap-wrapped');
  mainRowLi.setAttribute('data-entry-id', entry.entryId);
  mainRowLi.setAttribute('city-id', entry.cityName);
  firstColumnHalfDiv.setAttribute('class', 'column-half');
  secondColumnHalfDiv.setAttribute('class', 'column-half');
  submittedImg.setAttribute('src', entry.photoUrlValue);
  submittedImg.setAttribute('alt', 'user-submitted-img');
  submittedImg.setAttribute('class', 'list-img');
  timeDateTitleDiv.setAttribute('class', 'list-time-date-and-title row align-items-center');
  listTitleDiv.setAttribute('class', 'list-title column-75');
  titleH2.setAttribute('class', 'margin-block-unset');
  titleH2.appendChild(titleH2TextContent);
  listTimeDateDiv.setAttribute('class', 'list-time-and-date column-25');
  dateH3.setAttribute('class', 'margin-block-unset');
  dateH3.appendChild(dateH3TextContent);
  timeH3.setAttribute('class', 'margin-block-unset');
  timeH3.appendChild(timeh3TextContent);
  descriptionRowDiv.setAttribute('class', 'row');
  listDescriptionP.setAttribute('class', 'list-description column-full margin-block-unset');
  listDescriptionP.appendChild(listDescriptionPTextContent);
  wasWeatherRowDiv.setAttribute('class', 'was-weather row');
  wasWeatherDiv.setAttribute('class', 'column-75 flex align-items-center');
  wasWeatherH4.setAttribute('class', 'was-weather-h4');
  wasWeatherH4.appendChild(wasWeatherH4TextContent);
  wasWeatherPDiv.setAttribute('class', 'column-25 flex align-items-center justify-content-center');
  wasWeatherP.setAttribute('class', 'was-weather-p');
  wasWeatherP.appendChild(wasWeatherPTextContent);
  deleteReportRowDiv.setAttribute('class', 'delete-report row border-bottom-white width-100p');
  firstColumnHalfDeleteRow.setAttribute('class', 'column-half');
  secondColumnHalfDeleteRow.setAttribute('class', 'column-half text-align-right');
  deleteRowTextA.setAttribute('class', 'delete-report-text margin-block-unset');
  deleteRowTextA.setAttribute('data-view', 'delete');
  deleteRowTextA.appendChild(deleteRowTextContent);

  firstColumnHalfDiv.append(submittedImg);

  listTitleDiv.append(titleH2);
  listTimeDateDiv.append(timeH3, dateH3);
  timeDateTitleDiv.append(listTitleDiv, listTimeDateDiv);

  descriptionRowDiv.append(listDescriptionP);

  wasWeatherDiv.append(wasWeatherH4);
  wasWeatherPDiv.append(wasWeatherP);
  wasWeatherRowDiv.append(wasWeatherDiv, wasWeatherPDiv);

  secondColumnHalfDeleteRow.append(deleteRowTextA);
  deleteReportRowDiv.append(firstColumnHalfDeleteRow, secondColumnHalfDeleteRow);

  secondColumnHalfDiv.append(timeDateTitleDiv, descriptionRowDiv, wasWeatherRowDiv, deleteReportRowDiv);

  mainRowLi.append(firstColumnHalfDiv, secondColumnHalfDiv);

  deleteRowTextA.addEventListener('click', handleViewNavigation);

  return mainRowLi;
}

module.exports = mainHTMLDOMNewListSubmissionRender;
