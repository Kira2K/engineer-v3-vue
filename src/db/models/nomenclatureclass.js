'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature_class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.nomenclature_group, {
        foreignKey: 'nomenclatureClassId'
      })
    }
  };
  nomenclature_class.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    modelName: 'nomenclature_class',
  });
  return nomenclature_class;
};