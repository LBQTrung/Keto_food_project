import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)

export const handleInstructFood = async (foodName) => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const prompt = `Instructions for cooking ${foodName} following these rules:
  - Output: A JSON object with three keys: Ingredients, Cooking Instructions, and Suitable Side Dishes.
  - Ingredients: An array containing each ingredient and its quantity in the form of a string, for example: ["Tomatoes: 2", "Salt: 1 teaspoon"].
  - Cooking Instructions: An array containing each step in the cooking process in the form of a string (without specifying the order 1, 2, 3). For example: ["Prepare ingredients", "Clean ingredients", ...].
  - Suitable Side Dishes: An array containing each side dish that is suitable for the requested dish.`

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()
  return text
}

export const handleOutputModel = (rawOutput) => {
  /*
  ```json{ ... }/n```
*/
  rawOutput = rawOutput.replaceAll(/\n/g, '')
  rawOutput = rawOutput.replaceAll(/```/g, '')
  rawOutput = rawOutput.slice(4)
  const recipeObject = JSON.parse(rawOutput)

  return recipeObject
}
