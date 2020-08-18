import {
  openEditButton,
  closeEditButton,
  editModal,
  editFormButton,
  openAddButton,
  closeAddButton,
  addModal,
  addFormButton,
  closePhotoButton,
  photoModal,
  openPhoto,
  textPhoto,
  nameText,
  professionText,
  elementTemplate,
  elementContainer,
  formAddModal,
  placeFormAdd,
  linkPlaceFormAdd,
  formEditModal,
  nameFormEdit,
  professionFormEdit
  } from './constants.js';
import { initialCards } from './initial-cards.js';
import { Card } from './Card.js';
import { obj, FormValidator } from './FormValidator.js';

initialCards.forEach(function (item) {
  const arrCard = new Card(item.link, item.name);
  elementContainer.append(arrCard.newCard());
});

function addCard(card) {
  elementContainer.prepend(card);
}

function openEditModal() {
  openModals(editModal);
  nameFormEdit.value = nameText.innerText;
  professionFormEdit.value = professionText.innerText;
  new FormValidator(obj, formEditModal).resetForm(editFormButton);
}

function saveEditModal(evt) {
  evt.preventDefault();
  nameText.textContent = nameFormEdit.value;
  professionText.textContent = professionFormEdit.value;
  closeModals(editModal);
}

function clearValue() {
  formAddModal.reset();
}

function openAddModal() {
  openModals(addModal);
  clearValue();
  new FormValidator(obj, formAddModal).resetForm(addFormButton);
}

function saveAddModal(evt) {
  evt.preventDefault();
  const card = new Card(linkPlaceFormAdd.value, placeFormAdd.value).newCard();
  addCard(card);
  closeModals(addModal);
  clearValue();
}

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

new FormValidator(obj, formEditModal).enableValidation();
new FormValidator(obj, formAddModal).enableValidation();

openEditButton.addEventListener('click', openEditModal);
closeEditButton.addEventListener('click', function () {
  closeModals(editModal);
});
formEditModal.addEventListener('submit', saveEditModal);

openAddButton.addEventListener('click', openAddModal);
closeAddButton.addEventListener('click', function () {
  closeModals(addModal);
});
formAddModal.addEventListener('submit', saveAddModal);

closePhotoButton.addEventListener('click', function () {
  closeModals(photoModal);
});