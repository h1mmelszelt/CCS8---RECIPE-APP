import ReviewCard from "../components/ReviewCard";

import RecipeCard from "../components/RecipeCard";
import React, { useState, useEffect } from "react";

import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  SimpleGrid,
  useBreakpointValue,
  HStack,
  Image,
  Icon,
  Divider,
  IconButton,
  Button,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  CloseButton,
  MenuItem,
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaStar, FaCog } from "react-icons/fa";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getCompressedImageUrl } from "../utils/imageUtils";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const tabs = [
  { key: "created", label: "Recipes Created" },
  { key: "bookmarks", label: "Bookmarks" },
  { key: "reviews", label: "Reviews" },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("created");
  const [userData, setUserData] = useState(null);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const avatarSize = useBreakpointValue({ base: "lg", md: "xl" });
  const { id: userId } = useParams(); // Get the userId from the URL
  const location = useLocation();
  const loggedInUserId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId") || null; // Get the logged-in user's ID

  const isOwner = userId === loggedInUserId; // Determine if the profile belongs to the logged-in user

  // State for editing reviews
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState("");
  const [editReviewRating, setEditReviewRating] = useState(0);

  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the profile data of the user being visited
        const { data } = await axios.get(
          `https://cs-test-z2vm.onrender.com/api/users/${userId}`
        );
        setUserData(data);

        // Fetch recipes created by the user
        const recipesResponse = await axios.get(
          `https://cs-test-z2vm.onrender.com/api/recipes/user/${userId}`
        );
        setCreatedRecipes(recipesResponse.data.data);

        // Fetch bookmarks only if the profile belongs to the logged-in user
        if (isOwner) {
          const bookmarksResponse = await axios.get(
            `https://cs-test-z2vm.onrender.com/api/users/bookmarks/${userId}`
          );
          setBookmarks(bookmarksResponse.data.data);
        }

        // Fetch reviews written by the user
        const reviewsResponse = await axios.get(
          `https://cs-test-z2vm.onrender.com/api/reviews/user/${userId}`
        );
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId, isOwner]); // Re-run the effect when userId or isOwner changes

  // Remove bookmark handler for profile page
  const handleRemoveBookmark = async (recipeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this recipe from your bookmarks?"
    );
    if (!confirmed) return;
    try {
      await axios.delete(
        `https://cs-test-z2vm.onrender.com/api/users/bookmarks/${userId}/${recipeId}`
      );
      setBookmarks((prev) => prev.filter((b) => b._id !== recipeId));
      toast({
        title: "Bookmark Removed",
        description: "The recipe has been removed from your bookmarks.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to remove bookmark",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Remove review handler for profile page
  const handleRemoveReview = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review? This action cannot be undone."
    );
    if (!confirmed) return;
    try {
      await axios.delete(
        `https://cs-test-z2vm.onrender.com/api/reviews/${reviewId}`
      );
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast({
        title: "Review Deleted",
        description: "Your review has been deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to delete review",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Remove recipe handler for profile page
  const handleRemoveRecipe = async (recipeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe? This action cannot be undone."
    );
    if (!confirmed) return;
    try {
      await axios.delete(
        `https://cs-test-z2vm.onrender.com/api/recipes/${recipeId}`
      );
      setCreatedRecipes((prev) => prev.filter((r) => r._id !== recipeId));
      toast({
        title: "Recipe Deleted",
        description: "Your recipe has been deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to delete recipe",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      await axios.put(
        `https://cs-test-z2vm.onrender.com/api/reviews/${reviewId}`,
        {
          rating: editReviewRating,
          text: editReviewText,
        }
      );
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

  // Defensive: never allow malformed dynamic routes in breadcrumbs
  const breadcrumbs = [
    { label: "Home", path: "/home" },
    { label: "Profile", path: `/profile/${userId}` },
  ];

  // Defensive: never allow malformed dynamic routes in any navigation or link
  // (ProfilePage) - All recipe/bookmark/settings links must be valid
  const isValidPath = (path) => path && !path.includes('/:') && !path.endsWith('/:');  

  const renderRecipeCards = () => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        {isOwner ? "My Created Recipes" : `${userData?.name}'s Created Recipes`}
      </Text>
      <Divider borderColor="orange.300" mb={4} />
      {createdRecipes.length === 0 ? (
        <Box
          border="2px dashed #f3c575"
          borderRadius="md"
          p={6}
          textAlign="center"
          bg="white"
          minH="300px"
          minW="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="lg" fontWeight="bold" color="gray.500">
            {isOwner
              ? "You haven't created any recipes yet."
              : `${userData?.name} hasn't created any recipes yet.`}
          </Text>
          <Text fontSize="sm" color="gray.400" mt={2}>
            This page is starving for content!
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 2, sm: 2, md: 3 }} spacing={6}>
          {createdRecipes.map((recipe) =>
            recipe && recipe._id && isValidPath(`/recipes/${recipe._id}`) ? (
              <Box key={recipe._id} position="relative">
                <Link
                  to={`/recipes/${recipe._id}`}
                  state={{
                    breadcrumbs: [
                      { label: "Home", path: "/home" },
                      {
                        label: "Profile",
                        path: location.pathname + location.search,
                      },
                    ],
                  }}
                  style={{ display: "block" }}
                >
                  <RecipeCard recipe={recipe} />
                </Link>
                {isOwner && (
                  <Menu>
                    <Tooltip label="Options" aria-label="Options tooltip">
                      <MenuButton
                        as={IconButton}
                        icon={<FiMoreHorizontal />}
                        size="xs"
                        variant="solid"
                        position="absolute"
                        top={{ base: "1", md: "4" }}
                        right={{ base: "1", md: "4" }}
                        zIndex={2}
                        aria-label="Options"
                      />
                    </Tooltip>
                    <MenuList>
                      <MenuItem
                        icon={<EditIcon />} // Add edit icon
                        color="blue.500"
                        onClick={() =>
                          (window.location.href = `/edit/${recipe._id}`)
                        }
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        icon={<DeleteIcon />} // Add delete icon
                        color="red.500"
                        onClick={() => handleRemoveRecipe(recipe._id)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Box>
            ) : null
          )}
        </SimpleGrid>
      )}
    </Box>
  );

  const renderBookmarkCards = () => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        {isOwner ? "My Bookmarks" : `${userData?.name}'s Bookmarks`}
      </Text>
      <Divider borderColor="orange.300" mb={4} />
      {bookmarks.length === 0 ? (
        <Box
          border="2px dashed #f3c575"
          borderRadius="md"
          p={6}
          textAlign="center"
          bg="white"
          minH="300px"
          minW="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="lg" fontWeight="bold" color="gray.500">
            {isOwner
              ? "You haven't bookmarked any recipes yet."
              : `${userData?.name} hasn't bookmarked any recipes yet.`}
          </Text>
          <Text fontSize="sm" color="gray.400" mt={2}>
            This page is starving for content!
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 2, sm: 2, md: 3 }} spacing={6}>
          {bookmarks.map((bookmark) =>
            bookmark && bookmark._id && isValidPath(`/recipes/${bookmark._id}`) ? (
              <Box key={bookmark._id} position="relative">
                <Link
                  to={`/recipes/${bookmark._id}`}
                  state={{
                    breadcrumbs: [
                      { label: "Home", path: "/home" },
                      {
                        label: "Profile",
                        path: location.pathname + location.search,
                      },
                    ],
                  }}
                  style={{ display: "block" }}
                >
                  <RecipeCard recipe={bookmark} />
                </Link>
                {isOwner && (
                  <Tooltip
                    label="Remove from Bookmarks"
                    aria-label="Remove bookmark tooltip"
                  >
                    <CloseButton
                      size="xs"
                      color="red.500"
                      variant="solid"
                      position="absolute"
                      top={2}
                      right={2}
                      zIndex={2}
                      onClick={() => handleRemoveBookmark(bookmark._id)}
                      _hover={{
                        color: "white", // White font on hover
                      }}
                    />
                  </Tooltip>
                )}
              </Box>
            ) : null
          )}
        </SimpleGrid>
      )}
    </Box>
  );

  const renderReviewCards = () => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        {isOwner
          ? "My Reviews & Comments"
          : `${userData?.name}'s Reviews & Comments`}
      </Text>
      <Divider borderColor="orange.300" mb={4} />
      {reviews.length === 0 ? (
        <Box
          border="2px dashed #f3c575"
          borderRadius="md"
          p={6}
          textAlign="center"
          bg="white"
          minH="300px"
          minW="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="lg" fontWeight="bold" color="gray.500">
            {isOwner
              ? "You haven't commented on any recipes yet."
              : `${userData?.name} hasn't commented on any recipes yet.`}
          </Text>
          <Text fontSize="sm" color="gray.400" mt={2}>
            This page is starving for content!
          </Text>
        </Box>
      ) : (
        <VStack spacing={4} align="stretch">
          {reviews.map((review, index) => (
            <Box
              key={index}
              bg="white"
              p={4}
              borderRadius="lg"
              boxShadow="sm"
              borderColor={"gray.200"}
              borderWidth={"1px"}
              borderLeft="4px solid #A3E635"
              position="relative"
              transition="0.3s ease"
              _hover={{
                boxShadow: "0 0 1px 2px #A3E635",
              }}
            >
              <HStack align="start">
                <VStack align="start" spacing={2} w="100%">
                  <Text fontSize="sm">
                    Commented on:{" "}
                    {review.recipe_id && review.recipe_id._id && isValidPath(`/recipes/${review.recipe_id._id}`) ? (
                      <Link
                        to={`/recipes/${review.recipe_id._id}`}
                        state={{
                          breadcrumbs: [
                            { label: "Home", path: "/home" },
                            {
                              label: "Profile",
                              path: location.pathname + location.search,
                            },
                          ],
                        }}
                        style={{
                          color: "#ED8936",
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#C05621")}
                        onMouseLeave={(e) => (e.target.style.color = "#ED8936")}
                      >
                        {review.recipe_id.name || "Unknown Recipe"}
                      </Link>
                    ) : (
                      <span>Unknown Recipe</span>
                    )}
                  </Text>
                  {editingReviewId === review._id ? (
                    <>
                      <Box mb={2}>
                        <Text fontSize="sm" mb={1} color="gray.600">
                          Edit your review:
                        </Text>
                        <HStack spacing={1} mb={2}>
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              as={FaStar}
                              key={i}
                              color={
                                i < editReviewRating ? "orange.400" : "gray.300"
                              }
                              fontSize="lg"
                              cursor="pointer"
                              onClick={() => setEditReviewRating(i + 1)}
                            />
                          ))}
                        </HStack>
                        <textarea
                          value={editReviewText}
                          onChange={(e) => setEditReviewText(e.target.value)}
                          rows={3}
                          style={{
                            width: "100%",
                            borderRadius: 6,
                            border: "1px solid #E2E8F0",
                            padding: 6,
                          }}
                        />
                      </Box>
                      <HStack>
                        <Button
                          size="xs"
                          colorScheme="green"
                          onClick={() => handleSaveEdit(review._id)}
                        >
                          Save
                        </Button>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </HStack>
                    </>
                  ) : (
                    <>
                      <Box
                        fontStyle="italic"
                        borderLeft="2px solid #E2E8F0"
                        pl={3}
                        color="gray.700"
                      >
                        <Text>{review.text}</Text>
                      </Box>
                      <Text fontSize="sm" color="green.500" fontWeight="medium">
                        Rating:{" "}
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            as={FaStar}
                            key={i}
                            color={
                              i < review.rating ? "orange.400" : "gray.300"
                            }
                            fontSize="sm"
                          />
                        ))}{" "}
                        ({review.rating}/5)
                      </Text>
                    </>
                  )}
                </VStack>
                {isOwner && (
                  <Box minW="40px" textAlign="right">
                    {editingReviewId !== review._id ? (
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FiMoreHorizontal />}
                          size="xs"
                          variant="ghost"
                          aria-label="Options"
                        />
                        <MenuList>
                          <MenuItem
                            icon={<EditIcon />}
                            onClick={() => handleEditReview(review)}
                            color="blue.500"
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            icon={<DeleteIcon />}
                            onClick={() => handleRemoveReview(review._id)}
                            color="red.500"
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    ) : null}
                  </Box>
                )}
              </HStack>
              <Text fontSize="xs" color="gray.500" mt={2} textAlign="right">
                Posted on: {new Date(review.createdAt).toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );

  const tabContent = {
    created: renderRecipeCards(),
    bookmarks: isOwner ? renderBookmarkCards() : null,
    reviews: renderReviewCards(),
  };

  if (!userData) return <Text>Loading...</Text>;

  return (
    <>
      <Box maxW="1200px" mx="auto" px={6} pt={6}>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {breadcrumbs.filter(crumb => crumb && crumb.path && !crumb.path.includes('/:') && !crumb.path.endsWith('/:')).map((crumb, idx) => (
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
      </Box>
      <Flex
        justify="center"
        align="center"
        bg="gray.100"
        minH="100vh"
        px={4}
        py={8}
      >
        <Box
          w={{ base: "100%", md: "80%", lg: "60%" }}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          overflow="hidden"
        >
          <Box
            bg="orange.100"
            borderBottom="1px solid #d1cece"
            px={6}
            py={8}
            textAlign="center"
          >
            <Avatar
              size="2xl"
              name={userData?.name}
              src={userData?.avatar}
              mb={4}
              border="4px solid white"
            />
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {userData?.name}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              @{userData?.username}
            </Text>
            <Text fontSize="md" color="gray.700" mb={4}>
              Will cook for compliments. Will eat for survival. Chomp chomp.
            </Text>
            <Text fontSize="sm" color="gray.500">
              Joined: April 2025
            </Text>
            {isOwner && (
              <Link to={`/settings/${userId}`}>
                <Button
                  leftIcon={<FaCog />}
                  colorScheme="orange"
                  variant="solid"
                  size="sm"
                  mt={4}
                >
                  Account Settings
                </Button>
              </Link>
            )}
          </Box>
          <Box bg="white" borderBottom="1px solid #c5c5c5">
            <Flex direction="row" justify="center" px={4} py={0}>
              {tabs
                .filter((tab) => isOwner || tab.key !== "bookmarks")
                .map((tab) => (
                  <Box
                    key={tab.key}
                    textAlign="center"
                    py={2}
                    px={6}
                    cursor="pointer"
                    fontWeight="bold"
                    color={activeTab === tab.key ? "orange.500" : "gray.700"}
                    bg={activeTab === tab.key ? "#FFF0E1" : "white"}
                    borderBottom={
                      activeTab === tab.key ? "3px solid orange" : "none"
                    }
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </Box>
                ))}
            </Flex>
          </Box>
          <Box bg="white" px={6} py={8}>
            {tabContent[activeTab]}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ProfilePage;