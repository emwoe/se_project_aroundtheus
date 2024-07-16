export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteBtn,
    handleLikeBtn
  ) {
    this._cardSelector = cardSelector;
    this.data = data;
    this._handleImageClick = handleImageClick;
    this._handleDeleteBtn = handleDeleteBtn;
    this._handleLikeBtn = handleLikeBtn;
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
      cardHeart.classList.toggle("card__heart-option-liked");
      this._handleLikeBtn();
    });
    cardDeleteBtn.addEventListener("click", () => {
      this._handleDeleteBtn(this);
    });
    const cardImageElement = this._cardElement.querySelector(".card__image");
    cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /*
  _handleLikeBtn() {
    this._cardElement
      .querySelector(".card__heart")
      .classList.toggle("card__heart-option-liked");
  }
  */
}
