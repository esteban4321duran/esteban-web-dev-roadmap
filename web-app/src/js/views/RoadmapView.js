import View from "./View.js";
import TopicView from "./TopicView.js";

export default class RoadmapView extends View {
  constructor(parent) {
    super();
    this._parent = parent;
  }
  _generateMarkup(topics) {
    const markup = `
		${topics.forEach((topic) => topic.generateMarkup)}
		`;
    return markup;
  }
}
