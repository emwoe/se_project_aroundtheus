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
      body: JSON.stringify({ isLiked: true }),
    });
  }

  removeLike(cardId) {
    return this._serverRequest(`${this._apiAddress}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._apiHeaders,
      body: JSON.stringify({ isLiked: false }),
    });
  }

  checkCardStatus(cardId) {
    return this._serverRequest(`${this._apiAddress}/cards`, {
      headers: this._apiHeaders,
    });
  }

  /*
  saveLikedStatus(cardId) {
    return this._serverRequest(`${this._apiAddress}/cards/${cardId}`, {
      method: "PATCH",
      headers: this._apiHeaders,
      body: JSON.stringify({ isLiked: true }),
    });
  }
 

  saveLikedStatus(cardId) {
    const url = `${this._apiAddress}/cards/${cardId}`;
    console.log("Making PATCH request to URL:", url); // Output the full URL to console
    return this._serverRequest(url, {
      method: "PATCH",
      headers: {
        ...this._apiHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLiked: true }),
    }).catch((error) => {
      console.error("Error updating card like status:", error);
    });
  }
  */

  saveUnlikedStatus(cardId) {
    return this._serverRequest(`${this._apiAddress}/cards/${cardId}`, {
      method: "PATCH",
      headers: this._apiHeaders,
      body: JSON.stringify({ isLiked: false }),
    });
  }

  loadPageResults() {
    return Promise.all([this.getInitialCards(), this.fetchUserInfo()]);
  }
}
