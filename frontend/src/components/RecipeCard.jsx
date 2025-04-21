import React from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RecipeCard = ({ _id, title, image, description }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      maxW="300px"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="0.2s ease"
    >
      <Image
        src={image}
        alt={title}
        height="200px"
        width="100%"
        objectFit="cover"
      />

      <VStack align="start" spacing={2} p={4}>
        <Heading size="md" color="#FD660B" noOfLines={1}>
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.600" noOfLines={2}>
          {description}
        </Text>
        <Link to={`/recipe/${_id}`}>
          <Button size="sm" colorScheme="orange" variant="outline">
            View Recipe
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default RecipeCard;
