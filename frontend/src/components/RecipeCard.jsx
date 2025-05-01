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
      position="relative"
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
              onClick={handleToggleMenu}
            />
          </Box>

          {/* Popup Menu */}
          {showMenu && (
            <Box
              position="absolute"
              top="40px"
              right="15px"
              bg="white"
              borderRadius="md"
              boxShadow="md"
              zIndex="10"
              p={2}
            >
              <VStack align="stretch" spacing={2}>
                {isOwner ? (
                  <>
                    <Button size="sm" onClick={handleEdit}>
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={handleDelete}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" onClick={handleReport}>
                      Report
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="orange"
                      onClick={handleBookmark}
                    >
                      Save as Bookmark
                    </Button>
                  </>
                )}
              </VStack>
            </Box>
          )}

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
  );
};

export default RecipeCard;
