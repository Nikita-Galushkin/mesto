export class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
    this._modalButton = this._formElement.querySelector(this._obj.buttonSubmitSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll('.modal__item'));
  }

  resetForm() {
    this._inputs.forEach((inputsElement) => {
      inputsElement.classList.remove('modal__item_type_error');
      this._showError(inputsElement);
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((inputsElement) => {
      inputsElement.addEventListener('input', () => {
        this._checkValidity(inputsElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._modalButton.classList.add(this._obj.buttonDisabledClass);
      this._modalButton.disabled = true;
    } else {
      this._modalButton.classList.remove(this._obj.buttonDisabledClass);
      this._modalButton.disabled = false;
    }
  }

  _checkValidity(inputsElement) {
    if (inputsElement.validity.valid) {
      this._showError(inputsElement);
    } else {
      this._hideError(inputsElement);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((inputsElement) => {
      return !inputsElement.validity.valid;
    })
  }

  _hideError(inputsElement) {
    const errorElement = this._formElement.querySelector(`#${inputsElement.name}-error`);
    errorElement.textContent = inputsElement.validationMessage;
    errorElement.classList.add(this._obj.errorClass);
    inputsElement.classList.add(this._obj.inputTypeErrorClass);
  }

  _showError(inputsElement) {
    const errorElement = this._formElement.querySelector(`#${inputsElement.name}-error`);
    inputsElement.classList.remove(this._obj.inputTypeErrorClass);
    errorElement.classList.remove(this._obj.errorClass);
    errorElement.textContent = '';
  }
} 