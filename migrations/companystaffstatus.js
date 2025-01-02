'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('CompanyStaff', 'status', {
      type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected'),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // 
  },
};
