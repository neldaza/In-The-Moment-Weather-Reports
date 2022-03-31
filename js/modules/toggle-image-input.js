var $imageInput = document.querySelector('.image-url-holder');
var $placeholderImage = document.querySelector('.placeholder-img');
var $formInputsHolder = document.querySelector('.form-inputs-holder');
var $formSubmitHolder = document.querySelector('.form-submit-holder');
var $saveButtonHolder = document.querySelector('.save-button-holder');

function showImageInput(event) {
  if ($imageInput.className === 'image-url-holder width-80p margin-auto hidden' &&
    $placeholderImage.className === 'placeholder-img hidden') {
    $imageInput.className = 'image-url-holder width-80p margin-auto view';
    $placeholderImage.className = 'placeholder-img view';
    // if (window.innerWidth >= 1280) {
    //   $formInputsHolder.className = 'form-inputs-holder-image width-inherit';
    //   $formSubmitHolder.className = 'form-submit-holder-1280 column-half text-align-right margin-auto';
    //   $saveButtonHolder.className = 'save-button-holder-1280 row width-inherit';
    // }
  }
}

function hideImageInput(event) {
  if ($imageInput.className === 'image-url-holder width-80p margin-auto view' &&
    $placeholderImage.className === 'placeholder-img view') {
    $imageInput.className = 'image-url-holder width-80p margin-auto hidden';
    $placeholderImage.className = 'placeholder-img hidden';
    $formInputsHolder.className = 'form-inputs-holder width-inherit';
    $formSubmitHolder.className = 'form-submit-holder column-half text-align-right margin-auto';
    $saveButtonHolder.className = 'save-button-holder row width-inherit';
  }
}

module.exports = { showImageInput, hideImageInput };
