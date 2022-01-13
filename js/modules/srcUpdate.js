var $formPlaceholderImg = document.querySelector('.placeholder-img');
var $photoUrl = document.querySelector('.photo-url');

function srcUpdate(event) {
  $formPlaceholderImg.setAttribute('src', $photoUrl.value);

}

module.exports = srcUpdate;
