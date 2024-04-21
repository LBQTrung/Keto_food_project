/**
 * Input: mealObject (of MealDB API)
 * Output: number of griadent (may be include empty string)
 */

const countGradientsNumber = (mealObject) => {
  let count = 0

  for (let key in mealObject) {
    if (key.includes('strIngredient')) count += 1
  }

  return count
}

/**
 * Input: { strIngredient1: "Tomato", ..., strMeasure1: "1" }
 * Output: { ingredients: ["Tomato: 1"], ... }
 */

export const getDetailsIngradients = (mealObject) => {
  const numberOfIngredients = countGradientsNumber(mealObject)
  const detailsIngradients = []
  for (let i = 1; i <= numberOfIngredients; i++) {
    if (mealObject[`strIngredient${i}`]) {
      let detailsIngradient = `${mealObject[`strIngredient${i}`]}: ${mealObject[`strMeasure${i}`]}`
      // Ex: "Tomato: 2"

      detailsIngradients.push(detailsIngradient)
    }
  }

  return detailsIngradients
}

export const generateRandomMealsId = (length) => {
  const min = 52901
  const max = 53050
  if (length > max - min + 1) {
    return []
  }

  let randomIds = []
  while (randomIds.length < length) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    if (randomIds.indexOf(randomNum) === -1) {
      randomIds.push(randomNum)
    }
  }

  return randomIds
}

export const removeNullElements = (arr) => {
  return arr.filter(function (value) {
    return value !== null
  })
}
