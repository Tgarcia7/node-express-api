import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/index.js'
import { loadErrorHandlers } from './utilities/errors.js'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', router)

loadErrorHandlers(app)

export default app
