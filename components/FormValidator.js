export default class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
  }

  toggleButtonState(/*inputList, buttonElement, validationConfig*/) {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(
        this._validationConfig.inactiveButtonClass
      );
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners(form) {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._validationConfig.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._validationConfig.submitButtonSelector
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log("Input made!");
        console.log(inputElement);
        this._checkInputValidity(inputElement);

        this.toggleButtonState(
          this._inputList,
          this._buttonElement,
          this._validationConfig
        );
      });
    });
  }

  _hasInvalidInput(inputList) {
    console.log("Running hasValidInput");
    console.log(this._inputList);
    return this._inputList.some((inputElement) => {
      console.log(inputElement);
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    console.log("Running checkInputValidity on" + inputElement);
    console.log(inputElement);
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

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form, this._validationConfig);
  }
}
