//gere la logique et les reponses
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
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID requis" });
    }

    let photoUrl = null;

    if (req.file) {
      const result = await uploadFromBuffer(req.file.buffer);
      photoUrl = result.secure_url;
    } else {
      return res.status(400).json({ error: "No file uploaded" });
    }

    User.updateProfilePhoto(userId, photoUrl, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({
        message: "Profile photo updated successfully",
        photo: photoUrl,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload profile photo" });
  }
};

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

//methode qui connecte une user
const loginUser = (req, res) => {
  const { username, password } = req.body;

  //lorsque username OU password = null
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur et mot de passe requis" });
  }

  //methode dans userModel.js
  User.findByUsernameAndPassword(username, password, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const user = results[0];
    res.json({
      message: "Connexion réussie",
      user: { id: user.id, username: user.username, bio: user.bio },
      //passe les infos utilisateur a frontend. stocked dans le res
    });
  });
};

const changePassword = (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  //check si les champs requis sont fournis
  if (!userId || !oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Champs requis manquants" });
  }

  //verifie si l'ancien mot de passe correspond au mot de passe stocke dans la db
  User.verifyOldPassword(userId, oldPassword, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      //ancien mot de passe incorrect
      return res
        .status(401)
        .json({ success: false, message: "Ancien mot de passe incorrect" });
    }

    //update le mot de passe
    User.updatePassword(userId, newPassword, (err) => {
      if (err) return res.status(500).json({ success: false, message: err });
      res.json({
        success: true,
        message: "Mot de passe mis à jour avec succès",
      });
    });
  });
};

const changeBio = (req, res) => {
  const { userId, bio } = req.body;

  // Check if userId and bio are provided
  if (!userId || bio == undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Champs requis manquants" });
  }

  // Update the user's bio in the database
  User.updateBio(userId, bio, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Database erreur" });
    }

    res.json({ success: true, message: "Bio mise à jour avec succès" });
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  changePassword,
  changeBio,
  changeProfilePhoto,
};
