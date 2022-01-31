var $invalidCity = document.querySelector('.invalid-city');
var $invalidNetwork = document.querySelector('.invalid-network');

function invalidTextHide(event) {
  if ($invalidCity.className === 'invalid-city red-text show') {
    $invalidCity.className = 'invalid-city hide';
  } else if ($invalidNetwork.className === 'invalid-network red-text show') {
    $invalidNetwork.className = 'invalid-network hide';
  }
}

module.exports = invalidTextHide;
