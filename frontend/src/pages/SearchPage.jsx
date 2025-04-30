import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Grid,
  Image,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import Filters from "../components/Filters";
import BG_Image from "/images/11.png"; // Adjust the path as necessary
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCompressedImageUrl } from "../utils/imageUtils";

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // Fetch recipes based on search query
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get("query");

        if (query && query.trim() !== "") {
          const response = await axios.get(
            `http://localhost:5000/api/recipes/search/${encodeURIComponent(
              query
            )}`
          );
          setRecipes(response.data.data);
          setFilteredRecipes(response.data.data);
          setSearchQuery(query);
        } else {
          const response = await axios.get("http://localhost:5000/api/recipes"); // Replace with your API endpoint
          setRecipes(response.data.data);
          setFilteredRecipes(response.data.data); // Initially, show all recipes
        }
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [location.search]);

  window.scrollTo(0, 0);

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredRecipes(recipes); // Show all recipes if search query is empty
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  // Define handleApplyFilters
  const handleApplyFilters = (appliedFilters) => {
    console.log("Filters applied:", appliedFilters);

    // Filter recipes based on the applied filters
    const filtered = recipes.filter((recipe) => {
      // Check if the recipe matches all applied filters
      return appliedFilters.every((filter) => {
        // Example: Check if the recipe's tags include the filter
        return (
          recipe.tags &&
          recipe.tags
            .map((tag) => tag.toLowerCase())
            .includes(filter.toLowerCase())
        );
      });
    });

    // Update the filteredRecipes state with the filtered results
    setFilteredRecipes(filtered);
  };

  // Update the filtered recipes when the filter query parameter changes
  useEffect(() => {
    if (filter) {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.tags &&
          recipe.tags
            .map((tag) => tag.toLowerCase())
            .includes(filter.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes); // Show all recipes if no filter is applied
    }
  }, [filter, recipes]);

  return (
    <Box
      bg="gray.100"
      minH="100vh"
      width="100%"
      color="black"
      pb={{ base: "60px", md: "0" }}
    >
      <Image
        src={BG_Image}
        position="absolute"
        top="0"
        left="75%"
        transform="translateX(-50%)"
        width={{ base: "0", md: "60vw" }} // Hide on smaller screens by setting width to 0
        maxW="none"
        zIndex={0}
        opacity={1}
        display={{ base: "none", md: "block" }} // Hide on smaller screens, show on medium and larger screens
      />

      <Box // Mobile Search Bar
        display={{ base: "flex", md: "none" }} // Show only on smaller screens
        px={4}
        py={2}
        bg="white"
        boxShadow="md"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        <Input
          placeholder="Search recipes by title..."
          size="sm"
          borderRadius="md"
          bg="gray.100"
          flex="1"
          mr={2}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(); // Trigger search on Enter key
          }}
        />
        <Button
          size="sm"
          colorScheme="orange"
          onClick={handleSearch} // Trigger search on click
        >
          <SearchIcon />
        </Button>
      </Box>

      <Flex mt={4} px={4} flexDirection={{ base: "column", md: "row" }}>
        {/* Filters and Sign-Up Box Container */}
        <Box
          display="flex"
          flexDirection="column"
          width={{ base: "100%", md: "350px" }} // Adjust width for desktop
          gap={3}
          ml={{ base: 0, md: 2 }} // Add margin for desktop
        >
          <VStack
            spacing={4}
            align="stretch"
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
          >
            {/* Filters Component */}
            <Box>
              <Filters
                onApplyFilters={handleApplyFilters}
                initialFilters={filter ? [filter] : []} // Pass the filter as an initial filter
              />
            </Box>

            {/* Sign-Up Box */}
            <Box
              display={{ base: "none", md: "block" }}
              bg="#D3F38E"
              borderRadius="md"
              boxShadow="md"
              textAlign="center"
              p={4}
            >
              <Box fontWeight="bold" fontSize="24px" mb={2}>
                Don’t lose that perfect recipe!
              </Box>
              <Box fontSize="sm" mb={4}>
                Found something delicious? Sign up for free to save it before
                you scroll away!
              </Box>
              <Input
                placeholder="Email"
                size="sm"
                mb={2}
                borderRadius="md"
                bg="white"
              />
              <Button
                bg="#97C33A"
                size="sm"
                width="100%"
                _hover={{ bg: "#7da52f" }}
              >
                Sign Up
              </Button>
            </Box>
          </VStack>
        </Box>

        {/* Explore Recipes Section */}
        <Box
          py={6}
          position="relative"
          width={{ base: "100%", md: "calc(100% - 300px)" }} // Adjust width for desktop
          px={4}
          mx="auto"
          ml={{ md: "100px" }} // Push content to the right of the sidebar on desktop
        >
          {/* Sticky Header */}
          <Box
            position="sticky"
            top="0"
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
                  <Link
                    to={`/recipes/${recipe._id}`} // Navigate to the recipe details page
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
                      role="group" // Enable group for _groupHover
                    >
                      {/* Image Box */}
                      <Box
                        height={{ base: "120px", md: "200px" }}
                        overflow="hidden"
                      >
                        <Image
                          src={getCompressedImageUrl(recipe.image)}
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
