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

let cardArea = document.querySelector(".elements");

let cardTemplate = document.querySelector("#localeCard").content;

function createCardTemplate() {
  cardElement = cardTemplate.querySelector(".card").cloneNode(true);
}

function getCardElement() {
  for (i = 0; i < initialCards.length; i++) {
    createCardTemplate();
    let cardImageLink = initialCards[i].link;
    let cardName = initialCards[i].name;
    cardElement.querySelector(".card__name").textContent = cardName;
    cardElement.querySelector(".card__image").src = cardImageLink;
    cardElement.querySelector(".card__image").alt = cardName;
    cardArea.append(cardElement);
  }
}
getCardElement();

const modalBox = document.querySelector(".modal");
const modalEditBtn = document.querySelector(".info__button");
const modalCloseBtn = document.querySelector(".modal__close-button");
const modalForm = document.querySelector(".modal__container");

const profileName = document.querySelector(".info__name");
const modalName = document.querySelector(".modal__name");
const profileJob = document.querySelector(".info__job-title");
const modalJob = document.querySelector(".modal__job");

function modalOpen() {
  modalBox.classList.add("modal_opened");
  modalName.value = profileName.textContent;
  modalJob.value = profileJob.textContent;
}

function modalClose(evt) {
  evt.preventDefault();
  modalBox.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileJob.textContent = modalJob.value;
  modalBox.classList.add("modal");
  modalBox.classList.remove("modal_opened");
}

modalEditBtn.addEventListener("click", modalOpen);
modalCloseBtn.addEventListener("click", modalClose);
modalForm.addEventListener("submit", handleProfileFormSubmit);
