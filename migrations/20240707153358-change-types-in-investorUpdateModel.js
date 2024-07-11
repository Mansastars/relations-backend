'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('InvestorsUpdate', 'founders_profile', {
      type: Sequelize.DataTypes.TEXT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'recipients_emails', {
      type: Sequelize.DataTypes.TEXT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'requests', {
      type: Sequelize.DataTypes.TEXT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'targets', {
      type: Sequelize.DataTypes.TEXT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'januaryMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'februaryMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'marchMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'aprilMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'mayMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'juneMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'julyMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'augustMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'septemberMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'octoberMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'novemberMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'decemberMRR', {
      type: Sequelize.DataTypes.BIGINT,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('InvestorsUpdate', 'founders_profile', {
      type: Sequelize.DataTypes.TEXT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'recipients_emails', {
      type: Sequelize.DataTypes.TEXT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'requests', {
      type: Sequelize.DataTypes.TEXT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'targets', {
      type: Sequelize.DataTypes.TEXT,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'januaryMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'februaryMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'marchMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'aprilMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'mayMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'juneMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'julyMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'augustMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'septemberMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'octoberMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'novemberMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('InvestorsUpdate', 'decemberMRR', {
      type: Sequelize.DataTypes.INTEGER,
    });
  }
};
