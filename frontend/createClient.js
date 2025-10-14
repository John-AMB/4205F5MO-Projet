import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://fmmzudwexljnklpqliby.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbXp1ZHdleGxqbmtscHFsaWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNDE2MjgsImV4cCI6MjA3NTkxNzYyOH0.u9g_yIjKcg_1pbMels-P3ru2u9RCK0m89GJddadGWAk"
);
