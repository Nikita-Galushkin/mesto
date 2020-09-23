import { Popup } from './Popup.js';

export class ConfirmPopup extends Popup {
  constructor(modalElement) {
    super(modalElement);
    this._confirmFormButton = this._modalElement.querySelector('.modal__button_type_confirm');
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmFormButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._removeElement();
    });
  }

  open(cardId, element, api) {
    this._cardId = cardId;
    this._elements = element;
    this._api = api
    super.open();
  }

  _removeElement() {
    this._api
      .removeCard(this._cardId)
      .then(() => this._elements.remove())
      .catch((err) => console.log(err))
      .finally(() => {
        this.close();
      });
  }
}