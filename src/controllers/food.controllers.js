import { ErrorWithStatus } from '../models/Errors.js'
import path from 'path'
import { UPLOAD_DIR } from '../constants/dir.js'
import { handleUploadImage } from '../utils/files.js'
import foodClassificationModel from '../utils/teachableMachineModel.js'
import { handleInstructFood, handleOutputModel } from '../utils/foodInstructionModel.js'
import axios from 'axios'
import PublicAPI from '../constants/publicAPI.js'
import { generateRandomMealsId, getDetailsIngradients, removeNullElements } from '../utils/handleAPIResponses.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import pkg from 'lodash'
const { parseInt } = pkg

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
  const rawResponse = await axios.get(PublicAPI.SEARCH_FOOD_BY_NAME, {
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
      image_url: meal.strMealThumb,
      meal_id: meal.idMeal
    }
  })

  return res.json({
    message: 'Search food successfully',
    result: mealsData
  })
}

export const getDetailsMealController = async (req, res) => {
  const { id } = req.query

  // Call MealDB API
  const rawResponse = await axios.get(PublicAPI.GET_DETAIL_FOOD_BY_ID, {
    params: {
      i: id
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
      image_url: meal.strMealThumb,
      meal_id: meal.idMeal
    }
  })[0]

  return res.json({
    message: 'Search food successfully',
    result: mealData
  })
}

export const getRandomMealsController = async (req, res) => {
  const quantity = parseInt(req.query.quantity)

  const randomMealsId = generateRandomMealsId(quantity)

  const resultMaybeHaveNull = await Promise.all(
    randomMealsId.map(async (id) => {
      const rawResponse = await axios.get(PublicAPI.GET_DETAIL_FOOD_BY_ID, {
        params: {
          i: id
        }
      })
      const rawMealsData = rawResponse.data.meals
      if (rawMealsData) {
        const mealData = rawMealsData.map((meal) => {
          return {
            meal_name: meal.strMeal,
            area: meal.strArea,
            image_url: meal.strMealThumb,
            meal_id: meal.idMeal
          }
        })[0]
        return mealData
      }
    })
  )

  const result = removeNullElements(resultMaybeHaveNull)

  return res.json({
    message: 'Random meals successfully',
    result: result
  })
}

export const getMealsByCategoryController = async (req, res) => {
  const { category } = req.query

  const rawResponse = await axios.get(PublicAPI.FILTER_BY_CATEGORY, {
    params: {
      c: category
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
      image_url: meal.strMealThumb,
      meal_id: meal.idMeal
    }
  })

  return res.json({
    message: 'Get meals successfully',
    result: mealsData
  })
}
