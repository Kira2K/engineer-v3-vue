'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('toro', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      registered: {
        allowNull: false,

        type: Sequelize.DATE
      },
      description: {


        type: Sequelize.TEXT
      },
      runtime: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      toro_start: {


        type: Sequelize.DATEONLY
      },
      toro_end: {


        type: Sequelize.DATEONLY
      },
      labor_cost: {


        type: Sequelize.INTEGER
      },

      malfunction_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'malfunction_type'
        }
      },
      repair_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'repair_type'
        }
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
    await queryInterface.dropTable('toro');
  }
};
