'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('nomenclature_classes', [
      {title: 'Материал'},
      {title: 'Комплект'},
      {title: 'Деталь'},
      {title: 'Прочее изделие'},
      {title: 'Спец одежда'},
      {title: 'Комплекс'},
      {title: 'Основное оборудование'},
    ].map(el => Object.assign({}, el, { created_at: new Date(), updated_at: new Date()})), {})
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
