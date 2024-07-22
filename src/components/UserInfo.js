export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, profilePictureSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userProfilePicture = document.querySelector(profilePictureSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      /*
      avatar: this._userProfilePicture.src,
      */
    };
  }

  getUserPictureLink() {
    return {
      avatar: this._userProfilePicture.src,
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.job;
    /*
    this._userProfilePicture.src = data.avatar;
    */
  }

  setUserPicture(data) {
    this._userProfilePicture.src = data.avatar;
  }
}
