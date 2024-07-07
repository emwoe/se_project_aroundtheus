import Popup from "./Popup.js";
import { modalImageTitle, modalImageLink } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._popupModal.querySelector(".modal__container");
    this._modalInputs = this._popupModal.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const formValues = {};
    this._modalInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
