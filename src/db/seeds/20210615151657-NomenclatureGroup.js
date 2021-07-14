'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('nomenclature_group', [
      {nomenclature_class_id: 3, title: 'Запасные части к вычислительной технике'},
      {nomenclature_class_id: 3, title: 'Запасные части к бытовой технике, офисной технике и электронике'},
      {nomenclature_class_id: 3, title: 'Запасные части к медицинскому оборудованию'},
      {nomenclature_class_id: 4, title: 'Вычислительная техника'},
      {nomenclature_class_id: 4, title: 'Электронные компоненты'},
      {nomenclature_class_id: 4, title: 'Мебель медицинская и лабораторная'},
      {nomenclature_class_id: 7, title: 'Аппаратура медицинская'},
      {nomenclature_class_id: 7, title: 'Вычислительная техника'},
      {nomenclature_class_id: 7, title: 'Электрооборудование'},
    ].map(el => Object.assign({}, el, { created_at: new Date(), updated_at: new Date()})), { ignoreDuplicates: true })
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
