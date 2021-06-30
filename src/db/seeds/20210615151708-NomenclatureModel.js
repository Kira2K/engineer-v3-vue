'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('nomenclature_models', [
      {nomenclature_type_id: 5, title: 'TravelMate'},
      {nomenclature_type_id: 5, title: 'Satelit'},
      {nomenclature_type_id: 6, title: 'Иннова'},
      {nomenclature_type_id: 6, title: 'Артис'},
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
