import express, { Request, Response } from 'express';
import Recipe from '../models/Recipe';

const router = express.Router();

// Create a new recipe
router.post('/', async (req: Request, res: Response) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all recipes
router.get('/', async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single recipe by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send();
        }
        res.status(200).send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a recipe
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!recipe) {
            return res.status(404).send();
        }
        res.status(200).send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a recipe
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).send();
        }
        res.status(200).send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
