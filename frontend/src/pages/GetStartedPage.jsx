import { Box, Button, Image, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar"; 
import bgImage2 from "/images/GreenSplash1.png";
import FoodBowl from "/images/FoodBowl.png";
import Leaf from "/images/Leaf.png";
import { motion } from "framer-motion";



const MotionText = motion(Text);

function GetStartedPage() {
  return (
    <Box position="relative" height="100vh" overflow="auto">
      
      {/* Navbar */}
      <Box position="relative" zIndex={2}>
        <Navbar />
      </Box>

      {/* Background & Decorative Images */}
      <Image 
        src={bgImage2}
        position="absolute"
        top="-110%"
        left="40%"
        boxSize="1900"
        zIndex={0}
      />

      <Image 
        src={bgImage2}
        position="absolute"
        top="35%"
        left="-55%"
        boxSize="1500"
        transform="rotate(10deg)"
        zIndex={0}
      />

      <Image 
        src={FoodBowl}
        position="absolute"
        left="60%"
        bottom="15%"
        boxSize="650"
        zIndex={1}
      />

      <Image 
        src={Leaf}
        position="absolute"
        left="55%"
        bottom="54%"
        transform="rotate(-5deg)"
        height = "273"
      />

      <Image 
        src={Leaf}
        position="absolute"
        left="79%"
        bottom="35%"
        transform="rotate(134deg)"
        height = "273"
      />

      {/* Hero Text & Button */}
      <Box position="absolute" top="30%" left="5%" zIndex={1} maxW="550px">
        <Text 
          fontSize={{ base: "30px", sm: "40px", md: "50px" }}
          fontWeight="bold"
          color="black"
          textTransform="uppercase"
        >
          YOUR ALL-IN-ONE
        </Text>

        <Text 
          fontSize={{ base: "30px", sm: "40px", md: "50px" }}
          fontWeight="bold"
          color="#FD660B"
          textTransform="uppercase"
        >
          RECIPE HUB
        </Text>

        <Text fontSize="22" fontWeight="lightbold" color="black" mt={4}>
          Share your recipes, explore new ones, and connect with fellow food enthusiasts.
          Access more than{" "}
          <Text as="span" color="#FD660B" fontWeight="bold">
            500 recipes
          </Text>{" "}
          from around the world — and counting!
        </Text>

        <Button mt={6} bg="#FD660B" color="white" borderRadius="5">
          SIGN UP
        </Button>

        <Box display="flex" alignItems="center" mt={4}>
          <Text fontSize="17" fontWeight="light" color="black" mr={2}>
                Already have an account?
          </Text>
              <MotionText
                  fontSize="17"
                  fontWeight="bold"
                  color="#FD660B"
                  textDecoration="underline"
                  cursor="pointer"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
              Log In
              </MotionText>
        </Box>
      </Box>

      <Box
        position="absolute"
        top="105%"
        left="10%"
        right="10%"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        gap={6}
        zIndex={1}
        >
  {/* Video */}
  <Box
    border="12px solid #FD660B"
    borderRadius="md"
    maxW={{ base: "100%", md: "800px" }}
    height={{ base: "auto", md: "370px" }}
    flexShrink={0}
    overflow="hidden"
  >
    <video width="100%" controls style={{ objectFit: "cover" }}>
      <source src="/videos/Gordon Ramsay Smashes Salmon _ comp _.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </Box>

  {/* Text beside video */}
  <Box maxW={{ base: "100%", md: "500px" }}>
    <Text fontSize="42px" fontWeight="bold" mb={2} color="#FD660B">
        Cook.
        <Text as="span" color="#97C33A">
        Share. 
        </Text>
        Connect.
    </Text>
    <Text fontSize="20px" color="gray.900">
      Unlock a world of culinary inspiration! Whether you're a seasoned chef or just starting out, find and share amazing recipes with ease.
    </Text>
  </Box>
</Box>



    </Box>
  );
}

export default GetStartedPage;