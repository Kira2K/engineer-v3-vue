'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature_parameter extends Model {
    static associate(models) {
      models.unit.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.unit);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.unit.unscoped(),
          },

        ]
      });
    }
  };
  nomenclature_parameter.init({
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

  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'nomenclature_parameter',
  });
  return nomenclature_parameter;
};
