'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nomenclature_parameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      unit_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'units'
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
    await queryInterface.addConstraint('nomenclature_parameters', {
      fields: ['title', 'unit_id'],
      type: 'unique',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('nomenclature_parameters');
  }
};