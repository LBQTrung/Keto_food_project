import { Router } from 'express'
import {
  getDetailsMealController,
  getFoodController,
  getMealsByCategoryController,
  getRandomMealsController,
  instructFoodController,
  searchFoodController
} from '../controllers/food.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'

const foodRouter = Router()

/**
 * Description: Classify food image
 * Path: /classify
 * Method: POST
 * Body: {filename: string}
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
 * Method: GET
 * Query: { name: string }
 */
foodRouter.get('/text-search', wrapRequestHandler(searchFoodController))

/**
 * Description: Receive details information of a meal
 * Path: /details
 * Method: GET
 * Query: { id: string }
 */
foodRouter.get('/details', wrapRequestHandler(getDetailsMealController))

/**
 * Description: Receive details information of a meal
 * Path: /details
 * Method: GET
 * Query: { quantity: number }
 */
foodRouter.get('/random', wrapRequestHandler(getRandomMealsController))

/**
 * Description: Get meals by category
 * Path: /details
 * Method: GET
 * Query: { quantity: number }
 */
foodRouter.get('/category', wrapRequestHandler(getMealsByCategoryController))

export default foodRouter
