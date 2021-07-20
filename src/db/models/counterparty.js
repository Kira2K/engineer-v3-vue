'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class counterparty extends Model {
    static associate(models) {

    }
  };
  counterparty.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    short: {
      type: DataTypes.STRING,


    },
    inn: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    kpp: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    ogrn: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,


    },
    www: {
      type: DataTypes.STRING,


    },
    expiration: {
      type: DataTypes.DATEONLY,


    },

  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'counterparty',
  });
  return counterparty;
};
