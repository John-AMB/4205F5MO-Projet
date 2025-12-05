// controllers/userController.js
const User = require("../models/userModel");
const streamifier = require("streamifier");
const cloudinary = require("../cloudinaryConfig");

const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const changeProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID requis" });
    }

    let photoUrl = null;

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await uploadFromBuffer(req.file.buffer);
    const updatedUser = await User.updateProfilePhoto(
      userId,
      result.secure_url
    );

    res.json({
      message: "Photo de profil mise à jour avec succès",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

//methode qui connecte une user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  //lorsque username OU password = null
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur et mot de passe requis" });
  }

  try {
    //methode dans userModel.js
    const user = await User.findByUsernameAndPassword(username, password);
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }
    res.json({
      message: "Connexion réussie",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  //check si les champs requis sont fournis
  if (!userId || !oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Champs requis manquants" });
  }
  try {
    //verifie si l'ancien mot de passe correspond au mot de passe stocke dans la db
    const user = await User.verifyOldPassword(userId, oldPassword);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Ancien mot de passe incorrect" });
    }

    await User.updatePassword(userId, newPassword);
    res.json({
      success: true,
      message: "Mot de passe mis à jour avec succès",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const changeBio = async (req, res) => {
  const { userId, bio } = req.body;

  // Check if userId and bio are provided
  if (!userId || bio == undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Champs requis manquants" });
  }
  try {
    // Update the user's bio in the database
    const updatedUser = await User.updateBio(userId, bio);
    res.json({
      success: true,
      user: updatedUser,
      message: "Bio mise à jour avec succès",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteAccount = async (req, res) => {
  const { userId, username, confirmUsername } = req.body;

  //assure que tous les champs requis sont fournis
  if (!userId || !username || !confirmUsername) {
    return res
      .status(400)
      .json({ success: false, message: "Champs requis manquants" });
  }

  //verifie que les noms d'utilisateur correspondent
  if (username !== confirmUsername) {
    return res.status(400).json({
      success: false,
      message: "Les noms d'utilisateur ne correspondent pas",
    });
  }

  try {
    //verifie que le nom d'utilisateur correspond a l'id de l'utilisateur
    const user = await User.getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
    if (user.username !== username) {
      return res
        .status(403)
        .json({ success: false, message: "Nom d'utilisateur incorrect" });
    }

    //supprime l'utilisateur
    await User.deleteUser(userId);
    res.json({
      success: true,
      message: "Compte supprimé avec succès",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  changePassword,
  changeBio,
  changeProfilePhoto,
  deleteAccount,
};
