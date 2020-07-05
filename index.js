let openEditButton = document.querySelector('.edit-button');
let closeEditButton = document.querySelector('.modal__close-button');
let modal = document.querySelector('.modal');
let form = modal.querySelector('.form');
let inputName = document.querySelector('.form__item_type_name');
let inputProfession = document.querySelector('.form__item_type_profession');
let NameText = document.querySelector('.profile__title');
let ProfessionText = document.querySelector('.profile__subtitle');

function editModel() {
  modal.classList.toggle('modal_open');
}

openEditButton.addEventListener('click', editModel);

closeEditButton.addEventListener('click', function() {
  editModel();
  inputName.value = NameText.innerText;
  inputProfession.value = ProfessionText.innerText;
});

form.addEventListener('submit', function(event) {
  NameText.textContent = inputName.value;
  ProfessionText.textContent = inputProfession.value;
  modal.classList.remove('modal_open');
  event.preventDefault();
});