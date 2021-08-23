'use strict';

const src = 'passport';
const fields = 'factory_id, extra, nomenclature_id, created_at, produced, warranty_expiration, warranty, accepted_runtime, max_runtime, counterparty_id'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`ALTER SEQUENCE passport_id_seq RESTART WITH 4829;`);
    await queryInterface.sequelize.query(`CREATE TEMP TABLE sequelize_tmp (LIKE ${src} INCLUDING DEFAULTS)`);
    await queryInterface.sequelize.query(`copy sequelize_tmp (${fields}) from '${__dirname}/../seed_data/${src}.tsv' DELIMITER '\t';`)
    await queryInterface.sequelize.query(`INSERT INTO ${src} SELECT * FROM sequelize_tmp ON CONFLICT DO NOTHING;`);
    await queryInterface.sequelize.query(`drop table sequelize_tmp;`);
    await queryInterface.sequelize.query(`select setval('${src}_id_seq', (select max(id) from ${src}))`);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
