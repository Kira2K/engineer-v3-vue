'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nomenclature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Unit.hasMany(this, {
        foreignKey: 'unitID'
      })
      this.belongsTo(models.Unit, {
        foreignKey: 'unitID'
      })
      models.NomenclatureModel.hasMany(this, {
        foreignKey: 'nomenclatureModelID'
      })
      this.belongsTo(models.NomenclatureModel, {
        foreignKey: 'nomenclatureModelID',
        as: 'nm'
      })

      this.addScope('defaultScope', {
        include: [{
          model: models.NomenclatureModel.unscoped(),
          as: 'nm',
          include: {
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
          }
        },
        {
          model: models.Unit.unscoped()
        }]
      })
    }
  };
  Nomenclature.init({
    code: DataTypes.INTEGER,
    title: DataTypes.STRING,
    designation: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Nomenclature',
  });
  return Nomenclature;
};