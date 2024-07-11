'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Contact', 'notes', {
      type: Sequelize.DataTypes.TEXT,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Contact', 'notes', {
      type: Sequelize.DataTypes.STRING,
    });
  }
};
