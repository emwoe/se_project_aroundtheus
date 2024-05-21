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

/* functions to create cards and event listeners within cards
I tried using querySelectorAll and forEach to select all of the buttons of a certain class,
but the event listeners lost their functionality for the new cards*/

function createCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageLink = data.link;
  const cardName = data.name;
  const templateName = cardElement.querySelector(".card__name");
  const templateImg = cardElement.querySelector(".card__image");
  templateName.textContent = cardName;
  templateImg.src = cardImageLink;
  templateImg.alt = cardName;
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
}

cardArea.addEventListener("click", (evt) => {
  const eventTarget = evt.target;
  if (eventTarget.classList.contains("card__heart")) {
    eventTarget.classList.toggle("card__heart-option-liked");
  }
  if (eventTarget.classList.contains("card__delete-btn")) {
    eventTarget.closest(".card").remove();
  }
  if (eventTarget.classList.contains("card__image")) {
    imagePopOut = eventTarget.cloneNode(true);
    imagePopOut.classList.add("card__image_option_pop-out");
    imagePopOut.classList.remove("card__image");
    cardImagePopOut.classList.add("modal_opened");
    cardImagePopOutWrapper.prepend(imagePopOut);
    cardImagePopOutCaption.textContent = imagePopOut.alt;
  }
});

/* Create other event listeners */

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
  imagePopOut.remove();
  imageCaption.remove();
}

/* function to handle profile edit */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileJob.textContent = modalJob.value;
  closePopUp(modalProfile);
}
