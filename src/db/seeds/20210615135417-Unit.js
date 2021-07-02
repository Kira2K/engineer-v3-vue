module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('units', [
      {
        title: 'Миллиметр',
        short: 'мм',
      },
      {
        title: 'Сантиметр',
        short: 'см',
      },
      {
        title: 'Дециметр',
        short: 'дм',
      },
      {
        title: 'Метр',
        short: 'м',
      },
      {
        title: 'Километр',
        short: 'км',
      },
      {
        title: 'Квадратный миллиметр',
        short: 'кв.мм',
      },
      {
        title: 'Квадратный сантиметр',
        short: 'кв.см',
      },
      {
        title: 'Квадратный  дециметр',
        short: 'кв.дм',
      },
      {
        title: 'Квадратный метр',
        short: 'кв.м',
      },
      {
        title: 'Кубический миллиметр',
        short: 'куб.мм',
      },
      {
        title: 'Кубический сантиметр',
        short: 'куб.см',
      },
      {
        title: 'Литр',
        short: 'л',
      },
      {
        title: 'Кубический метр',
        short: 'куб.м',
      },
      {
        title: 'Децилитр',
        short: 'дл',
      },
      {
        title: 'Миллиграмм',
        short: 'мг',
      },
      {
        title: 'Грамм',
        short: 'г',
      },
      {
        title: 'Килограмм',
        short: 'кг',
      },
      {
        title: 'Тонна',
        short: 'т',
      },
      {
        title: 'Ватт',
        short: 'Вт',
      },
      {
        title: 'Киловатт',
        short: 'кВт',
      },
      {
        title: 'Мегаватт',
        short: 'МВт',
      },
      {
        title: 'Вольт',
        short: 'В',
      },
      {
        title: 'Киловольт',
        short: 'кВ',
      },
      {
        title: 'Ом',
        short: 'Ом',
      },
      {
        title: 'Градус Цельсия',
        short: 'град.С',
      },
      {
        title: 'Герц',
        short: 'Гц',
      },
      {
        title: 'Килогерц',
        short: 'кГц',
      },
      {
        title: 'Бар',
        short: 'бар',
      },
      {
        title: 'Килобар',
        short: 'кб',
      },
      {
        title: 'Секунда',
        short: 'с',
      },
      {
        title: 'Минута',
        short: 'мин',
      },
      {
        title: 'Час',
        short: 'ч',
      },
      {
        title: 'Кубический метр в секунду',
        short: 'куб.м/с',
      },
      {
        title: 'Кубический метр в час',
        short: 'куб.м/ч',
      },
      {
        title: 'Штука',
        short: 'шт',
      },
      {
        title: 'Погонный метр',
        short: 'пог.м',
      },
      {
        title: 'Бит',
        short: 'бит',
      },
      {
        title: 'Байт',
        short: 'байт',
      },
      {
        title: 'Килобайт',
        short: 'кбайт',
      },
      {
        title: 'Мегабайт',
        short: 'Мбайт',
      },
      {
        title: 'Рубль',
        short: 'руб',
      }].map(el => Object.assign({}, el, { created_at: new Date(), updated_at: new Date()})), { ignoreDuplicates: true })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
