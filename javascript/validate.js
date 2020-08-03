const obj = {
  formSelector: '.modal__form',
  inputSelector: '.modal__item',
  buttonSubmitSelector: '.modal__button',
  errorClass: 'modal__item-error_active',
  buttonDisabledClass: 'modal__button_disabled',
  inputTypeErrorClass: 'modal__item_type_error'
};

function resetForm(formsElement, modalButton) {
  const inputs = Array.from(formsElement.querySelectorAll('.modal__item'));
  inputs.forEach(function (inputsElement) {
    inputsElement.classList.remove('modal__item_type_error');
    showError(formsElement, inputsElement, obj);
    toggleButtonState(inputs, modalButton, obj)
  });
}

function enableValidation(obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach(function (formsElement) {
    formsElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formsElement, obj);
  });
}

function setEventListeners(formsElement, obj) {
  const inputs = Array.from(formsElement.querySelectorAll(obj.inputSelector));
  const modalButton = formsElement.querySelector(obj.buttonSubmitSelector);
  toggleButtonState(inputs, modalButton, obj);
  inputs.forEach(function (inputsElement) {
    inputsElement.addEventListener('input', function () {
      checkValidity(formsElement, inputsElement, obj);
      toggleButtonState(inputs, modalButton, obj);
    });
  });
}

function toggleButtonState(inputs, modalButton, obj) {
  if (hasInvalidInput(inputs)) {
    modalButton.classList.add(obj.buttonDisabledClass);
    modalButton.disabled = true;
  } else {
    modalButton.classList.remove(obj.buttonDisabledClass);
    modalButton.disabled = false;
  }
}

function checkValidity(formsElement, inputsElement, obj) {
  if (inputsElement.validity.valid) {
    showError(formsElement, inputsElement, obj);
  } else {
    hideError(formsElement, inputsElement, obj);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some(function (inputsElement) {
    return !inputsElement.validity.valid;
  })
}

function hideError(formsElement, inputsElement, obj) {
  const errorElement = formsElement.querySelector(`#${inputsElement.name}-error`);
  errorElement.textContent = inputsElement.validationMessage;
  errorElement.classList.add(obj.errorClass);
  inputsElement.classList.add(obj.inputTypeErrorClass);
}

function showError(formsElement, inputsElement, obj) {
  const errorElement = formsElement.querySelector(`#${inputsElement.name}-error`);
  inputsElement.classList.remove(obj.inputTypeErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
}

enableValidation(obj);