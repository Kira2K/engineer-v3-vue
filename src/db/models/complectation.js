'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class complectation extends Model {
    static associate(models) {
      models.nomenclature.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature);
      models.part.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.part);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.nomenclature.unscoped(),
          },
          {
            model: models.part.unscoped(),
          },

        ]
      });
    }
  };
  complectation.init({
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
    modelName: 'complectation',
  });
  return complectation;
};
