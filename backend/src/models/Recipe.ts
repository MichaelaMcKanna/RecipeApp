import mongoose, { Document, Schema } from 'mongoose'

export interface IRecipe extends Document {
  title: string
  ingredients: string[]
  instructions: string[]
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
})

export default mongoose.model<IRecipe>('Recipe', RecipeSchema)

// import mongoose, { Document, Schema } from 'mongoose'

// interface Ingredient {
//   name: string
//   quantity: string
// }

// export interface IRecipe extends Document {
//   title: string
//   ingredients: Ingredient[]
//   instructions: string[]
//   servings: number
//   prepTime: number
//   cookTime: number
//   tags: string[]
//   authorId: mongoose.Types.ObjectId
//   createdAt: Date
// }

// const IngredientSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   quantity: { type: String, required: true },
// })

// const RecipeSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   ingredients: [IngredientSchema],
//   instructions: [String],
//   servings: { type: Number },
//   prepTime: { type: Number },
//   cookTime: { type: Number },
//   tags: [String],
//   authorId: { type: mongoose.Types.ObjectId, ref: 'User' },
//   createdAt: { type: Date, default: Date.now },
// })

// const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema)
// export default Recipe
