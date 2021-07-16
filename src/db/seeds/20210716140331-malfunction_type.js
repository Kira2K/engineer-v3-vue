'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('malfunction_type', [
      {title: 'Излом'},
      {title: 'Статический излом'},
      {title: 'Динамический излом'},
      {title: 'Хрупкий излом'},
      {title: 'Вязкий излом'},
      {title: 'Трение'},
      {title: 'Трение без смазки'},
      {title: 'Граничное трение'},
      {title: 'Жидкое трение'},
      {title: 'Изнашивание'},
      {title: 'Механическое изнашивание'},
      {title: 'Молекулярно-механическое изнашивание'},
      {title: 'Коррозионно-механическое изнашивание'},
      {title: 'Деформация'},
      {title: 'Разрушение'},
      {title: 'Отказ'},
      {title: 'Сбой'},
      {title: 'Полный отказ'},
      {title: 'Частичный отказ'},
    ].map(el => Object.assign({}, el, { created_at: new Date(), updated_at: new Date()})), { ignoreDuplicates: true })
  },

  down: async (queryInterface, Sequelize) => {
  }
};
