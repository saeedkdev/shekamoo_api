import mongoose from 'mongoose';

enum MealType {
    Breakfast = 'breakfast',
    Lunch = 'lunch',
    Dinner = 'dinner',
    Snack = 'snack'
}

const mealSchema = new mongoose.Schema({
    name: String,
    date: Date,
    type: {
        type: String,
        enum: MealType,
    },
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }],
});

const Meal = mongoose.model('Meal', mealSchema)

export default Meal;
