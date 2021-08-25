'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('runtime', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      current: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      accepted: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      max: {
        allowNull: false,

        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('runtime');
  }
};
