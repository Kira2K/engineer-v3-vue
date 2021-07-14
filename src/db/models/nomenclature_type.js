'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature_type extends Model {
    static associate(models) {
      models.nomenclature_group.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature_group, { foreignKey: 'nomenclature_group_id', as: 'ng' });

      this.addScope('defaultScope', {
        include: [{
          model: models.nomenclature_group.unscoped(),
          as: 'ng',
          include: {
            model: models.nomenclature_class.unscoped(),
            as: 'nc',
          }
        }]
      })
    }
  };
  nomenclature_type.init({
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
    modelName: 'nomenclature_type',
  });
  return nomenclature_type;
};
