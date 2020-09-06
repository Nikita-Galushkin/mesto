export class UserInfo {
  constructor({ nameText, professionText }) {
    this._nameText = nameText;
    this._professionText = professionText;
  }

  getUserInfo() {
    const authorInfo = {
      name: this._nameText.textContent,
      profession: this._professionText.textContent
    }
    return authorInfo;
  }

  setUserInfo({ name, profession }) {
    this._nameText.textContent = name;
    this._professionText.textContent = profession;
  }
}