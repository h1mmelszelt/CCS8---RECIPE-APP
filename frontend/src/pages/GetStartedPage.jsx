import { Box, Button, Image, Text, Flex, VStack, Grid } from "@chakra-ui/react";

import { motion } from "framer-motion";
import Phone from "/images/phone.png";
import Fabio from "/images/fabio.png";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import background from "/images/background.png";
import { useMediaQuery } from "@chakra-ui/react"; // Import useMediaQuery
const MotionText = motion(Text);

function GetStartedPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://cs-test-z2vm.onrender.com/api/recipes"
        );
        console.log("Fetched recipes from API:", response.data); // Debug log
        setRecipes(response.data.data);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (!loading && isLargerThan768) {
      const scrollDistance = window.innerHeight * 0.2; // Adjust scroll distance
      const scrollStep = 1; // Pixels to scroll per step
      const scrollInterval = 10; // Milliseconds between steps

      let scrolled = 0;
      const interval = setInterval(() => {
        window.scrollBy(0, scrollStep);
        scrolled += scrollStep;
        if (scrolled >= scrollDistance) {
          clearInterval(interval);

          // Show the pop-up after scrolling finishes
          setShowPopup(true);

          setIsAutoScrolling(false);
        }
      }, scrollInterval);

      return () => clearInterval(interval); // Cleanup interval
    }
  }, [loading]);

  // Hide the pop-up when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (!isAutoScrolling && window.scrollY > 0) {
        setShowPopup(false); // Hide the pop-up when the user scrolls
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener
    };
  }, [isAutoScrolling]);

  return (
    <Box position="relative" minH="100vh" overflow="hidden" bg="white">
      <Box position="relative" zIndex={999}></Box>

      {/* Pop-Up */}
      {showPopup && (
        <Box
          position="fixed"
          top="95%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="orange.400"
          color="white"
          px={5}
          py={3}
          borderRadius="md"
          boxShadow="lg"
          zIndex={1000}
          textAlign="center"
        >
          <Text fontSize="lg" fontWeight="bold">
            SCROLL DOWN FOR MORE INFORMATION
          </Text>
        </Box>
      )}
      {/* Video Background */}
      <Box
        position="relative"
        width="100vw"
        height={{ base: "50vh", md: "100vh" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/VideoBg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Decorative Backgrounds */}
      <Box position="relative" width="100vw" height="100vh">
        {/* Orange Vignette Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgGradient="linear(to-r, orange.400 0%, transparent 40%, transparent 60%, orange.400 100%)"
          opacity="0.4"
          pointerEvents="none"
          zIndex={1} // Ensure it appears below the image
        />

        {/* Background Image */}
        <Image
          src={background}
          width="100%"
          height="100%"
          objectFit="cover"
          position="absolute"
          top="0"
          left="0"
          zIndex={2} // Ensure it appears above the vignette
        />

        {/* Centered Text */}
        <Box
          position="absolute"
          top={{ base: "52%", md: "57%" }}
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          zIndex={3} // Ensure it appears above both the vignette and the image
          px={{ base: 2, md: 4 }}
        >
          <Text
            fontSize={{ base: "22px", md: "50px" }}
            fontWeight="bold"
            color="black"
            textTransform="uppercase"
          >
            YOUR ALL-IN-ONE
          </Text>
          <Text
            fontSize={{ base: "20px", md: "50px" }}
            fontWeight="bold"
            color="#FD660B"
            textTransform="uppercase"
          >
            RECIPE HUB
          </Text>
          <Text
            fontSize={{ base: "13px", md: "18px" }}
            fontWeight="medium"
            color="black"
            mt={{ base: 2, md: 4 }}
          >
            Share your recipes, explore new ones, and connect with fellow food
            enthusiasts. Access more than{" "}
            <Text as="span" color="#FD660B" fontWeight="bold">
              500 recipes
            </Text>{" "}
            from around the world — and counting!
          </Text>
          <Button
            mt={6}
            bg="#FD660B"
            color="white"
            borderRadius="md"
            width={{ base: "70%", md: "auto" }}
          >
            <Link to="/register">SIGN UP</Link>
          </Button>
          <Flex
            align="center"
            mt={{ base: 2, md: 4 }}
            justify="center"
            wrap="nowrap"
          >
            <Text
              fontSize={{ base: "12px", md: "16px" }}
              color="black"
              mr={2}
              whiteSpace="nowrap"
            >
              Already have an account?
            </Text>
            <MotionText
              fontSize={{ base: "12px", md: "16px" }}
              fontWeight="bold"
              color="#FD660B"
              textDecoration="underline"
              cursor="pointer"
              whiteSpace="nowrap"
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/login">Log In</Link>
            </MotionText>
          </Flex>

          {/* Explore Recipes Section */}
          <Box py={2}>
            <Flex justify="space-between" align="center" px="10%" mt="10%">
              <Text
                fontWeight="bold"
                fontSize={{ base: "12px", md: "23px" }}
                wrap="nowrap"
              >
                Explore Recipes
              </Text>

              <MotionText
                fontSize={{ base: "10px", md: "14px" }}
                color="#FD660B"
                textDecoration="underline"
                fontWeight="medium"
                cursor="pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/search">View More</Link>
              </MotionText>
            </Flex>
            <Box  px={{ base: "4", md: "8" }} py={6} maxW="1200px" mx="auto">
              {loading ? (
                <Text textAlign="center" fontSize="18px" color="gray.500">
                  Loading recipes...
                </Text>
              ) : recipes.length === 0 ? (
                <Text textAlign="center" fontSize="18px" color="gray.500">
                  No recipes available at the moment. Please check back later!
                </Text>
              ) : (
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  }}
                  gap={{ base: 4, md: 4 }}
                >
                  {recipes
                  .map((recipe) =>
                    recipe && recipe._id ? (
                        <Link
                          to={`/recipes/${recipe._id}`}
                          key={recipe._id}
                          style={{ textDecoration: "none" }}
                        onClick={e => {
                          if (!recipe._id) {
                            e.preventDefault();
                          }
                        }}
                        >
                          <RecipeCard recipe={recipe} />
                        </Link>
                      ) : null
                  )}
                </Grid>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box position="relative" zIndex={1}>
        {/* Hero Section */}
        <Box position="relative" zIndex={1}>
          {/* Hero Section */}
          <Flex
            direction="column"
            align="center"
            justify="center"
            px={{ base: 6, md: 20 }}
            zIndex={1}
          ></Flex>
        </Box>

        {/* "Completely Free" Box */}
        <Box
          borderRadius="md"
          p={6} // Padding inside the box
          mt="5%"
          maxW="85%" // Adjust width as needed
          bg="white" // Background color for the box
          border="1px solid #E2E8F0" // Light border
          boxShadow="md" // Add shadow for better visibility
          color="black"
          textAlign="center"
          zIndex={1}
          mx="auto" // Center the box horizontally
        >
          <Flex
            justify="space-between"
            mx="5%"
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 0 }}
          >
            {/* Completely Free Section */}
            <VStack align="center">
              <Image
                src="/images/free.png"
                alt="Free Icon"
                boxSize={{ base: "60px", md: "80px", lg: "100px" }}
                mb={2}
              />
              <Text
                fontSize="20px"
                fontWeight="bold"
                color="#FD660B"
                zIndex={1}
              >
                Completely Free
              </Text>
              <Text fontSize="16px" color="black" mt={2} zIndex={1}>
                Sign up for free and have access to all these recipes!
              </Text>
            </VStack>

            {/* Safe Space Section */}
            <VStack align="center">
              <Image
                src="/images/child.png"
                alt="Safe Icon"
                boxSize={{ base: "60px", md: "80px", lg: "100px" }}
                mb={2}
              />
              <Text
                fontSize="20px"
                fontWeight="bold"
                color="#FD660B"
                zIndex={1}
              >
                Safe Space
              </Text>
              <Text fontSize="16px" color="black" mt={2} zIndex={1}>
                Store and manage your favorite recipes without any worries!
              </Text>
            </VStack>

            {/* Accessible Section */}
            <VStack align="center">
              <Image
                src="/images/tap.png"
                alt="Accessible Icon"
                boxSize={{ base: "60px", md: "80px", lg: "100px" }}
                mb={2}
              />
              <Text fontSize="20px" fontWeight="bold" color="#FD660B">
                Accessible
              </Text>
              <Text fontSize="16px" color="black" mt={2}>
                Accommodates all kinds of users!
              </Text>
            </VStack>
          </Flex>
        </Box>

        {/* Phone Image Section */}
        <Box
          textAlign="center"
          mt={20}
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          alignItems="center"
        >
          <Text
            fontSize={{ base: "20px", md: "28px" }}
            fontWeight="bold"
            mb={-5}
            position="relative"
            left="-20%"
          >
            Put us in your{" "}
            <Text as="span" color="#97C33A">
              Pocket!
            </Text>
          </Text>
          <Image
            src={Phone}
            alt="Phone"
            width={{ base: "70%", md: "50%" }}
            mx="auto"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default GetStartedPage;
