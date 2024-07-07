export const AustinImage = new URL(
  "../images/card-images/Austin.jpg",
  import.meta.url
);
export const NYCImage = new URL(
  "../images/card-images/NewYork.jpg",
  import.meta.url
);
export const SanFranImage = new URL(
  "../images/card-images/SanFran.jpg",
  import.meta.url
);
export const KCityImage = new URL(
  "../images/card-images/KansasCity.jpg",
  import.meta.url
);
export const ChicagoImage = new URL(
  "../images/card-images/Chicago.jpg",
  import.meta.url
);
export const ATLImage = new URL(
  "../images/card-images/Atlanta.jpg",
  import.meta.url
);

export const initialCards = [
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

export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
  errorMessageSelectorSuffix: "-input-error",
};

export const formList = Array.from(document.querySelectorAll(".form"));
export const modalProfile = document.querySelector(".modal_type_profile");
export const modalProfileEditBtn = document.querySelector(".info__button");
export const modalProfileCloseBtn = modalProfile.querySelector(
  ".modal__close-button"
);
export const modalProfileForm = modalProfile.querySelector(".modal__container");
export const modalProfileSaveBtn = modalProfile.querySelector(
  ".modal__save-button"
);

export const modalImage = document.querySelector(".modal_type_new-image");
export const modalImageEditBtn = document.querySelector(".profile__button");
export const modalImageCloseBtn = modalImage.querySelector(
  ".modal__close-button"
);
export const modalImageForm = modalImage.querySelector(".modal__container");

export const profileName = document.querySelector(".info__name");
export const modalName = document.querySelector("#name");
export const profileJob = document.querySelector(".info__job-title");
export const modalJob = document.querySelector("#job-description");

export const modalImageTitle = document.querySelector("#title");
export const modalImageLink = document.querySelector("#image-link");

export const cardImages = document.querySelectorAll(".card__image");

export const cardImagePopOutWrapper = document.querySelector(
  ".modal__wrapper_type_image-pop-out"
);
export const cardImagePopOutCloseBtn = document.querySelector(
  ".modal__close-button_type-image-pop-out"
);
export const cardImagePopOutCaption = document.querySelector(
  ".card__pop-out_caption"
);
