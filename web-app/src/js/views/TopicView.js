import View from "./View.js";

export default class TopicView extends View {
  constructor(topic) {
    this._data = topic;
  }

  generateMarkup(topic) {
    const markup = `
		<section class="topic-container ${topic.status}">
			<div class="topic-title toggleable">${topic.name}</div>
			${topic.subtopics !== [] ? this._generateSubtopicsMarkup(topic.subtopics) : ""}
		</section>`;
    return markup;
  }
  _generateSubtopicsMarkup(subtopics) {
    subtopics.forEach(subtopic, (index) => {
      return `<div class="subtopic toggleable ${
        index % 2 === 0 ? "left" : "right"
      } ${subtopic.status === "done" ? "done" : subtopic.type}">${
        subtopic.content
      }</div>`;
    });
  }
}
