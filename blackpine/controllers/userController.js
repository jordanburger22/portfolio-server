const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');

const signup = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        const userCheck = await User.findOne({ email });
        if (userCheck) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const newUser = new User({ username, password, email });
        await newUser.save();
        const token = jwt.sign(newUser.withoutPassword(), process.env.BLACKPINE_SECRET);
        return res.status(201).send({ token, user: newUser.withoutPassword() });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.checkPassword(password))) {
            return res.status(403).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(user.withoutPassword(), process.env.BLACKPINE_SECRET);
        return res.status(200).send({ token, user: user.withoutPassword() });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const googleLogin = async (req, res, next) => {
    try {
        const { idToken } = req.body;

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name } = payload;

        let user = await User.findOrCreateByGoogleId(googleId, email, name);
        const token = jwt.sign(user.withoutPassword(), process.env.BLACKPINE_SECRET);

        return res.status(200).send({ token, user: user.withoutPassword() });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// const facebookLogin = async (req, res, next) => {
//     try {
//         const { accessToken } = req.body;
//         const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
//         const { id: facebookId, email, name } = response.data;

//         let user = await User.findOrCreateByFacebookId(facebookId, email, name);
//         const token = jwt.sign(user.withoutPassword(), process.env.BLACKPINE_SECRET);

//         return res.status(200).send({ token, user: user.withoutPassword() });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// };

module.exports = {
    signup,
    login,
    googleLogin,
    facebookLogin
};
