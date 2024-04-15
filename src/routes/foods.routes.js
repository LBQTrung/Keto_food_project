import { Router } from 'express'
import { getFoodController } from '../controllers/food.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'

const foodRouter = Router()

/**
 * Description: Classify food image
 * Path: /classify
 * Method: POST
 * Body: form-data {image: example.png}
 */
foodRouter.post('/classify', wrapRequestHandler(getFoodController))

export default foodRouter
