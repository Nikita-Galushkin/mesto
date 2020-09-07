import {
  openEditButton, closeEditButton, editModal, editFormButton,
  openAddButton, closeAddButton, addModal, addFormButton,
  closePhotoButton, photoModal, openPhoto, textPhoto,
  nameText, professionText, elementTemplate, elementContainer,
  formAddModal, placeFormAdd, linkPlaceFormAdd, formEditModal,
  nameFormEdit, professionFormEdit, obj
  } from '../utils/elements.js';
import { initialCards } from '../utils/initial-cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import './index.css'

const editFormValidator = new FormValidator(obj, formEditModal);
const addFormValidator = new FormValidator(obj, formAddModal);

const classUserInfo = new UserInfo({ nameText, professionText });
const classPopupPhoto = new PopupWithImage(photoModal);

function creatNewCard(elements) {
  const card = new Card({ data: elements,
    handleCardClick: () => {
      classPopupPhoto.open(elements.link, elements.name);
    }
  }, '#element-template');
  return card;
};

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    creatNewCard(cardItem);
    cardsList.addItem(creatNewCard(cardItem).newCard());
  }},
  elementContainer
);

const classAddForm = new PopupWithForm({
  modalSelector: addModal,
  handleSubmitForm: (formData) => {
    creatNewCard(formData);
    cardsList.addNewCard(creatNewCard(formData).newCard());
  }
});

const classEditForm = new PopupWithForm({
  modalSelector: editModal,
  handleSubmitForm: (formData) => {
    classUserInfo.setUserInfo(formData);
  }
});

function openEditModal() {
  const userInfo = classUserInfo.getUserInfo();
  nameFormEdit.value = userInfo.name;
  professionFormEdit.value = userInfo.profession;
  classEditForm.setEventListeners();
  classEditForm.open();
  editFormValidator.resetForm();
}

function openAddModal() {
  addFormValidator.resetForm();
  classAddForm.setEventListeners();
  classAddForm.open();
}

editFormValidator.enableValidation();
addFormValidator.enableValidation();
cardsList.rendererItems();

openEditButton.addEventListener('click', openEditModal);
openAddButton.addEventListener('click', openAddModal);