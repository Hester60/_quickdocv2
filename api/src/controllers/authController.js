const asyncWrapper = require('../middlewares/asyncWrapper');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require("../utils/GeneralError");

module.exports.auth = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
        throw new AuthenticationError("Invalid credentials");
    }

    if (email !== process.env.USER_EMAIL || password !== process.env.USER_PASSWORD) {
        throw new AuthenticationError("Invalid credentials");
    }

    const token = jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_TTL)
    });

    return res.status(200).json({ token });
});
