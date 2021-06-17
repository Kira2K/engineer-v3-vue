'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NomenclatureModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.INTEGER,
        unique: 'NomenclatureModelUniqueKey'
      },
      title: {
        type: Sequelize.STRING
      },
      nomenclatureTypeID: {
        type: Sequelize.INTEGER,
        unique: 'NomenclatureModelUniqueKey',
        references: {
          model: 'NomenclatureTypes'
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
    await queryInterface.dropTable('NomenclatureModels');
  }
};