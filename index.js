import dotenv from '@dotenvx/dotenvx'
import cookieParser from 'cookie-parser'
import db from './db/db.js'
import express from 'express'
import helmet from 'helmet'
import { payload } from './middleware/authMiddleware.js'
import { authRouter } from './routes/authRouter.js'
import { homeRouter } from './routes/homeRouter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Configure helmet with proper CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        styleSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        fontSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        connectSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  }),
)
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', './pages')

app.get('/', function (req, res) {
  return res.status(301).redirect('/feeds')
})
//routes
app.use('/', authRouter)
app.use('/', homeRouter)

app.use(payload)

if (db) {
  app.listen(PORT, function () {
    console.log('Server started...')
    console.log('http://localhost:' + PORT)
  })
}
