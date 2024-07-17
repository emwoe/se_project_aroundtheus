export default class Api {
  constructor({ apiAddress, apiHeaders }) {
    this._apiAddress = apiAddress;
    this._apiHeaders = apiHeaders;
  }

  _serverRequest(url, options) {
    return fetch(url, options).then(this.renderResult);
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards() {
    return this._serverRequest(`${this._apiAddress}/cards`, {
      headers: this._apiHeaders,
    });
  }

  fetchUserInfo() {
    return this._serverRequest(`${this._apiAddress}/users/me`, {
      headers: this._apiHeaders,
    });
  }

  editUserInfo(newUserInput) {
    return this._serverRequest(`${this._apiAddress}/users/me`, {
      method: "PATCH",
      headers: this._apiHeaders,
      body: JSON.stringify({
        name: newUserInput.name,
        about: newUserInput.job,
      }),
    });
  }

  editUserProfilePicture(newUserLink) {
    return this._serverRequest(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: this._apiHeaders,
        body: JSON.stringify({
          avatar: newUserLink.avatar,
        }),
      }
    );
  }

  addNewCard(newCardInput) {
    return this._serverRequest(`${this._apiAddress}/cards`, {
      method: "POST",
      headers: this._apiHeaders,
      body: JSON.stringify({
        name: newCardInput.name,
        link: newCardInput.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._serverRequest(`${this._apiAddress}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._apiHeaders,
    });
  }

  addLike(cardId) {
    return this._serverRequest(`${this._apiAddress}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._apiHeaders,
      /*
      body: JSON.stringify({ isLiked: true }),
      */
    });
  }

  removeLike(cardId) {
    return this._serverRequest(`${this._apiAddress}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._apiHeaders,
      /*
      body: JSON.stringify({ isLiked: false }),
      */
    });
  }

  checkCardsStatus() {
    return this._serverRequest(`${this._apiAddress}/cards`, {
      headers: this._apiHeaders,
    });
  }

  loadPageResults() {
    return Promise.all([this.getInitialCards(), this.fetchUserInfo()]);
  }
}
