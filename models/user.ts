import mongoose from 'mongoose';

enum userRole {
    Admin = 'admin',
    User = 'user'
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    role: {
        type: String,
        enum: userRole,
        default: userRole.User
    },
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'
    }],
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
});

const User = mongoose.model('User', userSchema);

export default User;
