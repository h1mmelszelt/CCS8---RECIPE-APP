import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar(Logged)";
import aboutUsImage from "/images/cooking by AdobeStock.jpg"
import { Link, useNavigate } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <Box bg="white" minH="100vh" color="black">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box px={{ base: 4, md: 20 }} py={10}>
        {/* About Us Section */}
        <VStack align="start" spacing={6} mb={10}>
          <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            Helping people{" "}
            <Text as="span" color="#97C33A">
              succeed
            </Text>{" "}
            through the power of food
          </Text>
          <Text fontSize="md" color="gray.600">
            At InsaneRecipe, we believe food is more than just nourishment—it's
            a way to connect, inspire, and grow. Our platform empowers home
            cooks and aspiring chefs to share their passion through videos,
            build their personal brands, and learn from a supportive community.
            Whether you're sharing a family recipe or discovering new cuisines,
            we're here to help you thrive—one recipe at a time.
          </Text>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button bg="#AAD05E" color="white" _hover={{ bg: "#99BD50" }}>
              Sign Up for Free
            </Button>
          </Link>
        </VStack>

        {/* Secondary Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={10}
        >
          <Box flex="1">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={4}>
              Record videos and share your personal recipes, connect with other
              aspiring home cooks.
            </Text>
            <Text fontSize="md" color="gray.600">
              “Record and share your personal recipes through engaging videos.
              Whether you're a seasoned chef or a passionate home cook, inspire
              others with your creations and connect with a vibrant community
              that loves food as much as you do.”
            </Text>
          </Box>
          <Box flex="1" display={{ base: "block", md: "block" }} justifyContent="center">
            <Image
              src={aboutUsImage}
              alt="Cooking"
              borderRadius="md"
              objectFit="cover"
              boxSize={{ base: "500px", md: "700px" }}
              clipPath="polygon(2% 22%, 0 38%, 0 61%, 4% 75%, 9% 86%, 17% 90%, 26% 93%, 35% 94%, 46% 93%, 56% 92%, 69% 89%, 79% 85%, 85% 80%, 90% 73%, 95% 62%, 95% 47%, 94% 33%, 90% 24%, 85% 17%, 75% 10%, 65% 4%, 54% 0, 38% 0, 25% 2%, 15% 7%, 9% 10%, 5% 15%)"
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AboutUsPage;