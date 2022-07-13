const { faker } = require('@faker-js/faker');
const fs = require('fs');
const governorates = require('./_data/governorates');

data = JSON.parse(
  Buffer.from(fs.readFileSync(`_data/${process.argv[2]}.json`)).toString(),
);

const ids = [];

for (let i = 0; i < process.argv[3]; i++) {
  const id = faker.database.mongodbObjectId();
  ids.push(id);
  const user = {
    _id: id,
    name: faker.name.findName(),
    email: faker.internet.email(),
    role: 'user',
    password: faker.phone.number('!@ABCabc########'),
    phone: faker.phone.number('010########'),
    age: Math.floor(Math.random() * (60 - 18)) + 18,
    maritalStatus: faker.helpers.arrayElement([
      'Single',
      'Married',
      'Divorced',
      'Widowed',
      'Separated',
      'Engaged',
    ]),
    sex: faker.helpers.arrayElement(['Male', 'Female']),
    governorate: faker.helpers.arrayElement(governorates),
    picture: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  data.push(user);
}

fs.writeFileSync(`_data/${process.argv[2]}.json`, JSON.stringify(data), {
  encoding: 'utf8',
});

fs.writeFileSync(`_data/user_ids.json`, JSON.stringify(ids), {
  encoding: 'utf8',
});
