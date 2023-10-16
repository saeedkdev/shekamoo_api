import mongoose from "mongoose";

enum Sex {
    Male = 'm',
    Female = 'f'
}

enum ActivityLevel {
    Sedentary = 'sedentary',
    LightlyActive = 'lightly active',
    ModeratelyActive = 'moderately active',
    VeryActive = 'very active',
    ExtraActive = 'extra active'
}

const profileSchema = new mongoose.Schema({
    height: Number,
    weight: Number,
    age: Number,
    sex: {
        type: String,
        enum: Sex
    },
    activityLevel: {
        type: String,
        enum: ActivityLevel,
        default: ActivityLevel.Sedentary
    },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
