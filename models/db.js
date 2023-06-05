import mongoose from 'mongoose'
import config from '../config.js'

const dbConfig = { dbName: config.DB_NAME }

async function init() {
  try {
    await mongoose.connect(config.DB_URI, dbConfig)
    console.info('DB initialized successfully')
  } catch (error) {
    console.error(`DB connection error: ${err}`)
    process.exit(0)
  }
}

export default { init }
