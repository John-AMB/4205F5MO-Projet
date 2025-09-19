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

//les fichiers qui importent userModel.js a access:
module.exports = {
  getAllUsers,
  getUserById,
};
