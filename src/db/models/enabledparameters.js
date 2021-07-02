'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EnabledParameters extends Model {
    static associate(models) {
      models.nomenclature.hasMany(this)
      this.belongsTo(models.nomenclature)
      models.nomenclature_parameter.hasMany(this)
      this.belongsTo(models.nomenclature_parameter)
      this.addScope('defaultScope', {
        include: [{
          model: models.nomenclature_parameter.unscoped()
        }, {
          model: models.nomenclature.unscoped()
        }]
      })
    }
  };
  EnabledParameters.init({

  }, {
    sequelize,
    modelName: 'enabled_parameter',
    underscored: true,
  });
  return EnabledParameters;
};