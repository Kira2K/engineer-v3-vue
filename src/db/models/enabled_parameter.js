'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class enabled_parameter extends Model {
    static associate(models) {
      models.nomenclature.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature);
      models.nomenclature_parameter.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature_parameter);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.nomenclature_parameter.unscoped(),
            include: [
              {
                model: models.unit.unscoped(),
              },
            ]
          },
        ]
      });
    }
  };
  enabled_parameter.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },

  }, {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'enabled_parameter',
  });
  return enabled_parameter;
};
