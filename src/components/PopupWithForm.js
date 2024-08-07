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
    console.log("Form values:", formValues);
    return formValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      console.log("Input values before submit:", inputValues);
      this._handleFormSubmit(inputValues);
    });
    super.setEventListeners();
  }
}
