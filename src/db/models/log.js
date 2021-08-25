'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log extends Model {
    static associate(models) {

      this.addScope('defaultScope', {
        include: [

        ]
      });
    }
  };
  log.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    person: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    module: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    action: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    extra: {
      type: DataTypes.TEXT,


    },

  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'log',
  });
  return log;
};
