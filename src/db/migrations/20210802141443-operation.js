'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('operation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {


        type: Sequelize.STRING
      },
      quantity: {
        allowNull: false,

        type: Sequelize.INTEGER
      },

      labor_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'labor'
        }
      },
      profession_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'profession'
        }
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
    await queryInterface.dropTable('operation');
  }
};
