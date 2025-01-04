const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const { User, RefreshToken } = require('../models/schemas');

class AuthController {
    async register(req, res) {
        try {
            const { email, password, firstName, lastName, phoneNumber, userType = 'COMMUTER' } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ error: 'Email already registered' });
            }

            const result = await authService.createUser({
                email, password, firstName, lastName, phoneNumber, userType
            });

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            const user = await authService.validateUser(email, password);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const accessToken = authService.generateAccessToken(user.userId, user.userType);
            const refreshToken = await authService.createNewRefreshToken(user.userId);

            res.json({
                userId: user.userId,
                accessToken,
                refreshToken,
                userType: user.userType
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(401).json({ error: 'Refresh token required' });
            }

            const tokenData = await RefreshToken.findOne({ token: refreshToken });
            if (!tokenData) {
                return res.status(401).json({ error: 'Invalid refresh token' });
            }

            const user = await User.findOne({ userId: tokenData.userId });
            const accessToken = authService.generateAccessToken(user.userId, user.userType);
            res.json({ accessToken });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async verifyToken(req, res) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(401).json({ error: 'Token required' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ userId: decoded.userId });

            if (!user) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            res.json({ 
                user: {
                    userId: user.userId,
                    userType: user.userType
                }
            });
        } catch (error) {
            res.status(403).json({ error: 'Invalid token' });
        }
    }
}

module.exports = new AuthController(); 