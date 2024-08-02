import { Router, Request, Response } from 'express'
import Recipe from '../models/Recipe'

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

router.get('/recipes', async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find()
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error })
  }
})

router.post('/recipes', async (req: Request, res: Response) => {
  try {
    const recipe = new Recipe(req.body)
    await recipe.save()
    res.status(201).json(recipe)
  } catch (error) {
    res.status(400).json({ message: 'Error creating recipe', error })
  }
})

export default router
