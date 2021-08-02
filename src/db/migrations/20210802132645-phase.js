'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('phase', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {


        type: Sequelize.STRING
      },
      priority: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      duration: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      labor_cost: {
        allowNull: false,

        type: Sequelize.INTEGER
      },

      techmap_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'techmap'
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
    await queryInterface.dropTable('phase');
  }
};
