import { verifyToken } from '../utility/utils.js'

function authMiddleware(req, res, next) {
  const token = req.cookies.jwt

  if (token) {
    const verifiedToken = verifyToken(token)

    if (verifiedToken.error && verifiedToken.data === null) {
      return res.status(301).redirect('/signin')
    }

    if (verifiedToken.error === null && verifiedToken.data) {
      next()
    }
  } else {
    return res.status(301).redirect('/signin')
  }
}

export default authMiddleware
