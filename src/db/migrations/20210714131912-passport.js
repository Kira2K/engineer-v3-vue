'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('passport', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      factory_id: {
        allowNull: false,

        type: Sequelize.STRING
      },
      produced: {
        allowNull: false,

        type: Sequelize.DATEONLY
      },
      commissioned: {


        type: Sequelize.DATEONLY
      },
      provisioner: {


        type: Sequelize.STRING
      },
      warranty: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      warranty_expiration: {
        allowNull: false,

        type: Sequelize.DATEONLY
      },
      extra: {


        type: Sequelize.TEXT
      },
      accepted_runtime: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      max_runtime: {
        allowNull: false,

        type: Sequelize.INTEGER
      },

      nomenclature_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nomenclature'
        }
      },
      counterparty_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'counterparty'
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

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('passport');
  }
};
