import express, { Request, Response } from 'express';
import Food from '../models/food';

const router = express.Router()

router.post('/food', async (req: Request, res: Response) => {
    const { name, amount, unit, calories, protein, carbs, fat } = req.body;
    const food = new Food({
        name,
        amount,
        unit,
        calories,
        protein,
        carbs,
        fat
    });
    const savedFood = await food.save();
    res.json(savedFood);
})

router.get('/food', async (req: Request, res: Response) => {
    const foods = await Food.find({});
    res.json(foods);
})

router.get('/food/:id', async (req: Request, res: Response) => {
    const food = await Food.findById(req.params.id);
    res.json(food);
})

router.delete('/food/:id', async (req: Request, res: Response) => {
    const food = await Food.findByIdAndDelete(req.params.id);
    res.json(food);
})

router.put('/food/:id', async (req: Request, res: Response) => {
    const { name, amount, unit, calories, protein, carbs, fat } = req.body;
    const food = await Food.findByIdAndUpdate(req.params.id, {
        name,
        amount,
        unit,
        calories,
        protein,
        carbs,
        fat
    });
    res.json(food);
})

router.post('/food/search', async (req: Request, res: Response) => {
    const { name } = req.body;
    const food = await Food.find({ name: { $regex: name, $options: 'i' } });
    res.json(food);
})

export default router;
