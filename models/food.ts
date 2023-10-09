import mongoose from 'mongoose';

enum Unit {
    Serving = "SERVING",
    Cups = "CUPS",
    Bowl = "BOWL",
    Plate = "Plate",
    Grams = "GRAMS"
}

const foodSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: {
        type: String,
        enum: Unit,
        default: Unit.Serving
    },
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
