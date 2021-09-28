'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature extends Model {
    static associate(models) {
      models.unit.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.unit);
      models.nomenclature_vendor.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature_vendor, { foreignKey: 'nomenclature_vendor_id', as: 'nv' });

      this.addScope('defaultScope', {
        include: [{
          model: models.nomenclature_vendor.unscoped(),
          as: 'nv',
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
    model: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    vendor_id: {
      type: DataTypes.STRING,


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
