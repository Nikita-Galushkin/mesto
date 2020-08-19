import {
  openEditButton, closeEditButton, editModal, editFormButton,
  openAddButton, closeAddButton, addModal, addFormButton,
  closePhotoButton, photoModal, openPhoto, textPhoto,
  nameText, professionText, elementTemplate, elementContainer,
  formAddModal, placeFormAdd, linkPlaceFormAdd, formEditModal,
  nameFormEdit, professionFormEdit, obj
  } from './constants.js';
  import { openModals, closeModals, closeOnOverlay, keyEscapeHandler } from './utils.js';

export class Card {
  constructor(link, name, elementTemplate) {
    this._link = link;
    this._name = name;
    this._elementTemplate = elementTemplate;
  }
  
  newCard() {
    this._view = this._creteCardTemplate();
    const elementImage = this._view.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._view.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._view;
  }

  _creteCardTemplate() {
    return document.querySelector(this._elementTemplate).content.querySelector('.element').cloneNode(true);
  }

  _setEventListeners() {
    const elementPhoto = this._view.querySelector('.element__photo');
    this._view.querySelector('.element__group').addEventListener('click', () => {
      this._toggleLike()
    });
    this._view.querySelector('.element__trash').addEventListener('click', () => {
      this._removeElement();
    });
    elementPhoto.addEventListener('click', () => {
      this._photoElement()
    });
    elementPhoto.addEventListener('click', () => {
      openModals(photoModal);
    });
  }
  _toggleLike() {
    this._view.querySelector('.element__group').classList.toggle('element__group_active');
  }

  _removeElement() {
    this._view.remove();
  }

  _photoElement() {
    openPhoto.src = this._link;
    textPhoto.textContent = this._name;
  }
}