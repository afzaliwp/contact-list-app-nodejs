module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Contacts', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Contacts', 'userId');
  }
};
