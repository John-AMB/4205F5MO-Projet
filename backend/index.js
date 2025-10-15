const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: ".env.production" });

const app = express();

// Enable CORS only for your frontend
app.use(
  cors({
    origin: "https://four205f5mo-projet.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const ideasRoute = require("./routes/ideaRoutes");

app.use("/users", userRoutes);
app.use("/ideas", ideasRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
