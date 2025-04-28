import { Box, Button, Image, Text, Flex, VStack, Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import BowlLeaf from "/images/BowlLeaf.png";
import { motion } from "framer-motion";
import BG_Image from "/images/11.png";
import BG_Image2 from "/images/15.png";
import Phone from "/images/phone.png";
import Fabio from "/images/fabio.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const MotionText = motion(Text);


function GetStartedPage() {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes");
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

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Navbar */}
      <Box position="relative" zIndex={999}>
        <Navbar boxShadow={false} transparent={true} />
      </Box>

      {/* Decorative Backgrounds */}
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

      <Image
        src={BG_Image2}
        position="absolute"
        top="30vh"
        left="0vw"
        width={{ base: "70vw", md: "20vw" }}
        maxW="none"
        zIndex={0}
      />

      <Image
        src={BowlLeaf}
        position="absolute"
        top="20vh"
        right="15vw"
        width={{ base: "0vw", md: "0vw", lg: "30vw" }}
        maxW="none"
        zIndex={0}
        display={{ base: "none", md: "block" }}
      />

      <Image
        src={Fabio}
        position="absolute"
        top="45vh"
        right="33vw"
        width={{ base: "0vw", md: "0vw", lg: "15vw" }}
        maxW="none"
        zIndex={0}
        display={{ base: "none", md: "block" }}
      />

      {/* Hero Section */}
      <Flex
        direction="column"
        align="start"
        px={{ base: 6, md: 20 }}
        pt={{ base: 20, md: 40 }}
        zIndex={1}
        maxW={{ base: "100%", md: "640px" }}
      >
        <Text
          fontSize={{ base: "24px", md: "50px" }}
          fontWeight="bold"
          color="black"
          textTransform="uppercase"
          zIndex={1}
        >
          YOUR ALL-IN-ONE
        </Text>
        <Text
          fontSize={{ base: "24px", md: "50px" }}
          fontWeight="bold"
          color="#FD660B"
          textTransform="uppercase"
        >
          RECIPE HUB
        </Text>

        <Text
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight="medium"
          color="black"
          mt={4}
          zIndex={0}
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
          width={{ base: "100%", md: "auto" }}
        >
          <Link to="/register">SIGN UP</Link>
        </Button>

        <Flex align="center" mt={4}>
          <Text fontSize="16px" color="black" mr={2} zIndex={1}>
            Already have an account?
          </Text>
          <MotionText
            fontSize="16px"
            fontWeight="bold"
            color="#FD660B"
            textDecoration="underline"
            cursor="pointer"
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            zIndex={2}
          >
            <Link to="/login">
            Log In
            </Link>
          </MotionText>
        </Flex>
      </Flex>

      {/* Video + Cook.Share.Connect Text */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        px={{ base: 6, md: 20 }}
        mt={{ base: 10, md: 300 }}
        gap={{ base: 10, md: 20 }}
        zIndex={1}
      >
        {/* Video Box */}
        <Box
          border="10px solid #FD660B"
          borderRadius="md"
          maxW="100%"
          overflow="hidden"
          zIndex={1}
        >
          <video
            width="100%"
            controls
            style={{ objectFit: "cover", maxHeight: "300px" }}
          >
            <source
              src="/videos/Gordon Ramsay Smashes Salmon _ comp _.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>

        {/* Text beside video */}
        <Box maxW={{ base: "100%", md: "500px" }} zIndex={2}>
          <Text fontSize="28px" fontWeight="bold" mb={2} color="#FD660B">
            Cook.
            <Text as="span" color="black">
              {" "}
              Share.{" "}
            </Text>
            Connect.
          </Text>
          <Text fontSize="16px" color="gray.800">
            Unlock a world of culinary inspiration! Whether you're a seasoned
            chef or just starting out, find and share amazing recipes with ease.
          </Text>
        </Box>
      </Flex>

      {/* "Completely Free" Box */}
      <Box
        borderRadius="md"
        p={4}
        mt="10%"
        maxW="100%"
        color="white"
        textAlign="center"
        zIndex={1}
        mx="auto"
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
            <Text fontSize="20px" fontWeight="bold" color="#FD660B" zIndex={1}>
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
            <Text fontSize="20px" fontWeight="bold" color="#FD660B" zIndex={1}>
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
        display={{ base: "none", md: "flex" }} // Hide on small screens, show on medium and larger screens
        flexDirection="column"
        alignItems="center"
      >
        <Text
          fontSize={{ base: "20px", md: "28px" }}
          fontWeight="bold"
          mb={-5}
          position="relative"
          left="-20%" // Move text slightly to the left
        >
          Put us in your{" "}
          <Text as="span" color="#97C33A">
            Pocket!
          </Text>
        </Text>
        <Image
          src={Phone}
          alt="Phone"
          width={{ base: "70%", md: "50%" }} // Adjust width for responsiveness
          mx="auto" // Center the image horizontally
        />
      </Box>

      {/* Explore Recipes Section */}
      <Box py={6}>
        <Flex justify="space-between" align="center" px="10%" mt="10%">
          <Text fontWeight="bold" fontSize={{ base: "24px", md: "34px" }}>
            Explore Recipes
          </Text>

          <MotionText
            fontSize="16px"
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
        <Box px="10%" py={6}>
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
    gap={6}
  >
    {recipes.slice(0,12).map((recipe) => (
      <Box 
        key={recipe._id}
        bg="white"
        borderRadius="md"
        boxShadow="md"
        overflow="hidden"
        zIndex={2}
        position="relative"
      >
        {/* Recipe Image */}
        <Box height={{ base: "200px", md: "250px" }} overflow="hidden">
          <Image
            src={recipe.image} // Use the recipe's image URL
            alt={recipe.name}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>

        {/* Recipe Name */}
        <Text
          textAlign="center"
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight="bold"
          color="black"
          mt={2}
          mb={4}
        >
          {recipe.name}
        </Text>
      </Box>
    ))}
  </Grid>
)}
        </Box>
      </Box>
    </Box>
  );
}

export default GetStartedPage;
