'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unit extends Model {
    static associate(models) {

    }
  };
  unit.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    short: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'unit',
  });
  return unit;
};
