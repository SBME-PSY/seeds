const { faker } = require('@faker-js/faker');
const fs = require('fs');

data = JSON.parse(
  Buffer.from(fs.readFileSync(`_data/${process.argv[2]}.json`)).toString(),
);

for (let i = 0; i < process.argv[3]; i++) {
  const user = {
    _id: faker.database.mongodbObjectId(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    role: 'user',
    password: faker.phone.number('!@ABCabc########'),
    phone: faker.phone.number('010########'),
    age: Math.floor(Math.random() * 60) + 18,
    maritalStatus: faker.helpers.arrayElement([
      'Single',
      'Married',
      'Divorced',
      'Widowed',
      'Separated',
      'Engaged',
    ]),
    sex: faker.helpers.arrayElement(['Male', 'Female']),
    picture: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  data.push(user);
}

fs.writeFileSync(`_data/${process.argv[2]}.json`, JSON.stringify(data), {
  encoding: 'utf8',
});
