export class Card {
  constructor({ data, handleCardClick }, elementTemplate) {
    this._link = data.link;
    this._name = data.name;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
  }
  
  newCard() {
    this._view = this._creteCardTemplate();
    const elementImage = this._view.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._view.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._view;
  }

  _creteCardTemplate() {
    return document.querySelector(this._elementTemplate).content.querySelector('.element').cloneNode(true);
  }

  _setEventListeners() {
    const elementPhoto = this._view.querySelector('.element__photo');
    this._view.querySelector('.element__group').addEventListener('click', () => {
      this._toggleLike()
    });
    this._view.querySelector('.element__trash').addEventListener('click', () => {
      this._removeElement();
    });
    elementPhoto.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _toggleLike() {
    this._view.querySelector('.element__group').classList.toggle('element__group_active');
  }

  _removeElement() {
    this._view.remove();
  }
}