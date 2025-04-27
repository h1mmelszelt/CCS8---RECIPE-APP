import React, { useState } from "react";
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
import Navbar from "../components/Navbar(Logged)";
import { FaStar, FaEdit } from "react-icons/fa"; // Add this import
import RecipeCard from "../components/RecipeCard"; // Import RecipeCard
import ReviewCard from "../components/ReviewCard"; // Import ReviewCard
import { Link } from "react-router-dom";

const tabs = [
  { key: "created", label: "Recipes Created" },
  { key: "bookmarks", label: "Bookmarks" },
  { key: "reviews", label: "Reviews" },
];

const exampleBookmarks = [
  {
    _id: "1",
    title: "Sinigang na Baboy",
    image: "/images/sinigang.jpg",
    description: "A sour pork soup made with tamarind and various vegetables.",
    user: {
      name: "TopChef",
      username: "@food_maker_123",
      avatar: "/images/avatar1.jpg",
    },
    rating: 4.5,
  },
  {
    _id: "2",
    title: "Tapsilog",
    image: "/images/tapsilog.jpg",
    description:
      "A dish with fried rice, egg, and beef tapa. Perfect for when I’m broke.",
    user: {
      name: "BasicChef",
      username: "@food_enthusiast",
      avatar: "/images/avatar2.jpg",
    },
    rating: 4.0,
  },
  {
    _id: "3",
    title: "Adobo",
    image: "/images/adobo.jpg",
    description:
      "A classic Filipino stew made with chicken or pork braised in soy sauce and vinegar.",
    user: {
      name: "FakeChef",
      username: "@food_hater_123",
      avatar: "/images/avatar3.jpg",
    },
    rating: 5.0,
  },
];

// Example data for recipes
const exampleRecipes = [
  {
    _id: "1",
    title: "Spaghetti Carbonara",
    image: "/images/spaghetti.jpg",
    description: "A classic Italian pasta dish.",
  },
  {
    _id: "2",
    title: "Chicken Curry",
    image: "/images/curry.jpg",
    description: "A flavorful and spicy curry.",
  },
  {
    _id: "3",
    title: "Vegan Salad",
    image: "/images/salad.jpg",
    description: "A healthy and refreshing salad.",
  },
];

// Example data for reviews
const exampleReviews = [
  {
    recipeName: "Spaghetti Carbonara",
    reviewText: "Absolutely delicious! The best recipe I've tried.",
    rating: 5,
    date: "April 20, 2025",
  },
  {
    recipeName: "Chicken Curry",
    reviewText: "Very flavorful and easy to make. Highly recommend!",
    rating: 4,
    date: "April 18, 2025",
  },
  {
    recipeName: "Vegan Salad",
    reviewText: "Fresh and healthy. Perfect for a light lunch.",
    rating: 4,
    date: "April 15, 2025",
  },
];

