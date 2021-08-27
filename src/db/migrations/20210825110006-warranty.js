'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('warranty', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      warranty_runtime: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      warranty: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      expiration: {
        allowNull: false,

        type: Sequelize.DATEONLY
      },

      passport_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'passport'
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
    await queryInterface.dropTable('warranty');
  }
};
