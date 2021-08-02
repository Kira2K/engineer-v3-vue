'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class consumable extends Model {
    static associate(models) {
      models.labor.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.labor);
      models.nomenclature.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.labor.unscoped(),
          },
          {
            model: models.nomenclature.unscoped(),
          },

        ]
      });
    }
  };
  consumable.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'consumable',
  });
  return consumable;
};
