const supabase = require("./supabaseClient");

async function testInsert() {
  const { data, error } = await supabase
    .from("idees")
    .insert([{ titre: "Test", description: "Hello", user_id: 1 }])
    .select();

  if (error) console.error(error);
  else console.log(data);
}

testInsert();
