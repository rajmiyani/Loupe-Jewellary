const userService = require('../services/user.service.js');
const jwtProvider = require('../config/jwtProvider.js');
const bcrypt = require('bcrypt');
const cartService = require("../services/cart.service.js");
const wishService = require('../services/wishlist.service.js');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);

        await cartService.createCart(user);
        await wishService.createWish(user);

        return res.status(200).send({ jwt, message: "register success" });

    } catch (error) {
        const message = error?.message || "Registration failed";
        const isDuplicate = message.toLowerCase().includes("already exists");
        const status = isDuplicate ? 409 : 500;
        return res.status(status).send({ error: message, statusCode: status });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("req.body in login::auth.controller", req.body)

    try {
        const user = await userService.getUserByEmail(email);
        console.log("user in login::auth.controller", user)

        if (!user) {
            return res.status(404).send({ message: `user not found with email: ${email}`, email });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid Password...' });
        }

        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({ jwt, message: 'login success', role: user.role });

    } catch (error) {
        return res.status(500).send({ error: error.message, statusCode: 500 });
    }
}

const googleLogin = async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).send({ message: "Google ID Token is required", statusCode: 400 });
    }

    try {
        console.log("Verifying ID Token with CID:", process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log("Token payload:", payload);
        const { email, given_name, family_name } = payload;

        let user = await userService.getUserByEmail(email);

        if (!user) {
            // Create a new user if they don't exist
            // We use a random password since they use Google to login
            const randomPassword = Math.random().toString(36).slice(-10) + "Aa0!";
            user = await userService.createUser({
                firstName: given_name,
                lastName: family_name || "",
                email,
                password: randomPassword,
                role: "CUSTOMER"
            });
            await cartService.createCart(user);
            await wishService.createWish(user);
        }

        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({ jwt, message: 'Google login success', role: user.role });

    } catch (error) {
        return res.status(500).send({ error: error.message, statusCode: 500 });
    }
}

module.exports = { register, login, googleLogin }