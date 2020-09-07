import { openPhoto, textPhoto } from '../utils/elements.js';
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
  }

  open(link, name) {
    openPhoto.src = link;
    openPhoto.alt = name;
    textPhoto.textContent = name;
    super.open();
  }
}