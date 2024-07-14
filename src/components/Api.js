export default class Api {
  constructor() {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "34ba410c-a4f9-4189-8d1e-4545749c88e4",
        "Content-Type": "application/jason",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  fetchUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards/me", {
      headers: {
        authorization: "34ba410c-a4f9-4189-8d1e-4545749c88e4",
        "Content-Type": "application/jason",
      },
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
