'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('value', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,

        type: Sequelize.STRING
      },

      enabled_parameter_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'enabled_parameter'
        }
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
    await queryInterface.addConstraint('value', {
      fields: ["enabled_parameter_id","passport_id"],
      type: 'unique',
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('value');
  }
};
