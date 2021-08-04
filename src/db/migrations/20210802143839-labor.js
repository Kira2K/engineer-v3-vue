'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('labor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {


        type: Sequelize.STRING
      },
      duration: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      labor_cost: {
        allowNull: false,

        type: Sequelize.INTEGER
      },

      phase_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'phase'
        }
      },
      labor_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'labor_type'
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
    await queryInterface.dropTable('labor');
  }
};
