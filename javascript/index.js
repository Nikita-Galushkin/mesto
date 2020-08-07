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
  elementPhoto.addEventListener('click', function () {
    openModals(photoModal);
  });
  elementPhoto.addEventListener('click', photoElement);
  return cardElement;
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__group_active');
}

function removeElement(evt) {
  evt.target.closest('.element').remove();
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

function openEditModal() {
  openModals(editModal);
  nameFormEdit.value = nameText.innerText;
  professionFormEdit.value = professionText.innerText;
  resetForm(editModal, editFormButton);
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
  resetForm(addModal, addFormButton);
}

function saveAddModal(evt) {
  evt.preventDefault();
  const card = newCard(linkPlaceFormAdd.value, placeFormAdd.value);
  addCard(card);
  closeModals(addModal);
  clearValue();
}

function photoElement(evt) {
  openPhoto.src = evt.target.getAttribute('src');
  textPhoto.textContent = evt.target.getAttribute('alt');
}


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