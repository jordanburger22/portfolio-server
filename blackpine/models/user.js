const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true // Ensure unique usernames
    },
    password: {
        type: String,
        // Required only if not using OAuth
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: function() { return !this.googleId && !this.facebookId; } // Required for manual login only
    },
    name: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Only these roles are allowed
        default: 'user'
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows for some users to have only a googleId
    },
    facebookId: {
        type: String,
        unique: true,
        sparse: true // Allows for some users to have only a facebookId
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    try {
        // If password is present and modified, hash it
        if (user.password && user.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
        }
        next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.checkPassword = async function (passwordAttempt) {
    if (!this.password) return false; // No password means no manual login
    return bcrypt.compare(passwordAttempt, this.password);
};

userSchema.methods.withoutPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

userSchema.statics.findOrCreateByGoogleId = async function (googleId, email, name) {
    let user = await this.findOne({ googleId });
    if (!user) {
        user = new this({
            googleId,
            email,
            name,
            role: 'user' // Default role, adjust as needed
        });
        await user.save();
    }
    return user;
};

userSchema.statics.findOrCreateByFacebookId = async function (facebookId, email, name) {
    let user = await this.findOne({ facebookId });
    if (!user) {
        user = new this({
            facebookId,
            email,
            name,
            role: 'user' // Default role, adjust as needed
        });
        await user.save();
    }
    return user;
};

module.exports = mongoose.model('User', userSchema);
