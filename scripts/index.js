const initialCards = [
  {
    name: "Austin",
    link: "images/card-images/Austin.jpg",
  },
  {
    name: "New York",
    link: "images/card-images/NewYork.jpg",
  },
  {
    name: "San Francisco",
    link: "images/card-images/SanFran.jpg",
  },

  {
    name: "Kansas City",
    link: "images/card-images/KansasCity.jpg",
  },
  {
    name: "Chicago",
    link: "images/card-images/Chicago.jpg",
  },
  {
    name: "Atlanta",
    link: "images/card-images/Atlanta.jpg",
  },
];
/* consts to define DOM elements */

const cardArea = document.querySelector(".elements");
const cardTemplate = document.querySelector("#localeCard").content;

const modalProfile = document.querySelector(".modal_type_profile");
const modalProfileEditBtn = document.querySelector(".info__button");
const modalProfileCloseBtn = modalProfile.querySelector(".modal__close-button");
const modalProfileForm = modalProfile.querySelector(".modal__container");

const modalImage = document.querySelector(".modal_type_new-image");
const modalImageEditBtn = document.querySelector(".profile__button");
const modalImageCloseBtn = modalImage.querySelector(".modal__close-button");
const modalImageForm = modalImage.querySelector(".modal__container");

const profileName = document.querySelector(".info__name");
const modalName = document.querySelector("#name");
const profileJob = document.querySelector(".info__job-title");
const modalJob = document.querySelector("#job-description");

const modalImageTitle = document.querySelector("#title");
const modalImageLink = document.querySelector("#image-link");

const cardImages = document.querySelectorAll(".card__image");
const cardImagePopOut = document.querySelector(".modal_type_image-pop-out");
const cardImagePopOutWrapper = document.querySelector(
  ".modal__wrapper_type_image-pop-out"
);
const cardImagePopOutCloseBtn = document.querySelector(
  ".modal__close-button_type-image-pop-out"
);
const cardImagePopOutCaption = document.querySelector(".card__pop-out_caption");

/* functions to create cards */

function createCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageLink = data.link;
  const cardName = data.name;
  const templateName = cardElement.querySelector(".card__name");
  const templateImg = cardElement.querySelector(".card__image");
  const templateHeart = cardElement.querySelector(".card__heart");
  const templateDltBtn = cardElement.querySelector(".card__delete-btn");
  templateName.textContent = cardName;
  templateImg.src = cardImageLink;
  templateImg.alt = cardName;
  templateImg.addEventListener("click", openModalImage);
  templateHeart.addEventListener("click", handleCardHeart);
  templateDltBtn.addEventListener("click", deleteCard);
  return cardElement;
}

initialCards.forEach(function (data) {
  const cardElement = createCardElement(data);
  cardArea.prepend(cardElement);
});

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const newData = {};
  newData.name = modalImageTitle.value;
  newData.link = modalImageLink.value;
  const newCard = createCardElement(newData);
  cardArea.prepend(newCard);
  modalImageTitle.value = "";
  modalImageLink.value = "";
  const imgFormSubmitBtn = modalImageForm.querySelector(".modal__save-button");
  imgFormSubmitBtn.disabled = true;
  imgFormSubmitBtn.classList.add("form__button_inactive");
  closePopUp(modalImage);
}
/* functions for card event listeners */

function handleCardHeart(evt) {
  evt.target.classList.toggle("card__heart-option-liked");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function openModalImage(evt) {
  const imagePopOut = document.querySelector(".card__image_option_pop-out");
  imagePopOut.src = evt.target.src;
  imagePopOut.alt = evt.target.alt;
  cardImagePopOutCaption.textContent = evt.target.alt;
  openPopUp(cardImagePopOut);
}

/* create other event listeners */

cardImagePopOutCloseBtn.addEventListener("click", closeImagePopOut);

modalProfileEditBtn.addEventListener("click", openProfileModal);
modalProfileCloseBtn.addEventListener("click", closeProfileModal);
modalProfileForm.addEventListener("submit", handleProfileFormSubmit);

modalImageEditBtn.addEventListener("click", openImageModal);
modalImageCloseBtn.addEventListener("click", closeImageModal);
modalImageForm.addEventListener("submit", handleImageFormSubmit);

/* functions to open and close pop-ups */

function openPopUp(elem) {
  elem.classList.add("modal_opened");
}

function closePopUp(elem) {
  elem.classList.remove("modal_opened");
}

function openProfileModal() {
  openPopUp(modalProfile);
  modalName.value = profileName.textContent;
  modalJob.value = profileJob.textContent;
  const profileSaveBtn = modalProfileForm.querySelector(".modal__save-button");
  profileSaveBtn.disabled = false;
  profileSaveBtn.classList.remove("form__button_inactive");
}

function openImageModal() {
  openPopUp(modalImage);
}

function closeProfileModal(evt) {
  closePopUp(modalProfile);
}

function closeImageModal(evt) {
  closePopUp(modalImage);
}

function closeImagePopOut(evt) {
  closePopUp(cardImagePopOut);
}

/* Allow users to click anywhere outside of modal or press ESC to close modal */

function stopBubble(evt) {
  evt.stopPropagation();
}

function setClickListenersToClose() {
  const modalList = Array.from(document.querySelectorAll(".modal"));
  const modalWrapperList = Array.from(
    document.querySelectorAll(".modal__wrapper")
  );
  modalList.forEach((modalElement) => {
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        modalElement.classList.remove("modal_opened");
      }
    });

    modalElement.addEventListener("click", () => {
      modalElement.classList.remove("modal_opened");
    });
  });
  modalWrapperList.forEach((modalWrapperElement) => {
    modalWrapperElement.addEventListener("click", stopBubble);
  });
}

setClickListenersToClose();

/* function to handle profile edit */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileJob.textContent = modalJob.value;
  closePopUp(modalProfile);
}

/* Validate forms */

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("form__button_inactive");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__save-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
