let openEditButton = document.querySelector('.profile__edit-button');
let closeEditButton = document.querySelector('.modal__close-button_type_edit');
let editModal = document.querySelector('.modal_type_edit-profile');
let editForm = editModal.querySelector('.modal__form_type_edit');

let openAddButton = document.querySelector('.profile__add-button');
let closeAddButton = document.querySelector('.modal__close-button_type_add');
let addModal = document.querySelector('.modal_type_add-card');
let addForm = addModal.querySelector('.modal__form_type_add');

let closePhotoButton = document.querySelector('.modal__close-button_type_photo');
let photoModal = document.querySelector('.modal_type_photo');
let openPhoto = document.querySelector('.modal__photo');
let textPhoto = document.querySelector('.modal__text');

let inputName = document.querySelector('.modal__item_type_name');
let inputProfession = document.querySelector('.modal__item_type_profession');

let inputPlace = document.querySelector('.modal__item_type_place');
let inputLink = document.querySelector('.modal__item_type_link-place');

let nameText = document.querySelector('.profile__title');
let professionText = document.querySelector('.profile__subtitle');

let elementTemplate = document.querySelector('#element-template').content;
let elementContainer = document.querySelector('.elements__list');


let initialCards = [
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


for (let i = 0; i < initialCards.length; i++) {
  let cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = initialCards[i].link;
  cardElement.querySelector('.element__image').alt = initialCards[i].name;
  cardElement.querySelector('.element__title').textContent = initialCards[i].name;
  cardElement.querySelector('.element__group').addEventListener('click', toggleLike);
  cardElement.querySelector('.element__trash').addEventListener('click', removeElement);
  cardElement.querySelector('.element__photo').addEventListener('click', openPhotoModal);
  cardElement.querySelector('.element__photo').addEventListener('click', photoElement);
  addCard(cardElement);
}

function addCard(card) {
  elementContainer.prepend(card);
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__group_active');
}

function removeElement(evt) {
  evt.target.closest('.element').remove();
}

function photoElement(evt) {
  openPhoto.src = evt.target.getAttribute('src');
  textPhoto.textContent = evt.target.getAttribute('alt');
}


function openEditModal() {
  editModal.classList.add('modal_open');
  inputName.value = nameText.innerText;
  inputProfession.value = professionText.innerText;
}

function closeEditModal() {
  editModal.classList.remove('modal_open');
}

function saveEditModal(event) {
  event.preventDefault(); 
  nameText.textContent = inputName.value;
  professionText.textContent = inputProfession.value;
  closeEditModal();
}


function openAddModal() {
  addModal.classList.add('modal_open');
}

function closeAddModal() {
  addModal.classList.remove('modal_open');
  inputPlace.value = '';
  inputLink.value = '';
}

function saveAddModal(event) {
  event.preventDefault();
  let newCardElement = elementTemplate.cloneNode(true);
  newCardElement.querySelector('.element__image').src = inputLink.value;
  newCardElement.querySelector('.element__title').textContent = inputPlace.value;
  newCardElement.querySelector('.element__image').alt = inputPlace.value;
  newCardElement.querySelector('.element__group').addEventListener('click', toggleLike);
  newCardElement.querySelector('.element__trash').addEventListener('click', removeElement);
  newCardElement.querySelector('.element__photo').addEventListener('click', openPhotoModal);
  newCardElement.querySelector('.element__photo').addEventListener('click', photoElement);
  addCard(newCardElement);
  inputPlace.value = '';
  inputLink.value = '';
  closeAddModal();
}


function openPhotoModal() {
  photoModal.classList.add('modal_open');
}

function closePhotoModal() {
  photoModal.classList.remove('modal_open');
}

openEditButton.addEventListener('click', openEditModal);
closeEditButton.addEventListener('click', closeEditModal);
editForm.addEventListener('submit', saveEditModal);

openAddButton.addEventListener('click', openAddModal);
closeAddButton.addEventListener('click', closeAddModal);
addForm.addEventListener('submit', saveAddModal);

closePhotoButton.addEventListener('click', closePhotoModal);