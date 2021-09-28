'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commission extends Model {
    static associate(models) {
      models.passport.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.passport);
      models.branch.hasMany(this, { foreignKey: { allowNull: false, validate: { notEmpty: true } } })
      this.belongsTo(models.branch);

      this.addScope('defaultScope', {
        include: [
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
  commission.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    commission_id: {
      type: DataTypes.STRING,


    },
    commissioned: {
      type: DataTypes.DATEONLY,


    },
    inventory_id: {
      type: DataTypes.STRING,


    },
    ip: {
      type: DataTypes.STRING,


    },
    mac: {
      type: DataTypes.STRING,


    },

  }, {
    sequelize,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'commission',
  });
  return commission;
};
