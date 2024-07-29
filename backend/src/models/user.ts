import mongoose, { Document, Schema } from 'mongoose'

interface MealPlanRef {
  mealPlanId: mongoose.Types.ObjectId
  name: string
  startDate: Date
  endDate: Date
}

export interface IUser extends Document {
  username: string
  email: string
  passwordHash: string
  createdAt: Date
  mealPlans: MealPlanRef[]
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  mealPlans: [
    {
      mealPlanId: { type: mongoose.Types.ObjectId, ref: 'MealPlan' },
      name: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],
})

const User = mongoose.model<IUser>('User', UserSchema)
export default User
