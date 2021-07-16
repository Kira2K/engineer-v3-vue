'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('repair_type', [
      {title: 'Планово – предупредительный ремонт'},
      {title: 'Плановый ремонт'},
      {title: 'Текущий ремонт'},
      {title: 'Средний ремонт'},
      {title: 'Капитальный ремонт'},
    ].map(el => Object.assign({}, el, { created_at: new Date(), updated_at: new Date()})), { ignoreDuplicates: true })
  },

  down: async (queryInterface, Sequelize) => {
  }
};