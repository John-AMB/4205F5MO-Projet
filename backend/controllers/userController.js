//gere la logique et les reponses
const User = require("../models/userModel");

//tout les utilisateurs
const getUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

//un seul utilisateur
const getUser = (req, res) => {
  const id = req.params.id; //req.params-> id:'5', req.params.id->'5'

  User.getUserById(id, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(results[0]);
  });
};

//methode qui creer une user
const createUser = (req, res) => {
  const { username, password, bio } = req.body;

  //lorsque username OU password = null
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur et mot de passe requis" });
  }

  User.createUser({ username, password, bio }, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({
      message: "Utilisateur créé sans problème",
      id: results.insertId, //lorsqu'on veut rediriger le id de notre nouveau compte a frontend, futur addition
    });
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
