const $deleteModal = document.querySelector('.whole-delete-modal');
function showDeleteModal() {
  $deleteModal.className = 'whole-delete-modal view';
}

function hideDeleteModal() {
  $deleteModal.className = 'whole-delete-modal view hidden';
}

module.exports = { showDeleteModal, hideDeleteModal };
