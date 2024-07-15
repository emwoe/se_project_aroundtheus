export default class Api {
  constructor() {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "34ba410c-a4f9-4189-8d1e-4545749c88e4",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  fetchUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "34ba410c-a4f9-4189-8d1e-4545749c88e4",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editUserInfo(newUserInput) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "34ba410c-a4f9-4189-8d1e-4545749c88e4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUserInput.name,
        about: newUserInput.job,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard(newCardInput) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "34ba410c-a4f9-4189-8d1e-4545749c88e4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCardInput.name,
        link: newCardInput.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  loadPageResults() {
    return Promise.all([this.getInitialCards(), this.fetchUserInfo()]);
  }
}
