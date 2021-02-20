const fs = require('fs');
const promptSync = require('prompt-sync');

const prompt = promptSync({ sigint: true });

function yesNoQuestion(message) {
  do {
    const choice = prompt(message);
    if (choice === '') return true;
    else if (choice === '-1') return false;
  } while (true);
}
function writeData(args) {
  const data = JSON.stringify(args.topics);
  fs.writeFileSync(args.filePath, data);
}

function inputTopic(dataPath) {
  do {
    const topics = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const lastOrder = topics[topics.length - 1]?.order || -1;
    console.clear();
    console.log(`(ingresar -1 para cancelar)`);
    const name = prompt(`Tema:`);
    if (name === '-1') return;
    const subtopics = [];
    do {
      const content = prompt(`Subtema:`);
      if (content === '-1') return;
      let type = prompt(`Tipo (dejar en blanco para "recommended"):`);
      if (type === '-1') return;
      if (type === '') type = 'recommended';
      subtopics.push({
        content: content,
        type: type,
      });
    } while (yesNoQuestion(`Cargar otro subtema? (ENTER: si, -1: no)`));
    topics.push({
      name: name,
      order: lastOrder + 1,
      subtopics: subtopics,
    });
    writeData({
      topics: topics,
      filePath: dataPath,
    });
  } while (yesNoQuestion(`Cargar otro tema? (ENTER: si, -1: no)`));
}
function deleteTopic(dataPath) {
  const topics = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  if (topics.length === 0) {
    prompt(`El stack esta vacio`);
    return;
  }
  console.clear();
  const deleteName = prompt(
    `Ingrese nombre del tema (ENTER: borrar el ultimo, -1: cancelar):`
  );
  if (deleteName === '-1') return;
  if (deleteName === '') {
    const newTopics = topics.slice(0, topics.length - 1);
    writeData({
      topics: newTopics,
      filePath: dataPath,
    });
    return;
  }

  const topic = topics.find((topic) => topic.name === deleteName);
  if (!topic) {
    prompt(`No existe un tema con el nombre ingresado`);
    return;
  }
  const deleteIndex = topics.indexOf(topic);
  if (deleteIndex === -1) return;
  topics.splice(deleteIndex, 1);
  writeData({
    topics: topics,
    filePath: dataPath,
  });
}
function printTopic(topic, notLast) {
  let subtopicsString;
  if (topic.subtopics.length !== 0) {
    subtopicsString = topic.subtopics
      .map((subtopic) => {
        return `       {Subtema: ${subtopic.content}, Tipo: ${subtopic.type}}`;
      })
      .join(',\n');
  } else subtopicsString = '';

  console.log(`{
    Tema: ${topic.name},
    Orden: ${topic.order},
    Subtemas:
    [
${subtopicsString}
    ]
}${notLast ? ',' : ''}`);
}

function displayTopics(dataPath) {
  const topics = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.clear();
  if (topics.length === 0) {
    prompt(`El stack esta vacio`);
    return;
  }
  const lastIndex = topics.length - 1;
  topics.forEach((topic, index) => {
    const notLast = index !== lastIndex ? true : false;
    printTopic(topic, notLast);
  });
}

function stackEditMenu(dataPath) {
  let loop = true;
  do {
    console.clear();
    console.log(`Seleccione la opcion deseada:
    1	Cargar temas
    2	Borrar tema
    3   Mostrar temas
    4	atras
    `);
    const selection = Number(prompt());

    switch (selection) {
      case 1:
        inputTopic(dataPath);
        break;
      case 2:
        deleteTopic(dataPath);
        break;
      case 3:
        displayTopics(dataPath);
        prompt('(Presione cualquier tecla para continuar)');
        break;
      case 4:
        loop = false;
        break;
      default:
        prompt(`Seleccione una opcion valida`);
        break;
    }
  } while (loop);
}

function stackSelectionMenu(loop) {
  const frontEndTopics = `${__dirname}/front-end-topics.json`;
  const backEndTopics = `${__dirname}/back-end-topics.json`;
  const devopsTopics = `${__dirname}/devops-topics.json`;
  // const loop = {
  //   value: true,
  // };
  console.clear();
  console.log(`Seleccione el Stack:
	1	front-end
	2	back-end
	3	devops
	4	Salir
	`);
  const selection = Number(prompt());
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
      prompt(`Seleccione una opcion valida`);
      break;
  }
}

const loop = {
  value: true,
};

do {
  stackSelectionMenu(loop);
} while (loop.value);
