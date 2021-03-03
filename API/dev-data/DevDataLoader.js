const fs = require('fs');

class DevDataLoader {
  constructor(topicModel) {
    this._TopicModel = topicModel;
  }
  readData(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  async load(filePath) {
    const data = this.readData(filePath);

    data.forEach((topic) => {
      this._TopicModel.create(topic);
    });
  }
}

module.exports = DevDataLoader;
