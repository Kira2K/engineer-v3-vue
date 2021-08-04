'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('techmap', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      version: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      approved_at: {
        allowNull: false,

        type: Sequelize.DATEONLY
      },
      active: {
        allowNull: false,

        type: Sequelize.DATEONLY
      },
      total_labor_cost: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      total_duration: {
        allowNull: false,

        type: Sequelize.INTEGER
      },

      nomenclature_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nomenclature'
        }
      },
      techmap_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'techmap_type'
        }
      },
      techmap_status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'techmap_status'
        }
      },
      techmap_id: {

        type: Sequelize.INTEGER,
        references: {
          model: 'techmap'
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
    await queryInterface.dropTable('techmap');
  }
};
