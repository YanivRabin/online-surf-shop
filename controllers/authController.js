const User = require("../models/UserModel");
const bcrypt = require('bcrypt');


// const registerForm = async (req, res) => {
//     // redirect to register html
// }

// const loginForm = async (req, res) => {
//     // redirect to log in html
// }

const isLoggedIn = async (req, res, next) => {

    if (!req.session.username)
        return res.status(401).json({ redirectUrl: '/', message: 'User is not connected' });

    return next();
}

const isAdmin = async (req, res, next) => {

    if (!req.session.isAdmin)
        return res.status(403).json({ redirectUrl: '/', message: 'Unauthorized' });

    return next();
}

const logoutUser = async (req, res) => {

    req.session.destroy(() => {
        return res.status(200).json({ redirectUrl: '/', message: 'User logout successfully' });
    });
}

const registerUser = async (req, res) => {

    const { username, password } = req.body;

    try {
        // Check if the username already exist
        const existingUser = await User.findOne({ username: username } );
        if (existingUser)
            return res.status(409).json({ message: 'Username already taken' });

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({

            username: username,
            password: hashedPassword
        });
        // Save the user to the database
        await newUser.save();

        req.session.username = username;
        req.session.isAdmin = newUser.isAdmin;
        return res.status(201).json({ redirectUrl: '/', message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username: username });

        // Find the user by email
        if (!user)
            // redirect?? if yes then where
            res.status(404).json({ message: 'User not found'});

        // Check if the provided password matches the stored password
        if (!bcrypt.compare(password, user.password))
            // redirect?? if yes then where
            res.status(401).json({ message: 'Invalid password' });

        req.session.username = username;
        req.session.isAdmin = user.isAdmin;
        return res.status(200).json({ redirectUrl: '/' , message: 'User login successfully'});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {

    loginUser,
    registerUser,
    // loginForm,
    // registerForm,
    isLoggedIn,
    logoutUser,
    isAdmin
}