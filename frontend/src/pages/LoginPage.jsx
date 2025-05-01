import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Checkbox,
  Link,
  VStack,
  Image,
  useToast,
} from "@chakra-ui/react";
import cooking from "/images/AdobeStock guy cooking.jpeg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      // Save token to localStorage or sessionStorage based on Remember Me
      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
      } else {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.user.id);
      }

      setIsAuthenticated(true);

      // Show success message
      toast({
        title: "Login successful",
        description: "You are now logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to home page
      navigate("/home");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        minH="100vh"
        align="flex-start"
        justify="center"
        bg="gray.100"
        backgroundImage={{ base: `url(${cooking})`, md: "none" }}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        pt={20}
      >
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
          <Box
            flex="1"
            p={8}
            bg={{
              base: "rgba(253, 228, 206, 0.9)",
              md: "rgba(253, 228, 206, 1)",
            }}
            borderRadius="lg"
          >
            <VStack align="start" spacing={2} mt={8}>
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                color="black"
                textAlign={{ base: "center", md: "left" }}
                w="100%"
              >
                Welcome back
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="black"
                mb={20}
                textAlign={{ base: "center", md: "left" }}
                w="100%"
              >
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />

                <Flex justify="space-between" align="center" mb={20}>
                  <Checkbox
                    colorScheme="white"
                    iconColor="orange"
                    isChecked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
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

                <Button
                  w="100%"
                  bg="#AAD05E"
                  color="white"
                  _hover={{ bg: "#99BD50" }}
                  borderRadius="md"
                  mx="auto"
                  display="block"
                  onClick={handleLogin}
                  isLoading={loading}
                >
                  Sign in
                </Button>
              </Box>

              <Text
                fontSize="sm"
                color="gray.600"
                mx="auto"
                textAlign="center"
                mt={4}
                mb={20}
              >
                Don’t have an account?{" "}
                <Link href="/register" color="#FD660B" fontWeight="bold">
                  Sign up
                </Link>
              </Text>
            </VStack>
          </Box>

          {/* Right Section */}
          <Box flex="1" display={{ base: "none", md: "block" }}>
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
