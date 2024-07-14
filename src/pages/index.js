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

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  method: "POST",
  hearders: {
    authorization: "9a7bdd13-ee70-49fc-ae6f-a60d209f224e",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Berlin",
    link: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
});

//* Questions about the following code: Ignoring the 403 errors, it seems like this should pull the placeholder
//* information from the API, then create and render the cards from the initialCards data
//* (which is never posted to the server??), then create newUserInfo with the information
//* available on load --> but then would it reset the on-page user data to the PLACEHOLDER
//* data in the new, blank API?? It looks to me like the "[card, userData]" passed
//* in the api.loadPageResults() call is the api data requested (currently just placehold)
//* in the getInitialCards and fetchUserInfo requests in API.js?

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "34ba410c-a4f9-4189-8d1e-4545749c88e4",
    "Content-Type": "application/json",
  },
});
let firstCards;
let newUserInfo;

api.loadPageResults().then(([card, userData]) => {
  firstCards = new Section(
    { items: initialCards, renderer: createCard },
    ".elements"
  );
  firstCards.renderItems();
  newUserInfo = new UserInfo({
    userNameSelector: ".info__name",
    userJobSelector: ".info__job-title",
  });
  newUserInfo.setUserInfo({ name: userData.name, job: userData.job });
});

/*
api
  .getInitialCards()
  .then((result) => {
    return new Section({ items: result, renderer: createCard }, ".elements");
  })
  .catch((err) => {
    console.error(err);
  });
*/

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
    console.log(formData.name);
    console.log(formData.job);
    newUserInfo.setUserInfo({ name: formData.name, job: formData.job });
    profileModal.close();
  },
});

const newImageModal = new PopupWithForm({
  popupSelector: ".modal_type_new-image",
  handleFormSubmit: (newData) => {
    const addedCard = createCard(newData);
    firstCards.addItem(addedCard);
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
