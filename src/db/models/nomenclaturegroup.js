'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NomenclatureGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.NomenclatureClass, {
        foreignKey: 'nomenclatureClassID'
      })
      this.hasMany(models.NomenclatureType, {
        foreignKey: 'nomenclatureGroupID'
      })      // define association here
    }
  };
  NomenclatureGroup.init({
    code: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'NomenclatureGroup',
  });
  return NomenclatureGroup;
};