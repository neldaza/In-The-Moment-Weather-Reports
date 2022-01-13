const $deleteModal = document.querySelector('.cancel-background');
function showDeleteModal() {
  $deleteModal.className = 'cancel-background flex justify-content-center position-fixed view';
}

module.exports = showDeleteModal;
