import { Popup } from './Popup.js';

export class ConfirmPopup extends Popup {
  constructor(modalSelector, renderLoading) {
    super(modalSelector);
    this._renderLoading = renderLoading;
    this._confirmFormButton = this._modalSelector.querySelector('.modal__button_type_confirm');
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
    this._renderLoading(this._confirmFormButton, true, 'Удаление...');
    this._api
      .removeCard(this._cardId)
      .then(() => this._elements.remove())
      .finally(() => {
        this.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this._renderLoading(this._confirmFormButton, false, 'Да');
      });
    this.close();
  }
}