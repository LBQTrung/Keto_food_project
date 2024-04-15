import express from 'express'
import foodRouter from './routes/foods.routes.js'
import { defaultErrorHandler } from './middlewares/error.middlewares.js'
import { initUploadsFolder } from './utils/files.js'

const app = express()

const PORT = 3000

initUploadsFolder()

app.get('/', (req, res) => {
  res.json({
    message: 'Hello cái lồn'
  })
})

app.use('/food', foodRouter)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`)
})
