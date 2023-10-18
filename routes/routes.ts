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


// user routes
import User from '../models/user';

router.post('/user', async (req: Request, res: Response) => {

    const { name, email, googleId } = req.body;

    const foundUser = await User.findOne({ googleId: googleId });

    if (foundUser) {
        res.json(foundUser);
        return;
    }

    const user = new User({
        name,
        email,
        googleId
    });
    const savedUser = await user.save();
    res.json(savedUser);
});

router.get('/user/:googleid', async (req: Request, res: Response) => {
    // find by googleId
    const user = await User.findOne({ googleId: req.params.googleid });
    if (!user) {
        res.json(null);
        return;
    }
    res.json(user);
})

router.get('/user', async (req: Request, res: Response) => {
    const users = await User.find({});
    res.json(users);
})

// get user meals for date
router.post('/user/meals', async (req: Request, res: Response) => {
    const { googleId, date } = req.body;
    
    const user = await User.findOne({ googleId: googleId });
    if (!user) {
        res.json(null);
        return;
    }

    const meals = await Meal.find({ date: date, _id: { $in: user.meals } }).populate('foods');
    res.json(meals);
})

import Meal from '../models/meal';

// add meal to db and then add meal to user
router.post('/meal', async (req: Request, res: Response) => {
    const { name, date, type, foodId, googleId } = req.body;

    const user = await User.findOne({ googleId: googleId });
    const food = await Food.findById(foodId);

    if (user && food) {
        const meal = new Meal({
            name,
            date,
            type,
            foods: [food]
        });

        const savedMeal = await meal.save();

        user.meals.push(savedMeal.id);
        await user.save();

        res.json(savedMeal);
    } else {
        res.json(null);
    }

})

export default router;
