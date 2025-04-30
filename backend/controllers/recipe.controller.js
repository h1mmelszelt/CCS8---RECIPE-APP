import mongoose from "mongoose";
import Recipe from "../models/recipe.model.js";
import Review from "../models/review.model.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    console.log("Fetched recipes from DB:", recipes); // Debug log
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createRecipe = async (req, res) => {
  const recipe = req.body;

  // Validate required fields
  if (
    !recipe.name ||
    !recipe.ingredients ||
    !recipe.instructions ||
    !recipe.image ||
    !recipe.tags
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const newRecipe = new Recipe(recipe);
    await newRecipe.save();
    res.status(201).json({ success: true, data: newRecipe });
  } catch (error) {
    console.error("Error in Create recipe:", error.message);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Recipe" });
  }

  try {
    const UpdatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {
      new: true,
    });
    res.status(200).json({ success: true, data: UpdatedRecipe });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Recipe" });
  }

  try {
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Recipe deleted" });
  } catch (error) {
    console.log("error in deleting recipe:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getPopularRecipes = async (req, res) => {
  try {
    const popular = await Review.aggregate([
      {
        $group: {
          _id: "$recipe_id",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      { $limit: 5 },
    ]);

    const results = await Recipe.populate(popular, { path: "_id" });

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching popular recipes:", err);
    res.status(500).json({ error: "Failed to get popular recipes" });
  }
};

export const getUserRecipes = async (req, res) => {
  const id = req.params.id;

  console.log("Received userId:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const recipes = await Recipe.find({ user_id: id });
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.error("Error fetching user's recipes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getRecipeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Recipe" });
  }

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    console.error("Error fetching recipe by ID:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getRelatedRecipes = async (req, res) => {
  const { id } = req.params; // Get the current recipe ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Recipe ID" });
  }

  try {
    // Fetch the current recipe to get its tags
    const currentRecipe = await Recipe.findById(id);

    if (!currentRecipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    const tags = currentRecipe.tags;

    if (!tags || tags.length === 0) {
      return res.status(200).json({ success: true, data: [] }); // No related recipes if no tags
    }

    // Find related recipes with matching tags, excluding the current recipe
    const relatedRecipes = await Recipe.find({
      tags: { $in: tags },
      _id: { $ne: id }, // Exclude the current recipe
    }).limit(5);

    res.status(200).json({ success: true, data: relatedRecipes });
  } catch (error) {
    console.error("Error fetching related recipes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const searchRecipes = async (req, res) => {
  const { query } = req.params; // Extract query from params

  try {
    const recipes = await Recipe.find({
      name: { $regex: query, $options: "i" }, // Perform case-insensitive search
    });

    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.error("Error searching recipes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
