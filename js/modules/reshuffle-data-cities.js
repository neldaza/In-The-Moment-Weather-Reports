
function reshuffleDataCities(citiesArray) {
  let count = 1;
  for (var i = 0; i < citiesArray.length; i++) {
    citiesArray[i].cityCount = count;
    count++;
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

module.exports = { reshuffleDataCities, removeAllChildNodes };
