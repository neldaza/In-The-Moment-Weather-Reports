/* eslint-disable no-undef */
const $deleteModal = document.querySelector('.whole-delete-modal');

function showDeleteModal(event) {
  if (event.target.className === 'delete-report-text margin-block-unset') {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(event.target.closest('li').getAttribute('data-entry-id'))) {
        data.editing = data.entries[i];
        $deleteModal.className = 'whole-delete-modal view';
        return;
      }
    }
  }
}

function hideDeleteModal(event) {
  $deleteModal.className = 'whole-delete-modal view hidden';
}

module.exports = { showDeleteModal, hideDeleteModal };
