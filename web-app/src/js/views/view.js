export default class View {
  updateAndRender(newData) {
    this._data = newData;
    const markup = this._generateMarkup(this._data);
    this._render(markup);
  }
  renderSpinner() {}
  _generateMarkup(data) {}
  _render(markup) {
    this._parent.innerHTML = "";
    this._parent.insertAdjacentHTML("beforeend", markup);
  }
}
