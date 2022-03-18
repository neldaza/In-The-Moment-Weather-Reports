var $imageInput = document.querySelector('.image-url-holder');

function showImageInput(event) {
  if ($imageInput.className === 'image-url-holder width-80p margin-auto hidden') {
    $imageInput.className = 'image-url-holder width-80p margin-auto view';
  }
}

function hideImageInput(event) {
  if ($imageInput.className === 'image-url-holder width-80p margin-auto view') {
    $imageInput.className = 'image-url-holder width-80p margin-auto hidden';
  }
}

module.exports = { showImageInput, hideImageInput };
