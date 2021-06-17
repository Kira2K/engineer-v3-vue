module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Units', [
      {
        code: '003',
        title: 'Миллиметр',
        short: 'мм',
      },
      {
        code: '004',
        title: 'Сантиметр',
        short: 'см',
      },
      {
        code: '005',
        title: 'Дециметр',
        short: 'дм',
      },
      {
        code: '006',
        title: 'Метр',
        short: 'м',
      },
      {
        code: '008',
        title: 'Километр',
        short: 'км',
      },
      {
        code: '050',
        title: 'Квадратный миллиметр',
        short: 'кв.мм',
      },
      {
        code: '051',
        title: 'Квадратный сантиметр',
        short: 'кв.см',
      },
      {
        code: '053',
        title: 'Квадратный  дециметр',
        short: 'кв.дм',
      },
      {
        code: '055',
        title: 'Квадратный метр',
        short: 'кв.м',
      },
      {
        code: '110',
        title: 'Кубический миллиметр',
        short: 'куб.мм',
      },
      {
        code: '111',
        title: 'Кубический сантиметр',
        short: 'куб.см',
      },
      {
        code: '112',
        title: 'Литр',
        short: 'л',
      },
      {
        code: '113',
        title: 'Кубический метр',
        short: 'куб.м',
      },
      {
        code: '118',
        title: 'Децилитр',
        short: 'дл',
      },
      {
        code: '161',
        title: 'Миллиграмм',
        short: 'мг',
      },
      {
        code: '163',
        title: 'Грамм',
        short: 'г',
      },
      {
        code: '166',
        title: 'Килограмм',
        short: 'кг',
      },
      {
        code: '168',
        title: 'Тонна',
        short: 'т',
      },
      {
        code: '212',
        title: 'Ватт',
        short: 'Вт',
      },
      {
        code: '214',
        title: 'Киловатт',
        short: 'кВт',
      },
      {
        code: '215',
        title: 'Мегаватт',
        short: 'МВт',
      },
      {
        code: '222',
        title: 'Вольт',
        short: 'В',
      },
      {
        code: '223',
        title: 'Киловольт',
        short: 'кВ',
      },
      {
        code: '274',
        title: 'Ом',
        short: 'Ом',
      },
      {
        code: '280',
        title: 'Градус Цельсия',
        short: 'град.С',
      },
      {
        code: '290',
        title: 'Герц',
        short: 'Гц',
      },
      {
        code: '291',
        title: 'Килогерц',
        short: 'кГц',
      },
      {
        code: '309',
        title: 'Бар',
        short: 'бар',
      },
      {
        code: '312',
        title: 'Килобар',
        short: 'кб',
      },
      {
        code: '354',
        title: 'Секунда',
        short: 'с',
      },
      {
        code: '355',
        title: 'Минута',
        short: 'мин',
      },
      {
        code: '356',
        title: 'Час',
        short: 'ч',
      },
      {
        code: '596',
        title: 'Кубический метр в секунду',
        short: 'куб.м/с',
      },
      {
        code: '598',
        title: 'Кубический метр в час',
        short: 'куб.м/ч',
      },
      {
        code: '796',
        title: 'Штука',
        short: 'шт',
      },
      {
        code: '018',
        title: 'Погонный метр',
        short: 'пог.м',
      },
      {
        code: '254',
        title: 'Бит',
        short: 'бит',
      },
      {
        code: '255',
        title: 'Байт',
        short: 'байт',
      },
      {
        code: '256',
        title: 'Килобайт',
        short: 'кбайт',
      },
      {
        code: '257',
        title: 'Мегабайт',
        short: 'Мбайт',
      },
      {
        code: '383',
        title: 'Рубль',
        short: 'руб',
      }].map(el => Object.assign({}, el, { createdAt: new Date(), updatedAt: new Date()})), {})
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
