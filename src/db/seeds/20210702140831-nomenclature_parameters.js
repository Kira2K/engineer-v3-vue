'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('nomenclature_parameters', [
      { unit_id: 1, title: 'Скорость потока диализата' },
      { unit_id: 1, title: 'Скорость кровотока в экстракорпоральном контуре' },
      { unit_id: 1, title: 'Детектор утечки крови' },
      { unit_id: 1, title: 'Неинвазивное измерение АД' },
      { unit_id: 1, title: 'Неинвазивное измерение ЧСС' },
      { unit_id: 1, title: 'Ширина подлокотников' },
      { unit_id: 1, title: 'Длина подлокотников' },
      { unit_id: 1, title: 'Ширина спинки' },
      { unit_id: 1, title: 'Длина спинки' },
      { unit_id: 1, title: 'Подъёмная сила' },
      { unit_id: 1, title: 'Угол наклона спинки кресла' },
      { unit_id: 1, title: 'Объем резервуара' },
      { unit_id: 1, title: 'Производительность' },
      { unit_id: 1, title: 'Степень очистки воды от растворенных солей' },
      { unit_id: 1, title: 'Степень очистки воды от бактерий и эндотоксинов' },
      { unit_id: 1, title: 'Объем бака-накопителя' },
      { unit_id: 1, title: 'Максимальная нагрузка' },
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
