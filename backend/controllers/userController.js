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

module.exports = {
  getUsers,
  getUser,
};
