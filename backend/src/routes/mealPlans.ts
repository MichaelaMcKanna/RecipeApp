import express, { Request, Response } from 'express';
import MealPlan from '../models/MealPlan';

const router = express.Router();

// Create a new meal plan
router.post('/', async (req: Request, res: Response) => {
    try {
        const mealPlan = new MealPlan(req.body);
        await mealPlan.save();
        res.status(201).send(mealPlan);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all meal plans
router.get('/', async (req: Request, res: Response) => {
    try {
        const mealPlans = await MealPlan.find().populate('meals');
        res.status(200).send(mealPlans);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single meal plan by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const mealPlan = await MealPlan.findById(req.params.id).populate('meals');
        if (!mealPlan) {
            return res.status(404).send();
        }
        res.status(200).send(mealPlan);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a meal plan
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const mealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!mealPlan) {
            return res.status(404).send();
        }
        res.status(200).send(mealPlan);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a meal plan
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const mealPlan = await MealPlan.findByIdAndDelete(req.params.id);
        if (!mealPlan) {
            return res.status(404).send();
        }
        res.status(200).send(mealPlan);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
