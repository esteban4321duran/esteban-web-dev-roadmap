import icons from "url:../../img/icons.svg";

export default class View {
  updateAndRender(newData) {
    this._data = newData;
    const markup = this._generateMarkup(this._data);
    this._render(markup);
  }
  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
    </div>`;
    this._parent.innerHTML = "";
    this._parent.insertAdjacentHTML("beforeend", markup);
  }
  _generateMarkup(data) {}
  _render(markup) {
    this._parent.innerHTML = "";
    this._parent.insertAdjacentHTML("beforeend", markup);
  }
}
