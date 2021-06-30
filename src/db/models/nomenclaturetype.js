'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.nomenclature_group, {
        foreignKey: 'nomenclatureGroupId',
        as: 'ng'
      })
      this.hasMany(models.nomenclature_model, {
        foreignKey: 'nomenclatureTypeId'
      })
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
    title: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    modelName: 'nomenclature_type',
  });
  return nomenclature_type;
};