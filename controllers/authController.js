const User = require("../models/UserModel");
const bcrypt = require('bcrypt');


const registerForm = async (req, res) => {
    // redirect to register html
}

const loginForm = async (req, res) => {
    // redirect to log in html
}

const isLoggedIn = async (req, res, next) => {

    if (req.session.username != null) {
        return next();
    }
    else {
        // change to other format that say your not logged in
        console.log("not connected");
        res.redirect('/');
    }
}

const logoutUser = async (req, res) => {
    req.session.destroy(() => {
        // redirect to log in or home page
        res.redirect('/');
    });
}

const registerUser = async (req, res) => {

    const { username, email, password } = req.body;


    try {
        // Check if the username or email already exist
        // need to change to check username and email separate
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser)
            return res.status(409).json({ message: 'Username or email already taken' });

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({

            username: username,
            email: email,
            password: hashedPassword
        });
        // Save the user to the database
        await newUser.save();

        req.session.username = username;
        // res.status(201).redirect('/');
        res.status(201).json({ redirect: '/', message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email: email });

        // Find the user by email
        if (!user)
            // redirect?? if yes then where
            res.status(404).json({ message: 'User not found'});

        // Check if the provided password matches the stored password
        if (!bcrypt.compare(password, user.password))
            // redirect?? if yes then where
            res.status(401).json({ message: 'Invalid password' });

        req.session.username = user.username;
        // res.status(200).redirect('/');
        res.status(200).json({ redirectUrl: '/' , message: 'User login successfully'});

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {

    loginUser,
    registerUser,
    loginForm,
    registerForm,
    isLoggedIn,
    logoutUser
}