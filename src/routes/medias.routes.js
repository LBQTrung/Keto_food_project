import { Router } from 'express'
import { staticFileController, uploadFileController } from '../controllers/media.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'

const mediaRouter = Router()

/**
 * Description: Classify food image
 * Path: /upload
 * Method: POST
 * Body: form-data {image: example.png}
 */
mediaRouter.post('/upload', wrapRequestHandler(uploadFileController))

/**
 * Description: Classify food image
 * Path: /static/:name
 * Method: GET
 */
mediaRouter.get('/static/:name', wrapRequestHandler(staticFileController))

export default mediaRouter
