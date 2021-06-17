const express =  require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { crud, sequelizeCrud } = require('express-sequelize-crud')
const { Unit, Nomenclature, NomenclatureClass, NomenclatureGroup, NomenclatureModel, NomenclatureType } = require('./db/models/')

const port = process.env.PORT || 8090

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

app.set('view engine', 'pug')
app.set('views', 'src/views')

app.use('/plugins', express.static('node_modules/admin-lte/plugins'))
app.use('/dist', express.static('node_modules/admin-lte/dist'))

app.get('/', (req, res) => {
  res.render('index')
})

app.use(methodOverride('_method'))
app.use(crud('/api/unit', sequelizeCrud(Unit)))
app.use(crud('/api/nomenclatureclass', sequelizeCrud(NomenclatureClass)))
app.use(crud('/api/nomenclaturegroup', sequelizeCrud(NomenclatureGroup)))
app.use(crud('/api/nomenclaturemodel', sequelizeCrud(NomenclatureModel)))
app.use(crud('/api/nomenclaturetype', sequelizeCrud(NomenclatureType)))
app.use(crud('/api/nomenclature', sequelizeCrud(Nomenclature)))

app.get('/:module/:action?/:id?', (req, res) => {
  const { module, action } = req.params
  res.render(`${module}/${action || 'index'}`)
})

app.listen(port, () => {
  console.log(`Up on :${port}`)
})