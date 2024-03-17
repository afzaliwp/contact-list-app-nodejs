module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ContactCategories', [
      {
        category: 'Default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Family',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Friends',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Relatives',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Coworkers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Services',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ContactCategories', null, {});
  }
};
