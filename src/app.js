const mongoose = require('mongoose');
const colors = require('colors/safe');
const dotenv = require('dotenv');
const data = require('./seedsFilesRead');

dotenv.config({ path: './.env' });

mongoose.connect(process.env.CONNECTION_STR);

const connection = mongoose.connection;

const insertMany = async (model, documents) => {
  await connection.collection(model).insertMany(documents);
  console.log(colors.green.inverse(`${model} Inserted...`));
  process.exit();
};

const deleteMany = async (model) => {
  await connection.collection(model).deleteMany();
  console.log(colors.red.inverse(`${model} Destroyed...`));
  process.exit();
};

const importData = async (file) => {
  try {
    if (file === 'all') {
      Object.entries(data).forEach(async ([model, documents]) => {
        insertMany(model, documents).then(console.log);
      });
    } else {
      insertMany(data[file][0], data[file][1]).then(console.log);
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async (model) => {
  try {
    if (model === 'all') {
      Object.entries(data).forEach(([model, _]) => {
        deleteMany(model);
      });
    } else {
      await deleteMany(data[model][0]);
      console.log('got here');
    }
    console.log(colors.red.inverse('Data Destroyed...'));
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  if (!process.argv[3]) {
    console.log(colors.red.inverse('No file specified...'));
  }
  importData(process.argv[3]);
} else if (process.argv[2] === '-d') {
  if (!process.argv[3]) {
    console.log(colors.red.inverse('No model specified...'));
  }
  deleteData(process.argv[3]);
}
