const express = require("express"); // RESTful API
const cors = require("cors"); // autroriser le frontend sur localhost:5137 a communiquer avec le backend sur localhost:3001
require("dotenv").config({ path: ".env.production" });
//.env = pr que les infos sensibles de la database soient stockees en dehors du code

const app = express();
app.use(cors());
app.use(express.json()); //traducteur: le frontend comm en JSON, cekui-ci le traduit en un fformat que Node/Exoress peut comprendre

const userRoutes = require("./routes/userRoutes");
const ideasRoute = require("./routes/ideaRoutes");
app.use("/users", userRoutes); //quand une requete commence avec /users, utiliser les routes de userRoutes
app.use("/ideas", ideasRoute);
//start backend
app.listen(3001, () => {
  console.log("Backend: http://localhost:3001");
});
