export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return { name: this._userName.textContent, job: this._userJob.textContent };
  }

  setUserInfo() {
    const modalName = document.querySelector("#name");
    const modalJob = document.querySelector("#job-description");
    this._userName.textContent = modalName.value;
    this._userJob.textContent = modalJob.value;
  }
}
