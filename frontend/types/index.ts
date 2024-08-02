export interface MealRecipe {
  _id: string
  title: string
}

export interface Meal {
  date: Date
  recipe: string
}

export interface MealPlan {
  startDate: Date
  endDate: Date
  meals: Meal[]
  userId: string
  name: string
}

interface Ingredient {
  name: string
  quantity: string
}

export interface Recipe {
  _id: string
  title: string
  ingredients: Ingredient[]
  instructions: string[]
  servings: number
  prepTime: number
  cookTime: number
  tags: string[]
  authorId: string
  createdAt: Date
}
