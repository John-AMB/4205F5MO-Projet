const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: ".env.production" });

const app = express();
const allowedOrigins = [
  "https://four205f5mo-projet.onrender.com", // production
  "http://localhost:5173", // local dev
];
// Enable CORS only for your frontend
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const ideasRoute = require("./routes/ideaRoutes");
const commentsLikesRoutes = require("./routes/commentsLikesRoutes");

app.use("/users", userRoutes);
app.use("/ideas", ideasRoute);
app.use("/ideas", commentsLikesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
