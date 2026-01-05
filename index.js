import dotenv from '@dotenvx/dotenvx'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import db from './db/db.js'
import express from 'express'
import { authRouter } from './routes/authRouter.js'
import { homeRouter } from './routes/homeRouter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(helmet())
app.use(cookieParser())
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', './pages')

app.get('/', function(req, res) {
  return res.status(301).redirect('/feeds')
})
//routes
app.use('/', authRouter)
app.use('/', homeRouter)

if (db) {
  app.listen(PORT, function () {
    console.log('Server started...')
    console.log('http://localhost:' + PORT)
  })
}
