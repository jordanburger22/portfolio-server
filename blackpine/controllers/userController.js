const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signup = async (req, res, next) => {
    try {
        const userCheck = await User.findOne({ username: req.body.username });
        if (userCheck) {
            res.status(400);
            return next(new Error('That username is already taken'));
        }
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        return res.status(201).send({ user: savedUser.withoutPassword() });
    } catch (err) {
        res.status(500);
        return next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(403);
            return next(new Error('Username or password is incorrect'));
        }
        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            res.status(403);
            return next(new Error('Username or password is incorrect'));
        }
        const token = jwt.sign(user.withoutPassword(), process.env.BLACKPINE_SECRET);
        return res.status(201).send({ token, user: user.withoutPassword() });
    } catch (err) {
        res.status(500);
        return next(err);
    }
};

const googleLogin = async (req, res, next) => {
    try {
        const { idToken } = req.body;

        // Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name } = payload; // Extract name and email from the payload

        // Check if the user exists or create a new user
        let user = await User.findOne({ $or: [{ googleId: email }, { username: email }] });
        if (!user) {
            user = new User({
                email,
                name,
                username: email, // Use email as username for simplicity
                googleId: email, // Store Google ID for future reference
                role: 'user' // Set role as needed
            });
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign(user.withoutPassword(), process.env.BLACKPINE_SECRET);

        return res.status(201).send({ token, user: user.withoutPassword() });
    } catch (err) {
        res.status(500);
        return next(err);
    }
};

module.exports = {
    signup,
    login,
    googleLogin
};
