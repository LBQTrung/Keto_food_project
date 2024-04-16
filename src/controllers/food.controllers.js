import formidable from 'formidable'
import { ErrorWithStatus } from '../models/Errors.js'
import path from 'path'
import { UPLOAD_DIR } from '../constants/dir.js'
import { fileURLToPath } from 'url'
import { handleUploadImage } from '../utils/files.js'
import foodClassificationModel from '../utils/teachableMachineModel.js'
import { handleInstructFood, handleOutputModel } from '../utils/foodInstructionModel.js'

export const getFoodController = async (req, res) => {
  // Upload file
  const file = await handleUploadImage(req, res)

  const newFilename = file.newFilename
  const imagePath = path.resolve(UPLOAD_DIR, newFilename)

  const classification = await foodClassificationModel.classifyImage(imagePath)

  const result = classification[0]

  return res.json({
    message: 'Classify image successfully',
    result: result
  })
}

export const instructFoodController = async (req, res) => {
  const foodName = req.body.name

  const rawDataInstruction = await handleInstructFood(foodName)

  const result = handleOutputModel(rawDataInstruction)

  return res.json({
    message: 'Instruct food successfully',
    result: result
  })
}
