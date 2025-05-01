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
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaStar, FaEdit } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getCompressedImageUrl } from "../utils/imageUtils";

const tabs = [
  { key: "created", label: "Recipes Created" },
  { key: "bookmarks", label: "Bookmarks" },
  { key: "reviews", label: "Reviews" },
];

const ProfilePage = ({ isOwner }) => {
  const [activeTab, setActiveTab] = useState("created");
  const [userData, setUserData] = useState(null);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const avatarSize = useBreakpointValue({ base: "lg", md: "xl" });
  const { id: userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUserData(data);

        const recipesResponse = await axios.get(
          `http://localhost:5000/api/recipes/user/${userId}`
        );
        setCreatedRecipes(recipesResponse.data.data);

        const bookmarksResponse = await axios.get(
          `http://localhost:5000/api/users/bookmarks/${userId}`
        );
        setBookmarks(bookmarksResponse.data.data);

        const reviewsResponse = await axios.get(
          `http://localhost:5000/api/reviews/user/${userId}`
        );
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  /*{/* Author and Rating }
  <HStack justify="space-between" align="center">
  <HStack spacing={2}>
    <Avatar
      size="sm"
      src={userData.avatar}
      name={userData.name}
    />
    <Text fontSize="sm" fontWeight="bold">
      {userData.name}
    </Text>
  </HStack>
  <HStack spacing={1} align="center">
    <Icon as={FaStar} color="orange.400" boxSize={4} />
    <Text
      fontSize="sm"
      fontWeight="bold"
      color="orange.400"
    >
      {(recipe.averageRating || 0).toFixed(1)}
      {/* Display rating with one decimal }
    </Text>
    <Text fontSize="sm" color="gray.500">
      ({recipe.totalReviews || 0}){" "}
      {/* Display number of reviews }
    </Text>
  </HStack>
</HStack> */

  const renderRecipeCards = () => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        {isOwner ? "My Created Recipes" : `${userData?.name}'s Created Recipes`}
      </Text>
      <Divider borderColor="orange.300" mb={4} />
      {createdRecipes.length === 0 ? (
        <Text>
          {isOwner
            ? "You haven't created any recipes yet."
            : `${userData?.name} hasn't created any recipes yet.`}
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {createdRecipes.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`} key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
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
        <Text>
          {isOwner
            ? "You haven't bookmarked any recipes yet."
            : `${userData?.name} hasn't bookmarked any recipes yet.`}
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {bookmarks.map((bookmark) => (
            <Link to={`/recipes/${bookmark._id}`} key={bookmark._id}>
              <RecipeCard recipe={bookmark} />
            </Link>
          ))}
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
        <Text>
          {isOwner
            ? "You haven't written any reviews yet."
            : `${userData?.name} hasn't written any reviews yet.`}
        </Text>
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
              borderLeft="4px solid #A3E635" // Lime green border
              position="relative"
              transition="0.3s ease" // Smooth transition for hover effect
              _hover={{
                boxShadow: "0 0 1px 2px #A3E635", // Green glow effect
              }}
            >
              <HStack align="start">
                <VStack align="start" spacing={2} w="100%">
                  {/* Recipe Name */}
                  <Text fontSize="sm">
                    Commented on:{" "}
                    <Link
                      to={`/recipes/${review.recipe_id?._id}`}
                      style={{
                        color: "#ED8936", // Orange color
                        fontWeight: "bold", // Bold text
                        textDecoration: "underline", // Underline the text
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#C05621")} // Darker orange on hover
                      onMouseLeave={(e) => (e.target.style.color = "#ED8936")} // Reset to original color
                    >
                      {review.recipe_id?.name || "Unknown Recipe"}
                    </Link>
                  </Text>

                  {/* Review Text */}
                  <Box
                    fontStyle="italic"
                    borderLeft="2px solid #E2E8F0"
                    pl={3}
                    color="gray.700"
                  >
                    <Text>{review.text}</Text>
                  </Box>

                  {/* Rating */}
                  <Text fontSize="sm" color="green.500" fontWeight="medium">
                    Rating:{" "}
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        as={FaStar}
                        key={i}
                        color={i < review.rating ? "orange.400" : "gray.300"}
                        fontSize="sm"
                      />
                    ))}{" "}
                    ({review.rating}/5)
                  </Text>
                </VStack>

                {/* More Options Button */}
                <IconButton
                  icon={<FiMoreHorizontal />}
                  size="sm"
                  variant="ghost"
                  aria-label="More options"
                />
              </HStack>

              {/* Date */}
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
    <Flex
      justify="center"
      align="center"
      bg="gray.100"
      minH="100vh"
      px={4}
      py={8} // Add vertical padding for uniform spacing
    >
      <Box
        w={{ base: "100%", md: "80%", lg: "60%" }}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        overflow="hidden"
      >
        {/* Profile Header */}
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
                leftIcon={<FaEdit />}
                colorScheme="orange"
                variant="solid"
                size="sm"
                mt={4}
              >
                Edit Profile
              </Button>
            </Link>
          )}
        </Box>

        {/* Tabs Navigation */}
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

        {/* Tab Content */}
        <Box bg="white" px={6} py={8}>
          {tabContent[activeTab]}
        </Box>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
