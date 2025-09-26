//ce fichier est dedie a la connexion a la base de donnees.
const mysql = require("mysql2"); // autroriser le frontend sur localhost:3000 a communiquer avec le backend sur localhost:3001
require("dotenv").config(); //.env = pr que les infos sensibles de la database soient stockees en dehors du code

//connexion avec le database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected successfully");
});

module.exports = db; //const dp = ce que les autres fichiers peuvent importer a partir de ce fichier
