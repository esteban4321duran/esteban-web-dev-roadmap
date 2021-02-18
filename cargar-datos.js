const fs = require('fs');
const promptSync = require('prompt-sync');

const prompt = promptSync({ sigint: true });

function yesNoQuestion(message) {
  do {
    const choice = prompt(message);
    if (choice === 'y') return true;
    else if (choice === 'n') return false;
  } while (true);
}
function writeData(args) {
  const data = JSON.stringify(args.topics);
  fs.writeFileSync(args.filePath, data);
}

function inputTopic(dataPath) {
  do {
    const topics = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const lastOrder = topics[topics.length - 1].order;
    console.clear();
    console.log(`(ingresar -1 para cancelar)`);
    const name = prompt(`Tema:`);
    if (name === '-1') break;
    const subtopics = [];
    do {
      const content = prompt(`Subtema:`);
      if (content === '-1') break;
      let type = prompt(`Tipo (dejar en blanco para "recommended"):`);
      if (type === '-1') break;
      if (type === '') type = 'recommended';
      subtopics.push({
        content: content,
        type: type,
      });
    } while (yesNoQuestion(`Agregar otro subtema? (y/n)`));
    topics.push({
      name: name,
      order: lastOrder + 1,
      subtopics: subtopics,
    });
    writeData({
      topics: topics,
      filePath: dataPath,
    });
  } while (yesNoQuestion(`Cargar otro tema? (y/n)`));
}
function deleteTopic(dataPath) {
  const topics = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.clear();
  const deleteName = prompt(
    `Ingrese nombre del tema (dejar en blanco para borrar el ultimo):`
  );
  if (deleteName === '') {
    const newTopics = topics.slice(0, topics.length - 1);
    writeData({
      topics: newTopics,
      filePath: dataPath,
    });
    return;
  }
  const topic = topics.find((topic) => topic.name === deleteName);
  const deleteIndex = topics.indexOf(topic);
  if (deleteIndex === -1) return;
  topics.splice(deleteIndex, 1);
  writeData({
    topics: topics,
    filePath: dataPath,
  });
}

function stackEditMenu(dataPath) {
  let loop = true;
  do {
    console.clear();
    const selection = Number(
      prompt(`Seleccione la opcion deseada:
	1	Cargar temas
	2	Borrar tema
	3	atras
	`)
    );

    switch (selection) {
      case 1:
        inputTopic(dataPath);
        break;
      case 2:
        deleteTopic(dataPath);
        break;
      case 3:
        loop = false;
        break;
      default:
        console.log(`Seleccione una opcion valida`);
        break;
    }
  } while (loop);
}

function stackSelectionMenu(loop) {
  const frontEndTopics = `${__dirname}/dev-data/front-end-topics.json`;
  const backEndTopics = `${__dirname}/dev-data/back-end-topics.json`;
  const devopsTopics = `${__dirname}/dev-data/devops-topics.json`;
  // const loop = {
  //   value: true,
  // };
  const selection = Number(
    prompt(`Seleccione el Stack:
	1	front-end
	2	back-end
	3	devops
	4	Salir
	`)
  );
  switch (selection) {
    case 1:
      stackEditMenu(frontEndTopics);
      break;
    case 2:
      stackEditMenu(backEndTopics);
      break;
    case 3:
      stackEditMenu(devopsTopics);
      break;
    case 4:
      loop.value = false;
      break;
    default:
      console.log(`Seleccione una opcion valida`);
      break;
  }
}

const loop = {
  value: true,
};

do {
  console.clear();
  stackSelectionMenu(loop);
} while (loop.value);
