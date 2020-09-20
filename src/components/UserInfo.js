export class UserInfo {
  constructor({ nameText, aboutText, api }) {
    this._nameText = nameText;
    this._aboutText = aboutText;
    this._avatarImage = document.querySelector('.profile__image');
    this._api = api;
  }

  setUserInfo({ name, about }) {
    this._nameText.textContent = name;
    this._aboutText.textContent = about;
  }

  setUserAvatar(avatarLink) {
    this._avatarImage.src = avatarLink;
  }

  getUserInfo() {
    const authorInfo = {
      name: this._nameText.textContent,
      about: this._aboutText.textContent
    }
    return authorInfo;
  }

  getUserProfile() {
    return this._api.getUserInfo()
      .then((info) => {
        this._nameText.textContent = info.name;
        this._aboutText.textContent = info.about;
        this._avatarImage.src = info.avatar;
        return info._id;
      })
      .catch((err) => console.log(err));
  }
}