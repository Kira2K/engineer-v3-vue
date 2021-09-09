'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('log', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,

        type: Sequelize.STRING
      },
      name: {
        allowNull: false,

        type: Sequelize.STRING
      },
      email: {
        allowNull: false,

        type: Sequelize.STRING
      },
      ip: {


        type: Sequelize.STRING
      },
      module: {
        allowNull: false,

        type: Sequelize.STRING
      },
      action: {
        allowNull: false,

        type: Sequelize.STRING
      },
      extra: {


        type: Sequelize.JSON
      },


      created_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('log');
  }
};
