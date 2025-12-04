const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

/* =======================
   GET COMMENTS FOR AN IDEA
   ======================= */
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

/* =======================
   ADD COMMENT
   ======================= */
router.post("/comments", async (req, res) => {
  const { idee_id, content, user_id } = req.body;

  if (!idee_id || !content || !user_id) {
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
    console.error("❌ Error adding comment:", err.message);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

/* =======================
   GET TOTAL LIKES
   ======================= */
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

/* ======================
   CHECK IF USER LIKED
   ====================== */
router.get("/likes/:idee_id/user/:user_id", async (req, res) => {
  const { idee_id, user_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("idee_id", idee_id)
      .eq("user_id", user_id)
      .maybeSingle();

    if (error) throw error;

    res.status(200).json({ liked: !!data });
  } catch (err) {
    console.error("❌ Error checking like state:", err.message);
    res.status(500).json({ error: "Failed to fetch user like state" });
  }
});

/* =======================
   TOGGLE LIKE
   ======================= */
router.post("/likes/:idee_id", async (req, res) => {
  const { idee_id } = req.params;
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }

  try {
    const { data: existing, error: fetchError } = await supabase
      .from("likes")
      .select("*")
      .eq("idee_id", idee_id)
      .eq("user_id", user_id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existing) {
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("idee_id", idee_id)
        .eq("user_id", user_id);

      if (deleteError) throw deleteError;

      return res.status(200).json({ message: "Like removed" });
    } else {
      const { data, error } = await supabase
        .from("likes")
        .insert([{ idee_id, user_id }])
        .select();

      if (error) throw error;

      return res.status(201).json({ message: "Like added", data });
    }
  } catch (err) {
    console.error("❌ Error toggling like:", err.message);
    res.status(500).json({ error: "Failed to toggle like" });
  }
});

module.exports = router;
