import express from "express";
import {
  getRecipes,
  getPopularRecipes,
  getUserRecipes,
  getRelatedRecipes,
  searchRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/popular", getPopularRecipes);
router.get("/user/:id", getUserRecipes); //users/ must be there or the next line will not work
router.get("/related/:id", getRelatedRecipes);
router.get("/search/:query", searchRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
