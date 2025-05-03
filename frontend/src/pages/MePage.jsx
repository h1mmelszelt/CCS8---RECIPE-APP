import React from "react";
import {
  Box,
  VStack,
  Text,
  Avatar,
  Flex,
  Icon,
  Divider,
  Button,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaUserCog, FaSignOutAlt, FaStar, FaUser } from "react-icons/fa";

function MePage() {
  const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");

  // Defensive: never allow malformed dynamic routes in any navigation or link
  // (MePage) - All profile/settings links must be valid
  const isValidPath = (path) => path && !path.includes('/:') && !path.endsWith('/:');
  
  return (
    <Box bg="gray.100" minH="100vh" color="black">
      {/* Page Content */}
      <Box px={{ base: 4, md: 20 }} py={10}>
        {/* User Info Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
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
              name="User Name"
              src="/images/default-avatar.jpg" // Replace with actual avatar URL
              mr={4}
            />
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="black">
                User Name
              </Text>
              <Text fontSize="sm" color="gray.600">
                @username
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
              to={isValidPath(userId ? `/profile/${userId}` : "/login") ? (userId ? `/profile/${userId}` : "/login") : undefined}
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
              to={isValidPath(userId ? `/settings/${userId}` : "/login") ? (userId ? `/settings/${userId}` : "/login") : undefined}
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
              as={Link}
              to="/logout"
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
