'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('counterparty', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      short: {


        type: Sequelize.STRING
      },
      inn: {
        allowNull: false,

        type: Sequelize.STRING
      },
      kpp: {
        allowNull: false,

        type: Sequelize.STRING
      },
      ogrn: {
        allowNull: false,

        type: Sequelize.STRING
      },
      address: {


        type: Sequelize.STRING
      },
      www: {


        type: Sequelize.STRING
      },
      expiration: {


        type: Sequelize.DATEONLY
      },


      created_at: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('counterparty');
  }
};
