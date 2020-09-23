import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(modalElement) {
    super(modalElement);
    this._openPhoto = this._modalElement.querySelector('.modal__photo');
    this._textPhoto = this._modalElement.querySelector('.modal__text');;
  }

  open(link, name) {
    this._openPhoto.src = link;
    this._openPhoto.alt = name;
    this._textPhoto.textContent = name;
    super.open();
  }
}