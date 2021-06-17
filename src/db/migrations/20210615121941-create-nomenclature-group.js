'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NomenclatureGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.INTEGER,
        unique: 'NomenclatureGroupUniqueKey'
      },
      title: {
        type: Sequelize.STRING
      },
      nomenclatureClassID: {
        type: Sequelize.INTEGER,
        unique: 'NomenclatureGroupUniqueKey',
        references: {
          model: 'NomenclatureClasses'
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
    await queryInterface.dropTable('NomenclatureGroups');
  }
};