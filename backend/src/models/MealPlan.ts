import mongoose, { Document, Schema } from 'mongoose'

interface Meal {
  date: Date
  recipes: {
    recipeId: mongoose.Types.ObjectId
    mealType: string
  }[]
}

export interface IMealPlan extends Document {
  name: string
  userId: mongoose.Types.ObjectId
  startDate: Date
  endDate: Date
  meals: Meal[]
}

const MealSchema: Schema = new Schema({
  date: { type: Date, required: true },
  recipes: [
    {
      recipeId: { type: mongoose.Types.ObjectId, ref: 'Recipe' },
      mealType: { type: String, required: true },
    },
  ],
})

const MealPlanSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  meals: [MealSchema],
})

const MealPlan = mongoose.model<IMealPlan>('MealPlan', MealPlanSchema)
export default MealPlan
