const initialCards = [
  {
    name: "Austin",
    link: "https://unsplash.com/photos/river-near-buildings-during-daytime-wKfTNWaDYgs",
  },
  {
    name: "New York",
    link: "https://unsplash.com/photos/cars-parked-near-brown-building-wOj5odhDOZ0",
  },
  {
    name: "San Francisco",
    link: "https://unsplash.com/photos/san-franciscos-downhill-winding-street-AFlG5jpMvYg",
  },

  {
    name: "Kansas City",
    link: "https://unsplash.com/photos/a-beautiful-shot-of-union-station-and-sky-scrappers-against-dusk-sky-in-kansas-city-missouri-united-states-1mOYmtdufmo",
  },
  {
    name: "Chicago",
    link: "https://unsplash.com/photos/photo-of-high-rise-building-tnv84LOjes4",
  },
  {
    name: "Atlanta",
    link: "https://unsplash.com/photos/a-vertical-drone-view-of-the-downtown-atlanta-with-modern-buildings-and-a-large-green-park-georgia-AfnosnmGhtA",
  },
];

let modalBox = document.querySelector(".modal");
let modalEditBtn = document.querySelector(".info__button");
let modalCloseBtn = document.querySelector(".modal__close-button");

function modalOpen() {
  modalBox.classList.remove("modal");
  modalBox.classList.add("modal_opened");
}

function modalClose() {
  modalBox.classList.add("modal");
  modalBox.classList.remove("modal_opened");
}

modalEditBtn.addEventListener("click", modalOpen);
modalCloseBtn.addEventListener("click", modalClose);
