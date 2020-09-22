export class UserInfo {
  constructor({ nameText, aboutText, avatarImage }) {
    this._nameText = nameText;
    this._aboutText = aboutText;
    this._avatarImage = avatarImage;
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
}