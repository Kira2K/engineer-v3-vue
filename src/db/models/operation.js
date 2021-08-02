'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class operation extends Model {
    static associate(models) {
      models.labor.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.labor);
      models.profession.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.profession);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.labor.unscoped(),
          },
          {
            model: models.profession.unscoped(),
          },

        ]
      });
    }
  };
  operation.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,


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
    modelName: 'operation',
  });
  return operation;
};
