//entry point for API
//created script and used nodemon to track changes
//pu2EJenGGvSD23tD

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import recipeRoutes from "./routes/recipe.route.js";
import userRoutes from "./routes/user.route.js";
import reviewRoutes from "./routes/review.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api", userRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get( "*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html" ));
  });
}

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
