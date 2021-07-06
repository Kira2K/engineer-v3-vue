'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EnabledParameters extends Model {
    static associate(models) {
    }
  };
  EnabledParameters.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    modelName: 'enabled_parameter',
    underscored: true,
  });
  return EnabledParameters;
};