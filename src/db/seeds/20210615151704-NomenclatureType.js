'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('nomenclature_type', [
      {nomenclature_group_id: 1, title: 'Прочие запчасти'},
      {nomenclature_group_id: 1, title: 'Запчасти к персональным компьютерам'},
      {nomenclature_group_id: 1, title: 'Запчасти к ноутбукам'},
      {nomenclature_group_id: 4, title: 'Персональные компьютеры'},
      {nomenclature_group_id: 4, title: 'Ноутбуки'},
      {nomenclature_group_id: 7, title: 'Аппарат искусственная почка'},
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
