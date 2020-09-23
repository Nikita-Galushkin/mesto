import {
  openEditButton, closeEditButton, editModal, editFormButton,
  openAddButton, closeAddButton, addModal, addFormButton,
  closePhotoButton, photoModal, textPhoto,
  nameText, aboutText, elementTemplate, elementContainer,
  formAddModal, placeFormAdd, linkPlaceFormAdd, formEditModal,
  nameFormEdit, aboutFormEdit, formAvatarModal, openAvatarButton,
  avatarModal, confirmModal, avatarImage, likeCounter, avatarFormButton, obj
  } from '../utils/elements.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { ConfirmPopup } from '../components/ConfirmPopup.js';
import { Api } from '../components/Api.js';

import './index.css'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/',
  headers: {
    authorization: 'fa7c1664-18f3-41d8-b132-37b50e07ed81',
    'Content-Type': 'application/json'
  }
});

const editFormValidator = new FormValidator(obj, formEditModal);
const addFormValidator = new FormValidator(obj, formAddModal);
const avatarFormValidator = new FormValidator(obj, formAvatarModal);

const classUserInfo = new UserInfo({ nameText, aboutText, avatarImage });
const classPopupPhoto = new PopupWithImage(photoModal, textPhoto);
const classConfirmForm = new ConfirmPopup(confirmModal);

let cardsList;

api.getUserInfo()
    .then((info) => {
      nameText.textContent = info.name;
      aboutText.textContent = info.about;
      avatarImage.src = info.avatar;
      return info._id;
    }).then((id) => {
        api.getInitialsCards()
          .then((data) => {
            cardsList = new Section({
              items: data,
              renderer: (cardItem) => {
                creatNewCard(cardItem, id);
                cardsList.addItem(creatNewCard(cardItem, id).newCard());
              }},
              elementContainer
            );
            cardsList.rendererItems();
          })
          .catch((err) => console.log(err));
      });

function creatNewCard(elements, id) {
  const card = new Card({ data: elements,
    handleCardClick: () => {
      classPopupPhoto.open(elements.link, elements.name);
    },
    handleRemoveClick: (cardId, element, api) => {
      classConfirmForm.open(cardId, element, api);
    },
    api,
    myId: id
  }, '#element-template');
  return card;
}

const classAddForm = new PopupWithForm({
  modalElement: addModal,
  handleSubmitForm: (formData) => {
    classAddForm.renderLoading(true, 'Создание...');
    api.postCard(formData).then((data) =>{
      creatNewCard(data, data.owner._id);
      cardsList.addNewCard(creatNewCard(data, data.owner._id).newCard());
    })
    .catch((err) => console.log(err))
    .finally(() => {
      classAddForm.renderLoading(false, 'Создать');
      classAddForm.close();
    });
  }
});

const classEditForm = new PopupWithForm({
  modalElement: editModal,
  handleSubmitForm: (formData) => {
    classEditForm.renderLoading(true, 'Сохранение...');
    api.patchUserInfo(formData).then(() =>{
      classUserInfo.setUserInfo(formData);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      classEditForm.renderLoading(false, 'Сохранить');
      classEditForm.close();
    });
  }
});

const classAvatarForm = new PopupWithForm({
  modalElement: avatarModal,
  handleSubmitForm: (formData) => {
    classAvatarForm.renderLoading(true, 'Сохранение...');
    api.patchUserAvatar(formData).then((formData) => {
      classUserInfo.setUserAvatar(formData.avatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      classAvatarForm.renderLoading(false, 'Сохранить');
      classAvatarForm.close();
    });
  }
});

function openEditModal() {
  const userInfo = classUserInfo.getUserInfo();
  nameFormEdit.value = userInfo.name;
  aboutFormEdit.value = userInfo.about;
  editFormValidator.resetForm();
  classEditForm.open();
}

function openAddModal() {
  addFormValidator.resetForm();
  classAddForm.open();
}

function openAvatarModal() {
  avatarFormValidator.resetForm();
  classAvatarForm.open();
}

classEditForm.setEventListeners();
classAddForm.setEventListeners();
classPopupPhoto.setEventListeners();
classAvatarForm.setEventListeners();
classConfirmForm.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

openEditButton.addEventListener('click', openEditModal);
openAddButton.addEventListener('click', openAddModal);
openAvatarButton.addEventListener('click', openAvatarModal);