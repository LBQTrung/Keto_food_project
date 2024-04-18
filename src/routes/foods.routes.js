import { Router } from 'express'
import {
  getDetailsMealController,
  getFoodController,
  instructFoodController,
  searchFoodController
} from '../controllers/food.controllers.js'
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
 * Query: { name: string }
 */
foodRouter.post('/instruct', wrapRequestHandler(instructFoodController))

/**
 * Description: Search the ingradients, instruction with text
 * Path: /text-search
 * Method: POST
 * Query: { name: string }
 */
foodRouter.post('/text-search', wrapRequestHandler(searchFoodController))

/**
 * Description: Receive details information of a meal
 * Path: /details
 * Method: POST
 * Query: { name: string }
 */
foodRouter.post('/details', wrapRequestHandler(getDetailsMealController))

export default foodRouter
