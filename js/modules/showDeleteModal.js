/* eslint-disable no-undef */
const $deleteModal = document.querySelector('.whole-delete-modal');

function showDeleteModal(event) {
  $deleteModal.className = 'whole-delete-modal view';
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === parseInt(event.target.closest('li').getAttribute('data-entry-id'))) {
      data.editing = data.entries[i];
    }
  }
}

function hideDeleteModal(event) {
  $deleteModal.className = 'whole-delete-modal view hidden';
}

module.exports = { showDeleteModal, hideDeleteModal };
