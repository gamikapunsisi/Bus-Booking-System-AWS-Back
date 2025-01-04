const adminMiddleware = (req, res, next) => {
    console.log(req.user.userType)
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (req.user.userType === 'ADMIN' || req.user.userType === 'OPERATOR') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
};

module.exports = adminMiddleware; 