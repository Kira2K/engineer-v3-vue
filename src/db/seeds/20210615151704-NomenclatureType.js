'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('NomenclatureTypes', [
      {code: 1, nomenclatureGroupID: 1, title: 'Прочие запчасти'},
      {code: 2, nomenclatureGroupID: 1, title: 'Запчасти к персональным компьютерам'},
      {code: 3, nomenclatureGroupID: 1, title: 'Запчасти к ноутбукам'},
      {code: 1, nomenclatureGroupID: 4, title: 'Персональные компьютеры'},
      {code: 2, nomenclatureGroupID: 4, title: 'Ноутбуки'},
      {code: 1, nomenclatureGroupID: 7, title: 'Аппарат искусственная почка'},
    ].map(el => Object.assign({}, el, { createdAt: new Date(), updatedAt: new Date()})), {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
