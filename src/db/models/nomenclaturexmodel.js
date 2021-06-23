'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NomenclatureModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.NomenclatureType, {
        foreignKey: 'nomenclatureTypeID'
      })
/*      this.hasMany(models.Nomenclature, {
        foreignKey: 'nomenclatureModelID'
      })*/
    }
  };
  NomenclatureModel.init({
    code: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    defaultScope: {
      include: [
        {
          model: sequelize.models.NomenclatureType,
          right: true,
          include: {
            model: sequelize.models.NomenclatureGroup,
            right: true,
            include: {
              model: sequelize.models.NomenclatureClass,
              right: true,
            }
          }
        }
      ]
    },
    sequelize,
    paranoid: true,
    modelName: 'NomenclatureModel',
  });
  return NomenclatureModel;
};