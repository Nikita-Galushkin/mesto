export class Popup {
  constructor(modalSelector) {
    this._modalSelector = modalSelector;
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.modal_opened');
        this.closeModals();
      } 
    };
    this._closeOnOverlay = (evt) => {
      const openedModal = document.querySelector('.modal_opened');
      if (evt.target === openedModal) {
        this.closeModals();
      } 
    };
  }

  openModals() {
    this._modalSelector.classList.add('modal_opened');
    this.setEventListeners();
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._closeOnOverlay);
  }

  closeModals() {
    this._modalSelector.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._closeOnOverlay);
  }

  setEventListeners() {
    this._modalSelector.querySelector('.modal__close-button').addEventListener('click', () => {
      this.closeModals();
    });
  }
}