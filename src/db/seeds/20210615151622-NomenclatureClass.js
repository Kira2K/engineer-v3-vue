'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('NomenclatureClasses', [
      {code: 1, title: 'Материал'},
      {code: 2, title: 'Комплект'},
      {code: 3, title: 'Деталь'},
      {code: 4, title: 'Прочее изделие'},
      {code: 5, title: 'Спец одежда'},
      {code: 6, title: 'Комплекс'},
      {code: 7, title: 'Основное оборудование'},
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
