'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Contact', 'title', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // or false if the column should not allow null values
    });
    await queryInterface.addColumn('Contact', 'gender', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // or false if the column should not allow null values
    });
    await queryInterface.addColumn('Contact', 'moves_made', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // or false if the column should not allow null values
    });
    await queryInterface.addColumn('Contact', 'linkedin_url', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // or false if the column should not allow null values
    });
    await queryInterface.addColumn('Contact', 'contact_color', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // or false if the column should not allow null values
    });
    await queryInterface.addColumn('Contact', 'profile_pic', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // or false if the column should not allow null values
    });
    await queryInterface.addColumn('Contact', 'rating', {
      type: Sequelize.DataTypes.STRING,
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
