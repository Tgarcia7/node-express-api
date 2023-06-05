import mongoose from 'mongoose'

export function loadErrorHandlers(app) {
  // catch not found routes
  app.use((req, res) => {
    res.status(404).send({ message: 'Not found' })
  })

  // catch exceptions thrown in code
  app.use((err, req, res, _next) => {
    console.error(err)
    res.status(500).send('server error')
  })

  process.on('uncaughtException', async () => { await handleFatalError() })
  process.on('unhandledRejection', async () => { await handleFatalError() })
  process.on('SIGINT', async () => { await closeDB() })
}

async function handleFatalError(err) {
  await closeDB()
  console.error('[fatal error]', err)
  process.exit(1)
}

async function closeDB() {
  await mongoose.connection.close()
}
