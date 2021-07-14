'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature_group extends Model {
    static associate(models) {
      models.nomenclature_class.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature_class, { foreignKey: 'nomenclature_class_id', as: 'nc' });

      this.addScope('defaultScope', {
        include: [{
          model: models.nomenclature_class.unscoped(),
          as: 'nc',
        }]
      })
    }
  };
  nomenclature_group.init({
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
    modelName: 'nomenclature_group',
  });
  return nomenclature_group;
};
