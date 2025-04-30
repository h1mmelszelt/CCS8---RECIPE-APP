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
            <Box
              key={recipe._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              boxShadow="md"
              transition="0.3s ease"
              _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
            >
              <Image
                src={getCompressedImageUrl(recipe.image)}
                alt={recipe.title}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <VStack align="start" spacing={2} p={4}>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="gray.800"
                  noOfLines={1}
                >
                  {recipe.title}
                </Text>
                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                  {recipe.description}
                </Text>
                <HStack spacing={2} mt={2}>
                  <Avatar
                    size="sm"
                    src={userData.avatar}
                    name={userData.name}
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">
                      {userData.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      @{userData.username}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );

  const renderBookmarkCards = () => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        My Bookmarks
      </Text>
      <Divider borderColor="orange.300" mb={4} />
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {bookmarks.map((bookmark) => (
          <Box
            key={bookmark._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="md"
            transition="0.3s ease"
            _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
          >
            <Image
              src={bookmark.image}
              alt={bookmark.title}
              height="200px"
              width="100%"
              objectFit="cover"
            />
            <VStack align="start" spacing={2} p={4}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="gray.800"
                noOfLines={1}
              >
                {bookmark.title}
              </Text>
              <Text fontSize="sm" color="gray.600" noOfLines={2}>
                {bookmark.description}
              </Text>
              {bookmark.user && ( // Ensure bookmark.user exists
                <HStack spacing={2} mt={2}>
                  <Avatar
                    size="sm"
                    src={bookmark.user.avatar || ""}
                    name={bookmark.user.name || "Unknown User"}
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">
                      {bookmark.user.name || "Unknown User"}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      @{bookmark.user.username || "unknown"}
                    </Text>
                  </VStack>
                </HStack>
              )}
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
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
