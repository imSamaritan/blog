import dotenv from '@dotenvx/dotenvx'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
export const maxAge = 3 * 60 * 60 * 24

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

export function createToken(payload) {
  return new Promise(function (resolve, reject) {
    jwt.sign(payload, JWT_SECRET,{expiresIn: maxAge }, function (error, token) {
      if (error) 
        reject(error)
      else 
        resolve(token)
    })
  })
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, function(error, decoded) {
    if (error) {
      return {error: error.message, data: null}
    }
    else {
      return {error: null, data: decoded}
    }
  })
}
