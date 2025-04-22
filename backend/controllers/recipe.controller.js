import mongoose from "mongoose";
import Recipe from "../models/recipe.model.js";
import Review from "../models/review.model.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createRecipe = async (req, res) => {
  const recipe = req.body; //user will send this data

  if (
    //user_id still isnt required. populate db w API first
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

  const newRecipe = new Recipe(recipe);

  try {
    await newRecipe.save();
    res.status(201).json({ success: true, data: newRecipe });
  } catch (error) {
    console.error("Error in Create recipe:", error.message);
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
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const recipes = await Recipe.find({ user_id: userId });
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.error("Error fetching user's recipes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
