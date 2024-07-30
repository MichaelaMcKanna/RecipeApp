import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body)
    const savedRecipe = await newRecipe.save()
    res.status(201).json(savedRecipe)
  } catch (error) {
    res.status(400).json({ error: error })
  }
})

export default router

// import express, { Request, Response } from 'express'
// import recipeModel from '../models/recipe'

// const router = express.Router()

// // Get all recipes
// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const recipes = await recipeModel.find()
//     res.json(recipes)
//   } catch (error) {
//     res.status(500).json({ message: error })
//   }
// })

// // Get a single recipe by ID
// router.get('/:id', async (req: Request, res: Response) => {
//   try {
//     const recipe = await recipeModel.findById(req.params.id)
//     if (!recipe) return res.status(404).json({ message: 'Recipe not found' })
//     res.json(recipe)
//   } catch (error) {
//     res.status(500).json({ message: error })
//   }
// })

// // Create a new recipe
// router.post('/', async (req: Request, res: Response) => {
//   const recipe = new recipeModel(req.body)
//   try {
//     const newRecipe = await recipe.save()
//     res.status(201).json(newRecipe)
//   } catch (error) {
//     res.status(400).json({ message: error })
//   }
// })

// // Update a recipe
// router.put('/:id', async (req: Request, res: Response) => {
//   try {
//     const updatedRecipe = await recipeModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     )
//     if (!updatedRecipe)
//       return res.status(404).json({ message: 'Recipe not found' })
//     res.json(updatedRecipe)
//   } catch (error) {
//     res.status(400).json({ message: error })
//   }
// })

// // Delete a recipe
// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const deletedRecipe = await recipeModel.findByIdAndDelete(req.params.id)
//     if (!deletedRecipe)
//       return res.status(404).json({ message: 'Recipe not found' })
//     res.json({ message: 'Recipe deleted' })
//   } catch (error) {
//     res.status(500).json({ message: error })
//   }
// })

// export default router
