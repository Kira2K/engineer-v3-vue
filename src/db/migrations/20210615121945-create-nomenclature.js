'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Nomenclatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.INTEGER,
        unique: true
      },
      title: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      unitID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Units'
        }
      },
      nomenclatureModelID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'NomenclatureModels'
        }
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Nomenclatures');
  }
};