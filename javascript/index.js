let openEditButton = document.querySelector('.profile__edit-button');
let closeEditButton = document.querySelector('.modal__close-button');
let modal = document.querySelector('.modal');
let form = modal.querySelector('.modal__form');
let inputName = document.querySelector('.modal__item_type_name');
let inputProfession = document.querySelector('.modal__item_type_profession');
let nameText = document.querySelector('.profile__title');
let professionText = document.querySelector('.profile__subtitle');

function openModal() {
  modal.classList.add('modal_open');
  inputName.value = nameText.innerText;
  inputProfession.value = professionText.innerText;
}

function closeModal() {
  modal.classList.remove('modal_open');
}

function saveModal(event) {
  event.preventDefault(); 
  nameText.textContent = inputName.value;
  professionText.textContent = inputProfession.value;
  closeModal();
}

form.addEventListener('submit', saveModal);
openEditButton.addEventListener('click', openModal);
closeEditButton.addEventListener('click', closeModal);