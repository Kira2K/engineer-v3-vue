'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('NomenclatureGroups', [
      {code: 1, nomenclatureClassID: 3, title: 'Запасные части к вычислительной технике'},
      {code: 2, nomenclatureClassID: 3, title: 'Запасные части к бытовой технике, офисной технике и электронике'},
      {code: 3, nomenclatureClassID: 3, title: 'Запасные части к медицинскому оборудованию'},
      {code: 1, nomenclatureClassID: 4, title: 'Вычислительная техника'},
      {code: 2, nomenclatureClassID: 4, title: 'Электронные компоненты'},
      {code: 3, nomenclatureClassID: 4, title: 'Мебель медицинская и лабораторная'},
      {code: 1, nomenclatureClassID: 7, title: 'Аппаратура медицинская'},
      {code: 2, nomenclatureClassID: 7, title: 'Вычислительная техника'},
      {code: 3, nomenclatureClassID: 7, title: 'Электрооборудование'},
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
