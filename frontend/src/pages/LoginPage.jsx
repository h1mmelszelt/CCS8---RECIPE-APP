import Navbar from "../components/Navbar";
import { Box, Flex, Text, Input, Button, Checkbox, Link, VStack, Image } from "@chakra-ui/react";
import cooking from "/images/AdobeStock guy cooking.jpeg";

function LoginPage() {
    return (
      <>
        <Navbar />
        <Flex minH="100vh" align="flex-start" justify="center" bg="gray.100" backgroundImage={{ base: `url(${cooking})`, md: "none" }}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        pt={20}>
          <Box
            borderRadius="lg"
            boxShadow="lg"
            overflow="hidden"
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            maxW={{ base: "90%", md: "900px" }}
            w="100%"
          >
            {/* Left Section */}
            <Box flex="1" p={8} bg={{ base: "rgba(253, 228, 206, 0.9)", md: "rgba(253, 228, 206, 1)" }} borderRadius="lg">
              <VStack align="start" spacing={2} mt={8}>
                <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="black" textAlign={{ base: "center", md: "left" }} w="100%">
                  Welcome back
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }} color="black" mb={20} textAlign={{ base: "center", md: "left" }} w="100%">
                  Please enter your details
                </Text>
  
                <Box w="100%">
                  <Text fontSize="sm" mb={1} color="black">
                    E-mail Address
                  </Text>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    borderRadius="md"
                    bg="white"
                    mb={4}
                  />
  
                  <Text fontSize="sm" mb={1} color="black">
                    Password
                  </Text>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    borderRadius="md"
                    bg="white"
                    mb={2}
                  />
  
                  <Flex justify="space-between" align="center" mb={20}>
                    <Checkbox
                      colorScheme="white"
                      iconColor="orange"
                      sx={{
                        "& .chakra-checkbox__control": {
                          bg: "white",
                          borderColor: "white",
                        },
                      }}
                    >
                      Remember Me
                    </Checkbox>
                    <Link fontSize="sm" color="#FD660B">
                      Forgot Password?
                    </Link>
                  </Flex>
  
                  <Link href="/home" style={{ textDecoration: "none" }}>
                    <Button
                      w="100%"
                      bg="#AAD05E"
                      color="white"
                      _hover={{ bg: "#99BD50" }}
                      borderRadius="md"
                      mx="auto"
                      display="block"
                    >
                      Sign in
                    </Button>
                  </Link>
                </Box>
  
                <Text fontSize="sm" color="gray.600" mx="auto" textAlign="center" mt={4} mb={20}>
                  Don’t have an account?{" "}
                  <Link color="#FD660B" fontWeight="bold">
                    Sign up
                  </Link>
                </Text>
              </VStack>
            </Box>
  
            {/* Right Section */}
            <Box
              flex="1"
              display={{ base: "none", md: "block" }}
            >
              <Image
                src={cooking}
                alt="Chef cooking"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
          </Box>
        </Flex>
      </>
    );
  }
  
  export default LoginPage;