import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
  getPopularRecipes,
  getUserRecipes,
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/popular", getPopularRecipes);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
router.get("/:userId", getUserRecipes);

export default router;
