'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('enabled_parameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomenclature_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nomenclatures'
        }
      },
      nomenclature_parameter_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nomenclature_parameters'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('enabled_parameters', {
      fields: ['nomenclature_id', 'nomenclature_parameter_id'],
      type: 'unique',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('enabled_parameters');
  }
};