export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._element = this._renderer(item);
      this.addItem(this._element);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
