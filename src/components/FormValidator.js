export default class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._validationConfig.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._validationConfig.submitButtonSelector
    );
  }

  _disableButton() {
    this._buttonElement.classList.add(
      this._validationConfig.inactiveButtonClass
    );
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(
      this._validationConfig.inactiveButtonClass
    );
    this._buttonElement.disabled = false;
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._disableButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log("Input made!");
        console.log(inputElement);
        this._checkInputValidity(inputElement);

        this.toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        this._form,
        inputElement.validationMessage,
        this._validationConfig
      );
    } else {
      this._hideInputError(inputElement, this._form, this._validationConfig);
    }
  }

  _showInputError(inputElement, form, errorMessage, validationConfig) {
    this._errorElement = this._form.querySelector(
      `.${inputElement.id}${this._validationConfig.errorMessageSelectorSuffix}`
    );

    inputElement.classList.add(this._validationConfig.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(inputElement, formElement, validationConfig) {
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    this._errorElement = this._form.querySelector(
      `.${inputElement.id}${this._validationConfig.errorMessageSelectorSuffix}`
    );
    this._errorElement.classList.remove(this._validationConfig.errorClass);
    this._errorElement.textContent = "";
  }

  resetValidation() {
    this._disableButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
