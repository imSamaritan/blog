import db from '../db/db.js'

class User {
  constructor(table) {
    this.table = table
  }
  
  static model(table) {
    return new User(table)
  }

  async findAll() {
    try {
      const results = await db.select('*').from(this.table)
      return results
    } catch (error) {
      throw error
    }
  }

  async findById(_id) {
    try {
      const [result] = await db
        .select('*')
        .from(this.table)
        .where('id', '=', { value: _id, type: 'number' })
      return result
    } catch (error) {
      throw error
    }
  }

  async emailExists(email) {
    try {
      const response = await db
        .fromTable(this.table)
        .countRecords()
        .where('email', '=', { value: email, type: 'string' })
      return response
    } catch (error) {
      throw error
    }
  }

  async create(data) {
    try {
      const createUserResponse = await db.insert(data).into(this.table)
      if (createUserResponse.affectedRows > 0) {
        const { insertId: insertedId } = createUserResponse
        const createdUser = await this.findById(insertedId)
        return createdUser
      }
    } catch (error) {
      throw error
    }
  }
}

export default User
