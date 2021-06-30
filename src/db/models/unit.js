'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unit extends Model {
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
  unit.init({
    title: DataTypes.STRING,
    short: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    modelName: 'unit',
  });
  return unit;
};