'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nomenclature', {
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
          model: 'unit'
        }
      },
      nomenclature_model_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nomenclature_model'
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
    await queryInterface.addConstraint('nomenclature', {
      fields: ["title","nomenclature_model_id"],
      type: 'unique',
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('nomenclature');
  }
};
