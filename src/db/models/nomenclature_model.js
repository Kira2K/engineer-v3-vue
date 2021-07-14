'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature_model extends Model {
    static associate(models) {
      models.nomenclature_type.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature_type, { foreignKey: 'nomenclature_type_id', as: 'nt' });

      this.addScope('defaultScope', {
        include: [{
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
        }]
      })
    }
  };
  nomenclature_model.init({
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
    modelName: 'nomenclature_model',
  });
  return nomenclature_model;
};
