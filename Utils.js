const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();

/*
  Hash a password before saving to database
*/
const hashPassword = async (plain) => {
  return await bcrypt.hash(plain, 10);
};

/*
  Check if entered password === saved hashed password
*/
const comparePassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};

/*
  Create a JWT token
  Payload generally contains:
  { id: userId, username: userName }
*/
const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

/*
  Verify a JWT token and return the data inside it
*/
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

/*Database connection setup*/

/*For remote DB like Neon/Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
*/

/* For local DB (uncomment if needed)*/
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "mydb",
  password: process.env.DB_PASS || "password",
  port: process.env.DB_PORT || 5432
});

/* Initialize DB tables if not exist */

const initializeDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INTEGER,
        gender VARCHAR(50),
        no VARCHAR(50),
        jwt TEXT
      );

      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER,
        stclass VARCHAR(50)
      );
    `);

    console.log("Database connected & tables ready.");
  } catch (error) {
    console.error("Database initialization error:", error.message);
  }
};

initializeDb();


module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
  pool
};

const {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
  pool
} = require("./Utils");




