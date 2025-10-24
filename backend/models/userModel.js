// models/userModel.js
const supabase = require("../supabaseClient");

// Get all users
const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
};

// Get one user by id
const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, bio")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

// //callback = assurez que la page fonctionne meme si les requetes de db prennent du temps a s'exec
// //un seul user en utilisant id
// const getUserById = (id, callback) => {
//   db.query(
//     "SELECT username, bio,photo FROM users WHERE id = ?",
//     [id],
//     callback
//   );
// };

// Create a user
const createUser = async ({ username, password, bio }) => {
  const { data, error } = await supabase
    .from("users")
    .insert({ username, password, bio })
    .select()
    .single();
  if (error) throw error;
  return data;
};

//verifie si le username et password correspondent a un user dans le database -> un user existant
const findByUsernameAndPassword = (username, password, callback) => {
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    callback
  );
};

//verifie si l'ancien mot de passe correspond au mot de passe que l'utilisateur a entre
const verifyOldPassword = (userId, oldPassword, callback) => {
  db.query(
    "SELECT * FROM users WHERE id = ? AND password = ?",
    [userId, oldPassword],
    callback
  );
};

//met a jour le mot de passe de l'utilisateur
const updatePassword = (userId, newPassword, callback) =>
  db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [newPassword, userId],
    callback
  );

//met a jour la bio de l'utilisateur
const updateBio = (userId, newBio, callback) => {
  db.query("UPDATE users SET bio = ? WHERE id = ?", [newBio, userId], callback);
};

//met a jour la photo de profil de l'utilisateur
const updateProfilePhoto = (userId, photoUrl, callback) => {
  db.query(
    "UPDATE users SET photo = ? WHERE id = ?",
    [photoUrl, userId],
    callback
  );
};

//supprime un user
const deleteUser = (userId, callback) => {
  db.query("DELETE FROM users WHERE id = ?", [userId], callback);
};

//les fichiers qui importent userModel.js a access:
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  findByUsernameAndPassword,
  verifyOldPassword,
  updatePassword,
  updateBio,
  updateProfilePhoto,
  deleteUser,
};
