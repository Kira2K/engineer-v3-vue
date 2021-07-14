'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature extends Model {
    static associate(models) {
      models.unit.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.unit);
      models.nomenclature_model.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature_model, { foreignKey: 'nomenclature_model_id', as: 'nm' });

      this.addScope('defaultScope', {
        include: [{
          model: models.nomenclature_model.unscoped(),
          as: 'nm',
          include: {
            model: models.nomenclature_type.unscoped(),
            as: 'nt',
            include: {
              model: models.nomenclature_group.unscoped(),
              as: 'ng',
              include: {
                model: models.nomenclature_class.unscoped(),
                as: 'nc',
              }
            }
          }
        },
        { model: models.unit.unscoped() }
        ]
      })
    }
  };
  nomenclature.init({
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
    designation: {
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
    modelName: 'nomenclature',
  });
  return nomenclature;
};
