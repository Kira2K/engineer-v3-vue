'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('commission', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commission_id: {
        allowNull: false,

        type: Sequelize.STRING
      },
      commissioned: {
        allowNull: false,

        type: Sequelize.DATEONLY
      },
      inventory_id: {
        allowNull: false,

        type: Sequelize.STRING
      },
      ip: {


        type: Sequelize.STRING
      },
      mac: {


        type: Sequelize.STRING
      },

      passport_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'passport'
        }
      },
      branch_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'branch'
        }
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
    await queryInterface.dropTable('commission');
  }
};
