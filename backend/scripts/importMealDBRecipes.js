import axios from "axios";

const fetchAndSaveRecipes = async () => {
  try {
    // Fetch 10 random meals from TheMealDB
    for (let i = 0; i < 10; i++) {
      const { data } = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const meal = data.meals[0];

      // Convert ingredients and measurements into one array
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${measure} ${ingredient}`.trim());
        }
      }

      const newRecipe = {
        title: meal.strMeal,
        ingredients: ingredients,
        instructions: meal.strInstructions,
        image: meal.strMealThumb,
        tags: meal.strTags ? meal.strTags.split(",") : [],
      };

      // Post the recipe to your API
      const response = await axios.post(
        "https://cs-test-z2vm.onrender.com/api/recipes",
        newRecipe
      );
      console.log(`Saved: ${newRecipe.title} | Status: ${response.status}`);
    }
  } catch (err) {
    console.error("Error saving recipe:", {
      message: err.message,
      responseData: err.response?.data,
      status: err.response?.status,
    });
  }
};

fetchAndSaveRecipes();
