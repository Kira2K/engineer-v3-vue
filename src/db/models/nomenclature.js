'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nomenclature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.unit.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.unit)
      models.nomenclature_model.hasMany(this)
      this.belongsTo(models.nomenclature_model, {
        foreignKey: 'nomenclatureModelId',
        as: 'nm'
      })
      this.belongsToMany(models.nomenclature_parameter, { through: models.enabled_parameter })
      models.nomenclature_parameter.belongsToMany(this, { through: models.enabled_parameter })

      this.addScope('defaultScope', {
        include: [{
          model: models.nomenclature_model.unscoped(),
          as: 'nm',
          include: {
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
          }
        },
        { model: models.unit.unscoped() }
        ]
      })
    }
  };
  nomenclature.init({
    title: DataTypes.STRING,
    designation: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    modelName: 'nomenclature',
  });
  return nomenclature;
};
