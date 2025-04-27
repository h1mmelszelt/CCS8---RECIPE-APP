import React from "react";
import {
  Box,
  Text,
  Link,
  HStack,
  VStack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

const ReviewCard = ({ recipeName, reviewText, rating, date }) => {
  return (
    <Box
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
            <Link color="orange.500" fontWeight="semibold">
              {recipeName}
            </Link>
          </Text>

          {/* Review Text */}
          <Box
            fontStyle="italic"
            borderLeft="2px solid #E2E8F0"
            pl={3}
            color="gray.700"
          >
            <Text>{reviewText}</Text>
          </Box>

          {/* Rating */}
          <Text fontSize="sm" color="green.500" fontWeight="medium">
            Rating:{" "}
            {[...Array(5)].map((_, i) => (
              <Icon
                as={FaStar}
                key={i}
                color={i < rating ? "green.400" : "gray.300"}
                fontSize="sm"
              />
            ))}{" "}
            ({rating}/5)
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
        Posted on: {date}
      </Text>
    </Box>
  );
};

export default ReviewCard;
