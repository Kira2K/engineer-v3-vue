'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toro extends Model {
    static associate(models) {
      models.malfunction_type.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.malfunction_type);
      models.repair_type.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.repair_type);
      models.passport.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.passport);
      models.branch.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.branch);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.malfunction_type.unscoped(),
          },
          {
            model: models.repair_type.unscoped(),
          },
          {
            model: models.passport.unscoped(),
          },
          {
            model: models.branch.unscoped(),
          },

        ]
      });
    }
  };
  toro.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    registered: {
      type: DataTypes.DATE,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,


    },
    runtime: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    toro_start: {
      type: DataTypes.DATEONLY,


    },
    toro_end: {
      type: DataTypes.DATEONLY,


    },
    labor_cost: {
      type: DataTypes.INTEGER,


    },

  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'toro',
  });
  return toro;
};
