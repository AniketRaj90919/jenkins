const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, sql } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

/* ---------------- GET USERS ---------------- */
app.get("/api/users", async (req, res) => {
  try {
    const request = new sql.Request();

    const result = await request.query(
      "SELECT * FROM Users"
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

/* ---------------- SIGNUP ---------------- */
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const request = new sql.Request();

    await request
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(`
        INSERT INTO Users (name, email, password)
        VALUES (@name, @email, @password)
      `);

    res.json({
      message: "Signup successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

/* ---------------- LOGIN ---------------- */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const request = new sql.Request();

    const result = await request
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(`
        SELECT * FROM Users
        WHERE email = @email AND password = @password
      `);

    if (result.recordset.length > 0) {
      res.json({
        message: "Login successful",
        user: result.recordset[0],
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});