import View from "./View.js";
import TopicView from "./TopicView.js";

class RoadmapView extends View {
  constructor(parent) {
    this._parent = parent;
  }
  _generateMarkup(topics) {
    const markup = `
		${topics.forEach((topic) => topic.generateMarkup)}
		`;
    return markup;
  }
}
