import express from 'express'
import foodRouter from './routes/foods.routes.js'
import { defaultErrorHandler } from './middlewares/error.middlewares.js'
import { initUploadsFolder } from './utils/files.js'
import bodyParser from 'body-parser'
import mediaRouter from './routes/medias.routes.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

initUploadsFolder()

app.get('/', (req, res) => {
  res.json({
    message: 'Hello cái lồn'
  })
})

app.use('/food', foodRouter)
app.use('/media', mediaRouter)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`)
})
