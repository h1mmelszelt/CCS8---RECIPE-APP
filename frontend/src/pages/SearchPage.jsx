import React from "react";
import { Box, Flex, Input, Button, Text, Grid, Image } from "@chakra-ui/react";
import Navbar from "../components/Navbar(Logged)";
import Filters from "../components/Filters";
import BG_Image from "/images/11.png"; // Adjust the path as necessary

function SearchPage() {
  const handleApplyFilters = (filters) => {
    console.log("Applied Filters:", filters);
    // Add logic to fetch or filter recipes based on the applied filters
  };

  return (
    <Box
      bg="white"
      minH="100vh"
      width="100%"
      color="black"
      pb={{ base: "60px", md: "0" }}
    >
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

      <Flex mt={4} px={4} flexDirection={{ base: "column", md: "row" }}>
        {/* Filters and Sign-Up Box Container */}
        <Box
          display="flex"
          flexDirection="column"
          width={{ base: "100%", md: "350px" }} // Increased width for desktop
          gap={3} // Add spacing between the Filter Box and Sign-Up Box
          ml={{ base: 0, md: 2 }} // Move the container slightly to the right on desktop
        >
          {/* Filters on the top-left */}
          <Box
            position="sticky" // Sticky positioning for both mobile and desktop
            top="10%" // Stick to the top of the viewport
            zIndex="1000"
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
          >
            <Filters onApplyFilters={handleApplyFilters} />
          </Box>

          {/* Sign-Up Box below Filters */}
          <Box
            position="sticky" // Sticky positioning for both mobile and desktop
            top="450px" // Stick below the filter box
            zIndex="0"
            p={4}
            bg="#D3F38E"
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
            display={{ base: "none", md: "block" }}
          >
            <Box fontWeight="bold" fontSize="24px" mb={2}>
              Don’t lose that perfect recipe!
            </Box>
            <Box fontSize="sm" mb={4}>
              Found something delicious? Sign up for free to save it before you
              scroll away!
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
        </Box>

        {/* Explore Recipes Section */}
        <Box
          py={6}
          position="relative"
          width={{ base: "100%", md: "calc(100% - 300px)" }} // Adjust width to account for the wider sidebar
          px={4}
          mx="auto"
          ml={{ md: "100px" }} // Push content to the right of the sidebar on desktop
        >
          {/* Sticky Header */}
          <Box
            position="sticky"
            top="0" // Ensure it sticks to the top of the viewport
            zIndex="0"
            bg="white"
            py={4}
            boxShadow="sm"
            borderBottom="1px solid"
            borderColor="gray.200"
            borderRadius="10"
          >
            <Flex justify="space-between" align="center" px={6}>
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
                md: "repeat(4, 1fr)", // 5 columns for desktop
              }}
              gap={{ base: 3, md: 6 }}
            >
              {Array.from({ length: 25 }).map((_, index) => (
                <Box
                  key={index}
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  overflow="hidden"
                  zIndex={2}
                  position="relative"
                >
                  {/* Image Box */}
                  <Box height={{ base: "120px", md: "200px" }} overflow="hidden">
                    <Image
                      src={`/images/recipe-${index + 1}.jpg`}
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
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Recipe Description {index + 1}
                    </Text>
                    <Text
                      fontSize={{ base: "10px", md: "12px" }}
                      textAlign="center"
                      mt={2}
                    >
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
      </Flex>
    </Box>
  );
}

export default SearchPage;
