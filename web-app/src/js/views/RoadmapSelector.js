import View from "./View.js";

export default class RoadmapSelector extends View {
  constructor() {
    super();
    this._parent = document.querySelector(".roadmap-selector-container");
  }
  _generateMarkup({ labels, selectedId }) {
    const markup = labels
      .map((label, index) => {
        return `
      <div class="roadmap-selector radio-button selectable ${
        selectedId === index ? "selected" : ""
      }" data-id="${index} "><span>${label}</span></div>
      `;
      })
      .join("");
    return markup;
  }

  subscribeClickListener(listener) {
    this._parent.addEventListener("click", listener);
  }
}
