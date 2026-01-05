import express from 'express'
import { auth } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/feeds', auth, function (req, res) {
  return res.render('home', { title: 'Home'})
})

export { router as homeRouter }
