'use strict';

require('dotenv').config()

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const db = {};

const sequelize = new Sequelize(process.env.DB_URL);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log(model, typeof model, model instanceof Sequelize.Model)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/*db.NomenclatureClass.addScope('defaultScope', {
  include: [
    {
      model: db.NomenclatureGroup.unscoped(),
    }
  ]
}, {override: true})*/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
