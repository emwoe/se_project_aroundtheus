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

function renderCardElements(data) {
  for (let i = 0; i < data.length; i++) {
    const cardElement = createCardElement(data[i]);
    cardArea.prepend(cardElement);
  }
}

renderCardElements(initialCards);

const modalBox = document.querySelector(".modal");
const modalEditBtn = document.querySelector(".info__button");
const modalCloseBtn = document.querySelector(".modal__close-button");
const modalForm = document.querySelector(".modal__container");

const profileName = document.querySelector(".info__name");
const modalName = document.querySelector("#name");
const profileJob = document.querySelector(".info__job-title");
const modalJob = document.querySelector("#job-description");

function openModal() {
  modalBox.classList.add("modal_opened");
  modalName.value = profileName.textContent;
  modalJob.value = profileJob.textContent;
}

function closeModal(evt) {
  modalBox.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileJob.textContent = modalJob.value;
  closeModal();
}

modalEditBtn.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);
modalForm.addEventListener("submit", handleProfileFormSubmit);
