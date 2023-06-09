const jwt = require('jsonwebtoken');

// Middleware to authenticate the JWT token
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'Authentication failed' });

    // auth header assemble from "bearer token"
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err)
            return res.status(403).json({ message: 'Invalid token' });

        req.user = user;
        next();
    });
};

// Middleware to authorize only admin users
const authorizeAdmin = (req, res, next) => {

    if (!req.user.isAdmin)
        return res.status(403).json({ message: 'Unauthorized' });

    next();
};

module.exports = {
    verifyToken,
    authorizeAdmin
};
