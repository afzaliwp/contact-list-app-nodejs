const md5 = require('md5');

const {faker} = require("@faker-js/faker");

function generateUsers(numUsers) {
  const users = [];

  for (let i = 0; i < numUsers; i++) {
    const fullName = faker.internet.displayName(); // Generates a full name
    const username = faker.internet.userName(); // Generates a unique username
    const password = md5(Math.random().toString(36).slice(-8));
    users.push({fullName, username, password, createdAt: new Date(), updatedAt: new Date()});
  }

  return users;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', generateUsers(20), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
