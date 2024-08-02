import express, { Response } from 'express'
import User, { IMealPlan } from '../models/Users'
import Recipe from '../models/Recipe'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authenticateToken, RequestWithUser } from '../middleware/auth'
import { Types } from 'mongoose'

const router = express.Router()

// Get all users (protected route)
router.get(
  '/',
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error })
    }
  }
)

// Get a single user by ID (protected route)
router.get(
  '/:id',
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) return res.status(404).json({ message: 'User not found' })
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error })
    }
  }
)

// Update a user (protected route)
router.put(
  '/:id',
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )
      if (!updatedUser)
        return res.status(404).json({ message: 'User not found' })
      res.json(updatedUser)
    } catch (error) {
      res.status(400).json({ message: 'Error updating user', error })
    }
  }
)

// Delete a user (protected route)
router.delete(
  '/:id',
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id)
      if (!deletedUser)
        return res.status(404).json({ message: 'User not found' })
      res.json({ message: 'User deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error })
    }
  }
)

// User registration
router.post('/register', async (req: RequestWithUser, res: Response) => {
  try {
    const { email, password } = req.body
    const username = email
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email,
      password: hashedPassword,
      username,
    })
    const newUser = await user.save()
    res
      .status(201)
      .json({ message: 'User created successfully', userId: newUser._id })
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error })
  }
})

// User login
router.post('/login', async (req: RequestWithUser, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password) // Change this line
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )
    res.json({ user: { id: user._id, email: user.email }, token }) // Change this line
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error })
  }
})

// create meal plan
router.post(
  '/:id/mealPlans',
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const user = await User.findById(req.params.id)
      const mealPlanData = req.body as Omit<IMealPlan, '_id'>
      if (!user) return res.status(404).json({ message: 'User not found' })

      const mealPlan: IMealPlan = {
        _id: new Types.ObjectId(),
        name: mealPlanData.name,
        startDate: mealPlanData.startDate,
        endDate: mealPlanData.endDate,
        meals: [],
      }

      for (const meal of mealPlanData.meals) {
        const recipe = await Recipe.findById(meal.recipeId)
        if (!recipe) {
          return res
            .status(404)
            .json({ message: `Recipe with id ${meal.recipeId} not found` })
        }

        mealPlan.meals.push({
          date: meal.date,
          recipeId: recipe._id as Types.ObjectId,
          recipeName: recipe.title,
        })
      }

      user.mealPlans.push(mealPlan)
      await user.save()

      res.status(201).json(mealPlan)
    } catch (error) {
      res.status(400).json({ message: 'Error adding meal plan', error })
    }
  }
)

// Get all meal plans for a user
router.get(
  '/:id/mealPlans',
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const user = await User.findById(req.params.id).populate({
        path: 'mealPlans.meals.recipeId',
        select: 'name',
      })
      if (!user) return res.status(404).json({ message: 'User not found' })

      res.json(user.mealPlans)
    } catch (error) {
      res.status(400).json({ message: 'Error fetching meal plans', error })
    }
  }
)

// Update a meal plan
router.put(
  '/:userId/mealPlans/:mealPlanId',
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const user = await User.findById(req.params.userId)
      if (!user) return res.status(404).json({ message: 'User not found' })

      const mealPlanIndex = user.mealPlans.findIndex(
        (mp) => mp._id.toString() === req.params.mealPlanId
      )
      if (mealPlanIndex === -1)
        return res.status(404).json({ message: 'Meal plan not found' })

      const updatedMealPlanData = req.body as Partial<IMealPlan>

      // Update basic fields
      if (updatedMealPlanData.name)
        user.mealPlans[mealPlanIndex].name = updatedMealPlanData.name
      if (updatedMealPlanData.startDate)
        user.mealPlans[mealPlanIndex].startDate = new Date(
          updatedMealPlanData.startDate
        )
      if (updatedMealPlanData.endDate)
        user.mealPlans[mealPlanIndex].endDate = new Date(
          updatedMealPlanData.endDate
        )

      // Update meals if provided
      if (updatedMealPlanData.meals) {
        user.mealPlans[mealPlanIndex].meals = []
        for (const meal of updatedMealPlanData.meals) {
          const recipe = await Recipe.findById(meal.recipeId)
          if (!recipe) {
            return res
              .status(404)
              .json({ message: `Recipe with id ${meal.recipeId} not found` })
          }

          user.mealPlans[mealPlanIndex].meals.push({
            date: new Date(meal.date),
            recipeId: recipe._id as Types.ObjectId,
            recipeName: recipe.title,
          })
        }
      }

      await user.save()

      res.json(user.mealPlans[mealPlanIndex])
    } catch (error) {
      res.status(400).json({ message: 'Error updating meal plan', error })
    }
  }
)

// Delete a meal plan
router.delete(
  '/:userId/mealPlans/:mealPlanId',
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const user = await User.findById(req.params.userId)
      if (!user) return res.status(404).json({ message: 'User not found' })

      const mealPlanIndex = user.mealPlans.findIndex(
        (mp) => mp._id.toString() === req.params.mealPlanId
      )
      if (mealPlanIndex === -1)
        return res.status(404).json({ message: 'Meal plan not found' })

      user.mealPlans.splice(mealPlanIndex, 1)
      await user.save()

      res.json({ message: 'Meal plan deleted successfully' })
    } catch (error) {
      res.status(400).json({ message: 'Error deleting meal plan', error })
    }
  }
)

export default router
