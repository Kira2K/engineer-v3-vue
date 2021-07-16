'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class value extends Model {
    static associate(models) {
      models.enabled_parameter.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.enabled_parameter);
      models.passport.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.passport);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.passport.unscoped(),
          },
          {
            model: models.enabled_parameter.unscoped(),
            include: [
              {
                model: models.nomenclature_parameter.unscoped(),
              },
            ]
          }
        ]
      });
    }
  };
  value.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    value: {
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
    modelName: 'value',
  });
  return value;
};
