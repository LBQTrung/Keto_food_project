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
  console.log(numberOfIngredients)
  const detailsIngradients = []
  for (let i = 1; i <= numberOfIngredients; i++) {
    console.log(mealObject[`strIngredient${i}`])
    if (mealObject[`strIngredient${i}`]) {
      let detailsIngradient = `${mealObject[`strIngredient${i}`]}: ${mealObject[`strMeasure${i}`]}`
      // Ex: "Tomato: 2"

      detailsIngradients.push(detailsIngradient)
    }
  }

  return detailsIngradients
}
