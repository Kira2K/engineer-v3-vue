'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nomenclature_model', {
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

      nomenclature_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nomenclature_type'
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
    await queryInterface.addConstraint('nomenclature_model', {
      fields: ["title","nomenclature_type_id"],
      type: 'unique',
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('nomenclature_model');
  }
};
