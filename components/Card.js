export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._cardSelector = cardSelector;
    this.data = data;
    this._handleImageClick = handleImageClick;
  }
  _getTemplate() {
    this._cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardTemplate;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__name").textContent = this.data.name;
    this._cardElement.querySelector(".card__image").src = this.data.link;
    this._cardElement.querySelector(".card__image").alt = this.data.name;

    return this._cardElement;
  }

  _setEventListeners() {
    const cardHeart = this._cardElement.querySelector(".card__heart");
    const cardDeleteBtn = this._cardElement.querySelector(".card__delete-btn");
    cardHeart.addEventListener("click", () => {
      this._handleLikeBtn();
    });
    cardDeleteBtn.addEventListener("click", () => {
      this._handleDeleteBtn();
    });
    const cardImageElement = this._cardElement.querySelector(".card__image");
    cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleDeleteBtn() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeBtn() {
    this._cardElement
      .querySelector(".card__heart")
      .classList.toggle("card__heart-option-liked");
  }
}
