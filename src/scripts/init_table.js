const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database.db');
const db = new sqlite3.Database(dbPath);

const init = [
    // Drop existing tables
    // `DROP TABLE IF EXISTS refresh_tokens`,
    // `DROP TABLE IF EXISTS users`,
    // `DROP TABLE IF EXISTS seat_bookings`,
    // `DROP TABLE IF EXISTS trips`,
    // `DROP TABLE IF EXISTS route_stops`,
    // `DROP TABLE IF EXISTS towns`,
    // `DROP TABLE IF EXISTS busroutes`,

    // Create tables
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id VARCHAR(36) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        user_type VARCHAR(20) CHECK(user_type IN ('COMMUTER', 'ADMIN')) NOT NULL DEFAULT 'COMMUTER',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // `CREATE TABLE IF NOT EXISTS refresh_tokens (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     user_id VARCHAR(36) NOT NULL,
    //     token VARCHAR(255) NOT NULL UNIQUE,
    //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    //     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    // )`,

    `CREATE TABLE IF NOT EXISTS towns (
        town_id INTEGER PRIMARY KEY AUTOINCREMENT,
        town_name VARCHAR(255) NOT NULL UNIQUE
    )`,

    `CREATE TABLE IF NOT EXISTS busroutes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        route_name VARCHAR(255) NOT NULL UNIQUE
    )`,

    `CREATE TABLE IF NOT EXISTS route_stops (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        route_id INTEGER NOT NULL,
        town_id INTEGER NOT NULL,
        stop_order INTEGER NOT NULL,
        FOREIGN KEY (route_id) REFERENCES busroutes(id),
        FOREIGN KEY (town_id) REFERENCES towns(town_id),
        UNIQUE(route_id, town_id),
        UNIQUE(route_id, stop_order)
    )`,

    `CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id VARCHAR(36) NOT NULL UNIQUE,
        bus_route VARCHAR(255) NOT NULL,
        driver_name VARCHAR(255) NOT NULL,
        conductor_name VARCHAR(255) NOT NULL,
        trip_date DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS seat_bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        booking_id VARCHAR(36) NOT NULL UNIQUE,
        trip_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        seat_id VARCHAR(10) NOT NULL,
        created_at DATETIME NOT NULL,
        FOREIGN KEY (trip_id) REFERENCES trips(trip_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        UNIQUE(trip_id, seat_id)
    )`,

    // Create triggers
    `CREATE TRIGGER IF NOT EXISTS update_users_timestamp 
     AFTER UPDATE ON users
     BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.id;
     END`
];

// Execute all queries
db.serialize(() => {
    init.forEach(query => {
        db.run(query, (err) => {
            if (err) {
                console.error('Error executing query:', err);
                console.error('Query:', query);
            }
        });
    });
    console.log('Database initialized successfully');
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err);
    } else {
        console.log('Database connection closed');
    }
});
