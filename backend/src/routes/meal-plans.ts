import express, { Request, Response } from 'express'
import MealPlan from '../models/mealPlan'

const router = express.Router()

// Get all meal plans
router.get('/', async (req: Request, res: Response) => {
  try {
    const mealPlans = await MealPlan.find().populate('meals.recipes.recipeId')
    res.json(mealPlans)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

// Get a single meal plan by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id).populate(
      'meals.recipes.recipeId'
    )
    if (!mealPlan)
      return res.status(404).json({ message: 'Meal Plan not found' })
    res.json(mealPlan)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

// Create a new meal plan
router.post('/', async (req: Request, res: Response) => {
  const mealPlan = new MealPlan(req.body)
  try {
    const newMealPlan = await mealPlan.save()
    res.status(201).json(newMealPlan)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Update a meal plan
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedMealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedMealPlan)
      return res.status(404).json({ message: 'Meal Plan not found' })
    res.json(updatedMealPlan)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Delete a meal plan
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedMealPlan = await MealPlan.findByIdAndDelete(req.params.id)
    if (!deletedMealPlan)
      return res.status(404).json({ message: 'Meal Plan not found' })
    res.json({ message: 'Meal Plan deleted' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

export default router
