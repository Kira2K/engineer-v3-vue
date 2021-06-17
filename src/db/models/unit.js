'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
/*      this.hasMany(models.Nomenclature, {
        foreignKey: 'unitID'
      })*/
    }
  };
  Unit.init({
    code: DataTypes.INTEGER,
    title: DataTypes.STRING,
    short: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Unit',
  });
  return Unit;
};