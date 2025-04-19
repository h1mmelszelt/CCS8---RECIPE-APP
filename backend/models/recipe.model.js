import mongoose from "mongoose";

// Assuming you have a User model, we'll reference it for the author_id
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], // Array of ingredients
      required: true,
    },
    instructions: {
      type: [String], // Recipe steps/instructions
      required: true,
    },
    image: {
      type: String, // URL for recipe image
      required: true,
    },
    servingSize: {
      type: Number,
      required: false, // Set to true if every recipe MUST have a serving size
      min: 1, // Optional: Ensures serving size is at least 1
    },
    description: {
      type: String, // Short description of the recipe
      required: false, // Optional field
    },
    tags: {
      type: [String], // Array of tags like ['vegan', 'gluten-free']
      required: true, // Optional field
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false,
  }
);

// Create the Recipe model based on the schema
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
