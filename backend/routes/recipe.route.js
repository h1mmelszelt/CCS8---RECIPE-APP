import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
  getPopularRecipes,
  getUserRecipes,
  getRecipeById,
  getRelatedRecipes,
  searchRecipes
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.get("/popular", getPopularRecipes);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
router.get("users/:id", getUserRecipes); //users/ must be there or the next line will not work
router.get("/related/:id", getRelatedRecipes);
router.get("/search/:query", searchRecipes);

export default router;
