export default class Popup {
  constructor({ popupSelector }) {
    this._popupModal = document.querySelector(popupSelector);
    this._popupModalCloseBtn = this._popupModal.querySelector(
      ".modal__close-button"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._addEscEventListener();
    this._popupModal.classList.add("modal_opened");
  }

  close() {
    this._popupModal.classList.remove("modal_opened");
    this._removeEscEventListener();
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
    this._popupModal.addEventListener(
      "click",
      this._handleRemoteClick.bind(this)
    );
  }

  _addEscEventListener() {
    document.addEventListener("keydown", this._handleEscClose, false);
    console.log("Listener added!");
  }
  _removeEscEventListener() {
    document.removeEventListener("keydown", this._handleEscClose, false);
    console.log("Listener removed!");
  }
}
