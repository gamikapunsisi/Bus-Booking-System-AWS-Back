const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const createUser = (username, email, phone_number) => {
    return new Promise((resolve, reject) => {
        const user_id = uuidv4();
        const created_at = new Date().toISOString();
        
        db.run(
            'INSERT INTO users (user_id, username, email, phone_number, created_at) VALUES (?, ?, ?, ?, ?)',
            [user_id, username, email, phone_number, created_at],
            (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user_id);
            }
        );
    });
};

const getUser = (user_id) => {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT user_id, username, email, phone_number, created_at FROM users WHERE user_id = ?',
            [user_id],
            (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            }
        );
    });
};

module.exports = {
    createUser,
    getUser
}; 