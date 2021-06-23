const express =  require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const cors = require('cors')
const morgan = require('morgan')
const fetch = require('node-fetch')

const { crud, sequelizeCrud } = require('express-sequelize-crud')
const db = require('./db/models/')

const port = process.env.PORT || 8090
const frontPort = process.env.FRONT_PORT || 8091

const app = express()
const front = express()


app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

front.use(favicon('src/views/favicon.ico'))

front.use('/plugins', express.static('node_modules/admin-lte/plugins'))
front.use('/dist', express.static('node_modules/admin-lte/dist'))


front.use(bodyParser.urlencoded({extended: false}))

front.set('view engine', 'pug')
front.set('views', 'src/views')

front.get('/', (req, res) => {
  res.render('index')
})

//app.use(methodOverride('_method'))

//app.use('/api/*', async (req, res, next) => {
/*  console.log(req.query)
  await next()
//  if (req.query.redirect) res.redirect(302, req.query.redirect)
})*/

app.use(crud('/api/unit', sequelizeCrud(db.Unit)))
app.use(crud('/api/nomenclatureclass', sequelizeCrud(db.NomenclatureClass)))
app.use(crud('/api/nomenclaturegroup', sequelizeCrud(db.NomenclatureGroup)))
app.use(crud('/api/nomenclaturemodel', sequelizeCrud(db.NomenclatureModel)))
app.use(crud('/api/nomenclaturetype', sequelizeCrud(db.NomenclatureType)))
app.use(crud('/api/nomenclature', sequelizeCrud(db.Nomenclature)))

app.use('/api/*', (err, req, res, next) => {
  const { errors } = err
  if (errors) return res.status(400).send({ errors })
  res.status(400).send({ error: err })
})

front.use('/:module/:action/:id', async (req, res, next) => {
  const { module, action, id } = req.params
  const rest = await fetch(`http://localhost:${port}/api/${module}/${id}`).then(res => res.json())
  res.instanceData = rest
  return next()
})

front.get('/:module/:action?/:id?', async (req, res) => {
  const { module, action } = req.params
  const { instanceData } = res
  res.render(`${module}/${action || 'index'}`, instanceData)
})


front.post('/:module/edit/:id?', async (req, res, next) => {
  const { module, id } = req.params
  const { instanceData } = res
  console.log(instanceData, JSON.stringify(req.body), Object.assign({}, instanceData, req.body))

  const result = await fetch(`http://localhost:${port}/api/${module}/${id ? id : ''}`, {
    method: id ? 'put' : 'post',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' },
  })
  if (result.ok) {
    return res.redirect(302, `/${module}`)
  }
  const { errors } = await result.json()
  console.log(errors)
  return res.redirect(302, `/${module}/edit/${id ? id : ''}`)
})

front.post('/:module/delete/:id', async (req, res, next) => {
  const { module, id } = req.params
  const result = await fetch(`http://localhost:${port}/api/${module}/${id ? id : ''}`, {
    method: 'delete'
  })
  if (result.ok) {
    return res.redirect(302, `/${module}`)
  }
  const { errors } = await result.json()
  console.log(errors)
  return res.redirect(302, `/${module}/delete/${id ? id : ''}`)
})

app.listen(port, () => {
  console.log(`CRUD on :${port}`)
})

front.listen(frontPort, () => {
  console.log(`Front on :${frontPort}`)
})
