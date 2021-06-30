'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nomenclatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      unit_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'units'
        }
      },
      nomenclature_model_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nomenclature_models'
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
    await queryInterface.addConstraint('nomenclatures', {
      fields: ['title', 'nomenclature_model_id'],
      type: 'unique',
    });  
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('nomenclatures');
  }
};
