const jwt = require('jsonwebtoken');
const { User } = require('../models/schemas');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authentication token required' });
        }

        const decoded = jwt.verify(token, "2f93ec63b4086d9f2fa9b523f8ae1a7cb9e6407e892f1940c739b6f7a4c01a56");
        const user = await User.findOne({ userId: decoded.userId });

        if (!user) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = {
            userId: user._id,
            userType: user.userType
        };
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.userType)) {
            return res.status(403).json({ 
                error: 'You do not have permission to perform this action' 
            });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles
}; 