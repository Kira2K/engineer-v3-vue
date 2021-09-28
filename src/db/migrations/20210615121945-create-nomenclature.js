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
      model: {
        allowNull: false,

        type: Sequelize.STRING
      },
      vendor_id: {


        type: Sequelize.STRING
      },

      unit_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'unit'
        }
      },
      nomenclature_vendor_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nomenclature_vendor'
        }
      },

      created_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('nomenclature', {
      fields: ["model","nomenclature_vendor_id"],
      type: 'unique',
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('nomenclature');
  }
};
