import { verifyToken } from '../utility/utils.js'

function auth(req, res, next) {
  const token = req.cookies.jwt

  if (!token) return res.status(301).redirect('/signin')

  const verifiedToken = verifyToken(token)

  if (verifiedToken.error || !verifiedToken.data) {
    return res.status(301).redirect('/signin')
  }

  res.locals.user = verifiedToken.data
  next()
}

function payload(req, res, next) {
  const token = req.cookies.jwt

  if (!token) {
    res.locals.user = null
    return next()
  }

  const verifiedToken = verifyToken(token)

  if (verifiedToken.error || !verifiedToken.data) {
    res.locals.user = null
    return next()
  }

  res.locals.user = verifiedToken.data
  next()
}

export { auth, payload }
