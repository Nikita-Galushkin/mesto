const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.modal__close-button_type_edit');
const editModal = document.querySelector('.modal_type_edit-profile');
const editFormButton = editModal.querySelector('.modal__button_action');

const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.modal__close-button_type_add');
const addModal = document.querySelector('.modal_type_add-card');
const addFormButton = addModal.querySelector('.modal__button_action');

const closePhotoButton = document.querySelector('.modal__close-button_type_photo');
const photoModal = document.querySelector('.modal_type_photo');
const openPhoto = document.querySelector('.modal__photo');
const textPhoto = document.querySelector('.modal__text');

const nameText = document.querySelector('.profile__title');
const professionText = document.querySelector('.profile__subtitle');

const elementTemplate = document.querySelector('#element-template').content;
const elementContainer = document.querySelector('.elements__list');

const formAddModal = document.forms.modal_add_form;
const placeFormAdd = formAddModal.elements.place;
const linkPlaceFormAdd = formAddModal.elements.link_place;

const formEditModal = document.forms.modal_edit_form;
const nameFormEdit = formEditModal.elements.name;
const professionFormEdit = formEditModal.elements.profession;

const obj = {
  formSelector: '.modal__form',
  inputSelector: '.modal__item',
  buttonSubmitSelector: '.modal__button',
  errorClass: 'modal__item-error_active',
  buttonDisabledClass: 'modal__button_disabled',
  inputTypeErrorClass: 'modal__item_type_error'
};

export {
  openEditButton, closeEditButton, editModal, editFormButton,
  openAddButton, closeAddButton, addModal, addFormButton,
  closePhotoButton, photoModal, openPhoto, textPhoto,
  nameText, professionText, elementTemplate, elementContainer,
  formAddModal, placeFormAdd, linkPlaceFormAdd, formEditModal,
  nameFormEdit, professionFormEdit, obj
  };