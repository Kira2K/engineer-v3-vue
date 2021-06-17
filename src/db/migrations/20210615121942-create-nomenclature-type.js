'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NomenclatureTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.INTEGER,
        unique: 'NomenclatureTypeUniqueKey'
      },
      title: {
        type: Sequelize.STRING
      },
      nomenclatureGroupID: {
        type: Sequelize.INTEGER,
        unique: 'NomenclatureTypeUniqueKey',
        references: {
          model: 'NomenclatureGroups'
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
    await queryInterface.dropTable('NomenclatureTypes');
  }
};