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

  const renderRecipeCards = () => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        My Created Recipes
      </Text>
      <Divider borderColor="orange.300" mb={4} />
      {createdRecipes.length === 0 ? (
        <Text>No recipes created yet.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {createdRecipes.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`} key={recipe._id}>
              <Box
                borderWidth="1px"
                borderColor="gray.300"
                borderStyle="solid"
                borderRadius="sm"
                overflow="hidden"
                cursor={"pointer"}
                bg="white"
                boxShadow="md"
                transition="0.3s ease"
                _hover={{
                  boxShadow: "lg",
                  transform: "scale(1.02)",
                }}
              >
                {/* Recipe Image */}
                <Box position="relative">
                  <Image
                    src={getCompressedImageUrl(recipe.image)}
                    alt={recipe.name}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                  />

                  {/* Hover Overlay */}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="rgba(0, 0, 0, 0.8)"
                    color="white"
                    opacity="0"
                    transition="opacity 0.3s ease"
                    _hover={{ opacity: "1" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    p={3}
                  >
                    {/* Three-Dot Menu */}
                    <Box position="absolute" top="9px" right="15px">
                      <Icon
                        as={FiMoreHorizontal}
                        boxSize={6}
                        cursor="pointer"
                      />
                    </Box>

                    {/* Description */}
                    <Box textAlign="center" mt={12}>
                      <Text fontSize="sm" noOfLines={3}>
                        {recipe.description}
                      </Text>
                    </Box>
                  </Box>
                </Box>

                {/* Recipe Title */}
                <Box p={1}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="gray.800"
                    noOfLines={1}
                    textAlign="center"
                  >
                    {recipe.name}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );

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

  const renderBookmarkCards = () => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        My Bookmarks
      </Text>
      <Divider borderColor="orange.300" mb={4} />
      {bookmarks.length === 0 ? (
        <Text>No bookmarks found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {bookmarks.map((bookmark) => (
            <Link to={`/recipes/${bookmark._id}`} key={bookmark._id}>
              <Box
                borderWidth="1px"
                borderColor="gray.300"
                borderStyle="solid"
                borderRadius="sm"
                overflow="hidden"
                cursor="pointer"
                bg="white"
                boxShadow="md"
                transition="0.3s ease"
                _hover={{
                  boxShadow: "lg",
                  transform: "scale(1.02)",
                }}
              >
                {/* Bookmark Image */}
                <Box position="relative">
                  <Image
                    src={getCompressedImageUrl(bookmark.image)}
                    alt={bookmark.name}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                  />

                  {/* Hover Overlay */}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="rgba(0, 0, 0, 0.8)"
                    color="white"
                    opacity="0"
                    transition="opacity 0.3s ease"
                    _hover={{ opacity: "1" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    p={3}
                  >
                    {/* Description */}
                    <Box textAlign="center" mt={12}>
                      <Text fontSize="sm" noOfLines={3}>
                        {bookmark.description || "No description available."}
                      </Text>
                    </Box>
                  </Box>
                </Box>

                {/* Bookmark Title */}
                <Box p={1}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="gray.800"
                    noOfLines={1}
                    textAlign="center"
                  >
                    {bookmark.name}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
  const renderReviewCards = () => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        {userData?.name}'s Reviews & Comments
      </Text>
      <Divider borderColor="orange.300" mb={4} />
      {reviews.length === 0 ? (
        <Text>No reviews found.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {reviews.map((review, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              boxShadow="sm"
              transition="0.3s ease"
              _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold" color="orange.500">
                  Commented on:{" "}
                  <Text as="span" color="blue.500" cursor="pointer">
                    {review.recipe_id?.name || "Unknown Recipe"}
                  </Text>
                </Text>
                <IconButton
                  icon={<FiMoreHorizontal />}
                  size="sm"
                  variant="ghost"
                  aria-label="More options"
                />
              </Flex>
              <Text fontSize="sm" color="gray.600" mb={2}>
                {review.text}
              </Text>
              <Flex justify="space-between" align="center">
                <HStack spacing={1}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      as={FaStar}
                      color={i < review.rating ? "orange.400" : "gray.300"}
                    />
                  ))}
                  <Text fontSize="sm" color="gray.600">
                    ({review.rating}/5)
                  </Text>
                </HStack>
                <Text fontSize="xs" color="gray.500">
                  Posted on: {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </Flex>
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
    <Flex justify="center" pt={{ base: 4, md: 10 }} px={4}>
      <Box
        w={{ base: "100%", md: "90%", lg: "900px" }}
        borderRadius="md"
        overflow="hidden"
      >
        <Box
          bg="#FDE4CE"
          border="1px solid #ED984D"
          borderTopRadius="md"
          px={6}
          py={8}
        >
          <Flex direction="row" align="center" gap={4}>
            <Avatar size="xl" name={userData.name} src={userData.avatar} />
            <VStack align="start">
              <Text fontSize="2xl" fontWeight="bold">
                {userData.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                @{userData.username}
              </Text>
              <Text fontSize="md" color="gray.700">
                Will cook for compliments. Will eat for survival. Chomp chomp.
              </Text>
              <Text fontSize="sm" color="gray.500">
                Joined: April 2025
              </Text>
              {isOwner && (
                <Link to="/settings">
                  <Button
                    leftIcon={<FaEdit />}
                    colorScheme="green"
                    variant="solid"
                    size="sm"
                  >
                    Edit Profile
                  </Button>
                </Link>
              )}
            </VStack>
          </Flex>
        </Box>

        <Box bg="white" border="1px solid #c5c5c5" borderBottom="none">
          <Flex direction="row" justify="flex-start" px={4} py={2}>
            {tabs
              .filter((tab) => isOwner || tab.key !== "bookmarks")
              .map((tab) => (
                <Box
                  key={tab.key}
                  textAlign="center"
                  py={1}
                  px={4}
                  cursor="pointer"
                  color={activeTab === tab.key ? "orange.500" : "gray.700"}
                  bg={activeTab === tab.key ? "#FFF0E1" : "white"}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </Box>
              ))}
          </Flex>
        </Box>

        <Box
          bg="white"
          border="1px solid #c5c5c5"
          borderTop="none"
          px={6}
          py={8}
        >
          {tabContent[activeTab]}
        </Box>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
