import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupModal = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._popupModal.querySelector(".modal__container");
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  _getInputValues() {}

  setEventListeners() {
    this._modalForm.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}
