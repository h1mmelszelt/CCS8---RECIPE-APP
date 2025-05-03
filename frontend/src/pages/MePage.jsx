import React, { useEffect, useState, useContext } from "react";
import { Box, VStack, Text, Avatar, Flex, Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function MePage() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // Declare userId using useState
  const [userData, setUserData] = useState({});

  const handleLogout = () => {
    console.log("Logout triggered");
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("userId"); // Remove userId from localStorage
    sessionStorage.removeItem("token"); // Remove token from sessionStorage
    sessionStorage.removeItem("userId"); // Remove userId from sessionStorage
    setIsAuthenticated(false); // Update authentication state
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Retrieve the userId from localStorage or sessionStorage
    const storedUserId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");
    setUserId(storedUserId); // Set userId state

    // Fetch user data if userId exists
    if (storedUserId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `https://cs-test-z2vm.onrender.com/api/users/${storedUserId}`
          );
          setUserData({
            name: response.data.name,
            username: `@${response.data.username}`,
            avatar: response.data.avatar,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <Box bg="gray.100" minH="100vh" color="black">
      {/* Page Content */}
      <Box px={{ base: 4, md: 20 }} py={10}>
        {/* User Info Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          bg="gray.50"
          p={6}
          borderRadius="md"
          boxShadow="md"
          mb={8}
        >
          <Flex align="center" mb={{ base: 4, md: 0 }}>
            <Avatar
              size="xl"
              name={userData.name}
              src={userData.avatar} // Use the fetched avatar
              mr={4}
            />
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="black">
                {userData.name} {/* Display the fetched name */}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {userData.username} {/* Display the fetched username */}
              </Text>
            </Box>
          </Flex>
        </Flex>

        {/* Options Section */}
        <Box bg="white" borderRadius="md" boxShadow="md" p={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="orange.500">
            Account Options
          </Text>
          <VStack spacing={4} align="stretch">
            {/* Profile */}
            <Flex
              as={Link}
              to={userId ? `/profile/${userId}` : "/sign-in-required"} // Redirect to profile or login
              align="center"
              justify="space-between"
              p={4}
              bg="gray.50"
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
            >
              <Flex align="center">
                <Icon as={FaUser} color="orange.500" boxSize={5} mr={4} />
                <Text fontSize="md" fontWeight="medium" color="black">
                  Profile
                </Text>
              </Flex>
              <Icon as={ChevronRightIcon} color="gray.500" />
            </Flex>

            {/* Settings */}
            <Flex
              as={Link}
              to={userId ? `/settings/${userId}` : "/sign-in-required"}
              align="center"
              justify="space-between"
              p={4}
              bg="gray.50"
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
            >
              <Flex align="center">
                <Icon as={FaUserCog} color="orange.500" boxSize={5} mr={4} />
                <Text fontSize="md" fontWeight="medium" color="black">
                  Settings
                </Text>
              </Flex>
              <Icon as={ChevronRightIcon} color="gray.500" />
            </Flex>

            {/* Logout */}
            <Flex
              as="button"
              onClick={handleLogout} // Use the moved handleLogout function
              colorScheme="red"
              align="center"
              justify="space-between"
              p={4}
              bg="gray.50"
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
            >
              <Flex align="center">
                <Icon as={FaSignOutAlt} color="red.500" boxSize={5} mr={4} />
                <Text fontSize="md" fontWeight="medium" color="black">
                  Logout
                </Text>
              </Flex>
              <Icon as={ChevronRightIcon} color="gray.500" />
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

export default MePage;
