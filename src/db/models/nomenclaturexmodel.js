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
        foreignKey: 'nomenclatureTypeID',
        as: 'nt'
      })
      this.addScope('defaultScope', {
        include: [{
          model: models.NomenclatureType.unscoped(),
          as: 'nt',
          include: {
            model: models.NomenclatureGroup.unscoped(),
            as: 'ng',
            include: {
              model: models.NomenclatureClass.unscoped(),
              as: 'nc',
            }
          }
        }]
      })
    }
  };
  NomenclatureModel.init({
    code: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'NomenclatureModel',
  });
  return NomenclatureModel;
};