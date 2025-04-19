//entry point for API
//created script and used nodemon to track changes
//pu2EJenGGvSD23tD

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import recipeRoutes from "./routes/recipe.route.js";
import userRoutes from "./routes/user.route.js"; // Import the user routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes); // Add user routes

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
