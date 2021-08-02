'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class techmap_type extends Model {
    static associate(models) {

      this.addScope('defaultScope', {
        include: [

        ]
      });
    }
  };
  techmap_type.init({
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

  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'techmap_type',
  });
  return techmap_type;
};
