import { Box, Button, Image, Text, Flex, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import BowlLeaf from "/images/BowlLeaf.png";
import { motion } from "framer-motion";
import BG_Image from "/images/11.png";
import BG_Image2 from "/images/15.png";
import GreenRectangle from "/images/Rectangle2.png";
import Phone from "/images/phone.png";

const MotionText = motion(Text);

function GetStartedPage() {
  return (
    <Box position="relative" minH="100vh" overflow="hidden" >
      {/* Navbar */}
      <Box position="relative" zIndex={2}>
        <Navbar />
      </Box>

      {/* Decorative Backgrounds */}
      <Image
        src={BG_Image}
        position="absolute"
        top="0"
        left="75%"
        transform="translateX(-50%)"
        width={{ base: "70vw", md: "60vw" }} // full viewport width
        maxW="none"
        zIndex={0}
        opacity={1}
      />

      <Image
        src={BG_Image2}
        position="absolute"
        top="30vh"
        left="0vw" // replaced right: 81% for more consistency across screens
        width={{ base: "50vw", md: "20vw" }}
        maxW="none"
        zIndex={0}
      />
      
      <Image
        src={BowlLeaf}
        position="absolute"
        top="20vh"
        right="15vw" // replaced right: 81% for more consistency across screens
        width={{ base: "0vw", md: "35vw" }}
        maxW="none"
        zIndex={0}
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
        <Text fontSize={{ base: "30px", md: "50px" }} fontWeight="bold" color="black" textTransform="uppercase">
          YOUR ALL-IN-ONE
        </Text>
        <Text fontSize={{ base: "30px", md: "50px" }} fontWeight="bold" color="#FD660B" textTransform="uppercase">
          RECIPE HUB
        </Text>

        <Text fontSize="18px" fontWeight="medium" color="black" mt={4}>
          Share your recipes, explore new ones, and connect with fellow food enthusiasts. Access more than{" "}
          <Text as="span" color="#FD660B" fontWeight="bold">
            500 recipes
          </Text>{" "}
          from around the world — and counting!
        </Text>

        <Button mt={6} bg="#FD660B" color="white" borderRadius="md">
          SIGN UP
        </Button>

        <Flex align="center" mt={4} >
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
            Log In
          </MotionText>
        </Flex>
      </Flex>

     {/* Video + Cook.Share.Connect Text */}
<Flex
  direction={{ base: "column", md: "row" }}
  align="center"
  justify="space-between"
  px={{ base: 6, md: 20 }}
  mt={{ base: 120, md: 300 }}
  gap={{ base: 10, md: 20 }}
  zIndex={1.5}
>
  {/* Video Box */}
  <Box
    border="10px solid #FD660B"
    borderRadius="md"
    maxW="100%"
    overflow="hidden"
    zIndex={1}
  >
    <video width="100%" controls style={{ objectFit: "cover", maxHeight: "400px" }}>
      <source src="/videos/Gordon Ramsay Smashes Salmon _ comp _.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </Box>

  {/* Text beside video */}
  <Box maxW={{ base: "100%", md: "500px" }} zIndex={2}>
    <Text fontSize="36px" fontWeight="bold" mb={2} color="#FD660B">
      Cook.<Text as="span" color="black"> Share. </Text>Connect.
    </Text>
    <Text fontSize="18px" color="gray.800">
      Unlock a world of culinary inspiration! Whether you're a seasoned chef or just starting out, find and share amazing recipes with ease.
    </Text>
  </Box>
</Flex>

{/* "Completely Free" Box */}
<Box
  //bg="#97C33A"
  borderRadius="md"
  p={4}
  mt="10%"
  maxW="100%"
  color="white"
  textAlign="center"
  zIndex={1}
  mx="auto"
>
  <Flex justify="space-between" mx="10%">
    {/* Completely Free Section */}
    <VStack align="center">
      <Image src="/images/free.png" alt="Free Icon" boxSize="40px" mb={2} width={{ base: "10vw"}} height={{ md: "10vw"}}/>
      <Text fontSize="25px" fontWeight="bold" color="#FD660B">
        Completely Free
      </Text>
      <Text fontSize="14px" color="black" mt={2} width={{ base: "20vw", md: "20vw"}}>
        Sign up for free and have access to all these recipes!
      </Text>
    </VStack>

    {/* Safe Space Section */}
    <VStack align="center">
      <Image src="/images/child.png" alt="Safe Icon" boxSize="40px" mb={2} width={{ base: "10vw"}} height={{ md: "10vw"}}/>
      <Text fontSize="25px" fontWeight="bold" color="#FD660B">
        Safe Space
      </Text>
      <Text fontSize="14px" color="black" mt={2} width={{ base: "20vw", md: "20vw"}}>
        Store and manage your favorite recipes without any worries!
      </Text>
    </VStack>

    {/* Accessible Section */}
    <VStack align="center">
      <Image src="/images/tap.png" alt="Accessible Icon" boxSize="40px" mb={2} width={{ base: "10vw"}} height={{ md: "10vw"}}/>
      <Text fontSize="25px" fontWeight="bold" color="#FD660B">
        Accessible
      </Text>
      <Text fontSize="14px" color="black" mt={2} width={{ base: "20vw", md: "20vw"}}>
        Accommodates all kinds of users!
      </Text>
    </VStack>
  </Flex>
</Box>
    
<Box
  mt={40}
  //bgColor="gray.300"
  position="relative"
  width={{ base: "100vw", md: "100vw" }}
  zIndex={2}
  px={10}
  py={10}
>
  <Text fontSize="36" fontWeight="bold" ml="10%" color="black" width={{ base: "60vw"}}>
    Put us in your{" "}
    <Text as="span" color="#97C33A" display="inline">Pocket!</Text>
  </Text>

  <Image src={GreenRectangle} mt={5} mx="auto" zIndex={1}/>
  <Image src={Phone} position="absolute" width={{ base: "0vw", md: "35vw" }} maxW="none" top="-10" ml="48%" zIndex={2}/>

</Box>

    </Box>
  );
}

export default GetStartedPage;
