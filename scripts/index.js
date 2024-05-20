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

const cardArea = document.querySelector(".elements");
const cardTemplate = document.querySelector("#localeCard").content;

function createCardElement(data) {
  cardElement = cardTemplate.querySelector(".card").cloneNode(true);
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

function openProfileModal() {
  modalProfile.classList.add("modal_opened");
  modalName.value = profileName.textContent;
  modalJob.value = profileJob.textContent;
}

function openImageModal() {
  modalImage.classList.add("modal_opened");
}

function closeProfileModal(evt) {
  modalProfile.classList.remove("modal_opened");
}

function closeImageModal(evt) {
  modalImage.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileJob.textContent = modalJob.value;
  closeProfileModal();
}

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  let newData = {};
  newData.name = modalImageTitle.value;
  newData.link = modalImageLink.value;
  const newCard = createCardElement(newData);
  cardArea.prepend(newCard);
  closeImageModal();
}
const cardImages = document.querySelectorAll(".card__image");
const cardImagePopOut = document.querySelector(".modal_type_image-pop-out");
const cardImagePopOutWrapper = document.querySelector(
  ".modal__wrapper_type_image-pop-out"
);
const cardImagePopOutCloseBtn = document.querySelector(
  ".modal__close-button_type-image-pop-out"
);
const imageCaption = document.createElement("p");

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
    cardImagePopOutWrapper.append(imagePopOut);
    imageCaption.textContent = imagePopOut.alt;
    imageCaption.classList.add("card__pop-out_caption");
    cardImagePopOutWrapper.append(imageCaption);
  }
});

function closeImagePopOut(evt) {
  cardImagePopOut.classList.toggle("modal_opened");
  imagePopOut.remove();
  imageCaption.remove();
}

cardImagePopOutCloseBtn.addEventListener("click", closeImagePopOut);

modalProfileEditBtn.addEventListener("click", openProfileModal);
modalProfileCloseBtn.addEventListener("click", closeProfileModal);
modalProfileForm.addEventListener("submit", handleProfileFormSubmit);

modalImageEditBtn.addEventListener("click", openImageModal);
modalImageCloseBtn.addEventListener("click", closeImageModal);
modalImageForm.addEventListener("submit", handleImageFormSubmit);
