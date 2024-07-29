import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Recipe, { IRecipe } from './models/recipe'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8081

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err))

// Middleware
app.use(express.json())

// Routes
app.get('/recipes', async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find()
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error })
  }
})

app.post('/recipes', async (req: Request, res: Response) => {
  try {
    const recipe: IRecipe = new Recipe(req.body)
    await recipe.save()
    res.status(201).json(recipe)
  } catch (error) {
    res.status(400).json({ message: 'Error creating recipe', error })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// import express, { Request, Response } from 'express'
// import bodyParser from 'body-parser'
// import cors from 'cors'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import recipeRoutes from './routes/recipes'
// import mealPlanRoutes from './routes/meal-plans'
// import userRoutes from './routes/users'

// import Recipe, { IRecipe } from './models/recipe'

// dotenv.config()

// const app = express()
// const PORT = process.env.PORT || 8080

// // Middleware
// app.use(
//   cors({
//     origin: 'http://localhost:3000', // Replace with your frontend URL
//     credentials: true,
//   })
// )
// app.use(bodyParser.json())
// app.use(express.json())

// // Connect to MongoDB
// const MONGO_URI =
//   (process.env.MONGO_URI as string) || 'mongodb://localhost:27017/recipeManager'

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log('Connected to MongoDB')
//     console.log('Database name:', mongoose.connection.name)
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err)
//     process.exit(1)
//   })

// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err)
// })

// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB disconnected')
// })

// // Routes
// app.use('/api/recipes', recipeRoutes)
// app.use('/api/meal-plans', mealPlanRoutes)
// app.use('/api/users', userRoutes)

// // Sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Recipe Manager API')
})

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`)
// })

// app.get('/health', async (req: Request, res: Response) => {
//   try {
//     // Check MongoDB connection
//     if (mongoose.connection.readyState !== 1) {
//       throw new Error('MongoDB not connected')
//     }

//     // Attempt to ping the database
//     await mongoose.connection.db.admin().ping()

//     res.json({
//       status: 'ok',
//       message: 'Server is healthy, MongoDB is connected',
//     })
//   } catch (error) {
//     console.error('Health check failed:', error)
//     res.status(500).json({
//       status: 'error',
//       message: 'Server is unhealthy',
//       error: error,
//     })
//   }
// })
// async function addRecipeData() {
//   const uri = MONGO_URI

//   try {
//     await mongoose.connect(uri)
//     console.log('Connected to MongoDB')

//     // Create a new recipe
//     const newRecipe: IRecipe = new Recipe({
//       title: 'Spaghetti Carbonara',
//       ingredients: [
//         { name: 'Spaghetti', quantity: '400g' },
//         { name: 'Pancetta', quantity: '150g' },
//         { name: 'Eggs', quantity: '3' },
//         { name: 'Parmesan cheese', quantity: '50g' },
//         { name: 'Black pepper', quantity: 'to taste' },
//       ],
//       instructions: [
//         'Boil the spaghetti in salted water until al dente.',
//         'Fry the pancetta until crispy.',
//         'Beat the eggs with grated parmesan.',
//         'Mix everything together off the heat.',
//         'Season with black pepper.',
//       ],
//       servings: 4,
//       prepTime: 10,
//       cookTime: 15,
//       tags: ['Italian', 'Pasta', 'Quick'],
//       authorId: new mongoose.Types.ObjectId(), // Replace with actual author ID
//     })

//     // Save the recipe
//     const savedRecipe = await newRecipe.save()
//     console.log(`Recipe saved with id: ${savedRecipe._id}`)

//     // Add multiple recipes
//     const multipleRecipes = [
//       {
//         title: 'Classic Burger',
//         ingredients: [
//           { name: 'Ground beef', quantity: '500g' },
//           { name: 'Burger buns', quantity: '4' },
//           { name: 'Lettuce', quantity: '4 leaves' },
//           { name: 'Tomato', quantity: '1, sliced' },
//           { name: 'Cheese', quantity: '4 slices' },
//         ],
//         instructions: [
//           'Form beef into patties.',
//           'Grill patties to desired doneness.',
//           'Assemble burgers with toppings.',
//         ],
//         servings: 4,
//         prepTime: 15,
//         cookTime: 10,
//         tags: ['American', 'Beef', 'Grill'],
//         authorId: new mongoose.Types.ObjectId(), // Replace with actual author ID
//       },
//       {
//         title: 'Vegetable Stir Fry',
//         ingredients: [
//           { name: 'Mixed vegetables', quantity: '500g' },
//           { name: 'Soy sauce', quantity: '2 tbsp' },
//           { name: 'Garlic', quantity: '2 cloves, minced' },
//           { name: 'Vegetable oil', quantity: '1 tbsp' },
//         ],
//         instructions: [
//           'Heat oil in a wok.',
//           'Stir fry vegetables and garlic.',
//           'Add soy sauce and cook until vegetables are tender-crisp.',
//         ],
//         servings: 2,
//         prepTime: 10,
//         cookTime: 8,
//         tags: ['Vegetarian', 'Asian', 'Quick'],
//         authorId: new mongoose.Types.ObjectId(), // Replace with actual author ID
//       },
//     ]

//     const savedMultipleRecipes = await Recipe.insertMany(multipleRecipes)
//     console.log(`${savedMultipleRecipes.length} recipes were inserted`)
//   } catch (error) {
//     console.error('Error adding recipe data:', error)
//   } finally {
//     await mongoose.disconnect()
//     console.log('Disconnected from MongoDB')
//   }
// }

// addRecipeData().catch(console.error)
