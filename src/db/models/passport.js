'use strict';
const {
  Op, Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passport extends Model {
    static associate(models) {
      models.nomenclature.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.nomenclature);
      models.counterparty.hasMany(this)
      this.belongsTo(models.counterparty);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.nomenclature.unscoped(),
            include: [
              {
                model: models.nomenclature_vendor,
                as: 'nv',
              },
              {
                model: models.unit.unscoped(),
              },
            ]
          },
          {
            model: models.counterparty.unscoped(),
          },
          {
            model: models.commission.unscoped(),
            include: [
              {
                model: models.branch.unscoped(),
              },
            ],
            required: false,
            where: {
              id: {
                [Op.in]: sequelize.literal('(select distinct on (passport_id) id from commission order by passport_id, commissioned desc)')
              }
            }
          },

        ]
      });
    }
  };
  passport.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,


    },
    serial: {
      type: DataTypes.STRING,


    },
    partnumber: {
      type: DataTypes.STRING,


    },
    produced: {
      type: DataTypes.DATEONLY,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING,


    },
    commissioned: {
      type: DataTypes.DATEONLY,
      validate: {
        isGreaterThanProduced(value) {
          if (value < this.produced) {
            throw new Error('Commissioned date must be greater than Produced');
          }
        }
      }

    },
    extra: {
      type: DataTypes.TEXT,


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
