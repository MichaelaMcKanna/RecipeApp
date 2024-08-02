import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IMeal {
  date: Date
  recipeId: mongoose.Types.ObjectId
  recipeName: string
}

export interface IMealPlan {
  _id: Types.ObjectId
  name: string
  startDate: Date
  endDate: Date
  meals: IMeal[]
}

export interface IUser extends Document {
  username: string
  email: string
  password: string
  createdAt: Date
  mealPlans: IMealPlan[]
}

// const MealSchema: Schema = new Schema({
//   date: { type: Date, required: true },
//   recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe' },
//   recipeName: { type: String, required: true },
// })

// const MealPlanSchema: Schema = new Schema(
//   {
//     name: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     meals: [MealSchema],
//   },
//   { _id: true }
// )

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  mealPlans: [
    {
      name: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      meals: [
        {
          date: { type: Date, required: true },
          recipeId: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true,
          },
          recipeName: { type: String, required: true },
        },
      ],
    },
  ],
})

const User = mongoose.model<IUser>('User', UserSchema)
export default User
