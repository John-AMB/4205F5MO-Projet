const express = require("express"); // RESTful API
const mysql = require("mysql2"); //pour connecter au mysql databases
const cors = require("cors"); // autroriser le frontend sur localhost:3000 a communiquer avec le backend sur localhost:3001
require("dotenv").config(); //.env = pr que les infos sensibles de la database soient stockees en dehors du code

const app = express();
app.use(cors());
app.use(express.json()); //traducteur: le frontend comm en JSON, cekui-ci le traduit en un fformat que Node/Exoress peut comprendre

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
