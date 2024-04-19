import { ErrorWithStatus } from '../models/Errors.js'
import path from 'path'
import { UPLOAD_DIR } from '../constants/dir.js'
import { handleUploadImage } from '../utils/files.js'
import foodClassificationModel from '../utils/teachableMachineModel.js'
import { handleInstructFood, handleOutputModel } from '../utils/foodInstructionModel.js'
import axios from 'axios'
import PublicAPI from '../constants/publicAPI.js'
import { getDetailsIngradients } from '../utils/handleAPIResponses.js'
import HTTP_STATUS from '../constants/httpStatus.js'

export const getFoodController = async (req, res) => {
  const { filename } = req.body
  const imagePath = path.resolve(UPLOAD_DIR, filename)

  const classification = await foodClassificationModel.classifyImage(imagePath)

  const result = classification[0]

  return res.json({
    message: 'Classify image successfully',
    result: result
  })
}

export const instructFoodController = async (req, res) => {
  const foodName = req.query.name

  const rawDataInstruction = await handleInstructFood(foodName)

  const result = handleOutputModel(rawDataInstruction)

  return res.json({
    message: 'Instruct food successfully',
    result: result
  })
}

export const searchFoodController = async (req, res) => {
  // Receive name of food
  const foodName = req.query.name

  // Call MealDB API
  const rawResponse = await axios.get(PublicAPI.SEARCH_BY_FOOD_NAME, {
    params: {
      s: foodName
    }
  })

  const rawMealsData = rawResponse.data.meals
  if (!rawMealsData) {
    throw new ErrorWithStatus({
      message: 'No meal found',
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  const mealsData = rawMealsData.map((meal) => {
    return {
      meal_name: meal.strMeal,
      area: meal.strArea,
      instructions: meal.strInstructions,
      ingredients: getDetailsIngradients(meal),
      image_url: meal.strMealThumb
    }
  })

  return res.json({
    message: 'Search food successfully',
    result: mealsData
  })
}

export const getDetailsMealController = async (req, res) => {
  const foodName = req.query.name

  // Call MealDB API
  const rawResponse = await axios.get(PublicAPI.SEARCH_BY_FOOD_NAME, {
    params: {
      s: foodName
    }
  })

  const rawMealsData = rawResponse.data.meals
  if (!rawMealsData) {
    throw new ErrorWithStatus({
      message: 'No meal found',
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  const mealData = rawMealsData.map((meal) => {
    return {
      meal_name: meal.strMeal,
      area: meal.strArea,
      instructions: meal.strInstructions,
      ingredients: getDetailsIngradients(meal),
      image_url: meal.strMealThumb
    }
  })[0]

  return res.json({
    message: 'Search food successfully',
    result: mealData
  })
}
