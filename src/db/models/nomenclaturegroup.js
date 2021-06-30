'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.nomenclature_class, {
        foreignKey: 'nomenclatureClassId',
        as: 'nc'
      })
      this.hasMany(models.nomenclature_type, {
        foreignKey: 'nomenclatureGroupId'
      })
      this.addScope('defaultScope', {
        include: [{
          model: models.nomenclature_class.unscoped(),
          as: 'nc',
        }]
      })
    }
  };
  nomenclature_group.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    modelName: 'nomenclature_group',
  });
  return nomenclature_group;
};