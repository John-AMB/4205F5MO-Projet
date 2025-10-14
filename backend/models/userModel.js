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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
