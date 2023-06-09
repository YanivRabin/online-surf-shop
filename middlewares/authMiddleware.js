// const jwt = require('jsonwebtoken');
//
// // Middleware to authenticate the JWT token
// const authenticateToken = (req, res, next) => {
//     const token = req.headers.authorization;
//
//     if (!token) {
//         return res.status(401).json({ message: 'Authentication failed' });
//     }
//
//     jwt.verify(token, 'secretKey', (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Invalid token' });
//         }
//
//         req.user = user;
//         next();
//     });
// };
//
// // Middleware to authorize only admin users
// const authorizeAdmin = (req, res, next) => {
//     if (!req.user.isAdmin) {
//         return res.status(403).json({ message: 'Unauthorized' });
//     }
//
//     next();
// };
//
// module.exports = {
//     authenticateToken,
//     authorizeAdmin
// };
