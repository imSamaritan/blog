import Joi from 'joi'

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
}

export function validateSignupInput(inputData) {
  const joiSchema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    ...schema,
  })

  return joiSchema.validate(inputData)
}

export function validateSigninInput(inputData) {
  const joiSchema = Joi.object({ ...schema })
  return joiSchema.validate(inputData)
}

export function createErrorObject(key, message) {
  return { key, message }
}
