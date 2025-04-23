import React from "react";
import { Box, Flex, Input, Button, Text, Grid, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar(Logged)";
import Filters from "../components/Filters";
import BG_Image from "/images/11.png"; // Adjust the path as necessary

const MotionText = motion(Text);

function SearchPage() {
  const handleApplyFilters = (filters) => {
    console.log("Applied Filters:", filters);
    // Add logic to fetch or filter recipes based on the applied filters
  };

  return (
    <Box bg="white" minH="100vh" width="100%"> 
      <Navbar />

           <Image
              src={BG_Image}
              position="absolute"
              top="0"
              left="75%"
              transform="translateX(-50%)"
              width={{ base: "90vw", md: "60vw" }}
              maxW="none"
              zIndex={0}
              opacity={1}
            />


      <Flex mt={4} px={6}>
        {/* Filters on the top-left */}
        <Box
          position={{ base: "sticky", md: "fixed" }} // Sticky for mobile, fixed for desktop
          top={{ base: "10px", md: "20%" }} // Stick to the top on mobile, fixed position for desktop
          left={{ base: "60px", md: "135px" }} // Adjust left position for desktop
          zIndex="1000"
          p={4} // Add padding for better spacing
          boxShadow={{ base: "sm", md: "none" }} // Add shadow for mobile to distinguish it
        >
          <Filters onApplyFilters={handleApplyFilters} />
        </Box>

        {/* Sign-Up Box below Filters */}
        <Box
          position="fixed"
          top={{ base: "400px", md: "480px" }}
          left={{ base: "20px", md: "150px" }}
          bg="#D3F38E"
          p={4}
          borderRadius="md"
          boxShadow="md"
          maxW="280px"
          height="400px"
          textAlign="center"
          zIndex="1000"
          display={{ base: "none", md: "block" }} // Hide on mobile, show on medium+ screens
          borderColor="gray.200"
        >
          <Box fontWeight="bold" fontSize="24px" mb={2} mt="20%">
            Don’t lose that perfect recipe!
          </Box>
          <Box fontSize="sm" mb={4} mt="20%" mx="10px">
            Found something delicious? Sign up for free to save it before you scroll away!
          </Box>
          <Input
            placeholder="Email"
            size="sm"
            mb={2}
            borderRadius="md"
            bg="white"
          />
          <Button colorScheme="green" size="sm" width="100%">
            Sign Up
          </Button>
        </Box>
      </Flex>

      {/* Explore Recipes Section */}
      <Box
        py={6}
        position="relative" // Keep the section relative to the parent container
        width={{ base: "90%", md: "1300px" }} // Adjust width for responsiveness
        px={4} // Add padding inside the box
        mx="auto" // Center the section horizontally
        ml={{ md: "25%" }} // Adjust left margin for desktop
      >
        {/* Sticky Header */}
        <Box
          position="sticky"
          top={{ base: "0%", md: "8%" }} // Stick to the top of the viewport
          zIndex="1000" // Ensure it stays above other content
          bg="white" // Add background to prevent overlap
          py={4} // Add padding for spacing
          boxShadow="sm" // Add a subtle shadow for better visibility
          height={{ md: "100%" }} // Full width on mobile, auto on desktop
          border="2px solid"
          borderColor={"gray.200"} // Add border for better visibility
        >
          <Flex justify="space-between" align="center" mb={4} px={6}>
            <Text fontWeight="bold" fontSize={{ base: "18px", md: "24px" }}>
              Discover Recipes
            </Text>
          </Flex>
        </Box>

        {/* Scrollable Recipes Grid */}
        <Box mt={4}>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)", // 2 columns for mobile
              md: "repeat(5, 1fr)", // 5 columns for desktop
            }}
            gap={{ base: 3, md: 6 }} // Smaller gap for mobile, larger for desktop
          >
            {Array.from({ length: 25 }).map((_, index) => (
              <Box
                key={index}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                overflow="hidden"
                zIndex={2}
                position="relative" // Enable positioning for hover effect
              >
                {/* Image Box */}
                <Box height={{ base: "120px", md: "200px" }} overflow="hidden">
                  <Image
                    src={`/images/recipe-${index + 1}.jpg`} // Replace with actual image paths
                    alt={`Recipe ${index + 1}`}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                </Box>

                {/* Hover Description */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  bg="rgba(0, 0, 0, 0.6)"
                  color="white"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  opacity="0"
                  transition="opacity 0.3s ease-in-out"
                  _hover={{ opacity: 1 }}
                >
                  <Text fontSize={{ base: "12px", md: "14px" }} fontWeight="bold" textAlign="center">
                    Recipe Description {index + 1}
                  </Text>
                  <Text fontSize={{ base: "10px", md: "12px" }} textAlign="center" mt={2}>
                    A brief description of the recipe goes here.
                  </Text>
                </Box>

                {/* Food Name */}
                <Text
                  textAlign="center"
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="bold"
                  color="black"
                  mt={2}
                  mb={4}
                >
                  Recipe Name {index + 1}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box py={6} bg="gray.100" textAlign="center" mt={10}>
        <Text fontSize="14px" color="gray.600">
          @ 2025 InsaneRecipe. All Rights Reserved
        </Text>
      </Box>
    </Box>
  );
}

export default SearchPage;