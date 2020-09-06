// import { formAddModal } from '../utils/constants.js';
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ modalSelector, handleSubmitForm }) {
    super(modalSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formModal = document.forms.modal_add_form;
    this._submitListenerCallback = (evt) => {
      evt.preventDefault();
      this.closeModals();
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleSubmitForm(this._getInputValues());
    this._formModal.addEventListener('submit', this._submitListenerCallback);
    }

  closeModals() {
    super.closeModals();
    this._formModal.reset();
    this._formModal.removeEventListener('submit', this._submitListenerCallback);
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