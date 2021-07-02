'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NomenclatureParameters extends Model {
    static associate(models) {
      models.unit.hasMany(this)
      this.belongsTo(models.unit)
      this.addScope('defaultScope', {
        include: [{
          model: models.unit.unscoped()
        }]
      })
    }
  };
  NomenclatureParameters.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
  }, {
    sequelize,
    modelName: 'nomenclature_parameter',
    underscored: true,
  });
  return NomenclatureParameters;
};