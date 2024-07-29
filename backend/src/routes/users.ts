import express, { Request, Response } from 'express'
import User from '../models/user'

const router = express.Router()

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('mealPlans.mealPlanId')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

// Get a single user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate(
      'mealPlans.mealPlanId'
    )
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body)
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Update a user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedUser) return res.status(404).json({ message: 'User not found' })
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Delete a user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

export default router
