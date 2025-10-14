require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function testIdeasTable() {
  console.log("Testing Service Role access to table 'idees'...");

  try {
    const { data, error } = await supabase.from("idees").select("*");

    if (error) {
      console.error("❌ Query error:", error.message);
    } else {
      console.log("✅ Success! Data returned from 'idees':");
      console.table(data);
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
}

testIdeasTable();
