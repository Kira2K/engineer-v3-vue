'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.nomenclature_type, {
        foreignKey: 'nomenclatureTypeId',
        as: 'nt'
      })
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
    title: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    modelName: 'nomenclature_model',
  });
  return nomenclature_model;
};