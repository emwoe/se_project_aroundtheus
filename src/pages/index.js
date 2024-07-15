import "./index.css";
import {
  AustinImage,
  NYCImage,
  SanFranImage,
  KCityImage,
  ChicagoImage,
  ATLImage,
  initialCards,
  validationConfig,
  modalProfileEditBtn,
  modalProfileForm,
  modalProfileSaveBtn,
  modalImageEditBtn,
  modalImageForm,
  modalName,
  modalJob,
  modalImageTitle,
  modalImageLink,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "34ba410c-a4f9-4189-8d1e-4545749c88e4",
    "Content-Type": "application/json",
  },
});
let cardArea;

const newUserInfo = new UserInfo({
  userNameSelector: ".info__name",
  userJobSelector: ".info__job-title",
});

api
  .loadPageResults()
  .then(([cards, userData]) => {
    cardArea = new Section({ items: cards, renderer: createCard }, ".elements");
    cardArea.renderItems();
    console.log(userData);
    newUserInfo.setUserInfo({ name: userData.name, job: userData.about });
  })
  .catch((err) => {
    console.error(err);
  });

const cardPopOut = new PopupWithImage({
  popupSelector: ".modal_type_image-pop-out",
  imageSelector: ".card__image_option_pop-out",
});

cardPopOut.setEventListeners();

function createCard(item) {
  const card = new Card(item, "#localeCard", openModalImage);
  return card.generateCard();
}

/*
const firstCards = new Section(
  { items: initialCards, renderer: createCard },
  ".elements"
);

firstCards.renderItems();


const newUserInfo = new UserInfo({
  userNameSelector: ".info__name",
  userJobSelector: ".info__job-title",
});
*/

const profileModal = new PopupWithForm({
  popupSelector: ".modal_type_profile",
  handleFormSubmit: (formData) => {
    api
      .editUserInfo(formData)
      .then((userData) => {
        newUserInfo.setUserInfo({ name: userData.name, job: userData.about });
      })
      .catch((err) => {
        console.error(err);
      });
    profileModal.close();
  },
});

const newImageModal = new PopupWithForm({
  popupSelector: ".modal_type_new-image",
  handleFormSubmit: (newData) => {
    api
      .addNewCard(newData)
      .then((cardData) => {
        return createCard(cardData);
      })
      .then((addedCard) => cardArea.addItem(addedCard))
      .catch((err) => {
        console.error(err);
      });
    /*
    const addedCard = createCard(newData);
    cardArea.addItem(addedCard);
    */
    modalImageForm.reset();
    newImageValidator.toggleButtonState();
    newImageModal.close();
  },
});

function openModalImage(card) {
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
  /*
  newImageValidator.resetValidation();
  */
  newImageModal.open();
});

profileModal.setEventListeners();
newImageModal.setEventListeners();

/* enable Validation */

const profileValidator = new FormValidator(validationConfig, modalProfileForm);
const newImageValidator = new FormValidator(validationConfig, modalImageForm);

profileValidator.enableValidation();
newImageValidator.enableValidation();
