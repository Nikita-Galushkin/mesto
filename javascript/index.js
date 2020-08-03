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

function addCard(card) {
  elementContainer.prepend(card);
}

initialCards.forEach(function (item) {
  const arrCard = newCard(item.link, item.name);
  addCard(arrCard);
});

function newCard(link, name) {
  const cardElement = elementTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementPhoto = cardElement.querySelector('.element__photo');
  elementImage.src = link;
  elementImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__group').addEventListener('click', toggleLike);
  cardElement.querySelector('.element__trash').addEventListener('click', removeElement);
  elementPhoto.addEventListener('click', openPhotoModal);
  elementPhoto.addEventListener('click', photoElement);
  return cardElement;
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__group_active');
}

function removeElement(evt) {
  evt.target.closest('.element').remove();
}

function toggleModal(modal) {
  modal.classList.toggle('modal_open');
}

function closeOnOverlay(evt) {
  const forms = Array.from(document.querySelectorAll('.modal_open'));
  forms.forEach(function (items) {
    if ( evt.target === items) {
      items.classList.remove('modal_open');
    }
  });
}

function keyEnter(evt) {
  if (evt.key === 'Enter') {
    saveAddModal(evt);
  }
}

function openEditModal() {
  editModal.addEventListener('click', closeOnOverlay);
  document.addEventListener('keydown', keyHandlerEditModal);
  toggleModal(editModal);
  nameFormEdit.value = nameText.innerText;
  professionFormEdit.value = professionText.innerText;
  resetForm(editModal, editFormButton);
}

function closeEditModal() {
  editModal.removeEventListener('click', closeOnOverlay);
  document.removeEventListener('keydown', keyHandlerEditModal);
  toggleModal(editModal);
}

function saveEditModal(evt) {
  evt.preventDefault();
  nameText.textContent = nameFormEdit.value;
  professionText.textContent = professionFormEdit.value;
  toggleModal(editModal);
}

function keyHandlerEditModal(evt) {
  if (evt.key === 'Escape') {
    editModal.classList.remove('modal_open');
  }
}

function clearValue() {
  formAddModal.reset();
}

function openAddModal() {
  addModal.addEventListener('click', closeOnOverlay);
  document.addEventListener('keydown', keyHandlerAddModal);
  toggleModal(addModal);
  clearValue();
  resetForm(addModal, addFormButton);
}

function closeAddModal() {
  addModal.removeEventListener('click', closeOnOverlay);
  document.removeEventListener('keydown', keyHandlerAddModal);
  toggleModal(addModal);
}

function saveAddModal(evt) {
  evt.preventDefault();
  const card = newCard(linkPlaceFormAdd.value, placeFormAdd.value);
  addCard(card);
  closeAddModal();
  clearValue();
}

function keyHandlerAddModal(evt) {
  if (evt.key === 'Escape') {
    addModal.classList.remove('modal_open');
  }
}

function openPhotoModal() {
  photoModal.addEventListener('click', closeOnOverlay);
  document.addEventListener('keydown', keyHandlerPhotoModal);
  toggleModal(photoModal);
}

function closePhotoModal() {
  photoModal.removeEventListener('click', closeOnOverlay);
  document.removeEventListener('keydown', keyHandlerPhotoModal);
  toggleModal(photoModal);
}

function photoElement(evt) {
  openPhoto.src = evt.target.getAttribute('src');
  textPhoto.textContent = evt.target.getAttribute('alt');
}

function keyHandlerPhotoModal(evt) {
  if (evt.key === 'Escape') {
    photoModal.classList.remove('modal_open');
  }
}

placeFormAdd.addEventListener('submit', keyEnter);
linkPlaceFormAdd.addEventListener('submit', keyEnter);

openEditButton.addEventListener('click', openEditModal);
closeEditButton.addEventListener('click', closeEditModal);
formEditModal.addEventListener('submit', saveEditModal);

openAddButton.addEventListener('click', openAddModal);
closeAddButton.addEventListener('click', closeAddModal);
formAddModal.addEventListener('submit', saveAddModal);

closePhotoButton.addEventListener('click', closePhotoModal);