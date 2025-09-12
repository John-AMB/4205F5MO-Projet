const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//connexion avec le database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//dans terminal, faire node index.js pr tester
db.connect((err) => {
  if (err) throw err;
  console.log("Datanase connexion reussie");
});
