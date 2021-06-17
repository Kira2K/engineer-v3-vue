'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('NomenclatureModels', [
      {code: 1, nomenclatureTypeID: 5, title: 'TravelMate'},
      {code: 2, nomenclatureTypeID: 5, title: 'Satelit'},
      {code: 1, nomenclatureTypeID: 6, title: 'Иннова'},
      {code: 2, nomenclatureTypeID: 6, title: 'Артис'},
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
