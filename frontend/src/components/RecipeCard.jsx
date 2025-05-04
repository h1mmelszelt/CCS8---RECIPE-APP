import React, { useState } from "react";
import { Box, Image, Text, Icon, VStack, Button } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { getCompressedImageUrl } from "../utils/imageUtils";

const RecipeCard = ({ recipe, loggedInUserId }) => {
  const [showMenu, setShowMenu] = useState(false);

  const isOwner = recipe.user_id === loggedInUserId; // Check if the recipe belongs to the logged-in user

  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleEdit = () => {
    console.log("Edit recipe:", recipe._id);
    // Add navigation or logic for editing the recipe
  };

  const handleDelete = () => {
    console.log("Delete recipe:", recipe._id);
    // Add logic for deleting the recipe
  };

  const handleReport = () => {
    console.log("Report recipe:", recipe._id);
    // Add logic for reporting the recipe
  };

  const handleBookmark = () => {
    console.log("Bookmark recipe:", recipe._id);
    // Add logic for bookmarking the recipe
  };

  return (
    <Box
      borderWidth="1px"
      _hover={{
        boxShadow: "0 0 6px 1px #FD660B", // Add orange glow effect on hover
      }}
      borderColor="gray.300"
      borderStyle="solid"
      borderRadius="sm"
      overflow="hidden"
      cursor="pointer"
      bg="white"
      boxShadow="md"
      transition="0.4s ease"
      position="relative"
      width={{ base: "160px",  md: "200px", lg: "100%" }} // Responsive width
      height={{ base: "150px",  md: "200px", lg: "100%" }} // Responsive height
    >
      {/* Recipe Image */}
      <Box position="relative">
        <Image
          src={getCompressedImageUrl(recipe.image)}
          alt={recipe.name}
          height={{ base: "100%", md: "160px", lg: "160px"}} // Responsive height
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
              {recipe.description}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Recipe Title */}
      <Box p={1}>
        <Text
          fontSize={{ base: "sm", sm: "md", md: "lg" }}
          fontWeight="bold"
          color="gray.800"
          noOfLines={1}
          textAlign="center"
        >
          {recipe.name}
        </Text>
      </Box>
    </Box>
  );
};

export default RecipeCard;
