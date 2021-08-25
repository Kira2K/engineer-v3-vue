'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warranty extends Model {
    static associate(models) {
      models.passport.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.passport);

      this.addScope('defaultScope', {
        include: [
          {
            model: models.passport.unscoped(),
          },

        ]
      });
    }
  };
  warranty.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    warranty_runtime: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    wararnty: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    expiration: {
      type: DataTypes.DATEONLY,

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
    modelName: 'warranty',
  });
  return warranty;
};
