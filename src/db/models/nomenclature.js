'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nomenclature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Unit.hasMany(this, {
        foreignKey: 'unitID'
      })
      this.belongsTo(models.Unit, {
        foreignKey: 'unitID'
      })
      models.NomenclatureModel.hasMany(this, {
        foreignKey: 'nomenclatureModelID'
      })
      this.belongsTo(models.NomenclatureModel, {
        foreignKey: 'nomenclatureModelID'
      })
    }
  };
  Nomenclature.init({
    code: DataTypes.INTEGER,
    title: DataTypes.STRING,
    designation: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Nomenclature',
  });
  return Nomenclature;
};