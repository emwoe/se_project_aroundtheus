import Popup from "./Popup.js";
import { modalImageTitle, modalImageLink } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, buttonText }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._buttonText = buttonText;
    this._modalForm = this._popupModal.querySelector(".modal__container");
    this._modalInputs = this._popupModal.querySelectorAll(".modal__input");
    this._submitBtn = this._modalForm.querySelector(".modal__save-button");
    this.submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._modalInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(data) {
    this._modalInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
    super.setEventListeners();
  }

  renderSaving(isSaving, savingText = "Saving...") {
    if (isSaving) {
      this._submitBtn.textContent = savingText;
    } else {
      this._submitBtn.textContent = this._buttonText;
    }
  }
}