const renderRecipeCards = () => (
  <Box>
    {/* Title for Created Recipes Section */}
    <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
      My Created Recipes
    </Text>
    <Divider borderColor="black.300" mb={4} /> {/* Divider Line */}
    {/* Recipe Cards */}
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
      {exampleRecipes.map((recipe) => (
        <Box
          key={recipe._id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          boxShadow="sm"
          cursor={"pointer"}
          transition="0.3s ease" // Smooth transition for hover effects
          _hover={{
            borderColor: "orange.200", // Add orange border on hover
            boxShadow: "0 0 3px 1px orange", // Slight orange glow effect
          }}
        >
          {/* Recipe Image */}
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
                icon={<FiMoreHorizontal />} // Three-dot menu icon
                size="sm"
                variant="ghost" // Transparent background
                aria-label="More options"
              />
            </Box>
          </Box>

          {/* Recipe Details */}
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

            {/* Placeholder for User Info */}
            <HStack spacing={2} mt={2}>
              <Avatar
                size="sm"
                src="/images/default-avatar.jpg" // Replace with actual user avatar if available
                name="Your Name"
              />
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  Your Name
                </Text>
                <Text fontSize="xs" color="gray.500">
                  @your_username
                </Text>
              </VStack>
            </HStack>

            {/* Placeholder for Rating */}
            <HStack spacing={1} mt={2}>
              {[...Array(5)].map((_, i) => (
                <Icon
                  as={FaStar}
                  key={i}
                  color={i < 4 ? "orange.400" : "gray.300"} // Example rating of 4
                  fontSize="sm"
                />
              ))}
              <Text fontSize="sm" color="gray.600">
                (4.0)
              </Text>
            </HStack>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
);

// Render review cards dynamically
const renderReviewCards = () => (
  <Box>
    {/* Title for Reviews Section */}
    <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
      FoodLover’s Reviews & Comments
    </Text>
    <Divider borderColor="black.300" mb={4} /> {/* Divider Line */}
    {/* Review Cards */}
    <VStack spacing={4} align="stretch">
      {exampleReviews.map((review, index) => (
        <ReviewCard
          key={index}
          recipeName={review.recipeName}
          reviewText={review.reviewText}
          rating={review.rating}
          date={review.date}
        />
      ))}
    </VStack>
  </Box>
);

const ProfilePage = ({ isOwner }) => {
  const [activeTab, setActiveTab] = useState("created");
  const avatarSize = useBreakpointValue({ base: "lg", md: "xl" });

  // Render bookmarks dynamically
  const renderBookmarkCards = () => (
    <Box>
      {/* Title for Bookmarks Section */}
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        My Bookmarks
      </Text>
      <Divider borderColor="black.300" mb={4} /> {/* Divider Line */}
      {/* Bookmark Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {exampleBookmarks.map((bookmark) => (
          <Box
            key={bookmark._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="sm"
            cursor={"pointer"}
            transition="0.3s ease" // Smooth transition for hover effects
            _hover={{
              borderColor: "orange.200", // Add orange border on hover
              boxShadow: "0 0 3px 1px orange", // Slight orange glow effect
            }}
          >
            {/* Recipe Image */}
            <Box position="relative">
              <Image
                src={bookmark.image}
                alt={bookmark.title}
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

            {/* Recipe Details */}
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

              {/* User Info */}
              <HStack spacing={2} mt={2}>
                <Avatar
                  size="sm"
                  src={bookmark.user.avatar}
                  name={bookmark.user.name}
                />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800">
                    {bookmark.user.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {bookmark.user.username}
                  </Text>
                </VStack>
              </HStack>

              {/* Rating */}
              <HStack spacing={1} mt={2}>
                {[...Array(5)].map((_, i) => (
                  <Icon
                    as={FaStar}
                    key={i}
                    color={
                      i < Math.floor(bookmark.rating)
                        ? "orange.400"
                        : "gray.300"
                    }
                    fontSize="sm"
                  />
                ))}
                <Text fontSize="sm" color="gray.600">
                  ({bookmark.rating.toFixed(1)})
                </Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );

  const tabContent = {
    created: renderRecipeCards(),
    bookmarks: isOwner ? renderBookmarkCards() : null,
    reviews: renderReviewCards(),
  };

  return (
    <>
      <Navbar />

      {/* Profile Container */}
      <Flex justify="center" pt={{ base: 4, md: 10 }} px={4}>
        <Box
          w={{ base: "100%", md: "90%", lg: "900px" }}
          borderRadius="md"
          overflow="hidden"
        >
          {/* Top Banner */}
          <Box
            bg="#FDE4CE"
            border="1px solid #ED984D"
            borderTopRadius="md"
            px={{ base: 4, md: 6 }}
            py={{ base: 6, md: 8 }}
            position="relative" // Make the parent container relative
          >
            <Flex
              direction={{ base: "column", md: "row" }} // Stack vertically on small screens
              align="center"
              justify="space-between"
              gap={6}
            >
              {/* Avatar and User Info */}
              <Flex
                direction={{ base: "column", md: "row" }} // Stack avatar and text vertically on small screens
                align="center"
                gap={4}
                textAlign={{ base: "center", md: "left" }} // Center text on small screens
              >
                <Avatar size="xl" name="FoodLover" bg="blue.300" />
                <VStack
                  align={{ base: "center", md: "start" }}
                  spacing={1}
                  w="100%"
                >
                  <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                    FoodLover
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    @food_enjoyer_123
                  </Text>
                  <Text fontSize="md" color="gray.700">
                    Will cook for compliments. Will eat for survival. Chomp
                    chomp.
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Joined: April 2025
                  </Text>

                  {/* Edit Profile Button */}
                  {isOwner && (
                    <Box
                      position={useBreakpointValue({
                        base: "static",
                        md: "absolute",
                      })} // Static for small screens, absolute for larger screens
                      top={{ md: "16px" }} // Only apply top positioning for larger screens
                      right={{ md: "16px" }} // Only apply right positioning for larger screens
                      mt={{ base: 4, md: 0 }} // Add margin-top for spacing on small screens
                      textAlign="center" // Center the button text
                      w={{ base: "100%", md: "auto" }} // Full width on small screens, auto on larger screens
                      display="flex" // Ensure the button is centered
                      justifyContent="center" // Center the button horizontally
                    >
                      <Link to="/settings">
                        <Box
                          as="button"
                          bg="#94C03B"
                          color="white"
                          px={4}
                          py={2}
                          borderRadius="full"
                          fontSize="sm"
                          fontWeight="bold"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          gap={2}
                          _hover={{ bg: "#7A973F" }}
                          _active={{ bg: "green.700" }}
                        >
                          <Icon as={FaEdit} boxSize={4} />
                          Edit Profile
                        </Box>
                      </Link>
                    </Box>
                  )}
                </VStack>
              </Flex>
            </Flex>
          </Box>

          {/* Tabs */}
          <Box bg="white" border="1px solid #c5c5c5" borderBottom="none">
            <Flex
              direction="row"
              justify={useBreakpointValue({
                base: "center", // Center tabs on smaller screens
                md: "flex-start", // Align tabs to the left on medium and larger screens
              })}
              px={4}
              py={0}
              position="relative"
            >
              {tabs
                .filter((tab) => isOwner || tab.key !== "bookmarks") // Hide bookmarks tab for non-owners
                .map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <Box
                      key={tab.key}
                      textAlign="center"
                      py={1}
                      px={4}
                      cursor="pointer"
                      color={isActive ? "orange.500" : "gray.700"}
                      bg={isActive ? "#FFF0E1" : "white"}
                      position="relative"
                      fontWeight="medium"
                      _hover={{ bg: "#FFF0E1" }}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                      {isActive && (
                        <Box
                          position="absolute"
                          bottom="0"
                          left="0"
                          right="0"
                          height="3px"
                          bg="orange.500"
                        />
                      )}
                    </Box>
                  );
                })}
            </Flex>
          </Box>
          {/* Divider Line */}
          <Box borderBottom="1px solid #c5c5c5" />

          {/* Content Area */}
          <Box
            bg="white"
            border="1px solid #c5c5c5"
            borderTop="none" // Remove the top border to align with the tabs
            borderBottomRadius="md"
            px={{ base: 4, md: 6 }}
            py={{ base: 6, md: 8 }}
            minH={{ base: "300px", md: "500px" }}
          >
            {tabContent[activeTab]}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ProfilePage;
