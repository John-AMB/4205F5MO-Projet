// Ce fichier gere les requetes de base de donnees
// Vue -> Model -> Controller
const db = require("../db"); // import de db.js la connexion -> db cweeterie

//prend tt les users
const getAllUsers = (callback) => {
  db.query("SELECT * FROM users", callback);
};

//callback = assurez que la page fonctionne meme si les requetes de db prennent du temps a s'exec
//un seul user en utilisant id
const getUserById = (id, callback) => {
  db.query("SELECT username, bio FROM users WHERE id = ?", [id], callback);
};

//Inserer une user dans le database
const createUser = (user, callback) => {
  db.query(
    "INSERT INTO users (username, password, bio) VALUES (?, ?, ?)",
    [user.username, user.password, user.bio],
    callback
  );
};

//verifie si le username et password correspondent a un user dans le database -> un user existant
const findByUsernameAndPassword = (username, password, callback) => {
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    callback
  );
};

//les fichiers qui importent userModel.js a access:
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  findByUsernameAndPassword,
};
