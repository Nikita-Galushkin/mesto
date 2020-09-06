import { openPhoto, textPhoto } from '../utils/constants.js';
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
  }

  openModals(link, name) {
    openPhoto.src = link;
    textPhoto.textContent = name;
    super.openModals();
  }
}