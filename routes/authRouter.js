import express from 'express'
import {
  signupPOST,
  signupGET,
  signinPOST,
  signinGET,
} from '../controllers/AuthController.js'

const router = express.Router()

router.get('/signup', signupGET)
router.get('/signin', signinGET)

router.post('/signup', signupPOST)
router.post('/signin', signinPOST)

export { router as authRouter }
