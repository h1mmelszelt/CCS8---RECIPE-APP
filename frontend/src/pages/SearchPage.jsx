import React, { useState, useEffect } from "react";
import { Box, Flex, Input, Button, Text, Grid, Image } from "@chakra-ui/react";
import Navbar from "../components/Navbar(Logged)";
import Filters from "../components/Filters";
import BG_Image from "/images/11.png"; // Adjust the path as necessary
import axios from "axios";

function SearchPage() {
  const [recipes, setRecipes] = useState([]); 
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersApplied, setFiltersApplied] = useState(false); // State to track if filters are applied

  // Fetch recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes"); // Replace with your API endpoint
        setRecipes(response.data.data);
        setFilteredRecipes(response.data.data); // Initially, show all recipes
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleApplyFilters = (filters) => {
    setFiltersApplied(true); // Set filters applied state to true
    if (filters.length === 0) {
      setFilteredRecipes(recipes); // Show all recipes if no filters are applied
    } else {
      const filtered = recipes.filter((recipe) =>
        filters.some((filter) =>
          recipe.tags && recipe.tags.some((tag) =>
            tag.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
      setFilteredRecipes(filtered);
    }
  };
  return (
    <Box
      bg="white"
      minH="100vh"
      width="100%"
      color="black"
      pb={{ base: "60px", md: "0" }}
    >
      <Navbar />

      <Image
        src={BG_Image}
        position="absolute"
        top="0"
        left="75%"
        transform="translateX(-50%)"
        width={{ base: "90vw", md: "60vw" }}
        maxW="none"
        zIndex={0}
        opacity={1}
      />

      <Flex mt={4} px={4} flexDirection={{ base: "column", md: "row" }}>
        {/* Filters and Sign-Up Box Container */}
        <Box
          display="flex"
          flexDirection="column"
          width={{ base: "100%", md: "350px" }} // Increased width for desktop
          gap={3} // Add spacing between the Filter Box and Sign-Up Box
          ml={{ base: 0, md: 2 }} // Move the container slightly to the right on desktop
        >
          {/* Filters on the top-left */}
          <Box
            position="sticky" // Sticky positioning for both mobile and desktop
            top="10%" // Stick to the top of the viewport
            zIndex="0"
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
          >
            <Filters onApplyFilters={handleApplyFilters} />
          </Box>

          {/* Sign-Up Box below Filters */}
          <Box
            position="sticky" // Sticky positioning for both mobile and desktop
            top="10%" // Stick below the filter box
            zIndex="0"
            p={4}
            bg="#D3F38E"
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
            display={{ base: "none", md: "block" }}
          >
            <Box fontWeight="bold" fontSize="24px" mb={2}>
              Don’t lose that perfect recipe!
            </Box>
            <Box fontSize="sm" mb={4}>
              Found something delicious? Sign up for free to save it before you
              scroll away!
            </Box>
            <Input
              placeholder="Email"
              size="sm"
              mb={2}
              borderRadius="md"
              bg="white"
            />
            <Button colorScheme="green" size="sm" width="100%">
              Sign Up
            </Button>
          </Box>
        </Box>

        {/* Explore Recipes Section */}
        <Box
          py={6}
          position="relative"
          width={{ base: "100%", md: "calc(100% - 300px)" }} // Adjust width to account for the wider sidebar
          px={4}
          mx="auto"
          ml={{ md: "100px" }} // Push content to the right of the sidebar on desktop
        >
          {/* Sticky Header */}
          <Box
            position="sticky"
            top="0" // Ensure it sticks to the top of the viewport
            zIndex="0"
            bg="white"
            py={4}
            boxShadow="sm"
            borderBottom="1px solid"
            borderColor="gray.200"
            borderRadius="10"
          >
            <Flex justify="space-between" align="center" px={6}>
              <Text fontWeight="bold" fontSize={{ base: "18px", md: "24px" }}>
                Discover Recipes
              </Text>
            </Flex>
          </Box>

          {/* Scrollable Recipes Grid */}
          <Box mt={4}>
            {loading ? (
              <Text textAlign="center" fontSize="18px" color="gray.500">
                Loading recipes...
              </Text>
            ) : filteredRecipes.length === 0 ? (
              <Text textAlign="center" fontSize="18px" color="gray.500">
                No recipes match your filters. Please try again!
              </Text>
            ) : (
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)", // 2 columns for mobile
                  md: "repeat(4, 1fr)", // 4 columns for desktop
                }}
                gap={{ base: 3, md: 6 }}
              >
                {filteredRecipes.map((recipe) => (
                  <Box
                    key={recipe._id}
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    overflow="hidden"
                    zIndex={2}
                    position="relative"
                  >
                    {/* Image Box */}
                    <Box
                      height={{ base: "120px", md: "200px" }}
                      overflow="hidden"
                    >
                      <Image
                        src={recipe.image}
                        alt={recipe.name}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    </Box>

                    {/* Food Name */}
                    <Text
                      textAlign="center"
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight="bold"
                      color="black"
                      mt={2}
                      mb={4}
                    >
                      {recipe.name}
                    </Text>
                  </Box>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default SearchPage;
