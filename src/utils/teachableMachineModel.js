import TeachableMachine from '@sashido/teachablemachine-node'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

export const classificationModel = new TeachableMachine({
  modelUrl: process.env.TEACHABLE_MACHINE_MODEL_URL
})

class FoodClassificationModel {
  constructor() {
    this.model = new TeachableMachine({
      modelUrl: process.env.TEACHABLE_MACHINE_MODEL_URL
    })
  }

  async classifyImage(imagePath) {
    // 1. Read the image file as a buffer
    const imageData = await fs.promises.readFile(imagePath)

    // 2. Encode the buffer to base64 string
    const base64Image = Buffer.from(imageData).toString('base64')

    const result = await this.model.classify({
      imageUrl: `data:image/${getMimeType(imagePath)};base64,${base64Image}`
    })

    return result
  }
}

function getMimeType(filePath) {
  // Optionally determine the MIME type based on file extension
  const mimeTypes = {
    '.jpg': 'jpeg',
    '.jpeg': 'jpeg',
    '.png': 'png'
    // Add more extensions as needed
  }
  const extension = path.extname(filePath).toLowerCase()
  return mimeTypes[extension] || 'image/jpeg' // Default to JPEG if unknown
}

const foodClassificationModel = new FoodClassificationModel()

export default foodClassificationModel
