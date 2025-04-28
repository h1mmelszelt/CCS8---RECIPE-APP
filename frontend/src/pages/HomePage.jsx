import { Box, Button, Image, Text, Grid, Divider } from "@chakra-ui/react";
import Navbar from "../components/Navbar(Logged)";
import BG_Home from "/images/homebg.jpg";
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {

  const [recipes, setRecipes] = useState([]); // All recipes from the API
  const [loading, setLoading] = useState(true);
  const [snackLimit, setSnackLimit] = useState(4); // Limit for snack recipes
  const [filipinoLimit, setFilipinoLimit] = useState(4); 

    // Fetch recipes from the backend
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/recipes"); // Replace with your API endpoint
          setRecipes(response.data.data); // Store all recipes
        } catch (error) {
          console.error("Error fetching recipes:", error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRecipes();
    }, []);
  
    // Filter recipes by tag
    const getRecipesByTag = (tag) => {
      return recipes.filter(
        (recipe) =>
          recipe.tags && recipe.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      );
    };
  
  return (
    <Box
      bg="gray.100"
      minH="100vh"
      color="black"
      pb={{ base: "60px", md: "0" }} // Adjust padding for mobile view
      overflowY="scroll" // Allow vertical scrolling
      overflowX="hidden" // Disable horizontal movement
    >
      {/* Navbar */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        zIndex="1000"
        bg="white"
        boxShadow="md"
      >
        <Navbar />
      </Box>

      {/* Header Image */}
      <Box
        position="relative"
        width="100%"
        height={{ base: "20vh", md: "60vh" }} // Adjust height for responsiveness
        overflow="hidden"
      >
        <Image
          src={BG_Home}
          alt="Header Image"
          objectFit="cover"
          width="100%"
          height="70%"
        />

        {/* Vignette Effect on Sides */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="70%"
          bg="linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent, rgba(0, 0, 0, 0.3))"
          zIndex={1}
        />

        {/* Overlay Text */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
        >
          <Text
            fontSize={{ base: "19px", md: "48px" }}
            fontWeight="bold"
            color="gray.900"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"
            zIndex={2}
          >
            EXPLORE RECIPES
          </Text>
        </Box>
      </Box>

      {/* Text Between Header and Grid */}
      <Box textAlign="center" mb={20} px={{ base: 4, md: 10 }}>
        <Text
          fontSize={{ base: "12x", md: "20px" }}
          fontWeight="lightbold"
          color="gray.700"
          lineHeight="1.5"
          mt="-5%"
        >
          Can't find the perfect recipe? Share yours! Click the ‘create recipe’
          button to easily add your own culinary magic to our collection.
        </Text>

        {/* Create Recipe Button */}
        <Link to="/create" style={{ textDecoration: "none" }}>
        <Button
          mb={{ base: 12, md: 10 }}
          colorScheme="orange"
          bg="#FD660B"
          color="white"
          _hover={{ bg: "#e55a0a" }}
          size={{ base: "lg", md: "lg" }} // Increased size
          mx="auto" // Center horizontally
          display="block" // Ensure centering works
          mt={{ base: 5, md: 5 }} // Add margin-top for spacing
        >
          CREATE RECIPE
        </Button>
        </Link>

        {/* Divider Between Button and Grid */}
        <Divider borderColor="gray.400" />

        {/* Scrollable Recipes Grid */}
        <Box mt={4} px={{ base: 4, md: 10 }}>
          {/* Popular Recipes Section */}
          <Text
            fontSize={{ base: "18px", md: "24px" }}
            fontWeight="bold"
            mb={4}
            textAlign="left"
          >
            POPULAR RECIPES
          </Text>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)", // 2 columns for mobile
              md: "repeat(5, 1fr)", // 5 columns for desktop
            }}
            gap={{ base: 2, md: 6 }} // Smaller gap for mobile, larger for desktop
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Box
                key={index}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                overflow="hidden"
                zIndex={2}
              >
                <Box height={{ base: "120px", md: "200px" }} overflow="hidden">
                  <Image
                    src={`/images/recipe-${index + 1}.jpg`}
                    alt={`Recipe ${index + 1}`}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Text
                  textAlign="center"
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="bold"
                  color="black"
                  mt={2}
                  mb={2}
                >
                  Recipe Name {index + 1}
                </Text>
              </Box>
            ))}
            {/* Show More Card */}
            <Box
              bg="gray.100"
              borderRadius="md"
              boxShadow="md"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={{ base: "120px", md: "200px" }}
              cursor="pointer"
              _hover={{ bg: "gray.200" }}
            >
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="bold"
                color="gray.600"
              >
                Show More
              </Text>
            </Box>
          </Grid>

          <Divider borderColor="gray.400" my={8} />

        {/* Snack Recipes Section */}
        <Text
            fontSize={{ base: "18px", md: "24px" }}
            fontWeight="bold"
            mb={4}
            textAlign="left"
          >
            SNACK RECIPES
          </Text>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)", // 2 columns for mobile
              md: "repeat(5, 1fr)", // 5 columns for desktop
            }}
            gap={{ base: 2, md: 6 }} // Smaller gap for mobile, larger for desktop
          >
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              getRecipesByTag("snack")
              .slice(0, snackLimit)
              .map((recipe) => (
                <Link
          to={`/recipe/${recipe._id}`} // Navigate to the recipe details page
          key={recipe._id}
          style={{ textDecoration: "none" }} // Remove underline from the link
        >
          <Box
            bg="white"
            borderRadius="md"
            boxShadow="md"
            overflow="hidden"
            zIndex={2}
            position="relative"
            cursor="pointer" // Add pointer cursor to indicate clickability
            _hover={{ boxShadow: "lg" }} // Add hover effect
            role="group"
          >
            {/* Recipe Image */}
                  <Box height={{ base: "120px", md: "200px" }}  overflow="hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  {/* Recipe Name */}
                  <Text
                    textAlign="center"
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight="bold"
                    color="black"
                    mt={2}
                    mb={2}
                  >
                    {recipe.name}
                  </Text>
            {/* Hover Description */}
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.6)" // Semi-transparent black background
              color="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              opacity="0" // Initially hidden
              transition="opacity 0.3s ease-in-out" // Smooth transition
              _groupHover={{ opacity: "1" }} // Show on hover
            >
              <Text px={4} fontSize={{ base: "12px", md: "14px" }}>
                {recipe.description || "No description available."}
              </Text>
            </Box>
                </Box>
                </Link>
              ))
            )}
            {/* Show More Card */}
            <Link to="/search?filter=snack" style={{ textDecoration: "none" }}>
              <Box
                bg="gray.100"
                borderRadius="md"
                boxShadow="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={{ base: "120px", md: "200px" }}
                cursor="pointer"
                _hover={{ bg: "gray.200" }}
              >
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="bold"
                  color="gray.600"
                >
                  Show More
                </Text>
              </Box>
            </Link>
          </Grid>

          <Divider borderColor="gray.400" my={8} />

          {/* Filipino Recipes Section */}
          <Text
            fontSize={{ base: "18px", md: "24px" }}
            fontWeight="bold"
            mt={5}
            mb={4}
            textAlign="left"
          >
            FILIPINO RECIPES
          </Text>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)",
            }}
            gap={{ base: 2, md: 6 }}
          >
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              getRecipesByTag("filipino")
              .slice(0, 4)
              .map((recipe) => (
                <Link
          to={`/recipe/${recipe._id}`} // Navigate to the recipe details page
          key={recipe._id}
          style={{ textDecoration: "none" }} // Remove underline from the link
        >
                <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                overflow="hidden"
                zIndex={2}
                position="relative"
                cursor="pointer" // Add pointer cursor to indicate clickability
                _hover={{ boxShadow: "lg" }} // Add hover effect
                role="group"
                >
                  <Box height={{ base: "120px", md: "200px" }} overflow="hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  <Text
                    textAlign="center"
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight="bold"
                    color="black"
                    mt={2}
                    mb={2}
                  >
                    {recipe.name}
                  </Text>
            {/* Hover Description */}
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.6)" // Semi-transparent black background
              color="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              opacity="0" // Initially hidden
              transition="opacity 0.3s ease-in-out" // Smooth transition
              _groupHover={{ opacity: "1" }} // Show on hover
            >
              <Text px={4} fontSize={{ base: "12px", md: "14px" }}>
                {recipe.description || "No description available."}
              </Text>
            </Box>
                </Box>
                </Link>
              ))
            )}

            {/* Show More Card */}
            <Link to="/search?filter=filipino" style={{ textDecoration: "none" }}>
              <Box
                bg="gray.100"
                borderRadius="md"
                boxShadow="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={{ base: "120px", md: "200px" }}
                cursor="pointer"
                _hover={{ bg: "gray.200" }}
              >
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="bold"
                  color="gray.600"
                >
                  Show More
                </Text>
              </Box>
            </Link>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
