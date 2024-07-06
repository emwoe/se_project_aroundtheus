import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const AustinImage = new URL(
  "../images/card-images/Austin.jpg",
  import.meta.url
);
const NYCImage = new URL("../images/card-images/NewYork.jpg", import.meta.url);
const SanFranImage = new URL(
  "../images/card-images/SanFran.jpg",
  import.meta.url
);
const KCityImage = new URL(
  "../images/card-images/KansasCity.jpg",
  import.meta.url
);
const ChicagoImage = new URL(
  "../images/card-images/Chicago.jpg",
  import.meta.url
);
const ATLImage = new URL("../images/card-images/Atlanta.jpg", import.meta.url);

const initialCards = [
  {
    name: "Austin",
    link: AustinImage,
  },
  {
    name: "New York",
    link: NYCImage,
  },
  {
    name: "San Francisco",
    link: SanFranImage,
  },

  {
    name: "Kansas City",
    link: KCityImage,
  },
  {
    name: "Chicago",
    link: ChicagoImage,
  },
  {
    name: "Atlanta",
    link: ATLImage,
  },
];

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

const firstCards = new Section(
  { items: initialCards, renderer: createCard },
  ".elements"
);
firstCards.renderItems();

const newUserInfo = new UserInfo({
  userNameSelector: ".info__name",
  userJobSelector: ".info__job-title",
});

const profileModal = new PopupWithForm({
  popupSelector: ".modal_type_profile",
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    newUserInfo.setUserInfo();
    profileModal.close();
  },
});
const newImageModal = new PopupWithForm({
  popupSelector: ".modal_type_new-image",
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    const newData = {};
    newData.name = modalImageTitle.value;
    newData.link = modalImageLink.value;
    const addedCard = createCard(newData);
    firstCards.addItem(addedCard);
    modalImageForm.reset();
    newImageValidator.resetValidation();
    newImageModal.close();
  },
});

function openModalImage(card) {
  console.log(card.data.link);
  const cardPopOut = new PopupWithImage({
    popupSelector: ".modal_type_image-pop-out",
    imageSelector: ".card__image_option_pop-out",
  });
  cardPopOut.setEventListeners();
  cardPopOut.open(card.data.name, card.data.link);
}

modalProfileEditBtn.addEventListener("click", () => {
  profileModal.open();
  const data = newUserInfo.getUserInfo();
  console.log(data);
  modalName.value = data.name;
  modalJob.value = data.job;
  profileValidator.resetValidation();
});

modalImageEditBtn.addEventListener("click", () => {
  newImageValidator.resetValidation();
  newImageModal.open();
});

profileModal.setEventListeners();
newImageModal.setEventListeners();

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
