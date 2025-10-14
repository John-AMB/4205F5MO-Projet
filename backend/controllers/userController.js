// controllers/userController.js
const User = require("../models/userModel");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one user
const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.getUserById(id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a user
const createUser = async (req, res) => {
  const { username, password, bio } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur et mot de passe requis" });
  }

  try {
    const newUser = await User.createUser({ username, password, bio });
    res.status(201).json({ message: "Utilisateur créé", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
