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
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaStar, FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        // Fetch user data
        const { data } = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        console.log("User ID:", userId);
        setUserData(data);

        // Fetch user's created recipes
        const recipesResponse = await axios.get(
          `http://localhost:5000/api/recipes/user/${userId}`
        );
        console.log("Created Recipes:", recipesResponse.data.data); // Debug log
        setCreatedRecipes(recipesResponse.data.data);

        // Fetch user's bookmarks
        const bookmarksResponse = await axios.get(
          `http://localhost:5000/api/users/bookmarks/${userId}`
        );
        console.log("Bookmarks:", bookmarksResponse.data.data); // Debug log
        setBookmarks(bookmarksResponse.data.data);

        // Fetch user's reviews
        const reviewsResponse = await axios.get(
          `http://localhost:5000/api/reviews/user/${userId}`
        );
        console.log("Reviews:", reviewsResponse.data.data); // Debug log
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
      <Divider borderColor="black.300" mb={4} />
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
              boxShadow="sm"
              cursor="pointer"
              transition="0.3s ease"
              _hover={{
                borderColor: "orange.200",
                boxShadow: "0 0 3px 1px orange",
              }}
            >
              <Box position="relative">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
                <Box position="absolute" top="8px" right="8px">
                  <IconButton
                    icon={<FiMoreHorizontal />}
                    size="sm"
                    variant="ghost"
                    aria-label="More options"
                  />
                </Box>
              </Box>
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
      <Divider borderColor="black.300" mb={4} />
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {bookmarks.map((bookmark) => (
          <Box
            key={bookmark._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="sm"
            cursor="pointer"
            transition="0.3s ease"
            _hover={{
              borderColor: "orange.200",
              boxShadow: "0 0 3px 1px orange",
            }}
          >
            <Box position="relative">
              <Image
                src={bookmark.image}
                alt={bookmark.title}
                height="200px"
                width="100%"
                objectFit="cover"
              />
            </Box>
            <VStack align="start" spacing={2} p={4}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="gray.800"
                noOfLines={1}
              >
                {bookmark.title}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );

  const renderReviewCards = () => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        My Reviews
      </Text>
      <Divider borderColor="black.300" mb={4} />
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
            >
              <Text fontWeight="bold">
                {review.recipe_id?.name || "Unknown Recipe"} {/* Recipe name */}
              </Text>
              <Text>{review.text}</Text> {/* Review text */}
              <Text fontSize="sm" color="gray.500">
                Rating: {review.rating} {/* Review rating */}
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
    <Flex justify="center" pt={{ base: 4, md: 10 }} px={4}>
      <Box
        w={{ base: "100%", md: "90%", lg: "900px" }}
        borderRadius="md"
        overflow="hidden"
      >
        {/* User Info */}
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
            </VStack>
          </Flex>
        </Box>

        {/* Tabs */}
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

        {/* Content */}
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
