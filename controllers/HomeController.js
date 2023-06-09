const path = require('path');
const User = require("../models/UserModel");

const getHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
};

const redirectToSurfboards = (req, res) => {
    res.redirect('/surfboards');
};

const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exist
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already taken' });
        }

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password
        });

        // Save the user to the database
        await newUser.save();

        /////
        res.redirect('/surfboards');
        ////

        // res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        // const isPasswordValid = await user.comparePassword(password);
        if (password === user.password) {
            /////
            res.redirect('/surfboards');
            ////
            // return res.status(401).json({ message: 'Invalid credentials' });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

        // // Generate a JWT token
        // const token = jwt.sign({ userId: user._id }, 'secretKey');
        //
        // res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {

    getHomePage,
    redirectToSurfboards,
    loginUser,
    registerUser
}