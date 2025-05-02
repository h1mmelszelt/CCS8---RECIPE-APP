import { FaStar } from "react-icons/fa";
import React, { useEffect, useState, useContext } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { getCompressedImageUrl } from "../utils/imageUtils";

import { Link, useNavigate, useLocation } from "react-router-dom";

const RecipePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast(); // Initialize toast
  const [commentText, setCommentText] = useState("");
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [hoveredRating, setHoveredRating] = useState(0); // Track hovered star
  const [selectedRating, setSelectedRating] = useState(0); // Track selected rating

  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTrendingRecipes = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/recipes/popular"
        );
        // Map aggregation result to extract recipe details from _id
        const popularRecipes = Array.isArray(data.data)
          ? data.data.map((item) => ({
              ...item._id, // recipe details
              averageRating: item.averageRating,
              totalReviews: item.totalReviews,
            }))
          : [];
        setTrendingRecipes(popularRecipes);
      } catch (error) {
        console.error("Error fetching trending recipes:", error);
      }
    };
    fetchTrendingRecipes();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/recipes/${recipeId}`
        );
        setRecipe(data.data.recipe); // Set recipe details
        setReviews(data.data.reviews); // Set reviews

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

  // Handler for bookmarking the recipe
  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to bookmark this recipe.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }

    const userId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found. Please log in again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/bookmarks",
        {
          userId,
          recipeId,
        }
      );

      // Check if the recipe was already bookmarked
      if (response.data.message === "Recipe already bookmarked") {
        toast({
          title: "Already Bookmarked",
          description: "This recipe is already in your bookmarks.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Recipe Bookmarked!",
          description: `${recipe.name} has been added to your bookmarks.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error bookmarking recipe:", error);
      toast({
        title: "Error",
        description: "Failed to bookmark the recipe. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handler for printing the recipe
  const handlePrint = () => {
    window.print(); // Opens the browser's print dialog
  };

  // Handler for sharing the recipe
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe.name,
          text: `Check out this recipe: ${recipe.name}`,
          url: window.location.href,
        })
        .then(() => console.log("Recipe shared successfully"))
        .catch((error) => console.error("Error sharing recipe:", error));
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser does not support the share feature.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCommentSubmit = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a comment.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }

    const userId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found. Please log in again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }

    // Check if the user has already reviewed the recipe
    const hasReviewed = reviews.some((review) => review.user_id === userId);
    if (hasReviewed) {
      toast({
        title: "Already Reviewed",
        description: "You have already reviewed this recipe.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Ensure a rating is selected
    if (selectedRating === 0) {
      toast({
        title: "No Rating Selected",
        description: "Please select a rating before submitting your comment.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const commentData = {
      user_id: userId,
      rating: selectedRating, // Include the selected rating
      text: commentText, // Include the comment text
    };

    try {
      await axios.post(
        `http://localhost:5000/api/reviews/${recipeId}`,
        commentData
      );

      // Show success toast
      toast({
        title: "Comment Submitted",
        description: "Your comment has been successfully posted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Fetch updated comments
      const { data } = await axios.get(
        `http://localhost:5000/api/reviews/${recipeId}`
      );
      setReviews(data); // Update the reviews state
      setCommentText(""); // Clear the comment input
      setSelectedRating(0); // Reset the selected rating
    } catch (error) {
      console.error("Error submitting comment:", error);

      // Check for duplicate review error
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "User has already reviewed this recipe"
      ) {
        toast({
          title: "Already Reviewed",
          description: "You have already reviewed this recipe.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Generic error toast
        toast({
          title: "Error",
          description: "Failed to submit your comment. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  // Determine previous page for breadcrumbs
  let prevLabel = "Home";
  let prevPath = "/home";
  if (location.state && location.state.from) {
    if (location.state.from.includes("/search")) {
      prevLabel = "Search";
      prevPath = location.state.from;
    } else if (location.state.from.includes("/profile")) {
      prevLabel = "Profile";
      prevPath = location.state.from;
    } else if (location.state.from.includes("/notifications")) {
      prevLabel = "Notifications";
      prevPath = location.state.from;
    } // Add more as needed
  }

  // Render breadcrumbs, limiting to only one recipe (the current one)
  const breadcrumbs =
    location.state && location.state.breadcrumbs
      ? location.state.breadcrumbs.filter(
          (crumb) => !crumb.path.startsWith("/recipes/")
        )
      : [{ label: "Home", path: "/home" }];

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <>
      <Box maxW="1200px" mx="auto" p={6}>
        {/* Breadcrumb */}
        <Text fontSize="sm" color="gray.500" mb={4}>
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.path}>
              {idx === breadcrumbs.length - 1 ? (
                <Link to={crumb.path} style={{ color: "#FD660B", textDecoration: "underline" }}>{crumb.label}</Link>
              ) : (
                <Link to={crumb.path} style={{ color: "#FD660B", textDecoration: "underline" }}>{crumb.label}</Link>
              )}
              {idx < breadcrumbs.length - 1 && " > "}
            </span>
          ))}
          {breadcrumbs.length > 0 && " > "}
          <span style={{ color: "#FD660B", fontWeight: "bold" }}>{recipe.name}</span>
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={6}>
          {/* Left Section */}
          <GridItem>
            {/* Recipe Header */}
            <Heading as="h1" size="xl" mb={4}>
              {recipe.name}
            </Heading>
            <HStack spacing={4} align="center" mb={6}>
              <Avatar
                src={recipe.user_id?.avatar}
                name={recipe.user_id?.name}
              />
              <HStack spacing={2} align="center">
                <Link
                  to={`/profile/${recipe.user_id?._id}`}
                  style={{ color: "#FD660B", textDecoration: "underline" }}
                >
                  <Text fontWeight="bold" fontSize="md" color="#FD660B">
                    {recipe.user_id?.name || "Unknown Author"}
                  </Text>
                </Link>
                <HStack spacing={1}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      size={15} // Adjust the size of the star
                      color={
                        index <
                        (reviews.length > 0
                          ? Math.round(
                              reviews.reduce((sum, r) => sum + r.rating, 0) /
                                reviews.length
                            )
                          : 0)
                          ? "#FD660B" // Orange for filled stars
                          : "#D3D3D3" // Gray for empty stars
                      }
                    />
                  ))}
                </HStack>
                <Text fontSize="md" color="gray.600">
                  {reviews.length > 0
                    ? (
                        reviews.reduce((sum, r) => sum + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : "0.0"}{" "}
                  ({reviews.length})
                </Text>
              </HStack>
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" color="gray.500">
                  Posted on: {new Date(recipe.createdAt).toLocaleDateString()}
                </Text>
              </VStack>
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
                <Button
                  colorScheme="orange"
                  variant="outline"
                  onClick={handlePrint}
                >
                  Print Recipe
                </Button>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  onClick={handleShare}
                >
                  Share Recipe
                </Button>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  onClick={handleBookmark}
                >
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
                    color={
                      index < (hoveredRating || selectedRating)
                        ? "orange.500"
                        : "gray.300"
                    } // Fill stars based on hover or selected rating
                    cursor="pointer"
                    onMouseEnter={() => setHoveredRating(index + 1)} // Set hovered rating
                    onMouseLeave={() => setHoveredRating(0)} // Reset hovered rating
                    onClick={() => setSelectedRating(index + 1)} // Set selected rating
                  >
                    <FaStar />
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
                  value={commentText} // Controlled input
                  onChange={(e) => setCommentText(e.target.value)} // Update state
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
                  <Button
                    colorScheme="orange"
                    size="sm"
                    onClick={handleCommentSubmit} // Call the submit function
                    isDisabled={!commentText.trim()} // Disable if input is empty
                  >
                    Submit
                  </Button>
                </HStack>
              </Box>
            </Box>

            {/* Comments Section */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                {reviews.length} {reviews.length === 1 ? "Comment" : "Comments"}
              </Text>
              <Divider mb={6} borderColor="gray.300" />
              {reviews.length === 0 ? (
                <Text fontSize="md" color="gray.500">
                  Be the first to comment!
                </Text>
              ) : (
                <VStack align="stretch" spacing={6}>
                  {reviews.map((review) => (
                    <Box key={review._id}>
                      <HStack align="start" spacing={4}>
                        <Avatar
                          src={review.user_id?.avatar}
                          name={review.user_id?.name}
                          size="md"
                        />
                        <Box>
                          <Link
                            to={`/profile/${review.user_id?._id}`}
                            style={{
                              color: "#FD660B",
                              textDecoration: "underline",
                            }}
                          >
                            <Text fontWeight="bold">
                              {review.user_id?.name}
                            </Text>
                          </Link>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </Text>
                          <Text mt={2}>{review.text}</Text>
                          <HStack spacing={1} mt={2}>
                            {Array.from({ length: 5 }).map((_, index) => (
                              <FaStar
                                key={index}
                                size={15}
                                color={
                                  index < review.rating ? "#FD660B" : "#D3D3D3"
                                }
                              />
                            ))}
                          </HStack>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              )}
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
                  <Link
                    key={relatedRecipe._id}
                    to={`/recipes/${relatedRecipe._id}`}
                    state={{
                      breadcrumbs: [...breadcrumbs],
                    }}
                    style={{ textDecoration: "none" }}
                  >
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
                        src={getCompressedImageUrl(relatedRecipe.image)}
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
                <Button
                  bg="#97C33A"
                  size="sm"
                  width="150px"
                  _hover={{ bg: "#7da52f" }}
                >
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
                  <Link
                    key={recipe._id}
                    to={`/recipes/${recipe._id}`}
                    state={{
                      breadcrumbs: [...breadcrumbs],
                    }}
                    style={{ textDecoration: "none" }}
                  >
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
                        src={getCompressedImageUrl(recipe.image)}
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
