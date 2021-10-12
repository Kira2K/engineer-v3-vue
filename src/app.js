require('dotenv').config()
const _ = require('lodash')
const debug = require('debug')
const express =  require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { Op } = require('sequelize')

const { crud, sequelizeCrud } = require('express-sequelize-crud')
const db = require('./db/models/')

const port = process.env.PORT || 8090
const backendAddr = process.env.BACKEND_ADDR || `http://localhost:${port}`

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/api/keys/:model', async (req, res) => {
  var { model } = req.params
  res.send( Object.keys(await db[model].findOne({ raw: true })) )
})

app.get('/api/list/:model', async (req, res) => {
  var { model } = req.params
  console.log(req.query)
  var fields = JSON.parse(req.query.fields || '[]')
  var aliases = JSON.parse(req.query.aliases || '{}')
  var result = await db[model].findAndCountAll({ limit: 5e10, raw: true })
  if (fields && fields.length) result.rows = result.rows.map(el => _.mapKeys(_.pick(el, fields), (val, key) => aliases[key] || key.replace(/^.+\./, '')))
  res.send(result)
})

app.use(crud('/api/unit', sequelizeCrud(db.unit)))
app.use(crud('/api/nomenclatureclass', sequelizeCrud(db.nomenclature_class)))
app.use(crud('/api/nomenclaturegroup', sequelizeCrud(db.nomenclature_group)))
app.use(crud('/api/nomenclaturevendor', sequelizeCrud(db.nomenclature_vendor)))
app.use(crud('/api/nomenclaturetype', sequelizeCrud(db.nomenclature_type)))
app.use(crud('/api/nomenclature', sequelizeCrud(db.nomenclature)))
app.use(crud('/api/nomenclatureparameter', sequelizeCrud(db.nomenclature_parameter)))
app.use(crud('/api/enabledparameter', sequelizeCrud(db.enabled_parameter)))
app.use(crud('/api/branch', sequelizeCrud(db.branch)))
app.use(crud('/api/commission', sequelizeCrud(db.commission)))
app.use(crud('/api/counterparty', sequelizeCrud(db.counterparty)))
app.use(crud('/api/complectation', sequelizeCrud(db.complectation)))
app.use(crud('/api/malfunction_type', sequelizeCrud(db.malfunction_type)))
app.use(crud('/api/part', sequelizeCrud(db.part)))
app.use(crud('/api/passport', sequelizeCrud(db.passport)))
app.use(crud('/api/repair_type', sequelizeCrud(db.repair_type)))
app.use(crud('/api/toro', sequelizeCrud(db.toro)))
app.use(crud('/api/value', sequelizeCrud(db.value)))
app.use(crud('/api/warranty', sequelizeCrud(db.warranty)))
app.use(crud('/api/runtime', sequelizeCrud(db.runtime)))

app.use(crud('/api/log', sequelizeCrud(db.log)))

app.use('/api/*', (err, req, res, next) => {
  const { errors } = err
  console.log({ err: JSON.stringify(err, 0, 2) })
  res.status(400).send(err)
})

app.listen(port, () => {
  console.log(`CRUD on :${port}`)
})

require('./front')
