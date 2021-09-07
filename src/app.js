require('dotenv').config()
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

app.use(crud('/api/unit', sequelizeCrud(db.unit), {
    filters: {
      id: value => ({
        [Op.gt]: value,
      }),
    }
  }
))
app.use(crud('/api/pcheck', {
  getList: ({ filter, limit, offset, order }) => {
    return { rows: [{ filter, limit, offset, order }]}
  }
}))
app.use(crud('/api/nomenclatureclass', sequelizeCrud(db.nomenclature_class)))
app.use(crud('/api/nomenclaturegroup', sequelizeCrud(db.nomenclature_group)))
app.use(crud('/api/nomenclaturemodel', sequelizeCrud(db.nomenclature_model)))
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
app.use(crud('/api/passports', {
  getList: async ({ filter, limit, offset, order }) => {
    const where = {}
    if (filter.produced) where.produced = { [Op.between]: [filter.produced[0], filter.produced[1]] }

    return await db.passport.findAndCountAll({ limit, offset, order,
      where,
      include: [
        {
          model: db.nomenclature.unscoped(),
          where: {
            title: {
              [Op.iLike]: `%${filter['nomenclature.title'] || ''}%`
            }
          }
        },
        {
          model: db.counterparty.unscoped(),
          where: {
            title: {
              [Op.iLike]: `%${filter['counterparty.title'] || ''}%`
            }
          }
        },
      ]
    })
  }
}))
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
