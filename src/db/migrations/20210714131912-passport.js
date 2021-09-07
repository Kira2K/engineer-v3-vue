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
      title: {


        type: Sequelize.STRING
      },
      factory_id: {
        allowNull: false,

        type: Sequelize.STRING
      },
      serial: {


        type: Sequelize.STRING
      },
      partnumber: {


        type: Sequelize.STRING
      },
      produced: {
        allowNull: false,

        type: Sequelize.DATEONLY
      },
      state: {


        type: Sequelize.STRING
      },
      commissioned: {


        type: Sequelize.DATEONLY
      },
      provisioner: {


        type: Sequelize.STRING
      },
      extra: {


        type: Sequelize.TEXT
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
