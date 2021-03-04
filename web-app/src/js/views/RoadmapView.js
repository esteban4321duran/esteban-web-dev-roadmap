import View from "./View.js";
import TopicView from "./TopicView.js";

export default class RoadmapView extends View {
  constructor(parent) {
    super();
    this._parent = parent;
  }
  _generateMarkup(topics) {
    const topicViews = topics.map((topic) => {
      return new TopicView(topic);
    });
    const markup = `
		${topicViews
      .map((topicView) => {
        return topicView.generateMarkup(topicView.data);
      })
      .join("")}
		`;
    return markup;
  }

  subscribeClickListener(listener) {
    this._parent.addEventListener("click", listener);
  }
}
