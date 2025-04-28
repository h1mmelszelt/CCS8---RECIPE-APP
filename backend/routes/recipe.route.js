import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
  getPopularRecipes,
  getUserRecipes,
  getRecipeById,
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/popular", getPopularRecipes);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
router.get("users/:id", getUserRecipes); //users/ must be there or the next line will not work
router.get("/:id", getRecipeById);
//router.post("/related", getRelatedRecipes);

export default router;
