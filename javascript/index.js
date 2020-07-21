const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.modal__close-button_type_edit');
const editModal = document.querySelector('.modal_type_edit-profile');
const editForm = editModal.querySelector('.modal__form_type_edit');

const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.modal__close-button_type_add');
const addModal = document.querySelector('.modal_type_add-card');
const addForm = addModal.querySelector('.modal__form_type_add');

const closePhotoButton = document.querySelector('.modal__close-button_type_photo');
const photoModal = document.querySelector('.modal_type_photo');
const openPhoto = document.querySelector('.modal__photo');
const textPhoto = document.querySelector('.modal__text');

const inputName = document.querySelector('.modal__item_type_name');
const inputProfession = document.querySelector('.modal__item_type_profession');

const inputPlace = document.querySelector('.modal__item_type_place');
const inputLink = document.querySelector('.modal__item_type_link-place');

const nameText = document.querySelector('.profile__title');
const professionText = document.querySelector('.profile__subtitle');

const elementTemplate = document.querySelector('#element-template').content;
const elementContainer = document.querySelector('.elements__list');

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

function clearValue() {
  inputPlace.value = '';
  inputLink.value = '';
}

function toggleModal(modal) {
  modal.classList.toggle('modal_open');
}

function newCard(link, name) {
  const cardElement = elementTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementPhoto = cardElement.querySelector('.element__photo');
  elementImage.src = link;
  elementImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__group').addEventListener('click', toggleLike);
  cardElement.querySelector('.element__trash').addEventListener('click', removeElement);
  elementPhoto.addEventListener('click', togglePhotoModal);
  elementPhoto.addEventListener('click', photoElement);
  addCard(cardElement);
}

initialCards.forEach(function (item) {
  newCard(item.link, item.name);
});

function toggleEditModal() {
  toggleModal(editModal);
}

function toggleAddModal() {
  toggleModal(addModal);
}

function togglePhotoModal() {
  toggleModal(photoModal);
}

function closeAddModal() {
  toggleAddModal();
  clearValue();
}

function openEditModal() {
  toggleEditModal();
  inputName.value = nameText.innerText;
  inputProfession.value = professionText.innerText;
}

function saveEditModal(event) {
  event.preventDefault(); 
  nameText.textContent = inputName.value;
  professionText.textContent = inputProfession.value;
  toggleEditModal();
}

function saveAddModal(event) {
  event.preventDefault();
  newCard(inputLink.value, inputPlace.value);
  clearValue();
  closeAddModal();
}

openEditButton.addEventListener('click', openEditModal);
closeEditButton.addEventListener('click', toggleEditModal);
editForm.addEventListener('submit', saveEditModal);

openAddButton.addEventListener('click', toggleAddModal);
closeAddButton.addEventListener('click', closeAddModal);
addForm.addEventListener('submit', saveAddModal);

closePhotoButton.addEventListener('click', togglePhotoModal);