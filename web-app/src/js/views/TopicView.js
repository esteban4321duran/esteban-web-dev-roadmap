import View from "./View.js";

export default class TopicView extends View {
  constructor(topic) {
    super();
    this.data = topic;
  }

  generateMarkup(topic) {
    const markup = `
    <section class="topic-container ${topic.status}" data-order="${
      topic.order
    }">
			<div class="topic-title toggleable">${topic.name}</div>
			${topic.subtopics !== [] ? this._generateSubtopicsMarkup(topic.subtopics) : ""}
		</section>`;

    return markup;
  }
  _generateSubtopicsMarkup(subtopics) {
    return subtopics
      .map((subtopic, index) => {
        return `<div class="subtopic toggleable ${
          subtopic.status === "done" ? "done" : subtopic.type
        }" data-sub-id="${index}">${subtopic.content}</div>`;
      })
      .join("");
  }
}
