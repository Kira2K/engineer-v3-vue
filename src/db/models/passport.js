'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passport extends Model {
    static associate(models) {
      models.nomenclature.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature);
      models.counterparty.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.counterparty);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.nomenclature.unscoped(),
            include: [
              {
                model: models.unit.unscoped(),
              },
            ]
          },
/*          {
            model: models.counterparty.unscoped(),
          },
          {
            model: models.part.unscoped(),
          },
          {
            model: models.commission.unscoped(),
            include: [
              {
                model: models.branch.unscoped(),
              },
            ]
          },
          {
            model: models.toro.unscoped(),
            include: [
              {
                model: models.branch.unscoped(),
              },
              {
                model: models.repair_type.unscoped(),
              },
              {
                model: models.malfunction_type.unscoped(),
              },
            ]
          },
*/        ]
      })
    }
  };
  passport.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    factory_id: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    produced: {
      type: DataTypes.DATEONLY,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    commissioned: {
      type: DataTypes.DATEONLY,


    },
    provisioner: {
      type: DataTypes.STRING,


    },
    warranty: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    warranty_expiration: {
      type: DataTypes.DATEONLY,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    extra: {
      type: DataTypes.TEXT,


    },
    accepted_runtime: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    max_runtime: {
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
    modelName: 'passport',
  });
  return passport;
};
