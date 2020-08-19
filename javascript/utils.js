function openModals(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', keyEscapeHandler);
  document.addEventListener('click', closeOnOverlay);
}

function closeModals(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', keyEscapeHandler);
  document.removeEventListener('click', closeOnOverlay);
}

function closeOnOverlay(evt) {
  const openedModal = document.querySelector('.modal_opened');
  if ( evt.target === openedModal) { 
    closeModals(openedModal);
  } 
}

function keyEscapeHandler(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');
    closeModals(openedModal);
  } 
}

export { openModals, closeModals, closeOnOverlay, keyEscapeHandler };