const fs = require('fs');

class DevDataLoader {
  constructor(topicModel) {
    this._topicModel = topicModel;
  }

  readData(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  async load(filePath) {
    const data = this.readData(filePath);

    // eslint-disable-next-line
    for (const topic of data) {
      try {
        // eslint-disable-next-line
        await this._topicModel.create(topic);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

module.exports = DevDataLoader;
