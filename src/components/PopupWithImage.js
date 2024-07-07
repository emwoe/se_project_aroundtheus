import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector }) {
    super({ popupSelector });
    this._popupModalImage = this._popupModal.querySelector(imageSelector);
    this._popupModalCaption = this._popupModal.querySelector(
      ".card__pop-out_caption"
    );
  }

  open(name, link) {
    this._popupModalImage.src = link;
    this._popupModalImage.alt = name;
    this._popupModalCaption.textContent = name;
    super.open();
  }
}
