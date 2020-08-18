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

export class Card {
  constructor(link, name) {
    this._link = link;
    this._name = name;
  }

  newCard() {
    const elementTemplate = document.querySelector('#element-template').content;
    this._view = elementTemplate.cloneNode(true);
    const elementImage = this._view.querySelector('.element__image');
    const elementPhoto = this._view.querySelector('.element__photo');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._view.querySelector('.element__title').textContent = this._name;
    this._view.querySelector('.element__group').addEventListener('click', this._toggleLike);
    this._view.querySelector('.element__trash').addEventListener('click', this._removeElement);
    elementPhoto.addEventListener('click', () => {
      openModals(photoModal);
    });
    elementPhoto.addEventListener('click', this._photoElement);
    return this._view;
  }

  _removeElement(evt) {
    evt.target.closest('.element').remove();
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('element__group_active');
  }

  _photoElement(evt) {
    openPhoto.src = evt.target.getAttribute('src');
    textPhoto.textContent = evt.target.getAttribute('alt');
  }
}