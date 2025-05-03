import RecipeCard from "../components/RecipeCard";
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
  Icon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Filters from "../components/Filters";
import BG_Image from "/images/11.png"; // Adjust the path as necessary
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext
import { Link, useLocation } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCompressedImageUrl } from "../utils/imageUtils";

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");
  const { isAuthenticated } = useContext(AuthContext); // Get authentication status

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

    // Clear the query parameter on page refresh
    useEffect(() => {
      if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
        // Remove 'query' from the URL
        const params = new URLSearchParams(window.location.search);
        if (params.has("query")) {
          params.delete("query");
          window.history.replaceState({}, '', `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`);
        }
      }
    }, []);

  // Defensive: never allow malformed dynamic routes in breadcrumbs
  const breadcrumbs = [
    { label: "Home", path: "/home" },
    { label: "Search", path: "/search" },
  ].filter(crumb => isValidPath(crumb.path));

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
    // Only consider filters with length >= 2 (ignore single letters/syllables)
    const validFilters = appliedFilters.filter(f => f.trim().length >= 2);
    if (appliedFilters.length > 0 && validFilters.length === 0) {
      // If user entered only short filters, show no recipes
      setFilteredRecipes([]);
      return;
    }
    if (validFilters.length === 0) {
      setFilteredRecipes(recipes);
      return;
    }
    // Filter recipes based on the valid filters
    const filtered = recipes.filter((recipe) => {
      return validFilters.every((filter) => {
        const filterLower = filter.toLowerCase();
        // Only match ingredient/tag if the filter is a full word in the ingredient/tag (not just substring)
        const hasTag = recipe.tags && recipe.tags.some((tag) => tag.toLowerCase() === filterLower);
        const hasIngredient = recipe.ingredients && recipe.ingredients.some((ingredient) => ingredient.toLowerCase().split(/\s|,|\./).includes(filterLower));
        return hasTag || hasIngredient;
      });
    });
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
      {/* Breadcrumbs at the top of the page */}
      <Box maxW="1200px" mx="auto" px={6} pt={6}>
        {/* Defensive: filter out any breadcrumb with a malformed path (containing '/:') before rendering */}
        <Text fontSize="sm" color="gray.500" mb={4}>
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.path}>
              {idx === breadcrumbs.length - 1 ? (
                <span style={{ color: "#FD660B", fontWeight: "bold" }}>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  style={{ color: "#FD660B", textDecoration: "underline" }}
                >
                  {crumb.label}
                </Link>
              )}
              {idx < breadcrumbs.length - 1 && " > "}
            </span>
          ))}
        </Text>
      </Box>

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
          mt={7}
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
              {isAuthenticated ? (
                <>
                  <Box fontWeight="bold" fontSize="24px" mb={2}>
                    Subscribe to Our Newsletter!
                  </Box>
                  <Box fontSize="sm" mb={4}>
                    Stay updated with the latest recipes and cooking tips.
                  </Box>
                  <Input
                    placeholder="Enter your email"
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
                    Subscribe
                  </Button>
                </>
              ) : (
                <>
                  <Box fontWeight="bold" fontSize="24px" mb={2}>
                    Don’t lose that perfect recipe!
                  </Box>
                  <Box fontSize="sm" mb={4}>
                    Found something delicious? Sign up for free to save it
                    before you scroll away!
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
                </>
              )}
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
                {filteredRecipes.map((recipe) =>
                  recipe && recipe._id ? (
                    <Link
                      to={`/recipes/${recipe._id}`} // Navigate to the recipe details page
                      state={{
                        breadcrumbs: [
                          { label: "Home", path: "/home" },
                          { label: "Search", path: "/search" },
                        ],
                      }}
                      key={recipe._id}
                      style={{ textDecoration: "none" }} // Remove underline from the link
                    >
                      <RecipeCard recipe={recipe} />
                    </Link>
                  ) : null
                )}
              </Grid>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default SearchPage;
