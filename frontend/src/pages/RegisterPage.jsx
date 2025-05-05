import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Link,
  VStack,
  Image,
} from "@chakra-ui/react";
import cooking from "/images/AdobeStock guy cooking.jpeg";

function RegisterPage() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Defensive: never allow malformed dynamic routes in any navigation or link
  // (RegisterPage) - Only allow navigation to /home and /login if the path is valid
  const isValidPath = (path) =>
    path && !path.includes(":/") && !path.endsWith(":");

  // State for form fields
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = window.location && window.location.assign ? null : undefined;

  // Chakra toast
  // Use dynamic import to avoid breaking SSR if needed
  let useToast;
  try { useToast = require("@chakra-ui/react").useToast; } catch {}
  const toast = useToast ? useToast() : null;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!displayName.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const axios = (await import("axios")).default;
      const response = await axios.post(
        "https://thebitebook.onrender.com/api/users",
        {
          name: displayName,
          username,
          email,
          password,
        }
      );
      setSuccess("Registration successful! You can now log in.");
      if (toast) {
        toast({
          title: "Registration successful!",
          description: "You can now log in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      if (toast) {
        toast({
          title: "Registration failed",
          description: err.response?.data?.message || "Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
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
        pb={10} // Added padding-bottom for spacing
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
                Create an Account
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="black"
                mb={20}
                textAlign={{ base: "center", md: "left" }}
                w="100%"
              >
                Please fill in the details below
              </Text>

              <Box w="100%" as="form" onSubmit={handleRegister}>
                <Text fontSize="sm" mb={1} color="black">
                  Display Name
                </Text>
                <Input
                  type="text"
                  placeholder="Enter your display name"
                  borderRadius="md"
                  bg="white"
                  mb={4}
                  focusBorderColor="orange.400"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />

                <Text fontSize="sm" mb={1} color="black">
                  Username
                </Text>
                <Input
                  type="text"
                  placeholder="Enter your desired username"
                  borderRadius="md"
                  bg="white"
                  mb={4}
                  focusBorderColor="orange.400"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Text fontSize="sm" mb={1} color="black">
                  E-mail Address
                </Text>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  borderRadius="md"
                  bg="white"
                  mb={4}
                  focusBorderColor="orange.400"
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
                  mb={4}
                  focusBorderColor="orange.400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Text fontSize="sm" mb={1} color="black">
                  Confirm Password
                </Text>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  borderRadius="md"
                  bg="white"
                  mb={4}
                  focusBorderColor="orange.400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && (
                  <Text color="red.500" fontSize="sm" mb={2}>{error}</Text>
                )}
                {success && (
                  <Text color="green.500" fontSize="sm" mb={2}>{success}</Text>
                )}

                <Button
                  w="100%"
                  bg="#AAD05E"
                  color="white"
                  _hover={{ bg: "#99BD50" }}
                  borderRadius="md"
                  mx="auto"
                  display="block"
                  type="submit"
                  isLoading={loading}
                >
                  Sign up
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
                Already have an account?{" "}
                <Link
                  href={isValidPath("/login") ? "/login" : undefined}
                  color="#FD660B"
                  fontWeight="bold"
                >
                  Log in
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

export default RegisterPage;
