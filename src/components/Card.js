export class Card {
  constructor({ data, handleCardClick , handleRemoveClick, api, myId }, elementTemplate) {
    this._link = data.link;
    this._name = data.name;
    this._likeCounter = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._api = api;
    this._myId = myId;
    this._elementTemplate = elementTemplate;
  }
  
  newCard() {
    this._view = this._creteCardTemplate();
    const elementImage = this._view.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._view.querySelector('.element__title').textContent = this._name;
    this._view.querySelector('.element__counter').textContent = this._likeCounter.length;
    this._setEventListeners();

    if (this._ownerId === this._myId) {
      this._view.querySelector('.element__trash').classList.add('element__trash_active');
    }

    this.isLike();
    // this._likeCounter.some((item) => {
    //   if (item._id === this._myId) {
    //       this._view.querySelector('.element__group').classList.add('element__group_active')
    //   }
    // })

    return this._view;
  }

  isLike() {
    this._likeCounter.some((item) => {
      if (item._id === this._myId) {
          this._view.querySelector('.element__group').classList.add('element__group_active')
      }
    });
  }

  _creteCardTemplate() {
    return document.querySelector(this._elementTemplate).content.querySelector('.element').cloneNode(true);
  }

  _setEventListeners() {
    const elementPhoto = this._view.querySelector('.element__photo');
    this._view.querySelector('.element__group').addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });
    this._view.querySelector('.element__trash').addEventListener('click', () => {
      this._handleRemoveClick(this._cardId, this._view, this._api);
    });
    elementPhoto.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _toggleLike(data) {
    this._view.querySelector('.element__counter').textContent = data.likes.length;
    this._view.querySelector('.element__group').classList.toggle('element__group_active')
  }

  _handleLikeClick(evt) {
    if (!evt.target.classList.contains('element__group_active')) {
      this._api.addLikeCard(this._cardId)
        .then((data) => {
          this._toggleLike(data);
        })
        .catch((err) => console.log(err));
    } else {
      this._api.removeLikeCard(this._cardId)
        .then((data) => {
          this._toggleLike(data);
        })
        .catch((err) => console.log(err));
    }
  }
}