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
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);

  useEffect(() => {
    const fetchTrendingRecipes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/recipes/popular");
        console.log("Trending Recipes Data:", data); // Debugging
        setTrendingRecipes(data.data);
      } catch (error) {
        console.error("Error fetching trending recipes:", error);
      }
    };
  
    fetchTrendingRecipes();
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/recipes/${recipeId}`
        );
        setRecipe(data.data);

        const relatedResponse = await axios.get(
          `http://localhost:5000/api/recipes/related/${recipeId}`
        );
        setRelatedRecipes(relatedResponse.data.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <>
      <Navbar />
      <Box maxW="1200px" mx="auto" p={6}>
        {/* Breadcrumb */}
        <Text fontSize="sm" color="gray.500" mb={4}>
          Home &gt; {recipe.name}
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={6}>
          {/* Left Section */}
          <GridItem>
            {/* Recipe Header */}
            <Heading as="h1" size="xl" mb={4}>
              {recipe.name}
            </Heading>
            <HStack spacing={4} align="center" mb={6}>
              <Avatar src={recipe.user_id?.avatar} name={recipe.user_id?.name} />
              <Text fontSize="md" color="gray.600">
                {recipe.user_id?.name || "Unknown Author"}
              </Text>
              <Text fontSize="md" color="orange.500">
                {recipe.rating || "N/A"} ★
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
                  Serving Size: {recipe.servingSize || "N/A"}
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
            <Divider mb={6} />

            {/* Rating Section */}
            <Box textAlign="center" mb={6}>
              <Divider borderColor="orange.500" mb={4} />
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Like the recipe? Give us your rating!
              </Text>
              <HStack justify="center" spacing={1} mb={4}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Text
                    key={index}
                    fontSize="2xl"
                    color={index < 3 ? "orange.500" : "gray.300"} // Example: 3 stars selected
                    cursor="pointer"
                  >
                    ★
                  </Text>
                ))}
              </HStack>
            </Box>

            {/* Comment Input Section */}
            <Box mb={8}>
              <Box
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                p={4}
                mb={4}
              >
                <Input
                  placeholder="Add Comment..."
                  variant="unstyled"
                  mb={2}
                />
                <HStack justify="space-between">
                  <HStack spacing={2}>
                    <Button size="sm" variant="ghost">
                      <b>B</b>
                    </Button>
                    <Button size="sm" variant="ghost">
                      <i>I</i>
                    </Button>
                    <Button size="sm" variant="ghost">
                      <u>U</u>
                    </Button>
                    <Button size="sm" variant="ghost">
                      😊
                    </Button>
                  </HStack>
                  <Button colorScheme="orange" size="sm">
                    Submit
                  </Button>
                </HStack>
              </Box>
            </Box>

            {/* Comments Section */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Comments
              </Text>
              <VStack align="stretch" spacing={6}>
                {/* Example Comment */}
                <Box>
                  <HStack align="start" spacing={4}>
                    <Avatar
                      src="/images/avatar1.jpg"
                      name="Username"
                      size="md"
                    />
                    <Box>
                      <Text fontWeight="bold">&lt;Username&gt;</Text>
                      <Text fontSize="sm" color="gray.500">
                        &lt;Time since comment&gt;
                      </Text>
                      <Text mt={2}>
                        &lt;Comment&gt;
                      </Text>
                      <HStack spacing={4} mt={2}>
                        <Button size="xs" variant="ghost">
                          Reply
                        </Button>
                        <Text fontSize="sm" color="gray.500">
                          69
                        </Text>
                      </HStack>
                    </Box>
                  </HStack>
                </Box>

                {/* Another Example Comment */}
                <Box>
                  <HStack align="start" spacing={4}>
                    <Avatar
                      src="/images/avatar2.jpg"
                      name="Username"
                      size="md"
                    />
                    <Box>
                      <Text fontWeight="bold">Username</Text>
                      <Text fontSize="sm" color="gray.500">
                        &lt;Time since comment&gt;
                      </Text>
                      <Text mt={2}>
                        &lt;Comment&gt;
                      </Text>
                      <HStack spacing={4} mt={2}>
                        <Button size="xs" variant="ghost">
                          Reply
                        </Button>
                        <Text fontSize="sm" color="gray.500">
                          21
                        </Text>
                      </HStack>
                    </Box>
                  </HStack>
                </Box>
              </VStack>

              {/* Load More Comments */}
              <Button
                mt={6}
                colorScheme="orange"
                variant="outline"
                size="sm"
                mx="auto"
                display="block"
              >
                Load more comments
              </Button>
            </Box>
          </GridItem>

          {/* Right Section */}
          <GridItem>
            {/* Related Recipes */}
<Heading as="h2" size="lg" mb={4}>
  Related Recipes
</Heading>
<VStack spacing={4} align="stretch">
  {relatedRecipes.length > 0 ? (
    relatedRecipes.map((relatedRecipe) => (
      <Link key={relatedRecipe._id} to={`/recipes/${relatedRecipe._id}`} style={{ textDecoration: "none" }}>
        <HStack
          spacing={4}
          align="center"
          cursor="pointer"
          _hover={{ bg: "gray.100", transform: "scale(1.02)" }}
          transition="all 0.2s ease-in-out"
          p={2}
          borderRadius="md"
        >
          <Image
            src={relatedRecipe.image}
            alt={relatedRecipe.name}
            boxSize="100px"
            borderRadius="md"
            objectFit="cover"
          />
          <VStack align="start" spacing={1}>
            <Text fontSize="sm" fontWeight="bold">
              {relatedRecipe.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {relatedRecipe.description}
            </Text>
          </VStack>
        </HStack>
      </Link>
    ))
  ) : (
    <Text fontSize="sm" color="gray.500">
      No related recipes found.
    </Text>
  )}
</VStack>

            {/* Newsletter */}
            <Box bg="#D3F38E" p={4} borderRadius="md" mt={6}>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                Stay Connected with Recipe Updates
              </Text>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Hungry for inspiration? Get fresh recipe ideas, and cooking tips
                delivered straight to your inbox.
              </Text>
              <HStack>
                <Input
                  placeholder="Enter your email"
                  size="sm"
                  bg="white"
                  borderRadius="md"
                />
                <Button bg="#97C33A" size="sm" width="150px" _hover={{ bg: "#7da52f" }}>
                  Subscribe
                </Button>
              </HStack>
            </Box>

            {/* Trending Recipes */}
<Heading as="h2" size="lg" mt={8} mb={4}>
  Trending Recipes
</Heading>
<VStack spacing={4} align="stretch">
  {trendingRecipes && trendingRecipes.length > 0 ? (
    trendingRecipes.map((recipe) => (
      <Link key={recipe._id} to={`/recipe/${recipe._id}`} style={{ textDecoration: "none" }}>
        <HStack
          spacing={4}
          align="center"
          cursor="pointer"
          _hover={{ bg: "gray.100", transform: "scale(1.02)" }}
          transition="all 0.2s ease-in-out"
          p={2}
          borderRadius="md"
        >
          <Image
            src={recipe.image || "/images/default-recipe.jpg"}
            alt={recipe.name || "Recipe"}
            boxSize="80px"
            borderRadius="md"
            objectFit="cover"
          />
          <VStack align="start" spacing={1}>
            <Text fontSize="sm" fontWeight="bold">
              {recipe.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {recipe.description || "No description available"}
            </Text>
          </VStack>
        </HStack>
      </Link>
    ))
  ) : (
    <Text fontSize="sm" color="gray.500">
      No trending recipes found.
    </Text>
  )}
</VStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default RecipePage;
