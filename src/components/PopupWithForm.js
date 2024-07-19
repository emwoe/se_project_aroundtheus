import Popup from "./Popup.js";
import { modalImageTitle, modalImageLink } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, buttonText }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._buttonText = buttonText;
    this._modalForm = this._popupModal.querySelector(".modal__container");
    this._modalInputs = this._popupModal.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const formValues = {};
    this._modalInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    console.log("Form values:", formValues);
    return formValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this.renderSaving(true);
      this._handleFormSubmit(inputValues);
      /*
      this.renderSaving(false);
      */
    });
    super.setEventListeners();
  }

  stopSaving(popup) {
    popup._modalForm.querySelector(".modal__save-button").textContent =
      popup._buttonText;
    popup.close();
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this._modalForm.querySelector(".modal__save-button").textContent =
        "Saving...";
      console.log("Found _modalForm and saving");
    } else {
      /*
      console.log(this);
      */
      setTimeout(this.stopSaving, 1000, this);
    }
  }
}
