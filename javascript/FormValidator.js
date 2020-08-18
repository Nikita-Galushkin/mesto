import { obj } from './objFormValidator.js';

class FormValidator {
  constructor(obj, formsElement) {
    this._obj = obj;
    this._formsElement = formsElement;
  }

  resetForm(modalButton) {
  const inputs = Array.from(this._formsElement.querySelectorAll('.modal__item'));
  inputs.forEach((inputsElement) => {
    inputsElement.classList.remove('modal__item_type_error');
    this._showError(inputsElement);
    this._toggleButtonState(inputs, modalButton);
  });
}

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._obj.formSelector));
    forms.forEach((formsElement) => {
      formsElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }

  _setEventListeners() {
    const inputs = Array.from(this._formsElement.querySelectorAll(this._obj.inputSelector));
    const modalButton = this._formsElement.querySelector(this._obj.buttonSubmitSelector);
    this._toggleButtonState(inputs, modalButton);
    inputs.forEach((inputsElement) => {
      inputsElement.addEventListener('input', () => {
        this._checkValidity(inputsElement);
        this._toggleButtonState(inputs, modalButton);
      });
    });
  }

  _toggleButtonState(inputs, modalButton) {
    if (this._hasInvalidInput(inputs)) {
      modalButton.classList.add(this._obj.buttonDisabledClass);
      modalButton.disabled = true;
    } else {
      modalButton.classList.remove(this._obj.buttonDisabledClass);
      modalButton.disabled = false;
    }
  }

  _checkValidity(inputsElement) {
    if (inputsElement.validity.valid) {
      this._showError(inputsElement);
    } else {
      this._hideError(inputsElement);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((inputsElement) => {
      return !inputsElement.validity.valid;
    })
  }

  _hideError(inputsElement) {
    const errorElement = this._formsElement.querySelector(`#${inputsElement.name}-error`);
    errorElement.textContent = inputsElement.validationMessage;
    errorElement.classList.add(this._obj.errorClass);
    inputsElement.classList.add(this._obj.inputTypeErrorClass);
  }

  _showError(inputsElement) {
    const errorElement = this._formsElement.querySelector(`#${inputsElement.name}-error`);
    inputsElement.classList.remove(this._obj.inputTypeErrorClass);
    errorElement.classList.remove(this._obj.errorClass);
    errorElement.textContent = '';
  }
}

export { obj, FormValidator };