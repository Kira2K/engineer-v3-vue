'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class runtime extends Model {
    static associate(models) {
      models.passport.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.passport);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.passport.unscoped(),
          },

        ]
      });
    }
  };
  runtime.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    current: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    accepted: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    max: {
      type: DataTypes.INTEGER,

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
    modelName: 'runtime',
  });
  return runtime;
};
