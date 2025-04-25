import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  Divider,
  Tag,
  Avatar,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard"; // Use the existing RecipeCard component

const RecipePage = () => {
  const { recipeId } = useParams(); // Recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipe details
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${recipeId}`); // Existing route
        setRecipe(data.data); // Assuming the response structure is { success: true, data: recipe }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    // Fetch related and trending recipes
    const fetchRelatedAndTrending = async () => {
      try {
        const { data: trending } = await axios.get(`/api/recipes/popular`); // Existing route for trending recipes
        setTrendingRecipes(trending);

        const { data: related } = await axios.get(`/api/reviews/${recipeId}`); // Use reviews to fetch related recipes
        setRelatedRecipes(related);
      } catch (error) {
        console.error("Error fetching related/trending recipes:", error);
      }
    };

    fetchRecipe();
    fetchRelatedAndTrending();
  }, [recipeId]);

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      {/* Breadcrumb */}
      <Text fontSize="sm" color="gray.500" mb={4}>
        Home &gt; {recipe.name}
      </Text>

      {/* Recipe Header */}
      <Heading as="h1" size="xl" mb={4}>
        {recipe.name}
      </Heading>
      <HStack spacing={4} align="center" mb={6}>
        <Avatar src={recipe.user_id.avatar} name={recipe.user_id.name} />
        <Text fontSize="md" color="gray.600">
          {recipe.user_id.name}
        </Text>
        <Text fontSize="md" color="orange.500">
          {recipe.rating} ★
        </Text>
      </HStack>

      {/* Recipe Image */}
      <Image
        src={recipe.image}
        alt={recipe.name}
        borderRadius="md"
        mb={6}
        width="100%"
        height="400px"
        objectFit="cover"
      />

      {/* Recipe Details */}
      <VStack align="start" spacing={4} mb={6}>
        <Text fontSize="lg" fontWeight="bold">
          {recipe.description}
        </Text>
        <HStack spacing={4}>
          <Button colorScheme="orange" variant="outline">
            Print Recipe
          </Button>
          <Button colorScheme="orange" variant="outline">
            Share Recipe
          </Button>
          <Button colorScheme="orange" variant="outline">
            Add to Bookmarks
          </Button>
        </HStack>
        <HStack spacing={8}>
          <Text fontSize="md" color="gray.600">
            Prep Time: {recipe.prepTime} mins
          </Text>
          <Text fontSize="md" color="gray.600">
            Serving Size: {recipe.servingSize}
          </Text>
        </HStack>
      </VStack>

      <Divider mb={6} />

      {/* Ingredients */}
      <Heading as="h2" size="lg" mb={4}>
        Ingredients
      </Heading>
      <VStack align="start" spacing={2} mb={6}>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} fontSize="md" color="gray.700">
            {ingredient}
          </Text>
        ))}
      </VStack>

      {/* Instructions */}
      <Heading as="h2" size="lg" mb={4}>
        Instructions
      </Heading>
      <VStack align="start" spacing={4} mb={6}>
        {recipe.instructions.map((instruction, index) => (
          <HStack key={index} align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="orange.500">
              {index + 1}.
            </Text>
            <Text fontSize="md" color="gray.700">
              {instruction}
            </Text>
          </HStack>
        ))}
      </VStack>

      <Divider mb={6} />

      {/* Related Recipes */}
      <Heading as="h2" size="lg" mb={4}>
        Related Recipes
      </Heading>
      <HStack spacing={4} overflowX="auto" mb={6}>
        {relatedRecipes.map((related) => (
          <RecipeCard
            key={related._id}
            _id={related._id}
            title={related.name}
            image={related.image}
            description={related.description}
          />
        ))}
      </HStack>

      {/* Trending Recipes */}
      <Heading as="h2" size="lg" mb={4}>
        Trending Recipes
      </Heading>
      <HStack spacing={4} overflowX="auto" mb={6}>
        {trendingRecipes.map((trending) => (
          <RecipeCard
            key={trending._id}
            _id={trending._id}
            title={trending.name}
            image={trending.image}
            description={trending.description}
          />
        ))}
      </HStack>

      {/* Tags */}
      <Heading as="h2" size="lg" mb={4}>
        Tags
      </Heading>
      <HStack spacing={4}>
        {recipe.tags.map((tag, index) => (
          <Tag key={index} size="lg" colorScheme="orange">
            {tag}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
};

export default RecipePage;