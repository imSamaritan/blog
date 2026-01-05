import User from '../models/User.js'
import { hashPassword, createToken, maxAge } from '../utility/utils.js'
import { validateSignupInput, createErrorObject } from '../utility/validation.js'

const user = User.model('users')

async function signupPOST(req, res) {
  const { error } = validateSignupInput(req.body)

  if (error) {
    const { path, message } = error.details[0]
    const errorObject = createErrorObject(path[0], message)
    return res.status(400).json(errorObject)
  }

  //Hash password
  req.body.password = await hashPassword(req.body.password)

  try {
    //Check if user with given email exists
    const [emailExists] = await user.emailExists(req.body.email)
    if (emailExists.recordsCount > 0) {
      const errorObject = createErrorObject('email', 'User email address, already registered!')
      return res.status(400).json(errorObject)
    }

    //Create a user
    const createdUser = await user.create(req.body)
    if (createdUser) {
      const { id, username } = createdUser
      const payload = { id, username }

      //Create a new token
      const token = await createToken(payload)
      //Store token into a cookie
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

      return res.status(201).redirect('/feeds')
    }
  } catch (error) {
    error = createErrorObject('server', error.message)
    return res.status(500).json(error)
  }
}

async function signinPOST(req, res) {
  return res.json({ page: 'Sign in' })
}

function signupGET(req, res) {
  return res.render('signup', { title: 'Create account' })
}

function signinGET(req, res) {
  return res.render('signin', { title: 'Login' })
}

export { signupPOST, signupGET, signinPOST, signinGET }
