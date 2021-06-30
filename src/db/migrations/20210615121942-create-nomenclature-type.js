'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nomenclature_types', {
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
      nomenclature_group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nomenclature_groups'
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
    await queryInterface.addConstraint('nomenclature_types', {
      fields: ['title', 'nomenclature_group_id'],
      type: 'unique',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('nomenclature_types');
  }
};