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

  /*
  const cardHeart = this._cardElement.querySelector(".card__heart");
    const cardDeleteBtn = this._cardElement.querySelector(".card__delete-btn");
    */

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardHeart = this._cardElement.querySelector(".card__heart");
    this._setEventListeners();
    this._cardElement.querySelector(".card__name").textContent = this.data.name;
    this._cardElement.querySelector(".card__image").src = this.data.link;
    this._cardElement.querySelector(".card__image").alt = this.data.name;
    if (this.data.isLiked == true) {
      this._cardHeart.classList.add("card__heart-option-liked");
    } else {
      this._cardHeart.classList.remove("card__heart-option-liked");
    }
    /*

    CardHeart and cardHeartBtn to be moved to consts?

     something like this:
     if (this.data.isLiked == false) {
      cardHeart.classList.add("card__heart-option-liked");
     }
    */

    return this._cardElement;
  }

  _setEventListeners() {
    /*
    const cardHeart = this._cardElement.querySelector(".card__heart");
    */
    const cardDeleteBtn = this._cardElement.querySelector(".card__delete-btn");
    this._cardHeart.addEventListener("click", () => {
      this._cardHeart.classList.toggle("card__heart-option-liked");
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
