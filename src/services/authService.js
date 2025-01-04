const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { User, RefreshToken } = require('../models/schemas');
require('dotenv').config();

const JWT_SECRET = "2f93ec63b4086d9f2fa9b523f8ae1a7cb9e6407e892f1940c739b6f7a4c01a56";
const JWT_REFRESH_SECRET = "2f93ec63b4086d9f2fa9b523f8ae1a7cb9e6407e892f1940c739b6f7a4c01a56";

class AuthService {
    generateAccessToken(userId, userType) {
        return jwt.sign(
            { userId, userType },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
    }

    generateRefreshToken(userId) {
        return jwt.sign(
            { userId },
            JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );
    }

    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const userId = uuidv4();

        const user = await User.create({
            userId,
            ...userData,
            password: hashedPassword
        });

        const accessToken = this.generateAccessToken(userId, userData.userType);
        const refreshToken = this.generateRefreshToken(userId);

        await RefreshToken.create({
            userId,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        });

        return { userId, accessToken, refreshToken, userType: userData.userType };
    }

    async validateUser(email, password) {
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return null;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        return validPassword ? user : null;
    }

    async createNewRefreshToken(userId) {
        const refreshToken = this.generateRefreshToken(userId);
        await RefreshToken.create({
            userId,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        return refreshToken;
    }
}

module.exports = new AuthService(); 