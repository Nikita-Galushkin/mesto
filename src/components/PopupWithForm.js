import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ modalElement, handleSubmitForm }) {
    super(modalElement);
    this._handleSubmitForm = handleSubmitForm;
    this._formModal = this._modalElement.querySelector('.modal__form');
    this._submitListenerCallback = (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    };
    this._submitButton = this._modalElement.querySelector('.modal__button');
    this._submit
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalElement.addEventListener('submit', this._submitListenerCallback);
  }

  close() {
    super.close();
    this._formModal.reset();
  }

  _getInputValues() {
    const inputList = this._modalElement.querySelectorAll('.modal__item');
    const formValues = {};
    inputList.forEach (input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }


  renderLoading(isLoading, textButton) {
    if (isLoading) {
      this._submitButton.setAttribute('disabled', true);
      this._submitButton.textContent = textButton;
    } else {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.textContent = textButton;
    }
  }
}