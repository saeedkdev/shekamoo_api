import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
