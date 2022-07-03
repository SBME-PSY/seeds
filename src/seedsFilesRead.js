const fs = require('fs');

const data = {};

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf8'),
);

const questionnaires = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/phq.json`, 'utf8'),
);

data['users'] = ['users', users];
data['phq'] = ['questionnairs', questionnaires];

module.exports = data;
