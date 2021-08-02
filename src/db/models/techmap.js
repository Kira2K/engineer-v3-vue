'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class techmap extends Model {
    static associate(models) {
      models.nomenclature.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature);
      models.techmap_type.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.techmap_type);
      models.techmap_status.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.techmap_status);
      models.techmap.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.techmap);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.nomenclature.unscoped(),
          },
          {
            model: models.techmap_type.unscoped(),
          },
          {
            model: models.techmap_status.unscoped(),
          },
          {
            model: models.techmap.unscoped(),
          },

        ]
      });
    }
  };
  techmap.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    version: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    approved_at: {
      type: DataTypes.DATEONLY,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    active: {
      type: DataTypes.DATEONLY,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    total_labor_cost: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    total_duration: {
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
    modelName: 'techmap',
  });
  return techmap;
};
