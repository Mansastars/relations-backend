'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('User', 'on_trial', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true, // or false if the column should not allow null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('YourTableName', 'new_column_name');
  }
};
