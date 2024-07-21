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
  modalNewPicture,
  newProfilePictureForm,
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
let cardID;

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
  profilePictureSelector: ".profile__circle",
});

api
  .loadPageResults()
  .then(([cards, userData]) => {
    cardArea = new Section({ items: cards, renderer: createCard }, ".elements");
    cardArea.renderItems();
    console.log(userData);
    newUserInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    newUserInfo.setUserPicture({ avatar: userData.avatar });
  })
  .catch((err) => {
    console.error(err);
  });

//Create cards and handle their like and delete buttons

function createCard(item) {
  const card = new Card(
    item,
    "#localeCard",
    openModalImage,
    handleDeleteClick,
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
    api
      .deleteCard(cardToDelete.data._id)
      .then(() => cardToDelete.deleteCard())
      .then(() => deleteCardModal.close())
      .catch((err) => {
        console.error(err);
      })
      .finally(() => deleteCardModal.renderSaving(false));
  },
  buttonText: "Yes",
});

deleteCardModal.setEventListeners();

function handleDeleteClick(card) {
  console.log(card);
  deleteCardModal.open();
  cardToDelete = card;
  return cardToDelete;
}

function handleLike(card) {
  cardID = card.getID();
  if (card.data.isLiked == false) {
    api
      .addLike(cardID)
      .then((card.data.isLiked = true))
      .then(() => card.toggleHeart())
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .removeLike(cardID)
      .then((card.data.isLiked = false))
      .then(() => card.toggleHeart())
      .catch((err) => {
        console.error(err);
      });
  }
}

//Handle edit/add button clicks

modalProfileEditBtn.addEventListener("click", () => {
  profileModal.open();
  const data = newUserInfo.getUserInfo();
  console.log(data);
  modalName.value = data.name;
  modalJob.value = data.job;
  formValidators["editProfile"].resetValidation;
});

newProfileImageBtn.addEventListener("click", () => {
  newProfilePictureModal.open();
});

modalImageEditBtn.addEventListener("click", () => {
  newImageModal.open();
});

//Form and Picture Modals

const profileModal = new PopupWithForm({
  popupSelector: ".modal_type_profile",
  handleFormSubmit: function handleProfileFormSubmit(formData) {
    function makeRequest() {
      return api.editUserInfo(formData).then((userData) => {
        newUserInfo.setUserInfo({ name: userData.name, job: userData.about });
      });
    }
    handleSubmit(makeRequest, profileModal);
  },
  buttonText: "Save",
});

const newProfilePictureModal = new PopupWithForm({
  popupSelector: ".modal_type_change-profile-picture",
  handleFormSubmit: function handleProfilePictureSubmit(formData) {
    function makeRequest() {
      return api.editUserProfilePicture(formData).then((userData) => {
        newUserInfo.setUserPicture({ avatar: userData.avatar });
      });
    }
    handleSubmit(makeRequest, newProfilePictureModal);
  },
  buttonText: "Save",
});

function handleNewPlaceSubmit(formData) {
  function makeRequest() {
    return api
      .addNewCard(formData)
      .then((cardData) => {
        return createCard(cardData);
      })
      .then((addedCard) => cardArea.addItem(addedCard))
      .then(() => modalImageForm.reset())
      .then(() => formValidators["newPlace"].toggleButtonState());
  }
  handleSubmit(makeRequest, newImageModal);
}

const newImageModal = new PopupWithForm({
  popupSelector: ".modal_type_new-image",
  handleFormSubmit: function handleNewPlaceSubmit(formData) {
    function makeRequest() {
      return api
        .addNewCard(formData)
        .then((cardData) => {
          return createCard(cardData);
        })
        .then((addedCard) => cardArea.addItem(addedCard))
        .then(() => modalImageForm.reset())
        .then(() => formValidators["newPlace"].toggleButtonState());
    }
    handleSubmit(makeRequest, newImageModal);
  },
  buttonText: "Create",
});

profileModal.setEventListeners();
newImageModal.setEventListeners();
newProfilePictureModal.setEventListeners();

function openModalImage(card) {
  cardPopOut.open(card.data.name, card.data.link);
}

//Universal submit handler

function handleSubmit(request, popupInstance, savingText = "Saving...") {
  popupInstance.renderSaving(true, savingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupInstance.renderSaving(false);
    });
}

/* enable Validation */

const formValidators = {};

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
