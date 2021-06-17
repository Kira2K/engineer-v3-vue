'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NomenclatureClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.NomenclatureGroup, {
        foreignKey: 'nomenclatureClassID'
      })
    }
  };
  NomenclatureClass.init({
    code: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'NomenclatureClass',
  });
  return NomenclatureClass;
};