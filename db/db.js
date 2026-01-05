import dotenv from '@dotenvx/dotenvx'
import mySQLizer from 'mysqlizer'

dotenv.config()
const db = new mySQLizer()

export default db
