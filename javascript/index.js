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

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function resetForm(formsElement) {
  const inputs = Array.from(formsElement.querySelectorAll('.modal__item'));
  inputs.forEach(function (inputsElement) {
    inputsElement.classList.remove('modal__item_type_error');

    const errorElements = formsElement.querySelector(`#${inputsElement.name}-error`);
    errorElements.classList.remove('modal__item-error_active');
    errorElements.textContent = '';
    
    // const modalButton = formsElement.querySelector('.modal__button');
    // modalButton.classList.remove('modal__button_disabled');
    // modalButton.disabled = false;
  });
  // resetInputs(formsElement, inputsElement);
}

// function resetInputs(formsElement, inputsElement) {
//   const errorInputElements = Array.from(formsElement.querySelector(`#${inputsElement.name}-error`));
//   errorInputElements.forEach(function (errorElements) {
//     errorElements.classList.remove('modal__item-error_active');
//   });
//   resetButton(formsElement);
// }

function resetButton(formsElement) {
  const modalButton = formsElement.querySelector('.modal__button');
  modalButton.classList.remove('modal__button_disabled');
  modalButton.disabled = false;
}


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

function openEditModal() {
  addEventKeydown();
  toggleEditModal();
  nameFormEdit.value = nameText.innerText;
  professionFormEdit.value = professionText.innerText;
}

function closeEditModal() {
  removeEventKeydown();
  toggleEditModal();
  resetForm(editModal);
  resetButton(editModal);
}

function toggleEditModal() {
  toggleModal(editModal);
}

function saveEditModal(evt) {
  evt.preventDefault();
  nameText.textContent = nameFormEdit.value;
  professionText.textContent = professionFormEdit.value;
  toggleEditModal();
}

function clearValue() {
  formAddModal.reset();
}

function toggleAddModal() {
  addEventKeydown();
  toggleModal(addModal);
}

function closeAddModal() {
  toggleAddModal();
  clearValue();
  removeEventKeydown();
  resetForm(addModal);
}

function saveAddModal(evt) {
  evt.preventDefault();
  const card = newCard(linkPlaceFormAdd.value, placeFormAdd.value);       //(inputLink.value, inputPlace.value);//заменить параметры на параметры из формы
  addCard(card);
  closeAddModal();
  clearValue();
}

function openPhotoModal() {
  addEventKeydown();
  toggleModal(photoModal);
}

function closePhotoModal() {
  removeEventKeydown();
  toggleModal(photoModal);
}

function photoElement(evt) {
  openPhoto.src = evt.target.getAttribute('src');
  textPhoto.textContent = evt.target.getAttribute('alt');
}

function addEventKeydown() {
  document.addEventListener('keydown', keyHandler);
}
function removeEventKeydown() {
  document.removeEventListener('keydown', keyHandler);
}

function keydownCloseModals() {
  addModal.classList.remove('modal_open');
  editModal.classList.remove('modal_open');
  photoModal.classList.remove('modal_open');
  resetForm(addModal);
  resetForm(editModal);
  resetButton(editModal);
}

function closeOnOverlay(evt) {
  const forms = Array.from(document.querySelectorAll('.modal_open'));
  forms.forEach(function (items) {
    if ( evt.target === items) {
      items.classList.remove('modal_open');
    }
  });
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    keydownCloseModals();
  }
}

function keyEnter(evt) {
  if (evt.key === 'Enter') {
    saveAddModal(evt);
  }
}

document.addEventListener('click', closeOnOverlay);

placeFormAdd.addEventListener('keydown', keyEnter);
linkPlaceFormAdd.addEventListener('keydown', keyEnter);

openEditButton.addEventListener('click', openEditModal);
closeEditButton.addEventListener('click', closeEditModal);
formEditModal.addEventListener('submit', saveEditModal);

openAddButton.addEventListener('click', toggleAddModal);
closeAddButton.addEventListener('click', closeAddModal);
formAddModal.addEventListener('submit', saveAddModal);

closePhotoButton.addEventListener('click', closePhotoModal);