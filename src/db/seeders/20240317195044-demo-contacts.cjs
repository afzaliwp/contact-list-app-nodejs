const {faker, fa} = require("@faker-js/faker");
const {readFile} = require("fs/promises");

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum and the minimum are inclusive
}
async function generateUsers(numUsers) {
  const contacts = [];

  for (let i = 0; i < numUsers; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const mobilePhone = `+98${getRandomInteger(901, 922)}${getRandomInteger(101, 999)}${getRandomInteger(1001, 9999)}`;
    const isFavorite = faker.datatype.boolean();
    const ContactCategoryId = getRandomInteger(1, 6);
    const userId = getRandomInteger(22, 41);
    const profilePicture = await readFile(__dirname + '/profile-pictures/' + getRandomInteger(1, 9) + '.png');
    const createdAt = faker.date.past();
    const updatedAt = faker.date.recent();
    contacts.push({firstName, lastName, mobilePhone, isFavorite, ContactCategoryId, profilePicture, userId, createdAt, updatedAt});
  }

  return contacts;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Contacts', await generateUsers(400), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contacts', null, {});
  }
};
