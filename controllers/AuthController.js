const User = require("../models/UserModel");
const bcrypt = require('bcrypt');


const isLoggedIn = async (req, res, next) => {
    if (!req.session.username)
        return res.status(401).json({ message: 'User is not connected' });

    return next();
}

const isAdmin = async (req, res, next) => {
    if (!req.session.isAdmin)
        return res.status(403).json({ message: 'Unauthorized' });

    return next();
}

const logoutUser = async (req, res) => {
    let { username } = req.body;
    req.session.destroy(() => {
        console.log(username + " logout successfully");
        return res.status(200).json({ message: 'User logout successfully' });
    });
}

const registerUser = async (req, res) => {
    let { username, password } = req.body;
    username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
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
        await newUser.save();
        req.session.username = username;
        req.session.isAdmin = newUser.isAdmin;
        return res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', username: username })    }
};

const loginUser = async (req, res) => {
    let { username, password } = req.body;
    username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    try {
        const user = await User.findOne({ username: username });
        if (!user)
            return res.status(404).json({message: 'User not found'});

        // Check if the provided password matches the stored password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            return res.status(400).json({ message: 'Invalid password' });

        console.log(username + " is online");
        req.session.username = username;
        req.session.isAdmin = user.isAdmin;
        return res.status(200).json({ message: 'User login successfully', username:username})    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ users: users });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    loginUser,
    registerUser,
    isLoggedIn,
    logoutUser,
    isAdmin,
    getAllUsers
}