export default class Popup {
  constructor({ popupSelector }) {
    this._popupModal = document.querySelector(popupSelector);
    this._popupModalCloseBtn = this._popupModal.querySelector(
      ".modal__close-button"
    );
  }

  close() {
    this._popupModal.classList.remove("modal_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleRemoteClick(evt) {
    if (evt.target === evt.currentTarget) {
      console.log(evt.target);
      this.close();
    }
  }

  setEventListeners() {
    this._popupModalCloseBtn.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popupModal.addEventListener(
      "click",
      this._handleRemoteClick.bind(this)
    );
  }
}
