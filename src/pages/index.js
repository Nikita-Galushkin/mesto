import {
  openEditButton, closeEditButton, editModal, editFormButton,
  openAddButton, closeAddButton, addModal, addFormButton,
  closePhotoButton, photoModal, openPhoto, textPhoto,
  nameText, professionText, elementTemplate, elementContainer,
  formAddModal, placeFormAdd, linkPlaceFormAdd, formEditModal,
  nameFormEdit, professionFormEdit, obj
  } from '../utils/constants.js';
import { initialCards } from '../utils/initial-cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import './index.css'

const editFormValidator = new FormValidator(obj, formEditModal);
const addFormValidator = new FormValidator(obj, formAddModal);

const classPopupEdit = new Popup(editModal);
const classPopupAdd = new Popup(addModal);

const classUserInfo = new UserInfo({ nameText, professionText });

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
      const arrCard = new Card({ data: cardItem, handleCardClick: () => {
        const classPopupPhoto = new PopupWithImage(photoModal);
        classPopupPhoto.openModals(cardItem.link, cardItem.name);
      }}, '#element-template');
    cardsList.addItem(arrCard.newCard());
  }
},
elementContainer
);

const classEditForm = new PopupWithForm({
  modalSelector: editModal,
  handleSubmitForm: (formData) => {
    classUserInfo.setUserInfo(formData);
  }
});

const classAddForm = new PopupWithForm({
  modalSelector: addModal,
  handleSubmitForm: (formData) => {
    const card = new Card({ data: formData,
      handleCardClick: () => {
      const image = new PopupWithImage(photoModal);
      image.openModals(formData.link, formData.name);
    }}, '#element-template');
    elementContainer.prepend(card.newCard());
  }
});


function openEditModal() {
  const data = classUserInfo.getUserInfo();
  nameFormEdit.value = data.name;
  professionFormEdit.value = data.profession;
  classPopupEdit.openModals();
  editFormValidator.resetForm();
}

function saveEditModal(evt) {
  evt.preventDefault();
  classEditForm.setEventListeners();
  classPopupEdit.closeModals();
}

function openAddModal() {
  addFormValidator.resetForm();
  classPopupAdd.openModals();
}

function saveAddModal(evt) {
  evt.preventDefault();
  classAddForm.setEventListeners();
  classAddForm.closeModals();
}


editFormValidator.enableValidation();
addFormValidator.enableValidation();
cardsList.rendererItems();


openEditButton.addEventListener('click', openEditModal);
formEditModal.addEventListener('submit', saveEditModal);

openAddButton.addEventListener('click', openAddModal);
formAddModal.addEventListener('submit', saveAddModal);
