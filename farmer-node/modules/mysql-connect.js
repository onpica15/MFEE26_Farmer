require('dotenv').config();

const mysql = require('mysql2');

const Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 8,
    queueLimit: 0,
});

module.exports = Pool.promise();
