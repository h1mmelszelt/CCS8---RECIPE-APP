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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { getCompressedImageUrl } from "../utils/imageUtils";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FiBookmark, FiShare2, FiPrinter } from "react-icons/fi";

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
  const loggedInUserId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const location = useLocation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  // State for editing a review in the comments section
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState("");
  const [editReviewRating, setEditReviewRating] = useState(0);

  // Start editing a review
  const handleEditReview = (review) => {
    setEditingReviewId(review._id);
    setEditReviewText(review.text || "");
    setEditReviewRating(review.rating);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditReviewText("");
    setEditReviewRating(0);
  };

  // Save edited review
  const handleSaveEdit = async (reviewId) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/${reviewId}`, {
        rating: editReviewRating,
        text: editReviewText,
      });
      setReviews((prev) =>
        prev.map((r) =>
          r._id === reviewId
            ? { ...r, rating: editReviewRating, text: editReviewText }
            : r
        )
      );
      handleCancelEdit();
      toast({
        title: "Review Updated",
        description: "Your review has been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to update review",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  // Check if recipe is bookmarked by the user
  useEffect(() => {
    const checkBookmark = async () => {
      const userId =
        localStorage.getItem("userId") || sessionStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/bookmarks/${userId}`
        );
        if (res.data && res.data.data) {
          setIsBookmarked(res.data.data.some((b) => b._id === recipeId));
        }
      } catch (err) {
        setIsBookmarked(false);
      }
    };
    if (recipeId) checkBookmark();
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
      localStorage.getItem("userId") || sessionStorage.getItem("userId") || null;
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
      setIsBookmarked(true);
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

  // Handler for removing bookmark
  const handleRemoveBookmark = async () => {
    const confirmed = window.confirm("Are you sure you want to remove this recipe from your bookmarks?");
    if (!confirmed) return;
    const userId = String(localStorage.getItem("userId") || sessionStorage.getItem("userId"));
    const recipeIdStr = String(recipeId);
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
      await axios.delete(`http://localhost:5000/api/users/bookmarks/${userId}/${recipeIdStr}`);
      toast({
        title: "Bookmark Removed!",
        description: `${recipe.name} has been removed from your bookmarks.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Refresh bookmark state
      setIsBookmarked(false);
    } catch (error) {
      console.error("Error removing bookmark:", error?.response || error);
      toast({
        title: "Error",
        description: "Failed to remove bookmark. Please try again.",
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

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this review? This action cannot be undone.");
    if (!confirmed) return;
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${commentId}`);
      toast({
        title: "Comment Deleted",
        description: "Your comment has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Refresh the comments list
      const { data } = await axios.get(
        `http://localhost:5000/api/reviews/${recipeId}`
      );
      setReviews(data);
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error",
        description: "Failed to delete the comment. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleShareComment = (commentId) => {
    const commentUrl = `${window.location.href}#comment-${commentId}`;
    const commentText = reviews.find(
      (review) => review._id === commentId
    )?.text;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this comment!",
          text: commentText || "Check out this comment on the recipe!",
          url: commentUrl,
        })

        .catch((error) => {
          console.error("Error sharing comment:", error);
          toast({
            title: "Error",
            description: "Failed to share the comment. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
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

  // Determine previous page for breadcrumbs
  let prevLabel = "Home";
  let prevPath = "/home";
  if (location.state && location.state.from) {
    if (location.state.from.includes("/search")) {
      prevLabel = "Search";
      prevPath = "/search";
    }
  }

  // Render breadcrumbs, ensuring proper hierarchy based on navigation source
  const breadcrumbs = [
    { label: "Home", path: "/home" },
    prevLabel === "Search" ? { label: "Search", path: prevPath } : null,
    recipe && recipe._id ? { label: recipe.name, path: `/recipes/${recipe._id}` } : null,
  ].filter(Boolean);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!recipe) {
    return <Text>Recipe not found.</Text>;
  }

  return (
    <>
      <Box maxW="1200px" mx="auto" p={6}>
        {/* Breadcrumb */}
        <Text fontSize="sm" color="gray.500" mb={4}>
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.path}>
              {idx === breadcrumbs.length - 1 ? (
                <span style={{ color: "#FD660B", fontWeight: "bold" }}>{crumb.label}</span>
              ) : (
                <Link to={crumb.path} style={{ color: "#FD660B", textDecoration: "underline" }}>{crumb.label}</Link>
              )}
              {idx < breadcrumbs.length - 1 && " > "}
            </span>
          ))}
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
              {/* Defensive: only render link if recipe.user_id and recipe.user_id._id exist */}
              <HStack spacing={2} align="center">
                {recipe.user_id && recipe.user_id._id ? (
                  <Link
                    to={`/profile/${recipe.user_id._id}`}
                    style={{ color: "#FD660B", textDecoration: "underline" }}
                  >
                    <Text fontWeight="bold" fontSize="md" color="#FD660B">
                      {recipe.user_id.name}
                    </Text>
                  </Link>
                ) : (
                  <Text fontWeight="bold" fontSize="md" color="#FD660B">
                    Unknown User
                  </Text>
                )}
              </HStack>
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
                  leftIcon={<FiPrinter />}
                  colorScheme="orange"
                  variant="outline"
                  onClick={handlePrint}
                >
                  Print Recipe
                </Button>
                <Button
                  leftIcon={<FiShare2 />}
                  colorScheme="orange"
                  variant="outline"
                  onClick={handleShare}
                >
                  Share Recipe
                </Button>
                {isBookmarked ? (
                  <Button
                    leftIcon={<FiBookmark />}
                    colorScheme="orange"
                    variant="solid"
                    onClick={handleRemoveBookmark}
                  >
                    Remove from Bookmarks
                  </Button>
                ) : (
                  <Button
                    leftIcon={<FiBookmark />}
                    colorScheme="orange"
                    variant="outline"
                    onClick={handleBookmark}
                  >
                    Add to Bookmarks
                  </Button>
                )}
                {/* Edit button for recipe owner */}
                {recipe.user_id?._id === loggedInUserId && (
                  <>
                    <Button
                      leftIcon={<EditIcon />}
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => navigate(`/edit/${recipe._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this recipe? This action cannot be undone.")) {
                          try {
                            await axios.delete(`http://localhost:5000/api/recipes/${recipe._id}`);
                            toast({
                              title: "Recipe deleted",
                              description: "Your recipe has been deleted.",
                              status: "success",
                              duration: 3000,
                              isClosable: true,
                            });
                            navigate(`/profile/${loggedInUserId}`);
                          } catch (error) {
                            toast({
                              title: "Error",
                              description: "Failed to delete the recipe. Please try again.",
                              status: "error",
                              duration: 3000,
                              isClosable: true,
                            });
                          }
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
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
                <HStack justify="flex-end">
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
              <Divider mb={10} borderColor="gray.500" />
              {reviews.length === 0 ? (
                <Text fontSize="md" color="gray.500">
                  Be the first to comment!
                </Text>
              ) : (
                <VStack align="stretch" spacing={6}>
                  {reviews.map((review, index) => (
                    <React.Fragment key={review._id}>
                      <Box>
                        <HStack align="start" spacing={4}>
                          <Avatar
                            src={review.user_id?.avatar}
                            name={review.user_id?.name}
                            size="md"
                          />
                          <Box flex="1">
                            <HStack justify="space-between">
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
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString()}
                                </Text>
                                <HStack spacing={1} mt={2}>
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <FaStar
                                      key={index}
                                      size={15}
                                      color={
                                        index < review.rating
                                          ? "#FD660B"
                                          : "#D3D3D3"
                                      }
                                    />
                                  ))}
                                </HStack>
                              </Box>
                              {/* Three-dot menu */}
                              <Menu>
                                <MenuButton
                                  as={Button}
                                  size="sm"
                                  variant="ghost"
                                  _hover={{
                                    bg: "gray.300",
                                    color: "gray.300",
                                  }}
                                >
                                  <Box
                                    as={FiMoreHorizontal}
                                    size="20px"
                                    color="gray.800"
                                    _hover={{ color: "gray.800" }}
                                  />
                                </MenuButton>
                                <MenuList>
                                  {review.user_id?._id === loggedInUserId && (
                                    <>
                                      <MenuItem
                                        icon={<EditIcon />} // Edit icon
                                        onClick={() => handleEditReview(review)}
                                        color="blue.500"
                                      >
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        icon={<DeleteIcon />} // Delete icon
                                        onClick={() => handleDeleteComment(review._id)}
                                        color="red.500"
                                      >
                                        Delete
                                      </MenuItem>
                                    </>
                                  )}
                                  <MenuItem
                                    icon={<FiShare2 />} // Share icon
                                    onClick={() => handleShareComment(review._id)}
                                  >
                                    Share
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </HStack>
                            {editingReviewId === review._id ? (
                              <Box mt={2} mb={2}>
                                <Text fontSize="sm" mb={1} color="gray.600">Edit your review:</Text>
                                <HStack spacing={1} mb={2}>
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar
                                      key={i}
                                      size={20}
                                      color={i < editReviewRating ? "#FD660B" : "#D3D3D3"}
                                      style={{ cursor: "pointer" }}
                                      onClick={() => setEditReviewRating(i + 1)}
                                    />
                                  ))}
                                </HStack>
                                <Input
                                  value={editReviewText}
                                  onChange={e => setEditReviewText(e.target.value)}
                                  placeholder="Edit your review..."
                                  mb={2}
                                />
                                <HStack>
                                  <Button size="xs" colorScheme="green" onClick={() => handleSaveEdit(review._id)}>
                                    Save
                                  </Button>
                                  <Button size="xs" variant="outline" onClick={handleCancelEdit}>
                                    Cancel
                                  </Button>
                                </HStack>
                              </Box>
                            ) : (
                              <Text mt={2}>{review.text}</Text>
                            )}
                          </Box>
                        </HStack>
                      </Box>
                      {/* Add a divider after each comment except the last one */}
                      {index < reviews.length - 1 && (
                        <Divider borderColor="gray.400" />
                      )}
                    </React.Fragment>
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
                    to={`/recipes/${relatedRecipe._id}`}
                    state={{ from: location.state?.from || "/home" }}
                    key={relatedRecipe._id}
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
                trendingRecipes.filter(r => r && r._id).map((recipe) => (
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
                          {recipe.description}
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
