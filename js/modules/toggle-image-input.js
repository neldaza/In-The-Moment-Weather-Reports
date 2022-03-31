var $imageInput = document.querySelector('.image-url-holder');
var $placeholderImage = document.querySelector('.placeholder-img');
var $formInputsHolder = document.querySelector('.form-inputs-holder');

function showImageInput(event) {
  if ($imageInput.className === 'image-url-holder width-80p margin-auto hidden' &&
    $placeholderImage.className === 'placeholder-img hidden') {
    $imageInput.className = 'image-url-holder width-80p margin-auto view';
    $placeholderImage.className = 'placeholder-img view';
    if (window.innerWidth >= 1280) {
      $formInputsHolder.className = 'form-inputs-holder-image';
    }
  }
}

function hideImageInput(event) {
  if ($imageInput.className === 'image-url-holder width-80p margin-auto view' &&
    $placeholderImage.className === 'placeholder-img view') {
    $imageInput.className = 'image-url-holder width-80p margin-auto hidden';
    $placeholderImage.className = 'placeholder-img hidden';
    $formInputsHolder.className = 'form-inputs-holder';

  }
}

module.exports = { showImageInput, hideImageInput };
