import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ modalSelector, handleSubmitForm }) {
    super(modalSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formModal = this._modalSelector.querySelector('.modal__form');
    this._submitListenerCallback = (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalSelector.addEventListener('submit', this._submitListenerCallback);
  }

  close() {
    super.close();
    this._formModal.reset();
  }

  _getInputValues() {
    const inputList = this._modalSelector.querySelectorAll('.modal__item');
    const formValues = {};
    inputList.forEach (input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
}