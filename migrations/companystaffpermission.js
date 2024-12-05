'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('CompanyStaff', 'permission', {
      type: Sequelize.ENUM('Viewer', 'Editor'),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // 
  },
};
