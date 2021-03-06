'use strict';

const src = 'branch';
const fields = 'id, title'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`CREATE TEMP TABLE sequelize_tmp (LIKE ${src} INCLUDING DEFAULTS)`);
    await queryInterface.sequelize.query(`copy sequelize_tmp (${fields}) from '${__dirname}/../seed_data/${src}.tsv' DELIMITER '\t';`)
    await queryInterface.sequelize.query(`INSERT INTO ${src} SELECT * FROM sequelize_tmp ON CONFLICT DO NOTHING;`);
    await queryInterface.sequelize.query(`drop table sequelize_tmp;`);
    await queryInterface.sequelize.query(`select setval('${src}_id_seq', (select max(id) from ${src}))`);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
