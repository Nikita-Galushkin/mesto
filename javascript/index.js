import {
  openEditButton, closeEditButton, editModal, editFormButton,
  openAddButton, closeAddButton, addModal, addFormButton,
  closePhotoButton, photoModal, openPhoto, textPhoto,
  nameText, professionText, elementTemplate, elementContainer,
  formAddModal, placeFormAdd, linkPlaceFormAdd, formEditModal,
  nameFormEdit, professionFormEdit, obj
  } from './constants.js';
import { initialCards } from './initial-cards.js';
import { openModals, closeModals, closeOnOverlay, keyEscapeHandler } from './utils.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const editFormValidator = new FormValidator(obj, formEditModal);
const addFormValidator = new FormValidator(obj, formAddModal);


initialCards.forEach(function (item) {
  const arrCard = new Card(item.link, item.name, '#element-template');
  elementContainer.append(arrCard.newCard());
});

function addCard(card) {
  elementContainer.prepend(card);
}

function openEditModal() {
  openModals(editModal);
  nameFormEdit.value = nameText.innerText;
  professionFormEdit.value = professionText.innerText;
  editFormValidator.resetForm(editFormButton);
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
  addFormValidator.resetForm(addFormButton);
}

function saveAddModal(evt) {
  evt.preventDefault();
  const card = new Card(linkPlaceFormAdd.value, placeFormAdd.value, '#element-template').newCard();
  addCard(card);
  closeModals(addModal);
  clearValue();
}

editFormValidator.enableValidation();
addFormValidator.enableValidation();

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