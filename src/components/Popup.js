export class Popup {
  constructor(modalElement) {
    this._modalElement = modalElement;
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.modal_opened');
        this.close();
      } 
    };
    this._closeOnOverlay = (evt) => {
      const openedModal = document.querySelector('.modal_opened');
      if (evt.target === openedModal) {
        this.close();
      } 
    };
  }

  open() {
    this._modalElement.classList.add('modal_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._closeOnOverlay);
  }

  close() {
    this._modalElement.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._closeOnOverlay);
  }

  setEventListeners() {
    this._modalElement.querySelector('.modal__close-button').addEventListener('click', () => {
      this.close();
    });
  }
}