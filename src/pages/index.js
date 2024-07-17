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
  newProfileImageBtn,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupDelete";

let cardToDelete;
let readyToDelete;
let cardArea;
let likedCard;

//Get initial cards and user info from server

const api = new Api({
  apiAddress: "https://around-api.en.tripleten-services.com/v1",
  apiHeaders: {
    authorization: "34ba410c-a4f9-4189-8d1e-4545749c88e4",
    "Content-Type": "application/json",
  },
});

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

//Create cards and handle their buttons

function createCard(item) {
  const card = new Card(
    item,
    "#localeCard",
    openModalImage,
    handleDelete,
    handleLike
  );
  return card.generateCard();
}

const cardPopOut = new PopupWithImage({
  popupSelector: ".modal_type_image-pop-out",
  imageSelector: ".card__image_option_pop-out",
});

cardPopOut.setEventListeners();

const deleteCardModal = new PopupWithDelete({
  popupSelector: ".modal_type_delete-image",
  handleBtnClick: () => {
    console.log(cardToDelete.data._id);
    api.deleteCard(cardToDelete.data._id).then(cardToDelete.deleteCard());
    deleteCardModal.close();
  },
});

function handleDelete(card) {
  deleteCardModal.open();
  deleteCardModal.setEventListeners();
  cardToDelete = card;
}

//Question: why can't I pass 'card' as a param in handleLike below (as I did in handleDelete above?)

function handleLike() {
  api.checkCardsStatus();
  if (this.data.isLiked == false) {
    console.log("about to be liked!");
    api.addLike(this.data._id);
    this.data.isLiked = true;
    console.log(this.data.isLiked);
    console.log(this);
  } else {
    console.log("about to be unliked!");
    api.removeLike(this.data._id);
    this.data.isLiked = false;
    console.log(this.data.isLiked);
    console.log(this);
  }
  api.checkCardsStatus();
}

//Handle edit/add button clicks

modalProfileEditBtn.addEventListener("click", () => {
  profileModal.open();
  const data = newUserInfo.getUserInfo();
  console.log(data);
  modalName.value = data.name;
  modalJob.value = data.job;
  profileValidator.resetValidation();
});

newProfileImageBtn.addEventListener("click", () => {
  newProfilePictureModal.open();
  newProfilePictureModal.setEventListeners();
});

modalImageEditBtn.addEventListener("click", () => {
  newImageModal.open();
});

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

const newProfilePictureModal = new PopupWithForm({
  popupSelector: ".modal_type_change-profile-picture",
  handleFormSubmit: (formData) => {},
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
    modalImageForm.reset();
    newImageValidator.toggleButtonState();
    newImageModal.close();
  },
});

profileModal.setEventListeners();
newImageModal.setEventListeners();

function openModalImage(card) {
  cardPopOut.open(card.data.name, card.data.link);
}

/* enable Validation */

const profileValidator = new FormValidator(validationConfig, modalProfileForm);
const newImageValidator = new FormValidator(validationConfig, modalImageForm);

profileValidator.enableValidation();
newImageValidator.enableValidation();
