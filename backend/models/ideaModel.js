const supabase = require("../supabaseClient");

// Get all ideas
const getAllIdeas = async () => {
  const { data, error } = await supabase.from("idees").select("*");
  if (error) throw error;
  return data;
};

// Get one idea by ID
const getIdeaById = async (id) => {
  const { data, error } = await supabase.from("idees").select("*").eq("id", id);
  if (error) throw error;
  return data[0];
};

// Create a new idea
const createIdea = async (idea) => {
  const { data, error } = await supabase.from("idees").insert([idea]).select();
  if (error) throw error;
  return data[0];
};

// Update idea
const updateIdea = async (id, idea) => {
  const { data, error } = await supabase
    .from("idees")
    .update(idea)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
};

// Delete idea
const deleteIdea = async (id) => {
  const { error } = await supabase.from("idees").delete().eq("id", id);
  if (error) throw error;
  return true;
};

module.exports = {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
};
