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
        foreignKey: 'nomenclatureGroupID'
      })
      this.hasMany(models.NomenclatureModel, {
        foreignKey: 'nomenclatureTypeID'
      })
    }
  };
  NomenclatureType.init({
    code: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    defaultScope: {
      include: [
        {
          model: sequelize.models.NomenclatureGroup,
          include: sequelize.models.NomenclatureClass
        }
      ]
    },
    sequelize,
    paranoid: true,
    modelName: 'NomenclatureType',
  });
  return NomenclatureType;
};