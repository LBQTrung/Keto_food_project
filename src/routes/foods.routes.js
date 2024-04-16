import { Router } from 'express'
import { getFoodController, instructFoodController } from '../controllers/food.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'

const foodRouter = Router()

/**
 * Description: Classify food image
 * Path: /classify
 * Method: POST
 * Body: form-data {image: example.png}
 */
foodRouter.post('/classify', wrapRequestHandler(getFoodController))

/**
 * Description: Instructions for cooking the specified dish
 * Path: /instruct
 * Method: POST
 * Body: { name: string }
 */
foodRouter.post('/instruct', wrapRequestHandler(instructFoodController))

export default foodRouter
