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
const findByUsernameAndPassword = async (username, password) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();
  if (error) throw error;
  return data;
};

//verifie si l'ancien mot de passe correspond au mot de passe que l'utilisateur a entre
const verifyOldPassword = async (userId, oldPassword) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .eq("password", oldPassword)
    .single();
  if (error) throw error;
  return data;
};

//met a jour le mot de passe de l'utilisateur
const updatePassword = async (userId, newPassword) => {
  const { data, error } = await supabase
    .from("users")
    .update({ password: newPassword })
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

//met a jour la bio de l'utilisateur
const updateBio = async (userId, newBio) => {
  const { data, error } = await supabase
    .from("users")
    .update({ bio: newBio })
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

//met a jour la photo de profil de l'utilisateur
const updateProfilePhoto = async (userId, photoUrl) => {
  const { data, error } = await supabase
    .from("users")
    .update({ photo: photoUrl })
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

//supprime un user
const deleteUser = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);
  if (error) throw error;
  return data;
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
