import http from 'http'
import config from './config.js'
import app from './app.js'
import db from './models/db.js'

const server = http.createServer(app)

app.listen(config.PORT, async () => {
  await db.init()
  console.info(`API initialized, listening on port: ${config.PORT}`)
})

export default server
