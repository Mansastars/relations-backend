'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the new role to the 'role' ENUM
    await queryInterface.changeColumn('User', 'role', {
      type: Sequelize.ENUM('Admin', 'User', 'Company'), // Include all roles here
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert to the original ENUM if the migration is rolled back
    await queryInterface.changeColumn('User', 'role', {
      type: Sequelize.ENUM('Admin', 'User'), // Original roles
      allowNull: false,
    });
  },
};
