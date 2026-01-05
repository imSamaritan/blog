import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/feeds', authMiddleware, function (req, res) {
  return res.render('home', { title: 'Home' })
})

export { router as homeRouter }
