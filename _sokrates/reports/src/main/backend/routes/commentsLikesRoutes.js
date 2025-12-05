const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// Get all comments for a specific idea
router.get("/comments/:idee_id", async (req, res) => {
  const { idee_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("idee_id", idee_id)
      .order("created_at", { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching comments:", err.message);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Add a comment (temporary: user_id = 1)
router.post("/comments", async (req, res) => {
  const { idee_id, content } = req.body;

  const user_id = 1; // **************************placeholder until auth is ready

  if (!idee_id || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ idee_id, user_id, content }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Error adding comment:", err.message);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

//  Get total likes for an idea
router.get("/likes/:idee_id", async (req, res) => {
  const { idee_id } = req.params;

  try {
    const { count, error } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("idee_id", idee_id);

    if (error) throw error;

    res.status(200).json({ likes: count });
  } catch (err) {
    console.error("❌ Error fetching likes:", err.message);
    res.status(500).json({ error: "Failed to fetch likes" });
  }
});

//  Toggle like (temporary: user_id = 1)
router.post("/likes/:idee_id", async (req, res) => {
  const { idee_id } = req.params;
  const user_id = 1; // 👈 temporary placeholder

  try {
    // Check if the user already liked this idea
    const { data: existing, error: fetchError } = await supabase
      .from("likes")
      .select("*")
      .eq("idee_id", idee_id)
      .eq("user_id", user_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    if (existing) {
      // Unlike → delete the record
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("idee_id", idee_id)
        .eq("user_id", user_id);

      if (deleteError) throw deleteError;

      return res.status(200).json({ message: "Like removed" });
    } else {
      // Like → insert new record
      const { data, error } = await supabase
        .from("likes")
        .insert([{ idee_id, user_id }])
        .select();

      if (error) throw error;

      return res.status(201).json({ message: "Like added", data });
    }
  } catch (err) {
    console.error(" Error toggling like:", err.message);
    res.status(500).json({ error: "Failed to toggle like" });
  }
});

module.exports = router;
