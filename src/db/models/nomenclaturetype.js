'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NomenclatureType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.NomenclatureGroup, {
        foreignKey: 'nomenclatureGroupID',
        as: 'ng'
      })
      this.hasMany(models.NomenclatureModel, {
        foreignKey: 'nomenclatureTypeID'
      })
      this.addScope('defaultScope', {
        include: [{
          model: models.NomenclatureGroup.unscoped(),
          as: 'ng',
          include: {
            model: models.NomenclatureClass.unscoped(),
            as: 'nc',
          }
        }]
      })
    }
  };
  NomenclatureType.init({
    code: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'NomenclatureType',
  });
  return NomenclatureType;
};