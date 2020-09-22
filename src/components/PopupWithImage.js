import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(modalSelector, photo, text) {
    super(modalSelector);
    this._openPhoto = photo;
    this._textPhoto = text;
  }

  open(link, name) {
    this._openPhoto.src = link;
    this._openPhoto.alt = name;
    this._textPhoto.textContent = name;
    super.open();
  }
}