import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
const cardArea = document.querySelector(".elements");
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

const imagePopOut = document.querySelector(".card__image_option_pop-out");
const formList = Array.from(document.querySelectorAll(".form"));
const modalProfile = document.querySelector(".modal_type_profile");
const modalProfileEditBtn = document.querySelector(".info__button");
const modalProfileCloseBtn = modalProfile.querySelector(".modal__close-button");
const modalProfileForm = modalProfile.querySelector(".modal__container");
const modalProfileSaveBtn = modalProfile.querySelector(".modal__save-button");

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

function createCard(item) {
  const card = new Card(item, "#localeCard", openModalImage);
  return card.generateCard();
}

initialCards.forEach((item) => {
  const newCard = createCard(item);
  cardArea.prepend(newCard);
});

/* enable Validation */

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
  errorMessageSelectorSuffix: "-input-error",
};

const profileValidator = new FormValidator(validationConfig, modalProfileForm);
const newImageValidator = new FormValidator(validationConfig, modalImageForm);

profileValidator.enableValidation();
newImageValidator.enableValidation();
newImageValidator.resetValidation();

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const newData = {};
  newData.name = modalImageTitle.value;
  newData.link = modalImageLink.value;
  const addedCard = createCard(newData);
  cardArea.prepend(addedCard);
  modalImageForm.reset();
  newImageValidator.resetValidation();
  closePopUp(modalImage);
}

function openModalImage(card) {
  imagePopOut.src = card.data.link;
  imagePopOut.alt = card.data.name;
  cardImagePopOutCaption.textContent = card.data.name;
  openPopUp(cardImagePopOut);
}

/* create other event listeners */

const closeBtns = document.querySelectorAll(".modal__close-button");
closeBtns.forEach((btn) => {
  const popup = btn.closest(".modal");
  btn.addEventListener("click", () => closePopUp(popup));
});

modalProfileEditBtn.addEventListener("click", openProfileModal);
modalProfileForm.addEventListener("submit", handleProfileFormSubmit);
modalImageEditBtn.addEventListener("click", openImageModal);
modalImageForm.addEventListener("submit", handleImageFormSubmit);

/* functions to open and close pop-ups */

function openPopUp(elem) {
  elem.classList.add("modal_opened");
  elem.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalByEscape);
}

function closePopUp(elem) {
  elem.classList.remove("modal_opened");
  elem.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalByEscape);
}

function openProfileModal() {
  modalName.value = profileName.textContent;
  modalJob.value = profileJob.textContent;
  openPopUp(modalProfile);
}

function openImageModal() {
  openPopUp(modalImage);
}

/* Allow users to click anywhere outside of modal or press ESC to close modal */

function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopUp(openedModal);
  }
}

function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopUp(evt.currentTarget);
    console.log("15");
  }
}

/* function to handle profile edit */

function handleProfileFormSubmit(evt) {
  console.log("Registered submit");
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileJob.textContent = modalJob.value;
  closePopUp(modalProfile);
  profileValidator.resetValidation();
}
